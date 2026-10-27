import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';

export interface OrderPayload {
  symbol: string;
  type: 'BUY' | 'SELL';
  product: 'CNC' | 'MIS';
  orderType: 'MARKET' | 'LIMIT';
  qty: number;
  price: number;
}

interface OrderPadModalProps {
  isOpen: boolean;
  stock: {
    symbol: string;
    price: number;
  } | null;
  initialType?: 'BUY' | 'SELL';
  onClose: () => void;
  onSubmitOrder: (order: OrderPayload) => void;
}

export const OrderPadModal: React.FC<OrderPadModalProps> = ({
  isOpen,
  stock,
  initialType = 'BUY',
  onClose,
  onSubmitOrder
}) => {
  const [type, setType] = useState<'BUY' | 'SELL'>(initialType);
  const [product, setProduct] = useState<'CNC' | 'MIS'>('CNC');
  const [orderType, setOrderType] = useState<'MARKET' | 'LIMIT'>('MARKET');
  const [qty, setQty] = useState<number>(10);
  const [price, setPrice] = useState<number>(stock?.price || 100);

  useEffect(() => {
    if (stock) {
      setPrice(stock.price);
    }
    setType(initialType);
  }, [stock, initialType, isOpen]);

  if (!isOpen || !stock) return null;

  const totalValue = qty * price;
  const marginRequired = product === 'MIS' ? totalValue * 0.2 : totalValue;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmitOrder({
      symbol: stock.symbol,
      type,
      product,
      orderType,
      qty,
      price
    });
    onClose();
  };

  return (
    <div className="orderpad-backdrop" onClick={onClose} role="dialog" aria-modal="true">
      <div className="orderpad-window" onClick={(e) => e.stopPropagation()}>
        <div className={`orderpad-header ${type.toLowerCase()}`}>
          <div className="orderpad-title-box">
            <span className="orderpad-sym">{type} {stock.symbol}</span>
            <span className="orderpad-price-tag tabular-nums">x {qty} Qty @ ₹{price.toFixed(2)}</span>
          </div>
          <button type="button" className="orderpad-close" onClick={onClose} aria-label="Close order pad">
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="orderpad-body">
            <div className="orderpad-radio-group">
              <label className="orderpad-radio-label">
                <input
                  type="radio"
                  name="product"
                  checked={product === 'CNC'}
                  onChange={() => setProduct('CNC')}
                />
                <span>CNC (Longterm &middot; ₹0 Brok)</span>
              </label>
              <label className="orderpad-radio-label">
                <input
                  type="radio"
                  name="product"
                  checked={product === 'MIS'}
                  onChange={() => setProduct('MIS')}
                />
                <span>MIS (Intraday &middot; 5x Lev)</span>
              </label>
            </div>

            <div className="orderpad-inputs-grid">
              <div className="orderpad-field">
                <label htmlFor="order-qty">Qty</label>
                <input
                  id="order-qty"
                  type="number"
                  min="1"
                  step="1"
                  className="tabular-nums"
                  value={qty}
                  onChange={(e) => setQty(Math.max(1, parseInt(e.target.value) || 1))}
                  required
                />
              </div>

              <div className="orderpad-field">
                <label htmlFor="order-price">Price (₹)</label>
                <input
                  id="order-price"
                  type="number"
                  min="0.05"
                  step="0.05"
                  className="tabular-nums"
                  value={price}
                  onChange={(e) => setPrice(Math.max(0.05, parseFloat(e.target.value) || 0.05))}
                  disabled={orderType === 'MARKET'}
                  required
                />
              </div>
            </div>

            <div className="orderpad-radio-group" style={{ fontSize: '12px' }}>
              <label className="orderpad-radio-label">
                <input
                  type="radio"
                  name="orderType"
                  checked={orderType === 'MARKET'}
                  onChange={() => {
                    setOrderType('MARKET');
                    setPrice(stock.price);
                  }}
                />
                <span>Market</span>
              </label>
              <label className="orderpad-radio-label">
                <input
                  type="radio"
                  name="orderType"
                  checked={orderType === 'LIMIT'}
                  onChange={() => setOrderType('LIMIT')}
                />
                <span>Limit</span>
              </label>
            </div>
          </div>

          <div className="orderpad-footer">
            <div className="orderpad-margin-req">
              Margin: <span className="tabular-nums">₹{marginRequired.toLocaleString('en-IN', { maximumFractionDigits: 2 })}</span>
            </div>
            <div className="orderpad-action-btns">
              <button
                type="submit"
                className={`btn btn-sm ${type === 'BUY' ? 'btn-clay-buy' : 'btn-clay-sell'}`}
                style={{
                  padding: '7px 18px',
                  fontWeight: 700,
                  fontSize: '13px'
                }}
              >
                {type}
              </button>
              <button type="button" className="btn btn-sm btn-secondary" onClick={onClose}>
                Cancel
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
