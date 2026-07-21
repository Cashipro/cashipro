"use client";

import Link from "next/link";

export default function DashboardPage() {
  // Mock Data
  const assets = [
    { symbol: "BTC", balance: 0.05, value: 3250, change: 2.5 },
    { symbol: "ETH", balance: 2.5, value: 6250, change: -1.2 },
    { symbol: "USDT", balance: 3043.75, value: 3043.75, change: 0.01 },
    { symbol: "BNB", balance: 5.2, value: 1560, change: 5.8 },
  ];

  const totalBalance = assets.reduce((sum, a) => sum + a.value, 0);

  return (
    <div className="space-y-6">
      {/* Page Title */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Dashboard</h1>
          <p className="text-sm text-gray-400 mt-1">Welcome back, Trader! 👋</p>
        </div>
        <div className="flex gap-3">
          <Link
            href="/deposit"
            className="px-4 py-2 bg-yellow-500 text-black rounded-lg hover:bg-yellow-400 text-sm font-medium"
          >
            + Deposit
          </Link>
          <Link
            href="/trade/BTCUSDT"
            className="px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 text-sm font-medium"
          >
            Trade
          </Link>
        </div>
      </div>

      {/* Stats Cards - MEXC Style */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-[#1a1a1a] p-4 rounded-xl border border-gray-800">
          <p className="text-sm text-gray-400">Total Balance</p>
          <p className="text-2xl font-bold text-white mt-1">
            ${totalBalance.toLocaleString("en-US", { minimumFractionDigits: 2 })}
          </p>
          <p className="text-xs text-green-500 mt-1">+2.5% today</p>
        </div>
        <div className="bg-[#1a1a1a] p-4 rounded-xl border border-gray-800">
          <p className="text-sm text-gray-400">24h Volume</p>
          <p className="text-2xl font-bold text-white mt-1">$3,245.80</p>
          <p className="text-xs text-green-500 mt-1">+12.3%</p>
        </div>
        <div className="bg-[#1a1a1a] p-4 rounded-xl border border-gray-800">
          <p className="text-sm text-gray-400">Open Orders</p>
          <p className="text-2xl font-bold text-white mt-1">3</p>
          <p className="text-xs text-yellow-400 mt-1">2 limit, 1 market</p>
        </div>
        <div className="bg-[#1a1a1a] p-4 rounded-xl border border-gray-800">
          <p className="text-sm text-gray-400">Profit/Loss</p>
          <p className="text-2xl font-bold text-green-500 mt-1">+$1,234.50</p>
          <p className="text-xs text-green-500 mt-1">+42.8% all time</p>
        </div>
      </div>

      {/* Assets Table */}
      <div className="bg-[#1a1a1a] rounded-xl border border-gray-800 overflow-hidden">
        <div className="p-4 border-b border-gray-800">
          <h2 className="text-white font-bold">Your Assets</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-black/40">
              <tr>
                <th className="px-4 py-3 text-left text-xs text-gray-400 font-medium">Asset</th>
                <th className="px-4 py-3 text-right text-xs text-gray-400 font-medium">Balance</th>
                <th className="px-4 py-3 text-right text-xs text-gray-400 font-medium">Value (USD)</th>
                <th className="px-4 py-3 text-right text-xs text-gray-400 font-medium">24h Change</th>
                <th className="px-4 py-3 text-right text-xs text-gray-400 font-medium">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800">
              {assets.map((asset) => (
                <tr key={asset.symbol} className="hover:bg-gray-800/50 transition-colors">
                  <td className="px-4 py-3">
                    <div>
                      <p className="text-white font-medium">{asset.symbol}</p>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-right text-white">
                    {asset.balance.toFixed(4)}
                  </td>
                  <td className="px-4 py-3 text-right text-white">
                    ${asset.value.toLocaleString("en-US", { minimumFractionDigits: 2 })}
                  </td>
                  <td className="px-4 py-3 text-right">
                    <span
                      className={`${
                        asset.change >= 0 ? "text-green-500" : "text-red-500"
                      } font-medium`}
                    >
                      {asset.change >= 0 ? "+" : ""}
                      {asset.change}%
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <Link
                      href={`/trade/${asset.symbol}USDT`}
                      className="px-3 py-1 bg-yellow-500 text-black text-sm rounded hover:bg-yellow-400"
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

      {/* Recent Activity */}
      <div className="bg-[#1a1a1a] p-4 rounded-xl border border-gray-800">
        <h2 className="text-white font-bold mb-4">Recent Activity</h2>
        <div className="space-y-2">
          {[
            { type: "Buy", pair: "BTC/USDT", amount: "+0.05 BTC", time: "5 min ago" },
            { type: "Sell", pair: "ETH/USDT", amount: "-0.5 ETH", time: "1 hour ago" },
            { type: "Deposit", pair: "USDT", amount: "+500 USDT", time: "2 hours ago" },
          ].map((activity, i) => (
            <div key={i} className="flex items-center justify-between py-2 border-b border-gray-800/50">
              <div className="flex items-center gap-3">
                <span
                  className={`text-sm font-medium ${
                    activity.type === "Buy" || activity.type === "Deposit"
                      ? "text-green-500"
                      : "text-red-500"
                  }`}
                >
                  {activity.type}
                </span>
                <span className="text-sm text-white">{activity.pair}</span>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-sm text-white">{activity.amount}</span>
                <span className="text-xs text-gray-400">{activity.time}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
