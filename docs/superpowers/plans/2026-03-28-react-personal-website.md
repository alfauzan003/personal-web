# Personal Website React Redesign — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild the static HTML personal portfolio into a clean, minimal React SPA that attracts recruiters.

**Architecture:** Two routes — `/` (scrollable Home page) and `/projects/:slug` (data-driven detail page). All content lives in `src/data/` files; components are purely presentational. The existing static HTML files are fully replaced.

**Tech Stack:** Vite 5, React 18, React Router v6, shadcn/ui (Radix UI + Tailwind CSS v3), Framer Motion 11, Lucide React, React Icons

---

## File Map

| File | Responsibility |
|---|---|
| `package.json` | Dependencies + scripts |
| `vite.config.js` | Vite build config + `@/` path alias |
| `jsconfig.json` | Editor path alias support |
| `index.html` | Vite entry HTML (replaces old static file) |
| `tailwind.config.js` | Tailwind theme (Inter font, CSS variables, 1100px max-width) |
| `postcss.config.js` | PostCSS config for Tailwind |
| `components.json` | shadcn/ui config |
| `src/index.css` | Tailwind directives + shadcn CSS variables |
| `src/main.jsx` | React root mount with BrowserRouter |
| `src/App.jsx` | Route definitions |
| `src/lib/utils.js` | `cn()` helper (clsx + tailwind-merge) |
| `src/data/projects.js` | 6 project objects + `getProjectBySlug()` |
| `src/data/experience.js` | 4 experience entries |
| `src/components/Navbar.jsx` | Sticky nav, scroll-aware bg, mobile menu |
| `src/components/Footer.jsx` | Social links + email + copyright |
| `src/components/SectionWrapper.jsx` | Framer Motion fade-in-up wrapper for sections |
| `src/components/ExperienceItem.jsx` | Single timeline entry (role, bullets, badges) |
| `src/components/ProjectCard.jsx` | Portfolio grid card (image, tags, link) |
| `src/components/sections/Hero.jsx` | Hero section |
| `src/components/sections/About.jsx` | About section |
| `src/components/sections/Experience.jsx` | Experience timeline section |
| `src/components/sections/Skills.jsx` | Skills grouped badge grid |
| `src/components/sections/Portfolio.jsx` | Filterable project grid |
| `src/pages/Home.jsx` | Assembles all Home sections |
| `src/pages/ProjectDetail.jsx` | Project detail driven by projects.js |
| `src/components/ui/` | shadcn/ui primitives (added via CLI) |
| `public/assets/img/` | Images moved from `assets/img/` |

---

### Task 1: Scaffold Vite + React project

**Files:**
- Create: `package.json`
- Create: `vite.config.js`
- Create: `jsconfig.json`
- Create: `index.html`

- [ ] **Step 1: Create `package.json`**

```json
{
  "name": "personal-web",
  "private": true,
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview",
    "test": "vitest"
  },
  "dependencies": {
    "class-variance-authority": "^0.7.0",
    "clsx": "^2.1.1",
    "framer-motion": "^11.3.0",
    "lucide-react": "^0.400.0",
    "react": "^18.3.1",
    "react-dom": "^18.3.1",
    "react-icons": "^5.2.0",
    "react-router-dom": "^6.26.0",
    "tailwind-merge": "^2.4.0"
  },
  "devDependencies": {
    "@vitejs/plugin-react": "^4.3.1",
    "autoprefixer": "^10.4.19",
    "postcss": "^8.4.40",
    "tailwindcss": "^3.4.9",
    "vite": "^5.3.5",
    "vitest": "^2.0.5"
  }
}
```

- [ ] **Step 2: Create `vite.config.js`**

```js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { fileURLToPath, URL } from 'node:url'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  test: {
    environment: 'node',
  },
})
```

- [ ] **Step 3: Create `jsconfig.json`**

```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```

- [ ] **Step 4: Create `index.html`** (replaces existing static HTML)

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/png" href="/assets/img/favicon.png" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="description" content="Habib Al Fauzan — Software Engineer, Cloud, Data" />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
    <title>Habib Al Fauzan</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>
```

- [ ] **Step 5: Install dependencies**

```bash
npm install
```

Expected: `node_modules/` created, no errors.

- [ ] **Step 6: Move existing image assets to public folder**

```bash
mkdir -p public/assets/img
cp -r assets/img/* public/assets/img/
```

Expected: `public/assets/img/` contains portfolio images, profile photo, favicon, and skill icons.

Also place your CV PDF at `public/assets/cv.pdf` — the Resume/Download CV buttons link to this path.

- [ ] **Step 7: Commit**

```bash
git add package.json vite.config.js jsconfig.json index.html public/
git commit -m "feat: scaffold Vite + React project"
```

---

### Task 2: Configure Tailwind CSS

**Files:**
- Create: `tailwind.config.js`
- Create: `postcss.config.js`
- Create: `src/index.css`

- [ ] **Step 1: Create `tailwind.config.js`**

```js
/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ['class'],
  content: [
    './index.html',
    './src/**/*.{js,jsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      maxWidth: {
        content: '1100px',
      },
    },
  },
  plugins: [],
}
```

- [ ] **Step 2: Create `postcss.config.js`**

```js
export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}
```

- [ ] **Step 3: Create `src/index.css`**

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    --background: 0 0% 100%;
    --foreground: 222.2 84% 4.9%;
    --card: 0 0% 100%;
    --card-foreground: 222.2 84% 4.9%;
    --primary: 221.2 83.2% 53.3%;
    --primary-foreground: 210 40% 98%;
    --secondary: 210 40% 96.1%;
    --secondary-foreground: 222.2 47.4% 11.2%;
    --muted: 210 40% 96.1%;
    --muted-foreground: 215.4 16.3% 46.9%;
    --accent: 210 40% 96.1%;
    --accent-foreground: 222.2 47.4% 11.2%;
    --border: 214.3 31.8% 91.4%;
    --input: 214.3 31.8% 91.4%;
    --ring: 221.2 83.2% 53.3%;
    --radius: 0.5rem;
  }

  * {
    @apply border-border;
  }

  body {
    @apply bg-background text-foreground font-sans antialiased;
  }

  html {
    scroll-behavior: smooth;
  }
}
```

