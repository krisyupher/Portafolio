/** Colors resolve to the RGB-channel tokens in src/index.css, so opacity modifiers work. */
const token = (name) => `rgb(var(--${name}) / <alpha-value>)`;

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  // Mirrors the token switch in src/index.css: an explicit data-theme wins, otherwise the OS.
  darkMode: [
    'variant',
    [
      '@media (prefers-color-scheme: dark) { &:not([data-theme=light] *) }',
      '&:is([data-theme=dark] *)',
    ],
  ],
  theme: {
    extend: {
      colors: {
        paper: {
          DEFAULT: token('paper'),
          raised: token('paper-raised'),
          sunken: token('paper-sunken'),
        },
        ink: {
          DEFAULT: token('ink'),
          soft: token('ink-soft'),
          muted: token('ink-muted'),
          faint: token('ink-faint'),
        },
        line: {
          DEFAULT: token('line'),
          strong: token('line-strong'),
        },
        brand: {
          DEFAULT: token('brand'),
          soft: token('brand-soft'),
        },
        accent: {
          DEFAULT: token('accent'),
          ink: token('accent-ink'),
          soft: token('accent-soft'),
        },
      },
      fontFamily: {
        sans: ['"Hanken Grotesk"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        display: ['"Bricolage Grotesque"', '"Hanken Grotesk"', 'ui-sans-serif', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'SFMono-Regular', 'monospace'],
      },
      fontSize: {
        'display-2xl': [
          'clamp(3.25rem, 9vw, 7.25rem)',
          { lineHeight: '0.92', letterSpacing: '-0.045em' },
        ],
        'display-lg': ['clamp(2.25rem, 5vw, 4rem)', { lineHeight: '1', letterSpacing: '-0.035em' }],
        'display-md': [
          'clamp(1.875rem, 3.4vw, 2.75rem)',
          { lineHeight: '1.05', letterSpacing: '-0.03em' },
        ],
        'display-sm': [
          'clamp(1.375rem, 2.2vw, 1.75rem)',
          { lineHeight: '1.3', letterSpacing: '-0.015em' },
        ],
      },
      boxShadow: {
        soft: '0 1px 2px rgb(var(--shadow) / 0.04), 0 12px 32px -18px rgb(var(--shadow) / 0.22)',
        lift: '0 2px 6px rgb(var(--shadow) / 0.05), 0 28px 56px -24px rgb(var(--shadow) / 0.35)',
      },
      transitionTimingFunction: {
        'out-expo': 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
      keyframes: {
        rise: {
          from: { opacity: '0', transform: 'translateY(14px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in': {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        'modal-in': {
          from: { opacity: '0', transform: 'translateY(24px) scale(0.98)' },
          to: { opacity: '1', transform: 'translateY(0) scale(1)' },
        },
        'icon-in': {
          from: { opacity: '0', transform: 'rotate(-90deg) scale(0.6)' },
          to: { opacity: '1', transform: 'rotate(0) scale(1)' },
        },
        'slide-down': {
          from: { opacity: '0', transform: 'translateY(-8px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        rise: 'rise 0.9s cubic-bezier(0.16, 1, 0.3, 1) both',
        'fade-in': 'fade-in 0.3s ease-out both',
        'modal-in': 'modal-in 0.45s cubic-bezier(0.16, 1, 0.3, 1) both',
        'icon-in': 'icon-in 0.5s cubic-bezier(0.16, 1, 0.3, 1) both',
        'slide-down': 'slide-down 0.35s cubic-bezier(0.16, 1, 0.3, 1) both',
      },
    },
  },
  plugins: [],
};
