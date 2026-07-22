"use client";

import Link from "next/link";

export default function DashboardPage() {
  const assets = [
    { symbol: "BTC", balance: 0.0523, value: 3250, change: 2.45 },
    { symbol: "ETH", balance: 2.456, value: 6250, change: -1.23 },
    { symbol: "USDT", balance: 3043.75, value: 3043.75, change: 0.01 },
  ];

  const totalBalance = assets.reduce((sum, a) => sum + a.value, 0);

  return (
    <div className="p-4 space-y-6">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Dashboard</h1>
          <p className="text-sm text-gray-500 mt-1">Welcome back, Trader! 👋</p>
        </div>
        <div className="flex gap-3">
          <Link href="/deposit">
            <button className="px-4 py-2 bg-yellow-500 text-black rounded-xl hover:bg-yellow-400 transition text-sm font-medium">
              + Deposit
            </button>
          </Link>
          <Link href="/trade/BTCUSDT">
            <button className="px-4 py-2 bg-[#2b2d33] text-white rounded-xl hover:bg-[#3b3d43] transition text-sm font-medium">
              Trade
            </button>
          </Link>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-[#1a1a1a] p-4 rounded-xl border border-[#2b2d33]">
          <p className="text-sm text-gray-500">Total Balance</p>
          <p className="text-2xl font-bold text-white mt-1">${totalBalance.toFixed(2)}</p>
          <p className="text-xs text-green-500 mt-1">+2.5% today</p>
        </div>
        <div className="bg-[#1a1a1a] p-4 rounded-xl border border-[#2b2d33]">
          <p className="text-sm text-gray-500">24h Volume</p>
          <p className="text-2xl font-bold text-white mt-1">$3,245</p>
          <p className="text-xs text-green-500 mt-1">+12.3%</p>
        </div>
        <div className="bg-[#1a1a1a] p-4 rounded-xl border border-[#2b2d33]">
          <p className="text-sm text-gray-500">Open Orders</p>
          <p className="text-2xl font-bold text-white mt-1">3</p>
          <p className="text-xs text-yellow-400 mt-1">2 limit, 1 market</p>
        </div>
        <div className="bg-[#1a1a1a] p-4 rounded-xl border border-[#2b2d33]">
          <p className="text-sm text-gray-500">P/L</p>
          <p className="text-2xl font-bold text-green-500 mt-1">+$1,234</p>
          <p className="text-xs text-green-500 mt-1">+42.8% all time</p>
        </div>
      </div>

      {/* Assets Table with View All Link */}
      <div className="bg-[#1a1a1a] rounded-xl border border-[#2b2d33] overflow-hidden">
        <div className="flex items-center justify-between p-4 border-b border-[#2b2d33]">
          <div>
            <h2 className="text-white font-bold">Your Assets</h2>
            <p className="text-xs text-gray-500">Manage your portfolio</p>
          </div>
          {/* 🔥 FIX: View All button with Link */}
          <Link href="/dashboard/assets">
            <button className="text-xs text-yellow-400 hover:text-yellow-300 transition">
              View All →
            </button>
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-black/30">
              <tr>
                <th className="px-4 py-3 text-left text-xs text-gray-500">Asset</th>
                <th className="px-4 py-3 text-right text-xs text-gray-500">Balance</th>
                <th className="px-4 py-3 text-right text-xs text-gray-500">Value</th>
                <th className="px-4 py-3 text-right text-xs text-gray-500">24h Change</th>
                <th className="px-4 py-3 text-right text-xs text-gray-500">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#2b2d33]">
              {assets.map((asset) => (
                <tr key={asset.symbol} className="hover:bg-[#2b2d33]/50 transition-colors">
                  <td className="px-4 py-3 text-white font-medium">{asset.symbol}</td>
                  <td className="px-4 py-3 text-right text-white">{asset.balance.toFixed(4)}</td>
                  <td className="px-4 py-3 text-right text-white">${asset.value.toFixed(2)}</td>
                  <td className={`px-4 py-3 text-right font-bold ${asset.change >= 0 ? "text-green-500" : "text-red-500"}`}>
                    {asset.change >= 0 ? "+" : ""}{asset.change}%
                  </td>
                  <td className="px-4 py-3 text-right">
                    <Link href={`/trade/${asset.symbol}USDT`}>
                      <button className="px-3 py-1 bg-yellow-500/10 text-yellow-400 text-xs rounded hover:bg-yellow-500/20 transition">
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
