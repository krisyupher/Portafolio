/**
 * About Service (LOCAL)
 * Feature-specific service for about-management feature
 * Handles loading and managing professional information
 *
 * Modernized with Angular 20+ signals and standalone patterns
 */

import { Injectable, signal, computed, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AboutInfo, SkillCategory, Experience, Education } from '../models';

@Injectable({
  providedIn: 'root',
})
export class AboutService {
  private readonly http = inject(HttpClient);

  // Private signals for internal state
  private readonly _aboutInfo = signal<AboutInfo | null>(null);
  private readonly _skillCategories = signal<SkillCategory[]>([]);
  private readonly _experience = signal<Experience[]>([]);
  private readonly _education = signal<Education[]>([]);
  private readonly _loading = signal(false);
  private readonly _error = signal<string | null>(null);
  private _initialized = false;

  // Public readonly computed values
  readonly aboutInfo = this._aboutInfo.asReadonly();
  readonly skillCategories = this._skillCategories.asReadonly();
  readonly experience = this._experience.asReadonly();
  readonly education = this._education.asReadonly();
  readonly loading = this._loading.asReadonly();
  readonly error = this._error.asReadonly();

  // Computed derived values
  readonly hasInfo = computed(() => this._aboutInfo() !== null);
  readonly skillCount = computed(() => this._skillCategories().length);
  readonly experienceCount = computed(() => this._experience().length);

  /**
   * Initialize service - should be called once when needed
   */
  initialize(): void {
    if (this._initialized) return;
    this._initialized = true;
    this.loadAboutData();
  }

  /**
   * Load about data from JSON file
   */
  loadAboutData(): void {
    this._loading.set(true);
    this._error.set(null);

    this.http.get<{
      aboutInfo: AboutInfo;
      skillCategories: SkillCategory[];
      experience: Experience[];
      education: Education[];
    }>('assets/data/about.json').subscribe({
      next: (data) => {
        this._aboutInfo.set(data.aboutInfo);
        this._skillCategories.set(data.skillCategories);
        this._experience.set(data.experience);
        this._education.set(data.education);
        this._loading.set(false);
      },
      error: () => {
        this._error.set('Failed to load about information');
        this._loading.set(false);
      },
    });
  }

  /**
   * Get current about info snapshot
   */
  getCurrentAboutInfo(): AboutInfo | null {
    return this._aboutInfo();
  }

  /**
   * Get current skills snapshot
   */
  getCurrentSkillCategories(): SkillCategory[] {
    return this._skillCategories();
  }

  /**
   * Get current experience snapshot
   */
  getCurrentExperience(): Experience[] {
    return this._experience();
  }

  /**
   * Get current education snapshot
   */
  getCurrentEducation(): Education[] {
    return this._education();
  }

  /**
   * Check if currently loading
   */
  isLoading(): boolean {
    return this._loading();
  }

  /**
   * Get current error message
   */
  getCurrentError(): string | null {
    return this._error();
  }
}
