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

---

## Agent / AI Notes

This section records hard-won troubleshooting findings and research strategies from prior automated sessions so future agents do not repeat the same dead-ends.

---

### 🔍 Finding Content in the Repository

**Start here before making any changes.** This repo's structure is predictable — knowing where things live saves significant time.

#### Quick orientation checklist

| What you need                  | Where to look                                                              |
| ------------------------------ | -------------------------------------------------------------------------- |
| Content schemas / field names  | `src/content/config.ts` — single source of truth for all Zod schemas       |
| TypeScript types for nursing   | `src/types/nursing.ts`                                                     |
| Nursing framework data         | `src/data/` — `aacn-essentials.json`, `qsen-competencies.json`, etc.       |
| Glossary terms                 | `src/data/glossary.json`                                                   |
| Page routing / URL structure   | `src/pages/` — mirrors the URL structure exactly                           |
| Shared UI layouts              | `src/layouts/` — `BaseLayout`, `ContentLayout`, `PresentationLayout`       |
| Svelte interactive components  | `src/components/lms/` — `KeyTerm.svelte`, `GlossaryBrowser.svelte`, etc.   |
| Auth / private section logic   | `src/pages/private/index.astro` and `src/pages/login.astro`                |
| Environment variables in use   | `.env.example` (docs) + `.github/workflows/deploy.yml` (injected at build) |
| Existing GitHub Actions        | `.github/workflows/`                                                       |
| BSN curriculum agent config    | `.github/agents/bsn-curriculum-agent.md`                                   |
| Example content (encyclopedia) | `src/content/encyclopedia/*.mdx`                                           |
| Example content (courses)      | `src/content/courses/*.mdx`                                                |

#### Effective search strategies

1. **Use `grep` with context flags** to understand surrounding code, not just matching lines:

   ```bash
   grep -rn "visibility" src/content/ --include="*.ts" -A3 -B1
   ```

2. **Search for schema field names first** — every content type's shape is declared in `src/content/config.ts`. Read the full file before editing any content collection.

3. **Search across all `.mdx` files** to see how frontmatter fields are actually used in practice:

   ```bash
   grep -rn "draft:" src/content/ --include="*.mdx"
   ```

4. **Find which pages render a given collection** — all collection listing/detail pages follow the pattern `src/pages/<collection>/index.astro` and `src/pages/<collection>/[slug].astro`:

   ```bash
   grep -rn "getCollection" src/pages/ --include="*.astro"
   ```

5. **Trace imports to find component usage**:

   ```bash
   grep -rn "KeyTerm" src/ --include="*.{astro,mdx,svelte}"
   ```

6. **Check `dist/` after building** to confirm what the static output actually contains — especially useful for verifying routing, class names, and injected metadata:
   ```bash
   npm run build && grep -r "my-expected-class" dist/ --include="*.html" -l
   ```

---

### 🛠 Troubleshooting Common Problems

#### Build fails with a Zod schema validation error

**Symptom:** `npm run build` fails with an error like `"Invalid input"` or `"Expected string, received undefined"` for a content file.

**Cause:** A `.mdx` file is missing a required frontmatter field, or a field value does not match the Zod schema declared in `src/content/config.ts`.

**Fix:**

1. Read `src/content/config.ts` to see the exact schema for the affected collection.
2. Open the `.mdx` file and compare its frontmatter keys and types against the schema.
3. Common mismatches: date strings vs `z.date()` (Astro parses YAML date literals automatically — use `2026-01-01` not `"2026-01-01"`), missing required fields, enum values that don't match the declared options.

#### Build fails with a TypeScript error in an `.astro` file

**Symptom:** `Type '…' is not assignable to type '…'` inside a `.astro` frontmatter block.

**Fix:**

1. Check the `Props` interface exported from the layout being used (e.g. `ContentLayout.astro` — it explicitly declares every prop and its type).
2. Ensure optional props are annotated with `?` or have a default value.
3. Run `npm run lint` first — some TypeScript errors manifest as Prettier issues that mask the real error.

