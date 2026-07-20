import Navbar from '@/components/Navbar';
import Link from 'next/link';

export default function LoginPage() {
  return (
    <div style={{ backgroundColor: '#0f172a', minHeight: '100vh', color: '#f8fafc' }}>
      <Navbar />

      {/* Login Box Container */}
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 'calc(100vh - 65px)', padding: '0 20px' }}>
        <div style={{ backgroundColor: '#1e293b', padding: '40px', borderRadius: '10px', border: '1px solid #334155', width: '100%', maxWidth: '400px', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.3)' }}>
          
          <h2 style={{ fontSize: '24px', fontWeight: 'bold', color: '#ffffff', marginBottom: '10px', textAlign: 'center' }}>
            Welcome to Cashipro
          </h2>
          <p style={{ fontSize: '14px', color: '#94a3b8', marginBottom: '30px', textAlign: 'center' }}>
            Log in to your account to start trading
          </p>

          {/* Form */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div>
              <label style={{ fontSize: '13px', color: '#94a3b8', display: 'block', marginBottom: '8px' }}>Email Address</label>
              <input 
                type="email" 
                placeholder="name@example.com" 
                style={{ width: '100%', backgroundColor: '#0f172a', border: '1px solid #334155', padding: '12px', color: '#fff', borderRadius: '6px', fontSize: '14px', boxSizing: 'border-box' }} 
              />
            </div>

            <div>
              <label style={{ fontSize: '13px', color: '#94a3b8', display: 'block', marginBottom: '8px' }}>Password</label>
              <input 
                type="password" 
                placeholder="••••••••" 
                style={{ width: '100%', backgroundColor: '#0f172a', border: '1px solid #334155', padding: '12px', color: '#fff', borderRadius: '6px', fontSize: '14px', boxSizing: 'border-box' }} 
              />
            </div>

            <button style={{ backgroundColor: '#06b6d4', color: '#0f172a', padding: '12px', fontWeight: 'bold', border: 'none', borderRadius: '6px', cursor: 'pointer', fontSize: '16px', marginTop: '10px' }}>
              Log In
            </button>
          </div>

          {/* Footer links inside form */}
          <div style={{ marginTop: '25px', textAlign: 'center', fontSize: '13px', color: '#94a3b8' }}>
            Don't have an account? <Link href="#" style={{ color: '#06b6d4', textDecoration: 'none', fontWeight: 'bold' }}>Sign up</Link>
          </div>

        </div>
      </div>
    </div>
  );
}
