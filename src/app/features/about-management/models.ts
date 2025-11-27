/**
 * About Management Feature Models
 * LOCAL scope - Used only by about-management feature
 */

/**
 * Professional information
 */
export interface AboutInfo {
  name: string;
  title: string;
  bio: string;
  profileImage: string;
  focus: string; // e.g., "🎯 Focusing on Angular and scalable web applications"
}

/**
 * Skill with proficiency level
 */
export interface Skill {
  id: string;
  name: string;
  category: string; // 'Frontend', 'Backend', 'DevOps', 'Database', etc.
  proficiency: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';
  icon?: string; // Optional icon class
}

/**
 * Skills organized by category
 */
export interface SkillCategory {
  name: string;
  skills: Skill[];
}

/**
 * Work experience
 */
export interface Experience {
  id: string;
  title: string;
  company: string;
  description: string;
  startDate: string;
  endDate?: string; // null for current position
  technologies: string[];
  companyUrl?: string;
}

/**
 * Education/Degree
 */
export interface Education {
  id: string;
  degree: string;
  institution: string;
  field: string;
  graduationYear: number;
  description?: string;
}

/**
 * Complete about data structure
 */
export interface AboutData {
  aboutInfo: AboutInfo;
  skillCategories: SkillCategory[];
  experience: Experience[];
  education: Education[];
}
