import React from 'react';
import { useTheme } from '../../hooks/useTheme';

export const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';
  const label = isDark ? 'Switch to light theme' : 'Switch to dark theme';

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className="icon-btn"
      aria-label={label}
      title={label}
    >
      <i
        key={theme}
        className={`fas ${isDark ? 'fa-sun' : 'fa-moon'} animate-icon-in text-[0.8rem]`}
        aria-hidden="true"
      ></i>
    </button>
  );
};
