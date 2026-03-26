/**
 * generate-changelog.mjs
 *
 * GitHub Actions script that:
 * 1. Detects newly added content files pushed to main
 *    (encyclopedia, courses, pharmacology, paths collections)
 * 2. Parses each file's frontmatter to extract title, summary, and tags
 * 3. Writes a corresponding changelog MDX entry to src/content/changelog/
 * 4. Skips drafts and slugs that already have a changelog entry
 *
 * Environment variables (set by the calling workflow):
 *   BEFORE_SHA  — the commit SHA before the push (all-zeros on first push)
 *   HEAD_SHA    — the head commit SHA after the push
 */

import { readFile, writeFile, readdir } from 'node:fs/promises';
import { join, resolve, basename } from 'node:path';
import { execSync } from 'node:child_process';

// ── Configuration ─────────────────────────────────────────────────────────────

/** Collections that should generate changelog entries and their contentType values */
const COLLECTION_TO_TYPE = {
  encyclopedia: 'encyclopedia',
  courses: 'course',
  pharmacology: 'other',
  paths: 'other',
};

/** Map collection names to their public URL path segments */
const COLLECTION_TO_URL = {
  encyclopedia: 'encyclopedia',
  courses: 'courses',
  pharmacology: 'pharmacology',
  paths: 'paths',
};

const BASE_URL = '/astro2';

// ── Helpers ───────────────────────────────────────────────────────────────────

/** Convert a title to a URL-safe slug (max 80 chars) */
function slugify(text) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 80);
}

