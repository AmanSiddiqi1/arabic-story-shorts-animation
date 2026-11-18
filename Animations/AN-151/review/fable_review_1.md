Verdict: REVISE

# AN-151 The Illiterate Who Set Up for a Schoolmaster: Fable review, round 1

Reviewed: `renders/AN-151_v1.mp4` (173.5 s, 1080x1920, 30 fps), all 29 strips of `review/v1_pack/strips/` in order, plus 37 full-size frames pulled into `review/v1_pack/extra/` (montages `m1.jpg` to `m12.jpg`).

## Summary

The story is told in the right order, every narrated event is on screen, the ending is present (THE END 169.7 to 173.5) and there are no broken frames. Subtitles are verbatim, correctly timed and readable in both languages; the English matches the Arabic. No BLOCKER.

What works and must be kept: the turban landing (18.7 to 19.5), the parents' cloud of the "scholar" beside a book tower (24.5 to 28), the window jam with STUCK! (52.5 to 55), the design of the UPSIDE DOWN! insert, WORDS READ: 0 (83.2 to 85.7), the neighbour at the shutter (90.7 to 92.5), the camel and ten suns (110.5 to 113), the angry march with dust (121 to 124), the swatted CAN'T READ! label (130.2 to 131.6), the told picture of the quilt roll and snuffer (137 to 144), and the page still upside down at 147.5.

Why REVISE: four of the film's key beats do not land. The head shake that causes the whole misunderstanding is nearly invisible and the woman smiles through it; the upside-down insert is on screen for one second; the quilt and snuffer (the setup for the punchline) are squeezed against the bottom edge and partly cut off; and the closing gag (a child rights the upside-down tablet) happens behind the LESSONS TAUGHT counter. These are staging and timing fixes, not redesigns.

Do not change narration, subtitle text or subtitle timing. Word times below are the true onsets from `review/v1_pack/narration.txt` (the same as `timing.json`). Note that `planning/inputs/timeline.md` lists each word at the END of the previous word, so any cue placed on a word that follows a pause is early by up to 0.5 s (see note 7).

## Notes

### 1. 65.4 to 69.2 s. MAJOR. The head shake does not read, and the woman smiles through it
What is wrong: this is the hinge of the story ("أخذ يهز رأسه ويظهر القلق", 65.39 to 68.85). The letter is held over his mouth and chin, the head moves only a few pixels, and the single sign of worry is a black scribble that pops above the turban at 68.2 and reads as a bird sitting on it. Meanwhile the woman faces the camera with a wide smile from 65.4 until 69.2, then flips to terror in one frame at 69.3 (see `extra/m2.jpg`, `m11.jpg` middle).
Why it matters: her fear at 69.29 ("فخافت") has no visible cause. The audience must watch his worry create her dread.
Fix:
- Lower the page to chest height from 65.2 (top edge of the sheet at least 30 px below his chin) so the whole face is clear until he lifts it again at 73.5.
- Shake on "يهز رأسه" (65.86 to 67.1): three full swings, head x offset +/- 14 px with `tip` +/- 0.10, gaze leading each swing, the turban lagging 3 to 4 frames with a larger amplitude (`wob`), tail of the turban swinging opposite. Brows up and pinched, mouth a small downturned line.
- "ويظهر القلق" (67.16 to 68.85): hand to forehead at 67.2, a sweat drop off the temple at 67.8, the peek over the hand at 68.1 (`wink`), a low "tsk" lean back. Move the worry scribble beside his cheek at half the size, or drop it; it must not sit on the turban.
- Woman, eyes on his face throughout (`lookAt` his head, never the lens): hopeful smile at 65.4; smile fades by 66.4 (first swing); brows rise and she leans in 10 px at 67.2; hand to mouth at 68.1; then the existing fright at 69.29 arrives as the last step, not a jump.
- Pupils C and D: heads follow the swings (tennis crowd), then look at each other at 68.4.

