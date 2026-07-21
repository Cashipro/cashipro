"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function KYCPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [country, setCountry] = useState("");
  const [idType, setIdType] = useState("");
  const [idNumber, setIdNumber] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const countries = [
    "United States", "United Kingdom", "Canada", "Australia",
    "Germany", "France", "India", "Pakistan", "UAE", "Singapore"
  ];

  const idTypes = ["Passport", "National ID", "Driver's License"];

  const handleSubmit = async () => {
    setIsLoading(true);
    // Simulate KYC submission
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsLoading(false);
    router.push("/kyc/status");
  };

  return (
    <div className="min-h-screen bg-black p-4">
      <div className="max-w-2xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-yellow-500/20 rounded-xl flex items-center justify-center text-2xl">
            🛡️
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white">Identity Verification</h1>
            <p className="text-sm text-gray-500">Complete KYC to unlock all features</p>
          </div>
        </div>

        {/* Progress Steps */}
        <div className="flex items-center gap-2">
          {[1, 2, 3, 4].map((s) => (
            <div key={s} className="flex items-center gap-2">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                s === step ? "bg-yellow-500 text-black" :
                s < step ? "bg-green-500 text-white" :
                "bg-[#2b2d33] text-gray-500"
              }`}>
                {s < step ? "✓" : s}
              </div>
              {s < 4 && <div className={`w-8 h-0.5 ${s < step ? "bg-green-500" : "bg-[#2b2d33]"}`} />}
            </div>
          ))}
        </div>

        {/* Step Labels */}
        <div className="flex justify-between text-xs text-gray-500">
          <span>Country</span>
          <span>Documents</span>
          <span>Personal Info</span>
          <span>Submit</span>
        </div>

        {/* Step Content */}
        <div className="bg-[#1a1a1a] rounded-xl border border-[#2b2d33] p-6">
          {/* Step 1: Country */}
          {step === 1 && (
            <div className="space-y-4">
              <h3 className="text-white font-bold">Select Your Country</h3>
              <p className="text-sm text-gray-500">Choose your country of residence</p>
              <select
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                className="w-full bg-black border border-[#2b2d33] rounded-xl px-4 py-3 text-white focus:outline-none focus:border-yellow-400 transition"
              >
                <option value="">Select country...</option>
                {countries.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
              <button
                onClick={() => setStep(2)}
                disabled={!country}
                className={`w-full py-3 rounded-xl font-bold transition ${
                  country ? "bg-yellow-500 text-black hover:bg-yellow-400" : "bg-[#2b2d33] text-gray-500 cursor-not-allowed"
                }`}
              >
                Next Step →
              </button>
            </div>
          )}

          {/* Step 2: Documents */}
          {step === 2 && (
            <div className="space-y-4">
              <h3 className="text-white font-bold">Upload Documents</h3>
              <p className="text-sm text-gray-500">We need a valid government-issued ID</p>

              <div>
                <label className="text-sm text-gray-400 block mb-1.5">Document Type</label>
                <select
                  value={idType}
                  onChange={(e) => setIdType(e.target.value)}
                  className="w-full bg-black border border-[#2b2d33] rounded-xl px-4 py-3 text-white focus:outline-none focus:border-yellow-400 transition"
                >
                  <option value="">Select document type...</option>
                  {idTypes.map((t) => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-sm text-gray-400 block mb-1.5">Upload Front Side</label>
                <div className="border-2 border-dashed border-[#2b2d33] rounded-xl p-8 text-center hover:border-yellow-400 transition cursor-pointer">
                  <span className="text-3xl block mb-2">📷</span>
                  <p className="text-sm text-gray-400">Click or drag to upload</p>
                  <p className="text-xs text-gray-500">JPG, PNG, PDF (Max 5MB)</p>
                </div>
              </div>

              <button
                onClick={() => setStep(3)}
                disabled={!idType}
                className={`w-full py-3 rounded-xl font-bold transition ${
                  idType ? "bg-yellow-500 text-black hover:bg-yellow-400" : "bg-[#2b2d33] text-gray-500 cursor-not-allowed"
                }`}
              >
                Next Step →
              </button>
            </div>
          )}

          {/* Step 3: Personal Info */}
          {step === 3 && (
            <div className="space-y-4">
              <h3 className="text-white font-bold">Personal Information</h3>
              <p className="text-sm text-gray-500">Enter your details exactly as on your ID</p>

              <div>
                <label className="text-sm text-gray-400 block mb-1.5">ID Number</label>
                <input
                  type="text"
                  value={idNumber}
                  onChange={(e) => setIdNumber(e.target.value)}
                  placeholder="Enter your ID number"
                  className="w-full bg-black border border-[#2b2d33] rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-yellow-400 transition"
                />
              </div>

              <div>
                <label className="text-sm text-gray-400 block mb-1.5">Phone Number</label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+1 234 567 8900"
                  className="w-full bg-black border border-[#2b2d33] rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-yellow-400 transition"
                />
              </div>

              <div>
                <label className="text-sm text-gray-400 block mb-1.5">Residential Address</label>
                <input
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="123 Main St, City, Country"
                  className="w-full bg-black border border-[#2b2d33] rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-yellow-400 transition"
                />
              </div>

              <button
                onClick={() => setStep(4)}
                disabled={!idNumber || !phone || !address}
                className={`w-full py-3 rounded-xl font-bold transition ${
                  idNumber && phone && address ? "bg-yellow-500 text-black hover:bg-yellow-400" : "bg-[#2b2d33] text-gray-500 cursor-not-allowed"
                }`}
              >
                Next Step →
              </button>
            </div>
          )}

          {/* Step 4: Submit */}
          {step === 4 && (
            <div className="space-y-4 text-center">
              <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center text-4xl mx-auto">
                📝
              </div>
              <h3 className="text-white font-bold text-xl">Ready to Submit</h3>
              <p className="text-gray-400">Please review your information before submitting.</p>

              <div className="bg-black/50 rounded-xl p-4 text-left space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-500">Country</span>
                  <span className="text-white">{country || "Not specified"}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Document Type</span>
                  <span className="text-white">{idType || "Not specified"}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">ID Number</span>
                  <span className="text-white">{idNumber || "Not specified"}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Phone</span>
                  <span className="text-white">{phone || "Not specified"}</span>
                </div>
              </div>

              <button
                onClick={handleSubmit}
                disabled={isLoading}
                className={`w-full py-3 rounded-xl font-bold transition ${
                  isLoading ? "bg-[#2b2d33] text-gray-400" : "bg-yellow-500 text-black hover:bg-yellow-400"
                }`}
              >
                {isLoading ? "Submitting..." : "Submit Verification"}
              </button>
            </div>
          )}
        </div>

        {/* Help Link */}
        <div className="text-center">
          <p className="text-sm text-gray-500">
            Need help?{" "}
            <Link href="/support" className="text-yellow-400 hover:text-yellow-300 transition">
              Contact Support
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
