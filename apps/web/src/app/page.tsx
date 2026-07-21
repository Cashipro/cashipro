"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

export default function HomePage() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      setScrolled(window.scrollY > 50);
    });
    return () => window.removeEventListener("scroll", () => {});
  }, []);

  return (
    <div className="min-h-screen bg-black text-white">
      {/* ===== NAVBAR ===== */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-black/90 backdrop-blur-lg border-b border-[#2b2d33]" : "bg-transparent"
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="w-9 h-9 bg-yellow-500 rounded-lg flex items-center justify-center text-black font-bold text-lg">
              C
            </div>
            <span className="text-xl font-bold text-white">CashiPro</span>
            <span className="text-xs text-gray-500 hidden sm:block">Exchange</span>
          </Link>

          {/* Nav Links - Desktop */}
          <div className="hidden md:flex items-center gap-8">
            <Link href="/markets" className="text-gray-400 hover:text-white text-sm transition">Markets</Link>
            <Link href="/trade/BTCUSDT" className="text-gray-400 hover:text-white text-sm transition">Trade</Link>
            <Link href="/futures" className="text-gray-400 hover:text-white text-sm transition">Futures</Link>
            <Link href="/dashboard" className="text-gray-400 hover:text-white text-sm transition">Dashboard</Link>
          </div>

          {/* Auth Buttons */}
          <div className="flex items-center gap-3">
            <Link href="/login" className="text-gray-400 hover:text-white text-sm transition hidden sm:block">
              Sign In
            </Link>
            <Link href="/register">
              <button className="px-5 py-2 bg-yellow-500 text-black font-bold rounded-xl hover:bg-yellow-400 transition-all text-sm">
                Get Started
              </button>
            </Link>
          </div>
        </div>
      </nav>

      {/* ===== HERO SECTION ===== */}
      <section className="pt-32 pb-20 px-4 text-center relative overflow-hidden">
        {/* Background Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-yellow-500/10 rounded-full blur-3xl -z-10"></div>
        
        <div className="max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-[#2b2d33] px-4 py-2 rounded-full text-sm text-gray-400 mb-6">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
            <span>Zero Fees • Instant Trading • 100+ Assets</span>
          </div>

          <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold leading-tight">
            Trade Crypto
            <br />
            <span className="bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent">
              With Confidence
            </span>
          </h1>

          <p className="text-gray-400 text-lg sm:text-xl mt-6 max-w-2xl mx-auto">
            The most advanced crypto trading platform. Zero fees, lightning-fast execution, 
            and professional-grade tools.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 mt-8">
            <Link href="/register">
              <button className="px-8 py-4 bg-yellow-500 text-black font-bold rounded-xl hover:bg-yellow-400 transition-all transform hover:scale-105 text-lg">
                Start Trading Now
              </button>
            </Link>
            <Link href="/markets">
              <button className="px-8 py-4 bg-[#2b2d33] text-white font-bold rounded-xl hover:bg-[#3b3d43] transition-all text-lg">
                View Markets
              </button>
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12 max-w-3xl mx-auto">
            <div className="bg-[#1a1a1a] p-4 rounded-xl border border-[#2b2d33]">
              <p className="text-2xl font-bold text-white">$1.2B+</p>
              <p className="text-xs text-gray-500">24h Volume</p>
            </div>
            <div className="bg-[#1a1a1a] p-4 rounded-xl border border-[#2b2d33]">
              <p className="text-2xl font-bold text-white">100+</p>
              <p className="text-xs text-gray-500">Trading Pairs</p>
            </div>
            <div className="bg-[#1a1a1a] p-4 rounded-xl border border-[#2b2d33]">
              <p className="text-2xl font-bold text-white">10k+</p>
              <p className="text-xs text-gray-500">Active Traders</p>
            </div>
            <div className="bg-[#1a1a1a] p-4 rounded-xl border border-[#2b2d33]">
              <p className="text-2xl font-bold text-yellow-400">0%</p>
              <p className="text-xs text-gray-500">Maker Fees</p>
            </div>
          </div>
        </div>
      </section>

      {/* ===== FEATURES ===== */}
      <section className="py-16 px-4 border-t border-[#2b2d33]">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-white text-center mb-12">
            Why Choose <span className="text-yellow-400">CashiPro</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-[#1a1a1a] p-6 rounded-xl border border-[#2b2d33] hover:border-yellow-500/50 transition-all group">
              <div className="w-12 h-12 bg-yellow-500/10 rounded-xl flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-all">
                🔒
              </div>
              <h3 className="text-lg font-bold text-white">Bank-Grade Security</h3>
              <p className="text-gray-400 text-sm mt-2">
                Multi-layer security with 2FA, cold storage, and real-time monitoring.
              </p>
            </div>

            <div className="bg-[#1a1a1a] p-6 rounded-xl border border-[#2b2d33] hover:border-yellow-500/50 transition-all group">
              <div className="w-12 h-12 bg-yellow-500/10 rounded-xl flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-all">
                ⚡
              </div>
              <h3 className="text-lg font-bold text-white">Lightning Fast</h3>
              <p className="text-gray-400 text-sm mt-2">
                Orders matched in milliseconds with our high-performance matching engine.
              </p>
            </div>

            <div className="bg-[#1a1a1a] p-6 rounded-xl border border-[#2b2d33] hover:border-yellow-500/50 transition-all group">
              <div className="w-12 h-12 bg-yellow-500/10 rounded-xl flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-all">
                📊
              </div>
              <h3 className="text-lg font-bold text-white">Advanced Tools</h3>
              <p className="text-gray-400 text-sm mt-2">
                Professional charts, indicators, and real-time market data at your fingertips.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ===== CTA SECTION ===== */}
      <section className="py-16 px-4 border-t border-[#2b2d33] bg-gradient-to-b from-black to-[#1a1a1a]">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Start Trading?
          </h2>
          <p className="text-gray-400 text-lg mb-8">
            Join thousands of traders who trust CashiPro for their crypto trading.
          </p>
          <Link href="/register">
            <button className="px-10 py-4 bg-yellow-500 text-black font-bold rounded-xl hover:bg-yellow-400 transition-all transform hover:scale-105 text-lg">
              Create Free Account
            </button>
          </Link>
          <p className="text-xs text-gray-500 mt-4">No credit card required • Free forever</p>
        </div>
      </section>

      {/* ===== FOOTER ===== */}
      <footer className="py-8 px-4 border-t border-[#2b2d33]">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="text-sm font-bold text-white">CashiPro</span>
            <span className="text-xs text-gray-500">© 2025</span>
          </div>
          <div className="flex items-center gap-6 text-sm text-gray-500">
            <Link href="/terms" className="hover:text-white transition">Terms</Link>
            <Link href="/privacy" className="hover:text-white transition">Privacy</Link>
            <Link href="/support" className="hover:text-white transition">Support</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
