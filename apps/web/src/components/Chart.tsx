"use client";

import { useEffect, useRef, useState } from "react";
import { createChart, ColorType } from "lightweight-charts";

interface ChartProps {
  symbol?: string;
  theme?: "dark" | "light";
  height?: number;
  onCandleClick?: (candle: any) => void;
}

// ===== BINANCE API — REAL KLINES =====
const fetchKlines = async (symbol: string, interval: string = "15m", limit: number = 500) => {
  try {
    const binanceInterval = getBinanceInterval(interval);
    const res = await fetch(
      `https://api.binance.com/api/v3/klines?symbol=${symbol}USDT&interval=${binanceInterval}&limit=${limit}`
    );
    const data = await res.json();
    return data.map((candle: any) => ({
      time: candle[0] / 1000,
      open: parseFloat(candle[1]),
      high: parseFloat(candle[2]),
      low: parseFloat(candle[3]),
      close: parseFloat(candle[4]),
      volume: parseFloat(candle[5]),
    }));
  } catch (error) {
    console.error("Error fetching klines:", error);
    return [];
  }
};

const getBinanceInterval = (tf: string): string => {
  const map: Record<string, string> = {
    "1s": "1s",
    "1m": "1m",
    "5m": "5m",
    "15m": "15m",
    "30m": "30m",
    "1h": "1h",
    "4h": "4h",
    "1D": "1d",
    "1W": "1w",
  };
  return map[tf] || "15m";
};

export default function Chart({
  symbol = "BTCUSDT",
  theme = "dark",
  height = 400,
  onCandleClick,
}: ChartProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<any>(null);
  const [chartData, setChartData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // ===== LOAD DATA =====
  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      const data = await fetchKlines(symbol, "15m", 500);
      setChartData(data);
      setIsLoading(false);
    };
    loadData();
  }, [symbol]);

  // ===== CHART =====
  useEffect(() => {
    if (!containerRef.current || isLoading || chartData.length === 0) return;

    if (chartRef.current) {
      chartRef.current.remove();
      chartRef.current = null;
    }

    const chart = createChart(containerRef.current, {
      layout: {
        background: { type: ColorType.Solid, color: theme === "dark" ? "#0A0A0A" : "#FFFFFF" },
        textColor: theme === "dark" ? "#d1d4dc" : "#000000",
      },
      grid: {
        vertLines: { color: theme === "dark" ? "rgba(42, 46, 57, 0.6)" : "rgba(200, 200, 200, 0.6)" },
        horzLines: { color: theme === "dark" ? "rgba(42, 46, 57, 0.6)" : "rgba(200, 200, 200, 0.6)" },
      },
      autoSize: true,
      crosshair: { mode: 1 },
      rightPriceScale: { borderColor: theme === "dark" ? "rgba(197, 203, 206, 0.3)" : "rgba(100, 100, 100, 0.3)" },
      timeScale: {
        borderColor: theme === "dark" ? "rgba(197, 203, 206, 0.3)" : "rgba(100, 100, 100, 0.3)",
        timeVisible: true,
        secondsVisible: false,
      },
    });
    chartRef.current = chart;

    const series = chart.addCandlestickSeries({
      upColor: "#26a69a",
      downColor: "#ef5350",
      wickUpColor: "#26a69a",
      wickDownColor: "#ef5350",
      borderVisible: false,
      wickVisible: true,
    });

    series.setData(chartData);
    chart.timeScale().fitContent();

    // ✅ Click event on chart
    chart.subscribeClick((param: any) => {
      if (param.time && onCandleClick) {
        const candle = chartData.find((d) => d.time === param.time);
        if (candle) {
          onCandleClick(candle);
        }
      }
    });

    const handleResize = () => {
      if (chartRef.current && containerRef.current) {
        chartRef.current.applyOptions({ width: containerRef.current.clientWidth });
      }
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      if (chartRef.current) {
        chartRef.current.remove();
        chartRef.current = null;
      }
    };
  }, [chartData, theme, onCandleClick]);

  if (isLoading) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-[#0A0A0A]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-yellow-500 border-r-2 border-yellow-500 mx-auto"></div>
          <p className="text-gray-400 text-sm mt-2">Loading chart...</p>
        </div>
      </div>
    );
  }

  if (chartData.length === 0) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-[#0A0A0A]">
        <div className="text-center">
          <p className="text-gray-500">No chart data</p>
          <p className="text-xs text-gray-600 mt-1">Trade to see data</p>
        </div>
      </div>
    );
  }

  return <div ref={containerRef} className="w-full h-full" style={{ height: `${height}px` }} />;
}
