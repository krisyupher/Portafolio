import {
  Component,
  ChangeDetectionStrategy,
  HostListener,
  signal,
  computed,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { HeaderComponent } from './shared/components/header/header.component';
import { FooterComponent } from './shared/components/footer/footer.component';
import { PortfolioManagementComponent } from './features/portfolio-management/portfolio-management';
import { AboutManagementComponent } from './features/about-management/about-management';

interface NavItem {
  id: string;
  label: string;
  section?: string;
}

interface SocialLink {
  id: string;
  label: string;
  url: string;
  icon: string;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    HttpClientModule,
    HeaderComponent,
    FooterComponent,
    PortfolioManagementComponent,
    AboutManagementComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  // State signals
  private readonly _isScrolled = signal(false);
  private readonly _currentSection = signal('home');

  // Public readonly computed values
  readonly isScrolled = this._isScrolled.asReadonly();
  readonly currentSection = this._currentSection.asReadonly();

  // Data signals
  readonly navItems = signal<NavItem[]>([
    { id: 'home', label: 'Home', section: 'home' },
    { id: 'about', label: 'About', section: 'about' },
    { id: 'portfolio', label: 'Portfolio', section: 'portfolio' },
  ]);

  readonly socialLinks = signal<SocialLink[]>([
    {
      id: 'github',
      label: 'GitHub',
      url: 'https://github.com/krisyupher',
      icon: 'github',
    },
    {
      id: 'linkedin',
      label: 'LinkedIn',
      url: 'https://linkedin.com/in/krisyupher',
      icon: 'linkedin',
    },
  ]);

  readonly quickLinks = signal<NavItem[]>([
    { id: 'home', label: 'Home', section: 'home' },
    { id: 'about', label: 'About', section: 'about' },
    { id: 'portfolio', label: 'Portfolio', section: 'portfolio' },
  ]);

  readonly technologies = signal(['Angular', 'TypeScript', 'RxJS', 'Tailwind CSS', 'Node.js']);
  readonly contactEmail = signal('cristian@example.com');
  readonly copyrightYear = computed(() => new Date().getFullYear());

  /**
   * Handle scroll detection for sticky header
   */
  @HostListener('window:scroll')
  onWindowScroll(): void {
    this._isScrolled.set(window.pageYOffset > 50);
  }

  /**
   * Handle navigation item click
   */
  onNavItemClick(item: NavItem): void {
    if (item.section) {
      this._currentSection.set(item.section);
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
