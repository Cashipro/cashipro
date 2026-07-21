"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";

// ===== COMPONENTS =====
function OrderBook({ bids, asks }: { bids: any[]; asks: any[] }) {
  return (
    <div className="bg-[#1e1f24] rounded-lg p-4 h-[400px] overflow-y-auto">
      <div className="text-xs text-gray-400 grid grid-cols-3 mb-2">
        <span>Price (USDT)</span>
        <span className="text-right">Amount</span>
        <span className="text-right">Total</span>
      </div>
      {/* Asks - Sell Orders (Red) */}
      <div>
        {asks?.slice(0, 10).map((ask, i) => (
          <div key={i} className="grid grid-cols-3 text-xs text-red-500 py-0.5">
            <span>{ask.price}</span>
            <span className="text-right">{ask.amount}</span>
            <span className="text-right text-gray-400">{ask.total}</span>
          </div>
        ))}
      </div>
      {/* Current Price */}
      <div className="text-center text-lg font-bold text-white py-2 border-y border-gray-700 my-1">
        65,432.50
      </div>
      {/* Bids - Buy Orders (Green) */}
      <div>
        {bids?.slice(0, 10).map((bid, i) => (
          <div key={i} className="grid grid-cols-3 text-xs text-green-500 py-0.5">
            <span>{bid.price}</span>
            <span className="text-right">{bid.amount}</span>
            <span className="text-right text-gray-400">{bid.total}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function TradeForm() {
  const [side, setSide] = useState<"buy" | "sell">("buy");
  const [price, setPrice] = useState("");
  const [amount, setAmount] = useState("");

  return (
    <div className="bg-[#1e1f24] rounded-lg p-4">
      {/* Buy/Sell Tabs */}
      <div className="flex gap-1 mb-4">
        <button
          onClick={() => setSide("buy")}
          className={`flex-1 py-2 rounded text-sm font-medium ${
            side === "buy" ? "bg-green-600 text-white" : "bg-gray-700 text-gray-400"
          }`}
        >
          Buy
        </button>
        <button
          onClick={() => setSide("sell")}
          className={`flex-1 py-2 rounded text-sm font-medium ${
            side === "sell" ? "bg-red-600 text-white" : "bg-gray-700 text-gray-400"
          }`}
        >
          Sell
        </button>
      </div>

      {/* Price */}
      <div className="mb-3">
        <label className="text-xs text-gray-400">Price (USDT)</label>
        <input
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          placeholder="0.00"
          className="w-full bg-[#2a2b30] text-white rounded px-3 py-2 text-sm outline-none focus:ring-1 focus:ring-blue-500"
        />
      </div>

      {/* Amount */}
      <div className="mb-3">
        <label className="text-xs text-gray-400">Amount</label>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="0.00"
          className="w-full bg-[#2a2b30] text-white rounded px-3 py-2 text-sm outline-none focus:ring-1 focus:ring-blue-500"
        />
      </div>

      {/* Total */}
      <div className="flex justify-between text-sm py-2 border-t border-gray-700">
        <span className="text-gray-400">Total</span>
        <span className="text-white font-medium">
          ${(Number(price) * Number(amount) || 0).toFixed(2)}
        </span>
      </div>

      {/* Submit */}
      <button
        className={`w-full py-3 rounded text-white font-medium mt-2 ${
          side === "buy" ? "bg-green-600 hover:bg-green-700" : "bg-red-600 hover:bg-red-700"
        }`}
      >
        {side === "buy" ? "Buy" : "Sell"} BTC
      </button>

      {/* Quick % buttons */}
      <div className="flex gap-1 mt-3">
        {[25, 50, 75, 100].map((p) => (
          <button
            key={p}
            className="flex-1 py-1 text-xs bg-gray-700 text-gray-400 rounded hover:bg-gray-600"
          >
            {p}%
          </button>
        ))}
      </div>
    </div>
  );
}

function MarketInfo() {
  return (
    <div className="bg-[#1e1f24] rounded-lg p-4">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h2 className="text-xl font-bold text-white">BTC/USDT</h2>
          <span className="text-xs text-gray-400">Spot</span>
        </div>
        <div className="flex gap-6">
          <div>
            <p className="text-xs text-gray-400">Price</p>
            <p className="text-2xl font-bold text-white">$65,432.50</p>
          </div>
          <div>
            <p className="text-xs text-gray-400">24h Change</p>
            <p className="text-lg font-bold text-green-500">+2.45%</p>
          </div>
          <div>
            <p className="text-xs text-gray-400">24h Volume</p>
            <p className="text-lg font-bold text-white">$1.25B</p>
          </div>
          <div>
            <p className="text-xs text-gray-400">High / Low</p>
            <p className="text-sm">
              <span className="text-green-500">66,200</span> /{" "}
              <span className="text-red-500">64,100</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function ChartPlaceholder() {
  return (
    <div className="bg-[#1e1f24] rounded-lg p-4 h-[400px] flex items-center justify-center">
      <div className="text-center">
        <p className="text-gray-400">📊 Trading Chart</p>
        <p className="text-xs text-gray-500 mt-2">TradingView integration coming soon</p>
      </div>
    </div>
  );
}

function RecentTrades() {
  const trades = [
    { price: 65432, amount: 0.05, time: "12:32:45", side: "buy" },
    { price: 65428, amount: 0.12, time: "12:32:40", side: "sell" },
    { price: 65430, amount: 0.08, time: "12:32:35", side: "buy" },
    { price: 65425, amount: 0.03, time: "12:32:30", side: "sell" },
    { price: 65435, amount: 0.15, time: "12:32:25", side: "buy" },
  ];

  return (
    <div className="bg-[#1e1f24] rounded-lg p-4 h-[200px] overflow-y-auto">
      <div className="text-xs text-gray-400 grid grid-cols-3 mb-2">
        <span>Price</span>
        <span className="text-right">Amount</span>
        <span className="text-right">Time</span>
      </div>
      {trades.map((trade, i) => (
        <div key={i} className="grid grid-cols-3 text-xs py-0.5">
          <span className={trade.side === "buy" ? "text-green-500" : "text-red-500"}>
            {trade.price.toFixed(2)}
          </span>
          <span className="text-right text-white">{trade.amount.toFixed(4)}</span>
          <span className="text-right text-gray-400">{trade.time}</span>
        </div>
      ))}
    </div>
  );
}

// ===== MAIN PAGE =====
export default function TradePage() {
  const params = useParams();
  const pair = params.pair as string;

  // Mock data
  const bids = [
    { price: 65430, amount: 0.5, total: 32715 },
    { price: 65425, amount: 0.8, total: 52340 },
    { price: 65420, amount: 1.2, total: 78504 },
    { price: 65415, amount: 0.6, total: 39249 },
    { price: 65410, amount: 0.9, total: 58869 },
  ];

  const asks = [
    { price: 65435, amount: 0.4, total: 26174 },
    { price: 65440, amount: 0.7, total: 45808 },
    { price: 65445, amount: 1.0, total: 65445 },
    { price: 65450, amount: 0.5, total: 32725 },
    { price: 65455, amount: 0.8, total: 52364 },
  ];

  return (
    <div className="min-h-screen bg-[#0a0b0e] p-4">
      <div className="max-w-7xl mx-auto space-y-4">
        {/* Market Info */}
        <MarketInfo />

        {/* Main Grid */}
        <div className="grid grid-cols-12 gap-4">
          {/* Chart - 8 columns */}
          <div className="col-span-8">
            <ChartPlaceholder />
          </div>

          {/* Order Book - 4 columns */}
          <div className="col-span-4">
            <OrderBook bids={bids} asks={asks} />
          </div>

          {/* Trade Form - 4 columns */}
          <div className="col-span-4">
            <TradeForm />
          </div>

          {/* Recent Trades - 8 columns */}
          <div className="col-span-8">
            <RecentTrades />
          </div>
        </div>
      </div>
    </div>
  );
}
