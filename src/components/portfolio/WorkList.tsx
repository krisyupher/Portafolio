import React from 'react';
import { Work } from '../../types';
import { WorkCard } from './WorkCard';

interface WorkListProps {
  works: Work[];
  onSelectWork: (work: Work) => void;
}

export const WorkList: React.FC<WorkListProps> = ({ works, onSelectWork }) => {
  if (!works || works.length === 0) {
    return (
      <div
        className="text-center py-20 glass rounded-3xl border p-12"
        style={{ borderColor: 'var(--color-border)' }}
      >
        <i
          className="fas fa-folder-open text-4xl mb-4"
          style={{ color: 'var(--color-ink-faint)' }}
        ></i>
        <p className="text-body font-medium" style={{ color: 'var(--color-ink-muted)' }}>
          No projects available at this moment.
        </p>
      </div>
    );
  }

  return (
    <div
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
      role="list"
      aria-label="Projects"
    >
      {works.map((work, index) => (
        <WorkCard
          key={`${work.id}-${work.title}`}
          work={work}
          onOpenModal={onSelectWork}
          delay={index * 100}
        />
      ))}
    </div>
  );
};
