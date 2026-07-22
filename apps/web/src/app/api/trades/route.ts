import { NextRequest, NextResponse } from 'next/server';
import { getEngine } from '@/lib/matching-engine';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get('limit') || '50');

    const engine = getEngine();
    const trades = engine.getTrades(limit);

    return NextResponse.json({
      trades,
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: 500 }
    );
  }
}