### 2. 62.4 to 64.9 s. MAJOR. The UPSIDE DOWN! insert is too short to read
What is wrong: the insert runs 62.45 to 63.4 and the UPSIDE DOWN! label is fully visible for about 0.4 s (63.0 to 63.3). The planned wrong-way eye scan (63.54) and the pupils' giggle (64.20) play in the small two-shot where neither reads.
Why it matters: this is the title gag of the film and the proof for the viewer that he cannot read. At phone speed it is a flash.
Fix: hold the insert from 62.45 to 64.35. Inside it: the page finishes its turn by 62.6 on "مقلوبة"; label pops at 62.75 and stays to 64.2; the curved arrow points at the upside-down portrait; his eyes above the page scan left to right, then right to left, then diagonally (63.5 to 64.2) with one confident nod. Cut back to the two-shot at 64.35 for the pupils' stifled giggle (hands to mouths, shoulders bobbing, staggered) through 64.87. Keep the label clear of the portrait (move it 40 px lower or to the yellow margin).

### 3. 113.7 to 118.0 s. MAJOR. The quilt and the snuffer are cramped at the bottom edge and partly cut off
What is wrong: in the letter picture the camel and rider stay large in the centre while the two gifts are pushed into the bottom strip. The quilt unrolls half under the woman's face inset; the snuffer handle enters from the right edge and the candle sits against the frame at about x 1000, with the SNUFFER label on top of the handle (`extra/m10.jpg` middle). The putting-out of the candle (116.56 to 117.4) is about 40 px of action.
Why it matters: these two objects are the entire basis of the impostor's lie at 135 to 144. If the viewer has not clearly seen "a quilt and a candle snuffer" here, the punchline has no setup.
Fix: at 113.2 (after "أيام") slide the camel and rider up and left and shrink them to about 60 percent (or let them walk off left by 114.2); fade the sun row to 40 percent. Give the gifts the centre of the page:
- "لحافًا" (114.84): the bundle drops from the camel, bounces once, and the quilt unrolls left to right across the middle (about 420 x 200 on screen, patchwork clearly visible), label QUILT under it, clear of the inset.
- "وأداة لإطفاء الشموع" (115.66 to 118.0): the candle stands at centre right (flame at least 40 px), the snuffer (cone at least 60 px) rises in at 115.7, hovers, dips over the flame on "لإطفاء" (116.56), a smoke curl rises on "الشموع" (117.38). Label SNUFFER beside, not on, the handle.
- Move the woman's inset to the top left corner (it is free once the tick has been shown) so it never overlaps the quilt. Her face in the inset should go from open-mouthed to a relieved smile at 109.6, then puzzled at the snuffer (one brow up) at 117.4.

### 4. 164.3 to 173.5 s. MAJOR. The closing gag is hidden behind the counter, and the last image is small
What is wrong: LESSONS TAUGHT: 0 returns at 164.3 with its burst placed exactly over wall tablet No. 4. When the pupil lifts a pole and turns that tablet the right way up at 168.3 to 169.0, the action is underneath the "0" burst (`extra/m7.jpg` right). The floating question mark (166.5 to 168.0) drifts through the same spot. Then the film ends on the full wide shot: the teacher is about 130 px tall, the turban does not visibly slide over his eyes (a dark band and a small snore bubble appear instead, `extra/m11.jpg` right), and the bottom 40 percent of the panel is empty floor.
Why it matters: the plan's moral is told only in pictures (the child quietly corrects what the teacher got wrong; the turban covers the eyes). Neither image reads in v1.
Fix:
- Put the counter in the free wall space at upper left (about x 80 to 400, y 80 to 200 of the panel), or remove it at 166.3 before the question mark leaves. Nothing may overlap tablet No. 4 from 167.5 on.
- Make No. 4 obviously wrong before it is fixed: at 167.9 a pupil points at it and two others tilt their heads sideways to read it. Then the turn at 168.54 ("يفضحه"): a clear 180 degree spin over 0.4 s with a small settle wobble and a spark; the pupil nods, satisfied.
- 169.4 to 170.6: push in on the teacher (zoom about 1.5, his head and turban in the upper middle of the panel, the righted tablet still in frame at upper left). The turban slides down over both eyes in two steps (a slip at 169.6, a pause, a final drop at 170.3 with `landSquash`), leaving only the moustache; one snore bubble grows and shrinks. THE END holds over that frame; keep its box off the turban.
- The teaching pupil (162.5 on) currently stands in front of pupil D and the lesson stand, overlapping both. Stand her to the left of the stand, facing the three seated pupils, pointing at the letter on the stand with her own arm.

