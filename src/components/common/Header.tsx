import React, { useState, useEffect } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { NavItem, SocialLink } from '../../types';

interface HeaderProps {
  navItems?: NavItem[];
  socialLinks?: SocialLink[];
  brandName?: string;
}

const DEFAULT_NAV_ITEMS: NavItem[] = [
  { id: 'home', label: 'Home', path: '/home' },
  { id: 'about', label: 'About', path: '/about' },
  { id: 'portfolio', label: 'Portfolio', path: '/portfolio' },
  { id: 'filosofy', label: 'Philosophy', path: '/filosofy' },
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

export const Header: React.FC<HeaderProps> = ({
  navItems = DEFAULT_NAV_ITEMS,
  socialLinks = DEFAULT_SOCIAL_LINKS,
  brandName = 'Cristian Florez',
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-40 transition-all duration-500 ${
        isScrolled
          ? 'bg-white/80 backdrop-blur-2xl border-b border-neutral-200/80 py-3 shadow-sm'
          : 'bg-transparent py-4'
      }`}
      style={{ borderColor: 'var(--color-border)' }}
    >
      <nav className="container flex items-center justify-between">
        {/* Brand */}
        <Link
          to="/home"
          className="flex items-center gap-3 group focus:outline-none"
          onClick={() => setMobileMenuOpen(false)}
          aria-label={`${brandName} - Home`}
        >
          <div
            className="w-10 h-10 rounded-xl brand-gradient flex items-center justify-center text-white font-heading font-black text-base shadow-lg group-hover:scale-105 group-hover:shadow-xl transition-all duration-500"
            style={{ boxShadow: '0 4px 20px -4px rgba(3, 67, 120, 0.4)' }}
          >
            CF
          </div>
          <div className="hidden sm:flex flex-col">
            <span className="text-xl font-heading font-extrabold tracking-tight text-ink group-hover:text-accent transition-colors duration-300">
              {brandName}
            </span>
            <span className="text-xs font-semibold text-ink-muted tracking-wider uppercase">
              Full-Stack Software Engineer
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <div
          className="hidden lg:flex items-center gap-1 px-1 bg-neutral-100/80 rounded-full border border-neutral-200/70"
          style={{ background: 'var(--color-paper-subtle)', borderColor: 'var(--color-border)' }}
        >
          {navItems.map((item) => (
            <NavLink
              key={item.id}
              to={item.path || `/${item.id}`}
              className={({ isActive }) =>
                `text-sm font-semibold px-4 py-2.5 rounded-full transition-all duration-300 ${
                  isActive
                    ? 'bg-white text-brand shadow-md font-bold'
                    : 'text-ink-muted hover:text-ink hover:bg-white/50'
                }`
              }
              style={{ color: 'var(--color-ink-muted)' }}
            >
              {item.label}
            </NavLink>
          ))}
        </div>

        {/* Right Actions */}
        <div className="hidden md:flex items-center space-x-3">
          <div
            className="flex items-center space-x-1.5 pr-3 border-r"
            style={{ borderColor: 'var(--color-border)' }}
          >
            {socialLinks.map((link) => (
              <a
                key={link.id}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                title={link.label}
                aria-label={link.label}
                className="w-9 h-9 flex items-center justify-center rounded-full text-ink-muted hover:text-white hover:bg-accent transition-all duration-300 hover:-translate-y-0.5"
                style={{ color: 'var(--color-ink-muted)' }}
              >
                <i className={`fab fa-${link.icon} text-base`}></i>
              </a>
            ))}
          </div>

          <a
            href="./assets/resumers/HojaDeVida-CristianFlorez.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary px-5 py-2 text-xs"
          >
            <i className="fas fa-file-arrow-down text-accent"></i>
            <span>Resume</span>
          </a>
        </div>

        {/* Mobile Hamburger */}
        <div className="flex lg:hidden items-center space-x-2">
          <a
            href="./assets/resumers/HojaDeVida-CristianFlorez.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary px-4 py-1.5 text-xs"
          >
            CV
          </a>
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-xl text-brand hover:bg-neutral-100 focus:outline-none"
            style={{ color: 'var(--color-brand)' }}
            aria-label="Toggle navigation menu"
            aria-expanded={mobileMenuOpen}
          >
            <i className={`fas ${mobileMenuOpen ? 'fa-times' : 'fa-bars'} text-xl`}></i>
          </button>
        </div>
      </nav>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div
          className="lg:hidden glass-strong border-t animate-slideDown px-4 pt-3 pb-6 space-y-2"
          style={{ borderColor: 'var(--color-border)' }}
        >
          {navItems.map((item) => (
            <NavLink
              key={item.id}
              to={item.path || `/${item.id}`}
              onClick={() => setMobileMenuOpen(false)}
              className={({ isActive }) =>
                `block px-4 py-3 rounded-2xl text-sm font-semibold transition-all duration-200 ${
                  isActive
                    ? 'bg-accent-pale text-brand font-bold border-l-4'
                    : 'text-ink-muted hover:bg-neutral-100 hover:text-ink'
                }`
              }
              style={{
                borderLeftColor: 'var(--color-accent)',
                background: 'var(--color-accent-pale)',
                color: 'var(--color-ink-muted)',
              }}
            >
              {item.label}
            </NavLink>
          ))}
          <div
            className="pt-4 border-t flex items-center justify-between px-2"
            style={{ borderColor: 'var(--color-border)' }}
          >
            <div className="flex items-center space-x-3">
              {socialLinks.map((link) => (
                <a
                  key={link.id}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={link.label}
                  className="w-9 h-9 flex items-center justify-center rounded-full text-ink-muted hover:bg-accent hover:text-white transition-all duration-200"
                  style={{ color: 'var(--color-ink-muted)' }}
                >
                  <i className={`fab fa-${link.icon}`}></i>
                </a>
              ))}
            </div>
            <a
              href="mailto:ccflorezrud@gmail.com"
              className="text-xs font-semibold flex items-center gap-1.5"
              style={{ color: 'var(--color-brand)' }}
            >
              <i className="fas fa-envelope" style={{ color: 'var(--color-accent)' }}></i>
              ccflorezrud@gmail.com
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
