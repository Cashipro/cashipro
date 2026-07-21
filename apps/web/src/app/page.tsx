'use client';

import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 p-4">
      <div className="text-center">
        {/* Logo */}
        <div className="mb-8">
          <div className="w-20 h-20 mx-auto bg-blue-600 rounded-2xl flex items-center justify-center text-3xl font-bold text-white shadow-2xl">
            C
          </div>
        </div>

        <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
          CashiPro
        </h1>
        <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-md mx-auto">
          Secure. Fast. Reliable. Trade cryptocurrencies with confidence.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/login"
            className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all transform hover:scale-105"
          >
            Sign In
          </Link>
          <Link
            href="/register"
            className="px-8 py-3 bg-white/10 backdrop-blur text-white rounded-lg hover:bg-white/20 transition-all transform hover:scale-105 border border-white/20"
          >
            Create Account
          </Link>
        </div>

        <div className="mt-12 grid grid-cols-3 gap-4 max-w-md mx-auto">
          <div className="text-center">
            <div className="text-2xl font-bold text-white">100+</div>
            <div className="text-xs text-gray-400">Markets</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-white">$1B+</div>
            <div className="text-xs text-gray-400">Volume</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-white">10k+</div>
            <div className="text-xs text-gray-400">Users</div>
          </div>
        </div>
      </div>
    </div>
  );
}
