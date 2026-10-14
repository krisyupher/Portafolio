import React from 'react';
import { StackGroup } from '../../types';
import { Reveal } from '../common/Reveal';
import { SectionHeading } from '../common/SectionHeading';

interface StackSectionProps {
  stack: StackGroup[];
}

/** The first group is spotlighted; the rest render as a spec sheet. */
export const StackSection: React.FC<StackSectionProps> = ({ stack }) => {
  const [spotlight, ...groups] = stack;

  return (
    <section aria-labelledby="stack-title" className="section border-t border-line">
      <div className="container-page">
        <Reveal>
          <SectionHeading
            id="stack-title"
            index="03"
            eyebrow="Stack"
            title="Tools I rely on in production"
            description="A focused toolkit: every technology here has shipped to real users."
          />
        </Reveal>

        {spotlight && (
          <Reveal delay={80} className="mt-14">
            <div className="theme-inverse relative isolate overflow-hidden rounded-3xl border border-line bg-paper-raised p-8 text-ink sm:p-10 lg:p-12">
              <div
                aria-hidden="true"
                className="absolute -right-24 -top-24 -z-10 h-80 w-80 rounded-full bg-accent/20 blur-[90px]"
              />
              <div
                aria-hidden="true"
                className="absolute inset-0 -z-10 bg-grid opacity-30 [mask-image:linear-gradient(to_left,black,transparent_70%)]"
              />
              <div className="grid gap-8 lg:grid-cols-12 lg:gap-12">
                <div className="lg:col-span-5">
                  <p className="inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-3 py-1 font-mono text-[0.68rem] uppercase tracking-[0.16em] text-accent-ink">
                    <i className={`fas ${spotlight.icon}`} aria-hidden="true"></i>
                    Now shipping with
                  </p>
                  <h3 className="mt-5 text-3xl font-semibold tracking-tight sm:text-4xl">
                    {spotlight.name}
                  </h3>
                  <p className="mt-3 max-w-md leading-relaxed text-ink-muted">
                    {spotlight.summary}
                  </p>
                </div>
                <ul
                  className="flex flex-wrap content-center gap-2.5 lg:col-span-7"
                  aria-label={`${spotlight.name} tools`}
                >
                  {spotlight.items.map((item) => (
                    <li
                      key={item}
                      className="rounded-full border border-line-strong bg-paper-raised/70 px-4 py-2 text-sm font-medium text-ink transition-colors duration-300 hover:border-accent/60 hover:text-accent-ink"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Reveal>
        )}

        <dl className="mt-6 divide-y divide-line border-y border-line">
          {groups.map((group, index) => (
            <Reveal
              key={group.id}
              delay={index * 60}
              className="grid gap-4 py-7 md:grid-cols-12 md:items-center md:gap-8"
            >
              <dt className="flex items-start gap-4 md:col-span-5">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-line bg-paper-raised text-ink-muted">
                  <i className={`fas ${group.icon} text-[0.8rem]`} aria-hidden="true"></i>
                </span>
                <span>
                  <span className="block font-display text-lg font-semibold tracking-tight text-ink">
                    {group.name}
                  </span>
                  <span className="mt-0.5 block text-sm text-ink-muted">{group.summary}</span>
                </span>
              </dt>
              <dd className="md:col-span-7">
                <ul className="flex flex-wrap gap-2" aria-label={`${group.name} tools`}>
                  {group.items.map((item) => (
                    <li key={item} className="chip text-[0.75rem]">
                      {item}
                    </li>
                  ))}
                </ul>
              </dd>
            </Reveal>
          ))}
        </dl>
      </div>
    </section>
  );
};
