"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function KYCStatusPage() {
  const [status, setStatus] = useState<"pending" | "approved" | "rejected">("pending");

  useEffect(() => {
    // Simulate status check from backend
    const timer = setTimeout(() => {
      setStatus("pending");
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-black p-4 flex items-center justify-center">
      <div className="max-w-md w-full bg-[#1a1a1a] rounded-xl border border-[#2b2d33] p-8 text-center space-y-6">
        {status === "pending" && (
          <>
            <div className="w-20 h-20 bg-yellow-500/20 rounded-full flex items-center justify-center text-4xl mx-auto animate-pulse">
              ⏳
            </div>
            <h2 className="text-2xl font-bold text-white">Verification In Progress</h2>
            <p className="text-gray-400 text-sm">
              We're reviewing your documents. This usually takes 1-2 business days.
            </p>
            <div className="bg-black/50 rounded-xl p-4">
              <div className="h-1.5 bg-[#2b2d33] rounded-full overflow-hidden">
                <div className="h-full bg-yellow-500 rounded-full w-2/3 animate-pulse" />
              </div>
              <p className="text-xs text-gray-500 mt-2">Estimated time: 1-2 days</p>
            </div>
            <Link href="/dashboard">
              <button className="w-full py-3 bg-[#2b2d33] text-white rounded-xl hover:bg-[#3b3d43] transition">
                Go to Dashboard
              </button>
            </Link>
          </>
        )}

        {status === "approved" && (
          <>
            <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center text-4xl mx-auto">
              ✅
            </div>
            <h2 className="text-2xl font-bold text-green-500">Verification Approved!</h2>
            <p className="text-gray-400 text-sm">
              Your identity has been verified. You now have full access to all features.
            </p>
            <div className="bg-green-500/10 border border-green-500/20 rounded-xl p-4">
              <p className="text-sm text-green-400">✅ Trading limits: Unlimited</p>
              <p className="text-sm text-green-400">✅ Withdrawals: Up to 500 BTC/day</p>
              <p className="text-sm text-green-400">✅ Fiat services: Enabled</p>
            </div>
            <Link href="/trade/BTCUSDT">
              <button className="w-full py-3 bg-yellow-500 text-black font-bold rounded-xl hover:bg-yellow-400 transition">
                Start Trading Now
              </button>
            </Link>
          </>
        )}

        {status === "rejected" && (
          <>
            <div className="w-20 h-20 bg-red-500/20 rounded-full flex items-center justify-center text-4xl mx-auto">
              ❌
            </div>
            <h2 className="text-2xl font-bold text-red-500">Verification Failed</h2>
            <p className="text-gray-400 text-sm">
              We couldn't verify your identity. Please check your documents and try again.
            </p>
            <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4 text-left">
              <p className="text-sm text-red-400">Common reasons:</p>
              <ul className="text-xs text-gray-400 space-y-1 mt-2">
                <li>• Blurry or unclear document photos</li>
                <li>• Document expired</li>
                <li>• Information doesn't match</li>
              </ul>
            </div>
            <Link href="/kyc">
              <button className="w-full py-3 bg-yellow-500 text-black font-bold rounded-xl hover:bg-yellow-400 transition">
                Retry Verification
              </button>
            </Link>
          </>
        )}
      </div>
    </div>
  );
}
