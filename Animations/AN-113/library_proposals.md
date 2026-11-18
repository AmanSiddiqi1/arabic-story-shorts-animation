# AN-113 library proposals
Story drawings in `src/a113_base.js` that other films could share (move one at a time, prefix-free names, registry entries):
- `pmPurse` -> `purse(ctx, x, y, s, {fill, rot, bow, sq})`: drawstring coin purse, limp to fat, optional red bow.
- `pmCoin`, `pmCoinPile` -> `coin`, `coinPile`.
- `pmGem`, `pmNecklace`, `pmBox` -> `jewels` (gem, necklace with swing, jewel box with lid).
- `pmBag` -> `saddlebag(ctx, x, y, {s, open, strap, inside, glint})`.
- `pmNote` -> `scroll(ctx, x, y, {open, seal, lines})`: sealed note, unrolls with verse half-lines.
- `pmMedal` -> `portraitMedallion(ctx, x, y, r, personP, {grey, p})` (grey via saturation composite).
- `pmGlow` -> `goldGlow(ctx, x, y, r, t, k)`.
- `pmStall` -> `marketStall` kind 'jewel' with `open` (hinged board) and `awning` 0..1, back/front layers.
- `pmHandOver` -> `handOver(t, t0, dur, A, B, dip)` motion helper.
- `pmInsetYouth` pattern -> a generic `insetCircle(ctx, cx, cy, r, t, draw)` with iris and dream wash.
- `pmArm`/`pmTr` rig (as in AN-099) -> arm tracks in angle space for the person.

## From v2 (Fable round 1)
- `thoughtCloud` tail offset option (tail ends clear of the thinker's head); here done by passing head + [95, -80] in panel space.
- Panel-space "thought cloud over a close two-shot" pattern: cloud and labels after the camera, couple framed low.
- Door-of-fortune event: `townDoor` with `inside` solid process yellow + ray fan + rolling coins, one door per stressed word.
