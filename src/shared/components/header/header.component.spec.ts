/**
 * Header Component Tests (RED - Phase 2)
 * Failing tests that define expected behavior
 */

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeaderComponent } from './header.component';
import { NavItem, SocialLink } from '../../models';

describe('HeaderComponent (RED)', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HeaderComponent],
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
      expect(component.brandName).toBe('Cristian Rivera');
    });

    it('should initialize with empty nav items', () => {
      expect(Array.isArray(component.navItems)).toBe(true);
    });

    it('should initialize with empty social links', () => {
      expect(Array.isArray(component.socialLinks)).toBe(true);
    });

    it('should initialize isScrolled as false', () => {
      expect(component.isScrolled).toBe(false);
    });
  });

  describe('@Input() bindings', () => {
    const mockNavItems: NavItem[] = [
      { id: 'home', label: 'Home', section: 'home' },
      { id: 'about', label: 'About', section: 'about' },
    ];

    const mockSocialLinks: SocialLink[] = [
      { id: 'github', label: 'GitHub', url: 'https://github.com/krisyupher', icon: 'github' },
    ];

    it('should accept navItems input', () => {
      component.navItems = mockNavItems;
      expect(component.navItems.length).toBe(2);
    });

    it('should accept socialLinks input', () => {
      component.socialLinks = mockSocialLinks;
      expect(component.socialLinks.length).toBe(1);
    });

    it('should accept brandName input', () => {
      component.brandName = 'Test Portfolio';
      expect(component.brandName).toBe('Test Portfolio');
    });

    it('should accept isScrolled input', () => {
      component.isScrolled = true;
      expect(component.isScrolled).toBe(true);
    });
  });

  describe('@Output() events', () => {
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
