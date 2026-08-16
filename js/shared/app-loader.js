// FILE: /js/shared/app-loader.js

import { ensureHUD, log } from "/js/shared/logger.js";

async function loadConfig() {
  const res = await fetch("/config/app-config.json", { cache: "no-store" });
  return await res.json();
}

export async function start() {
  ensureHUD();
  log("loader: started");

  const config = await loadConfig();
  const version = config.version;

  log("loader: version = " + version);

  // Load CSS for the version
  const css = document.createElement("link");
  css.rel = "stylesheet";
  css.href = `/css/${version}/app.css`;
  document.head.appendChild(css);

  log("loader: importing ../" + version + "/app.js");
  const module = await import(`../${version}/app.js`);

  log("loader: module loaded");

  if (typeof module.init === "function") {
    log("loader: calling init()");
    await module.init();
  }
}
