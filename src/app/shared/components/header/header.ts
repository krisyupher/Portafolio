import {
  Component,
  ChangeDetectionStrategy,
  input,
  output,
  signal,
  computed,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

export interface NavItem {
  id: string;
  label: string;
  section?: string;
}

export interface SocialLink {
  id: string;
  label: string;
  url: string;
  icon: string;
}

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <header [class.scrolled]="isScrolled()">
      <div class="header-container">
        <div class="logo">
          <h1>Cristian</h1>
        </div>

        <nav class="nav-menu">
          <ul>
            @for (item of navItems(); track item.id) {
              <li>
                <button
                  (click)="onNavClick(item)"
                  [class.active]="item.id === activeSection()"
                  type="button"
                >
                  {{ item.label }}
                </button>
              </li>
            }
          </ul>
        </nav>

        <div class="social-links">
          @for (link of socialLinks(); track link.id) {
            <a
              [href]="link.url"
              target="_blank"
              rel="noopener noreferrer"
              [title]="link.label"
            >
              <i [class]="'fab fa-' + link.icon"></i>
            </a>
          }
        </div>
      </div>
    </header>
  `,
  styleUrls: ['./header.scss'],
})
export class HeaderComponent {
  readonly navItems = input<NavItem[]>([]);
  readonly socialLinks = input<SocialLink[]>([]);
  readonly isScrolled = input(false);
  readonly activeSection = input('home');

  readonly navItemClicked = output<NavItem>();

  private readonly _activeSection = signal('home');

  onNavClick(item: NavItem): void {
    this._activeSection.set(item.id);
    this.navItemClicked.emit(item);
  }
}
