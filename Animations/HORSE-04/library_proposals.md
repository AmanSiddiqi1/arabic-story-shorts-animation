# HORSE-04 library proposals (move after approval; one at a time)

1. **farPalace** (+ `farPalaceToy`, `farPalaceFront`) set, `src/horse_far.js`: strip 2600, ground 900, outside road with outer gate and knocker, garden with pool, square with star inlay, arcade, royal pavilion, court gate; white palace with three domes; models golden / day / morning. Generic third-kingdom palace.
2. **lockedCourt** with **gateBar** and **latticeScreen** (set, `src/horse_court.js`): walled yard with a barred gate (grilles, bar with bounce, padlock, sliding shutter, `outside` callback for a face at the grille) and a mashrabiya bay (`latticeScreen` with evenodd star and cross openings, `behind` callback, ribbon, forced `stars` cells).
3. **peacock** (animal, `src/horse_far.js`): side view, `fan`, `tilt`, `peck`, walk on `ph/amp` (planned AN-046).
4. **craftsmanDisguise** + **EH_CRAFT** (person overlay): cloak edges, hidden sash corner with `corner` 0..1, pencil.
5. **toolbox** with **ehTool** (hammer, oil can, magnifier, chisel, pliers) and **saddleOrnament** / **ehRosettes** (props).
6. **iconBalloon**, **memoryCard**, **routeMap**, **ehTick**, **ehCallout** (picture devices).
7. Far king / guards palettes (`EH_FARKING`, `EH_FARGUARDS`, `EH_CAPTAIN`, `ehFarHelmet`, `ehFarSpear`): candidates for a Library `guard` costume preset.
