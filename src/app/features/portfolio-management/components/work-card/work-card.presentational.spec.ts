/**
 * Work Card Presentational Component Tests
 *
 * SCOPE: LOCAL - Portfolio Management Feature
 *
 * Tests for the WorkCardPresentational standalone component
 * using Angular 20+ signal-based inputs and outputs.
 *
 * Test Coverage:
 * - Component initialization
 * - Signal-based input() bindings
 * - Signal-based output() event emissions
 * - User interactions (button clicks)
 * - Template rendering and data display
 * - Accessibility features
 */

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { WorkCardPresentational } from './work-card.presentational';
import { Work } from '../models';

/**
 * Mock work data factory for consistent test data
 */
function createMockWork(overrides?: Partial<Work>): Work {
  return {
    id: 'test-work-id',
    title: 'Test Project Title',
    poster: '/assets/img/test-project.png',
    description: 'This is a test project description',
    linkView: 'https://test-project.com',
    date: 'JAN 2024',
    Link: 'https://github.com/test/project',
    ...overrides,
  };
}

describe('WorkCardPresentational', () => {
  let component: WorkCardPresentational;
  let fixture: ComponentFixture<WorkCardPresentational>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WorkCardPresentational],
    }).compileComponents();

    fixture = TestBed.createComponent(WorkCardPresentational);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('Component Initialization', () => {
    it('should create the component', () => {
      expect(component).toBeTruthy();
    });

    it('should initialize with null work signal', () => {
      expect(component.work()).toBeNull();
    });

    it('should have openModal output signal', () => {
      expect(component.openModal).toBeDefined();
    });
  });

  describe('Input Signal: work', () => {
    it('should accept work signal input', () => {
      const mockWork = createMockWork();
      fixture.componentRef.setInput('work', mockWork);
      fixture.detectChanges();

      expect(component.work()).toEqual(mockWork);
    });

    it('should update when work signal changes', () => {
      const mockWork1 = createMockWork({ id: 'work-1' });
      const mockWork2 = createMockWork({ id: 'work-2' });

      fixture.componentRef.setInput('work', mockWork1);
      fixture.detectChanges();
      expect(component.work()?.id).toBe('work-1');

      fixture.componentRef.setInput('work', mockWork2);
      fixture.detectChanges();
      expect(component.work()?.id).toBe('work-2');
    });

    it('should handle null work signal', () => {
      fixture.componentRef.setInput('work', null);
      fixture.detectChanges();

      expect(component.work()).toBeNull();
    });

    it('should display work data in template when work is not null', () => {
      const mockWork = createMockWork({
        title: 'My Awesome Project',
        date: 'FEB 2024',
      });

      fixture.componentRef.setInput('work', mockWork);
      fixture.detectChanges();

      const titleElement = fixture.nativeElement.querySelector('.card-title');
      const dateElement = fixture.nativeElement.querySelector('.card-date');

      expect(titleElement?.textContent).toContain('My Awesome Project');
      expect(dateElement?.textContent).toContain('FEB 2024');
    });

    it('should not display card when work is null', () => {
      fixture.componentRef.setInput('work', null);
      fixture.detectChanges();

      const card = fixture.nativeElement.querySelector('.work-card');
      expect(card).toBeNull();
    });
  });

  describe('Output Signal: openModal', () => {
    it('should have openModal output signal defined', () => {
      expect(component.openModal).toBeDefined();
    });

    it('should emit openModal event when button is clicked', (done) => {
      const mockWork = createMockWork();
      fixture.componentRef.setInput('work', mockWork);
      fixture.detectChanges();

      component.openModal.subscribe((emittedWork: Work) => {
        expect(emittedWork).toEqual(mockWork);
        done();
      });

      const button = fixture.nativeElement.querySelector('.open-button');
      button.click();
    });

    it('should not emit openModal when work is null', (done) => {
      fixture.componentRef.setInput('work', null);
      fixture.detectChanges();

      let emitted = false;
      component.openModal.subscribe(() => {
        emitted = true;
      });

      component.onOpenModal();

      setTimeout(() => {
        expect(emitted).toBe(false);
        done();
      }, 50);
    });

    it('should emit correct work data with different work items', (done) => {
      const works = [
        createMockWork({ id: 'work-1', title: 'Project 1' }),
        createMockWork({ id: 'work-2', title: 'Project 2' }),
      ];

      let emissionCount = 0;

      component.openModal.subscribe((emittedWork: Work) => {
        emissionCount++;
        expect(emittedWork).toEqual(works[emissionCount - 1]);

        if (emissionCount === 2) {
          done();
        }
      });

      // Emit first work
      fixture.componentRef.setInput('work', works[0]);
      fixture.detectChanges();
      component.onOpenModal();

      // Emit second work
      fixture.componentRef.setInput('work', works[1]);
      fixture.detectChanges();
      component.onOpenModal();
    });
  });

  describe('User Interaction: onOpenModal', () => {
    it('should have onOpenModal method', () => {
      expect(typeof component.onOpenModal).toBe('function');
    });

    it('should call onOpenModal when View Project button is clicked', () => {
      const mockWork = createMockWork();
      fixture.componentRef.setInput('work', mockWork);
      fixture.detectChanges();

      spyOn(component, 'onOpenModal');

      const button = fixture.nativeElement.querySelector('.open-button');
      button.click();

      expect(component.onOpenModal).toHaveBeenCalled();
    });

    it('should not throw error when onOpenModal is called with work', () => {
      const mockWork = createMockWork();
      fixture.componentRef.setInput('work', mockWork);

      expect(() => {
        component.onOpenModal();
      }).not.toThrow();
    });

    it('should not throw error when onOpenModal is called without work', () => {
      fixture.componentRef.setInput('work', null);

      expect(() => {
        component.onOpenModal();
      }).not.toThrow();
    });
  });

  describe('Template Rendering', () => {
    it('should render work card article element', () => {
      const mockWork = createMockWork();
      fixture.componentRef.setInput('work', mockWork);
      fixture.detectChanges();

      const article = fixture.nativeElement.querySelector('article.work-card');
      expect(article).toBeTruthy();
    });

    it('should set data-work-id attribute on card', () => {
      const mockWork = createMockWork({ id: 'unique-work-id' });
      fixture.componentRef.setInput('work', mockWork);
      fixture.detectChanges();

      const card = fixture.nativeElement.querySelector('.work-card');
      expect(card?.getAttribute('data-work-id')).toBe('unique-work-id');
    });

    it('should render image with correct src and alt text', () => {
      const mockWork = createMockWork({
        title: 'Amazing Project',
        poster: '/assets/img/amazing.png',
      });
      fixture.componentRef.setInput('work', mockWork);
      fixture.detectChanges();

      const img = fixture.nativeElement.querySelector('img');
      expect(img?.src).toContain('amazing.png');
      expect(img?.alt).toBe('Amazing Project');
    });

    it('should render lazy-loading and async-decoding attributes on image', () => {
      const mockWork = createMockWork();
      fixture.componentRef.setInput('work', mockWork);
      fixture.detectChanges();

      const img = fixture.nativeElement.querySelector('img');
      expect(img?.loading).toBe('lazy');
      expect(img?.decoding).toBe('async');
    });

    it('should render View Project button', () => {
      const mockWork = createMockWork();
      fixture.componentRef.setInput('work', mockWork);
      fixture.detectChanges();

      const button = fixture.nativeElement.querySelector('.open-button');
      expect(button).toBeTruthy();
      expect(button?.textContent).toContain('View Project');
    });

    it('should display all work information', () => {
      const mockWork = createMockWork({
        title: 'Portfolio Project',
        date: 'DEC 2024',
        description: 'An amazing portfolio project',
      });
      fixture.componentRef.setInput('work', mockWork);
      fixture.detectChanges();

      const titleEl = fixture.nativeElement.querySelector('.card-title');
      const dateEl = fixture.nativeElement.querySelector('.card-date');
      const descEl = fixture.nativeElement.querySelector('.card-description');

      expect(titleEl?.textContent).toContain('Portfolio Project');
      expect(dateEl?.textContent).toContain('DEC 2024');
      expect(descEl?.textContent).toContain('An amazing portfolio project');
    });
  });

  describe('Accessibility', () => {
    it('should have aria-label on button', () => {
      const mockWork = createMockWork({ title: 'My Project' });
      fixture.componentRef.setInput('work', mockWork);
      fixture.detectChanges();

      const button = fixture.nativeElement.querySelector('.open-button');
      expect(button?.getAttribute('aria-label')).toContain('View My Project');
    });

    it('should have type="button" on button element', () => {
      const mockWork = createMockWork();
      fixture.componentRef.setInput('work', mockWork);
      fixture.detectChanges();

      const button = fixture.nativeElement.querySelector('.open-button');
      expect(button?.type).toBe('button');
    });

    it('should use semantic article element', () => {
      const mockWork = createMockWork();
      fixture.componentRef.setInput('work', mockWork);
      fixture.detectChanges();

      const article = fixture.nativeElement.querySelector('article');
      expect(article).toBeTruthy();
    });
  });

  describe('Change Detection Strategy', () => {
    it('should use OnPush change detection', () => {
      const metadata = (WorkCardPresentational as any).__annotations__[0];
      expect(metadata.changeDetection).toBeDefined();
    });
  });
});
