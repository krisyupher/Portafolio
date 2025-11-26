import { createMockWork, createMockWorks } from './mock-data.factory';
import { Work } from '../../core/models/work.model';

describe('Mock Data Factory', () => {
  describe('createMockWork', () => {
    it('should create a valid work object with default values', () => {
      const work = createMockWork();

      expect(work).toBeDefined();
      expect(work.id).toBe('test-work-1');
      expect(work.title).toBe('Test Work Title');
      expect(work.poster).toBe('/assets/img/test-image.png');
      expect(work.description).toBeTruthy();
      expect(work.linkView).toBe('https://example.com');
      expect(work.date).toBe('JAN 2024');
      expect(work.Link).toBe('https://github.com/example/test-repo');
    });

    it('should create a work object with all required properties', () => {
      const work = createMockWork();
      const requiredProps: Array<keyof Work> = [
        'id',
        'title',
        'poster',
        'description',
        'linkView',
        'date',
        'Link'
      ];

      requiredProps.forEach(prop => {
        expect(work[prop]).toBeDefined();
        expect(work[prop]).not.toBe('');
      });
    });

    it('should override default values with provided overrides', () => {
      const customTitle = 'Custom Work Title';
      const customId = 'custom-id-123';

      const work = createMockWork({
        title: customTitle,
        id: customId
      });

      expect(work.title).toBe(customTitle);
      expect(work.id).toBe(customId);
      // Other properties should remain default
      expect(work.poster).toBe('/assets/img/test-image.png');
    });

    it('should allow partial overrides', () => {
      const work = createMockWork({
        description: 'Custom description only'
      });

      expect(work.description).toBe('Custom description only');
      expect(work.id).toBe('test-work-1'); // Default value preserved
      expect(work.title).toBe('Test Work Title'); // Default value preserved
    });

    it('should allow override of all properties', () => {
      const customWork: Work = {
        id: 'custom-1',
        title: 'Custom Title',
        poster: '/custom/poster.png',
        description: 'Custom description',
        linkView: 'https://custom.com',
        date: 'DEC 2023',
        Link: 'https://custom.link'
      };

      const work = createMockWork(customWork);

      expect(work).toEqual(customWork);
    });
  });

  describe('createMockWorks', () => {
    it('should create an array of works with default count of 3', () => {
      const works = createMockWorks();

      expect(works).toBeDefined();
      expect(Array.isArray(works)).toBe(true);
      expect(works.length).toBe(3);
    });

    it('should create specified number of works', () => {
      const count = 5;
      const works = createMockWorks(count);

      expect(works.length).toBe(count);
    });

    it('should create works with unique IDs', () => {
      const works = createMockWorks(5);
      const ids = works.map(w => w.id);
      const uniqueIds = new Set(ids);

      expect(uniqueIds.size).toBe(5);
      expect(ids).toEqual(['work-1', 'work-2', 'work-3', 'work-4', 'work-5']);
    });

    it('should create works with unique titles', () => {
      const works = createMockWorks(5);
      const titles = works.map(w => w.title);

      expect(titles).toEqual([
        'Work 1',
        'Work 2',
        'Work 3',
        'Work 4',
        'Work 5'
      ]);
    });

    it('should create works with all required properties', () => {
      const works = createMockWorks(3);

      works.forEach(work => {
        expect(work.id).toBeTruthy();
        expect(work.title).toBeTruthy();
        expect(work.poster).toBeTruthy();
        expect(work.description).toBeTruthy();
        expect(work.linkView).toBeTruthy();
        expect(work.date).toBeTruthy();
        expect(work.Link).toBeTruthy();
      });
    });

    it('should handle count of 0', () => {
      const works = createMockWorks(0);

      expect(works.length).toBe(0);
      expect(Array.isArray(works)).toBe(true);
    });

    it('should handle count of 1', () => {
      const works = createMockWorks(1);

      expect(works.length).toBe(1);
      expect(works[0].id).toBe('work-1');
      expect(works[0].title).toBe('Work 1');
    });

    it('should create valid Work objects', () => {
      const works = createMockWorks(2);

      works.forEach(work => {
        expect(typeof work.id).toBe('string');
        expect(typeof work.title).toBe('string');
        expect(typeof work.poster).toBe('string');
        expect(typeof work.description).toBe('string');
        expect(typeof work.linkView).toBe('string');
        expect(typeof work.date).toBe('string');
        expect(typeof work.Link).toBe('string');
      });
    });
  });
});
