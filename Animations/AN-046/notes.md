# AN-046 The Sparrow and the Peacock: implementation notes (v1, code only)

- Inputs checked: planning_metadata sha256 of the final MP3 (8da5c915...) and its `.mp3.words.json` (e308f860...) match `Audio Files/Final Done/` and `planning/inputs/timeline.json`.
- Film length 176.33 s = plan duration 172.831 + end_hold 3.5 (under 180.0). THE END from 173.0.
- Subtitles: the plan's `subtitles` chunk marks (chunks_ar.txt / chunks_en.txt), aligned by align.py with the final `.words.json` as whisper.json.
- Owner questions: all plan defaults taken (crown and badge, sparrow kind, crows as the large birds, cage carried off by the hunter, early feather hint, distant peacock in the last shot, capture without harm, the lettering list).
- Source: src/a46_parts.js (peacock, hunter overlay, net states, cage, crown, badge, bindle, grain, effects), a46_sets.js (garden, summit terrace, glade), a46_acts1-3.js (S1-S16), a46_main.js (scene table, cameras, transitions, sound).

Decisions the plan left open or that the measured set changed:
- Sparrow scale 1.1 (Library sparrow is ~70 tall at s 1; plan's s 0.8 read too small). Peacock stride 2*24/pi so the legs do not slide.
- Garden perch = tip of Library TREE.larkLeft branch (292, 600). Throne moved to x 845 (sparrow's place 752) so the place is not under the king's chest. Summit sky u 0.3 (u 0.2 is the muddy dawn-to-day cross-fade); far peaks sit below the terrace edge among the clouds.
- Glade hiding bush moved from x 1060 to 1120 so the hunter can kneel at the net (x 935) in the open; S12 bush insert and the throw origin follow it.
- S6 opening camera (620, 640, 1.35) instead of (420, 640, 1.15): the plan's framing left the hunter's entry out of frame. Several cameras reframed so the ground line sits at about 75-80 % of the panel.
- S6 hunter: no `sneak` gait in the Library; sneak = walk with exaggerated amplitude pulses, lean and darting looks. The hands push the roll near him (arms are 74 long); the net unrolls on its own.
- Snap at 63.10 (measured pause 62.77-63.14 before فأمسك). Net landing 137.56 and door 149.90 kept on word starts (no micro gaps). All hits are silent (lettering + panel shake).
- Sound: the plan's six cues; the 120.8 thud moved to 121.15 (inside the measured pause 121.03-121.54; 120.8 falls inside a word). HOME pop at 86.95.
- Cage carried at the side by the ring (s 0.75, base y 884): held at chest height it covered the companion's face. Badge falls at the cage (x ~944), not at (780, 895); S16 pushes in there.
- S11 is dawn-yellow, plain day from the cut at 113.7 (hides the dawn/day cross-fade). S16 sky dusk 0.5 to night 0.72 after the last word.
- Wipe at 11.0 is a slanted yellow halftone band revealing the summit; irises at 50.3 and 64.7; dissolve 99.2-99.65; LATER card 106.78-107.58 "ANOTHER DAY...".
- Skipped: the empty nest swaying at 172.6 is off-screen in the final mountain framing (the nest still sways in code); the fan eye spots reflected in the sparrow's pupils (9.90); per-feather fan stagger is by distance from the centre, not one frame per feather.
