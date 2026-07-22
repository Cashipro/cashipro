"use client";

import { useState } from "react";
import Link from "next/link";

export default function HomePage() {
  const [email, setEmail] = useState("");

  const trendingTokens = [
    { symbol: "BTC/USDT", price: "66,326.55", change: "-0.54%" },
    { symbol: "ETH/USDT", price: "1,929.42", change: "-0.12%" },
    { symbol: "GOLD(XAUT)/USDT", price: "4,121.43", change: "+0.32%" },
    { symbol: "SOL/USDT", price: "178.50", change: "+8.12%" },
    { symbol: "BNB/USDT", price: "598.20", change: "+5.67%" },
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      {/* ===== TOP NAVBAR ===== */}
      <nav className="flex items-center justify-between px-4 py-3 border-b border-[#2b2d33]">
        <div className="flex items-center gap-4">
          <button className="text-gray-400 text-2xl lg:hidden">☰</button>
          <h1 className="text-xl font-bold text-white">mexc</h1>
        </div>
        <div className="hidden lg:flex items-center gap-6 text-sm">
          <Link href="/markets" className="text-gray-300 hover:text-white">Markets</Link>
          <Link href="/trade/BTCUSDT" className="text-gray-300 hover:text-white">Trade</Link>
          <Link href="/futures" className="text-gray-300 hover:text-white">Futures</Link>
          <Link href="/wallet" className="text-gray-300 hover:text-white">Assets</Link>
        </div>
        <div className="flex items-center gap-3">
          <Link href="/login" className="text-gray-300 hover:text-white text-sm hidden sm:block">Log In</Link>
          <Link href="/register">
            <button className="px-4 py-1.5 bg-yellow-500 text-black font-bold rounded-lg text-sm hover:bg-yellow-400 transition">
              Sign Up
            </button>
          </Link>
        </div>
      </nav>

      {/* ===== BANNER ===== */}
      <div className="mx-4 mt-4 bg-gradient-to-r from-yellow-500/20 to-yellow-600/10 rounded-xl p-4 border border-yellow-500/20">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div>
            <p className="text-sm font-bold text-white">🎉 $10,000 New User Rewards</p>
            <p className="text-xs text-gray-400">🔒 Ends in <span className="text-yellow-400 font-bold">47:59:54</span></p>
          </div>
          <Link href="/register">
            <button className="px-5 py-2 bg-yellow-500 text-black font-bold rounded-lg text-sm hover:bg-yellow-400 transition">
              Sign Up Now
            </button>
          </Link>
        </div>
      </div>

      {/* ===== TRENDING TOKENS ===== */}
      <div className="px-4 mt-6">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div>
            <h2 className="text-lg font-bold text-white">Most Trending Tokens</h2>
            <p className="text-xs text-gray-500">1,547 Spot, 1,009 Futures</p>
          </div>
          <div className="flex gap-1 text-xs">
            <button className="px-3 py-1 bg-yellow-500/20 text-yellow-400 rounded-lg">Hot</button>
            <button className="px-3 py-1 bg-[#2b2d33] text-gray-400 rounded-lg">Gainers</button>
            <button className="px-3 py-1 bg-[#2b2d33] text-gray-400 rounded-lg">New</button>
          </div>
        </div>

        {/* Token Cards - Mobile Horizontal Scroll */}
        <div className="flex gap-3 overflow-x-auto mt-3 pb-2 scrollbar-hide">
          {trendingTokens.map((token) => {
            const isPositive = token.change.startsWith("+");
            return (
              <div key={token.symbol} className="min-w-[160px] bg-[#1a1a1a] rounded-xl border border-[#2b2d33] p-3 flex-shrink-0">
                <p className="text-xs text-gray-400">{token.symbol}</p>
                <p className="text-sm font-bold text-white mt-1">{token.price}</p>
                <p className={`text-xs font-bold ${isPositive ? "text-green-500" : "text-red-500"}`}>
                  {token.change}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* ===== BOTTOM NAVBAR (Mobile) ===== */}
      <div className="fixed bottom-0 left-0 right-0 bg-[#1a1a1a] border-t border-[#2b2d33] flex items-center justify-around py-2 px-4 lg:hidden z-50">
        <Link href="/" className="flex flex-col items-center text-yellow-400">
          <span className="text-lg">🏠</span>
          <span className="text-[10px]">Home</span>
        </Link>
        <Link href="/markets" className="flex flex-col items-center text-gray-400 hover:text-white">
          <span className="text-lg">📈</span>
          <span className="text-[10px]">Markets</span>
        </Link>
        <Link href="/trade/BTCUSDT" className="flex flex-col items-center text-gray-400 hover:text-white">
          <span className="text-lg">💰</span>
          <span className="text-[10px]">Trade</span>
        </Link>
        <Link href="/futures" className="flex flex-col items-center text-gray-400 hover:text-white">
          <span className="text-lg">🚀</span>
          <span className="text-[10px]">Futures</span>
        </Link>
        <Link href="/wallet" className="flex flex-col items-center text-gray-400 hover:text-white">
          <span className="text-lg">💳</span>
          <span className="text-[10px]">Assets</span>
        </Link>
      </div>
    </div>
  );
}
