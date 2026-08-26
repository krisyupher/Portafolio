/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'regal-blue': '#034378',
        'regal-dark': '#022849',
        'regal-light': '#0a5ea1',
        'san-juan': '#2d4e68',
        bermuda: '#00c497',
        'bermuda-dark': '#009e7a',
        'bermuda-light': '#38eabf',
        accent: {
          cyan: '#06b6d4',
          emerald: '#10b981',
          teal: '#14b8a6',
          indigo: '#6366f1',
          amber: '#f59e0b',
        },
        slate: {
          850: '#152033',
          900: '#0f172a',
          950: '#080d1a',
        },
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', '"Open Sans"', 'sans-serif'],
        heading: ['Outfit', 'Montserrat', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      boxShadow: {
        glass: '0 8px 32px 0 rgba(3, 67, 120, 0.08)',
        'glass-hover': '0 14px 40px 0 rgba(0, 196, 151, 0.18)',
        'glow-teal': '0 0 25px -5px rgba(0, 196, 151, 0.4)',
        'glow-blue': '0 0 25px -5px rgba(3, 67, 120, 0.4)',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-6px)' },
        },
        pulseSlow: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.5' },
        },
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        float: 'float 4s ease-in-out infinite',
        'pulse-slow': 'pulseSlow 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'fade-in': 'fadeIn 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
      },
    },
  },
  plugins: [],
};
