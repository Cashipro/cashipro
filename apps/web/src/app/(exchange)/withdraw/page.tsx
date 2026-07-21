'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function WithdrawPage() {
  const router = useRouter();
  const [asset, setAsset] = useState('USDT');
  const [network, setNetwork] = useState('BSC');
  const [address, setAddress] = useState('');
  const [amount, setAmount] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsLoading(false);
    alert('Withdrawal request submitted!');
    router.push('/wallet');
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6 fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Withdraw</h1>
          <p className="text-gray-400 text-sm mt-1">Withdraw funds from your wallet</p>
        </div>
        <button onClick={() => router.back()} className="text-gray-400 hover:text-white">
          ← Back
        </button>
      </div>

      <form onSubmit={handleSubmit} className="glass rounded-xl p-6 space-y-6">
        {/* Asset Selection */}
        <div>
          <label className="text-sm text-gray-400 block mb-2">Select Asset</label>
          <select
            value={asset}
            onChange={(e) => setAsset(e.target.value)}
            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="USDT">USDT (Balance: 3,043.75)</option>
            <option value="BTC">Bitcoin (Balance: 0.05)</option>
            <option value="ETH">Ethereum (Balance: 2.5)</option>
          </select>
        </div>

        {/* Network */}
        <div>
          <label className="text-sm text-gray-400 block mb-2">Network</label>
          <select
            value={network}
            onChange={(e) => setNetwork(e.target.value)}
            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="BSC">BSC (BEP-20)</option>
            <option value="ERC20">ERC20</option>
            <option value="TRC20">TRC20</option>
          </select>
        </div>

        {/* Address */}
        <div>
          <label className="text-sm text-gray-400 block mb-2">Withdrawal Address</label>
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Enter wallet address"
            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {/* Amount */}
        <div>
          <label className="text-sm text-gray-400 block mb-2">Amount</label>
          <div className="relative">
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="0.00"
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
              min="0.01"
              step="0.01"
            />
            <div className="absolute right-3 top-1/2 -translate-y-1/2 flex gap-1">
              {[25, 50, 75, 100].map((p) => (
                <button
                  key={p}
                  type="button"
                  onClick={() => setAmount((3043.75 * p / 100).toFixed(2))}
                  className="px-2 py-1 text-xs bg-white/5 text-gray-400 rounded hover:bg-white/10"
                >
                  {p}%
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Fee Info */}
        <div className="bg-white/5 rounded-lg p-4 space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-gray-400">Withdrawal Fee</span>
            <span className="text-white">0.5 USDT</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-400">You Will Receive</span>
            <span className="text-white font-medium">
              {amount ? `$${(Number(amount) - 0.5).toFixed(2)}` : '0.00'} USDT
            </span>
          </div>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
        >
          {isLoading ? 'Processing...' : 'Withdraw'}
        </button>

        <p className="text-xs text-gray-500 text-center">
          ⚠️ Withdrawals may take 5-30 minutes to process
        </p>
      </form>
    </div>
  );
}
