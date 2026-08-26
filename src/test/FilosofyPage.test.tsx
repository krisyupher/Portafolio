import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { FilosofyPage } from '../pages/FilosofyPage';

describe('FilosofyPage Component', () => {
  it('renders philosophy header and default architecture section', () => {
    render(<FilosofyPage />);

    expect(screen.getByText('Development Philosophy & Standards')).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 2, name: /project architecture/i })).toBeInTheDocument();
  });

  it('switches active section when sidebar topic is clicked', () => {
    render(<FilosofyPage />);

    const tddButton = screen.getByRole('button', { name: /test-driven development/i });
    fireEvent.click(tddButton);

    expect(
      screen.getByRole('heading', { level: 2, name: /test-driven development/i })
    ).toBeInTheDocument();
    expect(screen.getByText('Red-Green-Refactor Cycle')).toBeInTheDocument();
  });
});
