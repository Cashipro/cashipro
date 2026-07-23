"use client";

import React, { useEffect, useRef, useState } from "react";
import { createChart, IChartApi, ISeriesApi, CandlestickSeries } from "lightweight-charts";

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
  const volumeSeriesRef = useRef<any>(null);

  const [selectedTF, setSelectedTF] = useState("15");
  const [loading, setLoading] = useState(true);

  // Fetch Kline data from Binance
  const fetchKlines = async (interval: string) => {
    try {
      const limit = 500;
      const res = await fetch(
        `https://api.binance.com/api/v3/klines?symbol=${symbol}&interval=${interval}&limit=${limit}`
      );
      const data = await res.json();

      const candles = data.map((d: any) => ({
        time: Math.floor(d[0] / 1000) as any, // timestamp in seconds
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
      console.error("Failed to fetch klines", err);
      return { candles: [], volumes: [] };
    }
  };

  useEffect(() => {
    if (!chartContainerRef.current) return;

    const chart = createChart(chartContainerRef.current, {
      width: chartContainerRef.current.clientWidth,
      height: 500,
      layout: { background: { color: "#0F1217" }, textColor: "#DDD" },
      grid: {
        vertLines: { color: "#1F2937" },
        horzLines: { color: "#1F2937" },
      },
      crosshair: { mode: 0 },
      timeScale: { timeVisible: true, secondsVisible: false },
      rightPriceScale: { borderColor: "#1F2937" },
    });

    const candleSeries = chart.addSeries(CandlestickSeries, {
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
      scaleMargins: { top: 0.8, bottom: 0 },
    });

    chartRef.current = chart;
    candleSeriesRef.current = candleSeries;
    volumeSeriesRef.current = volumeSeries;

    // Resize handler
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

  // Load data when symbol or timeframe changes
  useEffect(() => {
    const loadChartData = async () => {
      setLoading(true);
      const { candles, volumes } = await fetchKlines(selectedTF);

      if (candleSeriesRef.current && candles.length > 0) {
        candleSeriesRef.current.setData(candles);
      }
      if (volumeSeriesRef.current && volumes.length > 0) {
        volumeSeriesRef.current.setData(volumes);
      }

      // Fit the chart
      if (chartRef.current) {
        chartRef.current.timeScale().fitContent();
      }
      setLoading(false);
    };

    loadChartData();
  }, [symbol, selectedTF]);

  return (
    <div className="flex flex-col h-full bg-[#0F1217]">
      {/* Timeframe Selector */}
      <div className="flex items-center gap-1 px-4 py-2 border-b border-gray-700 bg-[#111] flex-shrink-0">
        {timeframes.map((tf) => (
          <button
            key={tf.value}
            onClick={() => setSelectedTF(tf.value)}
            className={`px-3 py-1 text-xs rounded transition ${
              selectedTF === tf.value
                ? "bg-yellow-500 text-black font-medium"
                : "text-gray-400 hover:text-white hover:bg-gray-800"
            }`}
          >
            {tf.label}
          </button>
        ))}
        <div className="ml-auto text-xs text-gray-500">
          {symbol} • Binance Spot
        </div>
      </div>

      {/* Chart Container */}
      <div className="flex-1 relative min-h-0">
        {loading && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/50 z-10">
            <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-yellow-500"></div>
          </div>
        )}
        <div ref={chartContainerRef} className="w-full h-full" />
      </div>
    </div>
  );
}
