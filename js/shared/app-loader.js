// FILE: /js/shared/app-loader.js

import { Debug } from "./logger.js";

async function loadConfig() {
  const res = await fetch("/config/app-config.json", { cache: "no-store" });
  return await res.json();
}

export async function start() {
  Debug.log("loader: started");

  const config = await loadConfig();
  const version = config.version;

  Debug.log("loader: version = " + version);

  // Load CSS for the version
  const css = document.createElement("link");
  css.rel = "stylesheet";
  css.href = `/css/${version}/app.css`;
  document.head.appendChild(css);

  // Correct import path for loader located at /js/shared
  Debug.log("loader: importing ../" + version + "/app.js");
  await import(`../${version}/app.js`);

  Debug.log("loader: module loaded");
}
