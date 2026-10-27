import React, { useState } from 'react';
import { 
  TrendingUp, 
  Wallet, 
  Coins, 
  Bookmark, 
  PieChart, 
  BookOpen, 
  Code, 
  BellRing,
  CheckCircle2,
  ArrowRight
} from 'lucide-react';
import { ProductCard, ProductItem } from './ProductCard';
import { Button } from './Button';

interface ProductsSectionProps {
  onOpenAuth: (mode: 'signup' | 'login') => void;
}

const PRODUCTS_DATA: ProductItem[] = [
  {
    id: 'stock-trading',
    category: 'Flagship Platform',
    title: 'Online Stock Trading',
    productName: 'Zenith Kite',
    description: 'Ultra-fast web and mobile trading terminal with millisecond execution, advanced TradingView charts, and multi-depth order books for equities and F&O.',
    badge: 'Popular',
    icon: <TrendingUp size={24} />,
    actionText: 'Explore Kite',
    actionHref: '#hero',
    platformMeta: 'Web, iOS, Android'
  },
  {
    id: 'investing',
    category: 'Wealth Building',
    title: 'Long-Term Investing',
    productName: 'Zenith Delivery',
    description: 'Zero brokerage on all equity delivery investments. Build your retirement nest egg with fractional investments, sovereign bonds, and automated monthly SIPs.',
    badge: '₹0 Brokerage',
    icon: <Wallet size={24} />,
    actionText: 'Start Investing',
    actionHref: '#pricing',
    platformMeta: 'Demat Equity'
  },
  {
    id: 'mutual-funds',
    category: 'Direct Funds',
    title: 'Mutual Funds',
    productName: 'Zenith Coin',
    description: 'Buy direct mutual funds online with 0% distributor commission. Invest in over 2,500 schemes credited straight into your demat account.',
    badge: 'Zero Commission',
    icon: <Coins size={24} />,
    actionText: 'Discover Coin',
    actionHref: '#pricing',
    platformMeta: 'Direct AMC'
  },
  {
    id: 'watchlists',
    category: 'Market Intelligence',
    title: 'Market Watchlists',
    productName: 'Zenith Sentinel',
    description: 'Customizable multi-market watchlists with real-time streaming quotes, sector heatmaps, and cloud-based price alerts triggered even when offline.',
    badge: 'Cloud Alerts',
    icon: <Bookmark size={24} />,
    actionText: 'Set Watchlists',
    actionHref: '#hero',
    platformMeta: 'Real-time Feeds'
  },
  {
    id: 'portfolio',
    category: 'Reporting & Tax',
    title: 'Portfolio Tracking',
    productName: 'Zenith Console',
    description: 'Comprehensive central reporting dashboard with detailed analytics, capital gains tax statements, P&L heatmaps, and corporate action tracking.',
    badge: 'Tax Ready',
    icon: <PieChart size={24} />,
    actionText: 'View Console',
    actionHref: '#calculator',
    platformMeta: 'Detailed Analytics'
  },
  {
    id: 'education',
    category: 'Knowledge Base',
    title: 'Financial Learning Resources',
    productName: 'Zenith Varsity',
    description: 'In-depth, beginner-to-advanced financial education covering stock markets, derivatives, and technical analysis completely free of cost.',
    badge: '100% Free',
    icon: <BookOpen size={24} />,
    actionText: 'Read Varsity',
    actionHref: '#education',
    platformMeta: 'Open Knowledge'
  }
];

export const ProductsSection: React.FC<ProductsSectionProps> = ({ onOpenAuth }) => {
  const [activeCategory, setActiveCategory] = useState<'All' | 'Trading' | 'Investment' | 'Tools'>('All');

  const filteredProducts = PRODUCTS_DATA.filter(prod => {
    if (activeCategory === 'All') return true;
    if (activeCategory === 'Trading') return prod.id === 'stock-trading' || prod.id === 'watchlists';
    if (activeCategory === 'Investment') return prod.id === 'investing' || prod.id === 'mutual-funds';
    if (activeCategory === 'Tools') return prod.id === 'portfolio' || prod.id === 'education';
    return true;
  });

  return (
    <section className="section products-section" id="products">
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <h2 className="section-title">The Zenith Technology Suite</h2>
          <p className="section-subtitle">
            Sleek, modern, and intuitive trading platforms engineered for fast execution, 
            zero friction, and effortless portfolio management.
          </p>
        </div>

        {/* Filter Bar */}
        <div className="products-filter-bar" role="tablist" aria-label="Product categories">
          {(['All', 'Trading', 'Investment', 'Tools'] as const).map(cat => (
            <button
              key={cat}
              type="button"
              role="tab"
              aria-selected={activeCategory === cat}
              className={`product-tab-btn ${activeCategory === cat ? 'active' : ''}`}
              onClick={() => setActiveCategory(cat)}
            >
              {cat === 'All' ? 'All Products (6)' : cat}
            </button>
          ))}
        </div>

        {/* Products Grid */}
        <div className="products-grid">
          {filteredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* Developer Ecosystem Spotlight (Connect API) */}
        <div className="product-spotlight">
          <div className="spotlight-info">
            <h3>Zenith Connect API &middot; Algorithmic Trading</h3>
            <p>
              Programmatic order execution and market data streaming APIs for retail quants, 
              fintech startups, and independent algorithm developers.
            </p>
            <ul className="spotlight-list">
              <li>
                <CheckCircle2 size={16} />
                <span>RESTful APIs with client libraries in Python, Node.js, and Java</span>
              </li>
              <li>
                <CheckCircle2 size={16} />
                <span>Sub-15ms order placement latency and WebSocket live tick streaming</span>
              </li>
              <li>
                <CheckCircle2 size={16} />
                <span>Paper trading sandbox with simulated exchange order matching</span>
              </li>
            </ul>
            <Button 
              variant="outline" 
              onClick={() => onOpenAuth('signup')}
              icon={<ArrowRight size={16} />}
            >
              Explore Developer APIs
            </Button>
          </div>

          <div className="spotlight-graphic">
            <div className="spotlight-mini-row tabular-nums">
              <span>GET /v3/quotes?symbol=NSE:NIFTY</span>
              <span style={{ color: 'var(--color-gain)', fontWeight: 600 }}>200 OK &middot; 9ms</span>
            </div>
            <div className="spotlight-mini-row tabular-nums">
              <span>POST /v3/orders/regular</span>
              <span style={{ color: 'var(--color-gain)', fontWeight: 600 }}>ORDER_PLACED &middot; 12ms</span>
            </div>
            <div className="spotlight-mini-row tabular-nums">
              <span>WS /v3/stream/ticks</span>
              <span style={{ color: 'var(--color-primary)', fontWeight: 600 }}>Connected (2,500 pkts/s)</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
