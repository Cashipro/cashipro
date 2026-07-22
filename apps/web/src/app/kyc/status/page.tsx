"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function KYCStatusPage() {
  const [status, setStatus] = useState<"pending" | "approved" | "rejected">("pending");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate fetching KYC status
    const timer = setTimeout(() => {
      setStatus("pending");
      setLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-black p-4 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-yellow-500 border-r-2 border-yellow-500 mx-auto"></div>
          <p className="text-gray-400 mt-4">Loading verification status...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black p-4 flex items-center justify-center">
      <div className="max-w-md w-full bg-[#1a1a1a] rounded-2xl border border-[#2b2d33] p-8 text-center space-y-6">
        {/* Logo */}
        <div className="w-16 h-16 mx-auto bg-yellow-500/20 rounded-full flex items-center justify-center text-3xl">
          {status === "pending" && "⏳"}
          {status === "approved" && "✅"}
          {status === "rejected" && "❌"}
        </div>

        {/* Title */}
        <h2 className="text-2xl font-bold text-white">
          {status === "pending" && "Verification In Progress"}
          {status === "approved" && "Verification Approved!"}
          {status === "rejected" && "Verification Failed"}
        </h2>

        <p className="text-gray-400 text-sm">
          {status === "pending" && "We're reviewing your documents. This usually takes 1-2 business days."}
          {status === "approved" && "Your identity has been verified. You now have full access to all features."}
          {status === "rejected" && "We couldn't verify your identity. Please check your documents and try again."}
        </p>

        {/* Status Details */}
        <div className="bg-black/50 rounded-xl p-4 space-y-2 text-sm text-left">
          <div className="flex justify-between">
            <span className="text-gray-500">Status</span>
            <span className={
              status === "pending" ? "text-yellow-400" :
              status === "approved" ? "text-green-500" :
              "text-red-500"
            }>
              {status === "pending" ? "⏳ Pending" :
               status === "approved" ? "✅ Approved" :
               "❌ Rejected"}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">Level</span>
            <span className="text-white">Level 1</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">Submitted</span>
            <span className="text-white">2025-01-20</span>
          </div>
        </div>

        {/* Progress Bar - Pending */}
        {status === "pending" && (
          <div className="bg-black/50 rounded-xl p-4">
            <div className="h-1.5 bg-[#2b2d33] rounded-full overflow-hidden">
              <div className="h-full bg-yellow-500 rounded-full w-2/3 animate-pulse"></div>
            </div>
            <p className="text-xs text-gray-500 mt-2">Estimated time: 1-2 days</p>
          </div>
        )}

        {/* Benefits - Approved */}
        {status === "approved" && (
          <div className="bg-green-500/10 border border-green-500/20 rounded-xl p-4 text-left space-y-1">
            <p className="text-sm text-green-400">✅ Trading limits: Unlimited</p>
            <p className="text-sm text-green-400">✅ Withdrawals: Up to 500 BTC/day</p>
            <p className="text-sm text-green-400">✅ Fiat services: Enabled</p>
          </div>
        )}

        {/* Reasons - Rejected */}
        {status === "rejected" && (
          <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4 text-left">
            <p className="text-sm text-red-400">Common reasons:</p>
            <ul className="text-xs text-gray-400 space-y-1 mt-2">
              <li>• Blurry or unclear document photos</li>
              <li>• Document expired</li>
              <li>• Information doesn't match</li>
            </ul>
          </div>
        )}

        {/* Actions */}
        <div className="space-y-3">
          {status === "pending" && (
            <Link href="/dashboard">
              <button className="w-full py-3 bg-[#2b2d33] text-white rounded-xl hover:bg-[#3b3d43] transition">
                Go to Dashboard
              </button>
            </Link>
          )}

          {status === "approved" && (
            <Link href="/trade/BTCUSDT">
              <button className="w-full py-3 bg-yellow-500 text-black font-bold rounded-xl hover:bg-yellow-400 transition">
                Start Trading Now
              </button>
            </Link>
          )}

          {status === "rejected" && (
            <Link href="/kyc">
              <button className="w-full py-3 bg-yellow-500 text-black font-bold rounded-xl hover:bg-yellow-400 transition">
                Retry Verification
              </button>
            </Link>
          )}
        </div>

        <p className="text-xs text-gray-500">
          Need help?{" "}
          <Link href="/support" className="text-yellow-400 hover:text-yellow-300">
            Contact Support
          </Link>
        </p>
      </div>
    </div>
  );
}