#### Content does not appear on a listing page

**Symptom:** A new `.mdx` file exists but does not show up on the index page.

**Common causes:**

- `draft: true` is set — all listing pages filter out drafts with `({ data }) => !data.draft`.
- A new field added to the schema has no default value, causing the `getCollection` call to throw at runtime (caught during build).
- The file was added to the wrong directory (e.g. `src/content/encyclopedia/` instead of `src/content/notes/`).
- Frontmatter YAML is malformed — check for unescaped colons, missing quotes around strings that contain special characters, or incorrect indentation.

#### Private/protected pages are not working correctly

The private section uses **client-side session storage**, not server-side auth. Understand this model before making changes:

- `sessionStorage.getItem('lms_auth') === 'ok'` is the auth check — set by `/login/` after verifying credentials.
- Protected pages always render their HTML statically; the JS client-side check hides content and redirects unauthenticated visitors.
- **There is no true server-side auth** — this is a static site hosted on GitHub Pages. The protection is UI-only. Private content is still present in the built HTML.
- The `AUTH_HASH` secret is a SHA-256 hex digest of `"username:password"`. It is embedded at build time via the deploy workflow. Without it, login always fails.
- If a new private page does not redirect correctly, confirm it has the same `<script define:vars={{ base }}>` block as `src/pages/private/index.astro`.

#### GitHub Actions workflow does not trigger

- Check the `on:` trigger conditions carefully. `issues.labeled` only fires when a label is **added** — it does not fire when an issue is opened with labels defined in a template (the `opened` event fires, not `labeled`).
- `github.event.label.name` is only available on the `labeled` event, not on `opened`. Use `contains(github.event.issue.labels.*.name, 'note')` for `opened` triggers.
- Check that the `permissions:` block in the workflow grants the required scopes (`contents: write` to push files, `issues: write` to comment).
- Use `workflow_dispatch` as a secondary trigger while debugging workflows so you can manually invoke them from the Actions tab.

#### Prettier / lint failures after editing `.astro` files

**Symptom:** `npm run lint` reports formatting errors even though the file looks correct to you.

**Fix:** Run `npm run format` to auto-fix all formatting. Prettier with `prettier-plugin-astro` applies specific rules to `.astro` frontmatter (triple-dash fences) and template blocks. Never manually guess whitespace — always let Prettier fix it.

---

### 💡 Effective AI Session Strategies

#### Research first, change second

Always explore and understand the codebase before writing code. A single read of `src/content/config.ts` and the relevant page files prevents most mistakes. Batch your exploration into parallel tool calls to minimize round-trips.

#### Understand the Astro content collection pipeline

```
src/content/<collection>/*.mdx
   → schema validated by src/content/config.ts (Zod)
   → queried with getCollection('<collection>') in src/pages/
   → rendered via [slug].astro or index.astro
   → built to dist/<collection>/<slug>/index.html
```

Any change that touches the schema must be reflected in both the `.mdx` files (frontmatter) and the `.astro` pages (prop usage).

#### Use `npm run build` as your integration test

There are no unit tests in this project. The build (`npm run build`) is the primary correctness check — it validates Zod schemas, runs TypeScript type checks, and generates all static pages. Run it before and after your changes.

#### Work incrementally and commit often

Make one logical change at a time, build to confirm it works, then commit. Large batches of changes are harder to debug when the build breaks.

#### Use the `explore` agent for multi-file questions

When you need to understand how multiple files relate to each other (e.g. "how does the private section authenticate?"), the `explore` agent is more efficient than manually grepping multiple files. Batch all related questions into a single call — the explore agent loses all context between calls.

#### Understand the base URL pattern

