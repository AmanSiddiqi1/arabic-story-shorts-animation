# HORSE-02 "Lost Above the Clouds" (80s Cel Anime): Fable review, round 2 (v2)

Film reviewed: `Animations/HORSE-02/renders/HORSE-02_v2.mp4` (151.5 s). Sources: all 26 contact strips in `review/v2_pack/strips/` (4 frames per second), about 60 full-size panel stills pulled from the MP4 at the moments cited below, every frame of 8.9-9.7 s, and a stillness scan of the panel. Times are seconds on the film; cue words are from `planning/inputs/timeline.md`.

## Verdict: PASS WITH NOTES

**No blockers.** The round 1 blocker is fixed: horse and rider leave as one unit, cross the moon disc as a clear pair (144.0-144.5), shrink to a dot right of the moon and never descend; the twinkle fires on the dot (146.5-147.0).

The film is ready for the owner. The story is in order, every narrated event has a picture, subtitles are sharp and complete in both languages, TO BE CONTINUED is present (147.2-151.5). The largest gain is the camera: from 48.8 s the people are about 1.5 times larger with the floor still low and the rug filling the bottom, so faces and hands now carry the meeting, the bench and the thanks.

The notes below are polish. If one more short pass is made before the final render, do notes 1 to 3 only: each is a small local change and each touches a narrated action or an owner point.

Not checked: sound was not listened to; stepped cel timing (twos) cannot be judged from stills.

## Round 1 notes, as seen on screen

| Note | Result in v2 | Evidence |
|---|---|---|
| 1 BLOCKER take-off | **Fixed** | 143.0-147.0: one unit throughout, pair on the moon at 144.2, dot and twinkle at 146.5-147.0. |
| 2 camera to the actors | **Fixed** | 48.8-81.7, 90.0-97.9, 101.5-114.7, 117.6-125.1, 132.8-140.6 at about 1.5x about the floor line; wides kept for landing, hover, garden reveal, guards, skyline, take-off. |
| 3 meeting | **Mostly** | Gap between the leads holds (49-63), maid half in the doorway with the lamp, cup and wave at 50.9 read. The point at the sky does not read (note 4) and the bow tips the wrong way (note 1). |
| 4 knock and controls | **Partly** | Only the princess goes to the horse; UP and DOWN tips sit on dial and lever and clear before the vault (81.0-81.7). The knock has lettering and a spark but no arm (note 2); YOU ARE JOKING! is still on the horse's head (note 3). |
| 5 ending | **Mostly** | Princess alone at the parapet, maid between her and the guards, guards shrug, cat hops onto the empty star tile (148.3-150.5): a good closing image. Her acting is very small in the wide (note 5). |
| 6 moon path | **Fixed** | 121.4-124.4 insert: glints gather (122.7-123.1), lock into a gold path that widens toward the viewer, gold caption below. The best new shot in the film. |
| 7 landmarks | **Mostly** | Rivers are blue everywhere; TWO TOWERS tip lands between the blue caps (129.5); the big dome is clear and glints (131.0). Nobody is at the parapet and no river reads at عند النهر 129.30 (note 9). |
| 8 series carry-over | **Mostly** | Opening matches episode 1 v2 (sun disc, three-layer deck, 0-5.8); rider's limbs read; title holds to 3.2. Land quilt remains (note 10); balloon tails remain wide black wedges (note 3). |
| 9 bench | **Partly** | Faces and hands read at 1.5x; talking hands, the withdrawn reach (109.3-110.4) and the return arc with her first smile (113.0-113.7) are there. 105.2-108.0 is still one pose each (note 7). |
| 10 picture clouds | **Not done** | King about 20 px tall at 66.0, 109.3; question mark tiny at 70.9 (note 6). |
| 11 eye close-up | **Not done** | 88.2-90.0 unchanged: eyes in the upper third, the rest cheek (note 8). |
| 12 smaller | **Partly** | Cat sits clear of heads, rest poses differ, title held. The STRANGEST HORSE balloon still covers the horse's head (note 3); hedge-top guards unchanged (note 10). |

## The owner's points

