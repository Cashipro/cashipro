"use client";

import { useState } from "react";
import Link from "next/link";

export default function SecurityPage() {
  const [twoFA, setTwoFA] = useState(false);
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [whitelist, setWhitelist] = useState(["192.168.1.1", "10.0.0.1"]);
  const [newIp, setNewIp] = useState("");

  const handleAddIp = () => {
    if (newIp && !whitelist.includes(newIp)) {
      setWhitelist([...whitelist, newIp]);
      setNewIp("");
    }
  };

  const handleRemoveIp = (ip: string) => {
    setWhitelist(whitelist.filter((i) => i !== ip));
  };

  return (
    <div className="min-h-screen bg-black p-4">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center gap-3">
          <Link href="/" className="text-gray-400 hover:text-white">← Home</Link>
          <h1 className="text-2xl font-bold text-white">🔒 Security</h1>
        </div>

        {/* Two-Factor Authentication */}
        <div className="bg-[#1a1a1a] rounded-xl border border-[#2b2d33] p-6 space-y-4">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="text-white font-bold">Two-Factor Authentication</h3>
              <p className="text-sm text-gray-500">Add an extra layer of security to your account</p>
            </div>
            <button
              onClick={() => setTwoFA(!twoFA)}
              className={`px-6 py-2.5 rounded-xl font-bold transition ${
                twoFA ? "bg-green-500 text-white" : "bg-[#2b2d33] text-gray-400 hover:text-white"
              }`}
            >
              {twoFA ? "✅ Enabled" : "Enable 2FA"}
            </button>
          </div>
          {twoFA && (
            <div className="bg-black/50 rounded-xl p-4">
              <p className="text-sm text-yellow-400">🔐 2FA is enabled on your account</p>
              <p className="text-xs text-gray-500 mt-1">Use Google Authenticator or Authy to get your 2FA codes</p>
            </div>
          )}
        </div>

        {/* Email Alerts */}
        <div className="bg-[#1a1a1a] rounded-xl border border-[#2b2d33] p-6 space-y-4">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="text-white font-bold">Email Alerts</h3>
              <p className="text-sm text-gray-500">Receive security alerts via email</p>
            </div>
            <button
              onClick={() => setEmailAlerts(!emailAlerts)}
              className={`px-6 py-2.5 rounded-xl font-bold transition ${
                emailAlerts ? "bg-green-500 text-white" : "bg-[#2b2d33] text-gray-400 hover:text-white"
              }`}
            >
              {emailAlerts ? "✅ Enabled" : "Enable Alerts"}
            </button>
          </div>
          {emailAlerts && (
            <div className="bg-black/50 rounded-xl p-4">
              <p className="text-sm text-green-500">📧 Alerts will be sent to your registered email</p>
            </div>
          )}
        </div>

        {/* IP Whitelist */}
        <div className="bg-[#1a1a1a] rounded-xl border border-[#2b2d33] p-6 space-y-4">
          <div>
            <h3 className="text-white font-bold">IP Whitelist</h3>
            <p className="text-sm text-gray-500">Only allow access from these IP addresses</p>
          </div>

          <div className="space-y-2">
            {whitelist.map((ip, i) => (
              <div key={i} className="flex items-center justify-between bg-black/50 rounded-lg px-4 py-2.5">
                <span className="text-white font-mono text-sm">{ip}</span>
                <button
                  onClick={() => handleRemoveIp(ip)}
                  className="text-red-400 text-sm hover:text-red-500 transition"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>

          <div className="flex gap-2">
            <input
              type="text"
              value={newIp}
              onChange={(e) => setNewIp(e.target.value)}
              placeholder="Add IP address (e.g., 192.168.1.1)"
              className="flex-1 bg-black border border-[#2b2d33] rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-yellow-400 transition"
            />
            <button
              onClick={handleAddIp}
              className="px-6 py-3 bg-yellow-500 text-black font-bold rounded-xl hover:bg-yellow-400 transition whitespace-nowrap"
            >
              Add IP
            </button>
          </div>
        </div>

        {/* Active Sessions */}
        <div className="bg-[#1a1a1a] rounded-xl border border-[#2b2d33] p-6 space-y-4">
          <div>
            <h3 className="text-white font-bold">Active Sessions</h3>
            <p className="text-sm text-gray-500">Devices currently logged into your account</p>
          </div>

          <div className="space-y-2">
            {[
              { device: "iPhone 15 Pro", location: "New York, USA", ip: "192.168.1.1", current: true },
              { device: "MacBook Pro", location: "London, UK", ip: "10.0.0.1", current: false },
            ].map((session, i) => (
              <div key={i} className="flex items-center justify-between bg-black/50 rounded-lg px-4 py-2.5">
                <div>
                  <p className="text-white font-medium text-sm">
                    {session.device} {session.current && <span className="text-xs text-green-500">(Current)</span>}
                  </p>
                  <p className="text-xs text-gray-500">{session.location} • {session.ip}</p>
                </div>
                {!session.current && (
                  <button className="text-red-400 text-sm hover:text-red-500 transition">
                    Revoke
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Change Password */}
        <div className="bg-[#1a1a1a] rounded-xl border border-[#2b2d33] p-6 space-y-4">
          <div>
            <h3 className="text-white font-bold">Change Password</h3>
            <p className="text-sm text-gray-500">Update your account password</p>
          </div>

          <div className="space-y-3">
            <input
              type="password"
              placeholder="Current Password"
              className="w-full bg-black border border-[#2b2d33] rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-yellow-400 transition"
            />
            <input
              type="password"
              placeholder="New Password"
              className="w-full bg-black border border-[#2b2d33] rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-yellow-400 transition"
            />
            <input
              type="password"
              placeholder="Confirm New Password"
              className="w-full bg-black border border-[#2b2d33] rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-yellow-400 transition"
            />
            <button className="w-full py-3 bg-yellow-500 text-black font-bold rounded-xl hover:bg-yellow-400 transition">
              Update Password
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
