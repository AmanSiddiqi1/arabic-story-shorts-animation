# AN-108 The Chief of the Kus Police and the Sharper: implementation notes (v1, code only)

- Inputs checked: planning_metadata sha256 of the final MP3 (3e2f6516...) and its `.mp3.words.json` (4a84747b...) match `Audio Files/Final Done/` and `planning/inputs/timeline.json`.
- Film length 180.00 s = narration 177.958 + end hold 2.04 (plan, 3-minute clamp). THE END at 178.1, after the last word (177.68).
- Subtitles: the plan's `subtitles` chunks (chunks_ar.txt / chunks_en.txt), aligned by align.py with the final `.words.json` as whisper.json (247/247 words matched). No dashes in either script.
- Sound: exactly the plan's eleven cues, each inside a measured silence (chime 4.7, thud 16.95, whoosh 22.2, pop 26.1, chime 43.9, chime 68.2, pop 77.35, pop 90.9, chime 111.5, whoosh 132.5, thud 178.05). No bed.
- Owner questions: all plan defaults (WANTED poster, mask-off moments, doubtful treasurer, weaponless robbery cloud, kick and stubbed toe, NEXT DAY... card).
- Source: `src/ks_rig.js` (time and rig helpers), `src/ks_props.js` (chest, gems, rings, bowls, goldGlow, purse, poster, loupe, touchstone, badge, mask, coin eyes, flush, guard helmet, movable turban), `src/ks_cast.js` (one pose function per character, chest state), `src/ks_main.js` (sets, draw order, clouds, camera, lettering, sound).

Decisions the plan left open or the measured set changed:
- Measured onsets: the payment word (فدفعها) starts at 106.43 after a silence (Whisper lists 105.84), so the purse drops into the palm at 106.43; the rage word (اشتد) starts at 156.5, so 154.98-156.5 is the silent trembling build; GLASS at 154.34 and the lid at 56.9 are real onsets.
- Stools are drawn by the story at 540 and 690 (palaceHall `stools` not used, persons use `seat: 'bench'`), so the sharper stands at x 564 and the chief at 666 (dir -1) to sit on them.
- Chief is `dir -1` so his right hand faces the room. His turban is drawn on its own (`ksHat`, pal head 'none') only while it jumps (157.04) and while it slides over his eyes (176.78); otherwise the normal Library turban (keeps the brows visible).
- Shove (S10): the sharper steps back to 470 and the chest slides in front of him (he stands behind it, which is why he can sweep his arms over it). The purse passes treasurer (770) -> chief left hand -> chief right hand -> sharper's palm over the chest.
- The chief kneels behind the chest to hug it (S12-S15) and is drawn in front of it from S16 (the open lid would hide his face in the S17 insert).
- Tested pieces are laid on the floor in front of the chest at 462 (glass), 492 (brass ring), 532 (tin bowl); verdict labels sit in the floor area with arrows (GOLD and SILVER struck with red X at the top), each held to 154.98; no camera move in S17.
- goldGlow is drawn behind the people so its rays never cover a face; the open lid panel is 88 high (not 110) for the same reason.
- S20 thought cloud placed at (450, 520), 380 x 260, inside the medium framing (the plan's (330, 330) is outside the 1.6 zoom shot); it is gone by 175.1, before the poster falls at 176.0.
- Night street uses `u: 0.78` (moon and stars) instead of the night preset. S19 guards: A searches the barrel (lid lifts) and the crate, B the cloth stall and the pots stall; they meet near x 1500 and look to camera.
- Lettering cut to keep the diet: WELL DRESSED, RINGS!, GEMS! (the sparkles and the narration carry them). The S11 sum cloud shows 40,000, a struck 1,000 and a growing coin pile with PROFIT! (no minus sign on screen).
- Small skips: the stool shuffle at 27.68, the turban ear slipping in his sleep (130.96), the slip at GLASS (154.34; he sags instead).

## v2 (Fable round 1, 2026-11-18)
- Sharper's stool moved to x 490 (feet 514) so the seated pair no longer overlaps; at 39.98 he kneels forward on the floor (y 962, drawn in front) with clasped hands raised; one tear at 40.8; wink on the far eye at 43.6 while the chief's eyes are shut.
- The chest slide is now pushed by the sharper from the chest's LEFT end (he walks round behind it 77.64-79.39, x = chestX - 128 during the push); afterwards seller 392, chest 520, chief 628-650. The servant stays by the door (x 178).
- Payment: the treasurer walks in from frame right already carrying the purse (no fades), doubts at 104.58 (SURE?), is waved off at 105.1, the chief takes the purse at 105.6 and holds it out over the chest at (512, 744) from 105.98; the sharper takes it at 107.22, gone into the robe by 107.52 with a wink to the servant. The treasurer walks out frame right (110.2-111.9).
- Hug and night test: the chief kneels beside the chest (x 650, drawn in front of it) from 108.14 and sits on the floor there at 127.0. Ring picked at 124.1, at the mouth 124.9-125.8 (BITE?), yawn 126.24, ring back with CLINK! at 126.4, lid shut 126.9-127.05. Z letters from 129.0, dozing nods 127.5-132.7.
- Verdicts: ring tossed to the floor at x 352 and bowl at 560 (free columns); stone held up in the goldsmith's LEFT hand from 152.9, dropped on GLASS (154.34), shatters 154.62 at x 425 with CLINK!. Tags GOLD/SILVER (row y 175), COPPER/TIN (row y 310) with vertical arrows, GLASS at the left wall with a short arrow; all held to the cut at 155.9 (insert extended by 0.92 s inside the measured silence). Jaw drop 155.4; tremble and flush from 155.9.
- Ending: no pull-out; camera eases from (580, 720, 1.6) to (655, 705, 1.85) over 174.0-174.9 and eases 9 % out during THE END. Nail pops 175.36, poster falls 176.0-176.78 and lands leaning on his knees (scale 0.6); look to the lens 176.95-177.55; lid 0.6, head drop and 10 px turban slip at 177.7. S20 back to the dusk key (u 0.56, lamps lit).
- Night street: custom houses so the chief's door (cx 275) sits in the left third beside a lit window.
