Verdict: REVISE

# KD-015 The Ascetic, the Ghee, and the Honey: Fable review, round 2 (v2)

Reviewed: `renders/KD-015_v2.mp4` (171.1 s) through all 29 strips of `review/v2_pack/strips/`, plus 45 full-size frames tiled into 13 sheets in `review/v2_pack/extra/` (`a1.png` to `a7.png`, `b1.png` to `b6.png`), compared with the v1 strips for 42-54 s and 126-132 s. Word times are the final ones in `timing.json`.

## Summary

v2 fixes the three reasons for the round-1 REVISE. The raise now sits under "رفع" and the swing under "وضرب"; the stick visibly cuts the imaginary son in two and he re-forms with a wink; the ghee and honey read as a spill and his eyes stay visible through the whole ending. The climax and the ending now work. Subtitles are verbatim and readable throughout, the ending holds 3 s, and no story event is wrong.

One correction pass is still needed, for one reason: the goat herd shows giant, wrongly scaled animals for a few frames at each of its three pop-ins (fix 1). These are broken frames in the section that round 1 asked to make more legible, and the 1.5x enlargement has made them more visible than in v1. The cause is a single line. Fixes 2 to 5 are small staging corrections that can go in the same pass; on their own they would not have triggered a v3.

A correction to my round-1 review: the giant-goat frames were already in v1 at 46.5 s (visible in the v1 strip) and I did not report them.

## Round-1 notes

| # | Round-1 note | Status | Comment |
|---|---|---|---|
| 1 | Raise and swing out of sync (125.7-133.7) | FIXED | Thrust held and trembling to 127.0, raise on "رفع" 127.1-128.4, hold, swing at 130.1 on "وضرب", SWISH! 130.1-130.9, crouch 133.0-133.7. Nothing is frozen under the key sentence any more. |
| 2 | Swing never touches the son | FIXED | Father and son sink to arm height; the stick crosses the boy at 130.24-130.36, he splits in two along the stick line, re-forms by 130.9 and winks (`extra/a4.png`, `a5.png`). SWISH! is clear of the faces. |
| 3 | Spill reads as yellow bars | FIXED | Scalloped two-tone cap with a glint, short drips beside the eyes, ring of drops on SPLAT, flat puddle on the floor line, eyes and mouth clear (`extra/a6.png`). Polish only: see note 8. |
| 4 | Dream small, herd a tangle (42.5-80.5) | PARTLY | Larger contents, tinted goats, three rows, field past the cloud edge, proper sheaves, stage 3 clear. Remaining: broken pop-in frames (fix 1) and cows standing on the goats (fix 2). |
| 5 | Saving the leftovers hidden | FIXED | He stands beside the fully visible jar, tips each bowl over the mouth with a stream, the fill window gains a band (`extra/a1.png`). The streams are short but readable. |
| 6 | No pointing at the jar (29.2-32.9) | PARTLY | Gaze up, head back, brows up and open mouth are there. The pointing hand sits at his temple and reads as a salute or a head scratch (fix 5). |
| 7 | Old house parked behind the rope | FIXED | Fades out 86.3-87.4. |
| 8 | Ghosts small, field behind the post | PARTLY | Coins and goat are large and clear, Xs on the words, all three held to 164.2. The field ghost is a thin green strip sitting on top of the window and reads as an awning (fix 3). |
| 9 | Timing and labels in the turn | FIXED | The turn happens on "ثم" (105.9-106.3); NOT REAL and REAL JAR are clear of the border and the boy; the flush is limited to cheeks and forehead. The blue tint of the cloud is too weak to notice (note 9). |
| 10 | Dreamer nearly static | FIXED | Waist-up framing, finger counting, nods on the counter, stomach pats, chin stroke, hands on hips with the dream self at 79.3. |
| 11 | S8 acting one held face | FIXED | Two blinks, mouth closes, sad look down on "نظر", lifts and looks at the stick on "ثم", drops it in the pause, exhale before THE END. |
| 12 | Coordinator information | n/a | No change was requested. |

