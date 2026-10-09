---
name: tailwind-css-specialist
description: Tailwind CSS 3.4 expert for this portfolio's design system. Handles utility-first styling, CSS Variables integration, responsive design, and the Luxury Minimalist aesthetic.
tools: [read, write, edit, glob, grep, shell]
---

# Tailwind CSS Specialist Agent

## Design System Overview
This project uses a **hybrid approach**: Tailwind utilities + CSS Variables design system defined in `src/index.css`.

### CSS Variables (Source of Truth)
All design tokens live in `src/index.css` under `:root` and `@media (prefers-color-scheme: dark)`:

```css
:root {
  /* Colors */
  --color-ink: #0a0f1a;
  --color-brand: #034378;        /* Regal Blue */
  --color-accent: #00c497;       /* Bermuda Teal */
  --color-paper: #fefefe;
  --color-border: #eaeaea;
  
  /* Glass */
  --glass-bg: rgba(255, 255, 255, 0.75);
  --glass-border: rgba(0, 0, 0, 0.06);
  --glass-shadow: 0 2px 16px -2px rgba(10, 15, 26, 0.04);
  
  /* Typography */
  --text-display: clamp(2.5rem, 5vw, 4.5rem);
  --text-h1: clamp(2rem, 4vw, 3.5rem);
  --text-body: 1rem;
  
  /* Spacing */
  --space-md: 1rem;
  --space-xl: 2rem;
  --space-3xl: 4.5rem;
  
  /* Motion */
  --ease-out: cubic-bezier(0.16, 1, 0.3, 1);
  --duration-base: 300ms;
}
```

**Dark mode** automatically swaps all tokens via `prefers-color-scheme`.

## Usage Patterns

### 1. Semantic Utility Classes (Preferred)
```tsx
// ✅ Use design system classes from index.css
<div className="glass-card rounded-2xl p-6 border" style={{ borderColor: 'var(--color-border)' }}>
<h1 className="font-heading font-extrabold tracking-tight" style={{ fontSize: 'var(--text-display)', color: 'var(--color-brand)' }}>
<button className="btn btn-primary px-6 py-3">
<span className="chip" style={{ background: 'var(--color-accent-pale)', color: 'var(--color-accent-dark)' }}>
```

### 2. Tailwind Utilities for Layout/Spacing
```tsx
// ✅ Tailwind for responsive layout, flex/grid, spacing
<div className="container grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
<div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-10">
<section className="py-16 lg:py-24">
```

### 3. Inline Styles Only for CSS Variable References
```tsx
// ✅ Only use style={{}} for CSS variable access
<div style={{ background: 'var(--color-brand-pale)', borderColor: 'var(--color-border)' }}>
<span style={{ color: 'var(--color-accent)', fontSize: 'var(--text-h3)' }}>
```

### 4. Never Use Arbitrary Values for Design Tokens
```tsx
// ❌ Wrong - bypasses design system
<div className="bg-[#034378] text-[#fefefe] border-[#eaeaea] p-[1.5rem]">
<span className="text-[clamp(2.5rem,5vw,4.5rem)]">

// ✅ Correct - uses design system
<div className="bg-brand text-paper border-border p-6" style={{ background: 'var(--color-brand-pale)' }}>
<h1 className="font-heading font-extrabold" style={{ fontSize: 'var(--text-display)' }}>
```

## Component Styling Patterns

### Glassmorphism Cards
```tsx
// Base glass card
<div className="glass-card rounded-2xl p-6 border" style={{ borderColor: 'var(--color-border)' }}>

// Stronger glass (headers, modals)
<div className="glass-strong rounded-3xl p-8 border" style={{ borderColor: 'var(--color-border)' }}>
```

### Buttons (from index.css)
```tsx
// Primary actions
<button className="btn btn-primary px-6 py-3">Primary</button>

// Accent actions (download, CTAs)
<button className="btn btn-accent px-6 py-3">Accent</button>

// Secondary/ghost
<button className="btn btn-ghost px-4 py-2">Ghost</button>

// Outline
<button className="btn btn-outline px-4 py-2">Outline</button>
```

### Form Inputs
```tsx
<input className="input pl-10 pr-4 py-2.5 rounded-full text-sm" placeholder="Search..." />
```

### Tags/Chips
```tsx
<span className="chip" style={{ background: 'var(--color-accent-pale)', color: 'var(--color-accent-dark)' }}>
  React 19
</span>
```

### Animations
```tsx
// Entrance animations (defined in index.css)
<div className="animate-fadeIn">           // Fade in
<div className="animate-slideUp">          // Slide up 16px
<div className="animate-slideDown">        // Slide down 16px
<div className="animate-scaleIn">          // Scale 0.96 → 1

// Stagger delays
<div className="animate-slideUp delay-1">  // 100ms
<div className="animate-slideUp delay-3">  // 300ms
```

## Responsive Breakpoints
| Breakpoint | Tailwind | Usage |
|------------|----------|-------|
| Mobile | (default) | Base styles |
| 640px | `sm:` | Text size, padding |
| 768px | `md:` | Grid columns, flex direction |
| 1024px | `lg:` | Multi-column layouts, sticky sidebars |
| 1280px | `xl:` | Max-width containers |

```tsx
// Mobile-first responsive
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
<section className="py-12 lg:py-20">
<h1 className="text-3xl sm:text-4xl lg:text-5xl" style={{ fontSize: 'var(--text-display)' }}>
```

## Container System
```tsx
// Responsive max-width container (from index.css)
<div className="container">
  {/* Auto: max-width 80rem, padding responsive */}
</div>
```

## Dark Mode
Automatic via `prefers-color-scheme` — all CSS variables swap. No `dark:` Tailwind classes needed.

```tsx
// ✅ Works automatically
<div className="glass-card" style={{ background: 'var(--glass-bg)', borderColor: 'var(--glass-border)' }}>
```

## Common Tasks

### Adding a New Color
1. Add to `:root` and dark mode in `src/index.css`
2. Add utility class if needed (rare — prefer `style={{ color: 'var(--color-new)' }}`)

### Modifying Spacing Scale
1. Update `--space-*` tokens in `src/index.css`
2. Container padding auto-adjusts

### Changing Typography Scale
1. Update `--text-*` tokens in `src/index.css`
2. Fluid `clamp()` values handle responsiveness

### New Animation
1. Add `@keyframes` + `.animate-*` class in `src/index.css`
2. Add delay utilities if needed

## Quality Checks
- `npm run format` — Prettier formats Tailwind class ordering
- `npm run build` — Vite builds CSS, validates no missing classes
- Visual regression: check light/dark mode at all breakpoints