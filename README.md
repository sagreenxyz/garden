# Astro LMS

A Learning Management System (LMS) built with [Astro.build](https://astro.build) and published on [GitHub Pages](https://pages.github.com/).

## Live Site

> `https://sagreenxyz.github.io/astro2/`

---

## Content Types

| Section         | Storage                          | URL               |
| --------------- | -------------------------------- | ----------------- |
| Encyclopedia    | `src/content/encyclopedia/*.md`  | `/encyclopedia/`  |
| Courses         | `src/content/courses/*.md`       | `/courses/`       |
| Notes           | `src/content/notes/*.md`         | `/notes/`         |
| Presentations   | `src/content/presentations/*.md` | `/presentations/` |
| Quizzes / Exams | `src/content/quizzes/*.json`     | `/quizzes/`       |
| Private         | `src/pages/private/`             | `/private/`       |

---

## Project Structure

```
astro2/
├── .github/
│   └── workflows/
│       └── deploy.yml          # GitHub Pages CI/CD
├── .vscode/                    # VS Code settings & recommended extensions
├── public/
│   ├── favicon.svg
│   └── styles/
│       └── global.css          # Global CSS (served as static asset)
├── src/
│   ├── components/
│   │   ├── common/             # Shared UI components (navbar, footer, etc.)
│   │   └── lms/                # LMS-specific components (quiz runner, etc.)
│   ├── content/
│   │   ├── config.ts           # Content collection schemas (Zod)
│   │   ├── encyclopedia/       # Reference articles (.md)
│   │   ├── courses/            # Course lessons (.md)
│   │   ├── notes/              # Personal notes (.md)
│   │   ├── presentations/      # Slide content (.md)
│   │   └── quizzes/            # Quiz definitions (.json)
│   ├── layouts/
│   │   ├── BaseLayout.astro    # Root HTML shell with nav/footer
│   │   └── ContentLayout.astro # Article wrapper with metadata
│   ├── pages/
│   │   ├── index.astro         # Home/dashboard
│   │   ├── encyclopedia/
│   │   ├── courses/
│   │   ├── notes/
│   │   ├── presentations/
│   │   ├── quizzes/
│   │   └── private/            # Protected area (client-side auth)
│   └── utils/                  # Shared TypeScript helpers
├── .editorconfig
├── .gitignore
├── .prettierrc
├── astro.config.mjs
├── package.json
└── tsconfig.json
```

---

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) 20+

### Commands

| Command           | Action                                            |
| ----------------- | ------------------------------------------------- |
| `npm install`     | Install dependencies                              |
| `npm run dev`     | Start local dev server at `http://localhost:4321` |
| `npm run build`   | Build for production to `dist/`                   |
| `npm run preview` | Preview the production build locally              |
| `npm run format`  | Auto-format all files with Prettier               |
| `npm run lint`    | Check formatting with Prettier                    |

---

## Adding Content

### Encyclopedia entry

Create `src/content/encyclopedia/my-topic.md`:

```markdown
---
title: 'My Topic'
summary: 'A short summary of this article.'
tags: ['tag1', 'tag2']
publishedAt: 2026-01-01
draft: false
---

Your content here...
```

### Course

Create `src/content/courses/my-course.md`:

```markdown
---
title: 'My Course'
description: 'What this course covers.'
level: 'beginner' # beginner | intermediate | advanced
tags: ['tag1']
order: 1 # Controls sort order on the listing page
publishedAt: 2026-01-01
draft: false
---

## Lesson 1: ...
```

### Note

Create `src/content/notes/my-note.md`:

```markdown
---
title: 'My Note'
tags: ['quick-ref']
createdAt: 2026-01-01
draft: false
---

Note content...
```

### Presentation

Create `src/content/presentations/my-deck.md`:

```markdown
---
title: 'My Presentation'
description: 'Overview of...'
tags: ['topic']
publishedAt: 2026-01-01
draft: false
slideCount: 12
---

## Slide 1: Title

---

## Slide 2: ...
```

### Quiz / Exam

Create `src/content/quizzes/my-quiz.json`:

```json
{
  "title": "My Quiz",
  "description": "Test your knowledge of...",
  "tags": ["topic"],
  "passingScore": 70,
  "timeLimit": 30,
  "draft": false,
  "questions": [
    {
      "id": "q1",
      "text": "Question text?",
      "type": "multiple-choice",
      "options": ["A", "B", "C", "D"],
      "answer": "A",
      "explanation": "Because..."
    }
  ]
}
```

