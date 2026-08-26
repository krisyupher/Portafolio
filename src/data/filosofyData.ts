import { Section } from '../types';

export const FILOSOFY_SECTIONS: Section[] = [
  {
    id: 'architecture',
    title: 'Modern Web & React Project Architecture',
    subsections: [
      {
        title: 'Directory Structure',
        description: 'Clear, scalable, and modular organization following feature-driven and atomic design principles',
        example: `src/
├── components/          # Reusable UI & layout components
│   ├── common/          # Global presentational components (Header, Footer, Button, Modal)
│   ├── about/           # Feature components for About section
│   ├── portfolio/       # Feature components for Portfolio section
│   └── filosofy/        # Feature components for Philosophy section
├── pages/               # Top-level route pages (AboutPage, PortfolioPage, FilosofyPage)
├── types/               # TypeScript interfaces and type definitions
├── data/                # Static data and content constants
├── test/                # Test utilities and Vitest setup
├── assets/              # Static assets, images, and JSON data
├── App.tsx              # Main application shell with Router and layout
├── main.tsx             # React 19 root mounting
└── index.css            # Tailwind directives and global styles`,
      },
      {
        title: 'Core Principles',
        items: [
          'Modular Architecture: Clear separation between global layout and feature components',
          'Component Composition: Declarative, composable React 19 functional components',
          'Container / Presentational Pattern: Smart pages handle state and data, presentational components handle pure UI',
          'Single Responsibility: Each component and utility maintains a single, well-defined responsibility',
          'Type Safety: Strict TypeScript typing across all props, data contracts, and event handlers',
        ],
      },
    ],
  },
  {
    id: 'state-management',
    title: 'React State Management & Reactivity',
    subsections: [
      {
        title: 'Modern React 19 State Patterns',
        items: [
          'useState & useReducer: Fine-grained local component state management',
          'useEffect & useTransition: Declarative side-effects and responsive UI transitions',
          'useMemo & useCallback: Computed performance memoization where needed',
          'Custom Hooks: Encapsulated reusable stateful logic and data fetching',
        ],
      },
      {
        title: 'Custom Data Fetching Hook Pattern',
        example: `export function useFetchData<T>(url: string) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);

    fetch(url)
      .then((res) => {
        if (!res.ok) throw new Error(\`Failed to fetch from \${url}\`);
        return res.json();
      })
      .then((result) => {
        if (isMounted) {
          setData(result);
          setLoading(false);
        }
      })
      .catch((err) => {
        if (isMounted) {
          setError(err instanceof Error ? err.message : 'Unknown error');
          setLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [url]);

  return { data, loading, error };
}`,
      },
      {
        title: 'Key Architectural Benefits',
        items: [
          'Explicit data flow: Unidirectional data flow makes state changes predictable',
          'Concurrent rendering: React 19 optimizations ensure smooth frame rates',
          'Minimal overhead: Lightweight native state without unnecessary third-party bloat',
          'Easy testing: Pure render functions and easily mockable hooks',
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
          'Red: Write a failing unit or component test asserting desired behavior',
          'Green: Write the minimum necessary implementation to make tests pass',
          'Refactor: Clean, optimize, and modularize code while maintaining passing tests',
        ],
      },
      {
        title: 'Test Coverage Targets',
        items: [
          'Core Services & Utilities: 90%+ coverage required',
          'Components & UI interactions: 85%+ coverage for key user flows',
          'Data models & transforms: 100% coverage',
          'Routing & navigation: Critical paths tested',
        ],
      },
      {
        title: 'Component Test Structure with Vitest & RTL',
        example: `import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { WorkCard } from './WorkCard';

describe('WorkCard Component', () => {
  const mockWork = {
    id: 'corte-suprema',
    title: 'Corte Suprema de Justicia',
    poster: 'assets/img/CorteSuprema.png',
    description: 'Modernized official website and judicial search platform.',
    linkView: 'https://cortesuprema.gov.co',
    date: '2022 - 2024',
    Link: 'https://github.com/krisyupher',
  };

  it('renders project title and details accurately', () => {
    render(<WorkCard work={mockWork} onOpenModal={vi.fn()} />);
    expect(screen.getByText('Corte Suprema de Justicia')).toBeInTheDocument();
    expect(screen.getByText('2022 - 2024')).toBeInTheDocument();
  });

  it('triggers onOpenModal callback when View Project button is clicked', () => {
    const handleOpenModal = vi.fn();
    render(<WorkCard work={mockWork} onOpenModal={handleOpenModal} />);
    
    const button = screen.getByRole('button', { name: /view project/i });
    fireEvent.click(button);

    expect(handleOpenModal).toHaveBeenCalledWith(mockWork);
  });
});`,
      },
    ],
  },
  {
    id: 'eslint-prettier',
    title: 'ESLint and Prettier',
    subsections: [
      {
        title: 'ESLint - Static Analysis & Best Practices',
        items: [
          'Detects potential bugs, memory leaks, and anti-patterns before runtime',
          'Enforces React Hooks dependency rules (`react-hooks/exhaustive-deps`)',
          'Prevents unused variables, dead code, and inconsistent imports',
          'Runs in pre-commit hooks and CI/CD pipelines',
        ],
      },
      {
        title: 'Prettier - Opinionated Code Formatting',
        items: [
          'Automated, deterministic formatting across entire team',
          'Eliminates stylistic debates during code review',
          'Seamlessly formats TypeScript, JSX, SCSS, JSON, and Markdown',
        ],
      },
      {
        title: 'Recommended React & TypeScript ESLint Flat Config',
        example: `// eslint.config.js
import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  { ignores: ['dist/**', 'docs/**', 'node_modules/**'] },
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
      '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
      'prefer-const': 'error',
    },
  }
);`,
      },
    ],
  },
  {
    id: 'git-workflow',
    title: 'Git Workflow and Conventional Commits',
    subsections: [
      {
        title: 'Conventional Commit Format',
        example: `<type>(<scope>): <short description>

[optional body]

[optional footer(s)]

Examples:
- feat(portfolio): add animated modal for project details
- fix(header): resolve mobile hamburger navigation glitch
- docs(readme): update React 19 architecture guide
- style(tailwind): tune color palette for dark/light contrast
- refactor(hooks): decouple API fetching into useFetchData
- test(about): add unit tests for timeline and skills grid
- chore(deps): upgrade to React 19 and Vite 6`,
      },
      {
        title: 'Commit Types',
        items: [
          'feat: New user-facing feature or functionality',
          'fix: Bug fix or corrective patch',
          'docs: Documentation changes only',
          'style: Formatting, white-space, or styling adjustments without logic change',
          'refactor: Code changes that neither fix a bug nor add a feature',
          'perf: Performance optimizations',
          'test: Adding missing tests or correcting existing tests',
          'chore: Build process, dependency upgrades, or tooling changes',
        ],
      },
      {
        title: 'Branch Naming Convention',
        items: [
          'feat/feature-name - For new features',
          'fix/bug-name - For bug fixes and hotfixes',
          'refactor/component-name - For structural improvements',
          'docs/topic-name - For documentation enhancements',
        ],
      },
    ],
  },
  {
    id: 'tools',
    title: 'Modern React & Vite Development Tools',
    subsections: [
      {
        title: 'Testing with Vitest & Testing Library',
        items: [
          'npm test: Run all unit tests once',
          'npm run test:watch: Run test runner in watch mode with instant HMR',
          'npm run test:coverage: Generate full code coverage report',
        ],
      },
      {
        title: 'Development & Build Commands',
        items: [
          'npm run dev (or npm start): Start Vite dev server on http://localhost:5173 with sub-millisecond HMR',
          'npm run build: Typecheck and compile optimized production bundle to docs/',
          'npm run preview: Locally preview the production build',
        ],
      },
      {
        title: 'Code Quality & Linting',
        items: [
          'npm run lint: Check all files with ESLint 9',
          'npm run format: Automatically format all files with Prettier',
          'npm run format:check: Verify formatting in CI pipelines',
        ],
      },
    ],
  },
  {
    id: 'best-practices',
    title: 'React 19 Best Practices',
    subsections: [
      {
        title: 'Performance Optimization',
        items: [
          'Code Splitting: Use React.lazy() and Suspense for page-level bundle splitting',
          'Memoization: Targeted use of useMemo & useCallback for expensive calculations',
          'Image Optimization: Lazy loading, responsive srcset, and explicit aspect ratios',
          'Tree Shaking: Modular imports from icon and utility libraries',
        ],
      },
      {
        title: 'Clean Code Architecture',
        items: [
          'Colocated Components: Place related components, tests, and styles in matching feature folders',
          'Explicit Interfaces: Define clear TypeScript interfaces for all component props',
          'Pure Render Functions: Avoid side-effects during render phase',
          'Accessibility (a11y): WCAG 2.1 AA compliant semantic HTML, aria labels, and keyboard navigation',
        ],
      },
      {
        title: 'Type Safety Standards',
        items: [
          'Strict Mode: Enabled in tsconfig.json and React.StrictMode',
          'No Any: Disallow `any` in favor of union types and generics',
          'Null Safety: Leverage optional chaining (?.) and nullish coalescing (??)',
          'Event Typing: Use React.MouseEvent, React.KeyboardEvent, etc.',
        ],
      },
    ],
  },
];
