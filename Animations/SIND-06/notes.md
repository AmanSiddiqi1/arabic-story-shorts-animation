# SIND-06 implementation notes (v1, code only)

Plan checked against inputs: MP3 (resolved through Library/media.py) and words.json SHA-256 match planning_metadata.json; MP3 147.373 s;
the 8 effect times all fall inside the timeline gaps. Film = 147.37 + end_hold 4.0 = 151.37 s (SB_DUR). Subtitles: library subtitles
from timing.json; chunks files untouched. No "arabicFont" in story.json. Arabic title line النهر تحت الجبل (title_ar) in Lalezar.

## Source layout
- Series files copied from SIND-02 unchanged except SB_DUR: `sb_kit.js`, `sb_sea.js`, `sb_ship.js`, `sb_sets.js`, `sb_cast.js`.
  `sb_borrow.js` holds the SIND-02 drawings this episode needs, copied unchanged (sbSkyTall, sbFern, sbTrunk, sbMushroom, SB_ROCK, sbLedge,
  the skyFlight ridges, the shot helpers sbKeys/sbWP/sbLive/sbDots/sbSweat, the sack, the cushion, the inset).
- New reusable drawings, one file each: `sb_gems.js` (gemPebbles, oilLamp + lampGlow), `sb_raft.js` (raft, duck pose), `sb_wreck.js`
  (currentStreaks, rockCoast + rock teeth + ledge birds, dhow wreck states + debris, eyelid point of view), `sb_cove.js` (mountainCove),
  `sb_tunnel.js` (riverTunnel + bat), `sb_village.js` (riverVillage).
- Story code: `sb6_common.js` (Sinbad's look per scene and the robe of honour, farmers, farm child, river king and vizier, small props),
  `sb6_s1.js` S1-S4, `sb6_s2.js` S5-S8, `sb6_s3.js` S9-S11, `sb6_s4.js` S12-S14, `sb6_s5.js` S15-S17, `sb6_s6.js` S18-S20, `sb6_main.js`.

## Decisions the plan left open
- Cove geometry: the cliff top runs y -60..-260 (not 120..220) so that the 0.72 pull-out (camera centre y 376, the only centre that keeps
  the bottom of the world in frame) shows walls on three sides with a small sky patch; the 1.0 shots then show wall, not sky, above the beach.
- Camera y limits: every zoom below 1 keeps the world bottom (1230) in frame (0.72 -> y 376, 0.8 -> 461, 0.85 -> 507, 0.9 -> 547).
- Tunnel strip: chapters placed on the raft's own timeline (A 0-1500, B 1500-3000 with the lip 1800-2050 and the rapid 2050-2300,
  C 3000-4000, D 4000-4700, E 4700-6200, F 6200-7900, exit glow x 7750) so each chapter is on screen in its plan beat. The raft's x is
  a `flow` through keys (continuous speed). The 0.9 gallery fills above y 0 with the roof colour. Plates at 0.75 resolution.
- The duck pose is `lean` 1.25 rad about the hips on a kneeling figure (the plan's "rotate about the hips"); checked on stills, it reads.
- The S6 "foot in the air" freeze is a held mid-stride pose lifted 6 units (the person has no single-leg lift field).
- S9 whip pan goes to the wreck (camera x 700) rather than 500 units: the wreck is 1500 units from the launch bank.
- S10 staging: the captain stays by the raft (plants the oar there); the camera pans to the camp for the signal, fire and first tally
  (72.4-73.9) and back to the raft for the spyglass and the forearm grip, so the grip is with Sinbad in frame.
- S15 POV faces: Library person figures at s 2.3-2.6 placed so the heads come in from the edges; the child is rotated 180 degrees. Focus
  arrives through a canvas blur on the POV layer (14, 8, 3, 0 px) instead of three baked plates.
- S16 ride: `rideOn` with the Library person in Sinbad's palette (no turban tail while riding).
- S18: 46 tally marks on the wall (the plan does not give the count); the skiff with Sinbad rows in at the end of the cove shot.
- S19/S20: the royal dhow arrives facing left (it came from the right); the gangplank runs from its forward half to the quay.
- Speech balloons sit about 230 units above the speaker so the tails stay short.
- Sound: the 8 plan effects at the plan times; nothing under CRASH!; the DAYS LATER... transition is silent.
