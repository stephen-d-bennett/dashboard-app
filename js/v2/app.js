// FILE: /js/v2/app.js
export async function init() {
  
  
  document.body.insertAdjacentHTML(
    "afterbegin",
    `<div style="background:green; color:white; padding:10px;">
       v2 init() RAN
     </div>`
  );
   
  const app = document.getElementById("app");

  app.innerHTML = `
      <div style="padding:20px; background:#222; color:#fff;">
          <h1>v2 init() RAN</h1>
          <p>If you see this, v2/app.js loaded and init() executed.</p>
      </div>
    `;
}
