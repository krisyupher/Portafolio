import React from 'react';
import { SkillCategory } from '../../types';

interface AboutSkillsProps {
  skillCategories: SkillCategory[];
}

const getProficiencyBadgeClass = (proficiency: string) => {
  switch (proficiency.toLowerCase()) {
    case 'expert':
      return 'bg-emerald-50 text-emerald-700 border-emerald-200';
    case 'advanced':
      return 'bg-blue-50 text-blue-700 border-blue-200';
    case 'intermediate':
      return 'bg-amber-50 text-amber-700 border-amber-200';
    default:
      return 'bg-gray-50 text-gray-700 border-gray-200';
  }
};

export const AboutSkills: React.FC<AboutSkillsProps> = ({ skillCategories }) => {
  if (!skillCategories || skillCategories.length === 0) return null;

  return (
    <section className="py-10 border-b border-gray-200" aria-labelledby="skills-heading">
      <h2
        id="skills-heading"
        className="text-2xl sm:text-3xl font-bold text-center text-regal-blue mb-8"
      >
        Technical Skills & Expertise
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {skillCategories.map((category) => (
          <div
            key={category.name}
            className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-200 hover:-translate-y-1"
          >
            <h3 className="text-lg font-bold text-bermuda uppercase tracking-wide mb-4 pb-2 border-b border-gray-100">
              {category.name}
            </h3>

            <div className="flex flex-col space-y-2.5">
              {category.skills.map((skill) => (
                <div
                  key={skill.id}
                  className="flex items-center justify-between py-2 px-3 bg-gray-50/80 rounded-md border-l-4 border-bermuda hover:bg-gray-100/90 transition-colors"
                >
                  <span className="text-sm font-medium text-gray-800">
                    {skill.name}
                  </span>
                  <span
                    className={`text-[11px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded border ${getProficiencyBadgeClass(
                      skill.proficiency
                    )}`}
                  >
                    {skill.proficiency}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
