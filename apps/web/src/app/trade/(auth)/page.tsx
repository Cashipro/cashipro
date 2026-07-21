"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";

// ===== MOCK DATA =====
const generateOrders = (base: number, count: number, isBid: boolean) => {
  const orders = [];
  for (let i = 0; i < count; i++) {
    const price = isBid ? base - i * 5 : base + i * 5;
    const amount = +(Math.random() * 2 + 0.1).toFixed(4);
    orders.push({ price, amount, total: +(price * amount).toFixed(2) });
  }
  return orders;
};

const generateTrades = (count: number) => {
  const trades = [];
  for (let i = 0; i < count; i++) {
    const price = 65400 + Math.random() * 100;
    const amount = +(Math.random() * 2 + 0.01).toFixed(4);
    trades.push({
      price: +price.toFixed(2),
      amount,
      time: new Date(Date.now() - i * 30000).toLocaleTimeString(),
      side: Math.random() > 0.5 ? "buy" : "sell",
    });
  }
  return trades;
};

// ===== COMPONENTS =====

// 1. Market Info Bar
function MarketInfo({ pair }: { pair: string }) {
  const [base, quote] = pair.split("/");
  return (
    <div className="bg-[#1a1a1a] rounded-xl border border-[#2b2d33] p-4 flex flex-wrap items-center justify-between gap-4">
      <div className="flex items-center gap-3">
        <div className="flex -space-x-2">
          <div className="w-10 h-10 rounded-full bg-yellow-500 flex items-center justify-center text-xs font-bold text-black">
            {base.slice(0, 2)}
          </div>
          <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-xs font-bold text-white">
            {quote.slice(0, 2)}
          </div>
        </div>
        <div>
          <h2 className="text-xl font-bold text-white">{pair}</h2>
          <span className="text-xs text-gray-500">Spot</span>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-6">
        <div>
          <p className="text-xs text-gray-500">Price</p>
          <p className="text-2xl font-bold text-white">$65,432.50</p>
        </div>
        <div>
          <p className="text-xs text-gray-500">24h Change</p>
          <p className="text-xl font-bold text-green-500">+2.45%</p>
        </div>
        <div>
          <p className="text-xs text-gray-500">24h Volume</p>
          <p className="text-lg font-bold text-white">$1.25B</p>
        </div>
        <div>
          <p className="text-xs text-gray-500">High / Low</p>
          <p className="text-sm">
            <span className="text-green-500">$66,200</span>
            <span className="text-gray-500 mx-1">/</span>
            <span className="text-red-500">$64,100</span>
          </p>
        </div>
      </div>
    </div>
  );
}

// 2. Chart Placeholder
function ChartPlaceholder() {
  return (
    <div className="bg-[#1a1a1a] rounded-xl border border-[#2b2d33] p-4 h-[420px] flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <div className="flex gap-1">
          {["1m", "5m", "15m", "1h", "4h", "1d"].map((t) => (
            <button key={t} className={`px-3 py-1 text-xs rounded transition ${
              t === "15m" ? "bg-yellow-500/20 text-yellow-400" : "text-gray-500 hover:text-white"
            }`}>
              {t}
            </button>
          ))}
        </div>
        <div className="flex gap-2">
          <button className="text-xs text-gray-500 hover:text-white">📊</button>
          <button className="text-xs text-gray-500 hover:text-white">🔍</button>
        </div>
      </div>
      <div className="flex-1 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">📈</div>
          <p className="text-gray-400 font-medium">Chart Coming Soon</p>
          <p className="text-xs text-gray-500 mt-1">TradingView integration in progress</p>
        </div>
      </div>
    </div>
  );
}

