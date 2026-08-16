import { log } from "./logger.js";

log("app-loader.js loaded.");

async function loadConfig() {
  log("Loading config...");
  const res = await fetch("./app-config.json", { cache: "no-store" });
  const json = await res.json();
  log("Config loaded: version = " + json.version);
  return json;
}

export async function init() {
  log("init() inside app-loader.js ran successfully.");

  const config = await loadConfig();
  const version = config.version;

  log("Importing version: " + version);

  const module = await import(`./${version}/app.js`);

  log("Version module loaded. Calling start()...");
  module.start();
}
