/**
 * Work represents a portfolio project or work experience
 */
export interface Work {
  /** Unique identifier for the work item */
  id: string;

  /** Display title of the work/project */
  title: string;

  /** Path to the poster/thumbnail image */
  poster: string;

  /** Detailed description of the work */
  description: string;

  /** External link to view the live project */
  linkView: string;

  /** Date string in format "MMM YYYY" (e.g., "JAN 2023") */
  date: string;

  /** Link to LinkedIn company or GitHub repository */
  Link: string;
}
