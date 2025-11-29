/**
 * Portfolio Management Container (Smart Component)
 * LOCAL scope - Feature container for portfolio management
 *
 * Modernized with Angular 20+ signals and standalone pattern
 *
 * Responsibilities:
 * - Handle business logic
 * - Manage state with PortfolioService
 * - Load portfolio data
 * - Handle side effects (data loading, error handling)
 * - Pass data to presentational components
 */

import {
  Component,
  ChangeDetectionStrategy,
  signal,
  inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { PortfolioService } from './services/portfolio.service';
import { Work } from './models';
import { WorkListPresentational } from './components/work-list/work-list.presentational';
import { WorkModalPresentational } from './components/work-modal/work-modal.presentational';

@Component({
  selector: 'app-portfolio-management',
  standalone: true,
  imports: [CommonModule, WorkListPresentational, WorkModalPresentational],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="portfolio-container">
      <!-- Loading State -->
      @if (loading()) {
        <div class="loading-state">
          <div class="spinner"></div>
          <p>Loading portfolio...</p>
        </div>
      }

      <!-- Error State -->
      @if (error()) {
        <div class="error-state">
          <p class="error-message">{{ error() }}</p>
        </div>
      }

      <!-- Portfolio Content -->
      @if (!loading() && !error()) {
        <div class="portfolio-content">
          <!-- Header Section -->
          <section class="portfolio-header">
            <h1>My Work</h1>
            <p class="section-description">
              A collection of my recent projects and professional work
            </p>
          </section>

          <!-- Works Grid -->
          <app-work-list
            [works]="works() || []"
            (selectWork)="onSelectWork($event)"
          ></app-work-list>

          <!-- Work Modal -->
          <app-work-modal
            [work]="selectedWork()"
            (closeModal)="onCloseModal()"
          ></app-work-modal>
        </div>
      }
    </div>
  `,
  styleUrls: ['./portfolio-management.scss'],
})
export class PortfolioManagementComponent {
  private readonly portfolioService = inject(PortfolioService);

  // Public signals from service
  readonly works = this.portfolioService.works;
  readonly loading = this.portfolioService.loading;
  readonly error = this.portfolioService.error;

  // Local state
  private readonly _selectedWork = signal<Work | null>(null);
  readonly selectedWork = this._selectedWork.asReadonly();

  // Initialize service on component creation
  constructor() {
    this.portfolioService.initialize();
  }

  /**
   * Handle work selection
   */
  onSelectWork(work: Work): void {
    this._selectedWork.set(work);
  }

  /**
   * Handle modal close
   */
  onCloseModal(): void {
    this._selectedWork.set(null);
  }
}
