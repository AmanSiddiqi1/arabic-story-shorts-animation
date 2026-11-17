Verdict: REVISE

# KD-019 The Seagull and the Crab: Fable review, round 1

Reviewed: `renders/KD-019_v1.mp4` through all 30 strips of `review/v1_pack/strips/` (4 fps) plus full-size frames pulled into `review/v1_pack/extra/` (4.6, 27.5, 43.3, 47.0, 53.0, 73.4, 79.6, 86.1, 97.0, 116.9, 123.0, 137.8, 139.5, 140.9, 141.8, 146.9-148.5, 150.0-150.8, 154.5, 161.6).

## Summary

The film tells the story in order, the sync with the narration is tight throughout (jab on يصطاد 8.06, EEK! on خافت 48.78, gulp on ويأكل 83.82, SNAP! on وأمسك 140.56, fall on وسقط 151.10), and the first two thirds work well: the YEARS AGO / NOW contrast, the lie in the thought cloud, the cut to the dusk hill with NO POND!, the falling-skeleton day montage and the bones pan with the counter reaching 8 are all clear and well staged. Subtitles are verbatim, readable and correctly timed in both languages; the English is accurate. THE END is held 174.7-177.4. No broken frames.

The reason for REVISE is the last third. The climax (133.9-151.1), which is the payoff of the whole film, is the weakest-reading part: the bird's pose is a tangle, the crab appears to be standing on a hill while the narration says they are in the air, the three squeezes are invisible, and the death is hidden behind the crab. Right after it the hero is hidden behind the dead bird for about 3.5 s. These are staging and camera fixes, not new drawings. No BLOCKER.

Do not change narration, subtitle text or timing in any fix below.

## Notes (most important first)

### 1. 141.5-150.9 s, MAJOR: the crab looks as if he is standing on a hill during the mid-air struggle
What is wrong: in the close framing (141.5-142.4 and 145.7-149.0) and again at 149.2-150.9, the dark red ridge of the far hills runs exactly under the crab's legs, and his legs are in a standing pose. He reads as standing on the ground with the bird hovering above him (see extra `f_141.8.png`, `sq.jpg`, `g_149.96.png`).
Why it matters: the narration says "before the bird could land" (قبل أن يهبط 133.94) and then "they both fell" (وسقط 151.10). If the crab seems to be on the ground, the fall has no meaning and the reversal "the carrier caught by his cargo" (plan section 1) is lost.
Fix: stage the grip against plain sky as the plan asked (section 4). From 141.52 (بعنقه) raise the pair about 150-200 world units higher or move the close camera up so that no ridge or hill line is inside the frame below the crab; show clear sky under his legs. Put the crab in a hanging pose: legs dangling and trailing with `swing` (use the `dangle` field), body swinging under the neck point with a 2-frame lag, not level and planted. In the wide shots (142.5-145.5, 149.2-150.9) keep at least one crab-height of sky between his feet and the ridge.

### 2. 146.96-148.6 s, MAJOR: the three squeezes are not visible
What is wrong: the plan calls for three counted squeezes on ضغط 146.96, بكل 147.74, قوته 148.34. Frames just before and after each word are almost identical (`sq.jpg`): the pincers, the neck and the bird's face do not change; only the wing flaps. The shot is effectively a 3.3 s hold.
Why it matters: "squeezed with all his strength" is the action of the climax, and no sound effect is possible here, so the picture alone must carry it.
Fix: on each of the three words drive a clear pulse of about 0.25 s: pincers close further (`openL/openR` to 0), crab body `sq` 0.88 then recover, stalks jerk down then up, brow hard V; the neck visibly pinches at `chokeAt` (`choke` 0.4, 0.7, 1.0, growing each time); the bird's head jolts (`headRot` kick), eyes go wide with a small pupil, beak snaps open, 2-3 feathers pop off; a 3-4 px panel-only shake on each. Add a small impact star at the grip point on each squeeze. Make each squeeze stronger than the last and the wing beat weaker after each (flap amplitude 1.0, 0.6, 0.3).

