import { render, screen, fireEvent } from '@testing-library/react';
import { afterEach, describe, it, expect, vi } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { Footer } from '../components/common/Footer';

const renderFooter = () =>
  render(
    <MemoryRouter>
      <Footer contactEmail="ccflorezrud@gmail.com" />
    </MemoryRouter>
  );

describe('Footer Component', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('renders the contact call to action, links and current year', () => {
    renderFooter();

    expect(
      screen.getByRole('heading', { level: 2, name: /let's make it fast/i })
    ).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'ccflorezrud@gmail.com' })).toHaveAttribute(
      'href',
      'mailto:ccflorezrud@gmail.com'
    );
    expect(screen.getByText('Connect')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'GitHub' })).toHaveAttribute(
      'href',
      'https://github.com/krisyupher'
    );
    expect(screen.getByRole('link', { name: 'English (PDF)' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Español (PDF)' })).toBeInTheDocument();

    const currentYear = new Date().getFullYear().toString();
    expect(screen.getByText(new RegExp(currentYear))).toBeInTheDocument();
  });

  it('copies the email address and confirms it', async () => {
    const writeText = vi.fn().mockResolvedValue(undefined);
    Object.defineProperty(navigator, 'clipboard', { value: { writeText }, configurable: true });

    renderFooter();
    fireEvent.click(screen.getByRole('button', { name: /copy email/i }));

    expect(writeText).toHaveBeenCalledWith('ccflorezrud@gmail.com');
    expect(await screen.findByRole('button', { name: /copied/i })).toBeInTheDocument();
    expect(screen.getByRole('status')).toHaveTextContent('Email address copied to clipboard');
  });
});
