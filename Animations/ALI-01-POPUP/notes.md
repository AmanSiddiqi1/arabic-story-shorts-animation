# ALI-01-POPUP implementation notes (v1, code only)

Decisions the plan left open or that were measured on the set and adjusted.

## Structure and performance
- Source split into `src/ab_kit.js` (pop-up mechanics, new drawings), `ab_home.js` (S1), `ab_forest.js` (S2-S6, day and dusk), `ab_cave.js` (S7), `ab_hut.js` (S8-S9), `ab_road.js` (S10), `ab_main.js` (frame, page turns, camera, sound). Every story name is prefixed `AB_` / `ab`.
- Set pieces are baked once as **card sprites** (`abSprite`: the art drawn through the style's `castFinish` once, then drawn with a pop factor, sway or slide). Only actors are finished live.
- Live actors (`abLive`) go through `castFinish` on one fixed-size off-screen canvas (800 x 940) and are copied into place: `castFinish`'s tint pass clears its whole layer, so on the 1080 x 1920 frame each call cost about twice as much. Measured seek times: 0.1-0.55 s per frame (busiest: the five riders at the rock, 0.4-0.55 s).
- Memory: sprites and prints are kept per spread (only the current and the previous spread are cached); the first version crashed the headless page in the smoke test.
- The style's balloon label divides by its pop scale; a label drawn at p = 0 hangs the page. `ab_main.js` wraps `S.label` so it is only drawn for p > 0.02.

## Staging decisions
- Thieves on foot walk at about 300 world units a second (a hurried jog): the plan's door times (51.3-52.8 in, 59.0-59.9 out, mounting by 60.75) do not leave enough time for a walk from the horses' marks. Rider marks on the day spread: leader 520, then 640, 730, 815, 890; on the dusk spread the horses stand closer (470, 590, 680, 770, 860) and face right, so mounting ends 60.3-61.7 and the leader's horse wheels to face the rock at 62.55 as planned.
- The leader stands before the rock at x 365 (not 400: his horse's head covered him there); Ali Baba's payoff pose is at x 380 accordingly, his hop back to 440.
- The rock is one whole card while shut (the seam would otherwise show); it is swapped for the back arch card and the two halves when it opens.
- The eye gap is placed where the seated figure's eyes actually are (seat at (735, 611), gap (735, 470)); the branch is at y 572-596.
- "His turban, then his eyes come out" (71.14) is staged as Ali Baba rising above the leaf flap rather than leaning out of it.
- The donkey hides by sliding down behind the bush card (a slot), clipped at the bush's base line; only the ears show.
- Hut: hutRoom palette `dusk` (terracotta walls) with the night sky preset, a warm lamp-light multiply over the room, the room's back pass baked into one pop-up card and its front pass (side walls, roof, door leaf) drawn live on top. Cassim's peek is clipped at the door wall (x 893). The picture card is drawn at 0.62 scale so it does not cover the faces; the wife stands at x 440 and Ali Baba at 640 for that beat.
- Cassim's circle round Ali Baba (119.05) is staged as a step to the table to lift the cloth corner, then nose to nose.
- Road: the slipping sack falls ahead of the cart and Cassim catches it with a step back (the cart is behind him). At the end Cassim shrinks with distance along the road and passes behind the far rock card.
- THE END is lettered at the bottom of the panel (panel y 1130), not at the top: at the end the camera is on the rock and the ? card hangs where the top sign would be.
- The MARKET signpost stands at x 640 (in front of the doorway) so the donkey does not cover it.
- Sound: all effects sit inside the timeline pauses (15.5, 21.85, 33.7, 49.15, 56.2, 61.9, 65.75, 69.5, 77.3, 88.6, 94.65, 104.7, 122.9, 139.0+); chimes replaced by short plucks where a 1.3 s chime would reach the next word.
- Road timing: Cassim reaches x 560 at 134.4 and the mule and cart (cart 150 behind the mule) arrive earlier than planned (mule 1250 -> 760 by 134.4) so the cart and its sacks are on the page when the strip arrow points at them; the slipping sack falls 134.3-135.15 and Cassim steps back to 620 to catch it.
- The hide spot for the donkey is x 875 facing right (at 925 its head left the page).
- Skipped details (small): capes blowing toward the opening door (46.2), moss tufts popping back over the seam (68.1), the star glint beside Ali Baba's eyes (86.9); the twig at 75.3 is a falling leaf card.

# v2 (revise round 1) decisions
- Rock tab: 1.6x `abPullTab` at (345, 1180) pointing left, travels 125 world units; the printed groove runs from the seam (270, 923) down and along to the tab. The tab value is `abRockState(t).tab` (open + jerk / twitch pulses).
- Door clip (`abDoorClip`): arch + x > seam + a strip below the arch; walkers inside it are drawn between rockR and rockL. Thief paths end at x 110 / start at 120 (behind the left half); walking speed 360.
- The concertina stands on the upper ridge road (y 702): on the back row (905) the riders cover it entirely.
- Climb x 712 (left of the trunk card); the ground mark AB_ALIX uses 712 for 25.55-77.9 accordingly. Tree-mode Ali is clipped at y 558 (+92 when the toes gag runs).
- Cave v2 layout: arch cards inner ellipses (478 x 650) and (432 x 592) about (500, 905); doorway x 730..870; gold 430 / silver 150 / cloth 240 (front) / big sacks 600-690 / tiny sack 545 / chest 470 (front). Slab closes 102.14-103.15 so Ali Baba can be seen hurrying out through the narrowing gap (the narration's order is closed, then hurried).
- Hut: Cassim's question marks all come from his side (he no longer crosses to Ali Baba's left) to keep 150 px between the figures. Camera y lowered (floor near the lower third).
- Road: badge "10" on وأكياسه (134.01) since the cart is off-frame at 133.07 in the travelling shot. Cassim ends at x 300 (in front of the rock) and folds at 140.75.
- `motion.mjs`: a local motion scan (per-second frame difference on the story panel, seeks in the built player); not part of the build.
