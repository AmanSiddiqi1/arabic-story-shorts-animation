# HORSE-01 implementation notes (v1, code only)

Source files (story.json "scenes", load order): `horse_kit.js`, `horse_cast.js`, `horse_sets.js` (series files, meant to be copied unchanged into HORSE-02..05), `h01_ground.js` (garden world 0-75.12), `h01_sky.js` (flight 75.12-138.15 and the four inserts), `h01_main.js` (shots, framing, sound). Film 138.15 s (134.15 + end hold 4.0). Every story name is prefixed `eh`/`EH_` (series) or `h1`/`H1_` (episode).

## Decisions the plan left open or approximate
- **Title:** English chrome title on two lines (THE FLYING / WOODEN HORSE) with the supplied Arabic title الحصان الخشبي الطائر in Lalezar underneath (coordinator correction).
- **Staging of S7 (two-shot):** the plan puts the inventor at 1240 stepping between prince and saddle. Firuz stands at 1150 by the neck and the saddle is at about 1012, so the inventor (who dismounts at 1235 after the demo) hurries two steps to 1080 in front of the prince (58.94-59.9), points at the knob and the ear from there, and Firuz ducks under the outstretched arm and sidesteps to 985 before the vault. Camera two-shot drifts 1100 to 1130 at zoom 1.2.
- **Demo flight:** the horse faces right on the cart, so it turns (4 drawings) at the top of the rise (43.0-43.36) before gliding left, and again at 44.82 as planned.
- **Guest positions:** left group (physician 664, lady 742, merchant 830) stands behind the cart path (y 866-878) so the cart rolls in front of them; right group (maiden 1252, courtier 1372, Firuz 1300, child 1190) in front of the court. Fan servant on the dais at 1906, tray servant walks along the arcade in S1 and stands at 1474.
- **Camera:** for zoom >= 0.85 the garden camera sits 45 units higher than the plan keys so the ground line is near panel y 950 (the plan's 900-990 band) and the lower picture holds the dressed court (tiles in perspective, mosaic border, carpet runner, potted orange trees, lantern posts, pots, front rose bushes).
- **Rider scale in the sky:** Firuz is scaled with the rig (person s = 0.95 x horse s / 0.9), so every rig size keeps the garden proportions; hand targets use horse-local points converted to the rider's body-local frame (`h1Loc`).
- **Knob and lever positions:** knob at horse-local (88, -205), lever at (128, -296) under the first (deeper) mane block; the lever is drawn only when revealed or in a close insert.
- **Balloons:** placed just above the speaker's head with a short tail (`h1SayAt`), clamped inside the panel. Long lines use a smaller size.
- **Sound:** the plan's 8 effects, each in its narration pause (17.3, 35.6, 55.3, 71.0, 89.5, 108.0, 122.3, 134.2) plus the style's tape bed at 0.6; launch at 71.65 silent apart from the riser before it.

## Skipped or changed (and why)
- **"A turban slips" (41.98) and "a guest chases his blown turban" (45.6):** Library headwear cannot come off the person figure; replaced by the merchant clutching his turban with both hands in the wake (45.6-47.0). The flying tray at 72.68 stays.
- **Boot tucked back (100.2):** the rideOn hanging leg is fixed; the beat is a quick bob of the rider (tuck) with a blink while the cloud wisps part.
- **Rider reaching the ear / forehead:** the front-facing seated person reaches as far as the arm allows; the inserts (117.68, 130.86) carry the lever beat as the plan anticipated.

## Checks done
Stills and contact sheets at every scene's key beats (stills/g1-g4, m1, s1-s3, a1 in the media Working files), two short test clips (106.5-109.5 and 24-27, 3 s each, about 0.2-0.3 s per frame with 2 workers, audio present). Alive checklist: idleSway/breathe on every character, blinks on head turns (ehBlinkAt), cape and turban tail on travelling waves with follow-through (lagged, swing), the horse never moves a leg (only light acts on it), shadows on the court shrink as the horse rises, landings squash (inventor, Firuz, child).

## v2 (Fable review 1) decisions
- S6/S7 staging: Firuz inspects from x 1045 and his palm goes to the near foreleg (the Library arm, 74 units, cannot reach the chest plate of a horse standing on the cart); the inventor stays at 1230 right of the head; guests left <= 780, right >= 1398. Inventor tip is +0.12 (positive leans toward the facing direction in this engine, the review's -0.12 assumed the other sign).
- Balloons use `h1Say` (own narrow tail, max 70) instead of the style label's wedge; inventor lines are two-line balloons right of the horse's muzzle (`minX`).
- Sky 96.6-132.14 and the sunset use `src/h01_deck.js` (three layers, sky camera zoom about (500, 300)). Deck bakes draw puffs sharp and blur once (`h1Soft`): with ehCloud's per-shape blur the first frame of a palette took about 88 s on CPU.
- See review/revision_1.md for the full change log and the series changes.
