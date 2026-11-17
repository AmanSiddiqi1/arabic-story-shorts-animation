# KD-009 notes (v1, animate stage)

## Decisions the plan left open
- **Snap sound:** kept silent (sound rule; plan warning 1). The snap is carried by a white flash, SNAP! burst, dust jets and a 10-unit panel-only shake. Open question for the user remains.
- **Seat moved to the very end of the log** (plan fallback, warning 3): monkey seat x 640 (plan 600), so the tail is visible hanging behind him into the slit at x 598 (at x 600-650 it was hidden behind his body and legs, or collided with the wedge). Wedge driven home: tip 616, head 676 (plan head 700) so the carpenter's idle hands no longer cover it.
- **Arms:** `armLen` is set automatically (`fit: true`) so the monkey's hands land exactly on the wedge or the tail during the reach and pull.
- **Gap height** at the mouth is 44 units (plan 34) so the slit and the tail tip read at phone size.
- **Rescue spot:** the carpenter kneels at x 690 (plan 735) so his hand can reach the tail at x ~600; the pry bar is drawn in world space from the seam to his hand.
- **Lifting the tail:** the carpenter lifts it out of the seam; the monkey takes it from his hand with both hands and pulls it into his lap (the carpenter cannot reach the lap from the kneel spot).
- **Camera:** the plan's camera y values put the subject mid-panel with ~40 % empty ground below (the panel is taller than wide). All keys are shifted up by `min(55, 70 * (zoom - 1))`; wides use zoom 1.06, y 590 instead of zoom 1.0. Two-shot in the rescue tightened to zoom 1.7.
- **Wide opening:** the monkey is hidden behind closed leaf clumps until 14.48 (clumps part).
- **Sky:** dawn until the LATER card (cut at 51.2), day afterwards; the ending wide uses the day sky rather than the opening dawn.
- **SFX:** plan list as given, `tap` = `tick` (pitch 0.5), `tok` = `click` (pitch 0.4).

## Known v1 weaknesses (for the Fable review)
- Wedge in the carpenter's hand at 35.4-38.7 is small and partly hidden behind his hand/ring.
- Carpenter is a straight-on figure; walk-backwards and the turn at 27.6 are simple flips.
- No climb pose: descent is a hop to the trunk + a slide; the return leap is one arc.
- Thought-cloud figures are moderate size (scaled 1.45 inside the cloud).
- Monkey lying on his back (102.5-111) reads more as lying on his side.

