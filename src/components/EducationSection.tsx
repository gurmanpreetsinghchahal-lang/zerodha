import React, { useState } from 'react';
import { BookOpen, GraduationCap, ChevronRight, CheckCircle2, HelpCircle, ArrowRight } from 'lucide-react';
import { Button } from './Button';

interface EducationModule {
  id: string;
  index: string;
  title: string;
  description: string;
  chapters: number;
  readTime: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced' | 'All Levels';
}

const MODULES_DATA: EducationModule[] = [
  {
    id: 'intro',
    index: 'Module 01',
    title: 'Introduction to Stock Markets',
    description: 'Learn how stock exchanges function, the role of depositories (CDSL/NSDL), IPO mechanics, and order types from ground up.',
    chapters: 15,
    readTime: '3.5 hrs',
    difficulty: 'Beginner'
  },
  {
    id: 'technical',
    index: 'Module 02',
    title: 'Technical Analysis',
    description: 'Master Japanese candlestick patterns, support and resistance levels, moving averages, RSI, and volume indicators.',
    chapters: 22,
    readTime: '5.2 hrs',
    difficulty: 'Intermediate'
  },
  {
    id: 'fundamental',
    index: 'Module 03',
    title: 'Fundamental Analysis',
    description: 'Read balance sheets, P&L statements, and cash flows like a pro. Calculate P/E, ROCE, and discount cash flow intrinsic value.',
    chapters: 16,
    readTime: '4.0 hrs',
    difficulty: 'Intermediate'
  },
  {
    id: 'options',
    index: 'Module 04',
    title: 'Futures & Options Trading',
    description: 'Understand derivatives pricing, option Greeks (Delta, Theta, Gamma, Vega), open interest, and hedging strategies.',
    chapters: 18,
    readTime: '4.8 hrs',
    difficulty: 'Advanced'
  },
  {
    id: 'tax',
    index: 'Module 05',
    title: 'Personal Finance & Taxation',
    description: 'Clear breakdown of short-term (STCG) and long-term (LTCG) capital gains taxes, emergency funds, and asset allocation.',
    chapters: 12,
    readTime: '2.5 hrs',
    difficulty: 'All Levels'
  },
  {
    id: 'algo',
    index: 'Module 06',
    title: 'Algorithmic Trading & APIs',
    description: 'Introduction to quantitative strategies, backtesting rules, REST APIs, and automated Python trade execution.',
    chapters: 10,
    readTime: '3.0 hrs',
    difficulty: 'Advanced'
  }
];

