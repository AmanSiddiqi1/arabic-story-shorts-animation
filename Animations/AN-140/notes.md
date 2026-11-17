# AN-140 The Sons of Yahya and Said bin Salim: implementation notes (v1, code only)

- Inputs checked: planning_metadata sha256 of the final MP3 (82901620...), its `.mp3.words.json` (d2942601...) and planning/inputs/timeline.json (716efe1d...) all match.
- Film 174.9 s = 171.934 + 3.0 hold, rounded down to the frame. THE END 172.2. implcheck PASS.
- Subtitles: the plan's chunks (chunks_ar.txt / chunks_en.txt), aligned with the final `.words.json` as whisper.json (248/251 words, 43 silence-refined starts).
- Effects: exactly the plan's five (thud 9.34, whoosh 21.6, whoosh 122.45, chime 169.3, chime 172.2), master 0.6.
- Owner questions: all plan defaults taken (creditors paid with purses, the brothers' glance and Jaafar's hush, all invented lettering, the caliph drawn).

Decisions the plan left open / measured on the set:
- Street strip 1600 with custom house fronts: Said's door 1130..1230 (cx 1180), his window 990..1080 x 530..630 (raised so creditors' heads stay below the sill). Door, window, Said in the window and door-leaf-over-actor are drawn by the scene. Sky: skyCycle pinned to the camera (strip sun arc problem), night tint during the DAY 1-3 laps.
- Mules at 100/300/500/700 (facing right), heap centre 960 (858..1062, top about y 577), Said stops at 1080 (S13) / 1100 (S16-S17), messenger right of the door at 1200/1290. The heap holds 3 items at 149.6; the servant tosses 2 off the nearest mule in S16; it is full (9) after the 157.2 cut.
- Slightly tighter wides than the plan (S1 1.15, S2 1.3, S3 1.25) so the figures read on a phone.
- S2 19.22 "cut inside the slit": done as a camera cut to zoom 2.5 with the shutters fully open, Said holding his head; he sinks with one hand left on the sill.
- Abdullah's room: own desk 550..790 drawn in front of Abdullah (he sits behind it on a red bench at 680), stool at 428 (Said seated at 450). Abdullah walks behind the desk and is redrawn in front once clear of its edge (S6).
- Thought clouds and picture balloons are drawn in panel space (consistent size); the S5 fear cloud shows giant brothers (s 3.0) over a small Said; the S17 cloud replays the S8 hall with the same seated and PRAY poses (A140_PRAY constant).
- Letter flashback: the picture grows out of the open letter (rect measured from the S13 and S16 cameras), inner world scaled into the frame, ink wipe left to right, letterFrame rollers; tags at the top-left of the letter, then flown to a column in S16 with the running counter.
- Mule = Library donkey (brown) stretched 1.1x horizontally (no library change); silhouettes in the news strip use the donkey `silhouette` field, persons via a canvas brightness(0) filter.
- Final morning: dusk to u 1.08 over 1.1 s and the street palette cross-fades to 'clear'.

Skipped (small): the servant's cap trailing, the turban actually slipping (head tilt only), fingers curling (the hand withdraws instead), robe flutter while running.
