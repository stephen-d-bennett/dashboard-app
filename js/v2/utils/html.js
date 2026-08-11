// /js/v2/utils/html.js

// -------------------------------------------------
// ESCAPE HTML (for safety)
// -------------------------------------------------

export function escapeHtml(str = "") {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

// -------------------------------------------------
// BASIC SANITIZATION (remove unsafe tags)
// -------------------------------------------------

export function sanitizeHtml(str = "") {
  // Remove script/style/link/iframe tags entirely
  return str
    .replace(/<script[\s\S]*?>[\s\S]*?<\/script>/gi, "")
    .replace(/<style[\s\S]*?>[\s\S]*?<\/style>/gi, "")
    .replace(/<iframe[\s\S]*?>[\s\S]*?<\/iframe>/gi, "")
    .replace(/<link[\s\S]*?>/gi, "")
    .replace(/on\w+="[^"]*"/gi, ""); // remove inline JS handlers
}

// -------------------------------------------------
// TRIM + NORMALIZE WHITESPACE
// -------------------------------------------------

export function normalizeWhitespace(str = "") {
  return str
    .trim()
    .replace(/\s+/g, " ");
}

// -------------------------------------------------
// AUTO-LINK DICTIONARY TERMS
// -------------------------------------------------

export function autoLinkTerms(str = "", terms = []) {
  if (!terms.length) return str;

  let output = str;

  terms.forEach((term) => {
    const regex = new RegExp(`\\b${term}\\b`, "gi");
    output = output.replace(
      regex,
      `<span class="term" data-term="${term.toLowerCase()}">${term}</span>`
    );
  });

  return output;
}

// -------------------------------------------------
// SCRIPTURE REFERENCE FORMATTING
// -------------------------------------------------

export function formatScriptureRefs(str = "") {
  // Matches patterns like "John 6:53" or "1 Corinthians 12:4"
  const scriptureRegex = /\b([1-3]?\s?[A-Za-z]+)\s(\d+):(\d+)\b/g;

  return str.replace(scriptureRegex, (match, book, chapter, verse) => {
    const ref = `${book} ${chapter}:${verse}`;
    const slug = `${book}-${chapter}-${verse}`
      .toLowerCase()
      .replace(/\s+/g, "-");

    return `<span class="scripture-ref" data-ref="${slug}">${ref}</span>`;
  });
}

// -------------------------------------------------
// QUOTE FORMATTING
// -------------------------------------------------

export function formatQuotes(str = "") {
  // Wrap long quotes in <blockquote>
  if (str.startsWith("“") && str.endsWith("”")) {
    return `<blockquote class="quote">${str}</blockquote>`;
  }
  return str;
}

// -------------------------------------------------
// MASTER CLEANER (pipeline)
// -------------------------------------------------

export function cleanHtml(str = "", terms = []) {
  let out = str;

  out = sanitizeHtml(out);
  out = normalizeWhitespace(out);
  out = autoLinkTerms(out, terms);
  out = formatScriptureRefs(out);
  out = formatQuotes(out);

  return out;
}
