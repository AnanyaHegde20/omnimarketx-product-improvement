# OmniMarketX — Prediction Market Platform

A modern, responsive prediction-market web application built as an independent UI/UX improvement project. This is **not** a clone or reverse-engineering of the original OmniMarketX product — it is a fresh frontend redesign built from scratch based on the product experience and feature requirements.

---

## Project Overview

OmniMarketX is a prediction-market platform where users can browse markets across categories (Crypto, Sports, Gaming, Politics, Economy), make YES/NO predictions, track their portfolio, and engage with a social community of predictors.

The goal of this project was to take the existing product concept and rebuild the frontend with modern design principles, improved usability, better navigation, and a fully responsive mobile experience.

---

## Problem / Improvement Goal

Prediction-market platforms often suffer from:

- Cluttered interfaces that overwhelm new users
- Poor mobile experiences with broken layouts and horizontal overflow
- Lack of clear visual hierarchy between market data, actions, and navigation
- No dark mode support
- Inconsistent component design across pages

This project addresses all of these issues by implementing a clean, component-driven architecture with consistent design language across every page.

---

## Key Improvements

| Area | Improvement |
|------|------------|
| **Navigation** | Modern desktop sidebar with active-page highlighting + mobile bottom navigation bar |
| **Dark/Light Mode** | Working theme toggle with localStorage persistence, no hydration errors |
| **Visual Hierarchy** | Clear distinction between stats, market cards, actions, and social content |
| **Mobile Experience** | Fully responsive from 375px to 1440px+, no horizontal overflow, properly sized touch targets |
| **Market Interaction** | YES/NO trade modal with amount input, estimated payout, and confirmation flow |
| **Social Feed** | Functional post creation with controlled textarea and state management |
| **Category Filtering** | Horizontal scrollable category tabs on both Home and Markets pages |
| **Search** | Client-side market search with real-time filtering on the Markets page |
| **Component Architecture** | 14 reusable components, separated mock data, context providers for state |

---

## Product Improvements

### 1. Market Intelligence

**Problem:**
Users often make predictions without understanding why a market is moving or what the crowd sentiment looks like.

**Improvement:**
Added a "Market Intelligence" section to every market detail page showing crowd probability, 24h momentum, market sentiment (Bullish/Bearish/Neutral), and a deterministic explanation of why the market is moving. All data is mock data — no AI or external APIs are used.

**Impact:**
Helps users understand market movement and sentiment before predicting, supporting the "Understand" phase of the prediction journey.

---

### 2. Prediction Reasoning &amp; Confidence

**Problem:**
Users confirm predictions without reflecting on their reasoning, leading to lower-quality predictions and no learning from past decisions.

**Improvement:**
Added an optional "Why do you believe this?" textarea and a confidence selector (Low/Medium/High) to the trade modal. Predictions with reasoning are saved to localStorage and displayed in the Activity page under "My Reasoning" with expandable cards.

**Impact:**
Encourages users to record why they made a prediction and their confidence level, supporting the "Predict" and "Learn" phases of the journey.

---

### 3. Predictor Reputation

**Problem:**
The leaderboard only showed profit and win rate, making it hard to identify consistently strong predictors or understand their specialties.

**Improvement:**
Extended the User interface with Forecast Score, ROI, Consistency (High/Medium/Low), and Specialties. The leaderboard now displays a detailed reputation card for each predictor with all metrics and category specialties.

**Impact:**
Helps users discover and learn from consistent, high-performing predictors, supporting the "Discover" and "Learn" phases.

---

### 4. Additional Improvements

- **Market Card Context** — Each card now shows "Closes in X days" alongside volume and trader count
- **Demo Mode Label** — Subtle "Demo Mode" badge in the header clarifies that all data is mock/demo
- **Mobile Bottom Navigation** — Fixed padding so content never overlaps the bottom nav on mobile (375px–390px)

---

### Product Journey

I focused on improving the complete prediction journey:

```
Discover → Understand → Predict → Discuss → Track → Learn
```

