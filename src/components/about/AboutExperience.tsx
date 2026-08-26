import React from 'react';
import { Experience } from '../../types';

interface AboutExperienceProps {
  experience: Experience[];
}

export const AboutExperience: React.FC<AboutExperienceProps> = ({ experience }) => {
  if (!experience || experience.length === 0) return null;

  return (
    <section className="py-12 border-b border-gray-200" aria-labelledby="experience-heading">
      <h2
        id="experience-heading"
        className="text-2xl sm:text-3xl font-bold text-center text-regal-blue mb-12"
      >
        Professional Experience
      </h2>

      <div className="relative max-w-4xl mx-auto">
        {/* Central timeline vertical line */}
        <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-bermuda transform md:-translate-x-1/2"></div>

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
                {/* Timeline Marker Dot */}
                <div className="absolute left-4 md:left-1/2 top-6 w-4 h-4 rounded-full bg-bermuda border-4 border-white shadow ring-2 ring-bermuda transform -translate-x-1/2 z-10"></div>

                {/* Content Card */}
                <div
                  className={`ml-10 md:ml-0 md:w-1/2 ${
                    isEven ? 'md:pl-10 text-left' : 'md:pr-10 md:text-right'
                  }`}
                >
                  <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-200 hover:-translate-y-0.5">
                    <div className="mb-2">
                      <h3 className="text-xl font-bold text-regal-blue">{exp.title}</h3>
                      <p className="text-base font-semibold text-bermuda">{exp.company}</p>
                      <span className="inline-block text-xs font-semibold text-gray-500 uppercase tracking-wider mt-1">
                        {exp.startDate} - {exp.endDate || 'Present'}
                      </span>
                    </div>

                    <p className="text-sm text-gray-600 leading-relaxed mb-4 text-left">
                      {exp.description}
                    </p>

                    <div
                      className={`flex flex-wrap gap-1.5 ${
                        isEven ? 'justify-start' : 'md:justify-end justify-start'
                      }`}
                    >
                      {exp.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="inline-block bg-bermuda/15 border border-bermuda/30 text-regal-blue text-xs font-medium px-2.5 py-0.5 rounded-full"
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