The site is deployed to GitHub Pages at `/astro2`, so all internal links and asset references use `import.meta.env.BASE_URL` (which resolves to `/astro2/`). Never hardcode `/` as the root — always prefix with `base`:

```astro
const base = import.meta.env.BASE_URL;
<a href={`${base}notes/`}>Notes</a>
```

#### Adding a new content field safely

1. Add the field to the schema in `src/content/config.ts` with `.optional()` or `.default(...)` so existing files remain valid.
2. Update the `.astro` pages that render this collection to handle the new field.
3. Add the field to any new `.mdx` files you create.
4. Run `npm run build` to confirm all existing content still validates.

#### Private vs public notes routing

Notes with `visibility: 'private'` should only appear under `/private/notes/` (auth-gated). Notes with `visibility: 'public'` (or no visibility field, which defaults to `'public'`) appear under the public `/notes/` listing. Both listing and detail pages filter using this field — if you add a new visibility-aware page, make sure to apply the same filter to `getCollection`.

---

### Sandbox networking — Playwright browser cannot reach local dev servers

**Symptom:** When running inside the GitHub Copilot Coding Agent sandbox, the Playwright browser tool consistently returns `ERR_CONNECTION_REFUSED` for `localhost` and `127.0.0.1`, and `ERR_BLOCKED_BY_CLIENT` for LAN IPs (e.g. `10.x.x.x`) and `file://` URLs — even when `curl` from Bash can successfully fetch the same URL.

**Root cause:** The Playwright MCP server runs in an isolated browser context that is not network-peered with the host process. The allow-list (`localhost;localhost:*;127.0.0.1;127.0.0.1:*`) governs what the _firewall_ permits, but the browser's own network stack cannot reach sockets bound by the Astro/Vite process in the same sandbox host.

**What does NOT work:**

- `npm run dev` / `node node_modules/.bin/astro dev` (any port) — `ERR_CONNECTION_REFUSED`
- `python3 -m http.server` serving `dist/` — `ERR_CONNECTION_REFUSED`
- `npx serve dist` — same
- `file:///…/dist/…/index.html` — `ERR_BLOCKED_BY_CLIENT`
- Network-interface IP (e.g. `http://10.1.0.163:4321`) — `ERR_BLOCKED_BY_CLIENT`

**What DOES work for verifying UI changes without a browser:**

1. **Build the project** (`npm run build`) and grep the generated `dist/` HTML to confirm class names / markup are correct:
   ```bash
   grep -A5 "page-prev\|page-next" dist/courses/motivational-interviewing/index.html
   ```
2. **Read the source file** directly after editing — verify the classes / template strings look right before building.
3. **Lint** with `npm run lint` to catch formatting issues early.

### Button / DaisyUI styling conventions

- Navigation / back-link buttons use `btn btn-ghost btn-sm` — no visible border at rest.
- Primary action buttons (submit, quiz) use `btn btn-primary`.
- `btn-outline btn-neutral` produces a **dark/black boxed border** in the DaisyUI v5 `corporate` theme and should be avoided for subtle navigation controls.
- The preferred pattern for Previous/Next pagination controls is:
  - **Previous** → `btn btn-sm btn-ghost gap-2 font-sans` (subtle, no border)
  - **Next** → `btn btn-sm btn-outline btn-primary gap-2 font-sans` (primary-coloured outline)
- All interactive text links in the site use `hover:text-indigo-600 transition-colors` as the hover style.

### Pagination implementation location

All page-splitting and Previous/Next navigation logic lives in a single `<script>` block at the bottom of `src/layouts/ContentLayout.astro`. Content is split into pages on every `<h2>` boundary (requires ≥ 2 `<h2>` elements). The nav bar is injected via `document.createElement` at runtime — it does **not** appear in the static HTML of the page source, only in the built `<script>` tag.

The motivational-interviewing course (`src/content/courses/motivational-interviewing.mdx`) has 15 `<h2>` sections and is the best page for testing pagination UI changes.
