Verdict: REVISE

# AN-046 The Sparrow and the Peacock: Fable review, round 1

Reviewed: `renders/AN-046_v1.mp4` (176.33 s) through all 30 strips in `review/v1_pack/strips/` plus 28 full-size frames and montages in `review/v1_pack/extra/`. Camera values below use the film's own `a46cam(cx, cy, zoom)` keys in `src/a46_main.js`.

## Summary

The story is told in order, nothing is missing, and the film ends properly (THE END 173.2-176.3). Subtitles are correct and readable. Several beats already work well and should be kept as they are: the fan snap and WOW (9.7-10.7), THE POSE (80.0-82.5), the eyes in the bush (120.7-121.5), the dive and STOP! (127.2-131.5), the tented net and TRAPPED! (138.5-144.7), the badge dropping through the bars (161.4-162.2).

It needs a v2 because the three moments the fable depends on are the weakest pictures: the throw of the net (the hunter is a head behind a bush and the net is an opaque slab), the sparrow in the cage (his face cannot be read) and the last shot (tiny figures, and the waiting peacock reads as a black bush). Two setups also fail to land: the peacock is hidden behind the throne rock while he is being elected, and the minister's badge is a dot of a few pixels, so its pin, touch and fall do not connect. A general cause runs through most notes: the camera is too wide and too high, so the action sits in a thin band while the top half of the panel is empty sky.

No BLOCKER.

## Notes

