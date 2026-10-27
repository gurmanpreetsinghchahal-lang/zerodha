import React from 'react';
import { ChevronRight } from 'lucide-react';

export interface ProductItem {
  id: string;
  category: string;
  title: string;
  productName: string;
  description: string;
  badge?: string;
  icon: React.ReactNode;
  actionText: string;
  actionHref: string;
  platformMeta: string;
}

interface ProductCardProps {
  product: ProductItem;
  onSelectProduct?: (product: ProductItem) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onSelectProduct }) => {
  return (
    <div 
      className="product-card"
      onClick={() => onSelectProduct && onSelectProduct(product)}
      role="article"
    >
      {product.badge && <span className="product-card-badge">{product.badge}</span>}
      
      <div className="product-card-icon-box" aria-hidden="true">
        {product.icon}
      </div>

      <div className="product-card-category">{product.category}</div>
      <h3 className="product-card-title">{product.title}</h3>
      <p className="product-card-desc">{product.description}</p>

      <div className="product-card-footer">
        <a 
          href={product.actionHref} 
          className="product-card-action"
          onClick={(e) => {
            if (product.actionHref.startsWith('#')) {
              e.preventDefault();
              const el = document.querySelector(product.actionHref);
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }
          }}
        >
          <span>{product.actionText}</span>
          <ChevronRight size={15} />
        </a>
        <span className="product-card-meta">{product.platformMeta}</span>
      </div>
    </div>
  );
};