### 3. 149.2-151.1 s, MAJOR: the death is hidden
What is wrong: at مات 149.96 the bird folds over and its head disappears behind the crab (`g_150.80.png`); only at 149.96 is a small x eye briefly visible at the far left. The "held stall" reads as the bird sitting on the crab.
Why it matters: "until the bird died" is the end of the villain; the audience must see the moment the struggle stops, in a mild comic way.
Fix: keep the head in clear view to the left of the crab, against sky. On حتى 149.22 the flapping fades to nothing; on مات 149.96 the head drops and hangs (`limp`), `eyes:'x'`, beak falls open, wings droop down past the body, one feather drifts. Hold that still silhouette for 0.8 s (stall), then both drop on وسقط 151.10 with `fallY`. Keep it comic and bloodless as it is now.

### 4. 129.5-140.6 s, MAJOR: the bird's threat pose and the grip moment are hard to read
What is wrong: from 129.7 the neck becomes a huge hoop, longer than the bird, coming out of the top of the body, round the right side and down to a head at the lower left with the beak pointing straight down past the crab (`f_137.8.png`, `g_139.50.png`). The beak is never "wide open over the crab" (plan S14), the eye is an empty ring so the look to the lens at 139.46 does not register, and at SNAP! (140.56) neck, wing, legs, pincers and the lettering all overlap in one knot (`f_140.9.png`).
Why it matters: this is the suspense beat (the slow pincers under an opening beak) and the surprise beat (the snap). At phone size it is an unclear tangle.
Fix: shorten the neck curl to at most about 1.2x normal neck length and bring the head down from above and in front of the crab, so the picture is: bird body top, head curving down to the right of the crab, beak opening toward him (`beak` 0.6 on الطائر 135.68, hunger look: brow +1, lid 0.4, pupil on the crab). Pincers rise on رفع 136.42 on the side away from the wing, reach full height with glints on كلبتيه 138.58. On القويتين 139.46 the bird's pupil flicks to the pincers, then to the lens (`gaze [0, 0.05]`), eyes wide: give the eye a real pupil here. Keep the wing on the far side during 138.5-141.5 (hold it up, `wingsUp`) so it never crosses the neck or pincers. On وأمسك 140.56 the two pincers close on a straight, clearly visible stretch of neck, with SNAP! placed in empty sky beside the grip, not over the body.

### 5. 153.7-157.5 s, MAJOR: the hero is hidden behind the dead bird after the fall
What is wrong: after THUD! the camera pushes in on the bird lying on the bank (x eye, legs in the air), which fills the frame for about 3.5 s, while the crab is covered by the bird's wing tip and the reeds (`f_154.5.png`). His bounce to his feet, panting and "one look back" (plan S15/S16, عاد 154.42) cannot be seen.
Why it matters: the emotional point here is the crab: exhausted, not triumphant, turning back to his friends. It is also kinder for a family audience not to dwell on the body in close-up.
Fix: land the crab in the open on the bank to the right of the bird, clear of the reeds (move him at least one shell-width from both). Frame a two-shot that favours the crab (bird at the left edge, partly cropped, smaller). Crab acting 152.0-156.9: `landSquash`, bounce up, two panting breaths with pincers lowered, stalks 0.7, one look back at the bird on عاد 154.42 (0.5 s), then turn and slow scuttle (amp 0.6) into the water on الماء 156.98. No smile.

### 6. 77.2-89.0, 111.0-113.7, 142.5-151.7 s, MAJOR: blue water beside the hill under "NO POND!"
What is wrong: the rocky hill set has a bright blue wedge at the left edge that reads as water or a lake (`f_79.6.png`), in the very shot that says NO POND! and in the wide shots when the crab searches for water.
Why it matters: it contradicts the story point (no water anywhere) for viewers who notice it, and blue is the film's colour for "pond".
Fix: recolour that wedge to a dry tone (dusk purple-grey valley or dark red haze, as the far hills) or cover it with a boulder. Do this in the story's set option, not by changing any Library default.

