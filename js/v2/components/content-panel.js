// /js/v2/components/content-panel.js

import { qs } from "../utils/dom.js";

// -------------------------------------------------
// INITIALIZE CONTENT PANEL
// -------------------------------------------------

export function initContentPanel() {
  const panel = qs("#content-panel");
  const closeBtn = qs("#content-panel-close");

  if (!panel) {
    console.warn("Content panel element not found");
    return;
  }

  // Close button
  if (closeBtn) {
    closeBtn.addEventListener("click", () => closePanel());
  }

  // Close on ESC
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closePanel();
  });

  // Close on outside click (optional)
  document.addEventListener("click", (e) => {
    if (panel.classList.contains("is-open")) {
      if (!panel.contains(e.target) && !e.target.closest(".sidebar__item")) {
        // closePanel();   // enable if you want outside-click close
      }
    }
  });
}

// -------------------------------------------------
// OPEN PANEL
// -------------------------------------------------

export function openPanel() {
  const panel = qs("#content-panel");
  if (!panel) return;

  panel.classList.add("is-open");

  // Reset scroll position
  panel.scrollTop = 0;
}

// -------------------------------------------------
// CLOSE PANEL
// -------------------------------------------------

export function closePanel() {
  const panel = qs("#content-panel");
  if (!panel) return;

  panel.classList.remove("is-open");
}

// -------------------------------------------------
// AUTO-OPEN WHEN NEW CONTENT IS RENDERED
// (router.js calls this after renderArticle)
// -------------------------------------------------

export function openPanelForTopic() {
  openPanel();
}
