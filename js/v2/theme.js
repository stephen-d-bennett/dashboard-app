// /js/v2/theme.js

export const Theme = {
  apply(color) {
    document.documentElement.style.setProperty("--theme-color", color);
  }
};
