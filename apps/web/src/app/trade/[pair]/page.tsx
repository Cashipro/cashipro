"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

// ============================================================
// 1. COINGECKO API — REAL COINS DATA
// ============================================================
const fetchCoins = async (page: number = 1) => {
  const res = await fetch(
    `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=250&page=${page}&sparkline=false&price_change_percentage=24h`
  );
  return res.json();
};

const fetchChartData = async (coinId: string, days: number = 1) => {
  const res = await fetch(
    `https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=usd&days=${days}`
  );
  const data = await res.json();
  return data.prices.map((p: [number, number]) => ({
    time: new Date(p[0]).toLocaleTimeString(),
    price: p[1],
  }));
};

// ============================================================
// 2. MAIN COMPONENT
// ============================================================
interface Coin {
  id: string;
  symbol: string;
  name: string;
  current_price: number;
  price_change_percentage_24h: number;
  high_24h: number;
  low_24h: number;
  total_volume: number;
  market_cap: number;
  favorite?: boolean;
}

export default function SpotTradingPage() {
  const [coins, setCoins] = useState<Coin[]>([]);
  const [selectedCoin, setSelectedCoin] = useState<Coin | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeFilter, setActiveFilter] = useState<"all" | "favorites" | "gainers" | "losers">("all");
  const [chartData, setChartData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const [tradeType, setTradeType] = useState<"buy" | "sell">("buy");
  const [orderType, setOrderType] = useState<"limit" | "market">("limit");
  const [price, setPrice] = useState(0);
  const [amount, setAmount] = useState(0.01);
  const [activeTab, setActiveTab] = useState<"chart" | "orderbook" | "trades">("chart");
  const [favorites, setFavorites] = useState<Set<string>>(new Set());

  const wsRef = useRef<WebSocket | null>(null);

  // ============================================================
  // 3. FETCH COINS (PAGINATED — 1000+ COINS)
  // ============================================================
  const loadCoins = async () => {
    try {
      const data = await fetchCoins(page);
      if (data.length === 0) {
        setHasMore(false);
        return;
      }
      const coinsWithFavorite = data.map((coin: any) => ({
        ...coin,
        favorite: favorites.has(coin.id),
      }));
      setCoins((prev) => [...prev, ...coinsWithFavorite]);
      if (!selectedCoin && coinsWithFavorite.length > 0) {
        setSelectedCoin(coinsWithFavorite[0]);
        setPrice(coinsWithFavorite[0].current_price);
        loadChartData(coinsWithFavorite[0].id);
      }
      setLoading(false);
    } catch (error) {
      console.error("Error fetching coins:", error);
      setLoading(false);
    }
  };

  // ============================================================
  // 4. FETCH CHART DATA
  // ============================================================
  const loadChartData = async (coinId: string, days: number = 1) => {
    try {
      const data = await fetchChartData(coinId, days);
      setChartData({
        labels: data.map((d: any) => d.time),
        datasets: [
          {
            label: "Price (USD)",
            data: data.map((d: any) => d.price),
            borderColor: tradeType === "buy" ? "#00ff9f" : "#ff4757",
            backgroundColor: tradeType === "buy" 
              ? "rgba(0, 255, 159, 0.1)" 
              : "rgba(255, 71, 87, 0.1)",
            fill: true,
            tension: 0.4,
            pointRadius: 0,
            borderWidth: 2,
          },
        ],
      });
    } catch (error) {
      console.error("Error fetching chart data:", error);
    }
  };

  // ============================================================
  // 5. WEBSOCKET — REAL-TIME PRICES
  // ============================================================
  useEffect(() => {
    const symbols = coins.map((c) => c.id.toLowerCase()).join(",");
    if (!symbols) return;

    const ws = new WebSocket(`wss://ws.coincap.io/prices?assets=${symbols}`);

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      setCoins((prev) =>
        prev.map((coin) => {
          const newPrice = data[coin.id];
          if (newPrice) {
            return { ...coin, current_price: parseFloat(newPrice) };
          }
          return coin;
        })
      );
      // Update selected coin price
      if (selectedCoin && data[selectedCoin.id]) {
        setPrice(parseFloat(data[selectedCoin.id]));
      }
    };

    wsRef.current = ws;
    return () => ws.close();
  }, [coins.map((c) => c.id).join(",")]);

  // ============================================================
  // 6. INITIAL LOAD
  // ============================================================
  useEffect(() => {
    loadCoins();
  }, [page]);

  // ============================================================
  // 7. HANDLERS
  // ============================================================
  const handleCoinSelect = async (coin: Coin) => {
    setSelectedCoin(coin);
    setPrice(coin.current_price);
    await loadChartData(coin.id);
  };

  const toggleFavorite = (coinId: string) => {
    setFavorites((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(coinId)) newSet.delete(coinId);
      else newSet.add(coinId);
      return newSet;
    });
  };

  const handleLoadMore = () => {
    if (hasMore && !loading) {
      setPage((p) => p + 1);
    }
  };

  // ============================================================
  // 8. FILTERS
  // ============================================================
  const filteredCoins = coins
    .filter((coin) => {
      const matchesSearch =
        coin.symbol.toLowerCase().includes(searchTerm.toLowerCase()) ||
        coin.name.toLowerCase().includes(searchTerm.toLowerCase());
      if (activeFilter === "favorites") return matchesSearch && favorites.has(coin.id);
      if (activeFilter === "gainers") return matchesSearch && coin.price_change_percentage_24h > 0;
      if (activeFilter === "losers") return matchesSearch && coin.price_change_percentage_24h < 0;
      return matchesSearch;
    })
    .sort((a, b) => b.market_cap - a.market_cap);

  // ============================================================
  // 9. RENDER
  // ============================================================
  if (loading && coins.length === 0) {
    return (
      <div className="min-h-screen bg-gray-950 text-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-emerald-500 border-r-2 border-emerald-500 mx-auto"></div>
          <p className="text-gray-400 mt-4">Loading 1000+ coins...</p>
          <p className="text-xs text-gray-500 mt-2">Fetching real-time data from CoinGecko</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-gray-950 text-white overflow-hidden font-sans">
      {/* ===== SIDEBAR — COIN LIST ===== */}
      <div className="w-72 bg-gray-900 border-r border-gray-800 flex flex-col">
        {/* Header */}
        <div className="p-5 border-b border-gray-800 flex items-center gap-3">
          <div className="w-9 h-9 bg-gradient-to-br from-emerald-400 to-cyan-400 rounded-2xl flex items-center justify-center font-bold text-2xl">
            C
          </div>
          <div>
            <h1 className="text-2xl font-bold tracking-tighter">Cashipro</h1>
            <p className="text-xs text-emerald-400">Spot Trading</p>
          </div>
        </div>

        {/* Search */}
        <div className="p-4">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search 1000+ coins..."
            className="w-full bg-gray-800 border border-gray-700 rounded-2xl py-3 px-5 focus:outline-none focus:border-emerald-500 text-sm"
          />
        </div>

        {/* Filters */}
        <div className="px-4 flex gap-1 mb-3">
          {["all", "favorites", "gainers", "losers"].map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter as any)}
              className={`flex-1 py-2 text-xs rounded-xl transition-all ${
                activeFilter === filter
                  ? "bg-emerald-500 text-black font-medium"
                  : "bg-gray-800 hover:bg-gray-700"
              }`}
            >
              {filter === "all" ? "All" : filter.toUpperCase()}
            </button>
          ))}
        </div>

        {/* Coin List */}
        <div className="flex-1 overflow-auto">
          <table className="w-full text-sm">
            <thead className="sticky top-0 bg-gray-900 border-b border-gray-800">
              <tr className="text-gray-400 text-xs">
                <th className="text-left pl-5 py-3 font-normal">Coin</th>
                <th className="text-right py-3 font-normal">Price</th>
                <th className="text-right pr-5 py-3 font-normal">24h</th>
              </tr>
            </thead>
            <tbody>
              {filteredCoins.map((coin) => (
                <tr
                  key={coin.id}
                  onClick={() => handleCoinSelect(coin)}
                  className={`border-b border-gray-800 hover:bg-gray-800 cursor-pointer transition-colors ${
                    selectedCoin?.id === coin.id ? "bg-gray-800" : ""
                  }`}
                >
                  <td className="pl-5 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center text-lg">
                        {coin.symbol[0].toUpperCase()}
                      </div>
                      <div>
                        <div className="font-medium">{coin.symbol.toUpperCase()}</div>
                        <div className="text-xs text-gray-500">{coin.name}</div>
                      </div>
                    </div>
                  </td>
                  <td className="text-right font-mono py-4">
                    ${coin.current_price?.toLocaleString() || "0"}
                  </td>
                  <td
                    className={`text-right pr-5 py-4 font-medium ${
                      coin.price_change_percentage_24h >= 0
                        ? "text-emerald-400"
                        : "text-red-500"
                    }`}
                  >
                    {coin.price_change_percentage_24h >= 0 ? "+" : ""}
                    {coin.price_change_percentage_24h?.toFixed(2) || "0"}%
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {hasMore && (
            <button
              onClick={handleLoadMore}
              className="w-full py-4 text-sm text-gray-400 hover:text-white transition"
            >
              Load More Coins →
            </button>
          )}
        </div>
      </div>

      {/* ===== MAIN TRADING AREA ===== */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="h-16 border-b border-gray-800 bg-gray-900 px-6 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-4">
              <div className="text-3xl font-bold">{selectedCoin?.symbol.toUpperCase()}</div>
              <div className="text-emerald-400">/ USDT</div>
            </div>
            <div>
              <div className="text-3xl font-mono font-semibold">
                ${selectedCoin?.current_price?.toLocaleString() || "0"}
              </div>
              <div
                className={`text-sm ${
                  (selectedCoin?.price_change_percentage_24h || 0) >= 0
                    ? "text-emerald-400"
                    : "text-red-500"
                }`}
              >
                {(selectedCoin?.price_change_percentage_24h || 0) >= 0 ? "↑" : "↓"}{" "}
                {selectedCoin?.price_change_percentage_24h?.toFixed(2) || "0"}%
              </div>
            </div>
          </div>
          <div className="flex gap-8 text-sm">
            <div>
              High:{" "}
              <span className="text-emerald-400">${selectedCoin?.high_24h?.toLocaleString() || "0"}</span>
            </div>
            <div>
              Low:{" "}
              <span className="text-red-500">${selectedCoin?.low_24h?.toLocaleString() || "0"}</span>
            </div>
            <div>
              Vol:{" "}
              <span className="font-medium">
                ${((selectedCoin?.total_volume || 0) / 1e6).toFixed(2)}M
              </span>
            </div>
          </div>
        </div>

        {/* Chart Area */}
        <div className="flex-1 flex">
          <div className="flex-1 flex flex-col">
            {/* Tabs */}
            <div className="border-b border-gray-800 flex">
              {["chart", "orderbook", "trades"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab as any)}
                  className={`px-8 py-4 border-b-2 transition-all ${
                    activeTab === tab
                      ? "border-emerald-500 text-white"
                      : "border-transparent text-gray-400 hover:text-gray-200"
                  }`}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </div>

            <div className="flex-1 p-6 bg-black/30">
              {activeTab === "chart" && chartData && (
                <div className="h-full">
                  <Line
                    data={chartData}
                    options={{
                      responsive: true,
                      maintainAspectRatio: false,
                      plugins: { legend: { display: false } },
                      scales: {
                        y: {
                          grid: { color: "#1f2937" },
                          ticks: { color: "#6b7280" },
                        },
                        x: {
                          grid: { color: "#1f2937" },
                          ticks: { color: "#6b7280", maxTicksLimit: 12 },
                        },
                      },
                    }}
                  />
                </div>
              )}

              {activeTab === "orderbook" && (
                <div className="grid grid-cols-2 gap-6 h-full">
                  {/* Buy Orders */}
                  <div>
                    <h3 className="text-emerald-400 mb-3 font-medium">Buy Orders</h3>
                    <div className="space-y-1 text-sm font-mono">
                      {Array.from({ length: 8 }).map((_, i) => (
                        <div
                          key={i}
                          className="flex justify-between bg-gray-900/50 px-4 py-2 rounded-lg"
                        >
                          <span>
                            {(selectedCoin?.current_price || 0) - 5 + i * 2}
                          </span>
                          <span className="text-emerald-400">{(Math.random() * 10 + 1).toFixed(2)}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  {/* Sell Orders */}
                  <div>
                    <h3 className="text-red-500 mb-3 font-medium">Sell Orders</h3>
                    <div className="space-y-1 text-sm font-mono">
                      {Array.from({ length: 8 }).map((_, i) => (
                        <div
                          key={i}
                          className="flex justify-between bg-gray-900/50 px-4 py-2 rounded-lg"
                        >
                          <span>
                            {(selectedCoin?.current_price || 0) + 5 - i * 2}
                          </span>
                          <span className="text-red-500">{(Math.random() * 10 + 1).toFixed(2)}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* ===== TRADE PANEL ===== */}
          <div className="w-96 border-l border-gray-800 bg-gray-900 flex flex-col">
            <div className="p-5 border-b border-gray-800">
              <div className="flex bg-gray-800 rounded-2xl p-1">
                <button
                  onClick={() => setTradeType("buy")}
                  className={`flex-1 py-3 rounded-xl font-semibold transition-all ${
                    tradeType === "buy" ? "bg-emerald-500 text-black" : ""
                  }`}
                >
                  BUY
                </button>
                <button
                  onClick={() => setTradeType("sell")}
                  className={`flex-1 py-3 rounded-xl font-semibold transition-all ${
                    tradeType === "sell" ? "bg-red-500 text-white" : ""
                  }`}
                >
                  SELL
                </button>
              </div>
            </div>

            <div className="p-5 space-y-6 flex-1">
              <div>
                <label className="block text-xs text-gray-400 mb-1">Order Type</label>
                <div className="flex gap-2">
                  {["limit", "market"].map((t) => (
                    <button
                      key={t}
                      onClick={() => setOrderType(t as any)}
                      className={`flex-1 py-2.5 rounded-xl text-sm ${
                        orderType === t ? "bg-gray-700" : "bg-gray-800"
                      }`}
                    >
                      {t.toUpperCase()}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs text-gray-400 mb-1">Price (USDT)</label>
                <input
                  type="number"
                  value={price}
                  onChange={(e) => setPrice(parseFloat(e.target.value))}
                  className="w-full bg-gray-800 border border-gray-700 rounded-2xl px-4 py-3 text-lg font-mono focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs text-gray-400 mb-1">
                  Amount ({selectedCoin?.symbol.toUpperCase()})
                </label>
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(parseFloat(e.target.value))}
                  className="w-full bg-gray-800 border border-gray-700 rounded-2xl px-4 py-3 text-lg font-mono focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div className="pt-4 border-t border-gray-800">
                <div className="flex justify-between text-sm mb-4">
                  <span className="text-gray-400">Total</span>
                  <span className="font-medium">${(price * amount).toFixed(2)}</span>
                </div>

                <button
                  onClick={() =>
                    alert(
                      `Order placed: ${tradeType.toUpperCase()} ${amount} ${selectedCoin?.symbol.toUpperCase()} @ $${price}`
                    )
                  }
                  className={`w-full py-4 rounded-2xl font-bold text-lg transition-all active:scale-95 ${
                    tradeType === "buy"
                      ? "bg-emerald-500 hover:bg-emerald-600 text-black"
                      : "bg-red-500 hover:bg-red-600"
                  }`}
                >
                  {tradeType === "buy" ? "BUY" : "SELL"} {selectedCoin?.symbol.toUpperCase()}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
