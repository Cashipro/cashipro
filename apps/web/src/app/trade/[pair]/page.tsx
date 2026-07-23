"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { createChart, ColorType } from "lightweight-charts";

const fetchRealOrderBook = async (symbol: string) => {
  try {
    const res = await fetch(`https://api.binance.com/api/v3/depth?symbol=${symbol}USDT&limit=10`);
    const data = await res.json();
    return {
      bids: data.bids.map((b: any) => ({ price: parseFloat(b[0]), amount: parseFloat(b[1]) })),
      asks: data.asks.map((a: any) => ({ price: parseFloat(a[0]), amount: parseFloat(a[1]) })),
    };
  } catch {
    return { bids: [], asks: [] };
  }
};

const fetchRealStats = async (symbol: string) => {
  try {
    const res = await fetch(`https://api.binance.com/api/v3/ticker/24hr?symbol=${symbol}USDT`);
    const data = await res.json();
    return {
      price: parseFloat(data.lastPrice),
      change: parseFloat(data.priceChangePercent),
      high: parseFloat(data.highPrice),
      low: parseFloat(data.lowPrice),
      volume: parseFloat(data.volume),
    };
  } catch {
    return null;
  }
};

const fetchRealKlines = async (symbol: string, interval: string = "1m", limit: number = 500) => {
  try {
    const res = await fetch(
      `https://api.binance.com/api/v3/klines?symbol=${symbol}USDT&interval=${interval}&limit=${limit}`
    );
    const data = await res.json();
    return data.map((candle: any) => ({
      time: candle[0] / 1000,
      open: parseFloat(candle[1]),
      high: parseFloat(candle[2]),
      low: parseFloat(candle[3]),
      close: parseFloat(candle[4]),
      volume: parseFloat(candle[5]),
    }));
  } catch {
    return [];
  }
};

const fetchRealCoins = async () => {
  try {
    const res = await fetch("https://api.binance.com/api/v3/exchangeInfo");
    const data = await res.json();
    return data.symbols
      .filter((s: any) => s.quoteAsset === "USDT" && s.status === "TRADING")
      .map((s: any) => s.baseAsset)
      .slice(0, 100);
  } catch {
    return ["BTC", "ETH", "BNB", "SOL", "XRP", "ADA", "DOGE", "DOT"];
  }
};

const getBinanceInterval = (tf: string): string => {
  const map: Record<string, string> = {
    "1s": "1s", "1m": "1m", "3m": "3m", "5m": "5m", "10m": "10m", "15m": "15m",
    "30m": "30m", "1h": "1h", "2h": "2h", "4h": "4h", "6h": "6h", "8h": "8h",
    "12h": "12h", "1D": "1d", "2D": "2d", "3D": "3d", "5D": "5d",
    "1W": "1w", "Month": "1M",
  };
  return map[tf] || "15m";
};

const getLimitForTimeframe = (tf: string): number => {
  const map: Record<string, number> = {
    "1s": 100, "1m": 500, "3m": 500, "5m": 500, "10m": 500, "15m": 500,
    "30m": 500, "1h": 500, "2h": 500, "4h": 500, "6h": 500, "8h": 500,
    "12h": 500, "1D": 365, "2D": 365, "3D": 365, "5D": 365,
    "1W": 365, "Month": 365,
  };
  return map[tf] || 500;
};

function RealChart({ symbol, interval, onCandleClick }: { symbol: string; interval: string; onCandleClick?: (param: any) => void }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<any>(null);
  const wsRef = useRef<WebSocket | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const chart = createChart(containerRef.current, {
      layout: { background: { type: ColorType.Solid, color: "#0A0A0A" }, textColor: "#d1d4dc" },
      grid: { vertLines: { color: "rgba(42, 46, 57, 0.6)" }, horzLines: { color: "rgba(42, 46, 57, 0.6)" } },
      autoSize: true,
      crosshair: { mode: 1 },
      rightPriceScale: { borderColor: "rgba(197, 203, 206, 0.3)" },
      timeScale: { borderColor: "rgba(197, 203, 206, 0.3)", timeVisible: true, secondsVisible: interval === "1s" },
    });
    chartRef.current = chart;

    let series: any;
    if (interval === "1s") {
      series = chart.addLineSeries({ color: "#26a69a", lineWidth: 2 });
    } else {
      series = chart.addCandlestickSeries({
        upColor: "#26a69a",
        downColor: "#ef5350",
        wickUpColor: "#26a69a",
        wickDownColor: "#ef5350",
      });
    }

    const binanceInterval = getBinanceInterval(interval);
    const limit = getLimitForTimeframe(interval);

    fetchRealKlines(symbol, binanceInterval, limit).then((data) => {
      if (data.length > 0) {
        if (interval === "1s") {
          series.setData(data.map((d: any) => ({ time: d.time, value: d.close })));
        } else {
          series.setData(data);
        }
        chart.timeScale().fitContent();
      }
    });

    wsRef.current = new WebSocket(`wss://stream.binance.com:9443/ws/${symbol.toLowerCase()}usdt@trade`);
    wsRef.current.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.p && series) {
        const price = parseFloat(data.p);
        series.update({ time: Math.floor(Date.now() / 1000) as any, value: price });
      }
    };

    return () => {
      if (wsRef.current) wsRef.current.close();
      if (chartRef.current) chartRef.current.remove();
    };
  }, [symbol, interval]);

  return <div ref={containerRef} className="w-full h-full" />;
}

