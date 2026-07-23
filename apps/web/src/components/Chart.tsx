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
  const candleSeriesRef = useRef<any>(null);
  const volumeSeriesRef = useRef<any>(null);

  const [selectedTF, setSelectedTF] = useState("15");
  const [loading, setLoading] = useState(true);

  const fetchKlines = async (interval: string = "15") => {
    try {
      const res = await fetch(
        `https://api.binance.com/api/v3/klines?symbol=${symbol}&interval=${interval}&limit=400`
      );
      const data: any[] = await res.json();

      const candles = data.map((d) => ({
        time: Math.floor(d[0] / 1000),
        open: parseFloat(d[1]),
        high: parseFloat(d[2]),
        low: parseFloat(d[3]),
        close: parseFloat(d[4]),
      }));

      const volumes = data.map((d) => ({
        time: Math.floor(d[0] / 1000),
        value: parseFloat(d[5]),
        color: parseFloat(d[4]) > parseFloat(d[1]) ? "#22c55e" : "#ef4444",
      }));

      return { candles, volumes };
    } catch (e) {
      console.error(e);
      return { candles: [], volumes: [] };
    }
  };

  // Create Chart
  useEffect(() => {
    const container = chartContainerRef.current;
    if (!container) return;

    const chart = createChart(container, {
      width: container.clientWidth || 800,
      height: 480,
      layout: { background: { color: '#0F1217' }, textColor: '#d1d5db' },
      grid: { vertLines: { color: '#1f2937' }, horzLines: { color: '#1f2937' } },
      timeScale: { timeVisible: true },
    });

    const candleSeries = chart.addCandlestickSeries({
      upColor: '#22c55e',
      downColor: '#ef4444',
      wickUpColor: '#22c55e',
      wickDownColor: '#ef4444',
    });

    const volumeSeries = chart.addHistogramSeries({
      priceFormat: { type: 'volume' },
      priceScaleId: 'volume',
    });

    chart.priceScale('volume').applyOptions({ scaleMargins: { top: 0.8, bottom: 0 } });

    chartRef.current = chart;
    candleSeriesRef.current = candleSeries;
    volumeSeriesRef.current = volumeSeries;

    return () => {
      chart.remove();
    };
  }, []);

  // Load Data
  useEffect(() => {
    const load = async () => {
      setLoading(true);
      const { candles, volumes } = await fetchKlines(selectedTF);

      candleSeriesRef.current?.setData(candles);
      volumeSeriesRef.current?.setData(volumes);

      chartRef.current?.timeScale().fitContent();
      setLoading(false);
    };

    load();
  }, [symbol, selectedTF]);

  // Resize Handler
  const resizeChart = useCallback(() => {
    if (chartRef.current && chartContainerRef.current) {
      chartRef.current.resize(
        chartContainerRef.current.clientWidth,
        480
      );
    }
  }, []);

  useEffect(() => {
    window.addEventListener('resize', resizeChart);
    setTimeout(resizeChart, 300); // initial resize
    return () => window.removeEventListener('resize', resizeChart);
  }, [resizeChart]);

  return (
    <div className="w-full h-full flex flex-col">
      {/* Timeframe Bar */}
      <div className="flex gap-1 px-4 py-2 border-b border-gray-700 bg-[#111] flex-shrink-0">
        {timeframes.map(tf => (
          <button
            key={tf.value}
            onClick={() => setSelectedTF(tf.value)}
            className={`px-3 py-1 text-xs rounded-md transition ${
              selectedTF === tf.value 
                ? 'bg-yellow-500 text-black font-bold' 
                : 'text-gray-400 hover:bg-gray-800'
            }`}
          >
            {tf.label}
          </button>
        ))}
      </div>

      {/* Main Chart Area */}
      <div className="flex-1 relative bg-[#0F1217]">
        {loading && (
          <div className="absolute inset-0 flex items-center justify-center z-20 bg-black/60">
            <div className="text-center">
              <div className="animate-spin h-10 w-10 border-4 border-yellow-500 border-t-transparent rounded-full mx-auto mb-3" />
              <p className="text-gray-400">Loading {symbol} chart...</p>
            </div>
          </div>
        )}
        <div ref={chartContainerRef} className="w-full h-full min-h-[480px]" />
      </div>
    </div>
  );
}
