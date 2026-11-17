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
