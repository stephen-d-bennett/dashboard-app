// /js/shared/logger.js

export class Logger {
  
  constructor() {
    this.key = "debug-log";
    this.screenEl = null;
  }

  ensureScreen() {
    let el = document.getElementById("debug-console");
    if (!el) {
      el = document.createElement("div");
      el.id = "debug-console";
      el.style.position = "fixed";
      el.style.top = "0";
      el.style.left = "0";
      el.style.width = "100%";
      el.style.maxHeight = "30%";
      el.style.overflowY = "auto";
      el.style.background = "#0008";
      el.style.color = "#0f0";
      el.style.fontSize = "12px";
      el.style.padding = "6px";
      el.style.whiteSpace = "pre-wrap";
      el.style.zIndex = "9999";
      document.body.appendChild(el);
    }
    this.screenEl = el;
  }

  write(message) {
    const timestamp = new Date().toISOString();
    const entry = `${timestamp} - ${message}\n`;
    const existing = localStorage.getItem(this.key) || "";
    localStorage.setItem(this.key, existing + entry);
  }

  screen(message) {
    if (!this.screenEl) return;
    const div = document.createElement("div");
    div.textContent = message;
    this.screenEl.appendChild(div);
  }

  log(message) {
    this.write(message);
    this.screen(message);
  }
}

export const Debug = new Logger();

// DOM READY FIX FOR iOS SAFARI
document.addEventListener("DOMContentLoaded", () => {
  Debug.ensureScreen();
});
