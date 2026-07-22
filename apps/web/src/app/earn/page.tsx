"use client";

import { useState } from "react";
import Link from "next/link";

const earnProducts = [
  {
    id: 1,
    asset: "USDT",
    name: "Flexible Savings",
    apy: "4.5%",
    term: "Flexible",
    minDeposit: 10,
    maxDeposit: 100000,
    totalStaked: 2450000,
    risk: "Low",
    color: "green",
  },
  {
    id: 2,
    asset: "BTC",
    name: "Locked Staking",
    apy: "6.8%",
    term: "30 Days",
    minDeposit: 0.001,
    maxDeposit: 10,
    totalStaked: 1250,
    risk: "Low",
    color: "yellow",
  },
  {
    id: 3,
    asset: "ETH",
    name: "Locked Staking",
    apy: "7.2%",
    term: "60 Days",
    minDeposit: 0.1,
    maxDeposit: 100,
    totalStaked: 8500,
    risk: "Medium",
    color: "blue",
  },
  {
    id: 4,
    asset: "BNB",
    name: "Locked Staking",
    apy: "8.5%",
    term: "90 Days",
    minDeposit: 0.5,
    maxDeposit: 500,
    totalStaked: 32400,
    risk: "Medium",
    color: "yellow",
  },
  {
    id: 5,
    asset: "SOL",
    name: "Flexible Savings",
    apy: "5.2%",
    term: "Flexible",
    minDeposit: 1,
    maxDeposit: 10000,
    totalStaked: 185000,
    risk: "High",
    color: "purple",
  },
  {
    id: 6,
    asset: "USDC",
    name: "Flexible Savings",
    apy: "3.8%",
    term: "Flexible",
    minDeposit: 10,
    maxDeposit: 200000,
    totalStaked: 3670000,
    risk: "Low",
    color: "green",
  },
];

export default function EarnPage() {
  const [selectedProduct, setSelectedProduct] = useState<typeof earnProducts[0] | null>(null);
  const [amount, setAmount] = useState("");
  const [activeTab, setActiveTab] = useState<"savings" | "staking" | "history">("savings");

  const handleStake = () => {
    alert(`Staking ${amount} ${selectedProduct?.asset} in ${selectedProduct?.name}`);
    setSelectedProduct(null);
    setAmount("");
  };

  return (
    <div className="min-h-screen bg-black p-4">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-white">💰 Earn</h1>
            <p className="text-sm text-gray-500 mt-1">Grow your crypto with staking and savings</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="bg-yellow-500/20 px-4 py-2 rounded-xl">
              <p className="text-xs text-gray-400">Total Staked</p>
              <p className="text-lg font-bold text-yellow-400">$8.2M</p>
            </div>
            <div className="bg-yellow-500/20 px-4 py-2 rounded-xl">
              <p className="text-xs text-gray-400">Total Rewards</p>
              <p className="text-lg font-bold text-yellow-400">$124,500</p>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 bg-[#1a1a1a] rounded-xl p-1 border border-[#2b2d33]">
          <button
            onClick={() => setActiveTab("savings")}
            className={`flex-1 py-2.5 rounded-lg text-sm font-medium transition ${
              activeTab === "savings"
                ? "bg-yellow-500/20 text-yellow-400"
                : "text-gray-400 hover:text-white"
            }`}
          >
            💰 Savings
          </button>
          <button
            onClick={() => setActiveTab("staking")}
            className={`flex-1 py-2.5 rounded-lg text-sm font-medium transition ${
              activeTab === "staking"
                ? "bg-yellow-500/20 text-yellow-400"
                : "text-gray-400 hover:text-white"
            }`}
          >
            🔒 Staking
          </button>
          <button
            onClick={() => setActiveTab("history")}
            className={`flex-1 py-2.5 rounded-lg text-sm font-medium transition ${
              activeTab === "history"
                ? "bg-yellow-500/20 text-yellow-400"
                : "text-gray-400 hover:text-white"
            }`}
          >
            📊 History
          </button>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {earnProducts.map((product) => (
            <div
              key={product.id}
              className="bg-[#1a1a1a] rounded-xl border border-[#2b2d33] p-5 hover:border-yellow-500/50 transition-all"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <span className="text-xl">
                    {product.asset === "BTC" ? "₿" :
                     product.asset === "ETH" ? "⟠" :
                     product.asset === "USDT" ? "₮" :
                     product.asset === "BNB" ? "🔶" :
                     product.asset === "SOL" ? "◎" : "$"}
                  </span>
                  <span className="text-white font-bold">{product.asset}</span>
                </div>
                <span className={`text-xs px-2 py-1 rounded ${
                  product.risk === "Low" ? "bg-green-500/10 text-green-500" :
                  product.risk === "Medium" ? "bg-yellow-500/10 text-yellow-400" :
                  "bg-red-500/10 text-red-500"
                }`}>
                  {product.risk} Risk
                </span>
              </div>

              <h3 className="text-white font-bold">{product.name}</h3>
              <p className="text-sm text-gray-500">{product.term}</p>

              <div className="mt-3 flex items-center justify-between">
                <div>
                  <p className="text-xs text-gray-500">APY</p>
                  <p className="text-2xl font-bold text-yellow-400">{product.apy}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-gray-500">Staked</p>
                  <p className="text-sm text-white">${(product.totalStaked / 1000000).toFixed(1)}M</p>
                </div>
              </div>

              <button
                onClick={() => setSelectedProduct(product)}
                className="w-full mt-4 py-2.5 bg-yellow-500/10 text-yellow-400 font-bold rounded-xl hover:bg-yellow-500/20 transition text-sm"
              >
                Stake Now
              </button>
            </div>
          ))}
        </div>

        {/* Stake Modal */}
        {selectedProduct && (
          <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50">
            <div className="bg-[#1a1a1a] rounded-2xl border border-[#2b2d33] p-6 max-w-md w-full">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-white font-bold text-xl">
                  Stake {selectedProduct.asset}
                </h3>
                <button
                  onClick={() => setSelectedProduct(null)}
                  className="text-gray-400 hover:text-white text-xl"
                >
                  ✕
                </button>
              </div>

              <div className="space-y-4">
                <div className="bg-black/50 rounded-lg p-4 space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Product</span>
                    <span className="text-white">{selectedProduct.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Term</span>
                    <span className="text-white">{selectedProduct.term}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">APY</span>
                    <span className="text-yellow-400 font-bold">{selectedProduct.apy}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Min Deposit</span>
                    <span className="text-white">{selectedProduct.minDeposit} {selectedProduct.asset}</span>
                  </div>
                </div>

                <div>
                  <label className="text-sm text-gray-400 block mb-1.5">
                    Amount ({selectedProduct.asset})
                  </label>
                  <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder={`Min ${selectedProduct.minDeposit}`}
                    className="w-full bg-black border border-[#2b2d33] rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-yellow-400 transition"
                  />
                </div>

                <div className="bg-black/50 rounded-lg p-3 text-center">
                  <p className="text-sm text-gray-500">Estimated Rewards</p>
                  <p className="text-xl font-bold text-yellow-400">
                    {amount ? `$${(Number(amount) * parseFloat(selectedProduct.apy) / 100).toFixed(2)}` : "$0.00"}
                  </p>
                </div>

                <button
                  onClick={handleStake}
                  disabled={!amount}
                  className={`w-full py-3 rounded-xl font-bold transition ${
                    amount
                      ? "bg-yellow-500 text-black hover:bg-yellow-400"
                      : "bg-[#2b2d33] text-gray-500 cursor-not-allowed"
                  }`}
                >
                  Confirm Stake
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
