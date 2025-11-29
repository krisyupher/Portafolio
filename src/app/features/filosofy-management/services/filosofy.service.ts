/**
 * Filosofy Service
 *
 * Manages the filosofy feature data and state.
 * Provides access to architecture, workflow, and development philosophy information.
 */

import { Injectable } from '@angular/core';
import { signal } from '@angular/core';
import { Section } from '../models';

@Injectable({
  providedIn: 'root',
})
export class FilosofyService {
  private sectionsSignal = signal<Section[]>([
    {
      id: 'architecture',
      title: 'Angular Project Architecture',
      subsections: [
        {
          title: 'Directory Structure',
          description: 'Clear and scalable organization based on Scope Rule Pattern',
          example: `src/
├── app/
│   ├── features/
│   │   ├── [feature-name]/
│   │   │   ├── [feature-name].ts    # Smart container component
│   │   │   ├── components/          # Feature-specific presentational components
│   │   │   │   ├── [component-name].ts
│   │   │   │   └── [component-name].spec.ts
│   │   │   ├── services/            # Feature-specific services
│   │   │   │   ├── [service-name].ts
│   │   │   │   └── [service-name].spec.ts
│   │   │   ├── guards/              # Feature-specific route guards
│   │   │   ├── signals/             # Feature signals and computed state
│   │   │   ├── models/              # Feature-specific interfaces and types
│   │   │   └── index.ts             # Feature public API
│   │   │
│   │   └── shared/                  # Shared across 2+ features
│   │       ├── components/          # Shared standalone components
│   │       ├── services/            # Shared services
│   │       ├── guards/              # Shared route guards
│   │       ├── pipes/               # Custom pipes
│   │       ├── directives/          # Custom directives
│   │       └── signals/             # Global signal stores
│   │
│   ├── core/                        # Singleton services and app-wide concerns
│   │   ├── services/
│   │   │   ├── auth.ts
│   │   │   ├── api.ts
│   │   │   └── index.ts
│   │   ├── interceptors/
│   │   └── guards/
│   │
│   ├── main.ts                      # Application bootstrap
│   ├── app.config.ts                # Global app configuration
│   ├── app.ts                       # Root standalone component
│   └── routes.ts                    # Central route configuration
│
├── assets/
│   ├── data/                        # JSON data files
│   ├── img/                         # Static images
│   └── styles/
│
└── styles.scss                      # Global styles`,
        },
        {
          title: 'Core Principles',
          items: [
            'Scope Rule Pattern: Global code (core/shared) vs local (features)',
            'Standalone Components: No NgModules, composition-based',
            'Smart/Dumb Pattern: Intelligent containers, dumb presentationals',
            'Single Responsibility: Each component/service has one responsibility',
            'Co-location: Related code placed together in the same folder',
          ],
        },
      ],
    },
    {
      id: 'signals',
      title: 'Angular Signals and State Management',
      subsections: [
        {
          title: 'Fundamental Concepts',
          items: [
            'signal(): Creates a primitive reactive state',
            'computed(): Derived values that auto-recalculate',
            'effect(): Executes logic when signals change',
            'LinkedSignal: Bidirectional state synchronization',
          ],
        },
        {
          title: 'Signal Pattern in Services',
          example: `export const filosofyStore = () => {
  const sections = signal<Section[]>([]);
  const isLoading = signal(false);
  const error = signal<string | null>(null);

  const setSections = (data: Section[]) => sections.set(data);
  const loadSections = async () => {
    isLoading.set(true);
    try {
      // Load data
      sections.set(data);
    } catch (err) {
      error.set((err as Error).message);
    } finally {
      isLoading.set(false);
    }
  };

  return {
    sections: sections.asReadonly(),
    isLoading: isLoading.asReadonly(),
    error: error.asReadonly(),
    loadSections,
  };
};`,
        },
        {
          title: 'Advantages over RxJS/BehaviorSubject',
          items: [
            'Less boilerplate and simpler syntax',
            'Better performance with OnPush change detection',
            'Synchronous execution, easier to debug',
            'Native compatibility with Angular 18+',
            'Fewer external dependencies',
          ],
        },
      ],
    },
    {
      id: 'tdd',
      title: 'Test-Driven Development (TDD)',
      subsections: [
        {
          title: 'Red-Green-Refactor Cycle',
          items: [
            'Red: Write a failing test',
            'Green: Write minimal code to pass',
            'Refactor: Improve code while keeping tests passing',
          ],
        },
        {
          title: 'Test Coverage Targets',
          items: [
            'Services: 90%+ coverage required',
            'Components: 85%+ coverage',
            'Utility functions: 100% coverage',
            'Route guards: 90%+ coverage',
          ],
        },
        {
          title: 'Test Structure',
          example: `describe('FilosofyService', () => {
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

  it('should load sections on initialization', fakeAsync(() => {
    service.loadSections();
    tick();
    expect(service.sections().length).toBeGreaterThan(0);
  }));

  it('should handle errors gracefully', fakeAsync(() => {
    spyOn(httpClient, 'get').and.returnValue(
      throwError(() => new Error('Network error'))
    );
    service.loadSections();
    tick();
    expect(service.error()).toBe('Network error');
  }));
});`,
        },
      ],
    },
    {
      id: 'eslint-prettier',
      title: 'ESLint and Prettier',
      subsections: [
        {
          title: 'ESLint - Linting and Static Analysis',
          items: [
            'Detects potential errors and anti-patterns',
            'Enforces consistent code style',
            'Prevents dead code and unused variables',
            'Automatic integration in pre-commit hooks',
          ],
        },
        {
          title: 'Prettier - Code Formatter',
          items: [
            'Automatic formatting on save (if configured)',
            'Eliminates debates about code style',
            'ESLint integration for maximum consistency',
            'Predictable and reproducible results',
          ],
        },
        {
          title: 'Recommended Angular Configuration',
          example: `// .eslintrc.json
{
  "extends": ["eslint:recommended", "plugin:@angular-eslint/recommended"],
  "rules": {
    "no-console": "warn",
    "no-unused-vars": "error",
    "@angular-eslint/no-empty-lifecycle-method": "error",
    "@angular-eslint/use-lifecycle-interface": "error"
  }
}

// .prettierrc
{
  "printWidth": 100,
  "tabWidth": 2,
  "useTabs": false,
  "semi": true,
  "singleQuote": true,
  "trailingComma": "es5",
  "bracketSpacing": true

}`,
        },
      ],
    },
    {
      id: 'git-workflow',
      title: 'Git Workflow and Conventional Commits',
      subsections: [
        {
          title: 'Commit Structure',
          example: `<type>(<scope>): <subject>

<body>

<footer>

Examples:
- feat(signals): add computed signals for filter state
- fix(router): prevent memory leak in route guards
- docs(README): update installation instructions
- style(scss): format component styles
- refactor(service): simplify HTTP error handling
- perf(change-detection): implement OnPush strategy
- test(component): add unit tests for modal
- chore(deps): update Angular to 20.2.0`,
        },
        {
          title: 'Commit Types',
          items: [
            'feat: New functionality',
            'fix: Bug fixes',
            'docs: Documentation changes',
            'style: Formatting changes (no logic impact)',
            'refactor: Code restructuring',
            'perf: Performance improvements',
            'test: Tests or testing improvements',
            'chore: Build, deps, config changes',
          ],
        },
        {
          title: 'Branch Naming Convention',
          items: [
            'feat/feature-name - For new features',
            'fix/bug-name - For bug fixes',
            'docs/doc-name - For documentation',
            'refactor/component-name - For refactoring',
          ],
        },
      ],
    },
    {
      id: 'tools',
      title: 'Development Tools',
      subsections: [
        {
          title: 'Testing - Jasmine/Karma',
          items: [
            'npm test: Run tests in watch mode',
            'npm test -- --no-watch: Run tests once',
            'npm test -- --code-coverage: Coverage report',
            'npm test -- --include="**/filename.spec.ts": Specific file',
          ],
        },
        {
          title: 'Development Commands',
          items: [
            'npm start: Development server (http://localhost:4200)',
            'npm run watch: Incremental build without serving',
            'npm run build: Production build',
            'ng generate component [name]: Generate new components',
          ],
        },
        {
          title: 'Security & Quality Tools',
          items: [
            'npm run lint: Run ESLint',
            'npm run lint -- --fix: Auto-fix issues',
            'npm run prettier: Format code',
            'npm run prettier -- --write: Write changes',
          ],
        },
      ],
    },
    {
      id: 'best-practices',
      title: 'Angular 20 Best Practices',
      subsections: [
        {
          title: 'Performance',
          items: [
            'OnPush Change Detection: On all components',
            'TrackBy in *ngFor: For large lists',
            'Lazy Loading Routes: Load code on demand',
            'Unsubscribe in ngOnDestroy: Prevent memory leaks',
          ],
        },
        {
          title: 'Code Organization',
          items: [
            'One Component Per File: One component per file',
            'Public API (index.ts): Export only what\'s needed',
            'Avoid Forward References: Keep dependencies clear',
            'Keep Components Focused: SRP on components',
          ],
        },
        {
          title: 'Type Safety',
          items: [
            'Strict Mode Enabled: Catch errors at compile time',
            'Avoid any: Use specific types always',
            'Null Coalescing (??): For default values',
            'Type Guards: Dynamically validate types',
          ],
        },
      ],
    },
  ]);

  readonly sections = this.sectionsSignal.asReadonly();

  getSectionById(id: string): Section | undefined {
    return this.sections().find((s) => s.id === id);
  }
}
