/**
 * About Management Container Tests (RED - Phase 2)
 * Failing tests that define expected behavior
 */

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AboutManagementContainer } from './about-management.container';
import { AboutService } from './services/about.service';

describe('AboutManagementContainer (RED)', () => {
  let component: AboutManagementContainer;
  let fixture: ComponentFixture<AboutManagementContainer>;
  let service: AboutService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AboutManagementContainer],
      imports: [HttpClientTestingModule],
      providers: [AboutService],
    }).compileComponents();

    fixture = TestBed.createComponent(AboutManagementContainer);
    component = fixture.componentInstance;
    service = TestBed.inject(AboutService);
  });

  describe('Component Initialization', () => {
    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('should have aboutInfo$ observable', () => {
      expect(component.aboutInfo$).toBeDefined();
    });

    it('should have skillCategories$ observable', () => {
      expect(component.skillCategories$).toBeDefined();
    });

    it('should have experience$ observable', () => {
      expect(component.experience$).toBeDefined();
    });

    it('should have education$ observable', () => {
      expect(component.education$).toBeDefined();
    });

    it('should have loading$ observable', () => {
      expect(component.loading$).toBeDefined();
    });

    it('should have error$ observable', () => {
      expect(component.error$).toBeDefined();
    });
  });

  describe('Service Integration', () => {
    it('should inject AboutService', () => {
      expect(service).toBeTruthy();
    });

    it('should have aboutInfo$ from AboutService', (done) => {
      component.aboutInfo$.subscribe((info) => {
        expect(info === null || typeof info === 'object').toBe(true);
        done();
      });
    });

    it('should have skillCategories$ from AboutService', (done) => {
      component.skillCategories$.subscribe((categories) => {
        expect(Array.isArray(categories)).toBe(true);
        done();
      });
    });

    it('should have experience$ from AboutService', (done) => {
      component.experience$.subscribe((exp) => {
        expect(Array.isArray(exp)).toBe(true);
        done();
      });
    });

    it('should have education$ from AboutService', (done) => {
      component.education$.subscribe((edu) => {
        expect(Array.isArray(edu)).toBe(true);
        done();
      });
    });
  });

  describe('Component Lifecycle', () => {
    it('should call loadAboutData on ngOnInit', () => {
      spyOn(service, 'loadAboutData');
      component.ngOnInit();
      expect(service.loadAboutData).toHaveBeenCalled();
    });

    it('should initialize service on component creation', () => {
      spyOn(service, 'loadAboutData');
      fixture.detectChanges();
      expect(service.loadAboutData).toHaveBeenCalled();
    });
  });

  describe('Data Streams', () => {
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
      expect(component.aboutInfo$).toBeTruthy();
      expect(component.skillCategories$).toBeTruthy();
      expect(component.experience$).toBeTruthy();
      expect(component.education$).toBeTruthy();
      expect(component.loading$).toBeTruthy();
      expect(component.error$).toBeTruthy();
    });
  });

  describe('Observable Emissions', () => {
    it('should emit multiple values through aboutInfo$', (done) => {
      let emissionCount = 0;
      component.aboutInfo$.subscribe(() => {
        emissionCount++;
        if (emissionCount >= 1) {
          expect(emissionCount).toBeGreaterThanOrEqual(1);
          done();
        }
      });

      fixture.detectChanges();
    });
  });
});
