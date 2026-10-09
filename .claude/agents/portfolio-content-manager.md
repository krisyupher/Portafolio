---
name: portfolio-content-manager
description: Manages portfolio content data (works.json, about.json, filosofyData.ts). Handles adding/editing projects, skills, experience, education, and philosophy sections.
tools: [read, write, edit, glob, grep, shell]
---

# Portfolio Content Manager Agent

## Data Files Overview

| File | Purpose | Auto-Reload |
|------|---------|-------------|
| `src/assets/data/works.json` | 18 portfolio projects | ✅ PortfolioPage fetches on mount |
| `src/assets/data/about.json` | Professional info, skills, experience, education | ✅ AboutPage fetches on mount |
| `src/data/filosofyData.ts` | 7 philosophy sections with code examples | ❌ Static import (restart dev server) |

---

## 1. Portfolio Projects (`works.json`)

### Schema (matches `Work` interface)
```json
{
  "id": "unique-kebab-case",
  "title": "Project Display Name",
  "poster": "../assets/img/project-image.png",
  "description": "Detailed project description with architecture, impact, challenges.",
  "linkView": "https://live-demo-url.com",
  "date": "MMM YYYY",
  "Link": "https://github.com/org/repo",
  "category": "Enterprise|FullStack|Frontend|AI & Tools",
  "technologies": ["React", "TypeScript", "Node.js", "PostgreSQL"],
  "highlights": [
    "Quantified achievement (e.g., 40% performance improvement)",
    "Scale metric (e.g., 500k+ records processed)",
    "Technical innovation (e.g., custom caching layer)"
  ],
  "featured": true
}
```

### Categories (used in filter chips)
| Category | Description | Example Projects |
|----------|-------------|------------------|
| `Enterprise` | Government/large org systems | Corte Suprema, Supremo Buscador, ESAV |
| `FullStack` | End-to-end applications | Davivienda, TuAp, Node/Express API |
| `Frontend` | UI-focused, client-side | Movie Searcher, Countries, Tic-Tac-Toe |
| `AI & Tools` | AI/ML, dev tools, simulations | Lumina Red, Pendulum, Clock |

### Adding a New Project
1. **Add image** to `src/assets/img/` (recommend: 16:9, < 500 KB, WebP preferred)
2. **Edit `works.json`** — append to array with new object
3. **No code changes** — `PortfolioPage` loads dynamically
4. **Verify** at `/portfolio` — appears in grid, filterable by category

### Example: Adding a New Enterprise Project
```json
{
  "id": "new-gov-platform",
  "title": "New Government Platform",
  "poster": "../assets/img/new-gov-platform.png",
  "description": "Built a secure citizen portal serving 2M+ users with real-time data sync...",
  "linkView": "https://new-gov-platform.gov.co",
  "date": "OCT 2026",
  "Link": "https://github.com/krisyupher/new-gov-platform",
  "category": "Enterprise",
  "technologies": ["Angular 19", "TypeScript", "Node.js", "PostgreSQL", "Redis", "Docker", "Azure"],
  "highlights": [
    "99.9% uptime SLA achieved",
    "Sub-100ms API response times",
    "WCAG 2.1 AA certified"
  ],
  "featured": true
}
```

---

## 2. Professional Info (`about.json`)

### Schema
```json
{
  "aboutInfo": {
    "name": "Cristian Florez",
    "title": "Full-Stack Software Engineer & Architect",
    "bio": "Full-stack developer passionate about creating impactful web applications...",
    "focus": "Scalable frontend architectures, high-performance search systems, and cloud-native backend solutions for enterprise and government clients.",
    "profileImage": "../assets/img/profile-photo.jpg"
  },
  "skillCategories": [
    {
      "name": "Frontend",
      "skills": [
        { "id": "react", "name": "React 19", "proficiency": "Expert" },
        { "id": "typescript", "name": "TypeScript", "proficiency": "Expert" },
        { "id": "angular", "name": "Angular 20", "proficiency": "Advanced" }
      ]
    }
  ],
  "experience": [
    {
      "id": "corte-suprema",
      "title": "Senior Full-Stack Engineer",
      "company": "Corte Suprema de Justicia",
      "startDate": "2022",
      "endDate": "Present",
      "description": "Leading modernization of Colombia's judicial digital ecosystem...",
      "technologies": ["Angular", "TypeScript", "Node.js", ".NET", "PostgreSQL", "Elasticsearch", "Docker", "Azure"]
    }
  ],
  "education": [
    {
      "id": "systems-engineering",
      "degree": "Systems Engineering",
      "institution": "Universidad Distrital Francisco José de Caldas",
      "graduationYear": "2020",
      "field": "Computer Science",
      "description": "Focus on software architecture, databases, and distributed systems."
    }
  ]
}
```

