Verdict: REVISE

# KD-016 The Dove, the Fox, and the Crane: Fable review, round 1 (film v1)

Reviewed: `Animations/KD-016/renders/KD-016_v1.mp4` through all 28 strips of `review/v1_pack/strips/` (4 fps) plus 32 full-size frames pulled from the MP4 (subtitle panel, faces, the tuck, the catch, the ending).

## Summary

The film tells the story in order, the look is clean, and the first two movements work: the nest building, the hatch, the three threats with falling effort, the thought cloud and its reversal, the failed climb with THUD!, the wind from every direction. Subtitles are verbatim, readable and well timed. No blockers.

It is REVISE because the third movement, which carries the moral, is the weakest part on screen:

- the caught heron (147.7-156.5, almost 9 s, the longest held image in the film) does not read as a bird;
- the head is not actually hidden in the tuck that the narration describes;
- the fox's change of face, which is the whole trap, is off screen or too small each time;
- the last image is too wide to show the dove and her chick.

These are staging and pose fixes in two scenes, not a rebuild. Notes 1-5 are the reason for a v2. Notes 6-12 are worth doing in the same pass.

## Notes

### 1. 147.7-156.5 s. MAJOR. The pinned heron reads as a grey rock with a tube coming out of it
**What is wrong.** After the POUNCE! cloud clears, the heron's body is an upright grey dome cut flat at the waterline (the front water strip covers its lower half). The neck leaves the top of the dome horizontally. The head is rotated so the beak points up and left and the crest hangs down and right. The two yellow legs lie as a zigzag under the fox's chest and read as sticks. On top of that, translucent blue splash shards sit over the fox's eyes from 148.0 to about 149.7. Checked at full size at 149.0 and 154.6.

**Why it matters.** This is the image under the moral line ("You knew how to advise the dove, but not how to protect yourself!"). The viewer has to see at once: the fox has the heron down, the heron is looking at him, the heron is ashamed. At present a first-time viewer has to work out what the grey shape is.

**Fix** (`kd16_main.js` near line 205, the `// pinned` block: `P.rot = 1.3`, `P.x = 930`, `P.tuck` 0.42, `P.lift = 0.5`).
- Lay the bird on its side above the waterline. Raise the pinned body so the whole body ellipse is clear of the front water strip (about 60-80 units higher than now), or draw the heron after the front strip for t >= 147.52.
- Bring `tuck` fully to 0 by 148.25 so the neck is a normal neck, and lay it along the ground toward the right with `neck` about 0.3.
- Keep the head upright relative to the screen: counter-rotate `headRot` by about -`P.rot`, so the eye is above the beak and the beak points right or slightly down.
- Put both legs together, pointing back and up to the left of the body (`lift` 0, `amp` 0 after 149.5), so they read as legs.
- The fox's two forepaws rest visibly on the body ellipse, with his muzzle 40-60 units above the heron's head.
- Remove or shorten the splash drops: none after 148.2, and none drawn over the fox's face.
- Keep the acting already planned: eyes `wide`, crest flat, one 5 frame look to camera at about 149.5, then on تعرف 154.38 the eyes break away and the head lowers. That shame beat is in v1 but cannot be read in the current pose.
- Test this pose on a still sheet at 148.5, 151.0 and 155.0 before rendering.

### 2. 141.0-145.6 s. MAJOR. The head is not under the wing: a closed eye stays visible in front of it
**What is wrong.** From 141.0 until the leap the heron is a round body with the wing polygon across the top, but the head with its closed eye sits clearly outside the wing at the front left (full-size check at 142.0 and 142.6). The plan says "by 142.44 no head or neck is visible".

**Why it matters.** The narration at 139.96-144.58 says he hid his head under his wing, and the fox waits for exactly that. With the face showing, he looks like a bird dozing, and the reason the fox can leap now is softened.

