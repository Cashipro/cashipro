"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { createChart, ColorType } from "lightweight-charts";

// ================== API FUNCTIONS ==================
const fetchRealOrderBook = async (symbol: string) => {
  try {
    const res = await fetch(`https://api.binance.com/api/v3/depth?symbol=${symbol}USDT&limit=15`);
    const data = await res.json();
    return {
      bids: data.bids.map((b: any) => ({ price: parseFloat(b[0]), amount: parseFloat(b[1]) })),
      asks: data.asks.map((a: any) => ({ price: parseFloat(a[0]), amount: parseFloat(a[1]) })),
    };
  } catch { return { bids: [], asks: [] }; }
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
  } catch { return null; }
};

const fetchRealKlines = async (symbol: string, interval: string, limit: number = 500) => {
  try {
    const res = await fetch(`https://api.binance.com/api/v3/klines?symbol=${symbol}USDT&interval=${interval}&limit=${limit}`);
    const data = await res.json();
    return data.map((c: any) => ({
      time: c[0] / 1000,
      open: parseFloat(c[1]),
      high: parseFloat(c[2]),
      low: parseFloat(c[3]),
      close: parseFloat(c[4]),
      volume: parseFloat(c[5]),
    }));
  } catch { return []; }
};

const fetchRealCoins = async () => {
  try {
    const res = await fetch("https://api.binance.com/api/v3/exchangeInfo");
    const data = await res.json();
    return data.symbols.filter((s: any) => s.quoteAsset === "USDT" && s.status === "TRADING")
      .map((s: any) => s.baseAsset).slice(0, 100);
  } catch { return ["BTC", "ETH", "SOL"]; }
};

// ================== HELPERS ==================
const getBinanceInterval = (tf: string) => ({ "1s": "1s", "1m": "1m", "15m": "15m", "1h": "1h", "4h": "4h", "1D": "1d", "1W": "1w", "Month": "1M" }[tf] || "15m");
const getLimitForTimeframe = (tf: string) => (["1D", "1W", "Month"].includes(tf) ? 1000 : 500);

function RealChart({ symbol, interval, onCandleClick }: any) {
  const containerRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<any>(null);
  const wsRef = useRef<WebSocket | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const chart = createChart(containerRef.current, {
      layout: { background: { type: ColorType.Solid, color: "#0A0A0A" }, textColor: "#d1d4dc" },
      grid: { vertLines: { color: "#1f2937" }, horzLines: { color: "#1f2937" } },
      autoSize: true,
      timeScale: { timeVisible: true, secondsVisible: interval === "1s" },
    });
    chartRef.current = chart;

    const isLine = interval === "1s";
    const series = isLine 
      ? chart.addLineSeries({ color: "#22d3ee", lineWidth: 2 })
      : chart.addCandlestickSeries({ upColor: "#22c55e", downColor: "#ef4444" });

    const binanceInt = getBinanceInterval(interval);
    const limit = getLimitForTimeframe(interval);

    fetchRealKlines(symbol, binanceInt, limit).then(data => {
      if (data.length) {
        series.setData(isLine ? data.map(d => ({ time: d.time, value: d.close })) : data);
        chart.timeScale().fitContent();
      }
    });

    // Live updates
    wsRef.current = new WebSocket(`wss://stream.binance.com:9443/ws/${symbol.toLowerCase()}usdt@trade`);
    wsRef.current.onmessage = (e) => {
      const d = JSON.parse(e.data);
      if (d.p) {
        const price = parseFloat(d.p);
        const time = Math.floor(Date.now() / 1000);
        if (isLine) series.update({ time, value: price });
      }
    };

    return () => {
      wsRef.current?.close();
      chart.remove();
    };
  }, [symbol, interval]);

  return <div ref={containerRef} className="w-full h-full" />;
}

