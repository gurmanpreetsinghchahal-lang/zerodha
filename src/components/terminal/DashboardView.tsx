import React, { useState } from 'react';
import { WatchlistStock } from './Watchlist';

interface DashboardViewProps {
  userName: string;
  equityMargin: number;
  usedMargin: number;
  totalInvestment: number;
  currentValue: number;
  selectedStock: WatchlistStock;
  onOpenOrderPad: (stock: WatchlistStock, type: 'BUY' | 'SELL') => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  userName,
  equityMargin,
  usedMargin,
  totalInvestment,
  currentValue,
  selectedStock,
  onOpenOrderPad
}) => {
  const [timeframe, setTimeframe] = useState<'1D' | '1W' | '1M' | '1Y'>('1D');
  const [showSMA, setShowSMA] = useState(true);
  const [showEMA, setShowEMA] = useState(false);
  const [showRSI, setShowRSI] = useState(false);

  const totalPnL = currentValue - totalInvestment;
  const totalPnLPct = totalInvestment > 0 ? (totalPnL / totalInvestment) * 100 : 0;
  const isOverallGain = totalPnL >= 0;

  // Simulated 5-Level Market Depth Ladder for the active stock
  const basePrice = selectedStock.price;
  const bids = [
    { price: basePrice - 0.05, orders: 14, qty: 1850 },
    { price: basePrice - 0.10, orders: 28, qty: 3200 },
    { price: basePrice - 0.15, orders: 42, qty: 5410 },
    { price: basePrice - 0.20, orders: 19, qty: 2900 },
    { price: basePrice - 0.25, orders: 35, qty: 6100 }
  ];

  const asks = [
    { price: basePrice + 0.05, orders: 18, qty: 2100 },
    { price: basePrice + 0.10, orders: 31, qty: 4150 },
    { price: basePrice + 0.15, orders: 25, qty: 3600 },
    { price: basePrice + 0.20, orders: 44, qty: 5900 },
    { price: basePrice + 0.25, orders: 52, qty: 7200 }
  ];

  const totalBidQty = bids.reduce((acc, b) => acc + b.qty, 0);
  const totalAskQty = asks.reduce((acc, a) => acc + a.qty, 0);
  const maxQty = Math.max(...bids.map(b => b.qty), ...asks.map(a => a.qty));

  return (
    <div className="terminal-dashboard">
      {/* Greeting Banner */}
      <div className="dashboard-greeting-bar">
        <div className="dashboard-user-greeting">
          <h2>Hi, {userName || 'Investor'}</h2>
          <p>Zenith Kite Terminal Active &middot; NSE &amp; BSE Live Feed Connected &middot; 8ms Latency</p>
        </div>
        <div style={{ display: 'flex', gap: '10px' }}>
          <button 
            type="button" 
            className="btn btn-sm btn-clay-buy"
            style={{ padding: '8px 20px', fontWeight: 700 }}
            onClick={() => onOpenOrderPad(selectedStock, 'BUY')}
          >
            Buy {selectedStock.symbol}
          </button>
          <button 
            type="button" 
            className="btn btn-sm btn-clay-sell"
            style={{ padding: '8px 20px', fontWeight: 700 }}
            onClick={() => onOpenOrderPad(selectedStock, 'SELL')}
          >
            Sell {selectedStock.symbol}
          </button>
        </div>
      </div>

      {/* KPI 2-Column Summary Cards */}
      <div className="dashboard-kpi-grid">
        {/* Equity Margin */}
        <div className="kpi-card">
          <div className="kpi-card-header">
            <span>EQUITY MARGIN AVAILABLE</span>
            <span style={{ color: 'var(--color-primary)', fontSize: '11px', cursor: 'pointer', fontWeight: 600 }}>
              Statement &rarr;
            </span>
          </div>
          <div className="kpi-main-val tabular-nums">
            ₹{equityMargin.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
          </div>
          <div className="kpi-sub-rows">
            <div className="kpi-sub-row">
              <span>Margin used:</span>
              <span className="tabular-nums">₹{usedMargin.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</span>
            </div>
            <div className="kpi-sub-row">
              <span>Opening balance:</span>
              <span className="tabular-nums">₹{(equityMargin + usedMargin).toLocaleString('en-IN', { minimumFractionDigits: 2 })}</span>
            </div>
          </div>
        </div>

        {/* Holdings Overview */}
        <div className="kpi-card">
          <div className="kpi-card-header">
            <span>PORTFOLIO HOLDINGS VALUE</span>
            <span style={{ color: 'var(--color-primary)', fontSize: '11px', cursor: 'pointer', fontWeight: 600 }}>
              Analytics &rarr;
            </span>
          </div>
          <div className="kpi-main-val tabular-nums">
            ₹{currentValue.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
          </div>
          <div className="kpi-sub-rows">
            <div className="kpi-sub-row">
              <span>Total investment:</span>
              <span className="tabular-nums">₹{totalInvestment.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</span>
            </div>
            <div className="kpi-sub-row">
              <span>Overall P&amp;L:</span>
              <span className={`tabular-nums font-semibold ${isOverallGain ? 'gain' : 'loss'}`} style={{ color: isOverallGain ? 'var(--color-gain)' : 'var(--color-loss)' }}>
                {isOverallGain ? '+' : ''}₹{totalPnL.toLocaleString('en-IN', { minimumFractionDigits: 2 })} ({isOverallGain ? '+' : ''}{totalPnLPct.toFixed(2)}%)
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Chart & 5-Level Market Depth Side-by-Side Grid */}
      <div className="chart-and-depth-grid">
        {/* Interactive Chart Widget */}
        <div className="terminal-chart-widget">
          <div className="chart-widget-header">
            <div className="chart-widget-title">
              <span className="chart-sym-big">{selectedStock.symbol}</span>
              <span style={{ fontSize: '11px', color: '#777', fontWeight: 600 }}>NSE &middot; EQ</span>
              <span className="tabular-nums" style={{ fontSize: '1.2rem', fontWeight: 700, marginLeft: '8px' }}>
                ₹{selectedStock.price.toFixed(2)}
              </span>
              <span className={`tabular-nums ${selectedStock.change >= 0 ? 'gain' : 'loss'}`} style={{ fontSize: '13px', fontWeight: 600, color: selectedStock.change >= 0 ? 'var(--color-gain)' : 'var(--color-loss)' }}>
                {selectedStock.change >= 0 ? '+' : ''}{selectedStock.change.toFixed(2)} ({selectedStock.changePercent.toFixed(2)}%)
              </span>
            </div>

            <div className="chart-controls">
              {(['1D', '1W', '1M', '1Y'] as const).map(tf => (
                <button
                  key={tf}
                  type="button"
                  className={`timeframe-pill ${timeframe === tf ? 'active' : ''}`}
                  onClick={() => setTimeframe(tf)}
                >
                  {tf}
                </button>
              ))}
            </div>
          </div>

          {/* SVG Chart Graphic */}
          <div style={{ width: '100%', height: '220px' }}>
            <svg viewBox="0 0 650 220" style={{ width: '100%', height: '100%' }} preserveAspectRatio="none">
              <defs>
                <linearGradient id="termChartGrad2" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#387ed1" stopOpacity="0.22" />
                  <stop offset="100%" stopColor="#387ed1" stopOpacity="0.0" />
                </linearGradient>
              </defs>

              {/* Grid lines */}
              <line x1="0" y1="45" x2="650" y2="45" stroke="#f0f2f5" strokeDasharray="3 3" />
              <line x1="0" y1="95" x2="650" y2="95" stroke="#f0f2f5" strokeDasharray="3 3" />
              <line x1="0" y1="145" x2="650" y2="145" stroke="#f0f2f5" strokeDasharray="3 3" />

              {/* Volume bars at bottom */}
              {[35, 50, 75, 40, 90, 60, 110, 85, 45, 70, 95, 80, 105, 120, 65, 85].map((h, i) => (
                <rect
                  key={i}
                  x={20 + i * 39}
                  y={220 - h * 0.38}
                  width="12"
                  height={h * 0.38}
                  fill={i % 2 === 0 ? '#dbeafe' : '#f1f5f9'}
                  rx="1"
                />
              ))}

              {/* Main Price Area & Line */}
              <path
                d="M 25 130 C 110 110, 180 160, 270 75 C 360 25, 450 100, 550 45 L 625 35 L 625 210 L 25 210 Z"
                fill="url(#termChartGrad2)"
              />
              <path
                d="M 25 130 C 110 110, 180 160, 270 75 C 360 25, 450 100, 550 45 L 625 35"
                fill="none"
                stroke="#387ed1"
                strokeWidth="2.5"
              />

              {/* Moving Average Line (SMA 20) */}
              {showSMA && (
                <path
                  d="M 25 145 C 110 135, 180 145, 270 95 C 360 65, 450 80, 550 65 L 625 55"
                  fill="none"
                  stroke="#e67e22"
                  strokeWidth="1.5"
                  strokeDasharray="4 2"
                />
              )}

              {/* EMA 50 Line */}
              {showEMA && (
                <path
                  d="M 25 155 C 110 145, 180 150, 270 110 C 360 85, 450 95, 550 80 L 625 70"
                  fill="none"
                  stroke="#9333ea"
                  strokeWidth="1.5"
                />
              )}

              <circle cx="625" cy="35" r="4.5" fill="#387ed1" />
            </svg>
          </div>

          {/* Technical Indicator Toggle Pills */}
          <div className="chart-indicators-row">
            <span style={{ color: '#777', fontWeight: 600 }}>Studies:</span>
            <button
              type="button"
              className={`indicator-toggle ${showSMA ? 'active' : ''}`}
              onClick={() => setShowSMA(!showSMA)}
            >
              SMA 20
            </button>
            <button
              type="button"
              className={`indicator-toggle ${showEMA ? 'active' : ''}`}
              onClick={() => setShowEMA(!showEMA)}
            >
              EMA 50
            </button>
            <button
              type="button"
              className={`indicator-toggle ${showRSI ? 'active' : ''}`}
              onClick={() => setShowRSI(!showRSI)}
            >
              RSI 14
            </button>
            <span style={{ marginLeft: 'auto', color: '#999', fontSize: '11px' }}>
              Chart powered by TradingView Mock
            </span>
          </div>
        </div>

        {/* 5-Level Market Depth (Bid/Ask Ladder) */}
        <div className="market-depth-card">
          <div className="market-depth-header">
            <span>MARKET DEPTH (20-LEVEL LADDER)</span>
            <span style={{ fontSize: '11px', color: '#777' }}>
              Spread: <strong className="tabular-nums">₹0.10</strong>
            </span>
          </div>

          <div className="depth-tables-grid">
            {/* Bid Side */}
            <div>
              <div className="depth-side-title bid">Bids (Buy)</div>
              <table className="depth-mini-table">
                <thead>
                  <tr>
                    <th>Price</th>
                    <th style={{ textAlign: 'right' }}>Orders</th>
                    <th style={{ textAlign: 'right' }}>Qty</th>
                  </tr>
                </thead>
                <tbody>
                  {bids.map((b, i) => {
                    const widthPct = (b.qty / maxQty) * 100;
                    return (
                      <tr key={i} className="depth-bar-container">
                        <td className="tabular-nums" style={{ color: '#4184f3', fontWeight: 600 }}>
                          ₹{b.price.toFixed(2)}
                        </td>
                        <td className="tabular-nums" style={{ textAlign: 'right', color: '#777' }}>
                          {b.orders}
                        </td>
                        <td className="tabular-nums" style={{ textAlign: 'right', fontWeight: 600, position: 'relative' }}>
                          <div 
                            className="depth-bar-bg bid" 
                            style={{ width: `${widthPct}%` }} 
                          />
                          {b.qty.toLocaleString('en-IN')}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Ask Side */}
            <div>
              <div className="depth-side-title ask">Offers (Sell)</div>
              <table className="depth-mini-table">
                <thead>
                  <tr>
                    <th>Price</th>
                    <th style={{ textAlign: 'right' }}>Orders</th>
                    <th style={{ textAlign: 'right' }}>Qty</th>
                  </tr>
                </thead>
                <tbody>
                  {asks.map((a, i) => {
                    const widthPct = (a.qty / maxQty) * 100;
                    return (
                      <tr key={i} className="depth-bar-container">
                        <td className="tabular-nums" style={{ color: '#ff5722', fontWeight: 600 }}>
                          ₹{a.price.toFixed(2)}
                        </td>
                        <td className="tabular-nums" style={{ textAlign: 'right', color: '#777' }}>
                          {a.orders}
                        </td>
                        <td className="tabular-nums" style={{ textAlign: 'right', fontWeight: 600, position: 'relative' }}>
                          <div 
                            className="depth-bar-bg ask" 
                            style={{ width: `${widthPct}%` }} 
                          />
                          {a.qty.toLocaleString('en-IN')}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          <div className="depth-total-row">
            <div>
              Total Bids: <span className="tabular-nums" style={{ color: '#4184f3' }}>{totalBidQty.toLocaleString('en-IN')}</span>
            </div>
            <div>
              Total Offers: <span className="tabular-nums" style={{ color: '#ff5722' }}>{totalAskQty.toLocaleString('en-IN')}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
