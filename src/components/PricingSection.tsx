import React from 'react';
import { Check, ArrowRight } from 'lucide-react';
import { Button } from './Button';
import { BrokerageCalculator } from './BrokerageCalculator';

interface PricingSectionProps {
  onOpenAuth: (mode: 'signup' | 'login') => void;
}

export const PricingSection: React.FC<PricingSectionProps> = ({ onOpenAuth }) => {
  return (
    <section className="section pricing-section" id="pricing">
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <h2 className="section-title">Unbeatable Pricing. Zero Compromise.</h2>
          <p className="section-subtitle">
            We pioneered discount broking in India and brought transparency to financial services. 
            No hidden fees, no fine print surprises.
          </p>
        </div>

        {/* 3 Pillar Pricing Cards */}
        <div className="pricing-cards-grid">
          {/* Card 1: Equity Delivery */}
          <div className="pricing-card">
            <div className="pricing-amount tabular-nums">₹0</div>
            <h3 className="pricing-title">Free Equity Delivery</h3>
            <p className="pricing-desc">
              All equity delivery investments (NSE, BSE) are absolutely free &mdash; ₹0 brokerage for long-term investors.
            </p>
            <ul className="pricing-features-list">
              <li>
                <Check size={16} />
                <span>Zero brokerage on all delivery trades</span>
              </li>
              <li>
                <Check size={16} />
                <span>Hold shares in your personal CDSL demat</span>
              </li>
              <li>
                <Check size={16} />
                <span>Zero maintenance fee for BSDA demat</span>
              </li>
            </ul>
            <Button 
              variant="outline" 
              fullWidth 
              onClick={() => onOpenAuth('signup')}
            >
              Invest for Free
            </Button>
          </div>

          {/* Card 2: Intraday & F&O */}
          <div className="pricing-card featured">
            <span className="pricing-featured-tag">Active Traders</span>
            <div className="pricing-amount tabular-nums">₹20</div>
            <h3 className="pricing-title">Intraday and F&amp;O Trades</h3>
            <p className="pricing-desc">
              Flat ₹20 or 0.03% (whichever is lower) per executed order across equity, currency, and commodity.
            </p>
            <ul className="pricing-features-list">
              <li>
                <Check size={16} />
                <span>Flat ₹20 max cap per executed order</span>
              </li>
              <li>
                <Check size={16} />
                <span>Sub-15ms order routing and low latency</span>
              </li>
              <li>
                <Check size={16} />
                <span>Advanced GTT (Good Till Triggered) orders</span>
              </li>
            </ul>
            <Button 
              variant="primary" 
              fullWidth 
              onClick={() => onOpenAuth('signup')}
            >
              Start Trading
            </Button>
          </div>

          {/* Card 3: Direct Mutual Funds */}
          <div className="pricing-card">
            <div className="pricing-amount tabular-nums">₹0</div>
            <h3 className="pricing-title">Free Direct Mutual Funds</h3>
            <p className="pricing-desc">
              All direct mutual fund investments are 100% commission-free. No distributor commissions or hidden markups.
            </p>
            <ul className="pricing-features-list">
              <li>
                <Check size={16} />
                <span>Save up to 1.5% extra every year in expense ratio</span>
              </li>
              <li>
                <Check size={16} />
                <span>All mutual funds directly in demat format</span>
              </li>
              <li>
                <Check size={16} />
                <span>Flexible SIPs with pause and edit anytime</span>
              </li>
            </ul>
            <Button 
              variant="outline" 
              fullWidth 
              onClick={() => onOpenAuth('signup')}
            >
              Explore Funds
            </Button>
          </div>
        </div>

        {/* Interactive Brokerage Calculator */}
        <BrokerageCalculator />

        {/* Detailed Charges Table */}
        <div className="pricing-comparison-table-wrapper">
          <table className="pricing-table">
            <thead>
              <tr>
                <th>Service / Segment</th>
                <th>Equity Delivery</th>
                <th>Equity Intraday</th>
                <th>Equity Futures</th>
                <th>Equity Options</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>Brokerage</strong></td>
                <td style={{ color: 'var(--color-gain)', fontWeight: 600 }}>Zero (₹0)</td>
                <td>0.03% or ₹20/order</td>
                <td>0.03% or ₹20/order</td>
                <td>Flat ₹20/order</td>
              </tr>
              <tr>
                <td><strong>STT / CTT</strong></td>
                <td>0.1% on buy &amp; sell</td>
                <td>0.025% on sell</td>
                <td>0.0125% on sell</td>
                <td>0.0625% on sell (turnover)</td>
              </tr>
              <tr>
                <td><strong>Transaction charges</strong></td>
                <td>NSE: 0.00325%</td>
                <td>NSE: 0.00325%</td>
                <td>NSE: 0.0019%</td>
                <td>NSE: 0.05% (premium)</td>
              </tr>
              <tr>
                <td><strong>GST</strong></td>
                <td>18% on (brok + txn)</td>
                <td>18% on (brok + txn)</td>
                <td>18% on (brok + txn)</td>
                <td>18% on (brok + txn)</td>
              </tr>
              <tr>
                <td><strong>SEBI Charges</strong></td>
                <td>₹10 / crore</td>
                <td>₹10 / crore</td>
                <td>₹10 / crore</td>
                <td>₹10 / crore</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};
