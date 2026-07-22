"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";

export default function CashiProTradePage() {
  const params = useParams();
  const pair = (params.pair as string) || "BTCUSDT";
  
  const [activeTimeframe, setActiveTimeframe] = useState("15m");
  const [side, setSide] = useState<"buy" | "sell">("buy");
  const [orderMode, setOrderMode] = useState<"limit" | "market" | "tpSl">("limit");

  const currentPrice = 1.6667;
  const priceChange = 0.59;

  const orderBookAsks = [
    { price: 1.6699, amount: 1462.09, total: 2441.54 },
    { price: 1.6698, amount: 151.95, total: 253.72 },
    { price: 1.6695, amount: 288.71, total: 482.00 },
    { price: 1.6690, amount: 263.03, total: 438.99 },
    { price: 1.6687, amount: 279.26, total: 466.00 },
  ];

  const orderBookBids = [
    { price: 1.6666, amount: 1462.09, total: 2441.54 },
    { price: 1.6665, amount: 151.95, total: 253.72 },
    { price: 1.6663, amount: 288.71, total: 482.00 },
    { price: 1.6658, amount: 263.03, total: 438.99 },
    { price: 1.6653, amount: 279.26, total: 466.00 },
  ];

  const timeframes = ["1m", "5m", "15m", "30m", "1H", "4H", "1D"];

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white font-sans">
      {/* Top Nav - CashiPro Branding */}
      <div className="bg-black border-b border-gray-800 px-4 py-2 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-yellow-500 rounded flex items-center justify-center text-xl font-bold text-black">C</div>
            <span className="font-bold text-2xl text-white">CashiPro</span>
          </Link>

          <nav className="hidden md:flex items-center gap-6 text-sm">
            <Link href="/markets" className="text-gray-400 hover:text-yellow-400">Markets</Link>
            <Link href="/trade/BTCUSDT" className="text-yellow-400 border-b-2 border-yellow-400 pb-1">Spot</Link>
            <Link href="/futures" className="text-gray-400 hover:text-yellow-400">Futures</Link>
            <Link href="/earn" className="text-gray-400 hover:text-yellow-400">Earn</Link>
            <Link href="/events" className="text-gray-400 hover:text-yellow-400">Event Center</Link>
            <Link href="/rewards" className="text-gray-400 hover:text-yellow-400">Rewards Hub</Link>
          </nav>
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden md:flex bg-gray-900 rounded px-3 py-1 text-sm text-gray-300">🔍 ONDO</div>
          <Link href="/login" className="text-sm text-gray-300 hover:text-white hidden md:block">Wallets</Link>
          <Link href="/login">
            <div className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center hover:bg-gray-600 cursor-pointer">👤</div>
          </Link>
          <button className="md:hidden text-2xl text-white">☰</button>
        </div>
      </div>

      {/* Pair Header */}
      <div className="bg-[#111111] border-b border-gray-700 px-6 py-4 flex flex-wrap items-center gap-6 md:gap-10">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-yellow-500 rounded-2xl flex items-center justify-center text-3xl text-black">C</div>
          <div>
            <div className="text-3xl font-bold text-white">{pair}</div>
            <div className="text-gray-400 text-sm">CashiPro Token</div>
          </div>
        </div>

        <div className="flex flex-wrap gap-6 md:gap-12">
          <div>
            <div className="text-4xl font-mono font-semibold text-green-400">
              {currentPrice.toFixed(4)}
            </div>
            <div className="text-green-400">+{priceChange}%</div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 text-sm">
            <div>
              <div className="text-gray-500 text-xs">24H High</div>
              <div className="text-white">1.6700</div>
            </div>
            <div>
              <div className="text-gray-500 text-xs">24H Low</div>
              <div className="text-white">1.6537</div>
            </div>
            <div>
              <div className="text-gray-500 text-xs">24H Volume</div>
              <div className="text-white">1.15M</div>
            </div>
            <div>
              <div className="text-gray-500 text-xs">24H Amount</div>
              <div className="text-white">1.91M</div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Layout */}
      <div className="flex flex-col lg:flex-row h-[calc(100vh-180px)]">
        {/* Chart Area */}
        <div className="flex-1 flex flex-col border-r border-gray-800">
          {/* Chart Tabs */}
          <div className="flex flex-wrap items-center justify-between border-b border-gray-800 px-4 md:px-6 py-3 gap-2">
            <div className="flex gap-4 md:gap-8 text-sm">
              <span className="text-yellow-400 border-b-2 border-yellow-400 pb-3">Chart</span>
              <span className="text-gray-400">Info</span>
              <span className="text-gray-400">Trading Data</span>
            </div>

            <div className="flex flex-wrap gap-1 text-sm">
              {timeframes.map((tf) => (
                <button
                  key={tf}
                  onClick={() => setActiveTimeframe(tf)}
                  className={`px-2 md:px-3 py-1 rounded text-xs md:text-sm ${
                    activeTimeframe === tf ? "bg-yellow-500 text-black" : "hover:bg-gray-800 text-gray-400"
                  }`}
                >
                  {tf}
                </button>
              ))}
            </div>
          </div>

          {/* Chart */}
          <div className="flex-1 bg-[#0F1217] relative p-4 min-h-[200px]">
            <div className="absolute inset-0 flex items-center justify-center text-gray-600 text-2xl">
              📊 {pair} Candlestick Chart (Live)
            </div>
            
            <div className="absolute bottom-12 left-10 right-10 h-[280px] border border-gray-700 rounded">
              <div className="h-full w-full bg-gradient-to-t from-green-500/10 to-transparent relative overflow-hidden">
                <div className="absolute bottom-10 left-[20%] w-6 h-32 bg-green-500"></div>
                <div className="absolute bottom-20 left-[30%] w-6 h-24 bg-red-500"></div>
                <div className="absolute bottom-12 left-[45%] w-6 h-40 bg-green-500"></div>
                <div className="absolute bottom-8 left-[55%] w-6 h-28 bg-green-500"></div>
                <div className="absolute bottom-24 left-[70%] w-6 h-[220px] bg-green-500"></div>
              </div>
            </div>
          </div>

          {/* Bottom Indicators */}
          <div className="bg-[#111] p-3 text-xs border-t border-gray-700 flex flex-wrap gap-4 md:gap-8">
            <div>VOL <span className="text-white">81.3700</span></div>
            <div>VOL(USDT) <span className="text-white">135.6166K</span></div>
            <div>MA5 <span className="text-yellow-400">1.6674</span></div>
            <div>MA10 <span className="text-purple-400">1.6679</span></div>
            <div>MA20 <span className="text-blue-400">1.6652</span></div>
          </div>
        </div>

        {/* Right Panel - Order Book + Trade */}
        <div className="w-full lg:w-[420px] flex flex-col border-l border-gray-800 bg-[#0A0A0A]">
          {/* Order Book */}
          <div className="flex-1 overflow-auto">
            <div className="px-4 py-3 border-b border-gray-700 flex items-center justify-between">
              <div className="flex gap-6">
                <span className="text-yellow-400 font-medium">Order Book</span>
                <span className="text-gray-400">Market Trades</span>
              </div>
            </div>

            {/* Asks */}
            <div className="px-4 pt-2 text-red-400 text-sm">
              <div className="grid grid-cols-3 text-xs text-gray-500 mb-1">
                <div>Price (USDT)</div>
                <div className="text-right">Amount</div>
                <div className="text-right">Total</div>
              </div>
              {orderBookAsks.map((item, i) => (
                <div key={i} className="grid grid-cols-3 py-1 hover:bg-gray-900">
                  <div>{item.price}</div>
                  <div className="text-right text-gray-400">{item.amount}</div>
                  <div className="text-right text-gray-400">{item.total}</div>
                </div>
              ))}
            </div>

            <div className="bg-[#1A1A1A] py-4 text-center text-2xl font-bold border-y border-gray-700 text-white">
              {currentPrice.toFixed(4)} <span className="text-green-400 text-xl">↑</span>
            </div>

            {/* Bids */}
            <div className="px-4 pb-2 text-green-400 text-sm">
              {orderBookBids.map((item, i) => (
                <div key={i} className="grid grid-cols-3 py-1 hover:bg-gray-900">
                  <div>{item.price}</div>
                  <div className="text-right text-gray-400">{item.amount}</div>
                  <div className="text-right text-gray-400">{item.total}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Trade Panel */}
          <div className="border-t border-gray-700 bg-[#111] p-4">
            <div className="flex gap-px bg-gray-900 rounded-lg p-1 mb-4">
              <button
                onClick={() => setSide("buy")}
                className={`flex-1 py-3 rounded-lg font-semibold ${
                  side === "buy" ? "bg-green-500 text-black" : "text-gray-400"
                }`}
              >
                Buy
              </button>
              <button
                onClick={() => setSide("sell")}
                className={`flex-1 py-3 rounded-lg font-semibold ${
                  side === "sell" ? "bg-red-500 text-white" : "text-gray-400"
                }`}
              >
                Sell
              </button>
            </div>

            <div className="flex gap-2 mb-4 text-sm">
              {["limit", "market", "tpSl"].map((mode) => (
                <button
                  key={mode}
                  onClick={() => setOrderMode(mode as any)}
                  className={`flex-1 py-2 rounded ${
                    orderMode === mode ? "bg-gray-700 text-white" : "text-gray-400 hover:bg-gray-800"
                  }`}
                >
                  {mode === "tpSl" ? "TP/SL" : mode.charAt(0).toUpperCase() + mode.slice(1)}
                </button>
              ))}
            </div>

            <div className="space-y-4">
              <div>
                <div className="text-xs text-gray-500 mb-1">Price (USDT)</div>
                <input
                  type="text"
                  value={currentPrice.toFixed(4)}
                  className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 font-mono text-white"
                />
              </div>

              <div>
                <div className="text-xs text-gray-500 mb-1">Amount</div>
                <input
                  type="text"
                  placeholder="0"
                  className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 font-mono text-white"
                />
              </div>

              <div className="h-2 bg-gray-700 rounded-full relative">
                <div className="absolute left-0 top-0 h-2 bg-green-500 rounded-full w-1/3"></div>
              </div>

              <button
                className={`w-full py-4 rounded-2xl text-lg font-bold ${
                  side === "buy"
                    ? "bg-green-500 hover:bg-green-600 text-black"
                    : "bg-red-500 hover:bg-red-600 text-white"
                }`}
              >
                {side === "buy" ? `Buy ${pair.replace("USDT", "")}` : `Sell ${pair.replace("USDT", "")}`}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="h-52 bg-[#0F1117] border-t border-gray-700 p-4 flex flex-col">
        <div className="flex gap-4 md:gap-8 border-b border-gray-700 pb-3 text-sm overflow-x-auto">
          <span className="border-b-2 border-yellow-400 pb-3 text-yellow-400 whitespace-nowrap">Open Orders(0)</span>
          <span className="text-gray-400 whitespace-nowrap">Order History</span>
          <span className="text-gray-400 whitespace-nowrap">Trade History</span>
          <span className="text-gray-400 whitespace-nowrap">Holdings(1)</span>
        </div>
        <div className="flex-1 flex items-center justify-center flex-col text-gray-500">
          <p>Deposit now to start your trading journey</p>
          <Link href="/deposit">
            <button className="mt-4 bg-yellow-500 hover:bg-yellow-400 px-8 py-3 rounded-full text-black font-semibold">
              Deposit
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
