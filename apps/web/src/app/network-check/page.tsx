"use client";

import Link from "next/link";

const networks = [
  { name: "Binance Smart Chain (BSC)", status: "✅ Operational", latency: "12ms" },
  { name: "Ethereum (ERC-20)", status: "✅ Operational", latency: "45ms" },
  { name: "TRON (TRC-20)", status: "✅ Operational", latency: "23ms" },
  { name: "Solana", status: "⚠️ Degraded", latency: "89ms" },
  { name: "Bitcoin", status: "✅ Operational", latency: "34ms" },
  { name: "Polygon", status: "✅ Operational", latency: "18ms" },
];

export default function NetworkCheckPage() {
  return (
    <div className="min-h-screen bg-black p-4">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="flex items-center gap-3">
          <Link href="/" className="text-gray-400 hover:text-white">← Home</Link>
          <h1 className="text-2xl font-bold text-white">📡 Network Check</h1>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {networks.map((net, i) => (
            <div key={i} className="bg-[#1a1a1a] rounded-xl border border-[#2b2d33] p-4 hover:border-yellow-500/50 transition-all">
              <div className="flex items-center justify-between">
                <h3 className="text-white font-medium">{net.name}</h3>
                <span className={`text-xs ${net.status.includes("✅") ? "text-green-500" : "text-yellow-400"}`}>
                  {net.status}
                </span>
              </div>
              <p className="text-sm text-gray-500 mt-1">Latency: {net.latency}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
