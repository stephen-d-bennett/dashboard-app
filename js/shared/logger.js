// /js/shared/logger.js

export class Logger {
  constructor() {
    this.key = "debug-log";
    this.root = document.documentElement;
  }

  write(message) {
    const timestamp = new Date().toISOString();
    const entry = `${timestamp} - ${message}\n`;

    const existing = localStorage.getItem(this.key) || "";
    localStorage.setItem(this.key, existing + entry);
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
  }

  screen(message) {
    const box = document.getElementById("debug-console");
    if (!box) return;

    const div = document.createElement("div");
    div.textContent = message;
    box.appendChild(div);
  }

  log(message) {
    this.write(message);
    this.screen(message);
  }
}

export const Debug = new Logger();
