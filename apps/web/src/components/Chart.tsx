"use client";

import { useEffect, useRef } from "react";
import { createChart, ColorType } from "lightweight-charts";

interface ChartProps {
  data: { time: string; open: number; high: number; low: number; close: number }[];
}

export default function Chart({ data }: ChartProps) {
  const chartContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!chartContainerRef.current) return;

    const chart = createChart(chartContainerRef.current, {
      layout: {
        background: { type: ColorType.Solid, color: "#0A0A0A" },
        textColor: "#a0aec0",
      },
      grid: {
        vertLines: { color: "#2a2a4a" },
        horzLines: { color: "#2a2a4a" },
      },
      autoSize: true,
      crosshair: {
        mode: 0,
      },
      rightPriceScale: {
        borderColor: "#2a2a4a",
      },
      timeScale: {
        borderColor: "#2a2a4a",
        timeVisible: true,
        secondsVisible: false,
      },
    });

    // Sahi tarika — CandlestickSeries use karo
    const series = chart.addCandlestickSeries({
      upColor: "#10B981",
      downColor: "#EF4444",
      wickUpColor: "#10B981",
      wickDownColor: "#EF4444",
      borderVisible: false,
    });

    // Data ko format karo
    const formattedData = data.map((item) => ({
      time: item.time,
      open: item.open,
      high: item.high,
      low: item.low,
      close: item.close,
    }));

    series.setData(formattedData);
    chart.timeScale().fitContent();

    return () => {
      chart.remove();
    };
  }, [data]);

  return <div ref={chartContainerRef} className="w-full h-full" />;
}
