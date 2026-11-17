# AN-040 Library proposals (story-local in src/an40_lib.js; not moved into Library/)

- `leopard` (cast): big spotted cat on the BEAST rig, about 400 x 220 at s 1. Fields: ph, amp, stride, crouch (shoulder blades up), raise, headTurn (over-the-shoulder look with a squeeze), snarl, lick, whisk, ears, tailUp, tailTuck, tw, brow, mouth, silhouette; helper `an40LeoHead(P)`. Later palettes: tiger stripes, black panther.
- `dog` (cast): sheepdog, 3 palettes (tan, white with black patches, brown with one ear up). Fields: gallop (gathered/stretched pairs), sit, crouch (play bow), bark (jaw + forward jolt), mouth (grit), tongue, ears, earStream, tailWag/wagAmp, hackles, headTilt; helper `an40DogHead(P)`, stride constant.
- `catLie` (pose for the Library cat): curled resting cat (`lie 0..1`) without changing the cat drawing; could become a `lie` field of `cat`.
- `forestEdge` (set): forest wall with darkness, occluder trunks, big tree with a live high branch (`an40Branch` dip), treetop shakes (`an40ShakeTop`), forest shade gradient.
- `pasture` (set): meadow with far home-tree silhouette and grass tufts.
- `chaseRoad` loop mode (set): `an40Chase(ctx, D, t, o)` parallax strip driven by one distance function, landmarks, a growing home tree, grass that flattens under the runners.
- `insetCircle` (camera): `an40Inset(ctx, cx, cy, r, p, draw)` round picture in picture with iris.
- `runInPlace` (motion): `an40RunInPlace(xf, t, t0, t1, stride, rate)` leg spin before a bolt.

## v2 additions (proposals only)
- an40HillTrees: hillTrees with a `skip: [x0, x1]` clearing (head-clearance for held character spots).
- an40Leopard `shade` field: uniform depth tint for a figure inside a dark forest (palette mix, no gradient).
- an40CatTufts: pointed fur tufts behind a puffed cat (could become a `spiky` option on the Library cat).
- gapBar(a, b, label): bar on the ground line between two measured world x positions (from the S5 diagram).
- leadFollow lure framing: camera keyed on the bait's landing 0.25 s ahead, bait at 1/3, pursuer at 2/3.
