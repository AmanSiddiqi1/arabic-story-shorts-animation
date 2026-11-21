# SIND-01 revision 1 (v1 -> v2): change log for fable_review_1.md

Narration, subtitle chunks, timing.json and the film length (145.83 + 4.0 = 149.83 s) are unchanged. Checked with stills and
contact sheets at every noted time (Working files/SIND-01/stills/s10, s1, s5, s6, s9, s18, misc, leap). No new heavy effects: the
added drawing is flat cel shapes, so render cost stays close to v1.

## Notes

1. **BLOCKER 82.7-83.4 (flat blue block over the grip close-up): fixed.** The straight-edged trapezoid is gone. The wave that runs past
   on "قوته" is now `sbSwell` (new in the sea kit): a hump on the ship layer's own surface line with the crest strip, dark line, foam lip
   and spray, drawn between the ship layer and the front layer so it passes in front of the plank and below his chin, never a block.
   The grip: from "بكل" 82.06 both bare forearms come over the plank with the fingers curled on the near edge (`sbGripHand`, 1.25x),
   knuckles whitening and tightening on "قوته" 82.78 (squeeze, shoulders up 6, lids 0.5 -> 0.2), one drop running off the turban tail;
   the close-up holds with breathing to a cut at 83.5.
2. **Open-sea framing (bottom third empty): fixed in the sea kit and applied to every sea shot.** Measured: the dhow's waterline in S3
   was already at ~67% of the panel; the empty part was everything below it. Now every sea shot has: a reflection under every floating
   thing (`sbReflect`: hull, band and sail-stripe colours, on threes), mid-water streaks in the front layer (`sbSeaStreaks`), the
   foreground crest band across the bottom 15% with a lighter lip, foam caps and faster parallax (`sbSeaFore`; both via `sbSeaNear`),
   and one living thing per shot: flying fish (15-22, 86.9), dolphins (25.3, 52.6-56.8), a fish-school shadow (83.5-89), the plum
   turban, the pot and driftwood drifting past the swimmer (70-80), the turtle (93.2), low gulls (136, 143+). Wake rings at each oar
   dip (S4) and rings round the swimmer on every stroke (S9). Applied to S3, S4, S5/S6/S8 (island shots, `sbIslandFront(ctx, t, cam)`),
   S7 (until the camera sinks), S9, S10, S11, the berth shots of S15-17 (clipped to the water, faded in by camera x), the gold sea
   136.04 and the S18 ending. Camera moves: S9 swimmer close-ups and S10 wide at zoom 1.12 put the swimmer's waterline at 60-66%.
3. **Ending 141.9-149.8: fixed.** "وعرف" 141.94: eyes first, head with a blink (142.08), body turns (142.2); he stands (142.4) and walks
   to the quay edge (to x 1000 by 143.5), lid 0.25, smaller smile; the sister gets up and follows holding his sash, looking up at him.
   The moored dhow (with the captain) pulls its gangplank aboard 139.3-139.9 and sails out of frame unseen while the camera is on the
   family, so the last picture has no ship and no captain. "البحر" 143.32: pan to zoom 1.0 with Sinbad at panel x ~27% and clear water
   across the right ~63%. "يخفي" 144.02: the whale (s 0.5, about 1.7x v1 in scale, hump with palms) rises on the horizon at panel x
   ~68%; "عجائب" 144.62: the tail lifts once like a hand (up 0.42 s, hold 0.26 s, down), a spout and three rings; it sinks slowly
   146.0-147.5; a gold light path under it. Sinbad breathes, turban tail and sash lift late in the breeze, half-raised hand answering
   the tail at 145.3 (lowered at 147.9), blink at 146.5. Only the sister sees it and claps (145.2-147.6). THE END at 145.6 top centre,
   clear of the whale. Not done: the hump is about 1.7x (not 3x) because at 3x it reads as an island, not a whale, at this distance.
