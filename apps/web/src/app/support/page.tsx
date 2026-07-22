"use client";

import { useState } from "react";
import Link from "next/link";

const faqs = [
  {
    category: "Account",
    questions: [
      {
        q: "How do I create an account?",
        a: "Click on the 'Register' button on the homepage. Enter your email, username, and password. Verify your email and you're ready to trade."
      },
      {
        q: "I forgot my password. What should I do?",
        a: "Click on 'Forgot Password' on the login page. Enter your email and we'll send you a reset link."
      },
      {
        q: "How do I enable 2FA?",
        a: "Go to Settings → Security → Two-Factor Authentication. Scan the QR code with Google Authenticator and enter the code to enable."
      }
    ]
  },
  {
    category: "Trading",
    questions: [
      {
        q: "What are the trading fees?",
        a: "Maker fees: 0.1%, Taker fees: 0.1%. VIP users get discounted fees based on 30-day trading volume."
      },
      {
        q: "What is the minimum trade amount?",
        a: "Minimum trade amount is $10 worth of any asset. For futures, minimum is $5."
      },
      {
        q: "How do I place a limit order?",
        a: "Go to the Trade page, select 'Limit' order type, enter your desired price and amount, then click 'Buy' or 'Sell'."
      }
    ]
  },
  {
    category: "Wallet",
    questions: [
      {
        q: "How do I deposit funds?",
        a: "Go to Wallet → Deposit. Select the asset, copy the deposit address, and send funds from your external wallet."
      },
      {
        q: "How long do withdrawals take?",
        a: "Withdrawals are processed within 5-30 minutes. Large withdrawals may require manual review."
      },
      {
        q: "What are the withdrawal fees?",
        a: "Withdrawal fees vary by asset. Check the Withdraw page for current fees."
      }
    ]
  },
  {
    category: "Security",
    questions: [
      {
        q: "How secure is my account?",
        a: "We use bank-grade security with 2FA, cold storage, and real-time monitoring. All sensitive data is encrypted."
      },
      {
        q: "What should I do if I suspect unauthorized activity?",
        a: "Immediately contact support, change your password, and enable 2FA if not already enabled."
      }
    ]
  }
];

