"use client";

import { useState } from "react";
import Link from "next/link";

const depositAssets = [
  { symbol: "BTC", name: "Bitcoin", network: "BTC", min: "0.001", fee: "0.0005" },
  { symbol: "ETH", name: "Ethereum", network: "ERC20", min: "0.01", fee: "0.005" },
  { symbol: "USDT", name: "Tether", network: "BEP20", min: "10", fee: "0.5" },
  { symbol: "BNB", name: "BNB", network: "BEP20", min: "0.01", fee: "0.001" },
  { symbol: "SOL", name: "Solana", network: "SOL", min: "0.01", fee: "0.001" },
  { symbol: "XRP", name: "Ripple", network: "XRP", min: "1", fee: "0.1" },
];

export default function DepositPage() {
  const [selectedAsset, setSelectedAsset] = useState("USDT");
  const [selectedNetwork, setSelectedNetwork] = useState("BEP20");

  const asset = depositAssets.find((a) => a.symbol === selectedAsset);
  const address = "0x742d35Cc6634C0532925a3b844Bc454e4438f44e";

  const handleCopy = () => {
    navigator.clipboard.writeText(address);
    alert("Address copied!");
  };

  return (
    <div className="min-h-screen bg-black p-4">
      <div className="max-w-3xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-white">📥 Deposit</h1>
            <p className="text-sm text-gray-500 mt-1">Deposit funds to your wallet</p>
          </div>
          <Link href="/wallet">
            <button className="text-sm text-gray-400 hover:text-white transition">← Back to Wallet</button>
          </Link>
        </div>

        {/* Asset Selection */}
        <div className="bg-[#1a1a1a] rounded-xl border border-[#2b2d33] p-6">
          <label className="text-sm text-gray-400 block mb-2">Select Asset</label>
          <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
            {depositAssets.map((a) => (
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
                  {a.symbol === "BTC" ? "₿" : a.symbol === "ETH" ? "⟠" : a.symbol === "USDT" ? "₮" : a.symbol === "BNB" ? "🔶" : "🪙"}
                </span>
                <span className={`text-xs font-medium ${selectedAsset === a.symbol ? "text-yellow-400" : "text-gray-400"}`}>
                  {a.symbol}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Network Selection */}
        <div className="bg-[#1a1a1a] rounded-xl border border-[#2b2d33] p-6">
          <label className="text-sm text-gray-400 block mb-2">Network</label>
          <div className="flex gap-2">
            {["BEP20", "ERC20", "TRC20"].map((net) => (
              <button
                key={net}
                onClick={() => setSelectedNetwork(net)}
                className={`px-5 py-2.5 rounded-lg text-sm font-medium transition ${
                  selectedNetwork === net
                    ? "bg-yellow-500/20 text-yellow-400 border border-yellow-500/50"
                    : "bg-[#2b2d33] text-gray-400 hover:text-white"
                }`}
              >
                {net}
              </button>
            ))}
          </div>
          <p className="text-xs text-gray-500 mt-2">
            ⚠️ Send only <span className="text-yellow-400">{selectedAsset}</span> on <span className="text-yellow-400">{selectedNetwork}</span> network to this address
          </p>
        </div>

        {/* Address */}
        <div className="bg-[#1a1a1a] rounded-xl border border-[#2b2d33] p-6">
          <label className="text-sm text-gray-400 block mb-2">Deposit Address</label>
          <div className="flex gap-2">
            <input
              type="text"
              value={address}
              readOnly
              className="flex-1 bg-black border border-[#2b2d33] rounded-xl px-4 py-3 text-white text-sm font-mono focus:outline-none"
            />
            <button
              onClick={handleCopy}
              className="px-5 py-3 bg-yellow-500 text-black font-bold rounded-xl hover:bg-yellow-400 transition whitespace-nowrap"
            >
              Copy
            </button>
          </div>
        </div>

        {/* QR Code Placeholder */}
        <div className="bg-[#1a1a1a] rounded-xl border border-[#2b2d33] p-6 flex justify-center">
          <div className="w-40 h-40 bg-black/50 border-2 border-dashed border-[#2b2d33] rounded-xl flex items-center justify-center">
            <span className="text-gray-500 text-sm">QR Code</span>
          </div>
        </div>

        {/* Info */}
        <div className="bg-[#1a1a1a] rounded-xl border border-[#2b2d33] p-4 space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">Minimum Deposit</span>
            <span className="text-white">{asset?.min} {selectedAsset}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">Network Fee</span>
            <span className="text-yellow-400">{asset?.fee} {selectedAsset}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">Confirmation Required</span>
            <span className="text-white">3 confirmations</span>
          </div>
        </div>
      </div>
    </div>
  );
}
