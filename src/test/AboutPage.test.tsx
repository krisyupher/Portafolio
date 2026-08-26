import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { AboutPage } from '../pages/AboutPage';

describe('AboutPage Component', () => {
  it('renders about header, skills, experience, and education sections', () => {
    render(
      <MemoryRouter>
        <AboutPage />
      </MemoryRouter>
    );

    expect(screen.getByText('Cristian Florez')).toBeInTheDocument();
    expect(screen.getByText('Full-Stack Software Developer')).toBeInTheDocument();
    expect(screen.getByText('Technical Skills & Mastery')).toBeInTheDocument();
    expect(screen.getByText('Professional Experience')).toBeInTheDocument();
    expect(screen.getByText('Education & Certifications')).toBeInTheDocument();
  });
});
