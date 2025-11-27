/**
 * About Experience Presentational Component
 * LOCAL scope - Feature-specific presentational component
 *
 * Responsibilities:
 * - Display work experience/timeline
 * - Show job titles, companies, dates
 * - Display technologies used
 * - Pure UI component
 */

import { Component, Input } from '@angular/core';
import { Experience } from '../models';

@Component({
  selector: 'app-about-experience',
  template: `
    <!-- About experience template - will be implemented in Phase 3 -->
  `,
  standalone: false,
})
export class AboutExperiencePresentational {
  @Input() experience: Experience[] = [];
}
