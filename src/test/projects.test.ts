import { describe, it, expect } from 'vitest';
import {
  getShortTitle,
  getSourceLink,
  getWorkYear,
  matchesFilters,
  normalizeImagePath,
  splitWorks,
} from '../lib/projects';
import { Work } from '../types';

const work = (overrides: Partial<Work>): Work => ({
  id: 'id',
  title: 'Title',
  description: 'Description',
  date: '2024',
  ...overrides,
});

describe('normalizeImagePath', () => {
  it.each([
    ['../assets/img/X.png', './assets/img/X.png'],
    ['../../assets/img/X.png', './assets/img/X.png'],
    ['./assets/img/X.png', './assets/img/X.png'],
    ['/assets/img/X.png', './assets/img/X.png'],
    ['assets/img/X.png', './assets/img/X.png'],
    ['https://cdn.example.com/x.png', 'https://cdn.example.com/x.png'],
    [undefined, ''],
  ])('%s → %s', (input, expected) => {
    expect(normalizeImagePath(input)).toBe(expected);
  });
});

describe('getWorkYear', () => {
  it.each([
    ['OCT 2026', 2026],
    ['2022 – 2024', 2024],
    ['2019', 2019],
    ['Soon', 0],
  ])('%s → %d', (date, expected) => {
    expect(getWorkYear({ date })).toBe(expected);
  });
});

describe('getShortTitle', () => {
  it('drops the descriptive suffix after an em dash', () => {
    expect(getShortTitle('ESAV — Judicial Digital Ecosystem')).toBe('ESAV');
    expect(getShortTitle('Reading Teacher')).toBe('Reading Teacher');
  });
});

describe('matchesFilters', () => {
  const brainArena = work({
    title: 'BrainArena',
    category: 'FullStack',
    technologies: ['ASP.NET Core', 'SignalR'],
  });

  it('filters by category', () => {
    expect(matchesFilters(brainArena, 'All', '')).toBe(true);
    expect(matchesFilters(brainArena, 'FullStack', '')).toBe(true);
    expect(matchesFilters(brainArena, 'Frontend', '')).toBe(false);
  });

  it('searches case-insensitively across title, description, date and technologies', () => {
    expect(matchesFilters(brainArena, 'All', '  signalr ')).toBe(true);
    expect(matchesFilters(brainArena, 'All', 'brainarena')).toBe(true);
    expect(matchesFilters(brainArena, 'All', '2024')).toBe(true);
    expect(matchesFilters(brainArena, 'All', 'kubernetes')).toBe(false);
  });
});

describe('splitWorks', () => {
  it('keeps featured order and sorts the rest newest first', () => {
    const list = [
      work({ id: 'old', date: '2019' }),
      work({ id: 'feature-b', date: '2020', featured: true }),
      work({ id: 'new', date: 'APR 2026' }),
      work({ id: 'feature-a', date: '2026', featured: true }),
      work({ id: 'mid', date: '2021 – 2022' }),
    ];

    const { featured, more } = splitWorks(list);
    expect(featured.map((item) => item.id)).toEqual(['feature-b', 'feature-a']);
    expect(more.map((item) => item.id)).toEqual(['new', 'mid', 'old']);
  });
});

describe('getSourceLink', () => {
  it('classifies GitHub, LinkedIn and other links', () => {
    expect(getSourceLink(work({ Link: 'https://github.com/krisyupher/x' }))?.label).toBe(
      'View source'
    );
    expect(getSourceLink(work({ Link: 'https://www.linkedin.com/company/x' }))?.label).toBe(
      'View organization'
    );
    expect(getSourceLink(work({ Link: 'https://example.com' }))?.label).toBe('View details');
    expect(getSourceLink(work({}))).toBeNull();
  });
});
