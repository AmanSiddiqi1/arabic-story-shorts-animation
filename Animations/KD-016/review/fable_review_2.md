Verdict: PASS WITH NOTES

# KD-016 The Dove, the Fox, and the Crane: Fable review, round 2 (film v2)

Reviewed: `Animations/KD-016/renders/KD-016_v2.mp4` through all 28 strips of `review/v2_pack/strips/` (4 fps), plus 30 full-size frames and crops pulled into `review/v2_pack/extra/` (the tuck, the crouch, the pinned pose, the mask cuts at 104.4/105.3, both chick drops, the ending move and the final hold).

## Summary

v2 fixes what made round 1 a REVISE. The third movement now reads at first viewing:

- the head really disappears under the wing (141.0-145.6);
- the fox's face changes on screen, twice (104.4-105.3 and 142.8-143.3), and the crouch is still;
- the pinned heron is clearly a bird on its side with the fox's paws on it, and the shame beat at 154.4 is visible;
- the film ends close on the dove.

No blockers, no new staging errors, no regressions in the unchanged scenes (0-36 s, 60-96 s and 108-138 s were skimmed strip by strip). Subtitles are unchanged and readable. The notes below are polish and do not call for a v3 render on their own. Notes 1 and 2 are both in the final 2 s hold and are worth doing if the film is rendered again for any reason.

## Round-1 notes

| # | Round-1 note | Status | Comment |
|---|---|---|---|
| 1 | 147.7-156.5 pinned heron reads as a rock | FIXED | Lying on his side above the waterline, neck along the ground, head upright, eye wide; both fox paws on the body. Splash is gone by 148.2 and nothing covers the fox's face. Look to camera at 149.5 and the eyes dropping from 154.5 both read. The leg sticking up behind the paws reads as a leg. |
| 2 | 141.0-145.6 head not under the wing | FIXED | From 141.0 no head, eye or neck shows; only the crest tips and wingtip poke out. The half tuck at 130-132.5 still shows the eye, so the full tuck is a clear step further. One-leg stance kept. |
| 3 | 142.4-145.6 crouch given away | FIXED | Sweet face at 142.2, one lick at 143.0, then a low, closed-mouth crouch with narrowed eyes from 143.5 to 145.5. The mouth opens only on the take-off at 145.7. |
| 4 | 103.5-106.5 mask drop hidden at the frame edge | FIXED | Cut to the fox low and close at 104.5 (fully in frame): smile, then narrow lids and a tongue at 105.0. Cut to the nest at 105.2: she looks down with wide eyes, the chick beside her. The wing-to-beak gesture is not readable, but the realisation is (see note 6). |
| 5 | 159.6-164.7 ending too wide and static | PARTLY | River framing with the larger feather and rings 160.0-161.7, then the move to the nest, settled by about 162.7. The dove's bowed head and long blink read. But the chick slides out of sight by 163.0, so the last 1.7 s shows her alone (note 1), and a stray yellow shape enters the lower left corner (note 2). |
| 6 | Chick drops too fast | FIXED | First: chick at the rim 37.5-38.0, fall in the wide shot 38.2, caught 38.5 with the tuft at his lips, counter 2 at 39.0. Second: close nudge 46.2-47.0 in the same pose, fall 47.2-47.7, counter 1 at 48.2. |
| 7 | 99.2 sky jump inside the conversation | FIXED | Dawn sky holds through her answer; the blend to day runs on the fox's walk 107.0-107.7; the counter fades at 106.5-106.7. |
| 8 | 118.08 "The bird answered" shows no answer | FIXED | Head swings down and left at 118.2-118.7 with the small yellow arrow, upright again by 119.2. |
| 9 | Heron cut by the right edge | PARTLY | Heron is whole at 52.7-59.5, 85.0-86.2 and through the river two-shot. The cost is the fox at 84.7-86.2, where only half his head shows at the left edge (note 5). |
| 10 | COME UP! beside a down arrow | FIXED | The arrow grows up the trunk 88.7-89.5. |
| 11 | Lesson scene: no water, faint BRAVE pose | FIXED | Water strip visible throughout 60-79. Heron's tall pose 73.0-74.5; her wobble 75.5-75.7; set brow from 77.0. See note 4 for one overlap. |
| 12 | Two small acting gaps (22.5 and 109.7) | FIXED | Wide-eyed start at 22.5 with a feather falling 23.2-23.5. Closed smile and clap stars at 109.7-110.7, no fangs. |

## Notes (polish, most important first)

