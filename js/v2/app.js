// /js/v2/app.js
// Main initializer for the v2 modular architecture

import { loadAllTopics } from "./core/fetch.js";
import { initRouter } from "./core/router.js";
import { initSidebar } from "./components/sidebar.js";
import { initTermPopup } from "./components/term-popup.js";
import { initDictionary } from "./core/dictionary.js";
import { initSearch } from "./core/search.js";

async function initAppV2() {
  console.log("v2: initializing…");

  // Load all topics from Supabase
  const topics = await loadAllTopics();
  console.log(`v2: loaded ${topics.length} topics from Supabase`);

  // Initialize dictionary (if dictionary terms come from Supabase)
  initDictionary();

  // Build search index
  initSearch(topics);

  // INITIAL LOAD -- set correct URL without adding to history
  const initialSlug = window.location.pathname.replace("/", "") || "theological-virtues";
  history.replaceState({ slug: initialSlug }, "", `/${initialSlug}`);

  // Initialize UI components
  initSidebar();
  initTermPopup();

  // Initialize router (loads initial topic)
  initRouter();
}

initAppV2();
