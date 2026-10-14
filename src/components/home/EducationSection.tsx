import React from 'react';
import { Education } from '../../types';
import { Reveal } from '../common/Reveal';
import { SectionHeading } from '../common/SectionHeading';

interface EducationSectionProps {
  education: Education[];
}

export const EducationSection: React.FC<EducationSectionProps> = ({ education }) => (
  <section aria-labelledby="education-title" className="section border-t border-line">
    <div className="container-page">
      <Reveal>
        <SectionHeading id="education-title" index="04" eyebrow="Education" title="Foundations" />
      </Reveal>

      <ul className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-line bg-line md:grid-cols-3">
        {education.map((item, index) => (
          <li key={item.id} className="bg-paper-raised">
            <Reveal delay={index * 80} className="flex h-full flex-col p-7 sm:p-8">
              <p className="font-mono text-[0.72rem] uppercase tracking-[0.14em] text-accent-ink">
                {item.graduationYear}
              </p>
              <h3 className="mt-4 text-xl font-semibold leading-snug tracking-tight text-ink">
                {item.degree}
              </h3>
              <p className="mt-1.5 text-sm font-medium text-ink-soft">{item.institution}</p>
              {item.description && (
                <p className="mt-4 text-sm leading-relaxed text-ink-muted">{item.description}</p>
              )}
            </Reveal>
          </li>
        ))}
      </ul>
    </div>
  </section>
);
