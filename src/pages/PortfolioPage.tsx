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
    // Category filter
    const matchesCategory =
      selectedCategory === 'All'
        ? true
        : work.category?.toLowerCase() === selectedCategory.toLowerCase();

    if (!matchesCategory) return false;

    // Search filter
    if (!searchTerm.trim()) return true;
    const term = searchTerm.toLowerCase();
    return (
      work.title.toLowerCase().includes(term) ||
      work.description.toLowerCase().includes(term) ||
      work.date.toLowerCase().includes(term) ||
      (work.technologies && work.technologies.some((t) => t.toLowerCase().includes(term)))
    );
  });

  // Navigation between projects in modal
  const currentIndex = selectedWork ? filteredWorks.findIndex((w) => w.id === selectedWork.id) : -1;
  const hasPrev = currentIndex > 0;
  const hasNext = currentIndex >= 0 && currentIndex < filteredWorks.length - 1;

  const handlePrev = () => {
    if (hasPrev) {
      setSelectedWork(filteredWorks[currentIndex - 1]);
    }
  };

  const handleNext = () => {
    if (hasNext) {
      setSelectedWork(filteredWorks[currentIndex + 1]);
    }
  };

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Portfolio Header */}
      <section className="text-center max-w-3xl mx-auto mb-10 space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-bermuda/15 text-regal-blue text-xs font-bold uppercase tracking-wider">
          <i className="fas fa-layer-group text-bermuda"></i>
          <span>Production Portfolio</span>
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-extrabold text-regal-blue tracking-tight">
          Featured Projects & Work
        </h1>
        <p className="text-base sm:text-lg text-slate-600">
          A showcase of enterprise systems, high-concurrency search platforms, open-source utilities, and interactive applications built over 4+ years of full-stack engineering.
        </p>

        {/* Filter Chips & Search Control Bar */}
        <div className="pt-6 space-y-4">
          {/* Category Chips */}
          <div className="flex flex-wrap items-center justify-center gap-2">
            {CATEGORIES.map((category) => {
              const isActive = selectedCategory === category;
              return (
                <button
                  key={category}
                  type="button"
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-200 ${
                    isActive
                      ? 'bg-regal-blue text-white shadow-md scale-105'
                      : 'bg-white text-slate-600 border border-slate-200 hover:border-bermuda hover:text-regal-blue'
                  }`}
                >
                  {category}
                </button>
              );
            })}
          </div>

          {/* Search Bar */}
          <div className="max-w-md mx-auto relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
              <i className="fas fa-search text-xs"></i>
            </div>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by project name, keyword or tech (e.g. Angular, React)..."
              className="w-full pl-10 pr-10 py-2.5 bg-white border border-slate-200 rounded-full text-xs sm:text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-bermuda focus:border-transparent transition-all"
            />
            {searchTerm && (
              <button
                type="button"
                onClick={() => setSearchTerm('')}
                className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600"
                aria-label="Clear search"
              >
                <i className="fas fa-times text-xs"></i>
              </button>
            )}
          </div>

          {/* Results Count Banner */}
          <div className="flex items-center justify-center gap-2 text-xs font-mono text-slate-500">
            <span>Showing {filteredWorks.length} of {works.length} projects</span>
            {(selectedCategory !== 'All' || searchTerm) && (
              <button
                type="button"
                onClick={() => {
                  setSelectedCategory('All');
                  setSearchTerm('');
                }}
                className="text-bermuda hover:underline font-bold ml-1"
              >
                (Reset filters)
              </button>
            )}
          </div>
        </div>
      </section>

      {/* Loading state */}
      {loading ? (
        <div className="flex flex-col items-center justify-center min-h-[350px] space-y-4">
          <div className="w-12 h-12 border-4 border-slate-200 border-t-bermuda rounded-full animate-spin-custom"></div>
          <p className="text-slate-600 font-semibold text-sm">Loading portfolio catalog...</p>
        </div>
      ) : filteredWorks.length === 0 ? (
        <div className="max-w-md mx-auto my-12 p-8 bg-white rounded-3xl border border-slate-200 text-center space-y-3 shadow-sm">
          <div className="w-12 h-12 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto text-lg">
            <i className="fas fa-filter"></i>
          </div>
          <h3 className="font-heading font-extrabold text-regal-blue text-lg">No matching projects found</h3>
          <p className="text-slate-500 text-xs sm:text-sm">Try tweaking your search term or selecting a different category filter.</p>
          <button
            type="button"
            onClick={() => {
              setSelectedCategory('All');
              setSearchTerm('');
            }}
            className="px-5 py-2 rounded-full bg-regal-blue text-white text-xs font-bold hover:bg-regal-light transition-colors"
          >
            Show All Projects
          </button>
        </div>
      ) : (
        <WorkList
          works={filteredWorks}
          onSelectWork={(work) => setSelectedWork(work)}
        />
      )}

      {/* Work Modal with Prev / Next handlers */}
      <WorkModal
        work={selectedWork}
        onClose={() => setSelectedWork(null)}
        onPrev={handlePrev}
        onNext={handleNext}
        hasPrev={hasPrev}
        hasNext={hasNext}
      />
    </div>
  );
};