### Proficiency Levels (used in `AboutSkills`)
| Level | Percentage | Badge Color |
|-------|------------|-------------|
| `Expert` | 95% | Emerald |
| `Advanced` | 85% | Blue |
| `Intermediate` | 70% | Amber |
| `Beginner` | 60% | Slate |

### Skill Icons (auto-mapped in `AboutSkills.tsx`)
```typescript
const getSkillIcon = (id: string) => {
  const map: Record<string, string> = {
    angular: 'fa-brands fa-angular text-red-600',
    typescript: 'fa-solid fa-code text-blue-600',
    react: 'fa-brands fa-react text-cyan-500',
    nodejs: 'fa-brands fa-node-js text-emerald-600',
    postgresql: 'fa-solid fa-database text-blue-700',
    docker: 'fa-brands fa-docker text-blue-500',
    aws: 'fa-brands fa-aws text-amber-500',
    azure: 'fa-brands fa-microsoft text-blue-500',
    // ... add new skills here
  };
  return map[id] || 'fa-solid fa-check text-bermuda';
};
```

### Updating Professional Info
1. **Edit `about.json`** — modify any section
2. **No code changes** — `AboutPage` loads dynamically
3. **Verify** at `/home` or `/about`

---

## 3. Philosophy Sections (`filosofyData.ts`)

### Structure
```typescript
// src/data/filosofyData.ts
export const FILOSOFY_SECTIONS: Section[] = [
  {
    id: 'architecture',
    title: 'Modern Web & React Project Architecture',
    subsections: [
      { title: 'Directory Structure', description: '...', example: '```\nsrc/\n├── ...\n```' },
      { title: 'Core Principles', items: ['Principle 1', 'Principle 2'] },
    ],
  },
  // ... 6 more sections
];
```

### Section IDs (used in sidebar navigation + icons)
| ID | Title | Icon |
|----|-------|------|
| `architecture` | Modern Web & React Project Architecture | `fa-sitemap` |
| `state-management` | React State Management & Reactivity | `fa-diagram-project` |
| `tdd` | Test-Driven Development (TDD) | `fa-vial-circle-check` |
| `eslint-prettier` | ESLint and Prettier | `fa-wand-magic-sparkles` |
| `git-workflow` | Git Workflow and Conventional Commits | `fa-code-branch` |
| `tools` | Modern React & Vite Development Tools | `fa-screwdriver-wrench` |
| `best-practices` | React 19 Best Practices | `fa-award` |

### Adding a New Section
1. **Add to `FILOSOFY_SECTIONS`** in `filosofyData.ts`
2. **Add icon mapping** in `FilosofyPage.tsx` → `SECTION_ICONS`
3. **Restart dev server** (static import)
4. **Verify** at `/filosofy` — appears in sidebar

### Code Example Format
```typescript
example: `export function useFetchData<T>(url: string) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;
    fetch(url)
      .then(res => { if (!res.ok) throw new Error(\`Failed: \${url}\`); return res.json(); })
      .then(result => { if (isMounted) { setData(result); setLoading(false); } })
      .catch(err => { if (isMounted) { setError(err.message); setLoading(false); } });
    return () => { isMounted = false; };
  }, [url]);

  return { data, loading, error };
}`,
```

---

## Content Workflow

### Quick Updates (No Code Changes)
| Content | File | Reload |
|---------|------|--------|
| Add/edit project | `works.json` | Auto |
| Update bio/skills/experience/education | `about.json` | Auto |
| Fix typo in project description | `works.json` | Auto |

### Structural Changes (Code Changes Needed)
| Change | Files |
|--------|-------|
| New project category | `works.json` + `PortfolioPage.tsx` (CATEGORIES array) |
| New skill proficiency level | `about.json` + `AboutSkills.tsx` (getProficiencyPercentage) |
| New philosophy section | `filosofyData.ts` + `FilosofyPage.tsx` (SECTION_ICONS) |
| New data field in Work | `types/index.ts` + `works.json` + components |

---

## Image Guidelines

### Project Posters (`src/assets/img/`)
- **Aspect ratio**: 16:9 (e.g., 1920×1080, 1280×720)
- **Format**: WebP preferred, PNG/JPG acceptable
- **Size**: < 500 KB each (optimize with TinyPNG/Squoosh)
- **Naming**: `kebab-case.png` matching `work.id`

### Profile Photo
- **Path**: `aboutInfo.profileImage` in `about.json`
- **Aspect**: 1:1 (square)
- **Size**: < 200 KB

---

## Validation Checklist

Before committing content changes:
- [ ] JSON syntax valid (no trailing commas, proper quoting)
- [ ] All required fields present per schema
- [ ] `id` fields unique across arrays
- [ ] Image paths correct (`../assets/img/...`)
- [ ] URLs accessible (live demo, GitHub)
- [ ] Dates in `MMM YYYY` format
- [ ] Categories match filter chips exactly
- [ ] Technologies array not empty
- [ ] Highlights array not empty for featured projects