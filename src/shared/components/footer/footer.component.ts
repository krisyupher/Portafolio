/**
 * Footer Component (Presentational - GLOBAL)
 * Displays social links, quick navigation, technologies, and copyright info
 *
 * Responsibilities:
 * - Display social media links with icons
 * - Show quick navigation links
 * - Display technologies/tech stack
 * - Show contact information
 * - Emit link click events
 * - Display copyright information
 */

import { Component, Input, Output, EventEmitter } from '@angular/core';
import { SocialLink, QuickLink } from '../../models';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
  standalone: false,
})
export class FooterComponent {
  @Input() socialLinks: SocialLink[] = [];
  @Input() quickLinks: QuickLink[] = [];
  @Input() contactEmail = 'contact@example.com';
  @Input() technologies: string[] = [];
  @Input() copyrightYear = new Date().getFullYear();

  @Output() linkClicked = new EventEmitter<string>();

  /**
   * Handle quick link click
   */
  onLinkClick(linkId: string): void {
    // Will be implemented in Phase 3 (GREEN)
    this.linkClicked.emit(linkId);
  }
}
