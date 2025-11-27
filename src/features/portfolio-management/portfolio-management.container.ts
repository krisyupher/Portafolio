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
    <!-- Container template - will be implemented in Phase 3 -->
  `,
  standalone: false,
})
export class PortfolioManagementContainer implements OnInit {
  works$: Observable<Work[]>;
  loading$: Observable<boolean>;
  error$: Observable<string | null>;

  constructor(private portfolioService: PortfolioService) {
    this.works$ = this.portfolioService.works$;
    this.loading$ = this.portfolioService.loading$;
    this.error$ = this.portfolioService.error$;
  }

  ngOnInit(): void {
    // Load works on component initialization
    this.portfolioService.loadWorks();
  }

  /**
   * Handle work selection
   */
  onSelectWork(work: Work): void {
    // Placeholder - will be implemented in Phase 3
  }

  /**
   * Handle modal close
   */
  onCloseModal(): void {
    // Placeholder - will be implemented in Phase 3
  }
}
