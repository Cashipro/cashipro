"use client";

import { useState } from "react";
import Link from "next/link";

const futuresPairs = [
  { symbol: "BTC/USDT", price: 65432, change: 2.45, volume: "2.5B", leverage: "125x", funding: "0.01%" },
  { symbol: "ETH/USDT", price: 3456, change: -1.23, volume: "1.8B", leverage: "100x", funding: "0.02%" },
  { symbol: "BNB/USDT", price: 598, change: 5.67, volume: "450M", leverage: "75x", funding: "0.01%" },
  { symbol: "SOL/USDT", price: 178, change: 8.12, volume: "320M", leverage: "50x", funding: "0.03%" },
  { symbol: "XRP/USDT", price: 0.62, change: -2.01, volume: "280M", leverage: "50x", funding: "0.01%" },
  { symbol: "ADA/USDT", price: 0.46, change: 3.45, volume: "210M", leverage: "25x", funding: "0.02%" },
  { symbol: "DOGE/USDT", price: 0.15, change: 12.30, volume: "680M", leverage: "25x", funding: "0.01%" },
  { symbol: "DOT/USDT", price: 7.82, change: -0.56, volume: "180M", leverage: "25x", funding: "0.01%" },
];

const positionsData = [
  { pair: "BTC/USDT", side: "Long", size: 0.05, entry: 64500, current: 65432, pnl: 46.62, leverage: "10x", margin: "Cross" },
  { pair: "ETH/USDT", side: "Short", size: 0.5, entry: 3456, current: 3400, pnl: -28.00, leverage: "5x", margin: "Isolated" },
  { pair: "SOL/USDT", side: "Long", size: 2.0, entry: 175, current: 178, pnl: 6.00, leverage: "20x", margin: "Cross" },
];

const ordersData = [
  { id: "FUT-001", pair: "BTC/USDT", side: "Long", type: "Limit", price: 65000, amount: 0.05, filled: 0.03, status: "Partial", time: "2 min ago" },
  { id: "FUT-002", pair: "ETH/USDT", side: "Short", type: "Market", price: 3450, amount: 0.5, filled: 0.5, status: "Filled", time: "15 min ago" },
  { id: "FUT-003", pair: "SOL/USDT", side: "Long", type: "Limit", price: 170, amount: 2.0, filled: 0, status: "Open", time: "1 hour ago" },
];

const statusColors = {
  Filled: "bg-green-500/10 text-green-500",
  Partial: "bg-yellow-500/10 text-yellow-400",
  Open: "bg-blue-500/10 text-blue-400",
  Pending: "bg-purple-500/10 text-purple-400",
  Cancelled: "bg-red-500/10 text-red-500",
};

