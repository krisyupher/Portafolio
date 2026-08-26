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
  { id: 'filosofy', label: 'Filosofy', path: '/filosofy' },
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
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 bg-white border-b border-gray-200 ${
        isScrolled ? 'shadow-md bg-gray-50/95 backdrop-blur-sm' : ''
      }`}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-20">
        {/* Brand */}
        <Link
          to="/home"
          className="flex flex-col group focus:outline-none"
          onClick={() => setMobileMenuOpen(false)}
        >
          <span className="text-2xl font-bold tracking-tight text-regal-blue group-hover:text-bermuda transition-colors">
            {brandName}
          </span>
          <span className="text-xs text-gray-500 font-medium tracking-wide uppercase">
            Full-Stack Software Developer
          </span>
        </Link>

        {/* Desktop Navigation */}
        <ul className="hidden md:flex items-center space-x-8">
          {navItems.map((item) => (
            <li key={item.id}>
              <NavLink
                to={item.path || `/${item.id}`}
                className={({ isActive }) =>
                  `text-base font-medium transition-colors py-1 relative ${
                    isActive
                      ? 'text-bermuda font-semibold border-b-2 border-bermuda'
                      : 'text-gray-700 hover:text-bermuda'
                  }`
                }
              >
                {item.label}
              </NavLink>
            </li>
          ))}
        </ul>

        {/* Social Icons (Desktop) */}
        <div className="hidden md:flex items-center space-x-3">
          {socialLinks.map((link) => (
            <a
              key={link.id}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              title={link.label}
              aria-label={link.label}
              className="w-9 h-9 flex items-center justify-center rounded-full text-regal-blue hover:text-white hover:bg-bermuda transition-all duration-200 hover:-translate-y-0.5"
            >
              <i className={`fab fa-${link.icon} text-lg`}></i>
            </a>
          ))}
        </div>

        {/* Mobile Hamburger Button */}
        <div className="flex md:hidden items-center space-x-2">
          {socialLinks.slice(0, 2).map((link) => (
            <a
              key={link.id}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={link.label}
              className="w-8 h-8 flex items-center justify-center rounded-full text-regal-blue hover:text-bermuda text-base"
            >
              <i className={`fab fa-${link.icon}`}></i>
            </a>
          ))}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-md text-regal-blue hover:text-bermuda hover:bg-gray-100 focus:outline-none"
            aria-label="Toggle navigation menu"
            aria-expanded={mobileMenuOpen}
          >
            <i className={`fas ${mobileMenuOpen ? 'fa-times' : 'fa-bars'} text-xl`}></i>
          </button>
        </div>
      </nav>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 shadow-lg px-4 pt-2 pb-6 space-y-2">
          {navItems.map((item) => (
            <NavLink
              key={item.id}
              to={item.path || `/${item.id}`}
              onClick={() => setMobileMenuOpen(false)}
              className={({ isActive }) =>
                `block px-3 py-2 rounded-md text-base font-medium transition-colors ${
                  isActive
                    ? 'bg-bermuda/10 text-bermuda font-semibold border-l-4 border-bermuda'
                    : 'text-gray-700 hover:bg-gray-50 hover:text-bermuda'
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
          <div className="pt-3 border-t border-gray-100 flex items-center space-x-4 px-3">
            {socialLinks.map((link) => (
              <a
                key={link.id}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={link.label}
                className="w-8 h-8 flex items-center justify-center rounded-full text-regal-blue hover:bg-bermuda hover:text-white transition-colors"
              >
                <i className={`fab fa-${link.icon}`}></i>
              </a>
            ))}
          </div>
        </div>
      )}
    </header>
  );
};
