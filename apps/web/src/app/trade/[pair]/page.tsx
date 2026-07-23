"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import Chart from "@/components/Chart";

// ============================================================
// 1. BINANCE API — REAL DATA FUNCTIONS
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
// 2. MAIN COMPONENT
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
  const [showMoreTimeframes, setShowMoreTimeframes] = useState(false);
  const [showCustomModal, setShowCustomModal] = useState(false);
  const [customInterval, setCustomInterval] = useState("");

  const [price, setPrice] = useState(0);
  const [priceChange, setPriceChange] = useState(0);
  const [high, setHigh] = useState(0);
  const [low, setLow] = useState(0);
  const [volume, setVolume] = useState(0);
  const [orderBook, setOrderBook] = useState<{ bids: any[]; asks: any[] }>({ bids: [], asks: [] });

  const [side, setSide] = useState<"buy" | "sell">("buy");
  const [orderType, setOrderType] = useState<"limit" | "market" | "tpSl">("limit");
  const [amount, setAmount] = useState(0);
  const [showTPSL, setShowTPSL] = useState(false);
  const [tradePrice, setTradePrice] = useState(0);
  const [percent, setPercent] = useState(0);
  const [quantityType, setQuantityType] = useState<"usdt" | "coin">("usdt");
  const [timeframe, setTimeframe] = useState("15m");

  const searchRef = useRef<HTMLDivElement>(null);

  // ===== TIME FRAMES =====
  const timeframes = ["1s", "1m", "5m", "15m", "30m", "1h", "4h", "1D", "1W"];
  const mainTimeframes = ["1s", "15m", "1h", "4h", "1D", "1W"];
  const moreTimeframes = ["1m", "5m", "30m"];

  // ===== LOAD COINS =====
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

  // ===== WEBSOCKET =====
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

  // ===== ORDER BOOK UPDATE =====
  useEffect(() => {
    if (!selectedCoin) return;
    const interval = setInterval(async () => {
      const book = await fetchRealOrderBook(selectedCoin);
      setOrderBook(book);
    }, 3000);
    return () => clearInterval(interval);
  }, [selectedCoin]);

  // ===== CLOSE SEARCH =====
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
        setShowMoreTimeframes(false);
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

  const handleTimeframeSelect = (tf: string) => {
    setTimeframe(tf);
    setShowMoreTimeframes(false);
    setShowCustomModal(false);
    setCustomInterval("");
  };

  const handlePercentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    setPercent(val);
    const maxAmount = quantityType === "usdt" ? 1000 : 0.01;
    setAmount((maxAmount * val) / 100);
  };

  const adjustPrice = (delta: number) => {
    setTradePrice((prev) => Math.max(0, prev + delta));
  };

  const adjustAmount = (delta: number) => {
    setAmount((prev) => Math.max(0, prev + delta));
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
      {/* ===== TOP NAV ===== */}
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

      {/* ===== MAIN LAYOUT ===== */}
      <div className="flex-1 flex flex-col min-h-0">
        {/* ===== COIN SEARCH + PAIR HEADER ===== */}
        <div className="bg-[#111] border-b border-gray-700 px-4 py-3 flex flex-wrap items-center gap-4 flex-shrink-0">
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

          <div className="flex items-center gap-4 flex-1 flex-wrap">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-yellow-500 rounded-xl flex items-center justify-center text-xl font-bold text-black">
                {selectedCoin.slice(0, 2)}
              </div>
              <div>
                <div className="text-xl font-bold text-white">{selectedCoin}/USDT</div>
                <div className={`text-xs font-medium ${priceChange >= 0 ? "text-green-500" : "text-red-500"}`}>
                  {priceChange >= 0 ? "+" : ""}{priceChange.toFixed(2)}%
                </div>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-2xl font-mono font-bold text-white">
                ${price > 0 ? price.toFixed(2) : "---"}
              </span>
            </div>
            <div className="flex gap-4 text-xs text-gray-500 ml-auto">
              <span>24H H: <span className="text-white">{high > 0 ? high.toFixed(2) : "---"}</span></span>
              <span>24H L: <span className="text-white">{low > 0 ? low.toFixed(2) : "---"}</span></span>
              <span>24H Vol: <span className="text-white">{volume > 0 ? volume.toFixed(2) : "---"}</span></span>
            </div>
          </div>
        </div>

        {/* ===== BOTTOM ROW: CHART + TRADE + ORDER BOOK ===== */}
        <div className="flex-1 flex min-h-0">
          {/* ===== LEFT: CHART ===== */}
          <div className="flex-1 flex flex-col min-w-0 border-r border-gray-700">
            <div className="border-b border-gray-700 px-4 py-1.5 flex items-center gap-1 text-sm flex-shrink-0 flex-wrap">
              <span className="text-yellow-400 border-b-2 border-yellow-400 pb-1 mr-2">Chart</span>

              {mainTimeframes.map((tf) => (
                <button
                  key={tf}
                  onClick={() => handleTimeframeSelect(tf)}
                  className={`px-2 py-0.5 rounded text-xs transition ${
                    timeframe === tf ? "bg-yellow-500/20 text-yellow-400" : "text-gray-400 hover:text-white"
                  }`}
                >
                  {tf}
                </button>
              ))}

              <div className="relative">
                <button
                  onClick={() => setShowMoreTimeframes(!showMoreTimeframes)}
                  className="px-2 py-0.5 rounded text-xs text-gray-400 hover:text-white transition flex items-center gap-0.5"
                >
                  More
                </button>

                {showMoreTimeframes && (
                  <div className="absolute top-full left-0 mt-1 bg-gray-900 border border-gray-700 rounded-lg p-2 z-50 min-w-[150px] max-h-60 overflow-y-auto">
                    <div className="grid grid-cols-2 gap-1">
                      {moreTimeframes.map((tf) => (
                        <button
                          key={tf}
                          onClick={() => handleTimeframeSelect(tf)}
                          className={`px-2 py-1 rounded text-xs transition ${
                            timeframe === tf ? "bg-yellow-500/20 text-yellow-400" : "text-gray-400 hover:text-white hover:bg-gray-800"
                          }`}
                        >
                          {tf}
                        </button>
                      ))}
                    </div>

                    <button
                      onClick={() => {
                        setShowMoreTimeframes(false);
                        setShowCustomModal(true);
                      }}
                      className="w-full mt-2 px-2 py-1 rounded text-xs text-yellow-400 border border-yellow-500/30 hover:bg-yellow-500/10 transition"
                    >
                      Custom Interval
                    </button>
                  </div>
                )}
              </div>
            </div>

            <div className="flex-1 bg-[#0F1217] p-1 min-h-0">
              <Chart symbol={pair} theme="dark" height={400} />
            </div>
          </div>

          {/* ===== RIGHT: TRADE FORM + ORDER BOOK ===== */}
          <div className="w-96 flex flex-col flex-shrink-0 bg-[#0A0A0A]">
            {/* ===== TRADE FORM ===== */}
            <div className="p-4 bg-[#111] border-b border-gray-700 flex-shrink-0 overflow-y-auto max-h-[55%]">
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
                <button
                  onClick={() => setOrderType("limit")}
                  className={`flex-1 py-1.5 rounded transition ${orderType === "limit" ? "bg-gray-700 text-white" : "text-gray-400"}`}
                >
                  Limit
                </button>
                <button
                  onClick={() => setOrderType("market")}
                  className={`flex-1 py-1.5 rounded transition ${orderType === "market" ? "bg-gray-700 text-white" : "text-gray-400"}`}
                >
                  Market
                </button>
                <button
                  onClick={() => setOrderType("tpSl")}
                  className={`flex-1 py-1.5 rounded transition ${orderType === "tpSl" ? "bg-gray-700 text-white" : "text-gray-400"}`}
                >
                  TP/SL
                </button>
              </div>

              {/* Price */}
              <div className="mb-2">
                <div className="flex justify-between text-[10px] text-gray-500"><span>Price (USDT)</span></div>
                <div className="flex items-center gap-1">
                  <button onClick={() => adjustPrice(-1)} className="w-8 h-8 bg-gray-800 rounded-lg hover:bg-gray-700 text-lg font-bold">−</button>
                  <input
                    type="number"
                    value={orderType === "market" ? "Market" : tradePrice || ""}
                    onChange={(e) => setTradePrice(parseFloat(e.target.value))}
                    disabled={orderType === "market"}
                    className="flex-1 bg-gray-900 border border-gray-700 rounded-lg px-3 py-2 text-sm text-white text-center focus:outline-none focus:border-yellow-500"
                  />
                  <button onClick={() => adjustPrice(1)} className="w-8 h-8 bg-gray-800 rounded-lg hover:bg-gray-700 text-lg font-bold">+</button>
                </div>
              </div>

              {/* Quantity */}
              <div className="mb-2">
                <div className="flex justify-between text-[10px] text-gray-500">
                  <span>Quantity</span>
                  <span className="text-yellow-400">Balance: 0.0142 USDT</span>
                </div>
                <div className="flex items-center gap-1">
                  <button onClick={() => adjustAmount(-0.001)} className="w-8 h-8 bg-gray-800 rounded-lg hover:bg-gray-700 text-lg font-bold">−</button>
                  <input
                    type="number"
                    value={amount || ""}
                    onChange={(e) => setAmount(parseFloat(e.target.value))}
                    placeholder="0"
                    className="flex-1 bg-gray-900 border border-gray-700 rounded-lg px-3 py-2 text-sm text-white text-center focus:outline-none focus:border-yellow-500"
                  />
                  <button onClick={() => adjustAmount(0.001)} className="w-8 h-8 bg-gray-800 rounded-lg hover:bg-gray-700 text-lg font-bold">+</button>
                </div>
              </div>

              {/* Slider */}
              <div className="mb-2">
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={percent}
                  onChange={handlePercentChange}
                  className="w-full accent-yellow-500"
                />
                <div className="flex justify-between text-[10px] text-gray-500">
                  <span>0%</span>
                  <span className="text-yellow-400">{percent}%</span>
                  <span>100%</span>
                </div>
              </div>

              {/* USDT / Coin */}
              <div className="flex gap-1 mb-2 text-xs">
                <button
                  onClick={() => setQuantityType("usdt")}
                  className={`flex-1 py-1 rounded transition ${quantityType === "usdt" ? "bg-gray-700 text-white" : "text-gray-400"}`}
                >
                  USDT
                </button>
                <button
                  onClick={() => setQuantityType("coin")}
                  className={`flex-1 py-1 rounded transition ${quantityType === "coin" ? "bg-gray-700 text-white" : "text-gray-400"}`}
                >
                  {selectedCoin}
                </button>
              </div>

              {/* TP/SL Toggle */}
              <div className="flex items-center justify-between mb-2 border-b border-gray-700 pb-2">
                <span className="text-xs text-gray-500">TP/SL</span>
                <button
                  onClick={() => setShowTPSL(!showTPSL)}
                  className={`w-8 h-4 rounded-full transition ${showTPSL ? "bg-yellow-500" : "bg-gray-700"}`}
                >
                  <div className={`w-3 h-3 bg-white rounded-full transition transform ${showTPSL ? "translate-x-4" : "translate-x-0.5"}`} />
                </button>
              </div>

              {/* TP/SL Boxes */}
              {showTPSL && (
                <div className="grid grid-cols-2 gap-2 mb-2">
                  <div>
                    <div className="text-[10px] text-gray-500">TP Trigger</div>
                    <input type="text" placeholder="Price" className="w-full bg-gray-900 border border-gray-700 rounded px-2 py-1 text-xs text-white" />
                  </div>
                  <div>
                    <div className="text-[10px] text-gray-500">SL Trigger</div>
                    <input type="text" placeholder="Price" className="w-full bg-gray-900 border border-gray-700 rounded px-2 py-1 text-xs text-white" />
                  </div>
                </div>
              )}

              {/* Balance */}
              <div className="text-xs text-gray-500 mb-2">
                Available: <span className="text-white font-bold">0.0142 USDT</span>
              </div>

              {/* Trade Button */}
              <button
                onClick={() => alert(`${side === "buy" ? "Buy" : "Sell"} ${selectedCoin} @ $${tradePrice}`)}
                className={`w-full py-3 rounded-xl text-sm font-bold transition ${side === "buy" ? "bg-green-500 hover:bg-green-600 text-black" : "bg-red-500 hover:bg-red-600 text-white"}`}
              >
                {side === "buy" ? "Buy" : "Sell"} {selectedCoin}
              </button>
            </div>

            {/* ===== ORDER BOOK ===== */}
            <div className="flex-1 p-2 overflow-y-auto min-h-0 bg-[#0A0A0A]">
              <div className="text-yellow-400 text-xs font-medium mb-1">Order Book</div>
              <div className="text-[10px] text-gray-500 grid grid-cols-3 mb-0.5">
                <div>Price</div>
                <div className="text-right">Amount</div>
                <div className="text-right">Total</div>
              </div>
              {asks.slice(0, 8).map((ask, i) => (
                <div key={`ask-${i}`} className="grid grid-cols-3 text-xs text-red-400 py-0.5">
                  <div>{ask.price}</div>
                  <div className="text-right text-gray-300">{ask.amount}</div>
                  <div className="text-right text-gray-300">{(ask.price * ask.amount).toFixed(2)}</div>
                </div>
              ))}
              <div className="text-center text-white font-bold py-1 border-y border-gray-700 my-0.5 text-sm">
                {price > 0 ? price.toFixed(2) : "---"}
              </div>
              {bids.slice(0, 8).map((bid, i) => (
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

      {/* ===== BOTTOM TABS ===== */}
      <div className="bg-[#0F1117] border-t border-gray-700 px-4 py-1.5 flex items-center justify-between text-xs flex-shrink-0">
        <div className="flex gap-4">
          <span className="text-yellow-400 border-b-2 border-yellow-400 pb-0.5">Open Orders(0)</span>
          <span className="text-gray-400">Order History</span>
          <span className="text-gray-400">Trade History</span>
        </div>
        <button className="bg-yellow-500 hover:bg-yellow-400 px-4 py-0.5 rounded-full text-black text-xs font-medium">Deposit</button>
      </div>

      {/* ===== CUSTOM INTERVAL MODAL ===== */}
      {showCustomModal && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-[100]">
          <div className="bg-gray-900 border border-gray-700 rounded-xl p-6 max-w-sm w-full">
            <h3 className="text-white font-bold mb-4">Custom Interval</h3>
            <div className="flex gap-2">
              <input
                type="text"
                value={customInterval}
                onChange={(e) => setCustomInterval(e.target.value)}
                placeholder="e.g., 45m, 90m, 2h"
                className="flex-1 bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white text-sm focus:outline-none focus:border-yellow-500"
              />
              <button
                onClick={() => {
                  if (customInterval.trim()) {
                    handleTimeframeSelect(customInterval);
                    setCustomInterval("");
                    setShowCustomModal(false);
                  }
                }}
                className="bg-yellow-500 text-black px-4 py-2 rounded-lg font-medium hover:bg-yellow-400 transition"
              >
                Apply
              </button>
            </div>
            <button
              onClick={() => setShowCustomModal(false)}
              className="mt-4 w-full py-2 bg-gray-800 rounded-lg text-sm text-gray-400 hover:text-white transition"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
