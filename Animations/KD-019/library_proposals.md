# KD-019 library proposals (code in src/, not moved)
- `waterBird` (src/k19_cast.js `k19BirdRaw`/`k19BirdGeo`): gull/heron with a curve neck (neck, head target, curl, neckC, gulp bulge, choke pinch, limp), beak open/talk/hold fish, sit, walk legs, flight wings (flap), spread, wingTo gesture, feet/grip/legExt, age (ragged, grey brow), belly, glint.
- `crab` (`k19CrabRaw`): front-view crab, stalk eyes (stalk, stalkL/R), two-bone pincer arms with hand targets and open hinge, tripod scuttle from ph/amp, dangle legs, tear, glints; `k19aimTips` puts pincer tips on world points.
- `fishBones` (`k19bones`): skeleton in slim/round/small kinds with a count rim.
- `feather` (`k19feather`, `k19featherFall`).
- `pond` cutaway set (src/k19_sets.js: `k19pondLand`, `k19waterTint`, `k19surface`, `k19reeds`, `k19weed`, `k19reflect`, `k19bedY`).
- `rockyHill` set (`k19hillLand`, `K19BONES`, `k19boulders`, `k19shimmer`).
- `aerialStrip` (`k19flightSet`): scrolling dry-ground strip with clouds and an optional pond patch.
- KD-007's fish, splash, bubbles, net and red cross were copied as `k19fish`, `k19splash`, `k19bubbles`, `k19net`, `k19cross`.

## v2 additions (Fable round 1)
- `waterBird` new fields: `limpHead` / `limpRot` (where the head hangs when `limp`), `pupil` (pupil radius override, for a real pupil on a look to the lens), `smirk` (thin gape curl for a cold "mask slips" look), hold items accept `s`, `mouth`, `fin`.
- Squeeze pulse bundle (src/k19_act.js `K19SQ` + k19_main.js): `countedBeats` drives gripper close (open on `dip`, 0 on beat), gripper body `sq`, stalk jerk, victim neck `choke` stepping 0.4/0.7/1.0, head jolt, beak snap, small pupil; plus an impact star at the grip, 3 feathers popping per beat and a 3-5 px panel-only `K.spring` shake. Candidate `squeezeBeat()` helper.
- Neck-hang: a figure hanging from a point on another figure's neck curve, blended in from its previous anchor (`hangIn`) and swung with `hang` (src/k19_main.js `k19drawCrab`).
- Guide rule: a mid-air struggle needs clear sky under the lower figure; any horizon at foot level reads as standing (v2 lifts the pair 160 units and frames at zoom 2.2 so the ridge leaves the frame).
- Bug to avoid when moving `fish` into the Library: velocity from `k19fishXY` must use `.x/.y` (v1 used `[0]/[1]` on objects, giving NaN swim phase and fish drawn with half a body).