### 7. 111.0-116.7 s, MAJOR: the bones are visible four seconds before the crab "sees" them
What is wrong: in the approach wide (111.0-115.0) the white skeleton pile is already clearly on the ledge. The planned beat is: approach, close on the crab's eyes held still (فرأى 115.24), then the reveal on عظام 116.72.
Why it matters: the surprise is spent before the reveal; the good eye close-up at 115.2-116.5 then has nothing to hold back.
Fix: during 110.94-115.2 hide the ledge top: start the approach higher and further left with the camera keeping the ledge below the frame, or keep the spire and a foreground boulder in front of it (redrawn after the cast), or approach from the side so only rock face is seen. Let the ledge rise into view only with the pan at 116.72. Keep the dust puffs at 114.0-115.0 out as well (they point at the pile).

### 8. 72.2-74.4 s, MAJOR: the first pick-up of two fish is cluttered and small
What is wrong: on سمكتين 72.48 the bird's head dips straight down over the crab, who stands between the bird and the water; the two fish in the beak are tiny and behind the reeds (`f_73.4.png`). The yellow and pink "individuals" cannot be recognised.
Why it matters: this is the act the whole trick depends on, and the two fish must be recognised later as skeletons (118.98) and in the clouds (126.5, 163.4).
Fix: move the crab one shell-width to the left of the bird's feet (or behind him) before 72.0 so the beak has clear water below it. Make the hop readable: yellow jumps first with `hop` at 72.48, pink 4 frames later, each arcing above the surface in clear air before landing in the open beak; draw them at 1.3x in the beak with tails out and wagging. Push the camera in to about zoom 2.2 on beak and fish for 72.2-74.2, then widen for the take-off on ويطير 74.44. Counter 12 to 10 as now.

### 9. 46.6-48.8, 122.2-126.3, 160.8-163.3 s, MAJOR (together): thought-cloud contents too small or unclear
What is wrong: (a) 46.7-48.0 the crab's cloud shows two fishermen with a net at roughly 40 px, unreadable, and the cloud covers the listening fish (`f_47.0.png`). (b) 122.2-124.0 a large cloud holds only one tiny flying bird; the friends do not appear until 126.5 (`f_123.0.png`), so "the bird had not rescued his friends" has no friends in it for 4 s. (c) 160.8-163.3 the "what had happened" cloud is a grey slab with a hair-thin row of bones that reads as a grey box (`f_161.6.png`).
Why it matters: these clouds carry the meaning of three narrated lines; the Capabilities Guide asks for figures of at least about 110 px inside a cloud.
Fix: (a) raise `scale` so each fisherman is at least 110 px and the net is the biggest shape; move the cloud up and right so the fish faces stay visible. (b) On الحقيقة 122.56 show yellow and pink large in the beak of the flying bird, waving (as planned); keep the existing path, red cross on ينقذ 125.76 and the flip to skeletons on أكلهم 127.86. (c) Replace the slab with three or four large `fishBones` (the 90 x 34 prop scaled up about 2x) on a hint of grey rock, yellow and pink ghosts fading over two of them, so it matches 118.98.

### 10. 158.4-167.5 s, MINOR: the survivors' grief is partly covered
What is wrong: the cloud sits over the fish; only two or three of the four survivors are visible and one is half hidden behind the cloud edge and tail. The staggered grief on عرفت 161.82 does not read.
Why it matters: this is the quiet emotional close ("their friends never reached a safe pond").
Fix: gather all four survivors in a loose arc to the right of the crab at 158.4 and keep the cloud above them, not over them. On عرفت 161.82 let them sink one after another (per-fish delay 3-4 frames): head drop, lid 0.6, a rising bubble tear each. Keep the pincer on the smallest fish at 167.46 and make sure it is not hidden.

