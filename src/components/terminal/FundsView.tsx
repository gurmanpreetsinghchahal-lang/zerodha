import React, { useState } from 'react';
import { ArrowDownLeft, ArrowUpRight, ShieldCheck } from 'lucide-react';
import { Button } from '../Button';

interface FundsViewProps {
  equityMargin: number;
  usedMargin: number;
  onAddFunds: (amount: number) => void;
}

export const FundsView: React.FC<FundsViewProps> = ({
  equityMargin,
  usedMargin,
  onAddFunds
}) => {
  const [depositAmount, setDepositAmount] = useState<number>(25000);
  const [depositSuccess, setDepositSuccess] = useState(false);

  const handleDeposit = (e: React.FormEvent) => {
    e.preventDefault();
    if (depositAmount > 0) {
      onAddFunds(depositAmount);
      setDepositSuccess(true);
      setTimeout(() => setDepositSuccess(false), 4000);
    }
  };

  return (
    <div className="terminal-table-container">
      <div className="table-header-bar">
        <div>
          <h2 className="table-header-title">Funds &amp; Account Margins</h2>
          <span style={{ fontSize: '12px', color: '#777' }}>
            Instant fund deposits via UPI &amp; Netbanking &middot; Zero payment gateway charges
          </span>
        </div>
      </div>

      <div className="dashboard-kpi-grid" style={{ marginBottom: '28px' }}>
        <div className="kpi-card">
          <div className="kpi-card-header">
            <span>AVAILABLE CASH BALANCE</span>
            <span style={{ color: 'var(--color-gain)', fontWeight: 600 }}>Active</span>
          </div>
          <div className="kpi-main-val tabular-nums">
            ₹{equityMargin.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
          </div>
          <div className="kpi-sub-rows">
            <div className="kpi-sub-row">
              <span>Total Margin Used:</span>
              <span className="tabular-nums">₹{usedMargin.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</span>
            </div>
            <div className="kpi-sub-row">
              <span>Collateral (Liquid Bees/Govt Bonds):</span>
              <span className="tabular-nums">₹0.00</span>
            </div>
          </div>
        </div>

        {/* Deposit Quick Action */}
        <div className="kpi-card">
          <div className="kpi-card-header">
            <span>INSTANT UPI / NETBANKING DEPOSIT</span>
            <span style={{ color: 'var(--color-primary)', fontSize: '11px' }}>Demo Gateway</span>
          </div>

          <form onSubmit={handleDeposit} style={{ marginTop: '8px' }}>
            <div style={{ display: 'flex', gap: '8px', marginBottom: '12px' }}>
              {[10000, 25000, 50000, 100000].map((amt) => (
                <button
                  key={amt}
                  type="button"
                  className="btn btn-sm btn-secondary"
                  style={{
                    flex: 1,
                    padding: '6px 8px',
                    fontSize: '12px',
                    fontWeight: 600,
                    borderRadius: '4px'
                  }}
                  onClick={() => setDepositAmount(amt)}
                >
                  +₹{(amt / 1000).toFixed(0)}k
                </button>
              ))}
            </div>

            <div style={{ display: 'flex', gap: '10px' }}>
              <input
                type="number"
                min="100"
                step="500"
                className="form-input tabular-nums"
                style={{ flex: 1 }}
                value={depositAmount}
                onChange={(e) => setDepositAmount(Math.max(100, parseInt(e.target.value) || 0))}
              />
              <Button variant="primary" size="sm" type="submit" icon={<ArrowDownLeft size={15} />}>
                Add Funds
              </Button>
            </div>

            {depositSuccess && (
              <div style={{ fontSize: '12px', color: 'var(--color-gain)', marginTop: '8px', fontWeight: 600 }}>
                &check; ₹{depositAmount.toLocaleString('en-IN')} deposited instantly via simulated UPI!
              </div>
            )}
          </form>
        </div>
      </div>

      <div style={{ background: '#fafbfc', border: '1px solid #e5e7eb', borderRadius: '4px', padding: '16px' }}>
        <h4 style={{ fontSize: '13px', fontWeight: 600, marginBottom: '6px' }}>Regulatory Bank Payout Note</h4>
        <p style={{ fontSize: '12px', color: '#666', lineHeight: '1.5', margin: 0 }}>
          As per SEBI guidelines, all funds are settled with the clearing corporation daily. Unutilized trading margins are auto-refunded to your primary bank account on the first Friday of every month (Quarterly Settlement Cycle).
        </p>
      </div>
    </div>
  );
};
