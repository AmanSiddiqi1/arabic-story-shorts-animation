# ALI-02 "The Forgotten Password" (80s Cel Anime): implementation notes (v1, code only)

Plan checked against the inputs: MP3 and `.words.json` SHA-256 match `planning/planning_metadata.json` and `planning/inputs/timeline.json`; MP3 138.691 s. Film = 138.69 + end hold 4.0 = **142.69 s** (`AB_DUR`). Subtitles: library subtitles from `timing.json` (chunks unchanged).

## Series continuity
`src/ab_kit.js`, `ab_cast.js`, `ab_sets.js` are copies of ALI-01-ANIME v4 (only `AB_DUR` changed). The reused scene-level helpers (shot dispatch, `abSay`, `abTracking`, `abDoorState`, `abStandCloak`, `abLineHorse`, `abVillage`, `abCottage`) are copied into `a2_base.js`. ALI-01-ANIME is not edited. All cast palettes unchanged; `AB_MODEL` k stays 0 (no tint over the cast).

## Decisions the plan left open
- **Cue times from `timing.json`**, which has refined onsets: «افتح 4.895 (not 4.42), ودخل 7.358 (not 6.28), «افتح 22.404 / 24.359, «من 60.322. The arm throws are keyed so the snap lands on those onsets; the second impact frame is at **60.32** (speech onset of «من), not 60.12. Impact frames 45.32 and 137.74 as planned.
- **Glade layout:** the mule cart stands at bed x **1140** (mule 1430), not 1200, so Cassim can call from x **1680** without the mule's head over him; the chestnut horse at **1075** (not 1040) so its head clears the eye gap. Horses: black 2060, white 2175, chestnut 1075, grey 1290, dun 1410 (five mounts; they all ride in from the right in the S6 cutaway).
- **Cave layout:** four small sacks fill in a row at x 400..520 and the big one at 660 (by the mound); in S3 he drags three of them to the door side, so the heap is x 400..535 and he hides behind it at x 470 (lowered behind the sacks, clipped at the floor so only the turban top and feather show). The leader stops at x 300, then 368 (left of the heap); Cassim steps out to x 612 (right of the heap) for the two-shot.
- **S1:** Cassim carries a bundle of flat sacks from the cart when he hops down (instead of going back to the cart for them at 6.28; the cart is 400 units from the door).
- **Doorway figures** use `abDoorState` with a separate `stateX` (in/out progress) so the leader and the men can come out of the arch and step to the right of the door; Cassim keeps at most 25-50 % silhouette in the doorway so his face reads.
- **S12:** the mule turns round in a dust puff (one flipped drawing) and trots off with the cart; the double take is done by man 0 (next to the leader), not man 2.
- **S13:** the mule cart stops at x -270 (mule 20) at the left edge so it does not overlap Cassim; the YOUR GREED balloon goes at 114.05 when the picture cloud opens.
- **S14:** the men stand further back (y 872..884) so the leader reads in front; the far town is drawn at scale 0.72 from x 110 so it shows on both sides of the hiding tree after the whip pan.
- **Tape transition** 106.45-107.30 with the plate swap (S12 -> S13) at 106.88.
- Owner questions: plan defaults (balloon lines, extra grains, softened threat, pebbles, one sack taken home, mule follows home, THE END, times of day, title card).

## Not done / simplified
- The chestnut horse's snort is the Library `snort` field only (no extra breath puff); Ali Baba's eye gap does not snap shut at 79.7 (the camera is on the rock then).
- No foreground trunk layer in the forest run (S12): it risked crossing the runners at the word cues.
- The turban that falls off at 67.05 is a separate saffron cel on the floor; it is put back with the head tilted (crooked), not as a separately rotated turban.
- No separate toe-scuff animation in the shame beat (a small sway of the standing figure instead).
