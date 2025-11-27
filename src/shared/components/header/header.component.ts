/**
 * Header Component (Presentational - GLOBAL)
 * Displays professional branding, navigation menu, and social links
 *
 * Responsibilities:
 * - Display brand name and subtitle
 * - Render navigation menu items
 * - Display social media links
 * - Emit navigation events
 * - Sticky positioning with scroll detection
 */

import { Component, Input, Output, EventEmitter } from '@angular/core';
import { NavItem, SocialLink } from '../../models';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  standalone: false,
})
export class HeaderComponent {
  @Input() navItems: NavItem[] = [];
  @Input() socialLinks: SocialLink[] = [];
  @Input() brandName = 'Cristian Rivera';
  @Input() isScrolled = false;

  @Output() navItemClicked = new EventEmitter<NavItem>();

  /**
   * Handle navigation item click
   */
  onNavItemClick(item: NavItem): void {
    // Will be implemented in Phase 3 (GREEN)
    this.navItemClicked.emit(item);
  }
}
