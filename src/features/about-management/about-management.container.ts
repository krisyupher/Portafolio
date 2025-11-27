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
    <!-- About management template - will be implemented in Phase 3 -->
  `,
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
    // Load about data on component initialization
    this.aboutService.loadAboutData();
  }
}
