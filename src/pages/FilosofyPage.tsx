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
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="container">
        {/* Header */}
        <section className="text-center max-w-3xl mx-auto mb-12 space-y-3 animate-fadeIn">
          <div
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider"
            style={{ background: 'var(--color-accent-pale)', color: 'var(--color-accent)' }}
          >
            <i className="fas fa-compass-drafting"></i>
            <span>Engineering Principles</span>
          </div>
          <h1
            className="font-heading font-extrabold tracking-tight"
            style={{ fontSize: 'var(--text-display)', color: 'var(--color-brand)' }}
          >
            Development Philosophy & Standards
          </h1>
          <p className="text-body-lg" style={{ color: 'var(--color-ink-muted)' }}>
            How I architect robust modern web applications with focus on clean architecture,
            comprehensive testing, code quality, and maintainability.
          </p>
        </section>

        {/* Main Content with Sidebar */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          {/* Sidebar Navigation */}
          <aside
            className="lg:col-span-4 glass rounded-3xl p-5 border lg:sticky lg:top-24 animate-slideUp"
            style={{ borderColor: 'var(--color-border)' }}
          >
            <div
              className="flex items-center justify-between px-3 py-2 mb-3 border-b"
              style={{ borderColor: 'var(--color-border)' }}
            >
              <h2
                className="text-xs font-bold uppercase tracking-wider"
                style={{ color: 'var(--color-ink-faint)' }}
              >
                Topics & Standards
              </h2>
              <span
                className="text-xs font-mono font-bold"
                style={{ color: 'var(--color-accent)' }}
              >
                {FILOSOFY_SECTIONS.length} Modules
              </span>
            </div>

            <nav className="space-y-1.5 mt-2" role="tablist" aria-label="Philosophy sections">
              {FILOSOFY_SECTIONS.map((section) => {
                const isActive = activeSectionId === section.id;
                const icon = SECTION_ICONS[section.id] || 'fa-file-code';

                return (
                  <button
                    key={section.id}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    onClick={() => {
                      setActiveSectionId(section.id);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className={`w-full text-left px-4 py-3 rounded-2xl text-xs sm:text-sm font-semibold transition-all duration-300 flex items-center justify-between group ${
                      isActive ? 'shadow-md font-bold' : 'hover:shadow-sm'
                    }`}
                    style={{
                      background: isActive ? 'var(--color-brand)' : 'transparent',
                      color: isActive ? 'white' : 'var(--color-ink)',
                      border: isActive ? 'none' : '1px solid transparent',
                    }}
                  >
                    <div className="flex items-center gap-3 truncate pr-2">
                      <div
                        className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs flex-shrink-0 ${
                          isActive ? 'bg-white/20' : 'bg-neutral-100 group-hover:bg-brand-pale'
                        }`}
                        style={{
                          color: isActive ? 'var(--color-accent)' : 'var(--color-ink-muted)',
                          background: isActive
                            ? 'rgba(255,255,255,0.2)'
                            : 'var(--color-paper-subtle)',
                        }}
                      >
                        <i className={`fas ${icon}`}></i>
                      </div>
                      <span className="truncate">{section.title}</span>
                    </div>
                    <i
                      className={`fas fa-chevron-right text-xs transition-transform duration-200 ${
                        isActive ? 'translate-x-0.5' : 'group-hover:translate-x-1'
                      }`}
                      style={{ color: isActive ? 'var(--color-accent)' : 'var(--color-ink-faint)' }}
                    ></i>
                  </button>
                );
              })}
            </nav>
          </aside>

          {/* Content Viewer */}
          <main
            className="lg:col-span-8 glass rounded-3xl p-6 sm:p-10 border min-h-[500px] animate-slideUp delay-1"
            style={{ borderColor: 'var(--color-border)' }}
          >
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
    </div>
  );
};