- [ ] **Step 4: Create minimal `src/main.jsx` and `src/App.jsx` to verify Tailwind loads**

`src/main.jsx`:
```jsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
```

`src/App.jsx`:
```jsx
export default function App() {
  return <div className="min-h-screen bg-white p-8 text-slate-900 font-sans">Tailwind works</div>
}
```

- [ ] **Step 5: Verify Tailwind works**

```bash
npm run dev
```

Expected: page at `http://localhost:5173` shows "Tailwind works" in Inter font on a white background, no console errors.

- [ ] **Step 6: Commit**

```bash
git add tailwind.config.js postcss.config.js src/index.css src/main.jsx src/App.jsx
git commit -m "feat: configure Tailwind CSS"
```

---

### Task 3: Set up shadcn/ui

**Files:**
- Create: `components.json`
- Create: `src/lib/utils.js`
- Create: `src/components/ui/button.jsx` (via CLI)
- Create: `src/components/ui/badge.jsx` (via CLI)
- Create: `src/components/ui/card.jsx` (via CLI)
- Create: `src/components/ui/separator.jsx` (via CLI)
- Create: `src/components/ui/avatar.jsx` (via CLI)

- [ ] **Step 1: Create `components.json`**

```json
{
  "$schema": "https://ui.shadcn.com/schema.json",
  "style": "default",
  "rsc": false,
  "tsx": false,
  "tailwind": {
    "config": "tailwind.config.js",
    "css": "src/index.css",
    "baseColor": "slate",
    "cssVariables": true,
    "prefix": ""
  },
  "aliases": {
    "components": "src/components",
    "utils": "src/lib/utils",
    "ui": "src/components/ui",
    "lib": "src/lib",
    "hooks": "src/hooks"
  }
}
```

- [ ] **Step 2: Create `src/lib/utils.js`**

```js
import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs) {
  return twMerge(clsx(inputs))
}
```

- [ ] **Step 3: Add shadcn/ui components via CLI**

```bash
npx shadcn@latest add button badge card separator avatar
```

Expected output:
```
✔ Installing dependencies.
✔ Created src/components/ui/button.jsx
✔ Created src/components/ui/badge.jsx
✔ Created src/components/ui/card.jsx
✔ Created src/components/ui/separator.jsx
✔ Created src/components/ui/avatar.jsx
```

If prompted about overwriting files, choose yes.

- [ ] **Step 4: Commit**

```bash
git add components.json src/lib/ src/components/ui/
git commit -m "feat: add shadcn/ui components"
```

---

### Task 4: Create data files

**Files:**
- Create: `src/data/projects.js`
- Create: `src/data/projects.test.js`
- Create: `src/data/experience.js`

- [ ] **Step 1: Create `src/data/projects.js`**

