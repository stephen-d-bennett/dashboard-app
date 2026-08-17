// /js/v2/app.js

import { Theme } from "./theme.js";
import { loadAllTopics } from "./core/fetch.js";
import { initRouter } from "./core/router.js";
import { initSidebar } from "./components/sidebar.js";
import { initTermPopup } from "./components/term-popup.js";
import { initDictionary } from "./core/dictionary.js";
import { initSearch } from "./core/search.js";

export async function init() {

  // Apply theme
  Theme.apply("#1e3a8a");

  // Load topics
  const topics = await loadAllTopics();

  // Dictionary
  initDictionary();

  // Search
  initSearch(topics);

  // Routing initial slug
  const initialSlug = window.location.pathname.replace("/", "") || "theological-virtues";
  history.replaceState({ slug: initialSlug }, "", `/${initialSlug}`);

  // Sidebar
  initSidebar();

  // Term popup
  initTermPopup();

  // Router
  initRouter();

}
