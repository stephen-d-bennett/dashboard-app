import { Debug } from "/shared/logger.js";
document.addEventListener("DOMContentLoaded", () => {
  Debug.log("loader: started");
  Debug.log("loader: current file = " + import.meta.url);
});

async function loadConfig() {
  const res = await fetch("/config/app-config.json", { cache: "no-store" });
  return await res.json();
}

(async () => {
  const config = await loadConfig();
  
  const version = config.version;
  Debug.log("loader: version = " + version);

  const css = document.createElement("link");
  css.rel = "stylesheet";
  css.href = `/css/${version}/app.css`;
  document.head.appendChild(css);

  Debug.log("loader: importing /js/" + version + "/app.js");
  await import(`/js/${version}/app.js`);
  Debug.log("loader: module loaded");

})();
