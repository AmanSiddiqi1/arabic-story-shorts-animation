# AN-145 Al-Maamun and the Pyramids of Egypt: implementation notes (v1, code only)

- Inputs checked: the final MP3 (d90e121b...) and its `.mp3.words.json` (3f66d0f6...) in `Audio Files/Final Done/` match `planning/planning_metadata.json` and the shas inside `planning/inputs/timeline.json`.
- Film length 177.861 s = narration 173.861 + end hold 4.0 (plan). THE END at 173.66.
- Subtitles: the plan's `subtitles` chunk marks (`chunks_ar.txt` / `chunks_en.txt`), aligned by `align.py` with the final `.words.json` as `whisper.json`. The P4 English em dash is kept verbatim in the chunk files and shown as ", " on screen (`src/m5_util.js`, display only).
- Sound: exactly the plan's three cues (chime 66.94 in the only pause, chime 173.66, whoosh 175.0), no bed.
- Owner questions: all plan defaults (round counters of 100, storyteller frame, gentle guardians, sand effect, the four added gags, the lettering list).
- Source files: `src/m5_util.js` (timing helpers, person rig, strike cycle, props: pickaxe, shovel, torch, coins, chests, ledger, balance scale, legend icons, tags, sand dissolve, inset), `src/m5_sets.js` (pyramidSite far/face/section, night camp, fire), `src/m5_s1.js` (S1-S6), `src/m5_s2.js` (S7-S11), `src/m5_s3.js` (S12-S17), `src/m5_main.js` (scene table, camera, shake, dissolves, LATER card, sound).

Decisions the plan left open or the measured set changed:
- Strike places (S4-S6): the front-facing worker's pick tip lands about 163 x 0.75 world units ahead of his feet, so the workers stand at w1 x 527 (facing right), w3 x 850 and w2 x 960 (both facing left) instead of 520/660/800; a worker at 660 would have hidden the chalk X. The three contacts land on the dig block at (690, 833), (687, 843) and (797, 868).
- S2: the vizier raps the first block standing at x 410 in front of it (the plan's x 110 cannot reach any stone); he moves back to x 110 at the S3 cut.
- S2 tilt: the world clamp allows at most y 470 at zoom 1.3, so the tilt ends there (the tall arrow runs out of the top of frame).
- S3 push-in at zoom 1.6 centred (430, 720) instead of 2.0 at (250, 720), so the question mark on the dig block stays in frame with the caliph.
- S4 drift at 26.4 uses zoom 1.08 (a drift is impossible at zoom 1.0).
- S9: FOUND (the real hoard) is on the LEFT pan by the caliph and SPENT (ghost coins) on the RIGHT pan by the vizier and his ledger, so each man can reach and press the pan beside him (85.78 caliph, 86.88 vizier). Tags are placed to match (FOUND left, SPENT right). Scale stands on its table at x 500 with the base at y 950 (pivot y 720) so the pans sit at chest height.
- S9: the foreman carries the find's chest in from the right, sets it by the scale and leaves (73.16-74.6); coins and gems arc from it into the pan.
- S11: the vizier waits already mounted; the caliph mounts with a small hop at 104.3 and rides out on the white horse.
- S12: the builder who guides the big block stands on the course 1 tread (x 435, y 560) at s 0.6, so the 170-high block is taller than him; in the close shot (from 117.04) he stands on the sand at x 470 (s 0.8) for the blade gag, and the right course-0 block slides the last 14 units home at the joint in frame.
- S13 insert drawn full frame in world units (camera at zoom 1.0); the '? ? ?' sits low on the sand, clear of the sun at the apex.
- S14/S15 story cloud is the Library thoughtCloud (620 x 400 at (560, 400)) with a night background; chambers in a row inside; it shrinks toward the storyteller's head and pops at 147.24-148.6.
- S16/S17 sky: one continuous u track (dawn 0.02 to 0.22, racing 0.22 to 6.0 from 160.22, braking to dusk 6.45 at 163.84). Night and warm tints dim the whole far view (a clipped tint showed a band across the pyramid).
- S17 far caravans pass behind the great pyramid (clipped by it) on the far dune at the right.
- Dissolves at 107.66 (0.5 s), 129.8 (0.6 s) and 152.62 (0.7 s); LATER card 64.0-66.12 with the cut at its covered midpoint 65.06.

## v2 (Fable review 1) decisions
- S7/S8 close shots use a new tunnel-interior set at camera zoom 1.0 (workers s 1.4) instead of zooming 3.4-4.0 into the 60-unit section tunnel: a push-in on the section (59.86-61.19) then a cut at 61.2. In S7 the pick worker (w1) sits down; there are only two men in the tunnel.
- S5: the curl gag stays with w2 (hit on 36.5, off the X), so only one pick is on the X at a time; the reviewer's suggested camera x 720 is beyond the clamp at zoom 1.5-1.6, so w2 moved from x 960 to 925 and the shot is zoom 1.5 at x 667.
- S9/S10: the dug opening in the wall is no longer drawn (it sat behind the right pan and read as a black dome).
- S16: the builders and king stand large in the foreground (s 1.1, feet y 1010) and the camera also pushes to zoom 1.6 (155.82-160.2), easing to 1.25 for the racing days and the king's dissolve.
- S17: bow tip 0.42 (rider rig needs more than the suggested 0.22 to read); the caravan exits by 175.2.
