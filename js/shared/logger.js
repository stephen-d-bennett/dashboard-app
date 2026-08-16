// /js/shared/logger.js

export class Logger {
  constructor() {
    this.key = "debug-log";
    this.screenEl = null;
    this.ensureScreen();
  }

  ensureScreen() {
    // Create the on-screen console if it doesn't exist
    let el = document.getElementById("debug-console");
    if (!el) {
      el = document.createElement("div");
      el.id = "debug-console";
      el.style.position = "fixed";
      el.style.bottom = "0";
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
    const div = document.createElement("div");
    div.textContent = message;
    this.screenEl.appendChild(div);
  }

  download() {
    const data = localStorage.getItem(this.key) || "";
    const blob = new Blob([data], { type: "text/plain" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "debug-log.txt";
    a.click();

    URL.revokeObjectURL(url);
  }

  clear() {
    localStorage.removeItem(this.key);
    this.screenEl.innerHTML = "";
  }

  log(message) {
    this.write(message);
    this.screen(message);
  }
}

export const Debug = new Logger();
