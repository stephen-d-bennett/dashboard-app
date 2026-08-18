// /js/v2/components/sidebar.js

import { loadAllTopics } from "../core/fetch.js";
import { qs, createEl } from "../utils/dom.js";

export function Sidebar(runtime) {

  // DOM is guaranteed to exist because loader calls this AFTER DOMContentLoaded
  const sidebar = qs("#sidebar-categories");
  if (!sidebar) {
    console.warn("Sidebar element not found");
    return;
  }

  // Load topics AFTER DOM is ready
  loadAllTopics()
    .then(topics => {
      renderSidebarItems(sidebar, topics);
      attachSidebarEvents(sidebar);
    })
    .catch(err => {
      console.error("Failed to load sidebar topics:", err);
    });
}

function renderSidebarItems(sidebar, topics) {
  sidebar.innerHTML = "";

  topics.forEach(topic => {
    const item = createEl("div", {
      class: "sidebar__item",
      "data-topic": topic.slug
    });

    item.textContent = topic.title;
    sidebar.appendChild(item);
  });
}

function attachSidebarEvents(sidebar) {
  sidebar.addEventListener("click", (e) => {
    const item = e.target.closest("[data-topic]");
    if (!item) return;

    const slug = item.dataset.topic;

    document.dispatchEvent(
      new CustomEvent("topic:select", { detail: { slug } })
    );
  });
}
