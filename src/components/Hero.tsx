import React, { useState, useEffect } from 'react';
import { ArrowRight, ChevronRight, CheckCircle2 } from 'lucide-react';
import { Button } from './Button';

interface HeroProps {
  onOpenAuth: (mode: 'signup' | 'login') => void;
  onExploreProducts: () => void;
  onShowToast: (message: string) => void;
}

interface StockItem {
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
  candles: number[];
}

const INITIAL_STOCKS: StockItem[] = [
  {
    symbol: 'RELIANCE',
    name: 'Reliance Industries',
    price: 2984.40,
    change: 32.50,
    changePercent: 1.10,
    candles: [40, 52, 48, 65, 78, 62, 85, 92, 88, 110, 105, 125, 138]
  },
  {
    symbol: 'TCS',
    name: 'Tata Consultancy Services',
    price: 3892.15,
    change: -14.20,
    changePercent: -0.36,
    candles: [110, 105, 118, 98, 92, 104, 96, 88, 91, 85, 79, 82, 78]
  },
  {
    symbol: 'HDFCBANK',
    name: 'HDFC Bank Ltd',
    price: 1542.80,
    change: 18.90,
    changePercent: 1.24,
    candles: [55, 60, 58, 70, 75, 82, 80, 95, 92, 105, 112, 110, 120]
  },
  {
    symbol: 'INFY',
    name: 'Infosys Ltd',
    price: 1512.30,
    change: 6.40,
    changePercent: 0.42,
    candles: [70, 75, 72, 80, 78, 85, 88, 86, 92, 90, 94, 98, 102]
  },
  {
    symbol: 'NIFTY 50',
    name: 'NIFTY 50 Index',
    price: 22485.60,
    change: 112.45,
    changePercent: 0.50,
    candles: [80, 85, 92, 90, 105, 110, 108, 120, 125, 130, 128, 140, 145]
  }
];

