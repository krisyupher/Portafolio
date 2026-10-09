import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { NavItem, SocialLink } from '../../types';

interface FooterProps {
  quickLinks?: NavItem[];
  socialLinks?: SocialLink[];
  technologies?: string[];
  contactEmail?: string;
  onShowToast?: (text: string) => void;
}

const DEFAULT_QUICK_LINKS: NavItem[] = [
  { id: 'home', label: 'Home', path: '/home' },
  { id: 'about', label: 'About', path: '/about' },
  { id: 'portfolio', label: 'Featured Portfolio', path: '/portfolio' },
  { id: 'filosofy', label: 'Architecture & Standards', path: '/filosofy' },
];

const DEFAULT_SOCIAL_LINKS: SocialLink[] = [
  { id: 'github', label: 'GitHub', url: 'https://github.com/krisyupher', icon: 'github' },
  {
    id: 'linkedin',
    label: 'LinkedIn',
    url: 'https://www.linkedin.com/in/ccflorezrud/',
    icon: 'linkedin',
  },
  {
    id: 'instagram',
    label: 'Instagram',
    url: 'https://www.instagram.com/krisyupher/',
    icon: 'instagram',
  },
];

const DEFAULT_TECHNOLOGIES: string[] = [
  'React 19',
  'TypeScript',
  'Vite',
  'Angular',
  'Node.js',
  'Express.js',
  '.NET',
  'PostgreSQL',
  'Docker',
  'Azure',
  'Tailwind CSS',
];

