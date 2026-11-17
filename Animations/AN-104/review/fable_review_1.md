Verdict: REVISE

# AN-104 The Man Who Stole the Dish of Gold Wherein the Dog Ate: Fable review, round 1 (v1)

Reviewed: `renders/AN-104_v1.mp4` through all 29 strips of `review/v1_pack/strips/` (4 frames per second) plus full-size frames pulled into `review/v1_pack/extra/` (montages `m1..m8.jpg`, `n1..n3.jpg`, subtitle crop `sub.jpg`).

## Summary

The story is told in order, is faithful and family friendly, and several beats are good and should not be touched: the debt scrolls on his back, the 1 to 4 counter and GOLD / SILVER / SOLID GOLD inserts, the long look (52.0-54.3), the two SCRAPE pushes with the paw on the rim (72.3-75.5), the goldsmith biting the rim with the price counter, the ruin reveal with the one-second ghost of lamps and dogs (125.0-126.0), the round inset of the rich host, and the dish that gets a gift bow (159.7).

It is a REVISE because the climax does not play. The refusal (148-152), which is the point of the fable, has no readable "no" and no push-back of the purse, the owner is drawn washed out during exactly those seconds, and the purse then detaches from the visitor and vanishes as he leaves. Add a second short glitch (scrolls floating on a closed door), the dog's face hidden under its own chain whenever it lies down, and the invitation two-shot jammed against both panel edges, and a v2 render is worth it. There is no BLOCKER: no wrong story event, subtitles are readable, the ending is present, no broken frames.

Subtitles: Arabic is large and clean in every chunk, including the three-line chunk at 111.4-120.0. English is readable in blue and correct in meaning. It is condensed in three places ("He slipped inside unnoticed" drops "with the visitors"; "then stepped aside as if inviting him to eat" drops "from its dish" and "to come closer"; "He hesitated, then ate until satisfied" drops "approached"). This is acceptable and is information for the coordinator only: the animator must not change any subtitle text or timing.

## Notes

### 1. 147.7-152.6, MAJOR: the refusal has no readable "no" and the purse is never pushed back
What is wrong: on رفض (147.96) the owner lifts one hand to the side of his own head (148.7-150.2), which reads as scratching his head or a salute. On يأخذ (150.90) the visitor pulls the purse back to his own chest by himself (151.2-151.5); the owner's hands never reach it. His eyes are shut at 151.2.
Why it matters: this is the climax and the fourth surprise of the plan (the poor man turns down money he badly needs). At the moment it looks as if the visitor changed his mind.
Fix: on رفض 147.96 give the owner `PERSON_HANDS.shield` with the palm world-targeted between his chest and the purse (about x 560, purse height), a slow two-swing head shake (`tip` about +/-0.04 over 148.0-149.2), a small smile, `lid` 0.3, gaze on the visitor's face and never on the purse. On أن يأخذ (150.6-150.9) both his hands travel to the purse (`reachBoth` with world hand targets on the purse) and move with it as it slides from about x 535 back to the visitor's chest, arriving on شيئًا (151.5); hold the hands on the purse for 0.4 s, then withdraw to `folded`. The visitor's arms give way a beat late (`settleTo`), his brows rise, `wet` comes up. Keep the soft pop at 147.72.

### 2. 143.5-152.6, MAJOR: the owner is drawn washed out
What is wrong: from about 143.5 until the push-in at 152.7 the owner's robe, face and beard are much paler than at 140.7 or 153.0 (see `extra/m6.jpg` frames 3 and 4, `extra/n2.jpg` frames 2 and 3). He looks half transparent, like a fade that did not finish.
Why it matters: he is the subject of the scene and he fades out just as he is about to refuse. If this was meant as "dim until he straightens", it reads as a render error.
Fix: full opacity and full colour for the owner throughout the hut (check his `alpha`, any dream-wash or light overlay left on him after the inset closes at about 137.9, and the layer order of the light shaft). Show the before and after only with posture: stoop until وقال 152.12, then the straight back.

### 3. 162.5-163.4, MAJOR (glitch): the purse detaches from the visitor and disappears
What is wrong: as the visitor stands on انصرف (162.81) the purse hangs low at 162.6-162.8, floats free beside his hip at 163.0-163.1 (not in a hand), and is gone at 163.3. He then leaves empty-handed.
Why it matters: a purse left hanging in the air beside the old man, then vanishing, makes the viewer wonder whether the owner kept the money, which reverses the moral.
Fix: the purse stays in the visitor's hand (world hand target) from 161.5 to the exit, or is visibly tucked into his sash at 161.6-162.4 and stays drawn there. It must still be on him in the doorway look-back at 163.9-167.5.

