# SIND-01 implementation notes (v1, code only)

Plan checked against inputs: MP3 (resolved through Library/media.py) and words.json SHA-256 match planning_metadata.json; MP3 145.827 s.
Film = 145.83 + end_hold 4.0 = 149.83 s (SB_DUR). Subtitles: library subtitles from timing.json (P7 correction kept), chunks files untouched.

## Source layout (series kit, copy for SIND-02 / SIND-06)
- `sb_kit.js` timing (twos/threes), light, cel blocks, painted-plate helpers, cumulus, gulls, ribbons, balloons, tape tracking, sbFace (eye close-up), sbAlive.
- `sb_sea.js` openSea: sky plates (morning, day, sunset, night, dawn, gold), seaY, sbFloat, four flat layers with crest strip and foam on threes, swells, palette cross-fade (pal2/mix), light path, splash, rings, foam line, bubbles, fish, underSea plate, fish school.
- `sb_ship.js` dhow (+ sbDhowPt, wake), skiff, plank, chest (band + star seal / crown seal), campfire, cookPot, spyglass, waterskin, foodTray, gift chest.
- `sb_whale.js` whale (baked body + island dressing, live palms, eye, tail, spout, bubbles, silhouette), sbWhalePt, the under-water eye close-up.
- `sb_sets.js` harbourQuay ('baghdad', 'gold', 'island'), sbPalace, islandShore, Baghdad far skyline.
- `sb_cast.js` series palettes (Sinbad, captain, 5 sailors, 3 merchants, family, king, vizier, guards, grooms, horse coats), sbPt (world point on a person in any pose), sbSinbad (turban tail + sash ribbons), sbSwimmer.
- `sb_s1..s4.js` shots, `sb_main.js` dispatch, transition, score.

## Decisions the plan left open
- Whale orientation: head to the RIGHT in every view (as S7 requires). The plan's whaleIsland text put the blowhole rock at x 230..330 (left) and the tail at the left too; the blowhole mound is placed at the head end (right, local x ~500) and the fluke rises at the left (world x 380 so it is in frame at the S8 wide).
- S1 crane: world height 1230 cannot frame "high on the sky" at zoom 1.0, so the crane starts at zoom 1.25 on the sky and settles at 1.1 (never tighter than 1.1 on the hold).
- Quay geometry: waterline 945 (below the quay floor 900), dhow s 1.15 at x 1660 (rail y ~798), gangplank (1092, 900) to (1528, 800).
- Chests in S2: lifted from the quay floor (x 760, 945, 985) into a stack at x 820 (one choreography per plan beat); two are carried aboard by sailors who come down the plank at 10.3.
- S3 is a tracking shot with the ship still and the water/clouds sliding; island placed at world x 1120 so the 420-unit pan lands it at panel x ~700.
- S4 bubbles (30.75) need the island in view: the camera eases back out to the wide at 30.6-31.2.
- S7 reveal: the whale at s 0.9 (crown x 960) so it fills the frame after the 0.55 scale; the group lifts 470 and gives back 237 during the scale so the whole whale centres; camera pans to x 900.
- S8 sink: island sinks to -470 (palms under, right one first by the head-down tilt) while Sinbad stays waist deep at most (he treads water on the last hump).
- S9-S10: the skiff is far enough that the oar tip stays a hand's width from his reach; the S10 swells hide the ship.
- S15-S17 port: the dhow arrives bow-first from the right (dir -1) and stays facing left; at 135 it does not move away (sail fills, waves), the departure is carried by the gold open-sea shot at 136.04 with Baghdad rising.
- Sound: 8 effects at the plan's times, each inside a timeline gap; the transition at 114.5-115.6 is silent.
- Arabic title line: الجزيرة التي تحركت in Lalezar (coordinator correction).
