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
        textColor: "#d1d4dc",
      },
      grid: {
        vertLines: { color: "rgba(42, 46, 57, 0.6)" },
        horzLines: { color: "rgba(42, 46, 57, 0.6)" },
      },
      autoSize: true,
      crosshair: {
        mode: 1,
      },
      rightPriceScale: {
        borderColor: "rgba(197, 203, 206, 0.3)",
      },
      timeScale: {
        borderColor: "rgba(197, 203, 206, 0.3)",
        timeVisible: true,
        secondsVisible: false,
      },
    });

    // ✅ Sahi tarika — addCandlestickSeries use karo
    const series = chart.addCandlestickSeries({
      upColor: "#26a69a",
      downColor: "#ef5350",
      wickUpColor: "#26a69a",
      wickDownColor: "#ef5350",
      borderVisible: false,
      wickVisible: true,
    });

    // Data format karo
    const formattedData = data.map((item) => ({
      time: item.time,
      open: item.open,
      high: item.high,
      low: item.low,
      close: item.close,
    }));

    series.setData(formattedData);
    chart.timeScale().fitContent();

    // Resize handler
    const handleResize = () => {
      chart.applyOptions({ width: chartContainerRef.current?.clientWidth || 0 });
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      chart.remove();
    };
  }, [data]);

  return <div ref={chartContainerRef} className="w-full h-full" />;
}
