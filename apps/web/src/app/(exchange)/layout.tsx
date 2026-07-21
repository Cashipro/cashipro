"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { label: "Dashboard", href: "/dashboard", icon: "📊" },
  { label: "Markets", href: "/markets", icon: "📈" },
  { label: "Trade", href: "/trade/BTCUSDT", icon: "💰" },
  { label: "Futures", href: "/futures", icon: "🚀" },
  { label: "Wallet", href: "/wallet", icon: "💳" },
];

export default function ExchangeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="flex h-screen bg-black text-white">
      {/* Sidebar - MEXC Style */}
      <aside className={`${sidebarOpen ? 'w-64' : 'w-20'} bg-[#1a1a1a] border-r border-gray-800 transition-all duration-300`}>
        <div className="flex items-center gap-2 p-4 border-b border-gray-800">
          <span className="text-2xl font-bold text-yellow-400">C</span>
          {sidebarOpen && <span className="text-xl font-bold text-white">CashiPro</span>}
        </div>

        <nav className="p-4 space-y-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href || pathname.startsWith(item.href + '/');
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  isActive ? 'bg-yellow-500/10 text-yellow-400' : 'text-gray-400 hover:bg-gray-800 hover:text-white'
                }`}
              >
                <span>{item.icon}</span>
                {sidebarOpen && <span className="text-sm font-medium">{item.label}</span>}
              </Link>
            );
          })}
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Bar */}
        <header className="flex items-center justify-between px-6 py-3 bg-[#1a1a1a] border-b border-gray-800">
          <div className="flex items-center gap-4">
            <button onClick={() => setSidebarOpen(!sidebarOpen)} className="text-gray-400 hover:text-white">
              ☰
            </button>
            <div className="text-sm text-gray-400">
              BTC/USDT <span className="text-green-500 ml-2">$65,432.50</span>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button className="text-gray-400 hover:text-white">🔔</button>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-yellow-500 flex items-center justify-center text-black font-bold">
                T
              </div>
              <span className="text-sm text-white">Trader</span>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-4 bg-black">
          {children}
        </main>
      </div>
    </div>
  );
}
