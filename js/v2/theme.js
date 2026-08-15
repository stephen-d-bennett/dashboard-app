// /js/v2/theme.js

export class ThemeEngine {
  constructor() {
    this.root = document.documentElement;
  }

  apply(color) {
    this.root.style.setProperty("--brand", color);
  }
}

export const Theme = new ThemeEngine();
