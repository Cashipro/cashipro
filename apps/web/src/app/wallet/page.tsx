"use client";

import { useState } from "react";
import Link from "next/link";

// ===== MOCK DATA =====
const assets = [
  { symbol: "BTC", name: "Bitcoin", balance: 0.0523, available: 0.0482, inOrder: 0.0041, value: 3250, change: 2.45, icon: "₿" },
  { symbol: "ETH", name: "Ethereum", balance: 2.456, available: 2.356, inOrder: 0.1, value: 6250, change: -1.23, icon: "⟠" },
  { symbol: "USDT", name: "Tether", balance: 3043.75, available: 3043.75, inOrder: 0, value: 3043.75, change: 0.01, icon: "₮" },
  { symbol: "BNB", name: "BNB", balance: 5.21, available: 5.01, inOrder: 0.2, value: 1560, change: 5.67, icon: "🔶" },
  { symbol: "SOL", name: "Solana", balance: 12.45, available: 12.45, inOrder: 0, value: 1780, change: 8.12, icon: "◎" },
  { symbol: "XRP", name: "Ripple", balance: 245.67, available: 245.67, inOrder: 0, value: 152.31, change: -2.01, icon: "✕" },
];

const transactions = [
  { type: "Deposit", asset: "BTC", amount: "+0.05", status: "Completed", time: "2 min ago" },
  { type: "Withdraw", asset: "USDT", amount: "-500", status: "Pending", time: "15 min ago" },
  { type: "Trade", asset: "ETH", amount: "-0.50", status: "Completed", time: "1 hour ago" },
  { type: "Deposit", asset: "USDT", amount: "+1000", status: "Completed", time: "2 hours ago" },
  { type: "Trade", asset: "BNB", amount: "+2.0", status: "Completed", time: "3 hours ago" },
  { type: "Withdraw", asset: "XRP", amount: "-100", status: "Completed", time: "5 hours ago" },
];

