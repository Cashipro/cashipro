'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';

export default function MexcSpotTradingPage() {
  const params = useParams();
  const pair = (params.pair as string) || 'BTCUSDT';
  
  const [orderType, setOrderType] = useState<'limit' | 'market'>('limit');
  const [side, setSide] = useState<'buy' | 'sell'>('buy');

  const currentPrice = 1.6667;
  const priceChange = 0.59;

  const orderBookBids = [
    { price: 1.6699, amount: 1462.09, total: 2441.5440 },
    { price: 1.6698, amount: 151.95, total: 253.7261 },
    { price: 1.6695, amount: 288.71, total: 482.0013 },
    { price: 1.6690, amount: 263.03, total: 438.9970 },
    { price: 1.6687, amount: 279.26, total: 466.0011 },
  ];

  const orderBookAsks = [
    { price: 1.6679, amount: 1237.48, total: 2063.9928 },
    { price: 1.6677, amount: 281.83, total: 470.0078 },
    { price: 1.6673, amount: 268.10, total: 447.0031 },
    { price: 1.6671, amount: 258.53, total: 430.9953 },
    { price: 1.6667, amount: 105.60, total: 176.0035 },
  ];

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white font-sans overflow-hidden">
      {/* Top Navigation */}
      <div className="bg-black border-b border-gray-800 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center font-bold">M</div>
            <span className="text-2xl font-bold">MEXC</span>
          </Link>

          <nav className="hidden md:flex gap-6 text-sm">
            <Link href="/markets" className="text-gray-400 hover:text-white">Markets</Link>
            <Link href="/trade/BTCUSDT" className="text-blue-400 font-medium">Spot</Link>
            <Link href="/futures" className="text-gray-400 hover:text-white">Futures</Link>
            <Link href="/earn" className="text-gray-400 hover:text-white">Earn</Link>
          </nav>
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden md:flex bg-gray-900 px-4 py-1 rounded-full text-sm">ONDO</div>
          <Link href="/login">
            <div className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center cursor-pointer hover:bg-gray-700">👤</div>
          </Link>
          <button className="md:hidden text-2xl">☰</button>
        </div>
      </div>

      {/* Trading Pair Header */}
      <div className="bg-[#111] border-b border-gray-800 px-4 md:px-6 py-4 flex flex-wrap items-center gap-4 md:gap-8">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-xl font-bold">M</div>
          <div>
            <div className="text-2xl font-semibold">{pair}</div>
            <div className="text-sm text-gray-500">MX Token</div>
          </div>
        </div>

        <div className="flex-1 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 md:gap-8">
          <div>
            <div className="text-2xl md:text-3xl font-mono font-semibold text-green-400">
              {currentPrice}
            </div>
            <div className="text-green-400 text-sm">+{priceChange}%</div>
          </div>
          <div>
            <div className="text-xs text-gray-500">24H High</div>
            <div className="font-mono">1.6700</div>
          </div>
          <div>
            <div className="text-xs text-gray-500">24H Low</div>
            <div className="font-mono">1.6537</div>
          </div>
          <div>
            <div className="text-xs text-gray-500">24H Vol</div>
            <div className="font-mono">1.15M</div>
          </div>
          <div>
            <div className="text-xs text-gray-500">24H Amount</div>
            <div className="font-mono">1.91M</div>
          </div>
        </div>
      </div>

      {/* Main Layout */}
      <div className="flex flex-col lg:flex-row h-[calc(100vh-140px)]">
        {/* Left - Chart Area */}
        <div className="flex-1 flex flex-col border-r border-gray-800">
          <div className="border-b border-gray-800 px-6 py-3 flex items-center gap-6 text-sm overflow-x-auto">
            <div className="text-blue-400 border-b border-blue-400 pb-2 whitespace-nowrap">Chart</div>
            <div className="text-gray-400 whitespace-nowrap">Info</div>
            <div className="text-gray-400 whitespace-nowrap">Trading Data</div>
            <div className="ml-auto text-sm bg-gray-800 px-3 py-1 rounded whitespace-nowrap">15m</div>
          </div>

          {/* Chart Placeholder */}
          <div className="flex-1 bg-[#0F0F0F] relative flex items-center justify-center border-b border-gray-800 min-h-[200px]">
            <div className="text-center">
              <div className="text-6xl mb-4 opacity-30">📈</div>
              <div className="text-gray-500">{pair} Candlestick Chart (15m)</div>
              <div className="text-xs text-gray-600 mt-2">MA5 • MA10 • MA20 • Volume</div>
            </div>
            
            <div className="absolute bottom-12 left-10 right-10 h-0.5 bg-green-500/50"></div>
            <div className="absolute bottom-20 left-1/3 w-2 h-12 bg-green-500 rounded"></div>
            <div className="absolute bottom-16 left-1/2 w-3 h-20 bg-red-500 rounded"></div>
          </div>

          {/* Bottom Stats */}
          <div className="p-4 text-xs grid grid-cols-2 md:grid-cols-5 gap-4 border-t border-gray-800 bg-[#111]">
            <div>VOL(MX) <span className="text-white">81.37</span></div>
            <div>VOL(USDT) <span className="text-white">135.62K</span></div>
            <div>MA5 <span className="text-yellow-400">1.6674</span></div>
            <div>MA10 <span className="text-purple-400">1.6679</span></div>
            <div>MA20 <span className="text-blue-400">1.6652</span></div>
          </div>
        </div>

        {/* Right Sidebar - Order Book + Trade Panel */}
        <div className="w-full lg:w-96 flex flex-col border-l border-gray-800 bg-[#0A0A0A]">
          {/* Order Book */}
          <div className="flex-1 overflow-auto border-b border-gray-800">
            <div className="px-4 py-3 border-b border-gray-800 flex items-center justify-between text-sm">
              <div className="flex gap-6">
                <span className="text-blue-400">Order Book</span>
                <span className="text-gray-400">Market Trades</span>
              </div>
              <div>0.0001</div>
            </div>

            {/* Asks */}
            <div className="px-4 py-1 text-xs text-red-400">
              {orderBookAsks.map((item, i) => (
                <div key={i} className="grid grid-cols-3 py-1 text-sm">
                  <div className="font-mono text-red-400">{item.price}</div>
                  <div className="text-right text-gray-400">{item.amount}</div>
                  <div className="text-right text-gray-400">{item.total}</div>
                </div>
              ))}
            </div>

            <div className="px-4 py-3 border-y border-gray-800 bg-[#1A1A1A] text-center text-lg font-mono font-semibold flex items-center justify-center gap-2">
              1.6667 
              <span className="text-green-400 text-sm">↑ $1.66</span>
            </div>

            {/* Bids */}
            <div className="px-4 py-1 text-xs text-green-400">
              {orderBookBids.map((item, i) => (
                <div key={i} className="grid grid-cols-3 py-1 text-sm">
                  <div className="font-mono text-green-400">{item.price}</div>
                  <div className="text-right text-gray-400">{item.amount}</div>
                  <div className="text-right text-gray-400">{item.total}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Trading Panel */}
          <div className="p-4 bg-[#111]">
            <div className="flex bg-gray-900 rounded-lg p-1 mb-4">
              <button 
                onClick={() => setSide('buy')}
                className={`flex-1 py-2 rounded-lg text-sm font-medium ${side === 'buy' ? 'bg-green-500 text-black' : 'text-gray-400'}`}
              >
                Buy
              </button>
              <button 
                onClick={() => setSide('sell')}
                className={`flex-1 py-2 rounded-lg text-sm font-medium ${side === 'sell' ? 'bg-red-500 text-white' : 'text-gray-400'}`}
              >
                Sell
              </button>
            </div>

            <div className="flex gap-2 mb-4 text-sm">
              <button 
                onClick={() => setOrderType('limit')}
                className={`flex-1 py-2 rounded ${orderType === 'limit' ? 'bg-gray-700' : 'bg-transparent text-gray-400'}`}
              >
                Limit
              </button>
              <button 
                onClick={() => setOrderType('market')}
                className={`flex-1 py-2 rounded ${orderType === 'market' ? 'bg-gray-700' : 'bg-transparent text-gray-400'}`}
              >
                Market
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <div className="text-xs text-gray-500 mb-1">Price (USDT)</div>
                <input 
                  type="text" 
                  defaultValue="1.6667" 
                  className="w-full bg-gray-900 border border-gray-700 rounded px-4 py-3 font-mono focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <div className="text-xs text-gray-500 mb-1">Amount (MX)</div>
                <input 
                  type="text" 
                  placeholder="0"
                  className="w-full bg-gray-900 border border-gray-700 rounded px-4 py-3 font-mono focus:outline-none focus:border-blue-500"
                />
              </div>

              <div className="flex justify-between text-xs text-gray-500">
                <span>Available</span>
                <span>0.0142 USDT</span>
              </div>

              <div className="pt-2">
                <button 
                  className={`w-full py-4 rounded-xl text-lg font-semibold ${side === 'buy' ? 'bg-green-500 hover:bg-green-600' : 'bg-red-500 hover:bg-red-600'} text-black`}
                >
                  {side === 'buy' ? `Buy ${pair.replace('USDT', '')}` : `Sell ${pair.replace('USDT', '')}`}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="h-56 bg-[#111] border-t border-gray-800 p-4 text-sm flex flex-col">
        <div className="flex gap-8 border-b border-gray-800 pb-3 overflow-x-auto">
          <div className="text-blue-400 border-b border-blue-400 whitespace-nowrap">Open Orders (0)</div>
          <div className="text-gray-400 whitespace-nowrap">Order History</div>
          <div className="text-gray-400 whitespace-nowrap">Trade History</div>
        </div>
        
        <div className="flex-1 flex items-center justify-center text-gray-500">
          Deposit now to start your trading journey
        </div>
      </div>
    </div>
  );
}
