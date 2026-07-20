import Navbar from '@/components/Navbar';
import Link from 'next/link';

export default function Home() {
  return (
    <div>
      <Navbar />
      
      {/* Hero Section */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '65vh', textAlign: 'center', padding: '0 20px' }}>
        <h1 style={{ fontSize: '48px', marginBottom: '20px', color: '#ffffff' }}>
          Trade Smart with Cashipro
        </h1>
        <p style={{ fontSize: '18px', color: '#94a3b8', marginBottom: '30px' }}>
          Experience the next level of digital asset trading with a sleek, custom interface.
        </p>
        <Link href="/trade" style={{ backgroundColor: '#06b6d4', color: '#0f172a', padding: '14px 35px', fontSize: '16px', fontWeight: 'bold', borderRadius: '6px', textDecoration: 'none' }}>
          Enter Trading Dashboard
        </Link>
      </div>

      {/* Market Ticker */}
      <div style={{ display: 'flex', justifyContent: 'space-around', backgroundColor: '#1e293b', padding: '25px', borderTop: '1px solid #334155' }}>
        <div>
          <span style={{ color: '#94a3b8', fontSize: '13px' }}>BTC/USDT</span>
          <p style={{ fontSize: '18px', fontWeight: 'bold', color: '#10b981', margin: '5px 0 0 0' }}>$91,245.00</p>
        </div>
        <div>
          <span style={{ color: '#94a3b8', fontSize: '13px' }}>ETH/USDT</span>
          <p style={{ fontSize: '18px', fontWeight: 'bold', color: '#10b981', margin: '5px 0 0 0' }}>$3,420.50</p>
        </div>
        <div>
          <span style={{ color: '#94a3b8', fontSize: '13px' }}>SOL/USDT</span>
          <p style={{ fontSize: '18px', fontWeight: 'bold', color: '#ef4444', margin: '5px 0 0 0' }}>$185.40</p>
        </div>
      </div>
    </div>
  );
}
