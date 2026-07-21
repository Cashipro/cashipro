export default function Page() {
  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#0a0b0e',
      color: 'white',
      fontFamily: 'system-ui, -apple-system, sans-serif',
      padding: '20px'
    }}>
      <h1 style={{ fontSize: 'clamp(3rem, 10vw, 5rem)', marginBottom: '0.5rem' }}>
        🚀 CashiPro
      </h1>
      <p style={{ fontSize: 'clamp(1rem, 2vw, 1.5rem)', color: '#888', marginBottom: '2rem' }}>
        Crypto Exchange Platform
      </p>
      <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center' }}>
        <a
          href="/login"
          style={{
            padding: '12px 32px',
            backgroundColor: '#2563eb',
            color: 'white',
            borderRadius: '12px',
            textDecoration: 'none',
            fontWeight: '600',
            transition: 'background-color 0.2s'
          }}
          onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#1d4ed8')}
          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#2563eb')}
        >
          Login
        </a>
        <a
          href="/register"
          style={{
            padding: '12px 32px',
            backgroundColor: 'rgba(255,255,255,0.1)',
            color: 'white',
            borderRadius: '12px',
            textDecoration: 'none',
            fontWeight: '600',
            border: '1px solid rgba(255,255,255,0.1)',
            transition: 'background-color 0.2s'
          }}
          onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.2)')}
          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.1)')}
        >
          Register
        </a>
      </div>
      <p style={{ marginTop: '3rem', fontSize: '0.75rem', color: '#444' }}>
        v1.0.0 • Ready
      </p>
    </div>
  );
}
