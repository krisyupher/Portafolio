# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Personal developer portfolio (Cristian Florez): a client-only SPA built with React 19, TypeScript (strict), Vite 5, Tailwind CSS 3.4 and React Router 7. There is no backend; all content is static JSON bundled at build time.

`README.md` is stale: it describes an older Angular 20 implementation (Jasmine/Karma, SCSS, port 4200). Don't follow it. Other Angular-era leftovers to ignore: `.claude/agents/angular-*.md`, `.claude/agents/scope-rule-architect-angular.md`, `.mcp/angular.json`. Several project agents (`design-system-ux`, `tailwind-css-specialist`, `portfolio-content-manager`, `react-typescript-developer`, `vitest-testing-specialist`) still describe the pre-redesign design system and data model (glass classes, skill proficiency, the Philosophy page). Where they conflict with this file, this file wins. `AGENTS.md` repeats much of this file for other agents, so keep the two consistent when commands or conventions change.

## Commands

```bash
npm run dev            # dev server on http://localhost:5173 (npm start is an alias)
npm run build          # tsc type-check, then vite build into docs/
npm run preview        # serve the built docs/ locally
npm run test           # vitest run (single pass)
npm run test:watch     # vitest watch mode
npm run lint           # eslint .
npm run format         # prettier --write .
npm run format:check   # prettier --check .

npx vitest run src/test/WorkCard.test.tsx   # one test file
npx vitest run -t "filters by category"     # tests whose name matches
npx tsc                                     # type-check only (tsconfig sets noEmit)
```

The quality gates are `npm run build`, `npm run test` and `npm run lint`. No CI runs them: the only workflow, `.github/workflows/claude.yml`, is the Claude Code action, which fires on `@claude` mentions.

## Architecture

### Shell, routing and pages

- `src/main.tsx` wraps `<App>` in a **`HashRouter`**, so real URLs look like `/#/portfolio`. `App.tsx` contains no router of its own; tests must wrap it, and any component that uses `Link`/`NavLink`, in `<MemoryRouter initialEntries={[...]}>`.
- Because the hash belongs to the router, in-page anchors (`href="#section"`) would be read as routes. Scroll or focus with handlers instead, as the skip link (`#main`) and the header's Contact button (`#contact`, the footer) do.
- Routes (`src/App.tsx`):
  - `/home` renders `HomePage` (hero, impact metrics, selected work, experience, stack, education).
  - `/portfolio` renders `PortfolioPage` (filters, featured grid, compact archive).
  - `/`, `/about` and everything else redirect to `/home`. The old `/filosofy` page was removed.
- `App` also scrolls to the top on each route change and renders the page-top background (grid plus glows) behind the transparent sticky header.
- Pages (`src/pages/`) own state and wire data in; components (`src/components/{common,home,portfolio}/`) take props and keep only UI state.
- Shared logic lives in:
  - `src/hooks/`: `useWorkModal` (modal selection plus prev/next across a list), `useInView`, `useTheme`, `useCopyToClipboard`, `useScrolled`, `useDocumentTitle`.
  - `src/lib/`: `cn` (clsx), and `projects.ts` (category labels and icons, filtering, archive sorting, image paths, source-link labelling).

### Content

- `src/assets/data/works.json` (projects) and `src/assets/data/about.json` (`aboutInfo`, `metrics`, `stack`, `experience`, `education`) are the single source of truth. They are imported and typed in `src/data/content.ts`; shapes are in `src/types/index.ts`.
- There is no runtime fetch, so edit only `src/` and don't recreate `public/assets/data/`.
- Site-wide constants live in `src/data/site.ts`: name, role, email, résumé PDF paths (`en` and `es`), nav items and social links.
- `works.json`:
  - Projects with `featured: true` keep their array order. The first four appear on the home page, with the first rendered as the wide feature card.
  - Non-featured projects go to the archive list, sorted by year. The year is the last four-digit number in `date`, e.g. `2022 – 2024` gives 2024.
  - `category` must be a `WorkCategory`: `Enterprise`, `FullStack`, `Frontend` or `AI & Tools`. Labels and icons are in `src/lib/projects.ts`.
  - `Link` is labelled automatically: GitHub URLs become "View source" and LinkedIn URLs become "View organization".
  - `poster` is optional. A missing or broken poster gets a generated typographic cover.
- `about.json`:
  - The first `stack` group is rendered as the dark "spotlight" card. Currently that is AI Engineering.
  - Skills carry no proficiency levels, and `src/test/content.test.ts` enforces this.
- `src/test/content.test.ts` also checks that ids are unique, categories are valid, links use https, and every poster file exists in `public/`. Run it after editing content.

### Static assets

