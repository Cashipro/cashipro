"use client";

import { useState } from "react";
import Link from "next/link";

export default function TwoFactorPage() {
  const [code, setCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsLoading(false);
    window.location.href = "/dashboard";
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black p-4">
      <div className="bg-[#1a1a1a] p-8 rounded-2xl border border-[#2b2d33] w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="w-12 h-12 bg-yellow-500 rounded-xl mx-auto flex items-center justify-center text-2xl font-bold text-black mb-3">
            C
          </div>
          <h1 className="text-2xl font-bold text-white">Two-Factor Authentication</h1>
          <p className="text-sm text-gray-500 mt-1">Enter the code from your authenticator app</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-sm text-gray-400 block mb-1.5">6-Digit Code</label>
            <input
              type="text"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="000000"
              maxLength={6}
              className="w-full bg-black border border-[#2b2d33] rounded-xl px-4 py-3 text-white placeholder-gray-500 text-center text-2xl font-mono focus:outline-none focus:border-yellow-400 transition"
              required
            />
          </div>

          <button
            type="submit"
            disabled={isLoading || code.length < 6}
            className="w-full py-3 bg-yellow-500 text-black font-bold rounded-xl hover:bg-yellow-400 transition-all disabled:opacity-50"
          >
            {isLoading ? "Verifying..." : "Verify"}
          </button>

          <div className="text-center">
            <p className="text-sm text-gray-400">
              Lost your authenticator?{" "}
              <Link href="/support" className="text-yellow-400 hover:text-yellow-300">
                Contact Support
              </Link>
            </p>
          </div>

          <div className="text-center">
            <Link href="/login" className="text-sm text-gray-500 hover:text-white transition">
              ← Back to Login
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
