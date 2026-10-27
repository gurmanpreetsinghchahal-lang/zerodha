import React from 'react';
import { WatchlistStock } from './Watchlist';

export interface HoldingItem {
  symbol: string;
  qty: number;
  avgCost: number;
  ltp: number;
}

interface HoldingsViewProps {
  holdings: HoldingItem[];
  onOpenOrderPad: (stock: WatchlistStock, type: 'BUY' | 'SELL') => void;
}

export const HoldingsView: React.FC<HoldingsViewProps> = ({ holdings, onOpenOrderPad }) => {
  const totalInvestment = holdings.reduce((acc, h) => acc + h.qty * h.avgCost, 0);
  const currentTotal = holdings.reduce((acc, h) => acc + h.qty * h.ltp, 0);
  const totalPnL = currentTotal - totalInvestment;
  const totalPnLPct = totalInvestment > 0 ? (totalPnL / totalInvestment) * 100 : 0;
  const isGain = totalPnL >= 0;

  return (
    <div className="terminal-table-container">
      <div className="table-header-bar">
        <div>
          <h2 className="table-header-title">Holdings ({holdings.length})</h2>
          <span style={{ fontSize: '12px', color: '#777' }}>
            Total Investment: <strong className="tabular-nums">₹{totalInvestment.toLocaleString('en-IN', { maximumFractionDigits: 2 })}</strong> &middot; Current Value: <strong className="tabular-nums">₹{currentTotal.toLocaleString('en-IN', { maximumFractionDigits: 2 })}</strong>
          </span>
        </div>

        <div style={{ textAlign: 'right' }}>
          <span style={{ fontSize: '11px', color: '#777' }}>Total P&amp;L: </span>
          <span className={`tabular-nums ${isGain ? 'gain' : 'loss'}`} style={{ fontSize: '15px', fontWeight: 700, color: isGain ? 'var(--color-gain)' : 'var(--color-loss)' }}>
            {isGain ? '+' : ''}₹{totalPnL.toLocaleString('en-IN', { maximumFractionDigits: 2 })} ({isGain ? '+' : ''}{totalPnLPct.toFixed(2)}%)
          </span>
        </div>
      </div>

      <table className="terminal-data-table">
        <thead>
          <tr>
            <th>Instrument</th>
            <th>Qty</th>
            <th>Avg. Cost</th>
            <th>LTP</th>
            <th>Current Val</th>
            <th>P&amp;L</th>
            <th>Net Chg</th>
            <th style={{ textAlign: 'center' }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {holdings.map((item) => {
            const invested = item.qty * item.avgCost;
            const current = item.qty * item.ltp;
            const pnl = current - invested;
            const pnlPct = invested > 0 ? (pnl / invested) * 100 : 0;
            const itemGain = pnl >= 0;

            const stockObj: WatchlistStock = {
              symbol: item.symbol,
              exchange: 'NSE',
              price: item.ltp,
              change: item.ltp - item.avgCost,
              changePercent: pnlPct
            };

            return (
              <tr key={item.symbol}>
                <td>
                  <strong>{item.symbol}</strong>
                  <div style={{ fontSize: '10px', color: '#888' }}>CNC &middot; CDSL</div>
                </td>
                <td className="tabular-nums">{item.qty}</td>
                <td className="tabular-nums">₹{item.avgCost.toFixed(2)}</td>
                <td className="tabular-nums font-semibold">₹{item.ltp.toFixed(2)}</td>
                <td className="tabular-nums">₹{current.toLocaleString('en-IN', { maximumFractionDigits: 2 })}</td>
                <td className="tabular-nums" style={{ color: itemGain ? 'var(--color-gain)' : 'var(--color-loss)', fontWeight: 600 }}>
                  {itemGain ? '+' : ''}₹{pnl.toFixed(2)}
                </td>
                <td className="tabular-nums" style={{ color: itemGain ? 'var(--color-gain)' : 'var(--color-loss)' }}>
                  {itemGain ? '+' : ''}{pnlPct.toFixed(2)}%
                </td>
                <td style={{ textAlign: 'center' }}>
                  <div style={{ display: 'inline-flex', gap: '6px' }}>
                    <button
                      type="button"
                      className="btn btn-sm btn-clay-buy"
                      style={{ padding: '3px 10px', fontSize: '11px', fontWeight: 600 }}
                      onClick={() => onOpenOrderPad(stockObj, 'BUY')}
                    >
                      Add
                    </button>
                    <button
                      type="button"
                      className="btn btn-sm btn-clay-sell"
                      style={{ padding: '3px 10px', fontSize: '11px', fontWeight: 600 }}
                      onClick={() => onOpenOrderPad(stockObj, 'SELL')}
                    >
                      Exit
                    </button>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
