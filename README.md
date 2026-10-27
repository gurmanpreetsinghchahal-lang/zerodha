# Zenith Broking — Stock Trading & Investment Platform

A modern, responsive, and minimalist stock trading and investment platform inspired by the design philosophy, typography, spacing, and user experience of **Zerodha** (https://zerodha.com/).

Built strictly with **React.js** and **Custom CSS** (CSS Variables, Flexbox, and CSS Grid), adhering to clean financial UI standards without heavy CSS frameworks.

---

## 🚀 Key Highlights & Features

### 1. Minimalist Fintech Design System
- **Design Tokens**: Standardized CSS variables in `src/styles/global.css` for palette, typography scale, radii, hairline borders, and layout containers.
- **Zerodha Aesthetic**: Restrained royal sky blue accent (`#387ed1`), deep charcoal typography (`#424242` / `#222222`), crisp hairline borders (`#eeeeee`), and pure white backgrounds.
- **Tabular Figures**: Monospace numerals (`tabular-nums`) for currency and exchange percentages to ensure alignment.

### 2. Layout & Components
- **Top Navigation Bar (`Navbar.tsx` & `MobileMenu.tsx`)**:
  - Sticky header with clean brand wordmark.
  - Links: Products, Pricing, About, Education, Support.
  - Slide-out mobile drawer with smooth backdrop and keyboard `Escape` closing.
- **Hero Section (`Hero.tsx`)**:
  - Prominent headline: *"Invest Smarter. Trade with Confidence."*
  - Value proposition with instant "Get Started" and "Explore Products" actions.
  - **Interactive Trading Terminal**: Live simulated market ticks across 5 major stocks (RELIANCE, TCS, HDFCBANK, INFY, NIFTY 50), responsive SVG candlestick chart, timeframe switches, and live simulated buy/sell order feedback.
- **Trust & Statistics Section (`StatsSection.tsx`)**:
  - Core philosophy: *"Customer-first always"*, *"No gimmicks or dark patterns"*, *"The Zenith ecosystem"*, and *"Do better with money"*.
  - Custom SVG ecosystem diagram depicting Kite, Console, Coin, Sentinel, Connect API, and Varsity.
  - Illustrative metrics (`12M+` accounts, `₹4.5L Cr` demat assets, `15%+` retail volume, `₹0` equity delivery).
- **Products Suite (`ProductsSection.tsx` & `ProductCard.tsx`)**:
  - Reusable product cards for:
    1. Online Stock Trading (*Zenith Kite*)
    2. Long-Term Investing (*Zenith Delivery*)
    3. Mutual Funds (*Zenith Coin*)
    4. Market Watchlists (*Zenith Sentinel*)
    5. Portfolio Tracking (*Zenith Console*)
    6. Financial Learning Resources (*Zenith Varsity*)
  - Interactive category filter tabs (All, Trading, Investment, Tools).
  - Algorithmic Trading API spotlight.
- **Pricing & Fee Transparency (`PricingSection.tsx`)**:
  - Clean cards showcasing ₹0 Free Equity Delivery, flat ₹20 Intraday/F&O, and ₹0 Direct Mutual Funds.
  - Full statutory comparison table (STT, exchange turnover fees, GST, SEBI charges).
- **Interactive Brokerage Calculator (`BrokerageCalculator.tsx`)**:
  - Real-time calculator for Equity Delivery, Intraday, and F&O Futures.
  - Instant calculations of turnover, brokerage, STT/CTT, exchange charges, GST, SEBI turnover fees, total charges, and Net Profit/Loss.
- **Varsity Education Section (`EducationSection.tsx`)**:
  - 6 structured learning modules from beginner to advanced.
  - Interactive Knowledge Check Quiz with instant feedback and explanatory breakdowns.
  - Chapter overview modal for each module.
- **FAQ Accordion (`FaqSection.tsx`)**:
  - Accessible accordion addressing account opening, ₹0 brokerage rationale, depository safety (CDSL), and taxes.
- **Onboarding Modal (`AuthModal.tsx`)**:
  - Client-side validated form (Full Name, 10-digit Indian mobile number, Email).
  - Instant simulated demo Demat account generation with unique client ID (`ZNXXXXXX`).
- **Footer (`Footer.tsx`)**:
  - Multi-column link directory, social links, and official Indian exchange/SEBI demonstration disclaimers.

---

## 📁 Project Structure

```text
src/
├── components/
│   ├── AuthModal.tsx             # Demo account opening modal with validation
│   ├── BrokerageCalculator.tsx   # Live interactive brokerage & regulatory fee estimator
│   ├── Button.tsx                # Reusable accessible button component
│   ├── EducationSection.tsx      # Varsity modules and interactive quiz
│   ├── FaqSection.tsx            # Expandable accordion FAQs
│   ├── Footer.tsx                # Compliance footer with SEBI & exchange disclaimers
│   ├── Hero.tsx                  # Hero with interactive trading terminal & live ticks
│   ├── MobileMenu.tsx            # Mobile responsive slide-over drawer
│   ├── Navbar.tsx                # Responsive sticky navigation bar
│   ├── ProductCard.tsx           # Reusable product cards
│   ├── ProductsSection.tsx       # Product showcase with category filter
│   └── StatsSection.tsx          # Manifesto, metrics, and ecosystem visual
├── pages/
│   └── Home.tsx                  # Main landing page combining all sections
├── styles/
│   ├── AuthModal.css
│   ├── Calculator.css
│   ├── Education.css
│   ├── Faq.css
│   ├── Footer.css
│   ├── global.css                # CSS variables, typography, resets, containers
│   ├── Hero.css
│   ├── Navbar.css
│   ├── Pricing.css
│   ├── Products.css
│   └── Stats.css
├── App.tsx                       # Root application component
├── index.css                     # Stylesheet imports aggregator
└── main.tsx                      # React DOM mounting
```

---

## 🛠️ Installation and Running Locally

### Prerequisites
- Node.js (v18 or higher)
- npm or bun

### Steps

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Start development server**:
   ```bash
   npm run dev
   ```

3. **Open browser**:
   Navigate to `http://localhost:3000` (or the port specified by Vite).

4. **Production Build**:
   ```bash
   npm run build
   ```

---

## ⚖️ Disclaimer
This project is an educational, frontend-only demonstration inspired by the minimalist design philosophy of Zerodha. No real financial services, banking APIs, live broker executions, or SEBI regulated transactions occur.
