'use client';

import React, { useState } from 'react';
import Link from 'next/link';

interface TradingPair {
  symbol: string;
  name: string;
  price: number;
  change: number;
  volume: string;
  leverage?: string;
  isNew?: boolean;
}

const tradingPairs: TradingPair[] = [
  {
    symbol: 'BTCUSDT',
    name: 'Bitcoin',
    price: 66260.9,
    change: -0.58,
    volume: '4.430B',
    leverage: '500x'
  },
  {
    symbol: 'ETHUSDT',
    name: 'Ethereum',
    price: 1931.29,
    change: 0.02,
    volume: '1.828B',
    leverage: '500x'
  },
  {
    symbol: 'GOLD(XAU)USDT',
    name: 'Gold',
    price: 4142.04,
    change: 1.55,
    volume: '666.661M',
    leverage: '1000x'
  },
  {
    symbol: 'NBISUSDT',
    name: 'Nebius',
    price: 215.27,
    change: 3.62,
    volume: '3.365M'
  },
  {
    symbol: 'WDCUSDT',
    name: 'Western Digital',
    price: 548.95,
    change: 0.60,
    volume: '750.873K'
  },
  {
    symbol: 'MUUSDT',
    name: 'Micron',
    price: 970.58,
    change: 1.95,
    volume: '125.930M'
  }
];

