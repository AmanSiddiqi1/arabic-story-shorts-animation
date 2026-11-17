Verdict: REVISE

# KD-013 The Ascetic and the Thieves: Fable review, round 1 (film v1, 166.0 s)

Reviewed: all 28 strips of `review/v1_pack/strips/` in order, plus 30 full-size frames pulled into `review/v1_pack/extra/` (montages `A.jpg` to `J.jpg`, subtitle crops `sub_48.png`, `sub_98.png`). Word times below are word starts from `v1_pack/narration.txt`.

## Summary

The film tells the story in order, is faithful and family-friendly, and its ideas are good: the DOG? counter climbing 1, 2, 3, the balance scale that crashes to 1 VS 3, the GOAT / DOG signs, the sorcerer cloud with ZAP!, the goat's MAAA! in the final inset. Cue sync with the narration is tight (counter 1 at 51.0 on `كلبًا` 50.88, counter 2 at 73.7 on 73.60, counter 3 at 91.5 on 91.46, BUMP at 78.2, ZAP at 126.5, LEFT BEHIND at 133.5, STILL A GOAT at 160.2). Subtitles are verbatim, well placed, readable, and the English is accurate. No broken frames, no missing ending, no blockers.

It needs a v2 for one structural reason: **from 77 s to 131 s the goat's head is hidden behind the ascetic's body in almost every frame.** The goat is the subject of the story and the plan's "straight man"; in the film's middle third and at its climax it is a headless white body with a horn tip. That removes the doubt flicker, the inspection, the wet-eyed look up and, most seriously, makes the untying (the climax) unreadable. The other notes are smaller.

## Notes (most important first)

### 1. 127.6-131.3 — MAJOR — The climax, untying the rope, cannot be read
What is wrong: in the close shot (frames 128.2, 130.6, 131.2) the ascetic stands in front of the goat's neck and head. The rope is a loop hanging from his raised hand down to the ground; it is never seen round the goat's neck, never seen coming off over the horns, and the goat's face is not in the shot (only a yellow horn tip and the word MEH floating at 130.7-131.2). His arm just pumps. The planned beats (insert on hands and knot, loop off over the horns, goat looks up with wet eyes, rope dropped with the leader's exact mime from 39.46) are not visible.
Why it matters: this is the one action the whole trick was built to produce ("we will make the man abandon it himself"), and the rope tie at 9.9-11.0 set it up in a clear, well-framed insert. The payoff must be at least as clear as the setup.
Fix:
- Stage it in profile with clear air between them: ascetic at the wall on the left facing right, goat fully to his right facing left (toward him), goat head at least 60 px clear of his robe edge, goat drawn AFTER the ascetic (in front). Move `KD_GX12` / the S15 goat x about +70 to +90 so the muzzle sits at his hands, not behind his chest.
- Camera for 127.6-130.9: centre on the goat's neck and his two hands (about x = goat head x - 30, y 770, zoom 2.6), same framing idea as the tie at 9.9.
- Beats on the words: `فك` 128.73 both hands at the knot (rope visibly round the neck, small wiggle); `الحبل` 129.22 knot opens (loop widens); `رقبة` 129.96 loop lifted up and over the horns (ears flick late); `الماعز،` 130.50 goat lifts its head to him, `wet 0.6`, slow blink, small MEH? beside its mouth (not over his shoulder); `وتركه` 131.30 he opens his fingers with the same wrist-flick mime the leader used at 39.46 and the rope falls (`fallY` + `rebound`) to the ground in front of the goat. Then the existing pull-out to the wide at 131.5-133.3.
- His face during it: brows +0.6 (resolved, a little angry), eyes on the knot, then he looks AWAY from the goat at 130.5 as it looks up (he cannot meet its eyes). That one look-away is the emotional beat.

