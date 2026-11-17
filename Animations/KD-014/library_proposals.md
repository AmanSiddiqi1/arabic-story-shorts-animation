# KD-014 library proposals (all in src/k14_parts.js; not moved into Library/)
- `elementFace(ctx, x, y, s, F)`: face rig for non-animal characters (per-eye lids and gaze, brows, mouth set incl. grit, wobble, talk, spiral eyes, blush).
- `sunFace`, `cloudFace`: Library sun()/cloudFlat() with elementFace, rotation, droopy ray, squash, puff arms, sweat.
- `windSpirit(ctx, x, y, s, t, W)`: five tapering bands + swirl head; coil, blow, stretch, flat (pancake), limp.
- `mountainMassif(ctx, t, M)` + `mountainBoulder`: mountain set with ledge eyelids, crack mouth, holes A/B, lit door.
- `poofBurst(ctx, x, y, d, R)`: transformation burst (star burst with overshoot, puff ring, thinning inner puff, stars) + `k14Flash`.
- `rankStrip(ctx, t, R)`: five-slot chain-of-strength strip with hopping tag, '?' slot, crown/heart.
- `skyLight`, `heightMarks`, `scarfCloth`, `beadString`, `sandal`, `mouseRoomProps`.
- `k14Mouse(ctx, P)`: rat kind mouse plus tuft, bow, blush, wave/gesture paw, held broom (candidate fields for `rat`).

## v2 additions (Fable round 1)
- `rankStrip` rule for the guide: the strip reserves the top band of the panel (about 210 of 1230); scenes keep faces below it or the strip hides for that shot (KD-014 lowers the sky cast 90 units from 72.9 and hides the strip 114.2-122.4 and 126.74-163.9).
- `k14Sole(ctx, x, y, s)`: a person's sandal sole with toe strap, drawn over the foot for scale gags (story-local in k14_mtn.js).
- Doorway entry: `k14mInDoor` clips a small animal at a moving edge and darkens it as it enters a hole (head first, tail last); candidate `enterDoor(ctx, drawFn, P, doorX, k)` helper.
- Guide entries proposed: "Quoted speech by a non-human speaker: breath-in (brow lift, 'o', slight swell) on the 'said' verb, `talk` only across the quoted words." and "Scale stories: fix the size ratio first (KD-014: person s 0.95 to mouse s 0.34, at least 4.5 to 1) and choose framings (zoom 3-6) that keep the small character at 150 px or more."
- Thought clouds and balloons in close shots are drawn in panel space (`over`, positions mapped with `k14P`) so their outline weight stays constant at any zoom.