export default function MexcMarketsPage() {
  const [activeTab, setActiveTab] = useState<'spot' | 'futures'>('futures');
  const [selectedCategory, setSelectedCategory] = useState('USDT-M Futures');

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white font-sans pb-20 md:pb-0">
      {/* Top Navigation Bar */}
      <div className="bg-black border-b border-gray-800">
        <div className="max-w-screen-xl mx-auto px-4">
          <div className="flex items-center justify-between h-14">
            <div className="flex items-center gap-8">
              <Link href="/" className="flex items-center gap-2">
                <div className="w-8 h-8 bg-blue-500 rounded flex items-center justify-center">
                  <span className="text-white font-bold text-xl">M</span>
                </div>
                <span className="font-bold text-xl tracking-tight">MEXC</span>
              </Link>

              <nav className="hidden md:flex items-center gap-6 text-sm">
                <a href="#" className="hover:text-blue-400">Buy Crypto</a>
                <Link href="/markets" className="hover:text-blue-400">Markets</Link>
                <Link href="/trade/BTCUSDT" className="hover:text-blue-400">Spot</Link>
                <Link href="/futures" className="text-blue-400 border-b-2 border-blue-400 pb-3">Futures</Link>
                <Link href="/earn" className="hover:text-blue-400">Earn</Link>
                <a href="#" className="hover:text-blue-400">More</a>
              </nav>
            </div>

            <div className="flex items-center gap-4">
              <div className="hidden md:flex bg-gray-900 rounded-full px-4 py-1.5 text-sm items-center gap-2">
                <div className="w-4 h-4 bg-blue-500 rounded-full"></div>
                COIN
              </div>
              <Link href="/register">
                <button className="bg-blue-600 hover:bg-blue-700 px-6 py-1.5 rounded-full text-sm font-medium">
                  Sign Up
                </button>
              </Link>
              <Link href="/login">
                <div className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center hover:bg-gray-700 cursor-pointer">
                  👤
                </div>
              </Link>
              <button className="md:hidden text-2xl">☰</button>
            </div>
          </div>
        </div>
      </div>

      {/* Secondary Navigation */}
      <div className="border-b border-gray-800 bg-black">
        <div className="max-w-screen-xl mx-auto px-4">
          <div className="flex items-center gap-8 text-sm h-12 overflow-x-auto">
            <div className="flex items-center gap-1 border-b-2 border-blue-400 pb-3 text-blue-400 font-medium whitespace-nowrap">
              Crypto
              <div className="ml-1 bg-blue-600 text-xs px-1.5 py-px rounded">0 Fees</div>
            </div>
            <div className="text-gray-400 hover:text-white cursor-pointer whitespace-nowrap">Stocks</div>
            <div className="text-gray-400 hover:text-white cursor-pointer whitespace-nowrap">TradFi</div>
            <div className="text-gray-400 hover:text-white cursor-pointer whitespace-nowrap">Crude Oil</div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-screen-xl mx-auto px-4 py-4">
        {/* Filters */}
        <div className="flex flex-wrap items-center gap-3 mb-6">
          <div className="flex bg-gray-900 rounded-lg p-1">
            <button 
              onClick={() => setActiveTab('spot')}
              className={`px-6 py-2 rounded-lg text-sm transition-colors ${
                activeTab === 'spot' ? 'bg-gray-700' : 'hover:bg-gray-800'
              }`}
            >
              Spot
            </button>
            <button 
              onClick={() => setActiveTab('futures')}
              className={`px-6 py-2 rounded-lg text-sm transition-colors ${
                activeTab === 'futures' ? 'bg-gray-700' : 'hover:bg-gray-800'
              }`}
            >
              Futures
            </button>
          </div>

          <div className="flex flex-wrap gap-2">
            <div className="bg-gray-900 px-4 py-2 rounded-lg text-sm flex items-center gap-2 cursor-pointer hover:bg-gray-800">
              All
            </div>
            <div className="bg-gray-900 px-4 py-2 rounded-lg text-sm flex items-center gap-2 cursor-pointer hover:bg-gray-800">
              New
            </div>
            <div className="bg-gray-900 px-4 py-2 rounded-lg text-sm flex items-center gap-2 cursor-pointer hover:bg-gray-800">
              0 Fees
            </div>
          </div>

          <div className="ml-auto flex items-center gap-2 bg-gray-900 rounded-lg px-4 py-2">
            <select 
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="bg-transparent outline-none text-sm"
            >
              <option value="USDT-M Futures">USDT-M Futures</option>
              <option value="USDC-M Futures">USDC-M Futures</option>
            </select>
          </div>
        </div>

        {/* Table Header */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-xs text-gray-400 px-4 mb-2">
          <div>Trading Pair</div>
          <div className="text-right">Price</div>
          <div className="text-right hidden md:block">Change</div>
          <div className="text-right hidden md:block">24h Vol</div>
          <div></div>
        </div>

        {/* Trading Pairs List */}
        <div className="space-y-1">
          {tradingPairs.map((pair, index) => (
            <div 
              key={index}
              className="bg-[#1A1A1A] hover:bg-[#222] rounded-xl px-4 py-4 grid grid-cols-2 md:grid-cols-5 gap-4 items-center group transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-xs font-bold">
                  {pair.symbol.slice(0, 3)}
                </div>
                <div>
                  <div className="font-medium text-sm md:text-base">{pair.symbol}</div>
                  <div className="text-xs text-gray-500">{pair.name} Perpetual</div>
                </div>
                {pair.leverage && (
                  <div className="hidden md:block ml-2 bg-blue-900 text-blue-400 text-[10px] px-2 py-px rounded">
                    {pair.leverage}
                  </div>
                )}
              </div>

              <div className="text-right font-mono text-sm md:text-lg font-semibold">
                {pair.price.toLocaleString()}
              </div>

              <div className="text-right hidden md:block">
                <div 
                  className={`inline-block px-4 py-1 rounded text-sm font-medium ${
                    pair.change >= 0 
                      ? 'bg-green-500/20 text-green-400' 
                      : 'bg-red-500/20 text-red-400'
                  }`}
                >
                  {pair.change >= 0 ? '+' : ''}{pair.change}%
                </div>
              </div>

              <div className="text-right text-sm text-gray-400 font-mono hidden md:block">
                {pair.volume}
              </div>

              <div className="text-right">
                <Link href={`/trade/${pair.symbol}`}>
                  <button className="bg-blue-600 hover:bg-blue-500 px-4 md:px-8 py-1.5 md:py-2 rounded-full text-xs md:text-sm font-medium transition-colors">
                    Trade
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Banner */}
        <div className="mt-8 bg-gradient-to-r from-blue-900/50 to-purple-900/30 border border-blue-800/50 rounded-2xl p-6 flex flex-col md:flex-row items-center gap-6">
          <div className="w-16 h-16 bg-blue-500/10 rounded-2xl flex items-center justify-center text-4xl">💰</div>
          <div className="flex-1 text-center md:text-left">
            <div className="text-xl font-semibold">Sign Up to Claim 10,000 USDT Bonus</div>
            <div className="text-sm text-gray-400">Limited time offer • 47:59:42 remaining</div>
          </div>
          <Link href="/register">
            <button className="bg-white text-black px-10 py-3 rounded-full font-semibold hover:bg-gray-200 transition">
              Sign Up
            </button>
          </Link>
        </div>
      </div>

      {/* Mobile Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-black border-t border-gray-800 md:hidden">
        <div className="flex items-center justify-around py-2">
          <Link href="/" className="flex flex-col items-center text-blue-400">
            <div>🏠</div>
            <div className="text-xs">Home</div>
          </Link>
          <Link href="/markets" className="flex flex-col items-center text-gray-400 hover:text-white">
            <div>📊</div>
            <div className="text-xs">Markets</div>
          </Link>
          <Link href="/trade/BTCUSDT" className="flex flex-col items-center text-gray-400 hover:text-white">
            <div>↗️</div>
            <div className="text-xs">Trade</div>
          </Link>
          <Link href="/futures" className="flex flex-col items-center text-gray-400 hover:text-white">
            <div>📈</div>
            <div className="text-xs">Futures</div>
          </Link>
          <Link href="/wallet" className="flex flex-col items-center text-gray-400 hover:text-white">
            <div>💼</div>
            <div className="text-xs">Assets</div>
          </Link>
        </div>
      </div>
    </div>
  );
}
