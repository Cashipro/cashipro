'use client';

import { useState } from 'react';
import Link from 'next/link';

interface Asset {
  symbol: string;
  name: string;
  balance: number;
  value: number;
  change24h: number;
}

export default function WalletPage() {
  const [assets, setAssets] = useState<Asset[]>([
    { symbol: 'BTC', name: 'Bitcoin', balance: 0.05, value: 3250, change24h: 2.5 },
    { symbol: 'ETH', name: 'Ethereum', balance: 2.5, value: 6250, change24h: -1.2 },
    { symbol: 'USDT', name: 'Tether', balance: 3043.75, value: 3043.75, change24h: 0.01 },
    { symbol: 'BNB', name: 'BNB', balance: 5.2, value: 1560, change24h: 5.8 },
  ]);

  const totalBalance = assets.reduce((sum, a) => sum + a.value, 0);

  return (
    <div className="space-y-6 fade-in">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Wallet</h1>
          <p className="text-gray-400 text-sm mt-1">Manage your assets</p>
        </div>
        <div className="flex gap-3">
          <Link href="/deposit">
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm">
              Deposit
            </button>
          </Link>
          <Link href="/withdraw">
            <button className="px-4 py-2 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-colors text-sm">
              Withdraw
            </button>
          </Link>
        </div>
      </div>

      {/* Total Balance */}
      <div className="glass rounded-xl p-6">
        <p className="text-sm text-gray-400">Total Balance</p>
        <p className="text-3xl font-bold text-white mt-1">
          ${totalBalance.toLocaleString('en-US', { minimumFractionDigits: 2 })}
        </p>
        <p className="text-xs text-green-500 mt-2">+2.5% this month</p>
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
                <th className="px-4 py-3 text-right text-xs text-gray-400 font-medium">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {assets.map((asset) => (
                <tr key={asset.symbol} className="hover:bg-white/5 transition-colors">
                  <td className="px-4 py-3">
                    <div>
                      <p className="text-white font-medium">{asset.symbol}</p>
                      <p className="text-xs text-gray-400">{asset.name}</p>
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
                  <td className="px-4 py-3 text-right">
                    <Link href={`/trade/${asset.symbol}USDT`}>
                      <button className="px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 transition-colors">
                        Trade
                      </button>
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