**Fix** (`kd16_lib.js` heron, `tuck`).
- At `tuck` >= 0.9 draw the wing after the head and enlarge it or shift it forward so it covers the eye and beak completely. Only the crest plume tip may poke out behind.
- Keep the half demonstration at 131.1-132.6 (`tuck` 0.35) as it is: there the eye should still show, which makes the full version a clear step further.
- The one-leg stance from 142.7 is a nice touch; keep it.

### 3. 142.4-145.6 s. MAJOR. The crouch before the leap is given away and is not still
**What is wrong.** The plan asks for a 1.9 s crouch with only the tail tip moving and a slow push from z 1.8 to 2.0. In v1 the fox bares his teeth with an open red mouth from 143.2 and holds that for 2.4 s, and the camera drifts slightly. There is no moment where the smile is seen sliding off.

**Why it matters.** Surprise 3 in the plan is "the leap after two seconds of total stillness". An open snarl for 2.4 s is the opposite of stillness, and it makes the leap expected.

**Fix.**
- 142.44 (رأسه): the fox keeps the sweet face for 8-10 frames after the head disappears.
- 142.8-143.3: the smile drops to a flat closed mouth, `lid` 0.6, `brow` 1, ears go back. One slow lick across the teeth is allowed here, then the mouth closes.
- 143.3-145.5: `anticipate` crouch, body low, mouth closed, `noBlink`, only the tail tip moving. Push the camera in on the pair from about z 1.8 to 2.0.
- The mouth opens only on take-off at 145.64 (قفز).

### 4. 103.5-106.5 s. MAJOR. The fox's mask dropping is hidden at the frame edge
**What is wrong.** While the dove points and the arrow travels to THE HERON, the fox is at the far left edge, about half cut by the panel border and partly behind the trunk (full-size check at 104.6 and 105.8). His change of expression is about 60 px tall and cropped. The dove's "too late" reaction (wing to beak) at about 105.5-106.5 is also only about 90 px.

**Why it matters.** The plan's surprise 2 is that her proud, helpful pointing dooms her friend. That only lands if we see the fox's face change while her eyes are shut, and then see her realise.

**Fix.**
- Keep the arrow and the pan to the heron on «مالك 102.84 to about 104.3.
- 104.4-105.3 (الذي يعيش): cut to FOX_LOW (about 260,760, z 1.9) for 0.9 s. The fox looks toward the river, the smile turns into the narrow look (`lid` 0.6, `brow` 1), one tongue pass.
- 105.3-106.6 (عند النهر): cut to NEST_MED. The dove opens her eyes, looks down, wing to beak, `wet` rising, the chick ducks.
- 106.84 (ذهب): back to the wide shot as the fox trots off, as now.
- In any wide shot of this beat, shift the camera so the fox is fully inside the panel (at least 40 px of margin).

### 5. 159.6-164.7 s. MAJOR. The ending is 5 s of a wide static shot and the final gesture is too small
**What is wrong.** From the moment the fox leaves frame (about 159.7) to the end the shot is the full wide view. The dove is about 100 px wide, her lowered head and the wing over the chick cannot be read on a phone, and the feather on the water is a few pixels. Nothing moves for the last 3 s under THE END.

**Why it matters.** The plan ends on "a quiet, sadder wisdom (wing over the last chick)". That is the emotional close of her arc and at present it is not visible.

**Fix.**
- 159.62-161.4 (وبقي النهر هادئًا): hold the wide view but frame it toward the river (RIVER_WIDE), with the fading rings where the heron stood and the grey feather drawn about twice as large, drifting.
- 161.4-163.2: one slow continuous move up and left to NEST_MED (about 390,360, z 1.7-1.9), easing in and out.
- Settle by 163.2 on the dove: slow head drop, long blink, `wing` over the chick, the chick pressing in.
- THE END still appears at 162.0 in screen space in the upper right. Check that it does not cover the dove at the final framing; move it to the upper left if needed.

