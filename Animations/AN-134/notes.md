# AN-134 The Caliph al-Hakim and the Merchant: implementation notes (v1, code only)

- Inputs checked: planning_metadata sha256 of the final MP3 (566ff25b...) and its `.mp3.words.json` (42e62221...) match `Audio Files/Final Done/` and `planning/inputs/timeline.json`.
- Film length 176.28 s = narration 173.285 + end hold 3.0 (plan). THE END at 173.3, after the last word (173.04).
- Subtitles: the plan's `subtitles` chunks (chunks_ar.txt / chunks_en.txt), aligned by align.py with the final `.words.json` as whisper.json. The supplied English em dashes ("followed—some", "year—three") are shown as ", " at display time only (hk_main.js); timing.json stays verbatim.
- Sound: exactly the plan's twelve cues, each inside a measured silence (ffmpeg silencedetect): 5.75, 20.9, 21.4, 79.34, 85.58, 130.3, 130.85, 137.45, 151.2, 151.6, 173.45, 174.3. No bed, nothing under the feast, counters or stamping.
- Source: `src/hk_rig.js` (time and person-rig helpers, adapted from AN-108), `hk_props.js` (props, orchard road/inside sets, hundredWindows, feastSpread, rug, chest, coins, glow, inset), `hk_cast.js` (costumes, person drawer with guard kit / held goblet / loose crown), `hk_road.js` (S1-S3, S17), `hk_garden.js` (S4-S8, S10-S14, S16, clouds, balloons, the S10 replay inset), `hk_other.js` (S6 high view, S9 diagram, S15 treasury and coin insert), `hk_main.js` (set per time, camera, overlays, sound).

Decisions the plan left open or the measured set changed:
- Road: the owner sits at x 1355 (not 1330) and the servants at 1275 / 1445 so the white horse's head does not cover him; the caliph's horse starts on screen (x 150) and the front guards walk on to x 1780 / 1890 past the gate so nothing stands between the rider and the wall in S2. Road cameras are framed a little tighter than the plan (S1 zoom 1.45 -> 1.15, S3 1.45 / 1.35) to keep faces readable.
- The caliph holds a second goblet in the garden (S5-S12) and sets it on the rug at 130.3; the S2 goblet goes back to the owner and is the one he holds at the end.
- S5: the three later trays (rice, bread, dome) are tossed from the gate by a fourth servant instead of carried; the first three are carried in a file and set down from a kneel.
- S6: the high view is a separate drawing (lawn, rug, three 10 x 10 blocks); the camera holds on the centre block and widens at 57.36 to show the other two. After S6 the garden shows two extra rows of dishes in front of the rug.
- Clouds and balloons moved down to stay inside the low two-shots: S7 cloud at (500, 455) 500 x 300; S11 balloon at y 440; S12 cloud at (430, 350); S16 balloon at (420, 410).
- S9: inset enlarged to r 200 at (700, 360) so the woman at her sill reads.
- S15: the Library vault sits on the left of palaceHall (blue), so the chests are at 330..750, the vizier skids in from the right to x 690 and the guards stand at 935 / 990; the camera pushes to x 360.
- Crown hop (S6 6 px, S12 14 px and lands 5 degrees crooked until he stands): the caliph's headwear is drawn on its own for those beats (hkHat, after AN-108 ksHat).
- Skipped or simplified: the guard taking the reins at the dismount, the guards hoisting chests on poles (they dip under the weight instead), the vizier's "full cheeks" (no cheek field), the cape lag on the turn, the white horse's head turn with a squeeze at 163.0 (dir flips with a 0.9 squash), the falling sweet is drawn by the scene. Owner questions: all plan defaults.
