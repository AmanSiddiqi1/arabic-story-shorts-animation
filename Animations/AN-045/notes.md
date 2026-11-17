# AN-045 The Thief and His Monkey: implementation notes (v1, code only)

- Inputs checked: planning_metadata sha256 of the final MP3 (ae10125d...) and its `.mp3.words.json` (85e8ddca...) match `Audio Files/Final Done/` and `planning/inputs/timeline.json`.
- Film length 171.43 s = narration 167.63 + end hold 3.8 (plan). THE END at 168.2 s.
- Subtitles: the plan's `subtitles` chunks (chunks_ar.txt / chunks_en.txt), aligned by align.py with the final `.words.json` as whisper.json (233/235 words matched, 2 interpolated).
- Owner questions: all plan defaults (unmasked thief, red fez, all lettering kept incl. SWIPE! and OUTSIDE: FANCY, 3 and 30 coins, moth gag x3, buyer opens the bundle with his wife present, no moral line, no theft from the crowd).
- Sets: Library `marketStreet` (Market A: generated houses, fruit + cloth stalls, mat; Market B: custom house row with a door at 1565..1715, blue/yellow stalls, palm, crate prop; alley: `alley: true`), Library `palaceHall` merchant variant (desk off; the low table and stools are drawn by the story), dusk road = skyCycle 0.45 + townFarCity + hillTrees + ground.

Decisions the plan left open or the measured set changed:
- S1 end framing zoom 1.5 centre (580, 720) (plan 1.45 at x 470 cut off the onlookers). S2: thief strolls 380 -> 580 (the plan's camera track 470 -> 780 kept the thief out of frame); the push-in centre is x 615.
- S2: purse order 1, 2, 3 = far to near (860, 770, 680) so the hand can reach the fattest purse (3) on the nearest onlooker; the thief steps to 618 on tiptoe. The stall keeper wave was dropped (the stall is baked, a keeper could not stand behind the counter).
- S3: the shirt is held at chest height (y 770), not at face height, so the seller's face stays clear; the thief peeks from behind a striped hanging-cloth post drawn over him at x 960, the monkey head above his.
- S5/S6: thief mark x 1100 (plan 1060) so his arm (about 92 units at s 1.25) reaches the knot at (1220, 806) with tip 0.1. S5 camera zoom 1.35-1.4 (plan 1.2) for phone legibility; the geometry thief / bundle / seller / monkey left to right is kept.
- S7: the thief looks at the monkey through the hole (an eye is drawn in the hole); the same pose is reused at 164.5 for the buyer looking at his wife.
- LATER card 83.6-85.6 with the camera cut at 84.6 (its covered midpoint); S9 starts at 84.6.
- Market B: onlookers at 770/860/950 and the NO PEEKING sign at x 640 on a 400-tall post (board centre y 450) so it never covers the buyer's turban; price box at the upper left (panel 300, 250).
- Wife: the villageWoman costume draws no brows, so her raised/stern brows are a story overlay (a45Brows).
- S14 balloon: the seller is a black silhouette (canvas filter brightness 0) with the Library monkey on his shoulder.
- S17: the wife walks round to the buyer (720 -> 520) after the last word and lays her hand on his shoulder at 168.4; he sinks onto a stool at x 400 (landing 167.72, thud 167.75).
- Sound: exactly the plan's seven cues (pop 3.9, whoosh 21.05, pop 41.9, whoosh 63.35, thud 68.75, thud 167.75, chime 168.5).