### 6. 37.55-39.4 and 46.9-48.2 s. MAJOR. Both chick drops are over in about half a second
**What is wrong.** First drop: the nudge is at 37.6, the chick is in the air at 37.85 and gone by 38.2; the counter flips at 38.7. The fox's catch cannot be seen (no closing of the mouth, no yellow tuft). Second drop: the chick appears beside the trunk at 47.2 and is gone by 47.6, all in the wide shot with the dove at about 60 px.

**Why it matters.** These are the two losses the film is about. The grief at 49-51 is well played, but what she grieves over passes too fast to register, and "the same pose both times" cannot be seen the second time.

**Fix.**
- First drop: keep the close nudge with her eyes shut. Let the chick look back at her for 6-8 frames at the rim (37.55-37.9). Fall 37.9-38.5 with the camera following down. Catch at 38.5 on إليه/فرخًا: the mouth snaps shut, a yellow tuft at the lips, a small gulp. Counter 3 to 2 at 38.9. The fox turns to leave at 39.1.
- Second drop: on ففعلت 46.15 cut to NEST_MED for the nudge (identical pose, head turned away, `lid` 1), 46.2-47.2. Then the wide shot for the fall 47.2-47.9 and the lazy catch. Counter 2 to 1 at 48.2 as now.
- There is no narration gap at either drop, so add no sound.

### 7. 99.2 s. MAJOR. The sky jumps from yellow dawn to blue day in the middle of one conversation
**What is wrong.** The fox asks "Who taught you to say that?" at 97.5-99.4 under the yellow dawn sky. At 99.2 the shot cuts to the dove under a blue midday sky with a full sun, and the CHICKS counter disappears on the same frame. She answers the question in what looks like a different day.

**Why it matters.** It breaks continuity inside a question and its answer.

**Fix.**
- Keep the dawn sky through the dove's answer.
- Move the change to day onto the fox's walk to the river: a `skyCycle`/`mixHex` blend over 106.84-108.6 (ذهب الثعلب إليه), so that time passes while he travels.
- Fade the counter out over 0.4 s at the same point (or keep it to 106.8) instead of cutting it at 99.2.

### 8. 118.08-120.5 s. MINOR. "The bird answered" shows no answer
**What is wrong.** On فأجابه the heron lifts his beak a little and half closes his eyes. He was already facing left, so nothing reads as "this is where I put my head".

**Why it matters.** The first question sets the pattern that the fox exploits (ask, he shows, harmless) so the second showing is the trap. A visible first demonstration makes the second one feel like a repeat that goes wrong.

**Fix.**
- 118.08-118.8: keep the wind streaks from the right alive until about 118.6 (they now thin out at 117.7).
- On فأجابه swing the head away from the wind with a real neck curl (down and left, `neck` to about 0.35, `headRot` about +0.5), crest trailing by 2-3 frames. Hold 0.5 s with a small yellow curved arrow by the head. Return upright by 119.6, proud (`puff`, `lid` 0.5).
- On الطائر 118.8 the fox nods and gives one clap, and takes his step to the next tick while the heron's eyes are closed.

### 9. 52.6-59.2, 85.0-86.2, 103.7-106.5, 108.5-134 s. MINOR. The heron is cut by the right panel edge
**What is wrong.** In the wide shots the heron's body is sliced by the right border (53.5: half the body; 85.2: only neck and chest). In the river two-shot his tail touches the border, with a large empty sky above and the fox pushed to the left edge.

**Why it matters.** He is introduced with a label and an arrow while half out of frame. In the long river scene the composition is lopsided for 25 s.

**Fix.**
- Wide shots that include him: move the camera centre about 80-100 units right (clamp allows it at z 1.0-1.15 only if the world is wide enough; otherwise place him at x about 1060 for these shots or zoom to 0.95).
- Two-shot: shift the centre about 50 units right and 40 units down so both figures have margin and the faces sit on the upper third line.

