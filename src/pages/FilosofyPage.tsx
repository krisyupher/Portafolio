import React, { useState } from 'react';
import { FILOSOFY_SECTIONS } from '../data/filosofyData';
import { SectionHeader } from '../components/filosofy/SectionHeader';
import { SectionContent } from '../components/filosofy/SectionContent';
import { Toast } from '../components/common/Toast';
import { ToastMessage } from '../types';

const SECTION_ICONS: Record<string, string> = {
  architecture: 'fa-sitemap',
  'state-management': 'fa-diagram-project',
  tdd: 'fa-vial-circle-check',
  'eslint-prettier': 'fa-wand-magic-sparkles',
  'git-workflow': 'fa-code-branch',
  tools: 'fa-screwdriver-wrench',
  'best-practices': 'fa-award',
};

export const FilosofyPage: React.FC = () => {
  const [activeSectionId, setActiveSectionId] = useState<string>('architecture');
  const [toast, setToast] = useState<ToastMessage | null>(null);

  const showToast = (text: string) => {
    const id = Date.now().toString();
    setToast({ id, text, type: 'success' });
    setTimeout(() => {
      setToast((curr) => (curr?.id === id ? null : curr));
    }, 3000);
  };

  const activeSection =
    FILOSOFY_SECTIONS.find((s) => s.id === activeSectionId) || FILOSOFY_SECTIONS[0];

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header */}
      <section className="text-center max-w-3xl mx-auto mb-12 space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-bermuda/15 text-regal-blue text-xs font-bold uppercase tracking-wider">
          <i className="fas fa-compass-drafting text-bermuda"></i>
          <span>Engineering Principles</span>
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-extrabold text-regal-blue tracking-tight">
          Development Philosophy & Standards
        </h1>
        <p className="text-base sm:text-lg text-slate-600">
          How I architect robust modern web applications with focus on clean architecture, comprehensive testing, code quality, and maintainability.
        </p>
      </section>

      {/* Main Content with Sidebar */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Sidebar Navigation */}
        <aside className="lg:col-span-4 glass-card rounded-3xl p-5 border border-slate-200/80 lg:sticky lg:top-24">
          <div className="flex items-center justify-between px-3 py-2 mb-2 border-b border-slate-100">
            <h2 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Topics & Standards
            </h2>
            <span className="text-xs font-mono font-bold text-bermuda">
              {FILOSOFY_SECTIONS.length} Modules
            </span>
          </div>

          <nav className="space-y-1.5 mt-2">
            {FILOSOFY_SECTIONS.map((section) => {
              const isActive = activeSectionId === section.id;
              const icon = SECTION_ICONS[section.id] || 'fa-file-code';

              return (
                <button
                  key={section.id}
                  type="button"
                  onClick={() => {
                    setActiveSectionId(section.id);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className={`w-full text-left px-3.5 py-3 rounded-2xl text-xs sm:text-sm font-semibold transition-all duration-200 flex items-center justify-between group ${
                    isActive
                      ? 'bg-regal-blue text-white shadow-md font-bold'
                      : 'text-slate-700 hover:bg-slate-100 hover:text-regal-blue'
                  }`}
                >
                  <div className="flex items-center gap-3 truncate pr-2">
                    <div
                      className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs flex-shrink-0 ${
                        isActive
                          ? 'bg-white/20 text-bermuda'
                          : 'bg-slate-100 text-slate-500 group-hover:text-bermuda'
                      }`}
                    >
                      <i className={`fas ${icon}`}></i>
                    </div>
                    <span className="truncate">{section.title}</span>
                  </div>
                  <i
                    className={`fas fa-chevron-right text-xs transition-transform duration-200 ${
                      isActive
                        ? 'text-bermuda translate-x-0.5'
                        : 'text-slate-300 group-hover:text-slate-500 group-hover:translate-x-1'
                    }`}
                  ></i>
                </button>
              );
            })}
          </nav>
        </aside>

        {/* Content Viewer */}
        <main className="lg:col-span-8 glass-card rounded-3xl p-6 sm:p-10 border border-slate-200/80 min-h-[500px]">
          {activeSection && (
            <div>
              <SectionHeader title={activeSection.title} />
              <SectionContent subsections={activeSection.subsections} onShowToast={showToast} />
            </div>
          )}
        </main>
      </div>

      <Toast toast={toast} onDismiss={() => setToast(null)} />
    </div>
  );
};
