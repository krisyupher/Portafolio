import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { Header } from '../components/common/Header';

describe('Header Component', () => {
  it('renders brand name and navigation items', () => {
    render(
      <MemoryRouter>
        <Header brandName="Cristian Florez" />
      </MemoryRouter>
    );

    expect(screen.getByText('Cristian Florez')).toBeInTheDocument();
    expect(screen.getByText('Full-Stack Software Engineer')).toBeInTheDocument();
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('About')).toBeInTheDocument();
    expect(screen.getByText('Portfolio')).toBeInTheDocument();
    expect(screen.getByText('Philosophy & Standards')).toBeInTheDocument();
  });

  it('toggles mobile menu on button click', () => {
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    );

    const toggleButton = screen.getByRole('button', { name: /toggle navigation menu/i });
    expect(toggleButton).toHaveAttribute('aria-expanded', 'false');

    fireEvent.click(toggleButton);
    expect(toggleButton).toHaveAttribute('aria-expanded', 'true');

    fireEvent.click(toggleButton);
    expect(toggleButton).toHaveAttribute('aria-expanded', 'false');
  });

  it('updates scroll state on window scroll', () => {
    const { container } = render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    );

    const headerElement = container.querySelector('header');
    expect(headerElement).not.toHaveClass('shadow-md');

    // Simulate window scroll
    window.scrollY = 100;
    fireEvent.scroll(window);

    expect(headerElement).toHaveClass('shadow-md');
  });
});
