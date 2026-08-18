// FILE: /js/shared/ui/about-panel.js

export function AboutPanel(runtime) {
  const aboutBtn = document.getElementById("help-about");
  aboutBtn.style.border = "3px solid red";
  const aboutModal = document.getElementById("about-modal");
  const closeBtn = document.getElementById("about-close");

  aboutBtn.onclick = () => {
    document.getElementById("about-version").textContent = runtime.version;
    document.getElementById("about-loader").textContent = "shared/app-loader.js";
    document.getElementById("about-runtime").textContent = runtime.started ? "running" : "not started";
    document.getElementById("about-hud").textContent = runtime.hudEnabled ? "enabled" : "disabled";
    document.getElementById("about-debug").textContent = runtime.debugEnabled ? "enabled" : "disabled";
    document.getElementById("about-theme").textContent = runtime.themeApplied ? "applied" : "not applied";

    // v1 Supabase check (v2 will simply show "not connected")
    document.getElementById("about-supabase").textContent =
      window.client ? "connected" : "not connected";

    document.getElementById("about-build").textContent =
      new Date().toLocaleString();

    aboutModal.classList.remove("hidden");
  };

  closeBtn.onclick = () => {
    aboutModal.classList.add("hidden");
  };
}

