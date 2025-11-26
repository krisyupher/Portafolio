import { Work } from '../../core/models/work.model';

/**
 * Creates a mock Work object for testing purposes
 *
 * @param overrides - Partial Work object to override default values
 * @returns A complete Work object with test data
 *
 * @example
 * const work = createMockWork({ title: 'Custom Title' });
 */
export function createMockWork(overrides?: Partial<Work>): Work {
  return {
    id: 'test-work-1',
    title: 'Test Work Title',
    poster: '/assets/img/test-image.png',
    description: 'This is a test description for a portfolio work item.',
    linkView: 'https://example.com',
    date: 'JAN 2024',
    Link: 'https://github.com/example/test-repo',
    ...overrides
  };
}

/**
 * Creates an array of mock Work objects for testing
 *
 * @param count - Number of mock Work objects to create
 * @returns An array of Work objects with unique IDs and titles
 *
 * @example
 * const works = createMockWorks(5);
 */
export function createMockWorks(count: number = 3): Work[] {
  return Array.from({ length: count }, (_, index) =>
    createMockWork({
      id: `work-${index + 1}`,
      title: `Work ${index + 1}`,
      date: `${['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN'][index % 6]} 202${Math.floor(index / 6)}`
    })
  );
}
