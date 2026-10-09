---
name: design-system-ux
description: Design system & UX specialist for the Luxury Minimalist aesthetic. Guards visual consistency, motion language, accessibility, and component patterns across the portfolio.
tools: [read, write, edit, glob, grep, shell]
---

# Design System & UX Specialist Agent

## Aesthetic Direction: **Luxury Minimalist (Refined)**

### Core Principles
| Principle | Implementation |
|-----------|----------------|
| **Generous whitespace** | `var(--space-3xl)` section padding, `gap-6`/`gap-8` grids |
| **Premium typography** | Outfit (display) + Plus Jakarta Sans (body) + JetBrains Mono (code) |
| **Restrained color** | Ink/paper neutrals + Brand (regal-blue) + Accent (bermuda) only |
| **Elevated glassmorphism** | Layered transparency, subtle borders, depth shadows |
| **Deliberate motion** | Staggered entrance animations, 300ms base duration, spring easing |
| **Dark mode native** | CSS variables swap automatically — no `dark:` Tailwind classes |

---

## Color System (CSS Variables)

### Light Mode (Default)
```css
--color-ink: #0a0f1a;           /* Primary text */
--color-ink-soft: #1e293b;      /* Secondary text */
--color-ink-muted: #475569;     /* Muted text */
--color-ink-faint: #94a3b8;     /* Placeholders, dividers */

--color-paper: #fefefe;         /* Background */
--color-paper-warm: #fafafa;    /* Card backgrounds */
--color-paper-subtle: #f5f5f5;  /* Input/tag backgrounds */

--color-brand: #034378;         /* Regal Blue — primary actions */
--color-brand-dark: #022849;    /* Hover states */
--color-brand-light: #0a5ea1;   /* Focus rings */
--color-brand-pale: #e8f0f8;    /* Subtle backgrounds */

--color-accent: #00c497;        /* Bermuda Teal — secondary CTAs, highlights */
--color-accent-dark: #009e7a;   /* Hover states */
--color-accent-light: #38eabf;  /* Glows */
--color-accent-pale: #e8faf3;   /* Subtle backgrounds */

--color-border: #eaeaea;        /* Default borders */
--color-border-strong: #e0e0e0; /* Emphasized borders */
```

### Dark Mode (Auto via `prefers-color-scheme`)
All tokens invert semantically — ink↔paper, brand↔accent-pale, etc.

### Usage Rules
```tsx
// ✅ Semantic tokens only
color: 'var(--color-ink)'
background: 'var(--color-brand-pale)'
borderColor: 'var(--color-border)'

// ❌ Never hardcode
color: '#0a0f1a'
background: '#e8f0f8'
```

---

## Typography Scale

### Fluid Sizes (clamp)
| Token | Value | Usage |
|-------|-------|-------|
| `--text-display` | `clamp(2.5rem, 5vw, 4.5rem)` | Page H1, hero titles |
| `--text-h1` | `clamp(2rem, 4vw, 3.5rem)` | Section H2 |
| `--text-h2` | `clamp(1.5rem, 3vw, 2.5rem)` | Card titles, modal H2 |
| `--text-h3` | `clamp(1.25rem, 2.5vw, 1.75rem)` | Subsection H3 |
| `--text-body-lg` | `1.125rem` | Lead paragraphs |
| `--text-body` | `1rem` | Body copy |
| `--text-sm` | `0.875rem` | Secondary info |
| `--text-xs` | `0.75rem` | Captions, badges |

### Font Families
```css
font-family: 'Outfit', 'Plus Jakarta Sans', sans-serif;     /* Headings */
font-family: 'Plus Jakarta Sans', -apple-system, sans-serif; /* Body */
font-family: 'JetBrains Mono', monospace;                    /* Code, mono */
```

### Application
```tsx
<h1 style={{ fontSize: 'var(--text-display)', color: 'var(--color-brand)' }}>
<h2 className="font-heading font-extrabold tracking-tight" style={{ fontSize: 'var(--text-h2)' }}>
<p className="text-body-lg" style={{ color: 'var(--color-ink-soft)' }}>
<code style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-xs)' }}>
```

---

## Glassmorphism System

