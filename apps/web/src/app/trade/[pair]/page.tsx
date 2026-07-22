"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import dynamic from "next/dynamic";

const TradingViewChart = dynamic(
  () => import("@/components/TradingViewChart"),
  { ssr: false }
);

// ===== COINS LIST =====
const COINS = [
  "BTCUSDT", "ETHUSDT", "BNBUSDT", "SOLUSDT", "XRPUSDT",
  "ADAUSDT", "DOGEUSDT", "DOTUSDT", "MATICUSDT", "LINKUSDT",
  "AVAXUSDT", "UNIUSDT", "ATOMUSDT", "ETCUSDT", "FILUSDT",
];

// ===== TYPE DEFINITIONS =====
interface Order {
  price: number;
  amount: number;
}

export default function TradePage() {
  const params = useParams();
  const pair = (params.pair as string) || "BTCUSDT";
  const displaySymbol = pair.replace("USDT", "");

  const [side, setSide] = useState<"buy" | "sell">("buy");
  const [orderType, setOrderType] = useState<"limit" | "market" | "tpSl">("limit");
  const [showTPSL, setShowTPSL] = useState(false);
  const [activeTimeframe, setActiveTimeframe] = useState("15m");
  const [showTimeframes, setShowTimeframes] = useState(false);
  const [showCoinSearch, setShowCoinSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const [price, setPrice] = useState(65432.50);
  const [priceChange, setPriceChange] = useState(2.45);
  const [orderBook, setOrderBook] = useState<{ bids: Order[]; asks: Order[] }>({ bids: [], asks: [] });
  const [selectedCoin, setSelectedCoin] = useState(pair);

  const searchRef = useRef<HTMLDivElement>(null);

  const timeframes = ["1s", "1m", "5m", "15m", "30m", "1H", "4H", "1D", "1W", "1M"];
  const visibleTimeframes = ["1s", "1m", "5m", "15m", "30m", "1H", "4H", "1D"];

  const filteredCoins = COINS.filter(c => 
    c.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // ===== FETCH ORDER BOOK =====
  const fetchOrderBook = async () => {
    try {
      const res = await fetch("/api/orderbook");
      const data = await res.json();
      if (data.orderBook && data.orderBook.bids.length > 0) {
        setOrderBook(data.orderBook);
        if (data.orderBook.bids.length > 0) {
          setPrice(data.orderBook.bids[0].price);
        }
      } else {
        const bids: Order[] = [];
        const asks: Order[] = [];
        const basePrice = price;
        for (let i = 0; i < 8; i++) {
          bids.push({
            price: Math.round((basePrice - (i + 1) * 5) * 100) / 100,
            amount: Math.round((Math.random() * 2 + 0.1) * 100) / 100,
          });
          asks.push({
            price: Math.round((basePrice + (i + 1) * 5) * 100) / 100,
            amount: Math.round((Math.random() * 2 + 0.1) * 100) / 100,
          });
        }
        setOrderBook({ bids, asks });
      }
    } catch (error) {
      console.error("Error fetching order book:", error);
    }
  };

  // ===== PLACE ORDER =====
  const placeOrder = async (side: "buy" | "sell", price: number, amount: number) => {
    try {
      const res = await fetch("/api/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ side, price, amount }),
      });
      const data = await res.json();
      if (data.success) {
        fetchOrderBook();
      }
    } catch (error) {
      console.error("Error placing order:", error);
    }
  };

  // ===== REAL-TIME DATA =====
  useEffect(() => {
    fetchOrderBook();
    const interval = setInterval(() => {
      setPrice(prev => {
        const change = (Math.random() - 0.5) * 50;
        return Math.round((prev + change) * 100) / 100;
      });
      fetchOrderBook();
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // ===== CLOSE SEARCH ON OUTSIDE CLICK =====
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowCoinSearch(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleCoinSelect = (coin: string) => {
    setSelectedCoin(coin);
    setShowCoinSearch(false);
    setSearchQuery("");
    window.location.href = `/trade/${coin}`;
  };

  const bids = orderBook.bids || [];
  const asks = orderBook.asks || [];

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white font-sans overflow-x-hidden">
      {/* ===== TOP NAVBAR ===== */}
      <div className="bg-black border-b border-gray-800 px-4 py-2 flex items-center justify-between sticky top-0 z-50">
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-500 rounded flex items-center justify-center text-xl font-bold text-white">C</div>
            <span className="font-bold text-2xl text-white">CashiPro</span>
          </Link>
          <nav className="hidden md:flex items-center gap-4 text-sm text-gray-300">
            <Link href="/markets" className="hover:text-white">Markets</Link>
            <Link href="/trade/BTCUSDT" className="text-blue-400">Spot</Link>
            <Link href="/futures" className="hover:text-white">Futures</Link>
            <Link href="/earn" className="hover:text-white">Earn</Link>
          </nav>
        </div>
        <div className="flex items-center gap-3">
          <Link href="/login" className="text-sm text-gray-300 hover:text-white hidden md:block">Log In</Link>
          <Link href="/register">
            <button className="bg-blue-600 hover:bg-blue-700 px-4 py-1.5 rounded-full text-sm font-medium">Sign Up</button>
          </Link>
          <button className="md:hidden text-2xl text-white">☰</button>
        </div>
      </div>

      {/* ===== PAIR HEADER WITH SEARCH ===== */}
      <div className="bg-[#111] border-b border-gray-700 px-4 md:px-6 py-3 flex flex-wrap items-center gap-4 md:gap-8">
        <div className="flex items-center gap-3 relative" ref={searchRef}>
          <div 
            className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl flex items-center justify-center text-xl font-bold text-white cursor-pointer"
            onClick={() => setShowCoinSearch(!showCoinSearch)}
          >
            {displaySymbol.slice(0, 2)}
          </div>
          <div>
            <div 
              className="text-2xl font-bold text-white cursor-pointer flex items-center gap-2"
              onClick={() => setShowCoinSearch(!showCoinSearch)}
            >
              {pair}
              <span className="text-xs text-gray-400">▼</span>
            </div>
            <div className="text-xs text-gray-500">{displaySymbol} / USDT</div>
          </div>

          {/* Coin Search Dropdown */}
          {showCoinSearch && (
            <div className="absolute top-full left-0 mt-2 bg-[#1A1A1A] border border-gray-700 rounded-xl p-3 z-50 min-w-[200px]">
              <input
                type="text"
                placeholder="Search coin..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-gray-900 border border-gray-700 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-blue-500"
                autoFocus
              />
              <div className="mt-2 max-h-[200px] overflow-y-auto">
                {filteredCoins.length > 0 ? (
                  filteredCoins.map((coin) => (
                    <button
                      key={coin}
                      onClick={() => handleCoinSelect(coin)}
                      className="w-full text-left px-3 py-2 text-sm text-white hover:bg-gray-800 rounded-lg transition"
                    >
                      {coin}
                    </button>
                  ))
                ) : (
                  <p className="text-sm text-gray-500 px-3 py-2">No coins found</p>
                )}
              </div>
            </div>
          )}
        </div>

        <div className="flex flex-wrap items-center gap-6 md:gap-10">
          <div>
            <span className="text-3xl font-mono font-bold text-white">{price.toLocaleString()}</span>
            <span className="text-green-400 ml-2 text-lg">+{priceChange}%</span>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-1 text-sm">
            <div><span className="text-gray-500">24H High</span> <span className="text-white">66,200</span></div>
            <div><span className="text-gray-500">24H Low</span> <span className="text-white">64,100</span></div>
            <div><span className="text-gray-500">24H Vol</span> <span className="text-white">1.2B</span></div>
            <div><span className="text-gray-500">24H Amount</span> <span className="text-white">1.91M</span></div>
          </div>
        </div>
      </div>

      {/* ===== MAIN LAYOUT ===== */}
      <div className="flex flex-col lg:flex-row h-[calc(100vh-180px)]">
        {/* LEFT: Chart */}
        <div className="flex-1 flex flex-col min-w-0 border-r border-gray-800">
          <div className="flex flex-wrap items-center justify-between border-b border-gray-800 px-4 py-2 gap-2">
            <div className="flex gap-4 text-sm">
              <span className="text-blue-400 border-b-2 border-blue-400 pb-2">Chart</span>
              <span className="text-gray-400">Info</span>
              <span className="text-gray-400">Trading Data</span>
              <span className="text-gray-400">Compare</span>
            </div>

            {/* Timeframes */}
            <div className="flex items-center gap-1 text-xs relative">
              {visibleTimeframes.map((tf) => (
                <button
                  key={tf}
                  onClick={() => setActiveTimeframe(tf)}
                  className={`px-2 py-1 rounded transition ${
                    activeTimeframe === tf
                      ? "bg-blue-600 text-white"
                      : "text-gray-400 hover:bg-gray-800"
                  }`}
                >
                  {tf}
                </button>
              ))}
              <button
                onClick={() => setShowTimeframes(!showTimeframes)}
                className="px-1.5 py-1 text-gray-400 hover:text-white transition"
              >
                ▼
              </button>
              {showTimeframes && (
                <div className="absolute top-full right-0 mt-1 bg-[#1A1A1A] border border-gray-700 rounded-lg p-1 z-10 min-w-[60px]">
                  {timeframes.map((tf) => (
                    <button
                      key={tf}
                      onClick={() => {
                        setActiveTimeframe(tf);
                        setShowTimeframes(false);
                      }}
                      className={`block w-full text-left px-3 py-1 text-xs rounded hover:bg-gray-800 transition ${
                        activeTimeframe === tf ? "text-blue-400" : "text-gray-400"
                      }`}
                    >
                      {tf}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* TradingView Chart - CHART ONLY */}
          <div className="flex-1 bg-[#0F1217] p-2 min-h-[250px]">
            <TradingViewChart 
              symbol={`BINANCE:${pair}`} 
              theme="dark" 
              height={450} 
            />
          </div>

          <div className="bg-[#111] px-4 py-1.5 border-t border-gray-800 flex flex-wrap gap-4 text-xs">
            <div>VOL <span className="text-white">108.91</span></div>
            <div>VOL(USDT) <span className="text-white">181.51K</span></div>
            <div>MA5 <span className="text-yellow-400">65,200</span></div>
            <div>MA10 <span className="text-purple-400">65,100</span></div>
            <div>MA20 <span className="text-blue-400">65,000</span></div>
          </div>
        </div>

        {/* RIGHT: Order Book + Spot Section */}
        <div className="w-full lg:w-[440px] xl:w-[480px] flex flex-row bg-[#0A0A0A]">
          {/* Order Book */}
          <div className="w-[120px] flex flex-col border-r border-gray-700">
            <div className="flex border-b border-gray-700 px-2 py-1.5">
              <span className="text-blue-400 border-b-2 border-blue-400 pb-1 text-[10px] font-medium">Order Book</span>
            </div>
            <div className="flex-1 overflow-y-auto px-1.5">
              <div className="grid grid-cols-2 text-[8px] text-gray-500 mb-0.5">
                <div>Price</div>
                <div className="text-right">Amt</div>
              </div>
              {asks.slice(0, 6).map((ask: any, i: number) => (
                <div key={`ask-${i}`} className="grid grid-cols-2 text-[10px] py-0.5 hover:bg-red-500/10 text-red-400">
                  <div>{ask.price}</div>
                  <div className="text-right text-gray-300">{ask.amount}</div>
                </div>
              ))}
              <div className="bg-[#1C1C1C] py-1 text-center border-y border-gray-700 my-0.5">
                <div className="text-xs font-bold text-white">{price.toLocaleString()}</div>
              </div>
              {bids.slice(0, 6).map((bid: any, i: number) => (
                <div key={`bid-${i}`} className="grid grid-cols-2 text-[10px] py-0.5 hover:bg-green-500/10 text-green-400">
                  <div>{bid.price}</div>
                  <div className="text-right text-gray-300">{bid.amount}</div>
                </div>
              ))}
            </div>
          </div>

          {/* SPOT SECTION */}
          <div className="flex-1 flex flex-col bg-[#111] p-3">
            {/* Buy/Sell */}
            <div className="flex rounded-lg overflow-hidden bg-gray-900 mb-2">
              <button
                onClick={() => setSide("buy")}
                className={`flex-1 py-2 text-sm font-bold transition ${
                  side === "buy" ? "bg-green-500 text-black" : "text-gray-400"
                }`}
              >
                Buy
              </button>
              <button
                onClick={() => setSide("sell")}
                className={`flex-1 py-2 text-sm font-bold transition ${
                  side === "sell" ? "bg-red-500 text-white" : "text-gray-400"
                }`}
              >
                Sell
              </button>
            </div>

            {/* Order Type Tabs */}
            <div className="flex items-center gap-1 mb-2 text-xs">
              <button
                onClick={() => setOrderType("limit")}
                className={`px-3 py-1 rounded transition ${
                  orderType === "limit" ? "bg-gray-700 text-white" : "text-gray-400 hover:bg-gray-800"
                }`}
              >
                Limit
              </button>
              <button
                onClick={() => setOrderType("market")}
                className={`px-3 py-1 rounded transition ${
                  orderType === "market" ? "bg-gray-700 text-white" : "text-gray-400 hover:bg-gray-800"
                }`}
              >
                Market
              </button>
              <button
                onClick={() => setOrderType("tpSl")}
                className={`px-3 py-1 rounded transition ${
                  orderType === "tpSl" ? "bg-gray-700 text-white" : "text-gray-400 hover:bg-gray-800"
                }`}
              >
                TP/SL
              </button>
              <div className="ml-auto flex items-center gap-2">
                <span className="text-[10px] text-gray-500">TP/SL</span>
                <button
                  onClick={() => setShowTPSL(!showTPSL)}
                  className={`w-8 h-4 rounded-full transition ${
                    showTPSL ? "bg-blue-500" : "bg-gray-700"
                  }`}
                >
                  <div className={`w-3 h-3 bg-white rounded-full transition transform ${
                    showTPSL ? "translate-x-4" : "translate-x-0.5"
                  }`} />
                </button>
              </div>
            </div>

            {/* Price */}
            <div className="mb-1.5">
              <div className="flex justify-between text-[10px] text-gray-500">
                <span>Price (USDT)</span>
                <span>Available <span className="text-white">0.0142 USDT</span></span>
              </div>
              <input
                type="text"
                defaultValue={price.toLocaleString()}
                className="w-full bg-gray-900 border border-gray-700 rounded px-2 py-2 text-sm text-white focus:outline-none focus:border-blue-500"
              />
            </div>

            {/* Amount */}
            <div className="mb-1.5">
              <div className="text-[10px] text-gray-500">Amount</div>
              <input
                type="text"
                placeholder="0"
                className="w-full bg-gray-900 border border-gray-700 rounded px-2 py-2 text-sm text-white focus:outline-none focus:border-blue-500"
              />
            </div>

            {/* Quick % */}
            <div className="flex gap-1 text-xs">
              {[0, 25, 50, 75, 100].map((p) => (
                <button key={p} className="flex-1 py-1 bg-gray-800 rounded hover:bg-gray-700 text-xs">
                  {p}%
                </button>
              ))}
            </div>

            {/* Total */}
            <div className="text-[10px] text-gray-500 mt-1">Total (USDT) <span className="text-white">0</span></div>

            {/* TP/SL Boxes */}
            {showTPSL && (
              <div className="mt-2 space-y-1.5 border-t border-gray-700 pt-2">
                <div>
                  <div className="text-[10px] text-gray-500">TP trigger price (USDT)</div>
                  <input
                    type="text"
                    placeholder="66,000"
                    className="w-full bg-gray-900 border border-gray-700 rounded px-2 py-1.5 text-sm text-white focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div>
                  <div className="text-[10px] text-gray-500">SL trigger price (USDT)</div>
                  <input
                    type="text"
                    placeholder="64,500"
                    className="w-full bg-gray-900 border border-gray-700 rounded px-2 py-1.5 text-sm text-white focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>
            )}

            {/* Trade Button */}
            <button
              onClick={() => {
                const inputs = document.querySelectorAll('input[type="text"]');
                const priceInput = inputs[0] as HTMLInputElement;
                const amountInput = inputs[1] as HTMLInputElement;
                const p = parseFloat(priceInput?.value.replace(/,/g, "") || "0");
                const a = parseFloat(amountInput?.value || "0");
                if (p > 0 && a > 0) {
                  placeOrder(side, p, a);
                } else {
                  alert("Please enter valid price and amount");
                }
              }}
              className={`w-full mt-2 py-3 rounded-xl text-base font-bold transition ${
                side === "buy"
                  ? "bg-green-500 hover:bg-green-600 text-black"
                  : "bg-red-500 hover:bg-red-600 text-white"
              }`}
            >
              {side === "buy" ? `Buy ${displaySymbol}` : `Sell ${displaySymbol}`}
            </button>

            <div className="text-[10px] text-gray-500 text-center mt-1">
              Highest Bid <span className="text-green-400">65,400 USDT</span>
            </div>
          </div>
        </div>
      </div>

      {/* ===== BOTTOM TABS ===== */}
      <div className="bg-[#0F1117] border-t border-gray-700 px-4 py-2 flex flex-wrap items-center justify-between text-sm">
        <div className="flex gap-4 overflow-x-auto">
          <span className="text-blue-400 border-b-2 border-blue-400 pb-1 whitespace-nowrap">Open Orders(0)</span>
          <span className="text-gray-400 whitespace-nowrap">Order History</span>
          <span className="text-gray-400 whitespace-nowrap">Trade History</span>
          <span className="text-gray-400 whitespace-nowrap">Holdings(1)</span>
        </div>
        <div className="flex items-center gap-4 text-xs text-gray-500">
          <span>Maker 0.0000% / Taker 0.0400%</span>
          <button className="bg-blue-600 hover:bg-blue-500 px-4 py-1 rounded-full text-white text-sm font-medium">
            Deposit
          </button>
        </div>
      </div>
    </div>
  );
}
