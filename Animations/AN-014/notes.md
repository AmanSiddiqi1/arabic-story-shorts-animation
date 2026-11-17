# AN-014 implementation notes (v1, code only)

Inputs checked: planning_metadata shas match timeline.json, the final MP3 and its .words.json. Film 173.0 s (170.003 + 3.0 hold).

## Decisions the plan left open
- Village lane built from Library `marketStreet` with two custom houses: kind man's door cx 270, envier's door cx 735 and window cx 885 (plan 635 / 745 approximate), shared low wall x 450..640 top 775 drawn in front of the envier.
- Shrine yard (`k14Yard`): dome house x 60..440, door 200..300, well cx 780 (rim top 830), palm 930, lamp hook (338, 728) so the kind man can reach it.
- Well world: Library `wellShaft` unchanged (ground 520, shaft 560..800, floor 1186); cavern pocket x 80..500, floor 1185; jinn A x 215 (on a rock from 86.4), jinn B x 390 (seated). Jinn eyes in S10 are drawn at the S11 head positions.
- Palace: `palaceHall` with dais 580..960, throne x 800, vizier cushion 660, standing lamp 612. Cat sits on the right throne arm (885, 750).
- Sharp hits use the trimmed onsets in timing.json where Whisper starts include silence: shove 60.55 (plan 60.26), the opening hand 163.0 (plan 162.18). Everything else uses the plan cue times.
- Sultan's crown is a separate prop (`k14SultanCrown`) so it can lag 2 frames and stay in the air on the jumps; he wears the `bigTurban` under it.
- The kind man's beard style changes with the costume preset (villager short, physician long, merchant full): pal cannot override beard style without breaking its colour.
- Sound: the plan's 8 cues plus 9.6 whoosh (whip), 64.5 thud (fall), 106.7 whoosh (LATER), 126.62 thud (sultan lands), 160.55 low pop (gulp); all inside timing.json pauses.
- Transitions: whips 9.88 / 30.42 (streaks), iris 73.78 inside the cavern, dissolves 98.14 / 138.68 and wipe 129.7 via an offscreen layer, LATER card 106.4-107.86 with the cut at 107.13.

## Skipped / simplified
- Peek "through fingers" (S20) is hands at the cheeks with one eye shut: person() draws the head over the hands.
- Envier's cap spinning in the air (63.24) and cap sliding over one eye (160.46) not drawn (cap is part of the headwear).
- The envier "bites his cap" (46.52) replaced by full flush, tremble and steam.
