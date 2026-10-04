/**
 * Safe HTML entity decoding and tag sanitization utility.
 * Protects against malformed tags, nested script injections, and common RSS entity variations.
 */

const HTML_ENTITIES: Record<string, string> = {
  "&amp;": "&",
  "&lt;": "<",
  "&gt;": ">",
  "&quot;": '"',
  "&#39;": "'",
  "&apos;": "'",
  "&nbsp;": " ",
  "&#8217;": "'",
  "&#8216;": "'",
  "&#8220;": '"',
  "&#8221;": '"',
  "&#8212;": "—",
  "&#8211;": "–",
  "&#8230;": "…",
};

export function decodeHtmlEntities(text: string): string {
  if (!text) return "";
  let decoded = text;
  for (const [entity, replacement] of Object.entries(HTML_ENTITIES)) {
    decoded = decoded.replaceAll(entity, replacement);
  }
  // Decode remaining decimal numeric entities &#NN;
  decoded = decoded.replace(/&#(\d+);/g, (_, dec) => {
    try {
      return String.fromCharCode(Number.parseInt(dec, 10));
    } catch {
      return "";
    }
  });
  return decoded;
}

export function sanitizeHtmlToPlainText(rawHtml: string): string {
  if (!rawHtml) return "";

  // Strip dangerous executable and styling containers repeatedly to prevent nested bypasses
  let cleaned = rawHtml;
  let previous = "";
  while (cleaned !== previous) {
    previous = cleaned;
    cleaned = cleaned
      .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, " ")
      .replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, " ")
      .replace(/<iframe\b[^<]*(?:(?!<\/iframe>)<[^<]*)*<\/iframe>/gi, " ")
      .replace(/<!--[\s\S]*?-->/g, " ");
  }

  // Strip remaining HTML tags
  cleaned = cleaned.replace(/<[^>]+>/g, " ");

  // Decode entities and normalize whitespace
  cleaned = decodeHtmlEntities(cleaned);
  cleaned = cleaned.replace(/\s+/g, " ").trim();

  return cleaned;
}
