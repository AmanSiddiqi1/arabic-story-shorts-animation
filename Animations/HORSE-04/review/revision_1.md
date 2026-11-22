# HORSE-04 revision 1 (v2 source), from fable_review_1.md

Narration, subtitle chunks, cue timing and film length (141.52 + 4.0 = 145.52 s) unchanged. Checked with stills at the noted times (no full render).

## Notes
1. **Princess behind the lattice (112.8-132.4): fixed.** New `h4Bay` (h04_court.js) replaces `ehCourtScreen` in this film: flat rose silhouette (`#8a3a5e`, head about 85 units) rising at 113.56 with a settle; one arched listening window (108 x 62, replacing two eye-row cells) showing her face with two whole anime eyes (`h4Eye`: white, iris, pupil, two highlights, lashes, moving lid); gaze down-left at 116.06, wide with shrunken pupils at 119.88; four fingertips on the sill 113.94-119.88; empty openings at half glow. THE PRINCESS tag + arrow 115.44-117.0 above the bay.
2. **Eye close-up (120.44-124.5): fixed.** `h4EyesClose` rewritten: dark plum/brown interior, soft face tone, lattice runs off all four sides (no top bar), two round eye openings about 250 px with whole anime eyes and brows; lids half closed, snap wide at 121.82 with a two-drawing pupil shrink, shine from 122.54, tear welling from 123.6 and held; moonlight band 121.82-122.6; memory card moved to the lower left (270, 1010).
3. **Signal (128.5-131.4): fixed.** Craftsman steps to 790 (128.0-128.42) so his raised hand shows, taps the knob at 128.6 and 128.95; round callout (hand + knob, ring flash per tap) with TAP / TAP TAP lettering 128.5-129.75; ribbon (84 x 11) out of the listening window with two flicks (129.8, 130.15), shown in a second round callout of the window 129.7-130.85; plan picture held to 131.58; guard D half-turns 130.2-130.74. Gold path not changed.
4. **Cliffhanger end (138.4-145.5): fixed.** Stage cleared to HORSE-05's opening layout: horse whole; front row left two guests + guards A 1600 / B 1660; the other five crowd members in a back row (s x 0.85, 30 higher); inventor 2375 between C 2330 and D 2420, captain 2282; king seated at 2230. Craftsman stops at 2060 right of the knob; right arm rises on a flow at 140.52 and hovers near the knob with a 2 px tremble on threes, knob glint. Enlarged crimson corner + saffron knot (`h4BigCorner`, about 40 x 50 px) on the hip facing the inventor; light band at 140.9; dotted eye line from the inventor, then a round callout of the corner by his head with an arrow (141.2); his hand to the turban tail at 141.4; C and D glance at each other out of step. Enlarged corner also used in S10-S16 (day and court).
5. **Balloons off her face (13.5-18.3): fixed.** Both balloons high over the hedge/wall at the left (up 420, size 40), tail down to the inventor; head shake now three drawings (17.16-17.88), her eyes to the king after.
6. **Riders pale in the sky (0-7.7): fixed.** `ehSkyFront` (a 0.45) now drawn before the riders in `h4S1Panel`.
7. **S3-S5 clump: not done** (time/usage budget). Note: the king's knob reach at 31.9 and other world-hand reaches now work (see "Engine finding").
8. **Inventor at the grille: not done.**
9. **Craftsman in the gate: partly.** Enlarged crimson corner visible; the knock and knocker-turn reaches (87.76, 88.44) now actually reach (see below). Cloak colour not changed (it would break HORSE-05's craftsman), guard spacing not changed.
10. **Balloon faults: partly.** BOTH WORK! raised into the wall band (up 330); the password balloon held to the cut (120.44). Tails, 26.5-28.4 and 72.0-73.7 not changed.
11. **Empty lower quarter: not done.**
12. **Smaller points: not done.**

## Engine finding (affects the whole film)
`person()` uses `handL || toLocal(handLW)`, so every `handRW`/`handLW` world reach in v1 was ignored whenever a default `handR`/`handL` was set (most figures): taps, raps, the princess at the lever, the king at the knob, the captain's shutter. `h4W` (h04_common.js) now converts world targets into local ones in `h4Fig` and the craftsman calls, so those reaches should now show (stills at 12.9, 31.95, 41.8, 51.5, 88.0, 99.5, 111.7, 116.3, 128.65, 143.5 show no broken arms; the review should confirm them in motion). Also: a hand at head height directly beside the head is drawn behind the head (arms are drawn before the head), so reaches to the knob need about 60 units of side distance. HORSE-05 has the same pattern (`P.handRW` with a default `handR`, craftsman at 2030 with the hand at the knob) and likely shows no reach either.

## Continuity for HORSE-05
Last frame (145.52), camera unchanged: x 1975, zoom 1.1, ground at panel y 950 (`h4GY(1.1)`).
- Horse at 1900, y 900, on the star. Toolbox on the ground at (2108, 944).
- Craftsman (EH_CRAFT, s 0.95) at **x 2060** (was 1935; HORSE-05 opens at 2030), y 935, dir -1, right hand raised to the knob: `handRW = [knob.x + 16 + 2 sin(EH_T3(t) * 9), knob.y + 4]` (knob = `ehHorsePt(H, EH_EBG.knob)` = about (1979, 715)); the arm is length-clamped so the hand shows in front of his head at about (2005, 745). Enlarged crimson corner on his right hip (facing the inventor).
- Inventor at 2375 (+6 sin sway), y 904, dir -1, eyes wide, mouth o, right hand at the turban tail; guard C (EH_FARGUARDS[2]) 2330 y 898 dir 1, guard D (EH_FARGUARDS[3]) 2420 y 904 dir -1, captain 2282 y 872 dir -1. (Was: inventor 2150 between guard B and the captain.)
- King seated on the bench at **2230**, y 850, chin on fist (was 2190).
- Guard line: A 1600 y 876, B 1660 y 878, facing right (was four guards 1555..1812). HORSE-05's extra line guards at 1730/1785 are not in HORSE-04.
- Crowd: front guests 1440 (EH_GUESTS[0]) and 1495 (EH_GUESTS[3]); back row at s x 0.85: 1540, 1585 (child), 1715, 1765, 1825 (y 836-842). HORSE-05 shows only the two front guests.
- Princess unchanged: arch2 1680, y 884, sash end round one finger.
- On screen at the end: TO BE CONTINUED..., the corner callout at panel (750, 430) r 120 and the dotted eye line.
