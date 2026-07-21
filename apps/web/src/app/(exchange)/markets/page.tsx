'use client';

import { useState } from 'react';
import Link from 'next/link';

interface Market {
  symbol: string;
  baseAsset: string;
  quoteAsset: string;
  price: number;
  change24h: number;
  volume24h: number;
}

export default function MarketsPage() {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState<'all' | 'gainers' | 'losers'>('all');

  const markets: Market[] = [
    { symbol: 'BTC/USDT', baseAsset: 'BTC', quoteAsset: 'USDT', price: 65000, change24h: 2.5, volume24h: 1250000000 },
    { symbol: 'ETH/USDT', baseAsset: 'ETH', quoteAsset: 'USDT', price: 3500, change24h: -1.2, volume24h: 850000000 },
    { symbol: 'BNB/USDT', baseAsset: 'BNB', quoteAsset: 'USDT', price: 600, change24h: 5.8, volume24h: 450000000 },
    { symbol: 'SOL/USDT', baseAsset: 'SOL', quoteAsset: 'USDT', price: 180, change24h: 8.2, volume24h: 320000000 },
    { symbol: 'XRP/USDT', baseAsset: 'XRP', quoteAsset: 'USDT', price: 0.62, change24h: -2.1, volume24h: 280000000 },
  ];

  const filtered = markets.filter(m => {
    const matchSearch = m.symbol.toLowerCase().includes(search.toLowerCase());
    if (filter === 'gainers') return matchSearch && m.change24h > 0;
    if (filter === 'losers') return matchSearch && m.change24h < 0;
    return matchSearch;
  });

  return (
    <div className="space-y-6 fade-in">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Markets</h1>
          <p className="text-gray-400 text-sm mt-1">Explore and trade cryptocurrencies</p>
        </div>
      </div>

      {/* Search & Filter */}
      <div className="flex flex-col sm:flex-row gap-4">
        <input
          type="text"
          placeholder="Search markets..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <div className="flex gap-2">
          {(['all', 'gainers', 'losers'] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                filter === f
                  ? f === 'gainers' ? 'bg-green-600 text-white' : f === 'losers' ? 'bg-red-600 text-white' : 'bg-blue-600 text-white'
                  : 'bg-white/5 text-gray-400 hover:bg-white/10'
              }`}
            >
              {f.charAt(0).toUpperCase() + f.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Markets Table */}
      <div className="glass rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-white/5">
              <tr>
                <th className="px-4 py-3 text-left text-xs text-gray-400 font-medium">Market</th>
                <th className="px-4 py-3 text-right text-xs text-gray-400 font-medium">Price</th>
                <th className="px-4 py-3 text-right text-xs text-gray-400 font-medium">24h Change</th>
                <th className="px-4 py-3 text-right text-xs text-gray-400 font-medium">24h Volume</th>
                <th className="px-4 py-3 text-right text-xs text-gray-400 font-medium">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filtered.map((market) => (
                <tr key={market.symbol} className="hover:bg-white/5 transition-colors">
                  <td className="px-4 py-3">
                    <div>
                      <p className="text-white font-medium">{market.baseAsset}</p>
                      <p className="text-xs text-gray-400">{market.quoteAsset}</p>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-right text-white">
                    ${market.price.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                  </td>
                  <td className="px-4 py-3 text-right">
                    <span className={market.change24h >= 0 ? 'text-green-500' : 'text-red-500'}>
                      {market.change24h >= 0 ? '+' : ''}{market.change24h}%
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right text-gray-300">
                    ${(market.volume24h / 1000000).toFixed(1)}M
                  </td>
                  <td className="px-4 py-3 text-right">
                    <Link
                      href={`/trade/${market.symbol}`}
                      className="px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 transition-colors inline-block"
                    >
                      Trade
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
