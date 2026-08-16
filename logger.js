let hud = null;

export function log(msg) {
  ensureHUD();
  hud.textContent += msg + "\n";
}

function ensureHUD() {
  // If HUD already exists, we're done
  if (hud) return;

  // If <body> doesn't exist yet, wait for DOMContentLoaded
  if (!document.body) {
    window.addEventListener("DOMContentLoaded", ensureHUD);
    return;
  }

  // Create HUD once DOM is ready
  hud = document.createElement("pre");
  hud.id = "debug-hud";
  hud.style.cssText = `
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    background: rgba(0,0,0,0.85);
    color: #0f0;
    padding: 10px;
    font-size: 14px;
    z-index: 2147483647;
    max-height: 40vh;
    overflow-y: auto;
    white-space: pre-wrap;
  `;
  document.body.appendChild(hud);
}
