/**
 * Portfolio Service Tests
 * Tests for signal-based service with modern Angular patterns
 */

import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { PortfolioService } from './portfolio.service';
import { Work } from '../models';

describe('PortfolioService', () => {
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

    it('should initialize with empty works signal', () => {
      expect(Array.isArray(service.works())).toBe(true);
      expect(service.works().length).toBe(0);
    });

    it('should initialize with loading as false', () => {
      expect(service.loading()).toBe(false);
    });

    it('should initialize with error as null', () => {
      expect(service.error()).toBe(null);
    });

    it('should have hasWorks computed as false initially', () => {
      expect(service.hasWorks()).toBe(false);
    });

    it('should have workCount computed as 0 initially', () => {
      expect(service.workCount()).toBe(0);
    });
  });

  describe('loadWorks()', () => {
    const mockWorks: Work[] = [
      {
        id: 'work-1',
        title: 'Work 1',
        poster: 'w1.png',
        description: 'Description 1',
        linkView: 'http://work1.com',
        date: 'JAN 2024',
        Link: 'http://github.com/work1',
      },
      {
        id: 'work-2',
        title: 'Work 2',
        poster: 'w2.png',
        description: 'Description 2',
        linkView: 'http://work2.com',
        date: 'FEB 2024',
        Link: 'http://github.com/work2',
      },
    ];

    it('should set loading to true when loading starts', () => {
      service.loadWorks();
      expect(service.loading()).toBe(true);
    });

    it('should fetch works from works.json', () => {
      service.loadWorks();
      const req = httpMock.expectOne('assets/data/works.json');
      expect(req.request.method).toBe('GET');
      req.flush(mockWorks);
    });

    it('should update works signal on successful load', (done) => {
      service.loadWorks();
      const req = httpMock.expectOne('assets/data/works.json');
      req.flush(mockWorks);

      setTimeout(() => {
        expect(service.works().length).toBe(2);
        expect(service.works()[0].id).toBe('work-1');
        done();
      }, 0);
    });

    it('should set loading to false after successful load', (done) => {
      service.loadWorks();
      const req = httpMock.expectOne('assets/data/works.json');
      req.flush(mockWorks);

      setTimeout(() => {
        expect(service.loading()).toBe(false);
        done();
      }, 0);
    });

    it('should clear error on successful load', (done) => {
      service.loadWorks();
      const req = httpMock.expectOne('assets/data/works.json');
      req.flush(mockWorks);

      setTimeout(() => {
        expect(service.error()).toBe(null);
        done();
      }, 0);
    });

    it('should handle HTTP errors', (done) => {
      service.loadWorks();
      const req = httpMock.expectOne('assets/data/works.json');
      req.error(new ErrorEvent('Network error'));

      setTimeout(() => {
        expect(service.error()).toContain('Failed to load');
        done();
      }, 0);
    });

    it('should set loading to false on error', (done) => {
      service.loadWorks();
      const req = httpMock.expectOne('assets/data/works.json');
      req.error(new ErrorEvent('Network error'));

      setTimeout(() => {
        expect(service.loading()).toBe(false);
        done();
      }, 0);
    });
  });

  describe('getWorkById()', () => {
    const mockWorks: Work[] = [
      {
        id: 'test-1',
        title: 'Test Work',
        poster: 'test.png',
        description: 'Test',
        linkView: 'http://test.com',
        date: 'JAN 2024',
        Link: 'http://github.com/test',
      },
    ];

    beforeEach((done) => {
      service.loadWorks();
      const req = httpMock.expectOne('assets/data/works.json');
      req.flush(mockWorks);
      setTimeout(() => done(), 0);
    });

    it('should return work by id', () => {
      const work = service.getWorkById('test-1');
      expect(work).toBeDefined();
      expect(work?.title).toBe('Test Work');
    });

    it('should return undefined for non-existent id', () => {
      const work = service.getWorkById('non-existent');
      expect(work).toBeUndefined();
    });
  });

  describe('getCurrentWorks()', () => {
    const mockWorks: Work[] = [
      {
        id: 'test-1',
        title: 'Test Work',
        poster: 'test.png',
        description: 'Test',
        linkView: 'http://test.com',
        date: 'JAN 2024',
        Link: 'http://github.com/test',
      },
    ];

    it('should return empty array before data loads', () => {
      const works = service.getCurrentWorks();
      expect(Array.isArray(works)).toBe(true);
      expect(works.length).toBe(0);
    });

    it('should return synchronous snapshot after load', (done) => {
      service.loadWorks();
      const req = httpMock.expectOne('assets/data/works.json');
      req.flush(mockWorks);

      setTimeout(() => {
        const works = service.getCurrentWorks();
        expect(works.length).toBe(1);
        done();
      }, 0);
    });
  });

  describe('isLoading()', () => {
    it('should return false initially', () => {
      expect(service.isLoading()).toBe(false);
    });

    it('should return true during load', () => {
      service.loadWorks();
      expect(service.isLoading()).toBe(true);
    });
  });

  describe('getCurrentError()', () => {
    it('should return null initially', () => {
      expect(service.getCurrentError()).toBe(null);
    });

    it('should return error message on failure', (done) => {
      service.loadWorks();
      const req = httpMock.expectOne('assets/data/works.json');
      req.error(new ErrorEvent('Network error'));

      setTimeout(() => {
        expect(service.getCurrentError()).toContain('Failed to load');
        done();
      }, 0);
    });
  });

  describe('filterWorks()', () => {
    const mockWorks: Work[] = [
      {
        id: 'work-1',
        title: 'Work 1',
        poster: 'w1.png',
        description: 'Description 1',
        linkView: 'http://work1.com',
        date: 'JAN 2024',
        Link: 'http://github.com/work1',
      },
    ];

    beforeEach((done) => {
      service.loadWorks();
      const req = httpMock.expectOne('assets/data/works.json');
      req.flush(mockWorks);
      setTimeout(() => done(), 0);
    });

    it('should return works array', () => {
      const filtered = service.filterWorks({});
      expect(Array.isArray(filtered)).toBe(true);
    });

    it('should return all works when filter is empty', () => {
      const filtered = service.filterWorks({});
      expect(filtered.length).toBe(1);
    });
  });

  describe('initialize()', () => {
    it('should call loadWorks', () => {
      spyOn(service, 'loadWorks');
      service.initialize();
      expect(service.loadWorks).toHaveBeenCalled();
    });

    it('should only load once', () => {
      spyOn(service, 'loadWorks');
      service.initialize();
      service.initialize();
      expect(service.loadWorks).toHaveBeenCalledTimes(1);
    });
  });

  describe('Signal Reactivity', () => {
    const mockWorks: Work[] = [
      {
        id: 'test-1',
        title: 'Test',
        poster: 'test.png',
        description: 'Test',
        linkView: 'http://test.com',
        date: 'JAN 2024',
        Link: 'http://github.com/test',
      },
    ];

    it('works signal should be reactive', (done) => {
      service.loadWorks();
      const req = httpMock.expectOne('assets/data/works.json');
      req.flush(mockWorks);

      setTimeout(() => {
        expect(service.hasWorks()).toBe(true);
        expect(service.workCount()).toBe(1);
        done();
      }, 0);
    });
  });
});
