export interface NavItem {
  id: string;
  label: string;
  path: string;
}

export interface SocialLink {
  id: string;
  label: string;
  url: string;
  /** Font Awesome brand icon name without the `fa-` prefix, e.g. `github`. */
  icon: string;
}

export interface MetricHighlight {
  value: string;
  label: string;
}

export interface AboutInfo {
  name: string;
  title: string;
  headline: string;
  bio: string;
  profileImage: string;
  focus: string;
  availability: string;
  location: string;
  yearsOfExperience: string;
}

export interface StackGroup {
  id: string;
  name: string;
  summary: string;
  /** Font Awesome solid icon class, e.g. `fa-server`. */
  icon: string;
  items: string[];
}

export interface Experience {
  id: string;
  title: string;
  company: string;
  location?: string;
  description: string;
  startDate: string;
  endDate?: string;
  achievements: string[];
  technologies: string[];
}

export interface Education {
  id: string;
  degree: string;
  institution: string;
  field: string;
  /** Year or period, e.g. `2023` or `Jun 2026 – Present`. */
  graduationYear: string;
  description?: string;
}

export interface AboutData {
  aboutInfo: AboutInfo;
  metrics: MetricHighlight[];
  stack: StackGroup[];
  experience: Experience[];
  education: Education[];
}

export type WorkCategory = 'Enterprise' | 'FullStack' | 'Frontend' | 'AI & Tools';

export interface Work {
  id: string;
  title: string;
  /** Runtime path such as `../assets/img/X.png`, served from `public/assets/img/`. */
  poster?: string;
  description: string;
  /** Live site URL. */
  linkView?: string;
  /** e.g. `OCT 2026` or `2022 – 2024`. */
  date: string;
  /** Source repository or organization URL. */
  Link?: string;
  category?: WorkCategory;
  technologies?: string[];
  highlights?: string[];
  featured?: boolean;
}
