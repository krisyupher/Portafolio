import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import App from '../App';

describe('App Component', () => {
  it('renders application with header, main content, and footer', () => {
    render(
      <MemoryRouter initialEntries={['/home']}>
        <App />
      </MemoryRouter>
    );

    // Header brand & page elements
    expect(screen.getAllByText('Cristian Florez').length).toBeGreaterThanOrEqual(1);

    // Main content (home/about page)
    expect(screen.getByText('Technical Skills & Mastery')).toBeInTheDocument();

    // Footer
    expect(screen.getByText('Connect')).toBeInTheDocument();
  });

  it('navigates to portfolio page correctly', () => {
    render(
      <MemoryRouter initialEntries={['/portfolio']}>
        <App />
      </MemoryRouter>
    );

    expect(screen.getByText('Featured Projects & Work')).toBeInTheDocument();
  });

  it('navigates to filosofy page correctly', () => {
    render(
      <MemoryRouter initialEntries={['/filosofy']}>
        <App />
      </MemoryRouter>
    );

    expect(screen.getByText('Development Philosophy & Standards')).toBeInTheDocument();
  });
});
