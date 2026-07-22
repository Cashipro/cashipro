import { NextResponse } from 'next/server';
import { getEngine } from '@/lib/matching-engine';

export async function GET() {
  try {
    const engine = getEngine();
    return NextResponse.json({
      orderBook: engine.getOrderBook(),
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: 500 }
    );
  }
}
