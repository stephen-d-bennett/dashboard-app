// /js/v2/theme.js
export class ThemeEngine {
  constructor() {
    this.root = document.documentElement;
  }

  apply(color) {
    this.root.style.setProperty("--color-brand", color);
  }
}

export const Theme = new ThemeEngine();

// /js/v2/app.js
import { Theme } from "./theme.js";
Theme.apply("#1e3a8a"); // v2 default

// TEMPORARY: v2 is under construction.
// Do NOT call anything else yet.

function initAppV2() {
  // empty on purpose
}

document.addEventListener("DOMContentLoaded", initAppV2);