- **Market Intelligence** = Understand
- **Prediction Reasoning + Confidence** = Predict + Learn
- **Predictor Reputation** = Discover + Learn

---

## Design Approach

This is an **independent frontend redesign and enhancement** built from the existing OmniMarketX product experience. No source code from the original OmniMarketX product was used, copied, or reverse-engineered.

The design approach focused on:

- **Component-driven architecture** — Reusable components with consistent styling patterns
- **Mock-first development** — All data is realistic mock data, making the application easy to run and demonstrate without any backend
- **Progressive enhancement** — Each feature (watchlist, trade modal, detail pages) builds naturally on the existing foundation without disrupting working functionality
- **Accessibility** — Semantic HTML, proper ARIA labels, keyboard-navigable interactive elements, and sufficient color contrast

---

## Features

- **Home Dashboard** — Welcome greeting, portfolio stats, quick actions, category browser, trending markets, market movers, social feed
- **Markets** — Full market listing with search and category filter
- **Trending** — Hot markets with category tabs and visual indicators
- **Social** — Social feed with post creation, likes, comments, and sharing
- **Portfolio** — Position tracking table with P&L calculations
- **Activity** — Prediction history with won/lost/active statuses
- **Leaderboard** — Ranked top predictors by profit and win rate
- **Groups** — Community groups by category
- **Wallet** — Balance display, deposit/withdraw buttons, transaction history
- **Login** — Modern login form with email validation, Google/Apple/Wallet options
- **Dark/Light Mode** — Theme toggle persisted to localStorage
- **Trade Modal** — YES/NO prediction modal with amount input and estimated payout
- **Mobile Navigation** — Bottom nav bar on screens below `lg` breakpoint

---

## Tech Stack

| Technology | Purpose |
|-----------|---------|
| **Next.js 16** | App Router, static generation, TypeScript support |
| **React 19** | Component library with hooks and context |
| **TypeScript 5** | Type safety across all components and pages |
| **Tailwind CSS 4** | Utility-first styling with dark mode support |
| **Lucide React** | Consistent, lightweight icon library |
| **Geist Font** | Modern sans-serif typography via `next/font` |

No backend, database, or external APIs required. All data is mock data.

---

## Project Structure

```
omnimarketx/
├── src/
│   ├── app/                        # Next.js App Router pages
│   │   ├── layout.tsx              # Root layout (ThemeProvider, TradeModalProvider)
│   │   ├── page.tsx                # Home dashboard
│   │   ├── globals.css             # Global styles + dark mode + utilities
│   │   ├── markets/page.tsx        # Markets with search + category filter
│   │   ├── trending/page.tsx       # Trending markets
│   │   ├── social/page.tsx         # Social feed + post creation
│   │   ├── portfolio/page.tsx      # Portfolio positions + stats
│   │   ├── activity/page.tsx       # Activity history
│   │   ├── leaderboard/page.tsx    # Top predictors
│   │   ├── groups/page.tsx         # Community groups
│   │   ├── wallet/page.tsx         # Wallet + transactions
│   │   └── login/page.tsx          # Login/signup page
│   │
│   ├── components/                 # Reusable UI components
│   │   ├── AppLayout.tsx           # Main layout wrapper (sidebar + header + content)
│   │   ├── Sidebar.tsx             # Desktop sidebar with nav + dark mode toggle
│   │   ├── Header.tsx              # Top bar with search, notifications, auth
│   │   ├── MobileNav.tsx           # Bottom navigation for mobile
│   │   ├── MarketCard.tsx          # Market card with YES/NO buttons
│   │   ├── StatCard.tsx            # Statistics display card
│   │   ├── CategoryTabs.tsx        # Horizontal scrollable category filter
│   │   ├── TradeModal.tsx          # Prediction modal with amount input
│   │   ├── TradeModalWrapper.tsx   # Key-based remount wrapper for modal
│   │   ├── TrendingMarkets.tsx     # Trending markets grid section
│   │   ├── MarketMovers.tsx        # Rising/Falling/Most traded panels
│   │   ├── SocialPostCard.tsx      # Social post with like/comment/share
│   │   ├── TrendingSidebar.tsx     # Right panel trending topics
│   │   └── QuickActions.tsx        # Quick action cards
│   │
│   ├── context/                    # React Context providers
│   │   ├── ThemeContext.tsx         # Dark/light mode (useSyncExternalStore)
│   │   └── TradeModalContext.tsx    # Trade modal open/close state
│   │
│   └── data/                       # Mock data
│       ├── markets.ts              # 12 prediction markets + categories + formatters
│       ├── users.ts                # 8 leaderboard users + current user profile
│       └── social.ts               # 6 social posts + 8 trending topics
│
├── public/                         # Static assets
├── package.json                    # Dependencies and scripts
├── tsconfig.json                   # TypeScript configuration
├── next.config.ts                  # Next.js configuration
├── postcss.config.mjs              # PostCSS + Tailwind configuration
├── .gitignore                      # Git ignore rules
└── README.md                       # This file
```

