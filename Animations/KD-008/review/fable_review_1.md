Verdict: REVISE

# KD-008 The Tortoise and the Two Ducks: Fable review, round 1 (film v1)

Reviewed: `Animations/KD-008/renders/KD-008_v1.mp4` (174.47 s), every strip in `review/v1_pack/strips/` (4 fps), plus full-size frames pulled from the MP4 at 67.0, 67.3, 82.2, 82.7, 83.2, 96.0, 96.5, 97.0, 104.5, 112.6, 113.2, 113.6, 114.0, 114.3, 122.2, 122.9, 127.2, 137.3, 138.7, 143.3, 147.5, 154.4, 155.5, 156.8, 158.0, 159.5, 160.5, 160.9, 162.2, 164.5, 169.5, 172.5 and subtitle crops at 85 and 152.

## Summary

The story is told in order, the look is consistent, and the first 100 s are warm and clear: the drying pond, the DAY 10/20/30 counter, the three useless steps, the plan cloud, ONE RULE and the crossed-mouth icon all read well. The ending at the lake is restrained and right. No blockers: subtitles are present, legible and correctly timed throughout, the ending is complete, and nothing is unsuitable for children.

The film needs a v2 because the climax does not show its own cause and effect. From 154.3 to 160.8 the tortoise has her mouth open and is still drawn touching the stick, so for six and a half seconds the picture contradicts the rule the film taught three times. Around it, the ducks (whose helplessness is meant to carry the suspense) are cropped out of both aerial close-ups, the pebble demonstration that plants the payoff happens half off-frame, and there are two glitch-like passages (a headless tortoise at 82.5-83.5 and a visible edge of the forest backdrop at 112.5-114.3).

Do not change narration, subtitle text or subtitle timing in any of the fixes below.

## Notes (most important first)

### 1. 154.26-160.82 | MAJOR | The mouth opens but she never visibly leaves the stick

What is wrong: at 154.4 the mouth opens on فمها, correctly. But at 155.5, 156.8, 158.0, 159.5 and 160.5 her head is still drawn in contact with the stick (at 159.5 it even overlaps duck B's wing). No gap opens and the ducks do not rise. She appears to hang on with an open mouth, talking, until she drops at 160.9. The planned hang ("the ducks bob up, a gap opens, the stick springs straight") is not on screen.

Why it matters: this is the single event the whole film is built towards. The viewer was told "if you speak, you fall" and then watches her speak for six seconds without falling.

Fix:
- 154.26 (فمها): mouth opens, jaw leaves the stick. In the same 4-6 frames drive `load` 1 -> 0 with `rebound` so the stick springs straight and both ducks bob up about 60-80 world px. This must be a visible jump, not a drift.
- 154.26-157.8: she hangs in the air below the stick with a clear sky gap that grows from about 25 px to about 90 px (slow sink, legs still rigid, flush still on). The balloon I AM NOT A builds as now, but place it lower-left of her so it does not sit between head and stick.
- 157.96 (اللحظة): brow flips to raised, flush drains, pupils go up to the stick (this beat exists at 158-159; keep it, but with the gap visible above her head).
- 159.24 (تركت): front leg reaches up and misses by a clear margin (the reach at 159.5 is good, it just needs daylight between foot and stick).
- 160.82 (وسقطت): fall as now.
- Keep the stick and her head clear of duck B's wing: hold B's wing on an up-stroke or offset the flap phase during 154-160.
- Check stills at 154.5, 156.0, 158.0, 159.5, 160.5: each must show sky between her head and the stick.

### 2. 120.5-124.2 and 141.2-153.5 | MAJOR | Both ducks are cropped out of the aerial close-ups

What is wrong: in both close-ups duck A is one eye at the left panel edge and duck B's head is cut off by the right edge (122.2, 143.3, 147.5). The planned alarm at 122.12, the head shakes at 143.72 and the pleading eyes at 152.10 cannot be seen. From 145.0 the wish cloud also covers what remains of duck A.

Why it matters: the plan's suspense is that the ducks see it coming and cannot speak. As rendered, the tortoise is alone on screen for the whole build-up, and 141-153 is twelve seconds of a nearly static frame.

Fix:
- Cap the zoom in both close-ups so both bill tips and both duck eyes stay inside the panel with about 40 px margin (roughly 25-30 percent wider than now). Her face is large enough to survive this.
- 122.12: make the near miss bigger to compensate: mouth opens clearly, the stick slips a few px, both ducks' eyes snap down with a small "!" burst each, staggered 4 frames; 122.92 she clamps with `sq`.
- 143.72 (MMPH!): both ducks shake heads, B bigger and 4-6 frames later.
- 152.10 (صديقتيها): a 1.2 s cutaway or a quick pull-out that shows both ducks wide-eyed, brows up, looking down at her, then back in for the breath at 153.18.
- Move the wish cloud (145.06-148.5) to the lower right of the panel, below duck B, so it covers neither duck.

### 3. 95.5-98.7 | MAJOR | The pebble demonstration is half off-frame and reads weakly

What is wrong: duck B is cut by the right panel edge through the whole rule scene (84-98). The pebble appears in B's bill at 95.5, before إذا (96.13), sits against duck A's wing, and by 97.0 is already low behind A's tail. The bill opening that releases it is not readable. The YOU FALL! label and arrow then point at a pebble that is small and near the edge.

Why it matters: this is the plant for note 1. The audience should recognise the same picture at 154.26.

Fix:
- From 94.9 pan right or pull out so duck B is fully in frame with clear air under her bill.
- 95.2-96.1: B holds the pebble up in her bill, visibly, with a small presenting head tilt (about 0.6 s hold).
- 96.42 (تكلمتِ): B's bill opens wide as if to speak and the pebble drops through empty air (not across A's body), `fallY`, one bounce with `impactSquash` and a small dust puff. Tortoise and duck A follow it down with `gaze`.
- 97.22 (ستسقطين): YOU FALL! with the arrow, as now.
- If feasible, stage the pebble drop at roughly the same screen position the tortoise's head occupies at 154.26, as the plan intended.

