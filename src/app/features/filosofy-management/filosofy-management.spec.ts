/**
 * Filosofy Management Component Tests
 */

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FilosofyManagementComponent } from './filosofy-management';
import { FilosofyService } from './services/filosofy.service';

describe('FilosofyManagementComponent', () => {
  let component: FilosofyManagementComponent;
  let fixture: ComponentFixture<FilosofyManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FilosofyManagementComponent],
      providers: [FilosofyService],
    }).compileComponents();

    fixture = TestBed.createComponent(FilosofyManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have architecture as initial active section', () => {
    expect(component.activeSectionId()).toBe('architecture');
  });

  it('should load sections from service', () => {
    const sections = component.sections();
    expect(sections.length).toBeGreaterThan(0);
  });

  it('should change active section when selectSection is called', () => {
    component.selectSection('tdd');
    expect(component.activeSectionId()).toBe('tdd');
  });

  it('should return the correct active section', () => {
    component.selectSection('signals');
    const activeSection = component.getActiveSection();
    expect(activeSection?.id).toBe('signals');
  });

  it('should have all major sections', () => {
    const sections = component.sections();
    const ids = sections.map((s) => s.id);

    expect(ids).toContain('architecture');
    expect(ids).toContain('signals');
    expect(ids).toContain('tdd');
    expect(ids).toContain('eslint-prettier');
    expect(ids).toContain('git-workflow');
    expect(ids).toContain('tools');
  });
});
