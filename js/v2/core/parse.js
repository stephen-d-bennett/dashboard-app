// /js/v2/core/parse.js

export function parseBlocks(blocks) {
  return blocks.map(block => {
    switch (block.type) {
      case "text":
        return parseText(block);
      case "html":
        return block.content;
      case "quote":
        return parseQuote(block);
      case "list":
        return parseList(block);
      case "image":
        return parseImage(block);
      case "table":
        return parseTable(block);
      case "dictionary":
        return parseDictionary(block);
      default:
        console.warn("Unknown block type:", block.type);
        return "";
    }
  }).join("");
}

// -------------------------------------------------
// TEXT BLOCK
// -------------------------------------------------

function parseText(block) {
  if (Array.isArray(block.content)) {
    return block.content.map(p => `<p>${p}</p>`).join("");
  }
  return `<p>${block.content}</p>`;
}

// -------------------------------------------------
// QUOTE BLOCK
// -------------------------------------------------

function parseQuote(block) {
  return `
    <blockquote>
      ${block.text}
      ${block.citation ? `<cite>${block.citation}</cite>` : ""}
    </blockquote>
  `;
}

// -------------------------------------------------
// LIST BLOCK
// -------------------------------------------------

function parseList(block) {
  const items = block.items.map(item => `<li>${item}</li>`).join("");
  return `<ul>${items}</ul>`;
}

// -------------------------------------------------
// IMAGE BLOCK
// -------------------------------------------------

function parseImage(block) {
  return `
    <figure>
      <img src="${block.src}" alt="${block.alt || ""}">
      ${block.caption ? `<figcaption>${block.caption}</figcaption>` : ""}
    </figure>
  `;
}

// -------------------------------------------------
// TABLE BLOCK
// -------------------------------------------------

function parseTable(block) {
  const headers = block.headers
    .map(h => `<th>${h}</th>`)
    .join("");

  const rows = block.rows
    .map(row => {
      const cells = row.map(cell => `<td>${cell}</td>`).join("");
      return `<tr>${cells}</tr>`;
    })
    .join("");

  return `
    <table class="article-table">
      <thead><tr>${headers}</tr></thead>
      <tbody>${rows}</tbody>
    </table>
  `;
}

// -------------------------------------------------
// DICTIONARY BLOCK
// -------------------------------------------------

function parseDictionary(block) {
  const defs = block.definitions
    .map(def => `
      <div class="dictionary__definition">
        <div class="dictionary__definition-number">${def.number}</div>
        <div class="dictionary__definition-text">${def.text}</div>
        ${def.example ? `<div class="dictionary__example">${def.example}</div>` : ""}
      </div>
    `)
    .join("");

  const synonyms = block.synonyms?.length
    ? `<ul class="dictionary__list">${block.synonyms.map(s => `<li>${s}</li>`).join("")}</ul>`
    : "";

  const related = block.related?.length
    ? `<ul class="dictionary__list">${block.related.map(r => `<li>${r}</li>`).join("")}</ul>`
    : "";

  return `
    <div class="dictionary">
      <div class="dictionary__term">${block.term}</div>
      ${block.pronunciation ? `<div class="dictionary__pronunciation">${block.pronunciation}</div>` : ""}
      ${block.pos ? `<div class="dictionary__pos">${block.pos}</div>` : ""}

      ${defs}

      ${synonyms ? `<div class="dictionary__section-title">Synonyms</div>${synonyms}` : ""}
      ${related ? `<div class="dictionary__section-title">Related Terms</div>${related}` : ""}
    </div>
  `;
}
