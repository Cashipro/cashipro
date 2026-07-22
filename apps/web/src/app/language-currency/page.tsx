"use client";

import { useState } from "react";
import Link from "next/link";

export default function LanguageCurrencyPage() {
  const [language, setLanguage] = useState("English");
  const [currency, setCurrency] = useState("USD");

  const languages = ["English", "Spanish", "French", "German", "Chinese", "Arabic", "Urdu", "Hindi"];
  const currencies = ["USD", "EUR", "GBP", "PKR", "INR", "JPY", "CNY"];

  return (
    <div className="min-h-screen bg-black p-4">
      <div className="max-w-3xl mx-auto space-y-6">
        <div className="flex items-center gap-3">
          <Link href="/" className="text-gray-400 hover:text-white">← Home</Link>
          <h1 className="text-2xl font-bold text-white">🌐 Language & Currency</h1>
        </div>

        <div className="bg-[#1a1a1a] rounded-xl border border-[#2b2d33] p-6 space-y-4">
          <div>
            <label className="text-sm text-gray-400 block mb-1.5">Language</label>
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="w-full bg-black border border-[#2b2d33] rounded-xl px-4 py-3 text-white focus:outline-none focus:border-yellow-400 transition"
            >
              {languages.map((lang) => (
                <option key={lang} value={lang}>{lang}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-sm text-gray-400 block mb-1.5">Currency</label>
            <select
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
              className="w-full bg-black border border-[#2b2d33] rounded-xl px-4 py-3 text-white focus:outline-none focus:border-yellow-400 transition"
            >
              {currencies.map((curr) => (
                <option key={curr} value={curr}>{curr}</option>
              ))}
            </select>
          </div>

          <button className="w-full py-3 bg-yellow-500 text-black font-bold rounded-xl hover:bg-yellow-400 transition">
            Save Settings
          </button>
        </div>
      </div>
    </div>
  );
}
