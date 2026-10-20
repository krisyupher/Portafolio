import { render, screen, fireEvent, within } from '@testing-library/react';
import { afterEach, describe, it, expect, vi } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { HomePage } from '../pages/HomePage';

const renderHome = () =>
  render(
    <MemoryRouter>
      <HomePage />
    </MemoryRouter>
  );

describe('HomePage', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('renders the hero, impact metrics and every section', () => {
    renderHome();

    expect(screen.getByRole('heading', { level: 1, name: 'Cristian Florez' })).toBeInTheDocument();
    expect(screen.getByText(/building secure, reliable platforms/i)).toBeInTheDocument();
    expect(screen.getByRole('region', { name: 'Impact highlights' })).toBeInTheDocument();
    expect(screen.getByText('500k+')).toBeInTheDocument();

    for (const title of [
      'Platforms built to perform',
      "Where I've shipped",
      'Tools I rely on in production',
      'Foundations',
    ]) {
      expect(screen.getByRole('heading', { level: 2, name: title })).toBeInTheDocument();
    }
  });

  it('sets the document title', () => {
    renderHome();
    expect(document.title).toBe('Cristian Florez — Full-Stack Software Engineer');
  });

  it('features the AI engineering toolkit', () => {
    renderHome();

    const aiTools = screen.getByRole('list', { name: 'AI Engineering tools' });
    for (const tool of [
      'Claude',
      'Claude Code',
      'OpenCode',
      'Gemini',
      'AI Agents',
      'Spec-Driven Development (SDD)',
    ]) {
      expect(within(aiTools).getByText(tool)).toBeInTheDocument();
    }
  });

  it('shows no proficiency labels in the stack', () => {
    renderHome();

    const stack = screen.getByRole('region', { name: 'Tools I rely on in production' });
    expect(within(stack).queryByText(/^(expert|advanced|intermediate|beginner)$/i)).toBeNull();
  });

  it('previews four featured projects, leading with a feature card', () => {
    renderHome();

    const work = screen.getByRole('region', { name: 'Platforms built to perform' });
    expect(within(work).getAllByRole('article')).toHaveLength(4);
    expect(within(work).getByRole('link', { name: /all projects/i })).toHaveAttribute(
      'href',
      '/portfolio'
    );
  });

  it('opens a project in the modal and navigates to the next one', () => {
    renderHome();

    fireEvent.click(
      screen.getByRole('button', { name: /view supremo buscador .* project details/i })
    );
    expect(screen.getByRole('dialog', { name: /supremo buscador/i })).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: /next project/i }));
    expect(screen.getByRole('dialog', { name: /brainarena/i })).toBeInTheDocument();
  });

  it('copies the email address from the hero', async () => {
    const writeText = vi.fn().mockResolvedValue(undefined);
    Object.defineProperty(navigator, 'clipboard', { value: { writeText }, configurable: true });

    renderHome();
    fireEvent.click(screen.getByRole('button', { name: /copy email/i }));

    expect(writeText).toHaveBeenCalledWith('ccflorezrud@gmail.com');
    expect(await screen.findByRole('button', { name: /email copied/i })).toBeInTheDocument();
  });
});
