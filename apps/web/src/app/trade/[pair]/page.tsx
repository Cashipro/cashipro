"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { createChart, ColorType } from "lightweight-charts";

const fetchRealOrderBook = async (symbol: string) => {
  try {
    const res = await fetch(`https://api.binance.com/api/v3/depth?symbol=${symbol}USDT&limit=15`);
    const data = await res.json();
    return {
      bids: data.bids?.map((b: any) => ({ price: parseFloat(b[0]), amount: parseFloat(b[1]) })) || [],
      asks: data.asks?.map((a: any) => ({ price: parseFloat(a[0]), amount: parseFloat(a[1]) })) || [],
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

const getBinanceInterval = (tf: string): string => {
  const map: Record<string, string> = { "1s": "1s", "15m": "15m", "1h": "1h", "4h": "4h", "1D": "1d", "1W": "1w", "Month": "1M" };
  return map[tf] || "15m";
};

const getLimitForTimeframe = (tf: string): number => ["1D","1W","Month"].includes(tf) ? 1000 : 500;

function RealChart({ symbol, interval, onCandleClick }: any) {
  const containerRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<any>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const chart = createChart(containerRef.current, {
      layout: { background: { type: ColorType.Solid, color: "#0A0A0A" }, textColor: "#d1d4dc" },
      grid: { vertLines: { color: "#1f2937" }, horzLines: { color: "#1f2937" } },
      autoSize: true,
      timeScale: { timeVisible: true, secondsVisible: interval === "1s" },
    });

    const isLine = interval === "1s";
    const series = isLine ? chart.addLineSeries({ color: "#22d3ee", lineWidth: 2 }) 
                          : chart.addCandlestickSeries({ upColor: "#22c55e", downColor: "#ef4444" });

    fetchRealKlines(symbol, getBinanceInterval(interval), getLimitForTimeframe(interval)).then(data => {
      if (data.length) {
        series.setData(isLine ? data.map((d: any) => ({ time: d.time, value: d.close })) : data);
        chart.timeScale().fitContent();
      }
    });

    const ws = new WebSocket(`wss://stream.binance.com:9443/ws/${symbol.toLowerCase()}usdt@trade`);
    ws.onmessage = (e) => {
      const d = JSON.parse(e.data);
      if (d.p) series.update({ time: Math.floor(Date.now()/1000) as any, value: parseFloat(d.p) });
    };

    return () => { ws.close(); chart.remove(); };
  }, [symbol, interval]);

  return <div ref={containerRef} className="w-full h-full" />;
}

export default function TradePage() {
  const params = useParams();
  const displaySymbol = ((params.pair as string) || "BTCUSDT").replace("USDT", "");

  const [selectedCoin, setSelectedCoin] = useState(displaySymbol);
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

  // Initial Data Load
  useEffect(() => {
    const load = async () => {
      const stats = await fetchRealStats(selectedCoin);
      if (stats) {
        setPrice(stats.price); setTradePrice(stats.price);
        setPriceChange(stats.change); setHigh(stats.high);
        setLow(stats.low); setVolume(stats.volume);
      }
      const book = await fetchRealOrderBook(selectedCoin);
      setOrderBook(book);
    };
    load();
  }, [selectedCoin]);

  const handleCandleClick = (param: any) => setCandleData(param);

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white flex flex-col">
      {/* Top Navigation */}
      <div className="bg-black border-b border-gray-800 p-4 flex justify-between items-center">
        <Link href="/" className="flex items-center gap-3">
          <div className="w-9 h-9 bg-yellow-500 rounded flex items-center justify-center text-2xl font-bold text-black">C</div>
          <span className="text-2xl font-bold">CashiPro</span>
        </Link>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* LEFT: CHART */}
        <div className="flex-1 flex flex-col">
          <div className="bg-[#111] border-b border-gray-700 px-4 py-3 flex gap-2 flex-wrap">
            {["1s", "15m", "1h", "4h", "1D", "1W"].map(tf => (
              <button key={tf} onClick={() => setTimeframe(tf)}
                className={`px-4 py-1 rounded ${timeframe === tf ? "bg-yellow-500 text-black" : "hover:bg-gray-800"}`}>
                {tf}
              </button>
            ))}
            <button onClick={() => setShowMore(!showMore)} className="px-4 py-1 hover:bg-gray-800 rounded">More ▼</button>
          </div>

          <div className="flex-1">
            <RealChart symbol={selectedCoin} interval={timeframe} onCandleClick={handleCandleClick} />
          </div>

          {candleData && (
            <div className="bg-[#111] p-3 border-t border-gray-700 text-sm flex gap-6 flex-wrap">
              <span>Time: {new Date(candleData.time * 1000).toLocaleString()}</span>
              <span>O: {candleData.open}</span>
              <span>H: <span className="text-green-500">{candleData.high}</span></span>
              <span>L: <span className="text-red-500">{candleData.low}</span></span>
              <span>C: {candleData.close}</span>
            </div>
          )}
        </div>

        {/* RIGHT: TRADE FORM + ORDER BOOK */}
        <div className="w-96 flex flex-col border-l border-gray-700 bg-[#0F1217]">
          {/* Trade Form */}
          <div className="p-5 border-b border-gray-700">
            <div className="flex rounded-xl overflow-hidden mb-6">
              <button onClick={() => setSide("buy")} className={`flex-1 py-4 font-bold text-lg ${side === "buy" ? "bg-green-600" : "bg-gray-800"}`}>BUY</button>
              <button onClick={() => setSide("sell")} className={`flex-1 py-4 font-bold text-lg ${side === "sell" ? "bg-red-600" : "bg-gray-800"}`}>SELL</button>
            </div>

            <div className="flex gap-2 mb-6">
              {["limit", "market", "tpSl"].map(t => (
                <button key={t} onClick={() => setOrderType(t as any)}
                  className={`flex-1 py-2 rounded text-sm ${orderType === t ? "bg-yellow-500 text-black" : "bg-gray-800"}`}>
                  {t.toUpperCase()}
                </button>
              ))}
            </div>

            {/* Price */}
            <div className="mb-5">
              <div className="text-xs text-gray-400 mb-1.5">Price (USDT)</div>
              <div className="flex gap-2">
                <button onClick={() => setTradePrice(p => Math.max(0, p-1))} className="w-11 h-11 bg-gray-800 hover:bg-gray-700 rounded-xl text-2xl">-</button>
                <input type="text" value={orderType === "market" ? "Market" : tradePrice} 
                  onChange={(e) => orderType !== "market" && setTradePrice(Number(e.target.value))}
                  className="flex-1 bg-gray-900 border border-gray-700 rounded-xl text-center text-xl py-3"
                  disabled={orderType === "market"} />
                <button onClick={() => setTradePrice(p => p+1)} className="w-11 h-11 bg-gray-800 hover:bg-gray-700 rounded-xl text-2xl">+</button>
              </div>
            </div>

            {/* Quantity */}
            <div className="mb-5">
              <div className="text-xs text-gray-400 mb-1.5">Quantity</div>
              <div className="flex gap-2">
                <button onClick={() => setAmount(a => Math.max(0, a-0.001))} className="w-11 h-11 bg-gray-800 hover:bg-gray-700 rounded-xl text-2xl">-</button>
                <input type="number" value={amount} onChange={e => setAmount(Number(e.target.value))} 
                  className="flex-1 bg-gray-900 border border-gray-700 rounded-xl text-center text-xl py-3" />
                <button onClick={() => setAmount(a => a+0.001)} className="w-11 h-11 bg-gray-800 hover:bg-gray-700 rounded-xl text-2xl">+</button>
              </div>
            </div>

            {/* Slider */}
            <input type="range" min="0" max="100" value={percent} onChange={e => setPercent(Number(e.target.value))} className="w-full accent-yellow-500 mb-1" />
            <div className="flex justify-between text-xs text-gray-400"><span>0%</span><span className="text-yellow-400">{percent}%</span><span>100%</span></div>

            {/* Quantity Type */}
            <div className="flex gap-2 my-5">
              <button onClick={() => setQuantityType("usdt")} className={`flex-1 py-3 rounded-xl ${quantityType === "usdt" ? "bg-yellow-500 text-black" : "bg-gray-800"}`}>USDT</button>
              <button onClick={() => setQuantityType("coin")} className={`flex-1 py-3 rounded-xl ${quantityType === "coin" ? "bg-yellow-500 text-black" : "bg-gray-800"}`}>{selectedCoin}</button>
            </div>

            {/* TP/SL */}
            <div className="flex justify-between items-center mb-4">
              <span>TP / SL</span>
              <button onClick={() => setShowTPSL(!showTPSL)} className={`w-11 h-6 rounded-full relative ${showTPSL ? 'bg-yellow-500' : 'bg-gray-700'}`}>
                <div className={`absolute top-0.5 w-5 h-5 bg-white rounded-full transition-all ${showTPSL ? 'left-6' : 'left-0.5'}`} />
              </button>
            </div>

            {showTPSL && (
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div><div className="text-xs text-gray-400">TP Price</div><input type="number" className="w-full bg-gray-900 p-3 rounded-xl mt-1" /></div>
                <div><div className="text-xs text-gray-400">SL Price</div><input type="number" className="w-full bg-gray-900 p-3 rounded-xl mt-1" /></div>
              </div>
            )}

            <button className={`w-full py-5 text-xl font-bold rounded-2xl mt-2 ${side === "buy" ? "bg-green-600 hover:bg-green-500" : "bg-red-600 hover:bg-red-500"}`}>
              {side === "buy" ? "BUY" : "SELL"} {selectedCoin}
            </button>
          </div>

          {/* ORDER BOOK */}
          <div className="flex-1 p-4 overflow-auto">
            <div className="text-yellow-400 font-medium mb-3">Order Book</div>
            <div className="text-xs text-gray-400 grid grid-cols-3 mb-2">
              <div>Price</div><div className="text-right">Amount</div><div className="text-right">Total</div>
            </div>
            {orderBook.asks.slice(0, 8).map((a: any, i) => (
              <div key={i} className="grid grid-cols-3 text-red-400 text-sm py-1">
                <div>{a.price}</div><div className="text-right">{a.amount}</div><div className="text-right text-gray-300">{(a.price * a.amount).toFixed(2)}</div>
              </div>
            ))}
            <div className="text-center py-3 text-lg font-bold border-y border-gray-700 my-2">{price.toFixed(2)}</div>
            {orderBook.bids.slice(0, 8).map((b: any, i) => (
              <div key={i} className="grid grid-cols-3 text-green-400 text-sm py-1">
                <div>{b.price}</div><div className="text-right">{b.amount}</div><div className="text-right text-gray-300">{(b.price * b.amount).toFixed(2)}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
