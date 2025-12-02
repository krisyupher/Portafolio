import {
  Component,
  ChangeDetectionStrategy,
  HostListener,
  signal,
  computed,
  inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { HeaderComponent } from './shared/components/header/header.component';
import { FooterComponent } from './shared/components/footer/footer.component';

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
    RouterModule,
    HeaderComponent,
    FooterComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  private readonly router = inject(Router);

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
    { id: 'filosofy', label: 'Filosofy', section: 'filosofy' },
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
      url: 'https://www.linkedin.com/in/ccflorezrud/',
      icon: 'linkedin',
    },
    {
      id: 'instagram',
      label: 'Instagram',
      url: 'https://www.instagram.com/krisyupher/',
      icon: 'instagram',
    },
  ]);

  readonly quickLinks = signal<NavItem[]>([
    { id: 'home', label: 'Home', section: 'home' },
    { id: 'about', label: 'About', section: 'about' },
    { id: 'portfolio', label: 'Portfolio', section: 'portfolio' },
    { id: 'filosofy', label: 'Filosofy', section: 'filosofy' },
  ]);

  readonly technologies = signal(['Angular', 'TypeScript', 'RxJS', 'Tailwind CSS', 'Node.js']);
  readonly contactEmail = signal('ccflorezrud@gmail.com');
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
      this.router.navigate([item.section]);
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
