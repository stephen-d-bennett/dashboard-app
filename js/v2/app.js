// /js/v2/app.js
import { Theme } from "./theme.js";
Theme.apply("#1e3a8a"); // v2 default

// All imports commented out for isolation testing
// import { loadAllTopics } from "./core/fetch.js";
// import { initRouter } from "./core/router.js";
// import { initSidebar } from "./components/sidebar.js";
// import { initTermPopup } from "./components/term-popup.js";
// import { initDictionary } from "./core/dictionary.js";
// import { initSearch } from "./core/search.js";

async function initAppV2() {
  // Everything below removed because these functions are undefined
  // when imports are commented out.

  // const topics = await loadAllTopics();
  // initDictionary();
  // initSearch(topics);

  // const initialSlug = window.location.pathname.replace("/", "") || "theological-virtues";
  // history.replaceState({ slug: initialSlug }, "", `/${initialSlug}`);

  // initSidebar();
  // initTermPopup();
  // initRouter();
}

document.addEventListener("DOMContentLoaded", initAppV2);
