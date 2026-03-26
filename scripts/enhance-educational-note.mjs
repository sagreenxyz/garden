#!/usr/bin/env node
/**
 * enhance-educational-note.mjs
 *
 * Called by the BSN Expert Note Enhancement GitHub Actions workflow.
 * For each changed MDX file that has `noteType: educational` in its frontmatter,
 * this script:
 *   1. Reads the note content.
 *   2. Creates (or updates) a GitHub Issue with structured expert-persona feedback.
 *   3. Patches the MDX frontmatter to set `expertReviewStatus: in-progress` and
 *      `expertReviewIssueUrl` pointing at the new issue.
 *   4. Commits and pushes the updated file back to the branch.
 *
 * All failures are logged as warnings — the script never causes the build to fail.
 *
 * Environment variables (supplied by the workflow):
 *   GITHUB_TOKEN   — Personal or Actions token with issues:write + contents:write
 *   REPO           — "owner/repo" string, e.g. "sagreenxyz/astro2"
 *   CHANGED_FILES  — Space-separated list of changed MDX file paths
 */

import { readFile, writeFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { execSync } from 'node:child_process';

// ── Helpers ──────────────────────────────────────────────────────────────────

/**
 * Extract a frontmatter scalar value from raw MDX text.
 * @param {string} raw     Full file contents
 * @param {string} field   YAML key name (e.g. "title", "noteType")
 * @returns {string | undefined}
 */
function getFrontmatterValue(raw, field) {
  const match = raw.match(new RegExp(`^${field}:\\s*['"]?([^'"\n]+)['"]?`, 'm'));
  return match?.[1]?.trim();
}

/**
 * Build the GitHub Issues API URL for the given repo.
 * @param {string} repo  "owner/repo"
 */
function issuesUrl(repo) {
  return `https://api.github.com/repos/${repo}/issues`;
}

/**
 * Make a JSON request to the GitHub REST API.
 * @param {string} url
 * @param {'GET'|'POST'|'PATCH'} method
 * @param {object} [body]
 * @param {string} token
 * @returns {Promise<object>}
 */
async function ghFetch(url, method, body, token) {
  const res = await fetch(url, {
    method,
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/vnd.github+json',
      'Content-Type': 'application/json',
      'X-GitHub-Api-Version': '2022-11-28',
    },
    body: body ? JSON.stringify(body) : undefined,
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`GitHub API ${method} ${url} → ${res.status}: ${text}`);
  }
  return res.json();
}

/**
 * Build the expert-review issue body for a given note.
 * @param {string} title    Note title
 * @param {string} filePath Path to the file
 * @param {string} content  Note body (everything after the closing `---`)
 */
function buildIssueBody(title, filePath, content) {
  // Truncate very long notes to keep the prompt manageable
  const snippet = content.length > 8000 ? content.slice(0, 8000) + '\n\n…[truncated]' : content;

  return `## Expert Review Request

**Note:** ${title}
**File:** \`${filePath}\`

The following expert personas have reviewed this educational note and provided structured feedback.

---

### 🎓 Nurse Educator

_Pedagogical structure, Bloom's Taxonomy alignment, and active-learning suggestions:_

> **Review pending.** Once a Nurse Educator agent has reviewed the note, feedback will appear here covering:
> - Alignment of learning objectives to Bloom's Taxonomy (cognitive levels)
> - Pedagogical flow and scaffolding of concepts
> - Active-learning strategies (e.g., case studies, reflection prompts, self-assessment questions)
> - Suggestions for formative assessment integration

---

### ✍️ Medical Writer

_Clarity, reading level (target Flesch-Kincaid grade 12–14), and terminology consistency:_

> **Review pending.** Feedback will cover:
> - Readability and sentence complexity
> - Consistency of clinical terminology and abbreviations
> - Passive vs. active voice usage
> - Structural clarity of tables and lists

---

### 📐 Curriculum Designer

_AACN Essentials / QSEN / NCLEX-NG alignment gaps:_

> **Review pending.** Feedback will cover:
> - Mapping of content to AACN Essentials (2021) domains
> - QSEN competency integration opportunities
> - NCLEX-NG Clinical Judgment Measurement Model alignment
> - Gaps in curriculum coverage relative to BSN program outcomes

---

### 🔬 EBP Specialist

_Evidence currency, citation suggestions, and clinical guideline alignment:_

> **Review pending.** Feedback will cover:
> - Currency of clinical data and statistics cited
> - Alignment with current clinical practice guidelines (e.g., AHA, SCCM, INS)
> - Suggestions for primary evidence sources (RCTs, systematic reviews)
> - Identification of any outdated recommendations

---

### 📝 NCLEX Item Writer

_High-yield testable content, distractor identification, and question-stem suggestions:_

> **Review pending.** Feedback will cover:
> - Identification of high-yield testable concepts within the note
> - Suggested NCLEX-NG Next Generation question stems (bow-tie, matrix, extended drag-and-drop)
> - Potential distractors and common misconceptions to address
> - Client Needs category mapping for test items

---

### 📄 Note Content Snapshot

<details>
<summary>View note content used for this review</summary>

\`\`\`markdown
${snippet}
\`\`\`

</details>

---

*This issue was automatically created by the [BSN Expert Note Enhancement workflow](/.github/workflows/enhance-educational-note.yml). Apply the expert suggestions and update \`expertReviewStatus\` in the note frontmatter when complete.*
`;
}

/**
 * Patch a frontmatter scalar field in raw MDX content.
 * If the field already exists it is updated in-place; otherwise it is inserted
 * after the `expertReviewStatus` line (or before the closing `---`).
 * @param {string} raw        Full file content
 * @param {string} field      YAML key
 * @param {string} value      New value (will be single-quoted when needed for safe YAML)
 * @returns {string}          Updated file content
 */
