// /js/v2/components/topic-card.js

import { delegate } from "../utils/dom.js";

// -------------------------------------------------
// INITIALIZE TOPIC CARDS
// -------------------------------------------------

export function initTopicCards() {
  const container = document.querySelector("#topic-cards");
  if (!container) {
    console.warn("Topic card container not found");
    return;
  }

  attachCardEvents(container);
}

// -------------------------------------------------
// CARD EVENT HANDLING
// -------------------------------------------------

function attachCardEvents(container) {
  // Hover effect (desktop only)
  delegate(container, ".topic-card", "mouseenter", (_, card) => {
    card.classList.add("is-hovered");
  });

  delegate(container, ".topic-card", "mouseleave", (_, card) => {
    card.classList.remove("is-hovered");
  });

  // Click → dispatch topic selection
  delegate(container, ".topic-card", "click", (_, card) => {
    const slug = card.dataset.topic;
    if (!slug) return;

    document.dispatchEvent(
      new CustomEvent("topic:select", { detail: { slug } })
    );
  });
}
