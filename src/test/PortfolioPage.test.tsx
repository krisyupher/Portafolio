import { render, screen, fireEvent, within } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { PortfolioPage } from '../pages/PortfolioPage';
import { works } from '../data/content';

const renderPortfolio = () =>
  render(
    <MemoryRouter>
      <PortfolioPage />
    </MemoryRouter>
  );

const featuredCount = works.filter((work) => work.featured).length;

describe('PortfolioPage', () => {
  it('splits projects into featured cards and a compact archive', () => {
    renderPortfolio();

    expect(screen.getByRole('heading', { level: 1, name: /work that ships/i })).toBeInTheDocument();
    expect(
      screen.getByText(`Showing ${works.length} of ${works.length} projects`)
    ).toBeInTheDocument();

    const featured = screen.getByRole('region', { name: 'Featured' });
    expect(within(featured).getAllByRole('article')).toHaveLength(featuredCount);

    const archive = screen.getByRole('list', { name: 'More projects' });
    expect(within(archive).getAllByRole('listitem')).toHaveLength(works.length - featuredCount);
  });

  it('lists the archive newest first', () => {
    renderPortfolio();

    const rows = within(screen.getByRole('list', { name: 'More projects' })).getAllByRole(
      'listitem'
    );
    const years = rows.map((row) => Number(row.firstElementChild?.textContent));
    expect(years).toEqual([...years].sort((a, b) => b - a));
  });

  it('filters by category', () => {
    renderPortfolio();

    const aiFilter = screen.getByRole('button', { name: /^ai & tools/i });
    fireEvent.click(aiFilter);

    expect(aiFilter).toHaveAttribute('aria-pressed', 'true');
    const aiCount = works.filter((work) => work.category === 'AI & Tools').length;
    expect(screen.getByText(`Showing ${aiCount} of ${works.length} projects`)).toBeInTheDocument();
    expect(screen.getByText('Institute AI — Quiz Generation Platform')).toBeInTheDocument();
    expect(screen.queryByText('ESAV — Judicial Digital Ecosystem')).not.toBeInTheDocument();
  });

  it('searches titles, descriptions and technologies', () => {
    renderPortfolio();

    fireEvent.change(screen.getByRole('searchbox', { name: /search projects/i }), {
      target: { value: 'signalr' },
    });

    expect(screen.getByText(`Showing 1 of ${works.length} projects`)).toBeInTheDocument();
    expect(screen.getByText('BrainArena — Real-Time Quiz Arena')).toBeInTheDocument();
  });

  it('shows an empty state that resets the filters', () => {
    renderPortfolio();

    fireEvent.change(screen.getByRole('searchbox', { name: /search projects/i }), {
      target: { value: 'cobol mainframe' },
    });
    expect(screen.getByText('No matching projects')).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: /show all projects/i }));
    expect(
      screen.getByText(`Showing ${works.length} of ${works.length} projects`)
    ).toBeInTheDocument();
  });

  it('opens archive projects in the modal', () => {
    renderPortfolio();

    fireEvent.click(screen.getByRole('button', { name: /view reading teacher project details/i }));
    expect(screen.getByRole('dialog', { name: 'Reading Teacher' })).toBeInTheDocument();
  });
});
