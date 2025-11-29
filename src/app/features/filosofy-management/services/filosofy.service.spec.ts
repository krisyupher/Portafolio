/**
 * Filosofy Service Tests
 */

import { TestBed } from '@angular/core/testing';
import { FilosofyService } from './filosofy.service';

describe('FilosofyService', () => {
  let service: FilosofyService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FilosofyService],
    });
    service = TestBed.inject(FilosofyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should load sections on initialization', () => {
    const sections = service.sections();
    expect(sections.length).toBeGreaterThan(0);
  });

  it('should have architecture section', () => {
    const section = service.getSectionById('architecture');
    expect(section).toBeDefined();
    expect(section?.title).toBe('Arquitectura de Proyectos Angular');
  });

  it('should have signals section', () => {
    const section = service.getSectionById('signals');
    expect(section).toBeDefined();
  });

  it('should have TDD section', () => {
    const section = service.getSectionById('tdd');
    expect(section).toBeDefined();
  });

  it('should have ESLint and Prettier section', () => {
    const section = service.getSectionById('eslint-prettier');
    expect(section).toBeDefined();
  });

  it('should have git workflow section', () => {
    const section = service.getSectionById('git-workflow');
    expect(section).toBeDefined();
  });

  it('should have tools section', () => {
    const section = service.getSectionById('tools');
    expect(section).toBeDefined();
  });

  it('should return undefined for non-existent section', () => {
    const section = service.getSectionById('non-existent');
    expect(section).toBeUndefined();
  });

  it('should have subsections in architecture', () => {
    const section = service.getSectionById('architecture');
    expect(section?.subsections).toBeDefined();
    expect(section?.subsections?.length).toBeGreaterThan(0);
  });
});