export const EducationSection: React.FC = () => {
  const [selectedQuizAnswer, setSelectedQuizAnswer] = useState<number | null>(null);
  const [quizSubmitted, setQuizSubmitted] = useState<boolean>(false);
  const [activeModuleModal, setActiveModuleModal] = useState<EducationModule | null>(null);

  const correctAnswer = 1; // Option index 1 (T+1 / T+0 settlement)

  const handleSelectOption = (idx: number) => {
    setSelectedQuizAnswer(idx);
    setQuizSubmitted(true);
  };

  return (
    <section className="section education-section" id="education">
      <div className="container">
        {/* Banner */}
        <div className="education-banner">
          <div>
            <div className="education-badge">
              <GraduationCap size={16} />
              <span>Zenith Varsity &middot; Open Financial Education</span>
            </div>
            <h2 className="education-banner-title">
              Free, open, and unbiased stock market education for everyone.
            </h2>
            <p className="education-banner-desc">
              From market basics to advanced quantitative derivatives, Varsity is a comprehensive, 
              curated collection of illustrated modules with no paywalls or gated content.
            </p>
            <Button 
              variant="primary" 
              onClick={() => {
                const el = document.querySelector('#modules-grid');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              icon={<ArrowRight size={16} />}
            >
              Explore All Modules
            </Button>
          </div>

          <div className="education-vector-box" aria-hidden="true">
            {/* Minimalist Vector Illustration of Varsity Books & Charts */}
            <svg className="education-svg-art" viewBox="0 0 380 240" fill="none">
              <rect x="50" y="160" width="160" height="30" rx="3" fill="#ffffff" stroke="#e2e8f0" strokeWidth="1.5" />
              <rect x="65" y="125" width="150" height="30" rx="3" fill="#ffffff" stroke="#e2e8f0" strokeWidth="1.5" />
              <rect x="75" y="90" width="140" height="30" rx="3" fill="#ffffff" stroke="#387ed1" strokeWidth="1.5" />
              <text x="85" y="110" fill="#387ed1" fontSize="11" fontWeight="600" fontFamily="Plus Jakarta Sans">
                VARSITY VOL 01
              </text>
              {/* Tablet with Chart */}
              <rect x="200" y="40" width="140" height="170" rx="8" fill="#ffffff" stroke="#cbd5e1" strokeWidth="2" />
              <rect x="210" y="55" width="120" height="120" rx="4" fill="#f8fafc" />
              <path d="M 215 140 Q 240 100, 260 120 T 300 75 T 325 85" fill="none" stroke="#28a745" strokeWidth="2.5" />
              <line x1="215" y1="160" x2="325" y2="160" stroke="#e2e8f0" strokeWidth="1" />
              <circle cx="270" cy="195" r="5" fill="#e2e8f0" />
            </svg>
          </div>
        </div>

        {/* Section Modules Grid */}
        <div className="section-header-left">
          <h3 className="section-title">Structured Learning Curriculum</h3>
          <p className="section-subtitle">
            Study at your own pace with bite-sized chapters, practical charts, and case studies.
          </p>
        </div>

        <div className="education-modules-grid" id="modules-grid">
          {MODULES_DATA.map((module) => (
            <div 
              key={module.id} 
              className="module-card"
              onClick={() => setActiveModuleModal(module)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  setActiveModuleModal(module);
                }
              }}
            >
              <div className="module-header">
                <span className="module-index">{module.index}</span>
                <span className="module-difficulty">{module.difficulty}</span>
              </div>
              <h4 className="module-title">{module.title}</h4>
              <p className="module-desc">{module.description}</p>
              <div className="module-footer">
                <span>{module.chapters} Chapters &middot; {module.readTime}</span>
                <span className="module-action">
                  <span>Read</span>
                  <ChevronRight size={14} />
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Interactive Knowledge Check / Mini Quiz */}
        <div className="education-quiz-box">
          <div className="quiz-header">
            <div className="quiz-title">
              Quick Knowledge Check &middot; Indian Equity Markets
            </div>
            <span style={{ fontSize: '12px', color: 'var(--color-primary)', fontWeight: 600 }}>
              Interactive Question
            </span>
          </div>

          <p className="quiz-question-text">
            What is the standard trade settlement cycle for equity delivery trades on Indian stock exchanges (NSE / BSE)?
          </p>

          <div className="quiz-options-list">
            {[
              'T+2 Rolling Settlement (2 Business Days)',
              'T+1 Cycle with phased same-day T+0 Instant Settlement',
              'T+5 Days Weekly Physical Demat Clearing',
              'T+3 Days End-of-Week Processing'
            ].map((option, idx) => {
              let optClass = 'quiz-option-btn';
              if (selectedQuizAnswer === idx) {
                optClass += ' selected';
              }
              if (quizSubmitted && idx === correctAnswer) {
                optClass += ' correct';
              }

              return (
                <button
                  key={idx}
                  type="button"
                  className={optClass}
                  onClick={() => handleSelectOption(idx)}
                >
                  <span style={{ fontWeight: 600, width: '20px' }}>{String.fromCharCode(65 + idx)}.</span>
                  <span>{option}</span>
                </button>
              );
            })}
          </div>

          {quizSubmitted && (
            <div className={`quiz-feedback-box ${selectedQuizAnswer === correctAnswer ? 'correct' : 'incorrect'}`}>
              <strong>
                {selectedQuizAnswer === correctAnswer ? 'Correct Answer!' : 'Not quite right.'}
              </strong>{' '}
              Indian stock markets transitioned to T+1 settlement in 2023, and SEBI introduced a phased same-day T+0 optional instant settlement cycle for top liquid equities.
            </div>
          )}
        </div>

        {/* Module Detail Modal */}
        {activeModuleModal && (
          <div 
            className="mobile-menu-backdrop open" 
            onClick={() => setActiveModuleModal(null)}
            role="dialog"
            aria-modal="true"
          >
            <div 
              className="education-quiz-box" 
              style={{ maxWidth: '540px', margin: '10vh auto', position: 'relative' }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="quiz-header">
                <div>
                  <span className="module-index">{activeModuleModal.index}</span>
                  <h3 style={{ fontSize: '1.25rem', marginTop: '4px' }}>{activeModuleModal.title}</h3>
                </div>
                <button 
                  type="button" 
                  onClick={() => setActiveModuleModal(null)}
                  style={{ fontSize: '1.25rem', color: '#9b9b9b', cursor: 'pointer' }}
                >
                  &times;
                </button>
              </div>
              <p style={{ color: 'var(--color-text-muted)', fontSize: '14px', marginBottom: '16px' }}>
                {activeModuleModal.description}
              </p>
              <div style={{ background: 'var(--color-bg-subtle)', padding: '14px', borderRadius: '4px', marginBottom: '18px' }}>
                <div style={{ fontSize: '12px', fontWeight: 600, textTransform: 'uppercase', marginBottom: '8px', color: 'var(--color-text-subtle)' }}>
                  Included Study Chapters:
                </div>
                <ol style={{ paddingLeft: '18px', fontSize: '13px', color: 'var(--color-text-body)', lineHeight: '1.7' }}>
                  <li>Understanding the market structure and regulators</li>
                  <li>Order types (Market, Limit, SL, SL-M, and GTT)</li>
                  <li>Risk management and position sizing</li>
                  <li>Practical chart examples and common pitfalls</li>
                </ol>
              </div>
              <Button variant="primary" fullWidth onClick={() => setActiveModuleModal(null)}>
                Start Reading Module (Demo Ready)
              </Button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
