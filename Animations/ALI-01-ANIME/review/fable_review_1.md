# ALI-01-ANIME "Open Sesame" (80s Cel Anime): Fable review, round 1

Film reviewed: `Animations/ALI-01-ANIME/renders/ALI-01-ANIME_v1.mp4` (142.93 s). Sources: the 24 contact strips in `review/v1_pack/strips/` (4 frames per second) plus 27 full-resolution stills pulled from the MP4 at the moments cited below. Times are seconds on the film.

## Verdict: REVISE

The story is told in order, every narrated event is on screen, subtitles are sharp and correct, the ending is present. One rendering defect is a BLOCKER (note 1).

How it reads as 80s cel anime on tape: **partly**. The tape layer works (CRT pass restrained, chrome title, tracking-noise transition, memory-flash inset at 81.7). The four eye close-ups (22.4, 48.2, 87.5, 123.7), the coin insert with bokeh (115.2), the forest plate with light shafts (7.8-16.4) and the dusk repaint of the rock (56.7) are convincingly in style and are the best shots in the film. Everything between them is not: the cast are small front-facing Halftone puppets with thick near-black outlines and no shade shapes, standing in the middle of wide shots whose lower 35-40% is empty ground, and the film ends on what is plainly a Halftone set. In the comparison with the Paper Pop-up version this film will win on its close-ups and lose on almost every wide.

How alive the characters feel: **weak in the wides, good in the close-ups**. The eye close-ups act (saccades, blink, pupils shrinking, coin reflections). In the wides the acting is there in the code but cannot be seen at the size it is staged, and several holds are dead (notes 4, 6, 7).

What was measured rather than seen: frame differencing on five passages shows character pixels changing on a stepped cadence (mostly every 3rd frame at 30 fps), so stepped cel timing is present. I could not separate cel motion from the tape noise in that measurement, so "the leader is frozen" in note 6 rests on the stills (identical drawings at 4 samples per second), not on the measurement.

## Notes (most important first)

### 1. BLOCKER. 51.2-56.2 s: ghost men in the doorway, and a ghost door left on the closed rock
- **What is wrong.** As the men enter (51.2-54.2) each one turns into a see-through beige ghost in front of the door instead of walking in. After the rock closes (54.5-56.2, about 1.7 s, right up to the tape transition) a translucent arch with a hooded man's silhouette is still painted on the closed rock face. Clear in the stills at 52.0 and 55.0.
- **Why it matters.** The narrator says "the door closed behind them". The picture says a man is stuck in the stone. It is also the last image before MUCH LATER, so it is what the viewer carries across the cut.
- **Fix.** Do not fade the men with alpha. Draw each as a dark flat silhouette (cel multiplier to about 15% plus the pink rim on the edge away from the door) once within 120 world units of the door, scale him 1.0 to 0.8 over his last 0.4 s, and clip him to the door opening so the door edge swallows him. Draw order: rock halves over the door glow and over the men. Tie the door glow, the arch and any man still inside to `open`: all at zero when `open` reaches 0 (54.5), no residual alpha. The same applies to the exit at 59.0-59.7 and to Ali Baba's closing at 101.5-102.0; check stills at 54.6, 55.0, 56.0, 66.9, 102.0.

### 2. Whole film: the cast is too small and the lower third of the picture tube is empty
- **What is wrong.** In almost every non-close-up shot the figures are 110-160 px tall in a 972 x 1196 panel, with the ground line near 60-65% of the height and blank ground, floor or wall filling the rest. Worst cases: yard 3.7-7.5, tree 16.5-22.2, rock wides 38.2-40.2 and 78.0-79.5, cave 89.5-95.2 and 97.2-101.0, night room 105.5-113.0 and 127.0-131.5, cart 131.7-142.9. The purse smile (6.46), the donkey hearing first (17.6), the counting on fingers (80.6), the refusal (97.3) and the wife's hush (111.0) are all in the film and none can be read on a phone.
- **Why it matters.** This is the main reason the characters do not feel alive: the acting exists but is 30 px of face. It is also not the style: the "small hero in a huge painted world" is one deliberate move (keep it at 32.4, 78.0 and the last shot), not the default framing.
- **Fix.** Rule for every acting beat: the speaking or reacting character's head is at least 150 px tall on the 1080 canvas and the ground line sits at 75-82% of the panel height. Concretely, by camera zoom (cameras are on ones, so push in rather than cut where possible):
  - 4.6-7.6: zoom about 1.9 on Ali Baba, child and wife; push to 2.4 on his waist and face for the empty purse on "فقيرًا" 6.46.
  - 16.5-22.2: zoom 1.7 on Ali Baba and the donkey; see note 8.
  - 40.5-45.4 and 62.5-66.0: see note 6.
  - 79.8-85.0: zoom 2.2 (now 1.6), Ali Baba left of centre, the seam visible at the right edge.
  - 95.4-101.2: see note 3.
  - 105.6-113.0: zoom 1.9 two-shot, lamp between them, floor line at 80%; 127.0-131.5 the same framing with Cassim.
