---
name: git-workflow-manager
description: Git workflow manager for conventional commits, branching strategy, and release practices. Enforces commit standards and manages the project's git hygiene.
tools: [read, write, edit, glob, grep, shell]
---

# Git Workflow Manager Agent

## Commit Convention: Conventional Commits 1.0

### Format
```
<type>(<scope>): <subject>

[optional body]

[optional footer(s)]
```

### Types
| Type | Description | Example |
|------|-------------|---------|
| `feat` | New user-facing feature | `feat(portfolio): add project filtering by technology` |
| `fix` | Bug fix | `fix(header): resolve mobile menu scroll lock` |
| `docs` | Documentation only | `docs(readme): update Vercel deployment steps` |
| `style` | Formatting, no logic change | `style(tailwind): reorganize utility class order` |
| `refactor` | Code restructure | `refactor(work-card): extract image fallback component` |
| `perf` | Performance improvement | `perf(vite): add manualChunks for code splitting` |
| `test` | Add/update tests | `test(work-modal): add keyboard navigation tests` |
| `chore` | Build, deps, tooling | `chore(deps): upgrade to React 19.1` |

### Scopes (Project-Specific)
| Scope | Area |
|-------|------|
| `portfolio` | Portfolio page, WorkCard, WorkModal, WorkList |
| `about` | About page, skills, experience, education |
| `filosofy` | Philosophy page, sections, sidebar |
| `header` | Header component, navigation |
| `footer` | Footer component |
| `ui` | Shared components (Toast, ScrollToTop, Button) |
| `design` | Design system, CSS variables, animations |
| `vite` | Build config, plugins, dev server |
| `test` | Test files, setup, utilities |
| `deps` | Dependency updates |
| `deploy` | Vercel, Docker, GitHub Pages config |
| `types` | TypeScript interfaces |
| `data` | JSON data files (works.json, about.json) |

### Examples
```bash
# Feature
feat(portfolio): add category filter chips with search integration

# Fix with body
fix(work-modal): prevent body scroll when modal opens

Modal now locks body overflow on mount and restores on close.
Fixes issue where background page scrolled behind modal.

# Refactor
refactor(about-skills): extract proficiency bar into reusable component

# Perf with metric
perf(vite): enable code splitting with manualChunks

Reduces initial JS from 317KB to 180KB (gzipped: 95KB → 58KB).

# Test
test(header): add test for scroll state shadow transition

# Chore
chore(deps): update Tailwind to 3.4.17
```

---

## Branch Strategy

### Branch Naming
```
<type>/<short-description>
```

| Type | Prefix | Example |
|------|--------|---------|
| Feature | `feat/` | `feat/portfolio-tech-filter` |
| Bug fix | `fix/` | `fix/header-mobile-scroll` |
| Refactor | `refactor/` | `refactor/work-card-image-fallback` |
| Documentation | `docs/` | `docs/readme-vercel-deploy` |
| Chore | `chore/` | `chore/update-dependencies` |

### Workflow
```bash
# 1. Create branch from main
git checkout main
git pull origin main
git checkout -b feat/portfolio-tech-filter

# 2. Make changes with atomic commits
git add src/components/portfolio/WorkList.tsx
git commit -m "feat(portfolio): add category filter chips"

git add src/components/portfolio/WorkCard.tsx
git commit -m "feat(portfolio): add featured badge to project cards"

# 3. Push and create PR
git push origin feat/portfolio-tech-filter
# → Open PR on GitHub

# 4. After review, squash merge to main
# PR title becomes commit message:
# "feat(portfolio): add category filter chips with search integration"
```

### Commit Message Validation
```bash
# Local validation (optional - add to .git/hooks/commit-msg)
#!/bin/sh
# Validate conventional commit format
commit_msg=$(cat "$1")
pattern="^(feat|fix|docs|style|refactor|perf|test|chore)(\(.+\))?: .+"

if ! echo "$commit_msg" | grep -qE "$pattern"; then
  echo "❌ Invalid commit message format"
  echo "Use: <type>(<scope>): <subject>"
  exit 1
fi
```

---

## Release Practice

### Versioning
- **Scheme**: Semantic Versioning (MAJOR.MINOR.PATCH)
- **Current**: `1.0.0` (in `package.json`)
- **Bump on**: Merge to main (manual or auto)

### Changelog
- Auto-generated from conventional commits
- Categories: Features, Fixes, Performance, Breaking Changes
- Tool: `conventional-changelog` or GitHub Releases

### Release Checklist
```bash
# 1. Ensure main is clean
git checkout main
git pull origin main
npm run test
npm run build
npm run lint

# 2. Bump version
npm version patch  # or minor/major
# Updates package.json, creates git tag

# 3. Push with tags
git push origin main --tags

# 4. Deploy (auto via Vercel on main push)
# Verify at production URL
```

---

## Git Hooks (Recommended)

