"use client";

import { useEffect, useRef } from "react";

interface ChartProps {
  symbol?: string;
  theme?: "dark" | "light";
  height?: number;
}

export default function Chart({
  symbol = "BTCUSDT",
  theme = "dark",
  height = 400,
}: ChartProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const widgetRef = useRef<any>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    if (widgetRef.current) {
      widgetRef.current.remove();
      widgetRef.current = null;
    }

    containerRef.current.innerHTML = "";

    const script = document.createElement("script");
    script.src = "https://s3.tradingview.com/tv.js";
    script.async = true;

    script.onload = () => {
      if (!window.TradingView || !containerRef.current) return;

      const widgetId = `tradingview_${Date.now()}`;
      containerRef.current.id = widgetId;

      // ✅ Binance Style Chart — Sirf Candlestick Chart
      widgetRef.current = new window.TradingView.MediumWidget({
        symbols: [[symbol, `BINANCE:${symbol}|1D`]],
        chartOnly: true,
        width: "100%",
        height: height,
        locale: "en",
        colorTheme: theme,
        autosize: true,
        showVolume: false,
        hide_top_toolbar: true,
        hide_side_toolbar: true,
        container_id: widgetId,
      });
    };

    document.head.appendChild(script);

    return () => {
      if (widgetRef.current) {
        try {
          widgetRef.current.remove();
        } catch (e) {}
        widgetRef.current = null;
      }
      if (containerRef.current) {
        containerRef.current.innerHTML = "";
      }
    };
  }, [symbol, theme, height]);

  return <div ref={containerRef} className="w-full h-full min-h-[300px]" style={{ height: `${height}px` }} />;
}
