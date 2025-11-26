# Phase 3 Implementation Guide: Component Modernization

**Status**: Ready to Start
**Estimated Duration**: 2-3 weeks
**Estimated Effort**: 40-50 hours
**Current Foundation**: Angular 18.2.14, PortfolioService (93% coverage), TDD practices established

---

## Quick Start Checklist

Before starting Phase 3, complete these immediate security fixes:

### Immediate Security Fixes (30 minutes)

- [ ] **Fix 1: Add Content Security Policy**

  ```bash
  # Edit src/index.html, add after <base href="/">
  <meta http-equiv="Content-Security-Policy"
        content="default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data:; connect-src 'self'; frame-ancestors 'none'; base-uri 'self'; form-action 'self';">
  ```

- [ ] **Fix 2: Update HTTP to HTTPS**

  ```bash
  # Edit src/assets/data/works.json, line 16
  # Change: "http://consultaprovidencias.cortesuprema.gov.co/busqueda"
  # To: "https://consultaprovidencias.cortesuprema.gov.co/busqueda"
  ```

- [ ] **Fix 3: Update npm vulnerabilities**
  ```bash
  npm audit fix
  ```

---

## Phase 3: Component Modernization Roadmap

### Week 1: Refactor AppComponent to Container Pattern

**Day 1-2: Convert AppComponent to standalone + integrate service**

```bash
# 1. Backup current AppComponent
cp src/app/app.component.ts src/app/app.component.ts.backup

# 2. Review current implementation
# - Currently has hardcoded works array
# - Need to replace with PortfolioService subscription

# 3. Update AppComponent
```

**File**: `src/app/app.component.ts`

**From (Current):**

```typescript
import { Component } from '@angular/core';
import { AppModule } from './app.module';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'Portafolio';
  works = [
    /* 14 hardcoded items */
  ];
}
```

**To (Modern - Standalone):**

```typescript
import { Component, inject, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { Observable } from 'rxjs';
import { PortfolioService } from './core/services/portfolio.service';
import { Work } from './core/models/work.model';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit {
  private portfolioService = inject(PortfolioService);

  title = 'Portafolio';
  works$!: Observable<Work[]>;
  loading$!: Observable<boolean>;
  error$!: Observable<string | null>;

  ngOnInit(): void {
    this.works$ = this.portfolioService.works$;
    this.loading$ = this.portfolioService.loading$;
    this.error$ = this.portfolioService.error$;

    // Load works on init
    this.portfolioService.loadWorks();
  }
}
```

**Template**: `src/app/app.component.html` (needs update)

**From:**

```html
<div class="worksContainer">
  <div *ngFor="let work of works">
    <app-work-card [data]="work" (click)="..."></app-work-card>
  </div>
</div>
```

**To:**

```html
<div class="worksContainer">
  @if (loading$ | async) {
  <div class="loading">Loading portfolio...</div>
  } @else if (error$ | async as error) {
  <div class="error">{{ error }}</div>
  } @else { @for (work of works$ | async; track work.id) {
  <app-work-card [data]="work" (cardClicked)="onCardClick($event)"></app-work-card>
  } }
</div>
```

**Tests**: `src/app/app.component.spec.ts`

**New Test Suite:**

```typescript
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { PortfolioService } from './core/services/portfolio.service';
import { of } from 'rxjs';
import { createMockWorks } from './shared/testing/mock-data.factory';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let mockPortfolioService: jasmine.SpyObj<PortfolioService>;

  beforeEach(async () => {
    mockPortfolioService = jasmine.createSpyObj('PortfolioService', ['loadWorks'], {
      works$: of(createMockWorks(3)),
      loading$: of(false),
      error$: of(null),
    });

    await TestBed.configureTestingModule({
      imports: [AppComponent],
      providers: [{ provide: PortfolioService, useValue: mockPortfolioService }],
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load works on init', () => {
    expect(mockPortfolioService.loadWorks).toHaveBeenCalled();
  });

  it('should display works from service', (done) => {
    component.works$.subscribe((works) => {
      expect(works.length).toBe(3);
      done();
    });
  });

  it('should show loading state', (done) => {
    mockPortfolioService = jasmine.createSpyObj('PortfolioService', ['loadWorks'], {
      works$: of([]),
      loading$: of(true),
      error$: of(null),
    });

    component.loading$.subscribe((loading) => {
      expect(loading).toBe(true);
      done();
    });
  });

  it('should display error when present', (done) => {
    mockPortfolioService = jasmine.createSpyObj('PortfolioService', ['loadWorks'], {
      works$: of([]),
      loading$: of(false),
      error$: of('Failed to load'),
    });

    component.error$.subscribe((error) => {
      expect(error).toBe('Failed to load');
      done();
    });
  });

  it('should handle work selection', () => {
    const mockWork = createMockWorks(1)[0];
    spyOn(console, 'log'); // Replace with actual navigation in real impl

    component.onCardClick(mockWork.id);
    // Verify navigation or modal opening
  });
});
```

