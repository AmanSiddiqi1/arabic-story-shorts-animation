# The Lark and the Elephant: director's review 1

Reviewed from all 20 contact sheets (2 fps, 0-195 s), full-resolution stills of 24-46 s, and `scene_d.js` / `birds.js`. Coordinates below are world units (1000 x 1230, ground `GR` = 900, nest x = 420, pit x = 580..880). Times are film seconds.

## 1. Diagnosis

**What works**
- The style is solid and consistent: panel, dots, borders and palette all read well on a phone.
- The story is told in order and each narration beat has some picture.
- The world is one continuous set, so geography (pond left, nest centre, pit right) is learnable.
- Good small touches: nest building and feeding loop (7-20 s), camera shake on the stomp and the crash.

**Top weaknesses**
1. **Characters do not act; they are moved.** Every pose is a rigid translate with a switch for the eyes. Nobody ever looks at anyone (the pupil offset is a constant), nobody blinks, anticipates, settles or reacts. Examples: the elephant during the lark's 11 s plea (48.4-59.6) is a frozen cut-out with a neutral smile; the crows listen for 8 s (86-94.5) without a single reaction; the elephant "walks" at 105-123 by sliding and flipping direction in one frame (110-111, 115-116).
2. **The emotional core is thrown away (20.2-46.5).** The frame is empty for about 5 s while the narrator announces the elephant (22-27.5). He never stops or looks at the nest on "he saw it but did not care". The crush is hidden behind his leg and a "CRUNCH!" that covers his own head (34-36). The lark lands and is instantly a shut-eyed statue for 6 s under a jokey "WAAH!" with the elephant's smiling face beside her (39.6-46.4). There is no "she saw" moment and no grief.
3. **Speech is a slide show.** Icon bubbles (egg, chick, eye, pit, drop) stand in for acting for 8-11 s at a time (48-60, 86-94, 131-146) while the speaker hovers or stands still.
4. **Staging errors that hurt clarity.**
   - The frogs croak on the near rim, under the elephant's belly (151-162), so the pit is not between him and the sound. The trap logic is invisible.
   - "YES!" (61.4-63.2) sits over the lark and reads as her line.
   - The elephant's front foot hangs over the pit edge for a full minute (44-102; foot at x about 612, pit starts at 580).
   - The elephant's rump is the backdrop for two dialogue scenes (73-83, 126-146).
   - In the final speech the elephant's face is cropped out, so his defeat is never seen (172-190).
5. **Camera drifts instead of framing.** Long linear pans leave subjects half out of frame (22-27, 70-73, 84-86, 123-126). There are few motivated holds or push-ins.
6. **Lettering covers the acting**: CRUNCH on the head (34-36), PECK and ROAR stacked on the crows and lark (100-102), RIBBIT on the ear (152-163), STUCK and CRASH overlapping (165-167).

## 2. Prioritized improvements