### 5. 70.7 to 73.3 s and 97.4 to 102.2 s. MAJOR. Figures inside the cloud and the balloon are far too small
What is wrong: in the woman's fear cloud the husband is about 75 px tall inside a 330 px wide cloud; in the neighbour's picture balloon he is about 60 px tall in a 320 x 210 box that is mostly empty sand (`extra/m3.jpg` left, `m4.jpg` middle). The Capabilities Guide minimum is about 110 px. The key change in each (he tips over and turns grey at 72.0; green tick at 99.7, camel at 100.2) is a handful of pixels.
Why it matters: "she thought he had died" and "he is well and will return soon" are the two opposite pictures the story turns on.
Fix: raise `scale` inside both so the husband stands 150 to 170 px tall and fills the cloud height; crop the scene to him (drop the horizon strip and the little house). Fear cloud: wave at 70.8, the wave freezes at 71.6, he tips at 71.80 ("زوجها"), lands flat and greys at 72.48 ("مات") with one small dust puff; the woman's first tear on the same frame. Neighbour's balloon: husband waving and smiling large, tick at 99.66 ("بخير") at twice the present size, then the camel walks in and he mounts facing the house at 100.28 ("وسيعود").

### 6. 48.8 to 52.4 s and 40.0 to 43.0 s. MAJOR. His face is hidden behind the tablet during the panic and the doze
What is wrong: from 40.0 the teacher holds a tablet over his whole face. The "doze" (40.5 to 43) is only a small round bubble, so it looks as if he is reading. Then when the woman arrives he stands, tiptoes to the window and hops, still with the tablet over his face until 52.2 (`extra/m12.jpg` left). The planned "eyes snap open" at 48.76 cannot be seen.
Why it matters: "أراد الرجل الهرب" (50.07 to 51.5) is a comedy beat about panic; with no face there is no panic, only a figure sliding to the right.
Fix:
- Doze: let the tablet sag from 40.6 so the closed eyes show above it, head nodding forward twice, the turban slipping over one eye (`slump`), a snore bubble at mouth level. The tablet in his hands is upside down; give it a 2 px red outline pulse at 41.2 so it is noticed.
- 48.76 ("المسافر"): eyes snap wide over the top of the tablet (lid 0, brows up, 2 frame hold), the tablet drops to the lap.
- 50.1 to 52.4: tablet left on the cushion. `sneak` on tiptoe with raised knees, body turned away, gaze flicking back to the woman every step (51.0, 51.5, 52.0), one finger to his lips toward the pupils, whose eyes follow him. The woman watches the letter fondly until 52.9, then looks up at the bang.