4. **Water rising 44.5-52.2: fixed.** Wide at zoom 1.15 (island ~70% of the width). The island sinks in three visible steps (12, 28, 45)
   on 45.70, 47.0 and 48.28, each with a foam surge that runs inward over the grass from both shores and drains back; plum points at
   the water on "تتصاعد" 46.28, the fat merchant lifts his hem; "حول" 47.24 eyes follow the foam a beat apart during the rim pan;
   49.06-50.34 feet lift alternately (stepping in place, phase per man) with rings at the ankles; "مخيف" 50.34 the ground breathes once
   (+10, -14) and all four drop into a wide stance, arms out, staggered; the camera slides right at 51.0 so the spout rises inside the
   frame. Not done: the fire's logs steaming (the fire is not in the knot shot).
5. **Missed oar 72.3-76.5: partly.** Camera now zooms 1.55 tracking him left of centre with the skiff's stern and the sailor's oar in
   the right third (72.5-73.4), pushes to 2.0 on the gap on "لم" (hand left, blade right, both in the middle half), a small splash and
   a two-frame flash on the gap at "يصل" 74.02, back out to the wide for the wave at 74.85-75.1. Rings on every stroke. Not done: the
   overarm strokes with the whole forearm clear of the water (the Library person arm range in `sbSwimmer` was left as is).
6. **Ship behind the waves 83.6-88.3: fixed.** Cut at 83.5 to a wide (zoom 1.12) with Sinbad at panel x ~30% and the ship on the
   horizon at ~62-68%, about 90 units long at 84.66, smaller in held steps to ~45 by 87.0, never touching the edge. On "وراء" 86.0-86.24
   a mid-layer `sbSwell` (crest ~100 above the line, foam lip) rises in front of it and hides it; it reappears smaller; on "العالية"
   87.3-87.58 a taller swell hides it and passes: empty horizon. He keeps the arm up through the second swell, the arm comes down in
   three drawings at 88.0-88.24 and his head lowers onto the plank in the pause before 89.17.
7. **Plank pose 89.2-97.6: partly.** New series cling pose `sbCling` (chest and both forearms over the plank, cheek on the wood, legs
   under the front water, turban tail floating) replaces the toppled standing figure in S11 and in S12 until he lands: slow breath,
   the plank pitching with `seaY`, the near hand slipping and re-gripping at 90.7, eyes closing in steps to "هدأت" 92.74, the turtle
   passing at 93.2 with his eyes following it. Not done: the shore plate repaint (wet-sand band with foam scallop and shells) and the
   roll off the plank onto his back.
8. **The leap 69.9-71.6: partly.** The last patch is now the whale's grey-blue back awash (3 figure-widths) with a grass strip and water
   streaming off; he looks down at the water, crouches with the arms back (70.05-70.4) and springs along the arc with the arms thrown
   forward and the legs apart, turban tail late; the hump drops away under him. Not done: the three-quarter turn (the Library person
   stays front-facing).
9. **Camp 31.7-39.2: partly.** One second on the wide, then in to zoom 1.4 with the grass line at ~70% of the panel and a left-to-right
   pan across the camp, so no empty bottom third. Not done: the regrouping of the four, the coconut on plum's turban, the flint and
   flame build (kept as v1).
10. **Whale wide 59.3-60.8: partly.** Eye drawn 2.4x (was 1.6x); on "ضخم" 59.34 the lid opens half way and the pupil rolls up toward the
    fire, brow down on "نائم" 60.08, one slow blink at 60.35. The fish school and light shafts were already there. Not done: the
    darker deep band.
11. **Going ashore 24.9-27.6: partly.** Skiffs 1.3x larger (s 0.95 -> 1.25), wake, reflections and rings at each oar dip, dolphins.
    Not done: seated rowers / standing bowman, one-at-a-time step out.
12. **Polish: partly.** 4.2-5.5: the whale shadow under the quay is larger (s 0.7) and darker (0.55). Not done: 127.5 feet on the
    gangplank, hall floor dressing, the crowded dhow deck in S3.

