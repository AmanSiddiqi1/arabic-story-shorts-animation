# SIND-02 implementation notes (v1, code only)

Plan checked against inputs: MP3 (resolved through Library/media.py) and words.json SHA-256 match planning_metadata.json; MP3 143.818 s.
Film = 143.82 + end_hold 4.0 = 147.82 s (SB_DUR). Subtitles: library subtitles from timing.json; chunks files untouched. No "arabicFont" in story.json.
Arabic title line: الرخ ووادي الألماس (story/script.json title_ar) in Lalezar under the chrome title.

## Source layout
- Series files copied from SIND-01 (never edited there): `sb_kit.js` (SB_DUR 147.82; sbFace gained `F.bare`, a hair cap for the bare-headed close-up),
  `sb_sea.js`, `sb_ship.js` (dhow `o.stripe`: emerald #1f9a6a for the ship home), `sb_sets.js` (harbourQuay 'port': mountain peaks behind the
  white town, `sbPortPeaks`), `sb_cast.js` (+ `SB_HAIR`, `sbHairTufts`, the three valley traders `SB_TRADER`/`sbTrader`, the mate `SB_MATE`).
  `sb_whale.js` is not needed in this episode.
- New reusable drawings in their own files (for SIND-06): `sb_roc.js` (roc, rocEgg, giantFeather), `sb_props.js` (diamonds, meatSlab,
  turbanCloth line + bow, sashPouch, eaglet), `sb_snake.js` (snake on any path, coil path), `sb_island.js` (woodedIsland in 'morning' and
  'gold', far island, rocNest clearing with logs and tall clouds), `sb_valley.js` (diamondValley with vertical camera, ledges, stick nest,
  valleyRim, skyFlight ridges).
- Story code: `sb2_common.js` (turban-cloth states on the body, sack, inset, helpers), `sb2_s1.js` S1-S4, `sb2_s2.js` S5-S9, `sb2_s3.js` S10-S14,
  `sb2_s4.js` S15-S19, `sb2_s5.js` S20-S22, `sb2_main.js` (dispatch, shakes, LATER..., 8 effects).

## Decisions the plan left open
- Roc screen direction: it arrives from the right (wind and wing shadow from the right), lands facing LEFT and keeps facing left in the
  take-off, the flight (S10: ranges scroll right, the island falls behind at lower right instead of lower left) and the valley landing,
  so the screen direction never flips across the cuts.
- Roc anatomy for brooding: the egg (900 x 760) is nearly as big as the bird's body, so the bird broods by standing over it with its body
  fluffed (sit lowers the body only 20) and a row of round belly feathers over the shell; the shanks stay visible in front of the egg so
  the near leg reads as a tree trunk beside Sinbad (near foot at x 620, tie point (620, 800)).
- Nest framing: zoom 0.9 (not 1.0) with the camera at x 830 so Sinbad entering at the left is not cut by the panel edge.
- S5 timing: the walk from the glade to the lookout tree is a brook hop and a jog from x 1480 (he starts this scene at the glade edge),
  reaching the fork at 28.75 instead of 28.28, so the climb is not superhuman; the dome rises with the crane (top y 360 to 10 over 30.2-30.9).
- The hiding log (36.68 climb, 48.2 dive) is one separate live log at x 290..520 drawn before Sinbad until 48.2 and after him from then on.
- Slab staging: slab 1 lands at (700, 822); Sinbad walks round to its left, tips it up (bone up, the diamond side toward him); at 110.0 he
  pushes it flat again from the right so the bone points left (head end) for the strap. Slab 2 lands at (1020, 822) so the eagle's
  landing does not cover Sinbad. Sinbad strapped is a standing figure drawn inside the slab frame (one rot turns both), offset onto
  the top surface when flat.
- The valley face: the climb wall is the back face of the gorge (ledges in front of it as live cels), side walls frame it; the shelf
  climbs left from the nest ledge (1000, -1080) to the rim (760, -1400). The wall plate is baked at 0.75 resolution (soft painting).
- Coil snake on the low left ledge is blue (pal 2), the tail at the right boulders mustard (pal 1), the big one emerald (pal 0).
- Sound: the 8 plan effects at the plan times, each in a timeline pause; nothing under the landing or THUD!.
