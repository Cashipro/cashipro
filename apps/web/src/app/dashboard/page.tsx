"use client";

import Link from "next/link";

export default function DashboardPage() {
  const assets = [
    { symbol: "BTC", balance: 0.05, value: 3250, change: 2.5 },
    { symbol: "ETH", balance: 2.5, value: 6250, change: -1.2 },
    { symbol: "USDT", balance: 3043.75, value: 3043.75, change: 0.01 },
  ];

  const totalBalance = assets.reduce((sum, a) => sum + a.value, 0);

  return (
    <div className="min-h-screen bg-black p-4">
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-white">Dashboard</h1>
          <p className="text-sm text-gray-400 mt-1">Welcome back, Trader! 👋</p>
        </div>
        <div className="flex gap-3">
          <Link href="/trade/BTCUSDT" className="px-4 py-2 bg-yellow-500 text-black rounded-lg hover:bg-yellow-400 text-sm font-medium">
            Trade
          </Link>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-[#1a1a1a] p-4 rounded-xl border border-gray-800">
          <p className="text-sm text-gray-400">Total Balance</p>
          <p className="text-xl font-bold text-white">${totalBalance.toFixed(2)}</p>
        </div>
        <div className="bg-[#1a1a1a] p-4 rounded-xl border border-gray-800">
          <p className="text-sm text-gray-400">24h Volume</p>
          <p className="text-xl font-bold text-white">$3,245</p>
        </div>
        <div className="bg-[#1a1a1a] p-4 rounded-xl border border-gray-800">
          <p className="text-sm text-gray-400">Open Orders</p>
          <p className="text-xl font-bold text-white">3</p>
        </div>
        <div className="bg-[#1a1a1a] p-4 rounded-xl border border-gray-800">
          <p className="text-sm text-gray-400">P/L</p>
          <p className="text-xl font-bold text-green-500">+$1,234</p>
        </div>
      </div>

      {/* Assets Table */}
      <div className="bg-[#1a1a1a] rounded-xl border border-gray-800 overflow-hidden">
        <div className="p-4 border-b border-gray-800">
          <h2 className="text-white font-bold">Your Assets</h2>
        </div>
        <table className="w-full">
          <thead className="bg-black/40">
            <tr>
              <th className="px-4 py-3 text-left text-xs text-gray-400">Asset</th>
              <th className="px-4 py-3 text-right text-xs text-gray-400">Balance</th>
              <th className="px-4 py-3 text-right text-xs text-gray-400">Value</th>
              <th className="px-4 py-3 text-right text-xs text-gray-400">Change</th>
            </tr>
          </thead>
          <tbody>
            {assets.map((asset) => (
              <tr key={asset.symbol} className="border-t border-gray-800 hover:bg-gray-800/50">
                <td className="px-4 py-3 text-white font-medium">{asset.symbol}</td>
                <td className="px-4 py-3 text-right text-white">{asset.balance.toFixed(4)}</td>
                <td className="px-4 py-3 text-right text-white">${asset.value.toFixed(2)}</td>
                <td className={`px-4 py-3 text-right font-bold ${asset.change >= 0 ? "text-green-500" : "text-red-500"}`}>
                  {asset.change >= 0 ? "+" : ""}{asset.change}%
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
