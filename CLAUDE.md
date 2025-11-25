# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is an Angular 15 portfolio application that displays a collection of professional projects and work experiences. The portfolio features interactive project cards with modal dialogs for detailed information.

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
npm test -- --include='**/filename.spec.ts'
```

**Generate new components:**
```bash
ng generate component component-name
# This will automatically create .ts, .html, and .scss files with proper structure
```

## Architecture

### Component Structure

The app follows a simple, flat component hierarchy:

- **AppComponent** ([src/app/app.component.ts](src/app/app.component.ts)): Root component that manages the portfolio data
  - Contains a hardcoded array of `Work` objects with project details (title, description, links, dates)
  - Passes individual projects to child components

- **WorkCardComponent** ([src/app/work-card/work-card.component.ts](src/app/work-card/work-card.component.ts)): Presentational component
  - Receives a `Work` object as `@Input() data`
  - Handles opening modals by manipulating DOM directly (adding/removing CSS classes)
  - Displays project card with title, poster image, and date

- **ModalComponent** ([src/app/modal/modal.component.ts](src/app/modal/modal.component.ts)): Presentational component
  - Receives a `Work` object as `@Input() data`
  - Handles closing modals by manipulating DOM directly
  - Displays detailed project information and external links

### Data Model

**Work Interface** ([src/app/work.model.ts](src/app/work.model.ts)):
```typescript
interface Work {
  title: string;
  id: String;
  poster: string;        // Path to project image
  description: string;   // Project description
  linkView: string;      // External link to live project
  date: string;          // Date in format "MMM YYYY"
  Link: string;          // LinkedIn or GitHub link
}
```

### Styling

- **Framework**: Bootstrap 5 for layout and utilities
- **CSS Preprocessor**: SCSS
- **Module structure**: Each component has its own `.scss` file
- **Global styles**: [src/styles.scss](src/styles.scss)
- **Bootstrap and jQuery**: Loaded via scripts in `angular.json` (not ideal, but required for Bootstrap components)

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

Consider refactoring this to use Angular's built-in features (Component state, *ngIf, or ViewChild) in future updates for better maintainability and testability.

### Portfolio Data

All portfolio projects are hardcoded in `AppComponent.works[]`. To add or modify projects:
1. Edit the `works` array in [src/app/app.component.ts](src/app/app.component.ts)
2. Ensure each object matches the `Work` interface
3. Add corresponding image to `src/assets/img/` directory

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
