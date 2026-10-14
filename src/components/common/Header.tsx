import React, { useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { NAV_ITEMS, SITE } from '../../data/site';
import { useScrolled } from '../../hooks/useScrolled';
import { cn } from '../../lib/cn';
import { NavItem } from '../../types';
import { ThemeToggle } from './ThemeToggle';

interface HeaderProps {
  navItems?: NavItem[];
}

const scrollToContact = () => {
  document.getElementById('contact')?.scrollIntoView?.({ behavior: 'smooth', block: 'start' });
};

export const Header: React.FC<HeaderProps> = ({ navItems = NAV_ITEMS }) => {
  const scrolled = useScrolled();
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (!menuOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMenuOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header
      data-scrolled={scrolled}
      className={cn(
        'sticky top-0 z-40 border-b transition-[background-color,border-color] duration-300',
        scrolled || menuOpen
          ? 'border-line bg-paper/80 backdrop-blur-xl'
          : 'border-transparent bg-transparent'
      )}
    >
      <div className="container-page flex h-16 items-center justify-between gap-6 sm:h-[4.5rem]">
        <Link
          to="/home"
          onClick={closeMenu}
          className="group flex items-center gap-3"
          aria-label={`${SITE.name}, home`}
        >
          <span className="relative grid h-9 w-9 place-items-center rounded-[0.6rem] bg-ink font-display text-[0.8rem] font-bold tracking-tight text-paper transition-transform duration-500 ease-out-expo group-hover:-rotate-6">
            CF
            <span className="absolute -right-0.5 -top-0.5 h-2.5 w-2.5 rounded-full bg-accent ring-2 ring-paper" />
          </span>
          <span className="leading-tight">
            <span className="block font-display text-[0.95rem] font-semibold tracking-tight text-ink">
              {SITE.name}
            </span>
            <span className="hidden font-mono text-[0.65rem] uppercase tracking-[0.16em] text-ink-muted sm:block">
              {SITE.role}
            </span>
          </span>
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-1 md:flex">
          {navItems.map((item) => (
            <NavLink
              key={item.id}
              to={item.path}
              className={({ isActive }) => cn('nav-link', isActive && 'is-active')}
            >
              {item.label}
            </NavLink>
          ))}
          <button type="button" onClick={scrollToContact} className="nav-link">
            Contact
          </button>
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <a
            href={SITE.resume.en}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary hidden h-9 px-4 text-[0.8rem] sm:inline-flex"
          >
            Résumé
            <i className="fas fa-arrow-down text-[0.65rem]" aria-hidden="true"></i>
          </a>
          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            className="icon-btn md:hidden"
            aria-label="Toggle navigation menu"
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
          >
            <i
              className={cn('fas text-[0.85rem]', menuOpen ? 'fa-xmark' : 'fa-bars-staggered')}
              aria-hidden="true"
            ></i>
          </button>
        </div>
      </div>

      {menuOpen && (
        <div id="mobile-menu" className="animate-slide-down border-t border-line md:hidden">
          <nav aria-label="Mobile" className="container-page flex flex-col py-4">
            {navItems.map((item) => (
              <NavLink
                key={item.id}
                to={item.path}
                onClick={closeMenu}
                className={({ isActive }) =>
                  cn(
                    'flex items-center justify-between border-b border-line py-4 font-display text-2xl font-semibold tracking-tight',
                    isActive ? 'text-ink' : 'text-ink-muted'
                  )
                }
              >
                {item.label}
                <i className="fas fa-arrow-right text-sm text-accent-ink" aria-hidden="true"></i>
              </NavLink>
            ))}
            <button
              type="button"
              onClick={() => {
                closeMenu();
                scrollToContact();
              }}
              className="flex items-center justify-between border-b border-line py-4 text-left font-display text-2xl font-semibold tracking-tight text-ink-muted"
            >
              Contact
              <i className="fas fa-arrow-down text-sm text-accent-ink" aria-hidden="true"></i>
            </button>
            <a
              href={SITE.resume.en}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary mt-6 self-start"
            >
              Download résumé
              <i className="fas fa-arrow-down text-[0.7rem]" aria-hidden="true"></i>
            </a>
          </nav>
        </div>
      )}
    </header>
  );
};
