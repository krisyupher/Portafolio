import React from 'react';
import { Experience } from '../../types';

interface AboutExperienceProps {
  experience: Experience[];
}

export const AboutExperience: React.FC<AboutExperienceProps> = ({ experience }) => {
  if (!experience || experience.length === 0) return null;

  return (
    <section className="py-16" aria-labelledby="experience-heading">
      <div className="text-center max-w-3xl mx-auto mb-14">
        <div
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider"
          style={{ background: 'var(--color-brand-pale)', color: 'var(--color-brand)' }}
        >
          <i className="fas fa-timeline" style={{ color: 'var(--color-accent)' }}></i>
          <span>Career Trajectory</span>
        </div>
        <h2
          id="experience-heading"
          className="font-heading font-extrabold tracking-tight mt-3"
          style={{ fontSize: 'var(--text-h1)', color: 'var(--color-brand)' }}
        >
          Professional Experience
        </h2>
        <p className="text-body-lg mt-2" style={{ color: 'var(--color-ink-muted)' }}>
          Proven track record in driving performance, scaling digital platforms, and delivering
          secure solutions for enterprise and government clients.
        </p>
      </div>

      <div className="relative max-w-4xl mx-auto">
        {/* Central timeline line */}
        <div
          className="absolute left-6 md:left-1/2 top-4 bottom-4 w-1 rounded-full"
          style={{
            background:
              'linear-gradient(to bottom, var(--color-accent) 0%, var(--color-brand) 50%, var(--color-accent) 100%)',
            transform: 'translateX(-50%)',
          }}
        ></div>

        <div className="space-y-10">
          {experience.map((exp, index) => {
            const isEven = index % 2 === 0;

            return (
              <div
                key={exp.id}
                className={`relative flex flex-col md:flex-row items-start ${isEven ? 'md:flex-row-reverse' : ''} animate-slideUp`}
                style={{ animationDelay: `${index * 150}ms` }}
              >
                {/* Timeline Marker */}
                <div
                  className="absolute left-6 md:left-1/2 top-4 w-4 h-4 rounded-full border-4 bg-white shadow-lg transform -translate-x-1/2 z-10 transition-all duration-300"
                  style={{
                    borderColor: 'var(--color-accent)',
                    boxShadow:
                      '0 0 0 4px var(--color-accent-pale), 0 4px 16px -4px rgba(0, 196, 151, 0.4)',
                  }}
                >
                  <div
                    className="w-full h-full rounded-full"
                    style={{ background: 'var(--color-accent)' }}
                  ></div>
                </div>

                {/* Content Card */}
                <div className={`ml-14 md:ml-0 md:w-1/2 ${isEven ? 'md:pl-10' : 'md:pr-10'}`}>
                  <div
                    className="glass-card rounded-2xl p-6 sm:p-7 border hover:shadow-xl transition-all duration-300 w-full"
                    style={{ borderColor: 'var(--color-border)' }}
                  >
                    {/* Header */}
                    <div className="mb-4 space-y-1.5">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span
                          className="px-3 py-1 rounded-full text-[11px] font-extrabold uppercase tracking-wider"
                          style={{
                            background: 'var(--color-brand-pale)',
                            color: 'var(--color-brand)',
                          }}
                        >
                          {exp.startDate} - {exp.endDate || 'Present'}
                        </span>
                      </div>
                      <h3
                        className="font-heading font-extrabold group-hover:text-accent transition-colors"
                        style={{ fontSize: 'var(--text-h3)', color: 'var(--color-brand)' }}
                      >
                        {exp.title}
                      </h3>
                      <p
                        className="text-sm font-bold flex items-center gap-1.5"
                        style={{ color: 'var(--color-ink)' }}
                      >
                        <i
                          className="fas fa-building text-xs"
                          style={{ color: 'var(--color-accent)' }}
                        ></i>
                        <span>{exp.company}</span>
                      </p>
                    </div>

                    {/* Description */}
                    <p
                      className="text-sm leading-relaxed mb-5 text-left"
                      style={{ color: 'var(--color-ink-soft)' }}
                    >
                      {exp.description}
                    </p>

                    {/* Tech Badges */}
                    <div
                      className="flex flex-wrap gap-2 pt-4 border-t"
                      style={{ borderColor: 'var(--color-border)' }}
                    >
                      {exp.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="inline-block text-xs font-semibold px-2.5 py-1 rounded-lg border transition-all duration-200"
                          style={{
                            background: 'var(--color-paper-subtle)',
                            borderColor: 'var(--color-border)',
                            color: 'var(--color-ink-muted)',
                          }}
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
