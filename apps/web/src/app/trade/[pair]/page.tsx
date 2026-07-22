'use client';

import React, { useState } from 'react';

export default function CashiproSpotTrading() {
  const [side, setSide] = useState<'buy' | 'sell'>('buy');
  const [orderMode, setOrderMode] = useState<'limit' | 'market' | 'tpSl'>('limit');

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white font-sans">
      {/* Top Nav - Cashipro */}
      <div className="bg-black border-b border-gray-800 px-4 py-2 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-blue-500 rounded-xl flex items-center justify-center text-xl font-bold">C</div>
            <span className="font-bold text-2xl tracking-tight">Cashipro</span>
          </div>

          <nav className="flex items-center gap-6 text-sm">
            <span>Buy Crypto</span>
            <span>Markets</span>
            <span className="text-blue-400">Spot</span>
            <span>Futures</span>
            <span>Earn</span>
          </nav>
        </div>

        <div className="flex items-center gap-4">
          <div className="bg-gray-900 px-4 py-1.5 rounded-full text-sm">🔍 Search</div>
          <div className="text-sm">Wallets</div>
          <div className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center cursor-pointer">👤</div>
        </div>
      </div>

      {/* Pair Header */}
      <div className="bg-[#111] border-b border-gray-700 px-6 py-4 flex items-center gap-8">
        <div className="flex items-center gap-4">
          <div className="w-11 h-11 bg-blue-600 rounded-2xl flex items-center justify-center text-2xl font-bold">MX</div>
          <div>
            <div className="text-3xl font-bold">MX/USDT</div>
            <div className="text-sm text-gray-400">MX Token</div>
          </div>
        </div>

        <div className="flex items-center gap-12 text-lg">
          <div>
            <span className="text-4xl font-mono">1.6667</span>
            <span className="text-green-400 ml-3 text-xl">+0.59%</span>
          </div>
          <div className="text-sm space-x-8">
            <span>24H High <span className="font-mono text-white">1.6700</span></span>
            <span>24H Low <span className="font-mono text-white">1.6537</span></span>
            <span>Vol(MX) <span className="font-mono text-white">1.15M</span></span>
          </div>
        </div>
      </div>

      <div className="flex h-[calc(100vh-135px)]">
        {/* Chart Area - Left Side */}
        <div className="flex-[2] flex flex-col border-r border-gray-800">
          <div className="px-6 py-3 border-b border-gray-800 flex items-center justify-between">
            <div className="flex gap-8">
              <span className="text-blue-400 border-b-2 border-blue-400 pb-3">Chart</span>
              <span className="text-gray-400">Info</span>
              <span className="text-gray-400">Trading Data</span>
            </div>

            <div className="flex gap-1.5 text-sm">
              {['1m','5m','15m','30m','1H','4H','1D'].map(t => (
                <div key={t} className={`px-4 py-1 rounded cursor-pointer hover:bg-gray-800 ${t === '15m' ? 'bg-blue-600' : ''}`}>
                  {t}
                </div>
              ))}
            </div>
          </div>

          {/* Chart Placeholder */}
          <div className="flex-1 bg-[#0C0F14] relative flex items-center justify-center">
            <div className="text-center">
              <div className="text-7xl mb-6 opacity-20">📈</div>
              <p className="text-gray-500 text-xl">MX/USDT 15m Chart</p>
              <p className="text-xs text-gray-600 mt-2">Candlestick + MA5, MA10, MA20</p>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE - FIXED & IMPROVED */}
        <div className="w-[460px] flex flex-col bg-[#0A0A0A] border-l border-gray-800">
          
          {/* Order Book */}
          <div className="flex-1 overflow-hidden flex flex-col">
            <div className="px-4 py-3 border-b border-gray-700 flex items-center">
              <div className="text-blue-400 font-medium">Order Book</div>
              <div className="ml-auto text-xs text-gray-400">0.0001 ▼</div>
            </div>

            {/* Asks (Sell) */}
            <div className="px-4 text-xs bg-[#111] pt-2">
              <div className="grid grid-cols-3 text-gray-500 mb-1 text-[10px]">
                <div>Price (USDT)</div>
                <div className="text-right">Amount (MX)</div>
                <div className="text-right">Total (USDT)</div>
              </div>
              {[
                [1.6699, "1,462.09", "2,441.54"],
                [1.6698, "151.95", "253.72"],
                [1.6695, "288.71", "482.00"],
                [1.6690, "263.03", "438.99"],
                [1.6687, "279.26", "466.00"]
              ].map(([price, amt, total], i) => (
                <div key={i} className="grid grid-cols-3 py-[3px] text-sm hover:bg-red-500/10 text-red-400">
                  <div>{price}</div>
                  <div className="text-right text-gray-300">{amt}</div>
                  <div className="text-right text-gray-300">{total}</div>
                </div>
              ))}
            </div>

            {/* Current Price */}
            <div className="bg-[#1C1C1C] py-5 text-center border-y border-gray-700">
              <div className="text-3xl font-bold">1.6667</div>
              <div className="text-green-400 text-sm">↑ $1.66</div>
            </div>

            {/* Bids (Buy) */}
            <div className="px-4 text-xs flex-1 overflow-auto">
              {[
                [1.6666, "759.70", "1,266.04"],
                [1.6665, "269.46", "449.00"],
                [1.6663, "256.93", "427.99"],
                [1.6658, "1,242.57", "2,069.25"],
                [1.6653, "273.24", "454.99"]
              ].map(([price, amt, total], i) => (
                <div key={i} className="grid grid-cols-3 py-[3px] text-sm hover:bg-green-500/10 text-green-400">
                  <div>{price}</div>
                  <div className="text-right text-gray-300">{amt}</div>
                  <div className="text-right text-gray-300">{total}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Trading Panel */}
          <div className="border-t border-gray-700 bg-[#111] p-5">
            <div className="flex rounded-xl overflow-hidden mb-4 bg-gray-900">
              <button 
                onClick={() => setSide('buy')}
                className={`flex-1 py-3 text-lg font-bold ${side === 'buy' ? 'bg-green-500 text-black' : 'text-gray-400'}`}
              >
                Buy
              </button>
              <button 
                onClick={() => setSide('sell')}
                className={`flex-1 py-3 text-lg font-bold ${side === 'sell' ? 'bg-red-500 text-white' : 'text-gray-400'}`}
              >
                Sell
              </button>
            </div>

            <div className="flex gap-2 mb-5 text-sm">
              <button onClick={() => setOrderMode('limit')} className={`flex-1 py-2 rounded-lg ${orderMode === 'limit' ? 'bg-gray-700' : ''}`}>Limit</button>
              <button onClick={() => setOrderMode('market')} className={`flex-1 py-2 rounded-lg ${orderMode === 'market' ? 'bg-gray-700' : ''}`}>Market</button>
              <button onClick={() => setOrderMode('tpSl')} className={`flex-1 py-2 rounded-lg ${orderMode === 'tpSl' ? 'bg-gray-700' : ''}`}>TP/SL</button>
            </div>

            <div className="space-y-5">
              <div>
                <div className="text-xs text-gray-400 mb-2">Price (USDT)</div>
                <input type="text" defaultValue="1.6667" className="w-full bg-gray-900 border border-gray-700 rounded-xl px-4 py-3 font-mono text-lg" />
              </div>

              <div>
                <div className="text-xs text-gray-400 mb-2">Amount (MX)</div>
                <input type="text" placeholder="0.00" className="w-full bg-gray-900 border border-gray-700 rounded-xl px-4 py-3 font-mono text-lg" />
              </div>

              <div className="pt-2">
                <button 
                  className={`w-full py-4 rounded-2xl text-xl font-bold transition-all ${side === 'buy' ? 'bg-green-500 hover:bg-green-600 text-black' : 'bg-red-500 hover:bg-red-600'}`}
                >
                  {side === 'buy' ? 'Buy MX' : 'Sell MX'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
