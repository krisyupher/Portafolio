# AGENTS.md - Portafolio Project Instructions

## Project Overview

React 19 + TypeScript + Vite portfolio application with Tailwind CSS. Built as a personal developer portfolio showcasing projects, experience, and skills.

**Note:** The `README.md` is outdated and describes an Angular 20 project — ignore it. The actual codebase is React + Vite (see `package.json`).

## Key Commands

| Command                     | Description                                          |
| --------------------------- | ---------------------------------------------------- |
| `npm run dev` / `npm start` | Start dev server (Vite)                              |
| `npm run build`             | Type-check (`tsc`) + production build (`vite build`) |
| `npm run preview`           | Preview production build locally                     |
| `npm run test`              | Run unit tests once (Vitest)                         |
| `npm run test:watch`        | Run tests in watch mode                              |
| `npm run lint`              | ESLint on all TS/TSX files                           |
| `npm run format`            | Prettier write                                       |
| `npm run format:check`      | Prettier check only                                  |

## Build & Deploy

- **Output directory:** `docs/` (configured in `vite.config.ts`)
- **Base path:** Configurable via `VITE_BASE_PATH` env var (defaults to `/`); uses relative paths only when explicitly set to `./` for GitHub Pages compatibility
- **Deploy target:** GitHub Pages via `docs/` folder

## Architecture & Conventions

- **Path alias:** `@/` maps to `src/` (the code itself uses relative imports)
- **Component structure:** `src/components/{common,home,portfolio}/{Component}.tsx`; hooks in `src/hooks/`, helpers in `src/lib/`
- **Content:** `src/assets/data/works.json` and `about.json` are bundled via `src/data/content.ts` (no runtime fetch); site constants live in `src/data/site.ts`; project posters must be in `public/assets/img/`
- **Styling:** design tokens are RGB-channel CSS variables in `src/index.css`, exposed as Tailwind colors (`paper`, `ink`, `line`, `brand`, `accent`); dark mode flips the tokens (`data-theme` on `<html>` or the OS preference)
- **Pages:** `src/pages/{Page}.tsx`
- **Test files:** `src/test/{Component}.test.tsx` (Vitest + React Testing Library)
- **Strict TypeScript:** `noUnusedLocals`, `noUnusedParameters` enabled
- **ESLint:** TypeScript-ESLint + React Hooks + React Refresh plugins (flat config)
- **Prettier:** Single-quote, trailing commas, 100-char line width (implied defaults)

## Routing

Defined in `src/App.tsx` using React Router v7:

```
/           → Redirects to /home
/home       → HomePage
/about      → Redirects to /home
/portfolio  → PortfolioPage
*           → Redirects to /home (wildcard; the old /filosofy page was removed)
```

Layout: Sticky `<Header>`, main content area, floating `<ScrollToTop>`, global `<Footer>` (which doubles as the contact section). `main.tsx` uses a `HashRouter`, so in-page `#anchor` links would be read as routes; scroll with handlers instead.

## Testing

- **Framework:** Vitest with `jsdom` environment
- **Setup:** `src/test/setup.ts` (jest-dom + cleanup + scrollTo mock)
- **Test location:** `src/test/**/*.test.tsx`
- **Run single test:** `npx vitest run src/test/WorkCard.test.tsx`

## Gotchas

- **Type-check runs on build:** `npm run build` fails on TS errors (no separate `typecheck` script)
- **No separate lint step in build:** Run `npm run lint` manually before commit
- **Base path:** Defaults to `/`; set `VITE_BASE_PATH=./` for GitHub Pages. Verify in `vite.config.ts` if deploying elsewhere.
- **React 19:** Uses new JSX transform (`"jsx": "react-jsx"` in tsconfig)
- **ESLint ignores:** `dist/**`, `docs/**`, `node_modules/**`, `coverage/**`

## File Locations to Know

- `vite.config.ts` — Vite + Vitest config (alias, base, test setup)
- `tsconfig.json` — Strict TS config with path aliases
- `tsconfig.node.json` — Node-specific TS config (referenced by main tsconfig)
- `eslint.config.js` — Flat config with TS/React rules
- `src/test/setup.ts` — Test globals and mocks
- `src/main.tsx` — App entry point
- `src/App.tsx` — Root component with routing
- `src/index.css` — Design tokens, Tailwind layers and component classes
- `src/data/content.ts` / `src/data/site.ts` — Typed content and site-wide constants
- `src/lib/projects.ts` — Project filtering, sorting, labels and image paths
- `src/test/content.test.ts` — Validates works.json / about.json (run after editing content)

## Git Workflow

Follows Conventional Commits:

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