```js
export const projects = [
  {
    slug: 'rental-mobil',
    title: 'Rental Mobil',
    category: 'web',
    thumbnail: '/assets/img/portfolio/portfolio-1.png',
    techStack: ['PHP', 'Laravel', 'MySQL', 'Bootstrap'],
    overview:
      'A full-featured car rental web application that allows customers to browse available vehicles, make reservations, and manage bookings online.',
    problem:
      'Traditional car rental businesses managed bookings manually through phone calls and paper records, leading to double bookings, missed reservations, and poor customer experience.',
    solution:
      'Built a web application that centralises the booking process. Customers can view real-time vehicle availability, submit reservations, and receive confirmation — eliminating manual coordination.',
    architecture:
      'MVC architecture using Laravel. MySQL stores vehicle inventory, bookings, and customer data. Server-side rendered views with Blade templates. Authentication via Laravel Sanctum.',
    results:
      'Eliminated double-booking incidents. Reduced administrative overhead for managing reservations. Provided customers with self-service booking capability 24/7.',
    media: [{ type: 'image', url: '/assets/img/portfolio/portfolio-1.png' }],
    github: null,
    demo: null,
  },
  {
    slug: 'sistem-informasi-akademik',
    title: 'Sistem Informasi Akademik',
    category: 'web',
    thumbnail: '/assets/img/portfolio/portfolio-2.png',
    techStack: ['PHP', 'MySQL', 'Bootstrap', 'JavaScript'],
    overview:
      'An academic information system for managing student data, course schedules, grade records, and faculty administration in a university setting.',
    problem:
      'Academic administration was fragmented across spreadsheets and manual processes, making it difficult to track student progress, generate reports, and coordinate between departments.',
    solution:
      'Developed a centralised web platform where admins manage course data, faculty enter grades, and students view their academic records — all in one system.',
    architecture:
      'PHP backend with MySQL relational database. Role-based access control for admin, faculty, and student roles. Dynamic tables and reporting built with DataTables.js.',
    results:
      'Consolidated academic data into a single source of truth. Reduced report generation time significantly. Enabled secure, role-based access for all stakeholders.',
    media: [{ type: 'image', url: '/assets/img/portfolio/portfolio-2.png' }],
    github: null,
    demo: null,
  },
  {
    slug: 'calory-in-api',
    title: 'CaloryIn API',
    category: 'backend',
    thumbnail: '/assets/img/portfolio/portfolio-3.png',
    techStack: ['Node.js', 'ExpressJS', 'Google Cloud Platform', 'Firestore', 'App Engine'],
    overview:
      'RESTful API backend for CaloryIn, a mobile app that helps users track daily calorie intake. Built as the capstone project for Bangkit Academy 2023.',
    problem:
      'The mobile team needed a scalable, cloud-hosted API to handle user authentication, food data lookup, and daily calorie logging — with reliable uptime for a multi-team capstone submission.',
    solution:
      'Designed and deployed a RESTful API using ExpressJS hosted on GCP App Engine. Used Firestore as a NoSQL database for fast reads/writes. Integrated with a machine learning model for food recognition.',
    architecture:
      'ExpressJS REST API deployed on GCP App Engine. Firestore for user data and food logs. Cloud Storage for food image uploads. Stateless, JWT-authenticated endpoints: /auth, /food, /log.',
    results:
      'Successfully deployed and demonstrated to Bangkit Academy reviewers. API handled concurrent requests from the mobile team with zero downtime during the demo period.',
    media: [{ type: 'image', url: '/assets/img/portfolio/portfolio-3.png' }],
    github: null,
    demo: null,
  },
  {
    slug: 'flutter-news-app',
    title: 'Flutter News App',
    category: 'android',
    thumbnail: '/assets/img/portfolio/portfolio-4.png',
    techStack: ['Flutter', 'Dart', 'REST API', 'Provider'],
    overview:
      'A cross-platform mobile news application built with Flutter that fetches and displays real-time news articles from a public news API.',
    problem:
      'Needed a hands-on project to develop mobile skills — specifically state management, REST API consumption, and building responsive UI in Flutter.',
    solution:
      'Built a news app that consumes a public news API, organises articles by category, and presents them in a clean scrollable feed. Implemented Provider for state management.',
    architecture:
      'Flutter app with Provider pattern for state. HTTP package for API calls. Separate data (repositories), logic (providers), and UI (screens/widgets) layers. Supports Android and iOS from a single codebase.',
    results:
      'Functional app with category filtering, article detail view, and smooth scroll performance. Solidified understanding of Flutter widget lifecycle and async data fetching.',
    media: [{ type: 'image', url: '/assets/img/portfolio/portfolio-4.png' }],
    github: null,
    demo: null,
  },
  {
    slug: 'flutter-movies-app',
    title: 'Flutter Movies App',
    category: 'android',
    thumbnail: '/assets/img/portfolio/portfolio-5.jpg',
    techStack: ['Flutter', 'Dart', 'TMDB API', 'BLoC'],
    overview:
      'A mobile movie discovery app integrating with The Movie Database (TMDB) API to display trending movies, search titles, and show detailed film information.',
    problem:
      'Wanted to deepen Flutter skills by tackling a more complex state management scenario — handling search, pagination, and multiple concurrent API calls.',
    solution:
      'Built using the BLoC pattern for predictable state management. Implemented debounced search, infinite scroll for movie lists, and a detail screen with cast info.',
    architecture:
      'Flutter + BLoC pattern. TMDB REST API as data source. Repository layer abstracts API calls from business logic. Dio package for HTTP with interceptors for API key injection.',
    results:
      'Smooth search and browse experience with proper loading and error states. Demonstrated advanced Flutter patterns (BLoC, repository pattern) applicable to production-scale apps.',
    media: [{ type: 'image', url: '/assets/img/portfolio/portfolio-5.jpg' }],
    github: null,
    demo: null,
  },
  {
    slug: 'house-price-prediction',
    title: 'House Price Prediction',
    category: 'data',
    thumbnail: '/assets/img/portfolio/portfolio-6.png',
    techStack: ['Python', 'Scikit-learn', 'Pandas', 'Matplotlib', 'Jupyter'],
    overview:
      'A machine learning project that predicts house prices based on property features such as location, size, number of rooms, and age — using regression models trained on real estate data.',
    problem:
      'House pricing is complex and opaque. Buyers and sellers lack data-driven tools to estimate fair market value, leading to mispricing and slow negotiations.',
    solution:
      'Trained and compared multiple regression models (Linear Regression, Random Forest, Gradient Boosting) on a cleaned real estate dataset. Selected the best-performing model based on RMSE and R² metrics.',
    architecture:
      'Python ML pipeline: data ingestion → EDA → preprocessing (encoding, scaling) → model training → evaluation. Joblib for model serialisation. Jupyter notebooks for full reproducibility.',
    results:
      'Gradient Boosting model achieved the best performance. Identified top price predictors (location, floor area, proximity to amenities). Visualisations communicated feature importance clearly to non-technical stakeholders.',
    media: [{ type: 'image', url: '/assets/img/portfolio/portfolio-6.png' }],
    github: null,
    demo: null,
  },
]

export function getProjectBySlug(slug) {
  return projects.find((p) => p.slug === slug) ?? null
}
```

- [ ] **Step 2: Write a test for the data utilities**

Create `src/data/projects.test.js`:

```js
import { describe, it, expect } from 'vitest'
import { projects, getProjectBySlug } from './projects'

describe('projects data', () => {
  it('has 6 projects', () => {
    expect(projects).toHaveLength(6)
  })

  it('every project has required fields', () => {
    for (const p of projects) {
      expect(p.slug).toBeTruthy()
      expect(p.title).toBeTruthy()
      expect(p.category).toMatch(/^(web|backend|android|data)$/)
      expect(Array.isArray(p.techStack)).toBe(true)
      expect(p.techStack.length).toBeGreaterThan(0)
    }
  })

  it('getProjectBySlug returns matching project', () => {
    const p = getProjectBySlug('calory-in-api')
    expect(p).not.toBeNull()
    expect(p.title).toBe('CaloryIn API')
  })

  it('getProjectBySlug returns null for unknown slug', () => {
    expect(getProjectBySlug('does-not-exist')).toBeNull()
  })
})
```

- [ ] **Step 3: Run tests**

```bash
npm test
```

Expected:
```
✓ src/data/projects.test.js (4)
  ✓ has 6 projects
  ✓ every project has required fields
  ✓ getProjectBySlug returns matching project
  ✓ getProjectBySlug returns null for unknown slug

Test Files  1 passed (1)
Tests       4 passed (4)
```

- [ ] **Step 4: Create `src/data/experience.js`**

