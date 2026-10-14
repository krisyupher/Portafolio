import { useEffect, useState } from 'react';

export type Theme = 'light' | 'dark';

export const THEME_STORAGE_KEY = 'theme';
const DARK_QUERY = '(prefers-color-scheme: dark)';

const getExplicitTheme = (): Theme | null => {
  const value = document.documentElement.dataset.theme;
  return value === 'light' || value === 'dark' ? value : null;
};

const getSystemTheme = (): Theme => (window.matchMedia?.(DARK_QUERY).matches ? 'dark' : 'light');

/**
 * The active color theme. index.html applies a saved choice before first paint by setting
 * `data-theme` on <html>; without one, the CSS tokens follow `prefers-color-scheme`.
 */
export function useTheme() {
  const [theme, setTheme] = useState<Theme>(() => getExplicitTheme() ?? getSystemTheme());

  // Track OS-level changes until the visitor picks a theme explicitly.
  useEffect(() => {
    const media = window.matchMedia?.(DARK_QUERY);
    if (!media) return;
    const handleChange = () => {
      if (!getExplicitTheme()) setTheme(media.matches ? 'dark' : 'light');
    };
    media.addEventListener('change', handleChange);
    return () => media.removeEventListener('change', handleChange);
  }, []);

  const toggleTheme = () => {
    const next: Theme = theme === 'dark' ? 'light' : 'dark';
    document.documentElement.dataset.theme = next;
    try {
      localStorage.setItem(THEME_STORAGE_KEY, next);
    } catch {
      // Storage can be unavailable (private mode); the choice still applies for this visit.
    }
    setTheme(next);
  };

  return { theme, toggleTheme };
}
