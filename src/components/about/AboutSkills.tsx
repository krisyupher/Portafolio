import React, { useState } from 'react';
import { SkillCategory } from '../../types';

interface AboutSkillsProps {
  skillCategories: SkillCategory[];
}

const getProficiencyBadgeClass = (proficiency: string) => {
  switch (proficiency.toLowerCase()) {
    case 'expert':
      return 'bg-emerald-50 text-emerald-700 border-emerald-300 font-bold';
    case 'advanced':
      return 'bg-blue-50 text-blue-700 border-blue-300 font-semibold';
    case 'intermediate':
      return 'bg-amber-50 text-amber-700 border-amber-300 font-medium';
    default:
      return 'bg-slate-50 text-slate-700 border-slate-300 font-normal';
  }
};

const getProficiencyPercentage = (proficiency: string): number => {
  switch (proficiency.toLowerCase()) {
    case 'expert':
      return 95;
    case 'advanced':
      return 85;
    case 'intermediate':
      return 70;
    default:
      return 60;
  }
};

const getSkillIcon = (id: string): string => {
  const map: Record<string, string> = {
    angular: 'fa-brands fa-angular text-red-600',
    typescript: 'fa-solid fa-code text-blue-600',
    react: 'fa-brands fa-react text-cyan-500',
    html5: 'fa-brands fa-html5 text-orange-500',
    css3: 'fa-brands fa-css3-alt text-blue-500',
    sass: 'fa-brands fa-sass text-pink-500',
    tailwind: 'fa-solid fa-wind text-teal-500',
    bootstrap: 'fa-brands fa-bootstrap text-purple-600',
    rxjs: 'fa-solid fa-bolt text-pink-600',
    ionic: 'fa-solid fa-mobile-screen text-blue-400',
    nodejs: 'fa-brands fa-node-js text-emerald-600',
    express: 'fa-solid fa-server text-slate-700',
    dotnet: 'fa-solid fa-cube text-purple-700',
    graphql: 'fa-solid fa-diagram-project text-pink-500',
    'rest-api': 'fa-solid fa-network-wired text-regal-blue',
    nginx: 'fa-solid fa-shield-halved text-emerald-700',
    postgresql: 'fa-solid fa-database text-blue-700',
    mongodb: 'fa-solid fa-leaf text-emerald-500',
    redis: 'fa-solid fa-memory text-red-500',
    azure: 'fa-brands fa-microsoft text-blue-500',
    docker: 'fa-brands fa-docker text-blue-500',
    firebase: 'fa-solid fa-fire text-amber-500',
    git: 'fa-brands fa-git-alt text-orange-600',
    linux: 'fa-brands fa-linux text-slate-800',
    jest: 'fa-solid fa-vial-circle-check text-red-600',
    postman: 'fa-solid fa-paper-plane text-orange-500',
    agile: 'fa-solid fa-arrows-spin text-blue-600',
    cicd: 'fa-solid fa-infinity text-teal-600',
    'responsive-design': 'fa-solid fa-display text-purple-500',
  };
  return map[id] || 'fa-solid fa-check text-bermuda';
};

export const AboutSkills: React.FC<AboutSkillsProps> = ({ skillCategories }) => {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [searchTerm, setSearchTerm] = useState<string>('');

  if (!skillCategories || skillCategories.length === 0) return null;

  const categoryNames = ['All', ...skillCategories.map((c) => c.name)];

  const filteredCategories = skillCategories
    .filter((cat) => (activeCategory === 'All' ? true : cat.name === activeCategory))
    .map((cat) => {
      const skills = cat.skills.filter((skill) =>
        searchTerm.trim()
          ? skill.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            skill.proficiency.toLowerCase().includes(searchTerm.toLowerCase())
          : true
      );
      return { ...cat, skills };
    })
    .filter((cat) => cat.skills.length > 0);

  return (
    <section className="py-12 border-b border-slate-200/80" aria-labelledby="skills-heading">
      <div className="text-center max-w-3xl mx-auto mb-8 space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-bermuda/15 text-regal-blue text-xs font-bold uppercase tracking-wider">
          <i className="fas fa-microchip text-bermuda"></i>
          <span>Engineering Arsenal</span>
        </div>
        <h2
          id="skills-heading"
          className="text-3xl sm:text-4xl font-heading font-extrabold text-regal-blue tracking-tight"
        >
          Technical Skills & Mastery
        </h2>
        <p className="text-slate-600 text-sm sm:text-base">
          Battle-tested tech stack across frontend architectures, high-performance backends, cloud DevOps, and robust databases.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8">
        {/* Category Pills */}
        <div className="flex flex-wrap items-center gap-2">
          {categoryNames.map((name) => {
            const isActive = activeCategory === name;
            return (
              <button
                key={name}
                type="button"
                onClick={() => setActiveCategory(name)}
                className={`px-4 py-2 rounded-full text-xs font-bold tracking-wide transition-all duration-200 ${
                  isActive
                    ? 'bg-regal-blue text-white shadow-md'
                    : 'bg-white text-slate-600 border border-slate-200 hover:border-bermuda hover:text-regal-blue'
                }`}
              >
                {name}
              </button>
            );
          })}
        </div>

        {/* Search Input */}
        <div className="relative w-full md:w-64">
          <i className="fas fa-search absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-xs"></i>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search skills (e.g., React)..."
            className="w-full pl-9 pr-4 py-2 rounded-full bg-white border border-slate-200 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-bermuda focus:border-transparent transition-all"
          />
          {searchTerm && (
            <button
              type="button"
              onClick={() => setSearchTerm('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 text-xs"
            >
              <i className="fas fa-times"></i>
            </button>
          )}
        </div>
      </div>

      {/* Skills Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCategories.map((category) => (
          <div
            key={category.name}
            className="glass-card rounded-2xl p-6 border border-slate-200/80 hover:shadow-lg transition-all duration-300"
          >
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-100">
              <h3 className="text-base font-heading font-extrabold text-regal-blue tracking-tight flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-bermuda"></span>
                {category.name}
              </h3>
              <span className="text-xs font-mono text-slate-400 font-semibold">
                {category.skills.length} skills
              </span>
            </div>

            <div className="flex flex-col space-y-3">
              {category.skills.map((skill) => {
                const percentage = getProficiencyPercentage(skill.proficiency);
                return (
                  <div
                    key={skill.id}
                    className="p-3 bg-slate-50/90 rounded-xl border border-slate-100 hover:bg-white hover:border-bermuda/30 hover:shadow-sm transition-all duration-200 group"
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <div className="flex items-center gap-2.5">
                        <i className={`${getSkillIcon(skill.id)} text-sm w-4 text-center`}></i>
                        <span className="text-xs font-bold text-slate-800 group-hover:text-regal-blue transition-colors">
                          {skill.name}
                        </span>
                      </div>
                      <span
                        className={`text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full border ${getProficiencyBadgeClass(
                          skill.proficiency
                        )}`}
                      >
                        {skill.proficiency}
                      </span>
                    </div>

                    {/* Proficiency Progress Bar */}
                    <div className="w-full bg-slate-200/70 h-1.5 rounded-full overflow-hidden">
                      <div
                        className="bg-gradient-to-r from-regal-blue to-bermuda h-full rounded-full transition-all duration-500"
                        style={{ width: `${percentage}%` }}
                      ></div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
