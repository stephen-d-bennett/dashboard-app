// /js/v2/core/router.js

import { loadTopic } from "./fetch.js";
import { parseBlocks } from "./parse.js";
import { renderArticle } from "./render.js";
import { qs } from "../utils/dom.js";

// -------------------------------------------------
// INITIALIZE ROUTER
// -------------------------------------------------

export function initRouter() {
  // Load topic from URL on first load
  const slug = getSlugFromURL();
  if (slug) {
    loadAndRenderTopic(slug);
  }

  // Listen for sidebar selections
  document.addEventListener("topic:select", (e) => {
    const slug = e.detail.slug;
    navigateTo(slug);
    loadAndRenderTopic(slug);
  });

  // Handle browser back/forward
  window.addEventListener("popstate", () => {
    const slug = getSlugFromURL();
    if (slug) loadAndRenderTopic(slug);
  });
}

// -------------------------------------------------
// LOAD + RENDER TOPIC
// -------------------------------------------------

async function loadAndRenderTopic(slug) {
  try {
    const topic = await loadTopic(slug);
    const html = parseBlocks(topic.blocks);
    renderArticle(html);
    highlightActiveSidebarItem(slug);
  } catch (err) {
    console.error("Failed to load topic:", err);
  }
}

// -------------------------------------------------
// URL MANAGEMENT
// -------------------------------------------------

function navigateTo(slug) {
  history.pushState({ slug }, "", `?topic=${slug}`);
}

function getSlugFromURL() {
  const params = new URLSearchParams(window.location.search);
  return params.get("topic");
}

// -------------------------------------------------
// SIDEBAR HIGHLIGHTING
// -------------------------------------------------

function highlightActiveSidebarItem(slug) {
  const items = document.querySelectorAll("[data-topic]");
  items.forEach((item) => {
    item.classList.toggle("is-active", item.dataset.topic === slug);
  });
}