| Owner point | Met? | Evidence |
|---|---|---|
| Wide views, pans | **Yes** | Wides where the place is the subject (21.3 city, 25.7 landing, 83.5 hover, 98.8 garden, 126.7 skyline, 142.7 take-off); closer framings keep the floor low and the lower picture full. |
| Full scenes | **Yes, one exception** | Roof, garden and the moon-path insert are full. The land under the flight (14.5-21.2) is still a flat quilt. |
| Varied bright colour, no tint | **Yes** | Sunset, dusk, lilac night, green garden; skin and costumes keep their colours in every set. |
| English speech bubbles | **Yes, with the tail defect** | All speech is English. Tails are still wide black wedges and two balloons sit on the horse's head (note 3). |
| Every limb readable | **Yes** | Standing and mounted figures read; the dark horse keeps its brass and rim. |
| Library cast | **Yes** | |
| Light presentation | **Yes** | |
| No frozen holds | **Nearly** | Stillness scan finds only 40.4-42.3 (he is meant to freeze; the princess in the window moves little) and the end hold 148.9-151.5 once the cat has settled (note 5). |

## Notes (most important first)

### 1. 60.83-61.9 s (انحنى): the bow reads as falling over
- **What is wrong.** At 61.2-61.6 Firuz tips about 40 degrees to the LEFT as one rigid body, away from the princess, face still to the camera with a smirk, feet leaving the floor line. For half a second he looks as if he is fainting sideways. The cape covers the lower body.
- **Why it matters.** "Firuz bowed respectfully" is the narrated action and the turning point from intruder to guest.
- **Fix.** In `h02_roof.js` (`H2_BOW`, about line 66): bow toward her, so give `tip` the sign that leans him to screen right, peak about 0.3 instead of the present value, reached by 61.3 and held to 61.9 (فيروز 61.64), up by 62.4 (احترامًا). Feet stay planted (no `y` change). Near hand to the chest (`PERSON_HANDS.chest`), far arm out low and back, `lid` 0.8 at the bottom of the bow, eyes down then up to her on the rise with one blink. Cape arrives 0.1 s late as now. Her answer: palm lowers a little at 62.0, `lid` from 0.25 to 0.1. Check a still at 61.4: head lower than her shoulder, leaning toward her, both feet on the floor.

### 2. 73.88-74.6 s (إلى, الآلة): the knock has no hand
- **What is wrong.** TOK TOK and a spark appear on the horse's shoulder, but the princess stands facing the camera with both hands at her waist the whole time (73.7, 74.0, 74.2, 74.4 checked). The sound seems to come from nowhere. At 74.2-75.5 the maid slides in between the leads directly behind Firuz's shoulder, so the three are a row again for a second, and her lamp pops up over the horse's head at 74.4.
- **Why it matters.** Knocking on the "statue" is the picture of "she thought he was joking".
- **Fix.** From 73.6 turn the princess to the horse (`dir` toward it, gaze on the shoulder dial). Near arm with a world hand target (`handRW` or `handLW`) on the spark point: three raps on twos at 73.9, 74.1, 74.3 (hand 14 units back, then on the point), head tilted to listen at 74.5 (`tip` 0.06 toward the horse, `lid` 0.3). She turns back to Firuz at 75.66 (وظنت) with the hand on her hip as now. Maid: keep her at x 1160 or more, on Firuz's far side with at least half a body of gap; her lamp lean toward the brass eye comes from there (arm and lamp only, 74.3-74.9), not from between the leads.

