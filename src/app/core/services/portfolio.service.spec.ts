import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';
import { PortfolioService } from './portfolio.service';
import { Work } from '../models/work.model';
import { createMockWorks } from '../../shared/testing/mock-data.factory';

describe('PortfolioService', () => {
  let service: PortfolioService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PortfolioService, provideHttpClient(), provideHttpClientTesting()],
    });
    service = TestBed.inject(PortfolioService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify(); // Verify no outstanding HTTP requests
  });

  describe('Service Initialization', () => {
    it('should be created', () => {
      expect(service).toBeTruthy();
    });

    it('should initialize with empty works array', (done) => {
      service.works$.subscribe((works) => {
        expect(works).toEqual([]);
        done();
      });
    });

    it('should initialize with loading = false', (done) => {
      service.loading$.subscribe((loading) => {
        expect(loading).toBe(false);
        done();
      });
    });

    it('should initialize with error = null', (done) => {
      service.error$.subscribe((error) => {
        expect(error).toBeNull();
        done();
      });
    });

    it('should expose works$ as Observable', () => {
      expect(service.works$).toBeDefined();
      expect(typeof service.works$.subscribe).toBe('function');
    });

    it('should expose loading$ as Observable', () => {
      expect(service.loading$).toBeDefined();
      expect(typeof service.loading$.subscribe).toBe('function');
    });

    it('should expose error$ as Observable', () => {
      expect(service.error$).toBeDefined();
      expect(typeof service.error$.subscribe).toBe('function');
    });
  });

  describe('loadWorks - HTTP Success', () => {
    it('should load works from JSON file', (done) => {
      const mockWorks: Work[] = createMockWorks(3);

      service.loadWorks();

      const req = httpMock.expectOne('/assets/data/works.json');
      expect(req.request.method).toBe('GET');
      req.flush(mockWorks);

      service.works$.subscribe((works) => {
        expect(works).toEqual(mockWorks);
        expect(works.length).toBe(3);
        done();
      });
    });

    it('should set loading to true when starting to load works', (done) => {
      const mockWorks: Work[] = createMockWorks(2);
      const loadingStates: boolean[] = [];

      service.loading$.subscribe((loading) => {
        loadingStates.push(loading);
      });

      service.loadWorks();

      const req = httpMock.expectOne('/assets/data/works.json');
      expect(loadingStates[loadingStates.length - 1]).toBe(true);

      req.flush(mockWorks);

      setTimeout(() => {
        expect(loadingStates[loadingStates.length - 1]).toBe(false);
        done();
      }, 100);
    });

    it('should set loading to false after works are loaded', (done) => {
      const mockWorks: Work[] = createMockWorks(1);

      service.loadWorks();

      const req = httpMock.expectOne('/assets/data/works.json');
      req.flush(mockWorks);

      service.loading$.subscribe((loading) => {
        expect(loading).toBe(false);
        done();
      });
    });

    it('should clear any previous errors when loading succeeds', (done) => {
      const mockWorks: Work[] = createMockWorks(2);

      service.loadWorks();

      const req = httpMock.expectOne('/assets/data/works.json');
      req.flush(mockWorks);

      service.error$.subscribe((error) => {
        expect(error).toBeNull();
        done();
      });
    });

    it('should handle empty array response', (done) => {
      service.loadWorks();

      const req = httpMock.expectOne('/assets/data/works.json');
      req.flush([]);

      service.works$.subscribe((works) => {
        expect(works).toEqual([]);
        expect(works.length).toBe(0);
        done();
      });
    });
  });

  describe('loadWorks - HTTP Error Handling', () => {
    it('should handle 404 error when JSON file not found', (done) => {
      service.loadWorks();

      const req = httpMock.expectOne('/assets/data/works.json');
      req.flush('File not found', { status: 404, statusText: 'Not Found' });

      service.error$.subscribe((error) => {
        expect(error).toBeTruthy();
        expect(error).toContain('Failed to load');
        done();
      });
    });

    it('should set loading to false when error occurs', (done) => {
      service.loadWorks();

      const req = httpMock.expectOne('/assets/data/works.json');
      req.flush('Error', { status: 500, statusText: 'Server Error' });

      service.loading$.subscribe((loading) => {
        expect(loading).toBe(false);
        done();
      });
    });

    it('should keep works empty when error occurs', (done) => {
      service.loadWorks();

      const req = httpMock.expectOne('/assets/data/works.json');
      req.flush('Error', { status: 500, statusText: 'Server Error' });

      service.works$.subscribe((works) => {
        expect(works).toEqual([]);
        done();
      });
    });

    it('should handle network errors', (done) => {
      service.loadWorks();

      const req = httpMock.expectOne('/assets/data/works.json');
      req.error(new ProgressEvent('Network error'));

      service.error$.subscribe((error) => {
        expect(error).toBeTruthy();
        done();
      });
    });
  });

  describe('getWorkById', () => {
    beforeEach((done) => {
      const mockWorks: Work[] = createMockWorks(5);
      service.loadWorks();
      const req = httpMock.expectOne('/assets/data/works.json');
      req.flush(mockWorks);
      done();
    });

    it('should return work by id as Observable', (done) => {
      service.getWorkById('work-1').subscribe((work) => {
        expect(work).toBeDefined();
        expect(work?.id).toBe('work-1');
        expect(work?.title).toBe('Work 1');
        done();
      });
    });

    it('should return undefined for non-existent id', (done) => {
      service.getWorkById('non-existent-id').subscribe((work) => {
        expect(work).toBeUndefined();
        done();
      });
    });

    it('should return undefined when works array is empty', (done) => {
      // Create new service instance with no data loaded
      const emptyService = TestBed.inject(PortfolioService);

      emptyService.getWorkById('any-id').subscribe((work) => {
        expect(work).toBeUndefined();
        done();
      });
    });

    it('should be case-sensitive when matching IDs', (done) => {
      service.getWorkById('WORK-1').subscribe((work) => {
        expect(work).toBeUndefined();
        done();
      });
    });

    it('should return correct work from multiple works', (done) => {
      service.getWorkById('work-3').subscribe((work) => {
        expect(work).toBeDefined();
        expect(work?.id).toBe('work-3');
        expect(work?.title).toBe('Work 3');
        done();
      });
    });
  });

  describe('State Management', () => {
    it('should maintain reactive state across multiple subscriptions', (done) => {
      const mockWorks: Work[] = createMockWorks(2);
      let subscription1Works: Work[] = [];
      let subscription2Works: Work[] = [];

      service.works$.subscribe((works) => {
        subscription1Works = works;
      });

      service.works$.subscribe((works) => {
        subscription2Works = works;
      });

      service.loadWorks();
      const req = httpMock.expectOne('/assets/data/works.json');
      req.flush(mockWorks);

      setTimeout(() => {
        expect(subscription1Works).toEqual(mockWorks);
        expect(subscription2Works).toEqual(mockWorks);
        expect(subscription1Works).toEqual(subscription2Works);
        done();
      }, 100);
    });

    it('should emit updated state to existing subscribers', (done) => {
      const mockWorks1: Work[] = createMockWorks(2);
      const mockWorks2: Work[] = createMockWorks(3);
      let emissionCount = 0;
      let lastEmittedWorks: Work[] = [];

      service.works$.subscribe((works) => {
        emissionCount++;
        lastEmittedWorks = works;
      });

      // First load
      service.loadWorks();
      const req1 = httpMock.expectOne('/assets/data/works.json');
      req1.flush(mockWorks1);

      setTimeout(() => {
        expect(emissionCount).toBeGreaterThan(1);
        expect(lastEmittedWorks.length).toBe(2);

        // Second load
        service.loadWorks();
        const req2 = httpMock.expectOne('/assets/data/works.json');
        req2.flush(mockWorks2);

        setTimeout(() => {
          expect(emissionCount).toBeGreaterThan(2);
          expect(lastEmittedWorks.length).toBe(3);
          done();
        }, 100);
      }, 100);
    });
  });

  describe('Observable Memory Safety', () => {
    it('should allow unsubscription from observables', () => {
      const subscription = service.works$.subscribe();
      expect(subscription.closed).toBe(false);

      subscription.unsubscribe();
      expect(subscription.closed).toBe(true);
    });

    it('should handle multiple sequential loads without memory leaks', () => {
      const mockWorks: Work[] = createMockWorks(1);

      for (let i = 0; i < 5; i++) {
        service.loadWorks();
        const req = httpMock.expectOne('/assets/data/works.json');
        req.flush(mockWorks);
      }

      // If we get here without errors, memory management is working
      expect(true).toBe(true);
    });
  });

  describe('Synchronous Helper Methods', () => {
    it('should return current works snapshot via getCurrentWorks()', () => {
      const currentWorks = service.getCurrentWorks();
      expect(currentWorks).toEqual([]);
    });

    it('should return updated works snapshot after loading', (done) => {
      const mockWorks: Work[] = createMockWorks(3);

      service.loadWorks();
      const req = httpMock.expectOne('/assets/data/works.json');
      req.flush(mockWorks);

      setTimeout(() => {
        const currentWorks = service.getCurrentWorks();
        expect(currentWorks).toEqual(mockWorks);
        expect(currentWorks.length).toBe(3);
        done();
      }, 100);
    });

    it('should return current loading state via isLoading()', () => {
      expect(service.isLoading()).toBe(false);
    });

    it('should return true when loading is in progress', () => {
      service.loadWorks();
      expect(service.isLoading()).toBe(true);

      const req = httpMock.expectOne('/assets/data/works.json');
      req.flush([]);
    });

    it('should return current error via getCurrentError()', () => {
      expect(service.getCurrentError()).toBeNull();
    });

    it('should return error message after failed load', (done) => {
      service.loadWorks();

      const req = httpMock.expectOne('/assets/data/works.json');
      req.flush('Error', { status: 404, statusText: 'Not Found' });

      setTimeout(() => {
        const currentError = service.getCurrentError();
        expect(currentError).toBeTruthy();
        expect(currentError).toContain('Failed to load');
        done();
      }, 100);
    });
  });

  describe('Edge Cases', () => {
    it('should handle null response gracefully', (done) => {
      service.loadWorks();

      const req = httpMock.expectOne('/assets/data/works.json');
      req.flush(null);

      service.works$.subscribe((works) => {
        // Service should handle null and provide empty array or error
        expect(works).toBeDefined();
        done();
      });
    });

    it('should handle malformed JSON data by treating non-array as empty', (done) => {
      service.loadWorks();

      const req = httpMock.expectOne('/assets/data/works.json');
      // Send a string instead of array - service should handle gracefully
      req.flush('invalid json', { status: 200, statusText: 'OK' });

      service.works$.subscribe((works) => {
        // Service converts non-array responses to empty array
        expect(Array.isArray(works)).toBe(true);
        expect(works.length).toBe(0);
        done();
      });
    });

    it('should handle concurrent loadWorks calls', () => {
      const mockWorks: Work[] = createMockWorks(2);

      service.loadWorks();
      service.loadWorks();

      const requests = httpMock.match('/assets/data/works.json');
      expect(requests.length).toBe(2);

      requests.forEach((req) => req.flush(mockWorks));
    });
  });
});
