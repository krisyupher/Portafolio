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
      if (e.key === 'Escape') onClose();
      else if (e.key === 'ArrowLeft' && onPrev && hasPrev) onPrev();
      else if (e.key === 'ArrowRight' && onNext && hasNext) onNext();
    };

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
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 animate-fadeIn"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      style={{ background: 'rgba(10, 15, 26, 0.85)', backdropFilter: 'blur(20px)' }}
    >
      <div
        className="relative w-full max-w-3xl max-h-[90vh] rounded-3xl shadow-2xl overflow-hidden flex flex-col animate-scaleIn"
        onClick={(e) => e.stopPropagation()}
        style={{ background: 'var(--color-paper)', border: '1px solid var(--color-border)' }}
      >
        {/* Navigation & Close Bar */}
        <div className="absolute top-4 right-4 z-30 flex items-center gap-2">
          {hasPrev && onPrev && (
            <button
              type="button"
              onClick={onPrev}
              aria-label="Previous project"
              className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 shadow-lg"
              style={{
                background: 'var(--color-paper)',
                border: '1px solid var(--color-border)',
                color: 'var(--color-ink)',
              }}
            >
              <i className="fas fa-chevron-left text-sm"></i>
            </button>
          )}
          {hasNext && onNext && (
            <button
              type="button"
              onClick={onNext}
              aria-label="Next project"
              className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 shadow-lg"
              style={{
                background: 'var(--color-paper)',
                border: '1px solid var(--color-border)',
                color: 'var(--color-ink)',
              }}
            >
              <i className="fas fa-chevron-right text-sm"></i>
            </button>
          )}
          <button
            type="button"
            onClick={onClose}
            aria-label="Close modal"
            className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 shadow-lg"
            style={{
              background: 'var(--color-paper)',
              border: '1px solid var(--color-border)',
              color: 'var(--color-ink-muted)',
            }}
          >
            <i className="fas fa-times text-base"></i>
          </button>
        </div>

        {/* Modal Header Media Banner */}
        <div className="relative w-full h-60 sm:h-72 lg:h-80 flex-shrink-0 overflow-hidden">
          {!imgError ? (
            <img
              src={normalizeImagePath(work.poster)}
              alt={work.title}
              onError={() => setImgError(true)}
              className="w-full h-full object-cover"
            />
          ) : (
            <div
              className="w-full h-full flex items-center justify-center"
              style={{
                background: 'linear-gradient(135deg, var(--color-brand) 0%, var(--color-ink) 100%)',
              }}
            >
              <i className="fas fa-code text-5xl" style={{ color: 'var(--color-accent)' }}></i>
            </div>
          )}
          <div
            className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/40 to-transparent"
            style={{
              background:
                'linear-gradient(to top, rgba(10,15,26,0.9) 0%, rgba(10,15,26,0.4) 50%, transparent 100%)',
            }}
          ></div>

          <div className="absolute bottom-6 left-6 right-6 space-y-2">
            <div className="flex items-center gap-2 flex-wrap">
              {work.category && (
                <span
                  className="inline-block px-3 py-1 rounded-full text-slate-900 font-black uppercase tracking-wider text-xs shadow-sm flex items-center gap-1.5"
                  style={{ background: 'var(--color-accent)', color: 'var(--color-ink)' }}
                >
                  {work.category}
                </span>
              )}
              <span
                className="inline-block px-2.5 py-1 rounded-full text-white text-xs font-mono font-bold backdrop-blur-md"
                style={{ background: 'rgba(255,255,255,0.15)' }}
              >
                {work.date}
              </span>
            </div>
            <h2
              id="modal-title"
              className="font-heading font-extrabold text-white drop-shadow-lg"
              style={{ fontSize: 'var(--text-h2)' }}
            >
              {work.title}
            </h2>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 lg:p-10 overflow-y-auto space-y-7 flex-1 text-left">
          {/* Project Overview */}
          <div className="space-y-2.5">
            <h3
              className="text-xs font-extrabold uppercase tracking-wider"
              style={{ color: 'var(--color-ink-faint)' }}
            >
              Project Overview & Architecture
            </h3>
            <p
              className="text-sm sm:text-base leading-relaxed whitespace-pre-line"
              style={{ color: 'var(--color-ink-soft)' }}
            >
              {work.description}
            </p>
          </div>

          {/* Key Achievements / Highlights */}
          {work.highlights && work.highlights.length > 0 && (
            <div className="space-y-3">
              <h3
                className="text-xs font-extrabold uppercase tracking-wider"
                style={{ color: 'var(--color-ink-faint)' }}
              >
                Key Technical Highlights & Impact
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {work.highlights.map((h, i) => (
                  <div
                    key={i}
                    className="p-4 rounded-xl flex items-start gap-3"
                    style={{
                      background: 'var(--color-paper-subtle)',
                      border: '1px solid var(--color-border)',
                    }}
                  >
                    <i
                      className="fas fa-circle-check text-sm mt-0.5 flex-shrink-0"
                      style={{ color: 'var(--color-accent)' }}
                    ></i>
                    <span className="text-xs font-semibold" style={{ color: 'var(--color-ink)' }}>
                      {h}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Technology Stack */}
          {work.technologies && work.technologies.length > 0 && (
            <div className="space-y-2.5">
              <h3
                className="text-xs font-extrabold uppercase tracking-wider"
                style={{ color: 'var(--color-ink-faint)' }}
              >
                Technologies & Tools Employed
              </h3>
              <div className="flex flex-wrap gap-2">
                {work.technologies.map((t) => (
                  <span
                    key={t}
                    className="px-3 py-1 rounded-full text-xs font-mono font-bold border transition-all duration-200"
                    style={{
                      background: 'var(--color-paper-subtle)',
                      borderColor: 'var(--color-border)',
                      color: 'var(--color-brand)',
                    }}
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Action Links */}
          <div
            className="flex flex-col sm:flex-row gap-3 pt-4 border-t"
            style={{ borderColor: 'var(--color-border)' }}
          >
            {work.linkView && (
              <a
                href={work.linkView}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full font-bold text-sm shadow-lg hover:scale-[1.02] transition-all duration-200"
                style={{
                  background: 'var(--color-accent)',
                  color: 'var(--color-ink)',
                  boxShadow: '0 4px 20px -4px rgba(0, 196, 151, 0.4)',
                }}
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
                className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full font-bold text-sm shadow-lg hover:scale-[1.02] transition-all duration-200"
                style={{
                  background: 'var(--color-brand)',
                  color: 'white',
                  boxShadow: '0 4px 20px -4px rgba(3, 67, 120, 0.4)',
                }}
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