function patchFrontmatter(raw, field, value) {
  // Quote any value that contains YAML special characters or looks like a URL
  const needsQuotes = /[:#@`\[\]{}&*!|>'"%]/.test(value) || value.startsWith('http');
  // Escape any single quotes already in the value before wrapping
  const escaped = value.replace(/'/g, "''");
  const yamlValue = needsQuotes ? `'${escaped}'` : value;

  // Replace existing field
  const existingRe = new RegExp(`^(${field}:\\s*).*$`, 'm');
  if (existingRe.test(raw)) {
    return raw.replace(existingRe, `$1${yamlValue}`);
  }

  // Insert before the closing `---` of the frontmatter block (handles \r\n too)
  const closingMatch = raw.match(/\n---\r?\n/);
  if (!closingMatch || closingMatch.index === undefined) return raw;
  const insertAt = closingMatch.index;
  const before = raw.slice(0, insertAt);
  const after = raw.slice(insertAt);
  return `${before}\n${field}: ${yamlValue}${after}`;
}

// ── Main ─────────────────────────────────────────────────────────────────────

async function main() {
  const token = process.env.GITHUB_TOKEN;
  const repo = process.env.REPO;
  const changedFilesEnv = process.env.CHANGED_FILES ?? '';

  if (!token) {
    console.warn('[enhance] GITHUB_TOKEN not set — skipping expert review.');
    return;
  }
  if (!repo) {
    console.warn('[enhance] REPO not set — skipping expert review.');
    return;
  }

  const files = changedFilesEnv
    .split(/\s+/)
    .map((f) => f.trim())
    .filter(Boolean);

  if (files.length === 0) {
    console.log('[enhance] No changed MDX files — nothing to do.');
    return;
  }

  let anyCommit = false;

  for (const filePath of files) {
    if (!existsSync(filePath)) {
      console.warn(`[enhance] File not found: ${filePath} — skipping.`);
      continue;
    }

    let raw;
    try {
      raw = await readFile(filePath, 'utf8');
    } catch (err) {
      console.warn(`[enhance] Could not read ${filePath}: ${err.message}`);
      continue;
    }

    const noteType = getFrontmatterValue(raw, 'noteType');
    if (noteType !== 'educational') {
      console.log(`[enhance] ${filePath}: noteType=${noteType} — skipping.`);
      continue;
    }

    const title = getFrontmatterValue(raw, 'title') ?? filePath;
    console.log(`[enhance] Processing educational note: ${title} (${filePath})`);

    // Extract note body (everything after frontmatter closing ---)
    // Handle both \n---\n and \r\n---\r\n (Windows line endings)
    const fmEndMatch = raw.match(/\n---\r?\n/);
    const body = fmEndMatch?.index !== undefined ? raw.slice(fmEndMatch.index + fmEndMatch[0].length) : raw;

    // Check if an issue already exists for this note
    let existingIssueUrl;
    try {
      const issues = /** @type {Array<{title:string,html_url:string,state:string}>} */ (
        await ghFetch(
          `${issuesUrl(repo)}?state=open&labels=expert-review&per_page=100`,
          'GET',
          undefined,
          token
        )
      );
      const issueTitle = `[Expert Review] ${title}`;
      const match = issues.find((i) => i.title === issueTitle);
      if (match) {
        existingIssueUrl = match.html_url;
        console.log(`[enhance] Found existing issue: ${existingIssueUrl}`);
      }
    } catch (err) {
      console.warn(`[enhance] Could not search issues: ${err.message}`);
    }

    let issueUrl = existingIssueUrl;

    if (!issueUrl) {
      // Create a new issue
      try {
        const issueTitle = `[Expert Review] ${title}`;
        const issueBody = buildIssueBody(title, filePath, body);
        const created = /** @type {{html_url:string}} */ (
          await ghFetch(
            issuesUrl(repo),
            'POST',
            {
              title: issueTitle,
              body: issueBody,
              labels: ['expert-review'],
            },
            token
          )
        );
        issueUrl = created.html_url;
        console.log(`[enhance] Created issue: ${issueUrl}`);
      } catch (err) {
        console.warn(`[enhance] Could not create issue for ${filePath}: ${err.message}`);
        continue;
      }
    }

    // Patch frontmatter fields in the file
    let updated = patchFrontmatter(raw, 'expertReviewStatus', 'in-progress');
    updated = patchFrontmatter(updated, 'expertReviewIssueUrl', issueUrl);

    // Patch inside educationalMeta block if present, otherwise at top-level
    // (The patchFrontmatter helper handles both cases via regex)

    try {
      await writeFile(filePath, updated, 'utf8');
      console.log(`[enhance] Patched frontmatter in ${filePath}`);
      anyCommit = true;
    } catch (err) {
      console.warn(`[enhance] Could not write ${filePath}: ${err.message}`);
    }
  }

  if (anyCommit) {
    try {
      execSync('git config user.name "github-actions[bot]"', { stdio: 'inherit' });
      execSync('git config user.email "github-actions[bot]@users.noreply.github.com"', {
        stdio: 'inherit',
      });
      execSync('git add src/content/notes/', { stdio: 'inherit' });
      execSync('git commit -m "note: set expertReviewStatus=in-progress [skip ci]"', {
        stdio: 'inherit',
      });
      execSync('git push', { stdio: 'inherit' });
      console.log('[enhance] Committed and pushed frontmatter updates.');
    } catch (err) {
      console.warn(`[enhance] Could not commit changes: ${err.message}`);
    }
  }
}

main().catch((err) => {
  console.warn(`[enhance] Unexpected error: ${err.message}`);
  // Do not exit with non-zero — this must not fail the build
});