## Fixes for v3 (one pass, in order of importance)

### 1. 46.50-46.80, 49.32-49.72, 52.22-52.47 s, BLOCKER (broken frames): giant goats flash at every herd pop-in
What is wrong: when the goats pop in with a stagger, every goat whose own start time has not yet come is drawn at full size, about three times too large, filling the cloud and cut by the wall post and the GOATS counter (`extra/b1.png`, `b2.png`, `b6.png`). It lasts up to 9 frames per event and happens on the first reveal of the goats ("الماعز"), on the kids ("ستولد") and on the herd doubling ("القطيع").
Cause: `k15pop` returns 0 before its start, the callers pass `s: 0.55 * k` (or `0.4 * k`, `0.55 * kk * ...`), and `k15Goat` reads the scale as `(o.s || 1)`, so a scale of 0 becomes 1.
Why it matters: these are the three beats where the viewer counts the animals; a flash of giant goats reads as a rendering error.
Fix: in `k15_scene.js`, skip each animal until its own start: front goats `if (t < a) return;`, kids `if (t < ka) return;`, back row `if (t < 52.22 + i * 0.05) return;`. Also make `k15Goat` safe: `const s0 = o.s == null ? 1 : o.s; if (s0 <= 0.001) return;`. Check the other `k15pop` call sites (13 in the scene file) for the same `x || default` pattern on a scale or alpha. Verify with stills at 46.53, 46.70, 49.40, 49.60, 52.25 and 52.40: no animal larger than its settled size plus the normal overshoot.

### 2. 55.6-63.6 s, MAJOR: the cows stand on the goats' backs, and the right cow is cut by the post
What is wrong: the cows land at y 506 while the goats and the field are at y 548, so both cows hang in the air with their legs behind the goats' bodies (`extra/a3.png` first frame, strips 55.7-62.7). The right cow (x 740) is half hidden by the wall post and the cloud edge. In the close shot 59.0-62.7 the picture is a cow riding a goat.
Why it matters: "cows and a wide field" is the step up in his wealth; the cows should be the biggest, calmest thing in the picture, standing on his field.
Fix: put all hooves on the same ground line (cows y 548). Make room: on "أبيع" (53.78) let the third front goat (x 755) trot out with the others and move the two that stay to about x 505 and 590; land the cows at about x 690 and 800 with `s` about 0.7, both facing left toward the goats, so that no animal overlaps another and both cows are fully left of the post. If the post still cuts the right cow, shift all four animals 40 units left. Keep the drop, the rebound and the lazy blinks. Verify with stills at 57.6 and 60.5.

### 3. 160.3-164.2 s, MINOR: the field ghost does not read as a field
What is wrong: the field is a small green striped strip, about half the width of the coin pile, resting on the top edge of the window. With the window under it, it reads as an awning or a shelf (`extra/a7.png` third frame).
Why it matters: "no field" is the third of the three losses; all three should be recognisable at a glance.
Fix: draw the field ghost about as wide as the coin pile (150 px on screen) as a green patch with three furrow lines and five small wheat ears or sprouts on top, and place it on the empty wall right of his head and below the lamp niche (clear of the window, niche, goat ghost and post). X on "حقل" (163.44) as now.

### 4. 128.0-130.1 s, MINOR: the raised stick is drawn across the jar
What is wrong: during the two-second hold the stick stands in front of the right side of the jar, with its tip beside the jar's shoulder (`extra/b3.png`). It looks as if the stick already touches the jar and nothing happens; the red dotted tip-to-jar line is only a few pixels long and cannot be seen. This was the same in v1.
Why it matters: the plan's suspense is the gap between the quivering tip and the jar. The viewer should think "it is about to hit the jar", not "it is touching it".
Fix: move the raised hand about 35 to 45 units to the right (or lean the stick 10 degrees to the right) so that the whole stick clears the jar by about a hand's width, with the tip level with the jar's widest point. The red dotted line then spans the visible gap from 128.0 to 130.0, and the jar's sway brings it close to the tip once at about 129.3. The swing at 130.10 starts from this pose; keep its path through the boy.

