Verdict: REVISE

# AN-083 Ma'an the Son of Zaidah and the Three Girls: Fable review, round 1

Reviewed: `renders/AN-083_v1.mp4` (169.9 s) through all 29 strips of `review/v1_pack/strips/` plus full-size frames in `review/v1_pack/extra/` (16.5, 39.5, 56.5, 73.5, 76.0, 79.6, 83.6, 91.0, 99.6, 114.4, 130.6, 143.2, 157.8, 164.6 s).

## Summary

The story is told in the right order, nothing is missing, there are no broken frames, and the ending is present (THE END 165.2 to 169.9). Subtitles are verbatim-looking, readable and well timed in both languages; the English reads accurately against the Arabic in every chunk. The best passage is the quiver insert (65.7 to 69.9): slow draw, GOLD! burst on the word. The huntsmen's mock-offended fold of the arms at 157.8 also lands.

It needs a v2 because the thing the story is about, the gold, disappears the moment the insert ends, and the two physical exchanges (water, arrows) are staged as overlapping pile-ups. No BLOCKER. Six MAJOR, six MINOR.

## Notes

### 1. 70.0 to 169.9, MAJOR: the golden arrows do not look golden once the girls hold them
What is wrong: in every bundle (clearest at 83.6 and 164.6) the arrows are held point-down-looking: a big red fan of fletching at the bottom, a small white comb at the top, a brown shaft. There is no yellow anywhere. They read as red brooms or feather dusters. The single raised arrow at 95.2 to 100.0 hides its head inside the glow, so that does not show gold either.
Why it matters: "thirty precious arrows", "the arrows carry gold", "the golden arrows stayed with them" and the whole recognition depend on the audience seeing gold in the girls' hands for the last 100 seconds.
Fix: draw `arrowBundle` heads-up: the heads fanned ABOVE the holding hand, each head flat process yellow `#ffd21f` with the black outline and white facet, at least 22 px wide on screen in the group shots (enlarge the head relative to the shaft if needed, comic exaggeration is fine). Fletching small and at the bottom, below the hand. Keep a slow `goldGlow` star glint cycling across the three bundles (one glint every 2 to 3 s, never on two girls at once) from 76.7 to the end. Same for the single arrow at 95.2: head clearly outside and above the glow disc.

### 2. 70.6 to 78.7, MAJOR: the giving of ten arrows each is an unreadable knot
What is wrong: Ma'an walks in front of the girls and stands on top of them (73.5: he covers girl2 completely; 76.0: he covers girl2 and half of girl3). No hand-to-hand transfer can be seen; bundles simply exist on the next girl. The counter 10, 20, 30 is the only thing telling the beat.
Why it matters: this is the climax of the plot (the gift) and the plan asked for "down the line".
Fix: keep Ma'an to the LEFT of the line and bring each girl to him, or keep the girls at 1430 / 1560 / 1690 (130 px apart at least) and stop Ma'an in the gap to the left of each girl, never overlapping a body. Each handover: his arm extends with a bundle (`reachBoth` or `pointFwd` carrying it), her two hands come up, bundle lerps across a visible gap of 40 px, her hands dip (`settleTo`), counter ticks on that frame: girl1 on "عشرة" 72.16, girl2 at 74.2, girl3 on "ثلاثين" 76.72. Camera: `twoShot(Ma'an, current girl)` at zoom about 1.7 for the first handover, then widen to hold all three for 20 and 30. Then the upside-down empty quiver and grin (planned, not visible in v1) at 77.6 to 78.8 with man2's forehead slap.

### 3. 38.2 to 44.4, MAJOR: the drinking shot piles five figures into the left edge
What is wrong: girl2 and girl3 cross in front of Ma'an to the men; at 39.5 to 43.7 Ma'an, both men and two girls are stacked on the left 45 percent of the frame with three waterskins covering faces, girl3 cut by the frame edge, and girl1 alone smiling at camera on the right. Ma'an's face, the subject of "شرب معن حتى ذهب عطشه", is hidden behind the skin for 4 s.
Why it matters: relief is the first emotional payoff and the plan's "he grows taller as the skin shrinks" cannot be seen.
Fix: 40.0 to 44.0 becomes a close two-shot of Ma'an and girl1 only (zoom about 2.0, Ma'an centre-left). Skin held to the side of the mouth in 3/4 so eyes stay visible: eyes shut (`lid` 1) while gulping, three gulp bobs (`sq` 0.97 to 1.02), the skin's `fill` 1 to 0.2, then on "عطشه" 43.14 lower the skin, eyes open, big breath out (`sq` 1.04, shoulders drop), smile, one water drop off the moustache. The men drinking moves to a single wider beat at 44.0 to 44.8 behind him (man2 splashing his face), with girl2 and girl3 handing skins across WITHOUT walking through anyone: men step right to them instead.

