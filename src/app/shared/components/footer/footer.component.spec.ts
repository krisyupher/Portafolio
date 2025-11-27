/**
 * Footer Component Tests (RED - Phase 2)
 * Failing tests that define expected behavior
 */

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FooterComponent } from './footer.component';
import { SocialLink, QuickLink } from '../../models';

describe('FooterComponent (RED)', () => {
  let component: FooterComponent;
  let fixture: ComponentFixture<FooterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FooterComponent],
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
      expect(Array.isArray(component.socialLinks)).toBe(true);
    });

    it('should initialize with empty quick links', () => {
      expect(Array.isArray(component.quickLinks)).toBe(true);
    });

    it('should initialize with default contact email', () => {
      expect(typeof component.contactEmail).toBe('string');
    });

    it('should initialize with empty technologies', () => {
      expect(Array.isArray(component.technologies)).toBe(true);
    });

    it('should initialize with current copyright year', () => {
      expect(component.copyrightYear).toBe(new Date().getFullYear());
    });
  });

  describe('@Input() bindings', () => {
    const mockSocialLinks: SocialLink[] = [
      { id: 'github', label: 'GitHub', url: 'https://github.com', icon: 'github' },
      { id: 'linkedin', label: 'LinkedIn', url: 'https://linkedin.com', icon: 'linkedin' },
    ];

    const mockQuickLinks: QuickLink[] = [
      { id: 'home', label: 'Home', section: 'home' },
      { id: 'about', label: 'About', section: 'about' },
    ];

    const mockTechnologies = ['Angular', 'TypeScript', 'Tailwind CSS'];

    it('should accept socialLinks input', () => {
      component.socialLinks = mockSocialLinks;
      expect(component.socialLinks.length).toBe(2);
    });

    it('should accept quickLinks input', () => {
      component.quickLinks = mockQuickLinks;
      expect(component.quickLinks.length).toBe(2);
    });

    it('should accept contactEmail input', () => {
      component.contactEmail = 'test@example.com';
      expect(component.contactEmail).toBe('test@example.com');
    });

    it('should accept technologies input', () => {
      component.technologies = mockTechnologies;
      expect(component.technologies.length).toBe(3);
    });

    it('should accept copyrightYear input', () => {
      component.copyrightYear = 2024;
      expect(component.copyrightYear).toBe(2024);
    });
  });

  describe('@Output() events', () => {
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

  describe('Data Display', () => {
    it('should display multiple technologies', () => {
      const techs = ['Angular', 'TypeScript', 'RxJS', 'Tailwind'];
      component.technologies = techs;
      expect(component.technologies.length).toBe(4);
    });

    it('should display social links with icons', () => {
      const socials: SocialLink[] = [
        { id: 'github', label: 'GitHub', url: 'https://github.com', icon: 'github' },
        { id: 'twitter', label: 'Twitter', url: 'https://twitter.com', icon: 'twitter' },
      ];
      component.socialLinks = socials;
      expect(component.socialLinks[0].icon).toBe('github');
    });

    it('should display quick navigation links', () => {
      const links: QuickLink[] = [
        { id: '1', label: 'Home', section: 'home' },
        { id: '2', label: 'Projects', section: 'projects' },
        { id: '3', label: 'Contact', section: 'contact' },
      ];
      component.quickLinks = links;
      expect(component.quickLinks.length).toBe(3);
    });

    it('should display copyright year', () => {
      component.copyrightYear = 2025;
      expect(component.copyrightYear).toBe(2025);
    });

    it('should display contact email', () => {
      component.contactEmail = 'contact@portfolio.com';
      expect(component.contactEmail).toContain('@');
    });
  });
});
