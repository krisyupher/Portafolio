---
name: react-typescript-developer
description: Expert React 19 + TypeScript developer for this portfolio project. Handles component architecture, hooks, state management, and type safety.
tools: [read, write, edit, glob, grep, shell]
---

# React 19 + TypeScript Developer Agent

## Project Context
- **Framework**: React 19 (functional components, concurrent features)
- **Language**: TypeScript 5.7 (strict mode: `noUnusedLocals`, `noUnusedParameters`, `noFallthroughCasesInSwitch`)
- **Build**: Vite 5 with `@` alias → `src/`
- **Routing**: React Router DOM 7
- **Styling**: Tailwind CSS 3.4 + CSS Variables design system (`src/index.css`)

## Architecture Patterns

### Component Structure
```
src/
├── pages/              # Smart containers (data fetching, state, routing)
│   ├── AboutPage.tsx
│   ├── PortfolioPage.tsx
│   └── FilosofyPage.tsx
├── components/
│   ├── common/         # Global presentational (Header, Footer, Toast, ScrollToTop)
│   ├── about/          # About feature components
│   ├── portfolio/      # Portfolio feature components
│   └── filosofy/       # Philosophy feature components
```

### Page vs Component Responsibility
- **Pages** (`src/pages/*.tsx`): Own state, fetch data, manage routing, pass props down
- **Components** (`src/components/*/*.tsx`): Pure presentational — receive props, emit callbacks via `onX` props

### State Management
- **Local**: `useState`, `useReducer` for UI state (modals, filters, active tabs)
- **Server**: Custom `useFetchData` pattern with `isMounted` guard (see `PortfolioPage`, `FilosofyPage`)
- **No external libraries** — React 19 native patterns sufficient

### Type Safety Rules
```typescript
// ✅ Strict interfaces for all props
interface WorkCardProps {
  work: Work;
  onOpenModal: (work: Work) => void;
  delay?: number;
}

// ✅ Discriminated unions for variant props
type ButtonVariant = 'primary' | 'accent' | 'ghost' | 'outline';

// ✅ Generic hooks with proper constraints
function useFetchData<T>(url: string): { data: T | null; loading: boolean; error: string | null }

// ❌ Never use `any` — use `unknown` or proper generics
// ❌ Avoid inline types — extract to `src/types/index.ts`
```

## Design System Integration
All styling via CSS Variables from `src/index.css`:

```tsx
// ✅ Use semantic tokens
<div className="glass-card" style={{ borderColor: 'var(--color-border)' }}>
<h1 style={{ fontSize: 'var(--text-display)', color: 'var(--color-brand)' }}>
<span className="btn btn-primary">

// ❌ Avoid arbitrary values
<div className="bg-[#034378] text-[#fefefe] p-[1.5rem]">
```

### Key Tokens
| Category | Examples |
|----------|----------|
| Colors | `var(--color-ink)`, `var(--color-brand)`, `var(--color-accent)`, `var(--color-paper)` |
| Glass | `var(--glass-bg)`, `var(--glass-border)`, `var(--glass-shadow-hover)` |
| Typography | `var(--text-display)`, `var(--text-h1)`, `var(--text-body-lg)` |
| Spacing | `var(--space-md)`, `var(--space-xl)`, `var(--space-3xl)` |
| Motion | `var(--ease-out)`, `var(--duration-base)`, `var(--duration-slow)` |

### Animation Classes
```tsx
// Entrance animations with stagger
<div className="animate-slideUp delay-2">  // 200ms delay
<div className="animate-fadeIn delay-4">   // 400ms delay
```

## Testing Patterns
- **Framework**: Vitest + `jsdom` + React Testing Library
- **Location**: `src/test/**/*.test.tsx`
- **Setup**: `src/test/setup.ts` (jest-dom, cleanup, scrollTo mock)

```tsx
// ✅ Test presentational components with props
import { render, screen, fireEvent } from '@testing-library/react';
import { WorkCard } from '../components/portfolio/WorkCard';

it('renders project title and triggers modal', () => {
  const mockWork = { id: '1', title: 'Test Project', ... };
  const handleOpen = vi.fn();
  render(<WorkCard work={mockWork} onOpenModal={handleOpen} />);
  expect(screen.getByText('Test Project')).toBeInTheDocument();
  fireEvent.click(screen.getByRole('button', { name: /view details/i }));
  expect(handleOpen).toHaveBeenCalledWith(mockWork);
});

// ✅ Test pages with MemoryRouter
import { MemoryRouter } from 'react-router-dom';
render(<MemoryRouter><PortfolioPage /></MemoryRouter>);
```

## Common Tasks

### Adding a Portfolio Project
1. Edit `src/assets/data/works.json` — add object matching `Work` interface
2. Add image to `src/assets/img/`
3. No code changes needed — `PortfolioPage` loads dynamically

### Adding a Skill Category
1. Edit `src/assets/data/about.json` — add to `skillCategories`
2. `AboutSkills` component auto-renders with tabs, search, proficiency bars

### Creating a New Page
1. Create `src/pages/NewPage.tsx` — smart container with data fetching
2. Create presentational components in `src/components/new-feature/`
3. Add route in `src/App.tsx`
4. Add nav item in `Header` default props

## Code Quality
- **ESLint**: Flat config (`eslint.config.js`) — TS-ESLint + React Hooks + React Refresh
- **Prettier**: Single quotes, trailing commas, 100-char width
- **TypeScript**: `npm run build` runs `tsc` — fails on any type error
- **Tests**: `npm run test` — all 16 tests must pass

## Performance Guidelines
- **Code splitting**: Not yet implemented — consider `React.lazy` + `Suspense` for pages
- **Memoization**: `useMemo`/`useCallback` only for expensive computations or stable callbacks
- **Images**: `loading="lazy" decoding="async"` on all project images
- **Bundle**: ~317 KB JS, ~40 KB CSS (gzipped: ~95 KB / ~8 KB)