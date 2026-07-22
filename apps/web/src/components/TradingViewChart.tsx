"use client";

import { useEffect, useRef } from "react";

interface TradingViewChartProps {
  symbol?: string;
  theme?: "dark" | "light";
  height?: number;
  interval?: string; // ✅ SIRF YEH ADD KIYA
}

export default function TradingViewChart({
  symbol = "BINANCE:BTCUSDT",
  theme = "dark",
  height = 450,
  interval = "15", // ✅ SIRF YEH ADD KIYA
}: TradingViewChartProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const widgetRef = useRef<any>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    if (widgetRef.current) {
      widgetRef.current.remove();
      widgetRef.current = null;
    }

    const script = document.createElement("script");
    script.src = "https://s3.tradingview.com/tv.js";
    script.async = true;

    script.onload = () => {
      if (!window.TradingView || !containerRef.current) return;

      const widgetId = `tradingview_${Date.now()}`;
      containerRef.current.id = widgetId;

      widgetRef.current = new window.TradingView.MediumWidget({
        symbols: [[symbol.split(":")[1] || "BTCUSDT", `${symbol}|1D`]],
        chartOnly: true,
        width: "100%",
        height: height,
        locale: "en",
        colorTheme: theme,
        autosize: true,
        showVolume: false,
        hide_top_toolbar: true,
        container_id: widgetId,
      });
    };

    document.head.appendChild(script);

    return () => {
      if (widgetRef.current) {
        widgetRef.current.remove();
        widgetRef.current = null;
      }
    };
  }, [symbol, theme, height, interval]); // ✅ SIRF YEH ADD KIYA

  return <div ref={containerRef} className="w-full h-full min-h-[300px]" style={{ height: `${height}px` }} />;
}
