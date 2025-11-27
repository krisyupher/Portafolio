/**
 * About Service (LOCAL)
 * Feature-specific service for about-management feature
 * Handles loading and managing professional information
 */

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { AboutInfo, SkillCategory, Experience, Education } from '../models';

@Injectable({
  providedIn: 'root',
})
export class AboutService {
  private readonly aboutInfoSubject = new BehaviorSubject<AboutInfo | null>(null);
  private readonly skillCategoriesSubject = new BehaviorSubject<SkillCategory[]>([]);
  private readonly experienceSubject = new BehaviorSubject<Experience[]>([]);
  private readonly educationSubject = new BehaviorSubject<Education[]>([]);
  private readonly loadingSubject = new BehaviorSubject<boolean>(false);
  private readonly errorSubject = new BehaviorSubject<string | null>(null);

  readonly aboutInfo$: Observable<AboutInfo | null> = this.aboutInfoSubject.asObservable();
  readonly skillCategories$: Observable<SkillCategory[]> =
    this.skillCategoriesSubject.asObservable();
  readonly experience$: Observable<Experience[]> = this.experienceSubject.asObservable();
  readonly education$: Observable<Education[]> = this.educationSubject.asObservable();
  readonly loading$: Observable<boolean> = this.loadingSubject.asObservable();
  readonly error$: Observable<string | null> = this.errorSubject.asObservable();

  constructor(private http: HttpClient) {
    this.loadAboutData();
  }

  /**
   * Load about data from JSON file
   */
  loadAboutData(): void {
    this.loadingSubject.next(true);
    this.errorSubject.next(null);

    this.http.get('assets/data/about.json').subscribe({
      next: (data: any) => {
        this.aboutInfoSubject.next(data.aboutInfo);
        this.skillCategoriesSubject.next(data.skillCategories);
        this.experienceSubject.next(data.experience);
        this.educationSubject.next(data.education);
        this.loadingSubject.next(false);
      },
      error: () => {
        this.errorSubject.next('Failed to load about information');
        this.loadingSubject.next(false);
      },
    });
  }

  /**
   * Get current about info snapshot
   */
  getCurrentAboutInfo(): AboutInfo | null {
    return this.aboutInfoSubject.getValue();
  }

  /**
   * Get current skills snapshot
   */
  getCurrentSkillCategories(): SkillCategory[] {
    return this.skillCategoriesSubject.getValue();
  }

  /**
   * Get current experience snapshot
   */
  getCurrentExperience(): Experience[] {
    return this.experienceSubject.getValue();
  }

  /**
   * Get current education snapshot
   */
  getCurrentEducation(): Education[] {
    return this.educationSubject.getValue();
  }

  /**
   * Check if currently loading
   */
  isLoading(): boolean {
    return this.loadingSubject.getValue();
  }

  /**
   * Get current error message
   */
  getCurrentError(): string | null {
    return this.errorSubject.getValue();
  }
}
