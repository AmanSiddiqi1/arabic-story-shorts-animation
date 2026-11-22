# HORSE-03 "The Promise and the Theft" (80s Cel Anime): Fable review, round 1 (v1)

Film reviewed: `Animations/HORSE-03/renders/HORSE-03_v1.mp4` (144.4 s). Sources: all 25 contact strips in `review/v1_pack/strips/` (4 frames per second), 48 panel stills and 6 full-resolution crops pulled from the MP4 at the moments cited, a frame-difference scan of the panel at 4 fps, and the scene sources for the causes named below. Times are seconds on the film.

## Verdict: REVISE

**No BLOCKER.** The story is in order, every narrated event has a picture, subtitles are sharp and complete in both languages, the plan-then-reality structure works, TO BE CONTINUED is present.

REVISE because four things clearly hurt the story or the owner's points:
- **The ending does not show an empty bower.** From 111.6 to 144.4 a large stiff striped slab (the cover cloth) hangs in the air exactly where the horse stood. The same stripes meant "the horse is hidden here" for 55 s, so "he found neither horse nor princess" is contradicted by the picture (note 1).
- **The hero's face is behind a rose garland for the last 20 s**, and the inventor's during the trick (note 2).
- **The cast is washed out in the sky at the film's loudest moment** (TAKE ME BACK! / NO!), by a half-opaque cloud layer drawn over the riders (note 3).
- **Episode 2's rider-scale fault is back** inside the plan cloud: the horse shrinks to a toy under two full-size riders (note 4).

What is already right and should be kept: the homecoming wide and push-in (2.5-9), the hug; the striped lump with the horse's silhouette and the brass hooves (35.8-91); the caravan with the hood pushed into a point by the turban (40.5-48.9); the whole idea and look of THE PLAN (bowing acrobat, the cloth whipped away in one go, the cardboard prince on a stick at 64.6, the leap at 70.5); the real inventor's eyes and turban over the hedge under his own daydream; UP and DOWN tags on the real controls (96.3-98); the knob insert (107.9-109.5); the impact frame with the cat in mid-air (110.4-110.9); RIP!; the kicked stool; Firuz's shocked entrance (121.6); the dashed outline of the princess on the bench (125.5); the scrap insert and the clue cloud (129.1-133.9); the fading gold trail. Day, dusk and golden hour are three clearly different repainted plates and no tint lies over the cast on the ground.

Not checked: sound was not listened to; stepped cel timing cannot be judged from stills.

## The owner's points, as seen on screen

| Owner point | Met? | Evidence |
|---|---|---|
| Wide views, pans | **Yes, over-applied in dialogue** | Good wides: 2.5 palace, 34.5 garden, 111.7 launch, 136.5 ending. Good pans: 9.6-17.7, 40.5-48.9. But the roof (18.9-34.4) and the real trick (82.5-101) never come closer than a wide: figures 17 to 23 percent of panel height (owner reference about 30), sky with one cloud in the upper half (notes 5, 6, 12). |
| Full scenes | **Yes** | Home palace, roof, day garden with river, sails and town, desert road are full. The upper half of the garden shots is one flat blue with a single cloud. |
| Varied bright colour, no tint | **Yes on the ground, no in the sky** | 114.4-120.6: horse and riders are grey and pale behind `ehSkyFront(..., a: 0.5)` (note 3). |
| English speech bubbles | **Yes** | Nine balloons, all English, legible. Tails are still the wide black wedge (99.3, 116.4, 138.6) (note 12). |
| Every limb readable | **Mostly** | Standing figures are clear. Riders at 106-110 are a readable pair (two faces, his turban above her veil) but a rose garland crosses them; in the sky they fade into the clouds. |
| Library cast | **Yes** | Person presets, cat, camels, donkey. |
| Light presentation | **Yes** | Cream housing, light caption strip, gentle CRT. |
| No frozen holds | **Yes** | Difference scan: no span of 1.5 s or more without change anywhere; the end hold (140.2-144.4) keeps cape, cat, clouds and a bird moving. The 31 s cloud changes every 1 to 2 s (note 8 for its weak stretch). |

