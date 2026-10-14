import React, { useEffect, useState } from 'react';

const RING_PATH = 'M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831';

export const ScrollToTop: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(totalHeight > 0 ? (window.scrollY / totalHeight) * 100 : 0);
      setIsVisible(window.scrollY > 600);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!isVisible) return null;

  return (
    <button
      type="button"
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      aria-label="Scroll back to top"
      className="group fixed bottom-6 right-6 z-30 grid h-12 w-12 animate-fade-in place-items-center rounded-full border border-line bg-paper-raised/90 text-ink shadow-lift backdrop-blur transition-transform duration-300 ease-out-expo hover:-translate-y-1"
    >
      <svg
        className="pointer-events-none absolute inset-0 h-full w-full -rotate-90"
        viewBox="0 0 36 36"
        aria-hidden="true"
      >
        <path d={RING_PATH} fill="none" strokeWidth="2" className="stroke-line" />
        <path
          d={RING_PATH}
          fill="none"
          strokeWidth="2"
          strokeLinecap="round"
          strokeDasharray={`${scrollProgress}, 100`}
          className="stroke-accent"
        />
      </svg>
      <i
        className="fas fa-arrow-up text-[0.8rem] transition-transform duration-300 group-hover:-translate-y-0.5"
        aria-hidden="true"
      ></i>
    </button>
  );
};