```js
export const experiences = [
  {
    company: 'LG Sinar Mas',
    role: 'Software Engineer',
    period: 'Dec 2024 – Present',
    location: 'Jakarta, Indonesia',
    bullets: [
      'Contribute to smart factory systems for EV battery manufacturing, deployed across multiple countries.',
      'Maintain Equipment Interface logic ensuring seamless data flow from factory equipment to upper-level systems.',
      'Develop HMI web interfaces to monitor real-time equipment state across the factory floor.',
    ],
    skills: ['C#', 'Java', 'Web Development', 'Smart Factory'],
  },
  {
    company: 'PT United Tractors Tbk',
    role: 'Backend Developer Intern',
    period: 'Feb 2024 – Jun 2024',
    location: 'Jakarta, Indonesia',
    bullets: [
      'Built an annual schedule generator handling 3,000+ events per year, replacing a manual process.',
      'Developed the application with Flask and SQLite, delivering measurable efficiency improvements.',
      'Enhanced data query performance and improved UI responsiveness for end-users.',
    ],
    skills: ['Python', 'Flask', 'SQLite', 'Data Analysis'],
  },
  {
    company: 'Rakamin Academy',
    role: 'Data Science Intern',
    period: 'Oct 2023',
    location: 'Remote',
    bullets: [
      'Cleaned and preprocessed large sales datasets to ensure data integrity for analysis.',
      'Implemented ML models for sales forecasting and customer segmentation.',
      'Conducted clustering analysis to identify distinct customer groups, enabling targeted marketing strategies.',
    ],
    skills: ['Python', 'Machine Learning', 'Scikit-learn', 'Data Analysis'],
  },
  {
    company: 'Bangkit Academy',
    role: 'Cloud Computing Cohort',
    period: 'Feb 2023 – Jul 2023',
    location: 'Remote',
    bullets: [
      'Developed REST APIs for the capstone project using ExpressJS.',
      'Gained hands-on expertise with GCP: Compute Engine, App Engine, Cloud Storage, Firestore.',
      'Collaborated across disciplines (ML, mobile, cloud) to ship a full-stack capstone product.',
    ],
    skills: ['GCP', 'Node.js', 'ExpressJS', 'Cloud Architecture'],
  },
]
```

- [ ] **Step 5: Commit**

```bash
git add src/data/
git commit -m "feat: add projects and experience data files"
```

---

### Task 5: App shell and routing

**Files:**
- Modify: `src/main.jsx`
- Modify: `src/App.jsx`
- Create: `src/pages/Home.jsx` (stub)
- Create: `src/pages/ProjectDetail.jsx` (stub)

- [ ] **Step 1: Update `src/main.jsx` to add BrowserRouter**

```jsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
)
```

- [ ] **Step 2: Update `src/App.jsx` with routes**

```jsx
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import ProjectDetail from './pages/ProjectDetail'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/projects/:slug" element={<ProjectDetail />} />
    </Routes>
  )
}
```

- [ ] **Step 3: Create stub `src/pages/Home.jsx`**

```jsx
export default function Home() {
  return <div className="min-h-screen p-8">Home — sections coming soon</div>
}
```

- [ ] **Step 4: Create stub `src/pages/ProjectDetail.jsx`**

```jsx
import { useParams } from 'react-router-dom'

export default function ProjectDetail() {
  const { slug } = useParams()
  return <div className="min-h-screen p-8">Project: {slug}</div>
}
```

- [ ] **Step 5: Verify routing**

```bash
npm run dev
```

- `http://localhost:5173` → "Home — sections coming soon"
- `http://localhost:5173/projects/test` → "Project: test"

- [ ] **Step 6: Commit**

```bash
git add src/main.jsx src/App.jsx src/pages/
git commit -m "feat: set up React Router with Home and ProjectDetail routes"
```

---

### Task 6: Navbar component

**Files:**
- Create: `src/components/Navbar.jsx`

- [ ] **Step 1: Create `src/components/Navbar.jsx`**

```jsx
import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Button } from '@/components/ui/button'

const NAV_LINKS = [
  { label: 'About', href: '#about' },
  { label: 'Experience', href: '#experience' },
  { label: 'Skills', href: '#skills' },
  { label: 'Portfolio', href: '#portfolio' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()
  const isHome = location.pathname === '/'

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-white/95 backdrop-blur-sm shadow-sm' : 'bg-transparent'
      }`}
    >
      <div className="max-w-content mx-auto px-6 h-16 flex items-center justify-between">
        <Link to="/" className="font-semibold text-slate-900 text-lg tracking-tight">
          HAF<span className="text-blue-600">.</span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-6">
          {isHome ? (
            NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm text-slate-600 hover:text-blue-600 transition-colors"
              >
                {link.label}
              </a>
            ))
          ) : (
            <Link
              to="/"
              className="text-sm text-slate-600 hover:text-blue-600 transition-colors"
            >
              ← Back to Portfolio
            </Link>
          )}
          <Button asChild size="sm">
            <a href="/assets/cv.pdf" target="_blank" rel="noopener noreferrer">
              Resume
            </a>
          </Button>
        </nav>

        {/* Mobile hamburger */}
        <button
          className="md:hidden p-2 text-slate-600"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <div className="w-5 h-0.5 bg-current mb-1.5" />
          <div className="w-5 h-0.5 bg-current mb-1.5" />
          <div className="w-5 h-0.5 bg-current" />
        </button>
      </div>

      {/* Mobile dropdown */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t border-slate-100 px-6 py-4 flex flex-col gap-4">
          {isHome ? (
            NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm text-slate-600 hover:text-blue-600"
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </a>
            ))
          ) : (
            <Link
              to="/"
              className="text-sm text-slate-600 hover:text-blue-600"
              onClick={() => setMenuOpen(false)}
            >
              ← Back to Portfolio
            </Link>
          )}
          <a
            href="/assets/cv.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-medium text-blue-600"
          >
            Resume ↗
          </a>
        </div>
      )}
    </header>
  )
}
```

- [ ] **Step 2: Add Navbar to Home stub to verify it renders**

Update `src/pages/Home.jsx`:

```jsx
import Navbar from '@/components/Navbar'