## Notes (most important first)

### 1. 111.56-144.4 s (S16-S20): the cloth must not hang where the horse was
- **What is wrong.** At 111.56 the cloth heap on the path turns into a rigid 300 x 150 rectangle, tilted, floating above the bower (`h3Cloth` last line; `h3AfterWorld` draws `ehClothSpread(1110, 690, 300, 150, -0.25, ...)`). It is the biggest and brightest object in every frame of the ending, larger than Firuz, with no sag and nothing holding it. It also sits on top of the horse's ghost outline at 124.7-125.7, which is then nearly invisible.
- **Why it matters.** The film ends on absence. The stripes are the film's sign for "horse here".
- **Fix.** Leave the cloth as the heap on the path. At 110.36-111.2 let the launch draught flip it once (heap at 1040 slides to about 960 with one billow, `ehClothMix` heap to a small spread 120 x 60 and back to heap, settle by 111.6) and keep `ehClothHeap(960, 908)` through S18-S20. Nothing above the ground at the hide spot except the bower posts and roses. Then make the absence visible: four hoof dents darker and larger (they do not read now), petals still drifting down at 120.6-123, and the horse ghost outline at 124.70 (الحصان) drawn 4 px, held 1.0 s, on a clear background. If a cloth on the bower is wanted at all, it must be a small limp rag over one post (at most 90 x 60, sagging, fringe down), never a flat sheet.

### 2. 90.5-110.3 and 124.2-144.4 s: the rose branch covers the actors' faces
- **What is wrong.** `ehRoseBranch` is drawn after all figures. Pulled aside (`h3BranchAside` = 1 from 90.52, and again from 124.22) it stands nearly upright at the bower, exactly where the inventor (x 1130 to 1200) and later Firuz (x 1150, then 1120) stand. Roses and leaves cross the inventor's chest and cheek during the lie, the look to camera at 99.3 and the mount (93-110), and cross Firuz's eyes and mouth at 124.9-128, then his chest and chin to the end. Firuz's feet are also behind the fallen stool.
- **Why it matters.** The mask-off looks and the fading smile, the understanding and the vow are the two best acting passages of the plan. Neither face is clear.
- **Fix.** When aside is above 0.5, draw the branch in the depth-sorted rows behind the figures (row key about 880) in both `h3GardenWorld` and `h3AfterWorld`; keep it in front only while it lies across the hide spot (36.7-90.5). In S18-S20 stop Firuz at x 1090 for the bower beat (124.65-127.6) and kneel at x 1060, left of the bower post and clear of the stool (move the fallen stool to x 1230, right of the dents). Check stills at 93.0, 96.9, 99.3, 106.0, 124.9, 127.0, 131.2, 138.6: no leaf on any face.

### 3. 114.42-120.58 s (S17): the riders fade into the clouds
- **What is wrong.** `ehSkyFront(ctx, t, { ..., a: 0.5 })` is drawn over the rig. Horse, princess and inventor are pale grey, the red saddle is pink, the lever glint at 118.95 is lost. TAKE ME BACK! and NO! are spoken by two ghosts.
- **Why it matters.** This is the emotional peak (she is angry, he plugs his ear) and the owner's first colour rule: no haze over the characters.
- **Fix.** Draw the front cloud layer before the rig, or keep it in front only below the hooves and at the panel edges (mask out a 520 x 520 box around the rig), at most `a: 0.15` anywhere near the figures. Keep the rim light. Give the two poses more contrast while there: 115.46 (تطلب) her mouth wide, brow down, free arm straight out and back at the dome (the arrow already follows it); 117.70 (رفض) his head shake larger (`tip` plus or minus 0.2, three swings on twos); 118.50 (يستمع) the finger in the ear held with a small smug bounce; 118.8 her eyes on the lever with a glint that reads (36 px). The riders already scale with the horse at 119.2-120.2: keep that.

