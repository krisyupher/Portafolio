# Portafolio - Full-Stack Software Developer Portfolio

A modern, responsive portfolio application built with Angular 20, TypeScript, and Tailwind CSS showcasing professional projects, experience, and technical skills.

**Live Demo:** [cortesuprema.gov.co](https://cortesuprema.gov.co)

## 📋 About

This portfolio showcases 4+ years of Full-Stack development experience delivering high-impact web applications for government and enterprise clients. Built with modern Angular 20+ patterns including signals, standalone components, and reactive state management.

**Key Achievements:**

- 🚀 Reduced search query time from minutes to milliseconds
- 📊 Supported 80% process digitalization reducing case processing from 4 months to 10 days
- 🎯 40% website performance improvement through custom CMS implementation
- 💼 Delivered mission-critical applications for government and banking institutions

## 🛠️ Tech Stack

### Frontend

- **Framework:** Angular 20.2+
- **Language:** TypeScript 5.4+
- **State Management:** Angular Signals
- **Styling:** Tailwind CSS 3.x + SCSS
- **Architecture:** Scope Rule Pattern with Standalone Components

### Backend/Services

- **Node.js & Express.js**
- **.NET Core**
- **REST APIs & GraphQL**

### Database

- **PostgreSQL**
- **MongoDB**
- **Redis**

### DevOps & Cloud

- **Azure**
- **Docker**
- **Firebase**
- **Git & GitHub**

## 🏗️ Architecture

### Project Structure

```
src/
├── app/
│   ├── app.ts                          # Root component
│   ├── app.config.ts                   # Application configuration
│   ├── routes.ts                        # Routing configuration
│   │
│   ├── core/                            # GLOBAL - Singleton services
│   │   ├── services/
│   │   ├── interceptors/
│   │   └── guards/
│   │
│   ├── features/                        # Feature modules
│   │   ├── portfolio-management/        # Portfolio feature
│   │   │   ├── portfolio-management.ts  # Smart container
│   │   │   ├── components/              # Presentational components
│   │   │   ├── services/                # Feature services
│   │   │   └── models.ts
│   │   │
│   │   └── about-management/            # About feature
│   │       ├── about-management.ts      # Smart container
│   │       ├── components/              # Presentational components
│   │       ├── services/                # Feature services
│   │       └── models.ts
│   │
│   └── shared/                          # GLOBAL - Shared resources
│       ├── components/                  # Header, Footer
│       └── models/                      # Shared interfaces
│
├── assets/
│   ├── data/                            # JSON data files
│   │   ├── works.json                   # Portfolio projects
│   │   └── about.json                   # Professional info
│   └── img/                             # Images
│
└── styles.scss                          # Global styles
```

### Design Patterns

- **Container/Presentational Pattern** - Smart containers manage state, dumb presentationals display UI
- **Signals-based State Management** - Modern Angular 20 reactive state with `signal()`, `computed()`, and `effect()`
- **Standalone Components** - No NgModules, composition-based architecture
- **Scope Rule Architecture** - Clear separation between GLOBAL (core/shared) and LOCAL (feature-specific) code

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm 9+

### Installation

```bash
# Clone the repository
git clone https://github.com/krisyupher/portafolio.git

# Install dependencies
cd portafolio
npm install
```

### Development

```bash
# Start development server
npm start

# Navigate to http://localhost:4200/
# Application automatically reloads on code changes
```

### Build

```bash
# Build for production
npm run build

# Output stored in docs/
```

### Testing

```bash
# Run unit tests
npm test

# Run tests in watch mode
npm test -- --watch

# Generate coverage report
npm test -- --no-watch --code-coverage
```

## 📁 Features

### Portfolio Section

- Displays 14+ professional projects with detailed information
- Grid layout with responsive design
- Modal dialogs for project details
- Live project links and GitHub repositories
- Search and filtering capabilities

### About Section

- Professional profile with summary
- 6 skill categories (Frontend, Backend, Database, DevOps, Testing, Methodologies)
- Professional experience timeline (3 major positions)
- Education history
- Proficiency levels for each skill

### Navigation

- Sticky header with smooth scrolling
- Responsive navigation menu
- Mobile-friendly hamburger menu
- Footer with social links and quick navigation

## 📊 Key Metrics

- **Project Bundle Size:** 282 KB (gzipped: 76 KB)
- **Performance Score:** Optimized with OnPush change detection
- **Test Coverage:** 93%+ on services, 100% on factories
- **Accessibility:** WCAG 2.1 AA compliance target
- **Responsive:** Mobile-first design (480px, 768px, 1024px breakpoints)

## 🔄 Routing

```
/              → Redirects to /home
/home          → About section
/portfolio     → Portfolio projects
/about         → About section
/**            → Redirects to /home (wildcard)
```

## 📦 Data Structure

### Portfolio Projects (`assets/data/works.json`)

```json
{
  "id": "unique-id",
  "title": "Project Title",
  "poster": "assets/img/project.png",
  "description": "Project description",
  "linkView": "https://live-project-link.com",
  "date": "MMM YYYY",
  "Link": "https://github.com/link"
}
```

### Professional Info (`assets/data/about.json`)

Contains:

- `aboutInfo` - Profile information and bio
- `skillCategories` - Skills organized by category
- `experience` - Work experience timeline
- `education` - Education history

## 🎨 Styling

- **Framework:** Tailwind CSS 3.x
- **Preprocessor:** SCSS
- **Custom Colors:** Regal blue (#034378), San Juan (#77d7b9), Bermuda colors
- **Responsive Design:** Mobile-first approach with media queries
- **Component Styles:** Scoped SCSS per component

## ✅ Quality Assurance

### Testing

- Unit tests with Jasmine/Karma
- Mock data factory for consistent test data
- 93%+ test coverage on service layer
- Component integration tests

### Code Quality

- TypeScript strict mode enabled
- ESLint for code linting
- Prettier for code formatting
- Conventional commits for git history

### Performance

- OnPush change detection on all components
- Lazy loading routes (when applicable)
- Tree-shaking optimization
- SCSS budget monitoring

## 🔐 Security

- No hardcoded credentials
- Environment-based configuration
- Content Security Policy ready
- XSS and CSRF protection via Angular

## 📱 Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers (iOS Safari 12+, Chrome Mobile)

## 📝 Git Workflow

Follows [Conventional Commits](https://www.conventionalcommits.org/) specification:

```bash
feat(component): add new feature
fix(service): resolve bug
docs(readme): update documentation
style(css): fix formatting
refactor(code): improve structure
perf(optimization): improve performance
test(unit): add unit tests
chore(build): update dependencies
```

## 🔗 Links

- **GitHub:** [github.com/krisyupher](https://github.com/krisyupher)
- **LinkedIn:** [linkedin.com/in/ccflorezrud](https://www.linkedin.com/in/ccflorezrud/)
- **Email:** ccflorezrud@gmail.com

## 📄 License

This project is personal portfolio content. Respect copyright and licensing.

## 🤝 Contributing

This is a personal portfolio project. To contribute:

1. Fork the repository
2. Create a feature branch (`git checkout -b feat/amazing-feature`)
3. Commit changes (`git commit -m 'feat: add amazing feature'`)
4. Push to branch (`git push origin feat/amazing-feature`)
5. Open a Pull Request

## 📞 Contact

Feel free to reach out for collaboration or inquiries:

- **Email:** ccflorezrud@gmail.com
- **LinkedIn:** [ccflorezrud](https://www.linkedin.com/in/ccflorezrud/)
- **GitHub:** [@krisyupher](https://github.com/krisyupher)

---

**Last Updated:** November 28, 2025
**Angular Version:** 20.2+
**Status:** Production Ready ✅
