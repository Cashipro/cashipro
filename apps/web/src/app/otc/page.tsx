"use client";

import { useState } from "react";
import Link from "next/link";

// ===== MOCK DATA =====
const otcPairs = [
  { symbol: "BTC/USDT", price: 65432, change: 2.45, volume: "1.2B", minTrade: "1 BTC", spread: "0.15%" },
  { symbol: "ETH/USDT", price: 3456, change: -1.23, volume: "850M", minTrade: "10 ETH", spread: "0.12%" },
  { symbol: "BNB/USDT", price: 598, change: 5.67, volume: "450M", minTrade: "50 BNB", spread: "0.10%" },
  { symbol: "SOL/USDT", price: 178, change: 8.12, volume: "320M", minTrade: "100 SOL", spread: "0.18%" },
  { symbol: "XRP/USDT", price: 0.62, change: -2.01, volume: "280M", minTrade: "10,000 XRP", spread: "0.08%" },
];

const recentTrades = [
  { pair: "BTC/USDT", amount: "2.5 BTC", price: 65400, time: "5 min ago", status: "Completed" },
  { pair: "ETH/USDT", amount: "50 ETH", price: 3450, time: "15 min ago", status: "Completed" },
  { pair: "BNB/USDT", amount: "200 BNB", price: 595, time: "1 hour ago", status: "Pending" },
  { pair: "SOL/USDT", amount: "500 SOL", price: 176, time: "2 hours ago", status: "Completed" },
];

