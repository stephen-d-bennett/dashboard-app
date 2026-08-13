alert("LOADER EXECUTED");

// -------------------------------------------------------------
// Load configuration (JSON import)
// -------------------------------------------------------------
import { appConfig } from "./config.js";


// -------------------------------------------------------------
// Debug Overlay (minimal)
// -------------------------------------------------------------
if (appConfig.debug?.console) {
  const box = document.createElement("div");
  box.id = "debug-box";
  box.style.cssText = `
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    max-height: 30%;
    overflow-y: auto;
    background: #0008;
    color: #0f0;
    font-size: 12px;
    padding: 6px;
    white-space: pre-wrap;
    z-index: 9999;
  `;
  document.body.appendChild(box);
}


// -------------------------------------------------------------
// Debug Logger Helper
// -------------------------------------------------------------
function debug(msg) {
  if (appConfig.debug?.logging) {
    console.log(msg);
  }
  const box = document.getElementById("debug-box");
  if (box) box.textContent += msg + "\n";
}

debug("Loader initialized");
debug("Config loaded");
debug("Version: " + appConfig.version);


// -------------------------------------------------------------
// Version Toggle
// -------------------------------------------------------------
const version = appConfig.version;
debug("Using version: " + version);


// -------------------------------------------------------------
// CSS Loader
// -------------------------------------------------------------
const css = document.getElementById("css-loader");

if (version === "v1") {
  css.href = "css/app.css";
  debug("CSS loaded: css/app.css");
} else {
  css.href = "css/v2/v2.css";
  debug("CSS loaded: css/v2/v2.css");
}


// -------------------------------------------------------------
// JS Loader
// -------------------------------------------------------------
if (version === "v1") {
  debug("Importing JS: app.js");
  import("./app.js");
} else {
  debug("Importing JS: v2/app.js");
  import("./v2/app.js");
}
