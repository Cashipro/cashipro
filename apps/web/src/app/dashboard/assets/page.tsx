"use client";

import Link from "next/link";

const assets = [
  { symbol: "BTC", name: "Bitcoin", balance: 0.0523, available: 0.0482, inOrder: 0.0041, value: 3250, change: 2.45 },
  { symbol: "ETH", name: "Ethereum", balance: 2.456, available: 2.356, inOrder: 0.1, value: 6250, change: -1.23 },
  { symbol: "USDT", name: "Tether", balance: 3043.75, available: 3043.75, inOrder: 0, value: 3043.75, change: 0.01 },
  { symbol: "BNB", name: "BNB", balance: 5.21, available: 5.01, inOrder: 0.2, value: 1560, change: 5.67 },
  { symbol: "SOL", name: "Solana", balance: 12.45, available: 12.45, inOrder: 0, value: 1780, change: 8.12 },
  { symbol: "XRP", name: "Ripple", balance: 245.67, available: 245.67, inOrder: 0, value: 152.31, change: -2.01 },
  { symbol: "ADA", name: "Cardano", balance: 1250, available: 1250, inOrder: 0, value: 575, change: 3.45 },
  { symbol: "DOT", name: "Polkadot", balance: 85.5, available: 85.5, inOrder: 0, value: 668, change: -0.56 },
  { symbol: "MATIC", name: "Polygon", balance: 450, available: 450, inOrder: 0, value: 324, change: 4.56 },
  { symbol: "LINK", name: "Chainlink", balance: 12.8, available: 12.8, inOrder: 0, value: 183, change: -0.89 },
];

export default function DashboardAssetsPage() {
  const totalBalance = assets.reduce((sum, a) => sum + a.value, 0);

  return (
    <div className="min-h-screen bg-black p-4">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <Link href="/dashboard" className="text-gray-400 hover:text-white text-sm">← Back to Dashboard</Link>
            <h1 className="text-2xl font-bold text-white mt-1">📊 All Assets</h1>
            <p className="text-sm text-gray-500">Complete view of your portfolio</p>
          </div>
          <div className="bg-[#1a1a1a] px-4 py-2 rounded-xl border border-[#2b2d33]">
            <p className="text-xs text-gray-500">Total Balance</p>
            <p className="text-xl font-bold text-yellow-400">${totalBalance.toLocaleString("en-US", { minimumFractionDigits: 2 })}</p>
          </div>
        </div>

        {/* Assets Table */}
        <div className="bg-[#1a1a1a] rounded-xl border border-[#2b2d33] overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-black/30">
                <tr>
                  <th className="px-4 py-3 text-left text-xs text-gray-500">Asset</th>
                  <th className="px-4 py-3 text-right text-xs text-gray-500">Balance</th>
                  <th className="px-4 py-3 text-right text-xs text-gray-500">Available</th>
                  <th className="px-4 py-3 text-right text-xs text-gray-500">In Order</th>
                  <th className="px-4 py-3 text-right text-xs text-gray-500">Value (USD)</th>
                  <th className="px-4 py-3 text-right text-xs text-gray-500">24h Change</th>
                  <th className="px-4 py-3 text-right text-xs text-gray-500">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#2b2d33]">
                {assets.map((asset) => (
                  <tr key={asset.symbol} className="hover:bg-[#2b2d33]/50 transition-colors">
                    <td className="px-4 py-3">
                      <div>
                        <p className="text-white font-medium">{asset.symbol}</p>
                        <p className="text-xs text-gray-500">{asset.name}</p>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-right text-white text-sm">{asset.balance.toFixed(4)}</td>
                    <td className="px-4 py-3 text-right text-gray-300 text-sm">{asset.available.toFixed(4)}</td>
                    <td className="px-4 py-3 text-right text-yellow-400 text-sm">{asset.inOrder.toFixed(4)}</td>
                    <td className="px-4 py-3 text-right text-white font-medium text-sm">${asset.value.toFixed(2)}</td>
                    <td className={`px-4 py-3 text-right text-sm font-bold ${asset.change >= 0 ? "text-green-500" : "text-red-500"}`}>
                      {asset.change >= 0 ? "+" : ""}{asset.change}%
                    </td>
                    <td className="px-4 py-3 text-right">
                      <Link href={`/trade/${asset.symbol}USDT`}>
                        <button className="px-3 py-1.5 bg-yellow-500/10 text-yellow-400 text-xs rounded hover:bg-yellow-500/20 transition">
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
    </div>
  );
}
