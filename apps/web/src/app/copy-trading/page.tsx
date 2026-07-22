"use client";

import { useState } from "react";
import Link from "next/link";

const topTraders = [
  {
    id: 1,
    name: "CryptoKing",
    avatar: "CK",
    verified: true,
    followers: 2450,
    profit: 342.5,
    roi: "+156.8%",
    winRate: 78,
    assets: ["BTC", "ETH", "SOL"],
    fee: "10%",
    totalCopied: 145000,
  },
  {
    id: 2,
    name: "WhaleHunter",
    avatar: "WH",
    verified: true,
    followers: 1890,
    profit: 285.2,
    roi: "+98.4%",
    winRate: 72,
    assets: ["BTC", "BNB", "XRP"],
    fee: "15%",
    totalCopied: 98000,
  },
  {
    id: 3,
    name: "EagleTrader",
    avatar: "ET",
    verified: false,
    followers: 1200,
    profit: 156.8,
    roi: "+67.2%",
    winRate: 65,
    assets: ["ETH", "SOL", "ADA"],
    fee: "8%",
    totalCopied: 54000,
  },
  {
    id: 4,
    name: "MoonWalker",
    avatar: "MW",
    verified: true,
    followers: 980,
    profit: 210.4,
    roi: "+112.5%",
    winRate: 70,
    assets: ["BTC", "ETH", "BNB"],
    fee: "12%",
    totalCopied: 72000,
  },
  {
    id: 5,
    name: "AlphaWave",
    avatar: "AW",
    verified: false,
    followers: 760,
    profit: 98.6,
    roi: "+45.3%",
    winRate: 58,
    assets: ["SOL", "AVAX", "DOT"],
    fee: "6%",
    totalCopied: 32000,
  },
];

const topPerforming = [
  { name: "CryptoKing", profit: "+342.5%", followers: 2450 },
  { name: "WhaleHunter", profit: "+285.2%", followers: 1890 },
  { name: "MoonWalker", profit: "+210.4%", followers: 980 },
];

