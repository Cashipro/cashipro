export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black to-zinc-950">
      <div className="text-center px-6">
        <h1 className="text-7xl font-bold mb-6 tracking-tight">
          Cashi<span className="text-[#00ff9f]">pro</span>
        </h1>
        <p className="text-2xl text-gray-400 mb-10 max-w-2xl mx-auto">
          Trade Cryptocurrency with Speed, Security & Precision
        </p>
        <a
          href="/trade/BTCUSDT"
          className="inline-block bg-[#00ff9f] hover:bg-[#00e68a] text-black font-semibold text-xl px-10 py-4 rounded-2xl transition-all active:scale-95"
        >
          Start Trading Now
        </a>
      </div>
    </div>
  );
}
