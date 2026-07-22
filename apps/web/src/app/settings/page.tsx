"use client";

import { useState } from "react";
import Link from "next/link";

const settingsSections = [
  { icon: "👤", label: "Profile", href: "/settings/profile" },
  { icon: "🔒", label: "Security", href: "/settings/security" },
  { icon: "🔔", label: "Notifications", href: "/settings/notifications" },
  { icon: "🔑", label: "API Management", href: "/settings/api" },
  { icon: "💰", label: "Fee Settings", href: "/settings/fees" },
  { icon: "🏆", label: "Reward Hub", href: "/settings/rewards" },
  { icon: "🎯", label: "Event Center", href: "/settings/events" },
  { icon: "👑", label: "VVIP", href: "/settings/vvip" },
  { icon: "🌐", label: "Language & Currency", href: "/settings/language" },
  { icon: "🛡️", label: "Privacy Center", href: "/settings/privacy" },
  { icon: "📡", label: "Network Check", href: "/settings/network" },
  { icon: "ℹ️", label: "About Us", href: "/about" },
];

export default function SettingsPage() {
  return (
    <div className="min-h-screen bg-black p-4">
      <div className="max-w-4xl mx-auto space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-white">⚙️ Settings</h1>
          <p className="text-sm text-gray-500 mt-1">Manage your account preferences</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {settingsSections.map((item) => (
            <Link key={item.href} href={item.href}>
              <div className="bg-[#1a1a1a] rounded-xl border border-[#2b2d33] p-4 hover:border-yellow-500/50 transition-all flex items-center gap-3">
                <span className="text-2xl">{item.icon}</span>
                <div>
                  <p className="text-white font-medium">{item.label}</p>
                  <p className="text-xs text-gray-500">Manage your {item.label.toLowerCase()}</p>
                </div>
                <span className="ml-auto text-gray-500">→</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
