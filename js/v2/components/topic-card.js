// /js/v2/components/topic-card.js

import { delegate } from "../utils/dom.js";

export function initTopicCards() {
  const container = document.querySelector("#topic-cards");
  if (!container) {
    console.warn("Topic card container not found");
    return;
  }

  delegate(container, ".topic-card", "click", (_, card) => {
    const slug = card.dataset.topic;
    if (!slug) return;

    document.dispatchEvent(
      new CustomEvent("topic:select", { detail: { slug } })
    );
  });
}
