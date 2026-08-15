console.log("LOADER TOP: If you see this, printing works.");

import { Debug } from "/js/shared/logger.js";

async function loadConfig() {
  const res = await fetch("/config/app-config.json", { cache: "no-store" });
  return await res.json();
}

(async () => {
  Debug.log("loader: started");

  const config = await loadConfig();
  const version = config.version;

  Debug.log("loader: version = " + version);

  // Load CSS for the version
  const css = document.createElement("link");
  css.rel = "stylesheet";
  css.href = `/css/${version}/app.css`;
  document.head.appendChild(css);

  // ⭐ Architecturally correct dynamic import
  Debug.log("loader: importing ./" + version + "/app.js");
  await import(`./${version}/app.js`);

  Debug.log("loader: module loaded");
})();
