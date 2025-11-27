import { Component, OnInit, HostListener } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: false,
})
export class AppComponent implements OnInit {
  title = 'Portafolio';
  isScrolled = false;
  currentSection = 'home';

  // Navigation items for header
  navItems = [
    { id: 'home', label: 'Home', section: 'home' },
    { id: 'about', label: 'About', section: 'about' },
    { id: 'portfolio', label: 'Portfolio', section: 'portfolio' },
  ];

  // Social links for header and footer
  socialLinks = [
    { id: 'github', label: 'GitHub', url: 'https://github.com/krisyupher', icon: 'github' },
    { id: 'linkedin', label: 'LinkedIn', url: 'https://linkedin.com/in/krisyupher', icon: 'linkedin' },
  ];

  // Quick links for footer
  quickLinks = [
    { id: 'home', label: 'Home', section: 'home' },
    { id: 'about', label: 'About', section: 'about' },
    { id: 'portfolio', label: 'Portfolio', section: 'portfolio' },
  ];

  // Technologies for footer
  technologies = ['Angular', 'TypeScript', 'RxJS', 'Tailwind CSS', 'Node.js'];

  // Contact info for footer
  contactEmail = 'cristian@example.com';
  copyrightYear = new Date().getFullYear();


  ngOnInit(): void {
    // Initialize component
  }

  /**
   * Handle scroll detection for sticky header
   */
  @HostListener('window:scroll')
  onWindowScroll(): void {
    this.isScrolled = window.pageYOffset > 50;
  }

  /**
   * Handle navigation item click
   */
  onNavItemClick(item: { id: string; label: string; section?: string }): void {
    if (item.section) {
      this.currentSection = item.section;
      const section = document.getElementById(item.section);
      if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }

  /**
   * Handle footer link click
   */
  onFooterLinkClick(linkId: string): void {
    this.onNavItemClick({
      id: linkId,
      label: linkId,
      section: linkId,
    });
  }
}
