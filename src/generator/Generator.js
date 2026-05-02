// Generator.js
// Layer 1A: Designing the Generator class (no code yet)

/*
========================================
GENERATOR CLASS — RESPONSIBILITY OUTLINE
========================================

A Generator is responsible for:
- Producing a resource over time
- Managing internal state (count, delay, productionRate, etc.)
- Starting and stopping its own tick loop
- Applying upgrades that modify behavior
- Updating shared gameState
- Remaining locked until unlocked by the player

----------------------------------------
Constructor Config:
----------------------------------------
- resourceType (string)
- productionRate (number)
- delay (ms)
- limit (number or Infinity)

----------------------------------------
Methods (MUST NOT be arrow functions):
----------------------------------------
- start()
- stop()
- tick()
- applyUpgrade()

----------------------------------------
Methods / Callbacks that CAN be arrow functions:
----------------------------------------
- setTimeout callback
- utility helpers that don't use `this`

----------------------------------------
Lifecycle:
----------------------------------------
1. Constructor sets initial state
2. Player unlocks generator
3. start() begins tick loop
4. tick() produces resources
5. stop() halts generator
*/



class Generator {
    constructor(config = {}) {

        // ===============================
        // LAYER 1E — Config Validation
        // ===============================

        if (config == null || typeof config !== 'object') {
            throw new Error('Generator config must be an object.')
        }

        // 1. Destructure config with defaults
        const {
            resourceType = "unknown",
            productionRate = 1,
            delay = 1000,
            limit = Infinity,
        } = config;

        if (typeof resourceType !== 'string') {
            throw new Error('Generator config: "resourceType" must be a string.')
        }

        if (!Number.isFinite(productionRate) || productionRate <= 0) {
            throw new Error('Generator config: "productionRate" must be a positive number')
        }

        if (!Number.isFinite(delay) || delay <= 0) {
            throw new Error('Generator config: "delay" must be a positive number (ms).')
        }

        if (!Number.isFinite(limit) || limit <= 0) {
            throw new Error('Generator config: "limit" must be a positive number (or Infinity).')
        }

        // ===============================
        // LAYER 1B — Generator Constructor
        // ===============================

        // 2. Internal State 
        this.resourceType = resourceType;
        this.productionRate = productionRate;
        this.delay = delay;
        this.limit = limit;

        //3. Runtime State 
        this.count = 0;
        this.isRunning = false;
        this.timerId = null;

        // Debug log (temporary)
        console.log(`Generator created: ${resourceType}`);
    }



    // ===============================
    // LAYER 1C — Start/Stop & Scheduler
    // ===============================

    start() {
        if (this.isRunning) return; //already running
        this.isRunning = true;
        this._scheduleNextTick();
        console.log(`Generator ${this.resourceType} started`);
    }

    stop() {
        if (!this.isRunning) return; // already stopped
        this.isRunning = false;

        if (this.timerId !== null) {
            clearTimeout(this.timerId);
            this.timerId = null;
        }

        console.log(`Generator ${this.resourceType} stopped`);
    }

    _scheduleNextTick() {
        if (!this.isRunning) return;

        this.timerId = setTimeout(() => {
            this._tick(); // Actual production happens here
            this._scheduleNextTick(); // Schedule the next tick
        }, this.delay);
    }


    // ===============================
    // LAYER 1D — Tick Logic (Resource Production)
    // ===============================

    _tick() {
        // Increase the resource count by the base amount
        this.count += this.productionRate;

        console.log(
            `Generator ${this.resourceType} produced ${this.productionRate}. Total: ${this.count}`
        );
    }

}

// Temporary export (we'll refine later)
module.exports = Generator;