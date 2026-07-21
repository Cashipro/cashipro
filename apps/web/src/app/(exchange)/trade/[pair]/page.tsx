'use client';

import { useParams } from 'next/navigation';
import { useState } from 'react';

export default function TradePage() {
  const params = useParams();
  const pair = params.pair as string;
  const [price, setPrice] = useState(65000);
  const [amount, setAmount] = useState(0);

  return (
    <div className="h-full flex flex-col gap-4 fade-in">
      {/* Market Info */}
      <div className="glass rounded-xl p-4">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <h2 className="text-xl font-bold text-white">{pair}</h2>
            <p className="text-sm text-gray-400">Spot</p>
          </div>
          <div className="flex items-center gap-8">
            <div>
              <p className="text-xs text-gray-400">Price</p>
              <p className="text-2xl font-bold text-white">${price.toLocaleString()}</p>
            </div>
            <div>
              <p className="text-xs text-gray-400">24h Change</p>
              <p className="text-lg font-bold text-green-500">+2.5%</p>
            </div>
            <div>
              <p className="text-xs text-gray-400">24h Volume</p>
              <p className="text-lg font-bold text-white">$1.25B</p>
            </div>
          </div>
        </div>
      </div>

      {/* Trading Layout */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-3 gap-4 min-h-0">
        {/* Chart */}
        <div className="lg:col-span-2 glass rounded-xl p-4 flex items-center justify-center">
          <div className="text-center">
            <p className="text-gray-400">Chart Coming Soon</p>
            <p className="text-xs text-gray-500 mt-2">TradingView integration</p>
          </div>
        </div>

        {/* Trade Form */}
        <div className="glass rounded-xl p-4 space-y-4">
          <div className="flex gap-2">
            <button className="flex-1 py-2 bg-green-600 text-white rounded-lg text-sm font-medium">
              Buy
            </button>
            <button className="flex-1 py-2 bg-red-600 text-white rounded-lg text-sm font-medium">
              Sell
            </button>
          </div>

          <div>
            <label className="text-xs text-gray-400 block mb-1">Price</label>
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(Number(e.target.value))}
              className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="text-xs text-gray-400 block mb-1">Amount</label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(Number(e.target.value))}
              className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex justify-between text-sm">
            <span className="text-gray-400">Total</span>
            <span className="text-white font-medium">${(price * amount).toLocaleString()}</span>
          </div>

          <button className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium">
            Place Order
          </button>

          <div className="flex gap-1">
            {[25, 50, 75, 100].map((p) => (
              <button key={p} className="flex-1 py-1 text-xs bg-white/5 text-gray-400 rounded hover:bg-white/10">
                {p}%
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