export const Hero: React.FC<HeroProps> = ({
  onOpenAuth,
  onExploreProducts,
  onShowToast
}) => {
  const [stocks, setStocks] = useState<StockItem[]>(INITIAL_STOCKS);
  const [selectedStockIndex, setSelectedStockIndex] = useState(0);
  const [timeframe, setTimeframe] = useState<'1D' | '1W' | '1M' | '1Y'>('1D');

  const currentStock = stocks[selectedStockIndex];

  // Subtle live tick simulation every 4 seconds to mimic real market activity
  useEffect(() => {
    const interval = setInterval(() => {
      setStocks(prev => prev.map(stock => {
        const delta = (Math.random() - 0.48) * (stock.price * 0.002);
        const newPrice = Number((stock.price + delta).toFixed(2));
        const newChange = Number((stock.change + delta).toFixed(2));
        const newPct = Number(((newChange / (newPrice - newChange)) * 100).toFixed(2));
        return {
          ...stock,
          price: newPrice,
          change: newChange,
          changePercent: newPct
        };
      }));
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  const handleOrder = (type: 'BUY' | 'SELL') => {
    onShowToast(`Simulated ${type} order submitted for 10 shares of ${currentStock.symbol} at ₹${currentStock.price}`);
  };

  return (
    <section className="section hero-section" id="hero">
      <div className="container">
        <div className="hero-grid">
          {/* Left Column: Core Value Proposition */}
          <div className="hero-content">
            <div className="hero-kicker">
              <span>Next-Gen Stock Brokerage</span>
              <span aria-hidden="true">·</span>
              <span>SEBI Registered (Demo)</span>
            </div>

            <h1 className="hero-headline">
              Invest Smarter. Trade with Confidence.
            </h1>

            <p className="hero-description">
              Online platform to invest in stocks, derivatives, direct mutual funds, ETFs, and bonds. 
              Zero brokerage on equity investments and flat ₹20 for intraday and F&amp;O trades.
            </p>

            <div className="hero-cta-group">
              <Button 
                variant="primary" 
                size="lg"
                onClick={() => onOpenAuth('signup')}
              >
                Get Started
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                onClick={onExploreProducts}
                icon={<ArrowRight size={18} />}
              >
                Explore Products
              </Button>
            </div>

            <div className="hero-trust-row">
              <div className="hero-trust-item">
                <span className="hero-trust-val tabular-nums">₹0</span>
                <span className="hero-trust-label">Brokerage on investments</span>
              </div>
              <div className="hero-trust-item">
                <span className="hero-trust-val tabular-nums">₹20</span>
                <span className="hero-trust-label">Flat fee per intraday order</span>
              </div>
              <div className="hero-trust-item">
                <span className="hero-trust-val tabular-nums">12M+</span>
                <span className="hero-trust-label">Ecosystem traders</span>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Trading Platform Mockup */}
          <div className="hero-visual-card" aria-label="Interactive Trading Terminal Preview">
            {/* Terminal Window Header */}
            <div className="hero-terminal-bar">
              <div className="hero-terminal-dots">
                <div className="terminal-dot red" />
                <div className="terminal-dot yellow" />
                <div className="terminal-dot green" />
              </div>
              <div className="hero-terminal-market">
                <span className="tabular-nums">NSE: 22,485.60</span>
                <span className="terminal-badge">+0.50%</span>
                <span className="tabular-nums">BSE: 74,120.80</span>
              </div>
            </div>

            {/* Split: Market Watchlist + Active Chart */}
            <div className="hero-terminal-body">
              {/* Watchlist Sidebar */}
              <div className="hero-watchlist">
                <div className="watchlist-header">Market Watch (5)</div>
                {stocks.map((item, idx) => {
                  const isGain = item.change >= 0;
                  return (
                    <button
                      key={item.symbol}
                      type="button"
                      className={`watchlist-item ${idx === selectedStockIndex ? 'active' : ''}`}
                      onClick={() => setSelectedStockIndex(idx)}
                    >
                      <span className="watchlist-symbol">{item.symbol}</span>
                      <div className="watchlist-price-row">
                        <span className="watchlist-price tabular-nums">
                          ₹{item.price.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                        </span>
                        <span className={`watchlist-chg tabular-nums ${isGain ? 'gain' : 'loss'}`}>
                          {isGain ? '+' : ''}{item.changePercent.toFixed(2)}%
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Chart & Interactive Order View */}
              <div className="hero-chart-view">
                <div>
                  <div className="chart-header">
                    <div>
                      <span className="chart-stock-title">{currentStock.symbol}</span>
                      <span className="chart-stock-meta">{currentStock.name}</span>
                    </div>
                    <div className="chart-stock-live">
                      <span className="chart-live-price tabular-nums">
                        ₹{currentStock.price.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                      </span>
                      <span className={`chart-live-change tabular-nums ${currentStock.change >= 0 ? 'gain' : 'loss'}`}>
                        {currentStock.change >= 0 ? '+' : ''}{currentStock.change.toFixed(2)} ({currentStock.changePercent.toFixed(2)}%)
                      </span>
                    </div>
                  </div>

                  {/* SVG Candlestick & Sparkline Visualization */}
                  <div className="chart-svg-container">
                    <svg className="chart-svg" viewBox="0 0 320 140" preserveAspectRatio="none">
                      <defs>
                        <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#387ed1" stopOpacity="0.25" />
                          <stop offset="100%" stopColor="#387ed1" stopOpacity="0.0" />
                        </linearGradient>
                      </defs>

                      {/* Subtle Grid Lines */}
                      <line x1="0" y1="35" x2="320" y2="35" stroke="#f1f5f9" strokeWidth="1" strokeDasharray="3 3" />
                      <line x1="0" y1="70" x2="320" y2="70" stroke="#f1f5f9" strokeWidth="1" strokeDasharray="3 3" />
                      <line x1="0" y1="105" x2="320" y2="105" stroke="#f1f5f9" strokeWidth="1" strokeDasharray="3 3" />

                      {/* Candlesticks */}
                      {currentStock.candles.map((val, i) => {
                        const x = 20 + i * 22;
                        const height = Math.max(8, val * 0.7);
                        const y = 120 - height;
                        const isUp = i % 2 === 0 || val > 80;
                        const color = isUp ? '#28a745' : '#df514c';
                        return (
                          <g key={i}>
                            <line x1={x + 5} y1={y - 6} x2={x + 5} y2={y + height + 6} stroke={color} strokeWidth="1.2" />
                            <rect 
                              x={x} 
                              y={y} 
                              width="10" 
                              height={height} 
                              fill={color} 
                              rx="1" 
                            />
                          </g>
                        );
                      })}

                      {/* Smooth Area Curve Over Chart */}
                      <path
                        d="M 20 90 Q 70 70, 110 85 T 200 45 T 290 35 L 290 135 L 20 135 Z"
                        fill="url(#chartGradient)"
                      />
                      <path
                        d="M 20 90 Q 70 70, 110 85 T 200 45 T 290 35"
                        fill="none"
                        stroke="#387ed1"
                        strokeWidth="2"
                      />
                    </svg>
                  </div>

                  {/* Timeframe Toggles */}
                  <div className="chart-timeframes">
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

                {/* Quick Action Footer */}
                <div className="terminal-actions-bar">
                  <div className="terminal-stat-pill">
                    Market Depth: <span className="tabular-nums">1.4M Bids</span>
                  </div>
                  <div className="terminal-buttons">
                    <button 
                      type="button" 
                      className="mini-btn mini-btn-buy"
                      onClick={() => handleOrder('BUY')}
                    >
                      BUY
                    </button>
                    <button 
                      type="button" 
                      className="mini-btn mini-btn-sell"
                      onClick={() => handleOrder('SELL')}
                    >
                      SELL
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