### 5. 30.4-32.9 s, MINOR: the point at the jar reads as a hand at the temple
What is wrong: the near hand rises to the side of his head with the forearm vertical and stays against the turban (`extra/a2.png` first frame). No finger is visible at phone size.
Why it matters: this is where his appetite for the jar begins; the gesture should link him to it.
Fix: straighten the arm up and inward so that the hand ends above the turban, about halfway between his head and the jar's drip point, with the index finger drawn (10 to 12 px wide on screen) aimed at the jar. Keep the bounces on "السمن" (31.54) and "والعسل" (32.10) and the other hand on the chest.

## Polish notes (do not trigger a v3; do them only if they are cheap in the same pass)

6. 115.0-116.0 s: the NOT REAL label touches the right side of his turban. Move it 40 px right or 30 px up so that it is clear of his head.
7. 154.2-159.6 s: the camera tilts down for "the broken pieces" and leaves the lower 40% of the panel as empty ground while the shards stay small on the floor line. Tilt half as far, or push in 10% on the shards and the puddle.
8. 144.9-171.1 s: the robe marks are amber T and Y shapes with an outline and read as symbols. Round them into blobs with one short drip each, and mix in two yellow ones.
9. 105.9-116 s: the change of the cloud's dots to blue is barely visible. Either strengthen it (dot colour `#1d5bd0` at alpha 0.35) or leave it; the boy's NO! already carries the turn.
10. 87.4-105.0 s: the family, slate and palace stay at 1x and are small in a large cloud (figures about 110 px tall). They read, but a scale of 1.3 around the group would match the improved stages 2 and 3.
11. 149.9-153.0 s: the falling drops and their landing rings are very small (`extra/b5.png`). Double the drop radius.
12. 0-20 s and 21 s onwards: the jar hangs at hip height by day and above his head in the evening. The ONE EVENING card hides the change; no action needed unless the rope length is easy to match.

## What works and should not be changed
- The whole of 125.7-145.6: thrust, raise on the word, hold, swing through the boy, crouch, CRACK, the look up, SMASH with the dream bursting, the hanging blob, SPLAT.
- The goo cap and drips, the S8 acting, the two clear ghosts, the stub of the jar with the arrow on "اختفى", the last drop and the exhale.
- The pour in S1, the dreamer's acting in the lower left, stage 3 of the dream (sowing, sheaves, sacks, loaves, house, neighbours, RICH!), the cloud growing over the room.

## Reusable techniques for the Library
- Rule for the guide and for `Library/` helpers: a pop or scale helper that returns 0 before its start must not be combined with `x || default` in the drawing function. Use `o.s == null ? 1 : o.s` and return early at scale 0. An `implcheck` rule that searches drawing functions for `(o.s || 1)` would catch this class of error in other stories.
- Swing through a picture: lower the dream figures to arm height before the blow (`settleTo`), split the figure along the weapon line for 4 frames with a ripple ring, slide the halves back, then a wink. Worth a guide entry under thought-cloud gags.
- `gooSpill` (cap, bead drips, ring of drops, flat puddle) is ready to move to `Library/` after polish note 8.
- `ghostList(items, times)`: ready after fix 3; the rule is that each ghost is at least 150 px wide and sits on empty wall, never on a set element.

## Third review
Not needed if fixes 1 to 5 are checked with the stills named above (46.53, 46.70, 49.40, 49.60, 52.25, 52.40, 57.6, 60.5, 129.0, 31.6, 163.8). Fix 1 must be confirmed in those stills before the final render.
