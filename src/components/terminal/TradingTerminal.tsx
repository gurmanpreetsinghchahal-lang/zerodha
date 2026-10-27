import React, { useState, useEffect } from 'react';
import { TerminalHeader, TerminalTab } from './TerminalHeader';
import { Watchlist, WatchlistStock } from './Watchlist';
import { DashboardView } from './DashboardView';
import { HoldingsView, HoldingItem } from './HoldingsView';
import { OrdersView, OrderRecord } from './OrdersView';
import { PositionsView, PositionItem } from './PositionsView';
import { FundsView } from './FundsView';
import { OrderPadModal, OrderPayload } from './OrderPadModal';

interface TradingTerminalProps {
  userName: string;
  clientId: string;
  onExitTerminal: () => void;
  onShowToast: (msg: string) => void;
}

const INITIAL_WATCHLIST: WatchlistStock[] = [
  { symbol: 'RELIANCE', exchange: 'NSE', price: 2984.40, change: 32.50, changePercent: 1.10 },
  { symbol: 'TCS', exchange: 'NSE', price: 3892.15, change: -14.20, changePercent: -0.36 },
  { symbol: 'HDFCBANK', exchange: 'NSE', price: 1542.80, change: 18.90, changePercent: 1.24 },
  { symbol: 'INFY', exchange: 'NSE', price: 1512.30, change: 6.40, changePercent: 0.42 },
  { symbol: 'ICICIBANK', exchange: 'NSE', price: 1120.50, change: 14.10, changePercent: 1.27 },
  { symbol: 'TATASTEEL', exchange: 'NSE', price: 164.80, change: 3.40, changePercent: 2.11 },
  { symbol: 'ITC', exchange: 'NSE', price: 432.20, change: -1.80, changePercent: -0.41 },
  { symbol: 'SBIN', exchange: 'NSE', price: 782.90, change: 8.50, changePercent: 1.10 },
  { symbol: 'NIFTY 50', exchange: 'NSE', price: 22485.60, change: 112.45, changePercent: 0.50 },
  { symbol: 'SENSEX', exchange: 'BSE', price: 74120.80, change: 345.10, changePercent: 0.47 }
];

const INITIAL_HOLDINGS: HoldingItem[] = [
  { symbol: 'RELIANCE', qty: 25, avgCost: 2840.00, ltp: 2984.40 },
  { symbol: 'INFY', qty: 50, avgCost: 1420.50, ltp: 1512.30 },
  { symbol: 'TATASTEEL', qty: 200, avgCost: 148.20, ltp: 164.80 },
  { symbol: 'HDFCBANK', qty: 40, avgCost: 1490.00, ltp: 1542.80 }
];

const INITIAL_POSITIONS: PositionItem[] = [
  { id: 'pos-1', product: 'MIS', symbol: 'ICICIBANK', qty: 50, avgPrice: 1112.00, ltp: 1120.50 },
  { id: 'pos-2', product: 'MIS', symbol: 'SBIN', qty: 100, avgPrice: 786.50, ltp: 782.90 }
];

const INITIAL_ORDERS: OrderRecord[] = [
  { id: 'ord-101', time: '09:18:24', symbol: 'RELIANCE', type: 'BUY', product: 'CNC', qty: 25, price: 2840.00, status: 'COMPLETE' },
  { id: 'ord-102', time: '09:42:10', symbol: 'ICICIBANK', type: 'BUY', product: 'MIS', qty: 50, price: 1112.00, status: 'COMPLETE' },
  { id: 'ord-103', time: '10:05:44', symbol: 'TCS', type: 'BUY', product: 'CNC', qty: 10, price: 3850.00, status: 'PENDING' }
];

