Verdict: REVISE

# AN-104 The Man Who Stole the Dish of Gold Wherein the Dog Ate: Fable review, round 2 (v2)

Reviewed: `renders/AN-104_v2.mp4` (172.10 s, cloud QC PASS) against `review/fable_review_1.md` and `review/revision_1.md`. All strips for 0-144 s in `review/v2_pack/strips/` were read, and 143-172 s was read at larger size from my own panel montages. Full-size frames and v1 comparisons are in `review/v2_pack/extra/` (file names are given in the notes).

## Summary

v2 is a large improvement and the film now tells its story. The two central scenes play: the man really eats (three bites, the food steps down, hands on his belly), and the refusal has a readable raised palm followed by the owner's hand pushing the purse back to the visitor's chest. The owner is at full colour, the purse stays on the visitor to the door, the scrolls no longer float on the shut door, the dog's face is clear in every lying pose, the sneak past the servant reads, and the final image is a proper medium shot of the upright owner and the sleeping dog in the light.

It is a REVISE for one new error that v2 introduced, plus a tone problem left in the climax:

1. Moving the stakes behind the dogs' hind legs has hidden the silver chains completely. During "tied with silver chains" (35.27-37.90) no chain is on screen, and the SILVER label's arrow points at a brown dog's back. In v1 the chains were clearly visible in this insert.
2. In the refusal the owner's face is stern (V brows, heavy lids). The plan asks for no anger and a small smile. The gesture is right and the emotion is wrong, in the scene the fable exists for.

Both are small code changes. If the coordinator decides not to spend a v3 render, everything other than fix 1 is at PASS WITH NOTES level; fix 1 is the one I would not ship.

No BLOCKER: no wrong story event, subtitles readable and unchanged, ending present, no broken frames.

## Round-1 notes

| # | Round-1 note | Status | Comment |
|---|---|---|---|
| 1 | Refusal has no readable "no", purse not pushed back (147.7-152.6) | PARTLY | Palm up from 148.0, head shake, then his right hand travels to the purse and pushes it to the visitor's chest by 151.5 (`extra/a_refusal.jpg`, `extra/g_refuse.jpg`). The action reads. His face reads cross, not kind (`extra/refusal_faces.jpg`), and the gesture starts 0.9 s before the word. See fix 2. |
| 2 | Owner washed out (143.5-152.6) | FIXED | Full colour throughout the hut (`extra/h_offer.jpg`, `extra/a_refusal.jpg`). |
| 3 | Purse detaches and vanishes (162.5-163.4) | FIXED | Tucked at the sash 161.9-162.4 and still on him in the doorway to 167.2 (`extra/b_purse.jpg`, `extra/f_end.jpg`). |
| 4 | Chain ring and stake over the dog's face | FIXED, with a REGRESSION | The face is clear at 20-31, 61-71 and 82-83, and dog1 lies head up watching the meal. But the chains are now hidden behind the seated dogs at 31-41 (`extra/g_silver_v1.jpg` against `extra/g_silver_v2.jpg`, `extra/full_silver_37.6.jpg`). See fix 1. |
| 5 | Invitation two-shot jammed at the edges, man does not answer (54.6-65.5) | PARTLY | Both whole figures are in frame with room; sit, nod, paw raise, floor pat and the dish-to-man arrow all read (`extra/c_invite.jpg`). The man's "me?" at 58.8-60.5 is two small hands at the chest under frowning brows (`extra/g_misc.jpg`, right frame), so it reads as a glare. See fix 4. |
| 6 | Eating not acted (66.1-69.4) | FIXED | Three hand-to-mouth bites, eyes shut on the third, mound steps down, sits back with hands on belly, dog's face kept at the right (`extra/d_eat.jpg`). The missing cheek puff is not needed. |
| 7 | Scrolls float on the shut door (83.1-83.4) | FIXED | 83.2 is a clean shut door; he and the scrolls appear together at 83.5. Also clean at 19.0-19.7. |
| 8 | Paw on knee pops; MY DOG! arrow on the owner (155.6-158.4) | PARTLY | The rise is now an action, the camera eases, and the arrow ends on the dog's head (`extra/e_mydog.jpg`, `extra/g_mydog.jpg`). The landing is cluttered: the dog's muzzle and tongue sit on top of the red purse, and one foreleg hangs to the floor as a long grey stilt (`extra/full_mydog_157.5.jpg`). See fix 3. |
| 9 | Closing image too far away (162.8-172.1) | FIXED | Medium shot for the look-back, inset on clear wall, shaft and floor pool visible, push-in to the owner and dog under THE END (`extra/f_end.jpg`, `extra/end_and_v1dog.jpg`). The dog lying beside him without its chin on his foot is fine. |
| 10 | Sneak past the servant cannot be read (20.6-26.0) | FIXED | Door third only; the servant looks over his head while the stranger freezes wide-eyed behind him at 23.4, then he comes out and sits (`extra/g_post_v2.jpg`). Dog1 at the frame edge does no harm. |
| 11 | Four clarity fixes | FIXED | (a) keeper visible with a raised hand, the stranger's head drops (`extra/keeper_and_hut.jpg`); (b) YEARS label under the counter; (c) the seated shot holds until the card covers the panel; (d) the old woman points left and the camera whips left. |
| 12 | Polish | FIXED, one PARTLY | (a) both faces clear over the dish (`extra/g_push.jpg`); (b) second balloon frame at full scale from 79.5; (c) dish hugged with a glint from the door, then set on the counter at 88.0. (d) PARTLY: the first hut shot is still loose and the ear lift at 133.2 cannot be seen at phone size (`extra/keeper_and_hut.jpg`, right two frames). Not worth a pass on its own. |