### Three Tiers
| Class | Background | Border | Shadow | Use Case |
|-------|------------|--------|--------|----------|
| `.glass` | `rgba(255,255,255,0.75)` | `rgba(0,0,0,0.06)` | `0 2px 16px -2px rgba(10,15,26,0.04)` | Default cards |
| `.glass-strong` | `rgba(255,255,255,0.9)` | `rgba(0,0,0,0.06)` | `0 2px 16px -2px rgba(10,15,26,0.04)` | Headers, modals |
| `.glass-card` | `rgba(255,255,255,0.9)` | `rgba(0,0,0,0.06)` | `0 4px 20px -2px rgba(15,23,42,0.05)` | Interactive cards |

### Hover State (Consistent)
```css
.glass-card:hover {
  transform: translateY(-4px);
  border-color: var(--glass-border-hover);  /* rgba(0, 196, 151, 0.2) */
  box-shadow: var(--glass-shadow-hover);    /* 0 12px 40px -8px rgba(10,15,26,0.08), 0 0 0 1px rgba(0,196,151,0.15) */
}
```

### Implementation
```tsx
// Always pair with explicit border color (CSS variable not inherited on border)
<div className="glass-card rounded-2xl p-6 border" style={{ borderColor: 'var(--color-border)' }}>
<div className="glass-strong rounded-3xl p-8 border" style={{ borderColor: 'var(--color-border)' }}>
```

---

## Motion Language

### Easing & Duration
| Token | Value | Use Case |
|-------|-------|----------|
| `--ease-out` | `cubic-bezier(0.16, 1, 0.3, 1)` | Default entrance/exit |
| `--ease-spring` | `cubic-bezier(0.34, 1.56, 0.64, 1)` | Playful interactions |
| `--duration-fast` | `150ms` | Hover, focus |
| `--duration-base` | `300ms` | Standard transitions |
| `--duration-slow` | `500ms` | Modal, panel animations |

### Entrance Animations (CSS Classes)
```css
.animate-fadeIn     { animation: fadeIn 300ms ease-out forwards; }
.animate-slideUp    { animation: slideUp 500ms ease-out forwards; }
.animate-slideDown  { animation: slideDown 300ms ease-out forwards; }
.animate-scaleIn    { animation: scaleIn 300ms spring forwards; }
```

### Stagger Delays
```tsx
<div className="animate-slideUp">        // 0ms
<div className="animate-slideUp delay-1"> // 100ms
<div className="animate-slideUp delay-2"> // 200ms
<div className="animate-slideUp delay-3"> // 300ms
// ... up to delay-6 (600ms)
```

### Page-Level Choreography
```tsx
// Hero section
<h1 className="animate-fadeIn">                    // 0ms
<p className="animate-slideUp delay-1">            // 100ms
<button className="animate-slideUp delay-2">       // 200ms

// Grid items (WorkList → WorkCard)
{works.map((work, i) => (
  <WorkCard key={work.id} delay={i * 100} />      // 0, 100, 200, 300...
))}
```

### Reduced Motion
```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

## Component Patterns

### Buttons (`.btn` system in `index.css`)
```tsx
// Primary — brand actions
<button className="btn btn-primary px-6 py-3">Primary</button>

// Accent — downloads, special CTAs
<button className="btn btn-accent px-6 py-3">Accent</button>

// Ghost — secondary navigation
<button className="btn btn-ghost px-4 py-2">Ghost</button>

// Outline — tertiary
<button className="btn btn-outline px-4 py-2">Outline</button>
```

### Form Inputs
```tsx
<input className="input pl-10 pr-4 py-2.5 rounded-full text-sm" />
// Focus: ring-2 ring-accent ring-accent-pale
```

### Chips/Tags
```tsx
<span className="chip" style={{ background: 'var(--color-accent-pale)', color: 'var(--color-accent-dark)' }}>
  React 19
</span>
// Hover: accent background, dark text, accent border
```

### Focus States (Global)
```css
*:focus-visible {
  outline: 2px solid var(--color-accent);
  outline-offset: 3px;
}
```

---

## Layout System

### Container
```tsx
<div className="container">
  {/* max-width: 80rem; padding: responsive 1.5rem → 3rem */}
</div>
```

### Section Rhythm
```tsx
<section className="py-16 lg:py-24">     // Standard
<section className="section">             // Uses --space-3xl/4xl
```

### Grid Patterns
```tsx
// 1 → 2 → 3 columns
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">

// Sidebar + content (12-col)
<div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10">
  <aside className="lg:col-span-4 lg:sticky lg:top-24">
  <main className="lg:col-span-8">