| # | Time (s) | Problem | Fix |
|---|---|---|---|
| 1 | 20.2-46.5 | Inciting tragedy has no weight, no "saw", no grief (see weakness 2). | Full redirection in section 3. |
| 2 | 145.9-167.3 | Frogs on the wrong side of the pit; elephant slides into it; the fall is a smooth tween; he lands standing; "could not get out" is not shown. | Frogs hop round to the **far (right) rim**, x about 900-950, and croak from there. Elephant's ears swivel right, trunk stretches toward the sound, eager thirsty trot. At 161.8 the front foot finds air: 0.4 s teeter (ears up, trunk windmills, rear legs scrabble), then tip. Stretch on the fall, squash on landing at 164.7, dust out of the pit mouth, frogs bounced up by the impact. 165.2-167.3: two failed scrambles up the wall, slide back, slump. One word only (CRASH), placed in the sky. |
| 3 | 46.5-62.2 | Lark hovers 13 s behind icons; elephant frozen; YES misattributed. | Lark darts to his eye level, points a wing back at the nest on "eggs" and "chicks" (short camera glance back to the ruin), shrinks on "small and weak". Elephant: slow blink, eye rolls down to her, then head turns away. On "Yes!" (61.4) he snorts: trunk flick blows her back 60 px and she tumbles and recovers. Bubble tail goes to his mouth, clear of her. |
| 4 | 167.3-190 | His face is cropped; friends pile up in one unreadable clump at the left rim; counter covers the sky. | Mirror the 48-62 composition: she is now above, he is below looking up. Frame lower so his face is in shot. X eyes become shut eyes, ears droop, head bows on "arrogance". Friends land one at a time along both rims (0.3 s stagger, each with a settle). Lark gestures to them with a wing. Drop the bouncing loop for a held tableau. |
| 5 | 94.5-102.8 | Crows are a black blob on his face; no reaction until the X eyes pop. | Crows crouch, launch, and dive one at a time in arcs with clear silhouettes. Elephant swats with the trunk, shakes his head, ears flap, backs up a step, rears at 101.4. Impact shown as small starbursts, one word at a time. |
| 6 | 102.8-123.9 | Sliding, one-frame direction flips, clock icon. | Groping walk: short hesitant steps, trunk sweeping the ground ahead, head low, ears sagging more over time. Real turnarounds (0.4 s, head leads). Bumps the left tree at about 114 (leaves fall). 116.7-123.9: each ear pivots separately toward a sound while the head turns the wrong way. |
| 7 | 70.8-94.5 | Listeners do not listen. | Birds lean in, gasp (eyes wide), look at each other, glance down at the elephant, shrink and shake heads on "small too". Lark sags, then head lifts and eyes dart right toward the crows before the bulb. Crows: sceptical head tilts, a look between them, then a nod. Frame so the elephant's rump is not the backdrop. |
| 8 | 123.8-145.9 | Lark stands on top of the frogs; three static bubbles. | Lark lands beside the pond, not on it. Frogs blink, look at each other, test a croak on "loud" (throat puff), grin on "water". Lark mimes the plan with head and wing pointing right. |
| 9 | Whole film | No idle life. | Seeded blinks for everyone. Pupils look at the current point of interest (`look` should be a parameter, not 0.8). Breathing scale of 1-2 %. Landings squash, take-offs crouch first. Flap rate tied to speed, with short glides. |
| 10 | Whole film | Camera drift. | Hold, then move in 0.5-0.8 s eased moves on beat boundaries. Keep the acting character inside the middle 70 % of the panel. |
| 11 | 44-102 | Elephant's front foot over the pit. | Rest him at x about 470 or less (shift the lark and crow targets with him). |
| 12 | Whole film | Words on faces. | Lettering in sky negative space only, one word at a time, never over a face. |

## 3. Recommended sequence: 20.2-46.5 s (26.3 s, four narration beats)

This is the event the whole fable answers. If the audience does not feel the loss and the elephant's indifference, nothing after it matters. It is also where the gap between current and achievable is largest.

Narration windows (unchanged):
- A: 20.2-26.8, a huge elephant came walking along the path
- B: 26.8-31.8, he saw the little nest but did not care
- C: 31.8-38.2, he stepped on the nest, breaking the eggs, and the chicks died
- D: 38.2-46.5, the lark returned, saw what had happened, and cried

Inside D, I assume "returned" ends near 40.0 and "cried" starts near 42.4. Check these against the word timings and shift the internal cues by up to 0.3 s if needed.

**Continuity that must be kept at the edges**
- At 20.2 the lark is at the nest, camera about {360, 720, 1.8}.
- At 46.4 the lark is on the ground at (385, 878).
- The elephant is at x = 520 facing right from 38.2 onward.
- The camera rejoins the existing key at 46.0: {470, 720, 1.7}.

**New rig parameters needed (designs unchanged)**
- Elephant: body bob, per-leg lift for the near front leg (raised foot with visible sole), pupil `look` and half-lid, tail swing, ear follow-through.
- Lark: `eyes: 'wide'` (already in `eyeAt`), pupil look, crest droop (0..1), wing droop, body squash.
- Chicks: per-chick look direction, wide eyes, cower offset.
- Nest: rock angle.
- Frogs: duck amount (they are drawn behind the ground layer, so lowering y hides them).
- FX: dust puff, footfall micro-shake, ballistic shell and straw pieces, drifting feather, cast shadow.

### Camera keys (replace the keys between 19.0 and 46.0)

