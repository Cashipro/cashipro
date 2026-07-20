import Navbar from '@/components/Navbar';

export default function TradePage() {
  return (
    <div style={{ backgroundColor: '#0f172a', minHeight: '100vh', color: '#f8fafc' }}>
      <Navbar />

      {/* Main Trading Container */}
      <div style={{ display: 'grid', gridTemplateColumns: '260px 1fr 320px', gap: '1px', backgroundColor: '#334155', height: 'calc(100vh - 65px)' }}>
        
        {/* Left Sidebar: Market Pairs */}
        <div style={{ backgroundColor: '#1e293b', padding: '15px', overflowY: 'auto' }}>
          <h3 style={{ fontSize: '14px', color: '#94a3b8', marginBottom: '15px' }}>Markets</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', cursor: 'pointer', padding: '8px', borderRadius: '4px', backgroundColor: '#334155' }}>
              <span style={{ fontWeight: 'bold' }}>BTC/USDT</span>
              <span style={{ color: '#10b981' }}>91,245.00</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', cursor: 'pointer', padding: '8px', borderRadius: '4px' }}>
              <span style={{ fontWeight: 'bold' }}>ETH/USDT</span>
              <span style={{ color: '#10b981' }}>3,420.50</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', cursor: 'pointer', padding: '8px', borderRadius: '4px' }}>
              <span style={{ fontWeight: 'bold' }}>SOL/USDT</span>
              <span style={{ color: '#ef4444' }}>185.40</span>
            </div>
          </div>
        </div>

        {/* Center: Chart Area & Order Book */}
        <div style={{ display: 'flex', flexDirection: 'column', backgroundColor: '#1e293b' }}>
          {/* Top Bar info */}
          <div style={{ display: 'flex', gap: '30px', padding: '15px', borderBottom: '1px solid #334155', alignItems: 'center' }}>
            <div>
              <span style={{ fontSize: '20px', fontWeight: 'bold', color: '#ffffff' }}>BTC / USDT</span>
            </div>
            <div>
              <span style={{ fontSize: '12px', color: '#94a3b8', display: 'block' }}>24h High</span>
              <span style={{ fontSize: '14px', fontWeight: 'bold', color: '#10b981' }}>$92,500.00</span>
            </div>
            <div>
              <span style={{ fontSize: '12px', color: '#94a3b8', display: 'block' }}>24h Low</span>
              <span style={{ fontSize: '14px', fontWeight: 'bold', color: '#ef4444' }}>$89,100.00</span>
            </div>
          </div>

          {/* Chart Placeholder Box */}
          <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#94a3b8', borderBottom: '1px solid #334155' }}>
            <p>Live Trading Chart (TradingView Integrated Here)</p>
          </div>
        </div>

        {/* Right Sidebar: Buy / Sell Panel */}
        <div style={{ backgroundColor: '#1e293b', padding: '20px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <h3 style={{ fontSize: '16px', fontWeight: 'bold', color: '#ffffff' }}>Spot Trading</h3>
          
          {/* Buy Section */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <span style={{ fontSize: '13px', color: '#10b981', fontWeight: 'bold' }}>Buy BTC</span>
            <input type="text" placeholder="Price (USDT)" style={{ backgroundColor: '#0f172a', border: '1px solid #334155', padding: '10px', color: '#fff', borderRadius: '4px' }} />
            <input type="text" placeholder="Amount (BTC)" style={{ backgroundColor: '#0f172a', border: '1px solid #334155', padding: '10px', color: '#fff', borderRadius: '4px' }} />
            <button style={{ backgroundColor: '#10b981', color: '#fff', padding: '12px', fontWeight: 'bold', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Buy BTC</button>
          </div>

          <hr style={{ borderColor: '#334155', borderStyle: 'solid', borderWidth: '0.5px' }} />

          {/* Sell Section */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <span style={{ fontSize: '13px', color: '#ef4444', fontWeight: 'bold' }}>Sell BTC</span>
            <input type="text" placeholder="Price (USDT)" style={{ backgroundColor: '#0f172a', border: '1px solid #334155', padding: '10px', color: '#fff', borderRadius: '4px' }} />
            <input type="text" placeholder="Amount (BTC)" style={{ backgroundColor: '#0f172a', border: '1px solid #334155', padding: '10px', color: '#fff', borderRadius: '4px' }} />
            <button style={{ backgroundColor: '#ef4444', color: '#fff', padding: '12px', fontWeight: 'bold', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Sell BTC</button>
          </div>
        </div>

      </div>
    </div>
  );
}
