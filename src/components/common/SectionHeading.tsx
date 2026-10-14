import React from 'react';
import { cn } from '../../lib/cn';

interface SectionHeadingProps {
  /** Id for the <h2>, referenced by the section's aria-labelledby. */
  id: string;
  index?: string;
  eyebrow: string;
  title: string;
  description?: string;
  action?: React.ReactNode;
  className?: string;
}

export const SectionHeading: React.FC<SectionHeadingProps> = ({
  id,
  index,
  eyebrow,
  title,
  description,
  action,
  className,
}) => (
  <div className={cn('flex flex-col gap-6 md:flex-row md:items-end md:justify-between', className)}>
    <div className="max-w-2xl">
      <p className="eyebrow">
        {index && (
          <>
            <span className="text-accent-ink">{index}</span>
            <span className="mx-2 text-ink-faint" aria-hidden="true">
              /
            </span>
          </>
        )}
        {eyebrow}
      </p>
      <h2 id={id} className="mt-4 text-display-md font-semibold text-ink">
        {title}
      </h2>
      {description && (
        <p className="mt-4 max-w-xl text-base leading-relaxed text-ink-muted sm:text-lg">
          {description}
        </p>
      )}
    </div>
    {action && <div className="shrink-0">{action}</div>}
  </div>
);
