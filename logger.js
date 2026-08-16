// Create HUD
const hud = document.createElement("pre");
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

// Log function
function log(msg) {
  hud.textContent += msg + "\n";
}

// Initial message from logger.js
log("logger.js loaded successfully.");