### 4. 61.2-71.4 (also 20.5-31.3 and 82.4-83.1), MAJOR: the chain ring and floor stake cover the dog's face whenever it lies down
What is wrong: with the stake under the dog's chest, the lying pose puts the big chain ring and the gold stake directly over the eye and muzzle (see `extra/m2.jpg` frames 3 and 4, `extra/m3.jpg` frame 1). At 61.5 the ring reads as a monocle. During "the dog did not stop him" (69.91-71.40) the dog is face down with its features hidden, so it looks asleep, not watching.
Why it matters: the plan says "the dog is the film". Its generosity has to be read in its face during the man's meal.
Fix: move each stake behind the dog (beside the hind legs, drawn before the dog) so the chain trails back from the collar and never crosses the head. For dog1 during 62.0-71.4 use the plan's pose: lying, head up on the forepaws line, gaze on the man, `lid` 0.25, one slow `tailWag`, tongue out on يمنعه (70.10). Keep the stand-up at 71.4.

### 5. 54.6-65.5, MAJOR: the invitation two-shot is jammed against both panel edges and the man does not answer
What is wrong: after the dog backs off, the man sits against the left border with his shoulder and scrolls cut by the frame, and the dog sits against the right border; the centre is an empty rug. The dog's raised paw then holds almost still for about 4 s (57.0-61.0) and the man's "me?" at وتناول (58.80) is not visible. A tiny red dashed arrow on the floor by the man (55.7-61.2) is too small to read.
Why it matters: this is the turn of the story (the dog invites a man to eat) and it is the longest chunk on screen (7 s).
Fix: frame with `twoShot(man, dog1, {margin})` so both whole figures sit inside the panel with clear space on each side (pull back a little, or back the dog off to about x 490 instead of 520). Beat it out on the words: ابتعد 54.62 two steps back and sit; طبقه 55.44 muzzle nod at the dish; يدعوه 56.98 paw `raise` plus a second nod; الاقتراب 57.96 the paw pats the floor toward the dish once; وتناول 58.80 the man points at his own chest (`PERSON_HANDS.chest`), brows up, head tilted, then looks left and right for servants at 59.6-60.6; the dog answers with a third nod at 60.2. Replace the tiny floor arrow with a proper style `arrow` from the dish to the man at 57.0-58.6, or delete it.

### 6. 66.1-69.4, MAJOR: the eating is not acted
What is wrong: the man shuffles over and rests one hand at the dish; the food level simply drops to empty by 68.0. His hand never goes to his mouth, there is no chewing and no relief (see `extra/n3.jpg` frames 2 and 3).
Why it matters: "ate until his hunger was gone" is the emotional release after 60 s of hunger, and it is what the dog's gift means.
Fix: three hand-to-mouth cycles with world hand targets, timed to وأكل 66.70 (careful pinch, eyes on the dog), 67.3 (faster) and 67.9 (eyes shut, `lid` 1, cheeks puffed, small `sq` chew bounce); the food mound steps down after each bite, not continuously. On زال جوعه (68.26-69.41) he sits back, both hands on his belly, shoulders drop (`tip` back -0.05), a long blink and a small smile. Push the camera in to about 2.2 on the man and dish for 66.5-69.4 with the dog's face kept in frame at the right.

### 7. 83.1-83.4, MAJOR (glitch): the debt scrolls float on the closed palace door
What is wrong: at the cut to the street the red door is shut and the two scrolls hang in front of it with no man (see `extra/n1.jpg` frame 2). He appears behind them when the door opens at about 83.5.
Why it matters: a visible error on a cut, in the quiet pause after the chime.
Fix: draw the scrolls in the same layer and visibility as the stranger (hidden while he is behind the door), or open the cut with the door already ajar and him in the gap.

### 8. 155.6-158.4, MAJOR: the dog's paw on the knee pops, and MY DOG! points at the owner
What is wrong: the old dog goes from lying asleep (157.0) to sitting with its paw on the visitor (157.2) in one quarter second, together with a camera jump, so the rhyme with the paw on the dish is a pop and not an action. The MY DOG! arrow points down at the owner's cap, not at the dog.
Why it matters: this is the plan's second visual thread (paw on dish = paw on knee) and the surprise on كلبي.
Fix: ear lift at 155.6, one eye opens at 155.9, the dog rises through أعطاك إياه (156.10-157.2) with `settleTo`, and the paw lands on the visitor's knee exactly on كلبي 157.26 with a one-frame squash; the owner's hand sweep to the dog starts at 156.10. Ease the camera down over 156.6-157.3 instead of cutting. Aim the MY DOG! arrow at the dog's head. Give the visitor his reaction at 157.6: a laugh with `wet` eyes, looking down at the paw.