### 3. 77.4-78.7 and 93.1-97.9 s: two balloons on the horse's head, wedge tails
- **What is wrong.** YOU ARE JOKING! lies across the horse's muzzle with a black wedge from its lower edge to her forehead (77.7). THE STRANGEST HORSE / IN THE WORLD! covers the horse's whole head and neck for 4.7 s and touches the rider's arm (93.6), with a second wedge; this is the line about the horse, and the horse's head is the thing hidden. Round 1 notes 4, 8 and 12 asked for both.
- **Fix.** In `h02_main.js` lines 60 and 67 (`h2SayAt`):
  - 77.4: put the balloon over open sky to the right of her head, between her and Firuz, above both heads (panel y about 330-380 at this framing); nothing over the horse.
  - 93.14: the horse is on the left and she is at centre right, so place the two rows right of the rider, top row no further left than her own head, bottom row above the maid; or pan the 1.45x framing about 80 units left so sky opens on the right. Check a still at 94.0: the horse's ear, eye, muzzle and the rider's face all visible.
  - Tails: cap the tail in `h2SayAt` at 70 long and 26 wide at the base (episode 1's `h1Say` rule) and start it from the balloon edge nearest the mouth. If `S.label` cannot do this, draw the balloon without `to` and add a small three-point tail in the balloon's own fill and outline.
  - The same tail rule for 56.2-59.6 and 119.3-126.3 (positions there are fine).

### 4. 59.74-60.83 s: the answer "up there" reads as a head scratch
- **What is wrong.** His hand goes up beside his temple with the elbow bent (60.1-60.8), eyes shut and then up. It reads as scratching his head. Princess and maid do not visibly look up.
- **Why it matters.** Pointing at the sky is the scene's joke and sets up YOU ARE JOKING!
- **Fix.** Use `PERSON_HANDS.pointUp` on the arm away from her, arm straight above the shoulder, hand clearly above the crown (if the gesture is too short at this scale, set the hand target about 70 units above the head). Sequence: 59.74 mouth opens; 59.95 shuts; 60.10 arm shoots up in 3 drawings with a 4-unit overshoot, eyes up (`gaze` [0, -1]); 60.3 the existing blip. Princess `gaze` up at 60.35, back to him at 60.7 with a blink; maid the same 0.2 s later with the lamp rising 10 units. Arm comes down into the bow of note 1.

### 5. 143.5-151.5 s: the last image is right, her acting in it is too small
- **What is wrong.** The staging is now correct (princess alone, maid shielding, guards shrugging, cat on the empty tile). But in the 0.62 wide she is about 60 px tall in a 1196 px panel and faces the camera with her arms folded; the wave, the hand on the heart and the look at the sky cannot be seen. From 148.9 the frame is almost still to the end.
- **Why it matters.** The last line is "the princess wondered whether he would return".
- **Fix (no new staging).**
  - Turn her to screen right, toward the dot: `dir` to the right from 143.9, head tipped back (`tip` -0.05, `gaze` up-right). Arm fully up for the wave 143.9-145.74 (هل), then hand to the chest by 146.6 as now.
  - From 147.3 push slowly from the 0.62 wide to about 0.85, scaled about the floor line and centred between her and the star tile (about x 880), arriving at 150.5. The moon stays in the top of the frame, the title stays where it is, the guards drift to the right edge. This gives the hold its motion and brings her and the cat to a readable size without emptying the lower picture.
  - In the hold: veil ribbon and the maid's lamp flame keep moving; her slow blink at 149.5; the cat's tail curls once at 150.6 after it looks up.

### 6. 63.5-71.2 and 108.2-113.9 s: picture-cloud contents are still postage stamps
- **What is wrong.** The clouds are a good size, but inside them the palace fills the frame and the people are specks: king and prince about 20 px at 66.0; the flying horse and the red question mark a few pixels at 70.9, over a patch of the quilt; the worried king about 20 px at 109.3 and the returning horse beside him at 113.4.
- **Why it matters.** "Son of a distant king" and "his family was worried" are told only by these pictures.
- **Fix.** One large subject per beat, as round 1 note 10: 64.86 (ابن) the king's bust with the emerald crown, Firuz small beside him, palace as a soft backdrop; 67.98 (طار) horse and rider at a quarter of the cloud's width on a dashed arc over plain sky; 69.94-70.48 the dashes fray into loops and a question mark at least 60 px tall. 108.10 (أسرته): the king's head and shoulders at half the cloud's height, arm reaching into an empty sunset sky, `wet` eyes; 111.78 (إليها) the small horse appears in that sky and his face lifts.

### 7. 105.2-108.0 s (أخبرها ... أن): the bench goes quiet before the worry
- **What is wrong.** After both country clouds pop off together at 104.7, Firuz sits with crossed arms and half lids and the princess with a hand at her chin, unchanged for almost 3 s (105.6, 106.6, 107.6 are the same drawing apart from the mouth).
- **Fix.** 104.86 (أخبرها): his hands sink from the crossed pose to his knees over 6 drawings, head down a little after the shoulders (`lagged`), smile gone by 105.4. 106.98 (فيروز): he looks at her, then away to screen left (toward home), one blink on each turn. She leans in about 8 units at 107.0 and lowers the chin hand to her lap. Let the two clouds leave one after the other (his at 104.6, hers at 104.9).

### 8. 88.2-90.0 s: the eye close-up is mostly cheek
- **What is wrong.** Unchanged from v1: the eyes sit in the upper third, 55 percent of the panel is flat skin with a nose line and a small mouth. The lids do open a little between 88.3 and 89.7 and the horse's reflection in the pupils is a nice touch, but it is too small to notice. A tracking tear crosses the brows at 88.3.
- **Fix.** Crop to the band from brows to the bridge of the nose so the two eyes fill the panel width. Start with `lid` about 0.35 and low brows at 88.2, open fully over 6 drawings to 89.66 (عينا), brows up, irises a little larger; the reflected horse about 2x its present size, sinking as the horse lands; one blink at 89.9. Keep the tracking tear clear of the eyes (move it to the top edge or drop it on this cut).

### 9. 126.7-132.8 s: the landmarks are named, but nobody stands at the wall and the river is missing
- **What is wrong.** Arrows and glints now land on the right things. Firuz and the princess still stand in front of the horse facing the camera; she points across her body at the towers (128.2-129.7) and he looks at the camera. At عند النهر (129.30) nothing marks the river, and the orange tree hides the foot of the towers where the water would be.
- **Fix.** Both at the parapet at about x 900-960, turned toward the city, so their heads overlap the water band. Her arm to the towers at 128.48, down to the water at 129.30 with a short run of the gold glints from the moon-path insert on the river band between dome and towers, across to the dome at 130.24. His head follows each with a blink; he counts one, two, three on his fingers. Move the potted tree about 150 units right in this shot, or start the pan 100 units further left.

### 10. Smaller things
- **9.2-9.5 s, cloud pass.** Frame by frame: the deck clears, the horse hangs in open blue sky for 3 frames (9.2-9.3), then 5 frames are plain pink with no horse (9.3-9.47), then the horse reappears behind a white band. It reads as a flash and a pop. Start the pink puff wipe while the deck is still on screen (no clear-sky frames in between) and keep the rig drawn under the puffs at reduced alpha so it never vanishes.
- **14.5-21.2 s, land plate.** Still the yellow and green quilt with thin cyan squiggles (round 1 note 8). The blue river now reads. If time allows, replace the tiles with episode 1 v2's hills, fields and walled towns; otherwise soften the checker contrast by half.
- **115.0-117.5 s, guards at the hedge.** One helmet and one spear tip stand still at the centre under TRAMP TRAMP. Show both helmets, the spear and the torch flame sliding along the hedge top from the right edge, half a step out of phase.
- **117.7-121.2 and 124.5-125.2 s, stair arch.** Maid, Firuz and princess overlap shoulder to shoulder in the arch, the maid in front of Firuz. Put the maid one step up inside the arch (behind and higher), Firuz on the threshold, the princess outside it with her hand on his sleeve, a visible gap between the two leads.
- **Cat, 45-95 s.** It now sits clear of heads, but at the 1.5x framing it is a large orange shape exactly between the two leads in front of the tree, in one pose for 50 s. Move it about 150 units left along the parapet (over the water, clear of the tree) and give it an ear flick or tail curl every 6-8 s.
- **135.0-140.0 s, map.** The cream beam from the scroll to the card still crosses the horse's muzzle. Shorten it or shift the card 80 units right.

## Keep as is
- 1.9-5.5 lever insert; 21.3-25.5 city wide with THAT ROOF!; 25.7-29.6 landing; 33.5 the look back at the tied horse; 39.2 CLACK.
- 48.8-59.6 the meeting at the new scale: the caught-with-the-cup wave (50.9) and her raised palm (55.2).
- 81.0-81.7 UP and DOWN on the brass; 83.5-87.5 the hover.
- 121.4-124.4 the moon-path insert.
- 143.0-147.0 the flight across the moon; 148.3-150.5 the cat on the empty tile.

## Reusable techniques worth adding to the Library
- **`h2Push` (zoom about the floor line, x drawn to the actors):** it delivered actor-size framings without emptying the lower picture. Move it into the template camera and add it to the Capabilities Guide under camera.
- **Rider scale follows the mount** (`ehRide` / `rideOn` default `s` from the mount): now proven by the take-off; adopt as the default.
- **Glints that gather into a path** (`h2MoonInsert`: scattered highlights slide together in about 8 drawings, a 3-frame flash on lock, then shimmer): a general "the scattered thing becomes a sign" device for water, stars or sand.
- **Empty-place ending:** an animal walking onto the spot the hero left and looking up; a cheap, strong closing image for departures.
- **Balloon rule for the style guide:** a balloon about a thing never covers that thing; tail at most 70 by 26. Worth one line in `Library/styles/cel-anime-80s/look.md` under English speech bubbles, and a tail cap inside the shared balloon helper.
- **Bow helper:** a `bow(t, t0, toward)` for the person figure (lean toward the partner with feet planted, hand to chest, late cape) would stop `tip` being used with the wrong sign; the same fault can recur in HORSE-03 to 05.
