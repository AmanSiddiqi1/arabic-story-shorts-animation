# KD-019 implementation notes (v1, code only)

Film 177.44 s (narration 174.44 s + 3.0 s THE END hold). Subtitles: plan `subtitles` in chunks_ar.txt / chunks_en.txt, rebuilt verbatim by align.py on the final `.mp3.words.json` (copied to whisper.json). Cues use the plan's word times.

Decisions the plan left open or the drawn sets forced:
- The bird stands at x 176 on the bank (plan 200) and the crab meets him at x 345 on the waterline (plan 335): at the plan's positions the beak passed through the crab's eye stalks. In S2 the young bird stays at x 200.
- Fish scales 0.52-0.8 (the small yellow 0.52, round pinks 0.74-0.8) so the school reads at the wide framing.
- The surface audience is two rows (7 heads at y ~650, 5 below at ~745), x 400..772.
- Carry: the crab hangs under the bird's feet and is drawn in front of the legs so the stalks stay visible. From 112.8 the bird's legs stretch (legExt 70) so the crab hangs lower; this lets the curled neck show against plain sky in S13-S14. Camera keys for S12-S14 were shifted down by ~70 to match.
- The grip (S14): the neck curls forward, down and back to the left (`neckC` control points), so a horizontal neck segment lies just above the crab's eyes; both pincer tips are aimed at the neck point at chokeAt 0.7 (not 0.55, which was out of the left pincer's reach). From 141.52 the crab hangs from that neck point.
- S15 loop: the whole pair rotates once about the bird's body centre (144.56-145.2). The fall is followed down and the cut to the pond happens at 151.9 inside the speed lines.
- The dead bird lies on his back at the bank (rotated ~162 degrees) until 168.02, then is gone; one feather remains at x 178.
- Flight wings: side-view V wings, near and far wing at different angles, flap from time. The flight pose puts the head forward.
- Sound effects use 'pop' for the plan's 'plop' (no plop in sound.js); all are in the listed pauses.
- The S13 and S16 thought clouds are smaller than the S5/S7 ones; figures inside are about 110-130 px at the scene zoom.

## v2 (Fable review 1) decisions
- The bird's bank spot K19BX moved 176 -> 86 (and the S3 shuffle, strike key and dashed outline with it) so the beak stays clear of the crab in the two-shots; the sad head droops (headRot 0.35) from 24.4; the crab is redrawn over the reed clump in 24.4-43.3 and 92.6-100.1. S5/S7 cameras and clouds re-centred so the bird is fully in frame.
- Hill: no leg stretch (legExt 0); approach framed at zoom 1.75 so the ledge and bones stay below frame until the pan at 116.72; camera keys 110.94-133.93 re-measured.
- Climax: the pair climbs 160 units from 133.94 (K19LIFT, the bird pulls up before landing) and is framed at zoom 2.2 against plain sky. The head comes down to the right of the crab (head local (165..175, -60), beak toward him), the wing is held up from 138.4. The crab lunges from the feet onto the neck at 140.5 (the feet open at 140.56, not at 141.52 as planned) and hangs from the neck point u 0.55, 222 crab units below it; the head then yanks forward to a straight outstretched neck (head (200, -172)) for the fight, so the grip sits on a clear straight stretch. The plan's "head left of the crab" at the death is on the right in v2 (the head was on the right throughout), hanging clear of the crab against sky.
- Aftermath: the dead bird lies at x -20 (partly out of frame), the crab lands at x 262 in the open.
- Fixed a v1 bug: fish velocity was NaN (array index on an object), so every fish was drawn with only the front half of its body and no swim phase; fish now render whole and turn/tilt with their motion.

## v3 (Fable review 2) decisions
- Hill hover K19HOV (531, 378), K19LIFT 70: the approach camera at zoom 1.75 is at the world-top clamp, so the raise moves the pair up in frame rather than moving the camera; climax positions from 135.24 are unchanged.
- Fish shoreline clamp (k19shoreX) applies to swimming fish before 135.4 only (leaps and surfaced fish exempt) so the approved aftermath and ending stay pixel-identical.
- S2 bird at x 260 (S1 stays at 200; 5.78 is a camera cut). The fallen feather still lands at x 250.
- 44.5-48.78 audience: fixed slots K19AUD; net cloud at (530, 588).