### 10. 88.7-90.6 s. MINOR. COME UP! sits beside an arrow that points down
**What is wrong.** The label says COME UP! and the yellow arrow beside it runs from the nest down the trunk to the fox.

**Why it matters.** Text and arrow disagree for 2 s on the film's triumph line.

**Fix.** Draw the arrow from the fox up the trunk to the nest (it grows upward over 88.7-89.4), with the dove's wing pointing down at the fox. Or keep the down arrow as her pointing gesture and change nothing but its role: thin, from her wing tip, ending at the fox, and add the fat arrow going up. One arrow going up is the simpler choice.

### 11. 59.9-79.0 s. MINOR. The lesson scene has no water in frame and the BRAVE pose copy is faint
**What is wrong.** The two-shot is framed above the waterline, so for 19 s the heron seems to stand on blue hills. The planned comedy (the heron shows the BRAVE pose, the dove copies it badly) is small: at 71.7-72.5 his wing goes up, and her copy at about 76-77 is a frown with almost no body change.

**Why it matters.** The river is where he lives (she says so later), and the BRAVE pose is the set-up for her dare at 88.

**Fix.**
- Lower the camera about 60 units so a strip of water and his ripple rings are visible at the bottom.
- 73.33 (اصعد): the heron's chest out, head high, `puff` 0.8, held 0.6 s.
- 75.32-76.2 (لن أعطيك): the dove's first try with a wobble (`sq` 1.15, `tip` swing, nearly falls off the snag, one wing flail). 77.0 (بيدي): the second try holds (`puff` 0.8, brow set). The heron nods once.

### 12. 22.2-23.6 and 109.7-111.5 s. MINOR. Two small acting gaps
- 22.2-23.6 (وصاح): the shot sits on the calm nest for 1.4 s. Give the dove and chicks a start at 22.5: heads snap down, the chicks duck in a stagger, `gaze` to the ground, one feather shakes loose. Then cut to the fox as now.
- 109.7-111.5 (بالإعجاب بذكائه): the fox's talking mouth shows fangs and a red tongue under a lowered brow, which reads as a snarl during the flattery. Use the closed smile with soft eyes, raised brows and ears forward, plus the planned applause (two or three paw claps at 109.7-110.5). Keep the fangs for after 142.8.

## What works and should not be changed
- The opening 0-17.5: the build, the HIGH UP! arrow, the day and night cycle, the staggered hatch, the feeding trips.
- The three threats and the THUD! at 94.2 in the pause; the claw marks staying on the trunk.
- The thought cloud at 33.2-36.4 and its reversal with the red X at 66.7.
- The tear that carries the camera to the heron at 51.0-52.0.
- The wind beats at 113.8-117.7 and 124.5-127.2.
- The dove's unheard warning at 135.2-136.7.
- GULP! off screen with the camera on the reeds: discreet and family friendly. No chick or heron is shown being eaten.
- Subtitles: the Arabic is large and clear. The English (re-translated 2026-11-17) is accurate, fits in at most two lines, is readable at phone size and stays inside the caption panel. Chunk changes follow the spoken words. No change needed, and none is allowed.

## Reusable techniques worth adding to the Library
- The heron with `tuck` (once note 2 is fixed) and the one-leg rest stance.
- `windStreaks` with the direction arrows closing on a character ("from every side").
- The paired thought clouds: the same layout shown twice with the opposite outcome and a red X.
- A falling tear as a camera link between two places on one set.
- The CHICKS counter that counts down (a loss counter).
- A "pinned on the ground" pose for long-necked birds, to be drawn for note 1 and catalogued.

## Second review advice:
Yes. Notes 1-5 are new pose drawing (the pinned heron, the full tuck) and new cutting and camera work in the film's climax and ending, and note 7 moves a sky change. These are the riskiest kind of change (a new pose can fail in a new way, and new cuts can fall off the words). A short second Fable review of v2 is warranted, limited to 99-108 s and 138-164.7 s plus the two chick drops, with stills of the pinned pose checked before the cloud render.
