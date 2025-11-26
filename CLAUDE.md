# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is an Angular 18 portfolio application that displays a collection of professional projects and work experiences. The portfolio features interactive project cards with modal dialogs for detailed information.

**Tech Stack:**

- Angular 18.2.14
- TypeScript 5.4.5
- Tailwind CSS (replacing Bootstrap)
- RxJS for reactive state management
- Jasmine/Karma for testing

**Status:** Phase 1 and Phase 2 of modernization complete. Service layer implemented with 93% test coverage.

## Common Development Commands

**Development server:**

```bash
npm start
# Serves on http://localhost:4200/ with hot reload
```

**Build for production:**

```bash
npm run build
# Output stored in dist/portafolio/
```

**Watch mode (incremental builds):**

```bash
npm run watch
# Useful for development without serving
```

**Run unit tests:**

```bash
npm test
# Runs Karma test runner with Jasmine
```

**Run a single test file:**

```bash
npm test -- --include='**/filename.spec.ts' --no-watch
```

**Run tests with coverage:**

```bash
npm test -- --no-watch --code-coverage
```

**Generate new components:**

```bash
ng generate component component-name
# This will automatically create .ts, .html, and .scss files with proper structure
```

## Architecture

### Service Layer (Phase 2 - Complete)

**PortfolioService** ([src/app/core/services/portfolio.service.ts](src/app/core/services/portfolio.service.ts)):

- Reactive state management with BehaviorSubject pattern
- Three public observables:
  - `works$`: Observable<Work[]> - Portfolio items
  - `loading$`: Observable<boolean> - Loading state
  - `error$`: Observable<string | null> - Error messages
- Methods:
  - `loadWorks()`: Fetches portfolio data from JSON file
  - `getWorkById(id: string)`: Returns specific work item
  - `getCurrentWorks()`: Synchronous snapshot of current works
  - `isLoading()`: Synchronous loading state check
  - `getCurrentError()`: Synchronous error state check
- 93.1% test coverage (34 passing tests)
- Comprehensive error handling and edge case coverage

**Testing Infrastructure** ([src/app/shared/testing/](src/app/shared/testing/)):

- `mock-data.factory.ts`: Helper functions for test data creation
  - `createMockWork(overrides?)`: Creates single mock Work object
  - `createMockWorks(count)`: Creates array of mock Work objects
- 100% test coverage on mock factory (13 passing tests)

### Data Model

**Work Interface** ([src/app/core/models/work.model.ts](src/app/core/models/work.model.ts)):

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

**Portfolio Data** ([src/assets/data/works.json](src/assets/data/works.json)):

- 14 portfolio projects in JSON format
- Loaded dynamically by PortfolioService
- Replaces previous hardcoded data in AppComponent

### Component Structure (Legacy - To be modernized in Phase 3)

The app currently follows a simple, flat component hierarchy:

- **AppComponent** ([src/app/app.component.ts](src/app/app.component.ts)): Root component
  - **NOTE:** Still contains hardcoded `works` array (will be replaced with PortfolioService in Phase 3)
  - Passes individual projects to child components

- **WorkCardComponent** ([src/app/work-card/work-card.component.ts](src/app/work-card/work-card.component.ts)): Presentational component
  - Receives a `Work` object as `@Input() data`
  - **ANTI-PATTERN:** Handles opening modals by manipulating DOM directly (will be refactored in Phase 3)
  - Displays project card with title, poster image, and date

- **ModalComponent** ([src/app/modal/modal.component.ts](src/app/modal/modal.component.ts)): Presentational component
  - Receives a `Work` object as `@Input() data`
  - **ANTI-PATTERN:** Handles closing modals by manipulating DOM directly (will be refactored in Phase 3)
  - Displays detailed project information and external links

### Styling

- **Framework**: Tailwind CSS 3.x (Bootstrap removed in Phase 1)
- **CSS Preprocessor**: SCSS
- **Configuration**: [tailwind.config.js](tailwind.config.js)
- **Custom colors**: Preserved original regal-blue, san-juan, and bermuda colors in Tailwind config
- **Module structure**: Each component has its own `.scss` file
- **Global styles**: [src/styles.scss](src/styles.scss) - includes Tailwind directives and legacy SCSS

### Module Setup

The app uses Angular's standard module system:

