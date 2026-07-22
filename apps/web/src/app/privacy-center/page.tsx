"use client";

import { useState } from "react";
import Link from "next/link";

export default function PrivacyCenterPage() {
  const [settings, setSettings] = useState({
    dataSharing: false,
    analytics: true,
    marketingEmails: false,
    activityTracking: true,
  });

  const toggle = (key: keyof typeof settings) => {
    setSettings((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="min-h-screen bg-black p-4">
      <div className="max-w-3xl mx-auto space-y-6">
        <div className="flex items-center gap-3">
          <Link href="/" className="text-gray-400 hover:text-white">← Home</Link>
          <h1 className="text-2xl font-bold text-white">🛡️ Privacy Center</h1>
        </div>

        <div className="bg-[#1a1a1a] rounded-xl border border-[#2b2d33] p-6 space-y-4">
          {[
            { key: "dataSharing", label: "Data Sharing", desc: "Allow sharing of anonymized data" },
            { key: "analytics", label: "Analytics", desc: "Help us improve by sending usage data" },
            { key: "marketingEmails", label: "Marketing Emails", desc: "Receive promotional emails" },
            { key: "activityTracking", label: "Activity Tracking", desc: "Track your trading activity" },
          ].map((item) => (
            <div key={item.key} className="flex items-center justify-between py-2 border-b border-[#2b2d33]">
              <div>
                <p className="text-white font-medium">{item.label}</p>
                <p className="text-xs text-gray-500">{item.desc}</p>
              </div>
              <button
                onClick={() => toggle(item.key as keyof typeof settings)}
                className={`w-12 h-6 rounded-full transition ${
                  settings[item.key as keyof typeof settings] ? "bg-yellow-500" : "bg-[#2b2d33]"
                }`}
              >
                <div className={`w-5 h-5 bg-white rounded-full transition transform ${
                  settings[item.key as keyof typeof settings] ? "translate-x-6" : "translate-x-0.5"
                }`} />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
