# AGENTS.md - Portafolio Project Instructions

## Project Overview
React 19 + TypeScript + Vite portfolio application with Tailwind CSS. Built as a personal developer portfolio showcasing projects, experience, and skills.

## Key Commands
| Command | Description |
|---------|-------------|
| `npm run dev` / `npm start` | Start dev server (Vite) |
| `npm run build` | Type-check (`tsc`) + production build (`vite build`) |
| `npm run preview` | Preview production build locally |
| `npm run test` | Run unit tests once (Vitest) |
| `npm run test:watch` | Run tests in watch mode |
| `npm run lint` | ESLint on all TS/TSX files |
| `npm run format` | Prettier write |
| `npm run format:check` | Prettier check only |

## Build & Deploy
- **Output directory:** `docs/` (configured in `vite.config.ts`)
- **Base path:** `./` (relative paths for GitHub Pages compatibility)
- **Deploy target:** GitHub Pages via `docs/` folder

## Architecture & Conventions
- **Path alias:** `@/` maps to `src/`
- **Component structure:** `src/components/{feature}/{Component}.tsx`
- **Pages:** `src/pages/{Page}.tsx`
- **Test files:** `src/test/{Component}.test.tsx` (Vitest + React Testing Library)
- **Strict TypeScript:** `noUnusedLocals`, `noUnusedParameters` enabled
- **ESLint:** TypeScript-ESLint + React Hooks + React Refresh plugins
- **Prettier:** Single-quote, trailing commas, 100-char line width (implied defaults)

## Testing
- **Framework:** Vitest with `jsdom` environment
- **Setup:** `src/test/setup.ts` (jest-dom + cleanup + scrollTo mock)
- **Test location:** `src/test/**/*.test.tsx`
- **Run single test:** `npx vitest run src/test/WorkCard.test.tsx`

## Gotchas
- **Type-check runs on build:** `npm run build` fails on TS errors (no separate `typecheck` script)
- **No separate lint step in build:** Run `npm run lint` manually before commit
- **Relative base path:** Assets use relative paths; verify `base: './'` in vite.config.ts if deploying elsewhere
- **React 19:** Uses new JSX transform (`"jsx": "react-jsx"` in tsconfig)

## File Locations to Know
- `vite.config.ts` — Vite + Vitest config (alias, base, test setup)
- `tsconfig.json` — Strict TS config with path aliases
- `eslint.config.js` — Flat config with TS/React rules
- `src/test/setup.ts` — Test globals and mocks
- `src/main.tsx` — App entry point
- `src/App.tsx` — Root component with routing

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