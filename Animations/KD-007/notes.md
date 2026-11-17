# KD-007 production notes (v1, opus-animator)

## Decisions the plan left open
- Film length 171.9 s (narration 168.405 + plan end hold 3.5).
- Cues use the silence-refined onsets in timing.json where Whisper starts include a pause (Fish 1 dart on سبحت at 70.05, not 69.18; Fish 2 dash on حاولت at 114.29; the impact on لكنها 117.45, BOING lettering on contact).
- Fish 2's dash is slower than Fish 1's (about 200 u/s) so it spans the plan's 115.0-117.1 tracking; it starts from Fish 1's start point (380, 690).
- Fishermen: both use the Library `villager` costume (A blue robe, s 0.95; B red robe, yellow turban, s 0.8); the plan's "cap" for B is a yellow turban, so A's cap throw at 145.28 became a stamp with hands on head.
- Bank spot for Fish 2 is (1450, 452) on the grass directly above the river; the jump enters the water at x 1610.
- The big net is lowered at x 260 (visible at 120.4-121.1 in a widened shot) and dragged to x 590 in S8, so the rock at x 300 stays in front of it for the wedge gag.
- Nook rocks spread (gap x 1890..2040) so Fish 1 fits between them; reeds and the songbird perch moved to the pond's left edge (x 150) to keep the stream mouth clear.
- Trees leave a gap at x 880..1270 so the setting sun (S5) and dawn sun (S6) are visible.
- The bag of Fish 3 is lifted and carried off left (out of frame by 158.4) so the held empty pond is empty.
- Kept the optional ACT IN TIME line under THE END (plan warning 5).

## Pipeline friction
- `stills/` written inside the story folder by sh.sh (git-ignored).

## v2 revision (Fable review 1), decisions
- Subtitles now come from the scene (`story.json` subtitle: 'scene', `subtitle()` at the end of src/main.js): the same layout as Library/core/subtitle.js, plus balanced wrapping (`k7wrapBal`). The text is unchanged.
- Peeks: no inset close-up. The eye is about 45-50 px wide at 1080 once the float is lowered to y 516.
- Fish 3 close-up at 153.3-154.84 is set above the weeds (560, 735) so the weeds do not cover her face. The bag lifts from there.
- S8 bolts: one arrow drawn beside her path (offset) plus one X per impact (`K7BOLTS` in main.js).