export default function TradePage() {
  const params = useParams();
  const pair = (params.pair as string) || "BTCUSDT";
  const displaySymbol = pair.replace("USDT", "");

  const [coins, setCoins] = useState<string[]>([]);
  const [selectedCoin, setSelectedCoin] = useState(displaySymbol);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [showDropdown, setShowDropdown] = useState(false);
  const [showMoreTimeframes, setShowMoreTimeframes] = useState(false);
  const [timeframe, setTimeframe] = useState("15m");

  const [price, setPrice] = useState(0);
  const [priceChange, setPriceChange] = useState(0);
  const [high, setHigh] = useState(0);
  const [low, setLow] = useState(0);
  const [volume, setVolume] = useState(0);
  const [orderBook, setOrderBook] = useState<{ bids: any[]; asks: any[] }>({ bids: [], asks: [] });

  const [side, setSide] = useState<"buy" | "sell">("buy");
  const [orderType, setOrderType] = useState<"limit" | "market" | "tpSl">("limit");
  const [amount, setAmount] = useState(0);
  const [tradePrice, setTradePrice] = useState(0);
  const [percent, setPercent] = useState(0);
  const [quantityType, setQuantityType] = useState<"usdt" | "coin">("usdt");

  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const loadCoins = async () => {
      const list = await fetchRealCoins();
      setCoins(list);
      const initial = list.includes(displaySymbol) ? displaySymbol : list[0] || "BTC";
      setSelectedCoin(initial);
      await updateData(initial);
      setLoading(false);
    };
    loadCoins();
  }, [displaySymbol]);

  const updateData = async (symbol: string) => {
    const stats = await fetchRealStats(symbol);
    if (stats) {
      setPrice(stats.price);
      setTradePrice(stats.price);
      setPriceChange(stats.change);
      setHigh(stats.high);
      setLow(stats.low);
      setVolume(stats.volume);
    }
    const book = await fetchRealOrderBook(symbol);
    setOrderBook(book);
  };

  // Live price + Orderbook (simplified)
  useEffect(() => {
    if (!selectedCoin) return;
    const ws = new WebSocket(`wss://stream.binance.com:9443/ws/${selectedCoin.toLowerCase()}usdt@trade`);
    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.p) setPrice(parseFloat(data.p));
    };
    return () => ws.close();
  }, [selectedCoin]);

  const handleCoinSelect = async (coin: string) => {
    setSelectedCoin(coin);
    setSearchTerm("");
    setShowDropdown(false);
    await updateData(coin);
    window.history.pushState(null, "", `/trade/${coin}USDT`);
  };

  const handleTimeframeSelect = (tf: string) => setTimeframe(tf);

  if (loading) {
    return <div className="min-h-screen bg-[#0A0A0A] flex items-center justify-center text-white">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white font-sans overflow-hidden flex flex-col">
      {/* TOP NAV */}
      <div className="bg-black border-b border-gray-800 px-4 py-2 flex items-center justify-between sticky top-0 z-50">
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-yellow-500 rounded flex items-center justify-center text-xl font-bold text-black">C</div>
            <span className="font-bold text-2xl">CashiPro</span>
          </Link>
        </div>
      </div>

      {/* HEADER + SEARCH */}
      <div className="bg-[#111] border-b border-gray-700 px-4 py-3 flex items-center gap-4">
        <div className="relative w-64" ref={searchRef}>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => { setSearchTerm(e.target.value); setShowDropdown(true); }}
            placeholder="Search coins..."
            className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-2 focus:border-yellow-500"
          />
          {showDropdown && searchTerm && (
            <div className="absolute top-full mt-1 bg-gray-900 border border-gray-700 rounded-lg w-full max-h-60 overflow-auto z-50">
              {coins.filter(c => c.toLowerCase().includes(searchTerm.toLowerCase())).slice(0, 15).map(coin => (
                <button key={coin} onClick={() => handleCoinSelect(coin)} className="w-full text-left px-4 py-2 hover:bg-gray-800">
                  {coin}/USDT
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="flex-1 flex items-center gap-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-yellow-500 rounded-xl flex items-center justify-center text-xl font-bold text-black">
              {selectedCoin.slice(0, 2)}
            </div>
            <div>
              <div className="text-xl font-bold">{selectedCoin}/USDT</div>
              <div className={`text-sm ${priceChange >= 0 ? "text-green-500" : "text-red-500"}`}>
                {priceChange.toFixed(2)}%
              </div>
            </div>
          </div>
          <div className="text-3xl font-mono font-bold">${price.toFixed(2)}</div>
        </div>
      </div>

      {/* CHART + TRADE PANEL */}
      <div className="flex flex-1 min-h-0">
        <div className="flex-1 flex flex-col">
          <RealChart symbol={selectedCoin} interval={timeframe} />
        </div>

        {/* TRADE PANEL */}
        <div className="w-96 border-l border-gray-700 bg-[#111] flex flex-col">
          {/* Trade form here - you can expand it later */}
          <div className="p-4">
            <button
              onClick={() => alert(`Order placed for ${selectedCoin}`)}
              className="w-full py-4 bg-green-600 hover:bg-green-500 rounded-xl font-bold text-lg"
            >
              Buy {selectedCoin}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
