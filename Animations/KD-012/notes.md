# KD-012 production notes (v1, opus-animator)

## Decisions the plan left open
- Stone for the hero moved from x 1800 to 1770 so he stays inside the S9 close framing (zoom 1.9).
- B0 to B5, rooms, rock and lake follow the plan coordinates; rooms are 104 x 84 (not 120 x 86) so the four rooms do not overlap.
- The witness label HIS FRIENDS and the OOPS label/arrow were dropped (the plan's suggested first cuts); HOME was kept.
- Mother and kit escape by a back tunnel into room 1 and reappear beside B1 (the plan's "next mound"); B1 survives (cracked only).
- The squeak at 142.04 comes from the rubble of B4 under the king's rear feet (king retreats to x 1222).
- The cloud that hides the moon (97.72) is drawn in the sky layer so it never covers the white hare.
- Thought clouds in S5 were moved lower (y 560 / 500) after the camera was lowered to fill the panel.
- Subtitle chunk times come from align.py (silence-refined); scene cues use the plan's timeline word times.

## Pipeline friction
- The narration's words file is named `<mp3>.mp3.words.json` (not `<stem>.words.json` as the brief said); copied to whisper.json.
- `sh.sh` / `sheet.py` write stills into `Animations/KD-012/stills/` (inside the repo folder, not scratch); make sure it is git-ignored.
- `sky()` always bakes at 2x; a 2000-wide set at 2x for four presets costs a lot of memory per render worker, so the set uses its own 1.5x bake (`bakeK`). A width-aware bake resolution in the Library would help.
- `hare` has no wink and the elephant has no rear-foot lift (plan warnings 6); long blink and ears/head used instead.
- The elephant's raised near-front foot reads weakly in the close shot (the pad sits behind the trunk); a bigger sole option would help the S4 foot-over-B2 beat.
- No `--frames` default in scratch: renders write frames next to the story unless `--frames` is passed.

# v2 (opus-animator, revise from review/fable_review_1.md)
Narration, subtitle text and subtitle timing untouched (timing.json, chunks unchanged). v1 sources kept in scratch/<user>/KD-012/v1_src/. Library untouched; new drawing `bigFoot` lives in src/s_lake.js.

## Implemented
1. Foot over B2 (43.08-46.7): cut to a close shot on the B2 doorway (zoom 2.0, mound at about 55% of the panel); herd hidden, a foreground `bigFoot` leg column (toenails, creases) enters from the top and drops in three `countedBeats` steps on 44.02 / 44.70 / 45.50 with a dip before each, a growing `halftoneShadow` on the mound, a hover with tremor, an anticipation lift and the slam on 46.45. Mother and kit look up from 43.5, wet eyes from 44.70, kit squashes and trembles from 45.50, escape by the back tunnel 45.9-46.4; cut back wide at 46.7. Rig `lift` no longer used here.
2. CRUNCH! moved onto the B2 rubble, low in the panel, rot -0.08.
3. Herd seen hurrying on أسرعت الفيلة: king, cow, scout enter from the left at speed (dust on footfalls, mounds kick), camera holds then leads them, whip to the lake on 38.40; low angle from 38.9 unchanged.
4. Bend on انحنى: head drop 15 to 56 and body tip 0.1 over 122.06-123.06, eyes wide, gaze locked on the reflection, ears forward, trunk held then sagging from 124.5 to the touch on 126.16; camera reframed (zoom 1.75, x 1535) so eye, trunk tip, reflection and hare stay in frame.
5. 113.7-122 hold: double take with head bob following the eyes, ears up, eyes wide; two-shot push (zoom 1.55) from 116.14; hare anticipates and points down on انظر with a short yellow arrow to the reflection, talk on his lines; hush on ولا تزعجه (lean, paw to mouth, brow), king's ears flatten and blinking stops; one ripple line across the reflection and a king swallow in the 120.6-121.5 pause.
6. Moon hidden until the tilt (halo and disc fade in from 107.0; tilt 107.14 to 109.9); single halo pulse and three star twinkles on 110.48, king's ears lift. Walk to the lake framed on both (zoom 1.3 tracking), hare takes four hops, looks back on each landing, turns and beckons at 104.24.
7. 81-86.5: smug arrival with idle trunk swing, ear flick, snort puff at 82.0; hare draws himself up 82.70 and anticipates the chest tap 83.42; on 85.48 the king's eyes go wide, brow up, ears back, head tilt with crown lag, held to 86.5.
8. Promise (151.9-153.4): herd meeting restaged (king at x 1045 facing left, cow and scout left of the rock) so nothing grows out of the king's back; king soft brow, low lids, slow blink, wet eyes, head lowered; kit hops fully out of B1 on 151.98, trembling ears, nose up; trunk lowers from 152.44 and touches; kit ears spring up, sq 1.08, smile; push to zoom 2.2 from 152.2. S11 king start moved to match.
9. Lake shot held 27.26-28.98 (sparkles, two ripples, label to 28.9); the finder's head and trunk enter from the left edge with the trumpet and a bounce at 27.94; lake-side hares removed from that shot; the finder stops dead with anticipation and wide eyes at 25.53; scout stays in frame at 20.56 for its wet-eyed look back at the dry pond.
10. (a) Witnesses at zoom 1.9: one points at the crushed mounds and weeps (91.42), the other forgets to look sad at 92.28, gets nudged and overdoes it, both glance at the king at 93.34. (b) After AAH! a two-shot at zoom 1.55 to 139.28: arm flung down at the empty water on 135.65 (ears straight up), arm swings to point at the king on 137.06 with brow down; king shrinks on each (sq, ears back, tremble), wide only at 139.9 for the bow.
12. Arrow into the empty right edge (88.6) dropped; question beats on 100.81 / 101.64 (head bob, ear tilt, look up at the cloud and back), trunk question mark raised; squeak at 142.04 shown with sound arcs at B4 and a 0.5 s frozen raised foot with ears up; DAY counter moved 60 right; BURROWS! label moved into the earth between rooms with the arrow up the soil to the surface.

## Partly implemented
11. S5 framed tighter (zoom 1.5 then 1.7, ground near 70% of the panel), FAR AWAY object removed and the arrow now points at the huddle; S1 starts 80 units left; S11 return at zoom 1.45. Skipped the zoom-2 cut-ins on STOMP (58.26) and the ear wave (60.82): at that zoom the elder's thought cloud, which the review asked to keep, would be cropped.

## Skipped
- King "slow blink" while smug at 81.1: the rig's smug eye is a line, so a blink does not read; the ear flick and snort carry the beat instead.
- Hold-audit tool (reviewer's Library suggestion): out of scope for this story folder.

# v3 (opus-animator, fix from review/fable_review_2.md)
Narration, subtitle text and timing untouched. v2 sources and player kept in scratch/<user>/KD-012/v2_src/. Library untouched. Stills: scratch/<user>/KD-012/stills/v3check/.

## Implemented (required)
1. Bend on انحنى (122.06-123.06): head drop 15 to 90 (v2 56) and body tip 0 to 0.22 (v2 0.1), same ease and times (`BEND` in src/s_night.js); the eye goes about 100 world units lower (v2 52) and sits below the back line. Camera held on the 121.56 framing until 123.1, then pushes to zoom 1.75 over 123.1-124.4, so the crown moves about 80 px DOWN the frame. Trunk no longer curls: it hangs (trunk 0.25, slight forward hang so the tip stays just above the water) with a small sway, then sags from 124.5 (ease-in, trunk to 60% and drop +6) to the touch on 126.16. Fright jerk at 131.46 starts from the new pose.
2. Departure (153.4-157.0): king starts at x 445, left of and clear of the rock (rear foot about 45 units clear), facing left behind the cow and scout (both moved ahead: cow from 230, scout from 40). Walks left from 154.27 on `walk` keys with `footfalls` dust, stops at 155.6 (x 385), looks back at the hare with ears up and raises the trunk against the open sky on 155.84-156.3, exits off the left edge by about 156.9. Shot camera moved from x 700 to 520 so the salute is in frame; the pan to the returning hares now starts at 156.9.

## Implemented (optional)
3. Herd hurry 36.0-38.2: herd x keys +250 (`S4OFF`), blended out inside the whip to the lake (38.2-38.6); king whole and cow behind in frame on 37.14. The king passes in front of the rock at about 37.6 while moving (not a standing overlap).
4. DAY counter: sun arc now runs x 560 to 1200 (y 600 to 120), fading in at each day start, so it stays clear right of the burst; day 3 ends on the old resting sun position (790, 165).

## Skipped
5. Squeak arcs: in S9 the arcs are already drawn at the B4 rubble by the king's rear feet (1170, 850, 142.04-142.75); the arcs the review saw at 143.0 are the king's trumpet call in S10 (trunk), a different beat. Left unchanged.

## For the Guide
- Pose first, camera second: a push during a vertical pose change cancels it on screen.
- After moving a character's mark, check later shots for collisions with set pieces.
