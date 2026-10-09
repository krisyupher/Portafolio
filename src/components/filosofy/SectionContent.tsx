import React, { useState } from 'react';
import { Subsection } from '../../types';

interface SectionContentProps {
  subsections?: Subsection[];
  onShowToast?: (text: string) => void;
}

export const SectionContent: React.FC<SectionContentProps> = ({ subsections, onShowToast }) => {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  if (!subsections || subsections.length === 0) return null;

  const handleCopy = (code: string, index: number) => {
    navigator.clipboard.writeText(code);
    setCopiedIndex(index);
    if (onShowToast) onShowToast('Code snippet copied to clipboard!');
    setTimeout(() => setCopiedIndex(null), 2500);
  };

  return (
    <div className="space-y-10">
      {subsections.map((subsection, index) => (
        <div
          key={subsection.title}
          className="space-y-5 animate-slideUp"
          style={{ animationDelay: `${index * 100}ms` }}
        >
          <div className="flex items-center gap-3">
            <div
              className="w-1.5 h-8 rounded-full"
              style={{
                background:
                  'linear-gradient(180deg, var(--color-accent) 0%, var(--color-brand) 100%)',
              }}
            ></div>
            <h3
              className="font-heading font-extrabold tracking-tight"
              style={{ fontSize: 'var(--text-h3)', color: 'var(--color-brand)' }}
            >
              {subsection.title}
            </h3>
          </div>

          {subsection.description && (
            <p
              className="text-body leading-relaxed font-normal"
              style={{ color: 'var(--color-ink-soft)' }}
            >
              {subsection.description}
            </p>
          )}

          {subsection.items && subsection.items.length > 0 && (
            <div className="grid grid-cols-1 gap-2.5 my-2">
              {subsection.items.map((item, itemIdx) => (
                <div
                  key={itemIdx}
                  className="p-4 rounded-xl flex items-start gap-3 transition-all duration-200"
                  style={{
                    background: 'var(--color-paper-subtle)',
                    border: '1px solid var(--color-border)',
                  }}
                >
                  <i
                    className="fas fa-check-circle text-sm mt-0.5 flex-shrink-0"
                    style={{ color: 'var(--color-accent)' }}
                  ></i>
                  <span
                    className="text-sm font-medium leading-relaxed"
                    style={{ color: 'var(--color-ink)' }}
                  >
                    {item}
                  </span>
                </div>
              ))}
            </div>
          )}

          {subsection.example && (
            <div
              className="relative group mt-4 rounded-2xl overflow-hidden shadow-xl"
              style={{ background: 'var(--color-ink)', border: '1px solid var(--color-border)' }}
            >
              {/* Window Titlebar */}
              <div
                className="flex items-center justify-between px-4 py-3 text-xs font-mono flex-shrink-0"
                style={{
                  background: 'var(--color-ink-soft)',
                  borderBottom: '1px solid var(--color-border)',
                  color: 'var(--color-ink-faint)',
                }}
              >
                <div className="flex items-center gap-2">
                  <div className="flex items-center space-x-1.5">
                    <span className="w-3 h-3 rounded-full" style={{ background: '#ff5f57' }}></span>
                    <span className="w-3 h-3 rounded-full" style={{ background: '#febc2e' }}></span>
                    <span className="w-3 h-3 rounded-full" style={{ background: '#28ca42' }}></span>
                  </div>
                  <span
                    className="ml-2 font-mono text-[11px]"
                    style={{ color: 'var(--color-ink-muted)' }}
                  >
                    snippet.tsx
                  </span>
                </div>

                <button
                  type="button"
                  onClick={() => handleCopy(subsection.example!, index)}
                  className="px-3 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 flex items-center gap-1.5"
                  style={{
                    background: 'var(--color-paper-subtle)',
                    border: '1px solid var(--color-border)',
                    color: 'var(--color-ink-muted)',
                  }}
                  aria-label="Copy code to clipboard"
                >
                  <i
                    className={`fas ${copiedIndex === index ? 'fa-check' : 'fa-copy'}`}
                    style={{
                      color:
                        copiedIndex === index ? 'var(--color-accent)' : 'var(--color-ink-muted)',
                    }}
                  ></i>
                  <span>{copiedIndex === index ? 'Copied!' : 'Copy Code'}</span>
                </button>
              </div>

              {/* Code block */}
              <pre
                className="p-5 overflow-x-auto font-mono leading-relaxed whitespace-pre"
                style={{ fontSize: 'var(--text-xs)', color: 'var(--color-paper)' }}
              >
                <code>{subsection.example}</code>
              </pre>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};
