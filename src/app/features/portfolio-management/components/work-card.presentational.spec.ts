/**
 * Work Card Presentational Component Tests (RED - Phase 2)
 * Failing tests that define expected behavior
 */

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { WorkCardPresentational } from './work-card.presentational';
import { Work } from '../models';

describe('WorkCardPresentational (RED)', () => {
  let component: WorkCardPresentational;
  let fixture: ComponentFixture<WorkCardPresentational>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WorkCardPresentational],
    }).compileComponents();

    fixture = TestBed.createComponent(WorkCardPresentational);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('Component Initialization', () => {
    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('should initialize with null work', () => {
      expect(component.work).toBeNull();
    });
  });

  describe('@Input() binding', () => {
    const mockWork: Work = {
      id: 'test-work',
      title: 'Test Work',
      poster: 'test.png',
      description: 'Test description',
      linkView: 'http://test.com',
      date: 'JAN 2024',
      Link: 'http://github.com/test',
    };

    it('should accept work input', () => {
      component.work = mockWork;
      expect(component.work).toEqual(mockWork);
    });

    it('should update when work input changes', () => {
      component.work = mockWork;
      fixture.detectChanges();
      expect(component.work?.id).toBe('test-work');
    });

    it('should handle null work', () => {
      component.work = null;
      fixture.detectChanges();
      expect(component.work).toBeNull();
    });

    it('should have work property with correct type', () => {
      expect(component.work === null || typeof component.work === 'object').toBe(true);
    });
  });

  describe('@Output() events', () => {
    it('should have openModal output', () => {
      expect(component.openModal).toBeDefined();
    });

    it('should emit openModal event with work', (done) => {
      const mockWork: Work = {
        id: 'test',
        title: 'Test',
        poster: 'test.png',
        description: 'Test',
        linkView: 'http://test.com',
        date: 'JAN 2024',
        Link: 'http://github.com/test',
      };

      component.work = mockWork;
      component.openModal.subscribe((emittedWork: Work) => {
        expect(emittedWork).toEqual(mockWork);
        done();
      });

      component.onOpenModal();
    });

    it('should not emit event when work is null', (done) => {
      component.work = null;
      let emitted = false;

      component.openModal.subscribe(() => {
        emitted = true;
      });

      component.onOpenModal();

      setTimeout(() => {
        expect(emitted).toBe(false);
        done();
      }, 100);
    });
  });

  describe('User Interaction', () => {
    it('should have onOpenModal method', () => {
      expect(typeof component.onOpenModal).toBe('function');
    });

    it('should handle modal open click', () => {
      const mockWork: Work = {
        id: 'test',
        title: 'Test',
        poster: 'test.png',
        description: 'Test',
        linkView: 'http://test.com',
        date: 'JAN 2024',
        Link: 'http://github.com/test',
      };

      component.work = mockWork;
      expect(() => {
        component.onOpenModal();
      }).not.toThrow();
    });
  });

  describe('Data Display', () => {
    it('should display work title when available', () => {
      const mockWork: Work = {
        id: 'test',
        title: 'My Awesome Project',
        poster: 'test.png',
        description: 'Test',
        linkView: 'http://test.com',
        date: 'JAN 2024',
        Link: 'http://github.com/test',
      };

      component.work = mockWork;
      fixture.detectChanges();

      // Template rendering tests would go here in Phase 3
      expect(component.work?.title).toBe('My Awesome Project');
    });

    it('should display work date when available', () => {
      const mockWork: Work = {
        id: 'test',
        title: 'Project',
        poster: 'test.png',
        description: 'Test',
        linkView: 'http://test.com',
        date: 'MAR 2024',
        Link: 'http://github.com/test',
      };

      component.work = mockWork;
      fixture.detectChanges();
      expect(component.work?.date).toBe('MAR 2024');
    });

    it('should have access to work poster image path', () => {
      const mockWork: Work = {
        id: 'test',
        title: 'Project',
        poster: '../assets/img/test.png',
        description: 'Test',
        linkView: 'http://test.com',
        date: 'JAN 2024',
        Link: 'http://github.com/test',
      };

      component.work = mockWork;
      expect(component.work?.poster).toContain('test.png');
    });
  });

  describe('Template Rendering (Phase 3)', () => {
    it('should have template defined', () => {
      const compiled = fixture.nativeElement;
      expect(compiled).toBeTruthy();
    });
  });
});
