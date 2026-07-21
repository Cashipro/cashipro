export default function Page() {
  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: '#0a0b0e',
      color: 'white',
      flexDirection: 'column',
      fontFamily: 'system-ui, sans-serif'
    }}>
      <h1 style={{ fontSize: '60px' }}>🚀 CashiPro</h1>
      <p style={{ color: '#888', fontSize: '20px' }}>Crypto Exchange</p>
      <div style={{ marginTop: '32px', display: 'flex', gap: '16px' }}>
        <a href="/login" style={{
          padding: '12px 32px',
          background: '#2563eb',
          borderRadius: '12px',
          color: 'white',
          textDecoration: 'none'
        }}>Login</a>
        <a href="/register" style={{
          padding: '12px 32px',
          background: 'rgba(255,255,255,0.1)',
          borderRadius: '12px',
          color: 'white',
          textDecoration: 'none'
        }}>Register</a>
      </div>
    </div>
  );
}
