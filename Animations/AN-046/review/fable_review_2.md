Verdict: REVISE

# AN-046 The Sparrow and the Peacock: Fable review, round 2 (v2)

Reviewed: `renders/AN-046_v2.mp4` (176.33 s) through all 30 strips in `review/v2_pack/strips/` plus 16 full-size frames and 4 montages in `review/v2_pack/extra/` (m1 to m4). Camera values use the film's own `a46cam(cx, cy, zoom)` keys in `src/a46_main.js`.

## Summary

v2 is a large step up. The throw now reads from start to finish (feather, eyes, hunter up to the waist, open mesh, growing shadow, landing). The election is played in the open, the badge is a real prop that can be followed from pinning to dust, the flashback catch is clear, FATE is a headline, and the sky no longer changes during the last morning. Subtitles, sync and the THE END hold are unchanged and correct. No BLOCKER.

One short v3 pass is still needed, because the restaged ending introduced a new staging error: the crowned peacock that should be the last, far-away reveal is on screen from the first frame of the ending, standing just above the hunter's head, and it sits large in the look-back close-up. That changes what the ending says (the king appears to watch from a few steps away) and spends the final image 7 s early. The fix is one condition. Since a re-render is needed anyway, four small fixes are listed with it; none of them changes timing.

## Round-1 notes

| # | Round-1 note | Status | Comment |
|---|---|---|---|
| 1 | Throw 132.6-137.6 | FIXED | Single framing with birds and whole bush; feather 133.5, eyes 134.2, hunter waist-up with arms overhead 135.2, whip 135.7, see-through mesh opening 136.2-137.2, shadow only under the flying net, hug 137.0, landing and 1 2 3 on 137.5. Small flaw: the bundle floats above the fists (v3 fix 4). |
| 2 | Cage 150.8-164.5 | PARTLY | Plain sky, cage on the ground, thin bars, eyes to cloud, long blink, second cloud shows net and grain, badge slips and his eyes follow, head drop: all present. But the shot is still wide: the cage is about a third of the panel width and the head about 50 px, with empty sky above and bare ground below. The middle ring crosses the badge and the door frame sits on the tail (v3 fix 2). |
| 3 | Ending 164.5-173.0 | PARTLY, new error | Tighter opening, even walk with dust, cage swing, companion with sack, 0.9 s look-back cut-in, badge with glint, colour peacock in profile held under THE END: all good. New error: the mountain peacock is visible during the whole walk and in the cut-in (v3 fix 1). The dashed sparrow on the post is a smudge (v3 fix 3). |
| 4 | Election 15.2-27.7 | FIXED | Peacock walks in and stands in the open; arrow lands on his chest at 24.4; double take 25.2-26.0 reads; six birds hop for YES!; crown, half fan, hop onto the throne. |
| 5 | Badge 31.8-162.3 | FIXED | Close shot of the pinning with glint and MINISTER label; visible on him in every later scene; wing over badge and MINISTER! beside it at 117.2; same drawing falls at 161.5 and lies in the dust at 170.5. |
| 6 | Flashback 50.3-64.7 | FIXED | Nest cut-ins at both ends; hunter stands and hauls at 63.2; mesh bag on the ground with SNAP! above; witness ducks at 63.9. Small flaw: the crows are cut by the left edge as they enter (v3 fix 5). |
| 7 | King's speech lettering | FIXED | FATE large in clear sky from 80.2 to 82.0; STAY! balloon tail at the beak; the sparrow shrinks instead of flapping. |
| 8 | Watching 84.4-92.9 | FIXED | Wider frame holds net and grain; sight line 90.5-91.2 carries the look; bindle travels with him. The swivel itself is small at this zoom, acceptable. |
| 9 | Sky 107-127 | FIXED | One blue day from 107.5 to 164.5. |
| 10 | Seizing 145.2-147.6 | FIXED | Stride in, kneel, bird in the fist with wide eye above the fingers, then the wide for the companion and cage. |
| 11 | Three sparrows alike | FIXED | Pale grey fighter, dark red fighter, hero brown with badge, centre and on top under the net. |
| 12 | Polish | FIXED, one PARTLY | Two held poses in the day montage, labels fade before the dissolve, ON THE GROUND large. PARTLY: the absent-friend ghost at 42.0-45.0 is still a blue-grey smudge more than a dashed outline (not required for v3). |

## Fixes for v3 (one pass, in order of importance)

