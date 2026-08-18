// /js/shared/app-loader.js

document.addEventListener("DOMContentLoaded", () => {
  import(`../${config.version}/app.js`)
    .then(module => {
      // v1: init() does nothing, v1 boots itself
      // v2: init() starts v2 modules
      module.init(runtime);
    })
    .catch(err => {
      console.error("Failed to load app version:", err);
    });
});


// /js/shared/app-loader.js

import config from "../config/app-config.json" assert { type: "json" };
import { runtime } from "./runtime/Runtime.js";

document.addEventListener("DOMContentLoaded", () => {
  console.log("Loader fired. Version:", config.version);

  import(`../${config.version}/app.js`)
    .then(module => {
      console.log("Loaded module:", module);
      module.init();
      console.log("Init called.");
    })
    .catch(err => {
      console.error("Failed to load app version:", err);
    });
});
