import React from 'react';
import { CATEGORY_LABELS } from '../../lib/projects';
import { cn } from '../../lib/cn';
import { Work } from '../../types';
import { WorkCover } from './WorkCover';
import { WorkLinks } from './WorkLinks';

interface WorkCardProps {
  work: Work;
  onOpenModal: (work: Work) => void;
  /** `feature` renders a wide, horizontal card for the lead project. */
  variant?: 'default' | 'feature';
}

export const WorkCard: React.FC<WorkCardProps> = ({ work, onOpenModal, variant = 'default' }) => {
  const isFeature = variant === 'feature';
  const technologies = work.technologies ?? [];

  return (
    <article
      data-testid={`work-card-${work.id}`}
      className={cn(
        'group relative flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-paper-raised transition duration-500 ease-out-expo',
        'hover:-translate-y-1 hover:border-line-strong hover:shadow-lift',
        'has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-accent',
        isFeature && 'lg:grid lg:grid-cols-12'
      )}
    >
      <WorkCover
        work={work}
        eager={isFeature}
        className={cn(
          'aspect-[16/10]',
          isFeature && 'lg:col-span-7 lg:aspect-auto lg:min-h-[27rem]'
        )}
      />

      <div
        className={cn(
          'flex flex-1 flex-col p-6 sm:p-7',
          isFeature && 'lg:col-span-5 lg:justify-center lg:p-10'
        )}
      >
        <p className="flex flex-wrap items-center gap-x-2 font-mono text-[0.68rem] uppercase tracking-[0.14em] text-ink-muted">
          {work.category && (
            <>
              <span className="text-accent-ink">{CATEGORY_LABELS[work.category]}</span>
              <span className="text-ink-faint" aria-hidden="true">
                /
              </span>
            </>
          )}
          <span>{work.date}</span>
        </p>

        <h3
          className={cn(
            'mt-3 font-semibold leading-tight tracking-tight text-ink',
            isFeature ? 'text-2xl sm:text-3xl' : 'text-xl'
          )}
        >
          <button
            type="button"
            onClick={() => onOpenModal(work)}
            aria-label={`View ${work.title} project details`}
            className="text-left after:absolute after:inset-0 after:content-[''] focus-visible:outline-none"
          >
            {work.title}
          </button>
        </h3>

        <p
          className={cn(
            'mt-3 leading-relaxed text-ink-muted',
            isFeature ? 'line-clamp-4' : 'line-clamp-3 text-[0.95rem]'
          )}
        >
          {work.description}
        </p>

        {isFeature && work.highlights && (
          <ul className="mt-6 space-y-2.5">
            {work.highlights.slice(0, 3).map((highlight) => (
              <li key={highlight} className="flex gap-3 text-sm text-ink-soft">
                <span
                  className="mt-[0.45rem] h-1.5 w-1.5 shrink-0 rounded-full bg-accent"
                  aria-hidden="true"
                />
                {highlight}
              </li>
            ))}
          </ul>
        )}

        {technologies.length > 0 && (
          <p className="mt-5 font-mono text-[0.7rem] leading-relaxed text-ink-muted">
            {technologies.slice(0, isFeature ? 6 : 4).join(' · ')}
            {technologies.length > (isFeature ? 6 : 4) && (
              <span className="text-ink-faint"> +{technologies.length - (isFeature ? 6 : 4)}</span>
            )}
          </p>
        )}

        <div className="mt-auto flex items-center justify-between gap-4 pt-6">
          <span
            className="inline-flex items-center gap-2 text-sm font-semibold text-ink"
            aria-hidden="true"
          >
            View details
            <i className="fas fa-arrow-right text-[0.7rem] text-accent-ink transition-transform duration-300 ease-out-expo group-hover:translate-x-1"></i>
          </span>
          <WorkLinks work={work} />
        </div>
      </div>
    </article>
  );
};
