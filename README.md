# Astro LMS

A Learning Management System (LMS) built with [Astro.build](https://astro.build) and published on [GitHub Pages](https://pages.github.com/).

## Live Site

> `https://sagreenxyz.github.io/astro2/`

---

## Content Types

| Section         | Storage                           | URL               |
| --------------- | --------------------------------- | ----------------- |
| Encyclopedia    | `src/content/encyclopedia/*.mdx`  | `/encyclopedia/`  |
| Courses         | `src/content/courses/*.mdx`       | `/courses/`       |
| Notes           | `src/content/notes/*.mdx`         | `/notes/`         |
| Presentations   | `src/pages/presentations/*.astro` | `/presentations/` |
| Quizzes / Exams | `src/content/quizzes/*.json`      | `/quizzes/`       |
| Glossary        | `src/data/glossary.json`          | `/glossary/`      |
| Private         | `src/pages/private/`              | `/private/`       |

---

## Project Structure

```
astro2/
├── .env.example                    # Document required environment variables
├── .github/
│   └── workflows/
│       └── deploy.yml              # GitHub Pages CI/CD (passes SITE_ACCESS_TOKEN secret)
├── .vscode/                        # VS Code settings & recommended extensions
├── public/
│   └── favicon.svg
├── src/
│   ├── components/
│   │   ├── common/                 # Shared UI components
│   │   └── lms/
│   │       ├── GlossaryBrowser.svelte  # Live-search glossary (Svelte island)
│   │       ├── KeyTerm.svelte          # Inline keyword tooltip (Svelte island)
│   │       └── Slide.astro             # Individual slide component for presentations
│   ├── content/
│   │   ├── config.ts               # Content collection schemas (Zod)
│   │   ├── encyclopedia/           # Reference articles (.mdx)
│   │   ├── courses/                # Course lessons (.mdx)
│   │   ├── notes/                  # Personal notes (.mdx)
│   │   └── quizzes/                # Quiz definitions (.json)
│   ├── data/
│   │   └── glossary.json           # Keyword/keyphrase project lookup file
│   ├── layouts/
│   │   ├── BaseLayout.astro        # Root HTML shell with DaisyUI navbar/footer
│   │   ├── ContentLayout.astro     # Article wrapper with frontmatter metadata
│   │   └── PresentationLayout.astro # Slide presentation shell
│   ├── pages/
│   │   ├── index.astro             # Home/dashboard
│   │   ├── encyclopedia/           # index.astro + [slug].astro
│   │   ├── courses/                # index.astro + [slug].astro
│   │   ├── glossary.astro          # Searchable keyword/phrase browser
│   │   ├── notes/                  # index.astro + [slug].astro
│   │   ├── presentations/
│   │   │   ├── index.astro         # Presentation listing
│   │   │   └── lms-overview.astro  # Example presentation (.astro page)
│   │   ├── quizzes/                # index.astro + [id].astro
│   │   └── private/                # Token-gated private area
│   ├── styles/
│   │   └── global.css              # Tailwind v4 + DaisyUI import
│   └── types/
│       └── glossary.ts             # GlossaryEntry TypeScript interface
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

### Environment Variables

Copy `.env.example` to `.env` and set:

```
SITE_ACCESS_TOKEN=your_strong_random_token
```

In GitHub, add this as a repository secret under **Settings → Secrets → Actions**.

---

## Adding Content

### Encyclopedia entry

Create `src/content/encyclopedia/my-topic.mdx`:

```mdx
---
title: 'My Topic'
summary: 'A short summary of this article.'
tags: ['tag1', 'tag2']
publishedAt: 2026-01-01
draft: false
---

import KeyTerm from '../../components/lms/KeyTerm.svelte';
import glossary from '../../data/glossary.json';

export const myTerm = glossary.find((e) => e.slug === 'my-slug');

Your content here. Use <KeyTerm entry={myTerm} client:load /> for keyword tooltips.
```

### Course

Create `src/content/courses/my-course.mdx`:

```mdx
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

Create `src/content/notes/my-note.mdx`:

```mdx
---
title: 'My Note'
tags: ['quick-ref']
createdAt: 2026-01-01
draft: false
---

Note content...
```

### Presentation

Create `src/pages/presentations/my-deck.astro`:

```astro
---
import PresentationLayout from '../../layouts/PresentationLayout.astro';
import Slide from '../../components/lms/Slide.astro';
---

<PresentationLayout
  title="My Deck"
  description="What this deck covers."
  publishedAt={new Date('2026-01-01')}
  tags={['topic']}
>
  <Slide number={1} title="Introduction">
    <p>Opening slide content.</p>
  </Slide>

  <Slide number={2} title="Main Point">
    <ul>
      <li>Point one</li>
      <li>Point two</li>
    </ul>
  </Slide>
</PresentationLayout>
```

Then add your new presentation to the listing array in `src/pages/presentations/index.astro`.

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

### Adding a Glossary Term

Add an entry to `src/data/glossary.json`:

```json
{
  "term": "My Term",
  "fullForm": "My Full Term Name",
  "definition": "A clear definition of this term.",
  "relatedTerms": ["Related Term 1", "Related Term 2"],
  "slug": "my-term"
}
```

The term will automatically appear in the `/glossary/` page and can be referenced in any `.mdx` or `.astro` file using the `<KeyTerm>` Svelte component.

---

## Technology Stack

| Layer         | Technology                   | Notes                                              |
| ------------- | ---------------------------- | -------------------------------------------------- |
| Framework     | Astro v5                     | Static output, island architecture                 |
| Islands       | Svelte v5                    | Interactive components (KeyTerm tooltip, Glossary) |
| Styling       | Tailwind CSS v4 + DaisyUI v5 | Corporate theme for encyclopedia-like aesthetic    |
| Content       | Astro Content Collections    | `.mdx` files with Zod-validated frontmatter        |
| Presentations | `.astro` page files          | `PresentationLayout` + `Slide` components          |
| Glossary      | `src/data/glossary.json`     | Project-wide keyword/keyphrase lookup              |
| Hosting       | GitHub Pages                 | Deployed via GitHub Actions on push to `main`      |
| Type safety   | TypeScript strict mode + Zod | Compile-time validation of content schemas         |

---

## Architecture Decisions

### ✅ Made

| Decision           | Choice                                          | Rationale                                                               |
| ------------------ | ----------------------------------------------- | ----------------------------------------------------------------------- |
| Framework          | Astro.build                                     | Island architecture, zero-JS by default, excellent Markdown/MDX support |
| Hosting            | GitHub Pages                                    | Free, integrated with GitHub, static hosting                            |
| Content management | Astro Content Collections                       | Type-safe frontmatter schemas via Zod, built-in                         |
| TypeScript         | Strict mode                                     | Catches bugs at compile time                                            |
| Styling            | Tailwind CSS v4 + DaisyUI v5                    | Corporate theme: clean, readable, encyclopedia-appropriate              |
| Island framework   | Svelte v5                                       | Compact syntax, no runtime overhead, excellent performance              |
| Content format     | `.mdx` (collections) + `.astro` (presentations) | MDX allows embedding Svelte components in content                       |
| Glossary           | `src/data/glossary.json`                        | Single source of truth for all project keywords/keyphrases              |
| Quiz engine        | Client-side JavaScript                          | Works on static hosting                                                 |
| Output             | Static (`output: 'static'`)                     | Required for GitHub Pages                                               |
| GitHub secret      | `SITE_ACCESS_TOKEN`                             | Build-time token for private-area access control                        |

### 🔲 Pending — Your Decisions Needed

#### 1. Authentication / Private Section

The current private section uses a build-time token from `SITE_ACCESS_TOKEN`. For a more robust system:

| Option                    | Pros                                     | Cons                               |
| ------------------------- | ---------------------------------------- | ---------------------------------- |
| **Supabase Auth**         | Full auth, free tier, row-level security | Requires external service          |
| **Auth0 / Clerk**         | Polished UX, free tier                   | External service, cost at scale    |
| **Netlify Identity**      | Tight Astro integration                  | Requires moving to Netlify hosting |
| **Build-time exclusion**  | Simple, current approach                 | Content visible in repo source     |
| **Separate private repo** | True separation                          | Operational complexity             |

#### 2. Search

| Option            | Pros                               | Cons                       |
| ----------------- | ---------------------------------- | -------------------------- |
| Pagefind          | Static, built-in Astro integration | Index must be rebuilt      |
| Algolia DocSearch | Powerful, free for docs            | External service           |
| Fuse.js           | Client-side fuzzy search           | Performance at large scale |

---

## Deployment

Deployment is automated via GitHub Actions (`.github/workflows/deploy.yml`) on every push to `main`.

**To enable GitHub Pages:**

1. Go to **Settings → Pages** in your GitHub repository
2. Set **Source** to **GitHub Actions**
3. Add `SITE_ACCESS_TOKEN` under **Settings → Secrets → Actions**
4. Push to `main` — the site will be built and deployed automatically

---

## Standards

- **Formatting:** Prettier with `prettier-plugin-astro` + `prettier-plugin-svelte`
- **Editor:** EditorConfig (2-space indent, LF line endings)
- **TypeScript:** Strict mode (`astro/tsconfigs/strict`)
- **Content:** `.mdx` files in `src/content/`, validated by Zod schemas in `src/content/config.ts`
- **Draft system:** Set `draft: true` in frontmatter to hide content from listings and builds
- **Path aliases:** `@components/*`, `@layouts/*`, `@styles/*`, `@utils/*`, `@content/*`
- **Glossary:** Add terms to `src/data/glossary.json`; use `<KeyTerm>` for inline tooltips