### 4. 82.5-83.5 | MAJOR | The tortoise is headless for a second during YAY!

What is wrong: for the hop and turn she flips to face left; her head goes outside the left panel edge, so at 82.7 and 83.2 the frame shows only a shell with legs. YAY! is also jammed against the left edge.

Why it matters: it reads as a rendering fault at the happiest moment of the film, just before the tone turns.

Fix: frame the dance with the tortoise centred (shift the camera left about 150 world px for 81.3-84.2, or pull out) so the whole animal stays in the panel through the turn. Alternatively drop the flip and do two small heavy hops in place (`anticipate`, `hop`, `landSquash`, dust) with the head high and a big smile. Put YAY! above her head, fully inside the panel.

### 5. 112.5-114.3 | MAJOR | Visible edge of the forest backdrop during lift-off

What is wrong: as the camera cranes up and right, the forest set ends before the right panel edge. At 112.6, 113.2 and 113.6 there is a hard vertical seam about 40-60 px from the right edge with flat yellow beyond it, and at 113.6-114.0 a cloud is sliced in half by that seam.

Why it matters: a broken-looking strip for about two seconds on the film's big lift-off.

Fix: extend `treeRow`, ground and sky bands well beyond the camera's travel (draw the set at least one panel width wider on the right), or clamp the camera pan. Check stills at 112.6, 113.2, 113.6, 114.0 across the full panel width.

### 6. 137.0-140.2 | MAJOR | "Others laughed" is thin: the laugh that provokes her barely shows

What is wrong: HA HA HA! is small and sits in the upper-left sky, far from anyone. The child looks shocked, not amused. The extra onlookers are a tiny head in a window and a figure cut by the right edge (138.7). The lower 40 percent of the panel is empty sand.

Why it matters: the laughter is the cause of her anger. It has to sting.

Fix:
- Reframe lower and tighter so the group fills the middle of the panel.
- Bring two more onlookers fully into frame, entering staggered at 138.50 (ورفعوا).
- Laughing acting for everyone except the first pointer: head tipped back, open smiling mouth, shoulders bouncing on different beats; the woman keeps `mouthCover`; the child points and laughs.
- HA HA HA! at headline size (at least 44 px at 1280x720 scale), popping one word at a time just above the heads from 137.04.

### 7. 162.5-165.7 | MINOR | The dust floats in the sky beside the villagers

What is wrong: after the off-screen fall, the dust is a brown blob hanging in the blue sky at the upper right, level with the woman's head (164.5). It reads as an odd cloud. In the wide at 162.2 the puff is a tiny outline.

Why it matters: the dust is the only sign of what happened; it should clearly rise from behind the houses.

