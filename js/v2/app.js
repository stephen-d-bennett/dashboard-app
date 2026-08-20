import { initSidebar } from "./components/sidebar.js";
import { initSearch } from "./core/search.js";
import { initDictionary } from "./core/dictionary.js";
import { initRouter } from "./core/router.js";
import { initTermPopup } from "./components/term-popup.js";
import { loadAllTopics } from "./core/fetch.js";
import { Theme } from "./theme.js";

document.body.insertAdjacentHTML(
  "afterbegin",
  `<div style="background:purple; color:white; padding:10px;">
    MODULE: top-level ran
  </div>`
);


document.body.insertAdjacentHTML(
  "beforeend",
  `<div style="background:green; color:white; padding:10px;">
    MODULE: end of file
  </div>`
);

export async function startApp() {
 
  document.body.insertAdjacentHTML(
    "beforeend",
    `<div style="background:black;color:white;padding:10px;">
      APP: startApp() called
    </div>`
  );

  // 1. Theme
  Theme.apply("#1e3a8a");

  // 2. Load topics
  const topics = await loadAllTopics();

  // 3. Dictionary
  initDictionary();

  // 4. Search
  initSearch(topics);

  // 5. Routing initial slug
  const initialSlug = window.location.pathname.replace("/", "") || "theological-virtues";
  history.replaceState({ slug: initialSlug }, "", `/${initialSlug}`);

  // 6. Sidebar
  initSidebar();

  // 7. Term popup
  initTermPopup();

  // 8. Router
  initRouter();

  document.body.insertAdjacentHTML(
    "beforeend",
    `<div style="background:black;color:white;padding:10px;">
      APP: controllers initialized
    </div>`
  );
}
