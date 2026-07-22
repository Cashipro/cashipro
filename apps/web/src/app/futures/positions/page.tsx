"use client";

import Link from "next/link";

const positions = [
  { pair: "BTC/USDT", side: "Long", size: 0.05, entry: 64500, current: 65432, pnl: 46.62, leverage: "10x", margin: "Cross" },
  { pair: "ETH/USDT", side: "Short", size: 0.5, entry: 3456, current: 3400, pnl: -28.00, leverage: "5x", margin: "Isolated" },
  { pair: "SOL/USDT", side: "Long", size: 2.0, entry: 175, current: 178, pnl: 6.00, leverage: "20x", margin: "Cross" },
];

export default function FuturesPositionsPage() {
  return (
    <div className="min-h-screen bg-black p-4">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <Link href="/futures" className="text-gray-400 hover:text-white text-sm">← Back to Futures</Link>
            <h1 className="text-2xl font-bold text-white mt-1">📊 Open Positions</h1>
            <p className="text-sm text-gray-500">Manage your futures positions</p>
          </div>
          <div className="flex items-center gap-3">
            <span className="px-4 py-2 bg-green-500/10 text-green-500 rounded-lg text-sm font-bold">
              Total PnL: +$24.62
            </span>
          </div>
        </div>

        {/* Positions Table */}
        <div className="bg-[#1a1a1a] rounded-xl border border-[#2b2d33] overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-black/30">
                <tr>
                  <th className="px-4 py-3 text-left text-xs text-gray-500">Pair</th>
                  <th className="px-4 py-3 text-left text-xs text-gray-500">Side</th>
                  <th className="px-4 py-3 text-right text-xs text-gray-500">Size</th>
                  <th className="px-4 py-3 text-right text-xs text-gray-500">Entry</th>
                  <th className="px-4 py-3 text-right text-xs text-gray-500">Current</th>
                  <th className="px-4 py-3 text-right text-xs text-gray-500">PnL</th>
                  <th className="px-4 py-3 text-right text-xs text-gray-500">Leverage</th>
                  <th className="px-4 py-3 text-right text-xs text-gray-500">Margin</th>
                  <th className="px-4 py-3 text-right text-xs text-gray-500">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#2b2d33]">
                {positions.length === 0 ? (
                  <tr>
                    <td colSpan={9} className="px-4 py-8 text-center text-gray-500">
                      No open positions
                    </td>
                  </tr>
                ) : (
                  positions.map((pos, i) => (
                    <tr key={i} className="hover:bg-[#2b2d33]/50 transition-colors">
                      <td className="px-4 py-3 text-white font-medium">{pos.pair}</td>
                      <td className="px-4 py-3">
                        <span className={`text-xs px-2 py-1 rounded font-bold ${pos.side === "Long" ? "bg-green-500/20 text-green-500" : "bg-red-500/20 text-red-500"}`}>
                          {pos.side}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-right text-white">{pos.size}</td>
                      <td className="px-4 py-3 text-right text-white">${pos.entry.toFixed(2)}</td>
                      <td className="px-4 py-3 text-right text-white">${pos.current.toFixed(2)}</td>
                      <td className={`px-4 py-3 text-right font-bold ${pos.pnl >= 0 ? "text-green-500" : "text-red-500"}`}>
                        ${pos.pnl.toFixed(2)}
                      </td>
                      <td className="px-4 py-3 text-right text-yellow-400">{pos.leverage}</td>
                      <td className="px-4 py-3 text-right">
                        <span className={`text-xs px-2 py-1 rounded ${pos.margin === "Cross" ? "bg-yellow-500/10 text-yellow-400" : "bg-blue-500/10 text-blue-400"}`}>
                          {pos.margin}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-right">
                        <button className="px-3 py-1.5 bg-red-500/10 text-red-500 text-xs rounded hover:bg-red-500/20 transition">
                          Close
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
