"use client";

import { useState } from "react";
import Link from "next/link";

export default function APIManagementPage() {
  const [apiKeys] = useState([
    { name: "Trading Bot", key: "abc123...xyz", permissions: "Trade, Read", created: "2025-01-15" },
    { name: "Portfolio Tracker", key: "def456...uvw", permissions: "Read", created: "2025-01-10" },
  ]);

  return (
    <div className="min-h-screen bg-black p-4">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/" className="text-gray-400 hover:text-white">← Home</Link>
            <h1 className="text-2xl font-bold text-white">🔑 API Management</h1>
          </div>
          <button className="px-4 py-2 bg-yellow-500 text-black font-bold rounded-xl hover:bg-yellow-400 transition">
            + Create API Key
          </button>
        </div>

        <div className="bg-[#1a1a1a] rounded-xl border border-[#2b2d33] overflow-hidden">
          <div className="p-4 border-b border-[#2b2d33]">
            <h3 className="text-white font-bold">Your API Keys</h3>
          </div>
          <div className="divide-y divide-[#2b2d33]">
            {apiKeys.map((key, i) => (
              <div key={i} className="flex flex-wrap items-center justify-between p-4 hover:bg-[#2b2d33]/50 transition-colors">
                <div>
                  <p className="text-white font-medium">{key.name}</p>
                  <p className="text-xs text-gray-500">Key: {key.key}</p>
                  <p className="text-xs text-gray-500">Created: {key.created}</p>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-xs text-gray-400">{key.permissions}</span>
                  <button className="text-red-400 text-sm hover:text-red-500">Delete</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
