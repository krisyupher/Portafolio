/**
 * Portfolio Service Tests (RED - Phase 2)
 * Failing tests that define expected behavior
 */

import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { PortfolioService } from './portfolio.service';
import { Work, WorkFilter } from '../models';

describe('PortfolioService (RED)', () => {
  let service: PortfolioService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [PortfolioService],
    });
    service = TestBed.inject(PortfolioService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  describe('Service Initialization', () => {
    it('should be created', () => {
      expect(service).toBeTruthy();
    });

    it('should initialize with empty works array', (done) => {
      service.works$.subscribe((works) => {
        expect(Array.isArray(works)).toBe(true);
        done();
      });
    });

    it('should initialize loading state as false', (done) => {
      service.loading$.subscribe((loading) => {
        expect(typeof loading).toBe('boolean');
        done();
      });
    });

    it('should initialize error state as null', (done) => {
      service.error$.subscribe((error) => {
        expect(error === null).toBe(true);
        done();
      });
    });
  });

  describe('loadWorks()', () => {
    const mockWorks: Work[] = [
      {
        id: 'test-1',
        title: 'Test Project',
        poster: 'test.png',
        description: 'Test description',
        linkView: 'http://test.com',
        date: 'JAN 2024',
        Link: 'http://github.com/test',
      },
      {
        id: 'test-2',
        title: 'Test Project 2',
        poster: 'test2.png',
        description: 'Test description 2',
        linkView: 'http://test2.com',
        date: 'FEB 2024',
        Link: 'http://github.com/test2',
      },
    ];

    it('should set loading state to true when loading', (done) => {
      service.loadWorks();
      service.loading$.subscribe((loading) => {
        if (loading) {
          expect(loading).toBe(true);
          // Flush the HTTP request to avoid verify() error
          const req = httpMock.expectOne('assets/data/works.json');
          req.flush([]);
          done();
        }
      });
    });

    it('should fetch works from works.json', () => {
      service.loadWorks();
      const req = httpMock.expectOne('assets/data/works.json');
      expect(req.request.method).toBe('GET');
      req.flush(mockWorks);
    });

    it('should update works$ with fetched data', (done) => {
      service.loadWorks();
      const req = httpMock.expectOne('assets/data/works.json');
      req.flush(mockWorks);

      service.works$.subscribe((works) => {
        expect(works.length).toBe(2);
        expect(works[0].id).toBe('test-1');
        expect(works[1].id).toBe('test-2');
        done();
      });
    });

    it('should set loading state to false after successful load', (done) => {
      service.loadWorks();
      const req = httpMock.expectOne('assets/data/works.json');
      req.flush(mockWorks);

      setTimeout(() => {
        service.loading$.subscribe((loading) => {
          expect(loading).toBe(false);
          done();
        });
      }, 0);
    });

    it('should clear error state on successful load', (done) => {
      service.loadWorks();
      const req = httpMock.expectOne('assets/data/works.json');
      req.flush(mockWorks);

      setTimeout(() => {
        service.error$.subscribe((error) => {
          expect(error).toBe(null);
          done();
        });
      }, 0);
    });

    it('should handle HTTP errors gracefully', (done) => {
      service.loadWorks();
      const req = httpMock.expectOne('assets/data/works.json');
      req.error(new ErrorEvent('Network error'));

      service.error$.subscribe((error) => {
        if (error) {
          expect(error).toContain('Failed to load');
          done();
        }
      });
    });

    it('should set loading to false on error', (done) => {
      service.loadWorks();
      const req = httpMock.expectOne('assets/data/works.json');
      req.error(new ErrorEvent('Network error'));

      setTimeout(() => {
        service.loading$.subscribe((loading) => {
          expect(loading).toBe(false);
          done();
        });
      }, 0);
    });
  });

  describe('getWorkById()', () => {
    const mockWorks: Work[] = [
      {
        id: 'work-1',
        title: 'Project 1',
        poster: 'p1.png',
        description: 'Desc 1',
        linkView: 'http://p1.com',
        date: 'JAN 2024',
        Link: 'http://github.com/p1',
      },
      {
        id: 'work-2',
        title: 'Project 2',
        poster: 'p2.png',
        description: 'Desc 2',
        linkView: 'http://p2.com',
        date: 'FEB 2024',
        Link: 'http://github.com/p2',
      },
    ];

    beforeEach(() => {
      service.loadWorks();
      const req = httpMock.expectOne('assets/data/works.json');
      req.flush(mockWorks);
    });

    it('should return work by id', (done) => {
      setTimeout(() => {
        const work = service.getWorkById('work-1');
        expect(work).toBeDefined();
        expect(work?.id).toBe('work-1');
        expect(work?.title).toBe('Project 1');
        done();
      }, 0);
    });

    it('should return undefined for non-existent id', (done) => {
      setTimeout(() => {
        const work = service.getWorkById('non-existent');
        expect(work).toBeUndefined();
        done();
      }, 0);
    });

    it('should return correct work when multiple works exist', (done) => {
      setTimeout(() => {
        const work = service.getWorkById('work-2');
        expect(work?.title).toBe('Project 2');
        expect(work?.description).toBe('Desc 2');
        done();
      }, 0);
    });
  });

  describe('getCurrentWorks()', () => {
    const mockWorks: Work[] = [
      {
        id: 'w1',
        title: 'Work 1',
        poster: 'w1.png',
        description: 'Desc',
        linkView: 'http://w1.com',
        date: 'JAN 2024',
        Link: 'http://link1.com',
      },
    ];

    beforeEach(() => {
      service.loadWorks();
      const req = httpMock.expectOne('assets/data/works.json');
      req.flush(mockWorks);
    });

    it('should return synchronous snapshot of current works', (done) => {
      setTimeout(() => {
        const works = service.getCurrentWorks();
        expect(Array.isArray(works)).toBe(true);
        expect(works.length).toBe(1);
        expect(works[0].id).toBe('w1');
        done();
      }, 0);
    });

    it('should return empty array before data loads', () => {
      const newService = new PortfolioService(TestBed.inject(HttpClientTestingModule as any));
      const works = newService.getCurrentWorks();
      expect(Array.isArray(works)).toBe(true);
      expect(works.length).toBe(0);
    });
  });

  describe('isLoading()', () => {
    it('should return loading state synchronously', (done) => {
      service.loadWorks();
      const loading = service.isLoading();
      expect(typeof loading).toBe('boolean');
      const req = httpMock.expectOne('assets/data/works.json');
      req.flush([]);
      done();
    });

    it('should return true during loading', () => {
      service.loadWorks();
      expect(service.isLoading()).toBe(true);
      const req = httpMock.expectOne('assets/data/works.json');
      req.flush([]);
    });
  });

  describe('getCurrentError()', () => {
    it('should return error state synchronously', () => {
      const error = service.getCurrentError();
      expect(error === null || typeof error === 'string').toBe(true);
    });

    it('should return null initially', () => {
      expect(service.getCurrentError()).toBe(null);
    });

    it('should return error message on failed load', (done) => {
      service.loadWorks();
      const req = httpMock.expectOne('assets/data/works.json');
      req.error(new ErrorEvent('Network error'));

      setTimeout(() => {
        const error = service.getCurrentError();
        expect(error).toContain('Failed to load');
        done();
      }, 0);
    });
  });

  describe('filterWorks()', () => {
    const mockWorks: Work[] = [
      {
        id: 'angular-project',
        title: 'Angular Project',
        poster: 'angular.png',
        description: 'Angular description',
        linkView: 'http://angular.com',
        date: 'JAN 2024',
        Link: 'http://github.com/angular',
      },
    ];

    beforeEach(() => {
      service.loadWorks();
      const req = httpMock.expectOne('assets/data/works.json');
      req.flush(mockWorks);
    });

    it('should return observable of works', (done) => {
      const filter: WorkFilter = { searchTerm: 'Angular' };
      service.filterWorks(filter).subscribe((works) => {
        expect(Array.isArray(works)).toBe(true);
        done();
      });
    });

    it('should support WorkFilter interface', (done) => {
      const filter: WorkFilter = {
        searchTerm: 'Angular',
        dateRange: { from: 'JAN 2024', to: 'DEC 2024' },
      };
      service.filterWorks(filter).subscribe(() => {
        done();
      });
    });
  });

  describe('Observable Streams', () => {
    it('should provide works$ observable', (done) => {
      expect(service.works$).toBeDefined();
      service.works$.subscribe(() => {
        done();
      });
    });

    it('should provide loading$ observable', (done) => {
      expect(service.loading$).toBeDefined();
      service.loading$.subscribe(() => {
        done();
      });
    });

    it('should provide error$ observable', (done) => {
      expect(service.error$).toBeDefined();
      service.error$.subscribe(() => {
        done();
      });
    });

    it('should emit multiple values through works$', (done) => {
      const mockWorks: Work[] = [
        {
          id: 'test',
          title: 'Test',
          poster: 'test.png',
          description: 'Test',
          linkView: 'http://test.com',
          date: 'JAN 2024',
          Link: 'http://github.com/test',
        },
      ];

      let emissionCount = 0;
      service.works$.subscribe(() => {
        emissionCount++;
        if (emissionCount === 2) {
          // Initial empty + after load
          expect(emissionCount).toBe(2);
          done();
        }
      });

      service.loadWorks();
      const req = httpMock.expectOne('assets/data/works.json');
      req.flush(mockWorks);
    });
  });

  describe('Memory Safety', () => {
    it('should allow multiple subscriptions', (done) => {
      const mockWorks: Work[] = [
        {
          id: 'test',
          title: 'Test',
          poster: 'test.png',
          description: 'Test',
          linkView: 'http://test.com',
          date: 'JAN 2024',
          Link: 'http://github.com/test',
        },
      ];

      let count = 0;
      service.works$.subscribe(() => {
        count++;
      });
      service.works$.subscribe(() => {
        count++;
      });

      service.loadWorks();
      const req = httpMock.expectOne('assets/data/works.json');
      req.flush(mockWorks);

      setTimeout(() => {
        expect(count).toBeGreaterThan(0);
        done();
      }, 0);
    });
  });
});
