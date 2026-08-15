async function loadConfig() {
  const res = await fetch("/config/app-config.json", { cache: "no-store" });
  return await res.json();
}

(async () => {
  const config = await loadConfig();
  const version = config.version;

  const css = document.createElement("link");
  css.rel = "stylesheet";
  css.href = `/css/${version}/app.css`;
  document.head.appendChild(css);

  await import(`/js/${version}/app.js`);
})();
