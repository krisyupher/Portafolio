/**
 * Portfolio Management Container Tests (RED - Phase 2)
 * Failing tests that define expected behavior
 */

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { PortfolioManagementContainer } from './portfolio-management.container';
import { PortfolioService } from './services/portfolio.service';
import { Work } from './models';

describe('PortfolioManagementContainer (RED)', () => {
  let component: PortfolioManagementContainer;
  let fixture: ComponentFixture<PortfolioManagementContainer>;
  let service: PortfolioService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PortfolioManagementContainer],
      imports: [HttpClientTestingModule],
      providers: [PortfolioService],
    }).compileComponents();

    fixture = TestBed.createComponent(PortfolioManagementContainer);
    component = fixture.componentInstance;
    service = TestBed.inject(PortfolioService);
  });

  describe('Component Initialization', () => {
    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('should have works$ observable', () => {
      expect(component.works$).toBeDefined();
    });

    it('should have loading$ observable', () => {
      expect(component.loading$).toBeDefined();
    });

    it('should have error$ observable', () => {
      expect(component.error$).toBeDefined();
    });
  });

  describe('Service Integration', () => {
    it('should inject PortfolioService', () => {
      expect(service).toBeTruthy();
    });

    it('should have works$ from PortfolioService', (done) => {
      component.works$.subscribe((works) => {
        expect(Array.isArray(works)).toBe(true);
        done();
      });
    });

    it('should have loading$ from PortfolioService', (done) => {
      component.loading$.subscribe((loading) => {
        expect(typeof loading).toBe('boolean');
        done();
      });
    });

    it('should have error$ from PortfolioService', (done) => {
      component.error$.subscribe((error) => {
        expect(error === null || typeof error === 'string').toBe(true);
        done();
      });
    });
  });

  describe('Component Lifecycle', () => {
    it('should call loadWorks on ngOnInit', () => {
      spyOn(service, 'loadWorks');
      component.ngOnInit();
      expect(service.loadWorks).toHaveBeenCalled();
    });

    it('should initialize service on component creation', () => {
      spyOn(service, 'loadWorks');
      fixture.detectChanges();
      expect(service.loadWorks).toHaveBeenCalled();
    });
  });

  describe('Data Handling', () => {
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

    it('should receive works from service', (done) => {
      service.loadWorks();
      const req = TestBed.inject(HttpClientTestingModule);

      component.works$.subscribe((works) => {
        expect(Array.isArray(works)).toBe(true);
        done();
      });

      fixture.detectChanges();
    });

    it('should handle empty works array', (done) => {
      component.works$.subscribe((works) => {
        expect(Array.isArray(works)).toBe(true);
        done();
      });
    });
  });

  describe('Event Handling', () => {
    it('should have onSelectWork method', () => {
      expect(typeof component.onSelectWork).toBe('function');
    });

    it('should have onCloseModal method', () => {
      expect(typeof component.onCloseModal).toBe('function');
    });

    it('should handle work selection', () => {
      const mockWork: Work = {
        id: 'test',
        title: 'Test Work',
        poster: 'test.png',
        description: 'Test',
        linkView: 'http://test.com',
        date: 'JAN 2024',
        Link: 'http://github.com/test',
      };

      expect(() => {
        component.onSelectWork(mockWork);
      }).not.toThrow();
    });

    it('should handle modal close', () => {
      expect(() => {
        component.onCloseModal();
      }).not.toThrow();
    });
  });

  describe('Observable Subscriptions', () => {
    it('should expose loading state through observable', (done) => {
      component.loading$.subscribe((loading) => {
        expect(typeof loading).toBe('boolean');
        done();
      });
    });

    it('should expose error state through observable', (done) => {
      component.error$.subscribe((error) => {
        expect(error === null || typeof error === 'string').toBe(true);
        done();
      });
    });

    it('should provide async-friendly observables', () => {
      expect(component.works$).toBeTruthy();
      expect(component.loading$).toBeTruthy();
      expect(component.error$).toBeTruthy();
    });
  });
});
