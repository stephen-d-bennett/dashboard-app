// FILE: /js/shared/app-loader.js

async function start() {

    // STEP 2 -- Loader started
    document.body.insertAdjacentHTML(
      "afterbegin",
      `<div style="background:red; color:white; padding:10px;">
         Loader started
       </div>`
    );

    // Load config
    const config = await fetch("/config/app-config.json").then(r => r.json());

    // STEP 3 -- Importing module
    document.body.insertAdjacentHTML(
      "afterbegin",
      `<div style="background:orange; color:black; padding:10px;">
         Importing: /js/${config.version}/app.js
       </div>`
    );

    // Load CSS
    const css = document.createElement("link");
    css.rel = "stylesheet";
    css.href = `/css/${config.version}/app.css`;
    document.head.appendChild(css);

    // Load JS module
    const module = await import(`/js/${config.version}/app.js`);

    // Run init()
    if (typeof module.init === "function") {
        module.init();
    }
}

start();

