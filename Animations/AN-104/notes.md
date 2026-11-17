# AN-104 The Man Who Stole the Dish of Gold: implementation notes (v1, code only)

- Inputs checked: planning_metadata sha256 of the final MP3 (f5383432...) and its `.mp3.words.json` (070ed952...) match `Audio Files/Final Done/` and `planning/inputs/timeline.json`.
- Film length 172.09 s = plan duration 168.586 + end hold 3.5 (under 180). THE END at 168.6.
- Subtitles: chunk marks from the plan's `subtitles` (chunks_ar.txt / chunks_en.txt); align.py with the final words.json as whisper.json: 233/233 matched, 42 starts silence-refined.
- Owner questions: all plan defaults taken (old dog alive in the hut, rich master shown on the dais and in two insets, staged as a gift, all listed lettering, the small added characters).
- Source files: src/a104_lib.js (dog, dish, chain, scrolls, coins, purse, chest, food, balloons, insets, person-frame points), a104_cast.js (looks), a104_court.js (S3-S6), a104_street.js (S1, S2, S7-S11, S12-S13 street), a104_hut.js (S13 hut-S16), a104_main.js (cameras, overlays, transitions, sound).

Decisions the plan left open or that the measured sets changed:
- The dog is the AN-040 sheepdog rig copied into the story and extended with headDown, chew, lie, raise + pawW (world paw target), collar 'gold'/'rope', age (grey muzzle and brows, slimmer belly) and earFlick. The planned `hound` option (longer legs, slimmer muzzle) was not built; the sheepdog shape at s 0.78-0.9 reads as a large dog.
- Chains: one ring post at (960, 700) made every chain cross the other dogs and the dais. Each dog is instead chained from its collar ring to a small gold floor stake under its own chest (same silver link chain, glints travel to the stake).
- Street strip layout (anchors measured): pots stall 220 (keeper behind the counter at y 842), fruit 480, the stranger's future stall 1430 (closed until 96.95, then grows 300 -> 360 -> 420 wide with goods on the S9 day starts), goldsmith (jars, yellow awning) 1760, palace door 2150 (steps from 2010). The plan's stall "cols 1 to 3" is done as width and goods, since `cols` in marketStall is the stripe colours.
- S1 ends on a cut at 11.6 (stranger at 850); S2 picks him up at 1480 near the palace so his tiptoe speed stays plausible.
- S7: he stops at x 1575 beside the goldsmith counter (not in front of it) so the coin pile never covers him. S8 has no cut: he walks from the goldsmith to his stall (92.9-93.8) where the pots keeper waits with the handcart.
- S9 costume and age swaps on the night passes of the time-lapse (villager poor -> green villager at u 0.78 -> merchant at u 1.78); age 0.6 under the YEARS LATER card at 110.95.
- S10 thought cloud draws the court itself (the push loop, then the paw on the rim, then a pull-out to the lord on the dais).
- Hut marks: owner on the mat at x 640 (mat 540..790), old dog lying at 575 (s 0.72), visitor kneels at 460 so both men can reach the purse (around x 535) and the dog's paw reaches the visitor's knee. The visitor and the porter are drawn after the hut's front layer so the open door leaf never hides them.
- The owner's "straight back" from 152.12: lean -0.1 against the age stoop, head up, sq 1.03.
- The poor owner keeps the ascetic beard (long, white); recognition rests on the round inset (rich lord, dream wash) and the blue cap.
- Camera: plan zooms were raised (two-shots 1.8-2.6, street 1.7-2.3) with the ground at about 80 % of the panel so figures read at phone size.
- Sound: the template bed plus six quiet effects at 61.95, 64.9, 83.2, 147.72, 168.75, 170.0 (all in measured pauses or after the last word, 168.39); master 0.6 at render.
- Skipped: a separate `sneak` gait (the tiptoe is walk with larger amplitude, a lifted body and toe bob); per-frame awning flutter (the stalls are baked); the boy's chest "peek" shows only a glow and a small lid lift.
