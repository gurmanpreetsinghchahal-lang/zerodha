import React, { useState } from 'react';
import { ChevronDown, MessageSquare } from 'lucide-react';
import { Button } from './Button';

interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

const FAQS_DATA: FaqItem[] = [
  {
    id: 'zero-brokerage',
    question: 'How can Zenith offer ₹0 brokerage on equity delivery investments?',
    answer: 'We believe long-term investing should be completely barrier-free. By maintaining ultra-efficient automated technology, eliminating physical branch overheads, and generating revenue from active intraday and derivatives traders, we are able to subsidize equity delivery and direct mutual funds at absolute zero brokerage for long-term investors.'
  },
  {
    id: 'account-opening',
    question: 'What documents are required to open an online Demat and Trading account?',
    answer: 'Opening an account takes under 5 minutes and is 100% digital. You will need your PAN card, Aadhaar card (linked with your mobile number for instant OTP verification), and a cancelled cheque or bank statement showing your IFSC code and account details.'
  },
  {
    id: 'intraday-pricing',
    question: 'How does the flat ₹20 or 0.03% intraday brokerage fee work?',
    answer: 'For equity intraday trades, brokerage is charged at 0.03% of turnover or flat ₹20 per executed order, whichever is lower. For example, if 0.03% calculates to ₹6 on a small order, you only pay ₹6. If 0.03% calculates to ₹75 on a large order, your brokerage is capped at flat ₹20. All F&O options trades are charged at a flat ₹20 per executed order.'
  },
  {
    id: 'direct-mutual-funds',
    question: 'Are Direct Mutual Funds really 100% free of distributor commissions?',
    answer: 'Yes! Regular mutual funds bought through banks or traditional distributors deduct up to 1.5% every year as distributor commissions. With Zenith Coin, you purchase Direct Plans directly from the Asset Management Company (AMC). There are no distributor kickbacks or transaction fees, allowing your portfolio to compound faster.'
  },
  {
    id: 'safety-demat',
    question: 'Where are my shares stored and how safe are they?',
    answer: 'Your shares are held in electronic form in your personal Demat account with Central Depository Services Ltd (CDSL), a government-regulated depository. Even if your broker ceases operations, your shares remain completely safe with CDSL and can be accessed or transferred anytime using your CDSL Easiest credentials.'
  },
  {
    id: 'statutory-charges',
    question: 'What are regulatory and statutory charges like STT, GST, and SEBI fees?',
    answer: 'These are government and exchange levies mandated by law. They include Securities Transaction Tax (STT levied by the Ministry of Finance), Goods and Services Tax (GST at 18% on brokerage and transaction fees), exchange transaction charges (NSE/BSE), and SEBI turnover fees (₹10 per crore). Zenith collects and remits these fees without any markups.'
  }
];

interface FaqSectionProps {
  onOpenAuth: (mode: 'signup' | 'login') => void;
}

export const FaqSection: React.FC<FaqSectionProps> = ({ onOpenAuth }) => {
  const [openIds, setOpenIds] = useState<Record<string, boolean>>({
    'zero-brokerage': true,
    'account-opening': false
  });

  const toggleFaq = (id: string) => {
    setOpenIds(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  return (
    <section className="section faq-section" id="faq">
      <div className="container faq-container">
        <div className="section-header">
          <h2 className="section-title">Frequently Asked Questions</h2>
          <p className="section-subtitle">
            Everything you need to know about opening an account, trading fees, and security.
          </p>
        </div>

        <div className="faq-list" role="region" aria-label="FAQ Accordion">
          {FAQS_DATA.map((item) => {
            const isOpen = !!openIds[item.id];
            return (
              <div key={item.id} className={`faq-item ${isOpen ? 'open' : ''}`}>
                <button
                  type="button"
                  className="faq-question-btn"
                  onClick={() => toggleFaq(item.id)}
                  aria-expanded={isOpen}
                >
                  <span>{item.question}</span>
                  <ChevronDown size={18} className={`faq-icon ${isOpen ? 'open' : ''}`} />
                </button>
                {isOpen && (
                  <div className="faq-answer">
                    <p>{item.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Support Callout */}
        <div className="faq-support-card">
          <h4>Still have questions or need support?</h4>
          <p>
            Our dedicated support desk is available Monday through Friday from 9:00 AM to 6:00 PM IST.
          </p>
          <Button 
            variant="outline" 
            onClick={() => onOpenAuth('signup')}
            icon={<MessageSquare size={16} />}
          >
            Create a Support Ticket
          </Button>
        </div>
      </div>
    </section>
  );
};
