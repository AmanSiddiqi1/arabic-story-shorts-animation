# AN-108 library proposals (drawn in src/ks_props.js; not moved into Library/)
- `treasureHoard` chest (`ksChest`): 170 x 95 body, domed lid 0..1 (overshoot ok), heap that rises, `fake` 0..1 gold -> brass/tin/glass, travelling glint, anchors (rim, lidFront, handles). Plus `ksChestA` anchors without drawing.
- `jewels`: `ksGem` (cut gem with glint and fake), `ksRing`, `ksBowl` (bend), `ksNecklace`, `ksShards` (broken glass stone).
- `goldGlow(ctx, x, y, r, t, k)`: rays, Ben-Day halo, staggered glints; `ksFaceLight` (yellow multiply tint on a person's head).
- `purse` (`ksPurse`) and `ksCoinPile`.
- `rewardPoster` (`ksPoster`): WANTED sheet with the thief face, can fall (`fallen`).
- `loupe` (`ksLoupe`, magnified eye inside) and `ksTouchstone` (streak).
- Expressions on the Library person: `coinEyes` (`ksCoinEyes`), `flush` (`ksFlush`, red dots plus steam).
- Guard costume overlay `ksHelmet` (servant body, pal head 'none'); a real `COSTUME.guard` preset is the better home.
- `ksHat`: draws a person's headwear on its own so it can jump and slip (pal head 'none').
- Small props: `ksBadge` (badge of office), `ksMask` (thief mask), `ksCrossed` (crossed fingers).

## v2 additions (Fable round 1)
- Guide entry "prop beside, not behind": a front-facing figure working with a waist-high prop (chest, counter, cradle) stands or kneels BESIDE it with world hand targets (`{ w: [x, y] }`), never behind it; a lid opening toward the viewer must not cross a face. Draw order: the figure in front of the prop while beside it.
- Guide entry "verdict tags": tags in the upper third, one at a time, older ones struck or dimmed (alpha 0.55), each with a vertical arrow to its piece; place the pieces on the floor in a free column (not behind a figure) so the arrow never crosses a face.
- `ksPoster` nail-pop: hang from one nail (rotate about it, `swing`), then fall with `fallY` and land leaning on a seated figure's knees, below the face.
- Echo thought cloud (small `thoughtCloud` with an icon and a red strike) as a 0.8 s callback to an earlier cloud.
