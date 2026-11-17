Verdict: REVISE

# AN-040 The Cat and the Crow: Fable review, round 1

Reviewed: `renders/AN-040_v1.mp4` (167.1 s), all 28 strips of `review/v1_pack/strips/`, plus full-size frames in `review/v1_pack/extra/` (montages `m1.jpg` to `m10.jpg`).

## Summary

The story is told in the right order, every narrated event is on screen, the subtitles are verbatim, large and readable, and THE END holds for about 2.8 s. The first minute works well: the leopard's slow reveal, the crow's escape to the branch, the tilt down that leaves the cat alone. The crow's close-up thinking shot (60 to 63.7) and the galloping close-up (114.2 to 119) are the best pictures in the film.

It needs a v2 because the second half loses its three most important pictures to framing: the pack is cropped out of its own climax, the crow is off the edge of the frame during the hops that are the whole trick, and the trap diagram shows the opposite of what the narrator says. None of these needs new drawings. They are camera keys, a few position keys and draw order. No BLOCKER.

Geography used below (as rendered): forest and trunk on the LEFT, cat spot and bush to the RIGHT of the trunk, pasture far RIGHT. Camera keys are the `CK` rows `[t, x, y, zoom]` in `src/an40_main.js`.

## Notes

### 1. 126.8 to 140.0, MAJOR: the pack is cropped out of the climax
**What is wrong.** From the push-in at 126.9 the frame is leopard plus one dog. Dog 2 is a sliver and dog 3 is outside the right border through 127.0 to 132.5 and again 136.5 to 140.0. The lettering goes with them: the crow thought bubbles at 130.0 to 130.4 are cut by the border, the `DOGS 1 2 3` counter at 138.6 to 139.7 shows `1` and half of `2` and never a `3`, and `THE CAT` (128.7 to 130.0) sits on the bare ground pointing at nothing because the cat's eyes are hidden behind the leopard's forelegs.
**Why it matters.** The narrator says the leopard feared "the many dogs" (137.36 to 140.02). The picture shows one dog. The counter is supposed to prove the point and instead counts to two.
**Fix.**
- 126.84 (رأت): reframe so the leopard's head is at about 25% of the panel width and all three dog heads are inside the right 45%. Either lower the zoom to about 0.8 of the current value or shift the camera x right by roughly 220 world units. Keep it until 133.1.
- 130.40 (نسيت): the three crow bubbles pop above three visible heads, one after another, 0.12 s apart (`stagger(i)`).
- 133.12 (واندفعت): stay at this medium size for the charge instead of cutting to the far wide of 133.2 to 136.4, where the dogs are about 60 px tall and overlap into one shape. Space the dogs at least 90 units apart and stagger their heights by 8 to 12 units so three silhouettes read.
- 136.74 to 140.0: same framing rule, three dogs in shot. Put the counter fully inside the panel (right edge at least 40 px from the border), let it reach `3` on 139.30 (الكثيرة), then the `3 V 1` card.
- Move `THE CAT` to a label with an arrow pointing at the eyes in the bush, and place the eyes in the upper left of the bush, clear of the leopard's legs.

### 2. 84.1 to 94.5, MAJOR: the hops are played at the edge of the frame
**What is wrong.** After the first hop the crow lands on the left border and is cut in half (85.7 to 88.2), with the red flag marker drawn over its body. At 86.5 dog 1 still faces right, away from the crow. For hops 2 and 3 the crow is outside the frame or a few pixels of tail for most of 91.5 to 94.5. What the viewer sees for ten seconds is two dogs standing in profile and a counter changing.
**Why it matters.** "It flew a short distance away and returned / each time they approached, it flew ahead again" is the plan itself, and the only comic sequence in the film. The tease has to be seen: crow close, dogs lunge, crow gone, crow waiting.
**Fix.**
- Make the camera follow the crow, not the dogs: for each hop, key the camera x to the crow's landing spot about 0.25 s before it lands, so the crow lands at 30 to 35% of the panel width with empty ground to its left and dog 1 arriving at 60 to 70%.
- Hop 1 (85.10 يبتعد): dog 1 turns its head on the crow's take-off and its body by 85.8 (`turnFlip`); it never shows its back to the bird.
- 86.7 to 88.3: the crow, in clear view, looks back over its shoulder (`headRot`), shakes its tail, waits. 88.36 (يعود): the loop back over the dogs' heads, which duck or snap upward.
- Hops 2 and 3 (91.42 طار, 92.98 مرة): same pattern, each landing inside the frame. The feather on dog 1's nose at 92.2 needs a 0.4 s hold and a sneeze to read.
- Plant each flag only after the crow has left the spot, and draw it at about 60% of its present size.

