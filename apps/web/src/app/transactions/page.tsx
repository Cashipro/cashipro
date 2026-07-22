"use client";

import { useState } from "react";

const transactions = [
  { id: 1, type: "Deposit", asset: "BTC", amount: "+0.05", status: "Completed", time: "2 min ago", fee: "0.0005" },
  { id: 2, type: "Withdraw", asset: "USDT", amount: "-500", status: "Pending", time: "15 min ago", fee: "0.5" },
  { id: 3, type: "Trade", asset: "ETH", amount: "-0.50", status: "Completed", time: "1 hour ago", fee: "0.001" },
  { id: 4, type: "Deposit", asset: "USDT", amount: "+1000", status: "Completed", time: "2 hours ago", fee: "0" },
  { id: 5, type: "Trade", asset: "BNB", amount: "+2.0", status: "Completed", time: "3 hours ago", fee: "0.002" },
  { id: 6, type: "Withdraw", asset: "XRP", amount: "-100", status: "Failed", time: "5 hours ago", fee: "0.1" },
  { id: 7, type: "Reward", asset: "USDT", amount: "+25", status: "Completed", time: "6 hours ago", fee: "0" },
];

export default function TransactionsPage() {
  const [filter, setFilter] = useState("all");

  const filtered = transactions.filter((t) =>
    filter === "all" ? true : t.type.toLowerCase() === filter
  );

  return (
    <div className="min-h-screen bg-black p-4">
      <div className="max-w-5xl mx-auto space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-white">📊 Transactions</h1>
          <p className="text-sm text-gray-500 mt-1">View all your transaction history</p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-2">
          {["all", "deposit", "withdraw", "trade", "reward"].map((type) => (
            <button
              key={type}
              onClick={() => setFilter(type)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                filter === type
                  ? "bg-yellow-500/20 text-yellow-400 border border-yellow-500/50"
                  : "bg-[#2b2d33] text-gray-400 hover:text-white"
              }`}
            >
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </button>
          ))}
        </div>

        {/* Transactions Table */}
        <div className="bg-[#1a1a1a] rounded-xl border border-[#2b2d33] overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-black/30">
                <tr>
                  <th className="px-4 py-3 text-left text-xs text-gray-500">Type</th>
                  <th className="px-4 py-3 text-right text-xs text-gray-500">Asset</th>
                  <th className="px-4 py-3 text-right text-xs text-gray-500">Amount</th>
                  <th className="px-4 py-3 text-right text-xs text-gray-500">Fee</th>
                  <th className="px-4 py-3 text-right text-xs text-gray-500">Status</th>
                  <th className="px-4 py-3 text-right text-xs text-gray-500">Time</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#2b2d33]">
                {filtered.map((tx) => (
                  <tr key={tx.id} className="hover:bg-[#2b2d33]/50 transition-colors">
                    <td className="px-4 py-3">
                      <span className={`text-xs px-2 py-1 rounded ${
                        tx.type === "Deposit" ? "bg-green-500/20 text-green-500" :
                        tx.type === "Withdraw" ? "bg-red-500/20 text-red-500" :
                        tx.type === "Trade" ? "bg-blue-500/20 text-blue-500" :
                        "bg-yellow-500/20 text-yellow-400"
                      }`}>
                        {tx.type}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right text-white">{tx.asset}</td>
                    <td className={`px-4 py-3 text-right font-bold ${
                      tx.amount.startsWith("+") ? "text-green-500" : "text-red-500"
                    }`}>
                      {tx.amount}
                    </td>
                    <td className="px-4 py-3 text-right text-gray-400">{tx.fee}</td>
                    <td className="px-4 py-3 text-right">
                      <span className={`text-xs px-2 py-1 rounded ${
                        tx.status === "Completed" ? "bg-green-500/10 text-green-500" :
                        tx.status === "Pending" ? "bg-yellow-500/10 text-yellow-400" :
                        "bg-red-500/10 text-red-500"
                      }`}>
                        {tx.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right text-gray-400 text-sm">{tx.time}</td>
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
