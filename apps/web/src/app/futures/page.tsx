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
  const [marginMode, setMarginMode] = useState<"cross" | "isolated">("cross");
  const [positionSide, setPositionSide] = useState<"long" | "short">("long");
  const [leverage, setLeverage] = useState(10);
  const [amount, setAmount] = useState("");

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

        {/* Futures Pairs Table */}
        <div className="bg-[#1a1a1a] rounded-xl border border-[#2b2d33] overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-black/30">
                <tr>
                  <th className="px-4 py-3 text-left text-xs text-gray-500">Pair</th>
                  <th className="px-4 py-3 text-right text-xs text-gray-500">Price</th>
                  <th className="px-4 py-3 text-right text-xs text-gray-500">24h Change</th>
                  <th className="px-4 py-3 text-right text-xs text-gray-500">Volume</th>
                  <th className="px-4 py-3 text-right text-xs text-gray-500">Leverage</th>
                  <th className="px-4 py-3 text-right text-xs text-gray-500">Funding Rate</th>
                  <th className="px-4 py-3 text-right text-xs text-gray-500">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#2b2d33]">
                {futuresPairs.map((f) => (
                  <tr key={f.symbol} className="hover:bg-[#2b2d33]/50 transition-colors">
                    <td className="px-4 py-3">
                      <p className="text-white font-medium text-sm">{f.symbol}</p>
                      <p className="text-xs text-gray-500">Perpetual</p>
                    </td>
                    <td className="px-4 py-3 text-right text-white text-sm font-medium">${f.price.toLocaleString()}</td>
                    <td className={`px-4 py-3 text-right text-sm font-bold ${f.change >= 0 ? "text-green-500" : "text-red-500"}`}>
                      {f.change >= 0 ? "+" : ""}{f.change}%
                    </td>
                    <td className="px-4 py-3 text-right text-gray-300 text-sm">${f.volume}</td>
                    <td className="px-4 py-3 text-right text-yellow-400 text-sm font-bold">{f.leverage}</td>
                    <td className="px-4 py-3 text-right text-gray-400 text-sm">{f.funding}</td>
                    <td className="px-4 py-3 text-right">
                      <button
                        onClick={() => setSelectedPair(f.symbol)}
                        className="px-5 py-1.5 bg-yellow-500/10 text-yellow-400 text-sm rounded hover:bg-yellow-500/20 transition"
                      >
                        Trade
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Trade Form with Cross/Isolated */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-[#1a1a1a] rounded-xl border border-[#2b2d33] p-4">
            <h3 className="text-white font-bold mb-3">📊 Trade {selectedPair}</h3>

            {/* 🔥 CROSS / ISOLATED MARGIN TOGGLE */}
            <div className="mb-3">
              <label className="text-sm text-gray-400 block mb-1.5">Margin Mode</label>
              <div className="flex gap-1 bg-[#2b2d33] rounded-lg p-1">
                <button
                  onClick={() => setMarginMode("cross")}
                  className={`flex-1 py-1.5 rounded-lg text-xs font-medium transition ${
                    marginMode === "cross"
                      ? "bg-yellow-500/20 text-yellow-400"
                      : "text-gray-400 hover:text-white"
                  }`}
                >
                  Cross
                </button>
                <button
                  onClick={() => setMarginMode("isolated")}
                  className={`flex-1 py-1.5 rounded-lg text-xs font-medium transition ${
                    marginMode === "isolated"
                      ? "bg-yellow-500/20 text-yellow-400"
                      : "text-gray-400 hover:text-white"
                  }`}
                >
                  Isolated
                </button>
              </div>
              <p className="text-[10px] text-gray-500 mt-1">
                {marginMode === "cross" ? "Margin shared across all positions" : "Margin isolated to this position"}
              </p>
            </div>

            {/* Leverage */}
            <div className="mb-3">
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Leverage</span>
                <span className="text-yellow-400 font-bold">{leverage}x</span>
              </div>
              <input
                type="range"
                min="1"
                max="125"
                value={leverage}
                onChange={(e) => setLeverage(parseInt(e.target.value))}
                className="w-full accent-yellow-500"
              />
              <div className="flex gap-1 mt-1">
                {[1, 5, 10, 25, 50, 100, 125].map((l) => (
                  <button
                    key={l}
                    onClick={() => setLeverage(l)}
                    className={`flex-1 py-1 text-[10px] rounded transition ${
                      leverage === l ? "bg-yellow-500/20 text-yellow-400" : "bg-[#2b2d33] text-gray-400 hover:text-white"
                    }`}
                  >
                    {l}x
                  </button>
                ))}
              </div>
            </div>

            {/* Long/Short */}
            <div className="flex gap-2 mb-3">
              <button
                onClick={() => setPositionSide("long")}
                className={`flex-1 py-2.5 rounded-lg text-sm font-bold transition ${
                  positionSide === "long" ? "bg-green-500 text-white" : "bg-[#2b2d33] text-gray-400"
                }`}
              >
                📈 Long
              </button>
              <button
                onClick={() => setPositionSide("short")}
                className={`flex-1 py-2.5 rounded-lg text-sm font-bold transition ${
                  positionSide === "short" ? "bg-red-500 text-white" : "bg-[#2b2d33] text-gray-400"
                }`}
              >
                📉 Short
              </button>
            </div>

            {/* Amount */}
            <div className="mb-3">
              <label className="text-sm text-gray-400 block mb-1.5">Amount (USDT)</label>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="0.00"
                className="w-full bg-black border border-[#2b2d33] rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-yellow-400 transition"
              />
              <div className="flex gap-2 mt-2">
                {[25, 50, 75, 100].map((p) => (
                  <button
                    key={p}
                    onClick={() => setAmount((100 * p / 100).toString())}
                    className="flex-1 py-1.5 bg-[#2b2d33] text-gray-400 text-xs rounded hover:bg-[#3b3d43] transition"
                  >
                    {p}%
                  </button>
                ))}
              </div>
            </div>

            {/* Position Preview */}
            {amount && (
              <div className="bg-black/50 rounded-lg p-3 text-sm space-y-1 mb-3">
                <div className="flex justify-between">
                  <span className="text-gray-500">Entry Price</span>
                  <span className="text-white">${futuresPairs.find(f => f.symbol === selectedPair)?.price}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Position Size</span>
                  <span className="text-white">{(parseFloat(amount) * leverage).toFixed(2)} USDT</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Margin Mode</span>
                  <span className={`font-bold ${marginMode === "cross" ? "text-yellow-400" : "text-blue-400"}`}>
                    {marginMode.charAt(0).toUpperCase() + marginMode.slice(1)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Liquidation Price</span>
                  <span className="text-red-500">
                    ${(futuresPairs.find(f => f.symbol === selectedPair)?.price || 0) * (positionSide === "long" ? 0.92 : 1.08)}
                  </span>
                </div>
              </div>
            )}

            <button
              disabled={!amount}
              className={`w-full py-3 rounded-xl font-bold transition ${
                amount
                  ? positionSide === "long"
                    ? "bg-green-500 hover:bg-green-600 text-white"
                    : "bg-red-500 hover:bg-red-600 text-white"
                  : "bg-[#2b2d33] text-gray-500 cursor-not-allowed"
              }`}
            >
              {positionSide === "long" ? "Open Long" : "Open Short"} {selectedPair.split("/")[0]}
            </button>
          </div>

          {/* Open Positions */}
          <div className="bg-[#1a1a1a] rounded-xl border border-[#2b2d33] p-4">
            <h3 className="text-white font-bold mb-3">📊 Open Positions</h3>
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
