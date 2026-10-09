import React from 'react';
import { Education } from '../../types';

interface AboutEducationProps {
  education: Education[];
}

export const AboutEducation: React.FC<AboutEducationProps> = ({ education }) => {
  if (!education || education.length === 0) return null;

  return (
    <section className="py-16" aria-labelledby="education-heading">
      <div className="text-center max-w-3xl mx-auto mb-12">
        <div
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider"
          style={{ background: 'var(--color-accent-pale)', color: 'var(--color-accent)' }}
        >
          <i className="fas fa-graduation-cap"></i>
          <span>Academic Background</span>
        </div>
        <h2
          id="education-heading"
          className="font-heading font-extrabold tracking-tight mt-3"
          style={{ fontSize: 'var(--text-h1)', color: 'var(--color-brand)' }}
        >
          Education & Certifications
        </h2>
        <p className="text-body-lg mt-2" style={{ color: 'var(--color-ink-muted)' }}>
          Formal engineering foundation combined with continuous international language and
          technology accreditation.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {education.map((edu, index) => {
          const isEnglish = edu.id.includes('english');

          return (
            <div
              key={edu.id}
              className="glass-card rounded-2xl p-6 border flex flex-col justify-between animate-slideUp"
              style={{ borderColor: 'var(--color-border)', animationDelay: `${index * 150}ms` }}
            >
              <div className="space-y-4">
                <div className="flex items-start justify-between gap-4">
                  <div
                    className={`w-12 h-12 rounded-xl flex items-center justify-center text-xl flex-shrink-0 ${
                      isEnglish ? 'bg-amber-100 text-amber-600' : 'bg-brand-pale text-brand'
                    }`}
                    style={{
                      background: isEnglish
                        ? 'var(--color-accent-pale)'
                        : 'var(--color-brand-pale)',
                      color: isEnglish ? 'var(--color-accent-dark)' : 'var(--color-brand)',
                    }}
                  >
                    <i className={`fas ${isEnglish ? 'fa-language' : 'fa-graduation-cap'}`}></i>
                  </div>
                  <span
                    className="px-3 py-1 rounded-full text-xs font-bold font-mono flex-shrink-0"
                    style={{
                      background: 'var(--color-paper-subtle)',
                      color: 'var(--color-ink-muted)',
                      borderColor: 'var(--color-border)',
                    }}
                  >
                    {edu.graduationYear}
                  </span>
                </div>

                <div>
                  <h3
                    className="font-heading font-extrabold leading-snug"
                    style={{ fontSize: 'var(--text-h3)', color: 'var(--color-brand)' }}
                  >
                    {edu.degree}
                  </h3>
                  <p
                    className="text-xs font-bold mt-1.5 flex items-center gap-1.5"
                    style={{ color: 'var(--color-accent)' }}
                  >
                    <i className="fas fa-building-columns text-[10px]"></i>
                    <span>{edu.institution}</span>
                  </p>
                </div>

                {edu.description && (
                  <p
                    className="text-xs sm:text-sm leading-relaxed pt-1"
                    style={{ color: 'var(--color-ink-soft)' }}
                  >
                    {edu.description}
                  </p>
                )}
              </div>

              <div
                className="pt-5 mt-5 border-t flex items-center justify-between"
                style={{ borderColor: 'var(--color-border)' }}
              >
                <span
                  className="text-[10px] font-semibold uppercase tracking-wider"
                  style={{ color: 'var(--color-ink-faint)' }}
                >
                  Field of Study
                </span>
                <span className="text-xs font-bold" style={{ color: 'var(--color-ink)' }}>
                  {edu.field}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