export default function Home() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="pt-16 p-8">Home — sections coming soon</div>
    </div>
  )
}
```

- [ ] **Step 3: Verify in browser**

```bash
npm run dev
```

Expected: Sticky navbar with "HAF." logo. Transparent on fresh load, white with shadow on scroll. Desktop shows 4 nav links + Resume button. Mobile (<768px) shows hamburger that opens dropdown.

- [ ] **Step 4: Commit**

```bash
git add src/components/Navbar.jsx src/pages/Home.jsx
git commit -m "feat: add sticky scroll-aware Navbar"
```

---

### Task 7: Footer component

**Files:**
- Create: `src/components/Footer.jsx`

- [ ] **Step 1: Create `src/components/Footer.jsx`**

```jsx
import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa'

const SOCIAL_LINKS = [
  { icon: FaLinkedin, href: 'https://www.linkedin.com/in/alfauzan003/', label: 'LinkedIn' },
  { icon: FaGithub, href: 'https://github.com/alfauzan003', label: 'GitHub' },
  { icon: FaTwitter, href: 'https://twitter.com/alfauzan003', label: 'Twitter' },
]

export default function Footer() {
  return (
    <footer className="border-t border-slate-100 py-10 mt-20">
      <div className="max-w-content mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-sm text-slate-500">
          <a
            href="mailto:habibalfauzan1@gmail.com"
            className="hover:text-blue-600 transition-colors"
          >
            habibalfauzan1@gmail.com
          </a>
        </p>
        <div className="flex items-center gap-4">
          {SOCIAL_LINKS.map(({ icon: Icon, href, label }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="text-slate-400 hover:text-blue-600 transition-colors"
            >
              <Icon size={20} />
            </a>
          ))}
        </div>
        <p className="text-xs text-slate-400">
          © {new Date().getFullYear()} Habib Al Fauzan
        </p>
      </div>
    </footer>
  )
}
```

Note: Update the GitHub URL (`https://github.com/alfauzan003`) to your actual GitHub profile URL before deploying.

- [ ] **Step 2: Commit**

```bash
git add src/components/Footer.jsx
git commit -m "feat: add Footer with social links and email"
```

---

### Task 8: SectionWrapper component

**Files:**
- Create: `src/components/SectionWrapper.jsx`

- [ ] **Step 1: Create `src/components/SectionWrapper.jsx`**

```jsx
import { motion } from 'framer-motion'

export default function SectionWrapper({ children, id, className = '' }) {
  return (
    <motion.section
      id={id}
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className={`py-20 ${className}`}
    >
      <div className="max-w-content mx-auto px-6">
        {children}
      </div>
    </motion.section>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/SectionWrapper.jsx
git commit -m "feat: add SectionWrapper with Framer Motion fade-in-up"
```

---

### Task 9: Hero section

**Files:**
- Create: `src/components/sections/Hero.jsx`

- [ ] **Step 1: Create `src/components/sections/Hero.jsx`**

```jsx
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa'

const SOCIAL_LINKS = [
  { icon: FaLinkedin, href: 'https://www.linkedin.com/in/alfauzan003/', label: 'LinkedIn' },
  { icon: FaGithub, href: 'https://github.com/alfauzan003', label: 'GitHub' },
  { icon: FaTwitter, href: 'https://twitter.com/alfauzan003', label: 'Twitter' },
]

export default function Hero() {
  return (
    <section className="min-h-screen flex items-center bg-white pt-16">
      <div className="max-w-content mx-auto px-6 w-full">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <p className="text-blue-600 font-medium mb-3 text-sm tracking-wide uppercase">
            Available for opportunities
          </p>
          <h1 className="text-5xl md:text-6xl font-bold text-slate-900 leading-tight mb-4">
            Habib Al Fauzan
          </h1>
          <p className="text-xl text-slate-500 mb-6 font-light">
            Software Engineer · Cloud · Data
          </p>
          <p className="text-slate-600 max-w-xl mb-8 leading-relaxed">
            Backend-focused engineer with hands-on experience building scalable systems for smart
            factory, cloud infrastructure, and data-driven applications. Currently at LG Sinar Mas,
            shipping production software across multiple countries.
          </p>
          <div className="flex flex-wrap gap-3 mb-10">
            <Button asChild size="lg">
              <a href="#portfolio">View Portfolio</a>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <a href="/assets/cv.pdf" target="_blank" rel="noopener noreferrer">
                Download CV
              </a>
            </Button>
          </div>
          <div className="flex items-center gap-4">
            {SOCIAL_LINKS.map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="text-slate-400 hover:text-blue-600 transition-colors"
              >
                <Icon size={22} />
              </a>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/sections/Hero.jsx
git commit -m "feat: add Hero section"
```

---

### Task 10: About section

**Files:**
- Create: `src/components/sections/About.jsx`

- [ ] **Step 1: Create `src/components/sections/About.jsx`**

```jsx
import SectionWrapper from '@/components/SectionWrapper'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import { MapPin, Mail, Briefcase } from 'lucide-react'

const DETAILS = [
  { icon: MapPin, label: 'Location', value: 'Yogyakarta, Indonesia' },
  {
    icon: Mail,
    label: 'Email',
    value: 'habibalfauzan1@gmail.com',
    href: 'mailto:habibalfauzan1@gmail.com',
  },
  { icon: Briefcase, label: 'Freelance', value: 'Available' },
]

export default function About() {
  return (
    <SectionWrapper id="about" className="bg-slate-50">
      <div className="grid md:grid-cols-2 gap-12 items-center">
        <div>
          <h2 className="text-3xl font-bold text-slate-900 mb-6">About Me</h2>
          <p className="text-slate-600 leading-relaxed mb-6">
            I'm a software developer specialising in backend systems and cloud infrastructure, with
            experience delivering production software in the smart manufacturing industry. I've worked
            across the stack — from Equipment Interface logic and HMI web interfaces at LG Sinar Mas,
            to REST APIs deployed on Google Cloud during Bangkit Academy.
          </p>
          <p className="text-slate-600 leading-relaxed mb-8">
            I care about writing clean, maintainable code and building systems that are reliable at
            scale. I'm actively seeking new challenges where I can continue growing as an engineer.
          </p>
          <div className="flex flex-col gap-3">
            {DETAILS.map(({ icon: Icon, label, value, href }) => (
              <div key={label} className="flex items-center gap-3 text-sm text-slate-600">
                <Icon size={16} className="text-blue-600 shrink-0" />
                <span className="font-medium text-slate-900 w-20">{label}:</span>
                {href ? (
                  <a href={href} className="hover:text-blue-600 transition-colors">
                    {value}
                  </a>
                ) : (
                  <span>{value}</span>
                )}
              </div>
            ))}
          </div>
        </div>
        <div className="flex justify-center">
          <Avatar className="w-64 h-64 ring-4 ring-blue-100">
            <AvatarImage src="/assets/img/profile-img-2.jpg" alt="Habib Al Fauzan" />
            <AvatarFallback className="text-4xl font-bold text-blue-600 bg-blue-50">
              HAF
            </AvatarFallback>
          </Avatar>
        </div>
      </div>
    </SectionWrapper>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/sections/About.jsx
git commit -m "feat: add About section"
```

