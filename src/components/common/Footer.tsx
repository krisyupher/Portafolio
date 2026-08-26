import React from 'react';
import { Link } from 'react-router-dom';
import { NavItem, SocialLink } from '../../types';

interface FooterProps {
  quickLinks?: NavItem[];
  socialLinks?: SocialLink[];
  technologies?: string[];
  contactEmail?: string;
}

const DEFAULT_QUICK_LINKS: NavItem[] = [
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

const DEFAULT_TECHNOLOGIES: string[] = [
  'React 19',
  'TypeScript',
  'Vite',
  'Tailwind CSS',
  'Node.js',
  'Angular',
  'RxJS',
  'PostgreSQL',
  'Docker',
];

export const Footer: React.FC<FooterProps> = ({
  quickLinks = DEFAULT_QUICK_LINKS,
  socialLinks = DEFAULT_SOCIAL_LINKS,
  technologies = DEFAULT_TECHNOLOGIES,
  contactEmail = 'ccflorezrud@gmail.com',
}) => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-br from-[#034378] to-[#2d4e68] text-white pt-12 pb-6 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* About Section */}
          <div className="flex flex-col space-y-3">
            <h3 className="text-sm font-bold text-bermuda uppercase tracking-wider">
              About
            </h3>
            <p className="text-sm text-gray-200 leading-relaxed">
              Full-Stack Software Developer specializing in modern JavaScript/TypeScript ecosystems,
              React, Angular, and cloud architecture. Passionate about building high-performance,
              scalable, and accessible web solutions.
            </p>
          </div>

          {/* Quick Links Section */}
          <div className="flex flex-col space-y-3">
            <h3 className="text-sm font-bold text-bermuda uppercase tracking-wider">
              Quick Links
            </h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.id}>
                  <Link
                    to={link.path || `/${link.id}`}
                    className="text-sm text-gray-200 hover:text-bermuda hover:underline transition-colors inline-block"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Technologies Section */}
          <div className="flex flex-col space-y-3">
            <h3 className="text-sm font-bold text-bermuda uppercase tracking-wider">
              Technologies
            </h3>
            <div className="flex flex-wrap gap-2">
              {technologies.map((tech) => (
                <span
                  key={tech}
                  className="inline-block bg-bermuda/20 border border-bermuda/40 text-bermuda text-xs px-2.5 py-1 rounded-full font-medium transition-colors hover:bg-bermuda/30"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Connect Section */}
          <div className="flex flex-col space-y-3">
            <h3 className="text-sm font-bold text-bermuda uppercase tracking-wider">
              Connect
            </h3>
            <div className="space-y-2">
              {socialLinks.map((link) => (
                <a
                  key={link.id}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2 text-sm text-gray-200 hover:text-bermuda hover:translate-x-1 transition-all duration-200"
                >
                  <i className={`fab fa-${link.icon} w-5 text-base`}></i>
                  <span>{link.label}</span>
                </a>
              ))}
            </div>

            {/* Email */}
            <a
              href={`mailto:${contactEmail}`}
              className="inline-flex items-center space-x-2 text-sm text-gray-200 hover:text-bermuda hover:underline pt-2 transition-colors"
            >
              <i className="fas fa-envelope w-5"></i>
              <span>{contactEmail}</span>
            </a>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="border-t border-bermuda/20 pt-6 text-center">
          <p className="text-xs text-gray-300">
            &copy; {currentYear} Cristian Florez. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};
