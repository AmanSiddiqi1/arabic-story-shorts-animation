# SIND-02 "The Roc and the Diamond Valley" (80s Cel Anime): Fable review, round 1 (v1)

Film reviewed: `Animations/SIND-02/renders/SIND-02_v1.mp4` (147.8 s). Sources: all 25 contact strips in `review/v1_pack/strips/` (4 frames per second) and 36 panel stills pulled from the MP4 (among them 20.5, 46.4, 47.4, 47.9, 49.7, 52.0, 57.5, 62.5, 64.3, 64.9, 66.0, 70.5, 77.6, 78.5, 80.0, 85.5, 89.6, 90.6, 112.5, 127.2, 127.8, 134.5, 135.9-136.8, 142.6-145.5 s). Times are seconds on the film. Yardstick: the owner direction in `Library/styles/cel-anime-80s/look.md`, then the creative plan, `notes.md`, the rest of look.md and the rossark-motion alive checklist.

## Verdict: REVISE

A small revision, one round. The story is told in order, every narrated event is on screen, the subtitles are sharp in both languages throughout, THE END is present with a 4 s hold, and the film is bright, varied and full of acting. It is close to ready. Two short stretches look like broken frames (notes 1 and 2) and three story images fall short of what they should deliver (the flight, the ending and the escape over the rim: notes 3 to 5). Everything else is polish.

Not checked: sound was not listened to. Twos and threes cannot be judged from stills. "No frozen holds" is judged from the strips only (the CRT noise defeats any automatic freeze scan).

## The owner's points

| Owner point | Met? | Evidence |
|---|---|---|
| Wide views and pans, lower picture not empty | **Mostly** | Quay, sea (the SIND-01 sea framing is carried over: reflections, crest band, flying fish, dolphin), glade, nest wide, port and gold sea all hold. Soft spots: the valley floor (note 6), the rim (note 12), and a dark strip under the valley floor (note 2). |
| Full scenes | **Mostly** | Island and port are rich. The valley is one striped wall plus boulders for 50 s (note 6). |
| Varied bright colour, no tint | **Yes, one exception** | Morning, gold afternoon, blue nest day, rose and ochre valley, green rim, gold sea; skin and the tangerine cloth hold everywhere. Exception: prism bands over Sinbad's face and hair in the insert at 78.2 (note 7). |
| English bubbles | **Yes** | HELLO?, THE SHIP!, A WHITE DOME?, AN EGG!, EASY, BIG BIRD..., FROM THE VALLEY?! and the tags are English and large. One is clipped (note 8). |
| Readable limbs | **Yes** | Including the strapped pose on the slab and the hanging pose. |
| Library cast | **Yes** | |
| Light presentation | **Yes** | |
| No frozen holds | **Yes, as far as stills show** | Quietest stretch: the roc asleep 53.7-54.9 (a pause in the narration; acceptable). |

The roc: **kind, yes** (round body, blush, soft eye, hen-like settling). **Huge, mostly**: the leg as a tree trunk in 55.0-62.9 and the valley landing 68.7-71.9 work very well; the nest wide (49.2-54.9) works with the SINBAD tag. The flight does not show the whole bird (note 3) and the wing reads as a flat board (note 10). The roc faces left throughout as `notes.md` says; screen direction is consistent.

## Notes (most important first)

### 1. BLOCKER. 136.1-136.88 s: a red striped block covers Sinbad
- **What is wrong.** From 136.1 a flat red rectangle with three yellow bars fades in over Sinbad's chest and legs and stays to the cut (stills 136.4, 136.8). It hides his body and arms, has no folds, hands or giver, and reads as a rendering fault. If it is meant as a gift (a blanket or robe from the traders), nobody can tell.
- **Why it matters.** This is the last image of the generous resolution ("أعطاهم بعض الألماس") and it ends on what looks like a glitch.
- **Fix.** Remove the rectangle (the alpha-faded `celShade` quad at `t > 136.1` in the rim scene). End the shot on the three diamond reactions the plan asks for, which are only half visible now: young trader bites his (136.18), plum holds his to the sun with a glint, the elder tucks his into his cap; Sinbad's open-armed ta-da on "نجاته" stays, then a small bow. If a thank-you gift is wanted, make it a prop that is carried: the elder lifts a folded striped blanket in both hands from 136.2 and Sinbad's hands come up to receive it; never draw it over his body.

