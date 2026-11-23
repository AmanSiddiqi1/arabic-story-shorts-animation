# HORSE-05 "The Rescue in the Sky": Fable review, round 1 (v1, 148.5 s)

**Verdict: REVISE** (one focused pass; no blockers).

Reviewed from the v1 review pack (25 strips, 4 frames per second) plus nine full-size frames taken from `HORSE-05_v1.mp4`. Not checked: sound, and motion between the sampled frames (walk cycles and on-twos timing are judged from stills 0.25 s apart).

What already works and must be kept: bright varied colour with no tint over the cast, English balloons, full sets, the knob and lever inserts (the hand shows on the control in both), the whisper two-shot with its two palace pictures, the three testimony cards, the dome circle with the gold ring, the river run between the two towers, the landing and embrace, the city-gate welcome, the garden lesson, and a clear THE END (144.3 to 148.5) over the two riders and a gold ring. Subtitles are readable throughout.

The revision is needed because four things hurt the story or the owner's points: the inventor and the king are hidden behind guards in their own beats, the first peak (the reveal) plays too small, the princess's veil covers Firuz's face in every flight shot including the final image, and the opening hand is not at the knob.

## Blockers
None.

## Notes (most important first)

1. **15.2-24.9 (S3) and 62.8-67.4 (S7): the inventor is hidden in his own beats.**
   From 18.7 to 21.2 guard D stands in front of him; the frame at 19.6 shows only two guards and WAIT!, with no inventor and no stretching hand. In S7 he cannot be seen walking to or through the court gate, and no eyes show at the grille (66.8). The viewer loses who is stopped and where he ends up, which is the judgment of the whole series.
   Fix S3: put guards C and D behind him in draw order, or move them half a figure to either side (C about 2290, D about 2450), so he is in front at 2305 on tiptoe. The reaching arm must show at التقدم 17.64. The two spear shafts cross in front of his chest at لكن 18.64, with his face visible between them. Point the WAIT! tail at a guard.
   Fix S7: walk him in clear profile across open paving between وحفظه 62.82 and الساحة 63.98, with one guard behind him and none in front. After the leaves shut, draw two large eye whites in the grille (each at least 10 px at film scale) from المحاكمة 65.40, and let them follow the gold ring at 84.7. Move the peacock away from the gate during this beat; its green fan at 65.7-67.2 sits where he should be read.

2. **37.3-42.0 (S5): the reveal, the first peak, is too small.**
   At 37.5-39.0 the camera is at its widest: Firuz and the princess are about 12% of panel height, the lower 40% is empty paving, and the thrown cloak is a brown patch on a helmet at the left edge. The cap, cloak and crown change cannot be read.
   Fix: keep the impact flash at فكشف 37.32 but hold a framing of zoom about 1.3 centred on about x 2000 (Firuz at roughly 30% of panel height, ground at panel y 1030-1070). The cloak should arc up and left inside the frame over 37.3-38.2. The crown comes up from the toolbox in his hand at اسمه 38.54. Then pan right along his pointing arm at وأشار 39.12 to the inventor, who needs to be in front of the guards (note 1) so the scrap against the torn turban tail is visible at المخترع 40.32. Go wide only if needed after 43.2.

3. **86.9-100.3, 142.1-148.5 (S11, S12, S19): the princess's veil covers Firuz's face.**
   Her white veil streams back across his mouth and cheek in every cruising frame (clear at 88.0, 97.4 and 143.6). The hero is half masked for the homecoming and in the final image under THE END.
   Fix: in the two-rider flight rig, draw her veil tail behind Firuz's head (before his head in draw order), or shorten and lower it to pass under his chin line onto his shoulder. Check stills at 88.0, 93.5, 99.0, 143.6 and 147.0. The red cape streaming behind him is good; keep it.

4. **0.0-0.6 (S1): opening hand and continuity with HORSE-04's new last frame.**
   At 0.25 the craftsman stands right of the horse's head with both arms hanging; no hand is at the knob. This is the known fault (world-space `handRW` ignored when a default hand is set, and a hand at head height drawn behind the head).
   Fix: apply HORSE-04's fix and match its last frame exactly (`Animations/HORSE-04/review/revision_1.md`, "Continuity for HORSE-05"). Craftsman at x 2060 (not 2030), y 935, dir -1, right hand at the knob via `handRW = [knob.x + 16, knob.y + 4]`, length-clamped so the hand shows in front of his head at about (2005, 745). Crimson corner on his right hip. Toolbox at (2108, 944). Inventor at 2375 with a hand at the turban tail, guards C 2330 and D 2420, captain 2282, king seated at 2230 with chin on fist, guards A 1600 and B 1660. The camera start (1975, zoom 1.1) already matches. He takes the hand off the knob at فيروز 0.58, then steps to 2030 if the later staging needs it.
   Where else the fault may show (not confirmed from the strips, check stills): the knuckle rap at الحصان 59.84, the rope tug at والحبال 72.72, the father's hand on Firuz's shoulder in S15, the hands on hearts at اتفقنا 31.24 (not readable in the strips), and the embrace arms at أهلها 108.46.

5. **4.0-10.2, 15.2-24.9, 43.2-67.4: the far king is covered by guards and poles.**
   Through most of the square his face is cut by a spear shaft, the pavilion pole or a guard's helmet (4.2-6.7, 19.6, 66.8). His acting carries the judgment: nearly off the bench at 35.08, standing at 43.24, the scale hands at 44.90, the slow palm at فأمر 50.44, HOLD HIM FOR THE JUDGE at يوقفوا 52.42 and the smile at ثم 56.74.
   Fix: keep the captain and guards C and D out of the span between the king and the camera (captain behind the bench at about 2300, s 0.9). Tilt held spears away from his face. When he stands at 43.24, step him forward to about 2180 into clear paving, in front of every guard in draw order. From 43.5 to 56 the clump (Firuz, princess, king, inventor, three guards) spans barely a third of the panel: spread it, with Firuz and princess at 1960-2040, king 2180, inventor group 2330-2440, at a framing that holds all of it.