Fix: anchor the dust behind the roofline (drawn before the buildings so the roofs overlap it), rising and thinning from 162.06, larger in the wide shot. The villagers' reaction (man's hand on chest and lowered eyes, woman's hands to her head) is good; keep it, and let the child turn to hide against the adult at 163.86.

### 8. 126.0-131.5 | MINOR | Village establishing shot: cropped rig, faint shadow, empty foreground

What is wrong: the rig is tiny and cut by the top-left corner (127.2, the tortoise is sliced by the panel edge). The ground shadow is very faint. The three villagers stand in a clump with a large empty foreground.

Fix: keep the whole rig inside the panel as it crosses; darken the `groundShadow` and let it slide over the child, which motivates his look up at 128.60; lower the camera so the figures sit larger.

### 9. 103.0-106.0 | MINOR | The bite insert is dominated by duck B's headless body

What is wrong: in the CHOMP! close-up the right half of the frame is duck B's torso with no head, and the stick runs behind the top of the tortoise's head until 105.5, so the grip is unclear (104.5).

Fix: frame only her head and the stick (duck out of shot), stick at mouth height in front of the head from the start; 105.44 jaw opens wide then clamps over it with `sq` and CHOMP!.

### 10. 14.2-15.2, 35.5-36.7, 68.2-70.5 | MINOR | Thought clouds: empty holds and one early giveaway

What is wrong: the story cloud is empty except for a stray horizontal line for about a second (14.2-15.2). The plan cloud shows only a stick for 2.3 s (68.2-70.5), and the white duck icon sits half outside the cloud's left edge from 70.7. At 35.5-36.7 the tortoise's own cloud, clipped by the top-right corner, shows hills with a blue shape, which gives away the lake before the ducks announce it at 43.54.

Fix: remove the baseline line and start the river as the cloud opens; bring the first duck icon in at 69.06 and keep both icons inside the cloud; in the 35.4 cloud show hills only, fully inside the panel, or replace it with a look and a "?".

### 11. 114.5-116.7 | MINOR | "Above the trees and houses": houses are slivers, UP! UP! is misplaced

What is wrong: the houses are only roof tops at the bottom edge, and UP! UP! sits at the bottom of the panel beside the chimneys, far from the rig.

Fix: let the rooftops rise further into frame for about a second around 115.04 (البيوت), and place UP! UP! beside the rig in the upper half.

### 12. 125.7-126.0 | MINOR | Sky jumps from yellow to blue

What is wrong: the flight sky is hot yellow through 125.7; the village and every later air shot is blue. The rig is the same, so the cut reads as a continuity slip.

Fix: blend the sky from yellow to blue across 123.4-125.9 during the pull-out (one `lerp` on the sky preset), so the viewer sees them leave the drought.

## Things that work (keep)

- Pond drying: level drop, cracks, A LITTLE WATER, the single foot ripple, her half-hide at 33.9.
- The 1, 2, 3 step counter and the panting at 38.7.
- The plan cloud once populated (71-80), and ONE RULE with the crossed-mouth icon.
- The low angle up with the arrow at 133.7-135.7, and the tilt up to her at 140.2-141.2.
- Anger: V brow, red-dot flush, steam, the "not a bird" crossed-out wings, the warning icon drifting away at 148.7-151.
- The ending: empty stick floating between the ducks, lowered lids, THE END clear of the faces, no moral on screen.
- Subtitles: Arabic large and clean, English legible in blue, accurate to the Arabic and in sync at every chunk checked. Blank caption panels at 40.0-40.7, 81.2-81.9 and 103.2-103.6 are natural paragraph gaps.

## Reusable techniques worth adding to the Library

- A camera helper that caps zoom so a list of named points (here both bill tips and the rider's head) stays inside the panel with a margin; it would have prevented notes 2, 3, 4 and 8.
- A set-coverage check for stills: fail when any panel column shows the bare background colour during a pan (note 5).
- `carryRig` release: a standard "spring up on unload" curve with a guaranteed minimum visible gap, plus an `aerialStrip` sky-blend parameter.

Second review advice:
Yes. Notes 1, 2, 3 and 6 are new staging, camera and acting work on the film's key beats (the release and hang, two re-framed close-ups with a cutaway, the pebble, the laughing crowd), and the re-framing can easily introduce new cropping or overlap problems. A second Fable review of v2 is warranted, and it can be limited to 81-84, 94-98, 103-106, 110-126, 137-141 and 141-166 plus a quick pass over the rest.
