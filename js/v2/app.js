// /js/v2/app.js
import { Debug } from "../shared/logger.js";

Debug.log("v2: app.js started");
Debug.log("v2: file = " + import.meta.url);

Debug.log("v2: importing modules");
import { Theme } from "./theme.js";
Theme.apply("#1e3a8a"); // v2 default
Debug.log("v2: theme applied");




// All imports commented out for isolation testing
import { loadAllTopics } from "./core/fetch.js";
Debug.log("v2: imported fetch.js");
import { initRouter } from "./core/router.js";
Debug.log("v2: imported router.js");
import { initSidebar } from "./components/sidebar.js";
Debug.log("v2: imported sidebar.js");
import { initTermPopup } from "./components/term-popup.js";
Debug.log("v2: imported term-popup.js");
import { initDictionary } from "./core/dictionary.js";
Debug.log("v2: imported dictionary.js");
import { initSearch } from "./core/search.js";
Debug.log("v2: imported search.js");


async function initAppV2() {

  const topics = await loadAllTopics();
  Debug.log("v2: all topics loaded");

  initDictionary();
  Debug.log("v2: dictionary loaded");

  initSearch(topics);
  Debug.log("v2: search initialized");

  const initialSlug = window.location.pathname.replace("/", "") || "theological-virtues";
  Debug.log("v2: initial slug = " + initialSlug);

  history.replaceState({ slug: initialSlug }, "", `/${initialSlug}`);
  

  initSidebar();
  Debug.log("v2: sidebar loaded");

  initTermPopup();
  Debug.log("v2: Term Popup initialized");
  
  initRouter();
  Debug.log("v2: router initialized");
  
}

Debug.log("v2: waiting for DOMContentLoaded");
document.addEventListener("DOMContentLoaded", () => {
  Debug.log("v2: DOMContentLoaded fired");
  initAppV2();
});
