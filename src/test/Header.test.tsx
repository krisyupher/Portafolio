import { render, screen, fireEvent, within } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { Header } from '../components/common/Header';

const renderHeader = (path = '/home') =>
  render(
    <MemoryRouter initialEntries={[path]}>
      <Header />
    </MemoryRouter>
  );

describe('Header Component', () => {
  it('renders brand, role and primary navigation without the retired Philosophy page', () => {
    renderHeader();

    expect(screen.getByText('Cristian Florez')).toBeInTheDocument();
    expect(screen.getByText('Full-Stack Software Engineer')).toBeInTheDocument();

    const nav = screen.getByRole('navigation', { name: 'Primary' });
    expect(within(nav).getByRole('link', { name: 'Home' })).toHaveAttribute('href', '/home');
    expect(within(nav).getByRole('link', { name: 'Projects' })).toHaveAttribute(
      'href',
      '/portfolio'
    );
    expect(within(nav).getByRole('button', { name: 'Contact' })).toBeInTheDocument();
    expect(screen.queryByText(/philosophy/i)).not.toBeInTheDocument();
  });

  it('marks the current route as active', () => {
    renderHeader('/portfolio');

    const nav = screen.getByRole('navigation', { name: 'Primary' });
    expect(within(nav).getByRole('link', { name: 'Projects' })).toHaveAttribute(
      'aria-current',
      'page'
    );
    expect(within(nav).getByRole('link', { name: 'Home' })).not.toHaveAttribute('aria-current');
  });

  it('toggles the mobile menu and closes it with Escape', () => {
    renderHeader();

    const toggleButton = screen.getByRole('button', { name: /toggle navigation menu/i });
    expect(toggleButton).toHaveAttribute('aria-expanded', 'false');

    fireEvent.click(toggleButton);
    expect(toggleButton).toHaveAttribute('aria-expanded', 'true');
    expect(screen.getByRole('navigation', { name: 'Mobile' })).toBeInTheDocument();

    fireEvent.keyDown(window, { key: 'Escape' });
    expect(toggleButton).toHaveAttribute('aria-expanded', 'false');
    expect(screen.queryByRole('navigation', { name: 'Mobile' })).not.toBeInTheDocument();
  });

  it('switches to the condensed style after scrolling', () => {
    const { container } = renderHeader();
    const header = container.querySelector('header');
    expect(header).toHaveAttribute('data-scrolled', 'false');

    window.scrollY = 100;
    fireEvent.scroll(window);
    expect(header).toHaveAttribute('data-scrolled', 'true');

    window.scrollY = 0;
    fireEvent.scroll(window);
  });

  it('links the résumé download to the English PDF', () => {
    renderHeader();

    expect(screen.getByRole('link', { name: /^résumé/i })).toHaveAttribute(
      'href',
      './assets/resumers/Resumen-CristianFlorez.pdf'
    );
  });
});
