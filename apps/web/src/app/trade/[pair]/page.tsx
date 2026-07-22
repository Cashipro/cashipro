"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { createChart, ColorType } from "lightweight-charts";

// ============================================================
// 1. BINANCE API — REAL DATA
// ============================================================

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

const fetchRealKlines = async (symbol: string, interval: string = "1m", limit: number = 100) => {
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

// ============================================================
// 2. CHART COMPONENT
// ============================================================
function RealChart({ symbol }: { symbol: string }) {
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
      timeScale: { borderColor: "rgba(197, 203, 206, 0.3)", timeVisible: true, secondsVisible: false },
    });
    chartRef.current = chart;

    const series = chart.addCandlestickSeries({
      upColor: "#26a69a",
      downColor: "#ef5350",
      wickUpColor: "#26a69a",
      wickDownColor: "#ef5350",
      borderVisible: false,
      wickVisible: true,
    });

    fetchRealKlines(symbol).then((data) => {
      if (data.length > 0) {
        series.setData(data);
        chart.timeScale().fitContent();
      }
    });

    wsRef.current = new WebSocket(`wss://stream.binance.com:9443/ws/${symbol.toLowerCase()}usdt@trade`);
    wsRef.current.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.p) {
        const price = parseFloat(data.p);
        const now = Math.floor(Date.now() / 60000) * 60;
        const lastData = series.data();
        if (lastData.length > 0) {
          const last = lastData[lastData.length - 1];
          if ('high' in last) {
            if (last.time === now) {
              series.update({
                time: last.time,
                open: last.open,
                high: Math.max(last.high, price),
                low: Math.min(last.low, price),
                close: price,
              });
            } else {
              series.update({ time: now as any, open: price, high: price, low: price, close: price });
            }
          }
        }
      }
    };

    const handleResize = () => {
      if (chartRef.current && containerRef.current) {
        chartRef.current.applyOptions({ width: containerRef.current.clientWidth });
      }
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      if (wsRef.current) wsRef.current.close();
      if (chartRef.current) chartRef.current.remove();
    };
  }, [symbol]);

  return <div ref={containerRef} className="w-full h-full" />;
}

