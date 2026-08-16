// FILE: /js/shared/app-loader.js

import { Debug } from "./logger.js";

async function loadConfig() {
  const res = await fetch("/config/app-config.json", { cache: "no-store" });
  return await res.json();
}

export async function start() {
  Debug.ensureScreen();   // ← iOS fix
  Debug.log("loader: started");

  const config = await loadConfig();
  const version = config.version;

  Debug.log("loader: version = " + version);

  // Load CSS for the version
  const css = document.createElement("link");
  css.rel = "stylesheet";
  css.href = `/css/${version}/app.css`;
  document.head.appendChild(css);

  // Import the versioned app.js
  Debug.log("loader: importing ../" + version + "/app.js");
  const module = await import(`../${version}/app.js`);

  Debug.log("loader: module loaded");

  // Call init() if it exists
  if (typeof module.init === "function") {
    Debug.log("loader: calling init()");
    await module.init();
  }
}