### 3. 46.7 to 53.5, MAJOR: the trap diagram contradicts the narration
**What is wrong.** The narrator says "the leopard was closer to him than the tree trunk was". On screen the trunk stands between the leopard and the cat, so the trunk is plainly closer to the cat than the leopard is. The bars compare something else (leopard to trunk `2 STEPS`, cat to trunk `6 STEPS`) and are short dashes that do not span the gaps they name.
**Why it matters.** This is the one sentence that explains why the cat cannot simply climb. The picture should make a child say "he would have to run past the leopard".
**Fix.**
- Let the stalk carry the leopard past the trunk during 41.3 to 46.6: `LX` keys so that by 46.67 its nose is about 170 to 190 units from the cat, on the cat's side of the big trunk (two more held paw steps, on 43.50 and 44.90, fit the existing style).
- 46.98 (النمر) / 47.46 (أقرب): yellow bar on the ground line from the leopard's nose to the cat, `2 STEPS`. 48.96 (جذع): red bar from the cat to the trunk, passing under the leopard, `5 STEPS`. Each bar spans the real gap; label centred under its bar.
- 50.56 to 52.78: the thought cloud already works (cat runs for the trunk, leopard is there, red X). Keep it, with the small leopard standing in the cat's path.
- Follow-on: at 58.5 to 59.9 the leopard then enters the two-shot from the left as a full head and shoulder, not as a peek from behind the trunk.

### 4. 53.2 to 59.9 and 144.7 to 155.5, MAJOR: a background tree sits exactly behind the cat's head
**What is wrong.** At the cat's bush position a round background tree of the same size as the head is directly behind it (trunk visible below the chin). In every frame of the call for help and the thank-you the cat appears to wear a dark green ball (see `extra/m3.jpg`, `extra/f_152.0.png`). In the same shots the cat's hindquarters are clipped inside the bush, so at 149 to 155 "the cat emerged" shows half a cat.
**Why it matters.** These are the two emotional peaks (HELP! and the head bump). The white head needs a clean blue-sky or paper silhouette.
**Fix.**
- Remove or move the background round trees within about 120 units of the cat's head at this spot (or shift the cat spot 80 to 100 units left), so the head is against sky.
- 54.92 (رأسه): the head lift should be visible as a shape: `headRot` about -0.6 with the neck stretched and one forepaw up by 57.72 (طالبًا). At present only the pupil moves.
- 57.04 (الغراب): the crow's answer is missing at this size. Give it the planned beat: lean out (`tip` 0.12), look cat / leopard / cat, half open the wings and fold them again.
- 146.18 onward: bring the cat fully out of the bush (whole body clear by 147.96), then the crow lands at 149.4.

