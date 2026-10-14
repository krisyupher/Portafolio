import { existsSync } from 'fs';
import path from 'path';
import { describe, it, expect } from 'vitest';
import { about, works } from '../data/content';
import { CATEGORIES, getWorkYear, normalizeImagePath } from '../lib/projects';

const PUBLIC_DIR = path.resolve(__dirname, '../../public');

describe('works.json content', () => {
  it('has unique ids and the required fields', () => {
    const ids = works.map((work) => work.id);
    expect(new Set(ids).size).toBe(ids.length);

    for (const work of works) {
      expect(work.title.trim(), work.id).not.toBe('');
      expect(work.description.trim(), work.id).not.toBe('');
      expect(getWorkYear(work), `${work.id} date "${work.date}"`).toBeGreaterThan(2000);
      expect(CATEGORIES, work.id).toContain(work.category);
    }
  });

  it('only links to absolute https URLs', () => {
    for (const work of works) {
      for (const url of [work.linkView, work.Link].filter(Boolean)) {
        expect(url, work.id).toMatch(/^https:\/\//);
      }
    }
  });

  it('references poster images that exist in public/ (where they are served from)', () => {
    for (const work of works.filter((item) => item.poster)) {
      const file = path.join(PUBLIC_DIR, normalizeImagePath(work.poster));
      expect(existsSync(file), `${work.id}: ${file}`).toBe(true);
    }
  });

  it('features enough projects to fill the home page preview', () => {
    expect(works.filter((work) => work.featured).length).toBeGreaterThanOrEqual(4);
  });
});

describe('about.json content', () => {
  it('leads the stack with AI engineering', () => {
    const [first] = about.stack;
    expect(first.name).toBe('AI Engineering');
    expect(first.items).toEqual(
      expect.arrayContaining([
        'Claude',
        'Claude Code',
        'OpenCode',
        'Gemini',
        'Spec-Driven Development (SDD)',
        'AI Agents',
      ])
    );
  });

  it('carries no proficiency levels', () => {
    expect(JSON.stringify(about)).not.toMatch(/"proficiency"|levelPercentage/);
  });

  it('gives every role achievements and technologies', () => {
    for (const job of about.experience) {
      expect(job.achievements.length, job.id).toBeGreaterThan(0);
      expect(job.technologies.length, job.id).toBeGreaterThan(0);
    }
  });
});
