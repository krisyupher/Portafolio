/**
 * Portfolio Management Feature Models
 * LOCAL scope - Used only by portfolio-management feature
 */

export interface Work {
  title: string;
  id: string;
  poster: string;
  description: string;
  linkView: string;
  date: string;
  Link: string;
}

export interface WorkFilter {
  searchTerm?: string;
  dateRange?: {
    from: string;
    to: string;
  };
}