### 7. 29.2 to 36.2 s. MAJOR. "Points to one child... and to another" shows one unchanged pose, tiny balloons, and WRITE! is early
What is wrong: the pointer rests toward pupil D for the whole seven seconds; it does not swing to a second child (`extra/m1.jpg` middle, `m12.jpg` middle). WRITE! and READ! are about 22 px lettering in small balloons. WRITE! shows 31.7 to 32.6, but the word "اكتب" is spoken 32.25 to 32.91, so the balloon is fading while the word is said. The whole class is framed as a thin band with empty floor below.
Why it matters: this is the only scene that shows his teaching method; the two commands are the joke.
Fix: play it as two closer shots (zoom about 1.5).
- 29.2 to 33.2: teacher and pupils C and D. On "يشير" (29.44) the stick snaps out at D with `anticipate`; D jolts and sits up. WRITE! at 32.25, held to 33.1, lettering at least 44 px, balloon tail at his mouth. D bends over the tablet and scribbles fast (`handRW` zigzag).
- 33.3 to 36.2: pan left to pupils A and B. On "وإلى آخر" (33.35 to 34.28) the stick swings over in a big arc to B; B points at himself ("me?"). READ! at 35.67, held to 36.5. B lifts the tablet and mouths, finger tracking a line.
- Teacher after each command: eyes close, chin up, satisfied (mask on).
- 36.7 on (existing pupils shot) is good; keep the arrows between pupils.

