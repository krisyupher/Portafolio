export interface NavItem {
  id: string;
  label: string;
  section?: string;
  path?: string;
}

export interface SocialLink {
  id: string;
  label: string;
  url: string;
  icon: string;
}

export interface MetricHighlight {
  value: string;
  label: string;
  sublabel?: string;
  icon?: string;
}

export interface AboutInfo {
  name: string;
  title: string;
  bio: string;
  profileImage: string;
  focus: string;
  availability?: string;
  location?: string;
  yearsOfExperience?: string;
  metrics?: MetricHighlight[];
}

export interface Skill {
  id: string;
  name: string;
  category: string;
  proficiency: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';
  icon?: string;
  levelPercentage?: number;
}

export interface SkillCategory {
  name: string;
  icon?: string;
  skills: Skill[];
}

export interface Experience {
  id: string;
  title: string;
  company: string;
  description: string;
  startDate: string;
  endDate?: string;
  technologies: string[];
  companyUrl?: string;
  location?: string;
  achievements?: string[];
  metrics?: string;
}

export interface Education {
  id: string;
  degree: string;
  institution: string;
  field: string;
  graduationYear: number;
  description?: string;
  badge?: string;
  honors?: string;
}

export interface AboutData {
  aboutInfo: AboutInfo;
  skillCategories: SkillCategory[];
  experience: Experience[];
  education: Education[];
}

export interface Work {
  id: string;
  title: string;
  poster: string;
  description: string;
  linkView?: string;
  date: string;
  Link?: string;
  category?: 'Enterprise' | 'FullStack' | 'Frontend' | 'AI & Tools' | string;
  technologies?: string[];
  highlights?: string[];
  featured?: boolean;
}

export interface Subsection {
  title: string;
  items?: string[];
  description?: string;
  example?: string;
}

export interface Section {
  id: string;
  title: string;
  icon?: string;
  content?: string;
  subsections?: Subsection[];
}

export interface ToastMessage {
  id: string;
  text: string;
  type?: 'success' | 'info' | 'error';
}
