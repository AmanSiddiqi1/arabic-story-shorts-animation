# KD-016 Library proposals (drawn in src/kd16_lib.js; nothing in Library/ was changed)

1. **heron** (cast, new character; `kd16Heron` -> `heron`): tall wader, 330 tall at s 1; fields neck, headRot, talk/beak, stab, wing (lifted near wing as a hand), tuck 0..1 (head under the wing; 1 = feathered ball), puff, crest, plume (lag), ph/amp (wading, IK legs with backward joint), lift (one-leg rest), eyes, brow, bob; wrapped with `acting()`. Helper `heronHeadW(P)` gives the head point for gaze/arrows. Usable for heron, crane and stork fables.
2. **chick** (prop, `kd16Chick`): the nest chick as a free prop with stub-wing flap, rotation and a `tuft` mode (only the top shows, in a jaw).
3. **nestFront** (prop helper, `kd16NestFront`): the front rim of `nestDraw`, so a bird can sit inside the nest (nestDraw, bird, nestFront).
4. **waterBand / reeds / snag / distance tick** (set pieces: `kd16Water` back + front strip that hides wading legs, `kd16Reeds` with wind bend and shake, `kd16Snag` driftwood perch, `kd16Tick`). Candidate generic `riverSide` set with `palmTree`.
5. **windStreaks** (effect, `kd16Wind`): streaks from L, R or T; reeds/plumes take a matching bend value.
6. **fightCloud** (effect, `kd16Fight`): scuffle cloud with stars, feathers, a tail and a leg poking out; grows then fades.
