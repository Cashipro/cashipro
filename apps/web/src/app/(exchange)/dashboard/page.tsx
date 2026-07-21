"use client";

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-white">Dashboard</h1>

      {/* Stats - MEXC Style */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-[#1a1a1a] p-4 rounded-xl border border-gray-800">
          <p className="text-sm text-gray-400">Total Balance</p>
          <p className="text-2xl font-bold text-white mt-1">$12,543.75</p>
          <p className="text-xs text-green-500 mt-1">+2.5% today</p>
        </div>
        <div className="bg-[#1a1a1a] p-4 rounded-xl border border-gray-800">
          <p className="text-sm text-gray-400">24h Volume</p>
          <p className="text-2xl font-bold text-white mt-1">$3,245.80</p>
          <p className="text-xs text-green-500 mt-1">+12.3%</p>
        </div>
        <div className="bg-[#1a1a1a] p-4 rounded-xl border border-gray-800">
          <p className="text-sm text-gray-400">Open Orders</p>
          <p className="text-2xl font-bold text-white mt-1">3</p>
          <p className="text-xs text-yellow-400 mt-1">2 limit, 1 market</p>
        </div>
        <div className="bg-[#1a1a1a] p-4 rounded-xl border border-gray-800">
          <p className="text-sm text-gray-400">Profit/Loss</p>
          <p className="text-2xl font-bold text-green-500 mt-1">+$1,234.50</p>
          <p className="text-xs text-green-500 mt-1">+42.8% all time</p>
        </div>
      </div>

      {/* Quick Trade */}
      <div className="bg-[#1a1a1a] p-6 rounded-xl border border-gray-800">
        <h2 className="text-lg font-bold text-white mb-4">Quick Trade</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <input type="text" placeholder="Amount" className="bg-black border border-gray-800 rounded-lg px-4 py-3 text-white" />
          <button className="bg-green-500 text-white rounded-lg py-3 font-medium">Buy</button>
          <button className="bg-red-500 text-white rounded-lg py-3 font-medium">Sell</button>
        </div>
      </div>
    </div>
  );
}
