/**
 * process-note.mjs
 *
 * GitHub Actions script that:
 * 1. Parses a note-submission issue body
 * 2. Detects near-duplicate notes in src/content/notes/
 * 3. Assesses confidence (low → needs-review, otherwise → draft or published)
 * 4. Writes an .mdx file to src/content/notes/
 * 5. Sets GitHub Actions outputs:
 *    - note_file      – relative filename written (empty if skipped)
 *    - review_state   – 'published' | 'needs-review' | 'draft'
 *    - comment_body   – markdown comment to post on the issue
 */

import { readdir, readFile, writeFile } from 'node:fs/promises';
import { join, resolve } from 'node:path';
import { setOutput } from './gh-output.mjs';

// ── Helpers ─────────────────────────────────────────────────────────────────

/** Slugify a title into a safe filename base */
function slugify(text) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 80);
}

/** Extract a named section from a GitHub issue body (### Section\n...content) */
function extractSection(body, heading) {
  const re = new RegExp(
    `###?\\s+${heading.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\s*\\n([\\s\\S]*?)(?=\\n###|$)`,
    'i'
  );
  const m = body.match(re);
  return m ? m[1].trim() : '';
}

/** Extract a dropdown value from a GitHub form issue body (field: value) */
function extractDropdown(body, fieldLabel) {
  const re = new RegExp(
    `###?\\s+${fieldLabel.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\s*\\n([^\\n]+)`,
    'i'
  );
  const m = body.match(re);
  return m ? m[1].trim() : '';
}

/** Compute a simple word-overlap similarity score between two strings [0,1] */
function similarity(a, b) {
  const wordsA = new Set(a.toLowerCase().match(/\b\w{4,}\b/g) ?? []);
  const wordsB = new Set(b.toLowerCase().match(/\b\w{4,}\b/g) ?? []);
  if (wordsA.size === 0 || wordsB.size === 0) return 0;
  let overlap = 0;
  for (const w of wordsA) if (wordsB.has(w)) overlap++;
  return overlap / Math.max(wordsA.size, wordsB.size);
}