// 3. Order Book
function OrderBook({ bids, asks }: { bids: any[]; asks: any[] }) {
  const [view, setView] = useState<"market" | "depth">("market");
  const maxTotal = Math.max(
    ...bids.map((b) => b.total),
    ...asks.map((a) => a.total)
  );

  return (
    <div className="bg-[#1a1a1a] rounded-xl border border-[#2b2d33] p-3 h-[420px] flex flex-col">
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-bold text-white">Order Book</span>
        <div className="flex gap-1">
          <button
            onClick={() => setView("market")}
            className={`px-3 py-1 text-xs rounded ${
              view === "market" ? "bg-yellow-500/20 text-yellow-400" : "text-gray-500"
            }`}
          >
            Market
          </button>
          <button
            onClick={() => setView("depth")}
            className={`px-3 py-1 text-xs rounded ${
              view === "depth" ? "bg-yellow-500/20 text-yellow-400" : "text-gray-500"
            }`}
          >
            Depth
          </button>
        </div>
      </div>

      <div className="flex justify-between text-[10px] text-gray-500 mb-1">
        <span>Price (USDT)</span>
        <span>Amount</span>
        <span>Total</span>
      </div>

      {/* Asks - Sell (Red) */}
      <div className="flex-1 overflow-y-auto">
        {asks.slice(0, 12).map((ask, i) => (
          <div key={`ask-${i}`} className="grid grid-cols-3 text-xs py-0.5 relative">
            <div
              className="absolute right-0 top-0 h-full bg-red-500/10"
              style={{ width: `${(ask.total / maxTotal) * 100}%` }}
            />
            <span className="text-red-500 relative z-10">{ask.price.toFixed(2)}</span>
            <span className="text-right text-gray-300 relative z-10">{ask.amount.toFixed(4)}</span>
            <span className="text-right text-gray-500 relative z-10">{ask.total.toFixed(2)}</span>
          </div>
        ))}
      </div>

      {/* Current Price */}
      <div className="text-center py-2 border-y border-[#2b2d33] my-1">
        <span className="text-lg font-bold text-white">65,432.50</span>
        <span className="text-xs text-green-500 ml-2">+2.45%</span>
      </div>

      {/* Bids - Buy (Green) */}
      <div className="flex-1 overflow-y-auto">
        {bids.slice(0, 12).map((bid, i) => (
          <div key={`bid-${i}`} className="grid grid-cols-3 text-xs py-0.5 relative">
            <div
              className="absolute right-0 top-0 h-full bg-green-500/10"
              style={{ width: `${(bid.total / maxTotal) * 100}%` }}
            />
            <span className="text-green-500 relative z-10">{bid.price.toFixed(2)}</span>
            <span className="text-right text-gray-300 relative z-10">{bid.amount.toFixed(4)}</span>
            <span className="text-right text-gray-500 relative z-10">{bid.total.toFixed(2)}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// 4. Trade Form
function TradeForm() {
  const [side, setSide] = useState<"buy" | "sell">("buy");
  const [orderType, setOrderType] = useState<"limit" | "market">("limit");
  const [price, setPrice] = useState("");
  const [amount, setAmount] = useState("");
  const total = +price * +amount || 0;

  return (
    <div className="bg-[#1a1a1a] rounded-xl border border-[#2b2d33] p-4">
      {/* Order Type */}
      <div className="flex gap-1 mb-3">
        <button
          onClick={() => setOrderType("limit")}
          className={`flex-1 py-1.5 text-xs rounded ${
            orderType === "limit" ? "bg-[#2b2d33] text-white" : "text-gray-500"
          }`}
        >
          Limit
        </button>
        <button
          onClick={() => setOrderType("market")}
          className={`flex-1 py-1.5 text-xs rounded ${
            orderType === "market" ? "bg-[#2b2d33] text-white" : "text-gray-500"
          }`}
        >
          Market
        </button>
      </div>

      {/* Buy/Sell */}
      <div className="flex gap-1 mb-3">
        <button
          onClick={() => setSide("buy")}
          className={`flex-1 py-2 rounded text-sm font-bold transition ${
            side === "buy"
              ? "bg-green-500 text-white"
              : "bg-[#2b2d33] text-gray-400 hover:text-white"
          }`}
        >
          Buy
        </button>
        <button
          onClick={() => setSide("sell")}
          className={`flex-1 py-2 rounded text-sm font-bold transition ${
            side === "sell"
              ? "bg-red-500 text-white"
              : "bg-[#2b2d33] text-gray-400 hover:text-white"
          }`}
        >
          Sell
        </button>
      </div>

      {/* Price */}
      <div className="mb-2">
        <label className="text-[10px] text-gray-500">Price (USDT)</label>
        <input
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          placeholder="0.00"
          className="w-full bg-black border border-[#2b2d33] rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-yellow-400 transition"
        />
      </div>

      {/* Amount */}
      <div className="mb-2">
        <label className="text-[10px] text-gray-500">Amount</label>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="0.00"
          className="w-full bg-black border border-[#2b2d33] rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-yellow-400 transition"
        />
      </div>

      {/* Total */}
      <div className="flex justify-between py-2 border-t border-[#2b2d33]">
        <span className="text-xs text-gray-500">Total</span>
        <span className="text-sm font-bold text-white">${total.toFixed(2)}</span>
      </div>

      {/* Submit */}
      <button
        className={`w-full py-3 rounded-lg text-white font-bold text-sm transition ${
          side === "buy"
            ? "bg-green-500 hover:bg-green-600"
            : "bg-red-500 hover:bg-red-600"
        }`}
      >
        {side === "buy" ? "Buy BTC" : "Sell BTC"}
      </button>

      {/* Quick % */}
      <div className="flex gap-1 mt-3">
        {[25, 50, 75, 100].map((p) => (
          <button key={p} className="flex-1 py-1 text-[10px] bg-[#2b2d33] text-gray-400 rounded hover:bg-[#3b3d43] transition">
            {p}%
          </button>
        ))}
      </div>

      {/* Balance */}
      <div className="flex justify-between text-[10px] text-gray-500 mt-3 pt-2 border-t border-[#2b2d33]">
        <span>Available: 0.00 BTC</span>
        <span>≈ $0.00</span>
      </div>
    </div>
  );
}

// 5. Recent Trades
function RecentTrades() {
  const trades = generateTrades(12);

  return (
    <div className="bg-[#1a1a1a] rounded-xl border border-[#2b2d33] p-3 h-[200px] overflow-y-auto">
      <div className="flex justify-between text-[10px] text-gray-500 mb-1 sticky top-0 bg-[#1a1a1a] pb-1">
        <span>Price (USDT)</span>
        <span>Amount</span>
        <span>Time</span>
      </div>
      {trades.map((trade, i) => (
        <div key={i} className="grid grid-cols-3 text-xs py-0.5">
          <span className={trade.side === "buy" ? "text-green-500 font-medium" : "text-red-500 font-medium"}>
            {trade.price.toFixed(2)}
          </span>
          <span className="text-right text-gray-300">{trade.amount.toFixed(4)}</span>
          <span className="text-right text-gray-500">{trade.time}</span>
        </div>
      ))}
    </div>
  );
}

// 6. Trade Tabs
const tradeTabs = [
  { label: "Spot", href: "/trade/BTCUSDT" },
  { label: "Futures", href: "/futures" },
  { label: "Margin", href: "/margin" },
  { label: "Options", href: "/options" },
];

// ===== MAIN PAGE =====
export default function TradePage() {
  const params = useParams();
  const pair = (params.pair as string) || "BTCUSDT";
  const displayPair = pair.replace("/", "");

  const bids = generateOrders(65430, 20, true);
  const asks = generateOrders(65435, 20, false);

  return (
    <div className="min-h-screen bg-black p-4">
      <div className="max-w-7xl mx-auto space-y-4">
        {/* Trade Tabs */}
        <div className="flex gap-1 bg-[#1a1a1a] rounded-xl p-1 border border-[#2b2d33]">
          {tradeTabs.map((tab) => (
            <Link
              key={tab.href}
              href={tab.href}
              className={`px-6 py-2 rounded-lg text-sm font-medium transition ${
                tab.href.includes("trade")
                  ? "bg-yellow-500/20 text-yellow-400"
                  : "text-gray-400 hover:text-white hover:bg-[#2b2d33]"
              }`}
            >
              {tab.label}
            </Link>
          ))}
        </div>

        {/* Market Info */}
        <MarketInfo pair={displayPair.replace("USDT", "/USDT")} />

        {/* Main Grid */}
        <div className="grid grid-cols-12 gap-4">
          {/* Chart - 8 columns */}
          <div className="col-span-12 lg:col-span-8">
            <ChartPlaceholder />
          </div>

          {/* Order Book - 4 columns */}
          <div className="col-span-12 lg:col-span-4">
            <OrderBook bids={bids} asks={asks} />
          </div>

          {/* Recent Trades - 8 columns */}
          <div className="col-span-12 lg:col-span-8">
            <RecentTrades />
          </div>

          {/* Trade Form - 4 columns */}
          <div className="col-span-12 lg:col-span-4">
            <TradeForm />
          </div>
        </div>
      </div>
    </div>
  );
}