## Pipeline friction (pilot)
- **Global name clash:** a story constant `MS` silently broke the player (`MS.styles` is the engine's global) with only "Cannot read properties of undefined (reading 'halftone-pop')". The template should list reserved globals (MS, K, C, S0, LIFE, TIMING, SCENE, ...) or wrap scene code in an IIFE that exports `window.SCENE`.
- **Template camera:** the template's `toPanel`/camera keys and the plan's camera values do not account for the tall panel; a "subject y bias" belongs in the template's `camAt` (or the planner should be told the panel is 972 x 1196 and wides show ~27 % ground).
- **Plan anchor points clash in practice:** tail at (650, 815) and wedge head at (700, 815) overlap at the mouth, and the monkey's own body hides the tail at seat 600. The planner would benefit from a quick geometry check against the cast sizes (monkey s 0.9 is ~165 tall, ~75 wide; person reach is only ~68 world units).
- **Person figure lacks legs by default** (`owner` has none unless `legs`/`showLegs`), and has no sit/kneel; the carpenter needed a full copy of `person` (now `carpRaw` in src/parts.js).
- **Library monkey always draws its curl tail**; any tail acting needs a `noTail` option (done locally in `monkeyK`).
- **story.json** from the importer has `scenes: []`; the animator must fill it. `align.py` needed `whisper.json` copied by hand (stated in the brief, but it could read the `.words.json` path from story.json).
- `align.py` prints chunk starts that differ slightly from the plan's word times (it aligns script words to the Whisper words); harmless, but cue times in the plan and in timing.json are not the same numbers.
- Plan `sfx` kinds `tap`/`tok` are not engine voices (`tick`, `click`, `thud`... are); a mapping table would avoid guessing.
- Plan duration (`duration + end_hold`) is not what the template computes (last word + 2.9); DUR had to be hard-coded.

# v2 (revise stage, Fable review 1)
Narration, subtitle chunks and timing.json unchanged; sound score unchanged (snap still silent, a quiet thud remains a user decision). v1 sources kept in scratch/<user>/KD-009/ (scene_v1.js, parts_v1.js).

## Implemented
- **1 Climax 102.5-111:** 0.5 s tumble back (tip -1.2, legs up), `settleTo` back up to the seat x 640 by 103.40; upright triumph with the wedge held straight up, smirk, chest out (sq 1.05); toss over the right shoulder on 103.94 (wedge flight starts at the raised hand); dusts his hands, leans back smug. Snap shot is now {x 640, y 800, zoom 2.0} (head, seam and mouth in frame). Delayed take seated: 108.36 freeze (lid 0, wide eyes), 108.6 look to camera, 108.9 look down at the seam with growing tremble, 109.98 upright scream (sq 1.12, arms up, mouth open, YEOWW! above his head, sound arcs). The lying pose is gone; he slides to x 520 from 111.1 for the attempted jump.
- **2 SNAP:** custom red/yellow burst (~50 % of panel width) just above the seam, pops 0.4 -> 1.15 -> 1.0 over 5 frames, held to 107.0 (fade to 107.2), 8 black speed lines for 6 frames, upper half overshoots 4 units down and settles, panel shake 10 -> 16, first tail throb at 107.86 is a size 2.2 ring.
- **3 Lesson 153.5-157.1:** clumps slide 45 units apart (third drops) from 153.1 and stay open to the end (`leafClumps` got a `spread` arg); straight cut from the sawing carpenter to the perch at 153.5; two sawing strokes with a faint ghost saw; tail throb ring + stars at 154.18, freeze, eyes to the tail; head shake on 155.2, left hand grabs the right wrist and tucks it under the arm; NOPE! as before.
- **4 Wedge:** (a) held at arm's length to the left at 2.4x scale (`holdS`), ring around the wedge only (no extra WEDGE label: the subtitle says "small piece" and the ring + size carry it). (b) fat red arrows (width 28) touching top and bottom of the log; on 44.04 his hand presses the top half, the gap closes by a third, the wedge flashes, the half springs back with one overshoot; yellow double arrow in the gap on 44.76; no folded arms: he steps right to x 805, hands on hips.
- **5 The pull:** light tuft on the tail tip (inside the log), twitch every 2 s, a big flick at 83.52; push-in to zoom 2.6 on the face at 93.94 (HNNGH!), insert of the mouth (zoom 3.2) at 96.0 with the wedge jerk moved to 96.07, back to the mid shot at 98.08; wedge hangs by its tip and wobbles 101.73-102.48.
- **6 Sky:** day sun lowered to y 330 (visible in the mediums), two extra low clouds in the day; wail arcs are now three concentric yellow arcs with black outline that travel from the mouth to the window and fade on arrival.
- **7** Round inset (top left, drawn by re-using drawWorld) 57.18-60.9: the monkey's eyes follow the carpenter to the door, hold, snap back to the log with brows down at 60.9. Bigger yawn (arms up, head back, lids shut, YAWN, shoulders drop).
- **8** Opening starts close on the door (zoom 1.7) and eases out by 5.57; standard wide is now {540, 565, 1.25} (opening, 18.3, ending); worn path, shavings and grass tufts on the ground; backing steps happen inside the 139.4 pull-out; long out-breath at 140.7.
- **9** Carpenter reads tail (128.2) -> wedge (128.6, ring + hop) -> monkey (129.28), dotted line drawn in that order, AH!, palm out at 130.4; monkey points at his tail with a straight arm, pleading, looks away guiltily on the wedge look. The landed wedge moved to x 840-900 so the carpenter's legs no longer hide it. Pry bar thicker with a red grip and a ring on 132.36.
- **10** Thought cloud framed waist-up at 2.4x; swap to the cap fantasy on 74.37 with a scale pop, stars and PRO!; scene sun and clouds hidden while it is up.
- **11** Ending on the 1.25 wide with the clumps open; palms toward the tools, lean back (tip -0.12), hunched (sq 0.93); bird lands with a hop and pop ring and the monkey's eyes flick to it; sun slides to x 840 before THE END.
- **12** Clean cut at 14.04; GAP label moved into clear sky; five falling leaves at 144.0; "?" at the window on 122.27.

## Partly implemented / skipped
- 4b: the carpenter does not stand at x 820 during "holds it open" (his reach could not press the log from there); he steps aside after the press instead.
- 5: the eye-to-gap miss at 83.52 is a tip flick only (no separate grab/miss).
- 12: hand-over-hand descent at 62.5, spoon drop removal and the carpenter's gaze/tip tweak skipped (low value, time).
- Wink in the cap fantasy skipped (monkeyK has no wink field; Library not edited).
