---
name: vite-build-expert
description: Vite 5 build expert for this portfolio. Handles dev server, production builds, environment configuration, plugin ecosystem, and deployment optimization.
tools: [read, write, edit, glob, grep, shell]
---

# Vite Build Expert Agent

## Configuration (`vite.config.ts`)
```typescript
export default defineConfig({
  plugins: [react()],
  base: process.env.VITE_BASE_PATH || '/',  // Configurable per deployment target
  build: {
    outDir: 'docs',                          // GitHub Pages / Vercel output
    emptyOutDir: true,
  },
  resolve: {
    alias: { '@': path.resolve(__dirname, './src') },
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/test/setup.ts',
    include: ['src/test/**/*.{test,spec}.{ts,tsx}'],
    exclude: ['src/app/**', 'node_modules/**', 'docs/**'],
    css: true,
  },
});
```

## Environment-Specific Base Path

### Vercel (Root Domain) — Default
```bash
# No env var needed — defaults to '/'
npm run build
# Assets: /assets/index-*.js, /assets/index-*.css
```

### GitHub Pages (Subpath)
```bash
# Set base to relative paths
VITE_BASE_PATH=./ npm run build
# Assets: ./assets/index-*.js, ./assets/index-*.css
```

### Docker/Nginx (Custom Domain)
```bash
# Set to your subpath if needed
VITE_BASE_PATH=/portfolio/ npm run build
```

## Build Commands

| Command | Description |
|---------|-------------|
| `npm run dev` | Start Vite dev server (port 5173, HMR) |
| `npm run build` | **Type-check (`tsc`) + Production build (`vite build`)** |
| `npm run preview` | Preview `docs/` locally (port 4173) |
| `npm run test` | Run Vitest unit tests |

## Build Output Analysis

### Typical Production Build
```
docs/
├── index.html                 1.75 kB  (gz: 0.90 kB)
├── assets/
│   ├── index-*.css           39.51 kB  (gz: 7.76 kB)
│   └── index-*.js           316.90 kB  (gz: 95.39 kB)
```

### Key Metrics
- **JS Bundle**: ~317 KB → **~95 KB gzipped** (excellent)
- **CSS Bundle**: ~40 KB → **~8 KB gzipped** (excellent)
- **HTML**: ~1.7 KB → **~0.9 KB gzipped**
- **No code splitting yet** — single chunk (consider `manualChunks` for larger apps)

## Optimization Opportunities

### 1. Code Splitting (Not Yet Implemented)
```typescript
// vite.config.ts - add to build config
build: {
  rollupOptions: {
    output: {
      manualChunks: {
        vendor: ['react', 'react-dom', 'react-router-dom'],
        ui: ['@fortawesome/fontawesome-free'],
      },
    },
  },
}
```

### 2. Lazy Loading Pages
```tsx
// src/App.tsx
import { lazy, Suspense } from 'react';

const AboutPage = lazy(() => import('./pages/AboutPage'));
const PortfolioPage = lazy(() => import('./pages/PortfolioPage'));
const FilosofyPage = lazy(() => import('./pages/FilosofyPage'));

// In routes:
<Suspense fallback={<PageSkeleton />}>
  <Routes>...</Routes>
</Suspense>
```

### 3. Image Optimization
- Current: Static images in `src/assets/img/` copied as-is
- Consider: `vite-plugin-image-optimizer` or CDN for WebP/AVIF

### 4. Bundle Analysis
```bash
# Visualize bundle
npx vite-bundle-analyzer
# Or add to build script
```

## Dev Server Features
- **HMR**: Sub-millisecond updates via Vite's native HMR
- **Port**: 5173 (configurable via `--port`)
- **Network**: Use `--host` for LAN access
- **Proxy**: Not configured (add `server.proxy` for API dev)

## TypeScript Integration
- `tsc` runs **before** `vite build` in `npm run build`
- `isolatedModules: true` — Vite handles transpilation
- `noEmit: true` — Types only, no `.js` output from `tsc`
- Path aliases: `@/*` → `src/*` (configured in both `tsconfig.json` and `vite.config.ts`)

## Testing Integration
```typescript
// vite.config.ts test config
test: {
  globals: true,
  environment: 'jsdom',
  setupFiles: './src/test/setup.ts',
  include: ['src/test/**/*.{test,spec}.{ts,tsx}'],
  css: true,  // Process Tailwind/import.css in tests
}
```

## Common Tasks

### Add a Plugin
```bash
npm i -D vite-plugin-some-plugin
```
```typescript
// vite.config.ts
import somePlugin from 'vite-plugin-some-plugin';
export default defineConfig({
  plugins: [react(), somePlugin({ options })],
});
```

### Change Output Directory
```typescript
build: { outDir: 'dist' }  // Then update vercel.json, nginx.conf, etc.
```

### Environment Variables
```bash
# .env.production (auto-loaded)
VITE_API_URL=https://api.example.com
VITE_BASE_PATH=/
```
```tsx
// Access in code
const apiUrl = import.meta.env.VITE_API_URL;
```

### Analyze Bundle Size
```bash
# Terminal output
npm run build 2>&1 | grep -E "(js|css).*kB"
```

## Deployment Targets

### Vercel (Primary)
- `vercel.json` reads `buildCommand: "npm run build"`, `outputDirectory: "docs"`
- Auto-detects Vite, sets `VITE_BASE_PATH=/`

### GitHub Pages
- `vite.config.ts`: `base: './'` (or `VITE_BASE_PATH=./`)
- GitHub Actions: build → deploy `docs/` to `gh-pages`

### Docker (Production)
```dockerfile
# Multi-stage: Node builder → Nginx
COPY --from=builder /app/docs /usr/share/nginx/html
```
- `nginx.conf` handles SPA fallback (`try_files $uri $uri/ /index.html`)

### Docker (Development)
```dockerfile
# Hot reload with volume mount
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]
```

## Troubleshooting

| Issue | Solution |
|-------|----------|
| `tsc` errors on build | Fix TypeScript errors first — `npm run build` fails fast |
| Assets 404 in production | Check `base` config matches deployment subpath |
| HMR not working | Ensure `vite` is in devDependencies, not dependencies |
| Tests fail with CSS | `css: true` in test config processes `@import` |
| Bundle too large | Add code splitting, analyze with `vite-bundle-analyzer` |
| Dark mode flash | CSS variables handle it — no Tailwind `dark:` needed |