**TDD Red-Green-Refactor:**

1. **RED**: Write all tests above (all should fail)
2. **GREEN**: Implement minimum changes to pass tests
3. **REFACTOR**: Improve code while keeping tests green

**Success Criteria:**

- [ ] AppComponent is standalone
- [ ] PortfolioService integrated
- [ ] 80%+ test coverage on AppComponent
- [ ] All tests passing
- [ ] No hardcoded works array

---

### Day 3-4: Modernize WorkCardComponent

**Goal**: Convert from module to standalone, remove DOM manipulation intent

**Current Issues**:

- Still in old module system
- Has direct DOM manipulation logic (which we removed from its usage)
- Needs to follow presentational component pattern

**File**: `src/app/work-card/work-card.component.ts`

**Update to:**

```typescript
import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Work } from '../core/models/work.model';

@Component({
  selector: 'app-work-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './work-card.component.html',
  styleUrls: ['./work-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WorkCardComponent {
  @Input({ required: true }) data!: Work;
  @Output() cardClicked = new EventEmitter<string>();

  onCardClick(): void {
    this.cardClicked.emit(this.data.id);
  }
}
```

**Template**: `src/app/work-card/work-card.component.html`

**Update to:**

```html
<div
  class="work-card"
  (click)="onCardClick()"
  role="button"
  tabindex="0"
  (keydown.enter)="onCardClick()"
>
  <img [src]="data.poster" [alt]="data.title" class="work-card__image" />
  <div class="work-card__content">
    <h3 class="work-card__title">{{ data.title }}</h3>
    <p class="work-card__date">{{ data.date }}</p>
  </div>
</div>
```

**Tests**: `src/app/work-card/work-card.component.spec.ts`

```typescript
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { WorkCardComponent } from './work-card.component';
import { createMockWork } from '../shared/testing/mock-data.factory';

describe('WorkCardComponent (Modernized)', () => {
  let component: WorkCardComponent;
  let fixture: ComponentFixture<WorkCardComponent>;

  const mockWork = createMockWork({
    title: 'Test Portfolio Item',
    date: 'JAN 2024',
  });

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WorkCardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(WorkCardComponent);
    component = fixture.componentInstance;
    component.data = mockWork;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display work title', () => {
    const title = fixture.nativeElement.querySelector('.work-card__title');
    expect(title.textContent).toContain('Test Portfolio Item');
  });

  it('should display work date', () => {
    const date = fixture.nativeElement.querySelector('.work-card__date');
    expect(date.textContent).toContain('JAN 2024');
  });

  it('should emit cardClicked event with work ID', () => {
    spyOn(component.cardClicked, 'emit');

    component.onCardClick();

    expect(component.cardClicked.emit).toHaveBeenCalledWith(mockWork.id);
  });

  it('should emit on element click', () => {
    spyOn(component.cardClicked, 'emit');

    const cardElement = fixture.nativeElement.querySelector('.work-card');
    cardElement.click();

    expect(component.cardClicked.emit).toHaveBeenCalledWith(mockWork.id);
  });

  it('should emit on Enter key', () => {
    spyOn(component.cardClicked, 'emit');

    const cardElement = fixture.nativeElement.querySelector('.work-card');
    const event = new KeyboardEvent('keydown', { key: 'Enter' });
    cardElement.dispatchEvent(event);

    expect(component.cardClicked.emit).toHaveBeenCalledWith(mockWork.id);
  });

  it('should display work poster image', () => {
    const img = fixture.nativeElement.querySelector('img');
    expect(img.src).toContain('/test-image.png');
    expect(img.alt).toBe('Test Portfolio Item');
  });

  it('should have proper accessibility', () => {
    const card = fixture.nativeElement.querySelector('.work-card');
    expect(card.getAttribute('role')).toBe('button');
    expect(card.getAttribute('tabindex')).toBe('0');
  });

  it('should have OnPush change detection', () => {
    const metadata = (component.constructor as any).ɵcmp;
    expect(metadata.changeDetection).toBe(ChangeDetectionStrategy.OnPush);
  });
});
```

