/**
 * Footer Component (Presentational - GLOBAL)
 * Displays social links, quick navigation, technologies, and copyright info
 *
 * Modernized with Angular 20+ input/output functions and standalone pattern
 *
 * Responsibilities:
 * - Display social media links with icons
 * - Show quick navigation links
 * - Display technologies/tech stack
 * - Show contact information
 * - Emit link click events
 * - Display copyright information
 */

import {
  Component,
  ChangeDetectionStrategy,
  input,
  output,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { SocialLink, QuickLink } from '../../models/navigation.model';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent {
  readonly socialLinks = input<SocialLink[]>([]);
  readonly quickLinks = input<QuickLink[]>([]);
  readonly contactEmail = input('contact@example.com');
  readonly technologies = input<string[]>([]);
  readonly copyrightYear = input(new Date().getFullYear());

  readonly linkClicked = output<string>();

  /**
   * Handle quick link click
   */
  onLinkClick(linkId: string): void {
    this.linkClicked.emit(linkId);
  }
}