- Keep true wides only for 32.4-34.4, 38.2-40.4, 45.5-47.5, 78.0-79.8 and the final freeze.

### 3. 95.4-101.2 s: the emotional centre is played wide, and the choice is not shown as a choice
- **What is wrong.** The "held bust" at 95.5-97.0 is a full-figure shot. At 97.2, exactly on "لكنه" (97.30), the film cuts back to a wide, so the hands stopping, the head shake and the taking of the small sack happen at postage-stamp size. The sack he takes is one of four identical sacks in a row, held against an olive robe of nearly the same tone, so "one small sack" is carried only by the label.
- **Why it matters.** The plan calls this the emotional centre: decency under temptation. It currently reads as "man stands near treasure, label appears".
- **Fix.** Three held drawings, no cut to the wide until 101.2:
  1. 95.4-97.3 real bust (head and shoulders, head about 420 px), gold light bands sweeping across the held cel, eyes scanning right to left with one blink, mouth dropping open on "دهش" 95.40. Hands rise into the bottom of frame from 96.36 ("الكنوز").
  2. 97.3-98.8 insert on the hands in front of the open chest: fingers 30 px from the coins, they stop (two drawings of tremble), curl, withdraw. On "أخذ" 98.28 the gaze drops left.
  3. 98.8-101.2 medium shot (zoom about 2.3): he lifts one sack, sized about a third of his torso, in a light colour that separates from the robe (pale canvas with a vermilion tie matching his sash), holds it at his chest with both hands, small nod and the patient smile from S1. ONE SMALL SACK label on "كيسًا" 98.80 above his head, not over the treasure. The big chest stays in frame, out of focus weight on the right, so the contrast is in one picture.

### 4. 131.8-142.9 s: the ending is a Halftone set and the question is not staged
- **What is wrong.** The last shot uses the Library road and yard look unchanged: thick black outlines, flat saturated lollipop trees, a miniature hut with tiny people in it, picket grass, and a blank lavender band across the bottom third. The "pre-dawn" plate is a flat blue gradient. The far rock is a small pale dome beside a bush and reads as a tombstone or a greenhouse. The empty sacks cannot be seen (a flat tan shape in the cart bed). The three words trail behind the cart at about 20 px and are never seen to fall. The freeze-frame speed lines (137.9) converge on the donkey, not on the rock. THE END (139.2) collides with the chrome "?". The donkey and cart then hold completely still for 4 s.
- **Why it matters.** This is the last image and the one that must answer "would he remember?" without words. It is also the frame most likely to be compared side by side with the Pop-up version.
- **Fix.**
  - Plate: paint a real pre-dawn plate (deep indigo at top, a thin band of pale peach at the horizon, lit cloud undersides, soft hill silhouettes in two parallax layers, a few stars fading). No Library trees, no hut, no picket grass; foreground is one dark grass silhouette strip sliding fastest. Ground line at 80%.
  - Cart: zoom about 1.7 for 131.8-135.8. Sacks as 3-4 pale ribbons on a travelling sine (4-drawing cycle) streaming off the back of the cart, clearly empty and clearly many. Cassim leaning forward, grin held, whip hand on a 12 fps jitter, turban tail lagging.
  - Words: Lalezar at 56 px or more, glowing, sitting on the sack heap at 133.0. On "هل" 135.87 the first word slides off the back and drops to the road with a small bounce and dims; second on "سيتذكر" 136.63; third on "كيف" 137.51. Cassim never looks back. The camera lets the dropped words slide out of frame left.
  - Freeze: on "يخرج" 137.93 pull to the wide: tiny cart at left, the sesameRock (same silhouette as S5, in the pre-dawn model, at least 300 px tall) on the right, speed lines centred on the rock, chrome "?" above the rock. Then THE END centred in the upper third with at least 60 px clear of the "?".
  - During the 4 s hold keep two cycles alive on twos: the sack ribbons and the donkey's ears or tail; the tape noise alone is not enough.

