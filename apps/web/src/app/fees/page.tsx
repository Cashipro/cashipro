"use client";

import Link from "next/link";

const fees = [
  { name: "Maker Fee", rate: "0.10%", vipRate: "0.05%" },
  { name: "Taker Fee", rate: "0.10%", vipRate: "0.08%" },
  { name: "Withdrawal Fee (BTC)", rate: "0.0005 BTC", vipRate: "0.0003 BTC" },
  { name: "Withdrawal Fee (ETH)", rate: "0.005 ETH", vipRate: "0.003 ETH" },
  { name: "Withdrawal Fee (USDT)", rate: "0.5 USDT", vipRate: "0.3 USDT" },
  { name: "Funding Rate", rate: "0.01%", vipRate: "0.005%" },
];

export default function FeesPage() {
  return (
    <div className="min-h-screen bg-black p-4">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="flex items-center gap-3">
          <Link href="/" className="text-gray-400 hover:text-white">← Home</Link>
          <h1 className="text-2xl font-bold text-white">💰 Fee Settings</h1>
        </div>

        <div className="bg-[#1a1a1a] rounded-xl border border-[#2b2d33] overflow-hidden">
          <div className="p-4 border-b border-[#2b2d33]">
            <h3 className="text-white font-bold">Trading & Withdrawal Fees</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-black/30">
                <tr>
                  <th className="px-4 py-3 text-left text-xs text-gray-500">Fee Type</th>
                  <th className="px-4 py-3 text-right text-xs text-gray-500">Standard</th>
                  <th className="px-4 py-3 text-right text-xs text-gray-500">VVIP</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#2b2d33]">
                {fees.map((fee, i) => (
                  <tr key={i} className="hover:bg-[#2b2d33]/50 transition-colors">
                    <td className="px-4 py-3 text-white text-sm">{fee.name}</td>
                    <td className="px-4 py-3 text-right text-gray-300 text-sm">{fee.rate}</td>
                    <td className="px-4 py-3 text-right text-yellow-400 text-sm font-bold">{fee.vipRate}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
