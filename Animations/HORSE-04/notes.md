# HORSE-04 "The Stolen Horse": implementation notes (v1, code only)

Inputs checked: planning_metadata MP3 sha256 and words sha256 match `planning/inputs/timeline.json` and the files on disk (MP3 resolved through `Library/media.py`), duration 141.515, last word 140.948, match 1.0. Film = 141.52 + 4.0 = 145.52 s.

Series files: `horse_kit.js`, `horse_sets.js`, `horse_props.js`, `horse_garden_day.js`, `horse_riders.js` from HORSE-03; the revised `horse_cast.js`, `horse_city.js`, `h01_deck.js` from HORSE-02 (supersets of the HORSE-03 copies: EH_FIRUZ_RIDE, `cover`, water-blue rivers, `carpets`, three-layer deck). None edited. New episode drawings in two copyable files: `horse_far.js` (farPalace, farPalaceToy, peacock, far king, guards, captain, helmet/spear) and `horse_court.js` (lockedCourt, gateBar, latticeScreen, craftsmanDisguise, toolbox and tools, saddleOrnament, ehRosettes, iconBalloon, memoryCard, routeMap, ehTick, ehCallout). Scenes: `h04_*.js`.

## Decisions the plan left open (or changed after measuring)
- Figure size: dialogue framings pushed to zoom 1.2-1.45 about the floor line (ground at panel y 950) so figures are about 30% of the panel (review lesson), instead of the plan's 0.85-1.0. Wides keep the plan's 0.62-0.8 (S2 open, S10 open, S17 0.66).
- S1 title: the chrome title and the Lalezar Arabic line sit over the land under the riders (y 760 / 880), as in HORSE-03, because the riders fill the sky band.
- S2-S5 staging measured on the drawn horse (x 1320, head about 1490): the king stands at 1625 (not 1420, which is the middle of the horse), the second peacock at 1690; the garden cart is parked at 1150 and slides under the lifted horse (45.34-45.62); the push crosses 1320-1720 by the cut at 46.6 (the plan's 1150 units in 0.7 s would be a blur), the court shot continues the roll.
- The captain walks over behind the princess and the king (35.3-36.9) to plant his spear between the inventor and the horse at 1290, then returns to 1580 in the pause (38.4-39.6).
- S6: guards C and D push the cart in and stand at 1110 and 1010 (so their helmets can knock over the lever at 52.2); A and B appear only in S12-S13 (the ring) and leave before S14.
- S10: the gate guards stand either side of the gate (A 410, B 610) so their spears cross over the craftsman at 500 and the knocker (545, 780) stays clear; the craftsman walks 390 to 500 (plan 420). He carries the open toolbox through the palm swap and sets it down at 455; the cape is shown rolled on the saddle.
- S12-S13: the captain keeps the gate (x 380) so he can slide the grille shutter at 111.52; the camera pans to the gate 110.9-111.45 for the shutter gag and cranes to the lattice frame by 114.0.
- S14-S16 held frame: zoom 1.0 at (1060, 520) (plan 0.9 at (1040, 470)) so the craftsman is larger; the frame drifts 6 units and everything keeps moving (dozing D, yawning C, lantern flames, moon path, bust, dove, ribbon).
- S15 close-up: drawn as its own panel (`h4EyesClose`): the lattice pitch is the eye spacing (26 x s) so both eye cells are star openings (`latticeScreen` option `stars`).
- S17: inventor between two guards at 2150 (in front of the pavilion), craftsman at 1935 by the knob; the cart leaves by 135.6.
- One extra cut at 69.56 (S8 to S9, the well), since the plan's S9 starts at another place on the road.

## Not done / simplified
- Picture balloons are drawn with simple silhouettes and the series drawings (ehHorseSil), not separate artwork.
- The guard preset is a palette on the Library `servant` costume plus the far helmet and neck cloth (no new Library preset).
