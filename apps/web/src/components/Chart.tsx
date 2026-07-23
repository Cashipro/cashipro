"use client";

import React, { useEffect, useRef, useState } from "react";
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
        `https://api.binance.com/api/v3/klines?symbol=${symbol}&interval=${interval}&limit=500`
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
        color: parseFloat(d[4]) >= parseFloat(d[1]) ? "#26a69a" : "#ef5350",
      }));

      return { candles, volumes };
    } catch (err) {
      console.error("Klines fetch error:", err);
      return { candles: [], volumes: [] };
    }
  };

  // Initialize Chart
  useEffect(() => {
    if (!chartContainerRef.current) return;

    const chart = createChart(chartContainerRef.current, {
      width: chartContainerRef.current.clientWidth,
      height: 520,
      layout: {
        background: { color: "#0F1217" },
        textColor: "#A1A1AA",
      },
      grid: {
        vertLines: { color: "#1F2937" },
        horzLines: { color: "#1F2937" },
      },
      crosshair: { mode: 0 },
      timeScale: { timeVisible: true, secondsVisible: false },
      rightPriceScale: { borderColor: "#1F2937" },
    });

    const candleSeries = chart.addCandlestickSeries({
      upColor: "#26a69a",
      downColor: "#ef5350",
      borderUpColor: "#26a69a",
      borderDownColor: "#ef5350",
      wickUpColor: "#26a69a",
      wickDownColor: "#ef5350",
    });

    const volumeSeries = chart.addHistogramSeries({
      color: "#26a69a",
      priceFormat: { type: "volume" },
      priceScaleId: "volume",
    });

    // Separate scale for volume
    chart.priceScale("volume").applyOptions({
      scaleMargins: { top: 0.75, bottom: 0 },
    });

    chartRef.current = chart;
    candleSeriesRef.current = candleSeries;
    volumeSeriesRef.current = volumeSeries;

    const handleResize = () => {
      if (chartContainerRef.current) {
        chart.resize(
          chartContainerRef.current.clientWidth,
          chartContainerRef.current.clientHeight
        );
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      chart.remove();
    };
  }, []);

  // Load data
  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      const { candles, volumes } = await fetchKlines(selectedTF);

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
  }, [symbol, selectedTF]);

  return (
    <div className="flex flex-col h-full bg-[#0F1217]">
      {/* Timeframe Selector */}
      <div className="flex items-center gap-1 px-4 py-2 border-b border-gray-700 bg-[#111] flex-shrink-0 overflow-x-auto">
        {timeframes.map((tf) => (
          <button
            key={tf.value}
            onClick={() => setSelectedTF(tf.value)}
            className={`px-4 py-1.5 text-sm rounded-lg whitespace-nowrap transition-all ${
              selectedTF === tf.value
                ? "bg-yellow-500 text-black font-semibold"
                : "text-gray-400 hover:bg-gray-800 hover:text-white"
            }`}
          >
            {tf.label}
          </button>
        ))}
      </div>

      {/* Chart */}
      <div className="flex-1 relative min-h-0">
        {loading && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/60 z-10">
            <div className="animate-spin h-8 w-8 border-2 border-yellow-500 border-t-transparent rounded-full" />
          </div>
        )}
        <div ref={chartContainerRef} className="w-full h-full" />
      </div>
    </div>
  );
}
