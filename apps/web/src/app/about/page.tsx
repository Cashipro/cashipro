"use client";

import Link from "next/link";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-black p-4">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="flex items-center gap-3">
          <Link href="/" className="text-gray-400 hover:text-white">← Home</Link>
          <h1 className="text-2xl font-bold text-white">ℹ️ About Us</h1>
        </div>

        <div className="bg-[#1a1a1a] rounded-xl border border-[#2b2d33] p-6 space-y-4">
          <h2 className="text-xl font-bold text-white">CashiPro</h2>
          <p className="text-gray-400">The future of crypto trading.</p>
          <p className="text-gray-400 text-sm">Founded in 2025, we provide secure, fast, and reliable crypto trading.</p>
          <h3 className="text-white font-bold mt-4">Mission</h3>
          <p className="text-gray-400 text-sm">To make crypto trading accessible, secure, and profitable for everyone.</p>
          <h3 className="text-white font-bold mt-4">Vision</h3>
          <p className="text-gray-400 text-sm">To become the world's leading crypto exchange.</p>
          <div className="flex gap-4 mt-4">
            <Link href="/contact"><button className="px-4 py-2 bg-yellow-500 text-black rounded-xl hover:bg-yellow-400">Contact</button></Link>
            <Link href="/support"><button className="px-4 py-2 bg-[#2b2d33] text-white rounded-xl hover:bg-[#3b3d43]">Support</button></Link>
          </div>
        </div>
      </div>
    </div>
  );
}
