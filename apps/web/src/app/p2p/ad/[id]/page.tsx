"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";

export default function P2PAdDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;

  // Mock ad data
  const ad = {
    id: parseInt(id),
    trader: "CryptoWhale",
    type: "buy",
    asset: "USDT",
    fiat: "PKR",
    price: 285.50,
    minAmount: 500,
    maxAmount: 50000,
    paymentMethods: ["Bank Transfer", "JazzCash", "EasyPaisa"],
    terms: "Please send payment within 15 minutes. Provide transaction screenshot.",
    completion: 98,
    verified: true,
    online: true,
    totalTrades: 1250,
    responseTime: "1-2 min",
    rating: 4.9,
  };

  const [amount, setAmount] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("Bank Transfer");
  const [step, setStep] = useState<"details" | "confirm" | "payment" | "completed">("details");

  const total = amount ? parseFloat(amount) * ad.price : 0;

  const handlePlaceOrder = () => {
    if (!amount) return;
    setStep("confirm");
  };

  const handleConfirmOrder = () => {
    setStep("payment");
  };

  const handlePaymentComplete = () => {
    setStep("completed");
  };

  return (
    <div className="min-h-screen bg-black p-4">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <button
              onClick={() => router.back()}
              className="text-gray-400 hover:text-white text-sm mb-2 block"
            >
              ← Back to P2P
            </button>
            <h1 className="text-2xl font-bold text-white">P2P Order</h1>
            <p className="text-sm text-gray-500 mt-1">Trade directly with {ad.trader}</p>
          </div>
          <div className="flex items-center gap-2">
            <span className={`px-3 py-1 rounded-full text-xs font-bold ${
              ad.type === "buy" ? "bg-green-500/20 text-green-500" : "bg-red-500/20 text-red-500"
            }`}>
              {ad.type === "buy" ? "Buying" : "Selling"} {ad.asset}
            </span>
            {ad.online && (
              <span className="px-3 py-1 bg-green-500/20 text-green-500 rounded-full text-xs font-bold">
                ● Online
              </span>
            )}
          </div>
        </div>

        {/* Ad Details */}
        <div className="bg-[#1a1a1a] rounded-xl border border-[#2b2d33] p-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="relative">
                <div className="w-14 h-14 rounded-full bg-yellow-500/20 flex items-center justify-center text-xl font-bold text-yellow-400">
                  {ad.trader.slice(0, 2).toUpperCase()}
                </div>
                {ad.online && (
                  <div className="absolute -bottom-0.5 -right-0.5 w-4 h-4 bg-green-500 rounded-full border-2 border-[#1a1a1a]"></div>
                )}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <p className="text-xl font-bold text-white">{ad.trader}</p>
                  {ad.verified && (
                    <span className="text-xs text-blue-400">✓ Verified</span>
                  )}
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-400">
                  <span>⭐ {ad.rating}</span>
                  <span>•</span>
                  <span>{ad.totalTrades} trades</span>
                  <span>•</span>
                  <span>⏱ {ad.responseTime}</span>
                </div>
              </div>
            </div>
            <div className="text-right">
              <p className="text-xs text-gray-500">Completion Rate</p>
              <p className="text-xl font-bold text-yellow-400">{ad.completion}%</p>
            </div>
          </div>
        </div>

        {/* Order Form */}
        <div className="bg-[#1a1a1a] rounded-xl border border-[#2b2d33] p-6">
          {step === "details" && (
            <div className="space-y-4">
              <h3 className="text-white font-bold text-lg">📝 Order Details</h3>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-black/50 rounded-lg p-3 text-center">
                  <p className="text-xs text-gray-500">Price</p>
                  <p className="text-xl font-bold text-white">{ad.price} {ad.fiat}</p>
                </div>
                <div className="bg-black/50 rounded-lg p-3 text-center">
                  <p className="text-xs text-gray-500">Limit</p>
                  <p className="text-xl font-bold text-white">{ad.minAmount} - {ad.maxAmount} {ad.fiat}</p>
                </div>
              </div>

              <div>
                <label className="text-sm text-gray-400 block mb-1.5">
                  Amount ({ad.fiat})
                </label>
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder={`${ad.minAmount} - ${ad.maxAmount}`}
                  className="w-full bg-black border border-[#2b2d33] rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-yellow-400 transition"
                />
                <div className="flex gap-2 mt-2">
                  {[25, 50, 75, 100].map((p) => (
                    <button
                      key={p}
                      onClick={() => setAmount(Math.round((ad.maxAmount * p) / 100).toString())}
                      className="flex-1 py-1.5 bg-[#2b2d33] text-gray-400 text-xs rounded hover:bg-[#3b3d43] transition"
                    >
                      {p}%
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-sm text-gray-400 block mb-1.5">Payment Method</label>
                <div className="flex flex-wrap gap-2">
                  {ad.paymentMethods.map((method) => (
                    <button
                      key={method}
                      onClick={() => setPaymentMethod(method)}
                      className={`px-4 py-2 rounded-lg text-sm transition ${
                        paymentMethod === method
                          ? "bg-yellow-500/20 text-yellow-400 border border-yellow-500/50"
                          : "bg-[#2b2d33] text-gray-400 hover:text-white"
                      }`}
                    >
                      {method}
                    </button>
                  ))}
                </div>
              </div>

              <div className="bg-black/50 rounded-xl p-4 space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-500">You {ad.type === "buy" ? "Pay" : "Receive"}</span>
                  <span className="text-white font-bold">
                    {total.toFixed(2)} {ad.fiat}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">You {ad.type === "buy" ? "Receive" : "Pay"}</span>
                  <span className="text-yellow-400 font-bold">
                    {(total / ad.price).toFixed(4)} {ad.asset}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Price</span>
                  <span className="text-white">{ad.price} {ad.fiat}</span>
                </div>
              </div>

              <button
                onClick={handlePlaceOrder}
                disabled={!amount || parseFloat(amount) < ad.minAmount || parseFloat(amount) > ad.maxAmount}
                className={`w-full py-3.5 rounded-xl font-bold transition ${
                  amount && parseFloat(amount) >= ad.minAmount && parseFloat(amount) <= ad.maxAmount
                    ? "bg-yellow-500 text-black hover:bg-yellow-400"
                    : "bg-[#2b2d33] text-gray-500 cursor-not-allowed"
                }`}
              >
                Place Order
              </button>
            </div>
          )}

          {/* Confirm Step */}
          {step === "confirm" && (
            <div className="space-y-4">
              <h3 className="text-white font-bold text-lg">✅ Confirm Order</h3>
              <div className="bg-black/50 rounded-xl p-4 space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-500">Trader</span>
                  <span className="text-white">{ad.trader}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Amount</span>
                  <span className="text-white">{amount} {ad.fiat}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Payment Method</span>
                  <span className="text-white">{paymentMethod}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Total</span>
                  <span className="text-yellow-400 font-bold">{total.toFixed(2)} {ad.fiat}</span>
                </div>
              </div>
              <div className="flex gap-3">
                <button
                  onClick={() => setStep("details")}
                  className="flex-1 py-3 bg-[#2b2d33] text-white rounded-xl hover:bg-[#3b3d43] transition"
                >
                  Edit
                </button>
                <button
                  onClick={handleConfirmOrder}
                  className="flex-1 py-3 bg-yellow-500 text-black font-bold rounded-xl hover:bg-yellow-400 transition"
                >
                  Confirm Order
                </button>
              </div>
            </div>
          )}

          {/* Payment Step */}
          {step === "payment" && (
            <div className="space-y-4">
              <h3 className="text-white font-bold text-lg">💳 Payment Instructions</h3>
              <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-xl p-4">
                <p className="text-sm text-yellow-400">⚠️ Please complete payment within 15 minutes</p>
              </div>
              <div className="bg-black/50 rounded-xl p-4 space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-500">Amount to Pay</span>
                  <span className="text-yellow-400 font-bold">{total.toFixed(2)} {ad.fiat}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Payment Method</span>
                  <span className="text-white">{paymentMethod}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Trader</span>
                  <span className="text-white">{ad.trader}</span>
                </div>
              </div>
              <div className="bg-black/50 rounded-xl p-4 text-sm">
                <p className="text-gray-400">{ad.terms}</p>
              </div>
              <button
                onClick={handlePaymentComplete}
                className="w-full py-3 bg-green-500 text-white font-bold rounded-xl hover:bg-green-600 transition"
              >
                ✅ I've Completed Payment
              </button>
            </div>
          )}

          {/* Completed Step */}
          {step === "completed" && (
            <div className="text-center space-y-4 py-8">
              <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center text-4xl mx-auto">
                🎉
              </div>
              <h3 className="text-2xl font-bold text-white">Order Placed!</h3>
              <p className="text-gray-400">
                Your order has been placed. The trader will release the {ad.asset} after payment confirmation.
              </p>
              <div className="bg-black/50 rounded-xl p-4 text-sm">
                <p className="text-gray-400">Order ID: #P2P-{String(Date.now()).slice(-6)}</p>
                <p className="text-gray-400">Amount: {amount} {ad.fiat} → {(total / ad.price).toFixed(4)} {ad.asset}</p>
              </div>
              <Link href="/p2p/orders">
                <button className="px-8 py-3 bg-yellow-500 text-black font-bold rounded-xl hover:bg-yellow-400 transition">
                  View My Orders
                </button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
