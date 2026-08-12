// /js/v2/app.js
// Main initializer for the v2 modular architecture

import { listen, emit } from "./utils/events.js";
import { fetchAllTopics, fetchTopicBySlug } from "./core/fetch.js";
import { parseTopic } from "./core/parse.js";
import { renderContent } from "./core/render.js";
import { initRouter, navigateToSlug } from "./core/router.js";
import { initSidebar } from "./components/sidebar.js";
import { initTermPopup } from "./components/term-popup.js";
import { initDictionary } from "./core/dictionary.js";
import { initSearch, searchTopics } from "./core/search.js";

// ---------------------------------------------------------
// GLOBAL IN-MEMORY STORE
// ---------------------------------------------------------
let TOPICS = [];   // all topics from Supabase
let READY = false; // prevents premature routing

// ---------------------------------------------------------
// INITIALIZE V2 APPLICATION
// ---------------------------------------------------------
async function initAppV2() {
  console.log("v2: initializing…");

  // 1. Load all topics from Supabase
  TOPICS = await fetchAllTopics();
  console.log(`v2: loaded ${TOPICS.length} topics from Supabase`);

  // 2. Initialize dictionary (if dictionary terms come from Supabase)
  initDictionary();

  // 3. Build search index
  initSearch(TOPICS);

  // 4. Initialize UI components
  initSidebar();
  initTermPopup();

  // 5. Initialize router
  initRouter();

  READY = true;

  // 6. Load initial topic based on URL
  const initialSlug = window.location.pathname.replace("/", "") || "theological-virtues";
  navigateToSlug(initialSlug);
}

initAppV2();

// ---------------------------------------------------------
// EVENT: Router requests a topic load
// ---------------------------------------------------------
listen("router:topic", async ({ slug }) => {
  if (!READY) return;

  const topic = await fetchTopicBySlug(slug);
  if (!topic) {
    console.warn(`v2: topic not found for slug: ${slug}`);
    return;
  }

  const html = parseTopic(topic);
  renderContent(html);

  emit("content:rendered", { slug });
});

// ---------------------------------------------------------
// EVENT: Sidebar navigation
// ---------------------------------------------------------
listen("sidebar:navigate", ({ slug }) => {
  navigateToSlug(slug);
});

// ---------------------------------------------------------
// EVENT: Search query
// ---------------------------------------------------------
listen("search:query", ({ query }) => {
  const results = searchTopics(query);
  emit("search:results", { query, results });
});
