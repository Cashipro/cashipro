"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";

export default function OptionsDetailPage() {
  const params = useParams();
  const router = useRouter();
  const symbol = (params.symbol as string) || "BTC";

  const [selectedType, setSelectedType] = useState<"Call" | "Put">("Call");
  const [strike, setStrike] = useState(65000);
  const [contracts, setContracts] = useState(1);
  const [expiry, setExpiry] = useState("2025-01-31");
  const [step, setStep] = useState<"details" | "confirm">("details");

  const optionsData = {
    BTC: {
      currentPrice: 65432,
      calls: [
        { strike: 64000, premium: 1200, volume: 2500, openInterest: 15000 },
        { strike: 65000, premium: 800, volume: 3200, openInterest: 18000 },
        { strike: 66000, premium: 450, volume: 1800, openInterest: 12000 },
        { strike: 67000, premium: 200, volume: 900, openInterest: 8000 },
      ],
      puts: [
        { strike: 64000, premium: 100, volume: 1500, openInterest: 10000 },
        { strike: 65000, premium: 250, volume: 2200, openInterest: 14000 },
        { strike: 66000, premium: 550, volume: 1200, openInterest: 9000 },
        { strike: 67000, premium: 900, volume: 800, openInterest: 6000 },
      ],
    },
    ETH: {
      currentPrice: 3456,
      calls: [
        { strike: 3400, premium: 150, volume: 5200, openInterest: 25000 },
        { strike: 3500, premium: 100, volume: 4800, openInterest: 22000 },
        { strike: 3600, premium: 60, volume: 3000, openInterest: 18000 },
      ],
      puts: [
        { strike: 3400, premium: 20, volume: 2800, openInterest: 15000 },
        { strike: 3500, premium: 45, volume: 3500, openInterest: 20000 },
        { strike: 3600, premium: 90, volume: 2000, openInterest: 12000 },
      ],
    },
  };

  const data = optionsData[symbol as keyof typeof optionsData];
  const options = selectedType === "Call" ? data.calls : data.puts;
  const selectedOption = options.find((o) => o.strike === strike);

  const premiumPerContract = selectedOption?.premium || 0;
  const totalPremium = premiumPerContract * contracts;

  const handlePlaceOrder = () => {
    setStep("confirm");
  };

  const handleConfirmOrder = () => {
    alert(`Order placed: ${contracts} ${symbol} ${selectedType} options at strike ${strike}`);
    setStep("details");
    router.push("/options");
  };

  return (
    <div className="min-h-screen bg-black p-4">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <button
              onClick={() => router.back()}
              className="text-gray-400 hover:text-white text-sm mb-2 block"
            >
              ← Back to Options
            </button>
            <h1 className="text-2xl font-bold text-white">🎯 {symbol} Options</h1>
            <p className="text-sm text-gray-500 mt-1">Trade calls and puts on {symbol}</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="bg-yellow-500/20 px-4 py-2 rounded-xl">
              <p className="text-xs text-gray-400">Current Price</p>
              <p className="text-lg font-bold text-yellow-400">${data.currentPrice.toLocaleString()}</p>
            </div>
            <div className="bg-yellow-500/20 px-4 py-2 rounded-xl">
              <p className="text-xs text-gray-400">Open Interest</p>
              <p className="text-lg font-bold text-yellow-400">$1.2M</p>
            </div>
          </div>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Options Table */}
          <div className="lg:col-span-2 bg-[#1a1a1a] rounded-xl border border-[#2b2d33] p-4">
            <div className="flex gap-2 mb-4">
              <button
                onClick={() => setSelectedType("Call")}
                className={`flex-1 py-2.5 rounded-lg text-sm font-bold transition ${
                  selectedType === "Call"
                    ? "bg-green-500/20 text-green-500 border border-green-500/50"
                    : "bg-[#2b2d33] text-gray-400 hover:text-white"
                }`}
              >
                📈 Calls
              </button>
              <button
                onClick={() => setSelectedType("Put")}
                className={`flex-1 py-2.5 rounded-lg text-sm font-bold transition ${
                  selectedType === "Put"
                    ? "bg-red-500/20 text-red-500 border border-red-500/50"
                    : "bg-[#2b2d33] text-gray-400 hover:text-white"
                }`}
              >
                📉 Puts
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-black/30">
                  <tr>
                    <th className="px-4 py-2 text-left text-xs text-gray-500">Strike</th>
                    <th className="px-4 py-2 text-right text-xs text-gray-500">Premium</th>
                    <th className="px-4 py-2 text-right text-xs text-gray-500">Volume</th>
                    <th className="px-4 py-2 text-right text-xs text-gray-500">Open Interest</th>
                    <th className="px-4 py-2 text-right text-xs text-gray-500">Select</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#2b2d33]">
                  {options.map((opt) => (
                    <tr
                      key={opt.strike}
                      className={`hover:bg-[#2b2d33]/50 transition-colors cursor-pointer ${
                        strike === opt.strike ? "bg-yellow-500/10" : ""
                      }`}
                      onClick={() => setStrike(opt.strike)}
                    >
                      <td className="px-4 py-3 text-white font-medium">${opt.strike.toLocaleString()}</td>
                      <td className="px-4 py-3 text-right text-yellow-400 font-bold">${opt.premium}</td>
                      <td className="px-4 py-3 text-right text-gray-300">{opt.volume.toLocaleString()}</td>
                      <td className="px-4 py-3 text-right text-gray-300">{opt.openInterest.toLocaleString()}</td>
                      <td className="px-4 py-3 text-right">
                        <div className={`w-4 h-4 rounded-full border-2 mx-auto ${
                          strike === opt.strike ? "bg-yellow-400 border-yellow-400" : "border-gray-500"
                        }`} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Trade Form */}
          <div className="bg-[#1a1a1a] rounded-xl border border-[#2b2d33] p-4">
            <h3 className="text-white font-bold mb-4">📝 Trade {symbol} {selectedType}s</h3>

            <div className="space-y-4">
              <div>
                <label className="text-sm text-gray-400 block mb-1.5">Strike Price</label>
                <div className="bg-black rounded-xl px-4 py-3 text-white font-bold">
                  ${strike.toLocaleString()}
                </div>
              </div>

              <div>
                <label className="text-sm text-gray-400 block mb-1.5">Premium per Contract</label>
                <div className="bg-black rounded-xl px-4 py-3 text-yellow-400 font-bold">
                  ${premiumPerContract}
                </div>
              </div>

              <div>
                <label className="text-sm text-gray-400 block mb-1.5">Number of Contracts</label>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setContracts(Math.max(1, contracts - 1))}
                    className="px-4 py-2 bg-[#2b2d33] text-white rounded-lg hover:bg-[#3b3d43] transition"
                  >
                    −
                  </button>
                  <input
                    type="number"
                    value={contracts}
                    onChange={(e) => setContracts(Math.max(1, parseInt(e.target.value) || 1))}
                    className="flex-1 bg-black border border-[#2b2d33] rounded-xl px-4 py-2 text-white text-center focus:outline-none focus:border-yellow-400 transition"
                  />
                  <button
                    onClick={() => setContracts(contracts + 1)}
                    className="px-4 py-2 bg-[#2b2d33] text-white rounded-lg hover:bg-[#3b3d43] transition"
                  >
                    +
                  </button>
                </div>
              </div>

              <div>
                <label className="text-sm text-gray-400 block mb-1.5">Expiry Date</label>
                <select
                  value={expiry}
                  onChange={(e) => setExpiry(e.target.value)}
                  className="w-full bg-black border border-[#2b2d33] rounded-xl px-4 py-3 text-white focus:outline-none focus:border-yellow-400 transition"
                >
                  <option value="2025-01-31">Jan 31, 2025</option>
                  <option value="2025-02-28">Feb 28, 2025</option>
                  <option value="2025-03-31">Mar 31, 2025</option>
                </select>
              </div>

              <div className="bg-black/50 rounded-xl p-4 space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-500">Total Premium</span>
                  <span className="text-yellow-400 font-bold">${totalPremium.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Max Loss</span>
                  <span className="text-red-500">${totalPremium.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Breakeven</span>
                  <span className="text-white">${(strike + (selectedType === "Call" ? premiumPerContract : -premiumPerContract)).toLocaleString()}</span>
                </div>
              </div>

              <button
                onClick={handlePlaceOrder}
                className={`w-full py-3.5 rounded-xl font-bold transition ${
                  contracts > 0
                    ? "bg-yellow-500 text-black hover:bg-yellow-400"
                    : "bg-[#2b2d33] text-gray-500 cursor-not-allowed"
                }`}
              >
                Buy {selectedType}
              </button>
            </div>
          </div>
        </div>

        {/* Confirm Modal */}
        {step === "confirm" && (
          <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50">
            <div className="bg-[#1a1a1a] rounded-2xl border border-[#2b2d33] p-6 max-w-md w-full">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-white font-bold text-xl">Confirm Order</h3>
                <button
                  onClick={() => setStep("details")}
                  className="text-gray-400 hover:text-white text-xl"
                >
                  ✕
                </button>
              </div>

              <div className="space-y-4">
                <div className="bg-black/50 rounded-xl p-4 space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Type</span>
                    <span className={selectedType === "Call" ? "text-green-500" : "text-red-500"}>
                      {selectedType}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Strike</span>
                    <span className="text-white">${strike.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Contracts</span>
                    <span className="text-white">{contracts}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Total Premium</span>
                    <span className="text-yellow-400 font-bold">${totalPremium.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Expiry</span>
                    <span className="text-white">{expiry}</span>
                  </div>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() => setStep("details")}
                    className="flex-1 py-3 bg-[#2b2d33] text-white rounded-xl hover:bg-[#3b3d43] transition"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleConfirmOrder}
                    className="flex-1 py-3 bg-yellow-500 text-black font-bold rounded-xl hover:bg-yellow-400 transition"
                  >
                    Confirm
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
