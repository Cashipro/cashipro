import Link from 'next/link';

export default function Navbar() {
  return (
    <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#1e293b', padding: '15px 30px', borderBottom: '1px solid #334155' }}>
      <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#06b6d4', letterSpacing: '1px' }}>
        <Link href="/" style={{ color: '#06b6d4', textDecoration: 'none' }}>CASHIPRO</Link>
      </div>
      <nav style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
        <Link href="/" style={{ color: '#f8fafc', textDecoration: 'none', fontSize: '14px' }}>Home</Link>
        <Link href="/trade" style={{ color: '#06b6d4', textDecoration: 'none', fontSize: '14px', fontWeight: 'bold' }}>Trade</Link>
        <Link href="/markets" style={{ color: '#f8fafc', textDecoration: 'none', fontSize: '14px' }}>Markets</Link>
        <Link href="/wallet" style={{ color: '#f8fafc', textDecoration: 'none', fontSize: '14px' }}>Wallet</Link>
        <Link href="/login" style={{ color: '#f8fafc', textDecoration: 'none', fontSize: '14px' }}>Log In</Link>
        <Link href="/register" style={{ backgroundColor: '#06b6d4', color: '#0f172a', padding: '8px 16px', borderRadius: '6px', textDecoration: 'none', fontWeight: 'bold', fontSize: '14px' }}>Sign Up</Link>
      </nav>
    </header>
  );
}
