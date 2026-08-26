import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { AboutPage } from '../pages/AboutPage';

describe('AboutPage Component', () => {
  it('renders about header, skills, experience, and education sections', () => {
    render(<AboutPage />);

    expect(screen.getByText('Cristian Florez')).toBeInTheDocument();
    expect(screen.getByText('Full-Stack Software Developer')).toBeInTheDocument();
    expect(screen.getByText('Technical Skills & Expertise')).toBeInTheDocument();
    expect(screen.getByText('Professional Experience')).toBeInTheDocument();
    expect(screen.getByText('Education & Certifications')).toBeInTheDocument();
  });
});
