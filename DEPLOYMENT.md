# GitHub Pages Deployment Guide

This document explains how your portfolio is automatically deployed to GitHub Pages using GitHub Actions.

## 📋 Overview

Your portfolio uses continuous deployment with GitHub Actions. Every push to the `master` branch automatically:
1. **Builds** the Angular application
2. **Tests** the code (runs unit tests)
3. **Deploys** to GitHub Pages

## 🚀 Deployment Setup

### Configuration Files

#### 1. **angular.json** - Base Href Configuration
```json
"production": {
  "baseHref": "/Portafolio/",
  // ... other config
}
```
- Sets the base URL for GitHub Pages (your repo name)
- Ensures all assets load correctly on `https://krisyupher.github.io/Portafolio`

#### 2. **.nojekyll** - GitHub Pages Configuration
- Prevents GitHub from processing your Angular app with Jekyll
- Allows proper serving of hashed filenames
- Must be present in the root directory

#### 3. **.github/workflows/deploy.yml** - CI/CD Pipeline
Automated workflow that:
- Triggers on push to `master` and pull requests
- Runs on Ubuntu latest
- Node.js 18.x environment
- Installs dependencies via npm ci
- Runs linting and tests
- Builds production version
- Deploys to GitHub Pages

## 📦 Deployment Workflow

### Step 1: Code Commit
```bash
# Make changes to your portfolio
git add .
git commit -m "feat: update portfolio content"
git push origin master
```

### Step 2: GitHub Actions Triggers
When code is pushed to `master`, GitHub automatically:

**Build Job:**
- Checks out latest code
- Sets up Node.js 18.x
- Installs npm dependencies
- Runs ESLint (code quality)
- Runs unit tests with coverage
- Builds production bundle

**Deploy Job** (only on successful build):
- Downloads build artifacts
- Configures GitHub Pages
- Uploads artifacts to Pages
- Deploys to live site

**Notify Job:**
- Reports deployment status
- Provides live URL

### Step 3: Live Site
Your portfolio is automatically available at:
```
https://krisyupher.github.io/Portafolio
```

## 🔄 GitHub Pages Settings

### Repository Configuration
Your repository already has GitHub Pages configured to:
1. Deploy from `gh-pages` branch
2. Use the built artifacts from GitHub Actions
3. Custom domain ready (if needed)

### Manual Configuration (if needed)
1. Go to GitHub Repository → Settings
2. Navigate to Pages (left sidebar)
3. Source: Deploy from a branch
4. Branch: `gh-pages`
5. Folder: `/ (root)`

## 🧪 Testing Locally Before Deployment

### Build Locally
```bash
# Create production build locally
npm run build

# Output goes to: dist/portafolio/
```

### Serve Locally
```bash
# Install http-server globally (if not already installed)
npm install -g http-server

# Serve the built app
cd dist/portafolio
http-server -c-1

# Visit: http://localhost:8080/Portafolio
```

## 🔍 Monitoring Deployment

### Check Build Status
1. Go to GitHub Repository
2. Click "Actions" tab
3. View workflow runs
4. Click on any run to see details

### Workflow Logs
- **Build Logs**: See npm install, lint, test, build output
- **Deploy Logs**: See GitHub Pages upload and deployment
- **Failed Deployments**: Check error messages and fix issues

### Common Issues

#### Build Fails on Tests
```bash
# Fix: Run tests locally first
npm test -- --watch=false

# Fix issues found, then push again
```

#### Lint Errors
```bash
# Fix: Run linter and auto-fix
npm run lint:fix

# Push the fixes
```

#### Asset Not Found
- Check that `baseHref: "/Portafolio/"` is set in angular.json
- Verify assets are in `src/assets/`
- Check build output in `dist/portafolio/`

## 📝 Deployment Checklist

Before pushing to `master`:
- [ ] Run `npm test` locally (all tests pass)
- [ ] Run `npm run lint` (no errors)
- [ ] Run `npm run build` (build succeeds)
- [ ] Test locally with `http-server`
- [ ] Verify links work with `/Portafolio/` base href
- [ ] Review changes one more time

## 🚨 Emergency: Rollback Deployment

If deployed version has issues:

### Option 1: Quick Fix & Push
```bash
# Fix the issue locally
git add .
git commit -m "fix: resolve deployment issue"
git push origin master
# GitHub Actions will automatically rebuild and redeploy
```

### Option 2: Revert Last Commit
```bash
git revert HEAD
git push origin master
```

## 🔐 GitHub Actions Permissions

The workflow has the following permissions:
- `contents: read` - Read repository code
- `pages: write` - Write to GitHub Pages
- `id-token: write` - Create deployment tokens

These are automatically configured and safe.

## 📊 Build Artifacts

### Generated Files
- `dist/portafolio/index.html` - Main HTML file with base href
- `dist/portafolio/main.[hash].js` - Main app bundle
- `dist/portafolio/polyfills.[hash].js` - Browser polyfills
- `dist/portafolio/styles.[hash].css` - Global styles
- `dist/portafolio/assets/` - Images, JSON data, etc.

### Bundle Size
- **Initial Bundle**: ~96 KB gzipped
- **Main JS**: ~84 KB gzipped
- **Polyfills**: ~11 KB gzipped
- **Styles**: Inlined (0 bytes separate file)

## 🎯 Environment Variables

Currently, no environment variables are needed. However, if you add them:

1. Create `.env` file (not committed to git)
2. Add to `.gitignore`
3. In GitHub Actions, set in Repository Secrets:
   - Go to Settings → Secrets and variables → Actions
   - Click "New repository secret"
   - Use in workflow: `${{ secrets.SECRET_NAME }}`

## 📚 Resources

- [GitHub Pages Documentation](https://pages.github.com/)
- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [Angular Build Guide](https://angular.io/guide/build)
- [Angular Deployment Guide](https://angular.io/guide/deployment)

## ✅ Verification Checklist

After deployment:
- [ ] Visit `https://krisyupher.github.io/Portafolio`
- [ ] Page loads without errors
- [ ] All images and assets display
- [ ] Navigation works (Home, Portfolio, About)
- [ ] Links point to correct URLs
- [ ] Portfolio projects display correctly
- [ ] Mobile responsive works
- [ ] No console errors (check DevTools)

## 🆘 Support & Troubleshooting

### Debug Deployment
```bash
# Check workflow file syntax
gh workflow view .github/workflows/deploy.yml

# View latest deployment
gh deployment list

# Check environment
gh deployment view <deployment-id>
```

### Common Commands
```bash
# Full clean rebuild
rm -rf dist node_modules
npm install
npm run build

# Run full test suite
npm test -- --watch=false --code-coverage

# Format and lint
npm run format
npm run lint:fix
```

---

**Last Updated:** November 28, 2025
**Deployment Status:** ✅ Automatic via GitHub Actions
**Live URL:** https://krisyupher.github.io/Portafolio
