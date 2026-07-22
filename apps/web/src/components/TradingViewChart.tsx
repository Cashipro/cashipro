"use client";

import { useEffect, useRef } from "react";

interface TradingViewChartProps {
  symbol?: string;
  theme?: "dark" | "light";
  height?: number;
}

export default function TradingViewChart({
  symbol = "BINANCE:BTCUSDT",
  theme = "dark",
  height = 500,
}: TradingViewChartProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // TradingView script load karo
    const script = document.createElement("script");
    script.src = "https://s3.tradingview.com/tv.js";
    script.async = true;
    script.onload = () => {
      if (typeof window !== "undefined" && window.TradingView) {
        new window.TradingView.MediumWidget({
          symbols: [[symbol.split(":")[1] || "BTCUSDT", `${symbol}|1D`]],
          chartOnly: false,
          width: "100%",
          height: height,
          locale: "en",
          colorTheme: theme,
          autosize: true,
          showVolume: true,
          container_id: containerRef.current?.id || "tradingview_chart",
        });
      }
    };
    containerRef.current.appendChild(script);

    return () => {
      if (containerRef.current) {
        containerRef.current.innerHTML = "";
      }
    };
  }, [symbol, theme, height]);

  return (
    <div
      ref={containerRef}
      id="tradingview_chart"
      className="w-full"
      style={{ height: `${height}px` }}
    />
  );
}