## Series changes (carry to SIND-02 and SIND-06)

Only `sb_sea.js` and `sb_cast.js` changed among the series files. `sb_kit.js`, `sb_ship.js`, `sb_whale.js` and `sb_sets.js` are
unchanged. All changes are additions; nothing existing changes its look (apart from the one new option below, which is off by default).

`sb_sea.js`
- `sbSeaFront(ctx, t, sea, x0, x1, o)`: new option `o.mid(ctx)`, called after the ship layer (2) and before the front layer (3): the
  place for reflections, rings, flotsam and swells that must sit on the water. Without `o.mid` it is identical to v1.
- New, appended at the end of the file (section "sea framing kit (SIND-01 revision 1, series rule)"), copy the whole block:
  - `sbSeaFore(ctx, t, sea, cam, o)`: the foreground crest band (bottom `o.h` = 0.15 of the panel, parallax 1.8, lip, foam caps, dashes
    on threes), drawn in panel units from the shot camera. Options `h, par, amp, col, lip, alpha, drift`.
  - `sbSeaStreaks(ctx, t, sea, x0, x1, y0, y1, o)`: flat lighter/darker streaks in the near water (`o.li` picks the layer colour).
  - `sbReflect(ctx, x, y, w, cols, t, o)`: broken reflection rows under a floating thing (`rows, gap, a, sway, seed`).
  - `sbDolphin(ctx, x, y, s, dir, o)` and `sbDolphinLeap(ctx, x0, x1, y, u, h, s)`.
  - `sbFlyingFish(ctx, x0, x1, y, u, h, s)`.
  - `sbSchoolShadow(ctx, cx, cy, t, n, o)`: fish shadows under the surface.
  - `sbFlotsam(ctx, kind, x, y, t, o)`: 'wood', 'pot', 'turban' (bobbing, with a ring).
  - `sbSwell(ctx, x, y, w, h, t, sea, o)`: a travelling swell drawn as a proper cel wave (crest strip, dark line, foam lip, spray);
    with `o.li` it sits on that layer's surface line (`o.dy` below it) so it merges into the water at both ends.
  - `sbSeaNear(ctx, t, sea, cam, o)`: streaks + crest band in one call, after `sbSeaFront`. Options `streaks, n, a, fore {...}`.
  - Rule (header comment of the block, also for the capabilities guide): subject waterline at 62-68% of the panel, a reflection under
    every floating thing, the crest band, one living thing per sea shot; no sea frame with more than ~15% unbroken flat blue.

`sb_cast.js` (appended at the end)
- `sbGripHand(ctx, ax, ay, x, y, s, sq, o)`: bare forearm from (ax, ay) to knuckles on an edge at (x, y), fingers curled over and down
  the near face, thumb, knuckles whitening with `sq`; `o.dir` which way the fingers point.
- `sbCling(ctx, pl, wy, t, o)`: the series cling pose on a floating plank (uses `sbSwimmer`, `sbPlank`, `sbGripHand`); options
  `lid, breath, slip, head, gaze, mouth, eyes, wind, hs`. Draw the front water after it. Needs `sb_ship.js` (sbPlank) loaded first,
  which the scene order already does.

Episode-only changes (not series): `sb_s1.js` (S3 reflections/flying fish/near water, S4 skiffs 1.25 + rings + dolphins, quay
shadow), `sb_s2.js` (S5 camera, S6 sinking steps/surges/acting/camera, `sbIslandFront(ctx, t, cam)` signature, S7 dolphins/near water/
eye), `sb_s3.js` (S9 leap, camera, flotsam, flash; S10 rewrite; S11/S12 cling), `sb_s4.js` (berth near water, gold sea, S18 ending).
In `sb_s2.js` the island helper `sbIslandFront` now takes the camera; SIND-02/06 copies that call it should pass `cam` to get the
near water.

## Library

No Library change needed. Candidate for a later proposal (listed in library_proposals.md): the sea framing kit and `sbGripHand`.
