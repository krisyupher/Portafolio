import React from 'react';
import { Link } from 'react-router-dom';
import { SITE } from '../../data/site';
import { useCopyToClipboard } from '../../hooks/useCopyToClipboard';
import { AboutInfo } from '../../types';

interface HeroProps {
  aboutInfo: AboutInfo;
}

const stagger = (step: number): React.CSSProperties => ({ animationDelay: `${step * 90}ms` });

export const Hero: React.FC<HeroProps> = ({ aboutInfo }) => {
  const { copied, copy } = useCopyToClipboard();

  const profileRows = [
    { label: 'Based in', value: aboutInfo.location },
    { label: 'Experience', value: aboutInfo.yearsOfExperience },
    { label: 'Focus', value: aboutInfo.focus },
  ];

  return (
    <section aria-labelledby="hero-title">
      <div className="container-page grid gap-14 pb-20 pt-14 sm:pb-24 sm:pt-20 lg:grid-cols-12 lg:items-end lg:gap-12 lg:pb-28 lg:pt-28">
        <div className="lg:col-span-8">
          <p className="eyebrow flex animate-rise items-center gap-3" style={stagger(0)}>
            <span className="relative flex h-2 w-2" aria-hidden="true">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
            </span>
            {aboutInfo.availability}
          </p>

          <h1
            id="hero-title"
            className="mt-7 animate-rise text-display-2xl font-semibold text-ink"
            style={stagger(1)}
          >
            {aboutInfo.name}
          </h1>

          <p
            className="mt-7 max-w-3xl animate-rise font-display text-display-sm font-medium text-ink-soft"
            style={stagger(2)}
          >
            {aboutInfo.headline}
          </p>

          <p
            className="mt-6 max-w-2xl animate-rise text-base leading-relaxed text-ink-muted sm:text-lg"
            style={stagger(3)}
          >
            {aboutInfo.bio}
          </p>

          <div className="mt-10 flex animate-rise flex-wrap items-center gap-3" style={stagger(4)}>
            <Link to="/portfolio" className="btn btn-primary group">
              View projects
              <i
                className="fas fa-arrow-right text-[0.7rem] transition-transform duration-300 group-hover:translate-x-0.5"
                aria-hidden="true"
              ></i>
            </Link>
            <a
              href={SITE.resume.en}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-secondary"
            >
              Download résumé
              <i className="fas fa-arrow-down text-[0.7rem]" aria-hidden="true"></i>
            </a>
            <button type="button" onClick={() => copy(SITE.email)} className="btn btn-ghost">
              <i
                className={`fas ${copied ? 'fa-check text-accent-ink' : 'fa-copy'} text-[0.8rem]`}
                aria-hidden="true"
              ></i>
              {copied ? 'Email copied' : 'Copy email'}
            </button>
            <span className="sr-only" role="status" aria-live="polite">
              {copied ? 'Email address copied to clipboard' : ''}
            </span>
          </div>
        </div>

        <aside
          aria-label="Profile summary"
          className="animate-rise lg:col-span-4"
          style={stagger(5)}
        >
          <div className="rounded-3xl border border-line bg-paper-raised/80 p-6 shadow-soft backdrop-blur sm:p-7">
            <div className="flex items-center gap-4">
              <img
                src={aboutInfo.profileImage}
                alt={`Portrait of ${aboutInfo.name}`}
                width={64}
                height={64}
                className="h-16 w-16 rounded-2xl object-cover ring-1 ring-line"
              />
              <div className="min-w-0">
                <p className="font-display text-lg font-semibold leading-tight tracking-tight text-ink">
                  {aboutInfo.title}
                </p>
                <p className="mt-1 font-mono text-[0.68rem] uppercase tracking-[0.14em] text-accent-ink">
                  Full-stack · Architecture · AI
                </p>
              </div>
            </div>

            <dl className="mt-6 divide-y divide-line border-t border-line">
              {profileRows.map((row) => (
                <div key={row.label} className="grid grid-cols-[6.5rem_1fr] gap-3 py-3.5 text-sm">
                  <dt className="font-mono text-[0.68rem] uppercase tracking-[0.14em] text-ink-muted">
                    {row.label}
                  </dt>
                  <dd className="text-ink-soft">{row.value}</dd>
                </div>
              ))}
            </dl>

            <a
              href={`mailto:${SITE.email}`}
              className="mt-2 flex items-center justify-between rounded-2xl bg-paper-sunken px-4 py-3 text-sm font-medium text-ink transition-colors hover:bg-accent-soft"
            >
              <span className="truncate">{SITE.email}</span>
              <i
                className="fas fa-arrow-right text-[0.7rem] text-accent-ink"
                aria-hidden="true"
              ></i>
            </a>
          </div>
        </aside>
      </div>
    </section>
  );
};
