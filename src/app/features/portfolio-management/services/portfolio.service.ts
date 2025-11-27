/**
 * Portfolio Service (LOCAL)
 * Feature-specific service for portfolio-management feature
 * Handles business logic for loading, filtering, and managing portfolio works
 *
 * Modernized with Angular 20+ signals and standalone patterns
 */

import { Injectable, signal, computed, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Work, WorkFilter } from '../models';

@Injectable({
  providedIn: 'root',
})
export class PortfolioService {
  private readonly http = inject(HttpClient);

  // Private signals for internal state
  private readonly _works = signal<Work[]>([]);
  private readonly _loading = signal(false);
  private readonly _error = signal<string | null>(null);
  private _initialized = false;

  // Public readonly computed values
  readonly works = this._works.asReadonly();
  readonly loading = this._loading.asReadonly();
  readonly error = this._error.asReadonly();

  // Computed derived values
  readonly hasWorks = computed(() => this._works().length > 0);
  readonly workCount = computed(() => this._works().length);

  /**
   * Initialize service - should be called once when needed
   */
  initialize(): void {
    if (this._initialized) return;
    this._initialized = true;
    this.loadWorks();
  }

  /**
   * Load all portfolio works from JSON file
   */
  loadWorks(): void {
    this._loading.set(true);
    this._error.set(null);

    this.http.get<Work[]>('assets/data/works.json').subscribe({
      next: (works) => {
        this._works.set(works);
        this._loading.set(false);
      },
      error: () => {
        this._error.set('Failed to load portfolio works');
        this._loading.set(false);
      },
    });
  }

  /**
   * Get a specific work by ID
   */
  getWorkById(id: string): Work | undefined {
    return this._works().find((work) => work.id === id);
  }

  /**
   * Get current works snapshot
   */
  getCurrentWorks(): Work[] {
    return this._works();
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

  /**
   * Filter works based on criteria
   */
  filterWorks(_filter: WorkFilter): Work[] {
    return this._works().filter(() => {
      // Implementation can be extended based on filter interface
      return true;
    });
  }
}
