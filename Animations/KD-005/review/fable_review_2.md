Verdict: PASS WITH NOTES

# KD-005 The Raven and the Snake: Fable review, round 2 (v2 cloud render)

Reviewed: `renders/KD-005_v2.mp4` (163.3 s) through all 28 strips in `review/v2_pack/strips/` (4 fps), plus 36 full-size frames and 11 sheets pulled into `review/v2_pack/extra/` (`f_<t>.png`, montages `m1..m9.jpg`, `day.jpg` at 10 fps over 145.5-148.8, `day_frames.jpg` frame by frame over 145.9-146.4).

**Overall.** v2 fixes every staging problem that hid a story beat in v1. The villagers now visibly walk home, the peck plan and its replay read as a set-up and a punchline, the jackal is on screen for his own lines, the whisper is a clean silhouette, the snake's entrance has weight, and the day cycle no longer flashes. No BLOCKER, no broken frames, no new staging error that hides a beat. Subtitles are unchanged, verbatim and readable; THE END appears at 159.7 and holds to 163.3. The remaining points are polish and do not justify a v3 pass on their own.

## Round-1 notes

| # | Round-1 note | Status | Comment |
|---|---|---|---|
| 1 | 138.0-140.0 villagers do not leave, pile into one stack | FIXED | Staggered exit to the left, 138.0-139.4, no overlaps, all off screen by 139.5. Raven sits clear of every head through S12/S13 and turns to watch them go. Man2 leaving first is a sound change. |
| 2 | 38.8-43.8 peck plan does not read | FIXED | Mini raven tiptoes in (39.0-40.5), two jabs with PECK! inside the cloud on 41.3 and 41.9, real raven jabs in sync, both puff at 42.9. The replay (eye open 48.4, strike and SNAP! 48.85, cloud turns red) now contradicts it clearly. See polish note A on the cloud floor. |
| 3 | 38.7-51.2 jackal cropped to a head | FIXED | Whole jackal, raven and cloud in frame for the full range. |
| 4 | 46.6-48.0 NO! stamped on the raven | FIXED | NO! sits beside the jackal in clear sky; the raven's flinch and shut beak are visible. |
| 5 | 60.0-63.2 muzzle passes through the raven's head | FIXED | Clear gap between the heads, raven's head cocked, eye widens in two steps. See polish note B on the paw. |
| 6 | 10.2-16.8 snake entrance tiny | FIXED | Close shot of the burrow, eyes at 10.7, head and tongue at 11.5, large half-lidded head held to 12.7, thicker body on the climb. At 16.5-16.8 the head is clearly over the rim above the chicks with the mouth closed. |
| 7 | 145.2-148.8 day cycle strobes | FIXED | Checked frame by frame: every change is a cross-fade over several frames, no back-to-back palette jumps, both days pass through real blue daylight. Still a busy 3.4 s, which the narration length dictates. |
| 8 | 158.3-163.3 weak closing image | PARTLY | Framing, the jackal's halt, sit and upward look, and THE END placement are all fixed, and the two characters are still for the hold. The wing salute is still not visible: in the frames at 159.5-160.0 the raven only turns toward the jackal (black wing on black body at about 70 px). See polish note C. |
| 9 | 106.5-120.0 chase | FIXED | Tighter tracking camera, runners spaced, the staff swings up to the raven's tail at 109.3 with a feather at 109.45, SWISH! on the arc, the raven turns back and shakes the necklace at each tree. Man2 drops out of frame from 114.2, which suits him. |
| 10 | 131.5-134.0 recoil cluttered | FIXED | Three separate reactions; man2 peeking round the trunk is a good gag and stays readable to 137.5. See polish note D on the staff. |
| 11 | Dialogue two-shots wide, gestures do not land | PARTLY | Tight two-shot from 29.7, the jackal sits at 30.5, head shake and temple tap with a visible paw are in. The raven's wing point at 35.5-36.8 still does not read in the wide (`f_36.2.png`: wings folded as far as can be seen). |
| 12 | Small polish (GULP!, SWOOP!, cloud cap, bare ground) | PARTLY | GULP! gone, the cloud behind the raven's head gone, ground shots re-aimed, dead snake on screen about 1.3 s and away from the raven. SWOOP! is clear of the woman's face but still touches the top of her head at 95.2. |

## Polish notes (optional, no v3 required)

**A. 38.7-51.2, thought cloud floor.** The sand floor of the cloud sits exactly on top of the trunk, inside the green crown, so the lower half reads as an orange tree-top rather than part of the thought (`f_39.9.png`, `f_46.7.png`). Fix: make the floor a thin strip (a ground line and about 20 px of sand) or drop the fill and keep only the line, so the cloud stays paper-white down to its scalloped edge.

**B. 46.5-48.2, 54.3-55.5, 61.0-63.0, story-drawn raised paw.** The new foreleg is a thick bar laid along the jackal's muzzle with the paw at his nose tip. On the stop (46.7) it reads acceptably as an arm thrust forward. On the whisper (61.5-63.0, enlarged by the push-in) it covers the mouth and doubles the muzzle, so it looks like something lying across his face. Fix: for the whisper, pivot the forearm up about 35 degrees so the paw stands beside the far cheek above the muzzle line, leaving the mouth and nose visible, and thin the limb by about 25 percent. For the stop, raise the paw 30 to 40 units so it is held up flat in front of the face, not across it.

**C. 159.5-160.1, wing salute.** Give the salute a readable silhouette: the near wing raised above the raven's back into the green crown (tip at least 40 world units above the head), held 12 frames, with two small motion ticks. If the wing cannot rise that far, a single hop with `landSquash` toward the jackal says the same thing.

**D. 132.3-133.8, staff over the snake.** Man1's raised staff crosses the snake's head and the HISS! lettering (`f_132.7.png`, `f_133.5.png`). Tilt the staff back over his own shoulder (tip left of his cap) so the reared head, the open mouth and HISS! are clean.

**E. 35.5-36.8, wing point.** On "هذه" (35.23) throw the near wing out toward the burrow with a visible gap from the body, or add a short `S.arrow` from the raven to the burrow for that hold.

**F. 95.0-95.3, SWOOP!.** Move the lettering about 80 px up and right so it clears her head.

## Regression check
Skimmed all unchanged ranges (0-10, 18-24, 63-94, 96-106, 120-128, 150-158): no regressions found. The thicker snake looks right in S3, S12 and S13. The crossing at 136.1-136.6 (woman behind man1) is brief and clean.

## Subtitles and sync
Unchanged from v1 and correct. Cue sync holds on the re-timed beats: jabs 41.3 / 41.9, NO! 46.5, SNAP! 48.85, recoil 131.5, exit from 138.0, DAY 1 146.3, DAY 2 147.5.

## Reusable techniques for the Library
- **Wrong plan, then replay in the same cloud** (38.7-51.2): the same mini staging run twice, the second time with one change and the cloud turning red. Worth a Capabilities Guide entry next to the plan board.
- **Hide-behind-the-trunk reaction** (131.6-137.5): one member of a group drawn behind a set piece with only head and cap showing separates a three-person reaction cheaply.
- **Guide note:** a story-drawn limb over a Library head needs its own check at the tightest camera of the scene; a limb lying along the muzzle reads as an object.
