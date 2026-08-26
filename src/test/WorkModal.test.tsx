import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { WorkModal } from '../components/portfolio/WorkModal';
import { Work } from '../types';

const mockWork: Work = {
  id: 'corte-suprema',
  title: 'Corte Suprema de Justicia',
  poster: 'assets/img/CorteSuprema.png',
  description: 'Detailed judicial process digitalization.',
  linkView: 'https://cortesuprema.gov.co',
  date: 'ENE 2023',
  Link: 'https://github.com/krisyupher',
};

describe('WorkModal Component', () => {
  it('renders nothing when work is null', () => {
    const { container } = render(<WorkModal work={null} onClose={vi.fn()} />);
    expect(container.firstChild).toBeNull();
  });

  it('renders modal details and links when work is provided', () => {
    render(<WorkModal work={mockWork} onClose={vi.fn()} />);

    expect(screen.getByRole('dialog')).toBeInTheDocument();
    expect(screen.getByText('Corte Suprema de Justicia')).toBeInTheDocument();
    expect(screen.getByText('Detailed judicial process digitalization.')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /live project demo/i })).toHaveAttribute(
      'href',
      'https://cortesuprema.gov.co'
    );
    expect(screen.getByRole('link', { name: /source \/ details/i })).toHaveAttribute(
      'href',
      'https://github.com/krisyupher'
    );
  });

  it('calls onClose when close button is clicked', () => {
    const onClose = vi.fn();
    render(<WorkModal work={mockWork} onClose={onClose} />);

    const closeBtn = screen.getByRole('button', { name: /close modal/i });
    fireEvent.click(closeBtn);

    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('calls onClose when Escape key is pressed', () => {
    const onClose = vi.fn();
    render(<WorkModal work={mockWork} onClose={onClose} />);

    fireEvent.keyDown(window, { key: 'Escape' });

    expect(onClose).toHaveBeenCalledTimes(1);
  });
});
