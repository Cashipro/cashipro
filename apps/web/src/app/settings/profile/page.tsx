"use client";

import { useState } from "react";
import Link from "next/link";

export default function ProfilePage() {
  const [username, setUsername] = useState("cryptotrader");
  const [email, setEmail] = useState("trader@cashipro.com");
  const [phone, setPhone] = useState("+92 300 1234567");
  const [country, setCountry] = useState("Pakistan");
  const [bio, setBio] = useState("Professional crypto trader since 2020");
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsLoading(false);
    setIsEditing(false);
  };

  return (
    <div className="min-h-screen bg-black p-4">
      <div className="max-w-3xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center gap-3">
          <Link href="/settings" className="text-gray-400 hover:text-white">← Back</Link>
          <h1 className="text-2xl font-bold text-white">👤 Profile</h1>
        </div>

        <div className="bg-[#1a1a1a] rounded-xl border border-[#2b2d33] p-6">
          {/* Profile Picture */}
          <div className="flex flex-col items-center mb-6">
            <div className="relative">
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-yellow-400 to-yellow-600 flex items-center justify-center text-3xl font-bold text-black">
                CT
              </div>
              <button className="absolute bottom-0 right-0 bg-yellow-500 rounded-full p-2 hover:bg-yellow-400 transition">
                📷
              </button>
            </div>
            <p className="text-white font-bold mt-2">{username}</p>
            <p className="text-sm text-gray-500">Member since Jan 2025</p>
          </div>

          {/* KYC Status */}
          <div className="bg-black/50 rounded-xl p-4 mb-6 flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400">KYC Status</p>
              <p className="text-green-500 font-bold">✅ Verified</p>
            </div>
            <Link href="/kyc">
              <button className="px-4 py-2 bg-[#2b2d33] text-gray-400 text-sm rounded hover:bg-[#3b3d43] transition">
                View Details
              </button>
            </Link>
          </div>

          {/* Profile Form */}
          <form onSubmit={handleSave} className="space-y-4">
            <div>
              <label className="text-sm text-gray-400 block mb-1.5">Username</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                disabled={!isEditing}
                className={`w-full bg-black border rounded-xl px-4 py-3 text-white focus:outline-none focus:border-yellow-400 transition ${
                  isEditing ? "border-[#2b2d33]" : "border-[#2b2d33] opacity-60"
                }`}
              />
            </div>

            <div>
              <label className="text-sm text-gray-400 block mb-1.5">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={!isEditing}
                className={`w-full bg-black border rounded-xl px-4 py-3 text-white focus:outline-none focus:border-yellow-400 transition ${
                  isEditing ? "border-[#2b2d33]" : "border-[#2b2d33] opacity-60"
                }`}
              />
            </div>

            <div>
              <label className="text-sm text-gray-400 block mb-1.5">Phone</label>
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                disabled={!isEditing}
                className={`w-full bg-black border rounded-xl px-4 py-3 text-white focus:outline-none focus:border-yellow-400 transition ${
                  isEditing ? "border-[#2b2d33]" : "border-[#2b2d33] opacity-60"
                }`}
              />
            </div>

            <div>
              <label className="text-sm text-gray-400 block mb-1.5">Country</label>
              <select
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                disabled={!isEditing}
                className={`w-full bg-black border rounded-xl px-4 py-3 text-white focus:outline-none focus:border-yellow-400 transition ${
                  isEditing ? "border-[#2b2d33]" : "border-[#2b2d33] opacity-60"
                }`}
              >
                <option>Pakistan</option>
                <option>United States</option>
                <option>United Kingdom</option>
                <option>Canada</option>
                <option>Australia</option>
                <option>India</option>
                <option>UAE</option>
              </select>
            </div>

            <div>
              <label className="text-sm text-gray-400 block mb-1.5">Bio</label>
              <textarea
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                disabled={!isEditing}
                rows={3}
                className={`w-full bg-black border rounded-xl px-4 py-3 text-white focus:outline-none focus:border-yellow-400 transition resize-none ${
                  isEditing ? "border-[#2b2d33]" : "border-[#2b2d33] opacity-60"
                }`}
              />
            </div>

            {/* Actions */}
            <div className="flex gap-3 pt-4 border-t border-[#2b2d33]">
              {!isEditing ? (
                <button
                  type="button"
                  onClick={() => setIsEditing(true)}
                  className="w-full py-3 bg-yellow-500 text-black font-bold rounded-xl hover:bg-yellow-400 transition"
                >
                  Edit Profile
                </button>
              ) : (
                <>
                  <button
                    type="button"
                    onClick={() => setIsEditing(false)}
                    className="flex-1 py-3 bg-[#2b2d33] text-white rounded-xl hover:bg-[#3b3d43] transition"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="flex-1 py-3 bg-yellow-500 text-black font-bold rounded-xl hover:bg-yellow-400 transition disabled:opacity-50"
                  >
                    {isLoading ? "Saving..." : "Save Changes"}
                  </button>
                </>
              )}
            </div>
          </form>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-[#1a1a1a] rounded-xl border border-[#2b2d33] p-4 text-center">
            <p className="text-2xl font-bold text-yellow-400">156</p>
            <p className="text-xs text-gray-500">Trades</p>
          </div>
          <div className="bg-[#1a1a1a] rounded-xl border border-[#2b2d33] p-4 text-center">
            <p className="text-2xl font-bold text-green-500">+$2,450</p>
            <p className="text-xs text-gray-500">Total Profit</p>
          </div>
          <div className="bg-[#1a1a1a] rounded-xl border border-[#2b2d33] p-4 text-center">
            <p className="text-2xl font-bold text-white">98%</p>
            <p className="text-xs text-gray-500">Win Rate</p>
          </div>
        </div>

        {/* Danger Zone */}
        <div className="bg-red-500/5 border border-red-500/20 rounded-xl p-6">
          <h3 className="text-red-400 font-bold mb-2">⚠️ Danger Zone</h3>
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-white text-sm">Delete Account</p>
              <p className="text-xs text-gray-500">Permanently delete your account and all data</p>
            </div>
            <button className="px-6 py-2 bg-red-500/20 text-red-500 rounded-xl hover:bg-red-500/30 transition text-sm font-bold">
              Delete Account
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
