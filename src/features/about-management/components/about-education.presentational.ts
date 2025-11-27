/**
 * About Education Presentational Component
 * LOCAL scope - Feature-specific presentational component
 *
 * Responsibilities:
 * - Display education/degrees
 * - Show institution, field, graduation year
 * - Pure UI component
 */

import { Component, Input } from '@angular/core';
import { Education } from '../models';

@Component({
  selector: 'app-about-education',
  template: `
    <!-- About education template - will be implemented in Phase 3 -->
  `,
  standalone: false,
})
export class AboutEducationPresentational {
  @Input() education: Education[] = [];
}
