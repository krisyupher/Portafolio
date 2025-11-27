/**
 * About Header Presentational Component
 * LOCAL scope - Feature-specific presentational component
 *
 * Responsibilities:
 * - Display professional profile image
 * - Show name, title, and bio
 * - Display focus statement
 * - Pure UI component
 */

import { Component, Input } from '@angular/core';
import { AboutInfo } from '../models';

@Component({
  selector: 'app-about-header',
  template: `
    <!-- About header template - will be implemented in Phase 3 -->
  `,
  standalone: false,
})
export class AboutHeaderPresentational {
  @Input() aboutInfo: AboutInfo | null = null;
}
