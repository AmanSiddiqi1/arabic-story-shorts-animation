# ALI-01-ANIME library proposals (all in src/, prefixed ab)

1. **sesameRock** `abRock(ctx, x, y, {open, crack, glow, model, s, t, light})` (ab_kit.js): magic rock with a seam, sliding halves, gold door and ground wedge.
2. **celPlates** (ab_sets.js): `abGladePlate(model)`, `abForestLayer(name, model)` + `abLayer` (tileable parallax), `abShafts`, `abDawnSky`, `abTownRoofs`, `abCavePlate`; with `abBands`, `abSpeed`, `abGlow`, `abGlint(s)` (ab_kit.js) and the colour model table `AB_MODEL` + `abPal` / `abCel` (tint + rim pass).
3. **treasureCave** (ab_sets.js): `abCavePlate`, `abCaveCels`, `abCaveLive`, `abStalactites`.
4. **handcart** `abCart(ctx, x, y, {wheel, tilt, bounce, load, t, inside})`.
5. **treeClimb and leafHide**: `abClimber` (ab_s1.js), `abFoliageFront` with an eye-gap hole, `abLeafFrame` (point-of-view leaf frame).
6. **anime close-up head** `abFace(ctx, x, y, k, F)`: model-sheet head for close-ups (coin pupils, reflections, sweat, wink lids).
7. Props: `abSack` (fill 0..1, flap), `abCoinPile` (gold/silver), `abChest`, `abBale`, `abPurse`, `abAxe`, `abBundle`, `abMapCard`.
8. Crowd: `abSilStrip` / `abSilRow` (baked silhouette rider strip, 4 gallop drawings).
9. **Cel finish pass** `abCel(ctx, bb, draw, { shade, shadeLight, shadeD, line, rim, light })` + `AB_FIN` table: hard shade on the far side, coloured-line 'lighten' pass and rim for any Library character, nested-safe (per-depth layers). Candidate for the cel-anime-80s theme as an opt-in extension of `castFinish` (would need a Library change, not done here).
10. **Doorway swallow** `abDoorState` / `abDoorFig` + `abRock` `inside` callback: a figure darkens to a rimmed silhouette near a lit opening, is drawn clipped inside the opening under the closing doors, sinks down steps and shrinks; reversible for exits.
11. **Mount sequence** (S8 `AB_MT`): hand to saddle, crouch, low arc blending to seated, saddle landing with horse dip and lagged head bob.
12. **Painted sets**: `abRoomPlate` (night room with lamp pool, window, shelf, pot), predawn plate (`abPredawnSky`, `abPredawnHills`, `abGrassStrip`), `abYardPlate` + `abCottage`.
13. **Close-up kit**: `abHandCel` (hand with curl), bust composition (abFace + shoulders) for the held-drawing beat.
14. **Library change needed (proposal only):** an opt-in outline weight for `ink` (e.g. a theme field `THEME.lineScale`, default 1) so a style can draw thinner lines without changing any existing default; run regression after.
