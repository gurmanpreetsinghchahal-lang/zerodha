import React from 'react';

export interface OrderRecord {
  id: string;
  time: string;
  symbol: string;
  type: 'BUY' | 'SELL';
  product: 'CNC' | 'MIS';
  qty: number;
  price: number;
  status: 'COMPLETE' | 'PENDING' | 'CANCELLED';
}

interface OrdersViewProps {
  orders: OrderRecord[];
  onCancelOrder: (id: string) => void;
}

export const OrdersView: React.FC<OrdersViewProps> = ({ orders, onCancelOrder }) => {
  return (
    <div className="terminal-table-container">
      <div className="table-header-bar">
        <h2 className="table-header-title">Orders Book ({orders.length})</h2>
        <span style={{ fontSize: '12px', color: '#777' }}>
          Simulated exchange order log with real-time status updates
        </span>
      </div>

      {orders.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '60px 20px', color: '#999' }}>
          <p>No orders placed yet.</p>
          <span style={{ fontSize: '12px' }}>Use the watchlist or dashboard to place your first trade.</span>
        </div>
      ) : (
        <table className="terminal-data-table">
          <thead>
            <tr>
              <th>Time</th>
              <th>Type</th>
              <th>Instrument</th>
              <th>Product</th>
              <th>Qty</th>
              <th>Price</th>
              <th>Status</th>
              <th style={{ textAlign: 'center' }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((ord) => (
              <tr key={ord.id}>
                <td className="tabular-nums" style={{ fontSize: '12px', color: '#777' }}>{ord.time}</td>
                <td>
                  <span
                    style={{
                      fontWeight: 700,
                      color: ord.type === 'BUY' ? '#4184f3' : '#ff5722'
                    }}
                  >
                    {ord.type}
                  </span>
                </td>
                <td><strong>{ord.symbol}</strong></td>
                <td>{ord.product}</td>
                <td className="tabular-nums">{ord.qty}</td>
                <td className="tabular-nums font-semibold">₹{ord.price.toFixed(2)}</td>
                <td>
                  <span className={`status-badge ${ord.status.toLowerCase()}`}>
                    {ord.status}
                  </span>
                </td>
                <td style={{ textAlign: 'center' }}>
                  {ord.status === 'PENDING' ? (
                    <button
                      type="button"
                      className="btn btn-sm btn-secondary"
                      style={{ padding: '2px 8px', fontSize: '11px', color: 'var(--color-loss)' }}
                      onClick={() => onCancelOrder(ord.id)}
                    >
                      Cancel
                    </button>
                  ) : (
                    <span style={{ fontSize: '11px', color: '#aaa' }}>&mdash;</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};
