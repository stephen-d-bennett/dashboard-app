// /js/v2/core/render.js

import { qs } from "../utils/dom.js";

export function renderArticle(html) {
  const panel = qs("#content-panel");
  if (!panel) {
    console.warn("Content panel not found");
    return;
  }

  panel.innerHTML = html;

  // Optional enhancement hooks
  enhanceTerms(panel);
  enhanceImages(panel);
}

// -------------------------------------------------
// TERM ENHANCEMENT (inline popups)
// -------------------------------------------------

function enhanceTerms(root) {
  const terms = root.querySelectorAll("[data-term]");
  terms.forEach(el => {
    el.addEventListener("click", () => {
      const term = el.getAttribute("data-term");
      openTermPopup(term);
    });
  });
}

// -------------------------------------------------
// IMAGE ENHANCEMENT (future-proof)
// -------------------------------------------------

function enhanceImages(root) {
  const imgs = root.querySelectorAll("img");
  imgs.forEach(img => {
    img.loading = "lazy";
  });
}

// -------------------------------------------------
// POPUP HANDLER (delegated to component module)
// -------------------------------------------------

function openTermPopup(term) {
  // This will be implemented in /components/term-popup.js
  document.dispatchEvent(
    new CustomEvent("term:open", { detail: { term } })
  );
}
