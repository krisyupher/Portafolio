---
name: deployment-specialist
description: Deployment expert for Vercel (primary) and Docker/GitHub Pages (alternatives). Handles build configuration, environment variables, CI/CD, and production optimization.
tools: [read, write, edit, glob, grep, shell]
---

# Deployment Specialist Agent

## Primary Target: Vercel

### Configuration (`vercel.json`)
```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "docs",
  "framework": "vite",
  "rewrites": [
    { "source": "/(.*)", "destination": "/index.html" }
  ],
  "headers": [
    {
      "source": "/assets/(.*)",
      "headers": [
        { "key": "Cache-Control", "value": "public, max-age=31536000, immutable" }
      ]
    }
  ]
}
```

### Vercel Project Settings
- **Project**: `portafolio` in `cristian-camilo-florez-ramos-projects`
- **URL**: https://vercel.com/cristian-camilo-florez-ramos-projects/portafolio
- **Framework Detection**: Auto-detects Vite
- **Build Command**: `npm run build` (runs `tsc && vite build`)
- **Output Directory**: `docs/`
- **Environment Variables**: None required for basic deploy

### Deploy Workflow
1. Push to GitHub (main branch)
2. Vercel auto-detects changes
3. Builds with `VITE_BASE_PATH=/` (root domain)
4. Deploys to `*.vercel.app` + custom domain if configured

### Vercel-Specific Notes
- `base: '/'` in Vite config (via `VITE_BASE_PATH` default) — correct for root domain
- SPA rewrites handle client-side routing
- Asset caching headers for 1-year immutable assets
- No serverless functions needed (static export)

---

## Alternative: GitHub Pages

### Vite Config for Subpath Deployment
```bash
# Build with relative paths
VITE_BASE_PATH=./ npm run build
```

### GitHub Actions Workflow (`.github/workflows/deploy.yml`)
```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]

permissions:
  contents: read
  pages: write
  id-token: write

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'
      - run: npm ci
      - run: VITE_BASE_PATH=./ npm run build
      - uses: actions/upload-pages-artifact@v3
        with:
          path: ./docs

  deploy:
    needs: build
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - uses: actions/deploy-pages@v4
```

### GitHub Pages Settings
- Source: GitHub Actions
- Branch: `gh-pages` (auto-created)
- Custom domain: Optional (CNAME in `docs/`)

---

## Docker Deployment

### Production (`Dockerfile`)
```dockerfile
# Multi-stage: Node builder → Nginx
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM nginx:alpine AS production
COPY --from=builder /app/docs /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

### Development (`Dockerfile.dev`)
```dockerfile
FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci
EXPOSE 5173
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]
```

### Nginx Config (`nginx.conf`)
```nginx
server {
    listen 80;
    root /usr/share/nginx/html;
    index index.html;

    # SPA fallback
    location / {
        try_files $uri $uri/ /index.html;
    }

    # Cache static assets
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    # Gzip
    gzip on;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript;
}
```

### Docker Compose (`docker-compose.yml`)
```yaml
services:
  app:
    build:
      context: .
      dockerfile: Dockerfile
    ports:
      - "8080:80"
    restart: unless-stopped

  dev:
    build:
      context: .
      dockerfile: Dockerfile.dev
    ports:
      - "5173:5173"
    volumes:
      - .:/app
      - /app/node_modules
    environment:
      - CHOKIDAR_USEPOLLING=true
    command: npm run dev -- --host 0.0.0.0
```

### Docker Commands
```bash
# Production
docker compose up --build app
# → http://localhost:8080

# Development with hot reload
docker compose up --build dev
# → http://localhost:5173
```

### Docker Notes
- Removed `@rollup/rollup-win32-x64-msvc` from dependencies (Windows-only, breaks Linux build)
- `.dockerignore` excludes: `node_modules`, `docs`, `dist`, `.git`, `*.md`, `Dockerfile*`, `docker-compose*`, `nginx.conf`
- Multi-stage build keeps final image small (~20 MB nginx + assets)

---

## Environment Variables

### Build-Time (Vite)
| Variable | Purpose | Default |
|----------|---------|---------|
| `VITE_BASE_PATH` | Asset base path | `/` (Vercel) / `./` (GitHub Pages) |

### Runtime (None Required)
- No API keys, no secrets in client bundle
- All data from local JSON (`src/assets/data/*.json`)

---

## Pre-Deploy Checklist

```bash
# 1. Format & lint
npm run format
npm run lint

# 2. Type-check + build
npm run build

# 3. Tests pass
npm run test

# 4. Preview production build
npm run preview
# → Check http://localhost:4173

# 5. Verify key pages
# - /home (About)
# - /portfolio (with filters, modal)
# - /filosofy (sidebar navigation)
# - Responsive at 375px, 768px, 1024px
# - Dark mode (OS setting)
```

---

## Troubleshooting

| Issue | Solution |
|-------|----------|
| Assets 404 on Vercel | Ensure `base: '/'` (default) — check `vite.config.ts` |
| Assets 404 on GitHub Pages | Build with `VITE_BASE_PATH=./` |
| Routing 404 on refresh | Verify SPA rewrites in `vercel.json` / `nginx.conf` |
| Docker build fails on `npm ci` | Remove Windows-only deps from `package.json` |
| Dark mode flash | CSS variables handle it — no `dark:` classes needed |
| Bundle too large | Add code splitting (see vite-build-expert) |

---

## Custom Domain (Vercel)
1. Vercel Dashboard → Project → Settings → Domains
2. Add domain → Configure DNS (CNAME to `cname.vercel-dns.com`)
3. SSL auto-provisioned
4. Update `vercel.json` if needed (usually not)

---

## Performance Budget (Current)
| Metric | Current | Target |
|--------|---------|--------|
| JS (gzipped) | 95 KB | < 150 KB |
| CSS (gzipped) | 8 KB | < 20 KB |
| LCP | ~1.2s | < 2.5s |
| CLS | 0 | < 0.1 |
| TTI | ~1.5s | < 3.5s |