import React from 'react';
import { LogOut, LayoutDashboard, ListOrdered, Briefcase, Zap, Wallet } from 'lucide-react';

export type TerminalTab = 'dashboard' | 'orders' | 'holdings' | 'positions' | 'funds';

interface TerminalHeaderProps {
  activeTab: TerminalTab;
  onSelectTab: (tab: TerminalTab) => void;
  clientId: string;
  userName: string;
  ordersCount: number;
  onExitTerminal: () => void;
}

export const TerminalHeader: React.FC<TerminalHeaderProps> = ({
  activeTab,
  onSelectTab,
  clientId,
  userName,
  ordersCount,
  onExitTerminal
}) => {
  return (
    <header className="terminal-header">
      <div className="terminal-header-left">
        <div className="terminal-logo">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <polygon points="12 2 22 8.5 22 15.5 12 22 2 15.5 2 8.5 12 2" />
            <line x1="12" y1="22" x2="12" y2="15.5" />
            <polyline points="22 8.5 12 15.5 2 8.5" />
          </svg>
          <span>KITE</span>
        </div>

        {/* Live Market Indices Bar */}
        <div className="terminal-market-indices">
          <div className="market-index-item">
            <span className="index-name">NIFTY 50</span>
            <span className="index-val tabular-nums">22,485.60</span>
            <span className="index-chg gain tabular-nums">+0.50%</span>
          </div>
          <div className="market-index-item">
            <span className="index-name">SENSEX</span>
            <span className="index-val tabular-nums">74,120.80</span>
            <span className="index-chg gain tabular-nums">+0.47%</span>
          </div>
        </div>
      </div>

      {/* Nav Tabs */}
      <nav className="terminal-header-nav" aria-label="Terminal Navigation">
        <button
          type="button"
          className={`terminal-nav-btn ${activeTab === 'dashboard' ? 'active' : ''}`}
          onClick={() => onSelectTab('dashboard')}
        >
          <LayoutDashboard size={15} />
          <span>Dashboard</span>
        </button>

        <button
          type="button"
          className={`terminal-nav-btn ${activeTab === 'orders' ? 'active' : ''}`}
          onClick={() => onSelectTab('orders')}
        >
          <ListOrdered size={15} />
          <span>Orders</span>
          {ordersCount > 0 && <span className="terminal-nav-badge">{ordersCount}</span>}
        </button>

        <button
          type="button"
          className={`terminal-nav-btn ${activeTab === 'holdings' ? 'active' : ''}`}
          onClick={() => onSelectTab('holdings')}
        >
          <Briefcase size={15} />
          <span>Holdings</span>
        </button>

        <button
          type="button"
          className={`terminal-nav-btn ${activeTab === 'positions' ? 'active' : ''}`}
          onClick={() => onSelectTab('positions')}
        >
          <Zap size={15} />
          <span>Positions</span>
        </button>

        <button
          type="button"
          className={`terminal-nav-btn ${activeTab === 'funds' ? 'active' : ''}`}
          onClick={() => onSelectTab('funds')}
        >
          <Wallet size={15} />
          <span>Funds</span>
        </button>
      </nav>

      {/* User profile and back to website */}
      <div className="terminal-user-box">
        <span className="terminal-client-id tabular-nums">{clientId}</span>
        <button
          type="button"
          className="terminal-exit-btn"
          onClick={onExitTerminal}
          title="Exit Trading Terminal and return to landing page"
        >
          <LogOut size={14} />
          <span>Back to Home</span>
        </button>
      </div>
    </header>
  );
};