export default function WalletPage() {
  const [activeTab, setActiveTab] = useState<"assets" | "transactions" | "deposit" | "withdraw">("assets");
  const [search, setSearch] = useState("");
  const totalBalance = assets.reduce((sum, a) => sum + a.value, 0);

  const filteredAssets = assets.filter((a) =>
    a.symbol.toLowerCase().includes(search.toLowerCase()) ||
    a.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-black p-4">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* ===== Header ===== */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-white">Wallet</h1>
            <p className="text-sm text-gray-500 mt-1">Manage your assets and transactions</p>
          </div>
          <div className="flex gap-3">
            <Link href="/deposit">
              <button className="px-5 py-2.5 bg-yellow-500 text-black font-bold rounded-xl hover:bg-yellow-400 transition-all text-sm">
                + Deposit
              </button>
            </Link>
            <Link href="/withdraw">
              <button className="px-5 py-2.5 bg-[#2b2d33] text-white font-bold rounded-xl hover:bg-[#3b3d43] transition-all text-sm">
                Withdraw
              </button>
            </Link>
          </div>
        </div>

        {/* ===== Balance Cards ===== */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-[#1a1a1a] p-5 rounded-xl border border-[#2b2d33]">
            <p className="text-sm text-gray-500">Total Balance</p>
            <p className="text-2xl font-bold text-white mt-1">
              ${totalBalance.toLocaleString("en-US", { minimumFractionDigits: 2 })}
            </p>
            <p className="text-xs text-green-500 mt-1">+2.5% this month</p>
          </div>
          <div className="bg-[#1a1a1a] p-5 rounded-xl border border-[#2b2d33]">
            <p className="text-sm text-gray-500">Available</p>
            <p className="text-2xl font-bold text-white mt-1">
              ${(totalBalance - 0.5).toLocaleString("en-US", { minimumFractionDigits: 2 })}
            </p>
          </div>
          <div className="bg-[#1a1a1a] p-5 rounded-xl border border-[#2b2d33]">
            <p className="text-sm text-gray-500">In Order</p>
            <p className="text-2xl font-bold text-yellow-400 mt-1">$0.50</p>
          </div>
          <div className="bg-[#1a1a1a] p-5 rounded-xl border border-[#2b2d33]">
            <p className="text-sm text-gray-500">24h Volume</p>
            <p className="text-2xl font-bold text-white mt-1">$3,245.80</p>
          </div>
        </div>

        {/* ===== Tabs ===== */}
        <div className="flex gap-1 bg-[#1a1a1a] rounded-xl p-1 border border-[#2b2d33]">
          {(["assets", "transactions", "deposit", "withdraw"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-2 rounded-lg text-sm font-medium capitalize transition ${
                activeTab === tab
                  ? "bg-yellow-500/20 text-yellow-400"
                  : "text-gray-400 hover:text-white hover:bg-[#2b2d33]"
              }`}
            >
              {tab === "assets" && "💰 Assets"}
              {tab === "transactions" && "📊 Transactions"}
              {tab === "deposit" && "📥 Deposit"}
              {tab === "withdraw" && "📤 Withdraw"}
            </button>
          ))}
        </div>

        {/* ===== TAB CONTENT ===== */}

        {/* Assets Tab */}
        {activeTab === "assets" && (
          <div className="bg-[#1a1a1a] rounded-xl border border-[#2b2d33] overflow-hidden">
            <div className="p-4 border-b border-[#2b2d33]">
              <input
                type="text"
                placeholder="Search assets..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full max-w-sm bg-black border border-[#2b2d33] rounded-lg px-4 py-2 text-white text-sm placeholder-gray-500 focus:outline-none focus:border-yellow-400 transition"
              />
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-black/30">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs text-gray-500 font-medium">Asset</th>
                    <th className="px-4 py-3 text-right text-xs text-gray-500 font-medium">Balance</th>
                    <th className="px-4 py-3 text-right text-xs text-gray-500 font-medium">Available</th>
                    <th className="px-4 py-3 text-right text-xs text-gray-500 font-medium">In Order</th>
                    <th className="px-4 py-3 text-right text-xs text-gray-500 font-medium">Value (USD)</th>
                    <th className="px-4 py-3 text-right text-xs text-gray-500 font-medium">24h Change</th>
                    <th className="px-4 py-3 text-right text-xs text-gray-500 font-medium">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#2b2d33]">
                  {filteredAssets.map((asset) => (
                    <tr key={asset.symbol} className="hover:bg-[#2b2d33]/50 transition-colors">
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-full bg-[#2b2d33] flex items-center justify-center text-lg">
                            {asset.icon}
                          </div>
                          <div>
                            <p className="text-white font-medium text-sm">{asset.symbol}</p>
                            <p className="text-xs text-gray-500">{asset.name}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-right text-white text-sm">
                        {asset.balance.toFixed(4)}
                      </td>
                      <td className="px-4 py-3 text-right text-gray-300 text-sm">
                        {asset.available.toFixed(4)}
                      </td>
                      <td className="px-4 py-3 text-right text-yellow-400 text-sm">
                        {asset.inOrder.toFixed(4)}
                      </td>
                      <td className="px-4 py-3 text-right text-white text-sm font-medium">
                        ${asset.value.toFixed(2)}
                      </td>
                      <td className="px-4 py-3 text-right">
                        <span className={`text-sm font-bold ${asset.change >= 0 ? "text-green-500" : "text-red-500"}`}>
                          {asset.change >= 0 ? "+" : ""}{asset.change}%
                        </span>
                      </td>
                      <td className="px-4 py-3 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Link href={`/trade/${asset.symbol}USDT`}>
                            <button className="px-3 py-1 bg-yellow-500/10 text-yellow-400 text-xs rounded hover:bg-yellow-500/20 transition">
                              Trade
                            </button>
                          </Link>
                          <Link href={`/withdraw?asset=${asset.symbol}`}>
                            <button className="px-3 py-1 bg-[#2b2d33] text-gray-400 text-xs rounded hover:bg-[#3b3d43] transition">
                              Withdraw
                            </button>
                          </Link>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Transactions Tab */}
        {activeTab === "transactions" && (
          <div className="bg-[#1a1a1a] rounded-xl border border-[#2b2d33] overflow-hidden">
            <div className="p-4 border-b border-[#2b2d33]">
              <h3 className="text-white font-bold">Recent Transactions</h3>
            </div>
            <div className="divide-y divide-[#2b2d33]">
              {transactions.map((tx, i) => (
                <div key={i} className="flex items-center justify-between p-4 hover:bg-[#2b2d33]/50 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center text-lg ${
                      tx.type === "Deposit" ? "bg-green-500/20 text-green-500" :
                      tx.type === "Withdraw" ? "bg-red-500/20 text-red-500" :
                      "bg-blue-500/20 text-blue-500"
                    }`}>
                      {tx.type === "Deposit" ? "📥" : tx.type === "Withdraw" ? "📤" : "🔄"}
                    </div>
                    <div>
                      <p className="text-white font-medium text-sm">{tx.type}</p>
                      <p className="text-xs text-gray-500">{tx.asset} • {tx.time}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className={`text-sm font-bold ${
                      tx.amount.startsWith("+") ? "text-green-500" : "text-red-500"
                    }`}>
                      {tx.amount}
                    </span>
                    <span className={`text-xs px-2 py-1 rounded ${
                      tx.status === "Completed" ? "bg-green-500/10 text-green-500" :
                      "bg-yellow-500/10 text-yellow-400"
                    }`}>
                      {tx.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Deposit Tab */}
        {activeTab === "deposit" && (
          <div className="bg-[#1a1a1a] rounded-xl border border-[#2b2d33] p-6">
            <h3 className="text-white font-bold text-lg mb-4">💰 Deposit Crypto</h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
              {["BTC", "ETH", "USDT", "BNB", "SOL", "XRP", "ADA", "DOGE"].map((asset) => (
                <button key={asset} className="p-3 bg-[#2b2d33] rounded-lg hover:bg-[#3b3d43] transition text-center">
                  <span className="text-xl block">{asset === "BTC" ? "₿" : asset === "ETH" ? "⟠" : asset === "USDT" ? "₮" : asset === "BNB" ? "🔶" : "🪙"}</span>
                  <span className="text-xs text-white">{asset}</span>
                </button>
              ))}
            </div>
            <div className="bg-black/50 rounded-xl p-6 text-center border border-[#2b2d33]">
              <p className="text-gray-400">Select an asset above to see deposit address</p>
            </div>
          </div>
        )}

        {/* Withdraw Tab */}
        {activeTab === "withdraw" && (
          <div className="bg-[#1a1a1a] rounded-xl border border-[#2b2d33] p-6">
            <h3 className="text-white font-bold text-lg mb-4">📤 Withdraw Crypto</h3>
            <div className="space-y-4 max-w-md">
              <div>
                <label className="text-sm text-gray-400 block mb-1.5">Asset</label>
                <select className="w-full bg-black border border-[#2b2d33] rounded-xl px-4 py-3 text-white focus:outline-none focus:border-yellow-400 transition">
                  <option>BTC - Bitcoin</option>
                  <option>ETH - Ethereum</option>
                  <option>USDT - Tether</option>
                  <option>BNB - BNB</option>
                </select>
              </div>
              <div>
                <label className="text-sm text-gray-400 block mb-1.5">Withdrawal Address</label>
                <input
                  type="text"
                  placeholder="Enter wallet address"
                  className="w-full bg-black border border-[#2b2d33] rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-yellow-400 transition"
                />
              </div>
              <div>
                <label className="text-sm text-gray-400 block mb-1.5">Amount</label>
                <input
                  type="number"
                  placeholder="0.00"
                  className="w-full bg-black border border-[#2b2d33] rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-yellow-400 transition"
                />
              </div>
              <div className="flex gap-2">
                {[25, 50, 75, 100].map((p) => (
                  <button key={p} className="flex-1 py-2 bg-[#2b2d33] text-gray-400 text-sm rounded hover:bg-[#3b3d43] transition">
                    {p}%
                  </button>
                ))}
              </div>
              <button className="w-full py-3 bg-yellow-500 text-black font-bold rounded-xl hover:bg-yellow-400 transition-all">
                Withdraw
              </button>
              <p className="text-xs text-gray-500 text-center">Withdrawals may take 5-30 minutes to process</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
