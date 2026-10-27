import React, { useState } from 'react';

type SegmentType = 'DELIVERY' | 'INTRADAY' | 'FUTURES';

export const BrokerageCalculator: React.FC = () => {
  const [segment, setSegment] = useState<SegmentType>('DELIVERY');
  const [buyPrice, setBuyPrice] = useState<number>(1500);
  const [sellPrice, setSellPrice] = useState<number>(1550);
  const [quantity, setQuantity] = useState<number>(100);

  // Financial Calculations
  const buyValue = buyPrice * quantity;
  const sellValue = sellPrice * quantity;
  const turnover = buyValue + sellValue;
  const grossProfit = sellValue - buyValue;

  // Brokerage
  let brokerage = 0;
  if (segment === 'DELIVERY') {
    brokerage = 0; // Pure zero brokerage
  } else if (segment === 'INTRADAY') {
    const buyBrok = Math.min(20, buyValue * 0.0003);
    const sellBrok = Math.min(20, sellValue * 0.0003);
    brokerage = Number((buyBrok + sellBrok).toFixed(2));
  } else {
    // Futures
    brokerage = 40; // 20 flat buy + 20 flat sell
  }

  // STT / CTT
  let stt = 0;
  if (segment === 'DELIVERY') {
    stt = turnover * 0.001; // 0.1% on buy & sell
  } else if (segment === 'INTRADAY') {
    stt = sellValue * 0.00025; // 0.025% on sell
  } else {
    stt = sellValue * 0.000125; // 0.0125% on sell
  }

  // Exchange txn charge (approx 0.00325% on NSE)
  const exchangeTxnCharge = turnover * 0.0000325;

  // GST (18% on Brokerage + Txn Charges)
  const gst = (brokerage + exchangeTxnCharge) * 0.18;

  // SEBI turnover charges (₹10 per crore)
  const sebiCharges = turnover * 0.000001;

  // Stamp duty
  const stampDuty = segment === 'DELIVERY' ? buyValue * 0.00015 : buyValue * 0.00003;

  // Total tax & charges
  const totalCharges = Number((brokerage + stt + exchangeTxnCharge + gst + sebiCharges + stampDuty).toFixed(2));
  const netProfit = Number((grossProfit - totalCharges).toFixed(2));

  return (
    <div className="calculator-wrapper" id="calculator">
      <div className="calc-header">
        <div className="calc-title-box">
          <h3>Interactive Brokerage &amp; Regulatory Charges Estimator</h3>
          <p>Verify exact charges upfront before placing an order. 100% transparent fee math.</p>
        </div>

        {/* Segment Toggles */}
        <div className="calc-segments" role="tablist" aria-label="Trading segment">
          <button
            type="button"
            className={`calc-segment-btn ${segment === 'DELIVERY' ? 'active' : ''}`}
            onClick={() => setSegment('DELIVERY')}
          >
            Equity Delivery (₹0)
          </button>
          <button
            type="button"
            className={`calc-segment-btn ${segment === 'INTRADAY' ? 'active' : ''}`}
            onClick={() => setSegment('INTRADAY')}
          >
            Equity Intraday
          </button>
          <button
            type="button"
            className={`calc-segment-btn ${segment === 'FUTURES' ? 'active' : ''}`}
            onClick={() => setSegment('FUTURES')}
          >
            F&amp;O Futures
          </button>
        </div>
      </div>

      <div className="calc-grid">
        {/* Inputs Column */}
        <div className="calc-inputs-col">
          <div className="calc-form-group">
            <label className="calc-label" htmlFor="buy-price">Buy Price (₹)</label>
            <div className="calc-input-row">
              <span className="calc-input-prefix">₹</span>
              <input
                id="buy-price"
                type="number"
                min="0.05"
                step="0.05"
                className="calc-input tabular-nums"
                value={buyPrice}
                onChange={(e) => setBuyPrice(Math.max(0, parseFloat(e.target.value) || 0))}
              />
            </div>
          </div>

          <div className="calc-form-group">
            <label className="calc-label" htmlFor="sell-price">Sell Price (₹)</label>
            <div className="calc-input-row">
              <span className="calc-input-prefix">₹</span>
              <input
                id="sell-price"
                type="number"
                min="0.05"
                step="0.05"
                className="calc-input tabular-nums"
                value={sellPrice}
                onChange={(e) => setSellPrice(Math.max(0, parseFloat(e.target.value) || 0))}
              />
            </div>
          </div>

          <div className="calc-form-group">
            <label className="calc-label" htmlFor="calc-qty">Quantity</label>
            <div className="calc-input-row">
              <span className="calc-input-prefix">#</span>
              <input
                id="calc-qty"
                type="number"
                min="1"
                step="1"
                className="calc-input tabular-nums"
                value={quantity}
                onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
              />
            </div>
          </div>
        </div>

        {/* Results & Breakdown Column */}
        <div className="calc-results-col">
          <div className="calc-breakdown-list">
            <div className="calc-breakdown-row">
              <span>Turnover:</span>
              <span className="tabular-nums font-semibold">₹{turnover.toLocaleString('en-IN', { maximumFractionDigits: 2 })}</span>
            </div>

            <div className="calc-breakdown-row">
              <span>Brokerage:</span>
              <span className="tabular-nums font-semibold" style={{ color: brokerage === 0 ? 'var(--color-gain)' : 'inherit' }}>
                {brokerage === 0 ? '₹0.00 (Free)' : `₹${brokerage.toFixed(2)}`}
              </span>
            </div>

            <div className="calc-breakdown-row">
              <span>Securities Transaction Tax (STT):</span>
              <span className="tabular-nums">₹{stt.toFixed(2)}</span>
            </div>

            <div className="calc-breakdown-row">
              <span>Exchange Transaction Charges:</span>
              <span className="tabular-nums">₹{exchangeTxnCharge.toFixed(2)}</span>
            </div>

            <div className="calc-breakdown-row">
              <span>GST (18% on brokerage &amp; txn fees):</span>
              <span className="tabular-nums">₹{gst.toFixed(2)}</span>
            </div>

            <div className="calc-breakdown-row">
              <span>SEBI &amp; Stamp Charges:</span>
              <span className="tabular-nums">₹{(sebiCharges + stampDuty).toFixed(2)}</span>
            </div>

            <div className="calc-breakdown-row" style={{ paddingTop: '8px', borderTop: '1px solid var(--color-border-subtle)' }}>
              <span style={{ fontWeight: 600, color: 'var(--color-text-heading)' }}>Total Taxes &amp; Charges:</span>
              <span className="tabular-nums font-semibold" style={{ color: 'var(--color-loss)' }}>₹{totalCharges.toFixed(2)}</span>
            </div>
          </div>

          {/* Net P&L Summary Card */}
          <div className="calc-net-card">
            <div>
              <div className="calc-net-label">Net Profit / Loss</div>
              <div style={{ fontSize: '11px', color: 'var(--color-text-subtle)' }}>
                Gross P&amp;L: ₹{grossProfit.toLocaleString('en-IN', { maximumFractionDigits: 2 })}
              </div>
            </div>
            <div className={`calc-net-amount tabular-nums ${netProfit >= 0 ? 'gain' : 'loss'}`}>
              {netProfit >= 0 ? '+' : ''}₹{netProfit.toLocaleString('en-IN', { maximumFractionDigits: 2 })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
