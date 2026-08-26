import React from 'react';

interface SectionHeaderProps {
  title: string;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({ title }) => {
  return (
    <div className="mb-8 pb-4 border-b border-gray-100">
      <h2 className="text-2xl sm:text-3xl font-bold text-regal-blue tracking-tight mb-2">
        {title}
      </h2>
      <div className="h-1 w-20 bg-gradient-to-r from-bermuda to-regal-blue rounded-full"></div>
    </div>
  );
};
