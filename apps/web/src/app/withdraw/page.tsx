"use client";

import { useState } from "react";
import Link from "next/link";

const withdrawAssets = [
  { symbol: "BTC", name: "Bitcoin", balance: 0.0523, min: "0.001", fee: "0.0005", network: "BTC" },
  { symbol: "ETH", name: "Ethereum", balance: 2.456, min: "0.01", fee: "0.005", network: "ERC20" },
  { symbol: "USDT", name: "Tether", balance: 3043.75, min: "10", fee: "0.5", network: "BEP20" },
  { symbol: "BNB", name: "BNB", balance: 5.21, min: "0.01", fee: "0.001", network: "BEP20" },
];

export default function WithdrawPage() {
  const [selectedAsset, setSelectedAsset] = useState("USDT");
  const [address, setAddress] = useState("");
  const [amount, setAmount] = useState("");

  const asset = withdrawAssets.find((a) => a.symbol === selectedAsset);

  const handleMax = () => {
    if (asset) setAmount(asset.balance.toString());
  };

  return (
    <div className="min-h-screen bg-black p-4">
      <div className="max-w-3xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-white">📤 Withdraw</h1>
            <p className="text-sm text-gray-500 mt-1">Withdraw funds from your wallet</p>
          </div>
          <Link href="/wallet">
            <button className="text-sm text-gray-400 hover:text-white transition">← Back to Wallet</button>
          </Link>
        </div>

        {/* Asset Selection */}
        <div className="bg-[#1a1a1a] rounded-xl border border-[#2b2d33] p-6">
          <label className="text-sm text-gray-400 block mb-2">Select Asset</label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {withdrawAssets.map((a) => (
              <button
                key={a.symbol}
                onClick={() => setSelectedAsset(a.symbol)}
                className={`p-3 rounded-lg text-center transition ${
                  selectedAsset === a.symbol
                    ? "bg-yellow-500/20 border border-yellow-500/50"
                    : "bg-[#2b2d33] hover:bg-[#3b3d43]"
                }`}
              >
                <span className="text-xl block">
                  {a.symbol === "BTC" ? "₿" : a.symbol === "ETH" ? "⟠" : a.symbol === "USDT" ? "₮" : "🔶"}
                </span>
                <span className={`text-xs font-medium ${selectedAsset === a.symbol ? "text-yellow-400" : "text-gray-400"}`}>
                  {a.symbol}
                </span>
                <span className="text-[10px] text-gray-500 block">{a.balance.toFixed(4)}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Address */}
        <div className="bg-[#1a1a1a] rounded-xl border border-[#2b2d33] p-6">
          <label className="text-sm text-gray-400 block mb-2">Withdrawal Address</label>
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder={`Enter ${selectedAsset} address`}
            className="w-full bg-black border border-[#2b2d33] rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-yellow-400 transition"
          />
          <p className="text-xs text-gray-500 mt-2">
            ⚠️ Send only <span className="text-yellow-400">{selectedAsset}</span> to this address
          </p>
        </div>

        {/* Amount */}
        <div className="bg-[#1a1a1a] rounded-xl border border-[#2b2d33] p-6">
          <div className="flex justify-between">
            <label className="text-sm text-gray-400 block mb-2">Amount</label>
            <span className="text-sm text-gray-400">
              Balance: <span className="text-white">{asset?.balance.toFixed(4)} {selectedAsset}</span>
            </span>
          </div>
          <div className="relative">
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="0.00"
              className="w-full bg-black border border-[#2b2d33] rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-yellow-400 transition"
            />
            <button
              onClick={handleMax}
              className="absolute right-3 top-1/2 -translate-y-1/2 px-3 py-1 bg-[#2b2d33] text-gray-400 text-xs rounded hover:text-white transition"
            >
              MAX
            </button>
          </div>
          <div className="flex gap-2 mt-3">
            {[25, 50, 75, 100].map((p) => (
              <button
                key={p}
                onClick={() => {
                  if (asset) setAmount(((asset.balance * p) / 100).toString());
                }}
                className="flex-1 py-1.5 bg-[#2b2d33] text-gray-400 text-xs rounded hover:bg-[#3b3d43] transition"
              >
                {p}%
              </button>
            ))}
          </div>
        </div>

        {/* Summary */}
        <div className="bg-[#1a1a1a] rounded-xl border border-[#2b2d33] p-4 space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">Withdrawal Fee</span>
            <span className="text-yellow-400">{asset?.fee} {selectedAsset}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">You Will Receive</span>
            <span className="text-white font-bold">
              {amount ? `$${(Number(amount) - Number(asset?.fee || 0)).toFixed(2)}` : "0.00"} {selectedAsset}
            </span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">Network</span>
            <span className="text-white">{asset?.network}</span>
          </div>
        </div>

        {/* Submit */}
        <button
          disabled={!address || !amount}
          className={`w-full py-4 rounded-xl font-bold text-lg transition ${
            address && amount
              ? "bg-yellow-500 text-black hover:bg-yellow-400"
              : "bg-[#2b2d33] text-gray-500 cursor-not-allowed"
          }`}
        >
          Withdraw {selectedAsset}
        </button>

        <p className="text-xs text-gray-500 text-center">
          ⚠️ Withdrawals may take 5-30 minutes to process
        </p>
      </div>
    </div>
  );
}
