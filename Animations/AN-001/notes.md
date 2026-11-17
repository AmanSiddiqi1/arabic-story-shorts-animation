# AN-001 The Bull and the Ass: implementation notes (v1, code only)

- Inputs checked: planning_metadata sha256 for the final MP3 and its `.mp3.words.json` match `Audio Files/Final Done/` (030a848d..., 87a6641d...).
- Film length 179.25 s = plan duration 176.25 + end_hold 3.0 (under 180.0). THE END at 176.3 s.
- Owner questions: all plan defaults taken (merchant visible at the window during the plan plus inset replay at 87.6 s; butcher as sign icon only; worker pulls horn / pushes rump, no hitting; lettering list as planned; donkey ends with a rueful half smile, no moral caption; one NEXT MORNING... card at 66.8-67.9 s, sky sweep without card at 152.8 s).
- Bull and donkey are story drawings (a01_cast.js) on the Library BEAST leg rig so walk/footfalls work; donkey head/neck helpers are story code.
- Sets: one 1600-wide stable cutaway + yard (light presets day/dusk/night/dawn) and one 1600-wide plough field; camera clamped, min zoom 1.0.
- Sound: nine quiet SND cues (pop, thud, whoosh, chime) at scene boundaries in narration pauses, master 0.6 at render.
- Resume: the earlier agent's source was complete; this pass re-verified it (contact sheets over the whole film, implcheck PASS) without changes.

## v2 (Fable review round 1), decisions
- Cuts moved: stable -> field at 98.35 (A01_CUT10, ME?! holds 96.92-98.2); new field cut 166.1-166.9 (A01_FCUT) for the first furrow.
- From S12 on the bull stands at x 245 (muzzle clear of the post) and the donkey lies at x 760 (chin clear of the post); earlier scenes unchanged.
- S18: the hand-off is staged in the yard (bull at 1030, rump clear of the lying donkey; worker 140+ ahead of the nose). After the hand-off the worker jogs out ahead (frame right) rather than behind the tail, since a side view gives him no way past the bull without overlapping; behind-the-tail is shown in the field cut (worker at the plough).
- S16 tight two-shot uses zoom 1.8 (1.55 still read small on the stills); the S16 thought cloud is drawn in panel space so it stays large.
- S19: window bull s 0.24 crosses once (172.0-end, plodding in place during THE END); the worker in the window is not shown (no room in the 120-wide window at that scale).
- Moon hidden when it would sit below y 560 (it read as a cheese wheel on the fence at 110 s).
