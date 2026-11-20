# ALI-01-ANIME library proposals (all in src/, prefixed ab)

1. **sesameRock** `abRock(ctx, x, y, {open, crack, glow, model, s, t, light})` (ab_kit.js): magic rock with a seam, sliding halves, gold door and ground wedge.
2. **celPlates** (ab_sets.js): `abGladePlate(model)`, `abForestLayer(name, model)` + `abLayer` (tileable parallax), `abShafts`, `abDawnSky`, `abTownRoofs`, `abCavePlate`; with `abBands`, `abSpeed`, `abGlow`, `abGlint(s)` (ab_kit.js) and the colour model table `AB_MODEL` + `abPal` / `abCel` (tint + rim pass).
3. **treasureCave** (ab_sets.js): `abCavePlate`, `abCaveCels`, `abCaveLive`, `abStalactites`.
4. **handcart** `abCart(ctx, x, y, {wheel, tilt, bounce, load, t, inside})`.
5. **treeClimb and leafHide**: `abClimber` (ab_s1.js), `abFoliageFront` with an eye-gap hole, `abLeafFrame` (point-of-view leaf frame).
6. **anime close-up head** `abFace(ctx, x, y, k, F)`: model-sheet head for close-ups (coin pupils, reflections, sweat, wink lids).
7. Props: `abSack` (fill 0..1, flap), `abCoinPile` (gold/silver), `abChest`, `abBale`, `abPurse`, `abAxe`, `abBundle`, `abMapCard`.
8. Crowd: `abSilStrip` / `abSilRow` (baked silhouette rider strip, 4 gallop drawings).