export default function OTCPage() {
  const [selectedPair, setSelectedPair] = useState("BTC/USDT");
  const [side, setSide] = useState<"buy" | "sell">("buy");
  const [amount, setAmount] = useState("");
  const [quote, setQuote] = useState<{ price: number; total: number } | null>(null);

  const currentPair = otcPairs.find((p) => p.symbol === selectedPair);

  const handleGetQuote = () => {
    if (!amount || !currentPair) return;
    const price = currentPair.price * (side === "buy" ? 1.001 : 0.999);
    setQuote({
      price: +price.toFixed(2),
      total: +(Number(amount) * price).toFixed(2),
    });
  };

  return (
    <div className="min-h-screen bg-black p-4">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-white">🏛️ OTC Trading</h1>
            <p className="text-sm text-gray-500 mt-1">Large volume trades with minimal slippage</p>
          </div>
          <div className="flex gap-2">
            <span className="px-4 py-2 bg-yellow-500/10 text-yellow-400 rounded-lg text-sm">
              Min Trade: $10,000+
            </span>
            <span className="px-4 py-2 bg-green-500/10 text-green-500 rounded-lg text-sm">
              Zero Fees
            </span>
          </div>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Pair Selection + Order Book */}
          <div className="lg:col-span-1 space-y-4">
            {/* Pair Selection */}
            <div className="bg-[#1a1a1a] rounded-xl border border-[#2b2d33] p-4">
              <h3 className="text-white font-bold mb-3">Trading Pairs</h3>
              <div className="space-y-2">
                {otcPairs.map((pair) => (
                  <button
                    key={pair.symbol}
                    onClick={() => setSelectedPair(pair.symbol)}
                    className={`w-full flex items-center justify-between p-3 rounded-lg transition ${
                      selectedPair === pair.symbol
                        ? "bg-yellow-500/20 border border-yellow-500/50"
                        : "hover:bg-[#2b2d33]"
                    }`}
                  >
                    <span className="text-white font-medium">{pair.symbol}</span>
                    <span className="text-sm text-gray-400">{pair.minTrade}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Order Book */}
            <div className="bg-[#1a1a1a] rounded-xl border border-[#2b2d33] p-4">
              <h3 className="text-white font-bold mb-3">Order Book</h3>
              <div className="space-y-1 text-sm">
                <div className="flex justify-between text-xs text-gray-500">
                  <span>Price</span>
                  <span>Amount</span>
                </div>
                <div className="space-y-0.5">
                  <div className="flex justify-between text-red-500">65,450 <span>0.5 BTC</span></div>
                  <div className="flex justify-between text-red-500">65,440 <span>0.8 BTC</span></div>
                  <div className="flex justify-between text-red-500">65,430 <span>1.2 BTC</span></div>
                  <div className="flex justify-between text-yellow-400 font-bold border-y border-[#2b2d33] py-1 my-1">
                    {selectedPair} <span>65,432.50</span>
                  </div>
                  <div className="flex justify-between text-green-500">65,420 <span>0.6 BTC</span></div>
                  <div className="flex justify-between text-green-500">65,410 <span>0.9 BTC</span></div>
                  <div className="flex justify-between text-green-500">65,400 <span>1.5 BTC</span></div>
                </div>
              </div>
            </div>
          </div>

          {/* Trade Form */}
          <div className="lg:col-span-2">
            <div className="bg-[#1a1a1a] rounded-xl border border-[#2b2d33] p-6">
              {/* Pair Info */}
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-[#2b2d33]">
                <div>
                  <h2 className="text-xl font-bold text-white">{selectedPair}</h2>
                  <p className="text-sm text-gray-500">Min Trade: {currentPair?.minTrade}</p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-white">${currentPair?.price.toLocaleString()}</p>
                  <p className={`text-sm font-bold ${currentPair && currentPair.change >= 0 ? "text-green-500" : "text-red-500"}`}>
                    {currentPair && (currentPair.change >= 0 ? "+" : "")}{currentPair?.change}%
                  </p>
                </div>
              </div>

              {/* Buy/Sell */}
              <div className="flex gap-2 mb-4">
                <button
                  onClick={() => setSide("buy")}
                  className={`flex-1 py-3 rounded-lg text-sm font-bold transition ${
                    side === "buy" ? "bg-green-500 text-white" : "bg-[#2b2d33] text-gray-400"
                  }`}
                >
                  Buy
                </button>
                <button
                  onClick={() => setSide("sell")}
                  className={`flex-1 py-3 rounded-lg text-sm font-bold transition ${
                    side === "sell" ? "bg-red-500 text-white" : "bg-[#2b2d33] text-gray-400"
                  }`}
                >
                  Sell
                </button>
              </div>

              {/* Amount */}
              <div className="mb-4">
                <label className="text-sm text-gray-400 block mb-1.5">
                  Amount ({selectedPair.split("/")[0]})
                </label>
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
                      onClick={() => setAmount((500 * p / 100).toString())}
                      className="flex-1 py-1.5 bg-[#2b2d33] text-gray-400 text-xs rounded hover:bg-[#3b3d43] transition"
                    >
                      {p}%
                    </button>
                  ))}
                </div>
              </div>

              {/* Get Quote */}
              <button
                onClick={handleGetQuote}
                disabled={!amount}
                className={`w-full py-3 rounded-xl font-bold transition mb-4 ${
                  amount
                    ? "bg-yellow-500 text-black hover:bg-yellow-400"
                    : "bg-[#2b2d33] text-gray-500 cursor-not-allowed"
                }`}
              >
                Get Quote
              </button>

              {/* Quote Display */}
              {quote && (
                <div className="bg-black/50 rounded-xl p-4 space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Price</span>
                    <span className="text-white">${quote.price.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Total</span>
                    <span className="text-yellow-400 font-bold">${quote.total.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Spread</span>
                    <span className="text-gray-400">{currentPair?.spread || "0.15%"}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Estimated Fee</span>
                    <span className="text-green-500">$0.00</span>
                  </div>
                  <button className="w-full mt-3 py-3 bg-yellow-500 text-black font-bold rounded-xl hover:bg-yellow-400 transition">
                    Confirm {side === "buy" ? "Buy" : "Sell"} Order
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Recent Trades */}
        <div className="bg-[#1a1a1a] rounded-xl border border-[#2b2d33] p-4">
          <h3 className="text-white font-bold mb-4">📊 Recent OTC Trades</h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-black/30">
                <tr>
                  <th className="px-4 py-2 text-left text-xs text-gray-500">Pair</th>
                  <th className="px-4 py-2 text-right text-xs text-gray-500">Amount</th>
                  <th className="px-4 py-2 text-right text-xs text-gray-500">Price</th>
                  <th className="px-4 py-2 text-right text-xs text-gray-500">Time</th>
                  <th className="px-4 py-2 text-right text-xs text-gray-500">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#2b2d33]">
                {recentTrades.map((trade, i) => (
                  <tr key={i} className="hover:bg-[#2b2d33]/50 transition-colors">
                    <td className="px-4 py-3 text-white text-sm">{trade.pair}</td>
                    <td className="px-4 py-3 text-right text-white text-sm">{trade.amount}</td>
                    <td className="px-4 py-3 text-right text-white text-sm">${trade.price.toLocaleString()}</td>
                    <td className="px-4 py-3 text-right text-gray-400 text-sm">{trade.time}</td>
                    <td className="px-4 py-3 text-right">
                      <span className={`text-xs px-2 py-1 rounded ${
                        trade.status === "Completed" ? "bg-green-500/10 text-green-500" : "bg-yellow-500/10 text-yellow-400"
                      }`}>
                        {trade.status}
                      </span>
                    </td>
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
