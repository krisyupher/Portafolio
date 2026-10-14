import React from 'react';
import { CATEGORY_LABELS, getWorkYear } from '../../lib/projects';
import { Work } from '../../types';
import { WorkLinks } from './WorkLinks';

interface WorkArchiveProps {
  works: Work[];
  onSelectWork: (work: Work) => void;
}

const ROW_GRID =
  'grid grid-cols-[3.25rem_minmax(0,1fr)_auto] items-center gap-4 md:grid-cols-[4.5rem_minmax(0,1.25fr)_7.5rem_minmax(0,1.5fr)_5rem]';

/** Compact, table-like list for smaller projects and experiments. */
export const WorkArchive: React.FC<WorkArchiveProps> = ({ works, onSelectWork }) => (
  <div className="overflow-hidden rounded-2xl border border-line bg-paper-raised">
    <div
      aria-hidden="true"
      className={`${ROW_GRID} hidden border-b border-line px-6 py-3 font-mono text-[0.65rem] uppercase tracking-[0.16em] text-ink-muted md:grid`}
    >
      <span>Year</span>
      <span>Project</span>
      <span>Type</span>
      <span>Built with</span>
      <span className="text-right">Links</span>
    </div>

    <ul aria-label="More projects">
      {works.map((work) => (
        <li
          key={work.id}
          data-testid={`archive-row-${work.id}`}
          className={`${ROW_GRID} group relative border-b border-line px-5 py-4 transition-colors duration-200 last:border-b-0 hover:bg-paper-sunken/70 md:px-6`}
        >
          <span className="font-mono text-xs text-ink-muted">{getWorkYear(work) || '—'}</span>

          <div className="min-w-0">
            <button
              type="button"
              onClick={() => onSelectWork(work)}
              aria-label={`View ${work.title} project details`}
              className="text-left font-display text-[1.05rem] font-semibold tracking-tight text-ink transition-colors after:absolute after:inset-0 after:content-[''] group-hover:text-accent-ink focus-visible:outline-none"
            >
              {work.title}
            </button>
            <p className="mt-0.5 truncate font-mono text-[0.68rem] text-ink-muted md:hidden">
              {(work.technologies ?? []).slice(0, 3).join(' · ')}
            </p>
          </div>

          <span className="hidden font-mono text-[0.68rem] uppercase tracking-[0.12em] text-accent-ink md:block">
            {work.category ? CATEGORY_LABELS[work.category] : ''}
          </span>

          <p className="hidden truncate text-sm text-ink-muted md:block">
            {(work.technologies ?? []).join(' · ')}
          </p>

          <div className="flex justify-end">
            <WorkLinks work={work} />
          </div>
        </li>
      ))}
    </ul>
  </div>
);
