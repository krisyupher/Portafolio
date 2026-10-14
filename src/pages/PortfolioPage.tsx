import React, { useMemo, useState } from 'react';
import { Reveal } from '../components/common/Reveal';
import { WorkArchive } from '../components/portfolio/WorkArchive';
import { WorkList } from '../components/portfolio/WorkList';
import { WorkModal } from '../components/portfolio/WorkModal';
import { works } from '../data/content';
import { SITE } from '../data/site';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import { useWorkModal } from '../hooks/useWorkModal';
import { cn } from '../lib/cn';
import {
  CATEGORIES,
  CATEGORY_LABELS,
  CategoryFilter,
  matchesFilters,
  splitWorks,
} from '../lib/projects';

const FILTERS: CategoryFilter[] = ['All', ...CATEGORIES];
const FILTER_LABELS: Record<CategoryFilter, string> = { All: 'All', ...CATEGORY_LABELS };

const countFor = (filter: CategoryFilter) =>
  filter === 'All' ? works.length : works.filter((work) => work.category === filter).length;

export const PortfolioPage: React.FC = () => {
  useDocumentTitle(`Projects — ${SITE.name}`);
  const [category, setCategory] = useState<CategoryFilter>('All');
  const [searchTerm, setSearchTerm] = useState('');

  const { featured, more } = useMemo(
    () => splitWorks(works.filter((work) => matchesFilters(work, category, searchTerm))),
    [category, searchTerm]
  );
  // Modal prev/next follows the on-screen order: featured first, then the archive.
  const visible = useMemo(() => [...featured, ...more], [featured, more]);
  const modal = useWorkModal(visible);
  const isFiltered = category !== 'All' || searchTerm.trim() !== '';

  const resetFilters = () => {
    setCategory('All');
    setSearchTerm('');
  };

  return (
    <>
      <section aria-labelledby="projects-title">
        <div className="container-page pb-12 pt-14 sm:pt-20 lg:pt-24">
          <p className="eyebrow animate-rise">
            <span className="text-accent-ink">Projects</span>
            <span className="mx-2 text-ink-faint" aria-hidden="true">
              /
            </span>
            {works.length} builds
          </p>
          <h1
            id="projects-title"
            className="mt-6 max-w-4xl animate-rise text-display-lg font-semibold text-ink"
            style={{ animationDelay: '90ms' }}
          >
            Work that ships — and keeps running.
          </h1>
          <p
            className="mt-6 max-w-2xl animate-rise text-base leading-relaxed text-ink-muted sm:text-lg"
            style={{ animationDelay: '180ms' }}
          >
            Enterprise platforms for Colombia&apos;s Supreme Court and banking, real-time and
            AI-powered builds, and the experiments in between.
          </p>

          <div
            className="mt-12 flex animate-rise flex-col gap-4 border-y border-line py-5 lg:flex-row lg:items-center lg:justify-between"
            style={{ animationDelay: '270ms' }}
          >
            <div className="flex flex-wrap gap-2" role="group" aria-label="Filter by category">
              {FILTERS.map((filter) => {
                const isActive = category === filter;
                return (
                  <button
                    key={filter}
                    type="button"
                    aria-pressed={isActive}
                    onClick={() => setCategory(filter)}
                    className={cn(
                      'inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition duration-300 ease-out-expo',
                      isActive
                        ? 'border-ink bg-ink text-paper'
                        : 'border-line bg-paper-raised text-ink-muted hover:border-line-strong hover:text-ink'
                    )}
                  >
                    {FILTER_LABELS[filter]}
                    <span
                      className={cn(
                        'font-mono text-[0.68rem]',
                        isActive ? 'text-paper/60' : 'text-ink-faint'
                      )}
                    >
                      {countFor(filter)}
                    </span>
                  </button>
                );
              })}
            </div>

            <div className="relative w-full lg:max-w-xs">
              <label htmlFor="project-search" className="sr-only">
                Search projects
              </label>
              <i
                className="fas fa-magnifying-glass pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[0.75rem] text-ink-muted"
                aria-hidden="true"
              ></i>
              <input
                id="project-search"
                type="search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search by name or technology"
                autoComplete="off"
                className="w-full rounded-full border border-line bg-paper-raised py-2.5 pl-10 pr-4 text-sm text-ink placeholder:text-ink-muted/80 transition focus:border-accent focus:outline-none focus:ring-4 focus:ring-accent/15 [&::-webkit-search-cancel-button]:hidden"
              />
            </div>
          </div>

          <p
            className="mt-4 font-mono text-[0.7rem] uppercase tracking-[0.14em] text-ink-muted"
            aria-live="polite"
          >
            Showing {visible.length} of {works.length} projects
            {isFiltered && (
              <button
                type="button"
                onClick={resetFilters}
                className="ml-3 text-accent-ink underline-offset-4 hover:underline"
              >
                Reset filters
              </button>
            )}
          </p>
        </div>
      </section>

      <div className="container-page pb-28 sm:pb-32">
        {featured.length > 0 && (
          <section aria-labelledby="featured-title">
            <h2 id="featured-title" className="eyebrow">
              Featured
            </h2>
            <WorkList works={featured} onSelectWork={modal.open} className="mt-6" />
          </section>
        )}

        {more.length > 0 && (
          <section aria-labelledby="more-title" className={cn(featured.length > 0 && 'mt-20')}>
            <Reveal>
              <h2 id="more-title" className="eyebrow">
                More projects &amp; experiments
              </h2>
            </Reveal>
            <Reveal delay={80} className="mt-6">
              <WorkArchive works={more} onSelectWork={modal.open} />
            </Reveal>
          </section>
        )}

        {visible.length === 0 && (
          <div className="mx-auto max-w-md rounded-3xl border border-dashed border-line-strong px-8 py-16 text-center">
            <p className="font-display text-2xl font-semibold tracking-tight text-ink">
              No matching projects
            </p>
            <p className="mt-3 text-sm text-ink-muted">
              Try another technology or clear the filters.
            </p>
            <button type="button" onClick={resetFilters} className="btn btn-primary mt-8">
              Show all projects
            </button>
          </div>
        )}
      </div>

      <WorkModal
        work={modal.selected}
        onClose={modal.close}
        onPrev={modal.prev}
        onNext={modal.next}
        hasPrev={modal.hasPrev}
        hasNext={modal.hasNext}
      />
    </>
  );
};
