class ThemeEngine {
  constructor() {
    this.root = document.documentElement;
  }

  applyDefault() {
    const defaults = {
      "--brand-dark": "#1E2A3A",
      "--brand": "#2C3E50",
      "--brand-light": "#3F5164",
      "--brand-lighter": "#4F6275",

      "--brand-accent": "#C9A44A",
      "--brand-accent-light": "#E8C56A",

      "--layout-bg": "#F5F6F7",
      "--layout-panel-bg": "#FFFFFF",
      "--layout-panel-accent": "#F2F4F6",
      "--layout-text": "#2E2E2E",
      "--layout-text-light": "#F8F9FA",
      "--layout-border": "#D9DCE0",
      "--layout-shadow": "rgba(0,0,0,0.15)"
    };

    this.applyVariables(defaults);
  }

  apply(baseHex) {
    const { h, s, l } = this.hexToHSL(baseHex);

    const theme = {
      "--brand": baseHex,
      "--brand-light": this.hslToHex(h, s, this.clamp(l + 10)),
      "--brand-lighter": this.hslToHex(h, s, this.clamp(l + 18)),
      "--brand-dark": this.hslToHex(h, s, this.clamp(l - 12)),
      "--brand-accent": this.hslToHex(h, this.clamp(s + 8), this.clamp(l + 22)),
      "--brand-accent-light": this.hslToHex(h, this.clamp(s + 12), this.clamp(l + 30))
    };

    this.applyVariables(theme);
  }

  applyVariables(themeObj) {
    for (const key in themeObj) {
      this.root.style.setProperty(key, themeObj[key]);
    }
  }

  clamp(value) {
    return Math.max(0, Math.min(100, value));
  }

  hexToHSL(H) {
    let r = 0, g = 0, b = 0;

    if (H.length === 4) {
      r = "0x" + H[1] + H[1];
      g = "0x" + H[2] + H[2];
      b = "0x" + H[3] + H[3];
    } else {
      r = "0x" + H[1] + H[2];
      g = "0x" + H[3] + H[4];
      b = "0x" + H[5] + H[6];
    }

    r /= 255;
    g /= 255;
    b /= 255;

    const cmin = Math.min(r, g, b);
    const cmax = Math.max(r, g, b);
    const delta = cmax - cmin;

    let h = 0, s = 0, l = 0;

    if (delta === 0) h = 0;
    else if (cmax === r) h = ((g - b) / delta) % 6;
    else if (cmax === g) h = (b - r) / delta + 2;
    else h = (r - g) / delta + 4;

    h = Math.round(h * 60);
    if (h < 0) h += 360;

    l = (cmax + cmin) / 2;
    s = delta === 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));

    return { h, s: s * 100, l: l * 100 };
  }

  hslToHex(h, s, l) {
    s /= 100;
    l /= 100;

    const k = n => (n + h / 30) % 12;
    const a = s * Math.min(l, 1 - l);
    const f = n =>
      l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)));

    return (
      "#" +
      [f(0), f(8), f(4)]
        .map(x => Math.round(x * 255).toString(16).padStart(2, "0"))
        .join("")
    );
  }

  presets = {
    marianBlue: "#1f3b73",
    liturgicalPurple: "#4b2e83",
    cardinalRed: "#8b1e2f",
    easterGold: "#c9a43b"
  };
}

export const Theme = new ThemeEngine();










/*
class ThemeEngine {
  constructor() {
    this.root = document.documentElement;
  }

  apply(baseHex) {
    const { h, s, l } = this.hexToHSL(baseHex);

    const theme = {
      "--brand": baseHex,
      "--brand-light": this.hslToHex(h, s, this.clamp(l + 10)),
      "--brand-lighter": this.hslToHex(h, s, this.clamp(l + 18)),
      "--brand-dark": this.hslToHex(h, s, this.clamp(l - 12)),
      "--brand-accent": this.hslToHex(h, this.clamp(s + 8), this.clamp(l + 22)),
      "--brand-accent-light": this.hslToHex(h, this.clamp(s + 12), this.clamp(l + 30))
    };

    this.applyVariables(theme);
  }

  applyVariables(themeObj) {
    for (const key in themeObj) {
      this.root.style.setProperty(key, themeObj[key]);
    }
  }

  clamp(value) {
    return Math.max(0, Math.min(100, value));
  }

  hexToHSL(H) {
    let r = 0, g = 0, b = 0;

    if (H.length === 4) {
      r = "0x" + H[1] + H[1];
      g = "0x" + H[2] + H[2];
      b = "0x" + H[3] + H[3];
    } else {
      r = "0x" + H[1] + H[2];
      g = "0x" + H[3] + H[4];
      b = "0x" + H[5] + H[6];
    }

    r /= 255;
    g /= 255;
    b /= 255;

    const cmin = Math.min(r, g, b);
    const cmax = Math.max(r, g, b);
    const delta = cmax - cmin;

    let h = 0, s = 0, l = 0;

    if (delta === 0) h = 0;
    else if (cmax === r) h = ((g - b) / delta) % 6;
    else if (cmax === g) h = (b - r) / delta + 2;
    else h = (r - g) / delta + 4;

    h = Math.round(h * 60);
    if (h < 0) h += 360;

    l = (cmax + cmin) / 2;
    s = delta === 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));

    return { h, s: s * 100, l: l * 100 };
  }

  hslToHex(h, s, l) {
    s /= 100;
    l /= 100;

    const k = n => (n + h / 30) % 12;
    const a = s * Math.min(l, 1 - l);
    const f = n =>
      l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)));

    return (
      "#" +
      [f(0), f(8), f(4)]
        .map(x => Math.round(x * 255).toString(16).padStart(2, "0"))
        .join("")
    );
  }

  presets = {
    marianBlue: "#1f3b73",
    liturgicalPurple: "#4b2e83",
    cardinalRed: "#8b1e2f",
    easterGold: "#c9a43b"
  };
}

export const Theme = new ThemeEngine();
*/
