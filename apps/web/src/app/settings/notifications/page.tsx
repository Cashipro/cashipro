"use client";

import { useState } from "react";
import Link from "next/link";

export default function NotificationsPage() {
  const [settings, setSettings] = useState({
    emailAlerts: true,
    pushNotifications: true,
    smsAlerts: false,
    priceAlerts: true,
    orderUpdates: true,
    securityAlerts: true,
    marketingEmails: false,
    newsUpdates: true,
    tradeConfirmations: true,
    withdrawalAlerts: true,
  });

  const toggle = (key: keyof typeof settings) => {
    setSettings((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="min-h-screen bg-black p-4">
      <div className="max-w-3xl mx-auto space-y-6">
        <div className="flex items-center gap-3">
          <Link href="/settings" className="text-gray-400 hover:text-white">← Back to Settings</Link>
          <h1 className="text-2xl font-bold text-white">🔔 Notifications</h1>
        </div>

        <div className="bg-[#1a1a1a] rounded-xl border border-[#2b2d33] p-6 space-y-6">
          <p className="text-sm text-gray-400">Manage how and when you receive notifications</p>

          <div className="space-y-4">
            {[
              { key: "emailAlerts", label: "Email Alerts", desc: "Receive notifications via email" },
              { key: "pushNotifications", label: "Push Notifications", desc: "Receive push notifications on mobile" },
              { key: "smsAlerts", label: "SMS Alerts", desc: "Receive notifications via SMS" },
              { key: "priceAlerts", label: "Price Alerts", desc: "Get notified when prices move significantly" },
              { key: "orderUpdates", label: "Order Updates", desc: "Get notified about order status changes" },
              { key: "securityAlerts", label: "Security Alerts", desc: "Get notified about login attempts" },
              { key: "marketingEmails", label: "Marketing Emails", desc: "Receive promotional emails" },
              { key: "newsUpdates", label: "News Updates", desc: "Receive platform news" },
              { key: "tradeConfirmations", label: "Trade Confirmations", desc: "Get notified when trades are executed" },
              { key: "withdrawalAlerts", label: "Withdrawal Alerts", desc: "Get notified about withdrawal requests" },
            ].map((item) => (
              <div key={item.key} className="flex items-center justify-between py-3 border-b border-[#2b2d33]">
                <div>
                  <p className="text-white font-medium">{item.label}</p>
                  <p className="text-xs text-gray-500">{item.desc}</p>
                </div>
                <button
                  onClick={() => toggle(item.key as keyof typeof settings)}
                  className={`w-12 h-7 rounded-full transition ${
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

          <button className="w-full py-3 bg-yellow-500 text-black font-bold rounded-xl hover:bg-yellow-400 transition">
            Save Notification Settings
          </button>
        </div>
      </div>
    </div>
  );
}
