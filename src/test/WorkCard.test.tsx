import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { WorkCard } from '../components/portfolio/WorkCard';
import { Work } from '../types';

const mockWork: Work = {
  id: 'corte-suprema',
  title: 'Corte Suprema de Justicia',
  poster: '../assets/img/CorteSuprema.png',
  description: 'Modernized official judicial portal for Colombia.',
  linkView: 'https://cortesuprema.gov.co',
  date: 'JAN 2023',
  Link: 'https://github.com/krisyupher',
  category: 'Enterprise',
  technologies: ['Angular', 'TypeScript', 'Node.js', '.NET', 'PostgreSQL'],
  highlights: ['40% faster page loads'],
};

describe('WorkCard Component', () => {
  it('renders category, date, title and description', () => {
    render(<WorkCard work={mockWork} onOpenModal={vi.fn()} />);

    expect(screen.getByText('Enterprise')).toBeInTheDocument();
    expect(screen.getByText('JAN 2023')).toBeInTheDocument();
    expect(screen.getByText('Corte Suprema de Justicia')).toBeInTheDocument();
    expect(
      screen.getByText('Modernized official judicial portal for Colombia.')
    ).toBeInTheDocument();
    expect(screen.getByText(/Angular · TypeScript · Node\.js · \.NET/)).toBeInTheDocument();
    expect(screen.getByText('+1')).toBeInTheDocument();
  });

  it('serves the poster from the public assets folder', () => {
    render(<WorkCard work={mockWork} onOpenModal={vi.fn()} />);

    expect(screen.getByRole('img')).toHaveAttribute('src', './assets/img/CorteSuprema.png');
  });

  it('triggers onOpenModal when the details button is clicked', () => {
    const onOpenModal = vi.fn();
    render(<WorkCard work={mockWork} onOpenModal={onOpenModal} />);

    fireEvent.click(
      screen.getByRole('button', { name: /view corte suprema de justicia project details/i })
    );

    expect(onOpenModal).toHaveBeenCalledWith(mockWork);
  });

  it('labels live and source links', () => {
    render(<WorkCard work={mockWork} onOpenModal={vi.fn()} />);

    expect(
      screen.getByRole('link', { name: /visit the live site for corte suprema/i })
    ).toHaveAttribute('href', 'https://cortesuprema.gov.co');
    expect(screen.getByRole('link', { name: /view source for corte suprema/i })).toHaveAttribute(
      'href',
      'https://github.com/krisyupher'
    );
  });

  it('uses a typographic cover when there is no poster or it fails to load', () => {
    const { rerender } = render(
      <WorkCard
        work={{ ...mockWork, poster: undefined, title: 'BrainArena — Real-Time Quiz Arena' }}
        onOpenModal={vi.fn()}
      />
    );
    expect(screen.queryByRole('img')).not.toBeInTheDocument();
    expect(screen.getByText('BrainArena')).toBeInTheDocument();

    rerender(<WorkCard work={mockWork} onOpenModal={vi.fn()} />);
    fireEvent.error(screen.getByRole('img'));
    expect(screen.queryByRole('img')).not.toBeInTheDocument();
    expect(screen.getAllByText('Corte Suprema de Justicia').length).toBeGreaterThanOrEqual(2);
  });

  it('shows highlights only in the feature variant', () => {
    const { rerender } = render(<WorkCard work={mockWork} onOpenModal={vi.fn()} />);
    expect(screen.queryByText('40% faster page loads')).not.toBeInTheDocument();

    rerender(<WorkCard work={mockWork} onOpenModal={vi.fn()} variant="feature" />);
    expect(screen.getByText('40% faster page loads')).toBeInTheDocument();
  });
});