- **AppModule** ([src/app/app.module.ts](src/app/app.module.ts)): Bootstrap module
  - Declares: AppComponent, WorkCardComponent, ModalComponent
  - Imports: BrowserModule, AppRoutingModule, FormsModule
  - Minimal routing setup via AppRoutingModule

## Important Notes

### DOM Manipulation

Currently, the modal open/close functionality uses direct DOM manipulation:

```typescript
element.classList.add('openModalStyle');
element.classList.remove('displayNone');
```

Consider refactoring this to use Angular's built-in features (Component state, \*ngIf, or ViewChild) in future updates for better maintainability and testability.

### Portfolio Data

Portfolio data is now managed in two places:

**Modern approach (Phase 2 - Ready for use):**

- Portfolio data stored in [src/assets/data/works.json](src/assets/data/works.json)
- Loaded dynamically by PortfolioService
- To add/modify projects, edit the JSON file

**Legacy approach (Phase 3 will migrate):**

- AppComponent still has hardcoded `works[]` array
- Will be replaced with PortfolioService subscription in Phase 3

To add or modify projects (JSON approach):

1. Edit [src/assets/data/works.json](src/assets/data/works.json)
2. Ensure each object matches the `Work` interface
3. Add corresponding image to `src/assets/img/` directory
4. Service will automatically load the updated data

### TypeScript Configuration

- **Target**: ES2022
- **Strict Mode**: Enabled with `noImplicitOverride` and `noPropertyAccessFromIndexSignature`
- **Angular Compiler**: Strict template checking enabled

This means type safety is important - avoid bypassing the type system in new code.

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

## Modernization Roadmap

This project is undergoing a comprehensive modernization following TDD principles. Progress is tracked across multiple phases.

### Phase 1: Infrastructure Setup (COMPLETE)

**Status:** ✅ Complete

**Completed:**

- Upgraded Angular 15 → 16 → 17 → 18
- Upgraded TypeScript 4.9 → 5.4
- Installed and configured Tailwind CSS
- Removed Bootstrap and jQuery dependencies
- Verified production build (268KB initial bundle)
- Updated all dependencies to latest compatible versions

**Commits:**

- `14c4133` - Angular 16 upgrade
- `2b78c99` - Angular 17 and TypeScript 5.4 upgrade
- `0e9082e` - Angular 18 upgrade
- `2eef9b9` - Tailwind CSS installation and Bootstrap removal

### Phase 2: Service Layer with TDD (COMPLETE)

**Status:** ✅ Complete - 93% test coverage achieved

**Completed:**

- Created Work model interface in `src/app/core/models/`
- Implemented PortfolioService with BehaviorSubject state management
- Created mock data factory for testing
- Wrote 47 comprehensive tests (13 factory + 34 service)
- All tests passing with 93.1% line coverage
- Migrated portfolio data to `works.json`
- Modern Angular 18 patterns (provideHttpClient)

**Test Quality:**

- Red-Green-Refactor methodology strictly followed
- Tests cover: initialization, HTTP success, HTTP errors, edge cases, memory safety
- Proper use of HttpTestingController
- Observable stream testing with async/done patterns

**Commits:**

- `763cc73` - Service layer implementation with 93% test coverage

### Phase 3: Component Modernization (PENDING)

**Status:** 🔄 Not Started

**Goals:**

- Convert to standalone components
- Implement container/presentational (Scrum) architecture
- Replace DOM manipulation with Angular state management
- Integrate PortfolioService into components
- Convert components to use OnPush change detection
- Add component tests (target 90%+ coverage)

**Components to modernize:**

- AppComponent → Portfolio Page Container
- WorkCardComponent → Work Card Presentational
- ModalComponent → Work Modal Presentational

### Phase 4: Advanced Features (PENDING)

**Status:** 🔄 Not Started

**Goals:**

- Implement proper routing with lazy loading
- Add animations using Angular animations API
- Implement filtering and search functionality
- Add skeleton loaders for better UX
- Performance optimizations (OnPush, trackBy, etc.)

## Test Coverage Summary

**Current Coverage (Phase 2):**

- Mock Data Factory: 100% (13 tests)
- PortfolioService: 93.1% line coverage (34 tests)
- Total: 47 tests passing

**Coverage Reports:**
Run `npm test -- --no-watch --code-coverage` to generate detailed coverage reports in `coverage/` directory.

**Quality Gates:**

- Minimum acceptable: 80% coverage
- Target: 90%+ coverage
- Service layer: 93.1% ✅ Exceeds target
