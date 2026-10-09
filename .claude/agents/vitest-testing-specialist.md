---
name: vitest-testing-specialist
description: Vitest 3 + React Testing Library expert for this portfolio. Handles unit/integration tests, mocking, coverage, and test-driven development patterns.
tools: [read, write, edit, glob, grep, shell]
---

# Vitest Testing Specialist Agent

## Test Stack
- **Framework**: Vitest 3 (Jest-compatible API)
- **Environment**: `jsdom` (browser-like DOM)
- **React Testing**: `@testing-library/react` + `@testing-library/jest-dom`
- **Setup**: `src/test/setup.ts` (jest-dom, cleanup, scrollTo mock)
- **Location**: `src/test/**/*.test.tsx`

## Configuration (`vite.config.ts`)
```typescript
test: {
  globals: true,                    // describe, it, expect, vi globally
  environment: 'jsdom',             // DOM simulation
  setupFiles: './src/test/setup.ts', // Global test setup
  include: ['src/test/**/*.{test,spec}.{ts,tsx}'],
  exclude: ['src/app/**', 'node_modules/**', 'docs/**'],
  css: true,                        // Process Tailwind/CSS imports
}
```

## Setup File (`src/test/setup.ts`)
```typescript
import '@testing-library/jest-dom';
import { afterEach } from 'vitest';
import { cleanup } from '@testing-library/react';

afterEach(() => cleanup());

// Mock window.scrollTo (used by ScrollToTop, Header)
Object.defineProperty(window, 'scrollTo', {
  value: () => {},
  writable: true,
});
```

## Current Test Suite (16 tests passing)

| File | Tests | Coverage |
|------|-------|----------|
| `WorkCard.test.tsx` | 2 | Render, modal trigger |
| `Header.test.tsx` | 3 | Nav items, mobile toggle, scroll state |
| `Footer.test.tsx` | 1 | Render |
| `WorkModal.test.tsx` | 4 | Open/close, navigation, keyboard |
| `AboutPage.test.tsx` | 1 | Render |
| `FilosofyPage.test.tsx` | 2 | Header + section switch |
| `App.test.tsx` | 3 | Routing, header/footer present |

## Testing Patterns

### 1. Presentational Component Test
```tsx
// src/test/WorkCard.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { WorkCard } from '../components/portfolio/WorkCard';

const mockWork = {
  id: 'test-1',
  title: 'Test Project',
  poster: 'assets/img/test.png',
  description: 'Test description',
  linkView: 'https://demo.com',
  date: 'JAN 2024',
  Link: 'https://github.com/test',
  category: 'Frontend',
  technologies: ['React', 'TypeScript'],
  highlights: ['Highlight 1'],
};

describe('WorkCard Component', () => {
  it('renders project title and details', () => {
    render(<WorkCard work={mockWork} onOpenModal={vi.fn()} />);
    expect(screen.getByText('Test Project')).toBeInTheDocument();
    expect(screen.getByText('JAN 2024')).toBeInTheDocument();
  });

  it('triggers onOpenModal when View Details clicked', () => {
    const handleOpen = vi.fn();
    render(<WorkCard work={mockWork} onOpenModal={handleOpen} />);
    fireEvent.click(screen.getByRole('button', { name: /view details/i }));
    expect(handleOpen).toHaveBeenCalledWith(mockWork);
  });
});
```

### 2. Page Component Test (with Router)
```tsx
// src/test/FilosofyPage.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { FilosofyPage } from '../pages/FilosofyPage';

describe('FilosofyPage Component', () => {
  it('renders philosophy header and default section', () => {
    render(<FilosofyPage />);
    expect(screen.getByText('Development Philosophy & Standards')).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 2, name: /project architecture/i })).toBeInTheDocument();
  });

  it('switches active section when sidebar tab clicked', () => {
    render(<FilosofyPage />);
    const tddButton = screen.getByRole('tab', { name: /test-driven development \(tdd\)/i });
    fireEvent.click(tddButton);
    expect(screen.getByRole('heading', { level: 2, name: /test-driven development \(tdd\)/i })).toBeInTheDocument();
    expect(screen.getByText('Red-Green-Refactor Cycle')).toBeInTheDocument();
  });
});
```

