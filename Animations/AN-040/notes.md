# AN-040 implementation notes (v1, code only)

Decisions the plan left open, or changed after measuring the sets:

- **Film length** 167.1 s (MP3 164.10 + 3.0 s THE END hold from 164.3). Subtitle chunks are the plan's (`chunks_ar.txt` / `chunks_en.txt`), aligned with `align.py` on the final `.words.json` (219/219 words matched).
- **Cast**: the Library `cat` (pal 1, white) is used as is; the curled resting pose is `an40CatLie` (Library cat in crouch, sunk and clipped at the ground, plus a front paw and a wrapped tail). `leopard` and `dog` are new (src/an40_lib.js). The Library `sheep` and `person` (bedouin, villager with `hold: 'stick'`) are reused.
- **forestEdge** is 2500 wide (the plan's 1600 was too narrow once the leopard (about 400 long) and three dogs (about 250 long each) had to stand apart): forest wall x 0..520 with navy darkness, front occluder trunks at x 250 and 380 (the plan's 330/470 put the leopard's head behind a trunk for the whole stalk), big trunk x 760, perch (960, 394), cat spot 1080 (facing right), crow spot 1255 (facing left; 1190 made the beak overlap the cat's face), bush x 1350, cat eyes in the bush at (1305, 856).
- **Leopard x** keys are body positions (the nose is about 234 ahead): eyes at 24.74 between the trunks, out to 260 by 28.2, four held steps to 380 (33.3), one step to 410 at 46.1 (nose about 644, just short of the trunk), 450 by 53.4, 560 at 59.9.
- **S13/S14 geometry changed**: the plan had the leopard facing the bush with the dogs arriving from the same side, which makes the over-the-shoulder look impossible. The leopard stands at x 1560 on the meadow side facing LEFT over the bush (paw raised over it); the dogs arrive from the right behind it (stop 2050/2110/2175), so it looks back over its shoulder at 127.42, spins to face them at 134.3, is pushed back by each bark to 1390, turns at 139.7, spins its legs 140.02-140.35 and bolts left behind the trunks. Screen direction (home left, pasture right) is kept.
- **Pasture** is 2500 wide: guard post (dogs) 1300/1520/1740, flock 1950..2350, shepherd1 (bedouin) 1880, shepherd2 (villager, blue robe) about 2360. Lure points: lands 1010, hop 1 to 560, hop 2 to 400, hop 3 to 230 (hop 1 is the longest, not the shortest: the lunging dog slides past the crow and the next landing must be clear of it). dog2 and dog3 collide (dog3 runs into dog2 from behind) rather than meeting head on from two sides.
- **Pull-out at 94.64** uses zoom 0.62 (sky and sand are filled outside the baked set) so trail, empty post and shepherd1 share the frame.
- **Lunge timing**: 79.2 includes leading silence (voice onset 80.57); the release is at 79.9 in the pause. The charge is on the measured onset 133.05.
- **Chase**: one distance function `DD(t)` (eases off at 108.76) drives the strip and every gallop phase; S11 at zoom 1.0 (the planned 1.2 cropped the pack).
- **S5**: TOO FAR was dropped (it covered the cat's face at phone size), as the plan allowed; X marks, bars and the thought cloud stay.
- **Sound**: the plan's effect cues except **147.8 pop**, which falls inside speech (no pause between 144.97 and 149.06); 24.4 rustle uses the `paper` voice.
- **Time of day**: u 0.25; the EVERY DAY montage runs three quick sun passes (DAY 1, 2, 3 at 3.92, 4.47, 5.02); late light 147-157 ends at u 0.38 (0.42 read as dull lavender).
- **Insets**: crow on the branch (64.0-71.5, swells to fill the panel as it dives), cat in the bush with the leopard's shadow and paw (104.6-107.0), shepherd patting dog1 (160.0-161.45).

## v2 (Fable round 1) decisions
- Leopard S5 keys: held steps 43.5-45.35 to x 676 (nose ~910, past the trunk at 760); cat steps back to CX0+60 at 46.1; bars measured from the leopard nose / cat head / trunk centre (ratio ~1:2, labelled 2 STEPS and 4 STEPS).
- Hill-tree row baked through story-local an40HillTrees with a clearing 990-1340 (same rng as Library hillTrees, so other trees are unchanged).
- Bush eyes moved to (1290, 822). Leopard reaches the bush from the LEFT in the 104.6-107.3 inset, turns off screen at 108.4, paw up from 109.6.
- S13/S14: dogs 2010/2100/2190, nearer by 35 per dog (y offsets 0/35/70), drawn back to front; leopard pushed back to 1350. Forest camera may go below zoom 1 (sky/ground fills like the pasture).
- Pasture: flock and shepherds +80; pull-out at zoom 0.46; crow hover x 340 and scaled 1.6x in the wide.
- S16 dogs in the foreground band (y 995, s x1.25) drawn after the friends; leopard eyes at (458, 742).
