/**
 * About Management Container (Smart Component)
 * LOCAL scope - Feature container for about management
 *
 * Responsibilities:
 * - Handle business logic
 * - Manage state with AboutService
 * - Load professional information
 * - Handle side effects (data loading, error handling)
 * - Pass data to presentational components
 */

import { Component, OnInit } from '@angular/core';
import { AboutService } from './services/about.service';
import { AboutInfo, SkillCategory, Experience, Education } from './models';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-about-management',
  template: `
    <div class="about-container">
      <!-- Loading State -->
      <div *ngIf="loading$ | async" class="loading-state">
        <div class="spinner"></div>
        <p>Loading about information...</p>
      </div>

      <!-- Error State -->
      <div *ngIf="error$ | async as error" class="error-state">
        <p class="error-message">{{ error }}</p>
      </div>

      <!-- About Content -->
      <div *ngIf="!(loading$ | async) && !(error$ | async)" class="about-content">
        <!-- Header Section -->
        <app-about-header [aboutInfo]="aboutInfo$ | async"></app-about-header>

        <!-- Skills Section -->
        <app-about-skills [skillCategories]="(skillCategories$ | async) || []"></app-about-skills>

        <!-- Experience Section -->
        <app-about-experience [experience]="(experience$ | async) || []"></app-about-experience>

        <!-- Education Section -->
        <app-about-education [education]="(education$ | async) || []"></app-about-education>
      </div>
    </div>
  `,
  styleUrls: ['./about-management.container.scss'],
  standalone: false,
})
export class AboutManagementContainer implements OnInit {
  aboutInfo$: Observable<AboutInfo | null>;
  skillCategories$: Observable<SkillCategory[]>;
  experience$: Observable<Experience[]>;
  education$: Observable<Education[]>;
  loading$: Observable<boolean>;
  error$: Observable<string | null>;

  constructor(private aboutService: AboutService) {
    this.aboutInfo$ = this.aboutService.aboutInfo$;
    this.skillCategories$ = this.aboutService.skillCategories$;
    this.experience$ = this.aboutService.experience$;
    this.education$ = this.aboutService.education$;
    this.loading$ = this.aboutService.loading$;
    this.error$ = this.aboutService.error$;
  }

  ngOnInit(): void {
    // Initialize service and load about data
    this.aboutService.initialize();
  }
}
