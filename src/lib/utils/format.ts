import { sanitizeHtmlToPlainText } from "./sanitize";

const DEFAULT_WORDS_PER_MINUTE = 200;
const DEFAULT_MAX_LENGTH = 200;

/**
 * Format any ISO date string into readable "Month Day, Year" format.
 */
export function formatDate(dateString: string): string {
  try {
    const date = new Date(dateString);
    if (Number.isNaN(date.getTime())) return dateString;
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(date);
  } catch {
    return dateString;
  }
}

/**
 * Calculate estimated reading time in minutes from text content.
 */
export function estimateReadingTime(
  content: string,
  wordsPerMinute: number = DEFAULT_WORDS_PER_MINUTE,
): string {
  const text = sanitizeHtmlToPlainText(content);
  if (!text) return "1 min";
  const wordCount = text.split(/\s+/).filter(Boolean).length;
  const minutes = Math.max(1, Math.ceil(wordCount / wordsPerMinute));
  return `${minutes} min`;
}

/**
 * Truncate text cleanly at word boundaries with an ellipsis.
 */
export function truncateText(
  content: string,
  maxLength: number = DEFAULT_MAX_LENGTH,
): string {
  const text = sanitizeHtmlToPlainText(content);
  if (text.length <= maxLength) return text;
  const truncated = text.slice(0, maxLength);
  const lastSpace = truncated.lastIndexOf(" ");
  return `${truncated.slice(0, lastSpace > 0 ? lastSpace : maxLength)}…`;
}

/**
 * Generate a clean URL slug from a title string.
 */
export function createSlug(title: string): string {
  return (
    title
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .replace(/^-+|-+$/g, "") || "item"
  );
}

/**
 * Extract or generate a slug from a URL link or fallback title.
 */
export function getSlugFromUrl(link: string, fallbackTitle: string): string {
  try {
    const url = new URL(link);
    const segments = url.pathname.split("/").filter(Boolean);
    return segments.at(-1) || createSlug(fallbackTitle);
  } catch {
    return createSlug(fallbackTitle);
  }
}
