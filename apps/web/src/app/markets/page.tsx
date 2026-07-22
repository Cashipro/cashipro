"use client";

import { useState } from "react";
import Link from "next/link";

const allMarkets = [
  { symbol: "BTC/USDT", price: 65432, change: 2.45, volume: "1.2B", high: 66200, low: 64100, favorite: true, hot: true, new: false },
  { symbol: "ETH/USDT", price: 3456, change: -1.23, volume: "850M", high: 3520, low: 3400, favorite: false, hot: true, new: false },
  { symbol: "BNB/USDT", price: 598, change: 5.67, volume: "450M", high: 610, low: 580, favorite: false, hot: false, new: true },
  { symbol: "SOL/USDT", price: 178, change: 8.12, volume: "320M", high: 185, low: 170, favorite: false, hot: true, new: false },
  { symbol: "XRP/USDT", price: 0.62, change: -2.01, volume: "280M", high: 0.65, low: 0.60, favorite: false, hot: false, new: false },
  { symbol: "ADA/USDT", price: 0.46, change: 3.45, volume: "210M", high: 0.48, low: 0.44, favorite: false, hot: false, new: false },
  { symbol: "DOGE/USDT", price: 0.15, change: 12.30, volume: "680M", high: 0.16, low: 0.14, favorite: false, hot: true, new: false },
  { symbol: "DOT/USDT", price: 7.82, change: -0.56, volume: "180M", high: 8.00, low: 7.60, favorite: false, hot: false, new: false },
  { symbol: "PEPE/USDT", price: 0.000012, change: 25.40, volume: "520M", high: 0.000013, low: 0.000010, favorite: false, hot: false, new: true },
  { symbol: "WIF/USDT", price: 2.45, change: -5.67, volume: "95M", high: 2.60, low: 2.30, favorite: false, hot: false, new: true },
];

export default function MarketsPage() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<"all" | "gainers" | "losers" | "favorites" | "hot" | "new">("all");
  const [favorites, setFavorites] = useState<Set<string>>(new Set(["BTC/USDT"]));

  const toggleFavorite = (symbol: string) => {
    const newFavorites = new Set(favorites);
    if (newFavorites.has(symbol)) {
      newFavorites.delete(symbol);
    } else {
      newFavorites.add(symbol);
    }
    setFavorites(newFavorites);
  };

  const filteredMarkets = allMarkets
    .filter((m) => {
      const matchSearch = m.symbol.toLowerCase().includes(search.toLowerCase());
      if (filter === "gainers") return matchSearch && m.change > 0;
      if (filter === "losers") return matchSearch && m.change < 0;
      if (filter === "favorites") return matchSearch && favorites.has(m.symbol);
      if (filter === "hot") return matchSearch && m.hot;
      if (filter === "new") return matchSearch && m.new;
      return matchSearch;
    })
    .sort((a, b) => {
      if (filter === "gainers") return b.change - a.change;
      if (filter === "losers") return a.change - b.change;
      return 0;
    });

  return (
    <div className="min-h-screen bg-black p-4">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-white">📈 Markets</h1>
            <p className="text-sm text-gray-500 mt-1">Explore and trade cryptocurrencies</p>
          </div>
          <div className="flex gap-2">
            <span className="px-4 py-2 bg-[#2b2d33] text-gray-400 rounded-lg text-sm">
              {filteredMarkets.length} pairs
            </span>
          </div>
        </div>

        {/* Search */}
        <div className="relative">
          <input
            type="text"
            placeholder="Search markets..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-[#1a1a1a] border border-[#2b2d33] rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-yellow-400 transition"
          />
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap gap-1 bg-[#1a1a1a] rounded-xl p-1 border border-[#2b2d33]">
          {["all", "gainers", "losers", "favorites", "hot", "new"].map((tab) => (
            <button
              key={tab}
              onClick={() => setFilter(tab as any)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                filter === tab
                  ? "bg-yellow-500/20 text-yellow-400"
                  : "text-gray-400 hover:text-white hover:bg-[#2b2d33]"
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
              {tab === "hot" && " 🔥"}
              {tab === "new" && " 🆕"}
              {tab === "favorites" && " ⭐"}
            </button>
          ))}
        </div>

        {/* Markets Table */}
        <div className="bg-[#1a1a1a] rounded-xl border border-[#2b2d33] overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-black/30">
                <tr>
                  <th className="px-4 py-3 text-left text-xs text-gray-500">Market</th>
                  <th className="px-4 py-3 text-right text-xs text-gray-500">Price</th>
                  <th className="px-4 py-3 text-right text-xs text-gray-500">24h Change</th>
                  <th className="px-4 py-3 text-right text-xs text-gray-500">24h Volume</th>
                  <th className="px-4 py-3 text-right text-xs text-gray-500">High / Low</th>
                  <th className="px-4 py-3 text-center text-xs text-gray-500">⭐</th>
                  <th className="px-4 py-3 text-right text-xs text-gray-500">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#2b2d33]">
                {filteredMarkets.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="px-4 py-8 text-center text-gray-500">
                      No markets found
                    </td>
                  </tr>
                ) : (
                  filteredMarkets.map((m) => (
                    <tr key={m.symbol} className="hover:bg-[#2b2d33]/50 transition-colors">
                      <td className="px-4 py-3">
                        <div>
                          <p className="text-white font-medium">{m.symbol}</p>
                          <div className="flex gap-1">
                            {m.hot && <span className="text-[10px] text-orange-400">🔥</span>}
                            {m.new && <span className="text-[10px] text-green-400">🆕</span>}
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-right text-white font-medium">${m.price.toFixed(2)}</td>
                      <td className={`px-4 py-3 text-right font-bold ${m.change >= 0 ? "text-green-500" : "text-red-500"}`}>
                        {m.change >= 0 ? "+" : ""}{m.change}%
                      </td>
                      <td className="px-4 py-3 text-right text-gray-300">${m.volume}</td>
                      <td className="px-4 py-3 text-right">
                        <span className="text-green-500">${m.high}</span>
                        <span className="text-gray-500 mx-1">/</span>
                        <span className="text-red-500">${m.low}</span>
                      </td>
                      <td className="px-4 py-3 text-center">
                        <button
                          onClick={() => toggleFavorite(m.symbol)}
                          className="text-xl transition hover:scale-110"
                        >
                          {favorites.has(m.symbol) ? "⭐" : "☆"}
                        </button>
                      </td>
                      <td className="px-4 py-3 text-right">
                        <Link href={`/trade/${m.symbol.replace("/", "")}`}>
                          <button className="px-4 py-1.5 bg-yellow-500/10 text-yellow-400 text-sm rounded hover:bg-yellow-500/20 transition">
                            Trade
                          </button>
                        </Link>
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