export default function FuturesPage() {
  const [selectedPair, setSelectedPair] = useState("BTC/USDT");
  const [marginMode, setMarginMode] = useState<"cross" | "isolated">("cross");
  const [positionSide, setPositionSide] = useState<"long" | "short">("long");
  const [leverage, setLeverage] = useState(10);
  const [amount, setAmount] = useState("");
  const [activeTab, setActiveTab] = useState<"trade" | "positions" | "orders">("trade");

  const currentPair = futuresPairs.find((f) => f.symbol === selectedPair);

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
            <button
              onClick={() => setActiveTab("positions")}
              className={`px-4 py-2 rounded-lg text-sm transition ${
                activeTab === "positions" ? "bg-yellow-500/20 text-yellow-400" : "bg-[#2b2d33] text-gray-400 hover:text-white"
              }`}
            >
              💰 Positions
            </button>
            <button
              onClick={() => setActiveTab("orders")}
              className={`px-4 py-2 rounded-lg text-sm transition ${
                activeTab === "orders" ? "bg-yellow-500/20 text-yellow-400" : "bg-[#2b2d33] text-gray-400 hover:text-white"
              }`}
            >
              📊 Orders
            </button>
          </div>
        </div>

        {/* Pair Selection */}
        <div className="flex flex-wrap gap-2">
          {futuresPairs.map((f) => (
            <button
              key={f.symbol}
              onClick={() => setSelectedPair(f.symbol)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                selectedPair === f.symbol
                  ? "bg-yellow-500/20 text-yellow-400 border border-yellow-500/50"
                  : "bg-[#2b2d33] text-gray-400 hover:text-white"
              }`}
            >
              {f.symbol}
            </button>
          ))}
        </div>

        {/* Market Info */}
        {currentPair && (
          <div className="bg-[#1a1a1a] rounded-xl border border-[#2b2d33] p-4">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <p className="text-xs text-gray-500">Price</p>
                <p className="text-3xl font-bold text-white">${currentPair.price.toLocaleString()}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500">24h Change</p>
                <p className={`text-xl font-bold ${currentPair.change >= 0 ? "text-green-500" : "text-red-500"}`}>
                  {currentPair.change >= 0 ? "+" : ""}{currentPair.change}%
                </p>
              </div>
              <div>
                <p className="text-xs text-gray-500">24h Volume</p>
                <p className="text-xl font-bold text-white">{currentPair.volume}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Leverage</p>
                <p className="text-xl font-bold text-yellow-400">{currentPair.leverage}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Funding Rate</p>
                <p className="text-xl font-bold text-gray-300">{currentPair.funding}</p>
              </div>
            </div>
          </div>
        )}

        {/* TABS: Trade | Positions | Orders */}
        {activeTab === "trade" && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {/* Trade Form */}
            <div className="lg:col-span-2 bg-[#1a1a1a] rounded-xl border border-[#2b2d33] p-6">
              <h3 className="text-white font-bold text-lg mb-4">📊 Trade {selectedPair}</h3>

              {/* Cross / Isolated Margin */}
              <div className="mb-4">
                <label className="text-sm text-gray-400 block mb-1.5">Margin Mode</label>
                <div className="flex gap-1 bg-[#2b2d33] rounded-lg p-1 max-w-xs">
                  <button
                    onClick={() => setMarginMode("cross")}
                    className={`flex-1 py-2 rounded-lg text-sm font-medium transition ${
                      marginMode === "cross"
                        ? "bg-yellow-500/20 text-yellow-400"
                        : "text-gray-400 hover:text-white"
                    }`}
                  >
                    Cross
                  </button>
                  <button
                    onClick={() => setMarginMode("isolated")}
                    className={`flex-1 py-2 rounded-lg text-sm font-medium transition ${
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
              <div className="mb-4">
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
                <div className="flex gap-1 mt-1 flex-wrap">
                  {[1, 5, 10, 25, 50, 100, 125].map((l) => (
                    <button
                      key={l}
                      onClick={() => setLeverage(l)}
                      className={`px-3 py-1 text-[10px] rounded transition ${
                        leverage === l ? "bg-yellow-500/20 text-yellow-400" : "bg-[#2b2d33] text-gray-400 hover:text-white"
                      }`}
                    >
                      {l}x
                    </button>
                  ))}
                </div>
              </div>

              {/* Long/Short */}
              <div className="flex gap-2 mb-4">
                <button
                  onClick={() => setPositionSide("long")}
                  className={`flex-1 py-3 rounded-lg text-sm font-bold transition ${
                    positionSide === "long" ? "bg-green-500 text-white" : "bg-[#2b2d33] text-gray-400"
                  }`}
                >
                  📈 Long
                </button>
                <button
                  onClick={() => setPositionSide("short")}
                  className={`flex-1 py-3 rounded-lg text-sm font-bold transition ${
                    positionSide === "short" ? "bg-red-500 text-white" : "bg-[#2b2d33] text-gray-400"
                  }`}
                >
                  📉 Short
                </button>
              </div>

              {/* Amount */}
              <div className="mb-4">
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
                <div className="bg-black/50 rounded-lg p-4 text-sm space-y-2 mb-4">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Entry Price</span>
                    <span className="text-white">${currentPair?.price}</span>
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
                      ${(currentPair?.price || 0) * (positionSide === "long" ? 0.92 : 1.08)}
                    </span>
                  </div>
                </div>
              )}

              <button
                disabled={!amount}
                className={`w-full py-3.5 rounded-xl font-bold text-white transition ${
                  amount
                    ? positionSide === "long"
                      ? "bg-green-500 hover:bg-green-600"
                      : "bg-red-500 hover:bg-red-600"
                    : "bg-[#2b2d33] cursor-not-allowed"
                }`}
              >
                {positionSide === "long" ? "Open Long" : "Open Short"} {selectedPair.split("/")[0]}
              </button>
            </div>

            {/* Quick Stats */}
            <div className="space-y-4">
              <div className="bg-[#1a1a1a] rounded-xl border border-[#2b2d33] p-4">
                <h4 className="text-white font-bold mb-3">📊 Position Summary</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between"><span className="text-gray-500">Account Balance</span><span className="text-white">$12,543</span></div>
                  <div className="flex justify-between"><span className="text-gray-500">Used Margin</span><span className="text-yellow-400">$1,200</span></div>
                  <div className="flex justify-between"><span className="text-gray-500">Available Margin</span><span className="text-white">$11,343</span></div>
                  <div className="flex justify-between"><span className="text-gray-500">Unrealized PnL</span><span className="text-green-500">+$46.62</span></div>
                </div>
              </div>

              <div className="bg-[#1a1a1a] rounded-xl border border-[#2b2d33] p-4">
                <h4 className="text-white font-bold mb-3">📈 Market Stats</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between"><span className="text-gray-500">Open Interest</span><span className="text-white">$850M</span></div>
                  <div className="flex justify-between"><span className="text-gray-500">24h Liquidations</span><span className="text-red-500">$12.5M</span></div>
                  <div className="flex justify-between"><span className="text-gray-500">Long/Short Ratio</span><span className="text-white">1.2:1</span></div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Positions Tab */}
        {activeTab === "positions" && (
          <div className="bg-[#1a1a1a] rounded-xl border border-[#2b2d33] overflow-hidden">
            <div className="p-4 border-b border-[#2b2d33] flex items-center justify-between">
              <h3 className="text-white font-bold">📊 Open Positions</h3>
              <span className="text-xs text-gray-500">{positionsData.length} positions</span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-black/30">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs text-gray-500">Pair</th>
                    <th className="px-4 py-3 text-left text-xs text-gray-500">Side</th>
                    <th className="px-4 py-3 text-right text-xs text-gray-500">Size</th>
                    <th className="px-4 py-3 text-right text-xs text-gray-500">Entry</th>
                    <th className="px-4 py-3 text-right text-xs text-gray-500">Current</th>
                    <th className="px-4 py-3 text-right text-xs text-gray-500">PnL</th>
                    <th className="px-4 py-3 text-right text-xs text-gray-500">Leverage</th>
                    <th className="px-4 py-3 text-right text-xs text-gray-500">Margin</th>
                    <th className="px-4 py-3 text-right text-xs text-gray-500">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#2b2d33]">
                  {positionsData.length === 0 ? (
                    <tr><td colSpan={9} className="px-4 py-8 text-center text-gray-500">No open positions</td></tr>
                  ) : (
                    positionsData.map((pos, i) => (
                      <tr key={i} className="hover:bg-[#2b2d33]/50 transition-colors">
                        <td className="px-4 py-3 text-white font-medium">{pos.pair}</td>
                        <td className="px-4 py-3"><span className={`text-xs px-2 py-1 rounded font-bold ${pos.side === "Long" ? "bg-green-500/20 text-green-500" : "bg-red-500/20 text-red-500"}`}>{pos.side}</span></td>
                        <td className="px-4 py-3 text-right text-white">{pos.size}</td>
                        <td className="px-4 py-3 text-right text-white">${pos.entry.toFixed(2)}</td>
                        <td className="px-4 py-3 text-right text-white">${pos.current.toFixed(2)}</td>
                        <td className={`px-4 py-3 text-right font-bold ${pos.pnl >= 0 ? "text-green-500" : "text-red-500"}`}>${pos.pnl.toFixed(2)}</td>
                        <td className="px-4 py-3 text-right text-yellow-400">{pos.leverage}</td>
                        <td className="px-4 py-3 text-right"><span className={`text-xs px-2 py-1 rounded ${pos.margin === "Cross" ? "bg-yellow-500/10 text-yellow-400" : "bg-blue-500/10 text-blue-400"}`}>{pos.margin}</span></td>
                        <td className="px-4 py-3 text-right"><button className="px-3 py-1.5 bg-red-500/10 text-red-500 text-xs rounded hover:bg-red-500/20">Close</button></td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Orders Tab */}
        {activeTab === "orders" && (
          <div className="bg-[#1a1a1a] rounded-xl border border-[#2b2d33] overflow-hidden">
            <div className="p-4 border-b border-[#2b2d33] flex items-center justify-between">
              <h3 className="text-white font-bold">📋 Order History</h3>
              <span className="text-xs text-gray-500">{ordersData.length} orders</span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-black/30">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs text-gray-500">ID</th>
                    <th className="px-4 py-3 text-left text-xs text-gray-500">Pair</th>
                    <th className="px-4 py-3 text-left text-xs text-gray-500">Side</th>
                    <th className="px-4 py-3 text-left text-xs text-gray-500">Type</th>
                    <th className="px-4 py-3 text-right text-xs text-gray-500">Price</th>
                    <th className="px-4 py-3 text-right text-xs text-gray-500">Amount</th>
                    <th className="px-4 py-3 text-right text-xs text-gray-500">Filled</th>
                    <th className="px-4 py-3 text-left text-xs text-gray-500">Status</th>
                    <th className="px-4 py-3 text-right text-xs text-gray-500">Time</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#2b2d33]">
                  {ordersData.length === 0 ? (
                    <tr><td colSpan={9} className="px-4 py-8 text-center text-gray-500">No orders found</td></tr>
                  ) : (
                    ordersData.map((order) => (
                      <tr key={order.id} className="hover:bg-[#2b2d33]/50 transition-colors">
                        <td className="px-4 py-3 text-white text-sm font-mono">{order.id}</td>
                        <td className="px-4 py-3 text-white text-sm">{order.pair}</td>
                        <td className="px-4 py-3"><span className={`text-xs px-2 py-1 rounded ${order.side === "Long" ? "bg-green-500/10 text-green-500" : "bg-red-500/10 text-red-500"}`}>{order.side}</span></td>
                        <td className="px-4 py-3 text-white text-sm">{order.type}</td>
                        <td className="px-4 py-3 text-right text-white text-sm">${order.price.toFixed(2)}</td>
                        <td className="px-4 py-3 text-right text-white text-sm">{order.amount}</td>
                        <td className="px-4 py-3 text-right text-gray-300 text-sm">{order.filled}</td>
                        <td className="px-4 py-3"><span className={`text-xs px-2 py-1 rounded ${statusColors[order.status as keyof typeof statusColors]}`}>{order.status}</span></td>
                        <td className="px-4 py-3 text-right text-gray-400 text-sm">{order.time}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
