"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";

export default function MarginDetailPage() {
  const params = useParams();
  const pair = (params.pair as string) || "BTCUSDT";
  const displayPair = pair.replace("USDT", "/USDT");

  const [borrowAmount, setBorrowAmount] = useState("");
  const [repayAmount, setRepayAmount] = useState("");
  const [selectedAsset, setSelectedAsset] = useState("USDT");
  const [activeTab, setActiveTab] = useState<"borrow" | "repay" | "positions">("borrow");

  const borrowAssets = [
    { symbol: "USDT", balance: 3043.75, borrowLimit: 5000, borrowRate: "0.02%", maxLeverage: "10x" },
    { symbol: "USDC", balance: 1500.00, borrowLimit: 3000, borrowRate: "0.03%", maxLeverage: "10x" },
    { symbol: "BUSD", balance: 800.00, borrowLimit: 2000, borrowRate: "0.01%", maxLeverage: "10x" },
  ];

  const positions = [
    { asset: "BTC/USDT", type: "Long", size: 0.05, entry: 64500, current: 65432, pnl: 46.62, borrow: "500 USDT" },
    { asset: "ETH/USDT", type: "Short", size: 0.5, entry: 3456, current: 3400, pnl: -28.00, borrow: "1000 USDT" },
  ];

  const totalBorrow = 1500;
  const totalCollateral = 3043.75;
  const maxBorrow = 5000;

  return (
    <div className="min-h-screen bg-black p-4">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-white">📊 {displayPair} Margin</h1>
            <p className="text-sm text-gray-500 mt-1">Borrow funds to trade with up to 10x leverage</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="bg-yellow-500/20 px-4 py-2 rounded-xl">
              <p className="text-xs text-gray-400">Total Borrow</p>
              <p className="text-lg font-bold text-yellow-400">${totalBorrow}</p>
            </div>
            <div className="bg-yellow-500/20 px-4 py-2 rounded-xl">
              <p className="text-xs text-gray-400">Collateral</p>
              <p className="text-lg font-bold text-yellow-400">${totalCollateral}</p>
            </div>
            <div className="bg-yellow-500/20 px-4 py-2 rounded-xl">
              <p className="text-xs text-gray-400">Max Borrow</p>
              <p className="text-lg font-bold text-yellow-400">${maxBorrow}</p>
            </div>
            <Link href="/margin">
              <button className="px-4 py-2 bg-[#2b2d33] text-white rounded-lg hover:bg-[#3b3d43] transition text-sm">
                ← Back
              </button>
            </Link>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 bg-[#1a1a1a] rounded-xl p-1 border border-[#2b2d33]">
          <button
            onClick={() => setActiveTab("borrow")}
            className={`flex-1 py-2.5 rounded-lg text-sm font-medium transition ${
              activeTab === "borrow"
                ? "bg-yellow-500/20 text-yellow-400"
                : "text-gray-400 hover:text-white"
            }`}
          >
            💰 Borrow
          </button>
          <button
            onClick={() => setActiveTab("repay")}
            className={`flex-1 py-2.5 rounded-lg text-sm font-medium transition ${
              activeTab === "repay"
                ? "bg-yellow-500/20 text-yellow-400"
                : "text-gray-400 hover:text-white"
            }`}
          >
            📤 Repay
          </button>
          <button
            onClick={() => setActiveTab("positions")}
            className={`flex-1 py-2.5 rounded-lg text-sm font-medium transition ${
              activeTab === "positions"
                ? "bg-yellow-500/20 text-yellow-400"
                : "text-gray-400 hover:text-white"
            }`}
          >
            📊 Positions
          </button>
        </div>

        {/* Borrow Tab */}
        {activeTab === "borrow" && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <div className="lg:col-span-2 bg-[#1a1a1a] rounded-xl border border-[#2b2d33] p-6">
              <h3 className="text-white font-bold mb-4">💸 Borrow Funds</h3>

              <div className="mb-4">
                <label className="text-sm text-gray-400 block mb-1.5">Asset</label>
                <div className="flex gap-2">
                  {borrowAssets.map((asset) => (
                    <button
                      key={asset.symbol}
                      onClick={() => setSelectedAsset(asset.symbol)}
                      className={`px-5 py-2.5 rounded-lg text-sm font-medium transition ${
                        selectedAsset === asset.symbol
                          ? "bg-yellow-500/20 text-yellow-400 border border-yellow-500/50"
                          : "bg-[#2b2d33] text-gray-400 hover:text-white"
                      }`}
                    >
                      {asset.symbol}
                    </button>
                  ))}
                </div>
              </div>

              <div className="mb-4">
                <label className="text-sm text-gray-400 block mb-1.5">Amount</label>
                <input
                  type="number"
                  value={borrowAmount}
                  onChange={(e) => setBorrowAmount(e.target.value)}
                  placeholder="0.00"
                  className="w-full bg-black border border-[#2b2d33] rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-yellow-400 transition"
                />
                <div className="flex gap-2 mt-2">
                  {[25, 50, 75, 100].map((p) => (
                    <button
                      key={p}
                      onClick={() => setBorrowAmount((1000 * p / 100).toString())}
                      className="flex-1 py-1.5 bg-[#2b2d33] text-gray-400 text-xs rounded hover:bg-[#3b3d43] transition"
                    >
                      {p}%
                    </button>
                  ))}
                </div>
              </div>

              <div className="bg-black/50 rounded-lg p-4 space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-500">Interest Rate</span>
                  <span className="text-yellow-400">{borrowAssets.find(a => a.symbol === selectedAsset)?.borrowRate || "0.02%"}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Max Leverage</span>
                  <span className="text-yellow-400">{borrowAssets.find(a => a.symbol === selectedAsset)?.maxLeverage || "10x"}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Available to Borrow</span>
                  <span className="text-white">${borrowAssets.find(a => a.symbol === selectedAsset)?.borrowLimit || 5000}</span>
                </div>
              </div>

              <button
                disabled={!borrowAmount}
                className={`w-full mt-4 py-3 rounded-xl font-bold transition ${
                  borrowAmount
                    ? "bg-yellow-500 text-black hover:bg-yellow-400"
                    : "bg-[#2b2d33] text-gray-500 cursor-not-allowed"
                }`}
              >
                Borrow {selectedAsset}
              </button>
            </div>

            <div className="bg-[#1a1a1a] rounded-xl border border-[#2b2d33] p-6">
              <h4 className="text-white font-bold mb-3">📋 Borrow Summary</h4>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-500">Total Borrowed</span>
                  <span className="text-white">${totalBorrow}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Collateral</span>
                  <span className="text-white">${totalCollateral}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Available</span>
                  <span className="text-yellow-400">${maxBorrow - totalBorrow}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Interest Accrued</span>
                  <span className="text-yellow-400">$0.00</span>
                </div>
                <div className="flex justify-between border-t border-[#2b2d33] pt-2">
                  <span className="text-gray-500">Max Leverage</span>
                  <span className="text-yellow-400">10x</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Repay Tab */}
        {activeTab === "repay" && (
          <div className="bg-[#1a1a1a] rounded-xl border border-[#2b2d33] p-6 max-w-md">
            <h3 className="text-white font-bold mb-4">📤 Repay Borrowed Funds</h3>

            <div className="mb-4">
              <label className="text-sm text-gray-400 block mb-1.5">Amount to Repay</label>
              <input
                type="number"
                value={repayAmount}
                onChange={(e) => setRepayAmount(e.target.value)}
                placeholder="0.00"
                className="w-full bg-black border border-[#2b2d33] rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-yellow-400 transition"
              />
              <div className="flex gap-2 mt-2">
                <button className="flex-1 py-1.5 bg-[#2b2d33] text-gray-400 text-xs rounded hover:bg-[#3b3d43] transition">
                  Min
                </button>
                <button className="flex-1 py-1.5 bg-[#2b2d33] text-gray-400 text-xs rounded hover:bg-[#3b3d43] transition">
                  50%
                </button>
                <button className="flex-1 py-1.5 bg-[#2b2d33] text-gray-400 text-xs rounded hover:bg-[#3b3d43] transition">
                  Max
                </button>
              </div>
            </div>

            <div className="bg-black/50 rounded-lg p-3 text-sm text-center mb-4">
              <span className="text-gray-500">Total Owed: </span>
              <span className="text-white font-bold">${totalBorrow}</span>
              <span className="text-gray-500 ml-2">+ Interest: </span>
              <span className="text-yellow-400">$0.00</span>
            </div>

            <button
              disabled={!repayAmount}
              className={`w-full py-3 rounded-xl font-bold transition ${
                repayAmount
                  ? "bg-yellow-500 text-black hover:bg-yellow-400"
                  : "bg-[#2b2d33] text-gray-500 cursor-not-allowed"
              }`}
            >
              Repay
            </button>
          </div>
        )}

        {/* Positions Tab */}
        {activeTab === "positions" && (
          <div className="bg-[#1a1a1a] rounded-xl border border-[#2b2d33] overflow-hidden">
            <div className="p-4 border-b border-[#2b2d33] flex items-center justify-between">
              <h3 className="text-white font-bold">📊 Open Margin Positions</h3>
              <span className="text-xs text-gray-500">{positions.length} positions</span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-black/30">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs text-gray-500">Asset</th>
                    <th className="px-4 py-3 text-right text-xs text-gray-500">Type</th>
                    <th className="px-4 py-3 text-right text-xs text-gray-500">Size</th>
                    <th className="px-4 py-3 text-right text-xs text-gray-500">Entry</th>
                    <th className="px-4 py-3 text-right text-xs text-gray-500">Current</th>
                    <th className="px-4 py-3 text-right text-xs text-gray-500">PnL</th>
                    <th className="px-4 py-3 text-right text-xs text-gray-500">Borrowed</th>
                    <th className="px-4 py-3 text-right text-xs text-gray-500">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#2b2d33]">
                  {positions.map((pos, i) => (
                    <tr key={i} className="hover:bg-[#2b2d33]/50 transition-colors">
                      <td className="px-4 py-3 text-white text-sm font-medium">{pos.asset}</td>
                      <td className="px-4 py-3 text-right">
                        <span className={`text-xs px-2 py-1 rounded font-bold ${
                          pos.type === "Long" ? "bg-green-500/20 text-green-500" : "bg-red-500/20 text-red-500"
                        }`}>
                          {pos.type}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-right text-white text-sm">{pos.size}</td>
                      <td className="px-4 py-3 text-right text-white text-sm">${pos.entry}</td>
                      <td className="px-4 py-3 text-right text-white text-sm">${pos.current}</td>
                      <td className={`px-4 py-3 text-right text-sm font-bold ${pos.pnl >= 0 ? "text-green-500" : "text-red-500"}`}>
                        ${pos.pnl}
                      </td>
                      <td className="px-4 py-3 text-right text-yellow-400 text-sm">{pos.borrow}</td>
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
        )}
      </div>
    </div>
  );
}