### 5. Whole film: the cast does not read as cel, and three key backgrounds are not painted
- **What is wrong.** Against look.md's own checklist:
  - Outlines on people, donkey and horses are thick and read as black at phone size; the Library trees and bushes (0-7.5, 16.5-34, 131.8-end) carry the same heavy line. Thin, even, coloured lines are specified.
  - Faces and robes are single flat tones. A hard-edged shade shape is visible only in the cave, where the violet rim on Ali Baba at 95.5-100.5 looks right. Nowhere else does a figure have a shadow side.
  - The rock, the central object of the story, is a flat polygon with hairline cracks (38.2-70, 78-89, 101-102.5): vector clip-art, not a painted plate. The night room (105.5-131.5) is a flat grey wall. The last plate is covered in note 4.
  - The lamp at 105.5-131.5 is a yellow disc laid over the frame: it turns Ali Baba's skin yellow, leaves the wife grey-lilac, and she changes colour as she crosses its edge. That is the "filter over the frame" the style forbids.
  - At 101.2-102.5 the rock turns lavender while the sky is still the dusk pink of 78-89, so it reads as a different rock.
- **Why it matters.** The look is "the contrast between four layers". With unshaded heavy-line puppets on flat backgrounds the film reads as Halftone Pop under a CRT filter, which is exactly what the plan said it must not be.
- **Fix (story-side only, no Library default changes).**
  - Draw every character through `castFinish` with a per-model shade pass: a hard shade shape on the side away from the scene's light at about 30% of the figure's width, shade tone from the `MODEL` table, and a 2-4 px rim on the lit side when backlit (door glow 45.5-54, 59-66, 86-89, 101; lamp in S14-S16; cave already done). If the Library line weight is a parameter, pass about 0.5-0.6 of the current weight and a line colour that is a dark version of each fill; if it is not, say so in the implementation notes rather than changing the default.
  - Skin from the `MODEL` table in every set; no overlay may touch skin. Night room: skin a muted warm tan with a cool blue-violet shade side, both characters the same.
  - Rock: paint it with `paintPlate`: airbrushed top light and a darker base, a soft contact shadow on the ground, moss as soft patches. In the dusk model give it a warm rim on the sunset side. Use one dusk model for 78-89 and 101-102.5.
  - Night room: paint the wall with a soft warm pool around the lamp falling off to blue, a window with a deep-blue night and one star, a shelf and a hanging pot as dark shapes. Lamp flame on the emissive pass with halation; replace the disc with a soft radial falloff on the plate plus warm rim light on the cels.
  - Replace Library trees and bushes in the yard (0-7.5) and at the tree (16.5-34, 70.5-77.5) with painted or `celShade` foliage with dark-green lines; the leaf clusters used for the hiding tree at 29-32 already look right and can be the model.