export const TradingTerminal: React.FC<TradingTerminalProps> = ({
  userName,
  clientId,
  onExitTerminal,
  onShowToast
}) => {
  const [stocks, setStocks] = useState<WatchlistStock[]>(INITIAL_WATCHLIST);
  const [selectedSymbol, setSelectedSymbol] = useState<string>('RELIANCE');
  const [activeTab, setActiveTab] = useState<TerminalTab>('dashboard');

  const [holdings, setHoldings] = useState<HoldingItem[]>(INITIAL_HOLDINGS);
  const [positions, setPositions] = useState<PositionItem[]>(INITIAL_POSITIONS);
  const [orders, setOrders] = useState<OrderRecord[]>(INITIAL_ORDERS);

  const [equityMargin, setEquityMargin] = useState<number>(145280.50);
  const [usedMargin, setUsedMargin] = useState<number>(24500.00);

  // Order pad state
  const [orderPadOpen, setOrderPadOpen] = useState(false);
  const [orderPadStock, setOrderPadStock] = useState<WatchlistStock | null>(null);
  const [orderPadType, setOrderPadType] = useState<'BUY' | 'SELL'>('BUY');

  // Real-time market tick simulation
  useEffect(() => {
    const timer = setInterval(() => {
      setStocks(prev => prev.map(s => {
        const delta = (Math.random() - 0.49) * (s.price * 0.0015);
        const newPrice = Number((s.price + delta).toFixed(2));
        const newChange = Number((s.change + delta).toFixed(2));
        const newPct = Number(((newChange / (newPrice - newChange)) * 100).toFixed(2));
        return {
          ...s,
          price: newPrice,
          change: newChange,
          changePercent: newPct
        };
      }));

      // Update holdings LTP in sync
      setHoldings(prev => prev.map(h => {
        const found = stocks.find(s => s.symbol === h.symbol);
        return found ? { ...h, ltp: found.price } : h;
      }));

      // Update positions LTP in sync
      setPositions(prev => prev.map(p => {
        const found = stocks.find(s => s.symbol === p.symbol);
        return found ? { ...p, ltp: found.price } : p;
      }));
    }, 3000);

    return () => clearInterval(timer);
  }, [stocks]);

  const selectedStock = stocks.find(s => s.symbol === selectedSymbol) || stocks[0];

  const handleOpenOrderPad = (stock: WatchlistStock, type: 'BUY' | 'SELL') => {
    setOrderPadStock(stock);
    setOrderPadType(type);
    setOrderPadOpen(true);
  };

  const handleSubmitOrder = (payload: OrderPayload) => {
    const now = new Date();
    const timeStr = now.toTimeString().split(' ')[0];
    const newOrderId = 'ord-' + Math.floor(100 + Math.random() * 900);

    const newRecord: OrderRecord = {
      id: newOrderId,
      time: timeStr,
      symbol: payload.symbol,
      type: payload.type,
      product: payload.product,
      qty: payload.qty,
      price: payload.price,
      status: 'COMPLETE'
    };

    setOrders(prev => [newRecord, ...prev]);

    const orderCost = payload.qty * payload.price;

    if (payload.type === 'BUY') {
      if (payload.product === 'CNC') {
        // Add to holdings
        setHoldings(prev => {
          const existing = prev.find(h => h.symbol === payload.symbol);
          if (existing) {
            const newTotalQty = existing.qty + payload.qty;
            const newAvg = (existing.qty * existing.avgCost + payload.qty * payload.price) / newTotalQty;
            return prev.map(h => h.symbol === payload.symbol ? { ...h, qty: newTotalQty, avgCost: newAvg } : h);
          } else {
            return [...prev, { symbol: payload.symbol, qty: payload.qty, avgCost: payload.price, ltp: payload.price }];
          }
        });
        setEquityMargin(prev => Math.max(0, prev - orderCost));
      } else {
        // Intraday MIS position
        const marginUsed = orderCost * 0.2;
        setPositions(prev => [
          ...prev,
          { id: 'pos-' + Date.now(), product: 'MIS', symbol: payload.symbol, qty: payload.qty, avgPrice: payload.price, ltp: payload.price }
        ]);
        setUsedMargin(prev => prev + marginUsed);
        setEquityMargin(prev => Math.max(0, prev - marginUsed));
      }
      onShowToast(`Order Executed: BOUGHT ${payload.qty} ${payload.symbol} @ ₹${payload.price.toFixed(2)}`);
    } else {
      // SELL order
      if (payload.product === 'CNC') {
        setHoldings(prev => {
          return prev.map(h => {
            if (h.symbol === payload.symbol) {
              const remaining = Math.max(0, h.qty - payload.qty);
              return { ...h, qty: remaining };
            }
            return h;
          }).filter(h => h.qty > 0);
        });
        setEquityMargin(prev => prev + orderCost);
      }
      onShowToast(`Order Executed: SOLD ${payload.qty} ${payload.symbol} @ ₹${payload.price.toFixed(2)}`);
    }
  };

  const handleCancelOrder = (id: string) => {
    setOrders(prev => prev.map(o => o.id === id ? { ...o, status: 'CANCELLED' } : o));
    onShowToast(`Order ${id} cancelled successfully.`);
  };

  const handleSquareOff = (posId: string) => {
    const pos = positions.find(p => p.id === posId);
    if (pos) {
      const pnl = (pos.ltp - pos.avgPrice) * pos.qty;
      setPositions(prev => prev.filter(p => p.id !== posId));
      setEquityMargin(prev => prev + pnl);
      setUsedMargin(prev => Math.max(0, prev - (pos.avgPrice * pos.qty * 0.2)));
      onShowToast(`Position Squared Off: ${pos.symbol} (P&L: ₹${pnl.toFixed(2)})`);
    }
  };

  const handleAddFunds = (amount: number) => {
    setEquityMargin(prev => prev + amount);
    onShowToast(`₹${amount.toLocaleString('en-IN')} added to Equity Margin successfully.`);
  };

  const totalInvestment = holdings.reduce((acc, h) => acc + h.qty * h.avgCost, 0);
  const currentValue = holdings.reduce((acc, h) => acc + h.qty * h.ltp, 0);

  return (
    <div className="terminal-container">
      {/* Kite Terminal Header */}
      <TerminalHeader
        activeTab={activeTab}
        onSelectTab={setActiveTab}
        clientId={clientId}
        userName={userName}
        ordersCount={orders.filter(o => o.status === 'COMPLETE' || o.status === 'PENDING').length}
        onExitTerminal={onExitTerminal}
      />

      {/* Main Workspace Split (Left Watchlist, Right Content Pane) */}
      <div className="terminal-workspace">
        <Watchlist
          stocks={stocks}
          selectedSymbol={selectedSymbol}
          onSelectStock={setSelectedSymbol}
          onOpenOrderPad={handleOpenOrderPad}
        />

        <main className="terminal-content-pane">
          {activeTab === 'dashboard' && (
            <DashboardView
              userName={userName}
              equityMargin={equityMargin}
              usedMargin={usedMargin}
              totalInvestment={totalInvestment}
              currentValue={currentValue}
              selectedStock={selectedStock}
              onOpenOrderPad={handleOpenOrderPad}
            />
          )}

          {activeTab === 'holdings' && (
            <HoldingsView
              holdings={holdings}
              onOpenOrderPad={handleOpenOrderPad}
            />
          )}

          {activeTab === 'orders' && (
            <OrdersView
              orders={orders}
              onCancelOrder={handleCancelOrder}
            />
          )}

          {activeTab === 'positions' && (
            <PositionsView
              positions={positions}
              onSquareOff={handleSquareOff}
            />
          )}

          {activeTab === 'funds' && (
            <FundsView
              equityMargin={equityMargin}
              usedMargin={usedMargin}
              onAddFunds={handleAddFunds}
            />
          )}
        </main>
      </div>

      {/* Order Pad Modal */}
      <OrderPadModal
        isOpen={orderPadOpen}
        stock={orderPadStock}
        initialType={orderPadType}
        onClose={() => setOrderPadOpen(false)}
        onSubmitOrder={handleSubmitOrder}
      />
    </div>
  );
};