- Posters are written as `../assets/img/X.png`. `normalizeImagePath` turns them into `./assets/img/X.png` and they load at runtime, so the files must live in **`public/assets/img/`**. Vite copies `public/` into `docs/`.
- Nothing imports `src/assets/img/`; an image that exists only there will 404.
- The résumé PDFs are served from `public/assets/resumers/`. `Resumen-*` is English and `HojaDeVida-*` is Spanish.
- Icons are Font Awesome 6 classes (`fas fa-…`, `fab fa-github`) from the CDN `<link>` in `index.html`. The npm package isn't used.
- Fonts come from Google Fonts in `index.html`: Bricolage Grotesque (display), Hanken Grotesk (body) and JetBrains Mono (labels and metadata).

### Design system

- Tokens are RGB channels in `src/index.css` (`--paper`, `--ink`, `--line`, `--brand`, `--accent` and their variants). `tailwind.config.js` maps them to color scales, so use classes with opacity modifiers, e.g. `bg-paper-raised text-ink-muted border-line bg-accent/10`. Inline color styles aren't needed.
- Available scales:
  - `paper` / `raised` / `sunken`
  - `ink` / `soft` / `muted` / `faint`
  - `line` / `strong`
  - `brand` / `soft`
  - `accent` / `ink` / `soft`. Use `text-accent-ink` for accent-colored text on light backgrounds; plain `accent` fails contrast there.
- Theming:
  - Dark values apply when the OS prefers dark, unless `<html data-theme="light">` is set.
  - They also apply when `<html data-theme="dark">` is set, and inside any `.theme-inverse` element. The footer and the AI spotlight are always dark through `.theme-inverse`.
  - `ThemeToggle` writes `data-theme` and `localStorage.theme`. An inline script in `index.html` re-applies the saved choice before first paint.
  - The `dark:` variant mirrors the same rules, but prefer tokens over `dark:` overrides.
- Component classes in `src/index.css`:
  - layout: `container-page`, `section`
  - type: `eyebrow` (mono uppercase label)
  - buttons: `btn` with `btn-primary` / `btn-secondary` / `btn-ghost`, plus `icon-btn`
  - `chip`, `nav-link` (accent underline; add `is-active`), `link-draw` (underline that draws in on hover), `bg-grid` (blueprint backdrop)
- Tailwind extensions:
  - type sizes `text-display-{2xl,lg,md,sm}`
  - easing `ease-out-expo`
  - shadows `shadow-soft` and `shadow-lift`
  - animations `animate-rise`, `fade-in`, `modal-in`, `icon-in` and `slide-down`
- Motion:
  - `<Reveal delay={ms}>` fades content in once it scrolls into view (`useInView`). Without IntersectionObserver (old browsers, jsdom) it shows content immediately.
  - The hero staggers `animate-rise` with inline `animationDelay`.
  - `prefers-reduced-motion` disables all of it.

## Testing

- The stack is Vitest + jsdom + React Testing Library. Only `src/test/**/*.{test,spec}.{ts,tsx}` is collected, so tests placed next to components won't run.
- `src/test/setup.ts` registers the jest-dom matchers, runs `cleanup` after each test and stubs `window.scrollTo`.
- jsdom has no IntersectionObserver, `matchMedia`, clipboard or `scrollIntoView`. The code guards against each, and tests stub them where needed, e.g. `Object.defineProperty(navigator, 'clipboard', { value: { writeText }, configurable: true })` or `vi.stubGlobal('IntersectionObserver', …)`.
- Page tests assert on real content from the JSON files (titles, AI stack items, project counts derived from `works`), so content edits can break them.

## Build & Deploy

- `npm run build` empties `docs/` and regenerates it. **`docs/` is committed**, and the hashed bundle names change on every build, so expect diffs there. Never edit `docs/` by hand.
- `base` comes from `VITE_BASE_PATH` (default `/`). **Vercel** is the primary target: `vercel.json` builds with `npm run build` into `docs/`, adds an SPA rewrite and sets immutable caching on `/assets/*`. For GitHub Pages, build with `VITE_BASE_PATH=./`.
- Docker:
  - `Dockerfile` builds on Node 20 and serves `docs/` from nginx using `nginx.conf`.
  - `docker-compose.yml` runs `app` on :8080 and `dev` (hot reload, `Dockerfile.dev`) on :5173.

## Conventions

- Components are `export const Name: React.FC<Props> = (…) => …` with named exports. Keep non-component helpers out of `.tsx` component files; the `react-refresh` lint rule warns on mixed exports.
- ESLint uses the flat config. Unused variables are errors unless prefixed with `_`, and `no-console` allows only `warn`/`error`. ESLint 9 also prints a warning that `.eslintignore` is unsupported; the real ignores are in `eslint.config.js`.
- `.prettierignore` doesn't exclude `docs/` or `.claude/`. As a result, `npm run format:check` flags the minified build output and `npm run format` would rewrite it. Scope Prettier to what you touched, e.g. `npx prettier --write src`.
- Commits follow Conventional Commits, e.g. `feat(portfolio): add animated modal for project details`.
