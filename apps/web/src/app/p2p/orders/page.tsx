"use client";

import { useState } from "react";
import Link from "next/link";

const orders = [
  { id: "P2P-001", pair: "USDT/PKR", type: "Buy", amount: "500 USDT", price: "285.50", status: "Completed", time: "2 hours ago" },
  { id: "P2P-002", pair: "USDT/PKR", type: "Sell", amount: "200 USDT", price: "284.75", status: "Pending", time: "1 hour ago" },
  { id: "P2P-003", pair: "BTC/PKR", type: "Buy", amount: "0.05 BTC", price: "18,500", status: "Active", time: "30 min ago" },
  { id: "P2P-004", pair: "USDT/PKR", type: "Buy", amount: "1000 USDT", price: "285.00", status: "Cancelled", time: "3 hours ago" },
  { id: "P2P-005", pair: "ETH/PKR", type: "Sell", amount: "0.5 ETH", price: "850", status: "Completed", time: "5 hours ago" },
];

const statusColors = {
  Completed: "bg-green-500/10 text-green-500",
  Pending: "bg-yellow-500/10 text-yellow-400",
  Active: "bg-blue-500/10 text-blue-400",
  Cancelled: "bg-red-500/10 text-red-500",
};

export default function P2POrdersPage() {
  const [filter, setFilter] = useState("all");

  const filtered = orders.filter((o) =>
    filter === "all" ? true : o.status.toLowerCase() === filter
  );

  return (
    <div className="min-h-screen bg-black p-4">
      <div className="max-w-5xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <Link href="/p2p" className="text-gray-400 hover:text-white text-sm">← Back to P2P</Link>
            <h1 className="text-2xl font-bold text-white mt-1">📋 My Orders</h1>
            <p className="text-sm text-gray-500">Track all your P2P orders</p>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-2">
          {["all", "active", "pending", "completed", "cancelled"].map((status) => (
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
                  <th className="px-4 py-3 text-left text-xs text-gray-500">Type</th>
                  <th className="px-4 py-3 text-right text-xs text-gray-500">Amount</th>
                  <th className="px-4 py-3 text-right text-xs text-gray-500">Price</th>
                  <th className="px-4 py-3 text-left text-xs text-gray-500">Status</th>
                  <th className="px-4 py-3 text-right text-xs text-gray-500">Time</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#2b2d33]">
                {filtered.map((order) => (
                  <tr key={order.id} className="hover:bg-[#2b2d33]/50 transition-colors">
                    <td className="px-4 py-3 text-white text-sm font-mono">{order.id}</td>
                    <td className="px-4 py-3 text-white text-sm">{order.pair}</td>
                    <td className="px-4 py-3">
                      <span className={`text-xs px-2 py-1 rounded ${
                        order.type === "Buy" ? "bg-green-500/10 text-green-500" : "bg-red-500/10 text-red-500"
                      }`}>
                        {order.type}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right text-white text-sm">{order.amount}</td>
                    <td className="px-4 py-3 text-right text-white text-sm">{order.price}</td>
                    <td className="px-4 py-3">
                      <span className={`text-xs px-2 py-1 rounded ${statusColors[order.status as keyof typeof statusColors]}`}>
                        {order.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right text-gray-400 text-sm">{order.time}</td>
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
