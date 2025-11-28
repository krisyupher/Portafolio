/**
 * Header Component (Presentational - GLOBAL)
 * Displays professional branding, navigation menu, and social links
 *
 * Modernized with Angular 20+ input/output functions and standalone pattern
 *
 * Responsibilities:
 * - Display brand name and subtitle
 * - Render navigation menu items
 * - Display social media links
 * - Emit navigation events
 * - Sticky positioning with scroll detection
 */

import {
  Component,
  ChangeDetectionStrategy,
  input,
  output,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavItem, SocialLink } from '../../models';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  readonly navItems = input<NavItem[]>([]);
  readonly socialLinks = input<SocialLink[]>([]);
  readonly brandName = input('Cristian Florez');
  readonly isScrolled = input(false);

  readonly navItemClicked = output<NavItem>();

  /**
   * Handle navigation item click
   */
  onNavItemClick(item: NavItem): void {
    this.navItemClicked.emit(item);
  }
}
