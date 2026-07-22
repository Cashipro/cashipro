"use client";

import { useState } from "react";
import Link from "next/link";

export default function ReferralPage() {
  const [copied, setCopied] = useState(false);
  const referralCode = "CASHI2025";
  const referralLink = `https://cashipro.vercel.app/register?ref=${referralCode}`;

  const referrals = [
    { name: "Alice Johnson", email: "alice@email.com", date: "2025-01-20", status: "Active", earnings: "$25.50" },
    { name: "Bob Smith", email: "bob@email.com", date: "2025-01-18", status: "Active", earnings: "$12.00" },
    { name: "Charlie Brown", email: "charlie@email.com", date: "2025-01-15", status: "Inactive", earnings: "$0.00" },
    { name: "Diana Prince", email: "diana@email.com", date: "2025-01-10", status: "Active", earnings: "$8.75" },
    { name: "Eve Wilson", email: "eve@email.com", date: "2025-01-05", status: "Active", earnings: "$32.20" },
  ];

  const handleCopy = () => {
    navigator.clipboard.writeText(referralLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-black p-4">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-white">👥 Referral Program</h1>
            <p className="text-sm text-gray-500 mt-1">Invite friends and earn rewards</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="bg-yellow-500/20 px-4 py-2 rounded-xl">
              <p className="text-xs text-gray-400">Total Earnings</p>
              <p className="text-xl font-bold text-yellow-400">$78.45</p>
            </div>
            <div className="bg-yellow-500/20 px-4 py-2 rounded-xl">
              <p className="text-xs text-gray-400">Active Referrals</p>
              <p className="text-xl font-bold text-yellow-400">4</p>
            </div>
          </div>
        </div>

        {/* Referral Link */}
        <div className="bg-[#1a1a1a] rounded-xl border border-[#2b2d33] p-6">
          <h3 className="text-white font-bold mb-4">🔗 Your Referral Link</h3>
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="flex-1 flex items-center bg-black border border-[#2b2d33] rounded-xl px-4 py-3">
              <span className="text-yellow-400 font-bold mr-2">REF:</span>
              <span className="text-white text-sm font-mono">{referralCode}</span>
            </div>
            <button
              onClick={handleCopy}
              className="px-6 py-3 bg-yellow-500 text-black font-bold rounded-xl hover:bg-yellow-400 transition whitespace-nowrap"
            >
              {copied ? "✅ Copied!" : "📋 Copy Link"}
            </button>
          </div>
          <div className="mt-4 flex flex-wrap gap-3">
            {["Twitter", "Facebook", "Telegram", "WhatsApp"].map((platform) => (
              <button key={platform} className="px-4 py-2 bg-[#2b2d33] text-gray-300 rounded-lg hover:bg-[#3b3d43] transition text-sm">
                Share on {platform}
              </button>
            ))}
          </div>
        </div>

        {/* How It Works */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-[#1a1a1a] rounded-xl border border-[#2b2d33] p-4 text-center">
            <div className="w-12 h-12 bg-yellow-500/20 rounded-xl flex items-center justify-center text-2xl mx-auto mb-3">
              🔗
            </div>
            <h4 className="text-white font-bold">Share Link</h4>
            <p className="text-xs text-gray-500 mt-1">Share your referral link with friends</p>
          </div>
          <div className="bg-[#1a1a1a] rounded-xl border border-[#2b2d33] p-4 text-center">
            <div className="w-12 h-12 bg-yellow-500/20 rounded-xl flex items-center justify-center text-2xl mx-auto mb-3">
              📝
            </div>
            <h4 className="text-white font-bold">Friend Joins</h4>
            <p className="text-xs text-gray-500 mt-1">They sign up and complete verification</p>
          </div>
          <div className="bg-[#1a1a1a] rounded-xl border border-[#2b2d33] p-4 text-center">
            <div className="w-12 h-12 bg-yellow-500/20 rounded-xl flex items-center justify-center text-2xl mx-auto mb-3">
              💰
            </div>
            <h4 className="text-white font-bold">Earn Rewards</h4>
            <p className="text-xs text-gray-500 mt-1">Earn 20% of their trading fees</p>
          </div>
        </div>

        {/* Referral Stats */}
        <div className="bg-[#1a1a1a] rounded-xl border border-[#2b2d33] p-6">
          <h3 className="text-white font-bold mb-4">📊 Referral Stats</h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div>
              <p className="text-xs text-gray-500">Total Referrals</p>
              <p className="text-xl font-bold text-white">12</p>
            </div>
            <div>
              <p className="text-xs text-gray-500">Active</p>
              <p className="text-xl font-bold text-green-500">4</p>
            </div>
            <div>
              <p className="text-xs text-gray-500">Pending</p>
              <p className="text-xl font-bold text-yellow-400">3</p>
            </div>
            <div>
              <p className="text-xs text-gray-500">Total Earnings</p>
              <p className="text-xl font-bold text-yellow-400">$78.45</p>
            </div>
          </div>
        </div>

        {/* Referral List */}
        <div className="bg-[#1a1a1a] rounded-xl border border-[#2b2d33] overflow-hidden">
          <div className="p-4 border-b border-[#2b2d33]">
            <h3 className="text-white font-bold">👥 Referral History</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-black/30">
                <tr>
                  <th className="px-4 py-3 text-left text-xs text-gray-500">Name</th>
                  <th className="px-4 py-3 text-left text-xs text-gray-500">Email</th>
                  <th className="px-4 py-3 text-left text-xs text-gray-500">Date</th>
                  <th className="px-4 py-3 text-left text-xs text-gray-500">Status</th>
                  <th className="px-4 py-3 text-right text-xs text-gray-500">Earnings</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#2b2d33]">
                {referrals.map((ref, i) => (
                  <tr key={i} className="hover:bg-[#2b2d33]/50 transition-colors">
                    <td className="px-4 py-3 text-white text-sm">{ref.name}</td>
                    <td className="px-4 py-3 text-gray-400 text-sm">{ref.email}</td>
                    <td className="px-4 py-3 text-gray-400 text-sm">{ref.date}</td>
                    <td className="px-4 py-3">
                      <span className={`text-xs px-2 py-1 rounded ${
                        ref.status === "Active" ? "bg-green-500/10 text-green-500" : "bg-gray-500/10 text-gray-400"
                      }`}>
                        {ref.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right text-yellow-400 text-sm font-bold">{ref.earnings}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