### 2. 77.0-127.6 — MAJOR — Goat's head hidden behind the ascetic for most of fifty seconds
What is wrong: after the bump at 78.2 the goat stays tucked behind him with head and neck inside his robe silhouette (frames 79.6, 83.2). The same in the two-shot with thief 3 (86-94, only horn and rope ring visible), the inspection (95.0-101.7, frames 97.0, 98.1), and all of the wall sequence (103.5-127, frames 105.9, 111.8, 119.3: the goat faces him with its head behind his torso and rope hand).
Why it matters: the film's clarity device is "the truth is always visible in the objective shot". With no face, the goat cannot chew, blink, look at the lens (planned at 91.9), or contrast with the dog icons. Three specific beats are lost: (a) the 83.12 dog-ear flicker reads only as a faint pink tint on the body (frame 83.2); (b) "looked at the animal again" 95.34-98.67 shows him fumbling at an animal with no head, and MEH? at 98.0 comes from nowhere; (c) the dream-wash goat/dog wobble at 116.4-117.7 shows a spotted tan body but none of the `asDog` head (floppy ears, snout, tongue), which is the funny part.
Fix (one rule, applied per scene): whenever both are standing still, the goat's head must be clear of the ascetic's silhouette by at least 40 px and the goat is drawn in front of him.
- S9 (77.0-83.9): after the bump let the goat rebound further, `KD_GX9` settling at about 1468 - 75 (not - 14), then step half a pace sideways so its head pokes out past his hip on the camera side; it looks up at him, chews. At 83.12-83.5 he looks down at it and the flicker happens on a visible head: raise `asDog` to 0.5 for those 10 frames (ears flop, horns shrink) and snap back. Keep the push-in but aim it between his face and the goat's head.
- S10 (83.9-95.0): `KD_GX10 = AX - 130` puts the head inside him; use about AX - 215, or keep - 130 and draw the goat in front. Give the planned look to the lens at 91.9 (it is in the code, but invisible).
- S11 (95.0-101.7): he turns left and bends to the goat: put the goat's head at his hands, in front of his robe. On `الحيوان` 96.68 he lifts one ear with two fingers (`earLift 1` on that ear) and lets it drop; on `مرة` 97.44 he taps a horn (small TOK); on `أخرى،` 97.84 the goat answers MEH? to his face, chewing. Then hand to chest and the three ? as now (they work).
- S12-S14 (101.7-127.6): the goat stands to the right of the wall, `KD_GX12` about 2245 + 85, facing him, head level with his knees, in front. It chews and slow-blinks through the scale sequence; at 111.52 when the beam crashes it glances up at the cloud, then at the lens. In the dream wash 116.42-117.7 the `asDog` head is then visible (this is his point of view, so let it be bold), and it snaps back to a plain chewing goat at 117.75 when he opens his eyes.

### 3. 76.7-77.1 — MAJOR — Continuity jump: goat changes sides and thief 2 vanishes on the cut
What is wrong: at 76.8 the goat stands in FRONT of the ascetic (to his right, between him and thief 2) and thief 2 is taking his first step. At 77.0 (hard cut, no card) the goat is BEHIND him on the left, walking in, and thief 2 is gone (frames in `I.jpg`). Then the goat "bumps into his legs" at 78.2.
Why it matters: the cut reads as a glitch, and it lands exactly on `عجيب!»` / `توقف` (77.99), the first crack in his certainty. The plan asked for thief 2 to tut and leave "with one peek back".
Fix: keep one continuous geography. Simplest: keep the goat ahead of him as in S8 and drop the bump. 75.43-77.1 (`هذا أمر عجيب!»`): thief 2 shakes his head (TSK TSK is there), walks off right past the bush and peeks back once from its edge at about 77.3 (beard slipping), then ducks. 77.99 `توقف`: the ascetic, who had started to walk, stops dead mid-step (`anticipate` back, `settleTo`); the goat walks on one more step, the rope goes taut (small TUG, rope straight), and the goat turns its head back to look at him: head visible, facing him, which also solves note 2 for S9. If the bump gag is kept instead, the goat must already be behind him in S8 and thief 2 must lean round him to inspect it; do not mix the two.

### 4. 37.1-38.2 — MAJOR — "NO FORCE" is struck out with a red cross, so it reads as the opposite
What is wrong: the label says NO FORCE and a red X crosses the whole label (frame 37.5). Read literally it negates "no force".
Why it matters: this is the story's turn and its surprise ("we will not steal the goat by force"), and viewers reading only the picture get it backwards.
Fix: either the plain label NO FORCE with no cross, or the word FORCE alone with the red cross. Better still, cross the object: at `بالقوة.` 37.08 put the red X over the sack as the leader pushes it down (the push at 37.0-37.7 is good), with the label NO FORCE clean above. Hold to 38.2 as now.

### 5. 140.2-143.7 — MAJOR — The ambush reveal is cramped at the frame edge; the 1, 2, 3 count cannot be matched to faces
What is wrong: thief 1 appears from behind the trunk at the far right edge, half cropped by the panel border (frames 140.2-141.2; `G.jpg` middle); thief 2 is only a red pom in the bush until 143.7; thief 3 rises directly behind the goat so his body merges with it. The counter 1, 2, 3 (142.2-143.0) and the label THE THIEVES sit top-left, far from all three.
Why it matters: this is the reveal the long quiet wide (134-140, which works well) was saving up for. Three clean pops, one per hiding place, are the comic release.
Fix: shift the S17 camera right so tree, bush and wall are all inside the frame with margin (cam x about 2330 at zoom 1.3 from 140.2; the trunk at about 80 % of the width, not on the border). Pop order left to right or right to left, 0.45 s apart, each with a full head and shoulders and a small squash: wall (thief 3 rises from BEHIND THE WALL, to the left of the goat, not behind the goat), bush (thief 2 to chest height, beard askew), tree (thief 1 leans out fully, turban on). Put each counter number next to its head as it pops, cued across `اللصوص` 142.20 / `الثلاثة` 142.90, or start the pops at 141.72 on `خرج` instead of 140.2 so the picture matches the word. The goat lifts its head and looks from one to the next, unbothered.

