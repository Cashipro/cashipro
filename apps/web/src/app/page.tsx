"use client";

import Link from "next/link";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#0a0b0e]">
      {/* Navbar */}
      <nav className="flex items-center justify-between px-6 py-4 border-b border-[#2b2d33]">
        <div className="flex items-center gap-2">
          <span className="text-2xl font-bold text-white">CashiPro</span>
          <span className="text-xs text-gray-400">Exchange</span>
        </div>
        <div className="flex items-center gap-4">
          <Link href="/markets" className="text-gray-400 hover:text-white text-sm">Markets</Link>
          <Link href="/trade/BTCUSDT" className="text-gray-400 hover:text-white text-sm">Trade</Link>
          <Link href="/login" className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm">
            Sign In
          </Link>
          <Link href="/register" className="px-4 py-2 bg-[#2b2d33] text-white rounded-lg hover:bg-[#3b3d43] text-sm">
            Register
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <div className="flex flex-col items-center justify-center py-20 px-4 text-center">
        <h1 className="text-5xl md:text-7xl font-bold text-white mb-4">
          Trade Crypto <br />
          <span className="text-blue-500">With Confidence</span>
        </h1>
        <p className="text-gray-400 text-lg max-w-md mb-8">
          Buy, sell, and trade 100+ cryptocurrencies with low fees and advanced tools.
        </p>
        <div className="flex gap-4">
          <Link href="/register" className="px-8 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700">
            Get Started
          </Link>
          <Link href="/markets" className="px-8 py-3 bg-[#2b2d33] text-white rounded-xl hover:bg-[#3b3d43]">
            View Markets
          </Link>
        </div>
      </div>

      {/* Features */}
      <div className="max-w-6xl mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-[#1e1f24] p-6 rounded-xl">
          <div className="text-3xl mb-3">🔒</div>
          <h3 className="text-white font-bold">Secure Trading</h3>
          <p className="text-gray-400 text-sm">Bank-grade security with 2FA and cold storage.</p>
        </div>
        <div className="bg-[#1e1f24] p-6 rounded-xl">
          <div className="text-3xl mb-3">⚡</div>
          <h3 className="text-white font-bold">Lightning Fast</h3>
          <p className="text-gray-400 text-sm">Match orders in milliseconds with our engine.</p>
        </div>
        <div className="bg-[#1e1f24] p-6 rounded-xl">
          <div className="text-3xl mb-3">📊</div>
          <h3 className="text-white font-bold">Advanced Tools</h3>
          <p className="text-gray-400 text-sm">Professional charts and trading indicators.</p>
        </div>
      </div>
    </div>
  );
}
