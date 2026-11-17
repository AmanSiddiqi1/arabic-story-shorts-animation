# AN-001 The Bull and the Ass: implementation notes (v1, code only)

- Inputs checked: planning_metadata sha256 for the final MP3 and its `.mp3.words.json` match `Audio Files/Final Done/` (030a848d..., 87a6641d...).
- Film length 179.25 s = plan duration 176.25 + end_hold 3.0 (under 180.0). THE END at 176.3 s.
- Owner questions: all plan defaults taken (merchant visible at the window during the plan plus inset replay at 87.6 s; butcher as sign icon only; worker pulls horn / pushes rump, no hitting; lettering list as planned; donkey ends with a rueful half smile, no moral caption; one NEXT MORNING... card at 66.8-67.9 s, sky sweep without card at 152.8 s).
- Bull and donkey are story drawings (a01_cast.js) on the Library BEAST leg rig so walk/footfalls work; donkey head/neck helpers are story code.
- Sets: one 1600-wide stable cutaway + yard (light presets day/dusk/night/dawn) and one 1600-wide plough field; camera clamped, min zoom 1.0.
- Sound: nine quiet SND cues (pop, thud, whoosh, chime) at scene boundaries in narration pauses, master 0.6 at render.
- Resume: the earlier agent's source was complete; this pass re-verified it (contact sheets over the whole film, implcheck PASS) without changes.
