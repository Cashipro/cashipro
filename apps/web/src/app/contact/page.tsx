"use client";

import { useState } from "react";
import Link from "next/link";

export default function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsLoading(false);
    setSent(true);
  };

  return (
    <div className="min-h-screen bg-black p-4">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center gap-3">
          <Link href="/" className="text-gray-400 hover:text-white">← Home</Link>
          <h1 className="text-2xl font-bold text-white">📧 Contact Us</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Contact Form */}
          <div className="lg:col-span-2 bg-[#1a1a1a] rounded-xl border border-[#2b2d33] p-6">
            {sent ? (
              <div className="text-center space-y-4 py-8">
                <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center text-4xl mx-auto">
                  ✅
                </div>
                <h2 className="text-2xl font-bold text-white">Message Sent!</h2>
                <p className="text-gray-400">We'll get back to you within 24 hours.</p>
                <button
                  onClick={() => setSent(false)}
                  className="px-6 py-2 bg-yellow-500 text-black font-bold rounded-xl hover:bg-yellow-400 transition"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm text-gray-400 block mb-1.5">Full Name</label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="John Doe"
                      className="w-full bg-black border border-[#2b2d33] rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-yellow-400 transition"
                      required
                    />
                  </div>
                  <div>
                    <label className="text-sm text-gray-400 block mb-1.5">Email Address</label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@example.com"
                      className="w-full bg-black border border-[#2b2d33] rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-yellow-400 transition"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="text-sm text-gray-400 block mb-1.5">Subject</label>
                  <select
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="w-full bg-black border border-[#2b2d33] rounded-xl px-4 py-3 text-white focus:outline-none focus:border-yellow-400 transition"
                    required
                  >
                    <option value="">Select a subject...</option>
                    <option value="general">General Inquiry</option>
                    <option value="support">Technical Support</option>
                    <option value="account">Account Issues</option>
                    <option value="trading">Trading Questions</option>
                    <option value="security">Security Concerns</option>
                    <option value="partnership">Partnership</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="text-sm text-gray-400 block mb-1.5">Message</label>
                  <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Describe your issue in detail..."
                    rows={5}
                    className="w-full bg-black border border-[#2b2d33] rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-yellow-400 transition resize-none"
                    required
                  />
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-3 bg-yellow-500 text-black font-bold rounded-xl hover:bg-yellow-400 transition-all disabled:opacity-50"
                >
                  {isLoading ? "Sending..." : "Send Message"}
                </button>
              </form>
            )}
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <div className="bg-[#1a1a1a] rounded-xl border border-[#2b2d33] p-6">
              <h3 className="text-white font-bold mb-4">📋 Contact Information</h3>
              <div className="space-y-4 text-sm">
                <div>
                  <p className="text-gray-500">Email</p>
                  <p className="text-white">support@cashipro.com</p>
                </div>
                <div>
                  <p className="text-gray-500">Response Time</p>
                  <p className="text-white">Within 24 hours</p>
                </div>
                <div>
                  <p className="text-gray-500">Live Chat</p>
                  <p className="text-green-500">Available 24/7</p>
                </div>
                <div>
                  <p className="text-gray-500">Social Media</p>
                  <div className="flex gap-3 mt-2">
                    <a href="#" className="text-gray-400 hover:text-white text-xl">🐦</a>
                    <a href="#" className="text-gray-400 hover:text-white text-xl">📘</a>
                    <a href="#" className="text-gray-400 hover:text-white text-xl">📸</a>
                    <a href="#" className="text-gray-400 hover:text-white text-xl">💼</a>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-[#1a1a1a] rounded-xl border border-[#2b2d33] p-6">
              <h3 className="text-white font-bold mb-2">⚡ Quick Links</h3>
              <div className="space-y-2 text-sm">
                <Link href="/support" className="text-gray-400 hover:text-white block">🛟 Support Center</Link>
                <Link href="/faq" className="text-gray-400 hover:text-white block">📖 FAQ</Link>
                <Link href="/about" className="text-gray-400 hover:text-white block">ℹ️ About Us</Link>
                <Link href="/security" className="text-gray-400 hover:text-white block">🔒 Security</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
