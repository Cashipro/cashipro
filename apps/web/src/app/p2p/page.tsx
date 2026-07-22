"use client";

import { useState } from "react";
import Link from "next/link";

const ads = [
  {
    id: 1,
    trader: "CryptoWhale",
    type: "buy",
    asset: "USDT",
    fiat: "PKR",
    price: 285.50,
    amount: "500 - 50,000",
    payment: ["Bank Transfer", "JazzCash", "EasyPaisa"],
    completion: 98,
    verified: true,
    online: true,
  },
  {
    id: 2,
    trader: "BitcoinKing",
    type: "sell",
    asset: "USDT",
    fiat: "PKR",
    price: 284.75,
    amount: "200 - 25,000",
    payment: ["Bank Transfer", "EasyPaisa"],
    completion: 95,
    verified: true,
    online: true,
  },
  {
    id: 3,
    trader: "CryptoTrader",
    type: "buy",
    asset: "BTC",
    fiat: "PKR",
    price: 18500,
    amount: "0.01 - 1.0",
    payment: ["Bank Transfer", "JazzCash"],
    completion: 100,
    verified: false,
    online: false,
  },
  {
    id: 4,
    trader: "P2PKing",
    type: "sell",
    asset: "USDT",
    fiat: "PKR",
    price: 285.00,
    amount: "1000 - 100,000",
    payment: ["Bank Transfer", "JazzCash", "EasyPaisa", "Meezan"],
    completion: 92,
    verified: true,
    online: true,
  },
  {
    id: 5,
    trader: "HODLer",
    type: "buy",
    asset: "ETH",
    fiat: "PKR",
    price: 850,
    amount: "0.5 - 10",
    payment: ["Bank Transfer"],
    completion: 88,
    verified: true,
    online: false,
  },
];

const paymentMethods = ["All", "Bank Transfer", "JazzCash", "EasyPaisa", "Meezan"];