### 6. 153.8-162.6 — MAJOR — The final scene: the search is not acted, and the inset is crowded
What is wrong: (a) "was looking for the seller" (154.22-157.58): he walks in, stops beside the stall and scratches his head under a small ? (frames 155-157.5). The planned search behind, under and inside the stall is missing, and he stands in the right-hand third beside a large empty wall. (b) The inset circle (157.7 on) sits on top of his head (its rim touches his turban, frame 160.8), the label STILL A GOAT lies across the goat's body and nose inside the circle, MAAA! overlaps the thief's turban, and the circle is cropped by the right border.
Why it matters: this is the moral image, the only place the film states its point. The contrast must be instant: angry man hunting in the wrong place / calm goat that never changed.
Fix:
- Search, on the words: `الناسك` 154.50 strides in fast, brows +1, flush; `يبحث` 155.94 leans over the counter and looks behind it (head dips below the awning line); 156.3 bends and looks under (robe hem up, `tip 0.3`); `البائع،` 156.80 lifts the grain basket and looks inside, then straightens and turns left and right with the ?. Hands on hips, foot tapping, through the inset.
- Composition: centre the stall and the ascetic to the left half (cam x about 620), inset in the clear sky top-right at radius about 200, fully inside the panel, its rim at least 30 px above his turban. Inside the inset show only the goat (large, facing the lens side) and the thief's rope hand at the edge; the thief's face is not needed and competes. Label STILL A GOAT outside the circle on the left with its arrow tip stopping at the rim. MAAA! above the goat's mouth inside the circle.
- On `ماعزًا` 160.22 the goat plants its feet and bleats (now present, keep), on `طوال` 161.02 it looks at the lens and chews, slow blink. On `يعلم` 158.10 the ascetic looks the wrong way (left, away from the inset). Keep THE END at 162.7 and the pull-back; the inset must stay clear of the THE END plate (it is, just).

### 7. 61.5-62.7 — MINOR — The ascetic walks straight through thief 1
What is wrong: on `واصل طريقه` (60.92) his body passes exactly over thief 1's, the two heads coincide (frame 62.2), and the thief's mask stays on; the planned "mask off, smirk, signal ahead" is not readable.
Fix: thief 1 steps back half a pace toward the milestone at 60.7 with a small bow ("after you"), the ascetic passes in front on the camera side with at least 30 px of air; once his back is turned (61.5) the thief drops the surprised face: `lid 0.4`, smirk, and a two-finger point ahead down the road to the next man, held to the LATER card at 62.7. That one gesture tells the audience the three are working in sequence.

### 8. 95.0-96.7 — MINOR — Thief 3 exits behind the ascetic's head
What is wrong: on the cut to the close two-shot thief 3 is directly behind the ascetic, the two heads stacked (frames 95.0-95.7), then slides off left for a second and a half while the narration is already on "the ascetic looked at the animal".
Fix: have thief 3 turn and leave to the RIGHT (the way he came, toward the wall and tree where he hides later) before the cut: pat on the shoulder at 94.3, turn, two steps, gone by 95.3. The S11 shot then starts clean on the ascetic and the goat only. The seller cloud at 94.3-94.9 is good but short; start it on `باعه` 93.72.

### 9. 27.5-34.0 — MINOR — The plotting scene is a stiff line-up
What is wrong: `اجتمعوا خلف شجرة` (28.52) shows three thieves standing in a row facing the camera with arms down for about six seconds, in the open beside the tree; only one arm and some mouths move.
Fix: make it a huddle that reads as secrecy. They scurry in on `اجتمعوا` and crouch (`sq 0.9`) BEHIND the trunk on the side away from the road, heads together in a triangle, leaning in with `tip` 0.2 to 0.3, each looking over a shoulder in turn (`stagger`), eager thief 2 a beat late. On `حيلة` 31.86 the leader raises one finger and the GOAT = DOG? cloud opens (it works, keep it); thieves 2 and 3 look up at the cloud, then at each other; thief 2 scratches his head, thief 3 gives a slow nod. The distant ascetic walking past at 38.5-41.0 is a nice touch; keep it.

