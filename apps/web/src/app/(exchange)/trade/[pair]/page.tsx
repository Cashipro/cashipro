"use client";

import { useState } from "react";
import { useParams } from "next/navigation";

// ===== COMPONENTS =====

function MarketInfo() {
  return (
    <div className="glass rounded-xl p-4 fade-in">
      <div className="flex flex-wrap items-center justify-between gap-4">
        {/* Pair */}
        <div className="flex items-center gap-3">
          <div className="flex -space-x-2">
            <div className="w-10 h-10 rounded-full bg-yellow-500 flex items-center justify-center text-xs font-bold text-black">BTC</div>
            <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-xs font-bold text-white">USDT</div>
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">BTC/USDT</h2>
            <span className="text-xs text-gray-400">Spot</span>
          </div>
        </div>

        {/* Price */}
        <div className="flex items-center gap-6 flex-wrap">
          <div>
            <p className="text-xs text-gray-400">Price</p>
            <p className="text-3xl font-bold text-white">$65,432.50</p>
          </div>
          <div>
            <p className="text-xs text-gray-400">24h Change</p>
            <p className="text-xl font-bold text-buy">+2.45%</p>
          </div>
          <div>
            <p className="text-xs text-gray-400">24h Volume</p>
            <p className="text-lg font-bold text-white">$1,254,321,450</p>
          </div>
          <div>
            <p className="text-xs text-gray-400">High / Low</p>
            <p className="text-sm">
              <span className="text-buy">$66,200</span>
              <span className="text-gray-400 mx-1">/</span>
              <span className="text-sell">$64,100</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function ChartPlaceholder() {
  return (
    <div className="glass rounded-xl p-4 h-[420px] flex items-center justify-center">
      <div className="text-center">
        <div className="text-5xl mb-4">📊</div>
        <p className="text-gray-400 font-medium">Trading Chart</p>
        <p className="text-xs text-gray-500 mt-2">TradingView integration coming soon</p>
      </div>
    </div>
  );
}

function OrderBook() {
  const bids = [
    { price: 65430, amount: 0.5, total: 32715 },
    { price: 65425, amount: 0.8, total: 52340 },
    { price: 65420, amount: 1.2, total: 78504 },
    { price: 65415, amount: 0.6, total: 39249 },
    { price: 65410, amount: 0.9, total: 58869 },
    { price: 65405, amount: 1.5, total: 98107 },
    { price: 65400, amount: 0.7, total: 45780 },
    { price: 65395, amount: 2.0, total: 130790 },
    { price: 65390, amount: 1.1, total: 71929 },
    { price: 65385, amount: 0.4, total: 26154 },
  ];

  const asks = [
    { price: 65435, amount: 0.4, total: 26174 },
    { price: 65440, amount: 0.7, total: 45808 },
    { price: 65445, amount: 1.0, total: 65445 },
    { price: 65450, amount: 0.5, total: 32725 },
    { price: 65455, amount: 0.8, total: 52364 },
    { price: 65460, amount: 1.3, total: 85098 },
    { price: 65465, amount: 0.6, total: 39279 },
    { price: 65470, amount: 2.1, total: 137487 },
    { price: 65475, amount: 0.9, total: 58927 },
    { price: 65480, amount: 1.4, total: 91672 },
  ];

  return (
    <div className="glass rounded-xl p-4 h-[420px] flex flex-col">
      <div className="flex justify-between text-xs text-gray-400 mb-2">
        <span>Price (USDT)</span>
        <span>Amount</span>
        <span>Total</span>
      </div>

      {/* Asks - Red */}
      <div className="flex-1 overflow-y-auto">
        {asks.map((ask, i) => (
          <div key={`ask-${i}`} className="grid grid-cols-3 text-xs py-0.5 card-hover rounded px-1">
            <span className="text-sell font-medium">{ask.price.toFixed(2)}</span>
            <span className="text-right text-gray-300">{ask.amount.toFixed(4)}</span>
            <span className="text-right text-gray-400">{ask.total.toFixed(2)}</span>
          </div>
        ))}
      </div>

      {/* Current Price */}
      <div className="text-center py-2 border-y border-[#2b2d33] my-1">
        <span className="text-xl font-bold text-white">65,432.50</span>
        <span className="text-xs text-gray-400 ml-2">≈ $65,432.50</span>
      </div>

      {/* Bids - Green */}
      <div className="flex-1 overflow-y-auto">
        {bids.map((bid, i) => (
          <div key={`bid-${i}`} className="grid grid-cols-3 text-xs py-0.5 card-hover rounded px-1">
            <span className="text-buy font-medium">{bid.price.toFixed(2)}</span>
            <span className="text-right text-gray-300">{bid.amount.toFixed(4)}</span>
            <span className="text-right text-gray-400">{bid.total.toFixed(2)}</span>
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
  const [orderType, setOrderType] = useState<"limit" | "market">("limit");

  const total = (Number(price) * Number(amount)) || 0;

  return (
    <div className="glass rounded-xl p-4">
      {/* Order Type */}
      <div className="flex gap-1 mb-3">
        <button
          onClick={() => setOrderType("limit")}
          className={`flex-1 py-1.5 text-xs rounded ${
            orderType === "limit" ? "bg-[#2b2d33] text-white" : "text-gray-400"
          }`}
        >
          Limit
        </button>
        <button
          onClick={() => setOrderType("market")}
          className={`flex-1 py-1.5 text-xs rounded ${
            orderType === "market" ? "bg-[#2b2d33] text-white" : "text-gray-400"
          }`}
        >
          Market
        </button>
      </div>

      {/* Buy/Sell */}
      <div className="flex gap-1 mb-3">
        <button
          onClick={() => setSide("buy")}
          className={`flex-1 py-2 rounded text-sm font-semibold ${
            side === "buy" ? "bg-buy text-white" : "bg-[#2b2d33] text-gray-400 hover:bg-[#3b3d43]"
          }`}
        >
          Buy
        </button>
        <button
          onClick={() => setSide("sell")}
          className={`flex-1 py-2 rounded text-sm font-semibold ${
            side === "sell" ? "bg-sell text-white" : "bg-[#2b2d33] text-gray-400 hover:bg-[#3b3d43]"
          }`}
        >
          Sell
        </button>
      </div>

      {/* Price */}
      <div className="mb-2">
        <label className="text-xs text-gray-400">Price (USDT)</label>
        <input
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          placeholder="0.00"
          className="w-full bg-[#2b2d33] text-white rounded-lg px-3 py-2 text-sm outline-none focus:ring-1 focus:ring-blue-500 border border-transparent focus:border-blue-500"
        />
      </div>

      {/* Amount */}
      <div className="mb-2">
        <label className="text-xs text-gray-400">Amount</label>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="0.00"
          className="w-full bg-[#2b2d33] text-white rounded-lg px-3 py-2 text-sm outline-none focus:ring-1 focus:ring-blue-500 border border-transparent focus:border-blue-500"
        />
      </div>

      {/* Total */}
      <div className="flex justify-between py-2 border-t border-[#2b2d33]">
        <span className="text-xs text-gray-400">Total</span>
        <span className="text-sm font-bold text-white">${total.toFixed(2)}</span>
      </div>

      {/* Submit */}
      <button
        className={`w-full py-3 rounded-lg text-white font-bold text-sm transition ${
          side === "buy" ? "bg-buy hover:bg-[#0cb373]" : "bg-sell hover:bg-[#d63a4f]"
        }`}
      >
        {side === "buy" ? "Buy BTC" : "Sell BTC"}
      </button>

      {/* Quick % */}
      <div className="flex gap-1 mt-3">
        {[25, 50, 75, 100].map((p) => (
          <button
            key={p}
            className="flex-1 py-1 text-xs bg-[#2b2d33] text-gray-400 rounded hover:bg-[#3b3d43] transition"
          >
            {p}%
          </button>
        ))}
      </div>

      {/* Balance */}
      <div className="flex justify-between text-xs text-gray-400 mt-3 pt-2 border-t border-[#2b2d33]">
        <span>Available: 0.00 BTC</span>
        <span>≈ $0.00</span>
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
    { price: 65438, amount: 0.07, time: "12:32:20", side: "sell" },
    { price: 65440, amount: 0.10, time: "12:32:15", side: "buy" },
    { price: 65422, amount: 0.04, time: "12:32:10", side: "sell" },
    { price: 65445, amount: 0.09, time: "12:32:05", side: "buy" },
    { price: 65433, amount: 0.06, time: "12:32:00", side: "sell" },
  ];

  return (
    <div className="glass rounded-xl p-4 h-[200px] overflow-y-auto">
      <div className="flex justify-between text-xs text-gray-400 mb-2 sticky top-0 bg-[#1e1f24] pb-1">
        <span>Price</span>
        <span>Amount</span>
        <span>Time</span>
      </div>
      {trades.map((trade, i) => (
        <div key={i} className="grid grid-cols-3 text-xs py-0.5 card-hover rounded px-1">
          <span className={trade.side === "buy" ? "text-buy font-medium" : "text-sell font-medium"}>
            {trade.price.toFixed(2)}
          </span>
          <span className="text-right text-gray-300">{trade.amount.toFixed(4)}</span>
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

  return (
    <div className="min-h-screen bg-[#0a0b0e] p-4">
      <div className="max-w-7xl mx-auto space-y-4">
        {/* Market Info */}
        <MarketInfo />

        {/* Main Grid */}
        <div className="grid grid-cols-12 gap-4">
          {/* Chart */}
          <div className="col-span-12 lg:col-span-8">
            <ChartPlaceholder />
          </div>

          {/* Order Book */}
          <div className="col-span-12 lg:col-span-4">
            <OrderBook />
          </div>

          {/* Recent Trades */}
          <div className="col-span-12 lg:col-span-8">
            <RecentTrades />
          </div>

          {/* Trade Form */}
          <div className="col-span-12 lg:col-span-4">
            <TradeForm />
          </div>
        </div>
      </div>
    </div>
  );
}
