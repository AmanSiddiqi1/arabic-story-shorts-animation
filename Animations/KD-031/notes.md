# KD-031 implementation notes (v1, code only)

Film length 174.32 s (narration 171.322 + 3.0 s THE END hold, from the plan). Cues use the plan's word times (timeline.md); paragraph-opening words with silence inside them (40.32, 62.68, 82.40, 105.56, 149.56) only carry slow actions, so no onset measurement was needed. Subtitles are the plan's chunks (chunks_ar.txt / chunks_en.txt), rebuilt verbatim by align.py from the final .words.json (copied to whisper.json, no transcription).

Decisions the plan left open, or changes measured on the actual sets:
- Owner questions: all eight plan defaults kept (peeking second hunter, overheard secret + ground window, fig tree, charity without a beggar, the lettering list, the real hoopoes at the end, the quiet hoopoe speaks the moral, coin bite and two fingers).
- Sets: the three street places are three marketStreet layouts (K31STA merchant door at x 230..350, K31STB market end with two stalls, crate and mat, K31STC palace front with door 300..420 and balcony at 380). The S16 "awning pole" is a striped shop awning drawn by the story at x 670..990 (rod y 564); the birds land on it.
- Cage: 0.75 scale (128 x 150) everywhere so the man can carry it; the birds sit on a perch dowel inside (s 0.72) rather than on the floor, so they read through the bars. Cage close-ups use zoom 3.2-3.3 instead of 2.6-2.8.
- Market layout: man stops at 380 and steps to 450, the cage on the crate at 620, the hunter seated on the mat at 790. The hunter cannot reach the cage top from the floor, so he raps its side (24.38) and slides it toward the man (59.0) instead of pushing it by the ring. He walks off RIGHT (not left) at 61.3 so he does not cross the man.
- The carried cage is held in both hands at waist height (local centre [38, -88]); "eye level" at 62.68 and the hunger cut-in (68.3-70.9) lift it beside his face.
- The second hunter peeks from behind a foreground wall pier at x 96..158 (drawn over him), with the net shadow sliding along the facade first.
- Road (S8): countryRoad 2400 wide, milestone moved to x 1100 so it is on screen at FAR AWAY (76.78); camera y 640 instead of 690.
- Grove: trunk centre 700, branch 430..700 at y 520 with a spring dip on landings; jar buried at base (640, 1080), window (640, 1040) r 125. The man kneels at 170 in S9, steps to 330 to pick the cage up with his back to the tree (S10), stands at 330-370 in S11-S12 and kneels at 505 to dig (S13).
- Dig: the hole is a shallow cross-section pit (x 592..688, 50 deep at CLINK) because the figure's arms reach only ~74 units; the hands dip into it with a 0.38 tip. The jar rises out of the pit (clipped) and is set down at x 650; the gold rays fan +-0.5 rad so they never cover his face.
- S11 overhearing: one eye open via wink 'R'; the cage he is lifting drops on the jump and rolls left to x 214, where it stays.
- S12 cloud: one thought cloud at (265, 400) holds the question (S11) and the answer (S12); the camera for S12 is {410..420, 480, 1.75..1.9}.
- S2 wipe: a story-drawn left-to-right band (the Library transition always prints a caption).
- Skipped: the cap lifting 6 px at 138.4 (headwear is part of the person drawing); the master's purse is implied by the hand at the sash.

## v2 (Fable round 1) decisions
- Camera: every wide re-keyed so the ground band is under ~15 % (y <= 900 - 430/zoom); one establishing second kept at 21.0 (market) and 164.7 (palace front); grove before 101.5 and 105.6-121 framed from the grass line up. Soil only for the ground windows and the dig.
- S5 cloud: 600 x 420 at world (430, 250), scale 0.6 (cage s 1.8 = 184 world units), camera (440, 470, 1.36) so the cloud sits over the roofline and the man's face stays clear.
- S9: man moved from x 170 to 200 so his hands reach the cage; the far hand cannot reach the cage ring, so it steadies the near side. The grove cage door is now hinged on the right (o.hingeR) so it swings away from his arm.
- S11/S12: from 119.68 the camera pushes to (436, 530, 2.2) and the net cloud moves to (345, 352), 216 wide, so it fits the close framing; its trail switches to the speaking bird at 121.22. Bird A nods while B covers her eyes (A no longer covers).
- S15: the king stands on the dais at x 745 (does not step down); the jar is set at 590/610 and slid to 550 by the king on احتفظ; the man puts the lid back on at 159.2-159.7 so the rays close to a glow by لكن.
- S16: the awning post moved to the far right end (x 972) and the man stops at 640 under the shop window (clear wall); the real hoopoes fly in from the right below the THE END card.
- S7: passers-by are library person() figures (merchant, villager, beanSeller) at s 1.2, y 1010 in the foreground 66.3-68.4.
