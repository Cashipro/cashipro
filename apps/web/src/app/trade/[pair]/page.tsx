"use client";

import React, { useState, useEffect } from "react";

// ===== MOCK DATA =====
const mockCoins = [
  { symbol: "BTC", name: "Bitcoin", price: 68492.34, change: 2.34, volume: "1.24B" },
  { symbol: "ETH", name: "Ethereum", price: 3421.45, change: -1.23, volume: "892M" },
  { symbol: "SOL", name: "Solana", price: 142.67, change: 5.67, volume: "456M" },
  { symbol: "BNB", name: "BNB", price: 578.23, change: 0.89, volume: "234M" },
  { symbol: "XRP", name: "Ripple", price: 0.62, change: -2.01, volume: "280M" },
  { symbol: "ADA", name: "Cardano", price: 0.46, change: 3.45, volume: "210M" },
  { symbol: "DOGE", name: "Dogecoin", price: 0.15, change: 12.3, volume: "680M" },
  { symbol: "DOT", name: "Polkadot", price: 7.82, change: -0.56, volume: "180M" },
];

const orderBookData = {
  asks: [
    { price: 1.6699, amount: 1462.09 },
    { price: 1.6698, amount: 151.95 },
    { price: 1.6695, amount: 288.71 },
    { price: 1.6690, amount: 263.03 },
    { price: 1.6687, amount: 279.26 },
  ],
  bids: [
    { price: 1.6666, amount: 759.70 },
    { price: 1.6665, amount: 269.46 },
    { price: 1.6663, amount: 256.93 },
    { price: 1.6658, amount: 1242.57 },
    { price: 1.6653, amount: 273.24 },
  ],
};