/** Read all .mdx files in src/content/notes/ and return {slug, title, body} */
async function loadExistingNotes(notesDir) {
  let files;
  try {
    files = await readdir(notesDir);
  } catch {
    return [];
  }
  const notes = [];
  for (const file of files) {
    if (!file.endsWith('.mdx')) continue;
    const slug = file.replace(/\.mdx$/, '');
    const raw = await readFile(join(notesDir, file), 'utf8');
    const titleMatch = raw.match(/^title:\s*['"]?(.+?)['"]?\s*$/m);
    const title = titleMatch ? titleMatch[1] : slug;
    notes.push({ slug, title, body: raw });
  }
  return notes;
}

// ── Main ─────────────────────────────────────────────────────────────────────

async function main() {
  const issueNumber = process.env.ISSUE_NUMBER ?? '';
  const issueTitle = process.env.ISSUE_TITLE ?? '';
  const issueBody = process.env.ISSUE_BODY ?? '';
  const issueUrl = process.env.ISSUE_URL ?? '';

  // ── 1. Parse fields from issue body ──────────────────────────────────────
  const rawTitle =
    extractSection(issueBody, 'Suggested Title') ||
    issueTitle.replace(/^\[(?:Note|BSN)\]:\s*/i, '').trim() ||
    `Note from Issue #${issueNumber}`;

  const rawNotes = extractSection(issueBody, 'Raw Notes');

  const visibilityRaw = extractDropdown(issueBody, 'Visibility') || 'public';
  const visibility = ['public', 'private', 'protected'].includes(visibilityRaw)
    ? visibilityRaw
    : 'public';

  const noteTypeRaw = extractDropdown(issueBody, 'Note Type') || 'general';
  const noteType = ['meeting', 'idea', 'reference', 'task', 'research', 'general'].includes(
    noteTypeRaw
  )
    ? noteTypeRaw
    : 'general';

  const tagsRaw = extractSection(issueBody, 'Tags') || extractDropdown(issueBody, 'Tags');
  const tags = tagsRaw
    ? tagsRaw
        .split(/[,\n]+/)
        .map((t) => t.trim().replace(/^['"]|['"]$/g, ''))
        .filter(Boolean)
    : [];

  const sourceIssue = issueUrl;
  const relatedLinksRaw =
    extractSection(issueBody, 'Related Internal Links') ||
    extractSection(issueBody, 'Related Content');
  const relatedLinks = relatedLinksRaw
    ? relatedLinksRaw
        .split(/[,\n]+/)
        .map((l) => l.trim())
        .filter((l) => l.startsWith('/') || l.startsWith('http'))
    : [];

  // ── 2. Confidence assessment ──────────────────────────────────────────────
  let confidence = 'high';
  const reasons = [];

  if (!rawNotes || rawNotes.length < 30) {
    confidence = 'low';
    reasons.push('Raw notes are very short or missing.');
  } else if (rawNotes.length < 100) {
    if (confidence !== 'low') confidence = 'medium';
    reasons.push('Raw notes are brief — consider adding more context.');
  }

  if (!rawTitle || rawTitle.startsWith('Note from Issue')) {
    if (confidence === 'high') confidence = 'medium';
    reasons.push('No suggested title was provided; a generated title was used.');
  }

  if (!tags.length) {
    if (confidence === 'high') confidence = 'medium';
    reasons.push('No tags were provided.');
  }

  // ── 3. Determine review state ─────────────────────────────────────────────
  const reviewState = confidence === 'low' ? 'needs-review' : 'published';
  const isDraft = confidence === 'low';

  // ── 4. Duplicate detection ────────────────────────────────────────────────
  const notesDir = resolve('src/content/notes');
  const existingNotes = await loadExistingNotes(notesDir);

  const DUPLICATE_THRESHOLD = 0.6;
  const duplicates = existingNotes.filter(
    (n) =>
      similarity(rawTitle, n.title) > DUPLICATE_THRESHOLD ||
      (rawNotes.length > 50 && similarity(rawNotes, n.body) > DUPLICATE_THRESHOLD)
  );

  // ── 5. Build frontmatter and slug ─────────────────────────────────────────
  const slug = slugify(rawTitle) || `issue-${issueNumber}`;
  const filename = `${slug}.mdx`;
  const today = new Date().toISOString().slice(0, 10);

  const tagsYaml =
    tags.length > 0 ? `[${tags.map((t) => `'${t.replace(/'/g, "\\'")}'`).join(', ')}]` : '[]';
  const relatedLinksYaml =
    relatedLinks.length > 0
      ? `[${relatedLinks.map((l) => `'${l.replace(/'/g, "\\'")}'`).join(', ')}]`
      : '[]';

  const duplicateOfLine = duplicates.length > 0 ? `\nduplicateOf: '${duplicates[0].slug}'` : '';

  const frontmatter = `---
title: '${rawTitle.replace(/'/g, "\\'")}'
tags: ${tagsYaml}
createdAt: ${today}
draft: ${isDraft}
visibility: ${visibility}
noteType: ${noteType}
reviewState: ${reviewState}
sourceIssue: '${sourceIssue}'
relatedLinks: ${relatedLinksYaml}
confidence: ${confidence}${duplicateOfLine}
---`;

  const content = rawNotes
    ? `\n${rawNotes}\n`
    : '\n_No note content was provided. Please edit this file and add your content._\n';

  const mdxContent = `${frontmatter}\n${content}`;

  // ── 6. Write the file ─────────────────────────────────────────────────────
  const outputPath = join(notesDir, filename);
  await writeFile(outputPath, mdxContent, 'utf8');

  // ── 7. Build issue comment ────────────────────────────────────────────────
  let comment = `## 📝 Note Draft Created\n\n`;
  comment += `**File:** \`src/content/notes/${filename}\`\n`;
  comment += `**Visibility:** ${visibility}\n`;
  comment += `**Review state:** \`${reviewState}\`\n`;
  comment += `**Agent confidence:** \`${confidence}\`\n\n`;

  if (confidence === 'low') {
    comment += `> ⚠️ **Needs Review** — This note was not published automatically because the agent confidence is **low**.\n`;
    comment += `> Please review \`src/content/notes/${filename}\`, edit as needed, and change \`reviewState\` to \`published\` and \`draft\` to \`false\` when ready.\n\n`;
  }

  if (reasons.length > 0) {
    comment += `### Confidence notes\n`;
    for (const r of reasons) comment += `- ${r}\n`;
    comment += '\n';
  }

  if (duplicates.length > 0) {
    comment += `### ⚠️ Possible Duplicates Detected\n`;
    comment += `The following existing notes may be similar to this submission:\n\n`;
    for (const d of duplicates) {
      comment += `- \`src/content/notes/${d.slug}.mdx\` — **${d.title}**\n`;
    }
    comment += `\nPlease review both notes and merge or discard as appropriate. `;
    comment += `The \`duplicateOf\` frontmatter field has been set to \`${duplicates[0].slug}\`.\n\n`;
  }

  if (relatedLinks.length > 0) {
    comment += `### 🔗 Related Links\n`;
    for (const l of relatedLinks) comment += `- ${l}\n`;
    comment += '\n';
  }

  comment += `---\n_This comment was generated automatically by the note-intake workflow._`;

  // ── 8. Set outputs ────────────────────────────────────────────────────────
  await setOutput('note_file', filename);
  await setOutput('review_state', reviewState);
  await setOutput('comment_body', comment);

  console.log(`✅ Note written: src/content/notes/${filename}`);
  console.log(`   review_state=${reviewState}  confidence=${confidence}`);
  if (duplicates.length > 0)
    console.log(`   ⚠️ Possible duplicates: ${duplicates.map((d) => d.slug).join(', ')}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
