Verdict: REVISE

# AN-041 The Fox and the Crow: Fable review, round 1

Reviewed: `renders/AN-041_v1.mp4` (167.81 s) through all 28 strips of `review/v1_pack/strips/` plus 28 full-size frames pulled into `review/v1_pack/extra/` (montages `m1.jpg`..`m7.jpg`, subtitles `sub.jpg`).

## Summary

The story is told correctly and in order, the ending is there, and nothing is broken. Subtitles are verbatim-looking, large, well placed and readable in both languages; the English matches the Arabic chunk by chunk. The chasm, the heart, the scales cloud (38.8-41.2), the flea tale, the wolf memory (94.2-99.7), the STUCK sparrow, the YOUR LIMIT line with the crumbling lip (136.7-137.7) and the eyes-in-the-dark ending all work. No BLOCKER.

It needs a v2 because of four things that a viewer will notice: the moral beat is framed with its label and both characters cut by the panel edge; the SAME TRICK joke is parked on the fox's rump instead of beside his face; the crow, who speaks for more than half the film, has no visible gesture at all; and the last shot whips out and back in within 1.3 s. The rest are static stretches where the planned acting is too small to read.

All times are seconds on the final film. Never change narration, subtitle text or timing.

## Notes

### 1. 156.5-160.9: the moral is cut off by the panel edge. MAJOR
What is wrong: in the wide two-shot the `CRAFTIER!` label is clipped at the right panel edge (the box runs out of the picture after the `!`), the crow is hard against the right border with her tail outside the panel, and the fox's tail and rump are cut by the left border (frames 157.9 and 160.2). The plan's push-in on the admission (157.4) did not happen.
Why it matters: this is the only honest sentence the fox says and the point of the film. It is the worst-composed shot in it.
Fix: keep both inside the panel with at least 60 px of margin. Either bring the fox's stopping point about 120 world units to the right (he has only walked a few steps), or widen to zoom about 1.0 centred between the two heads. Put `CRAFTIER!` fully inside the panel, centred above the arrow's midpoint (not in the corner over the crow), appearing on «مكرًا» 159.78. Then push in slowly 159.8-160.7 (zoom +0.1) so her bow at 160.34 is seen.

### 2. 115.7-122.2: SAME TRICK lands on the fox's backside. MAJOR
What is wrong: the falcon medallion stops behind the fox, over his tail, and the `=` sign points at his rump (frame 121.2). The falcon in the medallion is not visibly smiling (beak down, heavy brow). At 120.7 the push-in cuts the crow to a head at the top-right corner.
Why it matters: the joke is "the old falcon's sweet smile = the fox's smile". As staged it reads "falcon = fox's tail", and the speaker of the line is out of frame.
Fix: stop the medallion in front of and above the fox's muzzle, in the open sky over the chasm at about the height of his head (lift the floating heart 80 units higher for 116-122 so they do not collide), with the `=` between the medallion and his face. Give the medallion falcon the same face as the fox's performing face (`mouth: 'smile'`, `brow` −0.4, `lid` 0.3) and hold the fox's matching grin until 121.76, then drop it (wide eyes, ears −1) as planned. Label `SAME TRICK` above the pair on «حيلة» 120.68. Push in on fox + medallion only after the crow's pointing gesture (note 3) has been seen; keep at least her head and beak fully in frame.

### 3. 42.7-143.9 (whole dialogue): the crow has no readable gesture. MAJOR
What is wrong: the source sets `sag` −0.8/−0.9 for the pointing wing at 46.04, 92.60, 119.14 and 138.22, but on screen nothing shows (frames 46.4, 92.9, 119.3, 139.5): the wing is black on a black body and stays inside the silhouette. Her whole performance is a beak that opens. Lid, crest and head-angle changes are too small at two-shot size.
Why it matters: she delivers five of the eight paragraphs and wins the argument. Without gestures she is a prop and the fox, who loses, is the only actor.
Fix:
- Make the pointing wing leave the silhouette: at the four accusation cues swing the near wing out towards the fox so its tip is at least 60 world units outside the body outline (anticipation back 0.15 s, throw, hold 0.8 s, settle). If the Library crow cannot extend that far, draw the pointing wing in the story as a separate black shape with a `#fffaf0` 3 px edge highlight so it reads against the body; opt-in only, Library default unchanged.
- Add speech energy to every line she speaks: `talk` plus a 4-6 unit head bob on stressed words, and `crest` up on the accusations («يصطاد» 47.78, «خدعت» 93.28, «حيلة» 120.68, «عشي» 138.98+).
- Push in for the accusations so her face is seen: zoom about 1.5 on her side of the chasm at 46.0-47.6 (before the shadow), and 92.6-93.9 (before the memory cloud). 138.7-139.9 already does this and is the best crow shot in the film; match it.

