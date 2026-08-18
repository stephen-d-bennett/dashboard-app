// /js/shared/runtime/Runtime.js

class Runtime {

    constructor() {
        
        // -------------------------------------------------------
        // 1. DOM SEMAPHORE (Promise)
        // -------------------------------------------------------
        this.domReady = new Promise(resolve => {
            if (document.readyState === "loading") {
                document.addEventListener("DOMContentLoaded", resolve);
            } else {
                resolve();
            }
        });

        // -------------------------------------------------------
        // 2. GLOBAL RUNTIME STATE
        // -------------------------------------------------------
        this.state = {
            version: null,      // version layer sets this
            debug: false,       // version layer sets this
            config: null,
            hudEnabled: false,
            started: false
        };

        // -------------------------------------------------------
        // 3. LOGGING SINK
        // -------------------------------------------------------
        this.listeners = [];
    }

    // -----------------------------------------------------------
    // LOGGING
    // -----------------------------------------------------------
    
    addListener(fn) {
        this.listeners.push(fn);
    }

    log(msg) {
        console.log(msg);
        this.listeners.forEach(fn => fn(msg));
    }

    // -----------------------------------------------------------
    // STARTUP PIPELINE
    // -----------------------------------------------------------
    
    async start() {
        if (this.state.started) return;
        this.state.started = true;

        await this.domReady;
        this.log("runtime: DOM ready");

        // Version layer will:
        // - load config
        // - enable HUD
        // - initialize controllers
        // - initialize theme engine

        this.log("runtime: startup complete");
    }
}

export const runtime = new Runtime();
