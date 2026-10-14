import { Work, WorkCategory } from '../types';

export type CategoryFilter = 'All' | WorkCategory;

export const CATEGORY_LABELS: Record<WorkCategory, string> = {
  Enterprise: 'Enterprise',
  FullStack: 'Full-Stack',
  Frontend: 'Frontend',
  'AI & Tools': 'AI & Tools',
};

export const CATEGORY_ICONS: Record<WorkCategory, string> = {
  Enterprise: 'fa-building-columns',
  FullStack: 'fa-layer-group',
  Frontend: 'fa-display',
  'AI & Tools': 'fa-wand-magic-sparkles',
};

export const CATEGORIES = Object.keys(CATEGORY_LABELS) as WorkCategory[];

/** Turns poster paths like `../assets/img/X.png` into `./assets/img/X.png` (served from public/). */
export const normalizeImagePath = (src?: string): string => {
  if (!src) return '';
  if (/^https?:\/\//.test(src)) return src;
  return `./${src.replace(/^(?:\.\.\/)+|^\.\/|^\//, '')}`;
};

/** The last four-digit year in the date string, e.g. `2022 – 2024` → 2024. */
export const getWorkYear = (work: Pick<Work, 'date'>): number => {
  const years = work.date.match(/\d{4}/g);
  return years ? Number(years[years.length - 1]) : 0;
};

/** Project name without the descriptive suffix: `ESAV — Judicial…` → `ESAV`. */
export const getShortTitle = (title: string): string => title.split('—')[0].trim();

export const matchesFilters = (work: Work, category: CategoryFilter, query: string): boolean => {
  if (category !== 'All' && work.category !== category) return false;
  const term = query.trim().toLowerCase();
  if (!term) return true;
  return [work.title, work.description, work.date, ...(work.technologies ?? [])].some((value) =>
    value.toLowerCase().includes(term)
  );
};

/** Featured work keeps its curated order; the rest is listed newest first. */
export const splitWorks = (list: Work[]): { featured: Work[]; more: Work[] } => ({
  featured: list.filter((work) => work.featured),
  more: list.filter((work) => !work.featured).sort((a, b) => getWorkYear(b) - getWorkYear(a)),
});

export interface SourceLink {
  href: string;
  label: string;
  /** Full Font Awesome class list, e.g. `fab fa-github`. */
  icon: string;
}

/** Describes `Work.Link`, which points at GitHub for personal work and LinkedIn for client work. */
export const getSourceLink = (work: Work): SourceLink | null => {
  if (!work.Link) return null;
  if (work.Link.includes('github.com')) {
    return { href: work.Link, label: 'View source', icon: 'fab fa-github' };
  }
  if (work.Link.includes('linkedin.com')) {
    return { href: work.Link, label: 'View organization', icon: 'fab fa-linkedin-in' };
  }
  return { href: work.Link, label: 'View details', icon: 'fas fa-link' };
};
