// apps/web/src/app/page.tsx
'use client';

import React, { useState, useEffect } from 'react';
import { ArrowRight, TrendingUp, Users, Award } from 'lucide-react';

export default function CashiProLanding() {
  const [timeLeft, setTimeLeft] = useState({
    hours: 47,
    minutes: 59,
    seconds: 54
  });

  // Countdown timer
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        let { hours, minutes, seconds } = prev;
        
        seconds--;
        if (seconds < 0) {
          seconds = 59;
          minutes--;
          if (minutes < 0) {
            minutes = 59;
            hours--;
            if (hours < 0) {
              hours = 47;
            }
          }
        }
        return { hours, minutes, seconds };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const trendingTokens = [
    { symbol: 'BTC', name: 'Bitcoin', price: '66,326.55', change: '-0.54%', icon: '₿', color: 'orange' },
    { symbol: 'ETH', name: 'Ethereum', price: '1,929.42', change: '-0.12%', icon: '⟠', color: 'blue' },
    { symbol: 'GOLD', name: 'Gold (XAUT)', price: '4,121.43', change: '+1.23%', icon: '🏅', color: 'amber' },
    { symbol: 'SOL', name: 'Solana', price: '142.85', change: '+2.45%', icon: '◎', color: 'purple' },
  ];

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      {/* Navigation Header - Desktop + Mobile */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 bg-gradient-to-br from-blue-500 via-purple-500 to-cyan-400 rounded-full flex items-center justify-center font-bold text-2xl">
                💰
              </div>
              <div className="font-bold text-2xl tracking-tighter">CASHIPRO</div>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8 text-sm">
              <a href="#" className="hover:text-cyan-400 transition-colors">Buy Crypto</a>
              <a href="#" className="hover:text-cyan-400 transition-colors">Markets</a>
              <a href="#" className="hover:text-cyan-400 transition-colors">Spot</a>
              <a href="#" className="text-cyan-400 font-medium">Futures</a>
              <a href="#" className="hover:text-cyan-400 transition-colors">Earn</a>
              <a href="#" className="hover:text-cyan-400 transition-colors">Event Center</a>
              <a href="#" className="hover:text-cyan-400 transition-colors">Rewards Hub</a>
            </div>

            {/* Right Side */}
            <div className="flex items-center gap-4">
              <div className="hidden md:flex items-center bg-zinc-900 rounded-full px-4 py-1.5 text-sm border border-white/10">
                <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse mr-2"></div>
                NBIS
              </div>
              
              <button className="hidden md:block px-6 py-2 text-sm font-medium hover:bg-white/5 rounded-full transition-colors">
                Log In
              </button>
              <button className="bg-white text-black px-6 py-2 rounded-full font-semibold hover:bg-cyan-400 hover:text-black transition-all">
                Sign Up
              </button>

              {/* Mobile Menu */}
              <button className="md:hidden text-2xl">☰</button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative pt-16 min-h-[100dvh] flex items-center bg-black">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-[radial-gradient(at_center,#3b82f610_0%,transparent_70%)]"></div>
        
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="inline-flex items-center gap-2 bg-white/5 text-sm px-4 py-2 rounded-full border border-white/10">
                <Award className="w-4 h-4 text-yellow-400" />
                <span>New Users Get <span className="text-emerald-400 font-bold">$10,000 USDT</span></span>
              </div>

              <h1 className="text-6xl md:text-7xl font-bold leading-none tracking-tighter">
                CASHIPRO YOUR<br />
                MOST TRENDING<br />
                <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-500 bg-clip-text text-transparent">TOKENS</span>
              </h1>

              <p className="text-xl text-zinc-400 max-w-md">
                Trade across 1,765 Spot pairs &amp; 1,009 Futures pairs with lightning speed
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <button 
                  onClick={() => window.scrollTo({ top: 800, behavior: 'smooth' })}
                  className="group bg-white text-black px-8 py-4 rounded-2xl font-semibold flex items-center justify-center gap-3 hover:bg-cyan-400 hover:text-black transition-all text-lg"
                >
                  Sign Up &amp; Get 10,000 USDT
                  <ArrowRight className="group-hover:translate-x-1 transition" />
                </button>
                
                <button className="border border-white/30 hover:bg-white/5 px-8 py-4 rounded-2xl font-medium transition-all">
                  Watch Demo
                </button>
              </div>

              <div className="flex items-center gap-8 text-sm text-zinc-400 pt-4">
                <div className="flex items-center gap-2">
                  <div className="flex -space-x-2">
                    <div className="w-6 h-6 bg-blue-500 rounded-full border-2 border-black"></div>
                    <div className="w-6 h-6 bg-purple-500 rounded-full border-2 border-black"></div>
                  </div>
                  <span>2.4M+ Traders</span>
                </div>
                <div>24/7 Support</div>
              </div>
            </div>

            {/* Floating Coins - Desktop Hero Visual */}
            <div className="relative hidden lg:block h-[520px]">
              <div className="absolute left-1/4 top-12 w-32 h-32 bg-gradient-to-br from-zinc-800 to-black border border-white/20 rounded-3xl flex items-center justify-center rotate-[-12deg] shadow-2xl shadow-cyan-500/20">
                <div className="text-6xl">𝕏</div>
              </div>

              <div className="absolute right-12 top-40 w-40 h-40 bg-gradient-to-br from-purple-900/80 to-black border border-white/30 rounded-full flex items-center justify-center shadow-2xl shadow-purple-500/30">
                <div className="text-7xl">⟠</div>
              </div>

              <div className="absolute left-1/3 bottom-20 w-48 h-48 bg-gradient-to-br from-blue-900 to-zinc-900 border-4 border-cyan-400/60 rounded-full flex items-center justify-center shadow-[0_0_80px_-10px] shadow-cyan-400">
                <div className="text-8xl font-black tracking-tighter">C</div>
              </div>

              <div className="absolute right-1/4 bottom-12 bg-white/10 backdrop-blur-xl px-5 py-3 rounded-2xl border border-white/20 flex items-center gap-3">
                <div className="text-4xl">💎</div>
                <div>
                  <div className="text-emerald-400 text-sm font-medium">10,000 USDT</div>
                  <div className="text-xs text-zinc-400">Welcome Bonus</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Prompt */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-xs text-zinc-500">
          SCROLL TO EXPLORE
          <div className="w-px h-12 bg-gradient-to-b from-transparent via-white/30 to-transparent"></div>
        </div>
      </div>

      {/* Mobile Rewards Banner (Prominent like second screenshot) */}
      <div className="lg:hidden bg-gradient-to-r from-purple-900/50 to-cyan-900/50 border-y border-white/10 py-8 px-6">
        <div className="max-w-md mx-auto text-center">
          <div className="flex justify-center mb-6">
            <div className="relative">
              <div className="w-24 h-24 bg-gradient-to-br from-blue-400 to-purple-600 rounded-3xl flex items-center justify-center shadow-xl">
                <span className="text-5xl">💰</span>
              </div>
              <div className="absolute -top-3 -right-3 bg-emerald-500 text-xs font-bold px-3 py-1 rounded-full">NEW</div>
            </div>
          </div>

          <h2 className="text-4xl font-bold mb-2">$10,000 New User Rewards</h2>
          <div className="text-emerald-400 flex items-center justify-center gap-2 mb-8">
            Ends in {timeLeft.hours.toString().padStart(2, '0')}:{timeLeft.minutes.toString().padStart(2, '0')}:{timeLeft.seconds.toString().padStart(2, '0')}
          </div>

          <button className="w-full bg-white text-black py-4 rounded-2xl font-semibold text-lg active:scale-[0.985] transition-all">
            Sign Up Now
          </button>
        </div>
      </div>

      {/* Trending Tokens Section */}
      <div className="max-w-7xl mx-auto px-6 py-20">
        <div className="flex items-end justify-between mb-10">
          <div>
            <div className="uppercase tracking-[3px] text-xs text-cyan-400 mb-2">LIVE MARKET</div>
            <h2 className="text-5xl font-bold">Most Trending Tokens</h2>
          </div>
          <div className="hidden md:flex gap-2">
            <button className="px-6 py-2 bg-white/5 rounded-full text-sm border border-white/10 hover:border-white/40 transition">Hot</button>
            <button className="px-6 py-2 hover:bg-white/5 rounded-full text-sm transition">Gainers</button>
            <button className="px-6 py-2 hover:bg-white/5 rounded-full text-sm transition">New</button>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {trendingTokens.map((token, index) => (
            <div key={index} className="bg-zinc-950 border border-white/10 rounded-3xl p-6 hover:border-cyan-400/30 group transition-all hover:-translate-y-1">
              <div className="flex justify-between items-start">
                <div className={`text-5xl mb-6 ${token.color === 'orange' ? 'text-orange-500' : token.color === 'blue' ? 'text-blue-500' : 'text-amber-400'}`}>
                  {token.icon}
                </div>
                <div className={`text-xs px-3 py-1 rounded-full ${token.change.startsWith('+') ? 'bg-emerald-500/10 text-emerald-400' : 'bg-red-500/10 text-red-400'}`}>
                  {token.change}
                </div>
              </div>
              
              <div>
                <div className="font-mono text-2xl font-semibold tracking-tight">{token.symbol}/USDT</div>
                <div className="text-3xl font-bold mt-1 tabular-nums">{token.price}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Features */}
      <div className="bg-zinc-950 py-20 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Why Traders Love CashiPro</h2>
            <p className="text-zinc-400 max-w-md mx-auto">Built for speed, security, and serious traders</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: "⚡", title: "Lightning Fast", desc: "Sub-millisecond order execution" },
              { icon: "🔒", title: "Bank-Grade Security", desc: "Cold storage + 2FA + insurance fund" },
              { icon: "📊", title: "Advanced Tools", desc: "TradingView charts, 100x leverage" }
            ].map((feature, i) => (
              <div key={i} className="bg-black border border-white/10 p-8 rounded-3xl group hover:border-cyan-400/50 transition">
                <div className="text-6xl mb-8 opacity-80 group-hover:scale-110 transition">{feature.icon}</div>
                <h3 className="text-2xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-zinc-400">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer CTA */}
      <div className="bg-black py-20 border-t border-white/10">
        <div className="max-w-2xl mx-auto text-center px-6">
          <div className="text-4xl font-bold mb-6">Ready to start trading?</div>
          <p className="text-lg text-zinc-400 mb-10">Join thousands of traders getting rewarded for trading on CashiPro</p>
          
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input 
              type="text" 
              placeholder="Email or Phone Number" 
              className="bg-zinc-900 border border-white/10 focus:border-cyan-400 rounded-2xl px-6 py-4 flex-1 outline-none"
            />
            <button className="bg-white text-black px-10 py-4 rounded-2xl font-semibold hover:bg-cyan-400 whitespace-nowrap">
              Sign Up Free
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Navigation (Mobile) */}
      <div className="fixed bottom-0 left-0 right-0 bg-black border-t border-white/10 md:hidden z-50">
        <div className="flex items-center justify-around py-3 text-xs">
          <div className="flex flex-col items-center text-cyan-400">
            <div>🏠</div>
            <div>Home</div>
          </div>
          <div className="flex flex-col items-center">
            <div>📈</div>
            <div>Markets</div>
          </div>
          <div className="flex flex-col items-center -mt-8">
            <div className="w-14 h-14 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-2xl flex items-center justify-center shadow-xl shadow-cyan-500/50 text-3xl">💱</div>
          </div>
          <div className="flex flex-col items-center">
            <div>📉</div>
            <div>Futures</div>
          </div>
          <div className="flex flex-col items-center">
            <div>💼</div>
            <div>Assets</div>
          </div>
        </div>
      </div>
    </div>
  );
}
