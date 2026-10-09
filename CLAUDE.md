# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

A modern, responsive portfolio application showcasing 4+ years of Full-Stack development experience. Built with **React 19**, **TypeScript**, **Vite**, and **Tailwind CSS**.

**Tech Stack:**
- React 19 (functional components, hooks, concurrent features)
- TypeScript 5.7 (strict mode enabled)
- Vite 5 (build tool, dev server, HMR)
- Tailwind CSS 3.4 (utility-first styling)
- React Router DOM 7 (client-side routing)
- Vitest 3 + React Testing Library (unit/integration testing)
- ESLint 9 (flat config) + Prettier 3

**Status:** Production ready. Luxury Minimalist design system implemented with glassmorphism, fluid typography, and deliberate motion.

## Common Development Commands

**Development server:**
```bash
npm run dev
# or: npm start
# Serves on http://localhost:5173/ with HMR
```

**Build for production:**
```bash
npm run build
# Runs tsc (type-check) + vite build
# Output stored in docs/ (GitHub Pages compatible)
```

**Preview production build:**
```bash
npm run preview
# Serves docs/ locally for verification
```

**Run unit tests:**
```bash
npm run test
# Runs Vitest once
```

**Run tests in watch mode:**
```bash
npm run test:watch
```

**Run a single test file:**
```bash
npx vitest run src/test/WorkCard.test.tsx
```

**Lint code:**
```bash
npm run lint
# Runs ESLint on all .ts/.tsx files
```

**Format code:**
```bash
npm run format
# Formats all files with Prettier
```

**Check code formatting (no changes):**
```bash
npm run format:check
```

## Architecture

### Project Structure
```
src/
├── components/
│   ├── common/           # Global presentational components
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   ├── Toast.tsx
│   │   └── ScrollToTop.tsx
│   ├── about/            # About section feature components
│   │   ├── AboutHeader.tsx
│   │   ├── AboutSkills.tsx
│   │   ├── AboutExperience.tsx
│   │   └── AboutEducation.tsx
│   ├── portfolio/        # Portfolio feature components
│   │   ├── WorkList.tsx
│   │   ├── WorkCard.tsx
│   │   └── WorkModal.tsx
│   └── filosofy/         # Philosophy section components
│       ├── SectionHeader.tsx
│       └── SectionContent.tsx
├── pages/                # Top-level route pages
│   ├── AboutPage.tsx
│   ├── PortfolioPage.tsx
│   └── FilosofyPage.tsx
├── data/                 # Static data constants
│   └── filosofyData.ts
├── test/                 # Test utilities
│   ├── setup.ts
│   └── *.test.tsx
├── types/                # TypeScript interfaces
│   └── index.ts
├── assets/               # Static assets
│   ├── data/             # JSON data files
│   │   ├── works.json    # Portfolio projects (18 projects)
│   │   └── about.json    # Professional info
│   └── img/              # Project images
├── App.tsx               # Root component with Router
├── main.tsx              # React 19 root mounting
└── index.css             # Tailwind + design system (CSS variables)
```

### Component Pattern
- **Pages** (`src/pages/*.tsx`): Smart containers — handle data fetching, state, routing
- **Components** (`src/components/*/*.tsx`): Presentational — receive props, emit callbacks
- **Strict separation**: Pages own state; components are pure UI

### State Management
- **Local component state**: `useState`, `useReducer`
- **Server state**: Custom `useFetchData` pattern (see `FilosofyPage` / `PortfolioPage`)
- **No external state library** — React 19 native patterns sufficient

### Data Models (`src/types/index.ts`)
```typescript
interface Work {
  id: string;
  title: string;
  poster: string;
  description: string;
  linkView: string;      // Live demo URL
  date: string;          // "MMM YYYY" format
  Link: string;          // GitHub/org URL
  category: string;      // "Enterprise" | "FullStack" | "Frontend" | "AI & Tools"
  technologies: string[];
  highlights: string[];
  featured?: boolean;
}

interface AboutInfo {
  name: string;
  title: string;
  bio: string;
  focus: string;
  profileImage: string;
}

interface SkillCategory {
  name: string;
  skills: Skill[];
}

interface Skill {
  id: string;
  name: string;
  proficiency: 'Expert' | 'Advanced' | 'Intermediate' | 'Beginner';
}

interface Experience {
  id: string;
  title: string;
  company: string;
  startDate: string;
  endDate: string | null;
  description: string;
  technologies: string[];
}

interface Education {
  id: string;
  degree: string;
  institution: string;
  graduationYear: string;
  field: string;
  description?: string;
}
```

### Styling: Design System (`src/index.css`)
**CSS Custom Properties** (all prefixed with `--color-`, `--text-`, `--space-`, `--glass-`):

