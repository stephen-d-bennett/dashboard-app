console.log("v2/app.js is running");

import { log } from "../logger.js";

log("v2/app.js loaded.");

export function start() {
  log("v2/app.js start() ran successfully.");
}
