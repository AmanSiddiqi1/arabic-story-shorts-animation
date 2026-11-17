# KD-026 library proposals (drawings in src/, to move into Library/ after approval)
- `cow` (k26CowRaw / k26Cow, src/k26_parts.js): side-view milking cow with walk (K26_COWSTRIDE), headDown, headA, headUp, chew, talk (moo), ears, tailSwish, bell, lie, brow; acting wrapper.
- `devil` costume (k26Devil + k26DevilTail): vizier body recoloured, red multiply face with redrawn eyes, horns, pointed ears, arrow tail (tailCurl, tailLash, tailHold), cape flap (capeLag, capeFlare), steam, held sack.
- `sack` (k26Sack: open, rot, flat), `oilLamp` (k26Lamp) + `lampGlow` (k26Glow), `rope` lead (k26Rope), `smallBowl`, `bread`, `ladle`.
- `firstBadge` (k26Badge: tear, half).
- `iconBalloon` (k26Balloon), strip frame (k26Frame), red X stamp (k26X), mini icon figures.
- `sleepMeter` (k26Meter), `insetCircle` (k26Inset), dashed sight line (k26Dash), hut darkness pass that keeps the cast in full colour (k26HutDark).

## From the v2 revision
- implcheck guard: fail when `counter()` gets a non-numeric value (the v1 "NAN"), and scan rendered text for NaN/undefined.
- Framing check: warn when the ground line in a shot sits above ~80 % of panel height (a camera clamped at zoom 1.0 cannot move down).
- Window escape: `diveThrough(window, t)` (arc to the window, then inverted legs kicking clipped to the frame).