### 4. 80.1-82.5 s (S12): toy horse under full-size riders in the plan cloud; HEH HEH! is too short
- **What is wrong.** As the imagined horse flies off (80.1 on) the horse gets small and the two riders stay full size: at 81.0-82.0 two people float with a toy between their feet. This is the rider-scale fault that was the blocker of episode 2. HEH HEH! is on screen only 81.7-82.3 (0.6 s) and the cloud is already gone under it.
- **Fix.** In `h03_plan.js` make both riders' `s` follow the plan rig every frame, exactly as S17 does (`s: D.s * H.s / H3_HS`), with tail and veil ribbons. Check stills at 80.2, 81.0, 81.6, 82.0: one unit, shrinking together. Simplest staging: do not shrink at all; let the pair fly out through the right edge of the cloud at full size by 81.6 (رفض 81.06 plus 0.5). HEH HEH! from 81.1 to 82.5 beside the real turban, the cloud bursting at 82.0 as now, the real inventor's shoulders shaking (`tremble`) until the cut.

### 5. 82.53-101.43 s (S13-S14): the real trick needs distance, a closer camera, and visible masks
- **What is wrong.** He walks in and stops beside her; from 85.3 to 101 princess and inventor stand shoulder to shoulder facing us (gap 120 to 180 units), he in front of the horse. "She backs away" (84.66) is a 50-unit shuffle. At zoom 0.85 to 1.0 they are 20 to 23 percent of the panel under an empty sky, so mask on / mask off (87.6, 99.3) is a few pixels of eyelid. Her two glances at the empty gate do not read.
- **Why it matters.** The repeat only pays if the real thing is visibly harder than the daydream and if we see him lie.
- **Fix (same cues).**
  - Positions (`H3_INVG_X`, `H3_PRG_X`): he stops at x 1090 for the bow (85.30) instead of 1010; she rises at 84.66 and retreats in two real steps to x 800 (cat moves to the bench end at 740), weight back, palm up. Gap about 290. At 91.4 she comes only to x 940, he is at 1150 with the cloth over his arm (gap 210); at 95.7 he goes to 1210 at the knob. She crosses to the stool only at 100.9.
  - Camera: frame the pair at about 1.3x the present zoom scaled about the path line (feet stay near panel y 930-955, so sky is cropped, not ground): centre x about 960 for 84.4-91.4, about 1080 for 91.4-101.4. Slow push on وقال 85.30, pan right with the cloth tug at 90.52. Stay wide for the entrance (82.53-84.4).
  - Mask off twice, as planned, but playable: at 87.36 (فيروز) she looks over her shoulder at the gate for 0.7 s (head `tip` away, blink on the turn); in that window his smile drops, `lid` 0.5, `brow` 0.4, eyes flick to the cloth and back; smile back on a blink when she returns. At 99.04 (ينتظرهم) she looks over the hedge to the right; he looks straight out at us for 0.8 s, lids low, one eyebrow up; then the nod at 99.94.
  - Balloons stay in the sky band above the speaker, clear of the horse's head and the UP / DOWN tags.

### 6. 18.94-34.39 s (S4-S5): the roof is a seven-person line-up in front of the horse
- **What is wrong.** Firuz, princess, king, queen and two guards stand in one row facing the camera at 17 percent of panel height, the horse behind them, the upper 55 percent dusk sky. The password moment (19.9), her hand on her heart, the bow and the crown (22.2) cannot be read. I WILL COME BY LAND (25.1) sits on the horse's head and the cat. The trunk gag (29.76-33.3) is hidden: the maid and her stack are behind the horse's rump, only a green block shows, and the slide and thud are a few pixels.
- **Why it matters.** This is "the promise" of the title, and the trunk is the scene's one joke and the proof of "only two".
- **Fix.**
  - 18.94-23.08: frame at about 1.35x scaled about the floor line, centre between Firuz and the princess (x about 870). The two leads turn to each other (gaze, `tip` 0.04 toward, `dir`), 140 units apart. Parents enter from the pavilion at 20.90 and stop 180 units right of her; pan right 120 units with them and back on أسرتها 22.22 for the bow. Guards stay at the pavilion door, half in frame.
  - 23.08-29.7: same framing; the picture cloud above them (see note 11), I WILL COME BY LAND above her head, tail to her, not on the horse.
  - 29.76 (فالحصان): pan left to the horse, centre x about 640. The maid walks in from the left edge in front of the parapet and stands clear of the rump at x about 470. 31.08 counter 1 over the front seat, 31.36 counter 2 over the rear seat, 31.98 (إلا) she sets the top trunk on the rump, it slides back and off (`fallY`, `impactSquash`, small dust), ONLY TWO SEATS! at 32.48, the cat lands on the trunk at 33.0, Firuz's shrug in the pause.