---

## Architecture Decisions

### ✅ Made

| Decision           | Choice                        | Rationale                                                           |
| ------------------ | ----------------------------- | ------------------------------------------------------------------- |
| Framework          | Astro.build                   | Island architecture, zero-JS by default, excellent Markdown support |
| Hosting            | GitHub Pages                  | Free, integrated with GitHub, static hosting                        |
| Content management | Astro Content Collections     | Type-safe frontmatter schemas via Zod, built-in                     |
| TypeScript         | Strict mode                   | Catches bugs at compile time                                        |
| Styling            | Plain CSS (global stylesheet) | No build complexity, easy to maintain                               |
| Quiz engine        | Client-side JavaScript        | Works on static hosting                                             |
| Output             | Static (`output: 'static'`)   | Required for GitHub Pages                                           |

### 🔲 Pending — Your Decisions Needed

#### 1. Authentication / Private Section

GitHub Pages is fully static — there is no server-side auth. Options:

| Option                                         | Pros                                     | Cons                                                |
| ---------------------------------------------- | ---------------------------------------- | --------------------------------------------------- |
| **Supabase Auth**                              | Full auth, free tier, row-level security | Requires external service                           |
| **Auth0 / Clerk**                              | Polished UX, free tier                   | External service, cost at scale                     |
| **Netlify Identity**                           | Tight Astro integration                  | Requires moving to Netlify hosting                  |
| **Password in env var + build-time exclusion** | Simple                                   | Content still in repo; only hides from build output |
| **Separate private repo / branch**             | True separation                          | Operational complexity                              |

> **Current state:** The `/private/` route uses a sessionStorage-based client-side placeholder. Replace with a real auth provider before production.

#### 2. UI Component Library

| Option                    | Pros                         | Cons                                  |
| ------------------------- | ---------------------------- | ------------------------------------- |
| Plain CSS (current)       | Zero deps, fast              | More manual work                      |
| Tailwind CSS              | Utility-first, design system | Learning curve, larger config         |
| DaisyUI (Tailwind plugin) | Pre-built components         | Tailwind required                     |
| shadcn/ui (React)         | Excellent components         | Requires `@astrojs/react` integration |

#### 3. Interactive Components / Islands

Astro supports multiple frameworks for interactive islands:

| Option                           | Recommendation                        |
| -------------------------------- | ------------------------------------- |
| Vanilla JS (current for quizzes) | Fine for simple interactions          |
| Preact                           | Lightest React-compatible option      |
| React                            | Most ecosystem options                |
| Svelte                           | Compact syntax, excellent performance |

#### 4. Search

| Option            | Pros                               | Cons                       |
| ----------------- | ---------------------------------- | -------------------------- |
| Pagefind          | Static, built-in Astro integration | Index must be rebuilt      |
| Algolia DocSearch | Powerful, free for docs            | External service           |
| Fuse.js           | Client-side fuzzy search           | Performance at large scale |

#### 5. Presentation Format

| Option             | Pros                     | Cons                      |
| ------------------ | ------------------------ | ------------------------- |
| Markdown (current) | Simple, no extra tooling | Not a real slide renderer |
| Reveal.js          | Full slide experience    | Adds JS dependency        |
| Slidev             | Vue-based, beautiful     | More tooling              |

---

## Deployment

Deployment is automated via GitHub Actions (`.github/workflows/deploy.yml`) on every push to `main`.

**To enable GitHub Pages:**

1. Go to **Settings → Pages** in your GitHub repository
2. Set **Source** to **GitHub Actions**
3. Push to `main` — the site will be built and deployed automatically

---

## Standards

- **Formatting:** Prettier with `prettier-plugin-astro`
- **Editor:** EditorConfig (2-space indent, LF line endings)
- **TypeScript:** Strict mode (`astro/tsconfigs/strict`)
- **Content:** Markdown files in `src/content/`, validated by Zod schemas in `src/content/config.ts`
- **Draft system:** Set `draft: true` in frontmatter to hide content from listings and static generation
- **Path aliases:** `@components/*`, `@layouts/*`, `@styles/*`, `@utils/*`, `@content/*`