### 1. 164.5-171.0, MAJOR, new in v2: the far king is on screen before his reveal
- **Wrong.** `a46s16` in `src/a46_acts3.js` draws the stone post, the ghost sparrow and the mountain peacock on every frame of S16. The mountain stands directly behind the path of the walk, so from 164.5 a crowned blue bird is visible at the right edge, at 167.7-168.7 (the look-back cut-in) he fills the top right of the frame beside the hunter's head, and at 169.2-170.2 he appears to perch on the hunter's cap (frames `extra/f_168.1.jpg`, `f_169.5.jpg`).
- **Why it matters.** The king is supposed to be far away and unaware, still waiting. Seen this close during the walk he reads as watching his friend carried past and doing nothing, and the final lift at 171.34 reveals nothing new.
- **Fix.** Draw the post, the ghost and the peacock only when `t >= 171.0` (the same moment the men stop being drawn; the camera is on the badge at zoom 2.4, so the pop is off screen). Leave the bare mountain as scenery. Check stills at 165.0, 168.1, 169.5 (no peacock) and 172.5 (peacock present). In the cut-in 167.86-168.76 the only readable face must be the sparrow's.

### 2. 150.8-164.5, MINOR: bring the cage close-up closer
- **Wrong.** At zoom 2.2-2.35 the cage is about 340 px wide in a 972 px panel; his head is about 50 px (frames `extra/f_153.4.jpg`, `f_163.9.jpg`). The eye lift, the long blink and the half-closed lids exist but are small on a phone. The cage's middle ring runs across the badge and the door frame covers the tail.
- **Why it matters.** This is the quiet emotional close of the film and it is carried only by his face.
- **Fix.** Keep the current framing while the thought clouds are up (they need the sky). After the clouds fade, push in: key about `a46cam(950, 775, 3.2)` reached between 159.4 and 160.4 and held to 164.5, centred slightly left of the cage so the spot where the badge lands stays in frame; remove the tilt keys at 161.5-162.8 if they are no longer needed. If it is cheap, open at zoom 2.6 instead of 2.2 and bring both clouds nearer the cage so they still fit. Move the middle ring up or down so it clears the badge, and put the door on the far (right) side clear of the tail.

### 3. 171.3-176.3, MINOR: the empty place beside the king
- **Wrong.** The dashed sparrow on the post is a pink smudge at dusk and a grey blob at night (frames `extra/f_172.5.jpg`, `f_175.0.jpg`). It reads as a second small bird or as smoke.
- **Why it matters.** The last image should say "he waits beside an empty place".
- **Fix.** Either remove the ghost and leave the bare post (the foot tap and the look to the left already say it), or draw it as a clean dashed outline in `C.white`, line width 3, no fill, about 1.4x its present size, and let it fade out over 173.0-174.0 so the post is truly empty under THE END.

### 4. 135.2-135.7, MINOR: the net bundle floats
- **Wrong.** At 135.2-135.6 the bundle hangs about a head's height above the raised fists, not in them (frame `extra/f_135.3.jpg`); it already looks thrown before the whip at 135.64.
- **Fix.** Until 135.64 place the bundle centre between the two fists (touching them, drawn after the hands). Release it on the whip frame as now.

### 5. 58.7-60.4, MINOR: the crows enter half out of frame
- **Wrong.** With `a46cam(720, 770, 1.8)` the second crow is cut by the left panel edge until about 60.4 (frame `extra/f_59.3.jpg`), so "two large birds" reads as one and a half.
- **Fix.** Start the shot about 70 world units further left (`a46cam(650, 770, 1.8)` at 57.8, easing to 720 by 60.9), or land the crows 70 units further right. Both whole birds must be in frame at 60.14 ("طائران").

## Not required for v3
- 42.0-45.0: the absent-friend outline by the throne could use the same clean dashed style as fix 3.
- 170.5-171.2: one sun ray pokes in at the upper left edge of the badge shot.
- 146.3-147.7: the fist with the bird is held right in front of the hunter's own face; lowering the hand to chest height would separate the two faces.

## Subtitles and sync
Unchanged from v1 and correct: Arabic verbatim and large, English in blue below, never covered. Hard hits still on their words (crown 27.3, SNAP 63.2, net 137.5, CLANK 150.0). THE END 173.2-176.3.

## Reusable techniques worth adding to the Library
- **Front-facing throw over cover** (133.5-137.5): feather, then eyes in a dark gap, then the figure redrawn over the bush from the belt up with both arms overhead, a 3-frame whip, and a projectile that opens in flight with a shadow that grows only while it is in the air.
- **Prop as a status line** (`a46medal`): one drawing at one scale pinned, covered with a wing, slipped through bars, left in the dust.
- **Tinted extras** for telling three same-species birds apart (pale, dark red, hero with badge).
- **Rule for end reveals:** anything revealed in the last shot must be gated by time in the scene draw function, not only kept out by the camera, because a later reframing can bring it into view (the cause of fix 1).
