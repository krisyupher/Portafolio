/**
 * Portfolio Service (LOCAL)
 * Feature-specific service for portfolio-management feature
 * Handles business logic for loading, filtering, and managing portfolio works
 */

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Work, WorkFilter } from '../models';

@Injectable({
  providedIn: 'root',
})
export class PortfolioService {
  private readonly worksSubject = new BehaviorSubject<Work[]>([]);
  private readonly loadingSubject = new BehaviorSubject<boolean>(false);
  private readonly errorSubject = new BehaviorSubject<string | null>(null);

  readonly works$: Observable<Work[]> = this.worksSubject.asObservable();
  readonly loading$: Observable<boolean> = this.loadingSubject.asObservable();
  readonly error$: Observable<string | null> = this.errorSubject.asObservable();

  constructor(private http: HttpClient) {
    this.loadWorks();
  }

  /**
   * Load all portfolio works from JSON file
   */
  loadWorks(): void {
    this.loadingSubject.next(true);
    this.errorSubject.next(null);

    this.http.get<Work[]>('assets/data/works.json').subscribe({
      next: (works) => {
        this.worksSubject.next(works);
        this.loadingSubject.next(false);
      },
      error: () => {
        this.errorSubject.next('Failed to load portfolio works');
        this.loadingSubject.next(false);
      },
    });
  }

  /**
   * Get a specific work by ID
   */
  getWorkById(id: string): Work | undefined {
    return this.worksSubject.getValue().find((work) => work.id === id);
  }

  /**
   * Get current works snapshot
   */
  getCurrentWorks(): Work[] {
    return this.worksSubject.getValue();
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

  /**
   * Filter works based on criteria (prepared for implementation in Phase 3)
   */
  filterWorks(filter: WorkFilter): Observable<Work[]> {
    // Placeholder interface - implementation in GREEN phase
    return this.works$;
  }
}
