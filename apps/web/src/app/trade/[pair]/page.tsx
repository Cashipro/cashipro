"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";

// ===== BINANCE API — REAL DATA =====
const fetchCoinList = async () => {
  const res = await fetch("https://api.binance.com/api/v3/exchangeInfo");
  const data = await res.json();
  // USDT pairs filter karo
  const usdtPairs = data.symbols
    .filter((s: any) => s.quoteAsset === "USDT" && s.status === "TRADING")
    .map((s: any) => ({
      symbol: s.baseAsset,
      name: s.baseAsset,
    }));
  return usdtPairs;
};

const fetchPrice = async (symbol: string) => {
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

export default function SpotTradingPage() {
  const [coins, setCoins] = useState<any[]>([]);
  const [selectedCoin, setSelectedCoin] = useState<any>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [price, setPrice] = useState(0);
  const [priceChange, setPriceChange] = useState(0);
  const [high, setHigh] = useState(0);
  const [low, setLow] = useState(0);
  const [volume, setVolume] = useState(0);

  const [side, setSide] = useState<"buy" | "sell">("buy");
  const [orderType, setOrderType] = useState<"limit" | "market">("limit");
  const [amount, setAmount] = useState(0);
  const [showTPSL, setShowTPSL] = useState(false);

  const wsRef = useRef<WebSocket | null>(null);

  // ===== 1. FETCH COINS LIST (REAL) =====
  useEffect(() => {
    const loadCoins = async () => {
      try {
        const list = await fetchCoinList();
        setCoins(list.slice(0, 100));
        if (list.length > 0) {
          setSelectedCoin(list[0]);
          await updatePrice(list[0].symbol);
        }
      } catch (error) {
        console.error("Error loading coins:", error);
        // Fallback coins
        const fallback = ["BTC", "ETH", "BNB", "SOL", "XRP", "ADA", "DOGE", "DOT"];
        const fallbackCoins = fallback.map((s) => ({ symbol: s, name: s }));
        setCoins(fallbackCoins);
        setSelectedCoin(fallbackCoins[0]);
        await updatePrice("BTC");
      }
      setLoading(false);
    };
    loadCoins();
  }, []);

  // ===== 2. FETCH REAL PRICE =====
  const updatePrice = async (symbol: string) => {
    const data = await fetchPrice(symbol);
    if (data) {
      setPrice(data.price);
      setPriceChange(data.change);
      setHigh(data.high);
      setLow(data.low);
      setVolume(data.volume);
    }
  };

  // ===== 3. WEBSOCKET — REAL-TIME PRICE =====
  useEffect(() => {
    if (!selectedCoin) return;

    const symbol = selectedCoin.symbol.toLowerCase();
    const ws = new WebSocket(`wss://stream.binance.com:9443/ws/${symbol}usdt@trade`);

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.p) {
        const newPrice = parseFloat(data.p);
        setPrice(newPrice);
      }
    };

    wsRef.current = ws;
    return () => ws.close();
  }, [selectedCoin]);

  // ===== 4. COIN SELECT =====
  const handleCoinSelect = async (coin: any) => {
    setSelectedCoin(coin);
    await updatePrice(coin.symbol);
  };

  // ===== 5. SEARCH FILTER =====
  const filteredCoins = coins.filter((c) =>
    c.symbol.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const total = price * amount;

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
    <div className="min-h-screen bg-[#0A0A0A] text-white font-sans overflow-x-hidden">
      {/* ===== TOP NAV ===== */}
      <div className="bg-black border-b border-gray-800 px-4 py-2 flex items-center justify-between sticky top-0 z-50">
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-yellow-500 rounded flex items-center justify-center text-xl font-bold text-black">C</div>
            <span className="font-bold text-2xl text-white">CashiPro</span>
          </Link>
          <nav className="hidden md:flex items-center gap-4 text-sm text-gray-300">
            <Link href="/markets" className="hover:text-yellow-400">Markets</Link>
            <Link href="/spot" className="text-yellow-400 font-medium">Spot</Link>
            <Link href="/futures" className="hover:text-yellow-400">Futures</Link>
            <Link href="/earn" className="hover:text-yellow-400">Earn</Link>
          </nav>
        </div>
        <div className="flex items-center gap-3">
          <div className="hidden md:flex bg-gray-900 px-3 py-1.5 rounded-full text-sm text-gray-400">🔍</div>
          <Link href="/login" className="text-sm text-gray-300 hover:text-white hidden md:block">Log In</Link>
          <Link href="/register">
            <button className="bg-yellow-500 text-black px-4 py-1.5 rounded-full text-sm font-medium hover:bg-yellow-400">
              Sign Up
            </button>
          </Link>
          <button className="md:hidden text-2xl text-white">☰</button>
        </div>
      </div>

      {/* ===== SEARCH ===== */}
      <div className="bg-[#111] border-b border-gray-700 px-4 py-2">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search coins..."
          className="w-full max-w-xs bg-gray-900 border border-gray-700 rounded-lg px-4 py-2 text-white text-sm focus:outline-none focus:border-yellow-500"
        />
      </div>

      {/* ===== PAIR HEADER ===== */}
      <div className="bg-[#111] border-b border-gray-700 px-4 md:px-6 py-3 flex flex-wrap items-center gap-4 md:gap-8">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-yellow-500 rounded-xl flex items-center justify-center text-xl font-bold text-black">
            {selectedCoin?.symbol?.slice(0, 2) || "?"}
          </div>
          <div>
            <div className="text-2xl font-bold text-white">{selectedCoin?.symbol}/USDT</div>
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-6 md:gap-10">
          <div>
            <span className="text-3xl font-mono font-bold text-white">
              ${price > 0 ? price.toFixed(2) : "---"}
            </span>
            <span className={`ml-2 text-lg font-medium ${priceChange >= 0 ? "text-green-500" : "text-red-500"}`}>
              {priceChange >= 0 ? "+" : ""}{priceChange.toFixed(2)}%
            </span>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-1 text-sm">
            <div><span className="text-gray-500">24H High</span> <span className="text-white">{high > 0 ? high.toFixed(2) : "---"}</span></div>
            <div><span className="text-gray-500">24H Low</span> <span className="text-white">{low > 0 ? low.toFixed(2) : "---"}</span></div>
            <div><span className="text-gray-500">24H Vol</span> <span className="text-white">{volume > 0 ? volume.toFixed(2) : "---"}</span></div>
          </div>
        </div>
      </div>

      {/* ===== COINS LIST ===== */}
      <div className="flex flex-col lg:flex-row h-[calc(100vh-200px)]">
        {/* LEFT: Coin List */}
        <div className="w-full lg:w-64 bg-[#111] border-r border-gray-700 overflow-y-auto p-2">
          {filteredCoins.map((coin) => (
            <button
              key={coin.symbol}
              onClick={() => handleCoinSelect(coin)}
              className={`w-full text-left px-3 py-2 rounded-lg text-sm transition ${
                selectedCoin?.symbol === coin.symbol
                  ? "bg-yellow-500/20 text-yellow-400"
                  : "text-gray-300 hover:bg-gray-800"
              }`}
            >
              {coin.symbol}/USDT
            </button>
          ))}
        </div>

        {/* ===== CHART AREA ===== */}
        <div className="flex-1 flex flex-col border-r border-gray-700">
          <div className="border-b border-gray-800 px-4 py-2 flex items-center gap-4 text-sm">
            <span className="text-yellow-400 border-b-2 border-yellow-400 pb-2">Chart</span>
            <span className="text-gray-400">Info</span>
          </div>
          <div className="flex-1 bg-[#0F1217] flex items-center justify-center">
            <div className="text-center">
              <div className="text-5xl mb-3 opacity-20">📈</div>
              <p className="text-gray-500">{selectedCoin?.symbol}/USDT Real-Time Chart</p>
              <p className="text-xs text-gray-600 mt-1">Binance API • Live Data</p>
            </div>
          </div>
          <div className="bg-[#111] px-4 py-1.5 border-t border-gray-800 flex gap-4 text-xs">
            <div>VOL <span className="text-white">{volume > 0 ? volume.toFixed(2) : "---"}</span></div>
            <div>High <span className="text-green-500">{high > 0 ? high.toFixed(2) : "---"}</span></div>
            <div>Low <span className="text-red-500">{low > 0 ? low.toFixed(2) : "---"}</span></div>
          </div>
        </div>

        {/* ===== ORDER BOOK + TRADE ===== */}
        <div className="w-full lg:w-96 flex flex-col bg-[#0A0A0A]">
          {/* Order Book */}
          <div className="flex-1 border-b border-gray-700 p-3 overflow-y-auto">
            <div className="text-yellow-400 text-sm font-medium mb-2">Order Book</div>
            <div className="text-xs text-gray-500 grid grid-cols-3 mb-1">
              <div>Price</div>
              <div className="text-right">Amount</div>
              <div className="text-right">Total</div>
            </div>
            {[...Array(5)].map((_, i) => (
              <div key={`ask-${i}`} className="grid grid-cols-3 text-sm text-red-400 py-0.5">
                <div>{(price * (1 + (i + 1) * 0.001)).toFixed(2)}</div>
                <div className="text-right text-gray-300">{(Math.random() * 2 + 0.1).toFixed(4)}</div>
                <div className="text-right text-gray-300">{((price * (1 + (i + 1) * 0.001)) * (Math.random() * 2 + 0.1)).toFixed(2)}</div>
              </div>
            ))}
            <div className="text-center text-white font-bold py-2 border-y border-gray-700 my-1">
              {price > 0 ? price.toFixed(2) : "---"}
            </div>
            {[...Array(5)].map((_, i) => (
              <div key={`bid-${i}`} className="grid grid-cols-3 text-sm text-green-400 py-0.5">
                <div>{(price * (1 - (i + 1) * 0.001)).toFixed(2)}</div>
                <div className="text-right text-gray-300">{(Math.random() * 2 + 0.1).toFixed(4)}</div>
                <div className="text-right text-gray-300">{((price * (1 - (i + 1) * 0.001)) * (Math.random() * 2 + 0.1)).toFixed(2)}</div>
              </div>
            ))}
          </div>

          {/* Trade Form */}
          <div className="p-4 bg-[#111]">
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
              <div className="ml-auto flex items-center gap-2">
                <span className="text-[10px] text-gray-500">TP/SL</span>
                <button
                  onClick={() => setShowTPSL(!showTPSL)}
                  className={`w-8 h-4 rounded-full transition ${showTPSL ? "bg-yellow-500" : "bg-gray-700"}`}
                >
                  <div className={`w-3 h-3 bg-white rounded-full transition transform ${showTPSL ? "translate-x-4" : "translate-x-0.5"}`} />
                </button>
              </div>
            </div>

            <div className="mb-2">
              <div className="flex justify-between text-[10px] text-gray-500">
                <span>Price (USDT)</span>
                <span>Available 0.0142</span>
              </div>
              <input
                type="number"
                value={price || ""}
                onChange={(e) => setPrice(parseFloat(e.target.value))}
                className="w-full bg-gray-900 border border-gray-700 rounded px-2 py-2 text-sm text-white focus:outline-none focus:border-yellow-500"
              />
            </div>

            <div className="mb-2">
              <div className="text-[10px] text-gray-500">Amount</div>
              <input
                type="number"
                value={amount || ""}
                onChange={(e) => setAmount(parseFloat(e.target.value))}
                placeholder="0"
                className="w-full bg-gray-900 border border-gray-700 rounded px-2 py-2 text-sm text-white focus:outline-none focus:border-yellow-500"
              />
            </div>

            <div className="flex gap-1 text-xs mb-1">
              {[0, 25, 50, 75, 100].map((p) => (
                <button
                  key={p}
                  onClick={() => setAmount(0.1 * p)}
                  className="flex-1 py-1 bg-gray-800 rounded hover:bg-gray-700 text-xs"
                >
                  {p}%
                </button>
              ))}
            </div>

            <div className="text-[10px] text-gray-500 mt-1">
              Total <span className="text-white font-bold">${total.toFixed(2)}</span>
            </div>

            {showTPSL && (
              <div className="mt-2 space-y-1.5 border-t border-gray-700 pt-2">
                <div>
                  <div className="text-[10px] text-gray-500">TP trigger price</div>
                  <input
                    type="text"
                    placeholder="66,000"
                    className="w-full bg-gray-900 border border-gray-700 rounded px-2 py-1.5 text-sm text-white focus:outline-none focus:border-yellow-500"
                  />
                </div>
                <div>
                  <div className="text-[10px] text-gray-500">SL trigger price</div>
                  <input
                    type="text"
                    placeholder="64,500"
                    className="w-full bg-gray-900 border border-gray-700 rounded px-2 py-1.5 text-sm text-white focus:outline-none focus:border-yellow-500"
                  />
                </div>
              </div>
            )}

            <button
              onClick={() => alert(`${side === "buy" ? "Buy" : "Sell"} ${selectedCoin?.symbol} @ $${price}`)}
              className={`w-full mt-2 py-3 rounded-xl text-base font-bold transition ${side === "buy" ? "bg-green-500 hover:bg-green-600 text-black" : "bg-red-500 hover:bg-red-600 text-white"}`}
            >
              {side === "buy" ? "Buy" : "Sell"} {selectedCoin?.symbol}
            </button>
          </div>
        </div>
      </div>

      {/* ===== BOTTOM TABS ===== */}
      <div className="bg-[#0F1117] border-t border-gray-700 px-4 py-2 flex items-center justify-between text-sm">
        <div className="flex gap-4">
          <span className="text-yellow-400 border-b-2 border-yellow-400 pb-1">Open Orders(0)</span>
          <span className="text-gray-400">Order History</span>
          <span className="text-gray-400">Trade History</span>
        </div>
        <button className="bg-yellow-500 hover:bg-yellow-400 px-4 py-1 rounded-full text-black text-sm font-medium">
          Deposit
        </button>
      </div>
    </div>
  );
}
