"use client";

import { useState } from "react";
import Link from "next/link";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);

  return (
    <div className="min-h-screen flex items-center justify-center bg-black p-4">
      <div className="bg-[#1a1a1a] p-8 rounded-2xl border border-[#2b2d33] w-full max-w-md">
        <div className="text-center mb-8">
          <div className="w-12 h-12 bg-yellow-500 rounded-xl mx-auto flex items-center justify-center text-2xl font-bold text-black mb-3">
            C
          </div>
          <h1 className="text-2xl font-bold text-white">Welcome Back</h1>
          <p className="text-sm text-gray-500 mt-1">Sign in to your account</p>
        </div>

        <form className="space-y-4">
          <div>
            <label className="text-sm text-gray-400 block mb-1.5">Email Address</label>
            <input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-black border border-[#2b2d33] rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-yellow-400 transition-colors"
            />
          </div>

          <div>
            <label className="text-sm text-gray-400 block mb-1.5">Password</label>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-black border border-[#2b2d33] rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-yellow-400 transition-colors"
            />
          </div>

          <div className="flex items-center justify-between">
            <label className="flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={remember}
                onChange={(e) => setRemember(e.target.checked)}
                className="w-4 h-4 rounded border-[#2b2d33] bg-black text-yellow-400 focus:ring-yellow-400 focus:ring-offset-0"
              />
              <span className="ml-2 text-sm text-gray-400">Remember me</span>
            </label>
            <Link href="/forgot-password" className="text-sm text-yellow-400 hover:text-yellow-300 transition">
              Forgot password?
            </Link>
          </div>

          <button className="w-full bg-yellow-500 text-black font-bold py-3 rounded-xl hover:bg-yellow-400 transition-all transform hover:scale-[1.02] active:scale-[0.98]">
            Sign In
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-400">
            Don't have an account?{" "}
            <Link href="/register" className="text-yellow-400 hover:text-yellow-300 font-medium transition">
              Create Account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
