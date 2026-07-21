"use client";

import { useState } from "react";
import Link from "next/link";

const futuresPairs = [
  { symbol: "BTC/USDT", price: 65432, change: 2.45, volume: "2.5B", leverage: "125x", funding: "0.01%" },
  { symbol: "ETH/USDT", price: 3456, change: -1.23, volume: "1.8B", leverage: "100x", funding: "0.02%" },
  { symbol: "BNB/USDT", price: 598, change: 5.67, volume: "450M", leverage: "75x", funding: "0.01%" },
  { symbol: "SOL/USDT", price: 178, change: 8.12, volume: "320M", leverage: "50x", funding: "0.03%" },
  { symbol: "XRP/USDT", price: 0.62, change: -2.01, volume: "280M", leverage: "50x", funding: "0.01%" },
];

export default function FuturesPage() {
  const [selectedPair, setSelectedPair] = useState("BTC/USDT");

  return (
    <div className="min-h-screen bg-black p-4">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-white">🚀 Futures Trading</h1>
            <p className="text-sm text-gray-500 mt-1">Trade with leverage up to 125x</p>
          </div>
          <div className="flex gap-2">
            <button className="px-4 py-2 bg-yellow-500/10 text-yellow-400 rounded-lg text-sm hover:bg-yellow-500/20 transition">
              💰 Positions
            </button>
            <button className="px-4 py-2 bg-[#2b2d33] text-gray-400 rounded-lg text-sm hover:bg-[#3b3d43] transition">
              📊 Orders
            </button>
          </div>
        </div>

        {/* Futures Pairs */}
        <div className="bg-[#1a1a1a] rounded-xl border border-[#2b2d33] overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-black/30">
                <tr>
                  <th className="px-4 py-3 text-left text-xs text-gray-500 font-medium">Pair</th>
                  <th className="px-4 py-3 text-right text-xs text-gray-500 font-medium">Price</th>
                  <th className="px-4 py-3 text-right text-xs text-gray-500 font-medium">24h Change</th>
                  <th className="px-4 py-3 text-right text-xs text-gray-500 font-medium">Volume</th>
                  <th className="px-4 py-3 text-right text-xs text-gray-500 font-medium">Leverage</th>
                  <th className="px-4 py-3 text-right text-xs text-gray-500 font-medium">Funding Rate</th>
                  <th className="px-4 py-3 text-right text-xs text-gray-500 font-medium">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#2b2d33]">
                {futuresPairs.map((f) => {
                  const isPositive = f.change >= 0;
                  return (
                    <tr key={f.symbol} className="hover:bg-[#2b2d33]/50 transition-colors">
                      <td className="px-4 py-3">
                        <div>
                          <p className="text-white font-medium text-sm">{f.symbol}</p>
                          <p className="text-xs text-gray-500">Perpetual</p>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-right text-white text-sm font-medium">
                        ${f.price.toLocaleString()}
                      </td>
                      <td className="px-4 py-3 text-right">
                        <span className={`text-sm font-bold ${isPositive ? "text-green-500" : "text-red-500"}`}>
                          {isPositive ? "+" : ""}{f.change}%
                        </span>
                      </td>
                      <td className="px-4 py-3 text-right text-gray-300 text-sm">
                        ${f.volume}
                      </td>
                      <td className="px-4 py-3 text-right">
                        <span className="text-sm text-yellow-400 font-bold">{f.leverage}</span>
                      </td>
                      <td className="px-4 py-3 text-right">
                        <span className="text-sm text-gray-400">{f.funding}</span>
                      </td>
                      <td className="px-4 py-3 text-right">
                        <Link href={`/futures/${f.symbol.replace("/", "")}`}>
                          <button className="px-5 py-1.5 bg-yellow-500/10 text-yellow-400 text-sm rounded hover:bg-yellow-500/20 transition">
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

        {/* Quick Trade */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-[#1a1a1a] rounded-xl border border-[#2b2d33] p-4">
            <h3 className="text-white font-bold mb-3">Long / Short</h3>
            <div className="flex gap-2">
              <button className="flex-1 py-3 bg-green-500 text-white font-bold rounded-lg hover:bg-green-600 transition">
                Long
              </button>
              <button className="flex-1 py-3 bg-red-500 text-white font-bold rounded-lg hover:bg-red-600 transition">
                Short
              </button>
            </div>
            <div className="mt-3 grid grid-cols-2 gap-2">
              <div>
                <label className="text-xs text-gray-500">Leverage</label>
                <select className="w-full bg-black border border-[#2b2d33] rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-yellow-400">
                  <option>1x</option>
                  <option>2x</option>
                  <option>5x</option>
                  <option>10x</option>
                  <option>25x</option>
                  <option selected>50x</option>
                  <option>100x</option>
                  <option>125x</option>
                </select>
              </div>
              <div>
                <label className="text-xs text-gray-500">Amount</label>
                <input type="number" placeholder="0.00" className="w-full bg-black border border-[#2b2d33] rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-yellow-400" />
              </div>
            </div>
            <button className="w-full mt-3 py-3 bg-yellow-500 text-black font-bold rounded-lg hover:bg-yellow-400 transition">
              Open Position
            </button>
          </div>
          <div className="bg-[#1a1a1a] rounded-xl border border-[#2b2d33] p-4">
            <h3 className="text-white font-bold mb-3">Open Positions</h3>
            <div className="text-center py-8">
              <p className="text-gray-500">No open positions</p>
              <p className="text-xs text-gray-600 mt-1">Open a long or short position above</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
