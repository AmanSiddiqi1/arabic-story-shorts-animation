# ALI-04 "The Merchant of Oil" (80s Cel Anime): implementation notes (v1, code only)

Plan checked against the inputs: MP3 and `.words.json` SHA-256 match `planning/planning_metadata.json` and `planning/inputs/timeline.json`; MP3 136.01 s. Film = 136.01 + end hold 4.0 = **140.01 s** (`AB_DUR`). Subtitles: library subtitles from `timing.json` (chunks unchanged). Style `cel-anime-80s`, no `arabicFont` in story.json. Arabic title line `تاجر الزيت الغريب` (story/script.json `title_ar`) in Lalezar.

## Files
- Series copies from ALI-03 (unchanged except where noted): `ab_kit.js` (only `AB_DUR`), `ab_cast.js`, `ab_sets.js`, `a3_base.js`, `a3_series_town.js` (**oilJar extended** with the plan's jarCutaway / jarPeek fields: `cut`, `oil`, `ghost`, `peek`, `wob`, `sq`, `noLid`; without them it draws exactly as before), `a3_series_cast.js`, `a3_shared.js` (the parts of ALI-03 a3_shared.js this film uses + `A3_NRIM`/`A3_WRIM`).
- New series files for ALI-05/06: `a4_series_court.js` (courtyard, kitchen, cyJar, small props, disguiseWipe), `a4_series_cast.js` (guard + captain, baker, apprentice, nightcap, night dress, jarMan).
- Story: `a4_base.js` (the jar row over the whole film as data: `a4JarSt(i, t)`, heads, keepers helpers, glyphs, `a4Say` balloons clamped inside the panel), `a4_s1..a4_s6.js` (shots), `a4_main.js` (framing, dissolve 16.3, tape 32.5-33.3, impact frame 112.46, sound).

## Decisions the plan left open
- Courtyard: the back wall and its two gates stand on y 872 (the wings on y 900) so the jars (feet 884) stand in front of the wall. Night plate colours as planned (sky from #2a4a8a, walls #b89ab8 / #8a94c0, kitchen wing #c8a0a8, paving #8c8cbc..#7a7aa8); the night foliage is teal (`AB_LEAF.night`), not the series' near-black 'late' leaves. Ground shadows at night are blue-violet `#4a3a7a`.
- Moon: early night (1500, 250), after LATER (1000, 170), slides to (1350, 230) in S13 and stays there; sky and moon parallax 0.3.
- S1: merchant at x 790 (not 850) and mules at 560 / 330 / 100 so he and Ali Baba (930) do not overlap; the gate bar is drawn from the street side and lifted by Ali Baba.
- S3: the merchant carries the jars one by one along the row (one jar always in his arms while the next lands), so six landings fit 13.12-14.6.
- S5: he raps the five men's jars (not the oil jar) while walking 820 -> 1230 so the walk is brisk, not a sprint; the crooked lid he presses flat is jar 3.
- S7: the memory inset shows the two clasped hands (olive and mustard sleeves) with the ring; no finger-count numbers on screen (only the hand and lips).
- S12: guards are the captain + four (a fifth build `A4_GUARDS[4]`) so each gate has two crossed spears: guards 0/1 at the street gate (650, 815), 2/4 at the back gate (1530, 1650); the captain stays with Morgiana and then goes to the back gate.
- S13: the watchers hide behind the jar row (only helmet points, the broom tip and the nightcap show) and sink as his eye sweeps; in S14 they are the lid keepers in front of the jars. The boy lies across jar 1 (`lie`), the baker sits on jar 2 with hanging feet, the broom presses jar 3, two spear butts (angle computed so the butt rests on the lid) press jars 4 and 5.
- S14: Morgiana's smile in the kitchen window at 109.78 is not shown (the kitchen window is outside the guest-window close shot).
- S16: the thief who ducks back is jar 2's (plum), next to the baker who lifts the lid off.
- S17: the men leave their jars one after another (126.4 lifted by two guards, then hops at 127.2-127.95), stay folded for a moment, then stand on y 925 at x 960..1260 with a loose rope.
- S18: Morgiana watches from her own door (x 960) instead of the courtyard gate, so she is in the final frame with the roof; the procession is captain, five men, two guards, the old neighbour sweeping behind.
- Owner questions: plan defaults (TO BE CONTINUED..., six jars, family-friendly capture, pebbles, balloon lines, beard-scarf bluff, cloak left behind, additions, neighbours and guards, light band and cutaway).

## Not done / simplified
- No separate wall-shadow animation of the cape beyond a 0.7 s tinted silhouette (17.94-18.6).
- The kitchen thought cloud shows icons (Morgiana with a broom vs five jars crossed out; three sleepers in a turquoise ring; three doors and a helmet) rather than full scenes.
- The S18 apricot first-light band is a soft gradient at the horizon; no separate parapet front pass beyond the 30-high parapet over the leader.