| t | x | y | zoom | Purpose |
|---|---|---|---|---|
| 20.2 | 370 | 722 | 1.8 | as now, on the nest |
| 21.6 | 385 | 725 | 1.8 | hold: chicks watch her leave |
| 23.4 | 420 | 680 | 1.2 | wide, eased 0.8 s move; elephant enters |
| 26.8 | 400 | 690 | 1.3 | he arrives |
| 28.0 | 320 | 720 | 1.75 | two-shot: his head and the nest |
| 31.6 | 330 | 720 | 1.75 | hold |
| 33.2 | 410 | 770 | 2.1 | low and tight: legs tower over the nest |
| 36.2 | 405 | 790 | 2.3 | push in on the ruin; do **not** follow him |
| 38.2 | 350 | 740 | 1.8 | widen for the lark's arrival |
| 40.5 | 340 | 780 | 2.1 | she sees |
| 44.0 | 335 | 795 | 2.4 | grief, held to 44.8 |
| 46.0 | 470 | 720 | 1.7 | existing key; pull-out motivated by her look |

Use ease in-out on each move and true holds between them.

### Shot A, 20.2-26.8: the arrival

**Lark**
- 20.2-20.5: nuzzles the nearest chick (head dips), then crouches (squash 0.85) as anticipation.
- 20.5-21.8: takes off up and left as now.

**Chicks**
- Heads turn to follow her out (pupils up-left), one cheep. Normal bobbing.
- 22.0: first tremor. The bobbing stops dead and all three look left. Hold.
- From 24.0: each footfall makes them hop about 4 px. Eyes go wide by 25.5.

**Elephant**
- He must be visible while he is being announced. New path: x = -260 at 20.8, -80 at 23.2 (head enters frame about 22.8), 185 at 26.6.
- Walk with weight: body dips about 10 px twice per cycle, head counter-bobs 0.12 s late, ears flap as follow-through, trunk swings like a pendulum, tail swings.
- Chin up (head raised 8), eye half-lidded: arrogant before he does anything.
- Each front footfall: small dust puff at the foot, 2-3 px panel shake, and the thud sound re-timed to the real footfalls (derive them from the walk phase).

**Frogs**
- Eyes wide as he nears, then they duck behind the bank while his feet pass (about 24.5-26.5) and peek back out, eyes only.

**Remove**: the 5 s of empty frame.

### Shot B, 26.8-31.8: he sees it and does not care

- 26.8-27.2: he stops at x about 190 with a settle (lean forward 0.03 rad, rock back). Trunk tip ends just short of the nest.
- 27.2-28.6, **"saw"**: head lowers (drop about 22), eye fully open, pupil down at the nest. Trunk tip reaches out and prods the rim once at 27.9: the nest rocks +/-0.05 rad and settles. Chicks lean away to the right, huddle, eyes wide. One brave chick cheeps up at him.
- 28.6-28.9: stillness. Nothing moves except his slow blink. This is the moment he could choose otherwise.
- 28.9-30.4, **"did not care"**: head lifts past neutral (drop -10), eye closes to the flat smug line, brow raised. Trunk flicks up and away with a springy overshoot. One ear flick. Keep "HMPH" but small (about 44), in the sky above his head, gone by 30.4.
- 30.4-30.8: weight shifts back (rot -0.03) as anticipation.
- 30.8-31.8: first slow step. Chicks' eyes follow the front foot.

### Shot C, 31.8-38.2: the step

**Approach, 31.8-33.4**
- Two heavy steps toward the nest. Camera drops low and tight, so we see legs, belly and his head with the eye still shut. He is not even looking: that is the point.
- From 32.6 a halftone shadow grows over the nest.
- Chicks look straight up, mouths open, squash down to about 0.8, pressed together.

**Anticipation, 33.4-34.2**
- Near front foot lifts high (about 60 px, sole visible) and hangs above the nest for a full 0.5 s. Body rocks back slightly.
- Everything else is still. No lettering.

**Impact, 34.2-34.4**
- Foot comes down in about 5 frames (ease-in, one frame of vertical stretch). The sole must land centred on x = 420 at exactly 34.40.
- Keep the existing shake and stamp sound.

**Aftermath, 34.4-35.1**
- Do not show the chicks being crushed. At 34.4 a dust burst plus a style `emphasis` starburst covers the nest for about 0.4 s.
- Straw strands and 4-5 shell pieces fly out on real arcs (gravity, one bounce) and settle.
- Body compresses about 4 % onto the planted foot and recovers.
- Frogs flinch and duck.
- "CRUNCH!" moves into the sky at about (300, 640), size about 60, on screen 34.4-35.6 only. It must never touch his head.

