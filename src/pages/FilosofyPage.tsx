import React, { useState } from 'react';
import { FILOSOFY_SECTIONS } from '../data/filosofyData';
import { SectionHeader } from '../components/filosofy/SectionHeader';
import { SectionContent } from '../components/filosofy/SectionContent';

export const FilosofyPage: React.FC = () => {
  const [activeSectionId, setActiveSectionId] = useState<string>('architecture');

  const activeSection =
    FILOSOFY_SECTIONS.find((s) => s.id === activeSectionId) || FILOSOFY_SECTIONS[0];

  return (
    <div className="min-h-screen py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header */}
      <section className="text-center max-w-3xl mx-auto mb-12 space-y-3">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-regal-blue tracking-tight">
          Development Philosophy & Standards
        </h1>
        <p className="text-base sm:text-lg text-gray-600">
          How I architect robust modern web applications with focus on clean architecture, comprehensive testing, code quality, and maintainability.
        </p>
      </section>

      {/* Main Content with Sidebar */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Sidebar Navigation */}
        <aside className="lg:col-span-4 bg-white rounded-2xl p-4 shadow-sm border border-gray-100 lg:sticky lg:top-28">
          <h2 className="text-xs font-bold text-gray-400 uppercase tracking-wider px-3 py-2">
            Topics & Standards
          </h2>
          <nav className="space-y-1 mt-1">
            {FILOSOFY_SECTIONS.map((section) => {
              const isActive = activeSectionId === section.id;
              return (
                <button
                  key={section.id}
                  type="button"
                  onClick={() => {
                    setActiveSectionId(section.id);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className={`w-full text-left px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 flex items-center justify-between group ${
                    isActive
                      ? 'bg-bermuda/15 text-regal-blue font-semibold border-l-4 border-bermuda shadow-xs'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-regal-blue'
                  }`}
                >
                  <span className="truncate">{section.title}</span>
                  <i
                    className={`fas fa-chevron-right text-xs transition-transform duration-200 ${
                      isActive
                        ? 'text-bermuda translate-x-0'
                        : 'text-gray-300 group-hover:text-gray-400 group-hover:translate-x-0.5'
                    }`}
                  ></i>
                </button>
              );
            })}
          </nav>
        </aside>

        {/* Content Viewer */}
        <main className="lg:col-span-8 bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-gray-100 min-h-[500px]">
          {activeSection && (
            <div>
              <SectionHeader title={activeSection.title} />
              <SectionContent subsections={activeSection.subsections} />
            </div>
          )}
        </main>
      </div>
    </div>
  );
};
