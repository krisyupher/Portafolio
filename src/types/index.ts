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

export interface AboutInfo {
  name: string;
  title: string;
  bio: string;
  profileImage: string;
  focus: string;
}

export interface Skill {
  id: string;
  name: string;
  category: string;
  proficiency: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';
  icon?: string;
}

export interface SkillCategory {
  name: string;
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
}

export interface Education {
  id: string;
  degree: string;
  institution: string;
  field: string;
  graduationYear: number;
  description?: string;
}

export interface AboutData {
  aboutInfo: AboutInfo;
  skillCategories: SkillCategory[];
  experience: Experience[];
  education: Education[];
}

export interface Work {
  title: string;
  id: string;
  poster: string;
  description: string;
  linkView: string;
  date: string;
  Link: string;
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
