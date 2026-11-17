# KD-009 Library proposals (all drawn in Animations/KD-009/src/parts.js; none touches Library/ yet)

Each is backward compatible (new names or new optional fields only). After integration run `node Library/tests/regression.mjs`.

1. **villageYard set** (`yardSky`, `yardBack`, `yardDoor(open, inside)`, `yardWindow(inside)`, `leafClumps(part, t, deep)`, `leafFall`): cottage facade with an opening door and lit window, perch tree with occluding leaf clumps. -> `sets/places.js`.
2. **splitLog + wedge** (`logGeo`, `splitLog({kerf, gap, chalk, mid})`, `logWhole`, `wedge`, `wedgeInLog`): log with chalk line, kerf, hinged gap, a `mid` callback drawn between the halves (for a trapped tail). -> `props/things.js`.
3. **carpenterTools** (`saw`, `mallet`, `prybar`, `stool`, `table(p)` assembling, `plankDoor(p)` assembling). -> `props/things.js`.
4. **villager / carpenter figure** (`carpRaw` -> `carpenter`): person with legs, `sit` and `kneel` blends, yellow tunic, apron with pocket, turban cap, chin beard, `handLW/handRW` world hand targets (lean-aware), `holdL/holdR` tools, `tongue`, `napkin`. Proposed as `person` options `costume: 'carpenter'`, `sit`, `kneel`, `hold*`.
5. **monkey optional fields** (`monkeyK`): `noTail`, `armLen`, `fit` (auto arm length to reach a world target), `handLW/handRW`, `holdR: 'wedge' | 'twig'`, `flush` (red strain face), `tongue`, mouths `grin` and `teeth`; plus `mkToWorld`/`mkToLocal` and the tail helpers `drawTail(pts, {kink, sore})`, `tailCurl`, `tailTo`.
6. **painPulse** (red rings + stars, size grows), **ringFlash** (glint ring), **glint**, **eyeLine** (dotted gaze line), **sawdust**. -> `fx/fx.js`.
7. Motion: `strike(t, hits)` (the strike cycle as a function; already recommended as `strikeCycle`).
