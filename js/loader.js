// -------------------------------------------------------------
// Load configuration
// -------------------------------------------------------------
import { appConfig } from "./config.js";


// -------------------------------------------------------------
// Version Toggle (active)
// -------------------------------------------------------------
// appConfig.version = "v1" or "v2"
// This controls which CSS + JS bundle loads.
const version = appConfig.version;


// -------------------------------------------------------------
// CSS Loader
// -------------------------------------------------------------
const css = document.getElementById("css-loader");

if (version === "v1") {
  css.href = "css/app.css";        // v1 stylesheet
} else {
  css.href = "css/v2/v2.css";      // v2 stylesheet
}


// -------------------------------------------------------------
// JS Loader
// -------------------------------------------------------------
if (version === "v1") {
  import("./app.js");              // v1 script
} else {
  import("./v2/app.js");           // v2 script (ES module)
}


// -------------------------------------------------------------
// Future: Theme Defaults
// -------------------------------------------------------------
// if (appConfig.theme?.default) {
//   const theme = appConfig.theme.default;
//   const root = document.documentElement;
//
//   const themeColors = {
//     original: "#253544",
//     marian: "#1e3a8a",
//     forest: "#2f6a4f",
//     cardinal: "#8b1e2f"
//   };
//
//   if (themeColors[theme]) {
//     root.style.setProperty("--theme-color", themeColors[theme]);
//   }
// }


// -------------------------------------------------------------
// Future: Feature Flags
// -------------------------------------------------------------
// if (appConfig.features?.newSidebar) {
//   import("./v2/sidebar.js");
// }
//
// if (appConfig.features?.newSearch) {
//   import("./v2/search.js");
// }


// -------------------------------------------------------------
// Future: Environment Switching
// -------------------------------------------------------------
// if (appConfig.env) {
//   const supabase = window.supabase.createClient(
//     appConfig.env.supabaseUrl,
//     appConfig.env.supabaseKey
//   );
// }


// -------------------------------------------------------------
// Future: Debug / Diagnostics
// -------------------------------------------------------------
// if (appConfig.debug?.logging) {
//   console.log("Loader initialized");
//   console.log("Version:", version);
//   console.log("CSS loaded:", css.href);
// }
//
// if (appConfig.debug?.showVersionBanner) {
//   const banner = document.createElement("div");
//   banner.textContent = `Running ${version}`;
//   banner.style.cssText = `
//     position: fixed;
//     bottom: 10px;
//     right: 10px;
//     background: #0008;
//     color: white;
//     padding: 6px 10px;
//     border-radius: 4px;
//     font-size: 12px;
//     z-index: 9999;
//   `;
//   document.body.appendChild(banner);
// }
