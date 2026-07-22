"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [referralCode, setReferralCode] = useState("");
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    setIsLoading(true);
    setError("");
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsLoading(false);
    router.push("/dashboard");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black p-4">
      <div className="bg-[#1a1a1a] p-8 rounded-2xl border border-[#2b2d33] w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="w-12 h-12 bg-yellow-500 rounded-xl mx-auto flex items-center justify-center text-2xl font-bold text-black mb-3">
            C
          </div>
          <h1 className="text-2xl font-bold text-white">Create Account</h1>
          <p className="text-sm text-gray-500 mt-1">Start trading with zero fees</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="bg-red-500/10 border border-red-500/50 text-red-400 px-4 py-3 rounded-xl text-sm">
              {error}
            </div>
          )}

          {/* Username */}
          <div>
            <label className="text-sm text-gray-400 block mb-1.5">Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="johndoe"
              className="w-full bg-black border border-[#2b2d33] rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-yellow-400 transition"
              required
            />
          </div>

          {/* Email */}
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

          {/* Password */}
          <div>
            <label className="text-sm text-gray-400 block mb-1.5">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full bg-black border border-[#2b2d33] rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-yellow-400 transition"
              required
            />
          </div>

          {/* Confirm Password */}
          <div>
            <label className="text-sm text-gray-400 block mb-1.5">Confirm Password</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="••••••••"
              className={`w-full bg-black border rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-yellow-400 transition ${
                confirmPassword && password !== confirmPassword
                  ? "border-red-500"
                  : "border-[#2b2d33]"
              }`}
              required
            />
            {confirmPassword && password !== confirmPassword && (
              <p className="text-xs text-red-500 mt-1">Passwords do not match</p>
            )}
          </div>

          {/* 🔥 REFERRAL CODE BOX */}
          <div>
            <label className="text-sm text-gray-400 block mb-1.5">
              Referral Code <span className="text-gray-500">(Optional)</span>
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={referralCode}
                onChange={(e) => setReferralCode(e.target.value)}
                placeholder="Enter referral code"
                className="flex-1 bg-black border border-[#2b2d33] rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-yellow-400 transition"
              />
              <button
                type="button"
                className="px-4 py-3 bg-[#2b2d33] text-gray-400 rounded-xl hover:bg-[#3b3d43] hover:text-white transition text-sm"
              >
                Apply
              </button>
            </div>
            {referralCode && (
              <p className="text-xs text-yellow-400 mt-1">✅ Referral code applied!</p>
            )}
          </div>

          {/* Terms */}
          <div className="flex items-center">
            <input
              type="checkbox"
              checked={agreeTerms}
              onChange={(e) => setAgreeTerms(e.target.checked)}
              className="w-4 h-4 rounded border-[#2b2d33] bg-black text-yellow-400 focus:ring-yellow-400 focus:ring-offset-0"
              required
            />
            <label className="ml-2 text-sm text-gray-400">
              I agree to the{" "}
              <Link href="/terms" className="text-yellow-400 hover:text-yellow-300">
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link href="/privacy" className="text-yellow-400 hover:text-yellow-300">
                Privacy Policy
              </Link>
            </label>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-yellow-500 text-black font-bold py-3 rounded-xl hover:bg-yellow-400 transition-all disabled:opacity-50"
          >
            {isLoading ? "Creating Account..." : "Create Account"}
          </button>
        </form>

        {/* Divider */}
        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-[#2b2d33]"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-4 bg-[#1a1a1a] text-gray-500">or</span>
          </div>
        </div>

        {/* Social Login */}
        <div className="grid grid-cols-2 gap-3">
          <button className="flex items-center justify-center gap-2 px-4 py-2.5 bg-white/5 border border-[#2b2d33] rounded-xl hover:bg-white/10 transition-colors">
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path fill="currentColor" d="M12.545,10.239v3.821h5.445c-0.712,2.315-2.647,3.972-5.445,3.972c-3.332,0-6.033-2.701-6.033-6.032s2.701-6.032,6.033-6.032c1.498,0,2.866,0.549,3.921,1.453l2.814-2.814C17.503,2.988,15.139,2,12.545,2C7.021,2,2.543,6.477,2.543,12s4.478,10,10.002,10c8.396,0,10.249-7.85,9.426-11.748L12.545,10.239z"/>
            </svg>
            <span className="text-sm text-white">Google</span>
          </button>
          <button className="flex items-center justify-center gap-2 px-4 py-2.5 bg-white/5 border border-[#2b2d33] rounded-xl hover:bg-white/10 transition-colors">
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path fill="currentColor" d="M22,12.303c0,5.458-4.458,9.916-9.916,9.916c-5.458,0-9.916-4.458-9.916-9.916C2.168,6.845,6.626,2.387,12.084,2.387c5.458,0,9.916,4.458,9.916,9.916z"/>
            </svg>
            <span className="text-sm text-white">GitHub</span>
          </button>
        </div>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-400">
            Already have an account?{" "}
            <Link href="/login" className="text-yellow-400 hover:text-yellow-300 font-medium transition">
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
