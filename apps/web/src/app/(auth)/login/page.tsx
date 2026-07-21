"use client";

import { useState } from "react";
import Link from "next/link";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="min-h-screen flex items-center justify-center bg-black">
      <div className="bg-[#1a1a1a] p-8 rounded-xl border border-gray-800 w-full max-w-md">
        <h1 className="text-2xl font-bold text-white mb-6">Sign In</h1>
        <input
          type="email"
          placeholder="Email"
          className="w-full bg-black border border-gray-800 rounded-lg px-4 py-3 text-white mb-4"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full bg-black border border-gray-800 rounded-lg px-4 py-3 text-white mb-6"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="w-full bg-yellow-500 text-black font-bold py-3 rounded-lg hover:bg-yellow-400">
          Sign In
        </button>
        <p className="text-gray-400 text-sm mt-4 text-center">
          Don't have an account? <Link href="/register" className="text-yellow-400">Register</Link>
        </p>
      </div>
    </div>
  );
}
