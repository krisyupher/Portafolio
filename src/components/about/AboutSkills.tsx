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
    'rest-api': 'fa-solid fa-network-wired',
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
  return map[id] || 'fa-solid fa-check';
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
    <section className="py-16" aria-labelledby="skills-heading">
      <div className="text-center max-w-3xl mx-auto mb-12">
        <div
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider animate-fadeIn"
          style={{ background: 'var(--color-accent-pale)', color: 'var(--color-accent)' }}
        >
          <i className="fas fa-microchip"></i>
          <span>Engineering Arsenal</span>
        </div>
        <h2
          id="skills-heading"
          className="font-heading font-extrabold tracking-tight mt-3 animate-slideUp"
          style={{ fontSize: 'var(--text-h1)', color: 'var(--color-brand)' }}
        >
          Technical Skills & Mastery
        </h2>
        <p
          className="text-body-lg mt-2 animate-slideUp delay-1"
          style={{ color: 'var(--color-ink-muted)' }}
        >
          Battle-tested tech stack across frontend architectures, high-performance backends, cloud
          DevOps, and robust databases.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-10 animate-slideUp delay-2">
        {/* Category Pills */}
        <div
          className="flex flex-wrap items-center gap-2"
          role="tablist"
          aria-label="Skill categories"
        >
          {categoryNames.map((name) => {
            const isActive = activeCategory === name;
            return (
              <button
                key={name}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => setActiveCategory(name)}
                className={`px-4 py-2 rounded-full text-xs font-bold tracking-wide transition-all duration-300 ${
                  isActive ? 'shadow-md' : 'hover:shadow-sm'
                }`}
                style={{
                  background: isActive ? 'var(--color-brand)' : 'var(--color-paper)',
                  color: isActive ? 'white' : 'var(--color-ink-muted)',
                  border: isActive ? 'none' : '1px solid var(--color-border)',
                  boxShadow: isActive ? '0 4px 16px -4px rgba(3, 67, 120, 0.4)' : undefined,
                }}
              >
                {name}
              </button>
            );
          })}
        </div>

        {/* Search Input */}
        <div className="relative w-full md:w-64">
          <i
            className="fas fa-search absolute left-3.5 top-1/2 -translate-y-1/2 text-xs"
            style={{ color: 'var(--color-ink-faint)' }}
          ></i>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search skills (e.g., React)..."
            className="input pl-9 pr-4 py-2 rounded-full text-xs font-medium"
            style={{
              background: 'var(--color-paper)',
              borderColor: 'var(--color-border)',
              color: 'var(--color-ink)',
            }}
          />
          {searchTerm && (
            <button
              type="button"
              onClick={() => setSearchTerm('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-xs transition-colors"
              style={{ color: 'var(--color-ink-faint)' }}
            >
              <i className="fas fa-times"></i>
            </button>
          )}
        </div>
      </div>

      {/* Skills Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCategories.map((category, catIndex) => (
          <div
            key={category.name}
            className="glass-card rounded-2xl p-6 border animate-slideUp"
            style={{ borderColor: 'var(--color-border)', animationDelay: `${catIndex * 100}ms` }}
          >
            <div
              className="flex items-center justify-between pb-4 mb-4 border-b"
              style={{ borderColor: 'var(--color-border)' }}
            >
              <h3
                className="font-heading font-extrabold tracking-tight flex items-center gap-2"
                style={{ color: 'var(--color-brand)' }}
              >
                <span
                  className="w-2 h-2 rounded-full"
                  style={{ background: 'var(--color-accent)' }}
                ></span>
                {category.name}
              </h3>
              <span
                className="text-xs font-mono font-semibold"
                style={{ color: 'var(--color-ink-faint)' }}
              >
                {category.skills.length} skills
              </span>
            </div>

            <div className="flex flex-col space-y-3">
              {category.skills.map((skill, skillIndex) => {
                const percentage = getProficiencyPercentage(skill.proficiency);
                return (
                  <div
                    key={skill.id}
                    className="p-3 rounded-xl border transition-all duration-200 group animate-slideUp"
                    style={{
                      background: 'var(--color-paper-subtle)',
                      borderColor: 'var(--color-border)',
                      animationDelay: `${skillIndex * 50}ms`,
                    }}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2.5">
                        <i
                          className={`${getSkillIcon(skill.id)} text-base w-5 text-center`}
                          style={{ color: 'var(--color-brand)' }}
                        ></i>
                        <span
                          className="text-xs font-bold group-hover:text-brand transition-colors"
                          style={{ color: 'var(--color-ink)' }}
                        >
                          {skill.name}
                        </span>
                      </div>
                      <span
                        className={`text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full border ${getProficiencyBadgeClass(skill.proficiency)}`}
                      >
                        {skill.proficiency}
                      </span>
                    </div>

                    {/* Proficiency Progress Bar */}
                    <div
                      className="w-full h-1.5 rounded-full overflow-hidden"
                      style={{ background: 'var(--color-border)' }}
                    >
                      <div
                        className="h-full rounded-full transition-all duration-700 ease-out"
                        style={{
                          width: `${percentage}%`,
                          background:
                            'linear-gradient(90deg, var(--color-brand) 0%, var(--color-accent) 100%)',
                        }}
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
