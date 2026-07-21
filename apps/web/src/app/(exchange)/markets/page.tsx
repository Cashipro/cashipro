"use client";

const markets = [
  { symbol: "BTC/USDT", price: 65432, change: 2.45 },
  { symbol: "ETH/USDT", price: 3456, change: -1.23 },
  { symbol: "BNB/USDT", price: 598, change: 5.67 },
];

export default function MarketsPage() {
  return (
    <div className="min-h-screen bg-black p-4">
      <h1 className="text-2xl font-bold text-white mb-6">Markets</h1>
      <div className="bg-[#1a1a1a] rounded-xl border border-gray-800 overflow-hidden">
        <table className="w-full">
          <thead className="bg-black/40">
            <tr>
              <th className="px-4 py-3 text-left text-xs text-gray-400">Market</th>
              <th className="px-4 py-3 text-right text-xs text-gray-400">Price</th>
              <th className="px-4 py-3 text-right text-xs text-gray-400">24h Change</th>
            </tr>
          </thead>
          <tbody>
            {markets.map((m) => (
              <tr key={m.symbol} className="border-t border-gray-800 hover:bg-gray-800/50">
                <td className="px-4 py-3 text-white">{m.symbol}</td>
                <td className="px-4 py-3 text-right text-white">${m.price}</td>
                <td className={`px-4 py-3 text-right font-bold ${m.change >= 0 ? "text-green-500" : "text-red-500"}`}>
                  {m.change >= 0 ? "+" : ""}{m.change}%
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}"use client";

const markets = [
  { symbol: "BTC/USDT", price: 65432, change: 2.45 },
  { symbol: "ETH/USDT", price: 3456, change: -1.23 },
  { symbol: "BNB/USDT", price: 598, change: 5.67 },
];

export default function MarketsPage() {
  return (
    <div className="min-h-screen bg-black p-4">
      <h1 className="text-2xl font-bold text-white mb-6">Markets</h1>
      <div className="bg-[#1a1a1a] rounded-xl border border-gray-800 overflow-hidden">
        <table className="w-full">
          <thead className="bg-black/40">
            <tr>
              <th className="px-4 py-3 text-left text-xs text-gray-400">Market</th>
              <th className="px-4 py-3 text-right text-xs text-gray-400">Price</th>
              <th className="px-4 py-3 text-right text-xs text-gray-400">24h Change</th>
            </tr>
          </thead>
          <tbody>
            {markets.map((m) => (
              <tr key={m.symbol} className="border-t border-gray-800 hover:bg-gray-800/50">
                <td className="px-4 py-3 text-white">{m.symbol}</td>
                <td className="px-4 py-3 text-right text-white">${m.price}</td>
                <td className={`px-4 py-3 text-right font-bold ${m.change >= 0 ? "text-green-500" : "text-red-500"}`}>
                  {m.change >= 0 ? "+" : ""}{m.change}%
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