### 8. 44 to 50, 81.2 to 83.0, 134.7 to 144.5, 151.7 to 156.2, 160.0 to 169.4 s. MINOR. Wide schoolroom shots waste the lower 40 percent of the panel
What is wrong: in every wide the figures sit in a band about 15 percent of the panel height with empty checker floor below; faces are about 45 px across at 1080 width.
Why it matters: the reactions that carry the humour (four jaws dropping at 152.1, arms folded, the woman's "of course" nod) cannot be read on a phone.
Fix: keep one true wide per sequence as an establishing beat of at most 1.5 s, then go closer.
- 134.7 to 144.5 (told picture): zoom about 1.3 on teacher, woman and cloud; enlarge the cloud to about 620 x 330 so the quilt roll is about 380 px long. It currently opens empty at 135.6 and stays empty until 137.0: either pop it at 136.58 ("ظن") or show the husband standing from the start.
- 151.7 to 152.9: after OH! I SEE., cut to a tight row of the four pupils for the staggered jaw drops (0.12 s apart); the pupil who looks at the lens holds it for 0.6 s.
- 81.2 to 83.0: this pull-out to wide in the middle of "from not knowing a single word" weakens the YES!; stay on the two-shot and let the woman's wail (head back, `wet`, tear arcs) fill the left half, then push to him for WORDS READ: 0 as now.

### 9. 73.6 to 79.1 s. MINOR. The two mourning mimes look the same
What is wrong: on "تمزق ثيابها" (75.14) and on "وتلطم وجهها" (76.70) her hands go to the sides of her head both times; only the "?" changes (`extra/m3.jpg` middle).
Why it matters: she is asking two specific things and he agrees without understanding either; the mime should be legible enough that his YES! is absurd.
Fix: 75.14: both fists meet at the collar and pull apart twice, 20 px each way, elbows out, a small "?" after. 76.70: open palms pat the cheeks alternately, left, right, left (0.2 s apart), head rocking opposite. 78.30 ("حزنًا"): hands drop, wet eyes up at him, waiting. He peers over the page with half lids during both and gives a tiny uncertain shrug at 78.6 before the eyes-closed hold at 79.50.

### 10. 104.9 to 105.8 s. MINOR. The children's hops of joy read as a glitch
What is wrong: when the neighbour reads the good news the girl jumps to shoulder height behind her seated mother (she appears to sit on her back) and the boy hangs in the air with dangling feet a full head above the step (`extra/m5.jpg` left and middle).
Fix: `hop` of 25 to 30 px with `anticipate` and `landSquash`, arms up, staggered by 0.2 s, each child keeping a clear x position that does not overlap the mother. The mother: hand to chest, long breath out (sq 0.96 then 1.0), smile growing over 0.5 s. Neighbour: eyes on the page, finger sliding right to left along the lines, glancing up at her at 105.48 ("أمامها").

### 11. 21.2 to 28.6 s. MINOR. SCHOOL sign hidden by the turban; a grey child at the door
What is wrong: in the street scene the turban covers the lower half of the SCHOOL sign for the whole shot, so the lettering reads as fragments. At 27.7 to 28.4 a child going through the dark doorway turns flat grey and semi-transparent, like a ghost (`extra/m8.jpg` right).
Fix: raise the sign about 70 px or stand him 120 px to the right of the door so the sign is clear. For the children entering, clip each figure at the door edge (they walk behind the jamb) instead of fading them. The bow at 28.08 where the turban nearly falls is hard to see; make the turban tip 25 degrees forward and be caught with both hands.

### 12. 5.5 to 9.1 s and general. MINOR. Leftover scribble; passer-by beat; small lettering
- The black chalk scribble from 4.7 stays stuck beside his head and over the notice frame until the cut at 9.1; it looks like a splat. Remove it by 5.9 when he turns sly on "لكنه".
- 7.0 to 9.0: the passer-by stops and they stand shoulder to shoulder facing the lens; the fooling is not visible. On "خداع" (7.42) have the servant point at the notice and trace a line with a wise chin stroke; the passer-by nods, impressed, and walks on; the wink to camera at 8.10 comes only after his back is turned.
- YES! (80.4), WHY?! (125.7) and OH! I SEE. (151.2) balloons use lettering of about 22 to 26 px; raise to at least 40 px (project rule: labels at least 28 px at 1280x720 scale) and point each tail at the speaker's mouth (the YES! tail points into the turban).
- The label says SNUFFER while the English subtitle says "candle extinguisher"; do not touch the subtitle. If wanted, letter the label CANDLE SNUFFER.

## Subtitles, sync and faithfulness (no change requested)
- Arabic verbatim with diacritics, large, centred; English below in blue. Three-line chunks (91.3 to 102.0, 118.6 to 128.1, 140.7 to 148.9) are the smallest English on screen but remain legible at full size.
- English is accurate to the Arabic throughout as it now stands.
- Cues checked against true onsets: CAN'T READ! 3.4, SCHOOL 11.1, turban 19.0, STUCK! 52.9, UPSIDE DOWN! 62.6, YES! 80.4, WAAH! 88.7, 10 DAYS 111.8, WHY?! 125.7, OH! I SEE. 151.2 are on their words. Only WRITE! (0.5 s early) and READ! (0.35 s early) need retiming (note 7).
- Family friendly: the imagined death is a figure tipping over grey; mourning is mime only. Fine.

## Reusable techniques for the Library
- **Insert minimum**: a cut-in that carries a label needs at least 1.8 s on screen and the label at least 1.2 s; put the reaction (eyes, giggle) inside or straight after the insert, never in the following wide.
- **Hand-held prop below the eye line**: a page or tablet held "to read" should default to chest height with the top edge under the chin; add a `readAt: 'chest' | 'face'` option to the letter and tablet holds so the face is covered only on purpose.
- **`clearOf()` for counters and labels** (already on the recommended list): this film shows why; a counter landed on the one wall prop that the final gag needs.
- **Picture-letter layout** (`letterWorld`): when the narration lists objects, the object named gets the centre of the page and earlier items shrink to a margin strip; one item per spoken word.
- **Listener escalation**: in a two-shot, the listener's state changes in three or four steps timed to the speaker's actions (smile, fade, lean, hand to mouth, fright) rather than one switch on her own word.
- **`bigTurban`, `letterSheet`, `quilt` (with `wrap`), `candleSnuffer`, the window jam and the upside-down insert** are worth moving to the Library after approval.

Second review advice: Yes, a short second review of v2 is warranted. Notes 1 to 7 re-stage seven key beats (new closer shots, a longer insert, a re-laid letter picture and a new final push-in), so new overlaps, cropped turbans or timing slips are likely and should be checked on the rendered film; the second pass can be limited to 29 to 36, 40 to 53, 62 to 73, 97 to 118 and 160 to 173.5 s.
