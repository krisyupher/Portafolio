import React from 'react';
import { Education } from '../../types';

interface AboutEducationProps {
  education: Education[];
}

export const AboutEducation: React.FC<AboutEducationProps> = ({ education }) => {
  if (!education || education.length === 0) return null;

  return (
    <section className="py-12" aria-labelledby="education-heading">
      <h2
        id="education-heading"
        className="text-2xl sm:text-3xl font-bold text-center text-regal-blue mb-8"
      >
        Education & Certifications
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {education.map((edu) => (
          <div
            key={edu.id}
            className="bg-white rounded-xl p-6 shadow-sm border-l-4 border-bermuda border-t border-r border-b border-gray-100 hover:shadow-md transition-all duration-200 hover:-translate-y-1 flex flex-col justify-between"
          >
            <div>
              <h3 className="text-lg font-bold text-regal-blue mb-1">
                {edu.degree}
              </h3>
              <p className="text-sm font-semibold text-bermuda mb-2">
                {edu.institution}
              </p>
              <p className="text-xs text-gray-500 font-medium mb-3">
                {edu.field}
              </p>
              {edu.description && (
                <p className="text-sm text-gray-600 leading-relaxed mb-4">
                  {edu.description}
                </p>
              )}
            </div>

            <div className="pt-3 border-t border-gray-100 flex items-center justify-between">
              <span className="text-xs font-bold text-regal-blue uppercase tracking-wider">
                Graduated
              </span>
              <span className="inline-block bg-gray-100 text-gray-700 text-xs font-semibold px-2.5 py-1 rounded">
                {edu.graduationYear}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
