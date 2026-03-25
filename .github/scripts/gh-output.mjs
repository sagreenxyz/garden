/**
 * gh-output.mjs
 * Helper to write GitHub Actions step outputs to $GITHUB_OUTPUT.
 * Falls back to console.log in local environments where GITHUB_OUTPUT is not set.
 */
import { appendFile } from 'node:fs/promises';
import { EOL } from 'node:os';

/**
 * Set a GitHub Actions output variable.
 * @param {string} name  Output variable name
 * @param {string} value Output value (must not contain newlines for single-line values)
 */
export async function setOutput(name, value) {
  const outputFile = process.env.GITHUB_OUTPUT;
  if (outputFile) {
    // Use the heredoc delimiter syntax so multi-line values are safe
    const delimiter = `ghadelimiter_${Math.random().toString(36).slice(2)}`;
    await appendFile(outputFile, `${name}<<${delimiter}${EOL}${value}${EOL}${delimiter}${EOL}`);
  } else {
    // Local dev fallback — GITHUB_OUTPUT is not available
    console.log(`[local] output ${name}=${value}`);
  }
}
