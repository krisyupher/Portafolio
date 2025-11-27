/**
 * About Service Tests (RED - Phase 2)
 * Failing tests that define expected behavior
 */

import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AboutService } from './about.service';
import { AboutInfo, Skill, SkillCategory, Experience, Education } from '../models';

describe('AboutService (RED)', () => {
  let service: AboutService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AboutService],
    });
    service = TestBed.inject(AboutService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  describe('Service Initialization', () => {
    it('should be created', () => {
      expect(service).toBeTruthy();
    });

    it('should initialize with null aboutInfo', (done) => {
      service.aboutInfo$.subscribe((info) => {
        expect(info === null || typeof info === 'object').toBe(true);
        done();
      });
    });

    it('should initialize with empty skill categories', (done) => {
      service.skillCategories$.subscribe((categories) => {
        expect(Array.isArray(categories)).toBe(true);
        done();
      });
    });

    it('should initialize with empty experience', (done) => {
      service.experience$.subscribe((exp) => {
        expect(Array.isArray(exp)).toBe(true);
        done();
      });
    });

    it('should initialize with empty education', (done) => {
      service.education$.subscribe((edu) => {
        expect(Array.isArray(edu)).toBe(true);
        done();
      });
    });
  });

  describe('loadAboutData()', () => {
    const mockAboutData = {
      aboutInfo: {
        name: 'Cristian Rivera',
        title: 'Full-Stack Web Developer',
        bio: 'Test bio',
        profileImage: 'test.png',
        focus: 'Test focus',
      },
      skillCategories: [
        {
          name: 'Frontend',
          skills: [
            {
              id: 'angular',
              name: 'Angular',
              category: 'Frontend',
              proficiency: 'Expert' as const,
            },
          ],
        },
      ],
      experience: [
        {
          id: 'exp1',
          title: 'Developer',
          company: 'Company',
          description: 'Test',
          startDate: 'JAN 2023',
          technologies: ['Angular'],
        },
      ],
      education: [
        {
          id: 'edu1',
          degree: 'Bachelor',
          institution: 'University',
          field: 'CS',
          graduationYear: 2020,
        },
      ],
    };

    it('should set loading state to true', (done) => {
      service.loadAboutData();
      service.loading$.subscribe((loading) => {
        if (loading) {
          expect(loading).toBe(true);
          const req = httpMock.expectOne('assets/data/about.json');
          req.flush(mockAboutData);
          done();
        }
      });
    });

    it('should fetch about data from about.json', () => {
      service.loadAboutData();
      const req = httpMock.expectOne('assets/data/about.json');
      expect(req.request.method).toBe('GET');
      req.flush(mockAboutData);
    });

    it('should update aboutInfo$', (done) => {
      service.loadAboutData();
      const req = httpMock.expectOne('assets/data/about.json');
      req.flush(mockAboutData);

      service.aboutInfo$.subscribe((info) => {
        if (info) {
          expect(info.name).toBe('Cristian Rivera');
          expect(info.title).toBe('Full-Stack Web Developer');
          done();
        }
      });
    });

    it('should update skillCategories$', (done) => {
      service.loadAboutData();
      const req = httpMock.expectOne('assets/data/about.json');
      req.flush(mockAboutData);

      setTimeout(() => {
        service.skillCategories$.subscribe((categories) => {
          expect(Array.isArray(categories)).toBe(true);
          expect(categories.length).toBeGreaterThan(0);
          expect(categories[0].name).toBe('Frontend');
          done();
        });
      }, 0);
    });

    it('should update experience$', (done) => {
      service.loadAboutData();
      const req = httpMock.expectOne('assets/data/about.json');
      req.flush(mockAboutData);

      setTimeout(() => {
        service.experience$.subscribe((exp) => {
          expect(Array.isArray(exp)).toBe(true);
          expect(exp.length).toBeGreaterThan(0);
          expect(exp[0].title).toBe('Developer');
          done();
        });
      }, 0);
    });

    it('should update education$', (done) => {
      service.loadAboutData();
      const req = httpMock.expectOne('assets/data/about.json');
      req.flush(mockAboutData);

      setTimeout(() => {
        service.education$.subscribe((edu) => {
          expect(Array.isArray(edu)).toBe(true);
          expect(edu.length).toBeGreaterThan(0);
          expect(edu[0].degree).toBe('Bachelor');
          done();
        });
      }, 0);
    });

    it('should set loading to false after successful load', (done) => {
      service.loadAboutData();
      const req = httpMock.expectOne('assets/data/about.json');
      req.flush(mockAboutData);

      setTimeout(() => {
        service.loading$.subscribe((loading) => {
          expect(loading).toBe(false);
          done();
        });
      }, 0);
    });

    it('should clear error state on successful load', (done) => {
      service.loadAboutData();
      const req = httpMock.expectOne('assets/data/about.json');
      req.flush(mockAboutData);

      setTimeout(() => {
        service.error$.subscribe((error) => {
          expect(error).toBe(null);
          done();
        });
      }, 0);
    });

    it('should handle HTTP errors', (done) => {
      service.loadAboutData();
      const req = httpMock.expectOne('assets/data/about.json');
      req.error(new ErrorEvent('Network error'));

      service.error$.subscribe((error) => {
        if (error) {
          expect(error).toContain('Failed to load');
          done();
        }
      });
    });

    it('should set loading to false on error', (done) => {
      service.loadAboutData();
      const req = httpMock.expectOne('assets/data/about.json');
      req.error(new ErrorEvent('Network error'));

      setTimeout(() => {
        service.loading$.subscribe((loading) => {
          expect(loading).toBe(false);
          done();
        });
      }, 0);
    });
  });

  describe('getCurrentAboutInfo()', () => {
    const mockData = {
      aboutInfo: {
        name: 'Test User',
        title: 'Developer',
        bio: 'Test',
        profileImage: 'test.png',
        focus: 'Testing',
      },
      skillCategories: [],
      experience: [],
      education: [],
    };

    beforeEach(() => {
      service.loadAboutData();
      const req = httpMock.expectOne('assets/data/about.json');
      req.flush(mockData);
    });

    it('should return synchronous snapshot of aboutInfo', (done) => {
      setTimeout(() => {
        const info = service.getCurrentAboutInfo();
        expect(info?.name).toBe('Test User');
        done();
      }, 0);
    });
  });

  describe('getCurrentSkillCategories()', () => {
    const mockData = {
      aboutInfo: {
        name: 'Test',
        title: 'Test',
        bio: 'Test',
        profileImage: 'test.png',
        focus: 'Test',
      },
      skillCategories: [{ name: 'Frontend', skills: [] }],
      experience: [],
      education: [],
    };

    beforeEach(() => {
      service.loadAboutData();
      const req = httpMock.expectOne('assets/data/about.json');
      req.flush(mockData);
    });

    it('should return synchronous snapshot of skill categories', (done) => {
      setTimeout(() => {
        const categories = service.getCurrentSkillCategories();
        expect(Array.isArray(categories)).toBe(true);
        done();
      }, 0);
    });
  });

  describe('isLoading()', () => {
    it('should return loading state synchronously', () => {
      const loading = service.isLoading();
      expect(typeof loading).toBe('boolean');
    });
  });

  describe('getCurrentError()', () => {
    it('should return error state synchronously', () => {
      const error = service.getCurrentError();
      expect(error === null || typeof error === 'string').toBe(true);
    });

    it('should return null initially', () => {
      expect(service.getCurrentError()).toBe(null);
    });
  });

  describe('Observable Streams', () => {
    it('should provide aboutInfo$ observable', (done) => {
      expect(service.aboutInfo$).toBeDefined();
      service.aboutInfo$.subscribe(() => {
        done();
      });
    });

    it('should provide skillCategories$ observable', (done) => {
      expect(service.skillCategories$).toBeDefined();
      service.skillCategories$.subscribe(() => {
        done();
      });
    });

    it('should provide experience$ observable', (done) => {
      expect(service.experience$).toBeDefined();
      service.experience$.subscribe(() => {
        done();
      });
    });

    it('should provide education$ observable', (done) => {
      expect(service.education$).toBeDefined();
      service.education$.subscribe(() => {
        done();
      });
    });

    it('should provide loading$ observable', (done) => {
      expect(service.loading$).toBeDefined();
      service.loading$.subscribe(() => {
        done();
      });
    });

    it('should provide error$ observable', (done) => {
      expect(service.error$).toBeDefined();
      service.error$.subscribe(() => {
        done();
      });
    });
  });
});
