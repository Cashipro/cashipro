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
        {/* Header */}
        <div className="flex items-center gap-3">
          <Link href="/settings" className="text-gray-400 hover:text-white">← Back to Settings</Link>
          <h1 className="text-2xl font-bold text-white">🔔 Notifications</h1>
        </div>

        <div className="bg-[#1a1a1a] rounded-xl border border-[#2b2d33] p-6 space-y-6">
          <p className="text-sm text-gray-400">Manage how and when you receive notifications</p>

          {/* Notification Categories */}
          <div className="space-y-4">
            {/* Email Alerts */}
            <div className="flex items-center justify-between py-3 border-b border-[#2b2d33]">
              <div>
                <p className="text-white font-medium">Email Alerts</p>
                <p className="text-xs text-gray-500">Receive notifications via email</p>
              </div>
              <button
                onClick={() => toggle("emailAlerts")}
                className={`w-12 h-7 rounded-full transition ${
                  settings.emailAlerts ? "bg-yellow-500" : "bg-[#2b2d33]"
                }`}
              >
                <div className={`w-5 h-5 bg-white rounded-full transition transform ${
                  settings.emailAlerts ? "translate-x-6" : "translate-x-0.5"
                }`} />
              </button>
            </div>

            {/* Push Notifications */}
            <div className="flex items-center justify-between py-3 border-b border-[#2b2d33]">
              <div>
                <p className="text-white font-medium">Push Notifications</p>
                <p className="text-xs text-gray-500">Receive push notifications on mobile</p>
              </div>
              <button
                onClick={() => toggle("pushNotifications")}
                className={`w-12 h-7 rounded-full transition ${
                  settings.pushNotifications ? "bg-yellow-500" : "bg-[#2b2d33]"
                }`}
              >
                <div className={`w-5 h-5 bg-white rounded-full transition transform ${
                  settings.pushNotifications ? "translate-x-6" : "translate-x-0.5"
                }`} />
              </button>
            </div>

            {/* SMS Alerts */}
            <div className="flex items-center justify-between py-3 border-b border-[#2b2d33]">
              <div>
                <p className="text-white font-medium">SMS Alerts</p>
                <p className="text-xs text-gray-500">Receive notifications via SMS</p>
              </div>
              <button
                onClick={() => toggle("smsAlerts")}
                className={`w-12 h-7 rounded-full transition ${
                  settings.smsAlerts ? "bg-yellow-500" : "bg-[#2b2d33]"
                }`}
              >
                <div className={`w-5 h-5 bg-white rounded-full transition transform ${
                  settings.smsAlerts ? "translate-x-6" : "translate-x-0.5"
                }`} />
              </button>
            </div>

            {/* Price Alerts */}
            <div className="flex items-center justify-between py-3 border-b border-[#2b2d33]">
              <div>
                <p className="text-white font-medium">Price Alerts</p>
                <p className="text-xs text-gray-500">Get notified when prices move significantly</p>
              </div>
              <button
                onClick={() => toggle("priceAlerts")}
                className={`w-12 h-7 rounded-full transition ${
                  settings.priceAlerts ? "bg-yellow-500" : "bg-[#2b2d33]"
                }`}
              >
                <div className={`w-5 h-5 bg-white rounded-full transition transform ${
                  settings.priceAlerts ? "translate-x-6" : "translate-x-0.5"
                }`} />
              </button>
            </div>

            {/* Order Updates */}
            <div className="flex items-center justify-between py-3 border-b border-[#2b2d33]">
              <div>
                <p className="text-white font-medium">Order Updates</p>
                <p className="text-xs text-gray-500">Get notified about order status changes</p>
              </div>
              <button
                onClick={() => toggle("orderUpdates")}
                className={`w-12 h-7 rounded-full transition ${
                  settings.orderUpdates ? "bg-yellow-500" : "bg-[#2b2d33]"
                }`}
              >
                <div className={`w-5 h-5 bg-white rounded-full transition transform ${
                  settings.orderUpdates ? "translate-x-6" : "translate-x-0.5"
                }`} />
              </button>
            </div>

            {/* Security Alerts */}
            <div className="flex items-center justify-between py-3 border-b border-[#2b2d33]">
              <div>
                <p className="text-white font-medium">Security Alerts</p>
                <p className="text-xs text-gray-500">Get notified about login attempts and security events</p>
              </div>
              <button
                onClick={() => toggle("securityAlerts")}
                className={`w-12 h-7 rounded-full transition ${
                  settings.securityAlerts ? "bg-yellow-500" : "bg-[#2b2d33]"
                }`}
              >
                <div className={`w-5 h-5 bg-white rounded-full transition transform ${
                  settings.securityAlerts ? "translate-x-6" : "translate-x-0.5"
                }`} />
              </button>
            </div>

            {/* Marketing Emails */}
            <div className="flex items-center justify-between py-3 border-b border-[#2b2d33]">
              <div>
                <p className="text-white font-medium">Marketing Emails</p>
                <p className="text-xs text-gray-500">Receive promotional emails and offers</p>
              </div>
              <button
                onClick={() => toggle("marketingEmails")}
                className={`w-12 h-7 rounded-full transition ${
                  settings.marketingEmails ? "bg-yellow-500" : "bg-[#2b2d33]"
                }`}
              >
                <div className={`w-5 h-5 bg-white rounded-full transition transform ${
                  settings.marketingEmails ? "translate-x-6" : "translate-x-0.5"
                }`} />
              </button>
            </div>

            {/* News Updates */}
            <div className="flex items-center justify-between py-3 border-b border-[#2b2d33]">
              <div>
                <p className="text-white font-medium">News Updates</p>
                <p className="text-xs text-gray-500">Receive platform news and updates</p>
              </div>
              <button
                onClick={() => toggle("newsUpdates")}
                className={`w-12 h-7 rounded-full transition ${
                  settings.newsUpdates ? "bg-yellow-500" : "bg-[#2b2d33]"
                }`}
              >
                <div className={`w-5 h-5 bg-white rounded-full transition transform ${
                  settings.newsUpdates ? "translate-x-6" : "translate-x-0.5"
                }`} />
              </button>
            </div>

            {/* Trade Confirmations */}
            <div className="flex items-center justify-between py-3 border-b border-[#2b2d33]">
              <div>
                <p className="text-white font-medium">Trade Confirmations</p>
                <p className="text-xs text-gray-500">Get notified when trades are executed</p>
              </div>
              <button
                onClick={() => toggle("tradeConfirmations")}
                className={`w-12 h-7 rounded-full transition ${
                  settings.tradeConfirmations ? "bg-yellow-500" : "bg-[#2b2d33]"
                }`}
              >
                <div className={`w-5 h-5 bg-white rounded-full transition transform ${
                  settings.tradeConfirmations ? "translate-x-6" : "translate-x-0.5"
                }`} />
              </button>
            </div>

            {/* Withdrawal Alerts */}
            <div className="flex items-center justify-between py-3 border-b border-[#2b2d33]">
              <div>
                <p className="text-white font-medium">Withdrawal Alerts</p>
                <p className="text-xs text-gray-500">Get notified about withdrawal requests</p>
              </div>
              <button
                onClick={() => toggle("withdrawalAlerts")}
                className={`w-12 h-7 rounded-full transition ${
                  settings.withdrawalAlerts ? "bg-yellow-500" : "bg-[#2b2d33]"
                }`}
              >
                <div className={`w-5 h-5 bg-white rounded-full transition transform ${
                  settings.withdrawalAlerts ? "translate-x-6" : "translate-x-0.5"
                }`} />
              </button>
            </div>
          </div>

          {/* Save Button */}
          <button className="w-full py-3 bg-yellow-500 text-black font-bold rounded-xl hover:bg-yellow-400 transition">
            Save Notification Settings
          </button>
        </div>
      </div>
    </div>
  );
}
