'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function DepositPage() {
  const router = useRouter();
  const [asset, setAsset] = useState('USDT');
  const [network, setNetwork] = useState('BSC');
  const [address, setAddress] = useState('0x742d35Cc6634C0532925a3b844Bc454e4438f44e');

  const handleCopy = () => {
    navigator.clipboard.writeText(address);
    alert('Address copied!');
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6 fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Deposit</h1>
          <p className="text-gray-400 text-sm mt-1">Deposit funds to your wallet</p>
        </div>
        <button onClick={() => router.back()} className="text-gray-400 hover:text-white">
          ← Back
        </button>
      </div>

      <div className="glass rounded-xl p-6 space-y-6">
        {/* Asset Selection */}
        <div>
          <label className="text-sm text-gray-400 block mb-2">Select Asset</label>
          <select
            value={asset}
            onChange={(e) => setAsset(e.target.value)}
            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="USDT">USDT</option>
            <option value="BTC">Bitcoin (BTC)</option>
            <option value="ETH">Ethereum (ETH)</option>
            <option value="BNB">BNB</option>
          </select>
        </div>

        {/* Network Selection */}
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

        {/* Address Display */}
        <div>
          <label className="text-sm text-gray-400 block mb-2">Deposit Address</label>
          <div className="flex gap-2">
            <input
              type="text"
              value={address}
              readOnly
              className="flex-1 px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white font-mono text-sm"
            />
            <button
              onClick={handleCopy}
              className="px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Copy
            </button>
          </div>
          <p className="text-xs text-yellow-500 mt-2">
            ⚠️ Send only {asset} on {network} network to this address
          </p>
        </div>

        {/* QR Code Placeholder */}
        <div className="flex justify-center">
          <div className="w-48 h-48 bg-white/5 border-2 border-white/10 rounded-xl flex items-center justify-center">
            <span className="text-gray-400 text-sm">QR Code</span>
          </div>
        </div>

        <div className="bg-white/5 rounded-lg p-4">
          <h4 className="text-sm text-gray-400 mb-2">Minimum Deposit</h4>
          <p className="text-white font-medium">10 USDT</p>
          <p className="text-xs text-gray-500 mt-1">Deposits below minimum may not be credited</p>
        </div>
      </div>
    </div>
  );
}
