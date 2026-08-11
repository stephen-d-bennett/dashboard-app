// /js/v2/components/term-popup.js

import { qs, createEl } from "../utils/dom.js";

// -------------------------------------------------
// INITIALIZE POPUP SYSTEM
// -------------------------------------------------

export function initTermPopup() {
  // Listen for popup open events from render.js
  document.addEventListener("term:open", (e) => {
    const term = e.detail.term;
    openTermPopup(term);
  });

  // Close popup on ESC
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeTermPopup();
  });
}

// -------------------------------------------------
// OPEN POPUP
// -------------------------------------------------

function openTermPopup(term) {
  const popup = getOrCreatePopup();
  popup.innerHTML = buildPopupContent(term);

  popup.classList.add("is-open");
  positionPopup(popup);
}

// -------------------------------------------------
// CLOSE POPUP
// -------------------------------------------------

export function closeTermPopup() {
  const popup = qs("#term-popup");
  if (!popup) return;

  popup.classList.remove("is-open");
}

// -------------------------------------------------
// POPUP CONTENT
// -------------------------------------------------

function buildPopupContent(term) {
  return `
    <div class="term-popup__header">
      <div class="term-popup__title">${term}</div>
      <button class="term-popup__close" onclick="document.dispatchEvent(new CustomEvent('term:close'))">×</button>
    </div>

    <div class="term-popup__body">
      <p>Loading definition…</p>
    </div>
  `;
}

// -------------------------------------------------
// POPUP ELEMENT CREATION
// -------------------------------------------------

function getOrCreatePopup() {
  let popup = qs("#term-popup");

  if (!popup) {
    popup = createEl("div", { id: "term-popup", class: "term-popup" });
    document.body.appendChild(popup);

    // Close event
    document.addEventListener("term:close", () => closeTermPopup());
  }

  return popup;
}

// -------------------------------------------------
// POSITION POPUP (centered for now)
// -------------------------------------------------

function positionPopup(popup) {
  popup.style.top = "50%";
  popup.style.left = "50%";
  popup.style.transform = "translate(-50%, -50%)";
}
