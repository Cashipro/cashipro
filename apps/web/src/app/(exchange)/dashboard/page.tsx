'use client';

import { useState, useEffect } from 'react';

interface Asset {
  symbol: string;
  balance: number;
  value: number;
  change24h: number;
}

export default function DashboardPage() {
  const [assets, setAssets] = useState<Asset[]>([
    { symbol: 'BTC', balance: 0.05, value: 3250, change24h: 2.5 },
    { symbol: 'ETH', balance: 2.5, value: 6250, change24h: -1.2 },
    { symbol: 'USDT', balance: 3043.75, value: 3043.75, change24h: 0.01 },
  ]);

  const totalBalance = assets.reduce((sum, a) => sum + a.value, 0);
  const [timeframe, setTimeframe] = useState('1M');

  return (
    <div className="space-y-6 fade-in">
      {/* Welcome */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Dashboard</h1>
          <p className="text-gray-400 text-sm mt-1">Welcome back, Trader! 👋</p>
        </div>
        <div className="flex gap-3">
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm">
            Deposit
          </button>
          <button className="px-4 py-2 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-colors text-sm">
            Withdraw
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="glass rounded-xl p-4">
          <p className="text-xs text-gray-400">Total Balance</p>
          <p className="text-xl font-bold text-white mt-1">
            ${totalBalance.toLocaleString('en-US', { minimumFractionDigits: 2 })}
          </p>
          <p className="text-xs text-green-500 mt-1">+2.5% today</p>
        </div>
        <div className="glass rounded-xl p-4">
          <p className="text-xs text-gray-400">24h Volume</p>
          <p className="text-xl font-bold text-white mt-1">$3,245.80</p>
          <p className="text-xs text-green-500 mt-1">+12.3%</p>
        </div>
        <div className="glass rounded-xl p-4">
          <p className="text-xs text-gray-400">Open Orders</p>
          <p className="text-xl font-bold text-white mt-1">3</p>
          <p className="text-xs text-yellow-500 mt-1">2 limit, 1 market</p>
        </div>
        <div className="glass rounded-xl p-4">
          <p className="text-xs text-gray-400">Profit/Loss</p>
          <p className="text-xl font-bold text-green-500 mt-1">+$1,234.50</p>
          <p className="text-xs text-green-500 mt-1">+42.8% all time</p>
        </div>
      </div>

      {/* Assets */}
      <div className="glass rounded-xl overflow-hidden">
        <div className="p-4 border-b border-white/10">
          <h3 className="text-white font-medium">Your Assets</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-white/5">
              <tr>
                <th className="px-4 py-3 text-left text-xs text-gray-400 font-medium">Asset</th>
                <th className="px-4 py-3 text-right text-xs text-gray-400 font-medium">Balance</th>
                <th className="px-4 py-3 text-right text-xs text-gray-400 font-medium">Value (USD)</th>
                <th className="px-4 py-3 text-right text-xs text-gray-400 font-medium">24h Change</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {assets.map((asset) => (
                <tr key={asset.symbol} className="hover:bg-white/5 transition-colors">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-xs font-bold">
                        {asset.symbol.slice(0, 2)}
                      </div>
                      <span className="text-white font-medium">{asset.symbol}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-right text-white">
                    {asset.balance.toFixed(4)}
                  </td>
                  <td className="px-4 py-3 text-right text-white">
                    ${asset.value.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                  </td>
                  <td className="px-4 py-3 text-right">
                    <span className={asset.change24h >= 0 ? 'text-green-500' : 'text-red-500'}>
                      {asset.change24h >= 0 ? '+' : ''}{asset.change24h}%
                    </span>
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
