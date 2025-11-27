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
    <section class="about-education">
      <h2 class="section-title">Education</h2>

      <div class="education-grid" *ngIf="education && education.length > 0">
        <div class="education-card" *ngFor="let edu of education">
          <h3 class="degree-title">{{ edu.degree }}</h3>
          <p class="institution-name">{{ edu.institution }}</p>
          <p class="field-name">{{ edu.field }}</p>
          <p class="graduation-year">Class of {{ edu.graduationYear }}</p>
        </div>
      </div>

      <div *ngIf="!education || education.length === 0" class="empty-state">
        <p>No education information available.</p>
      </div>
    </section>
  `,
  styleUrls: ['./about-education.presentational.scss'],
  standalone: false,
})
export class AboutEducationPresentational {
  @Input() education: Education[] = [];
}
