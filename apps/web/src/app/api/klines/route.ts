import { NextRequest, NextResponse } from 'next/server';
import { getEngine } from '@/lib/matching-engine';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const symbol = searchParams.get('symbol') || 'BTCUSDT';
    const interval = (searchParams.get('interval') || '15m') as '1m' | '5m' | '15m' | '1h' | '4h' | '1d';
    const limit = parseInt(searchParams.get('limit') || '100');

    const engine = getEngine();
    const klines = engine.getKlines(interval, limit);

    return NextResponse.json({
      symbol,
      interval,
      data: klines,
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: 500 }
    );
  }
}