### 4. 107.9 to 144.1, MAJOR: verse insets are small, collide with the sun, and sit over a static line-up
What is wrong: (a) every inset overlaps the sun disc (111.0 to 121.5, 124.5 to 135.0, 137.2 to 144.0); (b) inset figures are about 75 px tall on a 1080 px wide screen, FRIEND / FOE lettering about 20 px, the arrow, bread and coin are specks; (c) the inset is empty for about 1 s at 124.5 to 125.4 and 137.2 to 138.0, and verse 2 holds one lone figure 125.5 to 128.0; (d) under the inset the six characters stand in one row facing camera, and the bottom 38 percent of the panel is bare sand for all 36 s.
Why it matters: this is a fifth of the film and it is the passage the plan itself flagged as at risk.
Fix: hide the sun while an inset is open (fade its alpha to 0 over 0.3 s, or move the inset centre to panel x 600, y 330 and the sun out of frame by camera). Raise inset radius from 230 to about 300 world units and draw the verse figures at s 0.8 so heads are at least 60 px on screen; props (golden arrow, bread, coin, bandage) at 2x. Lower and tighten the group: camera so feet are at about 85 percent of panel height, zoom about 1.45, reciter one step forward and 20 px lower than the others, the two other girls turned to her (`gaze` toward her), the men grouped left as listeners. Start each verse picture already populated as the iris opens. Verse 2: friend enters on "للأصدقاء" 128.88, foe on "والأعداء" 130.22 (already right), but add the foe's scowl melting to surprise and a cupped-hands catch by 131.0, which v1 does not show legibly.

