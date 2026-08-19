// FILE: /js/shared/app-loader.js

async function start() {
    // Load config
    const config = await fetch("/config/app-config.json").then(r => r.json());

    // Load CSS for the selected version
    const css = document.createElement("link");
    css.rel = "stylesheet";
    css.href = `/css/${config.version}/app.css`;
    document.head.appendChild(css);

    // Load JS for the selected version
    const module = await import(`/js/${config.version}/app.js`);

    // Run the version's init() function
    if (typeof module.init === "function") {
        module.init();
    }
}

start();