// ============================================================
// 3. MAIN COMPONENT
// ============================================================
export default function TradePage() {
  const params = useParams();
  const pair = (params.pair as string) || "BTCUSDT";
  const displaySymbol = pair.replace("USDT", "");

  const [coins, setCoins] = useState<string[]>([]);
  const [selectedCoin, setSelectedCoin] = useState(displaySymbol);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [showDropdown, setShowDropdown] = useState(false);

  const [price, setPrice] = useState(0);
  const [priceChange, setPriceChange] = useState(0);
  const [high, setHigh] = useState(0);
  const [low, setLow] = useState(0);
  const [volume, setVolume] = useState(0);
  const [orderBook, setOrderBook] = useState<{ bids: any[]; asks: any[] }>({ bids: [], asks: [] });

  const [side, setSide] = useState<"buy" | "sell">("buy");
  const [orderType, setOrderType] = useState<"limit" | "market">("limit");
  const [amount, setAmount] = useState(0);
  const [showTPSL, setShowTPSL] = useState(false);
  const [tradePrice, setTradePrice] = useState(0);

  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const loadCoins = async () => {
      const list = await fetchRealCoins();
      setCoins(list);
      if (list.length > 0 && list.includes(displaySymbol)) {
        setSelectedCoin(displaySymbol);
        await updateData(displaySymbol);
      } else if (list.length > 0) {
        setSelectedCoin(list[0]);
        await updateData(list[0]);
      }
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

  useEffect(() => {
    if (!selectedCoin) return;
    const ws = new WebSocket(`wss://stream.binance.com:9443/ws/${selectedCoin.toLowerCase()}usdt@trade`);
    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.p) {
        const newPrice = parseFloat(data.p);
        setPrice(newPrice);
        setTradePrice(newPrice);
      }
    };
    return () => ws.close();
  }, [selectedCoin]);

  useEffect(() => {
    if (!selectedCoin) return;
    const interval = setInterval(async () => {
      const book = await fetchRealOrderBook(selectedCoin);
      setOrderBook(book);
    }, 3000);
    return () => clearInterval(interval);
  }, [selectedCoin]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleCoinSelect = async (coin: string) => {
    setSelectedCoin(coin);
    setSearchTerm("");
    setShowDropdown(false);
    await updateData(coin);
    window.history.pushState(null, "", `/trade/${coin}USDT`);
  };

  const filteredCoins = coins.filter((c) =>
    c.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const total = tradePrice * amount;
  const { bids, asks } = orderBook;

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0A0A0A] text-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-yellow-500 border-r-2 border-yellow-500 mx-auto"></div>
          <p className="text-gray-400 mt-4">Loading real market data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white font-sans overflow-hidden flex flex-col">
      {/* TOP NAV */}
      <div className="bg-black border-b border-gray-800 px-4 py-2 flex items-center justify-between sticky top-0 z-50 flex-shrink-0">
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-yellow-500 rounded flex items-center justify-center text-xl font-bold text-black">C</div>
            <span className="font-bold text-2xl text-white">CashiPro</span>
          </Link>
          <nav className="hidden md:flex items-center gap-4 text-sm text-gray-300">
            <Link href="/markets" className="hover:text-yellow-400">Markets</Link>
            <Link href="/trade/BTCUSDT" className="text-yellow-400 font-medium">Spot</Link>
            <Link href="/futures" className="hover:text-yellow-400">Futures</Link>
          </nav>
        </div>
        <div className="flex items-center gap-3">
          <Link href="/login" className="text-sm text-gray-300 hover:text-white hidden md:block">Log In</Link>
          <Link href="/register">
            <button className="bg-yellow-500 text-black px-4 py-1.5 rounded-full text-sm font-medium hover:bg-yellow-400">Sign Up</button>
          </Link>
        </div>
      </div>

      {/* MAIN LAYOUT */}
      <div className="flex-1 flex flex-col min-h-0">
        {/* COIN SEARCH + PAIR HEADER */}
        <div className="bg-[#111] border-b border-gray-700 px-4 py-3 flex flex-wrap items-center gap-4 flex-shrink-0">
          {/* Coin Search */}
          <div className="relative w-64" ref={searchRef}>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setShowDropdown(true);
              }}
              onFocus={() => setShowDropdown(true)}
              placeholder="Search 100+ coins..."
              className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-2 text-white text-sm focus:outline-none focus:border-yellow-500"
            />
            {showDropdown && searchTerm.length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-1 bg-gray-900 border border-gray-700 rounded-lg max-h-60 overflow-y-auto z-50">
                {filteredCoins.slice(0, 20).map((coin) => (
                  <button
                    key={coin}
                    onClick={() => handleCoinSelect(coin)}
                    className="w-full text-left px-4 py-2 text-sm text-white hover:bg-gray-800 transition flex items-center justify-between"
                  >
                    <span>{coin}/USDT</span>
                    {selectedCoin === coin && <span className="text-yellow-400 text-xs">✓</span>}
                  </button>
                ))}
                {filteredCoins.length === 0 && (
                  <div className="px-4 py-2 text-sm text-gray-500">No coins found</div>
                )}
              </div>
            )}
          </div>

          {/* Selected Coin + Price + Change */}
          <div className="flex items-center gap-4 flex-1">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-yellow-500 rounded-xl flex items-center justify-center text-xl font-bold text-black">
                {selectedCoin.slice(0, 2)}
              </div>
              <div>
                <div className="text-xl font-bold text-white">{selectedCoin}/USDT</div>
                <div className="text-xs text-gray-500">Real-time</div>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-2xl font-mono font-bold text-white">
                ${price > 0 ? price.toFixed(2) : "---"}
              </span>
              <span className={`text-lg font-medium ${priceChange >= 0 ? "text-green-500" : "text-red-500"}`}>
                {priceChange >= 0 ? "+" : ""}{priceChange.toFixed(2)}%
              </span>
            </div>
            <div className="flex gap-4 text-xs text-gray-500 ml-auto">
              <span>H: <span className="text-white">{high > 0 ? high.toFixed(2) : "---"}</span></span>
              <span>L: <span className="text-white">{low > 0 ? low.toFixed(2) : "---"}</span></span>
              <span>Vol: <span className="text-white">{volume > 0 ? volume.toFixed(2) : "---"}</span></span>
            </div>
          </div>
        </div>

        {/* BOTTOM ROW: CHART + TRADE + ORDER BOOK */}
        <div className="flex-1 flex min-h-0">
          {/* LEFT: CHART */}
          <div className="flex-1 flex flex-col min-w-0 border-r border-gray-700">
            <div className="border-b border-gray-700 px-4 py-1.5 flex items-center gap-4 text-sm flex-shrink-0">
              <span className="text-yellow-400 border-b-2 border-yellow-400 pb-1">Chart</span>
              <span className="text-gray-400">1m</span>
            </div>
            <div className="flex-1 bg-[#0F1217] p-1 min-h-0">
              <RealChart symbol={selectedCoin} />
            </div>
          </div>

          {/* RIGHT: TRADE FORM (TOP) + ORDER BOOK (BOTTOM) */}
          <div className="w-80 flex flex-col flex-shrink-0 bg-[#0A0A0A]">
            {/* TRADE FORM - OOPAR */}
            <div className="p-4 bg-[#111] border-b border-gray-700 flex-shrink-0">
              <div className="flex rounded-lg overflow-hidden bg-gray-900 mb-3">
                <button
                  onClick={() => setSide("buy")}
                  className={`flex-1 py-2.5 text-sm font-bold transition ${side === "buy" ? "bg-green-500 text-black" : "text-gray-400"}`}
                >
                  Buy
                </button>
                <button
                  onClick={() => setSide("sell")}
                  className={`flex-1 py-2.5 text-sm font-bold transition ${side === "sell" ? "bg-red-500 text-white" : "text-gray-400"}`}
                >
                  Sell
                </button>
              </div>

              <div className="flex gap-1 mb-3 text-xs">
                {["limit", "market", "tpSl"].map((type) => (
                  <button
                    key={type}
                    onClick={() => setOrderType(type as any)}
                    className={`flex-1 py-1.5 rounded transition ${orderType === type ? "bg-gray-700 text-white" : "text-gray-400"}`}
                  >
                    {type === "tpSl" ? "TP/SL" : type.toUpperCase()}
                  </button>
                ))}
                <div className="ml-auto flex items-center gap-1">
                  <span className="text-[10px] text-gray-500">TP/SL</span>
                  <button
                    onClick={() => setShowTPSL(!showTPSL)}
                    className={`w-7 h-4 rounded-full transition ${showTPSL ? "bg-yellow-500" : "bg-gray-700"}`}
                  >
                    <div className={`w-3 h-3 bg-white rounded-full transition transform ${showTPSL ? "translate-x-3.5" : "translate-x-0.5"}`} />
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 mb-2">
                <div>
                  <div className="flex justify-between text-[10px] text-gray-500"><span>Price</span><span>0.0142</span></div>
                  <input
                    type="number"
                    value={tradePrice || ""}
                    onChange={(e) => setTradePrice(parseFloat(e.target.value))}
                    className="w-full bg-gray-900 border border-gray-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-yellow-500"
                  />
                </div>
                <div>
                  <div className="text-[10px] text-gray-500">Amount</div>
                  <input
                    type="number"
                    value={amount || ""}
                    onChange={(e) => setAmount(parseFloat(e.target.value))}
                    placeholder="0"
                    className="w-full bg-gray-900 border border-gray-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-yellow-500"
                  />
                </div>
              </div>

              <div className="flex gap-1 text-xs mb-2">
                {[25, 50, 75, 100].map((p) => (
                  <button
                    key={p}
                    onClick={() => setAmount(0.01 * p)}
                    className="flex-1 py-1 bg-gray-800 rounded hover:bg-gray-700 text-xs"
                  >
                    {p}%
                  </button>
                ))}
              </div>

              <div className="text-xs text-gray-500 mb-2">
                Total <span className="text-white font-bold">${total.toFixed(2)}</span>
              </div>

              {showTPSL && (
                <div className="grid grid-cols-2 gap-2 mb-2 border-t border-gray-700 pt-2">
                  <input type="text" placeholder="TP price" className="bg-gray-900 border border-gray-700 rounded-lg px-2 py-1.5 text-xs text-white" />
                  <input type="text" placeholder="SL price" className="bg-gray-900 border border-gray-700 rounded-lg px-2 py-1.5 text-xs text-white" />
                </div>
              )}

              <button
                onClick={() => alert(`${side === "buy" ? "Buy" : "Sell"} ${selectedCoin} @ $${tradePrice}`)}
                className={`w-full py-2.5 rounded-xl text-sm font-bold transition ${side === "buy" ? "bg-green-500 hover:bg-green-600 text-black" : "bg-red-500 hover:bg-red-600 text-white"}`}
              >
                {side === "buy" ? "Buy" : "Sell"} {selectedCoin}
              </button>
            </div>

            {/* ORDER BOOK - NECHAY */}
            <div className="flex-1 p-2 overflow-y-auto min-h-0 bg-[#0A0A0A]">
              <div className="text-yellow-400 text-xs font-medium mb-1">Order Book</div>
              <div className="text-[10px] text-gray-500 grid grid-cols-3 mb-0.5">
                <div>Price</div>
                <div className="text-right">Amount</div>
                <div className="text-right">Total</div>
              </div>
              {asks.slice(0, 6).map((ask, i) => (
                <div key={`ask-${i}`} className="grid grid-cols-3 text-xs text-red-400 py-0.5">
                  <div>{ask.price}</div>
                  <div className="text-right text-gray-300">{ask.amount}</div>
                  <div className="text-right text-gray-300">{(ask.price * ask.amount).toFixed(2)}</div>
                </div>
              ))}
              <div className="text-center text-white font-bold py-1 border-y border-gray-700 my-0.5 text-sm">
                {price > 0 ? price.toFixed(2) : "---"}
              </div>
              {bids.slice(0, 6).map((bid, i) => (
                <div key={`bid-${i}`} className="grid grid-cols-3 text-xs text-green-400 py-0.5">
                  <div>{bid.price}</div>
                  <div className="text-right text-gray-300">{bid.amount}</div>
                  <div className="text-right text-gray-300">{(bid.price * bid.amount).toFixed(2)}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* BOTTOM TABS */}
      <div className="bg-[#0F1117] border-t border-gray-700 px-4 py-1.5 flex items-center justify-between text-xs flex-shrink-0">
        <div className="flex gap-4">
          <span className="text-yellow-400 border-b-2 border-yellow-400 pb-0.5">Open Orders(0)</span>
          <span className="text-gray-400">Order History</span>
          <span className="text-gray-400">Trade History</span>
        </div>
        <button className="bg-yellow-500 hover:bg-yellow-400 px-4 py-0.5 rounded-full text-black text-xs font-medium">Deposit</button>
      </div>
    </div>
  );
}
