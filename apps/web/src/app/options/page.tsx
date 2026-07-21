"use client";

import { useState } from "react";

const optionsData = [
  { symbol: "BTC", strike: 65000, type: "Call", expiry: "2025-01-31", premium: "$1,200", volume: "2.5K" },
  { symbol: "BTC", strike: 65000, type: "Put", expiry: "2025-01-31", premium: "$800", volume: "1.8K" },
  { symbol: "ETH", strike: 3500, type: "Call", expiry: "2025-02-28", premium: "$150", volume: "5.2K" },
  { symbol: "ETH", strike: 3500, type: "Put", expiry: "2025-02-28", premium: "$100", volume: "3.4K" },
  { symbol: "BNB", strike: 600, type: "Call", expiry: "2025-03-31", premium: "$45", volume: "8.1K" },
  { symbol: "BNB", strike: 600, type: "Put", expiry: "2025-03-31", premium: "$30", volume: "4.5K" },
];

export default function OptionsPage() {
  const [selectedSymbol, setSelectedSymbol] = useState("BTC");
  const [selectedType, setSelectedType] = useState<"Call" | "Put">("Call");

  return (
    <div className="min-h-screen bg-black p-4">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-white">🎯 Options Trading</h1>
            <p className="text-sm text-gray-500 mt-1">Trade calls and puts on major cryptocurrencies</p>
          </div>
        </div>

        {/* Quick Select */}
        <div className="flex flex-wrap gap-2">
          {["BTC", "ETH", "BNB", "SOL", "XRP"].map((sym) => (
            <button
              key={sym}
              onClick={() => setSelectedSymbol(sym)}
              className={`px-5 py-2 rounded-lg text-sm font-bold transition ${
                selectedSymbol === sym ? "bg-yellow-500 text-black" : "bg-[#2b2d33] text-gray-400 hover:text-white"
              }`}
            >
              {sym}
            </button>
          ))}
        </div>

        {/* Options Table */}
        <div className="bg-[#1a1a1a] rounded-xl border border-[#2b2d33] overflow-hidden">
          <div className="p-4 border-b border-[#2b2d33] flex flex-wrap items-center justify-between gap-2">
            <h3 className="text-white font-bold">Available Options</h3>
            <div className="flex gap-2">
              <button
                onClick={() => setSelectedType("Call")}
                className={`px-4 py-1.5 rounded-lg text-sm font-medium transition ${
                  selectedType === "Call" ? "bg-green-500/20 text-green-500" : "bg-[#2b2d33] text-gray-400"
                }`}
              >
                📈 Calls
              </button>
              <button
                onClick={() => setSelectedType("Put")}
                className={`px-4 py-1.5 rounded-lg text-sm font-medium transition ${
                  selectedType === "Put" ? "bg-red-500/20 text-red-500" : "bg-[#2b2d33] text-gray-400"
                }`}
              >
                📉 Puts
              </button>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-black/30">
                <tr>
                  <th className="px-4 py-3 text-left text-xs text-gray-500 font-medium">Symbol</th>
                  <th className="px-4 py-3 text-right text-xs text-gray-500 font-medium">Strike Price</th>
                  <th className="px-4 py-3 text-right text-xs text-gray-500 font-medium">Type</th>
                  <th className="px-4 py-3 text-right text-xs text-gray-500 font-medium">Expiry</th>
                  <th className="px-4 py-3 text-right text-xs text-gray-500 font-medium">Premium</th>
                  <th className="px-4 py-3 text-right text-xs text-gray-500 font-medium">Volume</th>
                  <th className="px-4 py-3 text-right text-xs text-gray-500 font-medium">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#2b2d33]">
                {optionsData
                  .filter((o) => o.symbol === selectedSymbol)
                  .filter((o) => o.type === selectedType)
                  .map((option, i) => (
                    <tr key={i} className="hover:bg-[#2b2d33]/50 transition-colors">
                      <td className="px-4 py-3">
                        <p className="text-white font-medium text-sm">{option.symbol}</p>
                      </td>
                      <td className="px-4 py-3 text-right text-white text-sm font-medium">
                        ${option.strike.toLocaleString()}
                      </td>
                      <td className="px-4 py-3 text-right">
                        <span className={`text-sm font-bold ${option.type === "Call" ? "text-green-500" : "text-red-500"}`}>
                          {option.type}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-right text-gray-300 text-sm">{option.expiry}</td>
                      <td className="px-4 py-3 text-right text-yellow-400 text-sm font-bold">{option.premium}</td>
                      <td className="px-4 py-3 text-right text-gray-300 text-sm">{option.volume}</td>
                      <td className="px-4 py-3 text-right">
                        <button className="px-5 py-1.5 bg-yellow-500/10 text-yellow-400 text-sm rounded hover:bg-yellow-500/20 transition">
                          Buy
                        </button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Info */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-[#1a1a1a] rounded-xl border border-[#2b2d33] p-4 text-center">
            <p className="text-2xl font-bold text-yellow-400">1.2K</p>
            <p className="text-xs text-gray-500">Active Contracts</p>
          </div>
          <div className="bg-[#1a1a1a] rounded-xl border border-[#2b2d33] p-4 text-center">
            <p className="text-2xl font-bold text-yellow-400">$2.4M</p>
            <p className="text-xs text-gray-500">Open Interest</p>
          </div>
          <div className="bg-[#1a1a1a] rounded-xl border border-[#2b2d33] p-4 text-center">
            <p className="text-2xl font-bold text-yellow-400">$1.8M</p>
            <p className="text-xs text-gray-500">24h Volume</p>
          </div>
        </div>
      </div>
    </div>
  );
}
