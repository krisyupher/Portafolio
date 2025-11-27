/**
 * About Skills Presentational Component
 * LOCAL scope - Feature-specific presentational component
 *
 * Responsibilities:
 * - Display skills organized by category
 * - Show proficiency levels
 * - Pure UI component
 */

import { Component, Input } from '@angular/core';
import { SkillCategory } from '../models';

@Component({
  selector: 'app-about-skills',
  template: `
    <!-- About skills template - will be implemented in Phase 3 -->
  `,
  standalone: false,
})
export class AboutSkillsPresentational {
  @Input() skillCategories: SkillCategory[] = [];
}