### 4. 161.2-164.2: the ending whips out and back. MAJOR
What is wrong: after the LATER card the shot opens tight on the fox at the cave (161.5-162.5), pulls out to the whole mountain in half a second (162.7-163.2), holds the wide dusk view for about 0.5 s and pushes back in by 164.0, with the fox entering the cave during the move. The fox's look back at the crow is a few pixels. The sky jumps from noon blue (160.7) to orange only inside that one-second wide shot.
Why it matters: the lonely return is the resolution. The wide dusk frame (163.3) is the most beautiful picture in the film and it is thrown away; the in-out-in reads as a camera error.
Fix: one move only. Come out of the LATER card directly on the wide dusk mountain (as at 163.3: tiny crow on the summit, fox small at the foot) and hold it 161.5-162.6 while he walks towards the cave. On «وحده» 162.78 he stops and turns his head up and back (`turnFlip` of the head only, ear first); push in steadily 162.8-163.8 to the cave framing so the look is seen; he enters on «كهفه» 163.82. Keep the eyes, `GRRR...` and THE END as they are.

### 5. 144.0-148.5: four and a half seconds of nothing after the heart sinks. MAJOR
What is wrong: from the moment the heart disappears into the chasm until he turns at 148.6 the picture is a still two-shot (frame 147.0 is identical to 144.0). The planned "lets go" and "one last look" are not visible; the tear at 150.78-151.36 is not visible either (frame 151.1).
Why it matters: «فقد الثعلب الأمل» is the emotional turn. It needs to be watched happening.
Fix: stage the collapse in steps on the words. 143.94 the raised paw lowers; 145.21 («فقد») ears go to −1 one after the other (0.15 s apart); 146.38 («الأمل») tail drops to `tailUp` 0 with a small `swing`, head sinks (`tip` 0.08), `wet` eyes; slow push-in to zoom about 1.5 on the fox 145.2-147.6; 147.76 one look up at her (pupils only on her side, she does not move), hold 0.5 s; then the turn at 148.58. On the walk make the tear a real drop: 10-12 px, `#fffaf0` with a blue edge, falling with `fallY` from the eye at 150.78 and splashing on the terrace.

### 6. 152.0-153.0 vs 3.6, 41.4, 164.7: GRRR means two things. MAJOR
What is wrong: the angry stamp uses the same red `GRRR!` lettering as the belly growl (3.7 `GRRR...`, 41.5 `GRRR!`, 164.7 `GRRR...`).
Why it matters: the belly growl is the film's running gag and its last sound. When the same word appears over his head at 152 the viewer cannot tell hunger from anger, and the final gag loses its identity.
Fix: keep `GRRR` for the belly only and always place it at the belly (at 41.5 it floats above his back; move it beside the stomach with two small `soundArcs` on the belly). For the anger at 152.04 use `HMPH!` (or no word: the stamp, steam puffs, flush and 2-frame shake already say it).

### 7. 47.0-50.0: the hunter shadow reads as a second animal. MAJOR
What is wrong: the shadow on the wall is a near-opaque black and grey figure with its own legs standing on the terrace beside the fox, head hidden behind him (frame 48.6). It looks like a black wolf walking past. The fleeing birds are three specks.
Why it matters: «أنت حيوان يصطاد الطيور» is her first argument; the shadow should show his nature at a glance.
Fix: one flat tone (black at about 55 % over the wall, no inner grey, no ground contact: fade the legs out before the terrace line), at least 1.6x the fox's size, shifted up and left so the head is clear of the real fox, in an unmistakable pounce: jaws open with teeth, forepaws raised with claws. Bird silhouettes about 3x larger, fleeing up and out of the wall on «الطيور» 48.54 with `stagger`. Let the real fox glance back at it and try to hide it with his tail (one beat, 49.0-49.8).

### 8. 50.1-54.0: "and I am a bird who may become your prey" plays as a still. MAJOR
What is wrong: nothing readable changes for four seconds. The tongue on «فريستك» 52.44 is a red dot under the nose that looks like a second nose (frame 52.7); the crow's shrinking is not visible.
Why it matters: this is one of the plan's best jokes (his body betrays him) and the moment she feels the danger.
Fix: on «وأنا طائر» 50.34-51.40 she pulls back and down over the eggs (`sq` 0.88, x −15, near wing spread over the nest, `crest` 1, eyes wide). On «فريستك» 52.44 a real lick: tongue at least 24 px long sweeping across the muzzle (0.25 s), a drool drop falling into the chasm, then both forepaws clap over the mouth (`raise`/`reach`), eyes wide, ears −1, 3 frames late; she answers with one slow blink. Push in to zoom about 1.45 on the pair for 50.3-53.6.

