/**
 * Filosofy Feature Models
 *
 * Interfaces and types for the filosofy feature.
 */

export interface Section {
  id: string;
  title: string;
  icon?: string;
  content?: string;
  subsections?: Subsection[];
}

export interface Subsection {
  title: string;
  items?: string[];
  description?: string;
  example?: string;
}
