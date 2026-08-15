import config from "../config/app-config.json" assert { type: "json" };

function loadCSS(path) {
  const link = document.createElement("link");
  link.rel = "stylesheet";
  link.href = path;
  document.head.appendChild(link);
}

async function loadApp() {
  if (config.version === "v2") {
    loadCSS("css/v2/v2.css");
    await import("./v2/app.js");
    console.log("Loaded v2");
  } else {
    loadCSS("css/v1/app.css");
    await import("./v1/app.js");
    console.log("Loaded v1");
  }
}

loadApp();
