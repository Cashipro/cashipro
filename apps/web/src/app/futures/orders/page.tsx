"use client";

import { useState } from "react";
import Link from "next/link";

const orders = [
  { id: "FUT-001", pair: "BTC/USDT", side: "Long", type: "Limit", price: 65000, amount: 0.05, filled: 0.03, status: "Partial", time: "2 min ago" },
  { id: "FUT-002", pair: "ETH/USDT", side: "Short", type: "Market", price: 3450, amount: 0.5, filled: 0.5, status: "Filled", time: "15 min ago" },
  { id: "FUT-003", pair: "SOL/USDT", side: "Long", type: "Limit", price: 170, amount: 2.0, filled: 0, status: "Open", time: "1 hour ago" },
  { id: "FUT-004", pair: "BTC/USDT", side: "Short", type: "Stop", price: 66000, amount: 0.02, filled: 0, status: "Pending", time: "2 hours ago" },
  { id: "FUT-005", pair: "BNB/USDT", side: "Long", type: "Limit", price: 590, amount: 1.0, filled: 1.0, status: "Filled", time: "3 hours ago" },
];

const statusColors = {
  Filled: "bg-green-500/10 text-green-500",
  Partial: "bg-yellow-500/10 text-yellow-400",
  Open: "bg-blue-500/10 text-blue-400",
  Pending: "bg-purple-500/10 text-purple-400",
  Cancelled: "bg-red-500/10 text-red-500",
};

export default function FuturesOrdersPage() {
  const [filter, setFilter] = useState("all");

  const filtered = orders.filter((o) =>
    filter === "all" ? true : o.status.toLowerCase() === filter
  );

  return (
    <div className="min-h-screen bg-black p-4">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <Link href="/futures" className="text-gray-400 hover:text-white text-sm">← Back to Futures</Link>
            <h1 className="text-2xl font-bold text-white mt-1">📋 Order History</h1>
            <p className="text-sm text-gray-500">View all your futures orders</p>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-2">
          {["all", "open", "filled", "partial", "pending", "cancelled"].map((status) => (
            <button
              key={status}
              onClick={() => setFilter(status)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                filter === status
                  ? "bg-yellow-500/20 text-yellow-400 border border-yellow-500/50"
                  : "bg-[#2b2d33] text-gray-400 hover:text-white"
              }`}
            >
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </button>
          ))}
        </div>

        {/* Orders Table */}
        <div className="bg-[#1a1a1a] rounded-xl border border-[#2b2d33] overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-black/30">
                <tr>
                  <th className="px-4 py-3 text-left text-xs text-gray-500">Order ID</th>
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
                {filtered.length === 0 ? (
                  <tr>
                    <td colSpan={9} className="px-4 py-8 text-center text-gray-500">
                      No orders found
                    </td>
                  </tr>
                ) : (
                  filtered.map((order) => (
                    <tr key={order.id} className="hover:bg-[#2b2d33]/50 transition-colors">
                      <td className="px-4 py-3 text-white text-sm font-mono">{order.id}</td>
                      <td className="px-4 py-3 text-white text-sm">{order.pair}</td>
                      <td className="px-4 py-3">
                        <span className={`text-xs px-2 py-1 rounded ${order.side === "Long" ? "bg-green-500/10 text-green-500" : "bg-red-500/10 text-red-500"}`}>
                          {order.side}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-white text-sm">{order.type}</td>
                      <td className="px-4 py-3 text-right text-white text-sm">${order.price.toFixed(2)}</td>
                      <td className="px-4 py-3 text-right text-white text-sm">{order.amount}</td>
                      <td className="px-4 py-3 text-right text-gray-300 text-sm">{order.filled}</td>
                      <td className="px-4 py-3">
                        <span className={`text-xs px-2 py-1 rounded ${statusColors[order.status as keyof typeof statusColors]}`}>
                          {order.status}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-right text-gray-400 text-sm">{order.time}</td>
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
