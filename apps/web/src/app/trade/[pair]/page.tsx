"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";

// ===== COINGECKO API CONFIG =====
const COINGECKO_API = "https://api.coingecko.com/api/v3";
const TOP_COINS_COUNT = 1000; // 🔥 1000 coins
const COINS_PER_PAGE = 250;

// ===== FETCH 1000+ COINS FROM COINGECKO =====
const fetchTopCoins = async (page: number) => {
  const url = `${COINGECKO_API}/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=${COINS_PER_PAGE}&page=${page}&sparkline=false&price_change_percentage=1h,24h,7d`;
  const res = await fetch(url);
  return res.json();
};

// ===== FETCH ALL COINS LIST (IDs) =====
const fetchCoinList = async () => {
  const res = await fetch(`${COINGECKO_API}/coins/list`);
  const data = await res.json();
  return data.map((coin: any) => coin.id);
};

// ===== FETCH SINGLE COIN DATA =====
const fetchCoinData = async (coinId: string) => {
  const res = await fetch(`${COINGECKO_API}/coins/${coinId}?localization=false&tickers=false&market_data=true`);
  const data = await res.json();
  return data;
};

// ===== FETCH HISTORICAL CHART DATA =====
const fetchChartData = async (coinId: string, days: number = 30) => {
  const res = await fetch(`${COINGECKO_API}/coins/${coinId}/market_chart?vs_currency=usd&days=${days}`);
  const data = await res.json();
  return data.prices.map((p: [number, number]) => ({
    time: new Date(p[0]).toISOString().slice(0, 16),
    price: p[1],
  }));
};

