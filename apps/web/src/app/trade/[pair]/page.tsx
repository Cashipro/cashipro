"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";

export default function MexcStyleTradePage() {
  const params = useParams();
  const pair = (params.pair as string) || "MXUSDT";
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
    { price: 1.6682, amount: "240.84", total: "401.76" },
    { price: 1.6679, amount: "1,237.48", total: "2,063.99" },
    { price: 1.6677, amount: "281.83", total: "470.00" },
    { price: 1.6673, amount: "268.10", total: "447.00" },
    { price: 1.6671, amount: "258.53", total: "430.99" },
    { price: 1.6667, amount: "105.60", total: "176.00" },
  ];

  const orderBookBids = [
    { price: 1.6666, amount: "27.96", total: "46.59" },
    { price: 1.6665, amount: "759.70", total: "1,266.04" },
    { price: 1.6663, amount: "269.46", total: "449.00" },
    { price: 1.6658, amount: "256.93", total: "427.99" },
    { price: 1.6653, amount: "1,242.57", total: "2,069.25" },
    { price: 1.6652, amount: "273.24", total: "454.99" },
    { price: 1.6650, amount: "275.68", total: "459.00" },
    { price: 1.6648, amount: "1.72", total: "1.99" },
    { price: 1.6645, amount: "273.36", total: "455.00" },
    { price: 1.6641, amount: "258.40", total: "430.00" },
    { price: 1.6638, amount: "253.64", total: "422.00" },
  ];

  const timeframes = ["1m", "5m", "15m", "30m", "1H", "4H", "1D"];

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white font-sans overflow-x-hidden">
      {/* ===== TOP NAVBAR ===== */}
      <div className="bg-black border-b border-gray-800 px-4 py-2 flex items-center justify-between sticky top-0 z-50">
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center text-xl font-bold text-white">M</div>
            <span className="font-bold text-2xl text-white">MEXC</span>
          </Link>
          <nav className="hidden lg:flex items-center gap-4 text-sm text-gray-300">
            <span className="hover:text-white cursor-pointer">Buy Crypto</span>
            <span className="hover:text-white cursor-pointer">Markets</span>
            <span className="text-blue-400 cursor-pointer">Spot</span>
            <span className="hover:text-white cursor-pointer">Futures</span>
            <span className="hover:text-white cursor-pointer">Earn</span>
            <span className="hover:text-white cursor-pointer">Event Center</span>
            <span className="hover:text-white cursor-pointer">Rewards Hub</span>
            <span className="hover:text-white cursor-pointer">More</span>
          </nav>
        </div>
        <div className="flex items-center gap-3">
          <div className="hidden md:flex bg-gray-900 px-3 py-1.5 rounded-full text-sm text-gray-400">🔍 ONDO</div>
          <span className="text-sm text-gray-300 hidden md:block">Wallets</span>
          <div className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center cursor-pointer hover:bg-gray-600 text-sm">👤</div>
          <button className="lg:hidden text-2xl text-white">☰</button>
        </div>
      </div>

      {/* ===== PAIR HEADER ===== */}
      <div className="bg-[#111111] border-b border-gray-700 px-4 md:px-6 py-3 flex flex-wrap items-center gap-4 md:gap-8">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl flex items-center justify-center text-xl font-bold text-white">
            {displaySymbol.slice(0, 2)}
          </div>
          <div>
            <div className="text-2xl font-bold text-white">{pair}</div>
            <div className="text-xs text-gray-500">{displaySymbol} Token</div>
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-6 md:gap-10">
          <div>
            <span className="text-3xl font-mono font-bold text-white">{currentPrice.toFixed(4)}</span>
            <span className="text-green-400 ml-2 text-lg">+{priceChange}%</span>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-1 text-sm">
            <div><span className="text-gray-500">24H High</span> <span className="text-white">1.6700</span></div>
            <div><span className="text-gray-500">24H Low</span> <span className="text-white">1.6537</span></div>
            <div><span className="text-gray-500">24H Vol</span> <span className="text-white">1.15M</span></div>
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
            <div className="flex flex-wrap gap-1 text-xs">
              {timeframes.map((tf) => (
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
            </div>
          </div>

          <div className="flex-1 bg-[#0F1217] relative flex items-center justify-center min-h-[250px]">
            <div className="text-center">
              <div className="text-5xl mb-3 opacity-20">📈</div>
              <p className="text-gray-500 text-base">{pair} {activeTimeframe} Chart</p>
              <p className="text-xs text-gray-600 mt-1">MA5 • MA10 • MA20 • Volume</p>
            </div>
            <div className="absolute bottom-8 left-8 right-8 h-[150px] border border-gray-700/50 rounded">
              <div className="absolute bottom-16 left-[20%] w-5 h-24 bg-green-500/40"></div>
              <div className="absolute bottom-20 left-[35%] w-5 h-16 bg-red-500/40"></div>
              <div className="absolute bottom-12 left-[50%] w-5 h-32 bg-green-500/40"></div>
              <div className="absolute bottom-22 left-[65%] w-5 h-14 bg-red-500/40"></div>
              <div className="absolute bottom-8 left-[80%] w-5 h-36 bg-green-500/40"></div>
            </div>
          </div>

          <div className="bg-[#111] px-4 py-1.5 border-t border-gray-800 flex flex-wrap gap-4 text-xs">
            <div>VOL(MX) <span className="text-white">108.91</span></div>
            <div>VOL(USDT) <span className="text-white">181.51K</span></div>
            <div>MA5 <span className="text-yellow-400">6.696K</span></div>
            <div>MA10 <span className="text-purple-400">10.119K</span></div>
            <div>MA20 <span className="text-blue-400">10.318K</span></div>
          </div>
        </div>

        {/* RIGHT: Order Book + Spot Section — SIDE BY SIDE */}
        <div className="w-full lg:w-[420px] xl:w-[460px] flex flex-row bg-[#0A0A0A]">
          {/* Order Book - Left Side */}
          <div className="flex-1 flex flex-col border-r border-gray-700 min-w-[180px]">
            <div className="flex border-b border-gray-700 px-3 py-2">
              <span className="text-blue-400 border-b-2 border-blue-400 pb-2 text-xs font-medium">Order Book</span>
              <span className="text-gray-400 ml-4 text-xs">Market Trades</span>
            </div>

            <div className="flex-1 overflow-y-auto px-2">
              <div className="grid grid-cols-3 text-[10px] text-gray-500 mb-1">
                <div>Price</div>
                <div className="text-right">Amount</div>
                <div className="text-right">Total</div>
              </div>
              {orderBookAsks.slice(0, 6).map((item, i) => (
                <div key={`ask-${i}`} className="grid grid-cols-3 text-xs py-0.5 hover:bg-red-500/10 text-red-400">
                  <div>{item.price}</div>
                  <div className="text-right text-gray-300">{item.amount}</div>
                  <div className="text-right text-gray-300">{item.total}</div>
                </div>
              ))}

              <div className="bg-[#1C1C1C] py-2 text-center border-y border-gray-700 my-1">
                <div className="text-sm font-bold text-white">{currentPrice.toFixed(4)}</div>
                <div className="text-green-400 text-[10px]">↑ $1.66</div>
              </div>

              {orderBookBids.slice(0, 6).map((item, i) => (
                <div key={`bid-${i}`} className="grid grid-cols-3 text-xs py-0.5 hover:bg-green-500/10 text-green-400">
                  <div>{item.price}</div>
                  <div className="text-right text-gray-300">{item.amount}</div>
                  <div className="text-right text-gray-300">{item.total}</div>
                </div>
              ))}
            </div>
          </div>

          {/* SPOT SECTION - Right Side */}
          <div className="w-[180px] flex flex-col bg-[#111] p-3">
            <div className="flex rounded-lg overflow-hidden bg-gray-900 mb-2">
              <button
                onClick={() => setSide("buy")}
                className={`flex-1 py-1.5 text-xs font-bold transition ${
                  side === "buy" ? "bg-green-500 text-black" : "text-gray-400"
                }`}
              >
                Buy
              </button>
              <button
                onClick={() => setSide("sell")}
                className={`flex-1 py-1.5 text-xs font-bold transition ${
                  side === "sell" ? "bg-red-500 text-white" : "text-gray-400"
                }`}
              >
                Sell
              </button>
            </div>

            <div className="flex gap-1 mb-2 text-[10px]">
              {["limit", "market", "tpSl"].map((mode) => (
                <button
                  key={mode}
                  onClick={() => setOrderMode(mode as any)}
                  className={`flex-1 py-0.5 rounded text-[10px] transition ${
                    orderMode === mode ? "bg-gray-700 text-white" : "text-gray-400 hover:bg-gray-800"
                  }`}
                >
                  {mode === "tpSl" ? "TP/SL" : mode.slice(0, 3)}
                </button>
              ))}
            </div>

            <div className="mb-1">
              <div className="text-[8px] text-gray-500">Price</div>
              <input type="text" defaultValue={currentPrice.toFixed(4)} className="w-full bg-gray-900 border border-gray-700 rounded px-1 py-1 text-xs text-white" />
            </div>

            <div className="mb-1">
              <div className="text-[8px] text-gray-500">Amount</div>
              <input type="text" placeholder="0" className="w-full bg-gray-900 border border-gray-700 rounded px-1 py-1 text-xs text-white" />
            </div>

            <div className="flex gap-1 mt-1 text-[8px]">
              {[25, 50, 75, 100].map((p) => (
                <button key={p} className="flex-1 py-0.5 bg-gray-800 rounded hover:bg-gray-700">{p}%</button>
              ))}
            </div>

            <div className="text-[8px] text-gray-500 mt-1">Available 0.0142</div>

            <button
              className={`w-full mt-1 py-2 rounded-lg text-xs font-bold transition ${
                side === "buy"
                  ? "bg-green-500 hover:bg-green-600 text-black"
                  : "bg-red-500 hover:bg-red-600 text-white"
              }`}
            >
              {side === "buy" ? `Buy` : `Sell`}
            </button>
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