### 11. 26.5-43.0 and 91.7-98.5 s, MINOR: the bank two-shot is cramped
What is wrong: the crab stands directly under the bird's beak with the reed clump crossing his body, so his shell, the reeds and the beak overlap for most of the dialogue (`f_27.5.png`, `f_97.0.png`). At 96.2-98.2 his raised pincers cover his own eyes during the bird's glint, and the planned 0.4 s mask slip at 43.3 does not show (the bird is still tearful in `g_43.30.png`, `g_43.45.png`).
Why it matters: these are the two-handers that set up trust and then dread; the crab's stalks are his face and should always be clear.
Fix: place the crab about 60-80 units further right and slightly lower, clear of the beak tip, and move or thin the reed clump so it does not cross him (draw him in front of it). At 96.9-97.9 lower his pincers to chest height so both eyes show, eager (stalks 1.3). For the bird: at 43.3, once the crab has dived, tears stop, brow flips to +1, lid 0.4 and a thin smile for 0.4 s; at 96.95 the same cold look plus a visible glint on the eye, on the chime at 97.4.

### 12. Cosmetic, MINOR
- 64.2-66.3: the camera move crops the thought cloud against the top edge of the panel; hide the cloud (pop it at 64.5) before the move, or keep it fully in frame.
- 74.7-77.0 and 89.7-91.0: the FISH counter sits on top of the sun; move the sun left or lower.
- 117.2-118.0: the BONES counter overlaps the crab's shell; place the counter at the top left for this pan or shift the crab left.
- 114.0-129.5: the bird's legs stretch into a long pole so only a white blob of body shows at the top; shorten to normal leg length and move the camera up slightly so some of the body and tail is in frame.
- 51.5-67.5: the gathered fish form two straight rows (heads on the surface line, a second row below); break the line with small height and angle offsets and independent bobbing so they do not read as a strip.

## What works and should be kept
- YEARS AGO / NOW match cut with the fast and slow jabs (6.0-13.5).
- The cut to dusk at 77.2 with NEW POND? stamped NO POND!, the discreet gulps (83.8-85.5) and the day montage with falling skeletons and the counter 10, 8, 6, 4.
- The eye close-up at 115.2-116.5 followed by the bones pan with the counter to 8 and the colour ghosts of yellow and pink at 119.0.
- NEXT! arrow at 131.6 and the crab's brow change at 132.3-133.7.
- Dawn, the dashed outline of the missing bird at 169.2-170.2, the crab at his guard post, FISH 4 holding under THE END.

## Subtitles and faithfulness
- Arabic verbatim with diacritics, large and readable; English accurate and in sync. No change requested.
- Family presentation: eating is shown as gulps and clean skeletons, the death as a limp bird with x eyes. Acceptable for the series; note 5 reduces the time spent on the body in close-up.

## Reusable techniques for the Library
- Counter that ticks during a camera pan across the counted objects (bones 1 to 8), matching an earlier counter (FISH 12 to 4).
- Colour "ghost" of a known character fading over its skeleton to make a recognition beat without words.
- Dashed outline of an absent character fading on an empty set ("no longer appeared").
- Rule to add to the guide: a mid-air struggle must be framed with clear sky under the lower figure; any horizon line at foot level makes it read as standing.
- `countedBeats` squeeze pulse bundle (grip close, victim pinch, body `sq`, shake, impact star), once it is built for note 2.

Second review advice: Yes. Notes 1-5 restage the climax and its aftermath (camera, poses and a new squeeze pulse), which is the part of the film most likely to go wrong again and cannot be judged from code; a short second Fable review of v2 focused on 129-158 s (plus a spot check of 72-74, 111-117 and the three clouds) is warranted. The rest of the film does not need a second look.
