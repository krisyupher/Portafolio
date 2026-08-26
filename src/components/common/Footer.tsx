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
  {
    id: 'github',
    label: 'GitHub',
    url: 'https://github.com/krisyupher',
    icon: 'github',
  },
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
  'Azure Cloud',
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
    if (onShowToast) {
      onShowToast('Email copied to clipboard!');
    }
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <footer className="bg-gradient-to-b from-[#033056] via-[#034378] to-[#022849] text-white pt-16 pb-8 mt-auto relative overflow-hidden border-t border-bermuda/20">
      {/* Ambient background glow */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-bermuda/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 right-10 w-80 h-80 bg-accent-cyan/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Top Callout Strip */}
        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 mb-12 border border-white/10 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="text-center md:text-left space-y-1">
            <h2 className="text-2xl sm:text-3xl font-heading font-extrabold text-white">
              Let&apos;s build something high-impact together
            </h2>
            <p className="text-slate-200 text-sm">
              Available for full-stack engineering roles, enterprise consulting, and architectural design.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={handleCopyEmail}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-bermuda hover:bg-bermuda-light text-slate-900 font-bold text-sm shadow-glow-teal hover:scale-105 transition-all duration-200"
            >
              <i className={`fas ${copied ? 'fa-check' : 'fa-copy'}`}></i>
              <span>{copied ? 'Email Copied!' : 'Copy Email'}</span>
            </button>
            <a
              href={`mailto:${contactEmail}`}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/15 hover:bg-white/25 text-white font-semibold text-sm border border-white/20 transition-colors"
            >
              <i className="fas fa-paper-plane"></i>
              <span>Send Message</span>
            </a>
          </div>
        </div>

        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand Column */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-bermuda to-accent-cyan flex items-center justify-center text-slate-900 font-heading font-black text-base shadow-sm">
                CF
              </div>
              <span className="text-xl font-heading font-extrabold text-white tracking-tight">
                Cristian Florez
              </span>
            </div>
            <p className="text-sm text-slate-300 leading-relaxed">
              Full-Stack Software Developer specializing in TypeScript, React 19, Angular, Node.js, and enterprise cloud solutions with 4+ years of proven performance.
            </p>
            <div className="pt-1 flex items-center gap-2 text-xs text-bermuda font-semibold">
              <span className="w-2 h-2 rounded-full bg-bermuda animate-pulse"></span>
              <span>Based in Colombia • Open to Global & Remote</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-xs font-bold text-bermuda uppercase tracking-wider">
              Navigation
            </h3>
            <ul className="space-y-2.5">
              {quickLinks.map((link) => (
                <li key={link.id}>
                  <Link
                    to={link.path || `/${link.id}`}
                    className="text-sm text-slate-300 hover:text-bermuda hover:translate-x-1 transition-all duration-200 inline-flex items-center gap-2"
                  >
                    <i className="fas fa-chevron-right text-[10px] text-bermuda/60"></i>
                    <span>{link.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Core Technologies */}
          <div className="space-y-4">
            <h3 className="text-xs font-bold text-bermuda uppercase tracking-wider">
              Core Tech Stack
            </h3>
            <div className="flex flex-wrap gap-1.5">
              {technologies.map((tech) => (
                <span
                  key={tech}
                  className="inline-block bg-white/10 border border-white/15 text-slate-200 text-[11px] px-2.5 py-1 rounded-md font-mono transition-colors hover:bg-bermuda/20 hover:text-bermuda hover:border-bermuda/40"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Connect & Socials */}
          <div className="space-y-4">
            <h3 className="text-xs font-bold text-bermuda uppercase tracking-wider">
              Connect
            </h3>
            <div className="space-y-2.5">
              {socialLinks.map((link) => (
                <a
                  key={link.id}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-3 text-sm text-slate-300 hover:text-bermuda hover:translate-x-1 transition-all duration-200"
                >
                  <div className="w-7 h-7 rounded-lg bg-white/10 flex items-center justify-center text-bermuda">
                    <i className={`fab fa-${link.icon} text-sm`}></i>
                  </div>
                  <span>{link.label}</span>
                </a>
              ))}
              <a
                href={`mailto:${contactEmail}`}
                className="flex items-center space-x-3 text-sm text-slate-300 hover:text-bermuda hover:translate-x-1 transition-all duration-200 pt-1"
              >
                <div className="w-7 h-7 rounded-lg bg-white/10 flex items-center justify-center text-bermuda">
                  <i className="fas fa-envelope text-xs"></i>
                </div>
                <span className="truncate">{contactEmail}</span>
              </a>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p>&copy; {currentYear} Cristian Florez. Designed with precision & clean code.</p>
          <p className="flex items-center gap-1">
            <span>Engineered with</span>
            <span className="text-bermuda font-mono">React 19 + TypeScript + Tailwind</span>
          </p>
        </div>
      </div>
    </footer>
  );
};
