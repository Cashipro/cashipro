"use client";

import Link from "next/link";

export default function KYCStatusDashboard() {
  const kycStatus = {
    level: "1",
    status: "pending" as "pending" | "approved" | "rejected",
    verifiedAt: null,
    limits: {
      deposit: "Unlimited",
      withdrawal: "0.1 BTC/day",
      trading: "Spot only",
    },
  };

  return (
    <div className="bg-[#1a1a1a] rounded-xl border border-[#2b2d33] p-6">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-white font-bold">KYC Status</h3>
          <p className="text-sm text-gray-500">Level {kycStatus.level} Verification</p>
        </div>
        <div className="flex items-center gap-2">
          <span className={`px-3 py-1 rounded-full text-xs font-bold ${
            kycStatus.status === "approved" ? "bg-green-500/20 text-green-500" :
            kycStatus.status === "pending" ? "bg-yellow-500/20 text-yellow-400" :
            "bg-red-500/20 text-red-500"
          }`}>
            {kycStatus.status === "approved" ? "✅ Verified" :
             kycStatus.status === "pending" ? "⏳ Pending" :
             "❌ Failed"}
          </span>
        </div>
      </div>

      <div className="space-y-3 text-sm">
        <div className="flex justify-between">
          <span className="text-gray-500">Deposit Limit</span>
          <span className="text-white">{kycStatus.limits.deposit}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-500">Withdrawal Limit</span>
          <span className="text-white">{kycStatus.limits.withdrawal}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-500">Trading Access</span>
          <span className="text-white">{kycStatus.limits.trading}</span>
        </div>
      </div>

      {kycStatus.status !== "approved" && (
        <Link href="/kyc">
          <button className="w-full mt-4 py-2.5 bg-yellow-500 text-black font-bold rounded-xl hover:bg-yellow-400 transition text-sm">
            {kycStatus.status === "pending" ? "View Status" : "Verify Now"}
          </button>
        </Link>
      )}
    </div>
  );
}
