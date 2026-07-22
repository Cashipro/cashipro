"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";

export default function CashiproSpotTrading() {
  const params = useParams();
  const pair = (params.pair as string) || "BTCUSDT";
  const displaySymbol = pair.replace("USDT", "");

  const [side, setSide] = useState<"buy" | "sell">("buy");
  const [orderMode, setOrderMode] = useState<"limit" | "market" | "tpSl">("limit");
  const [activeTimeframe, setActiveTimeframe] = useState("15m");

  const currentPrice = 1.6667;
  const priceChange = 0.59;

  const orderBookAsks = [
    { price: 1.6699, amount: "1,462.09", total: "2,441.54" },
    { price: 1.6698, amount: "151.95", total: "253.72" },
    { price: 1.6695, amount: "288.71", total: "482.00" },
    { price: 1.6690, amount: "263.03", total: "438.99" },
    { price: 1.6687, amount: "279.26", total: "466.00" },
  ];

  const orderBookBids = [
    { price: 1.6666, amount: "759.70", total: "1,266.04" },
    { price: 1.6665, amount: "269.46", total: "449.00" },
    { price: 1.6663, amount: "256.93", total: "427.99" },
    { price: 1.6658, amount: "1,242.57", total: "2,069.25" },
    { price: 1.6653, amount: "273.24", total: "454.99" },
  ];

  const timeframes = ["1m", "5m", "15m", "30m", "1H", "4H", "1D"];

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white font-sans">
      {/* Top Nav - CashiPro */}
      <div className="bg-black border-b border-gray-800 px-4 py-2 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-blue-500 rounded-xl flex items-center justify-center text-xl font-bold">C</div>
            <span className="font-bold text-2xl tracking-tight text-white">CashiPro</span>
          </Link>

          <nav className="hidden md:flex items-center gap-6 text-sm">
            <Link href="/markets" className="text-gray-400 hover:text-purple-400">Markets</Link>
            <Link href="/trade/BTCUSDT" className="text-purple-400">Spot</Link>
            <Link href="/futures" className="text-gray-400 hover:text-purple-400">Futures</Link>
            <Link href="/earn" className="text-gray-400 hover:text-purple-400">Earn</Link>
          </nav>
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden md:flex bg-gray-900 px-4 py-1.5 rounded-full text-sm text-gray-300">🔍 Search</div>
          <Link href="/login" className="text-sm text-gray-300 hover:text-white hidden md:block">Wallets</Link>
          <Link href="/login">
            <div className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center cursor-pointer hover:bg-gray-600">👤</div>
          </Link>
          <button className="md:hidden text-2xl text-white">☰</button>
        </div>
      </div>

      {/* Pair Header */}
      <div className="bg-[#111] border-b border-gray-700 px-6 py-4 flex flex-wrap items-center gap-6 md:gap-8">
        <div className="flex items-center gap-4">
          <div className="w-11 h-11 bg-gradient-to-br from-purple-500 to-blue-500 rounded-2xl flex items-center justify-center text-2xl font-bold text-white">
            {displaySymbol.slice(0, 2)}
          </div>
          <div>
            <div className="text-3xl font-bold text-white">{pair}</div>
            <div className="text-sm text-gray-400">{displaySymbol} Token</div>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-6 md:gap-12 text-lg">
          <div>
            <span className="text-4xl font-mono text-white">{currentPrice.toFixed(4)}</span>
            <span className="text-green-400 ml-3 text-xl">+{priceChange}%</span>
          </div>
          <div className="text-sm space-x-4 md:space-x-8">
            <span className="text-gray-400">24H High <span className="font-mono text-white">1.6700</span></span>
            <span className="text-gray-400">24H Low <span className="font-mono text-white">1.6537</span></span>
            <span className="text-gray-400">Vol <span className="font-mono text-white">1.15M</span></span>
          </div>
        </div>
      </div>

      {/* Main Layout */}
      <div className="flex flex-col lg:flex-row h-[calc(100vh-135px)]">
        {/* Chart Area - Left Side */}
        <div className="flex-[2] flex flex-col border-r border-gray-800">
          <div className="px-6 py-3 border-b border-gray-800 flex flex-wrap items-center justify-between gap-2">
            <div className="flex gap-4 md:gap-8">
              <span className="text-purple-400 border-b-2 border-purple-400 pb-3">Chart</span>
              <span className="text-gray-400">Info</span>
              <span className="text-gray-400">Trading Data</span>
            </div>

            <div className="flex flex-wrap gap-1 text-sm">
              {timeframes.map((t) => (
                <button
                  key={t}
                  onClick={() => setActiveTimeframe(t)}
                  className={`px-3 md:px-4 py-1 rounded cursor-pointer text-xs md:text-sm ${
                    activeTimeframe === t
                      ? "bg-purple-500 text-white"
                      : "hover:bg-gray-800 text-gray-400"
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          {/* Chart Placeholder */}
          <div className="flex-1 bg-[#0C0F14] relative flex items-center justify-center min-h-[200px]">
            <div className="text-center">
              <div className="text-7xl mb-6 opacity-20">📈</div>
              <p className="text-gray-500 text-xl">{pair} {activeTimeframe} Chart</p>
              <p className="text-xs text-gray-600 mt-2">Candlestick + MA5, MA10, MA20</p>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE - Order Book + Trade Panel */}
        <div className="w-full lg:w-[460px] flex flex-col bg-[#0A0A0A] border-l border-gray-800">
          
          {/* Order Book */}
          <div className="flex-1 overflow-hidden flex flex-col">
            <div className="px-4 py-3 border-b border-gray-700 flex items-center">
              <div className="text-purple-400 font-medium">Order Book</div>
              <div className="ml-auto text-xs text-gray-400">0.0001 ▼</div>
            </div>

            {/* Asks (Sell) */}
            <div className="px-4 text-xs bg-[#111] pt-2">
              <div className="grid grid-cols-3 text-gray-500 mb-1 text-[10px]">
                <div>Price (USDT)</div>
                <div className="text-right">Amount</div>
                <div className="text-right">Total</div>
              </div>
              {orderBookAsks.map((item, i) => (
                <div key={i} className="grid grid-cols-3 py-[3px] text-sm hover:bg-red-500/10 text-red-400">
                  <div>{item.price}</div>
                  <div className="text-right text-gray-300">{item.amount}</div>
                  <div className="text-right text-gray-300">{item.total}</div>
                </div>
              ))}
            </div>

            {/* Current Price */}
            <div className="bg-[#1C1C1C] py-5 text-center border-y border-gray-700">
              <div className="text-3xl font-bold text-white">{currentPrice.toFixed(4)}</div>
              <div className="text-green-400 text-sm">↑ $1.66</div>
            </div>

            {/* Bids (Buy) */}
            <div className="px-4 text-xs flex-1 overflow-auto">
              {orderBookBids.map((item, i) => (
                <div key={i} className="grid grid-cols-3 py-[3px] text-sm hover:bg-green-500/10 text-green-400">
                  <div>{item.price}</div>
                  <div className="text-right text-gray-300">{item.amount}</div>
                  <div className="text-right text-gray-300">{item.total}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Trading Panel */}
          <div className="border-t border-gray-700 bg-[#111] p-4 md:p-5">
            <div className="flex rounded-xl overflow-hidden mb-4 bg-gray-900">
              <button
                onClick={() => setSide("buy")}
                className={`flex-1 py-3 text-lg font-bold ${
                  side === "buy" ? "bg-green-500 text-black" : "text-gray-400"
                }`}
              >
                Buy
              </button>
              <button
                onClick={() => setSide("sell")}
                className={`flex-1 py-3 text-lg font-bold ${
                  side === "sell" ? "bg-red-500 text-white" : "text-gray-400"
                }`}
              >
                Sell
              </button>
            </div>

            <div className="flex gap-2 mb-5 text-sm">
              {["limit", "market", "tpSl"].map((mode) => (
                <button
                  key={mode}
                  onClick={() => setOrderMode(mode as any)}
                  className={`flex-1 py-2 rounded-lg transition ${
                    orderMode === mode ? "bg-gray-700 text-white" : "text-gray-400 hover:bg-gray-800"
                  }`}
                >
                  {mode === "tpSl" ? "TP/SL" : mode.charAt(0).toUpperCase() + mode.slice(1)}
                </button>
              ))}
            </div>

            <div className="space-y-5">
              <div>
                <div className="text-xs text-gray-400 mb-2">Price (USDT)</div>
                <input
                  type="text"
                  defaultValue={currentPrice.toFixed(4)}
                  className="w-full bg-gray-900 border border-gray-700 rounded-xl px-4 py-3 font-mono text-lg text-white focus:outline-none focus:border-purple-500"
                />
              </div>

              <div>
                <div className="text-xs text-gray-400 mb-2">Amount</div>
                <input
                  type="text"
                  placeholder="0.00"
                  className="w-full bg-gray-900 border border-gray-700 rounded-xl px-4 py-3 font-mono text-lg text-white focus:outline-none focus:border-purple-500"
                />
              </div>

              <div className="pt-2">
                <button
                  className={`w-full py-4 rounded-2xl text-xl font-bold transition-all ${
                    side === "buy"
                      ? "bg-green-500 hover:bg-green-600 text-black"
                      : "bg-red-500 hover:bg-red-600 text-white"
                  }`}
                >
                  {side === "buy" ? `Buy ${displaySymbol}` : `Sell ${displaySymbol}`}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
