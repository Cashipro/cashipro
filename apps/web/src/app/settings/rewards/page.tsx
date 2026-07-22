"use client";

import { useState } from "react";
import Link from "next/link";

const rewards = [
  { id: 1, name: "Welcome Bonus", points: 500, status: "Claimed", expiry: "2025-02-01" },
  { id: 2, name: "First Trade", points: 200, status: "Available", expiry: "2025-03-01" },
  { id: 3, name: "Referral Reward", points: 1000, status: "Claimed", expiry: "2025-04-01" },
  { id: 4, name: "Weekly Trading", points: 300, status: "Available", expiry: "2025-02-15" },
  { id: 5, name: "Staking Bonus", points: 1500, status: "Claimed", expiry: "2025-05-01" },
];

export default function RewardHubPage() {
  const totalPoints = rewards.reduce((sum, r) => sum + (r.status === "Claimed" ? r.points : 0), 0);

  return (
    <div className="min-h-screen bg-black p-4">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="flex items-center gap-3">
          <Link href="/settings" className="text-gray-400 hover:text-white">← Back</Link>
          <h1 className="text-2xl font-bold text-white">🏆 Reward Hub</h1>
        </div>

        {/* Points Summary */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-[#1a1a1a] rounded-xl border border-[#2b2d33] p-4 text-center">
            <p className="text-sm text-gray-500">Total Points</p>
            <p className="text-2xl font-bold text-yellow-400">{totalPoints}</p>
          </div>
          <div className="bg-[#1a1a1a] rounded-xl border border-[#2b2d33] p-4 text-center">
            <p className="text-sm text-gray-500">Available</p>
            <p className="text-2xl font-bold text-green-500">500</p>
          </div>
          <div className="bg-[#1a1a1a] rounded-xl border border-[#2b2d33] p-4 text-center">
            <p className="text-sm text-gray-500">Next Reward</p>
            <p className="text-2xl font-bold text-white">100 pts</p>
          </div>
        </div>

        {/* Rewards List */}
        <div className="bg-[#1a1a1a] rounded-xl border border-[#2b2d33] overflow-hidden">
          <div className="p-4 border-b border-[#2b2d33]">
            <h3 className="text-white font-bold">Available Rewards</h3>
          </div>
          <div className="divide-y divide-[#2b2d33]">
            {rewards.map((reward) => (
              <div key={reward.id} className="flex items-center justify-between p-4 hover:bg-[#2b2d33]/50 transition-colors">
                <div>
                  <p className="text-white font-medium">{reward.name}</p>
                  <p className="text-xs text-gray-500">Expires: {reward.expiry}</p>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-yellow-400 font-bold">{reward.points} pts</span>
                  <span className={`text-xs px-2 py-1 rounded ${
                    reward.status === "Claimed" ? "bg-green-500/10 text-green-500" : "bg-yellow-500/10 text-yellow-400"
                  }`}>
                    {reward.status}
                  </span>
                  {reward.status === "Available" && (
                    <button className="px-4 py-1.5 bg-yellow-500 text-black text-sm rounded hover:bg-yellow-400 transition">
                      Claim
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
