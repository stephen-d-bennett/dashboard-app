import { Debug } from "/js/shared/logger.js";
Debug.log("V2 STARTED");

import { Theme } from "./theme.js";
import { loadAllTopics } from "./core/fetch.js";
import { initRouter } from "./core/router.js";
import { initSidebar } from "./components/sidebar.js";
import { initTermPopup } from "./components/term-popup.js";
import { initDictionary } from "./core/dictionary.js";
import { initSearch } from "./core/search.js";

// Run ONLY after DOM exists
document.addEventListener("DOMContentLoaded", async () => {

  Debug.log("v2: DOMContentLoaded fired");
  Debug.log("v2: app.js starting initialization");

  // Apply theme
  Theme.apply("#1e3a8a");
  Debug.log("v2: theme applied");

  // Load topics
  Debug.log("v2: loading topics...");
  const topics = await loadAllTopics();
  Debug.log("v2: all topics loaded");

  // Dictionary
  Debug.log("v2: initializing dictionary");
  initDictionary();
  Debug.log("v2: dictionary loaded");

  // Search
  Debug.log("v2: initializing search");
  initSearch(topics);
  Debug.log("v2: search initialized");

  // Routing initial slug
  const initialSlug = window.location.pathname.replace("/", "") || "theological-virtues";
  Debug.log("v2: initial slug = " + initialSlug);
  history.replaceState({ slug: initialSlug }, "", `/${initialSlug}`);

  // Sidebar
  Debug.log("v2: initializing sidebar");
  initSidebar();
  Debug.log("v2: sidebar loaded");

  // Term popup
  Debug.log("v2: initializing term popup");
  initTermPopup();
  Debug.log("v2: term popup initialized");

  // Router
  Debug.log("v2: initializing router");
  initRouter();
  Debug.log("v2: router initialized");

  Debug.log("v2: initialization complete");
});
