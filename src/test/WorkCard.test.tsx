import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { WorkCard } from '../components/portfolio/WorkCard';
import { Work } from '../types';

const mockWork: Work = {
  id: 'corte-suprema',
  title: 'Corte Suprema de Justicia',
  poster: 'assets/img/CorteSuprema.png',
  description: 'Modernized official judicial portal for Colombia.',
  linkView: 'https://cortesuprema.gov.co',
  date: 'ENE 2023',
  Link: 'https://github.com/krisyupher',
};

describe('WorkCard Component', () => {
  it('renders work title, date, and description', () => {
    render(<WorkCard work={mockWork} onOpenModal={vi.fn()} />);

    expect(screen.getByText('Corte Suprema de Justicia')).toBeInTheDocument();
    expect(screen.getByText('ENE 2023')).toBeInTheDocument();
    expect(
      screen.getByText('Modernized official judicial portal for Colombia.')
    ).toBeInTheDocument();
  });

  it('triggers onOpenModal callback when View Project button is clicked', () => {
    const onOpenModal = vi.fn();
    render(<WorkCard work={mockWork} onOpenModal={onOpenModal} />);

    const button = screen.getByRole('button', {
      name: /view corte suprema de justicia project details/i,
    });
    fireEvent.click(button);

    expect(onOpenModal).toHaveBeenCalledWith(mockWork);
  });
});
