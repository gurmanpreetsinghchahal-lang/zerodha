import React, { useState, useEffect } from 'react';
import { X, CheckCircle, ShieldCheck } from 'lucide-react';
import { Button } from './Button';

interface AuthModalProps {
  isOpen: boolean;
  initialMode?: 'signup' | 'login';
  onClose: () => void;
  onSuccess: (name: string) => void;
  onEnterTerminal: (name: string, clientId: string) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  initialMode = 'signup',
  onClose,
  onSuccess,
  onEnterTerminal
}) => {
  const [mode, setMode] = useState<'signup' | 'login'>(initialMode);
  const [name, setName] = useState('');
  const [mobile, setMobile] = useState('');
  const [email, setEmail] = useState('');
  const [pan, setPan] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [generatedId, setGeneratedId] = useState('');

  useEffect(() => {
    setMode(initialMode);
    setIsSubmitted(false);
    setErrors({});
  }, [initialMode, isOpen]);

  if (!isOpen) return null;

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (mode === 'signup' && !name.trim()) {
      newErrors.name = 'Please enter your full name';
    }

    if (!mobile.trim()) {
      newErrors.mobile = 'Mobile number is required';
    } else if (!/^[6-9]\d{9}$/.test(mobile.replace(/\s+/g, ''))) {
      newErrors.mobile = 'Enter a valid 10-digit Indian mobile number';
    }

    if (mode === 'signup') {
      if (!email.trim()) {
        newErrors.email = 'Email address is required';
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        newErrors.email = 'Enter a valid email address';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      const mockClientId = 'ZN' + Math.floor(100000 + Math.random() * 900000);
      setGeneratedId(mockClientId);
      setIsSubmitted(true);
      onSuccess(mode === 'signup' ? name || 'Investor' : 'Trader');
    }
  };

  return (
    <div 
      className="modal-backdrop" 
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div className="modal-card" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div className="modal-title">
            {mode === 'signup' ? 'Open a Free Demat Account' : 'Login to Kite'}
          </div>
          <button 
            type="button" 
            className="modal-close-btn" 
            onClick={onClose}
            aria-label="Close dialog"
          >
            <X size={18} />
          </button>
        </div>

        {!isSubmitted && (
          <div className="modal-tabs">
            <button
              type="button"
              className={`modal-tab-btn ${mode === 'signup' ? 'active' : ''}`}
              onClick={() => { setMode('signup'); setErrors({}); }}
            >
              Sign up
            </button>
            <button
              type="button"
              className={`modal-tab-btn ${mode === 'login' ? 'active' : ''}`}
              onClick={() => { setMode('login'); setErrors({}); }}
            >
              Log in
            </button>
          </div>
        )}

        <div className="modal-body">
          {isSubmitted ? (
            <div className="modal-success-state">
              <div className="modal-success-icon">
                <CheckCircle size={32} />
              </div>
              <h3 className="modal-success-title">
                {mode === 'signup' ? 'Demo Demat Account Ready!' : 'Welcome Back!'}
              </h3>
              <p className="modal-success-desc">
                Your demonstration credentials have been activated. You now have full access to simulated trading and zero-brokerage portfolio features.
              </p>

              <div className="modal-credentials-card">
                <div className="modal-credential-row">
                  <span style={{ color: 'var(--color-text-subtle)' }}>Demo Client ID:</span>
                  <span className="tabular-nums" style={{ fontWeight: 700 }}>{generatedId}</span>
                </div>
                <div className="modal-credential-row">
                  <span style={{ color: 'var(--color-text-subtle)' }}>Registered Mobile:</span>
                  <span className="tabular-nums">+91 {mobile}</span>
                </div>
                <div className="modal-credential-row">
                  <span style={{ color: 'var(--color-text-subtle)' }}>Brokerage Plan:</span>
                  <span style={{ color: 'var(--color-gain)', fontWeight: 600 }}>₹0 Equity Delivery / ₹20 F&amp;O</span>
                </div>
              </div>

              <Button 
                variant="primary" 
                fullWidth 
                onClick={() => {
                  onClose();
                  onEnterTerminal(name || 'Investor', generatedId);
                }}
              >
                Enter to the Trading Terminal
              </Button>
            </div>
          ) : (
            <form className="modal-form" onSubmit={handleSubmit} noValidate>
              {mode === 'signup' && (
                <div className="form-group">
                  <label className="form-label" htmlFor="user-name">Full Name (as per PAN)</label>
                  <input
                    id="user-name"
                    type="text"
                    className={`form-input ${errors.name ? 'error' : ''}`}
                    placeholder="e.g. Rahul Sharma"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                  {errors.name && <div className="form-error-msg">{errors.name}</div>}
                </div>
              )}

              <div className="form-group">
                <label className="form-label" htmlFor="user-mobile">Mobile Number (Linked with Aadhaar)</label>
                <input
                  id="user-mobile"
                  type="tel"
                  maxLength={10}
                  className={`form-input tabular-nums ${errors.mobile ? 'error' : ''}`}
                  placeholder="10-digit mobile number"
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value.replace(/\D/g, ''))}
                />
                {errors.mobile && <div className="form-error-msg">{errors.mobile}</div>}
              </div>

              {mode === 'signup' && (
                <div className="form-group">
                  <label className="form-label" htmlFor="user-email">Email Address</label>
                  <input
                    id="user-email"
                    type="email"
                    className={`form-input ${errors.email ? 'error' : ''}`}
                    placeholder="name@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  {errors.email && <div className="form-error-msg">{errors.email}</div>}
                </div>
              )}

              <Button variant="primary" size="md" fullWidth type="submit">
                {mode === 'signup' ? 'Continue with Free Demat' : 'Continue to Kite Login'}
              </Button>

              <div className="form-disclaimer">
                By continuing, you agree to the demonstration terms of service. This is a frontend simulation inspired by Indian stock brokerage onboarding. No real KYC or banking queries are triggered.
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
