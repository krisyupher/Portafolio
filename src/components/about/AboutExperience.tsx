import React from 'react';
import { Experience } from '../../types';

interface AboutExperienceProps {
  experience: Experience[];
}

export const AboutExperience: React.FC<AboutExperienceProps> = ({ experience }) => {
  if (!experience || experience.length === 0) return null;

  return (
    <section className="py-12 border-b border-slate-200/80" aria-labelledby="experience-heading">
      <div className="text-center max-w-3xl mx-auto mb-12 space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-regal-blue/10 text-regal-blue text-xs font-bold uppercase tracking-wider">
          <i className="fas fa-timeline text-bermuda"></i>
          <span>Career Trajectory</span>
        </div>
        <h2
          id="experience-heading"
          className="text-3xl sm:text-4xl font-heading font-extrabold text-regal-blue tracking-tight"
        >
          Professional Experience
        </h2>
        <p className="text-slate-600 text-sm sm:text-base">
          Proven track record in driving performance, scaling digital platforms, and delivering secure solutions for enterprise and government clients.
        </p>
      </div>

      <div className="relative max-w-4xl mx-auto">
        {/* Central timeline line */}
        <div className="absolute left-6 md:left-1/2 top-4 bottom-4 w-1 bg-gradient-to-b from-bermuda via-regal-blue to-accent-cyan transform md:-translate-x-1/2 rounded-full"></div>

        <div className="space-y-12">
          {experience.map((exp, index) => {
            const isEven = index % 2 === 0;

            return (
              <div
                key={exp.id}
                className={`relative flex flex-col md:flex-row items-start ${
                  isEven ? 'md:flex-row-reverse' : ''
                }`}
              >
                {/* Timeline Glowing Marker */}
                <div className="absolute left-6 md:left-1/2 top-6 w-5 h-5 rounded-full bg-white border-4 border-bermuda shadow-glow-teal transform -translate-x-1/2 z-10"></div>

                {/* Content Card */}
                <div
                  className={`ml-14 md:ml-0 md:w-1/2 ${
                    isEven ? 'md:pl-10 text-left' : 'md:pr-10 md:text-right text-left'
                  }`}
                >
                  <div className="glass-card rounded-2xl p-6 sm:p-7 border border-slate-200/80 hover:shadow-xl transition-all duration-300 group">
                    {/* Header */}
                    <div className="mb-3 space-y-1">
                      <div className="flex items-center gap-2 flex-wrap justify-start md:justify-start">
                        <span className="px-2.5 py-0.5 rounded-full bg-bermuda/15 text-regal-blue text-[11px] font-extrabold uppercase tracking-wider">
                          {exp.startDate} - {exp.endDate || 'Present'}
                        </span>
                      </div>
                      <h3 className="text-xl font-heading font-extrabold text-regal-blue group-hover:text-bermuda transition-colors">
                        {exp.title}
                      </h3>
                      <p className="text-sm font-bold text-slate-700 flex items-center gap-1.5 justify-start md:justify-start">
                        <i className="fas fa-building text-bermuda text-xs"></i>
                        <span>{exp.company}</span>
                      </p>
                    </div>

                    {/* Description */}
                    <p className="text-sm text-slate-600 leading-relaxed mb-4 text-left">
                      {exp.description}
                    </p>

                    {/* Tech Badges */}
                    <div className="flex flex-wrap gap-1.5 pt-3 border-t border-slate-100 justify-start">
                      {exp.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="inline-block bg-slate-100/90 text-slate-700 text-xs font-semibold px-2.5 py-0.5 rounded-md border border-slate-200/60 transition-colors hover:bg-bermuda/10 hover:text-regal-blue hover:border-bermuda/30"
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
