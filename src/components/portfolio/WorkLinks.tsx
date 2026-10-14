import React from 'react';
import { getSourceLink } from '../../lib/projects';
import { Work } from '../../types';

interface WorkLinksProps {
  work: Work;
}

/** Compact live-site and source icon links. Sits above stretched card buttons via z-10. */
export const WorkLinks: React.FC<WorkLinksProps> = ({ work }) => {
  const source = getSourceLink(work);

  return (
    <div className="relative z-10 flex shrink-0 items-center gap-1.5">
      {work.linkView && (
        <a
          href={work.linkView}
          target="_blank"
          rel="noopener noreferrer"
          className="icon-btn hover:border-accent hover:text-accent-ink"
          aria-label={`Visit the live site for ${work.title}`}
          title="Live site"
        >
          <i className="fas fa-arrow-up-right-from-square text-[0.7rem]" aria-hidden="true"></i>
        </a>
      )}
      {source && (
        <a
          href={source.href}
          target="_blank"
          rel="noopener noreferrer"
          className="icon-btn hover:border-accent hover:text-accent-ink"
          aria-label={`${source.label} for ${work.title}`}
          title={source.label}
        >
          <i className={`${source.icon} text-[0.8rem]`} aria-hidden="true"></i>
        </a>
      )}
    </div>
  );
};
