import React from 'react';
import { cn } from '../../lib/cn';
import { Work } from '../../types';
import { Reveal } from '../common/Reveal';
import { WorkCard } from './WorkCard';

interface WorkListProps {
  works: Work[];
  onSelectWork: (work: Work) => void;
  /** Render the first project as a wide feature card. */
  leadFeature?: boolean;
  className?: string;
}

/** Responsive grid of project cards with staggered scroll reveals. */
export const WorkList: React.FC<WorkListProps> = ({
  works,
  onSelectWork,
  leadFeature = false,
  className,
}) => (
  <ul className={cn('grid gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-7', className)}>
    {works.map((work, index) => {
      const isLead = leadFeature && index === 0;
      return (
        <li key={work.id} className={cn(isLead && 'md:col-span-2 lg:col-span-3')}>
          <Reveal delay={isLead ? 0 : (index % 3) * 90} className="h-full">
            <WorkCard
              work={work}
              onOpenModal={onSelectWork}
              variant={isLead ? 'feature' : 'default'}
            />
          </Reveal>
        </li>
      );
    })}
  </ul>
);