export const Footer: React.FC<FooterProps> = ({
  quickLinks = DEFAULT_QUICK_LINKS,
  socialLinks = DEFAULT_SOCIAL_LINKS,
  technologies = DEFAULT_TECHNOLOGIES,
  contactEmail = 'ccflorezrud@gmail.com',
  onShowToast,
}) => {
  const [copied, setCopied] = useState(false);
  const currentYear = new Date().getFullYear();

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(contactEmail);
    setCopied(true);
    if (onShowToast) onShowToast('Email copied to clipboard!');
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <footer
      className="relative mt-auto pt-20 pb-12 overflow-hidden noise-overlay"
      style={{ background: 'var(--color-ink)', color: 'var(--color-paper)' }}
    >
      {/* Ambient Glows */}
      <div
        className="ambient-glow"
        style={{
          width: '32rem',
          height: '32rem',
          top: '-16rem',
          left: '25%',
          background: 'radial-gradient(circle, rgba(3, 67, 120, 0.15) 0%, transparent 70%)',
        }}
      ></div>
      <div
        className="ambient-glow"
        style={{
          width: '28rem',
          height: '28rem',
          bottom: '-14rem',
          right: '10%',
          background: 'radial-gradient(circle, rgba(0, 196, 151, 0.12) 0%, transparent 70%)',
        }}
      ></div>

      <div className="container relative z-10">
        {/* Top Callout */}
        <div
          className="glass-strong rounded-3xl p-8 md:p-12 mb-16 flex flex-col md:flex-row items-center justify-between gap-8"
          style={{ borderColor: 'var(--color-border)' }}
        >
          <div className="text-center md:text-left space-y-2">
            <h2
              className="text-2xl md:text-3xl font-heading font-extrabold tracking-tight"
              style={{ color: 'var(--color-paper)' }}
            >
              Let&apos;s build something high-impact together
            </h2>
            <p className="text-sm max-w-md" style={{ color: 'var(--color-ink-muted)' }}>
              Available for full-stack engineering roles, enterprise consulting, and architectural
              design.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={handleCopyEmail}
              className="btn btn-accent px-6 py-3 text-sm"
            >
              <i className={`fas ${copied ? 'fa-check' : 'fa-copy'}`}></i>
              <span>{copied ? 'Email Copied!' : 'Copy Email'}</span>
            </button>
            <a
              href={`mailto:${contactEmail}`}
              className="btn btn-outline px-6 py-3 text-sm"
              style={{ borderColor: 'var(--color-border)', color: 'var(--color-paper)' }}
            >
              <i className="fas fa-paper-plane"></i>
              <span>Send Message</span>
            </a>
          </div>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-14 mb-16">
          {/* Brand Column */}
          <div className="space-y-6 lg:col-span-1">
            <div className="flex items-center gap-3">
              <div
                className="w-9 h-9 rounded-xl brand-gradient flex items-center justify-center font-heading font-black text-base"
                style={{ boxShadow: '0 4px 16px -4px rgba(3, 67, 120, 0.4)' }}
              >
                CF
              </div>
              <span
                className="text-xl font-heading font-extrabold tracking-tight"
                style={{ color: 'var(--color-paper)' }}
              >
                Cristian Florez
              </span>
            </div>
            <p className="text-sm leading-relaxed" style={{ color: 'var(--color-ink-muted)' }}>
              Full-Stack Software Developer specializing in TypeScript, React 19, Angular, Node.js,
              and enterprise cloud solutions with 4+ years of proven performance.
            </p>
            <div
              className="pt-2 flex items-center gap-2 text-xs font-semibold"
              style={{ color: 'var(--color-accent)' }}
            >
              <span
                className="w-2 h-2 rounded-full animate-pulse"
                style={{ background: 'var(--color-accent)' }}
              ></span>
              <span>Based in Colombia • Open to Global & Remote</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-6">
            <h3
              className="text-xs font-bold uppercase tracking-wider"
              style={{ color: 'var(--color-accent)' }}
            >
              Navigation
            </h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.id}>
                  <Link
                    to={link.path || `/${link.id}`}
                    className="text-sm flex items-center gap-2 transition-all duration-200 group"
                    style={{ color: 'var(--color-ink-muted)' }}
                  >
                    <i
                      className="fas fa-chevron-right text-[10px] group-hover:translate-x-1 transition-transform duration-200"
                      style={{ color: 'var(--color-accent)' }}
                    ></i>
                    <span>{link.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Technologies */}
          <div className="space-y-6">
            <h3
              className="text-xs font-bold uppercase tracking-wider"
              style={{ color: 'var(--color-accent)' }}
            >
              Core Tech Stack
            </h3>
            <div className="flex flex-wrap gap-2">
              {technologies.map((tech) => (
                <span
                  key={tech}
                  className="chip"
                  style={{
                    background: 'var(--color-paper-subtle)',
                    borderColor: 'var(--color-border)',
                    color: 'var(--color-ink-muted)',
                  }}
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Connect */}
          <div className="space-y-6">
            <h3
              className="text-xs font-bold uppercase tracking-wider"
              style={{ color: 'var(--color-accent)' }}
            >
              Connect
            </h3>
            <div className="space-y-3">
              {socialLinks.map((link) => (
                <a
                  key={link.id}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-3 text-sm transition-all duration-200 group"
                  style={{ color: 'var(--color-ink-muted)' }}
                >
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center group-hover:scale-105 transition-transform duration-200"
                    style={{
                      background: 'var(--color-paper-subtle)',
                      borderColor: 'var(--color-border)',
                    }}
                  >
                    <i
                      className={`fab fa-${link.icon} text-sm`}
                      style={{ color: 'var(--color-accent)' }}
                    ></i>
                  </div>
                  <span>{link.label}</span>
                </a>
              ))}
              <a
                href={`mailto:${contactEmail}`}
                className="flex items-center space-x-3 text-sm transition-all duration-200 group pt-1"
                style={{ color: 'var(--color-ink-muted)' }}
              >
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center group-hover:scale-105 transition-transform duration-200"
                  style={{ background: 'var(--color-paper-subtle)' }}
                >
                  <i
                    className="fas fa-envelope text-xs"
                    style={{ color: 'var(--color-accent)' }}
                  ></i>
                </div>
                <span className="truncate">{contactEmail}</span>
              </a>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div
          className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs"
          style={{ borderTopColor: 'var(--color-border)', color: 'var(--color-ink-faint)' }}
        >
          <p>&copy; {currentYear} Cristian Florez. Designed with precision & clean code.</p>
          <p
            className="flex items-center gap-1.5 font-mono"
            style={{ color: 'var(--color-accent)' }}
          >
            Engineered with <span>React 19 + TypeScript + Tailwind</span>
          </p>
        </div>
      </div>
    </footer>
  );
};
