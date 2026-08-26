import React, { useState, useEffect } from 'react';
import { Work } from '../types';
import { WorkList } from '../components/portfolio/WorkList';
import { WorkModal } from '../components/portfolio/WorkModal';
import fallbackWorksData from '../assets/data/works.json';

export const PortfolioPage: React.FC = () => {
  const [works, setWorks] = useState<Work[]>(fallbackWorksData as Work[]);
  const [selectedWork, setSelectedWork] = useState<Work | null>(null);
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
        // Fallback data already loaded
        if (isMounted) setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const filteredWorks = works.filter((work) => {
    if (!searchTerm.trim()) return true;
    const term = searchTerm.toLowerCase();
    return (
      work.title.toLowerCase().includes(term) ||
      work.description.toLowerCase().includes(term) ||
      work.date.toLowerCase().includes(term)
    );
  });

  return (
    <div className="min-h-screen py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Portfolio Header */}
      <section className="text-center max-w-3xl mx-auto mb-10 space-y-3">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-regal-blue tracking-tight">
          Featured Projects & Work
        </h1>
        <p className="text-base sm:text-lg text-gray-600">
          A showcase of enterprise applications, scalable full-stack platforms, open-source tools, and interactive prototypes built over 4+ years of development.
        </p>

        {/* Search Bar */}
        <div className="pt-4 max-w-md mx-auto relative">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
            <i className="fas fa-search"></i>
          </div>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search projects by name, technology, or date..."
            className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-full text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-bermuda focus:border-transparent transition-all"
          />
          {searchTerm && (
            <button
              type="button"
              onClick={() => setSearchTerm('')}
              className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-gray-400 hover:text-gray-600"
              aria-label="Clear search"
            >
              <i className="fas fa-times"></i>
            </button>
          )}
        </div>
      </section>

      {/* Loading state */}
      {loading ? (
        <div className="flex flex-col items-center justify-center min-h-[300px] space-y-4">
          <div className="w-12 h-12 border-4 border-gray-200 border-t-regal-blue rounded-full animate-spin-custom"></div>
          <p className="text-gray-600 font-medium">Loading portfolio...</p>
        </div>
      ) : (
        <WorkList
          works={filteredWorks}
          onSelectWork={(work) => setSelectedWork(work)}
        />
      )}

      {/* Work Modal */}
      <WorkModal
        work={selectedWork}
        onClose={() => setSelectedWork(null)}
      />
    </div>
  );
};
