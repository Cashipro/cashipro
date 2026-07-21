"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

// ===== TRADING VIEW CHART COMPONENT =====
function TradingChart() {
  return (
    <div className="bg-[#1e1f24] rounded-lg p-4 h-[400px] flex items-center justify-center border border-[#2b2d33]">
      <div className="text-center">
        <div className="text-5xl mb-4">📊</div>
        <p className="text-gray-400 font-medium">BTC/USDT</p>
        <p className="text-xs text-gray-500 mt-2">Real-time chart loading...</p>
        <div className="flex gap-2 mt-4 justify-center">
          <span className="px-3 py-1 bg-[#2b2d33] text-xs text-gray-400 rounded">1m</span>
          <span className="px-3 py-1 bg-[#2b2d33] text-xs text-gray-400 rounded">5m</span>
          <span className="px-3 py-1 bg-blue-600 text-xs text-white rounded">15m</span>
          <span className="px-3 py-1 bg-[#2b2d33] text-xs text-gray-400 rounded">1h</span>
          <span className="px-3 py-1 bg-[#2b2d33] text-xs text-gray-400 rounded">4h</span>
          <span className="px-3 py-1 bg-[#2b2d33] text-xs text-gray-400 rounded">1d</span>
        </div>
      </div>
    </div>
  );
}

