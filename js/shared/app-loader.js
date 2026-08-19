export async function start() {

  document.body.insertAdjacentHTML(
  "afterbegin",
  `<div style="background:green; color:white; padding:10px;">
    LOADER: function entered
  </div>`
  );

  document.body.insertAdjacentHTML(
    "afterbegin",
    `<div style="background:red; color:white; padding:10px;">
      LOADER: started
    </div>`
  );

  const module = await import("https://stephen-d-bennett.github.io/dashboard-app/js/v2/app.js");

  document.body.insertAdjacentHTML(
    "afterbegin",
    `<div style="background:blue; color:white; padding:10px;">
      LOADER: after import()
    </div>`
  );
}

