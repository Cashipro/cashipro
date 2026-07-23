"use client";

import React, { useEffect, useRef, useState } from "react";
import { createChart } from "lightweight-charts";

export default function Chart({ symbol }: { symbol: string }) {
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const [selectedTF, setSelectedTF] = useState("15");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const timeframes = ["1", "5", "15", "60", "240", "D"];

  useEffect(() => {
    let chart: any = null;

    const initChart = async () => {
      const container = chartContainerRef.current;
      if (!container) {
        console.error("Chart container not found");
        return;
      }

      try {
        // Clear previous chart
        container.innerHTML = "";

        chart = createChart(container, {
          width: container.clientWidth || 900,
          height: 520,
          layout: { background: { color: "#0F1217" }, textColor: "#ddd" },
          grid: { vertLines: { color: "#1F2937" }, horzLines: { color: "#1F2937" } },
          timeScale: { timeVisible: true, secondsVisible: false },
        });

        const candleSeries = chart.addCandlestickSeries({
          upColor: "#22c55e",
          downColor: "#ef4444",
          wickUpColor: "#22c55e",
          wickDownColor: "#ef4444",
        });

        const volumeSeries = chart.addHistogramSeries({
          priceScaleId: "volume",
        });

        chart.priceScale("volume").applyOptions({
          scaleMargins: { top: 0.8, bottom: 0 },
        });

        // Fetch data
        setLoading(true);
        const res = await fetch(
          `https://api.binance.com/api/v3/klines?symbol=${symbol}&interval=${selectedTF}&limit=300`
        );

        if (!res.ok) throw new Error("Failed to fetch data");

        const data = await res.json();

        const candles = data.map((d: any) => ({
          time: Math.floor(d[0] / 1000),
          open: +d[1],
          high: +d[2],
          low: +d[3],
          close: +d[4],
        }));

        const volumes = data.map((d: any) => ({
          time: Math.floor(d[0] / 1000),
          value: +d[5],
          color: +d[4] >= +d[1] ? "#22c55e" : "#ef4444",
        }));

        candleSeries.setData(candles);
        volumeSeries.setData(volumes);

        chart.timeScale().fitContent();
        setError(null);

      } catch (err: any) {
        console.error(err);
        setError(err.message || "Chart loading failed");
      } finally {
        setLoading(false);
      }
    };

    initChart();

    // Cleanup
    return () => {
      if (chart) chart.remove();
    };
  }, [symbol, selectedTF]);

  return (
    <div className="flex flex-col h-full bg-[#0F1217]">
      {/* Timeframe Selector */}
      <div className="px-4 py-3 border-b border-gray-700 bg-[#111] flex gap-2 overflow-x-auto">
        {["1m","5m","15m","1H","4H","1D"].map((label, i) => (
          <button
            key={i}
            onClick={() => setSelectedTF(timeframes[i])}
            className={`px-4 py-1.5 text-sm rounded-lg flex-shrink-0 transition ${
              selectedTF === timeframes[i] 
                ? "bg-yellow-500 text-black font-bold" 
                : "bg-gray-800 text-gray-300 hover:bg-gray-700"
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Chart Area */}
      <div className="relative flex-1 bg-[#0a0a0a]">
        {loading && (
          <div className="absolute inset-0 flex items-center justify-center z-10">
            <div className="text-center">
              <div className="animate-spin mx-auto h-12 w-12 border-4 border-yellow-500 border-t-transparent rounded-full" />
              <p className="mt-4 text-gray-400">Loading {symbol} market data...</p>
            </div>
          </div>
        )}

        {error && (
          <div className="absolute inset-0 flex items-center justify-center text-red-500">
            {error}
          </div>
        )}

        <div 
          ref={chartContainerRef} 
          className="w-full h-[520px] border border-gray-800"
        />
      </div>
    </div>
  );
}
