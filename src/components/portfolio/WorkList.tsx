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
      <div className="text-center py-16 bg-white rounded-xl border border-gray-200 p-8 my-8">
        <i className="fas fa-folder-open text-4xl text-gray-300 mb-3"></i>
        <p className="text-gray-500 text-base font-medium">
          No projects available at this moment.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 my-8">
      {works.map((work) => (
        <WorkCard
          key={`${work.id}-${work.title}`}
          work={work}
          onOpenModal={onSelectWork}
        />
      ))}
    </div>
  );
};