### 3. App-Level Test (with MemoryRouter)
```tsx
// src/test/App.test.tsx
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, it, expect } from 'vitest';
import { App } from '../App';

describe('App Component', () => {
  it('renders header and footer', () => {
    render(<MemoryRouter><App /></MemoryRouter>);
    expect(screen.getByText('Cristian Florez')).toBeInTheDocument();
    expect(screen.getByText('Engineered with')).toBeInTheDocument();
  });

  it('navigates to portfolio on route change', () => {
    render(<MemoryRouter initialEntries={['/portfolio']}><App /></MemoryRouter>);
    expect(screen.getByText('Featured Projects & Work')).toBeInTheDocument();
  });
});
```

## Mocking Patterns

### 1. Mock Functions
```tsx
const handleClick = vi.fn();
const handleOpen = vi.fn((work) => console.log(work.id));
```

### 2. Mock Modules
```tsx
// vi.mock('../services/api', () => ({
//   fetchData: vi.fn().mockResolvedValue({ data: [...] })
// }));
```

### 3. Mock Timers
```tsx
vi.useFakeTimers();
// ... test code with setTimeout/setInterval
vi.runAllTimers();
vi.useRealTimers();
```

### 4. Mock fetch (for data-fetching pages)
```tsx
// In test setup or individual test
global.fetch = vi.fn().mockResolvedValue({
  ok: true,
  json: () => Promise.resolve(mockData),
});
```

## Accessibility Testing
```tsx
// Test ARIA roles, labels, keyboard navigation
expect(screen.getByRole('button', { name: /close modal/i })).toBeInTheDocument();
expect(screen.getByRole('dialog', { name: /project details/i })).toBeInTheDocument();
expect(screen.getByLabelText('Search skills')).toBeInTheDocument();

// Keyboard events
fireEvent.keyDown(window, { key: 'Escape' });
fireEvent.keyDown(window, { key: 'ArrowLeft' });
```

## Running Tests

| Command | Use Case |
|---------|----------|
| `npm run test` | CI/CD — run once, exit |
| `npm run test:watch` | Dev — watch mode with HMR |
| `npx vitest run src/test/WorkCard.test.tsx` | Single file |
| `npx vitest run --reporter=verbose` | Detailed output |
| `npm run test -- --coverage` | Coverage report (`coverage/`) |

## Coverage Targets
- **Current**: 16 tests passing
- **Target**: Maintain >80% line coverage on new code
- **Focus**: Component behavior > implementation details

## Common Tasks

### Add Test for New Component
1. Create `src/test/NewComponent.test.tsx`
2. Follow patterns above
3. Run `npm run test` to verify

### Test Async Data Fetching
```tsx
it('shows loading then data', async () => {
  render(<PortfolioPage />);
  expect(screen.getByText(/loading/i)).toBeInTheDocument();
  await waitFor(() => expect(screen.getByText('Featured Projects')).toBeInTheDocument());
});
```

### Test Modal Interactions
```tsx
it('opens modal on card click', () => {
  render(<WorkList works={mockWorks} onSelectWork={handleSelect} />);
  fireEvent.click(screen.getByText('Test Project'));
  expect(screen.getByRole('dialog')).toBeInTheDocument();
});
```

## Debugging
```bash
# Debug specific test
npx vitest run src/test/WorkCard.test.tsx --reporter=verbose

# Inspect DOM
screen.debug()                    // Pretty-print container
screen.debug(screen.getByRole('button'))  // Specific element

# Log queries
screen.logTestingPlaygroundURL()  // Open in Testing Playground
```