### 7. 134.66-144.44 s (S20): the vow is spoken by a speck
- **What is wrong.** The crane to zoom 0.62 starts at 135.7 and is finished by 137.0, so I WILL BRING THEM BACK SAFELY! (137.80) points at a figure 10 percent of the panel high. Scrap into the sash, fist to chest, set jaw, cat at the boot: none can be seen.
- **Fix.** 134.66 (نظر): he rises, eyes then head go up (blink on the turn), camera at about 1.15x of the S19 zoom, tilted so he stands in the lower third and the gold trail enters the top of frame at 136.46 (السماء). Hold that framing through 137.10 (وقال: scrap tied into the crimson sash, a saffron tail left showing) and 137.80 (سأعيدهما: fist to chest, cape lifting, balloon in the sky beside the trail). Start the crane out on بأمان 139.38 (cat leans on his boot first, 0.3 s), reach 0.62 by 140.6 as TO BE CONTINUED flickers on. The end hold keeps the wide.

### 8. 51.6-82.53 s (S9-S12): the plan cloud is alive; strengthen its last third and the garden under it
- **Finding.** It does not read as a frozen hold: the cloud changes on every cue (entrance 52.2, bow 53.7, cloth 55.7, clap 57.5, question mark 58.8, controls 61.7, cardboard prince 64.6, mount 67.7, leap 70.5, knob 73.0, lift 74.8) and the cut to the closer frame at 67.67 helps. Keep all of it.
- **What is weak.** (a) 75.5-80.0: the cloud is an empty lilac field with one drifting tree; the riders hold one silhouette, and "she points down", "he shakes his head", "folded arms" are not readable at 13 percent of the panel. (b) Below, the real princess reads in one pose for 31 s and the cat sits; only the turban moves.
- **Fix.** (a) During the flight scale the cloud's inside camera up to about 1.35 (riders about 170 px on screen) and give the cloud its own passing puffs and two speed streaks; 78.10 (فطلبت) plan princess arm straight down, mouth open, a small DOWN? arrow under her finger; 80.10 (لكنه) his head shake wide; 81.06 (رفض) arms folded, chin up, eyes shut. (b) Three small real-garden beats tied to the lie above: 57.54 the real princess turns a page and smiles at her book exactly as the plan princess claps; 66.0-67.5 (the pause) the cat's full stare at the hedge, the turban sinks to the brow and comes back; 70.46 the real inventor winces and one hand comes up to his back above the hedge on the imagined leap.

### 9. 48.92-51.60 s (S8): the turban rising behind her is easy to miss
- **What is wrong.** The suspense beat (سرًا 49.94) is a small saffron shape rising between a lamp post, the tree and the striped lump, all warm colours, in a wide shot. Eyes appear only later.
- **Fix.** From 49.6 push to about 1.35x centred on the hedge between bench and bower (x about 1040, y about 800); hedge shiver at 49.7, turban up at 49.94 with two leaves falling, eyes clear of the hedge by 50.3 and sliding left to her, then right to the cloth (0.4 s each); cat's ear turns at 51.0 as planned. Move the lamp post or the peek point 40 units so nothing warm is behind the turban. Ease back to the plan framing as the cloud opens at 51.60.