### 1. 132.6-137.6, MAJOR: the throw does not read
- **Wrong.** At 135.2-136.5 the hunter is only a head and two small fists above the bush (frame 135.4), so there is no wind-up, stretch or release. The net in the air (136.2-137.2) is a flat, opaque dark grey slab that reads as a rock, not a net. The mesh shadow under the birds starts at 133.8, about 1.4 s before the hunter rises and 1.8 s before he throws, so it is a shadow of nothing. During the still beat (132.6-135.1) the camera crops the bush at the right edge, so the threat the audience should be watching is nearly out of frame.
- **Why it matters.** This is the event of the fable. The viewer should see the danger rise, the birds not see it, then the net open over all three.
- **Fix.**
  - Still beat 132.6-135.1: reframe to about `a46cam(840, 730, 1.45)` so the three sparrows are left of centre and the whole bush is in frame. Keep the birds dead still (pupils only). Put the suspense in the bush: the cap feather rises at 133.53 ("وفي"), the two eyes appear at 134.14 ("اللحظة"). Remove the early shadow.
  - 135.19 ("ألقى"): the hunter stands up to the waist above the bush (draw him after the bush from the belt up, or step him out to the bush's left side), both arms at full stretch overhead holding the bundled net. 135.64 ("الصياد"): 3-frame whip forward and a follow-through lean.
  - 136.26 ("شبكته"): the net flies as open, see-through mesh, the same lattice as the landed dome at 137.5, opening from a bundle to full width with rim weights trailing. The mesh shadow starts here and grows until impact.
  - 137.08 ("على"): the sparrows look up, the two fighters hug. 137.56 ("الثلاثة"): landing, panel shake and the 1 2 3 counter exactly as now.
  - Keep the hunter and the birds in one frame for the whole throw (about `a46cam(900, 700, 1.4)`); do not let the net leave the top of the panel.

### 2. 150.8-164.5, MAJOR: the caged sparrow cannot be read
- **Wrong.** For 13.7 s, the emotional close of the film, the hero is behind dense yellow bars with a green tree directly behind the cage, turned away to the left with his head at the cage edge (frames 152.2, 153.4). Eyes, lids and head sink are not visible. Two pink dotted balls sit on top of the cage beside the ring; they look like the companion's hands with no arms or body attached.
- **Why it matters.** "He remembered the peacock's words" is carried only by his face. The planned slack wings, long blink and head drop are lost.
- **Fix.**
  - Clear background: move the cage (or the tree) so only flat sky is behind it.
  - Fewer and thinner front bars (5 or 6), with a gap where the head is. Draw the bird about 1.25x larger inside the cage, three-quarter to camera.
  - Either draw the companion's forearms and body edge holding the cage, or remove the two balls and stand the cage on the ground.
  - Acting on the words: slow breathing from 150.9; eyes lift to the cloud at 153.34 ("كلام"); `wet` rises and one long blink at 154.80; eyes to the second cloud at 156.64 ("الخطر"); cloud fades 159.24; badge slips at 161.44 ("منصبه") and his eyes follow it down; head drops with lids half closed at 163.64. No flapping.
  - The first cloud (the king in THE POSE) is good. The second cloud (156.7-159.3) shows trees and a small red "!" only: put the net and the grain in it, large, so "the danger he feared from the start" is visible.

### 3. 164.5-173.0, MAJOR: the ending is too small and its last image is not readable
- **Wrong.** The two men and the cage are about 90 px tall in a frame that is half empty orange sky and one third bare ground (frame 166.2). The sun sits directly behind the hunter's head like a halo. They stand almost still from 164.5 to 169.5 and then leave the frame in half a second. The sparrow's last look back (167.86) cannot be seen. At 171.7-176.3 the "peacock waiting on the far mountain" is a black spiky blob that reads as a bush or a hedgehog. The fallen badge is cut by the left edge from 172.0.
- **Why it matters.** The narration here is the moral's last line: the bird who a moment ago was minister to the king. The picture should give the men walking away, the small face looking back, the badge left behind, and the friend who waits.
- **Fix.**
  - Open tighter, about `a46cam(900, 700, 1.5)`, with the sun moved clear of the figures (low between the hills, left).
  - The walk starts at 165.82 ("الصياد") and continues evenly to the right until about 170.2 using `walk` + `footfalls`; the cage swings with `swing`; the companion follows with the sack from 166.78.
  - 167.86 ("الطائر"): cut-in of 0.9 s on the cage at zoom about 2.4: the sparrow turns his head back toward the nest tree, one blink. Then back to the wide.
  - 170.48 ("وزيرًا"): push to the badge in the dust, one glint, as now.
  - 171.34 ("لملك"): lift to the mountain. Redraw the silhouette as a peacock in profile: long neck, crest stalks, closed train hanging down, one foot tapping (the 42.0 wait), beside an empty post. At least 120 px tall on screen: about `a46cam(A46_MTN[0], 560, 2.3)`. Hold it under THE END.

### 4. 15.2-27.7, MAJOR: the candidate is hidden while he is elected
- **Wrong.** From his entrance at 15.2 the peacock stands behind the throne rock and is cropped by the right panel edge; only a head and neck show (frames 16.2-27.5, full size at 25.0). At 24.40 ("الطاووس") the sparrow's arrow ends on the rock. His "me?" at 25.10 is a few pixels. The flock that says YES! (26.5-27.5) is a small cluster at the left edge. The crown lands at 27.30 on a head at the frame edge.
- **Why it matters.** The friendship that later costs the sparrow everything is sealed here. The audience must see whom he points at and how the peacock takes it.
- **Fix.**
  - Stand the peacock in the open on the terrace, left of the throne (about x 600), fully in frame from 15.2. The throne with the dashed crown and "?" stays empty behind him.
  - S3 22.0-26.2: about `a46cam(600, 660, 1.3)` so the sparrow on the post and the whole peacock share the frame; the arrow ends on the peacock's chest at 24.40.
  - 25.10 ("ملكًا"): the look behind himself, then back, wing to chest, with `neck` and `headRot` large enough to read.
  - 26.58 ("فوافقت"): wide enough for at least four flock birds hopping, staggered. 27.30 ("الطيور"): crown drop centred on him, half fan for joy, then he steps onto the throne.

### 5. 31.8-162.3, MAJOR: the badge is too small to carry its payoff
- **Wrong.** In the king's wing at 31.2 the badge is clear (yellow disc, red and blue ribbon). Once on the sparrow it is a yellow dot of about 10 px (frame 126.5) and at most zooms cannot be seen (33.4, 86.0, 117.3). At 117.10 nothing visibly happens to it, and the MINISTER! lettering sits down by the nest instead of by the badge. When it falls at 161.44 it is suddenly large.
- **Why it matters.** Pinned, touched with pride, fallen, left in the dust: this chain is the film's best idea and makes "neither his position nor his caution helped him" visible.
- **Fix.**
  - Draw the badge on the sparrow at about a quarter of his body height, with the ribbon, in every scene from 31.82 on (also inside the thought clouds and under the net).
  - 31.82 ("وزيرًا"): hold a close shot (zoom 2.2 or more) for about 0.8 s as the wing presses it on; chest out `sq` 1.08; one glint.
  - 117.10 ("وزيرًا"): the wing comes across to cover the badge, glint, chest out; move MINISTER! next to the badge.
  - 161.44: the same drawing at the same size comes loose.

### 6. 50.3-64.7, MAJOR: the flashback is small and its catch is unclear
- **Wrong.** The witness is a pair of eyes in a nest cut by the left edge. The top half of the panel is empty sky for 14 s. The two crows (58.7-63.0) overlap into one black mass (frame 60.6). At 63.2 the net becomes an opaque bag hanging in mid-air with no birds visible in it and no hunter pulling; only a rope runs to the bush.
- **Why it matters.** This is the event the sparrow fears for the rest of the film and it is replayed in two later clouds. "He caught them" has to be seen.
- **Fix.**
  - 57.8-64.0: lower and tighter, about `a46cam(720, 720, 1.6)`. Show the witness in two short cut-ins on the nest (50.58 and 63.8, at least 0.5 s each) instead of keeping the nest in the wide.
  - Crows: 90 px apart; the second copies the first 5 frames late; heads down on 60.94 ("كبيران").
  - 63.09 ("فأمسك"): the hunter stands up out of the bush hauling the rope; the bag sits on the ground with see-through mesh, two beaks and a tail poking out; SNAP! above it, not over it.
  - 63.80 ("بهما"): cut to the nest, the sparrow drops below the rim, eyes only.

### 7. 72.4-82.2, MINOR: the king's speech lettering
- **Wrong.** FATE at 80.5-82.0 is small and overlaps the sun's rays (frame 80.6). The STAY! balloon (75.5-76.5) floats in empty sky with its tail pointing down and left, away from the peacock. At 78.5-79.5 the sparrow flaps up and down just as the fan opens, pulling the eye from the king.
- **Why it matters.** FATE is the word of the film, on the pose that returns in the cage.
- **Fix.** Headline size (44 px or more) in the clear sky to the left of the fan, popping at 80.22 ("نصيبه") and held to 82.2; hide or move the sun in S8. Attach the STAY! tail at the peacock's beak. Replace the sparrow's flap with a shrink (`sq` 0.9, gaze up, one slow blink) while the fan opens over him.

### 8. 84.4-92.9, MINOR: a static shot, and the watched thing is out of frame
- **Wrong.** One framing holds for 8.5 s. The net he "kept watching" is a sliver at the right edge. The lookout swivel (89.66) is a head turn of a few pixels (frames 88.5-92.5 are almost identical). The bindle he left on the summit ledge at 84.2 hangs on the nest tree from 85.5 to 106.5.
- **Why it matters.** This teaches the vigilance that note 1 pays off, and the swivel is meant to be recognised again at 108.8.
- **Fix.** Widen to about `a46cam(540, 620, 1.15)` from 87.97 so the net and grain are fully in frame. On 89.66 ("مراقبة") a clear three-point swivel (left, right, then down at the net) with `headRot` about 0.35 and a short dashed sight line to the net; tiptoe along the branch on 91.18 ("بحذر"). Bindle: he picks it up before take-off at 84.0, or remove it from the summit once he lifts.

### 9. 107.2-127.2, MINOR: the sky changes within one morning
- **Wrong.** S11 (107.5-113.5) is dawn yellow with orange hills. At 113.7 the close-up is midday blue; the fight insert at 120.0 is blue although the same fight was on yellow seconds before.
- **Why it matters.** It reads as a time jump inside one continuous event, just before the climax.
- **Fix.** One `dayCycle` value for S11 to S13, or ease yellow to blue during the lookout hold 108.5-110.6, before the fight appears.

### 10. 145.2-147.6, MINOR: the seizing is too far away
- **Wrong.** For "جاء الصياد وأمسكه" the camera jumps out to zoom 1.15; the hunter kneels at about 110 px tall and the hand closing on the bird cannot be seen.
- **Why it matters.** The minister being picked up like any other bird is the humbling beat.
- **Fix.** Legs stride in at 145.16 at the current close framing; then about `a46cam(800, 760, 1.9)` for 146.40 ("وأمسكه"): palm, bird, fingers, the sparrow's wide eyes above the fist. Widen only at 147.85 ("ثم") for the companion and the cage.

### 11. 110.7-144.7, MINOR: the three sparrows look alike
- **Wrong.** After the peace (131.0-137.0) and under the net (frame 143.9) the hero cannot be told from the two fighters.
- **Why it matters.** "The minister tried to fly" needs one identifiable bird.
- **Fix.** Make the fighter palettes clearly different (one pale grey-brown, one dark rufous). The hero keeps the larger badge (note 5) and is centre and on top under the net.

### 12. Polish, MINOR
- 6.0-6.7: the three "day together" poses last 0.25 s each (on the ground, on the peacock's back, in the air) and read as teleports. Use two poses of at least 0.6 s each, joined by a hop arc.
- 42.0-45.1: LATE! sits on the grey ghost outline of the missing sparrow (frame 43.2). Place it above the empty place and make the outline dashed. The foot tap is not visible at zoom 1.4; use about 1.75.
- 98.7-99.5: during the dissolve to night the FAR AWAY label and the arrows shrink in the dirt band. Fade lettering out before 98.9.
- 113.2-113.5: the ON THE GROUND label is under the 28 px minimum.

## Subtitles and sync
- Arabic is verbatim with diacritics, large, centred, never covered. The longest chunks (73.4-82.2 and 152.0-160.0) fit on three lines.
- The English is accurate against the Arabic and readable in blue Bangers.
- The hard hits are on their words: crown 27.3, SNAP 63.1-63.2, net 137.5, CLANK 150.0.
- Nothing to change here.

## Reusable techniques worth adding to the Library
- **Absent friend ghost** (43.0): a faint outline in the empty place beside the one who waits.
- **Eyes and knuckles in a bush** (120.7): a dark opening, two pupils, four fingertips; suspense with no figure drawn.
- **Tented net with a numbered count** (137.5-144.7): see-through dome, 1 2 3 bursts, the dome bulging with each escape attempt.
- **Do / do not thought cloud pair** (115.2-125.0): the same cloud shows the rejected choice with a red X, then the chosen one with a green tick.

Second review advice: Yes. Notes 1 to 6 restage the climax, the cage close-up, the ending and the election, and enlarge a prop that appears in most scenes; these are new pictures that have not been seen, and the throw (the person figure is front-facing) and the cage (bars against face) are the two places most likely to need a second adjustment. A short comparison review of 15-34 s, 50-65 s and 127-176 s would be enough.
