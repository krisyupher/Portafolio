import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, Observable, catchError, map, of } from 'rxjs';
import { Work } from '../models/work.model';

/**
 * PortfolioService manages the portfolio works data with reactive state management.
 *
 * This service uses BehaviorSubject to provide reactive state for:
 * - works: Array of portfolio items
 * - loading: Loading state indicator
 * - error: Error message when operations fail
 *
 * State is exposed as Observables for components to subscribe to.
 */
@Injectable({
  providedIn: 'root',
})
export class PortfolioService {
  private readonly WORKS_DATA_PATH = '/assets/data/works.json';

  // Private BehaviorSubjects for state management
  private worksSubject = new BehaviorSubject<Work[]>([]);
  private loadingSubject = new BehaviorSubject<boolean>(false);
  private errorSubject = new BehaviorSubject<string | null>(null);

  // Public Observables for component subscriptions
  public readonly works$: Observable<Work[]> = this.worksSubject.asObservable();
  public readonly loading$: Observable<boolean> = this.loadingSubject.asObservable();
  public readonly error$: Observable<string | null> = this.errorSubject.asObservable();

  constructor(private http: HttpClient) {}

  /**
   * Loads portfolio works from JSON file
   *
   * This method:
   * 1. Sets loading state to true
   * 2. Fetches works from /assets/data/works.json
   * 3. Updates works state on success
   * 4. Updates error state on failure
   * 5. Sets loading state to false when complete
   */
  loadWorks(): void {
    this.loadingSubject.next(true);
    this.errorSubject.next(null);

    this.http
      .get<Work[]>(this.WORKS_DATA_PATH)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          const errorMessage = `Failed to load portfolio works. ${error.status === 404 ? 'Data file not found.' : 'Please try again later.'}`;
          this.errorSubject.next(errorMessage);
          this.loadingSubject.next(false);
          return of([]); // Return empty array on error
        })
      )
      .subscribe({
        next: (works: Work[]) => {
          // Handle null or undefined response
          const validatedWorks = Array.isArray(works) ? works : [];
          this.worksSubject.next(validatedWorks);
          this.loadingSubject.next(false);
        },
        error: () => {
          // Fallback error handler (catchError should handle most cases)
          this.errorSubject.next('Failed to load portfolio works. Unexpected error occurred.');
          this.loadingSubject.next(false);
        },
      });
  }

  /**
   * Retrieves a specific work by its ID
   *
   * @param id - The unique identifier of the work to retrieve
   * @returns Observable of Work or undefined if not found
   *
   * This method searches the current works array and returns
   * the matching work as an Observable. Case-sensitive ID matching.
   */
  getWorkById(id: string): Observable<Work | undefined> {
    return this.works$.pipe(map((works) => works.find((work) => work.id === id)));
  }

  /**
   * Gets the current snapshot of works (synchronous)
   * Use this sparingly - prefer subscribing to works$ Observable
   *
   * @returns Current array of works
   */
  getCurrentWorks(): Work[] {
    return this.worksSubject.getValue();
  }

  /**
   * Gets the current loading state (synchronous)
   *
   * @returns Current loading state
   */
  isLoading(): boolean {
    return this.loadingSubject.getValue();
  }

  /**
   * Gets the current error message (synchronous)
   *
   * @returns Current error message or null
   */
  getCurrentError(): string | null {
    return this.errorSubject.getValue();
  }
}
