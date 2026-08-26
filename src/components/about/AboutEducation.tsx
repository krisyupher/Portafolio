import React from 'react';
import { Education } from '../../types';

interface AboutEducationProps {
  education: Education[];
}

export const AboutEducation: React.FC<AboutEducationProps> = ({ education }) => {
  if (!education || education.length === 0) return null;

  return (
    <section className="py-12" aria-labelledby="education-heading">
      <div className="text-center max-w-3xl mx-auto mb-10 space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-bermuda/15 text-regal-blue text-xs font-bold uppercase tracking-wider">
          <i className="fas fa-graduation-cap text-bermuda"></i>
          <span>Academic Background</span>
        </div>
        <h2
          id="education-heading"
          className="text-3xl sm:text-4xl font-heading font-extrabold text-regal-blue tracking-tight"
        >
          Education & Certifications
        </h2>
        <p className="text-slate-600 text-sm sm:text-base">
          Formal engineering foundation combined with continuous international language and technology accreditation.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {education.map((edu) => {
          const isEnglish = edu.id.includes('english');

          return (
            <div
              key={edu.id}
              className="glass-card rounded-2xl p-6 border border-slate-200/80 hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div
                    className={`w-11 h-11 rounded-xl flex items-center justify-center text-lg ${
                      isEnglish
                        ? 'bg-amber-500/15 text-amber-600'
                        : 'bg-regal-blue/10 text-regal-blue'
                    }`}
                  >
                    <i
                      className={`fas ${
                        isEnglish ? 'fa-language' : 'fa-graduation-cap'
                      }`}
                    ></i>
                  </div>
                  <span className="px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-bold font-mono">
                    {edu.graduationYear}
                  </span>
                </div>

                <div>
                  <h3 className="text-lg font-heading font-extrabold text-regal-blue leading-snug">
                    {edu.degree}
                  </h3>
                  <p className="text-xs font-bold text-bermuda mt-1 flex items-center gap-1.5">
                    <i className="fas fa-building-columns text-[11px]"></i>
                    <span>{edu.institution}</span>
                  </p>
                </div>

                {edu.description && (
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed pt-1">
                    {edu.description}
                  </p>
                )}
              </div>

              <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                  Field of Study
                </span>
                <span className="text-xs font-bold text-slate-700">
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
