// /js/v2/components/sidebar.js

import { loadAllTopics } from "../core/fetch.js";
import { qs, createEl } from "../utils/dom.js";

// -------------------------------------------------
// INITIALIZE SIDEBAR
// -------------------------------------------------

export async function initSidebar() {
  const sidebar = qs("#sidebar");
  if (!sidebar) {
    console.warn("Sidebar element not found");
    return;
  }

  try {
    const topics = await loadAllTopics();
    renderSidebarItems(sidebar, topics);
    attachSidebarEvents(sidebar);
  } catch (err) {
    console.error("Failed to load sidebar topics:", err);
  }
}

// -------------------------------------------------
// RENDER SIDEBAR ITEMS
// -------------------------------------------------

function renderSidebarItems(sidebar, topics) {
  sidebar.innerHTML = ""; // Clear existing content

  topics.forEach(topic => {
    const item = createEl("div", {
      class: "sidebar__item",
      "data-topic": topic.slug
    });

    item.textContent = topic.title;
    sidebar.appendChild(item);
  });
}

// -------------------------------------------------
// SIDEBAR CLICK HANDLING
// -------------------------------------------------

function attachSidebarEvents(sidebar) {
  sidebar.addEventListener("click", (e) => {
    const item = e.target.closest("[data-topic]");
    if (!item) return;

    const slug = item.dataset.topic;

    // Dispatch event for router.js
    document.dispatchEvent(
      new CustomEvent("topic:select", { detail: { slug } })
    );
  });
}

// -------------------------------------------------
// EXTERNAL API: highlight active item
// (router.js calls this)
// -------------------------------------------------

export function highlightSidebarItem(slug) {
  const items = document.querySelectorAll("[data-topic]");
  items.forEach(item => {
    item.classList.toggle("is-active", item.dataset.topic === slug);
  });
}