### 10. 9.60-17.72 s (S3): the king scowls through his son's story; the plant is not a plant
- **What is wrong.** While Firuz tells the tale the king has brows down and folded arms (clear at 16.9), and so has the merchant: the household looks cross, not delighted. The inventor stands in the open left of the cypress as one more listener, so "only his eyes stay on the blue dome" (17.0) is lost.
- **Fix.** King: `brow` -0.3, smile, hands clasped at the chest, a proud nod at ذراع 11.84, mouth 'o' at الغيوم 17.0. Vary the listeners (one hand to the cheek, one pointing at the cloud, the child bouncing); nobody folded. Inventor: keep him behind the cypress with only turban, eyes and one hand showing (the cypress front layer already exists), ear cupped at بعيدة 15.46; at 17.0 every head tips up to the cloud and his eyes stay level on the blue dome, with one small glint on the dome inside the cloud.

### 11. 10.7-17.6, 24.5-30.0, 42.8-46.0 s: thought-cloud pictures show their rectangles
- **What is wrong.** Inside the clouds the pictures are pasted rectangles with visible hard edges: a paler sky box inside the white cloud (11.0-17.5); three flat blocks of green, tan and green with vertical seams and nothing in them for 2.5 s (24.5-27.0), which looks unfinished; two palace sprites overlapping with a pale-blue box between them (43.7-45.5). The cloud at 43.0-44.7 also covers the THE INVENTOR tag ("...OR").
- **Fix.** Clip every cloud picture to the cloud outline and paint its background edge to edge (one sky gradient, one ground with a horizon, the dashed road drawn from the first frame). In the 24.9 cloud show her palace left and his palace right from the start, sun and moon passing at 26.32, the escort entering at 27.62. In the 42.8 cloud cross-fade or slide one full picture to the next. Keep THE INVENTOR tag clear: tag at the left of the hood until 43.6, or open the cloud 120 units higher.

### 12. Inherited series issues (apply together with the HORSE-01 v2 and HORSE-02 v2 fixes)
- **Figure scale and empty sky.** Outside the wides listed in the table, bring ground dialogue to the owner's reference scale (about 30 percent of panel height) by zooming about the ground line. Besides notes 5 to 7 this applies to 36.5-40.4 (the hoof that will not hide: figures are 13 percent; go to about 1.4x centred x 1100 after the cloth lands at 36.5, wide again for the exit at 39.9) and 101.4-107.9 (the mount: about 1.25x centred on the horse). Where a wide stays, put life in the upper half of the garden sky (two more cloud bands, swallows, a kite over the town).
- **Rider scale.** Wherever the horse rig changes size, riders, cape, veil and ribbons take the same factor (one helper for the series; note 4 is this episode's case).
- **Balloon tails.** Use the narrow tail from the revised episodes; the black wedge at 99.3 lands on the inventor's turban and at 138.6 on Firuz's crown.
- **Series colour changes** from episode 1 v2 (mounted prince's arms against his tunic, sky deck) to be copied into this episode's `horse_*.js` files when they are final.
- **Mount legibility.** At 102.6-105 the princess sits facing us on top of the saddle with both legs to the front while the inventor stands in front of the hindquarters. Seat her 12 units lower and let him wait at x 1060, clear of the horse, until فركب 105.36, so the two-stage scramble is seen against the horse, not in front of it.

## Motion ("alive" checklist)
- Nothing frozen: confirmed by the difference scan and the strips. Groups are out of sync, blinks and sways are present, the stool, the cat's spring and the launch have weight and shadows.
- To improve while implementing the notes: the princess's 31 s reading pose (note 8b); the riders' single silhouette in both flights (notes 3, 8a); the walk-in at 84.1-85.2 is quick for an old man (give it the full 1.1 s with a visible stop and settle, turban tail arriving late).

## Reusable techniques worth adding to the Library
- **Plan-then-reality in one frame:** a large `thoughtCloud` with its own inside camera above the live scene, the dreamer acting below it. Works for any story that tells an event twice.
- **`coverCloth` draped over a figure** (silhouette lump with a hem wave and fringe) and **`cardboardPrince`** (a cut-out on a stick as a visual lie).
- **`ghostOutline`** (dashed flickering outline of what is missing) and **`twoRiders`** with the rear arm redrawn over the front rider.
- Rule for the guide: a movable foreground branch or prop goes in front only while it hides something; once pulled aside it joins the depth-sorted rows behind the actors.
- Rule for the guide: front cloud or haze layers are never drawn over the cast (mask the rig box).
