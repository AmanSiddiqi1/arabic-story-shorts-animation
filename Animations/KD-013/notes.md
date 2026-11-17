# KD-013 production notes (v1 implement, code only)

Inputs checked: plan metadata sha256 of the MP3, words file and script match planning/inputs/timeline.json and the files in Audio Files/Final Done/.
Subtitles: chunks_ar.txt / chunks_en.txt written verbatim from the plan's `subtitles`; timing.json built by align.py from the final `.mp3.words.json` (copied to whisper.json).
Film length 166.0 s (narration 162.544 + 3.5 s hold).

## Decisions the plan left open
- Road places (countryRoad, 3000 wide): tree 420, milestone 1260, bush 1760, low wall 2200 (w 240, h 56 so the seated ascetic's feet stay on the road), bush 2420, tree 2560. The plan's S10/S16 wall at 2350 and seat at 2140 could not both hold; the wall moved to 2200 so the seat at 2140 is on it.
- S5 (the plan) is a reverse-angle shot on its own 1000-wide strip with the tree at x 800 (the plan's 880 fell outside the zoomed frame); the far ascetic and grazing goat stand at x 190 / 120.
- S2 is drawn inside the S1 scene object (same set and camera track); S7 continues the S6 shot; S12-S14 are one scene object (same wall framing); S17-S18 share one gang drawing function.
- Camera zooms were raised from the plan's 1.3-1.5 wides to 1.4-1.8 (two-shots 2.0-2.25) so faces read on a phone; the S12 cloud shot keeps the tilt up for sky (zoom 1.6).
- The goat is "behind" the ascetic in S9 (cut cheat): in S8 it stands ahead of him nose to nose with thief 2, in S9 it walks into the back of his legs as planned.
- S17-S18 walking order is leader, goat, thief 2, thief 3 (not leader, goat, thief 3, thief 2) because of where each closes in on the goat; the palm slap over the goat (151.64) is leader and thief 2.
- Thieves wear the `thief` costume (mask), so they have no brows; their acting uses eyes, lids, wink, mouth, head tilt and look instead of `brow`.
- DOG? counter top-right; the 3 OUT OF 3 stamp sits top-left so it does not cover thief 3's tall turban.
- Sound: only the plan's four effects (pop 20.5, whoosh 41.4, whoosh 62.6, chime 162.9); no ambient bed, as the plan says "nothing else".
- The whip at 41.4 is a fast horizontal slide with paper speed streaks (0.28 s); wipes at 11.8-12.25 and 153.6-154.05; A LITTLE LATER card 62.6-63.9 with the S8 cut at its covered midpoint (63.25).
- Small invented sound lettering added: CLINK!, TUG, BUMP, SMACK, TSK TSK, HEH HEH, meh (all silent, none over a face).

## Skipped / simplified
- The basket lid lift in S19 (155.94) is a reach and a look into the basket; the lid is not animated.
- Pupils "small" (100.18) has no field on the person eye; brows, sweat and tremble carry it.
- Full render, qc.py: not run (campaign rule); checked with stills and contact sheets in stills/.