| Category | Tokens |
|----------|--------|
| Colors | `ink`, `ink-soft`, `ink-muted`, `ink-faint`, `paper`, `paper-warm`, `paper-subtle`, `brand` (regal-blue), `brand-dark`, `brand-light`, `brand-pale`, `accent` (bermuda), `accent-dark`, `accent-light`, `accent-pale`, `border`, `border-strong` |
| Glass | `glass-bg`, `glass-bg-strong`, `glass-border`, `glass-border-hover`, `glass-shadow`, `glass-shadow-hover` |
| Typography | `text-display` (clamp 2.5–4.5rem), `text-h1`–`text-h3`, `text-body-lg`, `text-body`, `text-sm`, `text-xs` |
| Spacing | `space-xs` (0.25rem) → `space-4xl` (6rem) |
| Motion | `ease-out` (cubic-bezier), `ease-spring`, `duration-fast` (150ms), `duration-base` (300ms), `duration-slow` (500ms) |

**Utility Classes:**
- `.glass` / `.glass-strong` / `.glass-card` — glassmorphism panels
- `.btn` / `.btn-primary` / `.btn-accent` / `.btn-ghost` / `.btn-outline` — button system
- `.input` — form input base
- `.chip` — tag/pill component
- `.container` — responsive max-width wrapper
- `.section` — vertical rhythm
- `.animate-fadeIn` / `.animate-slideUp` / `.animate-slideDown` / `.animate-scaleIn` — entrance animations
- `.delay-1` → `.delay-6` — stagger delays (100ms increments)

**Dark mode**: Automatic via `prefers-color-scheme` — all color tokens swap.

### Routing (`src/App.tsx`)
```
/              → Redirects to /home
/home          → AboutPage
/about         → AboutPage
/portfolio     → PortfolioPage
/filosofy      → FilosofyPage
/**            → Redirects to /home
```

### Vite Config (`vite.config.ts`)
- `@` alias → `./src`
- `base: process.env.VITE_BASE_PATH || '/'` — configurable for Vercel (`/`) or GitHub Pages (`./`)
- Build output: `docs/`
- Vitest: `jsdom` env, `src/test/setup.ts`, includes `src/test/**/*.test.tsx`

## Key Features

### Portfolio Page
- 18 projects across 4 categories (Enterprise, FullStack, Frontend, AI & Tools)
- Category filter chips + search bar (debounced)
- Staggered card entrance animations
- Modal with prev/next navigation, keyboard support (←/→/Esc)
- Highlights grid, tech stack pills, dual CTAs (Live Demo / Source)

### About Page
- Hero with profile image, metrics strip (4 KPIs)
- Skills: category tabs + search, proficiency bars with brand gradient
- Experience: centered timeline with gradient line, glass cards
- Education: 3-column grid, icon circles, year pills

### Philosophy Page
- Sticky sidebar navigation (tablist semantics)
- 7 sections: Architecture, State Management, TDD, ESLint/Prettier, Git Workflow, Tools, Best Practices
- Code blocks with copy-to-clipboard, syntax highlighting
- Active section animated transition

## Testing
- **Framework**: Vitest 3 + `jsdom` + React Testing Library
- **Setup**: `src/test/setup.ts` (jest-dom, cleanup, scrollTo mock)
- **Location**: `src/test/**/*.test.tsx`
- **Coverage**: 16 tests passing (Header, Footer, WorkCard, WorkModal, AboutPage, FilosofyPage, App)

## Build & Deploy

### Vercel (Primary)
- `vercel.json` configured: build command `npm run build`, output `docs/`, SPA rewrites, asset caching
- `vite.config.ts` reads `VITE_BASE_PATH` (defaults to `/` for Vercel root domain)

### GitHub Pages (Alternative)
- Set `VITE_BASE_PATH=./` in build env
- Output `docs/` served from repo root

### Docker
- `Dockerfile` (multi-stage: Node builder → nginx)
- `Dockerfile.dev` (hot reload)
- `docker-compose.yml` (app + dev services)
- `nginx.conf` (SPA fallback, asset caching, gzip)

## Git Workflow
Follows **Conventional Commits**:
```
feat: new feature
fix: bug fix
docs: documentation
style: formatting
refactor: code restructure
perf: performance
test: tests
chore: maintenance
```
Example: `feat(portfolio): add animated modal for project details`

## Quality Gates
- `npm run build` → TypeScript strict check + Vite production build
- `npm run test` → All 16 tests pass
- `npm run lint` → ESLint flat config (TS-ESLint + React Hooks + React Refresh)
- `npm run format:check` → Prettier compliance

## Environment
- **Node**: 18+
- **Package Manager**: npm 9+
- **No `.env` required** for local dev (Vite handles base path)

## MCP Servers
None configured for this React/Vite project.

## Skills Available (via `npx autoskills@latest`)
12 skills installed for this stack:
- `deploy-to-vercel`, `vite`, `vitest`, `react-best-practices`
- `composition-patterns`, `frontend-design`, `tailwind-css-patterns`
- `typescript-advanced-types`, `accessibility`, `seo`
- `nodejs-best-practices`, `nodejs-backend-patterns`