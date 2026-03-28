# Personal Website Redesign — Design Spec

**Date:** 2026-03-28
**Owner:** Habib Al Fauzan

---

## Goal

Rebuild the existing static HTML personal portfolio as a React SPA that looks clean, minimal, and professional to attract software engineering recruiters. The site showcases profile, work experience, skills, and portfolio projects.

---

## Tech Stack

| Layer | Choice |
|---|---|
| Framework | Vite + React |
| Routing | React Router v6 |
| UI Components | shadcn/ui (Radix UI + Tailwind CSS) |
| Animations | Framer Motion |
| Typography | Inter (Google Fonts) |

---

## Project Structure

```
personal-web/
├── src/
│   ├── components/
│   │   ├── Navbar.jsx
│   │   ├── Footer.jsx
│   │   ├── ProjectCard.jsx
│   │   ├── ExperienceItem.jsx
│   │   └── SkillBadge.jsx
│   ├── pages/
│   │   ├── Home.jsx
│   │   └── ProjectDetail.jsx
│   ├── data/
│   │   ├── projects.js
│   │   └── experience.js
│   ├── App.jsx
│   └── main.jsx
├── public/
│   └── assets/ (images, CV PDF)
```

---

## Routing

| Route | Component | Description |
|---|---|---|
| `/` | `Home.jsx` | Single scrollable page with all sections |
| `/projects/:slug` | `ProjectDetail.jsx` | Data-driven project detail page |

---

## Home Page Sections

### 1. Hero
- Name: **Habib Al Fauzan**
- Title line: `Software Engineer · Cloud · Data`
- 2-line punchy bio: positions as experienced backend/cloud professional
- CTA buttons: **View Portfolio** (scrolls to #portfolio) + **Download CV** (opens PDF)
- Social icon links: LinkedIn, GitHub, Twitter

### 2. About
- Short professional paragraph (rewritten — cleaner, more senior-sounding)
- Profile photo (round)
- Key details: Location (Yogyakarta), Email, Freelance availability
- **Removed:** birthday, phone number

### 3. Experience
- Vertical timeline layout
- 4 entries in reverse chronological order:
  1. Software Engineer — LG Sinar Mas (Dec 2024–Present)
  2. Backend Developer Intern — PT United Tractors (Feb–Jun 2024)
  3. Data Science Intern — Rakamin Academy (Oct 2023)
  4. Cloud Computing Cohort — Bangkit Academy (Feb–Jul 2023)
- Each entry: company, role, date range, location, 3–4 bullet points, skill tags
- **Fixed:** raw copy-paste formatting removed, text tightened up

### 4. Skills
Grouped badge grid:

| Category | Skills |
|---|---|
| Languages | Python, JavaScript, PHP, C#, Java |
| Backend | Flask, ExpressJS |
| Cloud | Google Cloud Platform |
| Mobile | Flutter |
| Data | Machine Learning, Data Analysis |

### 5. Portfolio
- Filter tabs: All / Web / Backend / Android / Data Science
- 6 project cards, each showing: thumbnail, title, tech stack tags, "View Project" button
- Filter maps to project categories in `projects.js`

### 6. Footer
- Social links: LinkedIn, GitHub, Twitter
- Email address
- Simple copyright line

---

## Project Detail Page

Driven entirely by `projects.js` data — one `ProjectDetail.jsx` component handles all 6 projects via `:slug` param.

**Sections per project:**
1. **Hero banner** — project title, tech stack tags
2. **Overview** — what the project is and its purpose
3. **Problem & Solution** — the specific problem addressed and how it was solved
4. **Architecture** — system design, tech choices, how components fit together
5. **Results / Impact** — measurable outcomes or key achievements
6. **Media** — screenshots or video demo embed (optional per project)
7. **Links** — GitHub repo button + Live demo button (shown only if URL exists)
8. **Navigation** — "← Back to Portfolio" link

---

## Data Schema

### `projects.js` — array of project objects
```js
{
  slug: "calory-in-api",
  title: "CaloryIn API",
  category: "backend",           // filter-web | filter-backend | filter-android | filter-data
  thumbnail: "/assets/img/portfolio/portfolio-3.png",
  techStack: ["ExpressJS", "GCP", "Node.js"],
  overview: "...",
  problem: "...",
  solution: "...",
  architecture: "...",
  results: "...",
  media: [{ type: "image", url: "..." }],  // optional
  github: "https://github.com/...",         // optional
  demo: "https://...",                      // optional
}
```

### `experience.js` — array of experience objects
```js
{
  company: "LG Sinar Mas",
  role: "Software Engineer",
  period: "Dec 2024 – Present",
  location: "Jakarta, Indonesia",
  bullets: ["...", "...", "..."],
  skills: ["C#", "Java", "Web Development"],
}
```

---

## Visual Design

| Token | Value |
|---|---|
| Background | `white` |
| Text | `slate-900` |
| Primary accent | `blue-600` |
| Secondary text | `slate-500` |
| Max content width | `1100px` |
| Font | Inter |

**Navbar:** Sticky top, transparent → white background on scroll. On Home, links scroll to sections. On detail pages, only "Back to Portfolio" is needed.

**Cards:** Subtle box shadow, lifts on hover (`translateY(-2px)` + deeper shadow).

**Animations:** Framer Motion fade-in-up on section entry. Kept subtle — no distracting motion.

**shadcn/ui components used:** `Badge`, `Button`, `Card`, `Separator`, `Avatar`

---

## What's Removed vs Current Site

- All Bootstrap vendor bundle, Boxicons, Swiper, purecounter, Waypoints
- Birthday and phone number from About section
- Raw unformatted copy-paste text in Experience section
- Commented-out Testimonials section
- Static multi-HTML file structure replaced by SPA with React Router
