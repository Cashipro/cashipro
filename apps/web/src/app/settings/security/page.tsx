"use client";

import { useState } from "react";
import Link from "next/link";

export default function SecurityPage() {
  const [twoFA, setTwoFA] = useState(false);
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [whitelist, setWhitelist] = useState(["192.168.1.1", "10.0.0.1"]);

  return (
    <div className="min-h-screen bg-black p-4">
      <div className="max-w-3xl mx-auto space-y-6">
        <div className="flex items-center gap-3">
          <Link href="/settings" className="text-gray-400 hover:text-white">← Back</Link>
          <h1 className="text-2xl font-bold text-white">🔒 Security</h1>
        </div>

        <div className="bg-[#1a1a1a] rounded-xl border border-[#2b2d33] p-6 space-y-4">
          <h3 className="text-white font-bold">Two-Factor Authentication</h3>
          <p className="text-sm text-gray-500">Add an extra layer of security to your account</p>
          <button
            onClick={() => setTwoFA(!twoFA)}
            className={`px-6 py-2.5 rounded-xl font-bold transition ${
              twoFA ? "bg-green-500 text-white" : "bg-[#2b2d33] text-gray-400"
            }`}
          >
            {twoFA ? "✅ Enabled" : "Enable 2FA"}
          </button>
        </div>

        <div className="bg-[#1a1a1a] rounded-xl border border-[#2b2d33] p-6 space-y-4">
          <h3 className="text-white font-bold">Email Alerts</h3>
          <p className="text-sm text-gray-500">Receive security alerts via email</p>
          <button
            onClick={() => setEmailAlerts(!emailAlerts)}
            className={`px-6 py-2.5 rounded-xl font-bold transition ${
              emailAlerts ? "bg-green-500 text-white" : "bg-[#2b2d33] text-gray-400"
            }`}
          >
            {emailAlerts ? "✅ Enabled" : "Enable Alerts"}
          </button>
        </div>

        <div className="bg-[#1a1a1a] rounded-xl border border-[#2b2d33] p-6 space-y-4">
          <h3 className="text-white font-bold">IP Whitelist</h3>
          <p className="text-sm text-gray-500">Only allow access from these IP addresses</p>
          <div className="space-y-2">
            {whitelist.map((ip, i) => (
              <div key={i} className="flex items-center justify-between bg-black/50 rounded-lg px-4 py-2">
                <span className="text-white">{ip}</span>
                <button className="text-red-400 text-sm">Remove</button>
              </div>
            ))}
          </div>
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Add IP address"
              className="flex-1 bg-black border border-[#2b2d33] rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-yellow-400"
            />
            <button className="px-4 py-3 bg-yellow-500 text-black font-bold rounded-xl hover:bg-yellow-400 transition">
              Add
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
