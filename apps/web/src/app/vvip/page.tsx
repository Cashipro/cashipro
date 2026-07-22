"use client";

import Link from "next/link";

const tiers = [
  { level: "Silver", minVolume: "$100,000", benefits: ["Reduced fees", "24/7 Support", "Personal Manager"] },
  { level: "Gold", minVolume: "$500,000", benefits: ["0.05% Maker Fee", "Priority Withdrawals", "Dedicated Manager"] },
  { level: "Platinum", minVolume: "$1,000,000", benefits: ["0.03% Maker Fee", "Custom Trading", "VIP Events"] },
  { level: "Diamond", minVolume: "$5,000,000", benefits: ["0.02% Maker Fee", "OTC Desk", "Private Pool"] },
];

export default function VVIPPage() {
  return (
    <div className="min-h-screen bg-black p-4">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="flex items-center gap-3">
          <Link href="/" className="text-gray-400 hover:text-white">← Home</Link>
          <h1 className="text-2xl font-bold text-white">👑 VVIP Program</h1>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {tiers.map((tier) => (
            <div key={tier.level} className="bg-[#1a1a1a] rounded-xl border border-[#2b2d33] p-4 text-center hover:border-yellow-500/50 transition-all">
              <h3 className="text-xl font-bold text-white">{tier.level}</h3>
              <p className="text-sm text-gray-500">{tier.minVolume}</p>
              <div className="mt-4 text-left">
                {tier.benefits.map((benefit, i) => (
                  <p key={i} className="text-xs text-gray-400 py-1">✅ {benefit}</p>
                ))}
              </div>
              <button className="w-full mt-4 py-2 bg-yellow-500/20 text-yellow-400 rounded-xl hover:bg-yellow-500/30 transition text-sm">
                Upgrade
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
