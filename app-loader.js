console.log("app-loader.js is running");

import { log } from "./logger.js";
import { start } from "./v2/app.js";

log("app-loader.js loaded.");
log("Calling init()...");

export function init() {
  log("init() inside app-loader.js ran successfully.");
  log("Calling v2/app.js start()...");
  start();
}
