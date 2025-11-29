# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

A modern, responsive portfolio application showcasing 4+ years of Full-Stack development experience. Built with Angular 20+ using signals, standalone components, and the Scope Rule architecture pattern.

**Tech Stack:**

- Angular 20.2+ (standalone components, signals, OnPush change detection)
- TypeScript 5.4.5 (strict mode enabled)
- Tailwind CSS 3.x + SCSS
- RxJS for reactive patterns
- Angular Signals for state management
- Jasmine/Karma for testing (93%+ coverage on services)

**Status:** Phase 3+ modernization complete. All components converted to standalone with signal-based state. Feature-based architecture with container/presentational pattern implemented.

## Common Development Commands

**Development server:**

```bash
npm start
# Serves on http://localhost:4200/ with hot reload and automatic recompilation
```

**Build for production:**

```bash
npm run build
# Output stored in dist/portafolio/ with optimizations and bundle analysis
```

**Watch mode (incremental builds):**

```bash
npm run watch
# Useful for development without serving (watches and rebuilds on changes)
```

**Run unit tests:**

```bash
npm test
# Runs Karma test runner with Jasmine in watch mode
```

**Run tests once (no watch):**

```bash
npm test -- --no-watch
# Useful for CI/CD pipelines
```

**Run a single test file:**

```bash
npm test -- --include='**/filename.spec.ts' --no-watch
```

**Run tests with coverage report:**

```bash
npm test -- --no-watch --code-coverage
# Generates coverage reports in coverage/ directory
```

**Lint code:**

```bash
npm run lint
# Runs ESLint on all .ts and .html files
```

**Fix linting issues:**

```bash
npm run lint:fix
# Automatically fixes fixable ESLint issues
```

**Format code:**

```bash
npm run format
# Formats all files with Prettier
```

**Check code formatting (no changes):**

```bash
npm run format:check
# Verifies code matches Prettier formatting without making changes
```

**Generate new standalone component:**

```bash
ng generate component component-name
# Creates .ts, .html, and .scss files in proper feature directory structure
```

## Architecture

### Design Pattern: Scope Rule with Container/Presentational Components

The application follows the **Scope Rule architecture pattern** which clearly separates concerns:

- **GLOBAL Scope**: `core/` and `shared/` directories for singleton services, shared components, and global utilities
- **LOCAL Scope**: `features/` directory for feature-specific code (services, containers, presentational components)

This ensures clear boundaries and prevents accidental cross-feature dependencies.

### Project Structure

```
src/
├── app/
│   ├── app.ts                              # Root component (OnPush, signals)
│   ├── app.config.ts                       # Application configuration
│   ├── routes.ts                           # Routing configuration
│   │
│   ├── core/                               # GLOBAL - Singleton services
│   │   ├── services/
│   │   ├── interceptors/
│   │   └── guards/
│   │
│   ├── features/                           # Feature modules (LOCAL scope)
│   │   ├── portfolio-management/           # Portfolio feature
│   │   │   ├── portfolio-management.ts     # Container (smart component)
│   │   │   ├── components/
│   │   │   │   ├── work-list.presentational.ts       # Presentational
│   │   │   │   ├── work-card.presentational.ts       # Presentational
│   │   │   │   └── work-modal.presentational.ts      # Presentational
│   │   │   ├── services/
│   │   │   │   └── portfolio.service.ts              # Feature service
│   │   │   └── models.ts
│   │   │
│   │   ├── about-management/               # About feature
│   │   │   ├── about-management.ts         # Container
│   │   │   ├── components/                 # Presentational components
│   │   │   ├── services/
│   │   │   │   └── about.service.ts        # Feature service
│   │   │   └── models.ts
│   │   │
│   │   └── filosofy-management/            # Philosophy feature
│   │       ├── filosofy-management.ts      # Container
│   │       ├── components/                 # Presentational components
│   │       ├── services/
│   │       │   └── filosofy.service.ts     # Feature service
│   │       └── models.ts
│   │
│   └── shared/                             # GLOBAL - Shared resources
│       ├── components/                     # Header, Footer, etc.
│       └── models/                         # Shared interfaces
│
├── assets/
│   ├── data/
│   │   ├── works.json                      # Portfolio projects
│   │   └── about.json                      # Professional info
│   └── img/                                # Images
│
└── styles.scss                             # Global styles
```

