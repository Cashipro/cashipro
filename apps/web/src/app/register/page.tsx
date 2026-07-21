"use client";

import { useState } from "react";
import Link from "next/link";

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [agreeTerms, setAgreeTerms] = useState(false);

  const [passwordStrength, setPasswordStrength] = useState(0);

  const checkPasswordStrength = (pass: string) => {
    let strength = 0;
    if (pass.length >= 8) strength++;
    if (/[a-z]/.test(pass) && /[A-Z]/.test(pass)) strength++;
    if (/\d/.test(pass)) strength++;
    if (/[^a-zA-Z0-9]/.test(pass)) strength++;
    setPasswordStrength(strength);
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

        <form className="space-y-4">
          {/* Username */}
          <div>
            <label className="text-sm text-gray-400 block mb-1.5">Username</label>
            <input
              type="text"
              placeholder="johndoe"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full bg-black border border-[#2b2d33] rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-yellow-400 transition-colors"
            />
          </div>

          {/* Email */}
          <div>
            <label className="text-sm text-gray-400 block mb-1.5">Email Address</label>
            <input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-black border border-[#2b2d33] rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-yellow-400 transition-colors"
            />
          </div>

          {/* Password */}
          <div>
            <label className="text-sm text-gray-400 block mb-1.5">Password</label>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                checkPasswordStrength(e.target.value);
              }}
              className="w-full bg-black border border-[#2b2d33] rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-yellow-400 transition-colors"
            />
            {/* Password Strength Bar */}
            {password && (
              <div className="mt-2 flex gap-1">
                {[...Array(4)].map((_, i) => (
                  <div
                    key={i}
                    className={`h-1 flex-1 rounded ${
                      i < passwordStrength
                        ? i < 2
                          ? "bg-red-500"
                          : i < 3
                          ? "bg-yellow-500"
                          : "bg-green-500"
                        : "bg-[#2b2d33]"
                    }`}
                  />
                ))}
                <span className="text-xs text-gray-500 ml-2">
                  {passwordStrength === 0 && "Weak"}
                  {passwordStrength === 1 && "Fair"}
                  {passwordStrength === 2 && "Good"}
                  {passwordStrength === 3 && "Strong"}
                  {passwordStrength === 4 && "Very Strong"}
                </span>
              </div>
            )}
          </div>

          {/* Confirm Password */}
          <div>
            <label className="text-sm text-gray-400 block mb-1.5">Confirm Password</label>
            <input
              type="password"
              placeholder="••••••••"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className={`w-full bg-black border rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-yellow-400 transition-colors ${
                confirmPassword && password !== confirmPassword
                  ? "border-red-500"
                  : "border-[#2b2d33]"
              }`}
            />
            {confirmPassword && password !== confirmPassword && (
              <p className="text-xs text-red-500 mt-1">Passwords do not match</p>
            )}
          </div>

          {/* Terms */}
          <div className="flex items-center">
            <input
              type="checkbox"
              checked={agreeTerms}
              onChange={(e) => setAgreeTerms(e.target.checked)}
              className="w-4 h-4 rounded border-[#2b2d33] bg-black text-yellow-400 focus:ring-yellow-400 focus:ring-offset-0"
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

          {/* Submit Button */}
          <button
            type="submit"
            disabled={!agreeTerms}
            className={`w-full bg-yellow-500 text-black font-bold py-3 rounded-xl transition-all transform hover:scale-[1.02] active:scale-[0.98] ${
              !agreeTerms ? "opacity-50 cursor-not-allowed" : "hover:bg-yellow-400"
            }`}
          >
            Create Account
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

        {/* Login Link */}
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
