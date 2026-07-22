interface Order {
  id: number;
  side: 'buy' | 'sell';
  price: number;
  amount: number;
  timestamp: Date;
}

interface Trade {
  buyOrderId: number;
  sellOrderId: number;
  price: number;
  amount: number;
  timestamp: Date;
}

class MatchingEngine {
  private buyOrders: Order[] = [];
  private sellOrders: Order[] = [];
  private trades: Trade[] = [];
  private orderIdCounter = 1;

  addOrder(side: 'buy' | 'sell', price: number, amount: number): { order: Order; matches: Trade[] } {
    const order: Order = {
      id: this.orderIdCounter++,
      side,
      price,
      amount,
      timestamp: new Date(),
    };

    if (side === 'buy') {
      this.buyOrders.push(order);
      this.buyOrders.sort((a, b) => b.price - a.price);
    } else {
      this.sellOrders.push(order);
      this.sellOrders.sort((a, b) => a.price - b.price);
    }

    const matches = this.matchOrders();
    return { order, matches };
  }

  private matchOrders(): Trade[] {
    const matches: Trade[] = [];

    while (this.buyOrders.length > 0 && this.sellOrders.length > 0) {
      const bestBuy = this.buyOrders[0];
      const bestSell = this.sellOrders[0];

      if (bestBuy.price >= bestSell.price) {
        const matchedPrice = bestSell.price;
        const matchedAmount = Math.min(bestBuy.amount, bestSell.amount);

        const trade: Trade = {
          buyOrderId: bestBuy.id,
          sellOrderId: bestSell.id,
          price: matchedPrice,
          amount: matchedAmount,
          timestamp: new Date(),
        };

        this.trades.push(trade);
        matches.push(trade);

        bestBuy.amount -= matchedAmount;
        bestSell.amount -= matchedAmount;

        if (bestBuy.amount === 0) this.buyOrders.shift();
        if (bestSell.amount === 0) this.sellOrders.shift();
      } else {
        break;
      }
    }

    return matches;
  }

  getOrderBook() {
    return {
      bids: this.buyOrders.map(o => ({ price: o.price, amount: o.amount })),
      asks: this.sellOrders.map(o => ({ price: o.price, amount: o.amount })),
    };
  }

  getTrades(limit = 50): Trade[] {
    return this.trades.slice(-limit);
  }

  getKlines(interval: '1m' | '5m' | '15m' | '1h' | '4h' | '1d' = '15m', limit = 100) {
    // Trades se candlestick data generate karo
    const candles: { time: string; open: number; high: number; low: number; close: number }[] = [];
    
    if (this.trades.length === 0) {
      // Agar koi trade nahi hai, mock data return karo
      return this.generateMockKlines(limit);
    }

    // Real trades se klines generate karo
    const sortedTrades = [...this.trades].sort((a, b) => a.timestamp.getTime() - b.timestamp.getTime());
    const grouped = this.groupTradesByInterval(sortedTrades, interval);

    for (const [key, trades] of grouped) {
      const prices = trades.map(t => t.price);
      candles.push({
        time: key,
        open: trades[0].price,
        high: Math.max(...prices),
        low: Math.min(...prices),
        close: trades[trades.length - 1].price,
      });
    }

    return candles.slice(-limit);
  }

  private groupTradesByInterval(trades: Trade[], interval: string): Map<string, Trade[]> {
    const map = new Map<string, Trade[]>();
    const ms = this.getIntervalMs(interval);

    for (const trade of trades) {
      const key = new Date(Math.floor(trade.timestamp.getTime() / ms) * ms).toISOString();
      if (!map.has(key)) map.set(key, []);
      map.get(key)!.push(trade);
    }

    return map;
  }

  private getIntervalMs(interval: string): number {
    const map: Record<string, number> = {
      '1m': 60 * 1000,
      '5m': 5 * 60 * 1000,
      '15m': 15 * 60 * 1000,
      '1h': 60 * 60 * 1000,
      '4h': 4 * 60 * 60 * 1000,
      '1d': 24 * 60 * 60 * 1000,
    };
    return map[interval] || 15 * 60 * 1000;
  }

  private generateMockKlines(limit: number) {
    const data = [];
    let price = 65000;
    const now = Date.now();
    for (let i = limit; i > 0; i--) {
      const change = (Math.random() - 0.5) * 500;
      const open = price;
      const close = price + change;
      data.push({
        time: new Date(now - i * 60000).toISOString().slice(0, 16),
        open,
        high: Math.max(open, close) + Math.random() * 200,
        low: Math.min(open, close) - Math.random() * 200,
        close,
      });
      price = close;
    }
    return data;
  }

  // Reset engine
  reset() {
    this.buyOrders = [];
    this.sellOrders = [];
    this.trades = [];
    this.orderIdCounter = 1;
  }
}

// Singleton instance
let engine: MatchingEngine | null = null;

export function getEngine(): MatchingEngine {
  if (!engine) {
    engine = new MatchingEngine();
  }
  return engine;
}

export function resetEngine() {
  engine = null;
}
