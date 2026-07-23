"use client";

import { useEffect, useRef, useState } from "react";
import { createChart, ColorType } from "lightweight-charts";

interface ChartProps {
  symbol: string;
  interval?: string;
  onCandleClick?: (data: any) => void;
}

// ===== FULL HISTORICAL DATA FETCH =====
const fetchAllKlines = async (symbol: string, interval: string = "1m") => {
  const binanceInterval = getBinanceInterval(interval);
  const limit = 1000;
  let allData: any[] = [];
  let startTime = Date.now() - 365 * 24 * 60 * 60 * 1000;

  try {
    for (let page = 0; page < 5; page++) {
      const url = `https://api.binance.com/api/v3/klines?symbol=${symbol}USDT&interval=${binanceInterval}&limit=${limit}&startTime=${startTime}`;
      const res = await fetch(url);
      const data = await res.json();

      if (data.length === 0) break;

      const candles = data.map((candle: any) => ({
        time: candle[0] / 1000,
        open: parseFloat(candle[1]),
        high: parseFloat(candle[2]),
        low: parseFloat(candle[3]),
        close: parseFloat(candle[4]),
        volume: parseFloat(candle[5]),
      }));

      allData = [...allData, ...candles];
      startTime = data[data.length - 1][0] + 1;
    }

    return allData;
  } catch (error) {
    console.error("Error fetching klines:", error);
    return [];
  }
};

const getBinanceInterval = (tf: string): string => {
  const map: Record<string, string> = {
    "1s": "1s",
    "1m": "1m",
    "3m": "3m",
    "5m": "5m",
    "10m": "10m",
    "15m": "15m",
    "30m": "30m",
    "1h": "1h",
    "2h": "2h",
    "4h": "4h",
    "6h": "6h",
    "8h": "8h",
    "12h": "12h",
    "1D": "1d",
    "2D": "2d",
    "3D": "3d",
    "5D": "5d",
    "1W": "1w",
    "Month": "1M",
  };
  return map[tf] || "15m";
};

export default function RealChart({ symbol, interval = "15m", onCandleClick }: ChartProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<any>(null);
  const seriesRef = useRef<any>(null);
  const [chartData, setChartData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // ===== LOAD FULL HISTORICAL DATA =====
  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      const data = await fetchAllKlines(symbol, interval);
      setChartData(data);
      setIsLoading(false);
    };
    loadData();
  }, [symbol, interval]);

  // ===== CREATE/UPDATE CHART =====
  useEffect(() => {
    if (!containerRef.current || isLoading || chartData.length === 0) return;

    if (chartRef.current) {
      chartRef.current.remove();
      chartRef.current = null;
    }

    const chart = createChart(containerRef.current, {
      layout: {
        background: { type: ColorType.Solid, color: "#0A0A0A" },
        textColor: "#d1d4dc",
      },
      grid: {
        vertLines: { color: "rgba(42, 46, 57, 0.6)" },
        horzLines: { color: "rgba(42, 46, 57, 0.6)" },
      },
      autoSize: true,
      crosshair: { mode: 1 },
      rightPriceScale: { borderColor: "rgba(197, 203, 206, 0.3)" },
      timeScale: {
        borderColor: "rgba(197, 203, 206, 0.3)",
        timeVisible: true,
        secondsVisible: interval === "1s",
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
    seriesRef.current = series;

    series.setData(chartData);

    series.subscribeClick((param: any) => {
      if (param.time && onCandleClick) {
        const candle = chartData.find((d) => d.time === param.time);
        if (candle) {
          onCandleClick(candle);
        }
      }
    });

    chart.timeScale().fitContent();

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
  }, [chartData, interval, onCandleClick]);

  if (isLoading) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-[#0A0A0A]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-yellow-500 border-r-2 border-yellow-500 mx-auto"></div>
          <p className="text-gray-400 text-sm mt-2">Loading chart data...</p>
        </div>
      </div>
    );
  }

  if (chartData.length === 0) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-[#0A0A0A]">
        <div className="text-center">
          <p className="text-gray-500">No chart data available</p>
          <p className="text-xs text-gray-600 mt-1">Place a trade to see data</p>
        </div>
      </div>
    );
  }

  return <div ref={containerRef} className="w-full h-full" />;
}
