import React from 'react';
import { Twitter, Linkedin, Youtube, Instagram, Github, ShieldAlert } from 'lucide-react';

interface FooterProps {
  onOpenAuth: (mode: 'signup' | 'login') => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenAuth }) => {
  const handleScrollTo = (e: React.MouseEvent<HTMLAnchorElement>, hash: string) => {
    e.preventDefault();
    const el = document.querySelector(hash);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="footer-main" id="support">
      <div className="container">
        {/* Top Links Grid */}
        <div className="footer-top-grid">
          {/* Brand Col */}
          <div className="footer-brand-col">
            <div className="footer-brand-text">ZENITH</div>
            <p className="footer-brand-desc">
              Pioneering zero-brokerage stock investing and transparent technology in India. 
              Member of NSE, BSE, MCX. CDSL Depository Participant.
            </p>
            <div className="footer-copyright">
              &copy; 2010 - 2026 Zenith Broking Ltd. All rights reserved.
            </div>
          </div>

          {/* Company Col */}
          <div className="footer-links-col">
            <h4 className="footer-col-title">Company</h4>
            <ul className="footer-links-list">
              <li><a href="#stats" className="footer-link" onClick={(e) => handleScrollTo(e, '#stats')}>About Us</a></li>
              <li><a href="#products" className="footer-link" onClick={(e) => handleScrollTo(e, '#products')}>Products Suite</a></li>
              <li><a href="#pricing" className="footer-link" onClick={(e) => handleScrollTo(e, '#pricing')}>Pricing &amp; Fees</a></li>
              <li><a href="#stats" className="footer-link" onClick={(e) => handleScrollTo(e, '#stats')}>Philosophy</a></li>
              <li><a href="#stats" className="footer-link" onClick={(e) => handleScrollTo(e, '#stats')}>Press &amp; Media</a></li>
              <li><a href="#stats" className="footer-link" onClick={(e) => handleScrollTo(e, '#stats')}>Careers (Demo)</a></li>
            </ul>
          </div>

          {/* Products Col */}
          <div className="footer-links-col">
            <h4 className="footer-col-title">Platforms</h4>
            <ul className="footer-links-list">
              <li><a href="#hero" className="footer-link" onClick={(e) => handleScrollTo(e, '#hero')}>Zenith Kite (Web)</a></li>
              <li><a href="#hero" className="footer-link" onClick={(e) => handleScrollTo(e, '#hero')}>Kite Mobile (iOS &amp; Android)</a></li>
              <li><a href="#products" className="footer-link" onClick={(e) => handleScrollTo(e, '#products')}>Zenith Console</a></li>
              <li><a href="#products" className="footer-link" onClick={(e) => handleScrollTo(e, '#products')}>Zenith Coin (MF)</a></li>
              <li><a href="#products" className="footer-link" onClick={(e) => handleScrollTo(e, '#products')}>Connect Trading API</a></li>
              <li><a href="#calculator" className="footer-link" onClick={(e) => handleScrollTo(e, '#calculator')}>Brokerage Calculator</a></li>
            </ul>
          </div>

          {/* Support Col */}
          <div className="footer-links-col">
            <h4 className="footer-col-title">Support</h4>
            <ul className="footer-links-list">
              <li><a href="#faq" className="footer-link" onClick={(e) => handleScrollTo(e, '#faq')}>Contact &amp; Help Desk</a></li>
              <li><a href="#faq" className="footer-link" onClick={(e) => handleScrollTo(e, '#faq')}>Support Portal</a></li>
              <li><a href="#faq" className="footer-link" onClick={(e) => handleScrollTo(e, '#faq')}>Z-Connect Blog</a></li>
              <li><a href="#pricing" className="footer-link" onClick={(e) => handleScrollTo(e, '#pricing')}>List of Charges</a></li>
              <li><a href="#education" className="footer-link" onClick={(e) => handleScrollTo(e, '#education')}>Market Timings &amp; Holidays</a></li>
              <li><a href="#faq" className="footer-link" onClick={(e) => handleScrollTo(e, '#faq')}>File a Complaint</a></li>
            </ul>
          </div>

          {/* Account Col */}
          <div className="footer-links-col">
            <h4 className="footer-col-title">Account</h4>
            <ul className="footer-links-list">
              <li><button type="button" className="footer-link" style={{ background: 'none', border: 'none', padding: 0, textAlign: 'left', cursor: 'pointer' }} onClick={() => onOpenAuth('signup')}>Open Demat Account</button></li>
              <li><button type="button" className="footer-link" style={{ background: 'none', border: 'none', padding: 0, textAlign: 'left', cursor: 'pointer' }} onClick={() => onOpenAuth('login')}>Fund Transfer (UPI/NetBanking)</button></li>
              <li><button type="button" className="footer-link" style={{ background: 'none', border: 'none', padding: 0, textAlign: 'left', cursor: 'pointer' }} onClick={() => onOpenAuth('login')}>60-Day Challenge</button></li>
              <li><a href="#education" className="footer-link" onClick={(e) => handleScrollTo(e, '#education')}>Varsity Mobile App</a></li>
            </ul>
          </div>
        </div>

        {/* Regulatory & Risk Disclosures (Classic Indian Brokerage Mandatory Compliance) */}
        <div className="footer-regulatory-box">
          <p>
            <strong>Zenith Broking Ltd.:</strong> Member of NSE &amp; BSE &ndash; SEBI Registration no.: INZ000031633. 
            CDSL Depository Participant: IN-DP-431-2019. Corporate Office: #153/154, 4th Cross, Dollars Colony, 4th Phase, J.P. Nagar, Bengaluru &ndash; 560078, Karnataka, India. 
            For any complaints pertaining to securities broking, please write to complaints@zenithbroking.demo.
          </p>

          <p>
            Procedure to file a complaint on SEBI SCORES: Register on SCORES portal. Mandatory details for filing complaints on SCORES: Name, PAN, Address, Mobile Number, E-mail ID. 
            Benefits: Effective Communication, Speedy redressal of grievances. Smart Online Dispute Resolution (ODR) portal details accessible via SMARTODR portal.
          </p>

          <div className="footer-regulatory-disclaimer">
            <strong>Demonstration Notice:</strong> This website is an educational, interactive frontend portfolio interface inspired by the minimalist design philosophy of Zerodha. 
            No real stock trading, financial advisory, actual money transfer, or SEBI regulated transaction takes place on this platform. 
            Investments in securities market are subject to market risks; read all related documents carefully before investing.
          </div>
        </div>

        {/* Bottom Bar: Legal Links & Socials */}
        <div className="footer-bottom-bar">
          <ul className="footer-legal-links">
            <li><a href="#faq" className="footer-legal-link">NSE</a></li>
            <li><a href="#faq" className="footer-legal-link">BSE</a></li>
            <li><a href="#faq" className="footer-legal-link">MCX</a></li>
            <li><a href="#faq" className="footer-legal-link">Terms &amp; Conditions</a></li>
            <li><a href="#faq" className="footer-legal-link">Privacy Policy</a></li>
            <li><a href="#faq" className="footer-legal-link">Disclosure</a></li>
            <li><a href="#faq" className="footer-legal-link">Investor Charter</a></li>
          </ul>

          <div className="footer-social-row">
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="footer-social-icon" aria-label="Twitter">
              <Twitter size={16} />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="footer-social-icon" aria-label="LinkedIn">
              <Linkedin size={16} />
            </a>
            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="footer-social-icon" aria-label="YouTube">
              <Youtube size={16} />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="footer-social-icon" aria-label="Instagram">
              <Instagram size={16} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