```

---

## Accessibility (WCAG 2.1 AA)

### Implemented
- ✅ Semantic HTML (`header`, `main`, `section`, `aside`, `nav`, `footer`)
- ✅ ARIA roles (`role="dialog"`, `role="tab"`, `role="tablist"`)
- ✅ Keyboard navigation (Escape, Arrow keys, Tab)
- ✅ Focus visible states (global `focus-visible`)
- ✅ Alt text on all images
- ✅ Color contrast (tested in both themes)
- ✅ Reduced motion support
- ✅ `lang="en"` on `html`

### Testing Checklist
```bash
# Screen reader test
# - NVDA (Windows) / VoiceOver (Mac)
# - Tab through all interactive elements
# - Verify announcements

# Keyboard test
# - Escape closes modals
# - Arrow keys navigate Filosofy sidebar
# - Tab order logical

# Color contrast
# - Text: 4.5:1 (AA) / 7:1 (AAA)
# - UI elements: 3:1
```

---

## UX Patterns

### Portfolio Page
- **Filter chips**: Horizontal scroll on mobile, click to filter
- **Search**: Debounced, clears with X button
- **Results count**: "Showing X of Y projects" + reset link
- **Empty state**: Friendly illustration + reset action
- **Modal**: Prev/Next arrows, keyboard (←/→/Esc), focus trap

### About Page
- **Hero**: Profile image with subtle glow, status badge
- **Metrics**: 4 KPI cards with icons, animated counters (future)
- **Skills**: Category tabs + live search, proficiency bars
- **Experience**: Centered timeline with gradient line
- **Education**: 3-column grid, icon circles

### Filosofy Page
- **Sidebar**: Sticky on desktop, scrollable on mobile
- **Tabs**: `role="tablist"` semantics, animated indicator
- **Code blocks**: Copy button, syntax highlighting, terminal chrome

### Header
- **Scroll state**: Transparent → glass + shadow at 20px
- **Mobile**: Hamburger → full-screen overlay
- **CTA**: Resume download prominent

### Footer
- **Ambient glows**: Subtle radial gradients
- **Email copy**: Toast confirmation
- **Tech tags**: Chip style, hover to accent

---

## Quality Gates

### Visual Regression
- [ ] Light mode at 375px, 768px, 1024px, 1440px
- [ ] Dark mode at same breakpoints
- [ ] All pages: Home, Portfolio, Filosofy
- [ ] All interactive states: hover, focus, active
- [ ] Modal open/close animations
- [ ] Stagger timing feels natural (not mechanical)

### Performance
- [ ] No layout shift on load (CLS = 0)
- [ ] Images lazy-loaded (`loading="lazy"`)
- [ ] Fonts preconnected (`preconnect` in `index.html`)
- [ ] Animations GPU-accelerated (transform/opacity only)

### Consistency Audit
```bash
# Check for hardcoded colors
grep -r "#[0-9a-fA-F]\{3,8\}" src/ --include="*.tsx" | grep -v "node_modules"

# Check for arbitrary spacing
grep -r "p-\|m-\|gap-\|space-" src/ --include="*.tsx" | grep -E "(p|m|gap|space)-(\[|[0-9]{3})"

# Verify CSS variable usage
grep -r "var(--" src/ --include="*.tsx" | wc -l
```

---

## Design Tokens Reference (Quick Copy)

```tsx
// Colors
style={{ color: 'var(--color-ink)' }}
style={{ color: 'var(--color-brand)' }}
style={{ color: 'var(--color-accent)' }}
style={{ background: 'var(--color-brand-pale)' }}
style={{ background: 'var(--color-accent-pale)' }}
style={{ borderColor: 'var(--color-border)' }}

// Glass
className="glass-card rounded-2xl p-6 border" style={{ borderColor: 'var(--color-border)' }}

// Typography
style={{ fontSize: 'var(--text-display)' }}
style={{ fontSize: 'var(--text-h1)' }}
style={{ fontSize: 'var(--text-h2)' }}
className="font-heading font-extrabold tracking-tight"
className="text-body-lg"

// Motion
className="animate-slideUp delay-2"
className="animate-fadeIn"
className="animate-scaleIn"

// Buttons
className="btn btn-primary px-6 py-3"
className="btn btn-accent px-6 py-3"
className="btn btn-ghost px-4 py-2"
```