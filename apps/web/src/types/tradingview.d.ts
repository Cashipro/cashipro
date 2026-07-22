interface TradingViewWidgetOptions {
  symbols: [string, string][];
  chartOnly: boolean;
  width: string | number;
  height: string | number;
  locale: string;
  colorTheme: "dark" | "light";
  autosize: boolean;
  showVolume: boolean;
  hide_top_toolbar?: boolean;
  container_id: string;
}

interface TradingView {
  MediumWidget: new (options: TradingViewWidgetOptions) => any;
}

declare global {
  interface Window {
    TradingView: TradingView;
  }
}

export {};
