import React, { useState } from 'react';
import { Search } from 'lucide-react';

export interface WatchlistStock {
  symbol: string;
  exchange: 'NSE' | 'BSE';
  price: number;
  change: number;
  changePercent: number;
}

interface WatchlistProps {
  stocks: WatchlistStock[];
  selectedSymbol: string;
  onSelectStock: (symbol: string) => void;
  onOpenOrderPad: (stock: WatchlistStock, type: 'BUY' | 'SELL') => void;
}

export const Watchlist: React.FC<WatchlistProps> = ({
  stocks,
  selectedSymbol,
  onSelectStock,
  onOpenOrderPad
}) => {
  const [activeTab, setActiveTab] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredStocks = stocks.filter(s =>
    s.symbol.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <aside className="watchlist-pane" aria-label="Stock Market Watchlist">
      <div className="watchlist-search-row">
        <Search size={14} className="watchlist-search-icon" />
        <input
          type="text"
          className="watchlist-search-input"
          placeholder="Search eg: infy, bse, nifty fut, sensex"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <span className="watchlist-item-count tabular-nums">{filteredStocks.length} / 50</span>
      </div>

      <ul className="watchlist-list">
        {filteredStocks.map((stock) => {
          const isGain = stock.change >= 0;
          const isSelected = stock.symbol === selectedSymbol;

          return (
            <li
              key={stock.symbol}
              className={`watchlist-row ${isSelected ? 'selected' : ''}`}
              onClick={() => onSelectStock(stock.symbol)}
            >
              <div className="watchlist-symbol-col">
                <span className="watchlist-sym">{stock.symbol}</span>
                <span className="watchlist-exch">{stock.exchange}</span>
              </div>

              <div className="watchlist-price-col">
                <span className="watchlist-ltp tabular-nums">
                  ₹{stock.price.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </span>
                <span className={`watchlist-change tabular-nums ${isGain ? 'gain' : 'loss'}`}>
                  {isGain ? '+' : ''}{stock.changePercent.toFixed(2)}%
                </span>
              </div>

              <div className="watchlist-hover-actions" onClick={(e) => e.stopPropagation()}>
                <button
                  type="button"
                  className="watch-act-btn buy"
                  onClick={() => onOpenOrderPad(stock, 'BUY')}
                  title="Buy"
                >
                  B
                </button>
                <button
                  type="button"
                  className="watch-act-btn sell"
                  onClick={() => onOpenOrderPad(stock, 'SELL')}
                  title="Sell"
                >
                  S
                </button>
                <button
                  type="button"
                  className="watch-act-btn chart"
                  onClick={() => onSelectStock(stock.symbol)}
                  title="View Chart"
                >
                  Chart
                </button>
              </div>
            </li>
          );
        })}
      </ul>

      <div className="watchlist-tabs-footer">
        {[1, 2, 3, 4, 5].map((tabNum) => (
          <button
            key={tabNum}
            type="button"
            className={`watchlist-tab-item ${activeTab === tabNum ? 'active' : ''}`}
            onClick={() => setActiveTab(tabNum)}
          >
            {tabNum}
          </button>
        ))}
      </div>
    </aside>
  );
};
