/**
 * Header Component Tests (RED - Phase 2)
 * Failing tests that define expected behavior
 */

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeaderComponent } from './header.component';
import { NavItem } from '../../models/navigation.model';

describe('HeaderComponent (RED)', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeaderComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('Component Initialization', () => {
    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('should have default brandName', () => {
      expect(component.brandName()).toBe('Cristian Florez');
    });

    it('should initialize with empty nav items', () => {
      expect(Array.isArray(component.navItems())).toBe(true);
    });

    it('should initialize with empty social links', () => {
      expect(Array.isArray(component.socialLinks())).toBe(true);
    });

    it('should initialize isScrolled as false', () => {
      expect(component.isScrolled()).toBe(false);
    });
  });

  describe('input() signals', () => {
    it('should have navItems input signal', () => {
      expect(Array.isArray(component.navItems())).toBe(true);
    });

    it('should have socialLinks input signal', () => {
      expect(Array.isArray(component.socialLinks())).toBe(true);
    });

    it('should have brandName input signal', () => {
      expect(typeof component.brandName()).toBe('string');
    });

    it('should have isScrolled input signal', () => {
      expect(typeof component.isScrolled()).toBe('boolean');
    });
  });

  describe('output() signals', () => {
    it('should have navItemClicked output', () => {
      expect(component.navItemClicked).toBeDefined();
    });

    it('should emit navItemClicked event', (done) => {
      const mockItem: NavItem = {
        id: 'test',
        label: 'Test',
        section: 'test',
      };

      component.navItemClicked.subscribe((item: NavItem) => {
        expect(item).toEqual(mockItem);
        done();
      });

      component.onNavItemClick(mockItem);
    });
  });

  describe('User Interaction', () => {
    it('should have onNavItemClick method', () => {
      expect(typeof component.onNavItemClick).toBe('function');
    });

    it('should handle nav item click', () => {
      const mockItem: NavItem = {
        id: 'home',
        label: 'Home',
        section: 'home',
      };

      expect(() => {
        component.onNavItemClick(mockItem);
      }).not.toThrow();
    });
  });
});
