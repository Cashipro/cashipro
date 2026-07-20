import Navbar from '@/components/Navbar';

export default function WalletPage() {
  return (
    <div style={{ backgroundColor: '#0f172a', minHeight: '100vh', color: '#f8fafc' }}>
      <Navbar />

      {/* Wallet Container */}
      <div style={{ maxWidth: '1000px', margin: '40px auto', padding: '0 20px' }}>
        
        {/* Header & Total Balance */}
        <div style={{ backgroundColor: '#1e293b', padding: '30px', borderRadius: '8px', border: '1px solid #334155', marginBottom: '30px' }}>
          <span style={{ fontSize: '14px', color: '#94a3b8' }}>Estimated Balance</span>
          <h1 style={{ fontSize: '36px', fontWeight: 'bold', color: '#ffffff', margin: '10px 0 20px 0' }}>
            $14,850.40 <span style={{ fontSize: '16px', color: '#94a3b8', fontWeight: 'normal' }}>USDT</span>
          </h1>
          <div style={{ display: 'flex', gap: '15px' }}>
            <button style={{ backgroundColor: '#06b6d4', color: '#0f172a', padding: '10px 24px', fontWeight: 'bold', border: 'none', borderRadius: '6px', cursor: 'pointer' }}>
              Deposit
            </button>
            <button style={{ backgroundColor: '#334155', color: '#f8fafc', padding: '10px 24px', fontWeight: 'bold', border: 'none', borderRadius: '6px', cursor: 'pointer' }}>
              Withdraw
            </button>
          </div>
        </div>

        {/* Crypto Assets List */}
        <div style={{ backgroundColor: '#1e293b', borderRadius: '8px', border: '1px solid #334155', overflow: 'hidden' }}>
          <div style={{ padding: '20px', borderBottom: '1px solid #334155', fontWeight: 'bold', fontSize: '16px' }}>
            Your Assets
          </div>

          {/* Asset Item 1 */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '20px', borderBottom: '1px solid #334155' }}>
            <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
              <div style={{ width: '40px', height: '40px', backgroundColor: '#f7931a', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', color: '#fff' }}>BTC</div>
              <div>
                <p style={{ fontWeight: 'bold', margin: 0 }}>Bitcoin</p>
                <span style={{ fontSize: '13px', color: '#94a3b8' }}>BTC</span>
              </div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <p style={{ fontWeight: 'bold', margin: 0 }}>0.12500000</p>
              <span style={{ fontSize: '13px', color: '#94a3b8' }}>$11,405.00</span>
            </div>
          </div>

          {/* Asset Item 2 */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '20px', borderBottom: '1px solid #334155' }}>
            <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
              <div style={{ width: '40px', height: '40px', backgroundColor: '#627eea', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', color: '#fff' }}>ETH</div>
              <div>
                <p style={{ fontWeight: 'bold', margin: 0 }}>Ethereum</p>
                <span style={{ fontSize: '13px', color: '#94a3b8' }}>ETH</span>
              </div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <p style={{ fontWeight: 'bold', margin: 0 }}>1.00000000</p>
              <span style={{ fontSize: '13px', color: '#94a3b8' }}>$3,420.50</span>
            </div>
          </div>

          {/* Asset Item 3 */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '20px' }}>
            <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
              <div style={{ width: '40px', height: '40px', backgroundColor: '#26a69a', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', color: '#fff' }}>USDT</div>
              <div>
                <p style={{ fontWeight: 'bold', margin: '0' }}>Tether</p>
                <span style={{ fontSize: '13px', color: '#94a3b8' }}>USDT</span>
              </div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <p style={{ fontWeight: 'bold', margin: 0 }}>24.900000</p>
              <span style={{ fontSize: '13px', color: '#94a3b8' }}>$24.90</span>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
