import Navbar from '@/components/Navbar';
import Link from 'next/link';

export default function MarketsPage() {
  return (
    <div style={{ backgroundColor: '#0f172a', minHeight: '100vh', color: '#f8fafc' }}>
      <Navbar />

      {/* Markets Container */}
      <div style={{ maxWidth: '1000px', margin: '40px auto', padding: '0 20px' }}>
        
        <h1 style={{ fontSize: '28px', fontWeight: 'bold', color: '#ffffff', marginBottom: '10px' }}>
          Markets Overview
        </h1>
        <p style={{ fontSize: '14px', color: '#94a3b8', marginBottom: '30px' }}>
          Explore cryptocurrency prices, market trends, and trading pairs.
        </p>

        {/* Markets Table Box */}
        <div style={{ backgroundColor: '#1e293b', borderRadius: '8px', border: '1px solid #334155', overflow: 'hidden' }}>
          
          {/* Table Header */}
          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', padding: '15px 20px', borderBottom: '1px solid #334155', fontSize: '13px', color: '#94a3b8', fontWeight: 'bold' }}>
            <span>Pair</span>
            <span>Last Price</span>
            <span>24h Change</span>
            <span style={{ textAlign: 'right' }}>Action</span>
          </div>

          {/* Row 1: BTC/USDT */}
          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', padding: '18px 20px', borderBottom: '1px solid #334155', alignItems: 'center' }}>
            <span style={{ fontWeight: 'bold', color: '#ffffff' }}>BTC / USDT</span>
            <span style={{ color: '#f8fafc' }}>$91,245.00</span>
            <span style={{ color: '#10b981', fontWeight: 'bold' }}>+3.45%</span>
            <div style={{ textAlign: 'right' }}>
              <Link href="/trade" style={{ backgroundColor: '#06b6d4', color: '#0f172a', padding: '6px 14px', borderRadius: '4px', textDecoration: 'none', fontSize: '12px', fontWeight: 'bold' }}>
                Trade
              </Link>
            </div>
          </div>

          {/* Row 2: ETH/USDT */}
          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', padding: '18px 20px', borderBottom: '1px solid #334155', alignItems: 'center' }}>
            <span style={{ fontWeight: 'bold', color: '#ffffff' }}>ETH / USDT</span>
            <span style={{ color: '#f8fafc' }}>$3,420.50</span>
            <span style={{ color: '#10b981', fontWeight: 'bold' }}>+1.80%</span>
            <div style={{ textAlign: 'right' }}>
              <Link href="/trade" style={{ backgroundColor: '#06b6d4', color: '#0f172a', padding: '6px 14px', borderRadius: '4px', textDecoration: 'none', fontSize: '12px', fontWeight: 'bold' }}>
                Trade
              </Link>
            </div>
          </div>

          {/* Row 3: SOL/USDT */}
          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', padding: '18px 20px', alignItems: 'center' }}>
            <span style={{ fontWeight: 'bold', color: '#ffffff' }}>SOL / USDT</span>
            <span style={{ color: '#f8fafc' }}>$185.40</span>
            <span style={{ color: '#ef4444', fontWeight: 'bold' }}>-2.15%</span>
            <div style={{ textAlign: 'right' }}>
              <Link href="/trade" style={{ backgroundColor: '#06b6d4', color: '#0f172a', padding: '6px 14px', borderRadius: '4px', textDecoration: 'none', fontSize: '12px', fontWeight: 'bold' }}>
                Trade
              </Link>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
