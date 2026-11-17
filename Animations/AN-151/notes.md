# AN-151 The Illiterate Who Set Up for a Schoolmaster: implementation notes (v1, code only)

- Inputs checked: planning_metadata sha256 of the final MP3 (972478e6...) and its `.mp3.words.json` (dcd213f9...) match the files in `Audio Files/Final Done/` and the shas recorded in planning/inputs/timeline.json; script sha 136fed8b... matches. Plan status validated (17 scenes, 191 actions).
- Film 173.5 s = 169.528 + 4.0 s hold, rounded down to the frame. THE END 169.6. implcheck PASS.
- Subtitles: the plan's chunk marks (chunks_ar.txt / chunks_en.txt, 27 chunks), aligned with the final `.words.json` copied as whisper.json. No dashes in either script.
- Effects: exactly the plan's six, master 0.6: pop 5.78, chime 9.0, boing 20.95 (engine has no `boing`: `pluck`), pop 161.68, soft tap 169.42 (no `tap`: `tick`), chime 170.3.
- Owner questions: all plan defaults taken (turban jam gag, mild imagined death, mourning as mime only, servant tunic kept under the turban, the righted-tablet closing touch, all listed lettering).

Decisions the plan left open / measured on the set:
- Street strip 2400: custom fronts as specified; the neighbour's door moved to 812..890 (top 665) so it sits under his window (window drawn live at 690..810 x 505..635 with shutters and his head inside). Mosque front widened to 1760..2350 so the wall notice (a writingTablet at s 2.0, centre 1840, 690) hangs on it within the servant's reach (arm length 74). Doorstep block 300..545, 48 high, so the seated woman's hips land on it and both children can climb up.
- The S2 children peek round the mosque's left wall edge (drawn before the mosque front, clipped at 1760), not from a separate alley.
- Schoolroom: palaceHall merchant, ochre, no arches/desk/shelves; window passed as 840..950 x 470..620 (no collision with the lamp at 730, 240). Nails at y 414 so tablet centres sit at 472. Pupils' mats reordered A 200, C 300, B 400, D 500 so that B (leans to D, later teaches at the stand) and A/C (check each other, stare in S9) are neighbours.
- Wide shots tightened (zoom 1.35-1.5 instead of 1.0-1.15) so the figures read on a phone; S16 exit at zoom 1.25 to keep the door and the teacher in frame. S9 81.0-82.7: a short pull-back to show A and C reacting before the plan's push-in on the teacher.
- Window jam: the body is clipped out of the window opening (evenodd), the turban is drawn squeezed across the frame with impact stars; legs pedal (walk phase driven by a damped swing).
- Turban lag: the worn turban takes the head rotation 0.1 s late (the pose function is evaluated at t - 0.1) plus a feather lag from head motion.
- Insert 62.58-63.54: a panel-space close-up (teacher at s 2.2 behind the page at s 5, portrait head-down) with UPSIDE DOWN! and a curved arrow.
- S12 letter world: authored in panel units, content scaled 1.25 about the ground; it grows out of the neighbour's page (letterFrame rollers) and shrinks back into it at 118.08.
- S17 168.54: a child cannot reach a tablet at y 470, so pupil D stands on tiptoe and flips it with a long cane (the tablet swings on its nail, then rotates upright with a settle).
- The woman is drawn through palaceHall `behind` while she is in the doorway (enter S6/S14, exit S16 with her children; the door closes over them).

Skipped or simplified (small): the knee save of the stack (13.9, done as a body counter-tip), the scarf slipping in the wail, the S10 tears falling at each footfall (steady tear drops instead), the robe arranging at 157.7 (pose only), the "?" sound arcs from C's reading (squiggle notes instead).
