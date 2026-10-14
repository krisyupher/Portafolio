import { useEffect, useRef, useState } from 'react';

interface InViewOptions {
  rootMargin?: string;
  threshold?: number;
}

/**
 * Flips to `true` the first time the element scrolls into view, then stops observing.
 * Without IntersectionObserver (old browsers, jsdom) content is shown immediately.
 */
export function useInView<T extends Element>({
  rootMargin = '0px 0px -8% 0px',
  threshold = 0.15,
}: InViewOptions = {}) {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node || inView) return;

    if (typeof IntersectionObserver === 'undefined') {
      setInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setInView(true);
          observer.disconnect();
        }
      },
      { rootMargin, threshold }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [inView, rootMargin, threshold]);

  return { ref, inView };
}
