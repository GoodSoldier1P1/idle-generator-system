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