6. **66.4-67.2 (S7): CLANK! is cut by the right edge of the panel.**
   Only "CLAN" shows at 66.5 and "CLANK" touches the frame at 66.8. Lettering must sit inside the panel.
   Fix: place it up and left of the gate (centre no further right than panel x 800), or let the camera finish its pan so the gate sits at about 60% of panel width.

7. **97.2-97.6 (S12): a front cloud covers the riders.**
   At 97.5 the rig is hidden except for the horse's legs, breaking the series rule that front clouds never pass over the cast, and at the moment she is flying it herself.
   Fix: route that cloud below the hooves or behind the rig. At حين 96.56 show the nose-down attitude of the rig, with Firuz's two hands clearly raised above his head as a clean silhouette against sky at بنفسها 95.70 (not readable now).

8. **86.9-94.7 (S11): seven seconds of one held picture.**
   The rig sits at one spot and one size while the fields scroll; the only changes are the mountain line and two balloons. The lower edge of the land fades to a pale band (88-94), which reads as an unfinished plate. The rivers are hairlines.
   Fix: drift the rig with `flow` (rise and sink about 25 px, a slight bank on the turn of a phrase). Have the princess point ahead at ظهرت 90.90 and Firuz lean to look. Send the swallows across in front at about 89.6. Widen two or three river bands to 8-10 px with a glint at والأنهار 89.00. Run the field tile to the bottom of the panel or put a deliberate cloud deck there with a clean edge.

9. **142.1-148.5 (S19): the final picture shows a plate end.**
   The mountain layer stops short of the right edge of the panel and tapers to a point (visible at 143.6 and all through THE END), and her rose palace on the right horizon is a few pixels. It is the last image of five films.
   Fix: extend the mountain strip past both panel edges for the whole push-in. Enlarge her palace to about 60 px wide so the picture reads as two palaces joined by the gold river. Keep the counters 1 and 2, the gold ring and the waves.

10. **133.4-136.4 (S17): riders at the city gate.**
    From about 133.5 the two horses hold the same place against the wall while their leg poses still change between samples, which suggests a walk cycle running on the spot. Check in the player.
    Fix: bring them to a halt with `footfalls` by بعد 133.44 (planted hooves, a head toss, a tail swish as the moving hold). Her wave back at أهلها 135.12 should be a raised arm clear of her veil. The wooden horse on the cart with the cat never reads in the strips (the escort pass at 129.7-131.0 shows camel and guards only): give the cart a clear second on screen at وحاشيتها 129.96, or hold it in frame at the gate for the child's knock at بفرح 135.80.

11. **110.8-121.7 (S15): Firuz's promise is a line-up, and the cat hides his legs.**
    Five figures stand shoulder to shoulder for eleven seconds with the cat drawn over Firuz's shins throughout. The thanks (hand on heart, شكر 110.84), the raised hand (ووعد 116.84) and the father's nod (بلاده 119.36) are hard to tell apart.
    Fix: move the cat to the princess's far side or onto the bench. Open a gap so Firuz turns to face the princess for the thanks, then turns to face the father for the promise with the raised hand clear against the sky. The father's hand lands on his shoulder at 119.36 (see note 4 for the hand layer). Stagger the reactions so nobody moves on the same frame.

12. **Polish.**
    (a) 100.3-104.7: the rig's reflection is mostly below the panel edge; raise the mirror line about 60 px so the wobbling bands read.
    (b) 36.0-37.0: the TELL THE KING THE WHOLE TRUTH. balloon sits on the horse's head and knob; lift it into the wall band.
    (c) 70.5-74.2: the checklist holds one pose for nearly 4 s; add a head turn between the two riders on each tick (المقابض 71.86, والحبال 72.72) and the rope tug as a visible pull.
    (d) 76.2-81.5: at the wide lift-off the king's leap (الملك 79.40) and the guard who sits down (والحراس 79.94) are a few pixels; start the crane at zoom about 0.85 and reach the widest view only at ثم 81.78.
    (e) The lawn at the left of the square meets the paving in a hard vertical line (0-3 s, 76-86 s) that looks like a plate edge; add a stone kerb or a row of shrubs along it.

## Owner direction check
- Wide views and pans: met; only the reveal is too wide for its moment (note 2).
- Full scenes: met. The S17 sky is acceptable with its clouds, bird and palms. The S11 land needs its lower edge (note 8).
- Varied bright colour, no tint: met; golden hour and sunset are separate paintings.
- English bubbles inside the panel: met except CLANK! (note 6).
- Readable limbs and faces: fails for the inventor, the king and Firuz in flight (notes 1, 3, 5).
- Library cast, light presentation: met.
- No frozen holds: S11 and S15 are close to held pictures (notes 8, 11).
- Series lessons: riders scale with the horse and controls are uncovered in the inserts; one front cloud over the cast (note 7).

## Reusable techniques for the Library
- `riverRun` with the flipped, banded reflection and the gold path between two towers (after note 12a).
- The picture-balloon pair (two palaces in turn from one speaker) and the three tumbling testimony cards.
- A draw-order rule for the Capabilities Guide: in a crowd, whoever a line of narration names is drawn in front of every guard, spear and pole for that line.
- A veil and cape rule for the two-rider rig: trailing cloth of the front rider is drawn behind the rear rider's head.