export default function CopyTradingPage() {
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState<"roi" | "followers" | "winRate">("roi");

  const sortedTraders = [...topTraders]
    .filter((t) => t.name.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => {
      if (sortBy === "roi") return parseFloat(b.roi) - parseFloat(a.roi);
      if (sortBy === "followers") return b.followers - a.followers;
      return b.winRate - a.winRate;
    });

  const [selectedTrader, setSelectedTrader] = useState<typeof topTraders[0] | null>(null);
  const [copyAmount, setCopyAmount] = useState("");

  return (
    <div className="min-h-screen bg-black p-4">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-white">📊 Copy Trading</h1>
            <p className="text-sm text-gray-500 mt-1">Follow top traders and copy their strategies</p>
          </div>
          <div className="flex gap-2">
            <span className="px-4 py-2 bg-yellow-500/10 text-yellow-400 rounded-lg text-sm">
              💰 $145K Copied
            </span>
            <span className="px-4 py-2 bg-green-500/10 text-green-500 rounded-lg text-sm">
              📈 +156% Avg
            </span>
          </div>
        </div>

        {/* Top Performers */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {topPerforming.map((trader, i) => (
            <div key={i} className="bg-[#1a1a1a] rounded-xl border border-[#2b2d33] p-4 text-center">
              <p className="text-2xl font-bold text-yellow-400">{trader.profit}</p>
              <p className="text-white font-bold">{trader.name}</p>
              <p className="text-xs text-gray-500">{trader.followers} followers</p>
            </div>
          ))}
        </div>

        {/* Search & Filter */}
        <div className="flex flex-wrap items-center gap-3">
          <input
            type="text"
            placeholder="Search traders..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 min-w-[200px] bg-[#1a1a1a] border border-[#2b2d33] rounded-xl px-4 py-2.5 text-white text-sm placeholder-gray-500 focus:outline-none focus:border-yellow-400 transition"
          />
          <div className="flex gap-1 bg-[#1a1a1a] rounded-xl p-1 border border-[#2b2d33]">
            <button
              onClick={() => setSortBy("roi")}
              className={`px-4 py-1.5 rounded-lg text-xs font-medium transition ${
                sortBy === "roi" ? "bg-yellow-500/20 text-yellow-400" : "text-gray-400 hover:text-white"
              }`}
            >
              ROI
            </button>
            <button
              onClick={() => setSortBy("followers")}
              className={`px-4 py-1.5 rounded-lg text-xs font-medium transition ${
                sortBy === "followers" ? "bg-yellow-500/20 text-yellow-400" : "text-gray-400 hover:text-white"
              }`}
            >
              Followers
            </button>
            <button
              onClick={() => setSortBy("winRate")}
              className={`px-4 py-1.5 rounded-lg text-xs font-medium transition ${
                sortBy === "winRate" ? "bg-yellow-500/20 text-yellow-400" : "text-gray-400 hover:text-white"
              }`}
            >
              Win Rate
            </button>
          </div>
        </div>

        {/* Trader List */}
        <div className="bg-[#1a1a1a] rounded-xl border border-[#2b2d33] overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-black/30">
                <tr>
                  <th className="px-4 py-3 text-left text-xs text-gray-500">Trader</th>
                  <th className="px-4 py-3 text-right text-xs text-gray-500">ROI</th>
                  <th className="px-4 py-3 text-right text-xs text-gray-500">Win Rate</th>
                  <th className="px-4 py-3 text-right text-xs text-gray-500">Followers</th>
                  <th className="px-4 py-3 text-right text-xs text-gray-500">Total Copied</th>
                  <th className="px-4 py-3 text-right text-xs text-gray-500">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#2b2d33]">
                {sortedTraders.map((trader) => (
                  <tr key={trader.id} className="hover:bg-[#2b2d33]/50 transition-colors">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-yellow-500/20 flex items-center justify-center text-sm font-bold text-yellow-400">
                          {trader.avatar}
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <p className="text-white font-medium">{trader.name}</p>
                            {trader.verified && (
                              <span className="text-xs text-blue-400">✓</span>
                            )}
                          </div>
                          <div className="flex gap-1 text-[10px] text-gray-500">
                            {trader.assets.map((asset) => (
                              <span key={asset} className="bg-[#2b2d33] px-1.5 py-0.5 rounded">
                                {asset}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-right text-green-500 font-bold text-sm">
                      {trader.roi}
                    </td>
                    <td className="px-4 py-3 text-right text-white text-sm">
                      {trader.winRate}%
                    </td>
                    <td className="px-4 py-3 text-right text-gray-300 text-sm">
                      {trader.followers.toLocaleString()}
                    </td>
                    <td className="px-4 py-3 text-right text-yellow-400 text-sm font-bold">
                      ${trader.totalCopied.toLocaleString()}
                    </td>
                    <td className="px-4 py-3 text-right">
                      <button
                        onClick={() => setSelectedTrader(trader)}
                        className="px-5 py-1.5 bg-yellow-500/10 text-yellow-400 text-sm rounded hover:bg-yellow-500/20 transition"
                      >
                        Copy
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Copy Modal */}
        {selectedTrader && (
          <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50">
            <div className="bg-[#1a1a1a] rounded-2xl border border-[#2b2d33] p-6 max-w-md w-full">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-white font-bold text-xl">Copy {selectedTrader.name}</h3>
                <button
                  onClick={() => setSelectedTrader(null)}
                  className="text-gray-400 hover:text-white text-xl"
                >
                  ✕
                </button>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div className="bg-black/50 rounded-lg p-3 text-center">
                    <p className="text-gray-500">ROI</p>
                    <p className="text-green-500 font-bold">{selectedTrader.roi}</p>
                  </div>
                  <div className="bg-black/50 rounded-lg p-3 text-center">
                    <p className="text-gray-500">Win Rate</p>
                    <p className="text-white font-bold">{selectedTrader.winRate}%</p>
                  </div>
                  <div className="bg-black/50 rounded-lg p-3 text-center">
                    <p className="text-gray-500">Followers</p>
                    <p className="text-white font-bold">{selectedTrader.followers}</p>
                  </div>
                  <div className="bg-black/50 rounded-lg p-3 text-center">
                    <p className="text-gray-500">Fee</p>
                    <p className="text-yellow-400 font-bold">{selectedTrader.fee}</p>
                  </div>
                </div>

                <div>
                  <label className="text-sm text-gray-400 block mb-1.5">Amount to Copy (USDT)</label>
                  <input
                    type="number"
                    value={copyAmount}
                    onChange={(e) => setCopyAmount(e.target.value)}
                    placeholder="100"
                    className="w-full bg-black border border-[#2b2d33] rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-yellow-400 transition"
                  />
                  <div className="flex gap-2 mt-2">
                    {[100, 500, 1000, 5000].map((p) => (
                      <button
                        key={p}
                        onClick={() => setCopyAmount(p.toString())}
                        className="flex-1 py-1.5 bg-[#2b2d33] text-gray-400 text-xs rounded hover:bg-[#3b3d43] transition"
                      >
                        ${p}
                      </button>
                    ))}
                  </div>
                </div>

                <button className="w-full py-3 bg-yellow-500 text-black font-bold rounded-xl hover:bg-yellow-400 transition">
                  Start Copying
                </button>

                <p className="text-xs text-gray-500 text-center">
                  ⚠️ Your funds will be allocated to copy this trader's strategy
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