### 9. 162.8-172.1, MAJOR: the closing image is too far away
What is wrong: the last pull-out ends with the owner and dog about one eighth of the panel height, low right, under a large empty wall; the light shaft is faint; the inset of the rich host at 166.2-167.2 overlaps the shelf. The dog is already asleep again at 168.0.
Why it matters: the moral image (straight back, dog against his knee, daylight on both) is the plan's ending and it is the frame that holds for 3.5 s under THE END.
Fix: stop the pull-out at a medium shot (owner plus dog about 40 % of panel height, centred a little right, the door edge still visible at left for the visitor's last look). Raise the shaft to about 0.6 alpha with a soft floor pool. Place the inset on clear wall left of the shelf. Keep the dog sitting against his knee until 169.5, then let it lie down with its chin on his foot; one tail thump at 170.0 as planned. THE END stays on the upper wall.

### 10. 20.6-26.0, MINOR: the sneak past the servant cannot be read
What is wrong: the hall is shown wide with eleven small overlapping figures behind a heap of sleeping dogs; the servant's three bows with shut eyes and the near miss on ينتبه (23.40) are not distinguishable in the strips. The four dogs in the foreground also give away the reveal that the counter makes at 30.08.
Why it matters: the planned humour and suspense of this scene are lost, and "unnoticed" is only told by the subtitle.
Fix: frame only the door side third of the hall at about 1.5x until 26.0, with the servant and the stranger in the clear and the guests already moving off right. Servant bows on الزائرين (21.42) with `lid` 1; the stranger slides behind him on دون (22.40) on tiptoe; on ينتبه (23.40) the servant straightens and looks over the stranger's head while the stranger freezes with wide eyes for 0.5 s, then scuttles to the corner by جلس (26.44). Keep the dogs out of frame, or at the edge, until the pan at 29.6.

### 11. 4.3-5.8 and 100.6-102.1 and 110.2-110.6 and 130.2-131.6, MINOR: four small clarity fixes
- 4.3-5.8: on يجد عملًا the pots keeper is hidden behind the stranger and his scrolls, so no one refuses him. Stop the stranger half a body left of the keeper and give the keeper a `shield` palm and a head shake on يجد (4.60); the stranger's head drops on عملًا (5.00).
- 100.6-102.1: a starburst counter in the sky runs 3, 7, 12 with no label. Label it YEARS (label at least 28 px), or remove it; the day and night wheel already says it.
- 110.2-110.6: the aged merchant with the porter boy and chest is already on screen for about 0.4 s before the YEARS LATER card wipes in. Hold the S10 shot (seated, thought cloud closing) until the card fully covers the panel, and make the cut under the card as the plan says.
- 130.2-131.6: the old woman's dashed pointing line runs up and right into the ruined palace door, so she seems to send him back to the ruin. Point her stick and the dashed line away from the palace (screen left, down the street) and whip the camera the same way into the hut.

### 12. 73.5-75.5, 79.2-81.0, 87.8-88.2, 131.7-135.0, MINOR: polish
- 73.5-75.5: the dog's muzzle is pressed over the man's cheek while the paw rests on the rim. Pull the dog's head back about 30 units so both faces are clear; the paw on the rim (74.56) is the picture.
- 79.2-81.0: the second balloon frame (man, red arrow, dish, dog) uses icons about half the size of the first. Draw it at the same scale as the 75.7-79.0 frame.
- 87.8-88.2: the dish appears on the goldsmith's counter from nowhere. Show a bulge with a gold glint under his crossed arms from 83.8, and have him draw the dish out and set it down at 87.8-88.2.
- 131.7-135.0: the first hut shot is static for 3 s with small figures. Start it a little tighter and let it creep in; the dog's ear lift on يعيش (133.20) should be large enough to see.

## Reusable techniques worth adding to the Library
- The one-second "ghost of the past" overlay (dashed pale lamps and dogs over the ruin, 125.0-126.0): a clean way to show loss without a flashback.
- The round inset used for recognition (rich host beside the poor man, 136.0-137.9) and its echo in the last shot.
- The price counter over a transaction (250 to 1,000 with BIG PRICE!) and the object-gets-a-bow icon for "gift".
- A rule for chained or tethered animals: anchor the tether behind the body so it never crosses the head in any pose (see note 4).
- A rule for carried props across a stand-up or exit: keep them on a world hand target or draw them on the sash, never on a free path (see note 3).

Second review advice: Yes, a second Fable review of v2 is warranted. Notes 1, 2, 3, 5, 6 and 8 change the acting of the two central scenes (the meal and the refusal) with new hand targets, timings and camera keys, and notes 3 and 7 are glitches whose fixes must be confirmed on rendered frames. A short comparison review limited to 54-83 s and 143-172 s, plus a check of the four items in note 11, would be enough.
