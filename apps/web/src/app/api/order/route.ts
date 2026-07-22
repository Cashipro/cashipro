import { NextRequest, NextResponse } from 'next/server';
import { getEngine } from '@/lib/matching-engine';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { side, price, amount } = body;

    if (!side || !price || !amount) {
      return NextResponse.json(
        { error: 'Missing required fields: side, price, amount' },
        { status: 400 }
      );
    }

    const engine = getEngine();
    const result = engine.addOrder(side, price, amount);

    return NextResponse.json({
      success: true,
      order: result.order,
      matches: result.matches,
      orderBook: engine.getOrderBook(),
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: 500 }
    );
  }
}