**He leaves, 35.1-38.2**
- Foot lifts, revealing the flattened nest. He walks on to x = 520 by 38.0 at the same unhurried pace.
- No look back, eye still shut, tail swinging. Rear feet step past the nest.
- The camera stays on the ruin and pushes in.
- 35.6-38.2: two small yellow feathers drift down in a slow see-saw and land on the grass. This is how "the chicks died" is told. Hold in silence.
- Frogs rise slowly, eyes on the nest.

### Shot D, 38.2-46.5: she returns, sees, grieves

**Staging**
- Frogs at left as witnesses, lark and ruin in the centre.
- At the right edge only the elephant's back legs and rump, turned away, tail idly swishing. His head and smile stay out of frame until the pull-out at 45.

**Return, 38.2-40.0**
- 38.2-39.5: she flies in from top-left on a light dipping arc, carrying a worm (reuse `worm`), pupils on the nest spot. Happy flight with one short glide.
- 39.5-39.9: she sees it in mid-air. Air-brake: body tilts back (rot -0.3), two fast back-flaps, eyes `wide`. Hover frozen for 0.3 s. The worm falls from her beak, bounces once and stays on the ground for the rest of the scene.

**"Saw", 40.0-42.4**
- 40.0-40.5: drops to the ground at about x = 330 with a landing squash, then two quick hops to (385, 878).
- 40.5-42.4: no tears yet.
  - Head down to the ruin (drop 8).
  - Quick look left, quick look right (searching for the chicks).
  - Nudges a shell piece with her beak at about 41.3; it rocks and lies still.
  - A last feather drifts down in front of her at about 41.8. Her pupil follows it to the ground. Hold 0.4 s, perfectly still.
- Camera pushes slowly throughout.

**Collapse, 42.4-43.0**
- Crest feathers flatten, head drops (14), body sinks (squash 0.92), wings sag open, eyes shut.

**Wail, 43.0-44.0**
- Head tips back to the sky (about -0.35 rad), beak wide open, held 0.8 s with a small tremble.

**Sobbing, 44.0-45.4**
- Head falls forward. Shoulders shake in two bursts (about 5 Hz, 2 px, 0.5 s each, with a pause between).
- Tears twice the current size, running from the eye, arcing and making tiny splashes on the grass.

**Frogs**
- Half-lidded sad eyes turned to her. One sinks slowly behind the bank.

**Remove**
- "WAAH!". The acting carries it and the word turns grief into a gag.
- The original elephant position with his smiling face beside her.

**Turn, 45.4-46.5**
- Sobbing stops. Head lifts, eyes open, wet.
- She turns her head right toward the elephant; the camera pulls out with her look and reveals him (rejoining the 46.0 key).
- Brow comes down, crest rises again: grief turning into resolve. This is the anticipation for her take-off at 46.5.

### Tone down across this sequence
- The steady background cloud drift is fine.
- No exclamation marks or question marks over heads.
- At most two words in 26 s (HMPH, CRUNCH).

## 4. Success criteria

1. **Mute test**: with sound and subtitles off, a new viewer can say for 20-46 s that the elephant noticed the nest, chose to ignore it, crushed it without looking, and the mother came home happy, found it, and broke down.
2. **Arrival**: the elephant is on screen by 23.0 and no frame in 20.2-46.5 is without a moving, readable subject.
3. **"Saw / did not care"** is two distinct poses with a visible hold between them (look down at 27.2-28.6, turn away at 28.9-30.4).
4. **The stomp** has clear anticipation (raised foot held at least 0.4 s), a fast impact on 34.40 and a settle. The elephant's face is never covered by lettering, and no chick is shown being crushed.
5. **The lark** has four readable states in order: happy return, shock in mid-air, searching disbelief, grief, plus the final turn to resolve. Each is identifiable from a single still.
6. **Eye lines**: in every still, each character's pupils point at what they are attending to.
7. **Weight**: the elephant's body bobs, his footfalls line up with dust, shake and thud, and small things react to him (chicks hop, frogs duck). The lark's landings and take-offs squash and crouch.
8. **Framing**: the acting character stays inside the middle 70 % of the panel. During the grief the elephant's face is out of frame until 45.4.
9. **Constraints held**: narration, subtitles and beat boundaries untouched; frames at 20.2 and 46.5 cut cleanly against the unchanged neighbouring footage; the Halftone Pop look and character designs are intact; every frame is still a pure function of `t`.
10. **Restraint**: no more than two comic words in the sequence, and it plays as sad, not slapstick.
