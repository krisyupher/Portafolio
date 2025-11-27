/**
 * Portfolio Management Container (Smart Component)
 * LOCAL scope - Feature container for portfolio management
 *
 * Responsibilities:
 * - Handle business logic
 * - Manage state with PortfolioService
 * - Load portfolio data
 * - Handle side effects (data loading, error handling)
 * - Pass data to presentational components
 */

import { Component, OnInit } from '@angular/core';
import { PortfolioService } from './services/portfolio.service';
import { Work } from './models';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-portfolio-management',
  template: `
    <div class="portfolio-container">
      <!-- Loading State -->
      <div *ngIf="loading$ | async" class="loading-state">
        <div class="spinner"></div>
        <p>Loading portfolio...</p>
      </div>

      <!-- Error State -->
      <div *ngIf="error$ | async as error" class="error-state">
        <p class="error-message">{{ error }}</p>
      </div>

      <!-- Portfolio Content -->
      <div *ngIf="!(loading$ | async) && !(error$ | async)" class="portfolio-content">
        <!-- Header Section -->
        <section class="portfolio-header">
          <h1>My Work</h1>
          <p class="section-description">
            A collection of my recent projects and professional work
          </p>
        </section>

        <!-- Works Grid -->
        <app-work-list
          [works]="(works$ | async) || []"
          (selectWork)="onSelectWork($event)"
        ></app-work-list>

        <!-- Work Modal -->
        <app-work-modal
          [work]="selectedWork"
          (closeModal)="onCloseModal()"
        ></app-work-modal>
      </div>
    </div>
  `,
  styleUrls: ['./portfolio-management.container.scss'],
  standalone: false,
})
export class PortfolioManagementContainer implements OnInit {
  works$: Observable<Work[]>;
  loading$: Observable<boolean>;
  error$: Observable<string | null>;
  selectedWork: Work | null = null;

  constructor(private portfolioService: PortfolioService) {
    this.works$ = this.portfolioService.works$;
    this.loading$ = this.portfolioService.loading$;
    this.error$ = this.portfolioService.error$;
  }

  ngOnInit(): void {
    // Initialize service and load works
    this.portfolioService.initialize();
  }

  /**
   * Handle work selection
   */
  onSelectWork(work: Work): void {
    this.selectedWork = work;
  }

  /**
   * Handle modal close
   */
  onCloseModal(): void {
    this.selectedWork = null;
  }
}
