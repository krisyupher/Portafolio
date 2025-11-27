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
    <section class="about-experience">
      <h2 class="section-title">Professional Experience</h2>

      <div class="experience-timeline" *ngIf="experience && experience.length > 0">
        <div class="timeline-item" *ngFor="let exp of experience; let last = last" [class.last]="last">
          <div class="timeline-marker"></div>
          <div class="timeline-content">
            <h3 class="job-title">{{ exp.title }}</h3>
            <p class="company-name">{{ exp.company }}</p>
            <p class="job-period">{{ exp.startDate }}</p>
            <p class="job-description">{{ exp.description }}</p>
            <div class="job-technologies" *ngIf="exp.technologies && exp.technologies.length > 0">
              <span class="tech-badge" *ngFor="let tech of exp.technologies">{{ tech }}</span>
            </div>
          </div>
        </div>
      </div>

      <div *ngIf="!experience || experience.length === 0" class="empty-state">
        <p>No experience information available.</p>
      </div>
    </section>
  `,
  styleUrls: ['./about-experience.presentational.scss'],
  standalone: false,
})
export class AboutExperiencePresentational {
  @Input() experience: Experience[] = [];
}