### State Management: Angular Signals

All components use Angular Signals for reactive state management instead of RxJS observables:

```typescript
// In container components
private readonly _selectedWork = signal<Work | null>(null);
readonly selectedWork = this._selectedWork.asReadonly();

// In services
readonly works = signal<Work[]>([]);
readonly loading = signal(false);
readonly error = signal<string | null>(null);

// Computed signals for derived state
readonly hasWorks = computed(() => this.works().length > 0);
```

**Benefits:**
- Fine-grained reactivity - only affected views re-render
- Synchronous by nature - simpler than observables
- OnPush change detection compatible
- Better performance for large lists

### Service Layer

**PortfolioService** ([src/app/features/portfolio-management/services/portfolio.service.ts](src/app/features/portfolio-management/services/portfolio.service.ts)):

- Signal-based state management (modern Angular 20+ approach)
- Three public signals:
  - `works`: Signal<Work[]> - Portfolio items
  - `loading`: Signal<boolean> - Loading state
  - `error`: Signal<string | null> - Error messages
- Methods:
  - `initialize()`: Loads portfolio data from JSON file
  - `getWorkById(id: string)`: Returns specific work item
- 93.1% test coverage (34 passing tests)
- Comprehensive error handling and edge case coverage

**AboutService** ([src/app/features/about-management/services/about.service.ts](src/app/features/about-management/services/about.service.ts)):

- Manages professional information (skills, experience, education)
- Signal-based state with skills organized by categories
- Loaded from [src/assets/data/about.json](src/assets/data/about.json)

**FilosofyService** ([src/app/features/filosofy-management/services/filosofy.service.ts](src/app/features/filosofy-management/services/filosofy.service.ts)):

- Philosophy/values content management
- Signal-based state management

### Container vs Presentational Components

**Container Components** (Smart):
- Located at feature root (e.g., `portfolio-management.ts`)
- Handle business logic and state management
- Manage service interactions
- Use `ChangeDetectionStrategy.OnPush`
- Use signals for local state
- Pass data to presentational components via `@Input()`

**Presentational Components** (Dumb):
- Located in `components/` subdirectory with `.presentational.ts` suffix
- Receive data via `@Input()`
- Emit events via `@Output()`
- Use `ChangeDetectionStrategy.OnPush`
- No service dependencies
- Focused on UI rendering

Example:
```typescript
// Container
@Component({...})
export class PortfolioManagementComponent {
  readonly works = this.portfolioService.works;
  onSelectWork(work: Work): void { /* ... */ }
}

// Presentational
@Component({...})
export class WorkCardPresentational {
  @Input() work!: Work;
  @Output() selectWork = new EventEmitter<Work>();
}
```

### Data Models

**Work Interface** ([src/app/features/portfolio-management/models.ts](src/app/features/portfolio-management/models.ts)):

```typescript
interface Work {
  id: string; // Unique identifier
  title: string; // Display title
  poster: string; // Path to project image
  description: string; // Project description
  linkView: string; // External link to live project
  date: string; // Date in format "MMM YYYY"
  Link: string; // LinkedIn or GitHub link
}
```

**About Info** ([src/app/features/about-management/models.ts](src/app/features/about-management/models.ts)):

- Professional summary and bio
- Organized skill categories (Frontend, Backend, Database, DevOps, Testing, Methodologies)
- Work experience timeline with 3+ positions
- Education history with proficiency levels

**Portfolio Data** ([src/assets/data/works.json](src/assets/data/works.json)):

- 14+ portfolio projects in JSON format
- Loaded dynamically by PortfolioService on component initialization
- Structure matches Work interface

**Professional Data** ([src/assets/data/about.json](src/assets/data/about.json)):

- Professional information, skills, experience, and education
- Organized by categories (aboutInfo, skillCategories, experience, education)
- Loaded dynamically by AboutService