Animator's risky areas: the world-hand fix caused no over-stretched arm that I could find, apart from the owner's long reach at 151.1-151.6, which is acceptable. The meal close-up is good. The draw-order swap at 161.6 is not visible. The stretched sit-up at 156.4-161.6 is covered by fix 3.

## Fixes for one final pass (v3)

### 1. 31.4-41.7, most of all 35.27-38.4: the silver chains are invisible (REGRESSION, required)
What is wrong: `a104Stake` now sits behind the hind legs and the post and chain are drawn before the dog (`src/a104_court.js` lines 174 and 184-186), so when a dog sits its own body covers the whole chain. At 37.6 the only trace is the yellow stake base peeping out behind the haunch. The SILVER label (`src/a104_main.js` line 77) aims at the midpoint of ring and stake, which is now the dog's flank.
Why it matters: this is one of the three wealth inserts (GOLD, SILVER, SOLID GOLD!) that set up "dogs richer than he is". The narrator says "tied with silver chains" and the picture shows none, while a label points at fur.
Fix: keep the stake behind the hind legs, and make the chain visible without letting it cross a head.
- Split the draw: post before the dog as now, chain after the dog's body. Route it from the collar ring back along the shoulder and flank to the post top, so it lies on the body below the neck. If the dog function cannot draw between body and head, draw the chain after the whole dog, starting at the ring on the chest side of the collar and running backward only. A chain that runs back from the collar cannot reach the muzzle or eye in sit, stand or lie.
- Bring each stake about 16 units toward the camera (y + 16) so the post and its ring stand clear in front of the hind paw.
- Aim the SILVER arrow at a visible link about one third of the way along the chain. Keep the swing and the travelling glint on فضة (37.26).
- Check stills at 26.6, 33.0, 37.6, 46.0, 62.0, 70.3, 74.8 and 82.6. In each the chain must be visible where the dog's flank is in frame, and must not touch the face.

### 2. 147.7-152.9: the owner refuses with a cross face, and slightly early (required for tone)
What is wrong: the pose has `brow: 0`, `mouth: 'smile'`, `lid: 0.3` (`src/a104_hut.js` lines 22-31), but on this aged costume that draws as slanted V brows over heavy lids, and the moustache hides the smile (`extra/refusal_faces.jpg`, frames 1-3). He looks annoyed. Also, the visitor is given `P.brow = 0.4 * ...` from 150.95 (line 56); in this rig positive brow is the angry V, so "brows rise" came out as a frown.
The timing is also off. The gesture is keyed to the plan's 147.96, but in the final audio رفض starts at 148.83 (`timing.json`; the silence runs 147.76-148.88). The head shake at 148.0-149.2 is nearly over before the word is spoken. Likewise وقال is at 152.84, not 152.12.
Why it matters: the moral is dignity without anger. A stern old man pushing money away reads as offended pride, which is a different story.
Fix:
- Owner 143.54-152.9: `brow -0.45` (raised, soft), `lid 0.2`. If the smile still does not show under the moustache, use `mouth: 'open'` with a small `talk` of 0.15 on رفض so a little red shows. Verify with a still at 149.4 beside his face at 138.5; it should look as warm as that one.
- Retime to the spoken word: palm starts up at 148.35 and arrives on رفض 148.83; the two head shakes run 148.85-150.05; the palm holds until 150.6. The push on أن يأخذ (150.60-151.44) stays as it is.
- Visitor 150.95-152.12: `brow -0.6` in place of +0.4. Keep `wet` and the open mouth.
- Move the straightening of the back from 152.12 to start at 152.5 and finish on وقال 152.84.
- Do not move the pop at 147.72.

