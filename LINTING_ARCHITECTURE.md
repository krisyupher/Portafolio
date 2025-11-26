# ESLint and Prettier Integration Architecture

## Project Context

- **Angular Version**: 18.2.14
- **TypeScript**: 5.4.5 (strict mode)
- **Current Test Coverage**: 93.1%
- **Build Size**: 268 KB (optimized)
- **Components**: Mix of module-based (Phase 1-2) and future standalone (Phase 3)

## Architecture Overview

### 1. Tool Selection Rationale

#### ESLint

- **Purpose**: Static code analysis and style enforcement
- **Benefits**: Catches bugs, maintains consistency, enforces best practices
- **Scope**: All TypeScript/JavaScript files, templates via angular-eslint
- **Strictness**: Maximum (compatible with strict mode TypeScript)

#### Prettier

- **Purpose**: Automatic code formatting (opinionated, no config needed)
- **Benefits**: Eliminates formatting debates, consistent code style
- **Scope**: All source files (TS, HTML, CSS/SCSS, JSON, MD)
- **Conflicts**: Resolved by disabling conflicting ESLint rules

### 2. Configuration Structure

```
project-root/
├── .eslintrc.json           # Main ESLint configuration
├── .eslintignore            # Files to exclude from linting
├── .prettierrc.json         # Prettier configuration
├── .prettierignore          # Files to exclude from formatting
├── src/
│   ├── .eslintrc.json       # (Optional) Component-specific rules
│   └── ...
└── package.json             # Scripts and dependencies
```

### 3. ESLint Configuration Strategy

#### Core Packages

1. **eslint** - Core linter
2. **@typescript-eslint/parser** - TypeScript support
3. **@typescript-eslint/eslint-plugin** - TypeScript rules
4. **@angular-eslint/eslint-plugin** - Angular-specific rules
5. **@angular-eslint/eslint-plugin-template** - Angular template linting
6. **eslint-config-prettier** - Disable ESLint rules conflicting with Prettier
7. **eslint-plugin-prettier** - Run Prettier as ESLint rule (optional)

#### Rule Categories

**A. Angular Best Practices**

- Component lifecycle enforcement
- Dependency injection patterns
- Template best practices
- Change detection strategies

**B. TypeScript Strict Mode**

- No implicit any
- Strict null checks
- Strict function types
- No unused variables/imports

**C. Code Quality**

- Complexity limits
- Cognitive complexity
- Function length limits
- Nesting depth

**D. Accessibility & Security**

- Template accessibility (aria labels)
- Security vulnerabilities detection
- XSS prevention

### 4. Prettier Configuration Strategy

#### Settings

```json
{
  "printWidth": 100, // Line length limit
  "tabWidth": 2, // Indentation size
  "useTabs": false, // Use spaces
  "semi": true, // Semicolons required
  "singleQuote": true, // Single quotes for strings
  "trailingComma": "es5", // Trailing commas where valid
  "arrowParens": "always", // Always include arrow function parens
  "bracketSpacing": true, // Spaces in object literals
  "endOfLine": "lf" // Unix line endings
}
```

#### Scope

- **Include**: .ts, .js, .html, .css, .scss, .json, .md
- **Exclude**: node_modules, dist, coverage, .git

### 5. Pre-commit Hooks Strategy

#### Tools

1. **husky** - Git hooks management
2. **lint-staged** - Run linters on staged files only

#### Hook Workflow

```
git add → lint-staged checks staged files → ESLint + Prettier → Pass/Fail → Commit
```

#### Stages

- **Pre-commit**: ESLint and Prettier on staged files
- **Commit-msg**: Validate conventional commit format
- **Pre-push**: Run full test suite (optional)

### 6. Development Workflow

#### NPM Scripts

```json
{
  "lint": "ng lint", // Run ESLint
  "lint:fix": "ng lint --fix", // Fix ESLint issues
  "format": "prettier --write .", // Format with Prettier
  "format:check": "prettier --check .", // Check formatting
  "lint:staged": "lint-staged" // Check staged files
}
```

#### IDE Integration

- VSCode: ESLint and Prettier extensions
- Auto-fix on save: Configured in settings.json
- Format on save: Enabled for .ts, .html, .scss

### 7. Component-Specific Rules

#### Legacy Components (Phase 1-2)

- Allow `@Component({ standalone: false })`
- Stricter module usage rules
- Maintain existing patterns

#### Standalone Components (Phase 3+)

- Require `standalone: true`
- Modern Angular patterns
- Composition over inheritance

### 8. CI/CD Integration

#### Build Pipeline

1. **Lint Check**: `npm run lint` - Fail build if issues
2. **Format Check**: `npm run format:check` - Fail build if unformatted
3. **Tests**: `npm test` - Run after linting passes
4. **Build**: `npm run build` - Final production build

#### GitHub Actions Example

```yaml
- name: Lint
  run: npm run lint

- name: Format Check
  run: npm run format:check

- name: Tests
  run: npm test

- name: Build
  run: npm run build
```

### 9. Transition Strategy

#### Phase 1: Setup & Configuration

1. Install packages
2. Create ESLint and Prettier configs
3. Run initial lint scan
4. Fix/suppress critical issues
5. Commit baseline configuration

#### Phase 2: Gradual Enforcement

1. Review all lint errors
2. Fix auto-fixable issues
3. Address violations category by category
4. Document exceptions (if any)
5. Enable pre-commit hooks

#### Phase 3: CI/CD Integration

1. Add linting to CI pipeline
2. Block PRs with linting failures
3. Enforce on all contributions
4. Monitor metrics

### 10. Rule Strictness Levels

#### Tier 1: Critical (Errors)

- Security issues
- Type errors
- Module resolution failures

#### Tier 2: Important (Warnings)

- Best practice violations
- Code quality issues
- Unused code

#### Tier 3: Style (Info)

- Formatting inconsistencies
- Code style preferences

### 11. Ignoring Rules

When exceptions are needed:

```typescript
// For single lines
// eslint-disable-next-line @typescript-eslint/rule-name
code();

// For blocks
/* eslint-disable @angular-eslint/rule-name */
code block;
/* eslint-enable @angular-eslint/rule-name */

// Always document WHY
```

## Implementation Order

1. ✅ Install all packages
2. ✅ Create ESLint configuration (.eslintrc.json)
3. ✅ Create Prettier configuration (.prettierrc.json)
4. ✅ Create ignore files (.eslintignore, .prettierignore)
5. ✅ Run initial lint scan
6. ✅ Fix/suppress issues
7. ✅ Add npm scripts
8. ✅ Set up pre-commit hooks
9. ✅ Document guidelines
10. ✅ Commit all changes

## Benefits

1. **Code Quality**: Catch bugs early, prevent common mistakes
2. **Consistency**: Uniform code style across the project
3. **Maintainability**: Cleaner code is easier to maintain
4. **Team Alignment**: Everyone follows the same rules
5. **Automation**: Pre-commit hooks ensure compliance
6. **Documentation**: Rules serve as live documentation

## Key Decisions

- **Prettier over manual formatting**: Opinionated, no debates
- **Angular ESLint**: Native Angular pattern enforcement
- **Husky + lint-staged**: Only check changed files, fast feedback
- **Strict defaults**: Can be relaxed, harder to add later
- **Separate configs**: Independent tool configurations, easier maintenance
