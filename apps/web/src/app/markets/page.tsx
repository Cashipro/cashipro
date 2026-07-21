"use client";

import { useState } from "react";
import Link from "next/link";

const markets = [
  { symbol: "BTC/USDT", price: "65,432.50", change: "+2.45%", volume: "1.2B", high: "66,200", low: "64,100" },
  { symbol: "ETH/USDT", price: "3,456.80", change: "-1.23%", volume: "850M", high: "3,520", low: "3,400" },
  { symbol: "BNB/USDT", price: "598.20", change: "+5.67%", volume: "450M", high: "610", low: "580" },
  { symbol: "SOL/USDT", price: "178.50", change: "+8.12%", volume: "320M", high: "185", low: "170" },
  { symbol: "XRP/USDT", price: "0.62", change: "-2.01%", volume: "280M", high: "0.65", low: "0.60" },
  { symbol: "ADA/USDT", price: "0.46", change: "+3.45%", volume: "210M", high: "0.48", low: "0.44" },
  { symbol: "DOGE/USDT", price: "0.15", change: "+12.30%", volume: "680M", high: "0.16", low: "0.14" },
  { symbol: "DOT/USDT", price: "7.82", change: "-0.56%", volume: "180M", high: "8.00", low: "7.60" },
];

export default function MarketsPage() {
  const [search, setSearch] = useState("");

  const filtered = markets.filter((m) =>
    m.symbol.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-4 space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Markets</h1>
          <p className="text-sm text-gray-500">Browse all available trading pairs</p>
        </div>
        <div className="flex gap-2">
          <button className="px-4 py-2 bg-yellow-500/10 text-yellow-400 rounded-lg text-sm hover:bg-yellow-500/20 transition-colors">
            💰 All
          </button>
          <button className="px-4 py-2 bg-[#2b2d33] text-gray-400 rounded-lg text-sm hover:bg-[#3b3d43] transition-colors">
            📈 Gainers
          </button>
          <button className="px-4 py-2 bg-[#2b2d33] text-gray-400 rounded-lg text-sm hover:bg-[#3b3d43] transition-colors">
            📉 Losers
          </button>
        </div>
      </div>

      {/* Search */}
      <div className="relative">
        <input
          type="text"
          placeholder="Search markets..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full bg-[#1a1a1a] border border-[#2b2d33] rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-yellow-400 transition-colors"
        />
        <span className="absolute right-4 top-3 text-gray-500">🔍</span>
      </div>

      {/* Markets Table */}
      <div className="bg-[#1a1a1a] rounded-xl border border-[#2b2d33] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-black/30">
              <tr>
                <th className="px-4 py-3 text-left text-xs text-gray-500 font-medium">Market</th>
                <th className="px-4 py-3 text-right text-xs text-gray-500 font-medium">Price</th>
                <th className="px-4 py-3 text-right text-xs text-gray-500 font-medium">24h Change</th>
                <th className="px-4 py-3 text-right text-xs text-gray-500 font-medium">24h Volume</th>
                <th className="px-4 py-3 text-right text-xs text-gray-500 font-medium">High / Low</th>
                <th className="px-4 py-3 text-right text-xs text-gray-500 font-medium">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#2b2d33]">
              {filtered.map((m) => {
                const isPositive = m.change.startsWith("+");
                return (
                  <tr key={m.symbol} className="hover:bg-[#2b2d33]/50 transition-colors">
                    <td className="px-4 py-3">
                      <div>
                        <p className="text-white font-medium text-sm">{m.symbol}</p>
                        <p className="text-xs text-gray-500">{m.symbol.split("/")[0]} / {m.symbol.split("/")[1]}</p>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-right text-white font-medium text-sm">
                      ${m.price}
                    </td>
                    <td className="px-4 py-3 text-right">
                      <span className={`text-sm font-bold ${isPositive ? "text-green-500" : "text-red-500"}`}>
                        {m.change}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right text-gray-400 text-sm">
                      ${m.volume}
                    </td>
                    <td className="px-4 py-3 text-right">
                      <div className="text-sm">
                        <span className="text-green-500">{m.high}</span>
                        <span className="text-gray-500 mx-1">/</span>
                        <span className="text-red-500">{m.low}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <Link href={`/trade/${m.symbol.replace("/", "")}`}>
                        <button className="px-5 py-1.5 bg-yellow-500/10 text-yellow-400 text-sm rounded hover:bg-yellow-500/20 transition-colors">
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
  );
}