export default function SpotTradingPage() {
  const [selectedCoin, setSelectedCoin] = useState(mockCoins[0]);
  const [side, setSide] = useState<"buy" | "sell">("buy");
  const [orderType, setOrderType] = useState<"limit" | "market">("limit");
  const [price, setPrice] = useState(selectedCoin.price);
  const [amount, setAmount] = useState(0);
  const [showTPSL, setShowTPSL] = useState(false);

  const total = price * amount;

  // ===== REAL-TIME PRICE UPDATE =====
  useEffect(() => {
    const interval = setInterval(() => {
      setSelectedCoin((prev) => ({
        ...prev,
        price: prev.price * (1 + (Math.random() - 0.5) * 0.001),
      }));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

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
          <div className="hidden md:flex bg-gray-900 px-3 py-1.5 rounded-full text-sm text-gray-400">🔍 ONDO</div>
          <Link href="/login" className="text-sm text-gray-300 hover:text-white hidden md:block">Log In</Link>
          <Link href="/register">
            <button className="bg-yellow-500 text-black px-4 py-1.5 rounded-full text-sm font-medium hover:bg-yellow-400">
              Sign Up
            </button>
          </Link>
          <button className="md:hidden text-2xl text-white">☰</button>
        </div>
      </div>

      {/* ===== COIN SELECTOR ===== */}
      <div className="bg-[#111] border-b border-gray-700 px-4 py-2 flex flex-wrap items-center gap-2">
        {mockCoins.map((coin) => (
          <button
            key={coin.symbol}
            onClick={() => {
              setSelectedCoin(coin);
              setPrice(coin.price);
            }}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition ${
              selectedCoin.symbol === coin.symbol
                ? "bg-yellow-500/20 text-yellow-400 border border-yellow-500/50"
                : "bg-[#2b2d33] text-gray-400 hover:text-white"
            }`}
          >
            {coin.symbol}/USDT
          </button>
        ))}
      </div>

      {/* ===== PAIR HEADER ===== */}
      <div className="bg-[#111] border-b border-gray-700 px-4 md:px-6 py-3 flex flex-wrap items-center gap-4 md:gap-8">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-yellow-500 rounded-xl flex items-center justify-center text-xl font-bold text-black">
            {selectedCoin.symbol.slice(0, 2)}
          </div>
          <div>
            <div className="text-2xl font-bold text-white">{selectedCoin.symbol}/USDT</div>
            <div className="text-xs text-gray-500">{selectedCoin.name}</div>
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-6 md:gap-10">
          <div>
            <span className="text-3xl font-mono font-bold text-white">
              ${selectedCoin.price.toFixed(2)}
            </span>
            <span className={`ml-2 text-lg font-medium ${
              selectedCoin.change >= 0 ? "text-green-500" : "text-red-500"
            }`}>
              {selectedCoin.change >= 0 ? "+" : ""}{selectedCoin.change}%
            </span>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-1 text-sm">
            <div><span className="text-gray-500">24H High</span> <span className="text-white">{(selectedCoin.price * 1.02).toFixed(2)}</span></div>
            <div><span className="text-gray-500">24H Low</span> <span className="text-white">{(selectedCoin.price * 0.98).toFixed(2)}</span></div>
            <div><span className="text-gray-500">24H Vol</span> <span className="text-white">{selectedCoin.volume}</span></div>
          </div>
        </div>
      </div>

      {/* ===== MAIN LAYOUT ===== */}
      <div className="flex flex-col lg:flex-row h-[calc(100vh-180px)]">
        {/* LEFT: Chart */}
        <div className="flex-1 flex flex-col min-w-0 border-r border-gray-800">
          <div className="border-b border-gray-800 px-4 py-2 flex items-center gap-4 text-sm">
            <span className="text-yellow-400 border-b-2 border-yellow-400 pb-2">Chart</span>
            <span className="text-gray-400">Info</span>
            <span className="text-gray-400">Trading Data</span>
          </div>

          {/* Chart Placeholder */}
          <div className="flex-1 bg-[#0F1217] flex items-center justify-center min-h-[250px]">
            <div className="text-center">
              <div className="text-5xl mb-3 opacity-20">📈</div>
              <p className="text-gray-500 text-base">{selectedCoin.symbol}/USDT Chart</p>
              <p className="text-xs text-gray-600 mt-1">MA5 • MA10 • MA20 • Volume</p>
            </div>
          </div>

          <div className="bg-[#111] px-4 py-1.5 border-t border-gray-800 flex flex-wrap gap-4 text-xs">
            <div>VOL <span className="text-white">108.91</span></div>
            <div>MA5 <span className="text-yellow-400">65,200</span></div>
            <div>MA10 <span className="text-purple-400">65,100</span></div>
            <div>MA20 <span className="text-blue-400">65,000</span></div>
          </div>
        </div>

        {/* RIGHT: Order Book + Spot Section */}
        <div className="w-full lg:w-[440px] xl:w-[480px] flex flex-col bg-[#0A0A0A]">
          {/* Order Book */}
          <div className="flex-1 flex flex-col min-h-[200px] border-b border-gray-700">
            <div className="flex border-b border-gray-700 px-4 py-2">
              <span className="text-yellow-400 border-b-2 border-yellow-400 pb-2 text-sm font-medium">Order Book</span>
              <span className="text-gray-400 ml-6 text-sm">Market Trades</span>
              <div className="ml-auto text-xs text-gray-500">0.0001 ▼</div>
            </div>

            <div className="flex-1 overflow-y-auto px-3">
              {/* Asks */}
              <div className="pt-2">
                <div className="grid grid-cols-3 text-xs text-gray-500 mb-1">
                  <div>Price (USDT)</div>
                  <div className="text-right">Amount</div>
                  <div className="text-right">Total</div>
                </div>
                {orderBookData.asks.map((item, i) => (
                  <div key={`ask-${i}`} className="grid grid-cols-3 text-sm py-0.5 hover:bg-red-500/10 text-red-400">
                    <div>{item.price}</div>
                    <div className="text-right text-gray-300">{item.amount}</div>
                    <div className="text-right text-gray-300">{(item.price * item.amount).toFixed(2)}</div>
                  </div>
                ))}
              </div>

              <div className="bg-[#1C1C1C] py-3 text-center border-y border-gray-700 my-1">
                <div className="text-2xl font-bold text-white">{selectedCoin.price.toFixed(4)}</div>
                <div className={`text-sm font-medium ${selectedCoin.change >= 0 ? "text-green-500" : "text-red-500"}`}>
                  {selectedCoin.change >= 0 ? "↑" : "↓"} ${selectedCoin.price.toFixed(2)}
                </div>
              </div>

              {/* Bids */}
              <div className="pb-2">
                {orderBookData.bids.map((item, i) => (
                  <div key={`bid-${i}`} className="grid grid-cols-3 text-sm py-0.5 hover:bg-green-500/10 text-green-400">
                    <div>{item.price}</div>
                    <div className="text-right text-gray-300">{item.amount}</div>
                    <div className="text-right text-gray-300">{(item.price * item.amount).toFixed(2)}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ===== SPOT SECTION ===== */}
          <div className="bg-[#111] p-4">
            {/* Buy/Sell */}
            <div className="flex rounded-lg overflow-hidden bg-gray-900 mb-3">
              <button
                onClick={() => setSide("buy")}
                className={`flex-1 py-2.5 text-sm font-bold transition ${
                  side === "buy" ? "bg-green-500 text-black" : "text-gray-400"
                }`}
              >
                Buy
              </button>
              <button
                onClick={() => setSide("sell")}
                className={`flex-1 py-2.5 text-sm font-bold transition ${
                  side === "sell" ? "bg-red-500 text-white" : "text-gray-400"
                }`}
              >
                Sell
              </button>
            </div>

            {/* Order Type Tabs */}
            <div className="flex items-center gap-1 mb-3 text-xs">
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

              {/* TP/SL Toggle */}
              <div className="ml-auto flex items-center gap-2">
                <span className="text-[10px] text-gray-500">TP/SL</span>
                <button
                  onClick={() => setShowTPSL(!showTPSL)}
                  className={`w-8 h-4 rounded-full transition ${
                    showTPSL ? "bg-yellow-500" : "bg-gray-700"
                  }`}
                >
                  <div
                    className={`w-3 h-3 bg-white rounded-full transition transform ${
                      showTPSL ? "translate-x-4" : "translate-x-0.5"
                    }`}
                  />
                </button>
              </div>
            </div>

            {/* Price */}
            <div className="mb-2">
              <div className="flex justify-between text-[10px] text-gray-500">
                <span>Price (USDT)</span>
                <span>Available <span className="text-white">0.0142 USDT</span></span>
              </div>
              <input
                type="number"
                value={price}
                onChange={(e) => setPrice(parseFloat(e.target.value))}
                className="w-full bg-gray-900 border border-gray-700 rounded px-2 py-2 text-sm text-white focus:outline-none focus:border-yellow-500"
              />
            </div>

            {/* Amount */}
            <div className="mb-2">
              <div className="text-[10px] text-gray-500">Amount</div>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(parseFloat(e.target.value))}
                placeholder="0"
                className="w-full bg-gray-900 border border-gray-700 rounded px-2 py-2 text-sm text-white focus:outline-none focus:border-yellow-500"
              />
            </div>

            {/* Quick % buttons */}
            <div className="flex gap-1 text-xs mb-1">
              {[0, 25, 50, 75, 100].map((p) => (
                <button
                  key={p}
                  onClick={() => setAmount((100 * p) / 100)}
                  className="flex-1 py-1 bg-gray-800 rounded hover:bg-gray-700 text-xs"
                >
                  {p}%
                </button>
              ))}
            </div>

            {/* Total */}
            <div className="text-[10px] text-gray-500 mt-1">
              Total (USDT) <span className="text-white font-bold">${total.toFixed(2)}</span>
            </div>

            {/* TP/SL Boxes */}
            {showTPSL && (
              <div className="mt-2 space-y-1.5 border-t border-gray-700 pt-2">
                <div>
                  <div className="text-[10px] text-gray-500">TP trigger price (USDT)</div>
                  <input
                    type="text"
                    placeholder="66,000"
                    className="w-full bg-gray-900 border border-gray-700 rounded px-2 py-1.5 text-sm text-white focus:outline-none focus:border-yellow-500"
                  />
                </div>
                <div>
                  <div className="text-[10px] text-gray-500">SL trigger price (USDT)</div>
                  <input
                    type="text"
                    placeholder="64,500"
                    className="w-full bg-gray-900 border border-gray-700 rounded px-2 py-1.5 text-sm text-white focus:outline-none focus:border-yellow-500"
                  />
                </div>
              </div>
            )}

            {/* Trade Button */}
            <button
              onClick={() => alert(`${side === "buy" ? "Buy" : "Sell"} ${selectedCoin.symbol} @ $${price}`)}
              className={`w-full mt-2 py-3 rounded-xl text-base font-bold transition ${
                side === "buy"
                  ? "bg-green-500 hover:bg-green-600 text-black"
                  : "bg-red-500 hover:bg-red-600 text-white"
              }`}
            >
              {side === "buy" ? "Buy" : "Sell"} {selectedCoin.symbol}
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
          <span className="text-yellow-400 border-b-2 border-yellow-400 pb-1 whitespace-nowrap">Open Orders(0)</span>
          <span className="text-gray-400 whitespace-nowrap">Order History</span>
          <span className="text-gray-400 whitespace-nowrap">Trade History</span>
          <span className="text-gray-400 whitespace-nowrap">Holdings(1)</span>
        </div>
        <div className="flex items-center gap-4 text-xs text-gray-500">
          <span>Maker 0.0000% / Taker 0.0400%</span>
          <button className="bg-yellow-500 hover:bg-yellow-400 px-4 py-1 rounded-full text-black text-sm font-medium">
            Deposit
          </button>
        </div>
      </div>
    </div>
  );
}
