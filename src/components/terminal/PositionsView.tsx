import React from 'react';

export interface PositionItem {
  id: string;
  product: 'MIS' | 'NRML';
  symbol: string;
  qty: number;
  avgPrice: number;
  ltp: number;
}

interface PositionsViewProps {
  positions: PositionItem[];
  onSquareOff: (posId: string) => void;
}

export const PositionsView: React.FC<PositionsViewProps> = ({ positions, onSquareOff }) => {
  const totalPnL = positions.reduce((acc, pos) => acc + (pos.ltp - pos.avgPrice) * pos.qty, 0);
  const isGain = totalPnL >= 0;

  return (
    <div className="terminal-table-container">
      <div className="table-header-bar">
        <div>
          <h2 className="table-header-title">Positions ({positions.length})</h2>
          <span style={{ fontSize: '12px', color: '#777' }}>
            Active Intraday (MIS) &amp; F&amp;O open positions
          </span>
        </div>

        <div style={{ textAlign: 'right' }}>
          <span style={{ fontSize: '11px', color: '#777' }}>Total Day's P&amp;L: </span>
          <span className={`tabular-nums ${isGain ? 'gain' : 'loss'}`} style={{ fontSize: '15px', fontWeight: 700, color: isGain ? 'var(--color-gain)' : 'var(--color-loss)' }}>
            {isGain ? '+' : ''}₹{totalPnL.toFixed(2)}
          </span>
        </div>
      </div>

      {positions.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '60px 20px', color: '#999' }}>
          <p>No open intraday or derivative positions.</p>
          <span style={{ fontSize: '12px' }}>Intraday positions auto square-off at 3:20 PM IST.</span>
        </div>
      ) : (
        <table className="terminal-data-table">
          <thead>
            <tr>
              <th>Product</th>
              <th>Instrument</th>
              <th>Net Qty</th>
              <th>Avg. Price</th>
              <th>LTP</th>
              <th>P&amp;L</th>
              <th style={{ textAlign: 'center' }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {positions.map((pos) => {
              const pnl = (pos.ltp - pos.avgPrice) * pos.qty;
              const posGain = pnl >= 0;

              return (
                <tr key={pos.id}>
                  <td>
                    <span style={{ fontSize: '11px', fontWeight: 700, backgroundColor: '#f0f0f0', padding: '2px 6px', borderRadius: '2px' }}>
                      {pos.product}
                    </span>
                  </td>
                  <td><strong>{pos.symbol}</strong></td>
                  <td className="tabular-nums font-semibold">{pos.qty}</td>
                  <td className="tabular-nums">₹{pos.avgPrice.toFixed(2)}</td>
                  <td className="tabular-nums font-semibold">₹{pos.ltp.toFixed(2)}</td>
                  <td className="tabular-nums" style={{ color: posGain ? 'var(--color-gain)' : 'var(--color-loss)', fontWeight: 700 }}>
                    {posGain ? '+' : ''}₹{pnl.toFixed(2)}
                  </td>
                  <td style={{ textAlign: 'center' }}>
                    <button
                      type="button"
                      className="btn btn-sm btn-clay-sell"
                      style={{ padding: '3px 12px', fontSize: '11px', fontWeight: 600 }}
                      onClick={() => onSquareOff(pos.id)}
                    >
                      Square Off
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
};
