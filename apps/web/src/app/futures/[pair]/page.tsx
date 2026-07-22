"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";

export default function FuturesDetailPage() {
  const params = useParams();
  const pair = (params.pair as string) || "BTCUSDT";
  const displayPair = pair.replace("USDT", "/USDT");

  const [leverage, setLeverage] = useState(10);
  const [side, setSide] = useState<"long" | "short">("long");
  const [amount, setAmount] = useState("");
  const [position, setPosition] = useState<{ side: string; entry: number; size: number; pnl: number } | null>(null);
  const [price, setPrice] = useState(65432.50);

  const mockPositions = [
    { side: "Long", entry: 64500, size: 0.05, pnl: 46.62, liquidation: 62500 },
    { side: "Short", entry: 66000, size: 0.02, pnl: -11.35, liquidation: 68000 },
  ];

  const handleOpenPosition = () => {
    if (!amount) return;
    const entryPrice = price * (side === "long" ? 1.002 : 0.998);
    const size = parseFloat(amount) * leverage;
    setPosition({
      side: side === "long" ? "Long" : "Short",
      entry: +entryPrice.toFixed(2),
      size: parseFloat(amount),
      pnl: 0,
    });
  };

  const handleClosePosition = () => {
    setPosition(null);
    setAmount("");
  };

  return (
    <div className="min-h-screen bg-black p-4">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-white">🚀 {displayPair} Perpetual</h1>
            <p className="text-sm text-gray-500 mt-1">Trade with leverage up to 125x</p>
          </div>
          <div className="flex items-center gap-3">
            <span className="px-4 py-2 bg-green-500/10 text-green-500 rounded-lg text-sm">
              Funding: <span className="font-bold">0.01%</span>
            </span>
            <Link href="/futures">
              <button className="px-4 py-2 bg-[#2b2d33] text-white rounded-lg hover:bg-[#3b3d43] transition text-sm">
                ← Back
              </button>
            </Link>
          </div>
        </div>

        {/* Market Info */}
        <div className="bg-[#1a1a1a] rounded-xl border border-[#2b2d33] p-4">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-xs text-gray-500">Price</p>
              <p className="text-3xl font-bold text-white">${price.toFixed(2)}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500">24h Change</p>
              <p className="text-xl font-bold text-green-500">+2.45%</p>
            </div>
            <div>
              <p className="text-xs text-gray-500">24h Volume</p>
              <p className="text-xl font-bold text-white">$2.5B</p>
            </div>
            <div>
              <p className="text-xs text-gray-500">Open Interest</p>
              <p className="text-xl font-bold text-white">$850M</p>
            </div>
            <div>
              <p className="text-xs text-gray-500">Funding Rate</p>
              <p className="text-xl font-bold text-green-500">0.01%</p>
            </div>
          </div>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Chart */}
          <div className="lg:col-span-2 bg-[#1a1a1a] rounded-xl border border-[#2b2d33] p-4 h-[300px] flex items-center justify-center">
            <div className="text-center">
              <span className="text-4xl block mb-2">📊</span>
              <p className="text-gray-400">Chart Coming Soon</p>
              <p className="text-xs text-gray-500">TradingView integration in progress</p>
            </div>
          </div>

          {/* Trade Form */}
          <div className="bg-[#1a1a1a] rounded-xl border border-[#2b2d33] p-4">
            <h3 className="text-white font-bold mb-3">Open Position</h3>

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
                onClick={() => setSide("long")}
                className={`flex-1 py-2.5 rounded-lg text-sm font-bold transition ${
                  side === "long" ? "bg-green-500 text-white" : "bg-[#2b2d33] text-gray-400"
                }`}
              >
                📈 Long
              </button>
              <button
                onClick={() => setSide("short")}
                className={`flex-1 py-2.5 rounded-lg text-sm font-bold transition ${
                  side === "short" ? "bg-red-500 text-white" : "bg-[#2b2d33] text-gray-400"
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
                  <span className="text-white">
                    ${(price * (side === "long" ? 1.002 : 0.998)).toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Position Size</span>
                  <span className="text-white">{(parseFloat(amount) * leverage).toFixed(2)} USDT</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Liquidation Price</span>
                  <span className="text-red-500">
                    ${(price * (side === "long" ? 0.92 : 1.08)).toFixed(2)}
                  </span>
                </div>
              </div>
            )}

            <button
              onClick={handleOpenPosition}
              disabled={!amount}
              className={`w-full py-3 rounded-xl font-bold transition ${
                amount
                  ? side === "long"
                    ? "bg-green-500 hover:bg-green-600 text-white"
                    : "bg-red-500 hover:bg-red-600 text-white"
                  : "bg-[#2b2d33] text-gray-500 cursor-not-allowed"
              }`}
            >
              {side === "long" ? "Open Long" : "Open Short"}
            </button>
          </div>
        </div>

        {/* Positions */}
        <div className="bg-[#1a1a1a] rounded-xl border border-[#2b2d33] overflow-hidden">
          <div className="p-4 border-b border-[#2b2d33] flex items-center justify-between">
            <h3 className="text-white font-bold">📊 Open Positions</h3>
            <span className="text-xs text-gray-500">{mockPositions.length} positions</span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-black/30">
                <tr>
                  <th className="px-4 py-3 text-left text-xs text-gray-500">Side</th>
                  <th className="px-4 py-3 text-right text-xs text-gray-500">Entry Price</th>
                  <th className="px-4 py-3 text-right text-xs text-gray-500">Size</th>
                  <th className="px-4 py-3 text-right text-xs text-gray-500">PnL</th>
                  <th className="px-4 py-3 text-right text-xs text-gray-500">Liquidation</th>
                  <th className="px-4 py-3 text-right text-xs text-gray-500">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#2b2d33]">
                {mockPositions.map((pos, i) => (
                  <tr key={i} className="hover:bg-[#2b2d33]/50 transition-colors">
                    <td className="px-4 py-3">
                      <span className={`text-xs px-2 py-1 rounded font-bold ${
                        pos.side === "Long" ? "bg-green-500/20 text-green-500" : "bg-red-500/20 text-red-500"
                      }`}>
                        {pos.side}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right text-white text-sm">${pos.entry.toFixed(2)}</td>
                    <td className="px-4 py-3 text-right text-white text-sm">{pos.size} BTC</td>
                    <td className={`px-4 py-3 text-right text-sm font-bold ${pos.pnl >= 0 ? "text-green-500" : "text-red-500"}`}>
                      ${pos.pnl.toFixed(2)}
                    </td>
                    <td className="px-4 py-3 text-right text-red-500 text-sm">${pos.liquidation.toFixed(2)}</td>
                    <td className="px-4 py-3 text-right">
                      <button className="px-4 py-1.5 bg-red-500/10 text-red-500 text-xs rounded hover:bg-red-500/20 transition">
                        Close
                      </button>
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
