console.log("LOGGER FILE EXECUTED");

// FILE: /js/shared/logger.js

// Create HUD if missing
export function ensureHUD() {
  let hud = document.getElementById("debug-hud");
  if (!hud) {
    hud = document.createElement("pre");
    hud.id = "debug-hud";
    hud.style.cssText = `
      position: fixed;
      bottom: 0;
      left: 0;
      right: 0;
      max-height: 40vh;
      overflow-y: auto;
      background: rgba(0,0,0,0.85);
      color: #0f0;
      padding: 8px;
      font-size: 12px;
      white-space: pre-wrap;
      z-index: 999999;
    `;
    document.body.appendChild(hud);
  }
}

// Write to HUD + console
export function log(msg) {
  // make sure HUD exists before writing
  ensureHUD();
  const hud = document.getElementById("debug-hud");
  hud.textContent += msg + "\n";
  console.log(msg);
}

// Hide HUD
export function hideHUD() {
  const hud = document.getElementById("debug-hud");
  if (hud) hud.style.display = "none";
}

// Show HUD
export function showHUD() {
  const hud = document.getElementById("debug-hud");
  if (hud) hud.style.display = "block";
}

// Toggle HUD
export function toggleHUD() {
  const hud = document.getElementById("debug-hud");
  if (!hud) return;
  hud.style.display = (hud.style.display === "none") ? "block" : "none";
}

// Clear HUD
export function clearHUD() {
  const hud = document.getElementById("debug-hud");
  if (hud) hud.textContent = "";
}
