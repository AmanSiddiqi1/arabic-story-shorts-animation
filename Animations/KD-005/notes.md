# KD-005 production notes (v1, opus-animator)

Film 163.3 s = narration 159.304 s + 4.0 s THE END hold (plan `duration + end_hold`). Scene cues use `planning/inputs/timeline.json` word times; subtitle chunk times come from `align.py` (whisper.json = the final `.mp3.words.json`, no transcription). Chunks were hand-marked (the plan had no `subtitles`): 2-4 per paragraph, rebuilt verbatim from `story/`.

## Decisions the plan left open
- Home tree measured on the drawn set: trunk x 512..608, nest at (500, 345), nest ledge perch (425, 346) left of the nest, low branch tip (438, 686), lookout twig (604, 213), root stone top ~862, burrow (860, 890). Added a short right-hand stub at (668, 684) so the raven can watch the burrow inside the S12 tight frames (the low branch is out of frame there).
- River set: roof ridge measured at (855, 361) in `islandHut` (not 850, 560); the woman kneels at (742, 746) facing the water, the wash rock is on the island sand at (846, 806). The dawn-to-day sky ends at u 0.26 (pure day) because the dawn/day blend at u ~0.18 reads as olive.
- Jackal: no Library fox palette could be added (Library is read-only for this pass), so the jackal is the Library `fox` drawn through a canvas filter (`saturate 0.42, sepia 0.25`), sandy tan.
- Villagers: three (woman, man1 with staff, man2 in blue with a red cap); a fourth was not needed. Men enter the river shot from the right (from the village behind the hut), then turn and chase right, keeping the chase left-to-right.
- Mercy cut at 17.0: the camera leaves the world top (sky continued above y 0), so no frame shows the chicks taken.
- Dead snake carried away on the staff (the plan's staging choice) is kept; man1 hooks it at 137.95.
- Mini raven replay in S6: the cloud rewinds at 44.4 and the dive replays and freezes at 46.54 (the plan's "freezes mid-dive").
- Thought cloud of S5/S6 moved to centre (680, 500), 450 x 280, and the camera to x 555 so the jackal face stays at the left edge.
- Z Z Z is the Library `zzz` inside the cloud (no separate lettering).
- Raven `crest` is a lark-only field in the bird rig; crest beats are carried by head drop, sq and lids instead.

## Pipeline notes
- `ctx.filter` on the fox costs a little per frame but renders correctly in headless Chromium.

## v2 (Fable round 1) decisions
- Right stub raised to (668, 566) so the raven sits clear of the villagers' heads in S12/S13; trunk layer redrawn (all home-tree shots show the higher stub).
- Snake default width 28 (was 22). Climb path starts with a rise out of the hole (head held at the hump 11.9-12.76) and ends above the chicks.
- Fox `raise` paw is hidden under the head at s 0.8; k5Jackal draws a visible raised foreleg over the head instead (`raise` + `pawTo`, fox-local).
- Cloud mime: K5_CLOUD (590, 372, 400x270), inside at 1.55x centred on (742, 574); sand floor.
- Exit order is man2 (from behind the trunk), man1, woman (see review/revision_1.md note 1).
- S14 uses skyCycle for the whole scene (no static-sky to cycle switch).
