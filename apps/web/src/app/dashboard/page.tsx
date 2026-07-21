"use client";

import Link from "next/link";

export default function DashboardPage() {
  const assets = [
    { symbol: "BTC", balance: "0.0523", value: "$3,250.00", change: "+2.45%" },
    { symbol: "ETH", balance: "2.4560", value: "$6,250.00", change: "-1.23%" },
    { symbol: "USDT", balance: "3,043.75", value: "$3,043.75", change: "+0.01%" },
    { symbol: "BNB", balance: "5.2100", value: "$1,560.00", change: "+5.67%" },
    { symbol: "SOL", balance: "12.4500", value: "$1,780.00", change: "+8.12%" },
  ];

  const totalBalance = assets.reduce((sum, a) => sum + parseFloat(a.value.replace(/\$|,/g, "")), 0);

  return (
    <div className="p-4 space-y-6">
      {/* Stats Cards - MEXC Professional */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-[#1a1a1a] p-5 rounded-xl border border-[#2b2d33] hover:border-[#3b3d43] transition-all">
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-400">Total Balance</p>
            <span className="text-xs text-green-500 bg-green-500/10 px-2 py-1 rounded">+2.5%</span>
          </div>
          <p className="text-2xl font-bold text-white mt-2">${totalBalance.toFixed(2)}</p>
          <p className="text-xs text-gray-500 mt-1">≈ $12,543.75 USD</p>
        </div>

        <div className="bg-[#1a1a1a] p-5 rounded-xl border border-[#2b2d33] hover:border-[#3b3d43] transition-all">
          <p className="text-sm text-gray-400">24h Volume</p>
          <p className="text-2xl font-bold text-white mt-2">$3,245.80</p>
          <p className="text-xs text-green-500 mt-1">+12.3%</p>
        </div>

        <div className="bg-[#1a1a1a] p-5 rounded-xl border border-[#2b2d33] hover:border-[#3b3d43] transition-all">
          <p className="text-sm text-gray-400">Open Orders</p>
          <p className="text-2xl font-bold text-white mt-2">3</p>
          <p className="text-xs text-yellow-400 mt-1">2 limit, 1 market</p>
        </div>

        <div className="bg-[#1a1a1a] p-5 rounded-xl border border-[#2b2d33] hover:border-[#3b3d43] transition-all">
          <p className="text-sm text-gray-400">Profit / Loss</p>
          <p className="text-2xl font-bold text-green-500 mt-2">+$1,234.50</p>
          <p className="text-xs text-green-500 mt-1">+42.8% all time</p>
        </div>
      </div>

      {/* Assets Table - Professional */}
      <div className="bg-[#1a1a1a] rounded-xl border border-[#2b2d33] overflow-hidden">
        <div className="flex items-center justify-between p-4 border-b border-[#2b2d33]">
          <div>
            <h2 className="text-white font-bold">Your Assets</h2>
            <p className="text-xs text-gray-500">Manage your portfolio</p>
          </div>
          <button className="text-xs text-yellow-400 hover:text-yellow-300">View All →</button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-black/30">
              <tr>
                <th className="px-4 py-3 text-left text-xs text-gray-500 font-medium">Asset</th>
                <th className="px-4 py-3 text-right text-xs text-gray-500 font-medium">Balance</th>
                <th className="px-4 py-3 text-right text-xs text-gray-500 font-medium">Value</th>
                <th className="px-4 py-3 text-right text-xs text-gray-500 font-medium">24h Change</th>
                <th className="px-4 py-3 text-right text-xs text-gray-500 font-medium">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#2b2d33]">
              {assets.map((asset) => {
                const isPositive = asset.change.startsWith("+");
                return (
                  <tr key={asset.symbol} className="hover:bg-[#2b2d33]/50 transition-colors">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center text-xs font-bold text-black">
                          {asset.symbol.slice(0, 2)}
                        </div>
                        <div>
                          <p className="text-white font-medium text-sm">{asset.symbol}</p>
                          <p className="text-xs text-gray-500">{asset.symbol === "USDT" ? "Tether" : "Crypto"}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-right text-white text-sm">
                      {asset.balance}
                    </td>
                    <td className="px-4 py-3 text-right text-white text-sm">
                      {asset.value}
                    </td>
                    <td className="px-4 py-3 text-right">
                      <span className={`text-sm font-bold ${isPositive ? "text-green-500" : "text-red-500"}`}>
                        {asset.change}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <Link href={`/trade/${asset.symbol}USDT`}>
                        <button className="px-4 py-1.5 bg-yellow-500/10 text-yellow-400 text-xs rounded hover:bg-yellow-500/20 transition-colors">
                          Trade
                        </button>
                      </Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-[#1a1a1a] rounded-xl border border-[#2b2d33] p-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-white font-bold">Recent Activity</h2>
          <span className="text-xs text-gray-500">Today</span>
        </div>
        <div className="space-y-2">
          {[
            { type: "Buy", pair: "BTC/USDT", amount: "+0.05 BTC", time: "5 min ago", status: "Completed" },
            { type: "Sell", pair: "ETH/USDT", amount: "-0.50 ETH", time: "1 hour ago", status: "Completed" },
            { type: "Deposit", pair: "USDT", amount: "+500 USDT", time: "2 hours ago", status: "Pending" },
            { type: "Buy", pair: "SOL/USDT", amount: "+10 SOL", time: "3 hours ago", status: "Completed" },
          ].map((activity, i) => (
            <div key={i} className="flex items-center justify-between py-2 px-3 bg-black/30 rounded-lg">
              <div className="flex items-center gap-3">
                <span className={`text-sm font-medium ${activity.type === "Buy" || activity.type === "Deposit" ? "text-green-500" : "text-red-500"}`}>
                  {activity.type}
                </span>
                <span className="text-sm text-white">{activity.pair}</span>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-sm text-white">{activity.amount}</span>
                <span className="text-xs text-gray-500">{activity.time}</span>
                <span className={`text-xs px-2 py-1 rounded ${activity.status === "Completed" ? "bg-green-500/10 text-green-500" : "bg-yellow-500/10 text-yellow-400"}`}>
                  {activity.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