### 5. 0.0 to 169.9 (worst at 20.2 to 28.9, 92.5 to 97.7, 150.7 to 158.2), MAJOR: wide shots leave the bottom 35 to 40 percent of the panel as empty sand and the cast as a police line-up
What is wrong: the ground line sits at about 55 to 60 percent of panel height in every wide shot; figures are 150 to 190 px tall with nothing below them. All six stand evenly spaced, shoulder to shoulder, facing camera, in almost every shot from 44.5 on.
Why it matters: on a phone the actors are small and the acting (most of the plan's section 3) is invisible; nothing separates one shot from the next.
Fix: for every hold longer than 2 s set camera y so feet land at 82 to 88 percent of panel height and zoom so the tallest head is at least 110 px on screen (zoom 1.4 or more for six figures, 1.8 to 2.2 for two-shots). Break the row: men as a tight cluster (man2 half behind man1, 12 px higher y for depth), a clear 120 px gap, then the girls with girl3 half behind girl2 as planned. Use `gaze` so people look at who is acting, not at the lens. Keep true wides only for 0 to 6 s, the dune reveal at 23.6, and the final pull-out.

### 6. 80.2 to 89.9, MAJOR: "looked at the arrows in amazement" plays as three girls smiling at the camera
What is wrong: 80.2 to 85.2 the girls hold the same pose, eyes forward, smiles; one glint and one open mouth on girl3 at 83.5 to 84.5. Nobody looks at an arrow. The huddle at 85.5 to 89.9 is a slight lean.
Why it matters: this is the turn from gift to recognition; the audience must see them examine the gold before girl1 works it out.
Fix: push in to zoom about 2.0 on the three. On "نظرت" 80.24 all eyes drop to the bundles (`gaze` down, staggered 3 frames); 81.6 girl2 lifts one arrow to eye level and tilts it, yellow light patch on her face; 82.6 girl1 flicks a head with a fingernail (small `soundArcs`); on "بدهشة" 84.04 a shared slow look at each other, brows up, mouths open, `noBlink` 84.0 to 84.9; 85.44 girl1 inhales (`sq` 1.03) and pulls the other two in by the shoulders, heads together; girl3 on tiptoe. Point at Ma'an on "إلا" 89.84.

### 7. 162.0 to 169.9, MINOR: the ending is a static two-group line-up under a noon sun in a dusk sky
What is wrong: the men stand front-facing at the left, same size as the girls, for the whole hold (they drift a few pixels and man2 is cut by the frame edge at 169.5). The sky warms but the sun stays high and bright yellow. The planned "men small and leaving" and last stumble do not read.
Why it matters: the last image should say "they parted"; this one says "everyone is waiting".
Fix: from 162.4 ("ذكرى") the men walk away left and up the mid dune with `walk()` + `footfalls()`, scaling from 1.0 to 0.55 and y rising about 60 px by 166.0, Ma'an last, turning once at 164.4 for a final wave; man2's stumble at 165.0 in the gap after the last word. Sun lowered to just above the far dune and tinted orange (`skyCycle` u about 0.45). Girls in the right foreground at s 1.15, backs not possible, so 3/4 gaze left toward the men, girl3 tucking the arrow behind her ear at 162.4, bundles glinting. THE END stays where it is.

### 8. 54.5 to 59.4, MINOR: the "no money" gag is too small to read
What is wrong: man1 lifts a small red-brown shape to his face at 55.7 to 57.2 (56.5 full size: it reads as a clay pot); nothing falls out; man2's shrug with the bow is a few pixels of arm. NO COINS! is red on blue beside the sun.
Fix: two-shot on the men at zoom about 2.0 from 54.5. Purse drawn as a drawstring pouch with a yellow cord, held high and turned upside down on "لم" 55.70, shaken twice, one moth or a puff of dust falls (no coin), man1 peers into it with one eye (`wink`). man2 on "نقودًا" 57.36: `armsOut` shrug holding the bow up, 4 frames late. Lettering NO COINS! in yellow box style (same as MA'AN BIN ZAIDAH!), centred above their heads, at least 44 px.

### 9. 16.2 to 17.3 and 12.0 to 19.6, MINOR: NO WATER! collides with the sun and palm; the search is small
What is wrong: at 16.5 the red lettering sits on top of the sun disc and its ring, with the palm trunk and a frond cutting the same corner; red on yellow on blue is hard to read. The drop that misses, the shake by the ear and the peer inside are all at about zoom 1.3 with the skins as 40 px blobs.
Fix: lettering to the clear sky right of centre (panel x about 620, y 300), yellow box style, 0.9 s minimum. Zoom to about 2.0 on Ma'an and man1 for 12.0 to 19.6 with feet near the panel bottom; the single drop drawn as a 14 px blue teardrop with a white highlight that falls past the open mouth into the sand with a tiny dust ring at 11.6.

### 10. 78.9 to 80.1 and 156.2 to 158.2, MINOR: icon beats
What is wrong: the coin-crossed and arrow-ticked icons at 79.0 to 80.1 are single 34 px discs shown one after the other for 0.5 s each: unreadable, and "instead of money" is lost. At 156.2 to 158.2 the robe icon touches the sun's rays, and the red cross on the attendants icon appears at 158.0, 0.2 s before the cut.
Fix: 79.0 ("بدل"): both icons side by side, 90 px discs, centred in the sky: coin with a red cross on the left, golden arrow with a green tick on the right, held to 80.2. At 156 to 158: shift the three-icon row right so the first clears the sun by 40 px (or hide the sun), cross on the robe on "ثيابه" 156.44, cross on the attendants on "مرافقيه" 157.54 (not 158.0), and hold the full row until 158.5 before the cut.

### 11. 90.5 to 92.0, MINOR: Ma'an's "caught" reaction is weak
What is wrong: on his name he raises a hand toward his headcloth and half closes his eyes (91.0); no look to camera, no hush finger, and the girls beside him are already smiling rather than gasping. The label's left end touches the sun rays.
Fix: after the whip lands (90.56), 4 frames frozen wide-eyed (`noBlink`), then eyes slide to camera, small guilty smile, `PERSON_HANDS.hush` on "زائدة" 91.4. Girl2 and girl3 gasp (`mouthCover`, `cheeks`) staggered 3 and 6 frames. Move the label 60 px right.

### 12. 66.9 to 69.0, MINOR: the gold head is visible two seconds before the reveal and is pale
What is wrong: the arrowhead clears the rim at 67.0 as a small cream-white point and hangs there until the burst at 69.0, so the GOLD! burst reveals nothing new.
Fix: keep the head inside the quiver until 68.7 (shaft rising slowly 66.2 to 68.7, a hesitation at 67.8), 6 frames of stillness, then the head clears the rim with the burst on "الذهب" 69.22. Head drawn 2x larger in this insert, saturated `#ffd21f` with a white facet.

## Reusable techniques for the Library

- The quiver insert (plain paper-gradient background, one arm entering from the frame edge, one prop, radial burst on the cue word) is a clean "reveal insert" pattern worth a template helper.
- A rule for `inset circle`: the scene must hide or move the sun and any lettering inside the inset's bounding box while it is open; minimum on-screen head size 60 px inside an inset.
- `arrowBundle` should take an `up: true` option (heads fanned at the top, coloured heads) so the valuable end is the visible end.

Second review advice: yes. Notes 1 to 6 change staging, camera and a prop drawing across more than half the running time (the two handovers, the 36 s of verses, and framing throughout), so a second Fable review of v2 is warranted to confirm the gold reads in the group shots, the handovers no longer overlap, and the tighter framing has not cropped lettering or pushed insets off the panel.
