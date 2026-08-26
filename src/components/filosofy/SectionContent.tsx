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
    if (onShowToast) {
      onShowToast('Code snippet copied to clipboard!');
    }
    setTimeout(() => setCopiedIndex(null), 2500);
  };

  return (
    <div className="space-y-10">
      {subsections.map((subsection, index) => (
        <div key={subsection.title} className="space-y-4">
          <div className="flex items-center gap-2.5">
            <div className="w-2 h-6 rounded-full bg-bermuda"></div>
            <h3 className="text-xl font-heading font-extrabold text-regal-blue tracking-tight">
              {subsection.title}
            </h3>
          </div>

          {subsection.description && (
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
              {subsection.description}
            </p>
          )}

          {subsection.items && subsection.items.length > 0 && (
            <div className="grid grid-cols-1 gap-2.5 my-4">
              {subsection.items.map((item, itemIdx) => (
                <div
                  key={itemIdx}
                  className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 flex items-start gap-3 hover:bg-slate-100/70 transition-colors"
                >
                  <i className="fas fa-check-circle text-bermuda text-sm mt-0.5 flex-shrink-0"></i>
                  <span className="text-xs sm:text-sm font-medium text-slate-700 leading-relaxed">{item}</span>
                </div>
              ))}
            </div>
          )}

          {subsection.example && (
            <div className="relative group mt-4 rounded-2xl overflow-hidden shadow-xl bg-slate-900 border border-slate-700/80">
              {/* Window Titlebar */}
              <div className="flex items-center justify-between px-4 py-3 bg-slate-950/80 border-b border-slate-800 text-xs text-slate-400 font-mono">
                <div className="flex items-center gap-2">
                  <div className="flex items-center space-x-1.5">
                    <span className="w-3 h-3 rounded-full bg-red-500/80"></span>
                    <span className="w-3 h-3 rounded-full bg-amber-500/80"></span>
                    <span className="w-3 h-3 rounded-full bg-emerald-500/80"></span>
                  </div>
                  <span className="ml-2 font-mono text-[11px] text-slate-400">snippet.tsx</span>
                </div>

                <button
                  type="button"
                  onClick={() => handleCopy(subsection.example!, index)}
                  className="px-3 py-1 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold transition-all flex items-center gap-1.5 focus:outline-none hover:text-bermuda"
                  aria-label="Copy code to clipboard"
                >
                  <i className={`fas ${copiedIndex === index ? 'fa-check text-bermuda' : 'fa-copy'}`}></i>
                  <span>{copiedIndex === index ? 'Copied!' : 'Copy Code'}</span>
                </button>
              </div>

              {/* Code block */}
              <pre className="p-5 overflow-x-auto text-xs sm:text-sm font-mono text-slate-100 leading-relaxed whitespace-pre">
                <code>{subsection.example}</code>
              </pre>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};
