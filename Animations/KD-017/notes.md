# KD-017 production notes (v1 implement, code only, no render)

Film 169.2 s (narration 166.21 s + 3.0 s THE END hold; plan duration + end_hold). Subtitles: plan `subtitles` chunks in chunks_ar.txt / chunks_en.txt, rebuilt verbatim by align.py on the final `.mp3.words.json` (copied to whisper.json, no transcription). Cues use the plan's word times, except sharp hits on words whose Whisper start includes the preceding silence: there the silence-refined onset from timing.json is used (for example فجأة 44.49, صاح 50.08, «افتحوا 52.82, وأشار 63.21, فأمسك 142.48, «وجدت 78.88 / 154.08).
Code: src/k17_parts.js (house set, doors, props, icons, helpers), k17_cast.js (servant, friend, owner, wife timelines; door states, knocks, items), k17_main.js (world draw, camera, lettering, hourglass, inset, card, sound).

## Decisions the plan left open
- One 1800-wide cutaway world for the whole film (street 0..380, hall 420..1280, yard 1320..1800, floor y 900). Camera height follows the zoom (floor at panel y ~915) so the earth cross-section under the floor never fills the frame; the camera keys' x and zoom follow the plan.
- Shelf boards lowered to y 690 / 770 / 850 (plan 620 / 700 / 780): the Library person's arms (about 74 units) could not reach the plan's shelves. Packing spot: servant x 680, friend x 800; sacks A x 745 (dragged to 720 at 76-77) and B x 860.
- The first door jolt is on the real onset of فجأة (44.49); 43.08-44.49 is silence and stays still (suspense by stillness).
- S4/S5 inside framings keep the street out of frame (left edge >= 355) so the owner is first seen on the whip at 47.82; the owner arrives at the door off screen.
- S2: the owner and wife come out of the inner arch at 11.9 (seen behind the handshake), the servant bows to them from the back door while hiding the friend; the coin split happens near the back door (x 1070) instead of x 800 so nobody runs across the hall. The broom is leaned against the shelf at 3.5 (the servant needs both hands to count doors).
- S7-S8: the hold on the empty open door is 0.55 s (76.0-76.55) at zoom 1.5 so the friend leaves frame in time for the whip and the servant's double take at 77.02. Argument spot S8-S10: servant x 665, friend x 790 (860 after the shove).
- S11: inside shot framed at x 650 / zoom 1.6 so only the owner's fist shows at the door edge; then the street shot.
- S12: servant kneels at x 1050, friend at 1160; the friend dodges into the yard (1350), walks to the flowerpot at x 1522 (plan 1560, closer so it fits the 3 s), comes back in hopping over the fallen servant, and lifts the corner of a doormat at the back door (the carpet is too far away).
- S13-S14: the pair argue by the back door (servant 1090, friend 1190 on the doormat). The friend's run is a run-in-place on the doormat, which slides back under him (138.6-142), so the owner (790 -> 1180) can reach the collar on the threshold at 142.48 even though the door is two steps away. The servant dives behind sack B (x 885) and stays there until 163.75 (peek 143.1, sinks 155.2).
- S15: owner x 1140, friend x 1250 so both faces read; camera x 1190 zoom 1.35 keeps the servant (behind sack B) and the open door in frame (the yard gate is out of frame).
- Owner's long shadow: drawn as a dark band with a turban blob across the floor, inside a pale wedge of street light (125.9-128.7).
- Moon at (1370, 290) so it never sits under the hourglass meter (top right of the panel). Inset circle top left (r 120), cloud top centre.
- Sound: the plan's four effects (whoosh 21.85, pop 136.9, thud 145.3, chime 166.6) plus the series' standard quiet room bed (`S.sfx.bed`, 0.5), as in every finished film.
- Costumes: servant = Library `servant` with blue dots and a yellow sash; friend = `thief` preset recoloured yellow/red stripes (one look in every pose); owner = `merchant` in yellow with red trim; wife = `lady` in red.

## Skipped / simplified
- Turban follow-through (2-3 frames late): the costume turban is not a separate part; the owner's head and body move together.
- The friend's "one brow up, one down" (152.98): brow -0.6 with a frown (the thief mask has no brows).
- The servant does not rap on the back door at 27.0; the friend opens it as he arrives.
- Not rendered to video (code-only stage); checked with contact sheets at every scene's key beats and implcheck.
