// FILE: /js/shared/app-loader.js

async function start() {
  // Load v1 CSS
  const css = document.createElement("link");
  css.rel = "stylesheet";
  css.href = "/css/v1/app.css";
  document.head.appendChild(css);

  // Load v1 JS
  await import("/js/v1/app.js");
}

start();