---

### Task 11: Experience section

**Files:**
- Create: `src/components/ExperienceItem.jsx`
- Create: `src/components/sections/Experience.jsx`

- [ ] **Step 1: Create `src/components/ExperienceItem.jsx`**

```jsx
import { Badge } from '@/components/ui/badge'

export default function ExperienceItem({ company, role, period, location, bullets, skills, isLast }) {
  return (
    <div className="relative pl-8">
      {/* Vertical line */}
      {!isLast && (
        <div className="absolute left-[7px] top-6 bottom-0 w-px bg-slate-200" />
      )}
      {/* Dot */}
      <div className="absolute left-0 top-1.5 w-3.5 h-3.5 rounded-full bg-blue-600 ring-2 ring-white ring-offset-1" />

      <div className="pb-10">
        <div className="flex flex-wrap items-start justify-between gap-2 mb-1">
          <div>
            <h3 className="font-semibold text-slate-900">{role}</h3>
            <p className="text-blue-600 text-sm font-medium">{company}</p>
          </div>
          <div className="text-right text-sm text-slate-500">
            <p>{period}</p>
            <p>{location}</p>
          </div>
        </div>
        <ul className="mt-3 space-y-1.5">
          {bullets.map((bullet, i) => (
            <li key={i} className="text-slate-600 text-sm leading-relaxed flex gap-2">
              <span className="text-blue-400 mt-1.5 shrink-0">▸</span>
              {bullet}
            </li>
          ))}
        </ul>
        <div className="flex flex-wrap gap-1.5 mt-3">
          {skills.map((skill) => (
            <Badge key={skill} variant="secondary" className="text-xs">
              {skill}
            </Badge>
          ))}
        </div>
      </div>
    </div>
  )
}
```

- [ ] **Step 2: Create `src/components/sections/Experience.jsx`**

```jsx
import SectionWrapper from '@/components/SectionWrapper'
import ExperienceItem from '@/components/ExperienceItem'
import { experiences } from '@/data/experience'

export default function Experience() {
  return (
    <SectionWrapper id="experience">
      <h2 className="text-3xl font-bold text-slate-900 mb-12">Experience</h2>
      <div className="max-w-2xl">
        {experiences.map((exp, index) => (
          <ExperienceItem
            key={exp.company}
            {...exp}
            isLast={index === experiences.length - 1}
          />
        ))}
      </div>
    </SectionWrapper>
  )
}
```

- [ ] **Step 3: Commit**

```bash
git add src/components/ExperienceItem.jsx src/components/sections/Experience.jsx
git commit -m "feat: add Experience timeline section"
```

---

### Task 12: Skills section

**Files:**
- Create: `src/components/sections/Skills.jsx`

- [ ] **Step 1: Create `src/components/sections/Skills.jsx`**

```jsx
import SectionWrapper from '@/components/SectionWrapper'
import { Badge } from '@/components/ui/badge'

const SKILL_GROUPS = [
  {
    category: 'Languages',
    skills: ['Python', 'JavaScript', 'PHP', 'C#', 'Java'],
  },
  {
    category: 'Backend',
    skills: ['Flask', 'ExpressJS', 'Node.js', 'REST APIs'],
  },
  {
    category: 'Cloud',
    skills: ['Google Cloud Platform', 'App Engine', 'Cloud Storage', 'Firestore'],
  },
  {
    category: 'Mobile',
    skills: ['Flutter', 'Dart'],
  },
  {
    category: 'Data & ML',
    skills: ['Machine Learning', 'Data Analysis', 'Scikit-learn', 'Pandas'],
  },
  {
    category: 'Tools',
    skills: ['Git', 'Docker', 'Postman', 'MySQL', 'SQLite'],
  },
]

export default function Skills() {
  return (
    <SectionWrapper id="skills" className="bg-slate-50">
      <h2 className="text-3xl font-bold text-slate-900 mb-12">Skills</h2>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {SKILL_GROUPS.map(({ category, skills }) => (
          <div key={category}>
            <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-3">
              {category}
            </h3>
            <div className="flex flex-wrap gap-2">
              {skills.map((skill) => (
                <Badge
                  key={skill}
                  variant="outline"
                  className="text-slate-700 border-slate-300 hover:border-blue-400 hover:text-blue-600 transition-colors"
                >
                  {skill}
                </Badge>
              ))}
            </div>
          </div>
        ))}
      </div>
    </SectionWrapper>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/sections/Skills.jsx
git commit -m "feat: add Skills grouped badge grid section"
```

---

### Task 13: Portfolio section and ProjectCard

**Files:**
- Create: `src/components/ProjectCard.jsx`
- Create: `src/components/sections/Portfolio.jsx`

- [ ] **Step 1: Create `src/components/ProjectCard.jsx`**

