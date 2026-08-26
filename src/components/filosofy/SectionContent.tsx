import React, { useState } from 'react';
import { Subsection } from '../../types';

interface SectionContentProps {
  subsections?: Subsection[];
}

export const SectionContent: React.FC<SectionContentProps> = ({ subsections }) => {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  if (!subsections || subsections.length === 0) return null;

  const handleCopy = (code: string, index: number) => {
    navigator.clipboard.writeText(code);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <div className="space-y-10">
      {subsections.map((subsection, index) => (
        <div key={subsection.title} className="space-y-4">
          <h3 className="text-xl font-bold text-san-juan">
            {subsection.title}
          </h3>

          {subsection.description && (
            <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
              {subsection.description}
            </p>
          )}

          {subsection.items && subsection.items.length > 0 && (
            <ul className="space-y-2.5 my-4">
              {subsection.items.map((item, itemIdx) => (
                <li
                  key={itemIdx}
                  className="flex items-start text-sm sm:text-base text-gray-700 leading-relaxed pl-1"
                >
                  <span className="text-bermuda font-bold mr-3 text-lg leading-none">
                    ▸
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          )}

          {subsection.example && (
            <div className="relative group mt-4 rounded-xl overflow-hidden shadow-md bg-[#1e293b] border border-gray-700">
              <div className="flex items-center justify-between px-4 py-2 bg-[#0f172a] border-b border-gray-700 text-xs text-gray-400 font-mono">
                <span>Code Example</span>
                <button
                  type="button"
                  onClick={() => handleCopy(subsection.example!, index)}
                  className="px-2.5 py-1 rounded bg-gray-800 hover:bg-gray-700 text-gray-200 transition-colors flex items-center gap-1.5 focus:outline-none"
                  aria-label="Copy code to clipboard"
                >
                  <i className={`fas ${copiedIndex === index ? 'fa-check text-green-400' : 'fa-copy'}`}></i>
                  <span>{copiedIndex === index ? 'Copied!' : 'Copy'}</span>
                </button>
              </div>
              <pre className="p-5 overflow-x-auto text-xs sm:text-sm font-mono text-gray-200 leading-relaxed whitespace-pre">
                <code>{subsection.example}</code>
              </pre>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};
