import React, { useState, useEffect } from 'react';
import { Work } from '../types';
import { WorkList } from '../components/portfolio/WorkList';
import { WorkModal } from '../components/portfolio/WorkModal';
import fallbackWorksData from '../assets/data/works.json';

const CATEGORIES = ['All', 'Enterprise', 'FullStack', 'Frontend', 'AI & Tools'];

export const PortfolioPage: React.FC = () => {
  const [works, setWorks] = useState<Work[]>(fallbackWorksData as Work[]);
  const [selectedWork, setSelectedWork] = useState<Work | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let isMounted = true;

    fetch('./assets/data/works.json')
      .then((res) => {
        if (!res.ok) throw new Error('Failed to load portfolio data');
        return res.json();
      })
      .then((data: Work[]) => {
        if (isMounted && Array.isArray(data)) {
          setWorks(data);
          setLoading(false);
        }
      })
      .catch((_err) => {
        if (isMounted) setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const filteredWorks = works.filter((work) => {
    const matchesCategory =
      selectedCategory === 'All'
        ? true
        : work.category?.toLowerCase() === selectedCategory.toLowerCase();
    if (!matchesCategory) return false;
    if (!searchTerm.trim()) return true;
    const term = searchTerm.toLowerCase();
    return (
      work.title.toLowerCase().includes(term) ||
      work.description.toLowerCase().includes(term) ||
      work.date.toLowerCase().includes(term) ||
      (work.technologies && work.technologies.some((t) => t.toLowerCase().includes(term)))
    );
  });

  const currentIndex = selectedWork ? filteredWorks.findIndex((w) => w.id === selectedWork.id) : -1;
  const hasPrev = currentIndex > 0;
  const hasNext = currentIndex >= 0 && currentIndex < filteredWorks.length - 1;

  const handlePrev = () => {
    if (hasPrev) setSelectedWork(filteredWorks[currentIndex - 1]);
  };
  const handleNext = () => {
    if (hasNext) setSelectedWork(filteredWorks[currentIndex + 1]);
  };

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="container">
        {/* Portfolio Header */}
        <section className="text-center max-w-3xl mx-auto mb-10 space-y-3 animate-fadeIn">
          <div
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider"
            style={{ background: 'var(--color-accent-pale)', color: 'var(--color-accent)' }}
          >
            <i className="fas fa-layer-group"></i>
            <span>Production Portfolio</span>
          </div>
          <h1
            className="font-heading font-extrabold tracking-tight"
            style={{ fontSize: 'var(--text-display)', color: 'var(--color-brand)' }}
          >
            Featured Projects & Work
          </h1>
          <p className="text-body-lg" style={{ color: 'var(--color-ink-muted)' }}>
            A showcase of enterprise systems, high-concurrency search platforms, open-source
            utilities, and interactive applications built over 4+ years of full-stack engineering.
          </p>

          {/* Filter Chips & Search Control Bar */}
          <div className="pt-6 space-y-5 animate-slideUp delay-1">
            {/* Category Chips */}
            <div
              className="flex flex-wrap items-center justify-center gap-2"
              role="tablist"
              aria-label="Project categories"
            >
              {CATEGORIES.map((category) => {
                const isActive = selectedCategory === category;
                return (
                  <button
                    key={category}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 ${
                      isActive ? 'shadow-md' : 'hover:shadow-sm'
                    }`}
                    style={{
                      background: isActive ? 'var(--color-brand)' : 'var(--color-paper)',
                      color: isActive ? 'white' : 'var(--color-ink-muted)',
                      border: isActive ? 'none' : '1px solid var(--color-border)',
                      boxShadow: isActive ? '0 4px 16px -4px rgba(3, 67, 120, 0.4)' : undefined,
                    }}
                  >
                    {category}
                  </button>
                );
              })}
            </div>

            {/* Search Bar */}
            <div className="max-w-md mx-auto relative">
              <div
                className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none"
                style={{ color: 'var(--color-ink-faint)' }}
              >
                <i className="fas fa-search text-xs"></i>
              </div>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search by project name, keyword or tech (e.g. Angular, React)..."
                className="input pl-10 pr-10 py-2.5 rounded-full text-xs sm:text-sm"
              />
              {searchTerm && (
                <button
                  type="button"
                  onClick={() => setSearchTerm('')}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center transition-colors"
                  style={{ color: 'var(--color-ink-faint)' }}
                  aria-label="Clear search"
                >
                  <i className="fas fa-times text-xs"></i>
                </button>
              )}
            </div>

            {/* Results Count Banner */}
            <div
              className="flex items-center justify-center gap-2 font-mono"
              style={{ fontSize: 'var(--text-xs)', color: 'var(--color-ink-faint)' }}
            >
              <span>
                Showing {filteredWorks.length} of {works.length} projects
              </span>
              {(selectedCategory !== 'All' || searchTerm) && (
                <button
                  type="button"
                  onClick={() => {
                    setSelectedCategory('All');
                    setSearchTerm('');
                  }}
                  className="font-bold ml-1 transition-colors"
                  style={{ color: 'var(--color-accent)' }}
                >
                  (Reset filters)
                </button>
              )}
            </div>
          </div>
        </section>

        {/* Loading state */}
        {loading ? (
          <div className="flex flex-col items-center justify-center min-h-[350px] space-y-4 animate-fadeIn">
            <div
              className="w-12 h-12 border-4 rounded-full animate-spin-custom"
              style={{ borderColor: 'var(--color-border)', borderTopColor: 'var(--color-accent)' }}
            ></div>
            <p className="font-semibold text-sm" style={{ color: 'var(--color-ink-muted)' }}>
              Loading portfolio catalog...
            </p>
          </div>
        ) : filteredWorks.length === 0 ? (
          <div
            className="max-w-md mx-auto my-12 p-8 glass rounded-3xl border text-center space-y-3"
            style={{ borderColor: 'var(--color-border)' }}
          >
            <div
              className="w-12 h-12 rounded-full flex items-center justify-center mx-auto text-lg"
              style={{ background: 'var(--color-paper-subtle)', color: 'var(--color-ink-faint)' }}
            >
              <i className="fas fa-filter"></i>
            </div>
            <h3
              className="font-heading font-extrabold"
              style={{ fontSize: 'var(--text-h3)', color: 'var(--color-brand)' }}
            >
              No matching projects found
            </h3>
            <p className="text-xs sm:text-sm" style={{ color: 'var(--color-ink-muted)' }}>
              Try tweaking your search term or selecting a different category filter.
            </p>
            <button
              type="button"
              onClick={() => {
                setSelectedCategory('All');
                setSearchTerm('');
              }}
              className="btn btn-primary px-5 py-2 rounded-full text-xs mx-auto"
            >
              Show All Projects
            </button>
          </div>
        ) : (
          <WorkList works={filteredWorks} onSelectWork={(work) => setSelectedWork(work)} />
        )}

        {/* Work Modal */}
        <WorkModal
          work={selectedWork}
          onClose={() => setSelectedWork(null)}
          onPrev={handlePrev}
          onNext={handleNext}
          hasPrev={hasPrev}
          hasNext={hasNext}
        />
      </div>
    </div>
  );
};