/** Escape single quotes for YAML single-quoted strings ('' is the YAML escape) */
function yamlEscape(str) {
  return str.replace(/'/g, "''");
}

/**
 * Parse key frontmatter fields from a raw MDX/MD file.
 * Handles both inline YAML scalars and folded/literal block scalars.
 */
function parseFrontmatter(raw) {
  const match = raw.match(/^---[\r\n]([\s\S]*?)[\r\n]---/);
  if (!match) return {};
  const yaml = match[1];

  /** Extract a single-line value for a given key */
  const getLine = (key) => {
    const m = yaml.match(new RegExp(`^${key}:\\s*(.+)$`, 'm'));
    return m ? m[1].trim().replace(/^['"]|['"]$/g, '') : undefined;
  };

  /** Extract a YAML folded (>) or literal (|) block scalar value */
  const getBlock = (key) => {
    const m = yaml.match(
      new RegExp(`^${key}:\\s*[>|][-+]?\\s*\\n([\\s\\S]*?)(?=\\n[a-zA-Z_-]|$)`, 'm')
    );
    return m ? m[1].replace(/\n\s*/g, ' ').trim() : undefined;
  };

  const title = getLine('title');

  // Prefer folded blocks first (common for long descriptions), then inline
  const summary =
    getBlock('summary') ||
    getLine('summary') ||
    getBlock('description') ||
    getLine('description');

  const mechanismOfAction = getLine('mechanismOfAction');
  const drugClass = getLine('drugClass');
  const draft = getLine('draft') === 'true';

  // Parse tags — handles three YAML formats:
  //   1. Inline same-line:       tags: ['a', 'b']
  //   2. Inline next-line:       tags:\n  [\n    'a',\n    'b',\n  ]
  //   3. Block sequence:         tags:\n  - a\n  - b
  let tags = [];
  // \s* after the colon spans optional newlines+spaces before the opening bracket
  const inlineArrayMatch = yaml.match(/^tags:\s*\[([\s\S]*?)\]/m);
  if (inlineArrayMatch) {
    tags = inlineArrayMatch[1]
      .split(',')
      .map((t) => t.trim().replace(/^['"]|['"]$/g, ''))
      .filter(Boolean);
  } else {
    const blockTags = yaml.match(/^tags:\s*\n((?:\s+-\s+.+\n?)+)/m);
    if (blockTags) {
      tags = blockTags[1]
        .split('\n')
        .map((line) => line.replace(/^\s+-\s+/, '').trim().replace(/^['"]|['"]$/g, ''))
        .filter(Boolean);
    }
  }

  return { title, summary, mechanismOfAction, drugClass, tags, draft };
}

/** Build a meaningful summary for pharmacology entries that lack a summary field */
function buildPharmSummary(fm) {
  const name = fm.title ?? 'This medication';
  if (fm.drugClass) {
    return `A reference entry for ${name} (${fm.drugClass}) has been added to the Pharmacology library.`;
  }
  return `A new pharmacology reference entry for ${name} has been added to the Pharmacology library.`;
}

// ── Main ──────────────────────────────────────────────────────────────────────

async function main() {
  const beforeSha = process.env.BEFORE_SHA ?? '';
  const headSha = process.env.HEAD_SHA ?? '';

  if (!headSha) {
    console.error('HEAD_SHA is required.');
    process.exit(1);
  }

  // Detect added files — use diff-tree on first push (before SHA is all zeros)
  const isFirstPush = /^0+$/.test(beforeSha);

  let diffOutput;
  try {
    if (isFirstPush) {
      diffOutput = execSync(
        `git diff-tree --no-commit-id -r --name-status ${headSha}`,
        { encoding: 'utf8' }
      );
    } else {
      diffOutput = execSync(
        `git diff --name-status ${beforeSha} ${headSha}`,
        { encoding: 'utf8' }
      );
    }
  } catch (err) {
    console.error('Failed to get git diff:', err.message);
    process.exit(1);
  }

  // Keep only Added files inside tracked content collections
  const addedFiles = diffOutput
    .split('\n')
    .filter((line) => line.startsWith('A\t'))
    .map((line) => line.slice(2).trim())
    .filter((f) => {
      const parts = f.split('/');
      return (
        parts[0] === 'src' &&
        parts[1] === 'content' &&
        COLLECTION_TO_TYPE[parts[2]] != null &&
        (f.endsWith('.mdx') || f.endsWith('.md'))
      );
    });

  if (addedFiles.length === 0) {
    console.log('No new content files detected — nothing to do.');
    return;
  }

  console.log(`Detected ${addedFiles.length} new content file(s):`, addedFiles);

  const changelogDir = resolve('src/content/changelog');

  // Load existing changelog filenames to prevent duplicates
  let existingEntries;
  try {
    existingEntries = new Set(await readdir(changelogDir));
  } catch {
    existingEntries = new Set();
  }

  const today = new Date().toISOString().slice(0, 10);
  let generated = 0;

  for (const filePath of addedFiles) {
    const parts = filePath.split('/');
    const collection = parts[2];
    const slug = basename(filePath).replace(/\.(mdx?|md)$/, '');
    const contentType = COLLECTION_TO_TYPE[collection];
    const urlPath = COLLECTION_TO_URL[collection];

    // Read and parse the content file
    let raw;
    try {
      raw = await readFile(resolve(filePath), 'utf8');
    } catch (err) {
      console.log(`Skipping ${filePath}: ${err.message}`);
      continue;
    }

    const fm = parseFrontmatter(raw);

    if (fm.draft) {
      console.log(`Skipping draft: ${filePath}`);
      continue;
    }

    if (!fm.title) {
      console.log(`Skipping ${filePath}: no title found in frontmatter`);
      continue;
    }

    // Derive the changelog entry filename from the content's title slug
    const changelogSlug = slugify(fm.title);
    const changelogFilename = `${changelogSlug}.mdx`;

    if (existingEntries.has(changelogFilename)) {
      console.log(`Changelog entry already exists for '${fm.title}' — skipping`);
      continue;
    }

    // Human-readable label for the content type
    const typeLabel =
      {
        encyclopedia: 'Encyclopedia Entry',
        course: 'Course',
        other: collection === 'pharmacology' ? 'Pharmacology Entry' : 'Content',
      }[contentType] ?? 'Content';

    const changelogTitle = `New ${typeLabel}: ${fm.title}`;

    // Build a clean single-line summary
    const rawSummary =
      fm.summary ??
      (collection === 'pharmacology'
        ? buildPharmSummary(fm)
        : `A new ${typeLabel.toLowerCase()} has been added to the ${collection} library.`);

    const cleanSummary = rawSummary.replace(/\s+/g, ' ').trim().slice(0, 300);

    // Limit tags to the 5 most relevant from the source file
    const tags = fm.tags.slice(0, 5);

    const relatedUrl = `${BASE_URL}/${urlPath}/${slug}/`;

    // Build YAML tags as an inline sequence of single-quoted strings
    const tagsYaml =
      tags.length > 0
        ? `[${tags.map((t) => `'${yamlEscape(t)}'`).join(', ')}]`
        : '[]';

    // Assemble the changelog MDX file
    const mdxContent = `---
title: '${yamlEscape(changelogTitle)}'
summary: >
  ${cleanSummary}
publishedAt: ${today}
tags: ${tagsYaml}
contentType: ${contentType}
relatedUrl: ${relatedUrl}
---

## What's new

**${fm.title}** has been added to the ${collection} library.
`;

    const outputPath = join(changelogDir, changelogFilename);
    await writeFile(outputPath, mdxContent, 'utf8');
    existingEntries.add(changelogFilename);
    generated++;
    console.log(`✅ Generated changelog entry: ${changelogFilename}`);
  }

  console.log(
    `Done — generated ${generated} changelog ${generated === 1 ? 'entry' : 'entries'}.`
  );
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