### 10. 144.9-147.4 — MINOR — The rope is back on the goat's neck with no action
What is wrong: the leader lifts the rope off the ground with two fingers at 145.2 (good gag); from 145.7 it is round the goat's neck again, and until 147.2 the goat faces left while being led right.
Fix: on `وأمسكوا` 145.72 thief 2 (the eager one, at the goat's head) slips the loop over the horns in one visible move while the goat keeps chewing; on `الماعز` 146.38 TOO EASY! as now; the goat turns to face right at 146.9 with `turnFlip` before the first step on `ومضوا` 147.40, and trots along happily (the plan's point that it never resists).

### 11. 41.4-60.9 and 83.9-94.9 — MINOR — Encounters 1 and 3 are framed loose; the goat is cropped during the first lie
What is wrong: at zoom 2.0 the figures fill only the middle band of the tall panel with a deep empty ground strip below, and in S6 the goat is cut off by the left border (only head and shoulders in frame at 50.9, when the thief points at it and says "dog").
Fix: in S6 use `twoShot` margins that include the whole goat: shift cam x about -70 and go to zoom 2.3 with y about 740 so the ground strip shrinks. Have thief 1's pointing arm aim clearly at the goat (he currently points at the ascetic's waist), and the ascetic's "this is a goat" presentation at 55.94 step aside so the goat is seen whole with its GOAT label (the label is at the very border and partly cropped at 56.2-57.0; move it inside by 60 px). Encounter 2 at zoom 2.2 (68.3-70.9) is the right size; match it.

### 12. Throughout — MINOR — Small polish
- 5.3-7.0: the goat in the market stands half behind the yellow hay heap; move the heap or the goat 40 px so the FAT GOAT belly jiggle at 6.06 is unobstructed.
- 104.9-105.8: the first object in the left pan is a tiny eye icon, replaced by the goat; it reads as a stray blob. Drop it and let the goat icon fall into the pan on `ماعزًا` 105.78.
- 109-112: the thief heads and dog icons in the right pan are about 30 px; enlarge the cloud contents by about 25 % (there is sky room) so the 1 VS 3 payoff reads on a phone.
- Subtitles: text, timing and translation are correct; do not change them. Layout only: in the chunk at 95.34 the Arabic wraps with a single orphan word `أخرى،` on line two (same at 90.02 with `لك؟»` and 85.23 with `واثق:`); if the caption layout supports balanced wrapping, balance the two lines. The English at two lines is small but legible.

## What works (keep as is)
- The knot tie insert at 9.0-11.0 and the TUG.
- Eyes opening in the tree at 18.0-20.2 and the stacked heads with the counter at 21.5-22.0.
- The moth and crossed coin at 26.5-27.2.
- Thief 1's hands-on-cheeks fake astonishment at 49.0 and thief 3's hips, folded arms and 3 OUT OF 3 stamp.
- The whole balance scale sequence (104.5-112.7) and the GOAT / DOG signs at 118.7-120.0.
- The sorcerer cloud, sparkle trail and ZAP! at 125.0-127.4.
- The static wide of the stomp-off with steam at 134.7-139.7 and the goat's MEH? after him.
- The leader's two-finger rope pick-up at 145.2.

## Reusable techniques for the Library
- **Counter pinned to a repeated lie** (DOG? 1, 2, 3 top-right, incrementing on the same spoken word each time, then a "3 OUT OF 3" stamp): a clear device for any story built on repetition.
- **Balance scale in a thought cloud** with icons dropped into the pans on the spoken words and a beam that crashes on the last one (`balanceScale`): worth moving to `Library/` once approved.
- **Two opposing signs with the head turning between them** (GOAT / DOG) for indecision.
- **Rule to add to the guide (from note 2):** when a person and a led animal stand still together, keep the animal's head outside the person's silhouette by 40 px or more and draw the animal last; check this on a contact sheet for every held two-shot. A lead offset tuned for walking (`AX - 150`) hides the head as soon as both stop.
- **Rule to add (from note 4):** never strike out a label that already contains a negative; cross the object or the positive word.

Second review advice: Yes, a second Fable review of v2 is warranted. Notes 1 to 3 re-stage the goat for about fifty seconds of the film including the climax, and notes 5 and 6 recompose the reveal and the final image; these are new staging and draw-order decisions with real risk of fresh overlaps (goat in front of his hands, rope path, inset placement) that can only be judged on rendered frames. A short comparison review limited to 76-132 s, 140-148 s and 153-166 s would be enough.