// ===== ORDER BOOK =====
function OrderBook() {
  const asks = [
    [65435, 0.4],
    [65440, 0.7],
    [65445, 1.0],
    [65450, 0.5],
    [65455, 0.8],
    [65460, 1.3],
    [65465, 0.6],
    [65470, 2.1],
    [65475, 0.9],
    [65480, 1.4],
  ];
  const bids = [
    [65430, 0.5],
    [65425, 0.8],
    [65420, 1.2],
    [65415, 0.6],
    [65410, 0.9],
    [65405, 1.5],
    [65400, 0.7],
    [65395, 2.0],
    [65390, 1.1],
    [65385, 0.4],
  ];

  return (
    <div className="bg-[#1e1f24] rounded-lg p-3 h-[400px] flex flex-col border border-[#2b2d33]">
      <div className="flex justify-between text-[10px] text-gray-500 mb-1">
        <span>Price (USDT)</span>
        <span>Amount</span>
        <span>Total</span>
      </div>

      {/* Asks - Red */}
      <div className="flex-1 overflow-y-auto">
        {asks.map((ask, i) => (
          <div key={`ask-${i}`} className="grid grid-cols-3 text-[11px] py-0.5">
            <span className="text-red-500">{ask[0].toFixed(2)}</span>
            <span className="text-right text-gray-300">{ask[1].toFixed(4)}</span>
            <span className="text-right text-gray-500">{(ask[0] * ask[1]).toFixed(2)}</span>
          </div>
        ))}
      </div>

      {/* Current Price */}
      <div className="text-center py-2 border-y border-[#2b2d33] my-1">
        <span className="text-lg font-bold text-white">65,432.50</span>
        <span className="text-xs text-green-500 ml-2">+2.45%</span>
      </div>

      {/* Bids - Green */}
      <div className="flex-1 overflow-y-auto">
        {bids.map((bid, i) => (
          <div key={`bid-${i}`} className="grid grid-cols-3 text-[11px] py-0.5">
            <span className="text-green-500">{bid[0].toFixed(2)}</span>
            <span className="text-right text-gray-300">{bid[1].toFixed(4)}</span>
            <span className="text-right text-gray-500">{(bid[0] * bid[1]).toFixed(2)}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ===== TRADE FORM =====
function TradeForm() {
  const [side, setSide] = useState<"buy" | "sell">("buy");
  const [price, setPrice] = useState("");
  const [amount, setAmount] = useState("");

  return (
    <div className="bg-[#1e1f24] rounded-lg p-4 border border-[#2b2d33]">
      <div className="flex gap-1 mb-3">
        <button
          onClick={() => setSide("buy")}
          className={`flex-1 py-2 rounded text-sm font-bold ${
            side === "buy" ? "bg-[#0ecb81] text-white" : "bg-[#2b2d33] text-gray-400"
          }`}
        >
          Buy
        </button>
        <button
          onClick={() => setSide("sell")}
          className={`flex-1 py-2 rounded text-sm font-bold ${
            side === "sell" ? "bg-[#f6465d] text-white" : "bg-[#2b2d33] text-gray-400"
          }`}
        >
          Sell
        </button>
      </div>

      <div className="mb-2">
        <label className="text-[10px] text-gray-500">Price (USDT)</label>
        <input
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          placeholder="0.00"
          className="w-full bg-[#2b2d33] text-white rounded px-3 py-2 text-sm outline-none focus:ring-1 focus:ring-blue-500"
        />
      </div>

      <div className="mb-2">
        <label className="text-[10px] text-gray-500">Amount</label>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="0.00"
          className="w-full bg-[#2b2d33] text-white rounded px-3 py-2 text-sm outline-none focus:ring-1 focus:ring-blue-500"
        />
      </div>

      <div className="flex justify-between text-xs py-2 border-t border-[#2b2d33]">
        <span className="text-gray-500">Total</span>
        <span className="text-white font-bold">${(Number(price) * Number(amount) || 0).toFixed(2)}</span>
      </div>

      <button
        className={`w-full py-2.5 rounded text-white font-bold text-sm ${
          side === "buy" ? "bg-[#0ecb81] hover:bg-[#0cb373]" : "bg-[#f6465d] hover:bg-[#d63a4f]"
        }`}
      >
        {side === "buy" ? "Buy BTC" : "Sell BTC"}
      </button>

      <div className="flex gap-1 mt-2">
        {[25, 50, 75, 100].map((p) => (
          <button key={p} className="flex-1 py-1 text-[10px] bg-[#2b2d33] text-gray-400 rounded hover:bg-[#3b3d43]">
            {p}%
          </button>
        ))}
      </div>
    </div>
  );
}

// ===== TOP BAR =====
function TopBar() {
  const tickers = [
    { symbol: "BTC/USDT", price: "65,432", change: "+2.45%" },
    { symbol: "ETH/USDT", price: "3,456", change: "-1.23%" },
    { symbol: "BNB/USDT", price: "598", change: "+5.67%" },
    { symbol: "SOL/USDT", price: "178", change: "+8.12%" },
    { symbol: "XRP/USDT", price: "0.62", change: "-2.01%" },
    { symbol: "ADA/USDT", price: "0.46", change: "+3.45%" },
    { symbol: "DOGE/USDT", price: "0.15", change: "+12.3%" },
    { symbol: "DOT/USDT", price: "7.82", change: "-0.56%" },
  ];

  return (
    <div className="bg-[#1e1f24] border-b border-[#2b2d33] overflow-x-auto">
      <div className="flex items-center gap-6 px-4 py-2 min-w-max">
        {tickers.map((ticker) => (
          <div key={ticker.symbol} className="flex items-center gap-2">
            <span className="text-sm font-medium text-white">{ticker.symbol}</span>
            <span className="text-sm text-white">{ticker.price}</span>
            <span className={`text-xs font-bold ${ticker.change.startsWith('+') ? 'text-green-500' : 'text-red-500'}`}>
              {ticker.change}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ===== MAIN PAGE =====
export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#0a0b0e]">
      {/* Top Bar with Tickers */}
      <TopBar />

      {/* Main Trading Area */}
      <div className="p-4">
        <div className="max-w-7xl mx-auto">
          {/* Market Info */}
          <div className="flex items-center justify-between flex-wrap gap-4 mb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-yellow-500 flex items-center justify-center text-xs font-bold">BTC</div>
              <div>
                <h1 className="text-2xl font-bold text-white">BTC/USDT</h1>
                <span className="text-xs text-gray-500">Spot</span>
              </div>
            </div>
            <div className="flex items-center gap-6 flex-wrap">
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

          {/* Trading Grid - Binance Style */}
          <div className="grid grid-cols-12 gap-4">
            {/* Chart - 8 columns */}
            <div className="col-span-12 lg:col-span-8">
              <TradingChart />
            </div>

            {/* Order Book - 4 columns */}
            <div className="col-span-12 lg:col-span-4">
              <OrderBook />
            </div>

            {/* Trade Form - 4 columns (under Order Book) */}
            <div className="col-span-12 lg:col-span-4">
              <TradeForm />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