```jsx
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'

export default function ProjectCard({ slug, title, thumbnail, techStack }) {
  return (
    <Card className="overflow-hidden group hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
      <div className="aspect-video overflow-hidden bg-slate-100">
        <img
          src={thumbnail}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>
      <CardContent className="p-5">
        <h3 className="font-semibold text-slate-900 mb-2">{title}</h3>
        <div className="flex flex-wrap gap-1.5 mb-4">
          {techStack.slice(0, 3).map((tech) => (
            <Badge key={tech} variant="secondary" className="text-xs">
              {tech}
            </Badge>
          ))}
          {techStack.length > 3 && (
            <Badge variant="secondary" className="text-xs">
              +{techStack.length - 3}
            </Badge>
          )}
        </div>
        <Button
          variant="ghost"
          size="sm"
          asChild
          className="p-0 h-auto text-blue-600 hover:text-blue-700"
        >
          <Link to={`/projects/${slug}`} className="flex items-center gap-1">
            View Project <ArrowRight size={14} />
          </Link>
        </Button>
      </CardContent>
    </Card>
  )
}
```

- [ ] **Step 2: Create `src/components/sections/Portfolio.jsx`**

```jsx
import { useState } from 'react'
import SectionWrapper from '@/components/SectionWrapper'
import ProjectCard from '@/components/ProjectCard'
import { projects } from '@/data/projects'

const FILTERS = [
  { label: 'All', value: 'all' },
  { label: 'Web', value: 'web' },
  { label: 'Backend', value: 'backend' },
  { label: 'Android', value: 'android' },
  { label: 'Data Science', value: 'data' },
]

export default function Portfolio() {
  const [activeFilter, setActiveFilter] = useState('all')

  const filtered =
    activeFilter === 'all'
      ? projects
      : projects.filter((p) => p.category === activeFilter)

  return (
    <SectionWrapper id="portfolio">
      <h2 className="text-3xl font-bold text-slate-900 mb-4">Portfolio</h2>
      <p className="text-slate-500 mb-8 max-w-xl">
        A collection of projects across backend, cloud, mobile, and data science.
      </p>

      {/* Filter tabs */}
      <div className="flex flex-wrap gap-2 mb-10">
        {FILTERS.map(({ label, value }) => (
          <button
            key={value}
            onClick={() => setActiveFilter(value)}
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
              activeFilter === value
                ? 'bg-blue-600 text-white'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Project grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((project) => (
          <ProjectCard key={project.slug} {...project} />
        ))}
      </div>
    </SectionWrapper>
  )
}
```

- [ ] **Step 3: Commit**

```bash
git add src/components/ProjectCard.jsx src/components/sections/Portfolio.jsx
git commit -m "feat: add Portfolio section with filter tabs and ProjectCard"
```

---

### Task 14: Assemble Home page

**Files:**
- Modify: `src/pages/Home.jsx`

- [ ] **Step 1: Replace `src/pages/Home.jsx` with full assembled page**

```jsx
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import Hero from '@/components/sections/Hero'
import About from '@/components/sections/About'
import Experience from '@/components/sections/Experience'
import Skills from '@/components/sections/Skills'
import Portfolio from '@/components/sections/Portfolio'

export default function Home() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      <About />
      <Experience />
      <Skills />
      <Portfolio />
      <Footer />
    </div>
  )
}
```

- [ ] **Step 2: Verify full Home page in browser**

```bash
npm run dev
```

Walk through each section at `http://localhost:5173`:
- Hero: name, subtitle, bio, two CTA buttons, social icons
- Navbar: scroll down — background transitions from transparent to white with shadow; nav links scroll to correct sections
- About: photo, two paragraphs, location/email/freelance rows
- Experience: 4 timeline entries with dots, lines, bullets, skill badges; last entry has no trailing line
- Skills: 6 category groups as badge grids on slate-50 background
- Portfolio: 6 cards, filter tabs work (Web shows 2, Backend shows 1, Android shows 2, Data shows 1), cards lift on hover
- Footer: social icons, email, copyright

- [ ] **Step 3: Commit**

```bash
git add src/pages/Home.jsx
git commit -m "feat: assemble full Home page"
```

---

### Task 15: ProjectDetail page

**Files:**
- Modify: `src/pages/ProjectDetail.jsx`

- [ ] **Step 1: Replace `src/pages/ProjectDetail.jsx` with full implementation**