export default function P2PPage() {
  const [type, setType] = useState<"buy" | "sell">("buy");
  const [asset, setAsset] = useState("USDT");
  const [fiat, setFiat] = useState("PKR");
  const [payment, setPayment] = useState("All");
  const [search, setSearch] = useState("");

  const filteredAds = ads
    .filter((ad) => ad.type === type)
    .filter((ad) => ad.asset === asset)
    .filter((ad) => ad.fiat === fiat)
    .filter((ad) => payment === "All" || ad.payment.includes(payment))
    .filter((ad) =>
      ad.trader.toLowerCase().includes(search.toLowerCase())
    );

  return (
    <div className="min-h-screen bg-black p-4">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-white">🔄 P2P Trading</h1>
            <p className="text-sm text-gray-500 mt-1">Trade directly with other users</p>
          </div>
          <div className="flex gap-2">
            <Link href="/p2p/create-ad">
              <button className="px-5 py-2.5 bg-yellow-500 text-black font-bold rounded-xl hover:bg-yellow-400 transition text-sm">
                + Create Ad
              </button>
            </Link>
            <Link href="/p2p/orders">
              <button className="px-5 py-2.5 bg-[#2b2d33] text-white rounded-xl hover:bg-[#3b3d43] transition text-sm">
                📋 My Orders
              </button>
            </Link>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-[#1a1a1a] rounded-xl border border-[#2b2d33] p-4 space-y-4">
          {/* Buy/Sell Toggle */}
          <div className="flex gap-1 bg-[#2b2d33] rounded-xl p-1">
            <button
              onClick={() => setType("buy")}
              className={`flex-1 py-2.5 rounded-lg text-sm font-bold transition ${
                type === "buy"
                  ? "bg-green-500 text-white"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              📈 Buy
            </button>
            <button
              onClick={() => setType("sell")}
              className={`flex-1 py-2.5 rounded-lg text-sm font-bold transition ${
                type === "sell"
                  ? "bg-red-500 text-white"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              📉 Sell
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {/* Asset */}
            <div>
              <label className="text-xs text-gray-500 block mb-1.5">Asset</label>
              <select
                value={asset}
                onChange={(e) => setAsset(e.target.value)}
                className="w-full bg-black border border-[#2b2d33] rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-yellow-400 transition"
              >
                <option>USDT</option>
                <option>BTC</option>
                <option>ETH</option>
                <option>BNB</option>
                <option>SOL</option>
              </select>
            </div>

            {/* Fiat */}
            <div>
              <label className="text-xs text-gray-500 block mb-1.5">Fiat</label>
              <select
                value={fiat}
                onChange={(e) => setFiat(e.target.value)}
                className="w-full bg-black border border-[#2b2d33] rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-yellow-400 transition"
              >
                <option>PKR</option>
                <option>USD</option>
                <option>EUR</option>
                <option>GBP</option>
                <option>INR</option>
              </select>
            </div>

            {/* Payment */}
            <div>
              <label className="text-xs text-gray-500 block mb-1.5">Payment</label>
              <select
                value={payment}
                onChange={(e) => setPayment(e.target.value)}
                className="w-full bg-black border border-[#2b2d33] rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-yellow-400 transition"
              >
                {paymentMethods.map((p) => (
                  <option key={p} value={p}>{p}</option>
                ))}
              </select>
            </div>

            {/* Search */}
            <div>
              <label className="text-xs text-gray-500 block mb-1.5">Search</label>
              <input
                type="text"
                placeholder="Search trader..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full bg-black border border-[#2b2d33] rounded-lg px-3 py-2 text-white text-sm placeholder-gray-500 focus:outline-none focus:border-yellow-400 transition"
              />
            </div>
          </div>
        </div>

        {/* Ads List */}
        <div className="space-y-3">
          {filteredAds.length === 0 ? (
            <div className="bg-[#1a1a1a] rounded-xl border border-[#2b2d33] p-12 text-center">
              <p className="text-gray-500">No ads found</p>
              <p className="text-xs text-gray-600 mt-1">Try adjusting your filters</p>
            </div>
          ) : (
            filteredAds.map((ad) => (
              <div
                key={ad.id}
                className="bg-[#1a1a1a] rounded-xl border border-[#2b2d33] p-4 hover:border-yellow-500/50 transition-all"
              >
                <div className="flex flex-wrap items-center justify-between gap-4">
                  {/* Trader Info */}
                  <div className="flex items-center gap-4">
                    <div className="relative">
                      <div className="w-12 h-12 rounded-full bg-[#2b2d33] flex items-center justify-center text-lg font-bold text-white">
                        {ad.trader.slice(0, 2).toUpperCase()}
                      </div>
                      {ad.online && (
                        <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-green-500 rounded-full border-2 border-[#1a1a1a]"></div>
                      )}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="text-white font-bold">{ad.trader}</p>
                        {ad.verified && (
                          <span className="text-xs text-blue-400">✓ Verified</span>
                        )}
                        <span className="text-xs text-gray-500">
                          {ad.completion}% completion
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-gray-500">
                        <span>💰 {ad.amount}</span>
                        <span>•</span>
                        <span>💳 {ad.payment.join(", ")}</span>
                      </div>
                    </div>
                  </div>

                  {/* Price */}
                  <div className="text-center">
                    <p className="text-xs text-gray-500">Price</p>
                    <p className="text-xl font-bold text-white">
                      {ad.price} {ad.fiat}
                    </p>
                  </div>

                  {/* Action */}
                  <div className="flex gap-2">
                    <Link href={`/p2p/ad/${ad.id}`}>
                      <button className={`px-6 py-2.5 rounded-xl text-sm font-bold transition ${
                        ad.type === "buy"
                          ? "bg-green-500 hover:bg-green-600 text-white"
                          : "bg-red-500 hover:bg-red-600 text-white"
                      }`}>
                        {ad.type === "buy" ? "Buy" : "Sell"} {ad.asset}
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
