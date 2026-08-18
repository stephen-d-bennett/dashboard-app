// /js/v2/app.js

import { runtime } from "../shared/runtime/Runtime.js";
import { hud } from "../shared/hud/HUD.js";
import config from "./config/v2-config.json";

import { Theme } from "./theme.js";
import { loadAllTopics } from "./core/fetch.js";
import { initRouter } from "./core/router.js";
import { initSidebar } from "./components/sidebar.js";
import { initTermPopup } from "./components/term-popup.js";
import { initDictionary } from "./core/dictionary.js";
import { initSearch } from "./core/search.js";

// -------------------------------------------------
// V2 APPLICATION ROOT
// Called by /js/shared/app-loader.js
// v1 has its own DOMContentLoaded boot and ignores runtime.
// -------------------------------------------------

export async function init(runtimeArg) {
  // 1. Apply config to Runtime
  Object.assign(runtime.state, config);
  runtime.version = "v2";

  // 2. Start Runtime
  await runtime.start();

  // 3. HUD
  if (runtime.state.hudEnabled) {
    hud.init();
  }

  // 4. Theme
  Theme.apply(config.theme);

  // 5. Load topics
  const topics = await loadAllTopics();

  // 6. Dictionary
  initDictionary();

  // 7. Search
  initSearch(topics);

  // 8. Routing
  const initialSlug = config.initialSlug;
  history.replaceState({ slug: initialSlug }, "", `/${initialSlug}`);

  // 9. Sidebar
  initSidebar();

  // 10. Term popup
  initTermPopup();

  // 11. Router
  initRouter();

  runtime.log("v2: initialization complete");
}
