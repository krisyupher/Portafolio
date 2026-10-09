import React, { useState, useEffect } from 'react';

export const ScrollToTop: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = totalHeight > 0 ? (window.scrollY / totalHeight) * 100 : 0;
      setScrollProgress(progress);
      setIsVisible(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (!isVisible) return null;

  return (
    <button
      type="button"
      onClick={scrollToTop}
      aria-label="Scroll back to top"
      className="fixed bottom-6 left-6 z-40 w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 group shadow-xl"
      style={{
        background: 'var(--color-paper)',
        border: '1px solid var(--color-border)',
        color: 'var(--color-brand)',
        boxShadow: '0 8px 32px -8px rgba(10, 15, 26, 0.2)',
      }}
    >
      {/* Circular progress SVG */}
      <svg
        className="absolute inset-0 w-full h-full -rotate-90 pointer-events-none"
        viewBox="0 0 36 36"
      >
        <path
          className="transition-all duration-150"
          strokeWidth="3"
          stroke="currentColor"
          fill="none"
          d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
          style={{ color: 'var(--color-border)' }}
        />
        <path
          className="transition-all duration-150"
          strokeDasharray={`${scrollProgress}, 100`}
          strokeWidth="3"
          strokeLinecap="round"
          stroke="currentColor"
          fill="none"
          d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
          style={{ color: 'var(--color-accent)' }}
        />
      </svg>
      <i
        className="fas fa-arrow-up text-sm transform group-hover:-translate-y-0.5 transition-transform"
        style={{ color: 'var(--color-brand)' }}
      ></i>
    </button>
  );
};
