# HORSE-02 Library proposals (for the coordinator; nothing here has been added to Library/)

All live in this story's new series files, written so HORSE-03..05 copy them unchanged. Proposed once the film is approved:

1. **palaceRoof** + `palaceRoofFront` (set, `src/horse_city.js`): the princess's roof terrace, strip 1600 wide, floor y 900, sky to y -700; dusk and warmNight baked plates (sky, far city with river and the two towers, the great blue dome, terrace with parapet, star tile, tether post, jar stand, rug, pavilion), live carpets, lanterns, opening door (`townDoor`), lit window with an inside callback, door light line, torch glow, moon path, tower flashes, sliding dome highlight; front pass with the door leaf and a near balustrade. Anchors `EH_ROOF`.
2. **princessGarden** + `princessGardenFront` (set, `src/horse_city.js`): moonlit garden with the palace wall and stair arch, the horse on the roof, fountain, bench (seat 852), lantern poles with a lamp hook, orange trees, jasmine arch, hedge with a gate (guards drawn behind it through `o.guards`), river and towers beyond. Anchors `EH_PGARDEN`.
3. **riverCity** (set, `src/horse_city.js`): exterior establishing plate of the river city at dusk with a live window wave, boats, bridge lamps, glints and a light band up the palace wall. Anchors `EH_CITY`.
4. **princessPalace**, **ehRiverTowers**, **ehBlueDome** (set pieces, `src/horse_city.js`): the rose palace with the blue dome and stair pavilion at any scale; the two river towers with their three-arch bridge; a blue onion dome on a rose drum.
5. **ehFarLand** (set, `src/horse_city.js`): the 2400-wide land seen from the sky (dunes, caravan, braided river with boats and a waterwheel, three walled towns, the last the river city) for pans in skyFlight; plus the `dusk` / `warmNight` sky entries.
6. **moonPath** (effect, `src/horse_city.js`): the moon's reflection on a river centre line, scattered dashes at k 0 pulling into one gold path at k 1.
7. **mapCard** + **ehScroll** (prop, `src/horse_props.js`): the charcoal map (palace, towers and bridge, dome, river, road with arrow, moon) drawing on stroke by stroke inside a ragged callout card, and the scroll in the hands.
8. **tetherRope** + **ehRopeCoil**, **oilLamp** + **lampGlow**, **ehCup** (props, `src/horse_props.js`).
9. **guard** costume (pose, `src/horse_props.js`): `EH_GUARD_A` / `EH_GUARD_B` on the servant preset with `ehHelmet`, `ehNeckCloth`, `ehSpear`, `ehTorch`; plus the princess (`EH_PRINCESS`, with `ehVeilRibbon`) and maid (`EH_MAID`) costume settings.