### 6. 40.5-45.4 and 62.5-66.2 s: the two magic calls are staged small and held dead
- **What is wrong.** First call: the leader is a small figure at lower left, the rock fills the right, his arm goes up at 43.0 and then nothing changes until the impact frame at 45.45 (about 2.4 s of the same drawing). The Arabic word sits in the far top-right corner, away from the speaker. The impact frame arrives 0.6 s after "فانشقت" starts (44.86; the code uses `hit = 45.45`), so there is a long dead gap after "سمسم". Second call: 62.5-66.0 is one drawing for 3.5 s.
- **Why it matters.** "Open Sesame" is the title beat. A held cel is in style only if light or a cycle moves across it; here it reads as a paused video.
- **Fix.**
  - 40.5-42.7: land with `landSquash` on "نادى" 40.46 (keep), cloak ribbon arriving three drawings late, walk two steps to the rock. LEADER tag on "قائدهم" 41.74 (keep).
  - 42.2-42.7: breath in (`anticipate`: chest up, chin down, arm drawn back).
  - 42.76 "افتح": cut to a low-angle medium shot (zoom about 2.4, leader's head about 260 px, rock looming behind). Arm thrown up with overshoot and `settleTo`. One Lalezar word per spoken word (42.76, 43.62, 43.80) stacked above his raised hand at 84 px or more, between him and the rock.
  - 43.9-44.86: hold the drawing, but keep the cloak ribbon cycling on twos and sweep one light band across him; the riders behind lean in, staggered.
  - Move the impact frame to the word as planned: `hit = 44.86` (and `hit = 85.02` in S11, now 85.74). If the later value was chosen on purpose to match the subtitle change, keep the beat of silence but fill it as above.
  - 62.5-66.2: the horse must not be a statue. Horse shifts weight and tosses its head once (63.2), tail ribbon cycles; the leader turns in the saddle toward the rock with a blink on the turn, arm out on "أغلق" 64.06. Staggered riders already moving off behind him.

### 7. 59.9-62.2 s: mounting is levitation
- **What is wrong.** At 60.2 one man stands upright in the air a full body above the horses; at 62.0 the leader hangs a body-length above his saddle, robe hanging straight, no crouch before and no settle after.
- **Why it matters.** It breaks weight at the moment the gang should look practised and dangerous, and it fails the "anything in the air" check.
- **Fix.** Per rider, staggered by `stagger(i)` from "وركبوا" 59.88: step to the horse's flank, one hand to the saddle (2 drawings), crouch (`anticipate`, 3 drawings), a low arc that never rises more than half a body above the saddle with one leg swinging over, `landSquash` on the saddle with the horse dipping 6-8 px and its head bobbing, cloak arriving late. Only two or three riders need the full move in the foreground; the rest can already be mounted in silhouette. Leader last, on "خيولهم" 60.86.

### 8. 16.5-25.6 s: the donkey's "hears first" is hidden, and the three sacks beats are missing
- **What is wrong.** The donkey stands behind Ali Baba and half inside a bush at the right edge, so its ears reacting before him (plan: 17.6) cannot be seen; Ali Baba's cupped ear is the only reaction. At 30.7-31.0 the thicket insert shows a bush with no eye in it. In S5 (34.5-38.2) no rider visibly carries a sack on "بأكياس ثقيلة" (36.54-37.32): the close shot at 36.5-37.2 is a crop of horse chests with a foreground trunk across the central rider's face.
- **Why it matters.** The donkey is the planned comic witness, and "heavy sacks" is the set-up for "one small sack" and "empty sacks".
- **Fix.**
  - 16.5-21.7: donkey in front of the bush, left of Ali Baba, both clear of the trunk. 17.6 one ear swivels, 17.9 the other, 18.03 "سمع" its head turns; Ali Baba looks at the donkey first (gaze, 0.3 s), then cups his ear on "أصوات" 18.75.
  - 25.6: ears pop back up twice as he pushes the donkey into the thicket (the planned gag).
  - 30.73 "ثم": the thicket insert needs one donkey eye in a leaf gap, blinking once, and an ear tip twitching above the bush.
  - 36.54 "بأكياس": insert on one bulging sack tied behind a saddle, bouncing on a 12 fps jitter with a heavy lag behind the horse's bob, coins clinking as two small glints; speed lines behind. Keep the trunk out of this shot.

### 9. 7.8-16.4, 34.5-38.2 and 102.7-105.5 s: foreground trunks hide the subject
- **What is wrong.** The dark foreground trunk layer covers Ali Baba completely at 8.0-8.5 and 11.2-11.7 (on "حماره" and "الغابة"), covers the lead riders at 35.2, 36.0-36.7 and 37.5, and covers Ali Baba and the donkey at 103.5-103.7 and 104.7-105.0. The trunks are wide (150-200 px) and frequent.
- **Why it matters.** Parallax foreground is correct for the style, but the subject disappears on the words that name it, and in a 9:16 panel a 200 px trunk is a fifth of the picture.
- **Fix.** Narrow the foreground trunks to 70-100 px, at most one in frame at a time, with the 16 px horizontal smear the grammar asks for on moving plates. Phase the layer so a trunk never crosses the subject within 0.25 s of a word cue (10.18, 11.26, 35.02, 36.54, 102.72, 103.64). On the ride home also remove the broken horizontal bars at 104.5-105.2 (they read as a glitch, not as town lights or speed lines) or turn them into clean speed lines.

### 10. 25.6-30.0 and 74.1-77.0 s: the climb starts with a teleport; check contact on the way down
- **What is wrong.** At 26.0-26.2 Ali Baba hangs in the air in front of the bush about 100 px right of the trunk, feet off the ground, then appears on the trunk at 26.5. On the descent at 76.2 he is beside the trunk with arms spread before landing.
- **Why it matters.** The climb is the story's first physical action and the plan asked for it to be checked against the "alive" list.
- **Fix.** 25.61 "فصعد": two running steps to the trunk with `walk`, a crouch, hands to the trunk on 26.45, then the climb cycle with hands and feet alternating on trunk points (never both hands moving together), body pressed to the trunk, sash tail lagging. On the way down: last 80 px as a short drop with hanging feet, `groundShadow` growing, `landSquash` on "بحذر" 76.20, then a look left and right with a blink on each turn before the donkey's ears rise at 77.0.

### 11. 32.4-45.4 s: the rock gives away its secret
- **What is wrong.** From its first appearance (32.7) and in every wide from 38.2 the rock carries a strong vertical double line exactly where it will split, plus symmetric crack lines.
- **Why it matters.** The plan: "deliberately blank and unlabelled when first seen, so the split is a real reveal".
- **Fix.** `crack = 0` and no seam line until the hit frame. Before that the rock is one painted mass with irregular, asymmetric weathering. After "Close Sesame" (66.2 onward) and at 78-85 return to the same seamless painting: "فعادت الصخرة كما كانت". The sparrow landing at 68.6 is good; give it a small hop and head tilt at 69.3 so the hold to 70.4 is not still.

### 12. Lettering sizes and edge composition (polish)
- 83.2-85.0: Ali Baba's timid words are about 20 px tall. Half the leader's size is the joke, but they must still be legible: 48 px minimum with the wobble, placed just above his raised hand.
- 130.8-131.5: the words drifting past Cassim's ear are also about 20 px: 48 px or more, and let one visibly bounce off his turban.
- 118.5-123.5: the wife is cut in half by the right panel edge during the jump cuts. Either take her fully out of these frames or keep her whole at the edge, turned away, as planned.
- 128.0-129.3: the map card icons are small and dark on dark; enlarge the card to about 300 px wide and brighten the dotted path.
- 113.2-114.5: Cassim's face in the window is dark blue-brown on dark blue; give him a warm rim from the lamp side so the scan of his eyes reads.
- 53.9-56.2: only two riderless horses stand outside while forty men are in the cave; add a row of horse silhouettes in the back layer.

## What already works (keep)
- Eye close-ups at 22.4-23.6, 48.2-50.0, 87.5-88.1 and 123.7-125.3: layered iris, door and coin reflections, light bands, blink on threes.
- Leaves closing over Ali Baba (29.2-30.0) and the eye band in the foliage, including the small leaf-frame eyes at the top left of the S6-S9 wides.
- The view of the riders through the dark trunks (23.7-24.6).
- Tape transition and same-framing dusk repaint (56.2-57.0); memory-flash inset with tracking noise (81.7-82.3).
- Rock split with the gold seam and the light spill on the ground (45.5-48.0, 85.7-87.2).
- Coin insert (115.2-116.0), the three jump cuts on the questions (118.5, 119.0, 119.6), GOLD! thought (125.5-126.9).

## Reusable techniques worth adding to the Library
- **Eye close-up function** (layered iris, optional reflection drawing, light bands, lid on threes): the strongest asset here; worth a Library entry usable by any style.
- **Leaf-hide pass** (clusters closing to an eye gap, with a miniature version as a corner frame for later wides).
- **Tape memory flash**: an earlier shot replayed in a small bordered inset with tracking noise.
- **Same framing, repainted colour model** as the time-passes device with `transition`.
- Once fixed: the **doorway silhouette swallow** from note 1 (figure goes to backlit silhouette, scales down and is clipped by the opening) and a **mount helper** from note 7 (crouch, low arc, saddle squash with horse dip).
- A guide rule from note 2: for 9:16 panels, acting beats need a head height of at least 150 px and the ground line at 75-82% of the panel.
