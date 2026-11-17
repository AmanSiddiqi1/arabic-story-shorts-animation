# KD-011 Library proposals (drawn in src/k11_props.js)
- `ironIngot` / `ingotStack` (k11Ingot, k11Stack): iron bars stack with n, glint, bites.
- `handcart` (k11Cart): two-wheeled cart, wheel angle from distance, handles side, lift, load callback.
- `purse`, `coin`, `coinPile` (k11Purse, k11Coin, k11Coins): drawstring purse with fill 0..1.
- `doubleDoor` (k11StoreDoor): storeroom double door that swings out toward the viewer, bar, padlock, inside callback.
- `storeroom` cutaway set (k11Storeroom): stone wall, barred window with light shaft, shelf, doorway, dust outlines, cobweb.
- Small props: `padlock`, `key`, `ball`, `foodTray`, `travelBundle` (on a staff), `basket`, `sandals`, `nail`, `moth`, `cobweb`, `sweatDrop`, `blush`, `ghostOutline` (dotted absent figure).
- Engine note: person acting wrapper should keep `P.hands` on blink copies.

## From v2 (Fable review 1)
- `doorwayEnter(ctx, P, door, d)`: draw a person stepping into a doorway (clip to the opening, scale into depth, darken) instead of fading out (KD-011 k11person `din`).
- Guide rules: things stored behind doors are drawn from the doorway's inside callback (before the leaves); a kneeling hug keeps both faces clear (adult kneels, heads offset >= 0.7 head width, hands on the child's back below the face); end-gag lettering and its actor stay inside the panel.
- "Mirror clouds" (two thoughtClouds, labels, popped equals sign).
