// /js/shared/hud/HUD.js
import { runtime } from "../runtime/Runtime.js";

class HUD {

    constructor() {
        this.el = null;
        this.enabled = false;
    }

    // -----------------------------------------------------------
    // INITIALIZE HUD (called once)
    // -----------------------------------------------------------
    
    init() {
        if (this.enabled) return;
        this.enabled = true;

        this.el = document.createElement("div");
        this.el.id = "hud";
        this.el.style.position = "fixed";
        this.el.style.bottom = "10px";
        this.el.style.right = "10px";
        this.el.style.background = "rgba(0,0,0,0.75)";
        this.el.style.color = "lime";
        this.el.style.padding = "10px";
        this.el.style.fontSize = "12px";
        this.el.style.fontFamily = "monospace";
        this.el.style.zIndex = "9999";
        this.el.style.maxWidth = "40vw";
        this.el.style.maxHeight = "30vh";
        this.el.style.overflowY = "auto";
        this.el.style.borderRadius = "6px";

        document.body.appendChild(this.el);

        // Subscribe to runtime logs
        runtime.addListener(msg => this.write(msg));

        runtime.log("hud: initialized");
    }

    // -----------------------------------------------------------
    // WRITE LOGS TO HUD
    // -----------------------------------------------------------
    
    write(msg) {
        if (!this.enabled || !this.el) return;

        const line = document.createElement("div");
        line.textContent = msg;
        this.el.appendChild(line);

        // Auto-scroll
        this.el.scrollTop = this.el.scrollHeight;
    }
}

export const hud = new HUD();
