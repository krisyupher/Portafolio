import React from 'react';
import { Experience } from '../../types';
import { Reveal } from '../common/Reveal';
import { SectionHeading } from '../common/SectionHeading';

interface ExperienceSectionProps {
  experience: Experience[];
}

export const ExperienceSection: React.FC<ExperienceSectionProps> = ({ experience }) => (
  <section aria-labelledby="experience-title" className="section">
    <div className="container-page grid gap-12 lg:grid-cols-12 lg:gap-10">
      <div className="lg:col-span-4">
        <Reveal className="lg:sticky lg:top-28">
          <SectionHeading
            id="experience-title"
            index="02"
            eyebrow="Experience"
            title="Where I've shipped"
            description="Platforms for the highest court in Colombia, a top national bank and fast-moving product teams."
          />
        </Reveal>
      </div>

      <ol className="border-t border-line lg:col-span-8">
        {experience.map((job, index) => (
          <li key={job.id} className="border-b border-line">
            <Reveal
              delay={index * 60}
              className="grid gap-4 py-10 sm:grid-cols-[8.5rem_1fr] sm:gap-8"
            >
              <p className="pt-1.5 font-mono text-[0.72rem] uppercase tracking-[0.14em] text-ink-muted">
                {job.startDate} — {job.endDate ?? 'Present'}
              </p>
              <div>
                <h3 className="text-xl font-semibold tracking-tight text-ink sm:text-2xl">
                  {job.title}
                </h3>
                <p className="mt-1.5 text-sm text-ink-muted">
                  <span className="font-medium text-ink-soft">{job.company}</span>
                  {job.location && <> · {job.location}</>}
                </p>
                <p className="mt-5 leading-relaxed text-ink-soft">{job.description}</p>
                <ul className="mt-5 space-y-3">
                  {job.achievements.map((achievement) => (
                    <li
                      key={achievement}
                      className="flex gap-3 text-[0.95rem] leading-relaxed text-ink-soft"
                    >
                      <span
                        className="mt-[0.6rem] h-1.5 w-1.5 shrink-0 rounded-full bg-accent"
                        aria-hidden="true"
                      />
                      {achievement}
                    </li>
                  ))}
                </ul>
                <ul
                  className="mt-6 flex flex-wrap gap-2"
                  aria-label={`Technologies used at ${job.company}`}
                >
                  {job.technologies.map((tech) => (
                    <li key={tech} className="chip">
                      {tech}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </li>
        ))}
      </ol>
    </div>
  </section>
);