**Success Criteria:**

- [ ] WorkCardComponent is standalone
- [ ] Emits cardClicked event
- [ ] No DOM manipulation
- [ ] 90%+ test coverage
- [ ] Accessibility attributes (role, tabindex)

---

### Day 5: Modernize ModalComponent

Similar process to WorkCardComponent, but becomes a presentational component that displays work details.

**Key changes**:

- Remove DOM manipulation
- Accept @Input work and @Output closeRequested
- Use Angular state instead of classes

**File**: `src/app/modal/modal.component.ts` → Consider renaming to `src/app/components/work-detail/work-detail.component.ts`

---

### Week 2-3: Advanced Features & Testing

**Week 2 Tasks:**

- Complete all component modernization
- Implement routing for work detail pages
- Add Angular animations
- Integration testing (component + service)

**Week 3 Tasks:**

- E2E testing with Cypress
- Performance optimization
- Final security review
- Documentation updates

---

## Testing Strategy for Phase 3

### Red-Green-Refactor Pattern

For each component:

1. **RED Phase** (5 mins)
   - Write failing test
   - Run test and see failure
   - Read error message carefully

2. **GREEN Phase** (10 mins)
   - Write minimal code to pass
   - Run test and see success
   - Don't add extra features

3. **REFACTOR Phase** (10 mins)
   - Improve code quality
   - Run all tests to ensure nothing broke
   - Check for duplication

### Test Running Commands

```bash
# Run all tests
npm test

# Run tests in watch mode (auto-rerun on changes)
npm test -- --watch

# Run single test file
npm test -- --include='**/work-card.component.spec.ts' --no-watch

# Generate coverage report
npm test -- --no-watch --code-coverage

# View coverage in browser
start coverage/portafolio/index.html
```

### Expected Coverage Targets for Phase 3

| Component         | Target | Tracking                    |
| ----------------- | ------ | --------------------------- |
| AppComponent      | 80%+   | Track in coverage report    |
| WorkCardComponent | 90%+   | Track in coverage report    |
| ModalComponent    | 85%+   | Track in coverage report    |
| Overall           | 85%+   | Target for phase completion |

---

## Integration Points

### AppComponent ↔ PortfolioService ↔ WorkCardComponent

```
User clicks WorkCard
    ↓
WorkCardComponent emits: cardClicked.emit(workId)
    ↓
AppComponent receives: onCardClick(workId)
    ↓
AppComponent calls: PortfolioService.getWorkById(workId)
    ↓
PortfolioService returns: Observable<Work>
    ↓
AppComponent passes to ModalComponent: [work]="work$ | async"
    ↓
ModalComponent displays work details
    ↓
User clicks close
    ↓
ModalComponent emits: closeRequested.emit()
    ↓
AppComponent receives and closes modal
```

---

## Angular Patterns to Use

### 1. OnPush Change Detection

```typescript
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush
})
```

**Benefit**: 40% performance improvement

### 2. Async Pipe

```html
@for (work of works$ | async; track work.id) {
<app-work-card [work]="work" />
}
```

**Benefit**: Automatic subscription cleanup

### 3. TrackBy Function

```typescript
trackByWorkId(index: number, work: Work): string {
  return work.id;
}

// In template:
@for (work of works; track trackByWorkId($index, $item)) {
  <app-work-card [work]="work" />
}
```

**Benefit**: Prevents unnecessary re-rendering

### 4. Standalone Components

```typescript
@Component({
  standalone: true,
  imports: [CommonModule, RouterOutlet]
})
```

