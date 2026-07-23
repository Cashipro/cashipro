"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import { createChart, IChartApi, ISeriesApi } from "lightweight-charts";

interface ChartProps {
  symbol: string;
}

const timeframes = [
  { label: "1m", value: "1" },
  { label: "5m", value: "5" },
  { label: "15m", value: "15" },
  { label: "1H", value: "60" },
  { label: "4H", value: "240" },
  { label: "1D", value: "D" },
];

export default function Chart({ symbol }: ChartProps) {
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<IChartApi | null>(null);
  const candleSeriesRef = useRef<ISeriesApi<"Candlestick"> | null>(null);
  const volumeSeriesRef = useRef<ISeriesApi<"Histogram"> | null>(null);

  const [selectedTF, setSelectedTF] = useState("15");
  const [loading, setLoading] = useState(true);

  const fetchKlines = async (interval: string) => {
    try {
      const res = await fetch(
        `https://api.binance.com/api/v3/klines?symbol=${symbol}&interval=${interval}&limit=300`
      );
      const data = await res.json();

      const candles = data.map((d: any) => ({
        time: Math.floor(d[0] / 1000) as any,
        open: parseFloat(d[1]),
        high: parseFloat(d[2]),
        low: parseFloat(d[3]),
        close: parseFloat(d[4]),
      }));

      const volumes = data.map((d: any) => ({
        time: Math.floor(d[0] / 1000) as any,
        value: parseFloat(d[5]),
        color: parseFloat(d[4]) >= parseFloat(d[1]) ? "#22c55e" : "#ef4444",
      }));

      return { candles, volumes };
    } catch (err) {
      console.error(err);
      return { candles: [], volumes: [] };
    }
  };

  // Initialize Chart
  useEffect(() => {
    const container = chartContainerRef.current;
    if (!container) return;

    const chart = createChart(container, {
      width: container.clientWidth,
      height: 520,
      layout: { background: { color: "#0F1217" }, textColor: "#d1d5db" },
      grid: { vertLines: { color: "#334155" }, horzLines: { color: "#334155" } },
      timeScale: { timeVisible: true, secondsVisible: false },
      rightPriceScale: { borderColor: "#475569" },
      leftPriceScale: { visible: false },
    });

    const candleSeries = chart.addCandlestickSeries({
      upColor: "#22c55e",
      downColor: "#ef4444",
      borderVisible: false,
      wickUpColor: "#22c55e",
      wickDownColor: "#ef4444",
    });

    const volumeSeries = chart.addHistogramSeries({
      priceFormat: { type: "volume" },
      priceScaleId: "volume",
      color: "#64748b",
    });

    chart.priceScale("volume").applyOptions({
      scaleMargins: { top: 0.78, bottom: 0 },
    });

    chartRef.current = chart;
    candleSeriesRef.current = candleSeries;
    volumeSeriesRef.current = volumeSeries;

    return () => chart.remove();
  }, []);

  // Load chart data
  useEffect(() => {
    let isMounted = true;

    const loadData = async () => {
      setLoading(true);
      const { candles, volumes } = await fetchKlines(selectedTF);

      if (!isMounted) return;

      if (candleSeriesRef.current && candles.length > 0) {
        candleSeriesRef.current.setData(candles);
      }
      if (volumeSeriesRef.current && volumes.length > 0) {
        volumeSeriesRef.current.setData(volumes);
      }

      if (chartRef.current) {
        chartRef.current.timeScale().fitContent();
      }
      setLoading(false);
    };

    loadData();

    return () => { isMounted = false; };
  }, [symbol, selectedTF]);

  // Handle Resize
  const handleResize = useCallback(() => {
    if (chartRef.current && chartContainerRef.current) {
      chartRef.current.resize(
        chartContainerRef.current.clientWidth,
        520
      );
    }
  }, []);

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    // Initial resize
    setTimeout(handleResize, 100);

    return () => window.removeEventListener("resize", handleResize);
  }, [handleResize]);

  return (
    <div className="flex flex-col h-full bg-[#0F1217]">
      {/* Timeframes */}
      <div className="flex items-center gap-1 px-4 py-2 border-b border-gray-700 bg-[#111] flex-shrink-0 overflow-x-auto">
        {timeframes.map((tf) => (
          <button
            key={tf.value}
            onClick={() => setSelectedTF(tf.value)}
            className={`px-4 py-1.5 text-sm font-medium rounded-lg transition-all whitespace-nowrap ${
              selectedTF === tf.value
                ? "bg-yellow-500 text-black"
                : "text-gray-400 hover:bg-gray-800 hover:text-white"
            }`}
          >
            {tf.label}
          </button>
        ))}
      </div>

      {/* Chart Container */}
      <div className="flex-1 relative min-h-0 border border-gray-800">
        {loading && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/70 z-10">
            <div className="flex flex-col items-center">
              <div className="animate-spin h-8 w-8 border-2 border-yellow-500 border-t-transparent rounded-full mb-3" />
              <p className="text-sm text-gray-400">Loading chart data...</p>
            </div>
          </div>
        )}
        <div 
          ref={chartContainerRef} 
          className="w-full h-[520px]"
        />
      </div>
    </div>
  );
}
