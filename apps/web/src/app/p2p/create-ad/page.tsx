"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CreateAdPage() {
  const router = useRouter();
  const [type, setType] = useState<"buy" | "sell">("buy");
  const [asset, setAsset] = useState("USDT");
  const [fiat, setFiat] = useState("PKR");
  const [price, setPrice] = useState("");
  const [minAmount, setMinAmount] = useState("");
  const [maxAmount, setMaxAmount] = useState("");
  const [paymentMethods, setPaymentMethods] = useState<string[]>([]);
  const [terms, setTerms] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const togglePayment = (method: string) => {
    setPaymentMethods((prev) =>
      prev.includes(method)
        ? prev.filter((p) => p !== method)
        : [...prev, method]
    );
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsLoading(false);
    router.push("/p2p");
  };

  return (
    <div className="min-h-screen bg-black p-4">
      <div className="max-w-2xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-white">📝 Create Ad</h1>
            <p className="text-sm text-gray-500 mt-1">List your P2P offer</p>
          </div>
          <button onClick={() => router.back()} className="text-gray-400 hover:text-white text-sm">
            ← Back
          </button>
        </div>

        <div className="bg-[#1a1a1a] rounded-xl border border-[#2b2d33] p-6 space-y-4">
          {/* Buy/Sell */}
          <div>
            <label className="text-sm text-gray-400 block mb-2">Type</label>
            <div className="flex gap-2">
              <button
                onClick={() => setType("buy")}
                className={`flex-1 py-2.5 rounded-lg text-sm font-bold transition ${
                  type === "buy"
                    ? "bg-green-500 text-white"
                    : "bg-[#2b2d33] text-gray-400"
                }`}
              >
                Buy
              </button>
              <button
                onClick={() => setType("sell")}
                className={`flex-1 py-2.5 rounded-lg text-sm font-bold transition ${
                  type === "sell"
                    ? "bg-red-500 text-white"
                    : "bg-[#2b2d33] text-gray-400"
                }`}
              >
                Sell
              </button>
            </div>
          </div>

          {/* Asset & Fiat */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm text-gray-400 block mb-1.5">Asset</label>
              <select
                value={asset}
                onChange={(e) => setAsset(e.target.value)}
                className="w-full bg-black border border-[#2b2d33] rounded-lg px-4 py-3 text-white focus:outline-none focus:border-yellow-400 transition"
              >
                <option>USDT</option>
                <option>BTC</option>
                <option>ETH</option>
                <option>BNB</option>
              </select>
            </div>
            <div>
              <label className="text-sm text-gray-400 block mb-1.5">Fiat</label>
              <select
                value={fiat}
                onChange={(e) => setFiat(e.target.value)}
                className="w-full bg-black border border-[#2b2d33] rounded-lg px-4 py-3 text-white focus:outline-none focus:border-yellow-400 transition"
              >
                <option>PKR</option>
                <option>USD</option>
                <option>EUR</option>
                <option>GBP</option>
              </select>
            </div>
          </div>

          {/* Price */}
          <div>
            <label className="text-sm text-gray-400 block mb-1.5">Price per {asset}</label>
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder={`0.00 ${fiat}`}
              className="w-full bg-black border border-[#2b2d33] rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-yellow-400 transition"
            />
          </div>

          {/* Amount Range */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm text-gray-400 block mb-1.5">Min Amount</label>
              <input
                type="number"
                value={minAmount}
                onChange={(e) => setMinAmount(e.target.value)}
                placeholder="0.00"
                className="w-full bg-black border border-[#2b2d33] rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-yellow-400 transition"
              />
            </div>
            <div>
              <label className="text-sm text-gray-400 block mb-1.5">Max Amount</label>
              <input
                type="number"
                value={maxAmount}
                onChange={(e) => setMaxAmount(e.target.value)}
                placeholder="0.00"
                className="w-full bg-black border border-[#2b2d33] rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-yellow-400 transition"
              />
            </div>
          </div>

          {/* Payment Methods */}
          <div>
            <label className="text-sm text-gray-400 block mb-2">Payment Methods</label>
            <div className="flex flex-wrap gap-2">
              {["Bank Transfer", "JazzCash", "EasyPaisa", "Meezan", "Sadapay"].map((method) => (
                <button
                  key={method}
                  onClick={() => togglePayment(method)}
                  className={`px-4 py-2 rounded-lg text-sm transition ${
                    paymentMethods.includes(method)
                      ? "bg-yellow-500/20 text-yellow-400 border border-yellow-500/50"
                      : "bg-[#2b2d33] text-gray-400 hover:text-white"
                  }`}
                >
                  {method}
                </button>
              ))}
            </div>
          </div>

          {/* Terms */}
          <div>
            <label className="text-sm text-gray-400 block mb-1.5">Terms & Instructions</label>
            <textarea
              value={terms}
              onChange={(e) => setTerms(e.target.value)}
              placeholder="Add your terms, payment instructions..."
              rows={3}
              className="w-full bg-black border border-[#2b2d33] rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-yellow-400 transition resize-none"
            />
          </div>

          {/* Submit */}
          <button
            onClick={handleSubmit}
            disabled={isLoading || !price || !minAmount || !maxAmount || paymentMethods.length === 0}
            className={`w-full py-3.5 rounded-xl font-bold transition ${
              isLoading || !price || !minAmount || !maxAmount || paymentMethods.length === 0
                ? "bg-[#2b2d33] text-gray-500 cursor-not-allowed"
                : "bg-yellow-500 text-black hover:bg-yellow-400"
            }`}
          >
            {isLoading ? "Creating..." : "Publish Ad"}
          </button>
        </div>
      </div>
    </div>
  );
}
