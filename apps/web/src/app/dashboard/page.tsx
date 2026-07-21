"use client";

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-black p-4">
      <h1 className="text-2xl font-bold text-white mb-6">Dashboard</h1>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-[#1a1a1a] p-4 rounded-xl border border-gray-800">
          <p className="text-sm text-gray-400">Balance</p>
          <p className="text-xl font-bold text-white">$12,543</p>
        </div>
        <div className="bg-[#1a1a1a] p-4 rounded-xl border border-gray-800">
          <p className="text-sm text-gray-400">24h Volume</p>
          <p className="text-xl font-bold text-white">$3,245</p>
        </div>
        <div className="bg-[#1a1a1a] p-4 rounded-xl border border-gray-800">
          <p className="text-sm text-gray-400">Open Orders</p>
          <p className="text-xl font-bold text-white">3</p>
        </div>
        <div className="bg-[#1a1a1a] p-4 rounded-xl border border-gray-800">
          <p className="text-sm text-gray-400">P/L</p>
          <p className="text-xl font-bold text-green-500">+$1,234</p>
        </div>
      </div>
    </div>
  );
}
