import React, { useState } from 'react';
import { CATEGORY_ICONS, getShortTitle, normalizeImagePath } from '../../lib/projects';
import { cn } from '../../lib/cn';
import { Work } from '../../types';

interface WorkCoverProps {
  work: Work;
  className?: string;
  eager?: boolean;
}

/**
 * Project media. Screenshots of any aspect ratio are framed on a blueprint backdrop instead of
 * being cropped; projects without a usable poster get a typographic cover.
 */
export const WorkCover: React.FC<WorkCoverProps> = ({ work, className, eager = false }) => {
  const [failed, setFailed] = useState(false);
  const src = normalizeImagePath(work.poster);
  const showImage = src !== '' && !failed;
  const shortTitle = getShortTitle(work.title);

  return (
    <div className={cn('relative isolate overflow-hidden bg-paper-sunken', className)}>
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-grid opacity-70 [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_80%)]"
      />
      <div
        aria-hidden="true"
        className="absolute -bottom-1/3 left-1/2 -z-10 h-2/3 w-2/3 -translate-x-1/2 rounded-full bg-accent/20 opacity-60 blur-3xl transition-opacity duration-700 group-hover:opacity-100"
      />

      {showImage ? (
        <img
          src={src}
          alt={`${shortTitle} screenshot`}
          loading={eager ? 'eager' : 'lazy'}
          decoding="async"
          onError={() => setFailed(true)}
          className="absolute bottom-0 left-1/2 h-auto max-h-[84%] w-auto max-w-[86%] -translate-x-1/2 translate-y-[5%] rounded-t-xl object-contain shadow-lift ring-1 ring-ink/10 transition-transform duration-700 ease-out-expo group-hover:translate-y-[1%]"
        />
      ) : (
        <div className="absolute inset-0 flex flex-col justify-between p-6 sm:p-8">
          {work.category && (
            <span className="grid h-10 w-10 place-items-center rounded-xl border border-line-strong bg-paper-raised text-accent-ink shadow-soft">
              <i className={`fas ${CATEGORY_ICONS[work.category]} text-sm`} aria-hidden="true"></i>
            </span>
          )}
          <div className="transition-transform duration-700 ease-out-expo group-hover:-translate-y-1">
            <p className="font-display text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
              {shortTitle}
            </p>
            {work.technologies && (
              <p className="mt-2 font-mono text-[0.68rem] uppercase tracking-[0.14em] text-ink-muted">
                {work.technologies.slice(0, 3).join(' · ')}
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
