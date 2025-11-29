/**
 * Portfolio Management Container Tests
 * Tests for signal-based container component
 */

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { PortfolioManagementComponent } from './portfolio-management';
import { PortfolioService } from './services/portfolio.service';
import { Work } from './models';

describe('PortfolioManagementComponent', () => {
  let component: PortfolioManagementComponent;
  let fixture: ComponentFixture<PortfolioManagementComponent>;
  let service: PortfolioService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PortfolioManagementComponent, HttpClientTestingModule],
      providers: [PortfolioService],
    }).compileComponents();

    fixture = TestBed.createComponent(PortfolioManagementComponent);
    component = fixture.componentInstance;
    service = TestBed.inject(PortfolioService);
  });

  describe('Component Initialization', () => {
    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('should have works signal', () => {
      expect(typeof component.works()).toBeDefined();
    });

    it('should have loading signal', () => {
      expect(typeof component.loading()).toBe('boolean');
    });

    it('should have error signal', () => {
      expect(component.error() === null || typeof component.error() === 'string').toBe(true);
    });

    it('should have selectedWork signal', () => {
      expect(component.selectedWork() === null || typeof component.selectedWork() === 'object').toBe(true);
    });
  });

  describe('Service Integration', () => {
    it('should inject PortfolioService', () => {
      expect(service).toBeTruthy();
    });

    it('should initialize service on construction', () => {
      spyOn(service, 'initialize');
      new PortfolioManagementComponent();
      expect(service.initialize).toHaveBeenCalled();
    });

    it('should expose works from service', () => {
      expect(Array.isArray(component.works())).toBe(true);
    });

    it('should expose loading from service', () => {
      expect(typeof component.loading()).toBe('boolean');
    });

    it('should expose error from service', () => {
      const error = component.error();
      expect(error === null || typeof error === 'string').toBe(true);
    });
  });

  describe('Work Selection', () => {
    const mockWork: Work = {
      id: 'test-1',
      title: 'Test Work',
      poster: 'test.png',
      description: 'Test Description',
      linkView: 'http://example.com',
      date: 'JAN 2024',
      Link: 'http://github.com/test',
    };

    it('should start with no selected work', () => {
      expect(component.selectedWork()).toBeNull();
    });

    it('should select work on onSelectWork', () => {
      component.onSelectWork(mockWork);
      expect(component.selectedWork()).toEqual(mockWork);
    });

    it('should close modal on onCloseModal', () => {
      component.onSelectWork(mockWork);
      expect(component.selectedWork()).not.toBeNull();
      component.onCloseModal();
      expect(component.selectedWork()).toBeNull();
    });
  });

  describe('State Management', () => {
    it('should handle multiple work selections', () => {
      const work1: Work = {
        id: 'work-1',
        title: 'Work 1',
        poster: 'w1.png',
        description: 'Desc 1',
        linkView: 'http://work1.com',
        date: 'JAN 2024',
        Link: 'http://github.com/w1',
      };

      const work2: Work = {
        id: 'work-2',
        title: 'Work 2',
        poster: 'w2.png',
        description: 'Desc 2',
        linkView: 'http://work2.com',
        date: 'FEB 2024',
        Link: 'http://github.com/w2',
      };

      component.onSelectWork(work1);
      expect(component.selectedWork()?.id).toBe('work-1');

      component.onSelectWork(work2);
      expect(component.selectedWork()?.id).toBe('work-2');
    });
  });
});
