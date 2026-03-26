/**
 * Estimates reading time for a given content string.
 * @param content - Raw text content (MDX/Markdown source or plain text)
 * @returns Reading time in minutes (minimum 1)
 */
export function getReadingTime(content: string): number {
  const wordCount = content.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(wordCount / 200));
}
