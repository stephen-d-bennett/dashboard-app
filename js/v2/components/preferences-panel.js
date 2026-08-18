// /js/v2/components/preferences-panel.js

import { qs } from "../utils/dom.js";

// -------------------------------------------------
// INITIALIZE PREFERENCES PANEL (loader calls AFTER DOM is ready)
// -------------------------------------------------

export function initPreferencesPanel() {
  const panel = qs("#preferences-panel");
  const closeBtn = qs("#preferences-close");

  if (!panel) {
    console.warn("Preferences panel element not found");
    return;
  }

  attachPreferencesEvents(panel, closeBtn);

  // Auto-open when requested (v1 behavior)
  document.addEventListener("preferences:open", () => {
    openPreferencesPanel(panel);
  });
}

// -------------------------------------------------
// EVENT HANDLING
// -------------------------------------------------

function attachPreferencesEvents(panel, closeBtn) {
  // Close button
  if (closeBtn) {
    closeBtn.addEventListener("click", () => closePreferencesPanel(panel));
  }

  // ESC closes panel
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      closePreferencesPanel(panel);
    }
  });

  // Optional: click outside to close
  document.addEventListener("click", (e) => {
    if (!panel.classList.contains("is-open")) return;

    const clickedInside = panel.contains(e.target);
    const clickedTrigger = e.target.closest("[data-open='preferences']");
    if (!clickedInside && !clickedTrigger) {
      // closePreferencesPanel(panel); // enable if desired
    }
  });
}

// -------------------------------------------------
// OPEN PANEL
// -------------------------------------------------

function openPreferencesPanel(panel) {
  panel.classList.add("is-open");
  panel.scrollTop = 0;
}

// -------------------------------------------------
// CLOSE PANEL
// -------------------------------------------------

function closePreferencesPanel(panel) {
  panel.classList.remove("is-open");
}