### 9. 72.4-132.3: in the cloud framing the crow is cut by the right border and the cloud by the left. MINOR
What is wrong: in every cloud shot (flea 72.5-82, wolf 94-99.7, falcon 105-115.7, sparrow 124.5-132.3) the crow's tail and back are outside the right panel edge (frames 79.4, 108.7, 114.5), the cloud's left lobe is clipped by the left edge (the mouse hole is half cut at 79.4), and the cloud sits on top of the sun with rays sticking out.
Why it matters: about 45 s of the film has the teller or the listener pressed against the frame.
Fix: move the cloud framing centre about 45 world units to the right and reduce cloud width about 8 %, so the crow is whole with 40 px of margin and the cloud's left lobe is inside the panel. Hide the sun while a cloud is up (fade it out over 0.3 s) or move the sun to the top-right for the whole summit sequence.

### 10. 83.5-93.2: listening and "friends may help" are flat. MINOR
What is wrong: 83.5-87.4 the crow "listens" and 89.2-93.0 she concedes «قد يساعد الصديق صديقه»; both are still frames (86.5, 90-92.7). The nod at 91.2 and the slowing tail are too small to see.
Why it matters: the concession is a small false hope for the fox; his rise before the wolf accusation makes the fall funnier.
Fix: 83.5-86.9 fox holds an expectant grin with a big tail wag (`tailUp` 0.4..0.9 at about 3 Hz) and a paw presenting the cloud; she tilts her head slowly (`headRot` to 0.25), one long blink; the wag slows to a stop by «لم يقتنع» 87.84, then the swipe. 89.2-92.6: a clear double nod from her on «يساعد» 90.0; the fox brightens (ears up, tail up, half-step forward, the heart bobs up 20 units). On «لكنك» 93.28 her wing snaps out (note 3) and he freezes.

### 11. 112.3-115.7: the old falcon's trick is not shown. MINOR
What is wrong: in the cloud the grey falcon leans to the small birds with a worm already in his beak (frames 113.6, 114.5); the three birds never look away and the worm is never theirs, so «صار يخدعها ليأكل من طعامها» is not staged.
Why it matters: SAME TRICK (note 2) only pays off if the trick was seen.
Fix: one action at a time on the branch. 112.26 the worm is on the branch in front of the small birds; sweet smile. 113.00 («يخدعها») he points a wing away to the left; all three small heads turn left together (the one planned unison). 113.92 («ليأكل») his head darts in and takes the worm. 114.9 the birds turn back with `stagger`, see the empty spot, wide eyes. Draw the worm at least 20 px long on screen.

### 12. 8.0-12.4 vs 21.7 onward: sky continuity and small polish. MINOR
- The summit sky is flat yellow in the crane-up (8.0-12.4) and blue from 21.7; make S1's summit sky the same morning blue (or a pale version of it) so it is the same place.
- The sky and sun do not move from 21.7 to 160.7 and then jump to orange. Either let the planned `skyCycle` drift show (sun lower and warmer after 132) or leave it static; the dusk at the end is fine behind the LATER card either way.
- 70.3-71.1 the one-eyed peek during the vow is not visible: open the near eye fully for 0.5 s with the pupil hard towards her, and have her head snap 0.1 to meet it.
- `TRUST ME!` (70.5-71.2) is dark yellow on grey rock; put it on the blue sky above his head or give it the standard black outline box.
- 19.6 the idea: add the planned push-in (zoom +0.15 at 18.6-20.3) on the frown turning into the sly smile.

## Reusable techniques for the Library

- Pointing wing for dark birds: an opt-in edge highlight (or separate overlay wing) so a black wing reads against a black body. Any crow, raven or blackbird story needs it.
- Body-anchored sound word: the same lettering used as a running gag must keep one meaning and one anchor (belly) for the whole film.
- "Wide first, then one push" for a return-home ending after a LATER card: open on the establishing dusk wide, single push-in to the door or cave, no reverse move.
- Medallion comparison: shrink a story cloud to a round medallion and park it beside a character's face with `=` between them; rule: always on the face side, never behind the body.
- Flat single-tone wall shadow (no inner shading, no ground contact, 1.6x scale) for "true nature" silhouettes.

Second review advice: Yes, a short second Fable review of v2 is warranted. Notes 1-5 change camera framing and the acting of both leads at the climax and ending, and note 3 depends on whether the crow's wing can be made to read at all; those need to be checked on rendered frames (at least 42-58 s, 92-100 s, 115-123 s, 143-164 s). If only notes 6, 9, 10, 11 and 12 were at stake, stills would be enough.
