# KD-014 library proposals (all in src/k14_parts.js; not moved into Library/)
- `elementFace(ctx, x, y, s, F)`: face rig for non-animal characters (per-eye lids and gaze, brows, mouth set incl. grit, wobble, talk, spiral eyes, blush).
- `sunFace`, `cloudFace`: Library sun()/cloudFlat() with elementFace, rotation, droopy ray, squash, puff arms, sweat.
- `windSpirit(ctx, x, y, s, t, W)`: five tapering bands + swirl head; coil, blow, stretch, flat (pancake), limp.
- `mountainMassif(ctx, t, M)` + `mountainBoulder`: mountain set with ledge eyelids, crack mouth, holes A/B, lit door.
- `poofBurst(ctx, x, y, d, R)`: transformation burst (star burst with overshoot, puff ring, thinning inner puff, stars) + `k14Flash`.
- `rankStrip(ctx, t, R)`: five-slot chain-of-strength strip with hopping tag, '?' slot, crown/heart.
- `skyLight`, `heightMarks`, `scarfCloth`, `beadString`, `sandal`, `mouseRoomProps`.
- `k14Mouse(ctx, P)`: rat kind mouse plus tuft, bow, blush, wave/gesture paw, held broom (candidate fields for `rat`).
