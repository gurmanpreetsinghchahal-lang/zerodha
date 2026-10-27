import React, { useState } from 'react';
import { Navbar } from '../components/Navbar';
import { Hero } from '../components/Hero';
import { StatsSection } from '../components/StatsSection';
import { ProductsSection } from '../components/ProductsSection';
import { PricingSection } from '../components/PricingSection';
import { EducationSection } from '../components/EducationSection';
import { FaqSection } from '../components/FaqSection';
import { Footer } from '../components/Footer';
import { AuthModal } from '../components/AuthModal';
import { TradingTerminal } from '../components/terminal/TradingTerminal';

export const Home: React.FC = () => {
  const [view, setView] = useState<'landing' | 'terminal'>('landing');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState('Rahul Sharma');
  const [clientId, setClientId] = useState('ZN84920');

  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'signup' | 'login'>('signup');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const handleOpenAuth = (mode: 'signup' | 'login') => {
    setAuthMode(mode);
    setAuthModalOpen(true);
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(prev => (prev === msg ? null : prev));
    }, 4500);
  };

  const handleEnterTerminal = (name?: string, id?: string) => {
    if (name) setUserName(name);
    if (id) setClientId(id);
    setIsLoggedIn(true);
    setView('terminal');
    showToast(`Trading Terminal Active &middot; Welcome ${name || userName}`);
  };

  const handleExitTerminal = () => {
    setView('landing');
    showToast('Returned to Zenith Broking Homepage');
  };

  const handleExploreProducts = () => {
    const el = document.querySelector('#products');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  // If in Trading Terminal View
  if (view === 'terminal') {
    return (
      <>
        {/* Toast Notification */}
        {toastMessage && (
          <div 
            role="status" 
            aria-live="polite"
            style={{
              position: 'fixed',
              bottom: '24px',
              right: '24px',
              backgroundColor: '#222222',
              color: '#ffffff',
              padding: '12px 20px',
              borderRadius: '4px',
              fontSize: '13px',
              boxShadow: '0 8px 24px rgba(0,0,0,0.18)',
              zIndex: 3500,
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              maxWidth: '380px'
            }}
          >
            <span style={{ color: 'var(--color-primary)', fontWeight: 'bold' }}>&bull;</span>
            <span>{toastMessage}</span>
          </div>
        )}

        <TradingTerminal
          userName={userName}
          clientId={clientId}
          onExitTerminal={handleExitTerminal}
          onShowToast={showToast}
        />
      </>
    );
  }

  // Otherwise, render Landing & Marketing Website
  return (
    <div className="page-wrapper">
      {/* Toast Feedback Notification Banner */}
      {toastMessage && (
        <div 
          role="status" 
          aria-live="polite"
          style={{
            position: 'fixed',
            bottom: '24px',
            right: '24px',
            backgroundColor: '#222222',
            color: '#ffffff',
            padding: '12px 20px',
            borderRadius: '4px',
            fontSize: '13px',
            boxShadow: '0 8px 24px rgba(0,0,0,0.18)',
            zIndex: 3000,
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            maxWidth: '380px'
          }}
        >
          <span style={{ color: 'var(--color-primary)', fontWeight: 'bold' }}>&bull;</span>
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Main Navigation */}
      <Navbar 
        onOpenAuth={handleOpenAuth} 
        onEnterTerminal={() => handleEnterTerminal()}
        isLoggedIn={isLoggedIn}
        userName={userName}
      />

      {/* Hero Section */}
      <main>
        <Hero 
          onOpenAuth={handleOpenAuth} 
          onExploreProducts={handleExploreProducts}
          onShowToast={showToast}
        />

        {/* Trust & Statistics */}
        <StatsSection />

        {/* Products Suite */}
        <ProductsSection onOpenAuth={handleOpenAuth} />

        {/* Pricing & Interactive Brokerage Calculator */}
        <PricingSection onOpenAuth={handleOpenAuth} />

        {/* Education & Varsity */}
        <EducationSection />

        {/* FAQ Accordion & Support */}
        <FaqSection onOpenAuth={handleOpenAuth} />
      </main>

      {/* Footer */}
      <Footer onOpenAuth={handleOpenAuth} />

      {/* Auth / Demo Demat Onboarding Modal */}
      <AuthModal 
        isOpen={authModalOpen}
        initialMode={authMode}
        onClose={() => setAuthModalOpen(false)}
        onSuccess={(name) => {
          setUserName(name);
          setIsLoggedIn(true);
        }}
        onEnterTerminal={(name, id) => {
          handleEnterTerminal(name, id);
        }}
      />
    </div>
  );
};
