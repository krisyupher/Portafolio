import React, { useEffect, useRef } from 'react';
import { CATEGORY_LABELS, getSourceLink } from '../../lib/projects';
import { Work } from '../../types';
import { WorkCover } from './WorkCover';

interface WorkModalProps {
  work: Work | null;
  onClose: () => void;
  onPrev?: () => void;
  onNext?: () => void;
  hasPrev?: boolean;
  hasNext?: boolean;
}

const FOCUSABLE = 'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';

export const WorkModal: React.FC<WorkModalProps> = ({
  work,
  onClose,
  onPrev,
  onNext,
  hasPrev = false,
  hasNext = false,
}) => {
  const panelRef = useRef<HTMLDivElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const isOpen = work !== null;

  // Lock page scroll, move focus into the dialog, and restore focus when it closes.
  useEffect(() => {
    if (!isOpen) return;
    const previouslyFocused = document.activeElement as HTMLElement | null;
    document.body.style.overflow = 'hidden';
    closeRef.current?.focus();
    return () => {
      document.body.style.overflow = '';
      previouslyFocused?.focus?.();
    };
  }, [isOpen]);

  // Start each project at the top when navigating with prev/next.
  useEffect(() => {
    bodyRef.current?.scrollTo?.({ top: 0 });
  }, [work]);

  useEffect(() => {
    if (!work) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      else if (e.key === 'ArrowLeft' && onPrev && hasPrev) onPrev();
      else if (e.key === 'ArrowRight' && onNext && hasNext) onNext();
      else if (e.key === 'Tab' && panelRef.current) {
        const focusable = panelRef.current.querySelectorAll<HTMLElement>(FOCUSABLE);
        if (focusable.length === 0) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [work, onClose, onPrev, onNext, hasPrev, hasNext]);

  if (!work) return null;

  const source = getSourceLink(work);

  return (
    <div
      className="fixed inset-0 z-50 flex animate-fade-in items-end justify-center bg-black/50 backdrop-blur-sm sm:items-center sm:p-6"
      onClick={onClose}
    >
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="work-modal-title"
        onClick={(e) => e.stopPropagation()}
        className="relative flex max-h-[92vh] w-full max-w-3xl animate-modal-in flex-col overflow-hidden rounded-t-3xl border border-line bg-paper-raised shadow-lift sm:rounded-3xl"
      >
        <div className="flex items-center justify-between gap-4 border-b border-line px-5 py-3 sm:px-6">
          <p className="font-mono text-[0.68rem] uppercase tracking-[0.14em] text-ink-muted">
            {work.category && (
              <span className="text-accent-ink">{CATEGORY_LABELS[work.category]}</span>
            )}
            {work.category && (
              <span className="mx-2 text-ink-faint" aria-hidden="true">
                /
              </span>
            )}
            {work.date}
          </p>
          <div className="flex items-center gap-1.5">
            {hasPrev && onPrev && (
              <button
                type="button"
                onClick={onPrev}
                aria-label="Previous project"
                className="icon-btn"
              >
                <i className="fas fa-arrow-left text-[0.75rem]" aria-hidden="true"></i>
              </button>
            )}
            {hasNext && onNext && (
              <button type="button" onClick={onNext} aria-label="Next project" className="icon-btn">
                <i className="fas fa-arrow-right text-[0.75rem]" aria-hidden="true"></i>
              </button>
            )}
            <button
              ref={closeRef}
              type="button"
              onClick={onClose}
              aria-label="Close modal"
              className="icon-btn"
            >
              <i className="fas fa-xmark text-[0.85rem]" aria-hidden="true"></i>
            </button>
          </div>
        </div>

        <div ref={bodyRef} className="overflow-y-auto overscroll-contain">
          <div className="p-5 sm:p-6">
            <WorkCover
              key={work.id}
              work={work}
              eager
              className="group aspect-[16/9] rounded-2xl border border-line"
            />
          </div>

          <div className="space-y-8 px-6 pb-8 sm:px-10 sm:pb-10">
            <div>
              <h2
                id="work-modal-title"
                className="text-display-md font-semibold tracking-tight text-ink"
              >
                {work.title}
              </h2>
              <p className="mt-4 whitespace-pre-line text-base leading-relaxed text-ink-soft sm:text-lg">
                {work.description}
              </p>
            </div>

            {work.highlights && work.highlights.length > 0 && (
              <div>
                <h3 className="eyebrow">Impact & highlights</h3>
                <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                  {work.highlights.map((highlight) => (
                    <li
                      key={highlight}
                      className="flex gap-3 rounded-xl border border-line bg-paper-sunken/60 p-4 text-sm text-ink-soft"
                    >
                      <i
                        className="fas fa-check mt-1 text-[0.7rem] text-accent-ink"
                        aria-hidden="true"
                      ></i>
                      {highlight}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {work.technologies && work.technologies.length > 0 && (
              <div>
                <h3 className="eyebrow">Built with</h3>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {work.technologies.map((tech) => (
                    <li key={tech} className="chip">
                      {tech}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {(work.linkView || source) && (
              <div className="flex flex-col gap-3 border-t border-line pt-8 sm:flex-row">
                {work.linkView && (
                  <a
                    href={work.linkView}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-primary"
                  >
                    Visit live site
                    <i
                      className="fas fa-arrow-up-right-from-square text-[0.7rem]"
                      aria-hidden="true"
                    ></i>
                  </a>
                )}
                {source && (
                  <a
                    href={source.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-secondary"
                  >
                    <i className={source.icon} aria-hidden="true"></i>
                    {source.label}
                  </a>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
