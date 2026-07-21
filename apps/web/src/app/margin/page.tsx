"use client";

import { useState } from "react";
import Link from "next/link";

const marginPairs = [
  { symbol: "BTC/USDT", price: 65432, change: 2.45, volume: "1.2B", borrowRate: "0.02%", maxLeverage: "10x" },
  { symbol: "ETH/USDT", price: 3456, change: -1.23, volume: "850M", borrowRate: "0.03%", maxLeverage: "10x" },
  { symbol: "BNB/USDT", price: 598, change: 5.67, volume: "450M", borrowRate: "0.01%", maxLeverage: "10x" },
  { symbol: "SOL/USDT", price: 178, change: 8.12, volume: "320M", borrowRate: "0.04%", maxLeverage: "10x" },
];

export default function MarginPage() {
  const [borrowAsset, setBorrowAsset] = useState("USDT");
  const [borrowAmount, setBorrowAmount] = useState("");

  return (
    <div className="min-h-screen bg-black p-4">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-white">📊 Margin Trading</h1>
            <p className="text-sm text-gray-500 mt-1">Borrow funds to trade with up to 10x leverage</p>
          </div>
          <div className="flex gap-2">
            <span className="px-4 py-2 bg-green-500/10 text-green-500 rounded-lg text-sm">Wallet: $12,543</span>
            <span className="px-4 py-2 bg-yellow-500/10 text-yellow-400 rounded-lg text-sm">Borrow: $0.00</span>
          </div>
        </div>

        {/* Borrow Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-[#1a1a1a] rounded-xl border border-[#2b2d33] p-4 md:col-span-2">
            <h3 className="text-white font-bold mb-3">💰 Borrow Funds</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs text-gray-500">Asset</label>
                <select
                  value={borrowAsset}
                  onChange={(e) => setBorrowAsset(e.target.value)}
                  className="w-full bg-black border border-[#2b2d33] rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-yellow-400"
                >
                  <option>USDT</option>
                  <option>USDC</option>
                  <option>BUSD</option>
                </select>
              </div>
              <div>
                <label className="text-xs text-gray-500">Amount</label>
                <input
                  type="number"
                  placeholder="0.00"
                  value={borrowAmount}
                  onChange={(e) => setBorrowAmount(e.target.value)}
                  className="w-full bg-black border border-[#2b2d33] rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-yellow-400"
                />
              </div>
            </div>
            <div className="mt-3 flex gap-2">
              {[25, 50, 75, 100].map((p) => (
                <button key={p} className="flex-1 py-1.5 bg-[#2b2d33] text-gray-400 text-xs rounded hover:bg-[#3b3d43] transition">
                  {p}%
                </button>
              ))}
            </div>
            <div className="mt-3 flex items-center justify-between text-sm">
              <span className="text-gray-500">Interest Rate: <span className="text-yellow-400">0.02%</span></span>
              <span className="text-gray-500">Repayment: <span className="text-white">${(Number(borrowAmount) || 0).toFixed(2)}</span></span>
            </div>
            <button className="w-full mt-3 py-3 bg-yellow-500 text-black font-bold rounded-lg hover:bg-yellow-400 transition">
              Borrow
            </button>
          </div>

          <div className="bg-[#1a1a1a] rounded-xl border border-[#2b2d33] p-4">
            <h3 className="text-white font-bold mb-3">📋 Borrow Details</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-500">Available to Borrow</span>
                <span className="text-white">$5,000</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Borrowed</span>
                <span className="text-white">$0.00</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Interest Accrued</span>
                <span className="text-yellow-400">$0.00</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Max Leverage</span>
                <span className="text-yellow-400">10x</span>
              </div>
            </div>
          </div>
        </div>

        {/* Margin Pairs */}
        <div className="bg-[#1a1a1a] rounded-xl border border-[#2b2d33] overflow-hidden">
          <div className="p-4 border-b border-[#2b2d33]">
            <h3 className="text-white font-bold">📊 Margin Trading Pairs</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-black/30">
                <tr>
                  <th className="px-4 py-3 text-left text-xs text-gray-500 font-medium">Pair</th>
                  <th className="px-4 py-3 text-right text-xs text-gray-500 font-medium">Price</th>
                  <th className="px-4 py-3 text-right text-xs text-gray-500 font-medium">24h Change</th>
                  <th className="px-4 py-3 text-right text-xs text-gray-500 font-medium">Volume</th>
                  <th className="px-4 py-3 text-right text-xs text-gray-500 font-medium">Borrow Rate</th>
                  <th className="px-4 py-3 text-right text-xs text-gray-500 font-medium">Max Leverage</th>
                  <th className="px-4 py-3 text-right text-xs text-gray-500 font-medium">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#2b2d33]">
                {marginPairs.map((p) => {
                  const isPositive = p.change >= 0;
                  return (
                    <tr key={p.symbol} className="hover:bg-[#2b2d33]/50 transition-colors">
                      <td className="px-4 py-3">
                        <p className="text-white font-medium text-sm">{p.symbol}</p>
                      </td>
                      <td className="px-4 py-3 text-right text-white text-sm">${p.price.toLocaleString()}</td>
                      <td className={`px-4 py-3 text-right text-sm font-bold ${isPositive ? "text-green-500" : "text-red-500"}`}>
                        {isPositive ? "+" : ""}{p.change}%
                      </td>
                      <td className="px-4 py-3 text-right text-gray-300 text-sm">${p.volume}</td>
                      <td className="px-4 py-3 text-right text-yellow-400 text-sm">{p.borrowRate}</td>
                      <td className="px-4 py-3 text-right text-yellow-400 text-sm font-bold">{p.maxLeverage}</td>
                      <td className="px-4 py-3 text-right">
                        <Link href={`/margin/${p.symbol.replace("/", "")}`}>
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
      </div>
    </div>
  );
}
