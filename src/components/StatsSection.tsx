import React from 'react';
import { Shield, Sparkles, Award, Users, Info } from 'lucide-react';

export const StatsSection: React.FC = () => {
  return (
    <section className="section stats-section" id="stats">
      <div className="container">
        {/* Top Manifesto Split */}
        <div className="stats-manifesto-grid">
          {/* Left Text Column */}
          <div className="stats-manifesto-text">
            <h2 className="stats-title">
              Trust with confidence. Built for transparency and retail empowerment.
            </h2>

            <div className="stats-principles-list">
              <div className="principle-item">
                <h3 className="principle-heading">Customer-first always</h3>
                <p className="principle-desc">
                  That's why over 12 million clients trust our ecosystem. We do not make spam calls, 
                  nor do we send unsolicited stock tips or aggressive promotional alerts.
                </p>
              </div>

              <div className="principle-item">
                <h3 className="principle-heading">No gimmicks or dark patterns</h3>
                <p className="principle-desc">
                  No hidden charges, no gamified wheel spins, and no deceptive account terms. 
                  Simple, transparent flat pricing with razor-sharp execution speed.
                </p>
              </div>

              <div className="principle-item">
                <h3 className="principle-heading">The Zenith ecosystem</h3>
                <p className="principle-desc">
                  Not just an app, but a complete financial architecture. Seamlessly trade on Kite, 
                  analyze tax P&amp;L on Console, buy direct mutual funds on Coin, and build algos with Connect API.
                </p>
              </div>

              <div className="principle-item">
                <h3 className="principle-heading">Do better with money</h3>
                <p className="principle-desc">
                  With built-in behavioural nudges to warn against trading volatile illiquid stocks, 
                  plus free market education on Varsity to help you become a smarter, disciplined investor.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Custom Clean SVG Ecosystem Illustration */}
          <div className="stats-ecosystem-visual" aria-label="Zenith Ecosystem Overview">
            <svg className="ecosystem-svg" viewBox="0 0 460 380" fill="none">
              {/* Background Connective Rings */}
              <circle cx="230" cy="190" r="140" stroke="#e2e8f0" strokeWidth="1.5" strokeDasharray="4 4" />
              <circle cx="230" cy="190" r="85" stroke="#edf2f7" strokeWidth="1" />

              {/* Core Hub */}
              <circle cx="230" cy="190" r="48" fill="#ffffff" stroke="#387ed1" strokeWidth="2.5" />
              <text x="230" y="186" textAnchor="middle" fill="#222222" fontSize="13" fontWeight="700" fontFamily="Plus Jakarta Sans">
                ZENITH
              </text>
              <text x="230" y="202" textAnchor="middle" fill="#666666" fontSize="10" fontFamily="Plus Jakarta Sans">
                Core Engine
              </text>

              {/* Orbit Node 1: Kite (Top) */}
              <g transform="translate(230, 50)">
                <circle cx="0" cy="0" r="32" fill="#ffffff" stroke="#e2e8f0" strokeWidth="1.5" />
                <text x="0" y="-2" textAnchor="middle" fill="#222222" fontSize="11" fontWeight="600" fontFamily="Plus Jakarta Sans">Kite</text>
                <text x="0" y="12" textAnchor="middle" fill="#666666" fontSize="9" fontFamily="Plus Jakarta Sans">Trading</text>
                <line x1="0" y1="32" x2="0" y2="92" stroke="#387ed1" strokeWidth="1.5" strokeDasharray="2 2" />
              </g>

              {/* Orbit Node 2: Console (Top Right) */}
              <g transform="translate(350, 115)">
                <circle cx="0" cy="0" r="32" fill="#ffffff" stroke="#e2e8f0" strokeWidth="1.5" />
                <text x="0" y="-2" textAnchor="middle" fill="#222222" fontSize="11" fontWeight="600" fontFamily="Plus Jakarta Sans">Console</text>
                <text x="0" y="12" textAnchor="middle" fill="#666666" fontSize="9" fontFamily="Plus Jakarta Sans">P&amp;L / Tax</text>
              </g>

              {/* Orbit Node 3: Coin (Bottom Right) */}
              <g transform="translate(350, 265)">
                <circle cx="0" cy="0" r="32" fill="#ffffff" stroke="#e2e8f0" strokeWidth="1.5" />
                <text x="0" y="-2" textAnchor="middle" fill="#222222" fontSize="11" fontWeight="600" fontFamily="Plus Jakarta Sans">Coin</text>
                <text x="0" y="12" textAnchor="middle" fill="#666666" fontSize="9" fontFamily="Plus Jakarta Sans">0% MF</text>
              </g>

              {/* Orbit Node 4: Varsity (Bottom Left) */}
              <g transform="translate(110, 265)">
                <circle cx="0" cy="0" r="32" fill="#ffffff" stroke="#e2e8f0" strokeWidth="1.5" />
                <text x="0" y="-2" textAnchor="middle" fill="#222222" fontSize="11" fontWeight="600" fontFamily="Plus Jakarta Sans">Varsity</text>
                <text x="0" y="12" textAnchor="middle" fill="#666666" fontSize="9" fontFamily="Plus Jakarta Sans">Education</text>
              </g>

              {/* Orbit Node 5: Connect API (Top Left) */}
              <g transform="translate(110, 115)">
                <circle cx="0" cy="0" r="32" fill="#ffffff" stroke="#e2e8f0" strokeWidth="1.5" />
                <text x="0" y="-2" textAnchor="middle" fill="#222222" fontSize="11" fontWeight="600" fontFamily="Plus Jakarta Sans">Connect</text>
                <text x="0" y="12" textAnchor="middle" fill="#666666" fontSize="9" fontFamily="Plus Jakarta Sans">REST API</text>
              </g>
            </svg>
            <div className="stats-disclaimer-note">
              Zenith Financial Ecosystem Architecture &middot; Seamless Single Demat Access
            </div>
          </div>
        </div>

        {/* Bottom Metrics Strip */}
        <div className="stats-metrics-strip">
          <div className="metric-card">
            <span className="metric-number tabular-nums">12M+</span>
            <span className="metric-label">Registered Accounts</span>
            <p className="metric-desc">Empowering individuals across 800+ Indian cities and towns.</p>
            <span className="metric-tag">Demonstration Figure</span>
          </div>

          <div className="metric-card">
            <span className="metric-number tabular-nums">₹4.5L Cr</span>
            <span className="metric-label">Demat Holdings Tracked</span>
            <p className="metric-desc">In equity investments, sovereign gold bonds, and direct mutual funds.</p>
            <span className="metric-tag">Demonstration Figure</span>
          </div>

          <div className="metric-card">
            <span className="metric-number tabular-nums">15%+</span>
            <span className="metric-label">Daily Retail Volume</span>
            <p className="metric-desc">Of Indian stock exchange equity trades processed reliably each day.</p>
            <span className="metric-tag">Demonstration Figure</span>
          </div>

          <div className="metric-card">
            <span className="metric-number tabular-nums">₹0</span>
            <span className="metric-label">Equity Delivery Fee</span>
            <p className="metric-desc">Pioneered zero-brokerage investing to encourage long-term wealth creation.</p>
            <span className="metric-tag">Guaranteed Pricing</span>
          </div>
        </div>
      </div>
    </section>
  );
};