---

## How to Run Locally

### Prerequisites

- **Node.js** 18.17 or later
- **npm** (comes with Node.js)

### Setup

```bash
# Clone the repository
git clone <repository-url>
cd omnimarketx

# Install dependencies
npm install

# Start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Available Scripts

| Command | Description |
|---------|------------|
| `npm run dev` | Start development server with Turbopack |
| `npm run build` | Create production build |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint checks |

---

## Responsive / Mobile Improvements

The application is tested and functional across these breakpoints:

| Breakpoint | Width | Layout Behavior |
|-----------|-------|----------------|
| Mobile S | 375px | Single column, bottom nav, stacked cards |
| Mobile M | 390px | Single column, bottom nav, stacked cards |
| Tablet | 768px | Two-column grids, bottom nav hidden on `lg+` |
| Laptop | 1024px | Desktop sidebar visible, two/three-column grids |
| Desktop | 1440px | Full layout with right trending sidebar panel |

Key responsive decisions:

- Desktop sidebar (`hidden lg:flex`) hides on screens below 1024px
- Mobile bottom nav (`lg:hidden`) appears on screens below 1024px
- Category tabs use `overflow-x-auto` with `scrollbar-hide` for horizontal scrolling on mobile
- Market cards use `grid-cols-1 sm:grid-cols-2 xl:grid-cols-3` for fluid column count
- Portfolio table wraps in `overflow-x-auto` for horizontal scroll on small screens
- Bottom padding (`pb-24`) on main content prevents mobile nav from covering content
- All touch targets are at least 44px for mobile accessibility

---

## Testing and Verification

| Check | Result |
|-------|--------|
| `npm run build` | Pass — 0 TypeScript errors, 13 routes generated |
| `npm run lint` | Pass — 0 errors, 0 warnings |
| All 10 routes | HTTP 200 confirmed via HTTP requests |
| Secrets scan | No API keys, passwords, tokens, or .env files found |
| Dark mode | Works — no hydration errors, persists to localStorage |
| Trade modal | Opens on YES/NO click, resets state on each open |
| Social post creation | Controlled textarea, posts appear in feed |
| Category filtering | Works on Home and Markets pages |
| Market search | Real-time filtering on Markets page |
| Mobile navigation | Bottom nav visible on mobile, sidebar hidden |
| Horizontal overflow | No overflow at any tested breakpoint |

---

## Deployment

### Vercel (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

Or connect your GitHub repository to [vercel.com](https://vercel.com) for automatic deployments on every push.

### Other Platforms

This is a standard Next.js application. It can be deployed to any platform that supports Node.js:

```bash
# Build for production
npm run build

# Start production server
npm run start
```

The application uses static generation for all routes, so it can also be exported as static HTML if needed.

---

## Disclaimer

This project is an **independent redesign and enhancement** of the OmniMarketX prediction-market concept. It was built from scratch for an internship assignment. No source code from the original OmniMarketX product was used, copied, or reverse-engineered. All mock data, component implementations, and design decisions are original work.

---

## License

This project is for educational and portfolio purposes.