```jsx
import { useParams, Link } from 'react-router-dom'
import { useEffect } from 'react'
import { getProjectBySlug } from '@/data/projects'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { FaGithub } from 'react-icons/fa'
import { ExternalLink, ArrowLeft } from 'lucide-react'

export default function ProjectDetail() {
  const { slug } = useParams()
  const project = getProjectBySlug(slug)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [slug])

  if (!project) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-slate-900 mb-2">Project not found</h1>
            <p className="text-slate-500 mb-6">The project you're looking for doesn't exist.</p>
            <Button asChild>
              <Link to="/">← Back to Portfolio</Link>
            </Button>
          </div>
        </div>
      </div>
    )
  }

  const {
    title,
    techStack,
    overview,
    problem,
    solution,
    architecture,
    results,
    media,
    github,
    demo,
  } = project

  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Hero banner */}
      <div className="pt-24 pb-12 bg-slate-50">
        <div className="max-w-content mx-auto px-6">
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-blue-600 transition-colors mb-8"
          >
            <ArrowLeft size={14} /> Back to Portfolio
          </Link>
          <h1 className="text-4xl font-bold text-slate-900 mb-4">{title}</h1>
          <div className="flex flex-wrap gap-2">
            {techStack.map((tech) => (
              <Badge key={tech} variant="secondary">
                {tech}
              </Badge>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-content mx-auto px-6 py-12">
        <div className="max-w-2xl space-y-10">
          <section>
            <h2 className="text-xl font-semibold text-slate-900 mb-3">Overview</h2>
            <p className="text-slate-600 leading-relaxed">{overview}</p>
          </section>

          <Separator />

          <section>
            <h2 className="text-xl font-semibold text-slate-900 mb-4">Problem & Solution</h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-2">
                  Problem
                </h3>
                <p className="text-slate-600 leading-relaxed">{problem}</p>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-2">
                  Solution
                </h3>
                <p className="text-slate-600 leading-relaxed">{solution}</p>
              </div>
            </div>
          </section>

          <Separator />

          <section>
            <h2 className="text-xl font-semibold text-slate-900 mb-3">Architecture</h2>
            <p className="text-slate-600 leading-relaxed">{architecture}</p>
          </section>

          <Separator />

          <section>
            <h2 className="text-xl font-semibold text-slate-900 mb-3">Results & Impact</h2>
            <p className="text-slate-600 leading-relaxed">{results}</p>
          </section>

          {/* Media — only shown when project has media entries */}
          {media && media.length > 0 && (
            <>
              <Separator />
              <section>
                <h2 className="text-xl font-semibold text-slate-900 mb-4">Screenshots</h2>
                <div className="space-y-4">
                  {media.map((item, i) =>
                    item.type === 'image' ? (
                      <img
                        key={i}
                        src={item.url}
                        alt={`${title} screenshot ${i + 1}`}
                        className="rounded-lg border border-slate-200 w-full"
                      />
                    ) : item.type === 'video' ? (
                      <div
                        key={i}
                        className="aspect-video rounded-lg overflow-hidden border border-slate-200"
                      >
                        <iframe
                          src={item.url}
                          title={`${title} demo`}
                          className="w-full h-full"
                          allowFullScreen
                        />
                      </div>
                    ) : null
                  )}
                </div>
              </section>
            </>
          )}

          {/* Links — only shown when github or demo URLs exist */}
          {(github || demo) && (
            <>
              <Separator />
              <section>
                <h2 className="text-xl font-semibold text-slate-900 mb-4">Links</h2>
                <div className="flex flex-wrap gap-3">
                  {github && (
                    <Button variant="outline" asChild>
                      <a
                        href={github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2"
                      >
                        <FaGithub size={16} /> GitHub Repository
                      </a>
                    </Button>
                  )}
                  {demo && (
                    <Button asChild>
                      <a
                        href={demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2"
                      >
                        <ExternalLink size={16} /> Live Demo
                      </a>
                    </Button>
                  )}
                </div>
              </section>
            </>
          )}
        </div>
      </div>

      <Footer />
    </div>
  )
}
```

- [ ] **Step 2: Verify project detail page**

```bash
npm run dev
```

- Navigate to `http://localhost:5173/projects/calory-in-api` — full page renders: title, badges, Overview, Problem & Solution, Architecture, Results, screenshot, no link buttons (github/demo are null).
- Navigate to `http://localhost:5173/projects/nonexistent` — "Project not found" with back button.
- Click "← Back to Portfolio" — navigates to home page.
- Verify page scrolls to top on load (not mid-page).

- [ ] **Step 3: Commit**

```bash
git add src/pages/ProjectDetail.jsx
git commit -m "feat: add full ProjectDetail page"
```

---

### Task 16: Update CLAUDE.md

**Files:**
- Modify: `CLAUDE.md`

- [ ] **Step 1: Replace `CLAUDE.md` with updated content**

```markdown
# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

| Command | Purpose |
|---|---|
| `npm run dev` | Start Vite dev server at http://localhost:5173 |
| `npm run build` | Production build to `dist/` |
| `npm run preview` | Preview production build locally |
| `npm test` | Run Vitest tests |

## Architecture

Single-page React app (Vite + React Router v6) with two routes:
- `/` — scrollable Home page: Hero → About → Experience → Skills → Portfolio
- `/projects/:slug` — data-driven project detail page

**All content lives in `src/data/`** — edit `projects.js` or `experience.js` to update content without touching components.

**Component structure:**
- `src/components/sections/` — one file per Home page section (Hero, About, Experience, Skills, Portfolio)
- `src/components/` — shared components (Navbar, Footer, SectionWrapper, ProjectCard, ExperienceItem)
- `src/components/ui/` — shadcn/ui primitives generated by CLI — do not edit manually

## Stack

Vite 5 · React 18 · React Router v6 · shadcn/ui (Radix UI + Tailwind CSS v3) · Framer Motion · React Icons

## Adding a project

1. Add an entry to `src/data/projects.js` following the existing object shape (slug, title, category, thumbnail, techStack, overview, problem, solution, architecture, results, media, github, demo).
2. Add the thumbnail image to `public/assets/img/portfolio/`.

## Assets

Images and CV PDF live in `public/assets/`. Vite serves `public/` at the root, so reference files as `/assets/img/...` in JSX.
```

- [ ] **Step 2: Commit**

```bash
git add CLAUDE.md
git commit -m "docs: update CLAUDE.md for React project"
```

---

## Spec Coverage Check

| Spec requirement | Task(s) |
|---|---|
| Vite + React + React Router v6 | 1, 5 |
| shadcn/ui + Tailwind CSS v3 | 2, 3 |
| Framer Motion animations (fade-in-up on scroll) | 8 |
| Hero: name, title, bio, CTA buttons, social links | 9 |
| About: photo, bio, location/email/freelance (no birthday/phone) | 10 |
| Experience: vertical timeline, 4 entries, clean bullets + badges | 4, 11 |
| Skills: grouped badge grid, 6 categories | 12 |
| Portfolio: filter tabs + 6 cards + hover lift | 4, 13 |
| Footer: social links, email, copyright | 7 |
| ProjectDetail: all 8 sub-sections, data-driven | 4, 15 |
| Navbar sticky + scroll-aware + mobile menu | 6 |
| Inter font | 1 (index.html), 2 (tailwind config) |
| blue-600 accent, slate-900 text, white bg | 2, 3 (CSS variables) |
| max-width 1100px | 2 (tailwind config `max-w-content`) |
| Card hover lift effect | 13 (ProjectCard) |
| Remove Bootstrap/vendor bloat | 1 (new index.html replaces old) |
| `getProjectBySlug` utility + tests | 4 |
