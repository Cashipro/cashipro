"use client";

import Link from "next/link";

const events = [
  { id: 1, name: "BTC Trading Competition", prize: "$10,000", status: "Active", endDate: "2025-02-15", participants: 2450 },
  { id: 2, name: "Referral Challenge", prize: "$5,000", status: "Upcoming", endDate: "2025-03-01", participants: 0 },
  { id: 3, name: "Staking Marathon", prize: "$8,000", status: "Active", endDate: "2025-02-28", participants: 1800 },
  { id: 4, name: "Holiday Special", prize: "$15,000", status: "Ended", endDate: "2025-01-01", participants: 3200 },
];

export default function EventCenterPage() {
  return (
    <div className="min-h-screen bg-black p-4">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="flex items-center gap-3">
          <Link href="/settings" className="text-gray-400 hover:text-white">← Back</Link>
          <h1 className="text-2xl font-bold text-white">🎯 Event Center</h1>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { label: "Active Events", value: "2", color: "text-green-500" },
            { label: "Total Prize", value: "$25,000", color: "text-yellow-400" },
            { label: "Participants", value: "5,450", color: "text-blue-500" },
          ].map((stat) => (
            <div key={stat.label} className="bg-[#1a1a1a] rounded-xl border border-[#2b2d33] p-4 text-center">
              <p className="text-sm text-gray-500">{stat.label}</p>
              <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
            </div>
          ))}
        </div>

        {events.map((event) => (
          <div key={event.id} className="bg-[#1a1a1a] rounded-xl border border-[#2b2d33] p-4 hover:border-yellow-500/50 transition-all">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <h3 className="text-white font-bold">{event.name}</h3>
                <p className="text-sm text-gray-500">Ends: {event.endDate} • {event.participants} participants</p>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-yellow-400 font-bold">{event.prize}</span>
                <span className={`text-xs px-2 py-1 rounded ${
                  event.status === "Active" ? "bg-green-500/10 text-green-500" :
                  event.status === "Upcoming" ? "bg-yellow-500/10 text-yellow-400" :
                  "bg-gray-500/10 text-gray-400"
                }`}>
                  {event.status}
                </span>
                {event.status !== "Ended" && (
                  <button className="px-4 py-1.5 bg-yellow-500 text-black text-sm rounded hover:bg-yellow-400 transition">
                    Join
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