### 5. 58.5 to 59.9, 104.7 to 106.7, 122.4, MAJOR: the cat's hiding is never shown and the inset is unreadable
**What is wrong.** At 59.9 the cat stands in the open beside the bush. At 122.5 it is two eyes inside the bush, and the leopard, which was last seen to the LEFT of the cat, is now to the RIGHT of the bush facing left. The only bridge is the round inset at 104.7 to 106.7, which at phone size is a green disc with half an eye on its rim and a yellow corner (see `extra/m6.jpg`).
**Why it matters.** The cross-cut is the clock of the chase. If the viewer cannot tell that the cat is hidden and the leopard is searching, the dogs' arrival has no urgency.
**Fix.**
- 59.2 to 59.9 (after المساعدة ends at 59.59): the cat backs into the bush, tail last, leaves shake, two eyes open inside. Hold 0.2 s before the cut to the crow.
- Inset 104.7 to 107.1: radius about 150 (not 75), its own camera centred on the bush so both eyes sit in the middle, bush shivering. 105.14: the leopard's shadow slides across the bush from the left. 106.12: its nose and one paw enter and it walks past the front of the bush to the right, sniffing. This also explains where it stands at 122.4.
- 122.4 to 123.0 (the pause): open S13 wide enough to show the trunk on the left edge, so "reached the tree" (125.28) has a tree in the picture.

### 6. 94.6 to 100.5, MAJOR: the pull-out shows neither the plan nor the empty post
**What is wrong.** The pull-out goes so wide that the dogs are 40 px tall and the crow is invisible. `NO GUARDS` (97.5 to 98.6) hangs over empty sky with no flock, post or shepherd in the frame, and `HEY!` overlaps it from no visible speaker. `HOP 3` stays up to 99.0, five seconds after the last hop.
**Why it matters.** "It made the dogs leave their place" needs both ends in one picture: the flock left behind on the right, the dogs following the crow to the left.
**Fix.** Pull out only far enough to hold the three dogs (left third), the dotted hop trail, and at the right edge the sheep with one shepherd. 97.54 (مكانها): `NO GUARDS` with an arrow down at the sheep; one sheep looks around. 98.16: the shepherd raises his stick, `HEY!` beside his head, not on the other label. Fade the hop counter at 94.6. The crow stays visible at the left as a clear black shape with a dotted lead line.

