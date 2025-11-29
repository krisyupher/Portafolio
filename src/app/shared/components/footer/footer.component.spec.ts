/**
 * Footer Component Tests (RED - Phase 2)
 * Failing tests that define expected behavior
 */

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FooterComponent } from './footer.component';

describe('FooterComponent (RED)', () => {
  let component: FooterComponent;
  let fixture: ComponentFixture<FooterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FooterComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('Component Initialization', () => {
    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('should initialize with empty social links', () => {
      expect(Array.isArray(component.socialLinks())).toBe(true);
    });

    it('should initialize with empty quick links', () => {
      expect(Array.isArray(component.quickLinks())).toBe(true);
    });

    it('should initialize with default contact email', () => {
      expect(typeof component.contactEmail()).toBe('string');
    });

    it('should initialize with empty technologies', () => {
      expect(Array.isArray(component.technologies())).toBe(true);
    });

    it('should initialize with current copyright year', () => {
      expect(component.copyrightYear()).toBe(new Date().getFullYear());
    });
  });

  describe('input() signals', () => {
    it('should have socialLinks input signal', () => {
      expect(Array.isArray(component.socialLinks())).toBe(true);
    });

    it('should have quickLinks input signal', () => {
      expect(Array.isArray(component.quickLinks())).toBe(true);
    });

    it('should have contactEmail input signal', () => {
      expect(typeof component.contactEmail()).toBe('string');
    });

    it('should have technologies input signal', () => {
      expect(Array.isArray(component.technologies())).toBe(true);
    });

    it('should have copyrightYear input signal', () => {
      expect(typeof component.copyrightYear()).toBe('number');
    });
  });

  describe('output() signals', () => {
    it('should have linkClicked output', () => {
      expect(component.linkClicked).toBeDefined();
    });

    it('should emit linkClicked event', (done) => {
      component.linkClicked.subscribe((linkId: string) => {
        expect(linkId).toBe('test-link');
        done();
      });

      component.onLinkClick('test-link');
    });
  });

  describe('User Interaction', () => {
    it('should have onLinkClick method', () => {
      expect(typeof component.onLinkClick).toBe('function');
    });

    it('should handle link click', () => {
      expect(() => {
        component.onLinkClick('test-id');
      }).not.toThrow();
    });
  });

  describe('Signal values', () => {
    it('should have default empty technologies', () => {
      expect(Array.isArray(component.technologies())).toBe(true);
      expect(component.technologies().length).toBe(0);
    });

    it('should have default empty social links', () => {
      expect(Array.isArray(component.socialLinks())).toBe(true);
      expect(component.socialLinks().length).toBe(0);
    });

    it('should have default empty quick links', () => {
      expect(Array.isArray(component.quickLinks())).toBe(true);
      expect(component.quickLinks().length).toBe(0);
    });

    it('should have default copyright year as current year', () => {
      expect(component.copyrightYear()).toBe(new Date().getFullYear());
    });

    it('should have default contact email', () => {
      expect(component.contactEmail()).toBe('contact@example.com');
    });
  });
});
