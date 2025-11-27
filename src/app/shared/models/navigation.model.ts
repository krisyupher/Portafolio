/**
 * Navigation Models (GLOBAL)
 * Shared type definitions for header and footer components
 */

/**
 * Navigation menu item
 */
export interface NavItem {
  id: string;
  label: string;
  url?: string;
  icon?: string;
  section?: string; // For smooth scrolling to portfolio sections
}

/**
 * Social media link
 */
export interface SocialLink {
  id: string;
  label: string;
  url: string;
  icon: string; // FontAwesome icon name (github, linkedin, twitter, etc)
}

/**
 * Quick navigation link for footer
 */
export interface QuickLink {
  id: string;
  label: string;
  section?: string;
  url?: string;
}
