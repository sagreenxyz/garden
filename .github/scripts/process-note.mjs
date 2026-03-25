/**
 * process-note.mjs
 *
 * GitHub Actions script that:
 * 1. Detects the issue template (practice-test vs. general note submission)
 * 2. Parses the appropriate fields from the issue body
 * 3. Extracts keyword tags automatically from the topic + note content
 * 4. Detects near-duplicate notes in src/content/notes/
 * 5. Assesses confidence (low → needs-review, otherwise → published)
 * 6. Writes a well-structured .mdx file to src/content/notes/
 * 7. Sets GitHub Actions outputs:
 *    - note_file      – relative filename written (empty if skipped)
 *    - review_state   – 'published' | 'needs-review' | 'draft'
 *    - comment_body   – markdown comment to post on the issue
 */

import { readdir, readFile, writeFile } from 'node:fs/promises';
import { join, resolve } from 'node:path';
import { setOutput } from './gh-output.mjs';

// ── Stop-word list (English + nursing-context filler) ────────────────────────

const STOP_WORDS = new Set([
  // Articles / conjunctions / prepositions
  'about',
  'above',
  'after',
  'again',
  'against',
  'also',
  'although',
  'among',
  'around',
  'because',
  'before',
  'below',
  'between',
  'both',
  'but',
  'down',
  'during',
  'each',
  'either',
  'else',
  'even',
  'every',
  'except',
  'from',
  'further',
  'however',
  'into',
  'just',
  'like',
  'more',
  'most',
  'much',
  'next',
  'often',
  'only',
  'other',
  'over',
  'part',
  'rather',
  'same',
  'since',
  'some',
  'such',
  'than',
  'that',
  'their',
  'them',
  'then',
  'there',
  'these',
  'they',
  'this',
  'those',
  'through',
  'time',
  'under',
  'until',
  'upon',
  'very',
  'well',
  'were',
  'what',
  'when',
  'where',
  'which',
  'while',
  'will',
  'with',
  'within',
  'would',
  'your',
  // Verbs / modals
  'been',
  'being',
  'came',
  'come',
  'could',
  'does',
  'done',
  'given',
  'have',
  'help',
  'know',
  'known',
  'look',
  'make',
  'must',
  'need',
  'provide',
  'should',
  'take',
  'used',
  'using',
  'want',
  // Nursing-context filler
  'answer',
  'answers',
  'area',
  'care',
  'certain',
  'check',
  'common',
  'course',
  'example',
  'exam',
  'high',
  'important',
  'include',
  'includes',
  'including',
  'large',
  'last',
  'less',
  'long',
  'note',
  'notes',
  'nurse',
  'nursing',
  'order',
  'patient',
  'patients',
  'people',
  'place',
  'practice',
  'question',
  'questions',
  'quiz',
  'result',
  'review',
  'silvestri',
  'hesl',
]);

// ── Helpers ──────────────────────────────────────────────────────────────────

/** Slugify a title into a safe filename base */
function slugify(text) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 80);
}

/**
 * Extract the value of a named field from a GitHub issue form body.
 * GitHub renders each field as:
 *   ### Field Label\n\nvalue\n
 * This handles both single-line (dropdowns/inputs) and multi-line (textareas).
 */
function extractField(body, heading) {
  const escaped = heading.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const re = new RegExp(`###?\\s+${escaped}\\s*\\n+([\\s\\S]*?)(?=\\n###|$)`, 'i');
  const m = body.match(re);
  return m ? m[1].trim() : '';
}

/** Convenience alias for single-line dropdown / input fields */
function extractDropdown(body, fieldLabel) {
  const value = extractField(body, fieldLabel);
  return value.split('\n')[0].trim();
}

/**
 * Extract meaningful keywords from free text for use as frontmatter tags.
 * Returns an array of lowercase slug-safe tag strings (max `limit` items).
 *
 * Strategy:
 *  1. Tokenise into words of ≥ 4 characters, lowercased.
 *  2. Remove stop words.
 *  3. Count single-word frequencies.
 *  4. Collect consecutive meaningful-word bigrams (freq ≥ 2) as hyphenated tags.
 *  5. Return top tags by frequency, bigrams first.
 *
 * @param {string} text   Source text (topic + notes combined)
 * @param {number} limit  Maximum number of tags to return (default 10)
 * @returns {string[]}
 */