**Benefit**: Better tree-shaking, cleaner architecture

### 5. Dependency Injection

```typescript
private service = inject(PortfolioService);
```

**Benefit**: Modern, tree-shakeable alternative to constructor injection

---

## Common Pitfalls to Avoid

❌ **Don't**: Write implementation before tests
✅ **Do**: Write failing test first, then implement

❌ **Don't**: Create large container components
✅ **Do**: Keep containers focused, delegate to presentational

❌ **Don't**: Use BehaviorSubject in presentational components
✅ **Do**: Inject services only in containers

❌ **Don't**: Forget to unsubscribe from observables
✅ **Do**: Use async pipe or takeUntil pattern

❌ **Don't**: Test implementation details
✅ **Do**: Test behavior and outputs

❌ **Don't**: Add features beyond what's tested
✅ **Do**: Follow "if it's not tested, it doesn't exist"

---

## Success Criteria for Phase 3

### Code Quality

- [ ] All components are standalone
- [ ] No DOM manipulation (except templates)
- [ ] Container/Presentational pattern implemented
- [ ] OnPush change detection everywhere
- [ ] Zero TypeScript errors in strict mode

### Testing

- [ ] 85%+ overall test coverage
- [ ] All unit tests passing
- [ ] Integration tests written and passing
- [ ] E2E tests for critical flows
- [ ] No flaky tests

### Performance

- [ ] Lighthouse score > 90
- [ ] First Contentful Paint < 1.5s
- [ ] Time to Interactive < 3s
- [ ] Bundle size < 300 KB

### Security

- [ ] CSP headers configured
- [ ] HTTP security headers in place
- [ ] HTTPS enabled
- [ ] No console errors in production build

### Documentation

- [ ] CLAUDE.md updated
- [ ] Architecture documented
- [ ] Component responsibilities clear
- [ ] Testing strategy documented

---

## Getting Help During Phase 3

### Use the Angular MCP for:

- "How do I properly handle observables in Angular?"
- "What's the best way to test standalone components?"
- "How do I implement proper error handling with RxJS?"
- "What are Angular performance best practices?"

### Use angular-developer agent for:

- Complex component design questions
- TDD implementation guidance
- Testing strategy for specific scenarios
- Code review and refactoring advice

### Reference Documentation:

- [CLAUDE.md](CLAUDE.md) - Project overview and architecture
- [MODERNIZATION_WORKFLOW_SUMMARY.md](MODERNIZATION_WORKFLOW_SUMMARY.md) - Workflow completion details
- Angular documentation at https://angular.io
- RxJS patterns at https://rxjs.dev

---

## Commit Strategy for Phase 3

### Conventional Commits Format

```
feat(component): add standalone work-card component

- Convert to standalone
- Implement OnPush change detection
- Add cardClicked output event
- 90%+ test coverage

Closes #123
```

### Suggested Commits

1. `feat(app): integrate portfolio service into AppComponent`
2. `refactor(work-card): convert to standalone component`
3. `refactor(modal): convert to standalone and modernize`
4. `test(components): add comprehensive unit tests`
5. `test(integration): add component integration tests`
6. `feat(routing): implement work detail routes`
7. `feat(animations): add smooth transitions`
8. `perf: optimize change detection and rendering`

---

## Timeline Estimate

| Week      | Focus                     | Commits  | Hours     |
| --------- | ------------------------- | -------- | --------- |
| W1        | AppComponent + WorkCard   | 2-3      | 12-15     |
| W2        | Modal + Integration tests | 3-4      | 15-18     |
| W3        | E2E tests + Polish        | 2-3      | 10-12     |
| **Total** | **Full Phase 3**          | **7-10** | **40-50** |

---

## Questions? Start Here

1. **Review** MODERNIZATION_WORKFLOW_SUMMARY.md for context
2. **Read** CLAUDE.md for current architecture
3. **Check** src/app/core/services/portfolio.service.ts for patterns
4. **Study** src/app/shared/testing/mock-data.factory.ts for test patterns
5. **Look at** Existing test specs for examples

---

**Phase 3 is ready to start whenever you're ready!**

Good luck with the modernization! 🚀
