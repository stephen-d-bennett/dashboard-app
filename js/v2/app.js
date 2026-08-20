document.body.insertAdjacentHTML(
  "afterbegin",
  `<div style="background:purple; color:white; padding:10px;">
    MODULE: top-level ran
  </div>`
);


document.body.insertAdjacentHTML(
  "beforeend",
  `<div style="background:green; color:white; padding:10px;">
    MODULE: end of file
  </div>`
);

export function startApp() {
  document.body.insertAdjacentHTML(
    "beforeend",
    `<div style="background:black;color:white;padding:10px;">
      APP: startApp() called
    </div>`
  );

  // later: initialize controllers, HUD, theme engine, etc.
}
