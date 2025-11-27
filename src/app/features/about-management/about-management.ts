/**
 * About Management Container (Smart Component)
 * LOCAL scope - Feature container for about management
 *
 * Modernized with Angular 20+ signals and standalone pattern
 *
 * Responsibilities:
 * - Handle business logic
 * - Manage state with AboutService
 * - Load professional information
 * - Handle side effects (data loading, error handling)
 * - Pass data to presentational components
 */

import {
  Component,
  ChangeDetectionStrategy,
  inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { AboutService } from './services/about.service';
import { AboutHeaderPresentational } from './components/about-header.presentational';
import { AboutSkillsPresentational } from './components/about-skills.presentational';
import { AboutExperiencePresentational } from './components/about-experience.presentational';
import { AboutEducationPresentational } from './components/about-education.presentational';

@Component({
  selector: 'app-about-management',
  standalone: true,
  imports: [
    CommonModule,
    AboutHeaderPresentational,
    AboutSkillsPresentational,
    AboutExperiencePresentational,
    AboutEducationPresentational,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="about-container">
      <!-- Loading State -->
      @if (loading()) {
        <div class="loading-state">
          <div class="spinner"></div>
          <p>Loading about information...</p>
        </div>
      }

      <!-- Error State -->
      @if (error()) {
        <div class="error-state">
          <p class="error-message">{{ error() }}</p>
        </div>
      }

      <!-- About Content -->
      @if (!loading() && !error()) {
        <div class="about-content">
          <!-- Header Section -->
          <app-about-header [aboutInfo]="aboutInfo()"></app-about-header>

          <!-- Skills Section -->
          <app-about-skills [skillCategories]="skillCategories()"></app-about-skills>

          <!-- Experience Section -->
          <app-about-experience [experience]="experience()"></app-about-experience>

          <!-- Education Section -->
          <app-about-education [education]="education()"></app-about-education>
        </div>
      }
    </div>
  `,
  styleUrls: ['./about-management.scss'],
})
export class AboutManagementComponent {
  private readonly aboutService = inject(AboutService);

  // Public signals from service
  readonly aboutInfo = this.aboutService.aboutInfo;
  readonly skillCategories = this.aboutService.skillCategories;
  readonly experience = this.aboutService.experience;
  readonly education = this.aboutService.education;
  readonly loading = this.aboutService.loading;
  readonly error = this.aboutService.error;

  // Initialize service on component creation
  constructor() {
    this.aboutService.initialize();
  }
}
