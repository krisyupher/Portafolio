import { act, render, screen } from '@testing-library/react';
import { afterEach, describe, it, expect, vi } from 'vitest';
import { Reveal } from '../components/common/Reveal';

describe('Reveal', () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('shows content immediately when IntersectionObserver is unavailable', () => {
    render(<Reveal>Visible</Reveal>);
    expect(screen.getByText('Visible')).toHaveClass('reveal', 'is-visible');
  });

  it('reveals content once it intersects, then stops observing', () => {
    let trigger: (entries: Array<Partial<IntersectionObserverEntry>>) => void = () => {};
    const disconnect = vi.fn();

    vi.stubGlobal(
      'IntersectionObserver',
      class {
        constructor(callback: (entries: Array<Partial<IntersectionObserverEntry>>) => void) {
          trigger = callback;
        }
        observe = vi.fn();
        disconnect = disconnect;
      }
    );

    render(
      <Reveal delay={120} className="extra">
        Later
      </Reveal>
    );
    const element = screen.getByText('Later');
    expect(element).toHaveClass('reveal', 'extra');
    expect(element).not.toHaveClass('is-visible');
    expect(element.style.getPropertyValue('--reveal-delay')).toBe('120ms');

    act(() => trigger([{ isIntersecting: false }]));
    expect(element).not.toHaveClass('is-visible');

    act(() => trigger([{ isIntersecting: true }]));
    expect(element).toHaveClass('is-visible');
    expect(disconnect).toHaveBeenCalled();
  });
});
