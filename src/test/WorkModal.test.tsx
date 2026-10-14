import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { WorkModal } from '../components/portfolio/WorkModal';
import { Work } from '../types';

const mockWork: Work = {
  id: 'corte-suprema',
  title: 'Corte Suprema de Justicia',
  poster: '../assets/img/CorteSuprema.png',
  description: 'Detailed judicial process digitalization.',
  linkView: 'https://cortesuprema.gov.co',
  date: 'JAN 2023',
  Link: 'https://github.com/krisyupher',
  category: 'Enterprise',
  technologies: ['Angular', '.NET'],
  highlights: ['Case processing cut from 4 months to 10 days'],
};

describe('WorkModal Component', () => {
  it('renders nothing when work is null', () => {
    const { container } = render(<WorkModal work={null} onClose={vi.fn()} />);
    expect(container.firstChild).toBeNull();
  });

  it('renders project details, highlights, stack and links', () => {
    render(<WorkModal work={mockWork} onClose={vi.fn()} />);

    const dialog = screen.getByRole('dialog', { name: 'Corte Suprema de Justicia' });
    expect(dialog).toHaveAttribute('aria-modal', 'true');
    expect(screen.getByText('Detailed judicial process digitalization.')).toBeInTheDocument();
    expect(screen.getByText('Case processing cut from 4 months to 10 days')).toBeInTheDocument();
    expect(screen.getByText('.NET')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /visit live site/i })).toHaveAttribute(
      'href',
      'https://cortesuprema.gov.co'
    );
    expect(screen.getByRole('link', { name: /view source/i })).toHaveAttribute(
      'href',
      'https://github.com/krisyupher'
    );
  });

  it('labels LinkedIn links as the organization', () => {
    render(
      <WorkModal
        work={{ ...mockWork, Link: 'https://www.linkedin.com/company/corte-suprema-de-justicia/' }}
        onClose={vi.fn()}
      />
    );

    expect(screen.getByRole('link', { name: /view organization/i })).toBeInTheDocument();
  });

  it('moves focus to the close button and locks page scroll while open', () => {
    const { unmount } = render(<WorkModal work={mockWork} onClose={vi.fn()} />);

    expect(screen.getByRole('button', { name: /close modal/i })).toHaveFocus();
    expect(document.body.style.overflow).toBe('hidden');

    unmount();
    expect(document.body.style.overflow).toBe('');
  });

  it('calls onClose from the close button, the backdrop and Escape', () => {
    const onClose = vi.fn();
    const { container } = render(<WorkModal work={mockWork} onClose={onClose} />);

    fireEvent.click(screen.getByRole('button', { name: /close modal/i }));
    fireEvent.click(container.firstChild as HTMLElement);
    fireEvent.keyDown(window, { key: 'Escape' });

    expect(onClose).toHaveBeenCalledTimes(3);
  });

  it('does not close when clicking inside the dialog', () => {
    const onClose = vi.fn();
    render(<WorkModal work={mockWork} onClose={onClose} />);

    fireEvent.click(screen.getByRole('dialog'));
    expect(onClose).not.toHaveBeenCalled();
  });

  it('navigates with the arrow keys and buttons only when allowed', () => {
    const onPrev = vi.fn();
    const onNext = vi.fn();
    const { rerender } = render(
      <WorkModal work={mockWork} onClose={vi.fn()} onPrev={onPrev} onNext={onNext} hasNext />
    );

    expect(screen.queryByRole('button', { name: /previous project/i })).not.toBeInTheDocument();
    fireEvent.keyDown(window, { key: 'ArrowLeft' });
    expect(onPrev).not.toHaveBeenCalled();

    fireEvent.keyDown(window, { key: 'ArrowRight' });
    fireEvent.click(screen.getByRole('button', { name: /next project/i }));
    expect(onNext).toHaveBeenCalledTimes(2);

    rerender(
      <WorkModal work={mockWork} onClose={vi.fn()} onPrev={onPrev} onNext={onNext} hasPrev />
    );
    fireEvent.keyDown(window, { key: 'ArrowLeft' });
    expect(onPrev).toHaveBeenCalledTimes(1);
  });
});
