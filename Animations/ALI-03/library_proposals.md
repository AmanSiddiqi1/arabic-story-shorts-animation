# ALI-03 library proposals (all in src/; the coordinator integrates them one at a time)

1. **townStreet** (a3_series_town.js): `TS` anchors, `TS_MODEL` (day, afternoon, evening, night, night2), `tsSkyPlate` / `tsTownPlate` bakes, `tsPlates` cross-fade, `a3Door`, `a3Window` (shutters, slit, geranium box, inside callback), `a3Gate`, `a3Arch(c, m, ox)`, `tsWashing`, `tsLanterns`, `tsMoth`, `tsSun`, `tsMoon`.
2. **doorMark** + `TS_MARKS` / `tsMarks` (marks as data with draw-on, glow, flare) + `tsRing` (pulsing or dashed ring).
3. **oilJar**, **jarPannier**, **silverRing**.
4. **morgiana** (a3_series_cast.js): `abMorgiana`, `morgScarf`, `morgVest`, `a3Basket`, `morgianaWindow` (windowBust), `a3Eyes` (eye close-up for morgiana / leader).
5. **spyDisguise** (spy 1 turban + tan cloak, spy 2 striped cap + grey cloak, chalk, brush, paint pot `a3PaintPot`) and **oilMerchant** (leader rig, merchant costume, cloak with crimson lining, rope, ring).
6. **sneakChain**: single-file tiptoe with delay, gap and an accordion bump.
7. **dayToNight**: plate cross-fade data (sun, moon, lanterns one by one).
8. Story helpers worth sharing (a3_shared.js): `a3ArchFig` (figures emerge from a dark passage), `a3PicBalloon`, `a3DoorIcon`, `a3Sneaker`, `a3BigHand` (abHandCel with sleeve colour, chalk, brush, ring), `a3WallBg` / `a3WoodBg` insert backgrounds, the cross-dissolve in a3_main.js.
