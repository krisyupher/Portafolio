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
    <section class="about-skills">
      <h2 class="section-title">Skills & Expertise</h2>

      <div class="skills-container" *ngIf="skillCategories && skillCategories.length > 0">
        <div class="skill-category" *ngFor="let category of skillCategories">
          <h3 class="category-title">{{ category.name }}</h3>
          <div class="skills-list">
            <span class="skill-tag" *ngFor="let skill of category.skills">
              {{ skill.name }}
              <span class="proficiency" [class]="'level-' + skill.proficiency.toLowerCase()">
                {{ skill.proficiency }}
              </span>
            </span>
          </div>
        </div>
      </div>

      <div *ngIf="!skillCategories || skillCategories.length === 0" class="empty-state">
        <p>No skills information available.</p>
      </div>
    </section>
  `,
  styleUrls: ['./about-skills.presentational.scss'],
  standalone: false,
})
export class AboutSkillsPresentational {
  @Input() skillCategories: SkillCategory[] = [];
}
