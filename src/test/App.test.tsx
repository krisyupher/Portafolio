import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import App from '../App';

const renderAt = (path: string) =>
  render(
    <MemoryRouter initialEntries={[path]}>
      <App />
    </MemoryRouter>
  );

describe('App Component', () => {
  it('renders the shell: skip link, header, main content and contact footer', () => {
    renderAt('/home');

    expect(screen.getByRole('link', { name: /skip to content/i })).toBeInTheDocument();
    expect(screen.getByRole('banner')).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 1, name: 'Cristian Florez' })).toBeInTheDocument();
    expect(screen.getByRole('contentinfo')).toBeInTheDocument();
    expect(screen.getByText('Connect')).toBeInTheDocument();
  });

  it('renders the projects page', () => {
    renderAt('/portfolio');

    expect(screen.getByRole('heading', { level: 1, name: /work that ships/i })).toBeInTheDocument();
  });

  it.each(['/', '/about', '/filosofy', '/does-not-exist'])('redirects %s to home', (path) => {
    renderAt(path);

    expect(screen.getByRole('heading', { level: 1, name: 'Cristian Florez' })).toBeInTheDocument();
    expect(screen.queryByText(/development philosophy/i)).not.toBeInTheDocument();
  });
});