// ===== CMC CHART =====
function CMCChart({ symbol }: { symbol: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const widgetId = `cmc-widget-${Date.now()}`;

  useEffect(() => {
    if (!containerRef.current) return;
    containerRef.current.innerHTML = "";

    const script = document.createElement("script");
    script.src = "https://files.coinmarketcap.com/static/widget/coinPriceBlock.js";
    script.async = true;

    script.onload = () => {
      if (containerRef.current) {
        const widget = document.createElement("div");
        widget.id = widgetId;
        widget.setAttribute("coins", "1,1027,1839,5426,52");
        widget.setAttribute("currency", "USD");
        widget.setAttribute("theme", "dark");
        widget.setAttribute("transparent", "false");
        widget.setAttribute("show-symbol-logo", "true");
        containerRef.current.appendChild(widget);
      }
    };

    document.head.appendChild(script);
    return () => { if (containerRef.current) containerRef.current.innerHTML = ""; };
  }, [symbol]);

  return <div ref={containerRef} className="w-full h-full min-h-[200px]" />;
}

// ===== TYPE DEFINITIONS =====
interface CoinData {
  id: string;
  symbol: string;
  name: string;
  current_price: number;
  price_change_percentage_24h: number;
  high_24h: number;
  low_24h: number;
  total_volume: number;
  market_cap: number;
}

interface Order {
  price: number;
  amount: number;
}

export default function TradePage() {
  const params = useParams();
  const pair = (params.pair as string) || "BTCUSDT";
  const displaySymbol = pair.replace("USDT", "").toLowerCase();

  const [side, setSide] = useState<"buy" | "sell">("buy");
  const [orderType, setOrderType] = useState<"limit" | "market" | "tpSl">("limit");
  const [showTPSL, setShowTPSL] = useState(false);
  const [showCoinSearch, setShowCoinSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTimeframe, setActiveTimeframe] = useState("15m");
  const [showTimeframes, setShowTimeframes] = useState(false);

  const [price, setPrice] = useState(0);
  const [priceChange, setPriceChange] = useState(0);
  const [high, setHigh] = useState(0);
  const [low, setLow] = useState(0);
  const [volume, setVolume] = useState(0);
  const [coinData, setCoinData] = useState<CoinData | null>(null);
  const [coinList, setCoinList] = useState<{ id: string; symbol: string }[]>([]);
  const [loading, setLoading] = useState(true);

  const searchRef = useRef<HTMLDivElement>(null);
  const wsRef = useRef<WebSocket | null>(null);

  const timeframes = ["1s", "1m", "5m", "15m", "30m", "1H", "4H", "1D", "1W", "1M"];
  const visibleTimeframes = ["1s", "1m", "5m", "15m", "30m", "1H", "4H", "1D"];

  const filteredCoins = coinList.filter(c => 
    c.symbol.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.id.toLowerCase().includes(searchQuery.toLowerCase())
  ).slice(0, 50);

  // ===== FETCH 1000+ COINS LIST =====
  useEffect(() => {
    const loadCoins = async () => {
      try {
        const list = await fetchCoinList();
        setCoinList(list.slice(0, 1000).map((id: string) => ({ id, symbol: id.slice(0, 4).toUpperCase() })));
      } catch (error) {
        console.error("Error fetching coin list:", error);
      }
    };
    loadCoins();
  }, []);

  // ===== FETCH COIN DATA =====
  const updateCoinData = async () => {
    try {
      const allCoins: CoinData[] = [];
      let page = 1;
      let totalFetched = 0;

      while (totalFetched < TOP_COINS_COUNT) {
        const data = await fetchTopCoins(page);
        if (data.length === 0) break;
        allCoins.push(...data);
        totalFetched += data.length;
        page++;
      }

      const found = allCoins.find(c => c.id === displaySymbol || c.symbol === displaySymbol);
      if (found) {
        setCoinData(found);
        setPrice(found.current_price);
        setPriceChange(found.price_change_percentage_24h || 0);
        setHigh(found.high_24h || 0);
        setLow(found.low_24h || 0);
        setVolume(found.total_volume || 0);
      }
      setLoading(false);
    } catch (error) {
      console.error("Error fetching coin data:", error);
      setLoading(false);
    }
  };

  // ===== INITIAL LOAD =====
  useEffect(() => {
    updateCoinData();
  }, [displaySymbol]);

  // ===== CLOSE SEARCH =====
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowCoinSearch(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleCoinSelect = (coinId: string) => {
    setShowCoinSearch(false);
    setSearchQuery("");
    window.location.href = `/trade/${coinId.toUpperCase()}USDT`;
  };

  const displayName = displaySymbol.toUpperCase();

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0A0A0A] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-blue-500 border-r-2 border-blue-500 mx-auto"></div>
          <p className="text-gray-400 mt-4">Loading {pair}...</p>
          <p className="text-xs text-gray-500 mt-2">Fetching data from CoinGecko</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white font-sans overflow-x-hidden">
      {/* ===== TOP NAVBAR ===== */}
      <div className="bg-black border-b border-gray-800 px-4 py-2 flex items-center justify-between sticky top-0 z-50">
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-500 rounded flex items-center justify-center text-xl font-bold text-white">C</div>
            <span className="font-bold text-2xl text-white">CashiPro</span>
          </Link>
          <nav className="hidden md:flex items-center gap-4 text-sm text-gray-300">
            <Link href="/markets" className="hover:text-white">Markets</Link>
            <Link href="/trade/BTCUSDT" className="text-blue-400">Spot</Link>
            <Link href="/futures" className="hover:text-white">Futures</Link>
            <Link href="/earn" className="hover:text-white">Earn</Link>
          </nav>
        </div>
        <div className="flex items-center gap-3">
          <Link href="/login" className="text-sm text-gray-300 hover:text-white hidden md:block">Log In</Link>
          <Link href="/register">
            <button className="bg-blue-600 hover:bg-blue-700 px-4 py-1.5 rounded-full text-sm font-medium">Sign Up</button>
          </Link>
          <button className="md:hidden text-2xl text-white">☰</button>
        </div>
      </div>

      {/* ===== PAIR HEADER ===== */}
      <div className="bg-[#111] border-b border-gray-700 px-4 md:px-6 py-3 flex flex-wrap items-center gap-4 md:gap-8">
        <div className="flex items-center gap-3 relative" ref={searchRef}>
          <div 
            className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl flex items-center justify-center text-xl font-bold text-white cursor-pointer"
            onClick={() => setShowCoinSearch(!showCoinSearch)}
          >
            {displayName.slice(0, 2)}
          </div>
          <div>
            <div 
              className="text-2xl font-bold text-white cursor-pointer flex items-center gap-2"
              onClick={() => setShowCoinSearch(!showCoinSearch)}
            >
              {pair}
              <span className="text-xs text-gray-400">▼</span>
            </div>
            <div className="text-xs text-gray-500">{displayName} / USDT</div>
          </div>

          {showCoinSearch && (
            <div className="absolute top-full left-0 mt-2 bg-[#1A1A1A] border border-gray-700 rounded-xl p-3 z-50 min-w-[200px] max-h-[300px] overflow-y-auto">
              <input
                type="text"
                placeholder="Search 1000+ coins..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-gray-900 border border-gray-700 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-blue-500"
                autoFocus
              />
              <div className="mt-2">
                {filteredCoins.length > 0 ? (
                  filteredCoins.map((coin) => (
                    <button
                      key={coin.id}
                      onClick={() => handleCoinSelect(coin.id)}
                      className="w-full text-left px-3 py-2 text-sm text-white hover:bg-gray-800 rounded-lg transition flex items-center justify-between"
                    >
                      <span>{coin.id}</span>
                      <span className="text-xs text-gray-500">{coin.symbol}</span>
                    </button>
                  ))
                ) : (
                  <p className="text-sm text-gray-500 px-3 py-2">No coins found</p>
                )}
              </div>
            </div>
          )}
        </div>

        <div className="flex flex-wrap items-center gap-6 md:gap-10">
          <div>
            <span className="text-3xl font-mono font-bold text-white">
              {price > 0 ? price.toFixed(2).toLocaleString() : "---"}
            </span>
            <span className={`ml-2 text-lg ${priceChange >= 0 ? "text-green-500" : "text-red-500"}`}>
              {priceChange >= 0 ? "+" : ""}{priceChange.toFixed(2)}%
            </span>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-1 text-sm">
            <div><span className="text-gray-500">24H High</span> <span className="text-white">{high > 0 ? high.toFixed(2) : "---"}</span></div>
            <div><span className="text-gray-500">24H Low</span> <span className="text-white">{low > 0 ? low.toFixed(2) : "---"}</span></div>
            <div><span className="text-gray-500">24H Vol</span> <span className="text-white">{volume > 0 ? volume.toLocaleString() : "---"}</span></div>
            <div><span className="text-gray-500">Market Cap</span> <span className="text-white">{coinData?.market_cap ? `$${(coinData.market_cap / 1e9).toFixed(2)}B` : "---"}</span></div>
          </div>
        </div>
      </div>

      {/* ===== MAIN LAYOUT ===== */}
      <div className="flex flex-col lg:flex-row h-[calc(100vh-180px)]">
        <div className="flex-1 flex flex-col min-w-0 border-r border-gray-800">
          <div className="flex flex-wrap items-center justify-between border-b border-gray-800 px-4 py-2 gap-2">
            <div className="flex gap-4 text-sm">
              <span className="text-blue-400 border-b-2 border-blue-400 pb-2">Chart</span>
              <span className="text-gray-400">Info</span>
              <span className="text-gray-400">Trading Data</span>
              <span className="text-gray-400">Compare</span>
            </div>

            <div className="flex items-center gap-1 text-xs relative">
              {visibleTimeframes.map((tf) => (
                <button
                  key={tf}
                  onClick={() => setActiveTimeframe(tf)}
                  className={`px-2 py-1 rounded transition ${activeTimeframe === tf ? "bg-blue-600 text-white" : "text-gray-400 hover:bg-gray-800"}`}
                >
                  {tf}
                </button>
              ))}
              <button
                onClick={() => setShowTimeframes(!showTimeframes)}
                className="px-1.5 py-1 text-gray-400 hover:text-white transition"
              >
                ▼
              </button>
              {showTimeframes && (
                <div className="absolute top-full right-0 mt-1 bg-[#1A1A1A] border border-gray-700 rounded-lg p-1 z-10 min-w-[60px]">
                  {timeframes.map((tf) => (
                    <button
                      key={tf}
                      onClick={() => { setActiveTimeframe(tf); setShowTimeframes(false); }}
                      className={`block w-full text-left px-3 py-1 text-xs rounded hover:bg-gray-800 transition ${activeTimeframe === tf ? "text-blue-400" : "text-gray-400"}`}
                    >
                      {tf}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="flex-1 bg-[#0F1217] p-2 min-h-[250px]">
            <CMCChart symbol={displayName} />
          </div>

          <div className="bg-[#111] px-4 py-1.5 border-t border-gray-800 flex flex-wrap gap-4 text-xs">
            <div>VOL <span className="text-white">108.91</span></div>
            <div>VOL(USDT) <span className="text-white">181.51K</span></div>
            <div>MA5 <span className="text-yellow-400">65,200</span></div>
            <div>MA10 <span className="text-purple-400">65,100</span></div>
            <div>MA20 <span className="text-blue-400">65,000</span></div>
          </div>
        </div>

        {/* ===== ORDER BOOK + SPOT ===== */}
        <div className="w-full lg:w-[440px] xl:w-[480px] flex flex-row bg-[#0A0A0A]">
          <div className="w-[120px] flex flex-col border-r border-gray-700">
            <div className="flex border-b border-gray-700 px-2 py-1.5">
              <span className="text-blue-400 border-b-2 border-blue-400 pb-1 text-[10px] font-medium">Order Book</span>
            </div>
            <div className="flex-1 overflow-y-auto px-1.5">
              <div className="grid grid-cols-2 text-[8px] text-gray-500 mb-0.5">
                <div>Price</div>
                <div className="text-right">Amt</div>
              </div>
              {[...Array(6)].map((_, i) => (
                <div key={`ask-${i}`} className="grid grid-cols-2 text-[10px] py-0.5 hover:bg-red-500/10 text-red-400">
                  <div>{(price * (1 + (i + 1) * 0.001)).toFixed(2)}</div>
                  <div className="text-right text-gray-300">{(Math.random() * 2 + 0.1).toFixed(4)}</div>
                </div>
              ))}
              <div className="bg-[#1C1C1C] py-1 text-center border-y border-gray-700 my-0.5">
                <div className="text-xs font-bold text-white">{price > 0 ? price.toFixed(2) : "---"}</div>
              </div>
              {[...Array(6)].map((_, i) => (
                <div key={`bid-${i}`} className="grid grid-cols-2 text-[10px] py-0.5 hover:bg-green-500/10 text-green-400">
                  <div>{(price * (1 - (i + 1) * 0.001)).toFixed(2)}</div>
                  <div className="text-right text-gray-300">{(Math.random() * 2 + 0.1).toFixed(4)}</div>
                </div>
              ))}
            </div>
          </div>

          {/* ===== SPOT SECTION ===== */}
          <div className="flex-1 flex flex-col bg-[#111] p-3">
            <div className="flex rounded-lg overflow-hidden bg-gray-900 mb-2">
              <button
                onClick={() => setSide("buy")}
                className={`flex-1 py-2 text-sm font-bold transition ${side === "buy" ? "bg-green-500 text-black" : "text-gray-400"}`}
              >
                Buy
              </button>
              <button
                onClick={() => setSide("sell")}
                className={`flex-1 py-2 text-sm font-bold transition ${side === "sell" ? "bg-red-500 text-white" : "text-gray-400"}`}
              >
                Sell
              </button>
            </div>

            <div className="flex items-center gap-1 mb-2 text-xs">
              <button onClick={() => setOrderType("limit")} className={`px-3 py-1 rounded transition ${orderType === "limit" ? "bg-gray-700 text-white" : "text-gray-400 hover:bg-gray-800"}`}>Limit</button>
              <button onClick={() => setOrderType("market")} className={`px-3 py-1 rounded transition ${orderType === "market" ? "bg-gray-700 text-white" : "text-gray-400 hover:bg-gray-800"}`}>Market</button>
              <button onClick={() => setOrderType("tpSl")} className={`px-3 py-1 rounded transition ${orderType === "tpSl" ? "bg-gray-700 text-white" : "text-gray-400 hover:bg-gray-800"}`}>TP/SL</button>
              <div className="ml-auto flex items-center gap-2">
                <span className="text-[10px] text-gray-500">TP/SL</span>
                <button
                  onClick={() => setShowTPSL(!showTPSL)}
                  className={`w-8 h-4 rounded-full transition ${showTPSL ? "bg-blue-500" : "bg-gray-700"}`}
                >
                  <div className={`w-3 h-3 bg-white rounded-full transition transform ${showTPSL ? "translate-x-4" : "translate-x-0.5"}`} />
                </button>
              </div>
            </div>

            <div className="mb-1.5">
              <div className="flex justify-between text-[10px] text-gray-500">
                <span>Price (USDT)</span>
                <span>Available <span className="text-white">0.0142 USDT</span></span>
              </div>
              <input
                type="text"
                defaultValue={price > 0 ? price.toFixed(2) : "0"}
                className="w-full bg-gray-900 border border-gray-700 rounded px-2 py-2 text-sm text-white focus:outline-none focus:border-blue-500"
              />
            </div>

            <div className="mb-1.5">
              <div className="text-[10px] text-gray-500">Amount</div>
              <input type="text" placeholder="0" className="w-full bg-gray-900 border border-gray-700 rounded px-2 py-2 text-sm text-white focus:outline-none focus:border-blue-500" />
            </div>

            <div className="flex gap-1 text-xs">
              {[0, 25, 50, 75, 100].map((p) => (
                <button key={p} className="flex-1 py-1 bg-gray-800 rounded hover:bg-gray-700 text-xs">{p}%</button>
              ))}
            </div>

            <div className="text-[10px] text-gray-500 mt-1">Total (USDT) <span className="text-white">0</span></div>

            {showTPSL && (
              <div className="mt-2 space-y-1.5 border-t border-gray-700 pt-2">
                <div>
                  <div className="text-[10px] text-gray-500">TP trigger price (USDT)</div>
                  <input type="text" placeholder={(price * 1.02).toFixed(2)} className="w-full bg-gray-900 border border-gray-700 rounded px-2 py-1.5 text-sm text-white focus:outline-none focus:border-blue-500" />
                </div>
                <div>
                  <div className="text-[10px] text-gray-500">SL trigger price (USDT)</div>
                  <input type="text" placeholder={(price * 0.98).toFixed(2)} className="w-full bg-gray-900 border border-gray-700 rounded px-2 py-1.5 text-sm text-white focus:outline-none focus:border-blue-500" />
                </div>
              </div>
            )}

            <button
              onClick={() => {
                const inputs = document.querySelectorAll('input[type="text"]');
                const priceInput = inputs[0] as HTMLInputElement;
                const amountInput = inputs[1] as HTMLInputElement;
                const p = parseFloat(priceInput?.value.replace(/,/g, "") || "0");
                const a = parseFloat(amountInput?.value || "0");
                if (p > 0 && a > 0) {
                  alert(`Order placed: ${side} ${displayName} @ ${p} x ${a}`);
                } else {
                  alert("Please enter valid price and amount");
                }
              }}
              className={`w-full mt-2 py-3 rounded-xl text-base font-bold transition ${side === "buy" ? "bg-green-500 hover:bg-green-600 text-black" : "bg-red-500 hover:bg-red-600 text-white"}`}
            >
              {side === "buy" ? `Buy ${displayName}` : `Sell ${displayName}`}
            </button>
          </div>
        </div>
      </div>

      <div className="bg-[#0F1117] border-t border-gray-700 px-4 py-2 flex flex-wrap items-center justify-between text-sm">
        <div className="flex gap-4 overflow-x-auto">
          <span className="text-blue-400 border-b-2 border-blue-400 pb-1 whitespace-nowrap">Open Orders(0)</span>
          <span className="text-gray-400 whitespace-nowrap">Order History</span>
          <span className="text-gray-400 whitespace-nowrap">Trade History</span>
          <span className="text-gray-400 whitespace-nowrap">Holdings(1)</span>
        </div>
        <div className="flex items-center gap-4 text-xs text-gray-500">
          <span>Maker 0.0000% / Taker 0.0400%</span>
          <button className="bg-blue-600 hover:bg-blue-500 px-4 py-1 rounded-full text-white text-sm font-medium">Deposit</button>
        </div>
      </div>
    </div>
  );
}