export default function SupportPage() {
  const [activeCategory, setActiveCategory] = useState("Account");
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [ticketSubject, setTicketSubject] = useState("");
  const [ticketMessage, setTicketMessage] = useState("");
  const [ticketCategory, setTicketCategory] = useState("General");
  const [showTicketForm, setShowTicketForm] = useState(false);

  const filteredFaqs = faqs.find((f) => f.category === activeCategory);

  return (
    <div className="min-h-screen bg-black p-4">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-white">🛟 Support Center</h1>
            <p className="text-sm text-gray-500 mt-1">We're here to help you 24/7</p>
          </div>
          <button
            onClick={() => setShowTicketForm(!showTicketForm)}
            className="px-5 py-2.5 bg-yellow-500 text-black font-bold rounded-xl hover:bg-yellow-400 transition text-sm"
          >
            📩 Submit Ticket
          </button>
        </div>

        {/* Quick Help */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { icon: "💰", label: "Deposits", href: "/deposit" },
            { icon: "📤", label: "Withdrawals", href: "/withdraw" },
            { icon: "🔄", label: "Trading", href: "/trade/BTCUSDT" },
            { icon: "🔐", label: "Security", href: "#" },
          ].map((item) => (
            <Link key={item.label} href={item.href}>
              <div className="bg-[#1a1a1a] rounded-xl border border-[#2b2d33] p-4 text-center hover:border-yellow-500/50 transition-all">
                <span className="text-2xl block mb-2">{item.icon}</span>
                <span className="text-sm text-white">{item.label}</span>
              </div>
            </Link>
          ))}
        </div>

        {/* FAQ Section */}
        <div className="bg-[#1a1a1a] rounded-xl border border-[#2b2d33] overflow-hidden">
          <div className="flex overflow-x-auto border-b border-[#2b2d33]">
            {faqs.map((cat) => (
              <button
                key={cat.category}
                onClick={() => setActiveCategory(cat.category)}
                className={`px-6 py-3 text-sm font-medium whitespace-nowrap transition ${
                  activeCategory === cat.category
                    ? "bg-yellow-500/20 text-yellow-400 border-b-2 border-yellow-400"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                {cat.category}
              </button>
            ))}
          </div>

          <div className="p-4 space-y-2">
            {filteredFaqs?.questions.map((faq, index) => (
              <div key={index} className="border border-[#2b2d33] rounded-xl overflow-hidden">
                <button
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                  className="w-full flex items-center justify-between p-4 text-left hover:bg-[#2b2d33]/50 transition"
                >
                  <span className="text-white font-medium">{faq.q}</span>
                  <span className="text-gray-400 text-xl">
                    {openIndex === index ? "−" : "+"}
                  </span>
                </button>
                {openIndex === index && (
                  <div className="p-4 border-t border-[#2b2d33] bg-black/30">
                    <p className="text-gray-400 text-sm">{faq.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Ticket Form */}
        {showTicketForm && (
          <div className="bg-[#1a1a1a] rounded-xl border border-[#2b2d33] p-6">
            <h3 className="text-white font-bold text-lg mb-4">📩 Submit Support Ticket</h3>
            <div className="space-y-4">
              <div>
                <label className="text-sm text-gray-400 block mb-1.5">Category</label>
                <select
                  value={ticketCategory}
                  onChange={(e) => setTicketCategory(e.target.value)}
                  className="w-full bg-black border border-[#2b2d33] rounded-xl px-4 py-3 text-white focus:outline-none focus:border-yellow-400 transition"
                >
                  <option>General</option>
                  <option>Account</option>
                  <option>Trading</option>
                  <option>Wallet</option>
                  <option>Security</option>
                  <option>Other</option>
                </select>
              </div>
              <div>
                <label className="text-sm text-gray-400 block mb-1.5">Subject</label>
                <input
                  type="text"
                  value={ticketSubject}
                  onChange={(e) => setTicketSubject(e.target.value)}
                  placeholder="Brief description of your issue"
                  className="w-full bg-black border border-[#2b2d33] rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-yellow-400 transition"
                />
              </div>
              <div>
                <label className="text-sm text-gray-400 block mb-1.5">Message</label>
                <textarea
                  value={ticketMessage}
                  onChange={(e) => setTicketMessage(e.target.value)}
                  placeholder="Describe your issue in detail..."
                  rows={4}
                  className="w-full bg-black border border-[#2b2d33] rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-yellow-400 transition resize-none"
                />
              </div>
              <button className="w-full py-3 bg-yellow-500 text-black font-bold rounded-xl hover:bg-yellow-400 transition">
                Submit Ticket
              </button>
            </div>
          </div>
        )}

        {/* Contact Info */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-[#1a1a1a] rounded-xl border border-[#2b2d33] p-4 text-center">
            <span className="text-2xl block mb-2">📧</span>
            <p className="text-white font-medium">Email</p>
            <p className="text-sm text-gray-500">support@cashipro.com</p>
          </div>
          <div className="bg-[#1a1a1a] rounded-xl border border-[#2b2d33] p-4 text-center">
            <span className="text-2xl block mb-2">💬</span>
            <p className="text-white font-medium">Live Chat</p>
            <p className="text-sm text-gray-500">Available 24/7</p>
          </div>
          <div className="bg-[#1a1a1a] rounded-xl border border-[#2b2d33] p-4 text-center">
            <span className="text-2xl block mb-2">🐦</span>
            <p className="text-white font-medium">Twitter</p>
            <p className="text-sm text-gray-500">@CashiPro</p>
          </div>
        </div>
      </div>
    </div>
  );
}
