import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { Footer } from '../components/common/Footer';

describe('Footer Component', () => {
  it('renders quick links, technologies, and contact email', () => {
    render(
      <MemoryRouter>
        <Footer contactEmail="ccflorezrud@gmail.com" />
      </MemoryRouter>
    );

    expect(screen.getByText('Quick Links')).toBeInTheDocument();
    expect(screen.getByText('Technologies')).toBeInTheDocument();
    expect(screen.getByText('Connect')).toBeInTheDocument();
    expect(screen.getByText('ccflorezrud@gmail.com')).toBeInTheDocument();

    const currentYear = new Date().getFullYear().toString();
    expect(screen.getByText(new RegExp(currentYear))).toBeInTheDocument();
  });
});