### 7. 157.5 to 167.1, MAJOR: the dogs run through the friends, and the final picture is too small
**What is wrong.** The three dogs trot home on the same ground line as the cat and crow and pass straight through them (158.5 to 160.0, see `extra/m10.jpg` right). The camera then pans left for `FAR AWAY` (161.2 to 163.2), which puts the cat on the right border and the crow out of frame, and the arrow points at dark trunks where no eyes can be seen. The last picture holds the cat as a 30 px white dash under THE END.
**Why it matters.** The plan's ending is "the last picture repeats the first". The first picture is a close two-shot. The last should be recognisably the same picture.
**Fix.**
- Dogs: pass in the foreground band (feet about 60 units below the friends' ground line, scale 1.25), or behind them at scale 0.8. No overlap with the cat or crow. 158.76: dog 3 slows, tilts its head at the crow, trots on. The cat's ears and the crow's head follow them.
- Leopard: keep the wide but do not pan the friends out of it. Two clearly visible yellow eyes (`peekEyes`, at least 14 px each on screen) between the dark trunks at 161.04, the crow's `CAW!` at 161.98, the eyes blink out at 162.42 with `FAR AWAY`.
- 163.2 to 164.3: slow push-in to the opening framing of 0.0 to 3.0 (cat and crow filling the middle third), both settled. THE END sits over that.

### 8. 1.8 to 3.0, MINOR: the opening head bump does not touch
**What is wrong.** On صديقين the cat sits upright with closed eyes and the crow stands a body length away. A heart appears between them. The payoff at 151.4 is a real nose to beak touch.
**Why it matters.** The plan's emotional structure is setup and payoff of the same gesture. The setup has to be the gesture.
**Fix.** 1.84: the cat lowers its head and shoulders to the crow (`headRot` about 0.5, `sq` 0.94), the crow takes one hop in and stretches up, contact held 0.5 s, heart above the contact point, then both settle. Use the same contact pose at 151.40, held twice as long (already the plan).

### 9. 8.5 to 12.7 and 20.7 to 34.2, MINOR: the crow is on or over the right border in the wide shots
**What is wrong.** In the forest-edge wide the crow stands on the right border, half cropped (8.5 to 11.5, 28.5 to 34.0). Its take-off on يطير (11.18) happens there and is not seen. The bird is simply gone at 11.7 and back at 12.7.
**Why it matters.** "The crow flew off to find food" is the crow's introduction as the one who can fly, which is what saves the cat later.
**Fix.** Shift these wide camera keys about 130 units right (the dark forest on the left can lose that much) so the bush and crow are inside the frame with 60 px of margin. 11.18: crouch (`anticipate`), take-off with a stretch, exit up and right across open sky by 11.9. 12.60: return with the worm. The `FOOD!` label currently covers the cat's head (13.7 to 14.3): move it above the crow.

### 10. 70.7 to 71.3, MINOR: the idea bulb covers the crow's face
**What is wrong.** In the round inset the bulb and its grey base are drawn on the crow's eye (see `extra/m10.jpg`, second crop). At 71.2 the inset jumps to triple size over the dogs for a few frames.
**Fix.** Draw the bulb above the head, inside the circle (shrink the crow about 15% in the inset to make room), on 70.72. Let the inset leave by shrinking or sliding out, not by growing over the dogs.

### 11. 25.4 to 27.2 and 37.8 to 53.0, MINOR: two drawings that read as mistakes
- **Leopard behind the trunks (25.4 to 27.2).** The body to the left of the trunk is a grey block with a lighter hard-edged horizontal band across it, and a paw shows below the ground line under the trunk (`extra/m10.jpg`, first crop). Use one uniform shadow tint for the part in the forest, no band, and clip the paws at the ground.
- **Puffed cat (37.8 to 53.0).** The scalloped white puff with the long upright tail reads as a sheep, and real white sheep arrive at 64. Make the puff spiky (pointed tufts, not scallops), keep `arch`, flatten the ears. If the cat palette allows, an orange tail tip and ear patches (the plan's "white/orange") would separate him from the sheep and from white dog 2 for the whole film.

### 12. Lettering polish, MINOR
- 69.0 to 69.3: `WOOF!` is cut by the left border and reads `WOW!`. Move it 120 px into the panel.
- 66.5: the `SHEEP` label pops from a 10 px speck. Start it at 60% scale at least. `SHEPHERDS` and `SHEEP` need an arrow to their subject (the row is crowded: dogs, shepherds and sheep overlap in one line; separate the dogs from the flock by 150 units).
- 33.2 to 34.0: `LUNCH?` overlaps the sleeping cat's `Zzz`. Lift it 60 px.
- 109.7 to 110.6: `LOW` with its arrow is good, but sits on the horizon tree. Place it in clear sky above the crow.

## Subtitles (for the coordinator, no change requested from the animator)
Arabic matches the word list and is large and well placed. English is accurate, readable in two lines at most, and its timing follows the Arabic chunks. Two small things, which this review does not ask anyone to change: the crow and cat are "it" up to 121.8 and "he / him" at 149.96, and the chunk at 144.92 ("...the cat emerged") has no full stop.

## Reusable techniques for the Library
- **Lead-room follow for a lure.** Camera keys on the bait's next landing spot, 0.25 s ahead, bait at one third and pursuer at two thirds. Useful for any chase-by-teasing (`leadFollow` could take a `lead` option).
- **Head-clearance check.** A small helper or checklist item: no background round tree within one head radius of a principal's head at a held position. The green ball behind the cat is the kind of tangent a still check catches.
- **Measured bars.** A `gapBar(a, b, label)` primitive that draws a bar on the ground line between two world x positions, so distance diagrams always span the real gap.
- **Inset minimum.** Round insets need a radius of at least 140 px on screen and their subject centred, or they read as a coloured disc.

Second review advice: Yes. Notes 1 to 7 re-stage roughly 60 s of the film (the hops, the trap diagram, the inset, the climax and the ending), with new camera keys and changed leopard positions that can easily introduce new crops or overlaps. A second Fable review of v2, limited to 41 to 60 s, 84 to 107 s and 122 to 167 s, is warranted before the final render.