### 2. BLOCKER. about 77.2-80.4 s: dark strip along the bottom of the panel
- **What is wrong.** When the valley camera pulls out to zoom 0.62 (keys at 78.3 and 79.9, y 420) the floor plate ends above the bottom of the panel and a dark purple band shows under it (stills 77.6 and 80.0; strip frames 77.5, 77.7). The set edge is exposed for about 3 s, during "تلمع بأحجار الألماس" and the DIAMONDS! title.
- **Why it matters.** It is the reveal of the treasure, and the eye goes to the dark bar.
- **Fix.** Extend the valley floor fill and its stones and gems at least 300 world units further down (or clamp the camera so the panel bottom never passes the floor plate's lower edge: raise y by about 120 at zoom 0.62). Check every frame of 75.7-80.5 and also the other 0.6-0.62 valley shots (68.46-71.0).

### 3. 64.98-68.46 s: the flight never shows the whole roc
- **What is wrong.** The plan's signature scale shot (whole roc at 0.36, wings as clouds over three ridge layers) shows a bird cut by the top of the panel: the head is half out of frame at 66.0, the wing leaves the frame at 66.0, 66.7 and 67.7, and the body sits in the top fifth. The eye reads "tag, string, small man" and not "enormous bird".
- **Why it matters.** "حمله فوق الجبال" is the wonder of the episode. The roc must read as huge here, with Sinbad a speck under it.
- **Fix.** Lower the roc by about 250 world units (or pull the camera to 0.32) so that the whole bird, crest and both wing tips at full up-stroke included, stays inside the panel with a margin of 40 px; keep Sinbad and the tag where they are (shorten the visible cloth if needed, the foot can sit higher in frame). Slow the flap to one full beat per 1.6 s with the tips arriving last, and let the bird's shadow slide over the snow peaks at 66.5 ("فوق") and the cloud bank at 67.7. In the cut-in (67.0-67.6) keep the hands-over-eyes, one eye, both eyes, grin sequence, it reads well.

### 4. 142.7-147.8 s: the ending's roc is a speck and never crosses the sun
- **What is wrong.** The far roc is a 25 px lilac bird that flutters at the right edge from 142.9 to 144.6 and leaves; it does not pass the sun disc, and it is the size of the gulls. The feather arrives at 143.5 from the right and Sinbad holds it by 143.9, which works, but the audience cannot connect it to the roc. From 145.0 to the end the frame barely changes.
- **Why it matters.** The feather is the plan's payoff (S5, S6, S22) and the callback to SIND-01's far whale.
- **Fix.** Make the far roc a clean silhouette with the roc's own shape (crest, long tail streamers), wingspan about 150 px on screen, flapping slowly on twos. It enters at the left of the sun at 142.7 ("عجيبة"), crosses the sun disc 143.3-144.3 (the disc dims a little behind it), and glides off to the upper right by 146.5. The feather detaches from it at 143.4 as a tiny fleck, grows as it falls on a slow zigzag, and lands in his raised hands at 144.6, after THE END has come on, so the end hold has an event. The three merchants' heads follow the feather down, staggered; Sinbad looks from the feather up to the bird and raises it as a wave at 145.6. Move THE END 60 px left or up so it never covers the bird's path.

### 5. 127.2-128.07 s: over the rim he lies flat in the air
- **What is wrong.** After a good tiptoe up the shelf (TIP... TOE..., 125.5-127.0) Sinbad stands on the rim at 127.2 and at 127.5-127.8 is a rigid horizontal figure with closed eyes floating above the grass line, not touching anything. It reads as fainting or levitating. The plan's "eaglet that tells" is not visible either: the eagle stares forward and the eaglets do not react.
- **Why it matters.** "وابتعد بهدوء" is the comic and suspenseful end of the escape; it should end on relief.
- **Fix.** At 126.54 ("بهدوء") the eagle's head snaps toward him (`headRot`), he freezes in the one-leg "rock" pose for 0.4 s with only pupils moving, one eaglet tilts its head and cheeps (a small arc of `soundArcs`), the eagle looks back at the meat. At 127.1 he drops to his belly on the rim edge, body tilted along the slope with hands gripping the grass, swings one leg over and slides out of sight behind the rim grass by 127.9 (feet last, a puff of dust). No frame with the body clear of the ground; a contact shadow under him throughout.

### 6. 75.7-92.5 s (and to 127): the valley floor does not glitter and the valley is thin
- **What is wrong.** The diamonds are small pale-lilac chips on pale pink sand; at phone size the floor reads as gravel. The glint run at 77.62 is twelve short sparks and is hardly visible in the stills. The plan's pan across the glittering floor became a pull-out to a wall of bands. For about 50 s (76-127) every shot is the same striped wall with two ledges and a few boulders, so the owner's "full scenes with several layers" is weakest exactly where the story spends most time.
- **Why it matters.** "كانت الأرض تلمع بأحجار الألماس" is the title image of the episode.
- **Fix.** (a) Diamonds: three sizes, the largest about a third of Sinbad's height in clusters of 3 to 5 near the boulders; brilliant white with a hard cyan and a hard pink facet and a dark purple outline so they separate from the sand; four-point star glints on threes that travel left to right across the floor from 77.16 ("الأرض") to 79.9, 3 or 4 lit at any time, each with a small halation. (b) Camera: at 77.16-79.1 pan right across the floor at zoom 0.8 with the floor filling the lower 45% of the panel (near gems large in the foreground, parallax), then pull out for DIAMONDS!. (c) Dress the set once in `diamondValley`: a strip of blue sky and a cloud at the top of the wides, a shaft of sunlight across the wall, a dead tree and thorn bushes, a fallen rock arch or cave mouths in the side walls, old bones of earlier meat joints near the wall (sets up the falling meat), a second eagle circling far up. Keep the rose, ochre and lilac bands; add a cool shadow side so the gorge has depth.

### 7. 78.2-78.8 s: the diamond insert
- **What is wrong.** The insert is a large angular face with rainbow bands across the hair and forehead and two spikes that read as horns; the fingers holding the stone are thin tan lines. It does not look like the Sinbad of the rest of the film, and the prism bands are a tint over the character.
- **Why it matters.** Close-ups are reserved for peaks; this one should be about the stone.
- **Fix.** Make the diamond the subject: the stone about 30% of the panel width at centre, held between a clearly drawn thumb and two fingers (Library hand shapes, skin colour, purple outline), star glint and halation, prism rays fanning out to the background only. Sinbad's face smaller, lower left, in the same model and colours as the wide (round eyes, black hair tufts as in 71-76), mouth 'o', the reflection as two white glints in the eyes. No colour bands over skin or hair.

### 8. 20.1-21.0 s: the HELLO bubble is cut by the tree
- **What is wrong.** The balloon sits behind the tree: only "HELLO" shows, the rest and the tail are hidden by the trunk and crown.
- **Fix.** Draw the balloon after the tree and move it into the sky at the upper left (panel x about 300, y about 250) with the tail to his mouth; full text visible from 20.08 ("أحدًا") to 21.0.

### 9. 46.3-47.9 s: "the sky darkened" barely darkens
- **What is wrong.** On "أظلمت" (46.30) the sky and the egg stay bright; only a lilac patch appears behind Sinbad (46.4-47.4). The big silhouette at 47.9 is strong but comes after "السماء".
- **Why it matters.** The narration names the darkening; it is the suspense beat before the reveal.
- **Fix.** Keep the no-tint rule and do it with plates and shapes: from 46.3 a wing-shaped shadow edge sweeps from the right across the far trees, the egg (its lit side turns to the cool second plate) and the grass, reaching Sinbad at 47.0; the sun disc is covered at 47.28 ("السماء") by the silhouette, which enters the top right at 46.9 instead of 47.4. Sinbad keeps his own colours with the cyan rim, looks at the ground shadow first, then up (eyes, blink, head), feather held still. Birds scatter left at 46.6.

### 10. 48.0-54.9 and 63.0-64.6 s: the roc's wing is a board, and the egg hangs through the nest
- **What is wrong.** (a) The inner wing is a white parallelogram with straight edges and a sharp square corner (48.5, 49.7, 52.0, 64.3); on "جناحاه كالسحابتين" it looks like a plank with feathers stuck on. (b) In every nest shot the egg's lower third hangs below the log ring onto the grass, so the ring reads as a belt of logs around a floating egg, not a nest holding it.
- **Fix.** (a) Round the wing's leading edge and shoulder into three or four cumulus lobes (the same scallop as the belly band) with a hard lilac shade under them, no straight edge longer than a feather; at 51.66-53.4 open both wings once, slowly, tips last, and let two of the series clouds drift behind them at the same scale so the comparison is visible. (b) Draw the rear logs behind the egg and the front logs in front and lower, covering the egg's base; add straw and a few big feathers along the front; the egg's contact shadow falls inside the ring.

### 11. 89.2-92.4 s: the search for a way out is not shown
- **What is wrong.** On "وبحث عن مخرج آمن" Sinbad looks up, walks two steps and sits. The plan's failed climb is missing, so the trap is told only by the earlier tilt.
- **Fix.** At 89.24 he goes to the wall, reaches for the first ledge at 90.1, gets both hands on, feet scrabble (two drawings), slides down at 90.9 ("آمن") with a dust puff and a `landSquash` onto his seat, turban-less hair flopping late; chin in hand by 91.5, when the meat's shadow starts to grow beside him. The blue snake on the ledge opens one eye at the slide.

### 12. 128.07-136.1 s: the rim is a line-up over an empty mound
- **What is wrong.** Sinbad, three traders and the donkey stand shoulder to shoulder at one height in the middle of the frame; the lower 38% is a plain green and ochre mound; at 128.0 Sinbad is already standing among them (after going over the rim at the left a moment before).
- **Fix.** Sinbad's turban-less head rises over the rim at the left at 128.07 ("رآه") while the traders work with their backs half turned (one hauling a joint, one sorting stones on a cloth, the elder with the donkey); they notice one after another (129.16, 129.5, 129.86: the staggered double take and the dropped joint). Stand them at three depths (y offsets of 0, 25 and 50 with matching scale) and put the camp in the foreground: the tent, a rope coil, baskets, the cloth with sorted diamonds, a small fire. Lower the camera about 100 units so feet sit near two thirds of the panel height.

## BLOCKER list
1. 136.1-136.88 s: red striped rectangle over Sinbad (note 1).
2. About 77.2-80.4 s: exposed dark strip under the valley floor (note 2).

## What works and should not be touched
- The beach low point (22.0-25.7): footprints, the tiny striped sail, the head-count inset, the arms coming down.
- The lookout tree and the dome rising over the canopy (27.7-33.9).
- The foot-as-tree-trunk scene (55.0-62.9): the turban unwound, the bow, EASY, BIG BIRD..., the half-open eye cut-in.
- The take-off (63.0-64.9) and the valley landing with the roc bending down to look (68.5-72.0).
- The falling meat with its growing shadow, the tilt up to the throwers, the stuck-diamond insert (92.0-101.0).
- Strapped to the slab and carried up face to camera (111.7-123.2); the snake's head rising beside him.
- The turban put back on crooked on the gangplank (138.4-139.2).

## Reusable techniques for the Library
- **Scale by cropping**: showing only the giant's shank and belly band next to the hero (S8) sells size better than the widest shot; add to the capabilities guide under camera framing.
- **Cut-in circle for a giant's eye** (62.4-62.9) beside the wide, so the wide never has to push in.
- **Growing ground shadow before a falling object** (91.9-93.5) as a surprise set-up.
- **Strapped-to-prop pose inside the prop's transform** (one rotation turns both): worth a helper in `Library/motion.js` after approval.
- **`roc`, `rocEgg`, `giantFeather`, `snake` on a path, `meatSlab`, `diamondValley` with a vertical camera**: candidates for `Library/` after the owner approves (roc after note 10).
- Rule learned: after any camera key below zoom 0.7, check the plate edges on every frame of the move (note 2); and a gift or cloth drawn over a figure must have hands and folds or it reads as a fault (note 1).
