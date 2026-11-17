# AN-092 Ali the Persian: implementation notes (v1, code only)

- Inputs checked: planning_metadata sha256 of the final MP3 (adc2773b...) and its `.mp3.words.json` (564595e1...) match `Audio Files/Final Done/` and `planning/inputs/timeline.json`. Paragraph 5 is absent by design (timing.json paragraph index 4 = script paragraph 6).
- Film length 170.67 s = narration 167.67 + end hold 3.0 (plan). THE END at 167.67, chime 167.6.
- Subtitles: the plan's `subtitles` chunk marks (chunks_ar.txt / chunks_en.txt), aligned by align.py with the final `.words.json` as whisper.json (217/217 words matched). The em dashes in the English of P4 and P7 are shown as ", " (display only, in a92_props.js); timing.json stays verbatim.
- Owner questions: all plan defaults (label A KURDISH STRANGER, all lettering kept, the Caliph asleep at the end, invented sensible items cup/comb/cloth, no bridge for P5, food goes back into the bag under the cut at 136.22).
- Sound: exactly the plan's seven cues (pop 5.3, chime 12.08, pop 32.7, pop 73.45, thud 96.88, pop 108.25, chime 167.6) plus the template bed.

Decisions the plan left open or the measured set changed:
- Palace: Library `palaceHall` (wall blue, no throne, dais 560..940 top 860, lamps drawn by the story after a navy wash). The arches of palaceHall are solid recesses, so the moon and stars are in the window (x 820..930) and the door arch, not in the middle arch. Diwan 580..930, seat top 812.
- Cameras are tighter than the plan in the palace, road and market (zoom 1.45-1.9 instead of 1.15-1.35) so faces read at phone size.
- Court: Library `palaceHall` paper wall with one centre arch; judge behind a desk (top 750) on the dais (top 820). The bag stands on a tall evidence table (x 390..610, top 860, front to y 1000) instead of a stool at floor 1000: the person arm reach (about 80 units) cannot touch a 48-high stool, and the table lets Ali untie the bag and lay out the food by hand. In S10-S11 both claimants stand just behind the table (y 942), so the insert shows faces above the table and the food on its top. The lemon falls off the left end and rolls to the stranger's feet.
- Piles: left 100-unit tiles in 2 columns (rows y 520..211, the rooms tile 136 on top); right 125-unit tiles with three double-width tiles (BAGHDAD, BASRA, army) stacked to y 6, so Ali's pile is clearly taller and wider. The crowd of witnesses is 64 heads along the top (x 340..990), hands up at 94.62; the counter 1..999 then 1000s sits top centre.
- IN THIS SMALL BAG?! is placed below the table with the arrow pointing up, so it never covers the judge's face in the push-in.
- Ghost tiles in S10 hover above the judge's turban (world y 480), not at y 640 (that is the judge's head).
- The judge is the `physician` preset with navy robe and `head: 'none'`; his large turban is drawn by the story (a92Turban) from one keyed table (tilt 66.42, slip 89.52, straighten 98.62, roll off 144.24).
- Recap card: busts at s 2.2 cropped by the panel bottom (x 300 and 700), bag at (500, 960) s 2.2, food row under it.
- Page turn to the recap is a yellow page sweep 155.0-155.56 covering the cut at 155.28; the tale opens and closes through a thought cloud growing from / shrinking into Ali's head.
