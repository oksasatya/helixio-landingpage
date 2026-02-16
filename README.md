<p align="center">
  <img src="https://cdn.helixio.id/assets/img/public/logo.png" alt="Helixio" width="200" />
</p>

<h3 align="center">All-in-One Productivity Platform</h3>

<p align="center">
  Notes &bull; Kanban &bull; Calendar &bull; AI Assistant &bull; Team Collaboration
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Astro-5.x-BC52EE?logo=astro&logoColor=white" alt="Astro" />
  <img src="https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white" alt="React" />
  <img src="https://img.shields.io/badge/TailwindCSS-4-06B6D4?logo=tailwindcss&logoColor=white" alt="TailwindCSS" />
  <img src="https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/i18n-ID%20%7C%20EN-FD8406" alt="Bilingual" />
</p>

---

## Overview

Landing page for **Helixio** — a productivity platform combining Smart Notes, Kanban Board, Calendar Sync, AI Assistant, and Team Workspace. Built with Astro 5 (SSG) for blazing-fast performance and perfect Lighthouse scores.

### Key Features

- **Bilingual** — Indonesian (default) + English with static routing (`/` = ID, `/en/` = EN)
- **Dark Mode** — System preference detection + manual toggle with localStorage persistence
- **SEO Optimized** — Schema.org JSON-LD, Open Graph, Twitter Cards, hreflang, sitemap
- **Responsive** — Mobile-first design with glassmorphism cards and gradient accents
- **Minimal JS** — Astro islands architecture; React only for interactive components
- **Font Awesome 5** icons + Plus Jakarta Sans headings + Inter body text

---

## Tech Stack

| Technology | Purpose |
|---|---|
| [Astro 5](https://astro.build) | Static Site Generator (SSG) |
| [React 19](https://react.dev) | Interactive components (islands) |
| [TailwindCSS 4](https://tailwindcss.com) | Utility-first styling |
| [TypeScript](https://typescriptlang.org) | Type safety |
| [Font Awesome 5](https://fontawesome.com) | Icon library |
| [Plus Jakarta Sans](https://fonts.google.com/specimen/Plus+Jakarta+Sans) | Heading font |
| [Inter](https://rsms.me/inter/) | Body font |

---

## Project Structure

```
src/
├── components/
│   ├── Navbar.astro            # Sticky navigation bar
│   ├── NavbarMobile.tsx        # Mobile menu (React island)
│   ├── ThemeToggle.tsx         # Dark mode toggle (React)
│   ├── LangSwitch.tsx          # Language switcher (React)
│   ├── Hero.astro              # Hero section
│   ├── Features.astro          # Feature grid (6 cards)
│   ├── FeatureCard.astro       # Reusable feature card
│   ├── FeatureDeepDive.astro   # Alternating feature sections
│   ├── PricingSection.astro    # Pricing wrapper
│   ├── PricingToggle.tsx       # Billing cycle toggle (React)
│   ├── PricingCard.tsx         # Pricing card (React)
│   ├── ComparisonTable.astro   # Full plan comparison
│   ├── FAQ.astro               # FAQ section
│   ├── FAQItem.tsx             # Accordion item (React)
│   ├── CTA.astro               # Bottom call-to-action
│   └── Footer.astro            # Site footer
├── i18n/
│   ├── id.json                 # Indonesian translations
│   ├── en.json                 # English translations
│   └── utils.ts                # t(), getLocale(), helpers
├── layouts/
│   └── BaseLayout.astro        # HTML shell, SEO, dark mode
├── pages/
│   ├── index.astro             # Homepage (ID)
│   ├── pricing.astro           # Pricing (ID)
│   ├── privacy-policy.astro    # Privacy Policy (ID)
│   ├── terms-of-service.astro  # Terms of Service (ID)
│   ├── features/
│   │   ├── index.astro         # Features overview (ID)
│   │   ├── notes.astro         # Smart Notes (ID)
│   │   ├── kanban.astro        # Kanban Board (ID)
│   │   ├── calendar.astro      # Calendar Sync (ID)
│   │   └── ai-assistant.astro  # AI Assistant (ID)
│   └── en/                     # English mirror of all pages
│       ├── index.astro
│       ├── pricing.astro
│       ├── privacy-policy.astro
│       ├── terms-of-service.astro
│       └── features/
│           ├── index.astro
│           ├── notes.astro
│           ├── kanban.astro
│           ├── calendar.astro
│           └── ai-assistant.astro
└── styles/
    └── global.css              # TailwindCSS 4 + design tokens
```

---

## Pages

| Route | Description |
|---|---|
| `/` | Homepage (Indonesian) |
| `/pricing` | Pricing plans |
| `/features` | Features overview |
| `/features/notes` | Smart Notes detail |
| `/features/kanban` | Kanban Board detail |
| `/features/calendar` | Calendar Sync detail |
| `/features/ai-assistant` | AI Assistant detail |
| `/privacy-policy` | Privacy Policy |
| `/terms-of-service` | Terms of Service |
| `/en/*` | English versions of all above |

---

## Getting Started

### Prerequisites

- Node.js 18+ or Bun

### Install & Run

```bash
# Install dependencies
npm install
# or
bun install

# Start dev server
npm run dev
# or
bun run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

Dev server runs at `http://localhost:4321`.

---

## Design System

### Colors

| Token | Light | Dark |
|---|---|---|
| Primary | `#FD8406` | `#FD8406` |
| Secondary | `#FDDB12` | `#FDDB12` |
| Background | `#FFFFFF` | `#0A0A0F` |
| Foreground | `#1A1A2E` | `#F5F5F7` |
| Card | `#F9FAFB` | `#111118` |
| Border | `#E5E7EB` | `#1F1F2E` |

### Gradients

```css
/* CTA buttons */
linear-gradient(135deg, #FD8406, #FDDB12)

/* Dark hero background */
linear-gradient(180deg, #0A0A0F, #1A1026)
```

---

## Deployment

Optimized for static hosting:

- **Vercel** — `npx vercel`
- **Cloudflare Pages** — Connect repo, build command: `npm run build`, output: `dist/`
- **Netlify** — Same as above

### Environment

No environment variables required. All content is static.

---

## License

&copy; 2026 Helixio. All rights reserved.