### 1. 162.9-164.7 s. The last chick is not visible in the final image
**What is wrong.** At 162.4 the chick is clear beside her (big eye, yellow head). As her head sinks, it slides behind her breast and by 163.0 nothing of it shows. The final 1.7 s is the dove alone, bowed over what looks like an empty nest. Her half-open eye at 164.4 has a heavy slanted lid and reads closer to cross than sad (crops `extra/m4.jpg`).

**Why it matters.** The plan's last image is "the dove holding her one chick". With no chick in sight, a viewer can read the ending as her having lost all three.

**Fix** (`kd16_main.js` line 413, the `t >= 162.4` chick block, and lines 367-368).
- Keep the chick's head visible to the end: reduce the slide to about `k.x += 6`, `k.y += 2` (not `-6`), and draw the chick after the dove's body for `t >= 162.4`, or keep it on the nest rim in front of her breast. Its eye closes at 163.6 as now.
- Bring her near wing down over the chick's back (the `wing` field, to about 0.5 over 162.6-163.4) so the gesture is a wing over the chick and not only a lowered head.
- End lid at about 0.75-0.8 with `brow` 0 (or stay closed after the long blink), so the eye is soft.

### 2. 162.7-164.7 s. Stray yellow bars in the lower left corner under THE END
**What is wrong.** Two rounded yellow bars with black outlines poke in at the lower left of the picture panel and rotate slowly through the whole final hold (crops `extra/m7.jpg`). They look like the rays of a sun whose disc is off screen, at about world (150, 650) for the final camera (425, 345, z 1.8).

**Why it matters.** It is moving clutter in the film's last, stillest image.

**Fix.** Find what draws there at dusk (probably a `sun`/`dayCycle` call still running for `t >= 158`) and switch it off or set its rays to 0 for the ending. If it is the intended setting sun, either hide it for `t >= 161.4` or shift the final camera about 40 units right (465, 345) so it is fully out of frame. Check THE END still clears the dove.

### 3. 152.9-153.1 s. Arrow left over after the cut back to the close shot
**What is wrong.** The yellow arrow to the dove (152.0-152.7 wide shot) is still drawn for a few frames after the cut back to the close two-shot at 153.0, as a long diagonal line across the sky from the top left corner (`extra/m2.jpg`, second frame).

**Fix.** End the arrow's alpha at the cut time (fade it out over 152.6-152.85, or gate it with `t < cutBack`).

### 4. 73.0-74.5 s. The heron's beak overlaps the dove's face in the BRAVE pose
**What is wrong.** When he stretches up (head high, chest out), his beak tip lands on her beak and eye for 1.5 s. It reads as a peck or a kiss.

**Fix.** In this pose turn his head slightly up and away (`headRot` about -0.25) or stop the neck about 25 units lower, so there is a clear gap of 20-30 px between his beak tip and her.

### 5. 84.7-86.2 s. The fox is half out of frame while the dove looks to the heron
**What is wrong.** In the pan to the heron the fox is reduced to half a head at the left border.

**Fix.** Either end the pan about 40 units earlier (camera x lower) and let the heron's tail touch the edge instead, or use z 0.95 for this 1.5 s. Low priority: the beat is about her look to the river and it reads.

### 6. 105.3-106.6 s. Wing to beak is not readable
**What is wrong.** Her wide eyes and downward look read, but the raised wing merges with the body.

**Fix.** Lift the wing clear of the body outline to the beak (`wing` about 0.8, tip in front of the beak) by 105.7 and hold to 106.5. Optional.

### 7. 159.5-162.0 s. The feather reads as a grey leaf or dish at phone size
**Fix.** Add a white quill line with 3-4 barb notches on one edge and tilt it about 15 degrees as it drifts. Optional.

## What works and should not be changed
- Everything listed in round 1 (the opening, the three threats, THUD!, the paired thought clouds, the tear link, the wind beats, the unheard warning, GULP! off screen).
- The new tuck wrap and the still crouch: the 2 s of quiet before 145.64 is now the best suspense in the film.
- The new pinned pose and the camera at z 1.95 under the moral line.
- The two-cut treatment of the betrayal at 104.4 and 105.3.
- Both chick drops, including the look back at the rim.

## Reusable techniques worth adding to the Library
- `kd16HeronPinned` as a general "long-necked bird pinned on its side" pose (catalogue it after approval).
- The heron `tuck` wrap at deep tuck (wing drawn over the head, only crest tips showing) and the one-leg rest.
- The mask-drop pattern: a 0.9 s low close-up of the villain while the other character's eyes are shut, then a cut to the other character noticing.
- A sky blend carried by a character's walk between two places (106.84-108.6) instead of a cut.
- Lesson learned for the guide: when a camera move ends close on a set, check the final framing for sun, moon or effect elements just outside the old framing (note 2).