### 3. 156.4-161.6: de-clutter the paw-on-knee picture (recommended)
What is wrong: when the dog lands, its muzzle and pink tongue are drawn directly over the red purse at the visitor's chest, so the face that the MY DOG! arrow points at is a red and grey knot (`extra/full_mydog_157.5.jpg`, `extra/j_gift.jpg`). The far foreleg hangs straight to the floor as a long grey stilt from 156.7 to 158.5, and the paw is off the knee again by 158.86.
Why it matters: paw on dish equals paw on knee is the film's second visual thread and its last surprise.
Fix:
- Get the purse out of the way first. On بل (155.82-156.10) the visitor lowers it to his far thigh (screen left of his sash, about 45 units left and 40 down from the present spot) and it stays there until the tuck at 161.6. The dog's head then lies against plain green robe.
- Tongue out only for 157.26-157.9, then mouth closed while he is stroked.
- Fold or shorten the far foreleg so that it ends at the mat line under the chest. No leg may be longer than in the hall sit pose at 34.5.
- Hold the paw on the knee from 157.26 to 159.4 (through ولا آخذ ثمن), then lower it with `settleTo`.
- Check stills at 157.5, 158.5 and 160.2.

### 4. 58.8-60.6: the man's "me?" is a glare (optional, do with fix 2)
What is wrong: hands at the chest read, the face does not (V brows, closed mouth).
Fix: on وتناول (59.18) `brow -0.8`, `mouth: 'o'`, head tilt `tip 0.08` toward the dog, a small rise (`drop -6`). Keep the left and right look at 59.6-60.5 with the brows still raised, then settle at 60.7.

### 5. 142.48-143.2: the debt X strikes out the dish (optional, cosmetic)
What is wrong: in the third balloon frame the red X is drawn across the whole frame, over the gold dish as well as the two scrolls (`extra/g_hut.jpg`, middle frame). At a glance it says "no dish".
Fix: size and centre the X on the two scrolls only (upper half of the frame) and leave the dish clean.

## Minor observations, no action required

- 131.8-135.0: the first hut shot stays loose and the ear lift on يعيش is too small to see. Only if it is free: start at zoom 1.9 centred between the door edge and the owner.
- 143.5-147.4: the visitor holds the purse out without moving for about 3.5 s. The bow on ومعتذرًا is there (eyes shut 146.5-147.0) but small.
- Hut, whole scene: the old dog's head has a flat-cut top with a grey rectangular patch behind the ear (`extra/doghead_zoom.jpg`). It was the same in v1 and is hardly visible at phone size.
- 82.5-83.0: the gold glow tints the man yellow as he hugs the dish. It reads as intended.
- English subtitles are condensed in the same three places as in v1. Information only; do not change subtitle text or timing.

## Reusable techniques worth adding to the Library

- Rule for tethers, refined: anchoring behind the body keeps the head clear, but the tether must then be drawn over the flank or it disappears in sitting poses. Draw order: post, body, tether, head.
- Rule for faces on aged costumes: `brow 0` on an old preset draws as a frown. For kind old characters start from `brow -0.4` and check a still.
- Rule for cue times: the plan's `timeline.md` word times can differ from the final `timing.json` (here رفض 147.96 against 148.83, وقال 152.12 against 152.84). Key acting to `timing.json`, and confirm doubtful pauses with `silencedetect`.
- The three-bite eating pattern (careful, faster, eyes shut, food stepping down per bite, hands to belly) is a good template for any "ate his fill" beat.
- The servant near miss (hero drawn behind the servant, servant looks over his head, half-second freeze) is a reusable sneak gag.
