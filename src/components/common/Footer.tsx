import React from 'react';
import { Link } from 'react-router-dom';
import { NAV_ITEMS, SITE, SOCIAL_LINKS } from '../../data/site';
import { useCopyToClipboard } from '../../hooks/useCopyToClipboard';
import { SocialLink } from '../../types';
import { Reveal } from './Reveal';

interface FooterProps {
  contactEmail?: string;
  socialLinks?: SocialLink[];
}

/** Global contact section and footer. Always dark via `.theme-inverse`. */
export const Footer: React.FC<FooterProps> = ({
  contactEmail = SITE.email,
  socialLinks = SOCIAL_LINKS,
}) => {
  const { copied, copy } = useCopyToClipboard();
  const currentYear = new Date().getFullYear();

  return (
    <footer
      id="contact"
      aria-labelledby="contact-title"
      className="theme-inverse relative mt-auto scroll-mt-16 overflow-hidden border-t border-line bg-paper text-ink"
    >
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-grid opacity-40 [mask-image:radial-gradient(ellipse_80%_70%_at_50%_0%,black,transparent_75%)]" />
        <div className="absolute -top-48 left-1/2 h-96 w-[48rem] -translate-x-1/2 rounded-full bg-accent/10 blur-[110px]" />
      </div>

      <div className="container-page relative pb-10 pt-24 sm:pt-32">
        <Reveal>
          <p className="eyebrow">Contact</p>
          <h2 id="contact-title" className="mt-5 max-w-4xl text-display-lg font-semibold text-ink">
            Have a platform to build, scale or modernize?{' '}
            <span className="text-ink-muted">Let&apos;s make it fast.</span>
          </h2>
        </Reveal>

        <Reveal delay={120} className="mt-12 flex flex-col gap-5 sm:flex-row sm:items-center">
          <a
            href={`mailto:${contactEmail}`}
            className="link-draw self-start font-display text-2xl font-medium tracking-tight text-ink sm:text-3xl"
          >
            {contactEmail}
          </a>
          <button
            type="button"
            onClick={() => copy(contactEmail)}
            className="btn btn-secondary self-start sm:self-auto"
          >
            <i
              className={`fas ${copied ? 'fa-check text-accent' : 'fa-copy'}`}
              aria-hidden="true"
            ></i>
            {copied ? 'Copied' : 'Copy email'}
          </button>
          <span className="sr-only" role="status" aria-live="polite">
            {copied ? 'Email address copied to clipboard' : ''}
          </span>
        </Reveal>

        <Reveal delay={200} className="mt-20 grid gap-10 border-t border-line pt-10 sm:grid-cols-3">
          <div>
            <h3 className="eyebrow">Connect</h3>
            <ul className="mt-4 space-y-2.5">
              {socialLinks.map((link) => (
                <li key={link.id}>
                  <a
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-3 text-ink-soft transition-colors hover:text-ink"
                  >
                    <i
                      className={`fab fa-${link.icon} w-4 text-center text-ink-muted transition-colors group-hover:text-accent`}
                      aria-hidden="true"
                    ></i>
                    <span className="link-draw">{link.label}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="eyebrow">Navigate</h3>
            <ul className="mt-4 space-y-2.5">
              {NAV_ITEMS.map((item) => (
                <li key={item.id}>
                  <Link
                    to={item.path}
                    className="link-draw text-ink-soft transition-colors hover:text-ink"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="eyebrow">Résumé</h3>
            <ul className="mt-4 space-y-2.5">
              <li>
                <a
                  href={SITE.resume.en}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-draw text-ink-soft transition-colors hover:text-ink"
                >
                  English (PDF)
                </a>
              </li>
              <li>
                <a
                  href={SITE.resume.es}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-draw text-ink-soft transition-colors hover:text-ink"
                >
                  Español (PDF)
                </a>
              </li>
            </ul>
          </div>
        </Reveal>

        <div className="mt-16 flex flex-col gap-3 border-t border-line pt-8 font-mono text-[0.7rem] uppercase tracking-[0.14em] text-ink-muted sm:flex-row sm:items-center sm:justify-between">
          <p>
            &copy; {currentYear} {SITE.name} · {SITE.location}
          </p>
          <p>Built with React, TypeScript &amp; Tailwind CSS</p>
        </div>
      </div>
    </footer>
  );
};
