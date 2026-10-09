import React from 'react';

interface SectionHeaderProps {
  title: string;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({ title }) => {
  return (
    <div className="mb-8 pb-6 border-b" style={{ borderColor: 'var(--color-border)' }}>
      <h2
        className="font-heading font-extrabold tracking-tight mb-3"
        style={{ fontSize: 'var(--text-h2)', color: 'var(--color-brand)' }}
      >
        {title}
      </h2>
      <div
        className="w-16 h-1 rounded-full"
        style={{
          background: 'linear-gradient(90deg, var(--color-accent) 0%, var(--color-brand) 100%)',
        }}
      ></div>
    </div>
  );
};
