import React, { useState, useEffect } from 'react';
import { Menu, ChevronDown } from 'lucide-react';
import { Button } from './Button';
import { MobileMenu } from './MobileMenu';

interface NavbarProps {
  onOpenAuth: (mode: 'signup' | 'login') => void;
  onEnterTerminal: () => void;
  isLoggedIn: boolean;
  userName: string;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenAuth,
  onEnterTerminal,
  isLoggedIn,
  userName
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, hash: string) => {
    e.preventDefault();
    const element = document.querySelector(hash);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <header className={`navbar-header ${isScrolled ? 'scrolled' : ''}`}>
        <div className="container navbar-inner">
          {/* Zone 1: Brand Wordmark */}
          <a href="#" className="navbar-brand" aria-label="Zenith Broking Home">
            <svg className="navbar-brand-logo-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <polygon points="12 2 22 8.5 22 15.5 12 22 2 15.5 2 8.5 12 2" />
              <line x1="12" y1="22" x2="12" y2="15.5" />
              <polyline points="22 8.5 12 15.5 2 8.5" />
            </svg>
            <span className="navbar-brand-text">ZENITH</span>
          </a>

          {/* Zone 2: Navigation Links */}
          <nav className="navbar-nav" aria-label="Main Navigation">
            <a 
              href="#products" 
              className="navbar-link"
              onClick={(e) => handleNavClick(e, '#products')}
            >
              Products
            </a>
            <a 
              href="#pricing" 
              className="navbar-link"
              onClick={(e) => handleNavClick(e, '#pricing')}
            >
              Pricing
            </a>
            <a 
              href="#stats" 
              className="navbar-link"
              onClick={(e) => handleNavClick(e, '#stats')}
            >
              About
            </a>
            <a 
              href="#education" 
              className="navbar-link"
              onClick={(e) => handleNavClick(e, '#education')}
            >
              Education
            </a>
            <a 
              href="#faq" 
              className="navbar-link"
              onClick={(e) => handleNavClick(e, '#faq')}
            >
              Support
            </a>
          </nav>

          {/* Zone 3: Actions */}
          <div className="navbar-actions">
            {isLoggedIn ? (
              <Button 
                variant="primary" 
                size="sm"
                onClick={onEnterTerminal}
              >
                Enter Terminal ({userName.split(' ')[0]})
              </Button>
            ) : (
              <>
                <button 
                  type="button"
                  className="btn btn-text btn-login"
                  onClick={() => onOpenAuth('login')}
                >
                  Log in
                </button>
                <Button 
                  variant="primary" 
                  size="sm"
                  onClick={() => onOpenAuth('signup')}
                >
                  Sign up
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={onEnterTerminal}
                  className="btn-login"
                >
                  Terminal
                </Button>
              </>
            )}
            <button 
              type="button" 
              className="navbar-menu-toggle"
              onClick={() => setMobileMenuOpen(true)}
              aria-label="Open mobile navigation menu"
              aria-expanded={mobileMenuOpen}
            >
              <Menu size={22} />
            </button>
          </div>
        </div>
      </header>

      <MobileMenu 
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        onOpenAuth={onOpenAuth}
        onEnterTerminal={onEnterTerminal}
        isLoggedIn={isLoggedIn}
      />
    </>
  );
};