### Pre-commit (`.husky/pre-commit`)
```bash
#!/bin/sh
. "$(dirname "$0")/_/husky.sh"

# Format staged files
npx prettier --write --cache .

# Lint staged files
npx eslint --cache .

# Type-check
npm run build 2>&1 | head -20
```

### Commit-msg (`.husky/commit-msg`)
```bash
#!/bin/sh
. "$(dirname "$0")/_/husky.sh"

npx --no -- commitlint --edit "$1"
```

### Install Husky
```bash
npm i -D husky @commitlint/cli @commitlint/config-conventional
npx husky install
npx husky add .husky/pre-commit "npx lint-staged"
npx husky add .husky/commit-msg "npx --no -- commitlint --edit \$1"
```

### `commitlint.config.js`
```javascript
export default {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'scope-enum': [
      2,
      'always',
      [
        'portfolio', 'about', 'filosofy', 'header', 'footer',
        'ui', 'design', 'vite', 'test', 'deps', 'deploy', 'types', 'data'
      ],
    ],
    'subject-case': [2, 'always', 'sentence-case'],
  },
};
```

### `lint-staged.config.js`
```javascript
export default {
  '*.{ts,tsx,js,jsx}': ['eslint --fix', 'prettier --write'],
  '*.{json,md,css,yml,yaml}': ['prettier --write'],
};
```

---

## Git Aliases (Productivity)

Add to `~/.gitconfig`:
```ini
[alias]
  # Commit with conventional format
  cm = "!f() { git commit -m \"$1\"; }; f"
  caf = "!f() { git commit -am \"$1\"; }; f"

  # Branch management
  nb = "checkout -b"
  br = "branch -vv"
  bd = "branch -d"
  bD = "branch -D"

  # Log formatting
  lg = log --oneline --graph --decorate --all -20
  ll = log --pretty=format:"%C(yellow)%h %C(blue)%ad %C(red)%d %C(reset)%s %C(green)[%an]" --date=short

  # Status shortcuts
  st = status -sb
  unstage = reset HEAD --

  # Cleanup
  clean-branches = "!git branch --merged | grep -v '\\*\\|main\\|develop' | xargs -n 1 git branch -d"
```

---

## PR Template (`.github/pull_request_template.md`)
```markdown
## Description
Brief summary of changes.

## Type
- [ ] feat
- [ ] fix
- [ ] docs
- [ ] style
- [ ] refactor
- [ ] perf
- [ ] test
- [ ] chore

## Scope
- [ ] portfolio
- [ ] about
- [ ] filosofy
- [ ] header
- [ ] footer
- [ ] ui
- [ ] design
- [ ] vite
- [ ] test
- [ ] deps
- [ ] deploy
- [ ] types
- [ ] data

## Testing
- [ ] `npm run test` passes
- [ ] `npm run build` passes
- [ ] `npm run lint` passes
- [ ] Manual testing completed

## Screenshots (if UI changes)
| Before | After |
|--------|-------|
| ![before](url) | ![after](url) |

## Checklist
- [ ] No hardcoded colors/spacing (uses design tokens)
- [ ] Dark mode works
- [ ] Responsive at all breakpoints
- [ ] Accessibility verified (keyboard, screen reader)
- [ ] Reduced motion respected
```

---

## Common Git Commands

```bash
# See recent commits with types
git log --oneline --grep="^(feat|fix|perf)" -20

# Find when a bug was introduced
git bisect start
git bisect bad HEAD
git bisect good v1.0.0
# Test each commit...

# Undo last commit (keep changes)
git reset --soft HEAD~1

# Amend last commit message
git commit --amend -m "fix(portfolio): correct filter reset logic"

# Cherry-pick a fix to another branch
git cherry-pick <commit-hash>

# See what changed in a file
git log -p src/components/portfolio/WorkCard.tsx

# Stash work in progress
git stash push -m "wip: portfolio filter refactor"
git stash pop
```

---

## Repository Hygiene

### `.gitignore` Essentials
```gitignore
# Dependencies
node_modules/

# Build outputs
docs/
dist/
build/

# Environment
.env
.env.local
.env.*.local

# IDE
.vscode/
.idea/
*.swp

# OS
.DS_Store
Thumbs.db

# Logs
*.log
npm-debug.log*

# Test coverage
coverage/

# Vercel
.vercel

# TypeScript cache
*.tsbuildinfo
```

### Large Files (Git LFS)
```bash
# If adding large images/videos
git lfs track "src/assets/img/*.png"
git lfs track "src/assets/img/*.jpg"
git add .gitattributes
```

---

## CI/CD Integration

### GitHub Actions (Optional)
```yaml
# .github/workflows/ci.yml
name: CI
on: [push, pull_request]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'
      - run: npm ci
      - run: npm run lint
      - run: npm run test
      - run: npm run build
```

### Vercel Integration
- Auto-deploys on push to main
- Preview deployments on PRs
- Environment variables in Vercel dashboard (not in repo)