### Root Component Structure

**AppComponent** ([src/app/app.ts](src/app/app.ts)):

- Standalone root component with OnPush change detection
- Uses Angular Signals for state management (`isScrolled`, `currentSection`)
- Manages navigation items and social links via signals
- Handles scroll detection for sticky header styling
- Routes to feature components via RouterModule
- Contains HeaderComponent and FooterComponent

### Routing Configuration

**Routes** ([src/app/routes.ts](src/app/routes.ts)):

```
/              → Redirects to /home
/home          → AboutManagementComponent (About section)
/portfolio     → PortfolioManagementComponent (Portfolio projects)
/about         → AboutManagementComponent (About section)
/filosofy      → FilosofyManagementComponent (Philosophy/values)
/**            → Redirects to /home (wildcard catch-all)
```

Each route uses the feature's container component which handles all business logic and state.

### Styling

- **Framework**: Tailwind CSS 3.x with SCSS integration
- **CSS Preprocessor**: SCSS for component-scoped styles
- **Configuration**: [tailwind.config.js](tailwind.config.js)
- **Custom colors**: Regal blue (#034378), San Juan (#77d7b9), and Bermuda colors defined in Tailwind config
- **Component structure**: Each component has scoped `.scss` file (e.g., `work-card.presentational.scss`)
- **Global styles**: [src/styles.scss](src/styles.scss) includes Tailwind directives and global utility styles
- **Responsive design**: Mobile-first approach with breakpoints at 480px, 768px, 1024px

### Application Configuration

The app uses **standalone components** with centralized configuration:

- **bootstrapApplication** in [src/main.ts](src/main.ts): Entry point with AppComponent
- **appConfig** ([src/app/app.config.ts](src/app/app.config.ts)): Centralized provider configuration
  - `provideAnimations()`: Angular animations support
  - `provideHttpClient()`: HTTP client with interceptor support
  - `provideRouter(routes)`: Routing configuration

**No NgModules** - fully standalone component architecture following Angular 20+ best practices

## Important Notes

### Signals vs Observables

This project uses **Angular Signals** for all state management (not RxJS Observables). Signals are:

- **Synchronous** - no need for async pipe in templates
- **Fine-grained** - only components using changed signals re-render
- **OnPush compatible** - works seamlessly with change detection strategy
- **Simpler** - no subscription management needed (no unsubscribe overhead)

When working with services that expose signals, use them directly in component templates:

```typescript
// ✅ Correct - signals in templates
<div>{{ works() }}</div>

// ❌ Avoid - mixing observables and signals
<div>{{ works$ | async }}</div>
```

### Adding or Modifying Portfolio Projects

1. Edit [src/assets/data/works.json](src/assets/data/works.json)
2. Ensure each object matches the `Work` interface:
   - `id`: Unique identifier
   - `title`: Project display name
   - `poster`: Path to project image (e.g., `assets/img/project-name.png`)
   - `description`: Project summary
   - `linkView`: Live project URL
   - `date`: Project date in "MMM YYYY" format
   - `Link`: GitHub repository or related link URL
3. Add corresponding image to [src/assets/img/](src/assets/img/) directory
4. PortfolioService automatically loads and reflects changes on app reload

### Adding or Modifying Professional Information

1. Edit [src/assets/data/about.json](src/assets/data/about.json)
2. Update skills, experience, or education sections
3. AboutService automatically loads changes on app reload

### Scope Rule: When to Create Local vs Global Code

**Create in GLOBAL (core/shared):**
- Singleton services used by multiple features (auth, logging, etc.)
- Shared UI components (Header, Footer, common buttons)
- Shared interfaces and utilities
- HTTP interceptors and guards

**Create in LOCAL (features):**
- Feature-specific services (PortfolioService lives in portfolio-management/)
- Feature components and presentationals
- Feature-specific models and interfaces
- Feature-specific business logic

This prevents circular dependencies and makes features more portable.

### TypeScript Configuration

- **Target**: ES2022
- **Module**: ES2022 (using ES modules)
- **Strict Mode**: Fully enabled including:
  - `strict: true`
  - `noImplicitOverride: true`
  - `noPropertyAccessFromIndexSignature: true`
  - `noImplicitReturns: true`
  - `noFallthroughCasesInSwitch: true`
- **Angular Compiler**: Strict template checking enabled with:
  - `strictInjectionParameters: true`
  - `strictInputAccessModifiers: true`
  - `strictTemplates: true`
- **Path Aliases** (configured in tsconfig.json):
  - `@features/*` → `src/app/features/*`
  - `@shared/*` → `src/app/shared/*`
  - `@core/*` → `src/app/core/*`

**Important**: Type safety is enforced. Avoid bypassing the type system in new code - use these path aliases for cleaner imports:

```typescript
// ✅ Correct - use path aliases
import { PortfolioService } from '@features/portfolio-management/services/portfolio.service';

// ❌ Avoid - relative paths
import { PortfolioService } from '../../../features/portfolio-management/services/portfolio.service';
```

## Build Configuration

Production builds have bundle size budgets set in `angular.json`:

- Initial: 500KB warning / 1MB error
- Component styles: 2KB warning / 4KB error

Monitor these when adding dependencies or styles.

## MCP (Model Context Protocol) Servers

This project has two MCP servers configured to enhance Claude Code capabilities:

### 1. Angular MCP Server

An Angular MCP server is configured in `.mcp/angular.json` that provides direct access to Angular documentation and framework guidance.

**Zero Setup Required!** Angular MCP works immediately.

**Capabilities:**

- Real-time Angular documentation access
- API reference and code examples
- Best practices and design patterns
- Framework concepts and architecture guidance

**Usage:** Ask Claude Code about Angular:

- "What's the best way to implement reactive forms?"
- "Show me Angular API documentation for HttpClient"
- "How do I implement dependency injection in services?"
- "What are Angular performance optimization techniques?"

### 2. GitHub MCP Server

A GitHub MCP server is configured in `.mcp/github.json` that enables Claude Code to interact with GitHub directly.

**Setup:**

1. Generate a GitHub Personal Access Token at https://github.com/settings/tokens
2. Set the `GITHUB_TOKEN` environment variable:
   ```bash
   # Windows PowerShell (Run as Administrator)
   [Environment]::SetEnvironmentVariable("GITHUB_TOKEN", "your_token_here", "User")
   ```
3. Restart Claude Code after setting the environment variable

**Capabilities:**

- View and manage pull requests and issues
- Search code across your repository
- Access commit history and branch information
- Create and manage GitHub Gists
- Retrieve user and organization information

**Usage:** With `GITHUB_TOKEN` set, Claude Code can directly interact with GitHub when you ask questions like:

- "Create a pull request for my changes"
- "List all open issues"
- "Search for TODO comments in my code"

See `.mcp/README.md` for detailed setup instructions and security considerations.

## Configured Claude Code Agents

The `.claude/agents/` directory contains specialized AI agent configurations for different development tasks:

- **angular-developer.md**: Expert guidance for Angular development following TDD practices
- **angular-mentor.md**: Learning resource for Angular concepts and patterns
- **architecture-planner.md**: Help with software architecture and design patterns
- **career-profile-builder.md**: Professional profile and resume optimization
- **devops-docker-nginx-ci-cd.md**: DevOps, Docker, and CI/CD guidance
- **git-workflow-manager.md**: Git workflow and conventional commits expertise
- **security-auditor.md**: Code security review and vulnerability analysis
- **tdd-guide.md**: Test-Driven Development practices and guidance

These agents are project-specific workflow helpers and should be committed to share workflows with your team.

## Git Workflow

This project follows conventional commits standards as configured in `.claude/agents/git-workflow-manager.md`. When making commits, use the format:

```
<type>(<scope>): <subject>

<body>

<footer>
```

**Common types**: feat, fix, docs, style, refactor, perf, test, chore

Example:

```
feat(work-card): add animation to project cards

Implemented smooth fade-in animation when cards load using
CSS transitions and Angular's animation module.

Closes #42
```

## Environment & Security

- **Sensitive files** are protected in `.gitignore`:
  - `.env*` files (never commit environment variables)
  - `resumers/` folder (personal information not for public repos)
  - `.claude/settings.local.json` (local settings)

- **Claude Code configurations** in `.claude/` are committed to share AI workflows
- See `.gitignore` for complete list of ignored patterns

## Development Patterns & Best Practices

### Change Detection Strategy

All components use **ChangeDetectionStrategy.OnPush** for optimal performance:

```typescript
@Component({
  selector: 'app-work-card',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  // ...
})
export class WorkCardPresentational { }
```

Benefits:
- Only re-renders when input properties change or events fire
- Works seamlessly with signals
- Reduces change detection cycles
- Better performance with large lists

### Component Naming Convention

- **Container components**: `feature-name.ts` (e.g., `portfolio-management.ts`)
- **Presentational components**: `feature-name.presentational.ts` (e.g., `work-card.presentational.ts`)
- **Test files**: Same name with `.spec.ts` suffix

### Testing Guidelines

- **Unit tests** for services and utilities are mandatory
- **Integration tests** for container components recommended
- Target **90%+ code coverage** for new code
- Use mock data factory for consistent test data
- Test both happy path and error scenarios

Run tests:

```bash
# Watch mode during development
npm test

# Single run (CI/CD)
npm test -- --no-watch

# With coverage report
npm test -- --no-watch --code-coverage
```

## Modernization Progress

This project has completed a comprehensive modernization to Angular 20+ standards.

### Phase 1: Infrastructure Setup ✅ COMPLETE

- Upgraded Angular 15 → 16 → 17 → 18 → 20
- Upgraded TypeScript 4.9 → 5.4
- Installed and configured Tailwind CSS 3.x
- Removed Bootstrap and jQuery dependencies
- Production build: 282 KB (gzipped: 76 KB)

### Phase 2: Service Layer with TDD ✅ COMPLETE

- Implemented PortfolioService with signal-based state
- Implemented AboutService and FilosofyService
- Created mock data factory for testing
- 93%+ test coverage on services
- Comprehensive error handling and edge cases
- 47+ tests passing (all green)

### Phase 3: Component Modernization ✅ COMPLETE

- ✅ Converted all components to standalone
- ✅ Implemented container/presentational architecture
- ✅ Migrated from RxJS observables to Angular Signals
- ✅ All components use OnPush change detection
- ✅ Replaced DOM manipulation with state management
- ✅ Integrated services with signal-based state

**Completed components:**
- AppComponent (root with signals and scroll detection)
- PortfolioManagementComponent (container)
  - WorkListPresentational
  - WorkCardPresentational
  - WorkModalPresentational
- AboutManagementComponent (container)
  - AboutHeaderPresentational
  - AboutSkillsPresentational
  - AboutExperiencePresentational
  - AboutEducationPresentational
- FilosofyManagementComponent (container)
  - SectionHeaderPresentational
  - SectionContentPresentational

### Phase 4: Advanced Features ✅ COMPLETE

- ✅ Proper routing with feature components
- ✅ Animations and transitions via CSS/Tailwind
- ✅ Responsive design with mobile-first approach
- ✅ Performance optimizations (OnPush, computed signals, etc.)
- ✅ Proper TypeScript path aliases (@features, @shared, @core)

## Test Coverage Summary

**Current Coverage:**

- PortfolioService: 93.1% line coverage (34 tests)
- AboutService: High coverage with comprehensive edge cases
- FilosofyService: High coverage with all scenarios
- Total: 47+ tests passing with strict module resolution

**Coverage Quality:**
- All services tested with HttpTestingController
- Error scenarios and edge cases covered
- Memory safety and unsubscription verified
- Mock data factory with 100% coverage

**Generate Coverage Reports:**

```bash
npm test -- --no-watch --code-coverage
# Output: coverage/ directory with detailed HTML report
```

**Quality Gates:**

- Minimum acceptable: 80% coverage
- Target: 90%+ coverage
- Current service layer: 93.1% ✅ Exceeds target
