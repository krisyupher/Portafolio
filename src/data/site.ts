import { NavItem, SocialLink } from '../types';

export const SITE = {
  name: 'Cristian Florez',
  role: 'Full-Stack Software Engineer',
  email: 'ccflorezrud@gmail.com',
  location: 'Toronto, ON, Canada',
  resume: {
    en: './assets/resumers/Cristian_Florez_Resume.pdf',
    es: './assets/resumers/HojaDeVida-CristianFlorez.pdf',
  },
} as const;

export const NAV_ITEMS: NavItem[] = [
  { id: 'home', label: 'Home', path: '/home' },
  { id: 'projects', label: 'Projects', path: '/portfolio' },
];

export const SOCIAL_LINKS: SocialLink[] = [
  { id: 'github', label: 'GitHub', url: 'https://github.com/krisyupher', icon: 'github' },
  {
    id: 'linkedin',
    label: 'LinkedIn',
    url: 'https://www.linkedin.com/in/ccflorezrud/',
    icon: 'linkedin-in',
  },
  {
    id: 'instagram',
    label: 'Instagram',
    url: 'https://www.instagram.com/krisyupher/',
    icon: 'instagram',
  },
];