// ================== MAIN PAGE ==================
export default function TradePage() {
  const params = useParams();
  const displaySymbol = ((params.pair as string) || "BTCUSDT").replace("USDT", "");

  const [selectedCoin, setSelectedCoin] = useState(displaySymbol);
  const [coins, setCoins] = useState<string[]>([]);
  const [timeframe, setTimeframe] = useState("15m");
  const [showMore, setShowMore] = useState(false);

  const [price, setPrice] = useState(0);
  const [priceChange, setPriceChange] = useState(0);
  const [high, setHigh] = useState(0);
  const [low, setLow] = useState(0);
  const [volume, setVolume] = useState(0);
  const [orderBook, setOrderBook] = useState({ bids: [], asks: [] });

  const [side, setSide] = useState<"buy" | "sell">("buy");
  const [orderType, setOrderType] = useState<"limit" | "market" | "tpSl">("limit");
  const [tradePrice, setTradePrice] = useState(0);
  const [amount, setAmount] = useState(0);
  const [percent, setPercent] = useState(0);
  const [quantityType, setQuantityType] = useState<"usdt" | "coin">("usdt");
  const [showTPSL, setShowTPSL] = useState(false);
  const [candleData, setCandleData] = useState<any>(null);

  // Load initial data
  useEffect(() => { /* ... same as before */ }, []);

  const updateData = async (symbol: string) => {
    const stats = await fetchRealStats(symbol);
    if (stats) {
      setPrice(stats.price); setTradePrice(stats.price);
      setPriceChange(stats.change); setHigh(stats.high);
      setLow(stats.low); setVolume(stats.volume);
    }
    const book = await fetchRealOrderBook(symbol);
    setOrderBook(book);
  };

  // Live updates (price + orderbook)
  useEffect(() => { /* ... */ }, [selectedCoin]);

  const handleCandleClick = (param: any) => {
    if (param.time) setCandleData(param);
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white flex flex-col">
      {/* Top Nav + Header */}
      {/* ... (same as before) */}

      <div className="flex flex-1 overflow-hidden">
        {/* CHART AREA */}
        <div className="flex-1 flex flex-col">
          {/* Timeframe Bar */}
          <div className="border-b border-gray-700 px-4 py-2 flex gap-2 flex-wrap">
            {["1s", "15m", "1h", "4h", "1D", "1W"].map(tf => (
              <button
                key={tf}
                onClick={() => setTimeframe(tf)}
                className={`px-3 py-1 rounded text-sm ${timeframe === tf ? "bg-yellow-500 text-black" : "hover:bg-gray-800"}`}
              >
                {tf}
              </button>
            ))}

            <button onClick={() => setShowMore(!showMore)} className="px-3 py-1 flex items-center gap-1 hover:bg-gray-800 rounded">
              More ▼
            </button>
          </div>

          <div className="flex-1 relative">
            <RealChart symbol={selectedCoin} interval={timeframe} onCandleClick={handleCandleClick} />
          </div>

          {candleData && (
            <div className="bg-[#111] p-3 text-sm border-t border-gray-700 flex gap-6">
              <span>Time: {new Date(candleData.time * 1000).toLocaleString()}</span>
              <span>O: {candleData.open}</span>
              <span>H: <span className="text-green-500">{candleData.high}</span></span>
              <span>L: <span className="text-red-500">{candleData.low}</span></span>
              <span>C: {candleData.close}</span>
            </div>
          )}
        </div>

        {/* RIGHT SIDEBAR - TRADE + ORDERBOOK */}
        <div className="w-96 border-l border-gray-700 flex flex-col bg-[#0F1217]">
          {/* Trade Form */}
          <div className="p-4 border-b border-gray-700">
            {/* Buy / Sell Toggle */}
            <div className="flex rounded-lg overflow-hidden mb-4">
              <button onClick={() => setSide("buy")} className={`flex-1 py-3 font-bold ${side === "buy" ? "bg-green-600" : "bg-gray-800"}`}>BUY</button>
              <button onClick={() => setSide("sell")} className={`flex-1 py-3 font-bold ${side === "sell" ? "bg-red-600" : "bg-gray-800"}`}>SELL</button>
            </div>

            {/* Order Type */}
            <div className="flex gap-1 mb-4">
              {["limit", "market", "tpSl"].map(t => (
                <button key={t} onClick={() => setOrderType(t as any)} className={`flex-1 py-2 text-sm rounded ${orderType === t ? "bg-yellow-500 text-black" : "bg-gray-800"}`}>
                  {t.toUpperCase()}
                </button>
              ))}
            </div>

            {/* Price */}
            <div className="mb-4">
              <label className="text-xs text-gray-400">Price (USDT)</label>
              <div className="flex gap-2 mt-1">
                <button onClick={() => setTradePrice(p => Math.max(0, p - 1))} className="px-3 bg-gray-800 rounded">-</button>
                <input
                  type="text"
                  value={orderType === "market" ? "Market" : tradePrice}
                  onChange={(e) => orderType !== "market" && setTradePrice(Number(e.target.value))}
                  className="flex-1 bg-gray-900 text-center py-2 rounded border border-gray-700"
                  disabled={orderType === "market"}
                />
                <button onClick={() => setTradePrice(p => p + 1)} className="px-3 bg-gray-800 rounded">+</button>
              </div>
            </div>

            {/* Quantity */}
            <div className="mb-4">
              <label className="text-xs text-gray-400">Quantity</label>
              <div className="flex gap-2 mt-1">
                <button onClick={() => setAmount(a => Math.max(0, a - 0.001))} className="px-3 bg-gray-800 rounded">-</button>
                <input type="number" value={amount} onChange={(e) => setAmount(Number(e.target.value))} className="flex-1 bg-gray-900 text-center py-2 rounded border border-gray-700" />
                <button onClick={() => setAmount(a => a + 0.001)} className="px-3 bg-gray-800 rounded">+</button>
              </div>
            </div>

            {/* Percent Slider */}
            <input type="range" min="0" max="100" value={percent} onChange={(e) => setPercent(Number(e.target.value))} className="w-full accent-yellow-500" />
            <div className="flex justify-between text-xs text-gray-400 mt-1">
              <span>0%</span><span className="text-yellow-400">{percent}%</span><span>100%</span>
            </div>

            {/* USDT / Coin Toggle */}
            <div className="flex gap-1 my-4">
              <button onClick={() => setQuantityType("usdt")} className={`flex-1 py-2 rounded ${quantityType === "usdt" ? "bg-yellow-500 text-black" : "bg-gray-800"}`}>USDT</button>
              <button onClick={() => setQuantityType("coin")} className={`flex-1 py-2 rounded ${quantityType === "coin" ? "bg-yellow-500 text-black" : "bg-gray-800"}`}>{selectedCoin}</button>
            </div>

            {/* TP/SL Toggle */}
            <div className="flex justify-between items-center mb-3">
              <span>TP/SL</span>
              <button onClick={() => setShowTPSL(!showTPSL)} className={`w-10 h-5 rounded-full relative ${showTPSL ? "bg-yellow-500" : "bg-gray-700"}`}>
                <div className={`w-4 h-4 bg-white rounded-full absolute top-0.5 transition-all ${showTPSL ? "left-6" : "left-0.5"}`} />
              </button>
            </div>

            {showTPSL && (
              <div className="grid grid-cols-2 gap-3 mb-4">
                <div>
                  <label>TP Price</label>
                  <input type="number" className="w-full bg-gray-900 p-2 rounded mt-1" />
                </div>
                <div>
                  <label>SL Price</label>
                  <input type="number" className="w-full bg-gray-900 p-2 rounded mt-1" />
                </div>
              </div>
            )}

            <div className="text-xs text-gray-400 mb-4">
              Available: <span className="text-white">0.00 USDT</span>
            </div>

            <button className={`w-full py-4 rounded-xl text-lg font-bold ${side === "buy" ? "bg-green-600 hover:bg-green-500" : "bg-red-600 hover:bg-red-500"}`}>
              {side === "buy" ? "BUY" : "SELL"} {selectedCoin}
            </button>
          </div>

          {/* ORDER BOOK */}
          <div className="flex-1 p-4 overflow-auto">
            <h3 className="text-yellow-400 mb-2">Order Book</h3>
            {/* Asks + Bids same as before */}
          </div>
        </div>
      </div>
    </div>
  );
}
