# AN-111 The Devout Israelite: implementation notes (v1, code only)

- Inputs checked: planning_metadata sha256 of the final MP3 (6893b7da...) and its `.mp3.words.json` (6323a8d1...) match `Audio Files/Final Done/` and `planning/inputs/timeline.json`; script sha 86ccb17d... as in the timeline.
- Film length 179.99 s = narration 177.87 + end hold 2.12 (plan, capped to 180 s by clamp3min). THE END at 178.0, chime 178.2.
- Subtitles: the plan's `subtitles` chunk marks (chunks_ar.txt / chunks_en.txt), aligned by align.py with the final `.words.json` as whisper.json (236/237 words matched, one interpolated). No dashes in either script.
- Sound: exactly the plan's four effects in true pauses: pop 6.87, whoosh 20.55, pop 133.42, chime 178.2 (gains 0.3-0.55, master 0.6 at render).
- Owner questions: all plan defaults (faceless column of light, no wings; plain villager costume; kneeling with raised open palms; clean belly flap; the friend returns in S28; the wife's nod; the eleven lettered words; three sacks paid, four equal sacks from S22).
- Source files: `src/a111_rig.js` (timing helpers, body-local/world for the Library person, IK hand targets in world or local space), `a111_props.js` (all new props and effects), `a111_cast.js` (cast looks, GIVE gesture, small acting pieces), `a111_home.js`, `a111_market.js`, `a111_yard.js`, `a111_shop.js` (one function per scene), `a111_main.js` (scene table, cameras, wipes/dissolve/NEXT DAY card, lettering, sound).

Decisions the plan left open or the measured sets changed:
- Cameras are tighter than the plan's zoom values (about x1.25) and every camera y puts the ground line near the bottom of the panel (`A111_G(z)`): at the plan's zooms the figures were small and a third of the panel was empty floor.
- Hut (hutRoom, door on the left): window [690, 400], niche [470, 540], mat [300, 760], peg [190, 600] with the limp purse; the shelf (x 215-440, y 522) with the platter and jar is drawn by the story (the Library shelf has its own pots).
- Yard (villageYard): the default KD-009 cottage door is 140 high, too small for these figures, so the cottage is x 600-1012 with a 100 x 260 door at x 700-800. The wife (and in S23-S25, S28) stands in the doorway through the `inside` callback.
- The poor man is first seen dozing against the cottage wall left of the door in S19 (setup) and stands up on "قابله" (135.74): this is "beside the door post". Hero x 430 and needy man x 640 in both S6 and S20 (same picture); in S6 the hero steps in to 470 for the gift because the arms (74 units) do not reach across 210.
- Market (marketStreet 1600 strip): S3/S6 stalls cloth 380, sacks 800, food 1200; S10-S12 cloth 380, sacks 800, an empty stall at 1120 dressed as the fish stall. Stallholders stand behind a story-drawn counter front so their legs are hidden. The fish lies at (1060, 764); the seller stands at 1160 behind it; the handshake (78.38) is over the fish, the platter and jar go on the counter's left end, and the seller comes left (81.5) to hug the platter and plant his palm fan in the jar.
- S8: the wife steps in to lay her hand on his arm; the child runs in to hug his leg 6 frames later.
- S14: the knife is a small blade drawn at the wife's hand; the flap opens onto a navy hollow; the glow is kept small (r 34-56) so rays never cover faces.
- S15 insert: the hero's head (s 5) upper left with one eye shut, the pearl r 165 at the right with the drift and the sliding highlight; the ghost hole is dashed and crossed out on "تثقب".
- NEXT DAY card 102.3-103.7, scene cut S15 -> S16 at its covered midpoint 103.0.
- Shops (palaceHall merchant): desk drawn by the story (x 470-730, top 792) after the seated jeweller / standing merchant so it hides their legs; the jeweller sits on a high stool (y 862) so his chest shows over the desk. The jeweller and merchant hand the pearl with the hand nearest the hero.
- S18: the hero sits on a stool at x 380 right behind where he stands, so the sit-down (125.64) needs no step; the 2-frame panel bump is at 125.79.
- S22: the hero kneels (Library kneel: both knees) and leans to draw a dashed line between the four sacks; he offers the pair nearest the poor man held in both hands.
- S25: the rags bleach by redrawing the figure in a white palette clipped below a rising line; the column of light (no wings, no face) rises and shrinks to a star; the balance scale stands between the two men, the tick beside it.
- Transitions: comic wipe (0.4 s slanted edge) where the plan says wipe, a 0.5 s dissolve S26 -> S27, cuts elsewhere.
- No title card (the plan lists only the eleven lettered words and THE END).
