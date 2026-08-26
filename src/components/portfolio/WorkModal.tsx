import React, { useEffect, useState } from 'react';
import { Work } from '../../types';
import { normalizeImagePath } from './WorkCard';

interface WorkModalProps {
  work: Work | null;
  onClose: () => void;
  onPrev?: () => void;
  onNext?: () => void;
  hasPrev?: boolean;
  hasNext?: boolean;
}

export const WorkModal: React.FC<WorkModalProps> = ({
  work,
  onClose,
  onPrev,
  onNext,
  hasPrev = false,
  hasNext = false,
}) => {
  const [imgError, setImgError] = useState(false);

  useEffect(() => {
    setImgError(false);
  }, [work]);

  useEffect(() => {
    if (!work) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowLeft' && onPrev && hasPrev) {
        onPrev();
      } else if (e.key === 'ArrowRight' && onNext && hasNext) {
        onNext();
      }
    };

    // Lock body scroll
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [work, onClose, onPrev, onNext, hasPrev, hasNext]);

  if (!work) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/80 backdrop-blur-md animate-fadeIn"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div
        className="relative w-full max-w-3xl max-h-[90vh] bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col animate-slideUp border border-slate-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Navigation & Close Bar */}
        <div className="absolute top-4 right-4 z-30 flex items-center gap-2">
          {hasPrev && onPrev && (
            <button
              type="button"
              onClick={onPrev}
              aria-label="Previous project"
              className="w-10 h-10 rounded-full bg-slate-900/80 hover:bg-slate-900 text-white backdrop-blur-md flex items-center justify-center transition-all shadow-md"
            >
              <i className="fas fa-chevron-left text-sm"></i>
            </button>
          )}
          {hasNext && onNext && (
            <button
              type="button"
              onClick={onNext}
              aria-label="Next project"
              className="w-10 h-10 rounded-full bg-slate-900/80 hover:bg-slate-900 text-white backdrop-blur-md flex items-center justify-center transition-all shadow-md"
            >
              <i className="fas fa-chevron-right text-sm"></i>
            </button>
          )}
          <button
            type="button"
            onClick={onClose}
            aria-label="Close modal"
            className="w-10 h-10 rounded-full bg-slate-900/80 hover:bg-red-600 text-white backdrop-blur-md flex items-center justify-center transition-all shadow-md focus:outline-none"
          >
            <i className="fas fa-times text-base"></i>
          </button>
        </div>

        {/* Modal Header Media Banner */}
        <div className="relative w-full h-60 sm:h-72 bg-slate-900 flex-shrink-0 overflow-hidden">
          {!imgError ? (
            <img
              src={normalizeImagePath(work.poster)}
              alt={work.title}
              onError={() => setImgError(true)}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-tr from-regal-blue via-san-juan to-slate-900 flex items-center justify-center">
              <i className="fas fa-code text-bermuda text-5xl"></i>
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/40 to-transparent"></div>

          <div className="absolute bottom-5 left-6 right-6 space-y-1">
            <div className="flex items-center gap-2">
              {work.category && (
                <span className="inline-block bg-bermuda text-slate-900 text-xs font-black uppercase tracking-wider px-3 py-1 rounded-full shadow-sm">
                  {work.category}
                </span>
              )}
              <span className="inline-block bg-white/20 text-white text-xs font-mono font-bold px-2.5 py-1 rounded-full backdrop-blur-md">
                {work.date}
              </span>
            </div>
            <h2 id="modal-title" className="text-2xl sm:text-3xl font-heading font-extrabold text-white drop-shadow-md">
              {work.title}
            </h2>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6 flex-1 text-left">
          {/* Project Overview */}
          <div className="space-y-2">
            <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-400">
              Project Overview & Architecture
            </h3>
            <p className="text-sm sm:text-base text-slate-700 leading-relaxed whitespace-pre-line">
              {work.description}
            </p>
          </div>

          {/* Key Achievements / Highlights */}
          {work.highlights && work.highlights.length > 0 && (
            <div className="space-y-2.5">
              <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-400">
                Key Technical Highlights & Impact
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {work.highlights.map((h, i) => (
                  <div
                    key={i}
                    className="p-3 rounded-xl bg-slate-50 border border-slate-100 flex items-start gap-2.5"
                  >
                    <i className="fas fa-circle-check text-bermuda text-sm mt-0.5 flex-shrink-0"></i>
                    <span className="text-xs font-semibold text-slate-700">{h}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Technology Stack */}
          {work.technologies && work.technologies.length > 0 && (
            <div className="space-y-2">
              <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-400">
                Technologies & Tools Employed
              </h3>
              <div className="flex flex-wrap gap-2">
                {work.technologies.map((t) => (
                  <span
                    key={t}
                    className="px-3 py-1 rounded-full bg-slate-100 text-regal-blue text-xs font-mono font-bold border border-slate-200"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Action Links */}
          <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-slate-100">
            {work.linkView && (
              <a
                href={work.linkView}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-bermuda hover:bg-bermuda-light text-slate-900 font-bold text-sm shadow-glow-teal hover:scale-[1.02] transition-all duration-200"
              >
                <i className="fas fa-arrow-up-right-from-square"></i>
                Live Project Demo
              </a>
            )}

            {work.Link && (
              <a
                href={work.Link}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-regal-blue hover:bg-regal-light text-white font-bold text-sm shadow-md hover:scale-[1.02] transition-all duration-200"
              >
                <i className="fab fa-github"></i>
                Source / Details
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
