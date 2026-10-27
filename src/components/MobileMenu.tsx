import React, { useEffect } from 'react';
import { X, ChevronRight, TrendingUp, PieChart, ShieldCheck, BookOpen, Layers } from 'lucide-react';
import { Button } from './Button';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenAuth: (mode: 'signup' | 'login') => void;
  onEnterTerminal: () => void;
  isLoggedIn?: boolean;
}

export const MobileMenu: React.FC<MobileMenuProps> = ({
  isOpen,
  onClose,
  onOpenAuth,
  onEnterTerminal,
  isLoggedIn
}) => {
  // Prevent body scroll when drawer is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Handle ESC key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const handleLinkClick = (hash: string) => {
    onClose();
    const element = document.querySelector(hash);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <div 
        className={`mobile-menu-backdrop ${isOpen ? 'open' : ''}`}
        onClick={onClose}
        aria-hidden="true"
      />
      
      <div 
        className={`mobile-menu-drawer ${isOpen ? 'open' : ''}`}
        role="dialog"
        aria-modal="true"
        aria-label="Navigation Menu"
      >
        <div className="mobile-menu-header">
          <div className="navbar-brand">
            <svg className="navbar-brand-logo-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <polygon points="12 2 22 8.5 22 15.5 12 22 2 15.5 2 8.5 12 2" />
              <line x1="12" y1="22" x2="12" y2="15.5" />
              <polyline points="22 8.5 12 15.5 2 8.5" />
            </svg>
            <span className="navbar-brand-text">ZENITH</span>
          </div>

          <button 
            type="button" 
            className="mobile-menu-close" 
            onClick={onClose}
            aria-label="Close menu"
          >
            <X size={20} />
          </button>
        </div>

        <nav className="mobile-menu-nav">
          <a 
            href="#products" 
            className="mobile-nav-link"
            onClick={(e) => { e.preventDefault(); handleLinkClick('#products'); }}
          >
            <span>Products</span>
            <ChevronRight size={16} color="#9b9b9b" />
          </a>
          <a 
            href="#pricing" 
            className="mobile-nav-link"
            onClick={(e) => { e.preventDefault(); handleLinkClick('#pricing'); }}
          >
            <span>Pricing</span>
            <ChevronRight size={16} color="#9b9b9b" />
          </a>
          <a 
            href="#calculator" 
            className="mobile-nav-link"
            onClick={(e) => { e.preventDefault(); handleLinkClick('#calculator'); }}
          >
            <span>Brokerage Calculator</span>
            <ChevronRight size={16} color="#9b9b9b" />
          </a>
          <a 
            href="#stats" 
            className="mobile-nav-link"
            onClick={(e) => { e.preventDefault(); handleLinkClick('#stats'); }}
          >
            <span>About Zenith</span>
            <ChevronRight size={16} color="#9b9b9b" />
          </a>
          <a 
            href="#education" 
            className="mobile-nav-link"
            onClick={(e) => { e.preventDefault(); handleLinkClick('#education'); }}
          >
            <span>Varsity Education</span>
            <ChevronRight size={16} color="#9b9b9b" />
          </a>
          <a 
            href="#faq" 
            className="mobile-nav-link"
            onClick={(e) => { e.preventDefault(); handleLinkClick('#faq'); }}
          >
            <span>Support & FAQ</span>
            <ChevronRight size={16} color="#9b9b9b" />
          </a>
        </nav>

        <div className="mobile-menu-ecosystem-title">Ecosystem Products</div>
        <div className="mobile-menu-ecosystem-grid">
          <a 
            href="#products" 
            className="mobile-eco-card"
            onClick={(e) => { e.preventDefault(); handleLinkClick('#products'); }}
          >
            <span className="mobile-eco-name">Zenith Kite</span>
            <span className="mobile-eco-desc">Ultra-fast trading</span>
          </a>
          <a 
            href="#products" 
            className="mobile-eco-card"
            onClick={(e) => { e.preventDefault(); handleLinkClick('#products'); }}
          >
            <span className="mobile-eco-name">Zenith Console</span>
            <span className="mobile-eco-desc">P&L & Analytics</span>
          </a>
          <a 
            href="#products" 
            className="mobile-eco-card"
            onClick={(e) => { e.preventDefault(); handleLinkClick('#products'); }}
          >
            <span className="mobile-eco-name">Zenith Coin</span>
            <span className="mobile-eco-desc">0% Mutual funds</span>
          </a>
          <a 
            href="#products" 
            className="mobile-eco-card"
            onClick={(e) => { e.preventDefault(); handleLinkClick('#products'); }}
          >
            <span className="mobile-eco-name">Connect API</span>
            <span className="mobile-eco-desc">Algo trading</span>
          </a>
        </div>

        <div className="mobile-menu-cta">
          <Button 
            variant="primary" 
            fullWidth 
            onClick={() => {
              onClose();
              onEnterTerminal();
            }}
          >
            Enter Trading Terminal (Kite)
          </Button>
          {!isLoggedIn && (
            <>
              <Button 
                variant="outline" 
                fullWidth 
                onClick={() => {
                  onClose();
                  onOpenAuth('signup');
                }}
              >
                Sign up for free
              </Button>
              <Button 
                variant="secondary" 
                fullWidth 
                onClick={() => {
                  onClose();
                  onOpenAuth('login');
                }}
              >
                Login to Kite
              </Button>
            </>
          )}
        </div>
      </div>
    </>
  );
};