function extractKeywords(text, limit = 10) {
  // Tokenise: lowercase, strip punctuation except hyphens within words
  const tokens = text
    .toLowerCase()
    .replace(/[''`]/g, '') // remove apostrophes so "patient's" → "patients"
    .replace(/[^a-z0-9\s-]/g, ' ')
    .split(/\s+/)
    .filter((w) => w.length >= 4 && !STOP_WORDS.has(w) && !/^\d+$/.test(w));

  // Single-word frequency map
  const freq = new Map();
  for (const w of tokens) freq.set(w, (freq.get(w) ?? 0) + 1);

  // Bigram frequency map (hyphenated, e.g. "cardiac-output")
  const bigramFreq = new Map();
  for (let i = 0; i < tokens.length - 1; i++) {
    const bg = `${tokens[i]}-${tokens[i + 1]}`;
    bigramFreq.set(bg, (bigramFreq.get(bg) ?? 0) + 1);
  }

  // Significant bigrams (appear ≥ 2 times in the text)
  const bigrams = [...bigramFreq.entries()]
    .filter(([, c]) => c >= 2)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3)
    .map(([bg]) => bg);

  // Top single words by frequency (excluding words already covered by a bigram)
  const bigramWords = new Set(bigrams.flatMap((bg) => bg.split('-')));
  const words = [...freq.entries()]
    .sort((a, b) => b[1] - a[1])
    .map(([w]) => w)
    .filter((w) => !bigramWords.has(w));

  return [...new Set([...bigrams, ...words])].slice(0, limit);
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

/** Escape single quotes for use inside a YAML single-quoted string */
function yamlSingleQuote(str) {
  return str.replace(/'/g, "\\'");
}

/** Render a tags array as an inline YAML sequence */
function tagsYaml(tags) {
  if (!tags.length) return '[]';
  return `[${tags.map((t) => `'${yamlSingleQuote(t)}'`).join(', ')}]`;
}

/** Render a relatedLinks array as a YAML block sequence */
function relatedLinksYaml(links) {
  if (!links.length) return '[]';
  return (
    '\n' +
    links
      .map((l) => {
        const label =
          l
            .replace(/^https?:\/\/[^/]+/, '')
            .split('/')
            .filter(Boolean)
            .pop() ?? l;
        return `  - label: '${yamlSingleQuote(label)}'\n    url: '${yamlSingleQuote(l)}'`;
      })
      .join('\n')
  );
}

// ── Practice-test note builder ────────────────────────────────────────────────

/**
 * Parse a practice-test issue and return { title, tags, content, noteType }.
 *
 * The practice-test template provides:
 *   - Quiz Source  (dropdown)
 *   - Quiz Topic   (input)
 *   - Notes        (textarea)
 */
function parsePracticeTest(issueBody, issueNumber) {
  const quizSource = extractDropdown(issueBody, 'Quiz Source');
  const quizTopic = extractField(issueBody, 'Quiz Topic');
  const notes = extractField(issueBody, 'Notes');

  // Derive a clean source abbreviation for tagging and display
  const sourceTag = quizSource.toLowerCase().includes('hesl') ? 'hesl' : 'silvestri';
  const sourceLabel = quizSource || 'Practice Quiz';

  // Auto-title: "HESL Practice Quiz — Cardiac Pharmacology"
  const title = quizTopic
    ? `${sourceLabel} — ${quizTopic}`
    : `${sourceLabel} Notes (Issue #${issueNumber})`;

  // Keyword tags: fixed prefix tags + extracted content keywords
  const extracted = extractKeywords(`${quizTopic} ${notes}`);
  const tags = [...new Set([sourceTag, 'practice-quiz', ...extracted])];

  // Well-structured MDX content block
  const today = new Date().toISOString().slice(0, 10);
  const topicHeading = quizTopic || sourceLabel;
  const notesBody = notes
    ? notes
    : '_No notes were provided. Please edit this file and add your content._';

  const content = [
    `## ${topicHeading}`,
    '',
    `| Field | Details |`,
    `| ----- | ------- |`,
    `| **Source** | ${sourceLabel} |`,
    `| **Topic** | ${quizTopic || '—'} |`,
    `| **Date** | ${today} |`,
    '',
    '---',
    '',
    '### Notes',
    '',
    notesBody,
  ].join('\n');

  return { title, tags, content, noteType: 'reference' };
}

// ── General note builder ──────────────────────────────────────────────────────

/**
 * Parse a general note-submission issue and return { title, tags, content, noteType }.
 *
 * The general template provides:
 *   - Suggested Title (input)
 *   - Raw Notes       (textarea)
 *   - Note Type       (dropdown)
 *   - Tags            (input, optional)
 */
function parseGeneralNote(issueBody, issueTitle, issueNumber) {
  const rawTitle =
    extractField(issueBody, 'Suggested Title') ||
    issueTitle.replace(/^\[(?:Note|BSN)\]:\s*/i, '').trim() ||
    `Note from Issue #${issueNumber}`;

  const rawNotes = extractField(issueBody, 'Raw Notes');

  const noteTypeRaw = extractDropdown(issueBody, 'Note Type') || 'general';
  const noteType = ['meeting', 'idea', 'reference', 'task', 'research', 'general'].includes(
    noteTypeRaw
  )
    ? noteTypeRaw
    : 'general';

  // Merge user-supplied tags with auto-extracted keywords
  const tagsRaw = extractField(issueBody, 'Tags') || extractDropdown(issueBody, 'Tags');
  const userTags = tagsRaw
    ? tagsRaw
        .split(/[,\n]+/)
        .map((t) => t.trim().replace(/^['"]|['"]$/g, ''))
        .filter(Boolean)
    : [];
  const extracted = extractKeywords(`${rawTitle} ${rawNotes}`);
  const tags = [...new Set([...userTags, ...extracted])].slice(0, 12);

  const content = rawNotes
    ? rawNotes
    : '_No note content was provided. Please edit this file and add your content._';

  return { title: rawTitle, tags, content, noteType };
}

// ── Main ─────────────────────────────────────────────────────────────────────

async function main() {
  const issueNumber = process.env.ISSUE_NUMBER ?? '';
  const issueTitle = process.env.ISSUE_TITLE ?? '';
  const issueBody = process.env.ISSUE_BODY ?? '';
  const issueUrl = process.env.ISSUE_URL ?? '';
  const issueLabelsRaw = process.env.ISSUE_LABELS ?? '[]';
  const issueLabels = JSON.parse(issueLabelsRaw);

  const isPracticeTest = issueLabels.includes('practice-test');

  // ── 1. Parse fields based on template type ────────────────────────────────
  const {
    title: rawTitle,
    tags,
    content: noteContent,
    noteType,
  } = isPracticeTest
    ? parsePracticeTest(issueBody, issueNumber)
    : parseGeneralNote(issueBody, issueTitle, issueNumber);

  // ── 2. Parse shared fields ────────────────────────────────────────────────
  const visibilityRaw = extractDropdown(issueBody, 'Visibility') || 'public';
  const visibility = ['public', 'private', 'protected'].includes(visibilityRaw)
    ? visibilityRaw
    : 'public';

  const relatedLinksRaw =
    extractField(issueBody, 'Related Internal Links') || extractField(issueBody, 'Related Content');
  const relatedLinks = relatedLinksRaw
    ? relatedLinksRaw
        .split(/[,\n]+/)
        .map((l) => l.trim())
        .filter((l) => l.startsWith('/') || l.startsWith('http'))
    : [];

  // ── 3. Confidence assessment ──────────────────────────────────────────────
  let confidence = 'high';
  const reasons = [];

  const noteBody = isPracticeTest
    ? extractField(issueBody, 'Notes')
    : extractField(issueBody, 'Raw Notes');

  if (!noteBody || noteBody.length < 30) {
    confidence = 'low';
    reasons.push('Note content is very short or missing.');
  } else if (noteBody.length < 100) {
    confidence = 'medium';
    reasons.push('Note content is brief — consider adding more context.');
  }

  if (!rawTitle || rawTitle.startsWith('Note from Issue')) {
    if (confidence === 'high') confidence = 'medium';
    reasons.push('No title was provided; a generated title was used.');
  }

  // ── 4. Duplicate detection ────────────────────────────────────────────────
  const notesDir = resolve('src/content/notes');
  const existingNotes = await loadExistingNotes(notesDir);

  const DUPLICATE_THRESHOLD = 0.6;
  const duplicates = existingNotes.filter(
    (n) =>
      similarity(rawTitle, n.title) > DUPLICATE_THRESHOLD ||
      (noteBody.length > 50 && similarity(noteBody, n.body) > DUPLICATE_THRESHOLD)
  );

  // ── 5. Determine review state ─────────────────────────────────────────────
  const reviewState = confidence === 'low' ? 'needs-review' : 'published';
  const isDraft = confidence === 'low';

  // ── 6. Build frontmatter ──────────────────────────────────────────────────
  const slug = slugify(rawTitle) || `issue-${issueNumber}`;
  const filename = `${slug}.mdx`;
  const today = new Date().toISOString().slice(0, 10);
  const duplicateOfLine = duplicates.length > 0 ? `\nduplicateOf: '${duplicates[0].slug}'` : '';

  const frontmatter = `---
title: '${yamlSingleQuote(rawTitle)}'
tags: ${tagsYaml(tags)}
createdAt: ${today}
draft: ${isDraft}
visibility: ${visibility}
noteType: ${noteType}
reviewState: ${reviewState}
sourceIssue: '${issueUrl}'
relatedLinks: ${relatedLinksYaml(relatedLinks)}
confidence: ${confidence}${duplicateOfLine}
---`;

  const mdxContent = `${frontmatter}\n\n${noteContent}\n`;

  // ── 7. Write the file ─────────────────────────────────────────────────────
  const outputPath = join(notesDir, filename);
  await writeFile(outputPath, mdxContent, 'utf8');

  // ── 8. Build issue comment ────────────────────────────────────────────────
  const typeIcon = isPracticeTest ? '📚' : '📝';
  let comment = `## ${typeIcon} Note Draft Created\n\n`;
  comment += `**File:** \`src/content/notes/${filename}\`\n`;
  comment += `**Type:** ${isPracticeTest ? 'Practice Test Note' : 'General Note'}\n`;
  comment += `**Visibility:** ${visibility}\n`;
  comment += `**Review state:** \`${reviewState}\`\n`;
  comment += `**Agent confidence:** \`${confidence}\`\n`;
  if (tags.length > 0) {
    comment += `**Auto-generated tags:** ${tags.map((t) => `\`${t}\``).join(', ')}\n`;
  }
  comment += '\n';

  if (confidence === 'low') {
    comment += `> ⚠️ **Needs Review** — This note was not published automatically because agent confidence is **low**.\n`;
    comment += `> Review \`src/content/notes/${filename}\`, edit as needed, then set \`reviewState: published\` and \`draft: false\` when ready.\n\n`;
  }

  if (reasons.length > 0) {
    comment += `### Confidence notes\n`;
    for (const r of reasons) comment += `- ${r}\n`;
    comment += '\n';
  }

  if (duplicates.length > 0) {
    comment += `### ⚠️ Possible Duplicates Detected\n`;
    comment += `The following existing notes may overlap with this submission:\n\n`;
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

  // ── 9. Set outputs ────────────────────────────────────────────────────────
  await setOutput('note_file', filename);
  await setOutput('review_state', reviewState);
  await setOutput('comment_body', comment);

  console.log(`✅ Note written: src/content/notes/${filename}`);
  console.log(
    `   template=${isPracticeTest ? 'practice-test' : 'general'}  review_state=${reviewState}  confidence=${confidence}`
  );
  console.log(`   tags=[${tags.join(', ')}]`);
  if (duplicates.length > 0)
    console.log(`   ⚠️ Possible duplicates: ${duplicates.map((d) => d.slug).join(', ')}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
