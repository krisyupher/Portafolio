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
  { id: 'filosofy', label: 'Philosophy & Standards', path: '/filosofy' },
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
      className={`sticky top-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/85 backdrop-blur-md shadow-md border-b border-slate-200/80 py-3'
          : 'bg-white/95 backdrop-blur-sm border-b border-slate-100 py-4'
      }`}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand */}
        <Link
          to="/home"
          className="flex items-center gap-3 group focus:outline-none"
          onClick={() => setMobileMenuOpen(false)}
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-regal-blue via-san-juan to-bermuda flex items-center justify-center text-white font-heading font-extrabold text-lg shadow-md group-hover:scale-105 group-hover:shadow-glow-teal transition-all duration-300">
            CF
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <span className="text-xl font-heading font-extrabold tracking-tight text-regal-blue group-hover:text-bermuda transition-colors">
                {brandName}
              </span>
              <span className="relative flex h-2 w-2" title="Available for new opportunities">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-bermuda opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-bermuda"></span>
              </span>
            </div>
            <span className="text-[11px] font-semibold text-slate-500 tracking-wider uppercase">
              Full-Stack Software Engineer
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center bg-slate-100/80 p-1.5 rounded-full border border-slate-200/70">
          {navItems.map((item) => (
            <NavLink
              key={item.id}
              to={item.path || `/${item.id}`}
              className={({ isActive }) =>
                `text-sm font-semibold px-4 py-2 rounded-full transition-all duration-200 ${
                  isActive
                    ? 'bg-white text-regal-blue shadow-sm font-bold'
                    : 'text-slate-600 hover:text-regal-blue hover:bg-white/50'
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </div>

        {/* Right CTA & Socials */}
        <div className="hidden md:flex items-center space-x-3">
          <div className="flex items-center space-x-1.5 pr-3 border-r border-slate-200">
            {socialLinks.map((link) => (
              <a
                key={link.id}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                title={link.label}
                aria-label={link.label}
                className="w-9 h-9 flex items-center justify-center rounded-full text-slate-600 hover:text-white hover:bg-bermuda transition-all duration-200 hover:-translate-y-0.5"
              >
                <i className={`fab fa-${link.icon} text-base`}></i>
              </a>
            ))}
          </div>

          <a
            href="./assets/resumers/HojaDeVida-CristianFlorez.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-regal-blue text-white text-xs font-bold uppercase tracking-wider shadow-sm hover:bg-regal-light hover:shadow-md transition-all duration-200 hover:-translate-y-0.5"
          >
            <i className="fas fa-file-arrow-down text-bermuda"></i>
            <span>Resume</span>
          </a>
        </div>

        {/* Mobile Hamburger Button */}
        <div className="flex lg:hidden items-center space-x-2">
          <a
            href="./assets/resumers/HojaDeVida-CristianFlorez.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="px-3 py-1.5 rounded-full bg-regal-blue text-white text-xs font-bold uppercase tracking-wider"
          >
            CV
          </a>
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-xl text-regal-blue hover:bg-slate-100 focus:outline-none"
            aria-label="Toggle navigation menu"
            aria-expanded={mobileMenuOpen}
          >
            <i className={`fas ${mobileMenuOpen ? 'fa-times' : 'fa-bars'} text-xl`}></i>
          </button>
        </div>
      </nav>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white/95 backdrop-blur-md border-t border-slate-100 shadow-xl px-4 pt-3 pb-6 space-y-2 animate-fadeIn">
          {navItems.map((item) => (
            <NavLink
              key={item.id}
              to={item.path || `/${item.id}`}
              onClick={() => setMobileMenuOpen(false)}
              className={({ isActive }) =>
                `block px-4 py-2.5 rounded-xl text-sm font-semibold transition-colors ${
                  isActive
                    ? 'bg-bermuda/15 text-regal-blue font-bold border-l-4 border-bermuda'
                    : 'text-slate-700 hover:bg-slate-50 hover:text-bermuda'
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
          <div className="pt-4 border-t border-slate-100 flex items-center justify-between px-2">
            <div className="flex items-center space-x-3">
              {socialLinks.map((link) => (
                <a
                  key={link.id}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={link.label}
                  className="w-8 h-8 flex items-center justify-center rounded-full text-slate-600 hover:bg-bermuda hover:text-white transition-colors"
                >
                  <i className={`fab fa-${link.icon}`}></i>
                </a>
              ))}
            </div>
            <a
              href="mailto:ccflorezrud@gmail.com"
              className="text-xs font-semibold text-regal-blue flex items-center gap-1.5"
            >
              <i className="fas fa-envelope text-bermuda"></i>
              ccflorezrud@gmail.com
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
