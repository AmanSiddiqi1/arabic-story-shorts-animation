# ALI-02 library proposals (all in src/, prefixed a2; the coordinator integrates them one at a time)

1. **caveDoorInside** `a2CaveDoor(ctx, t, {open, crack, light, inside})` + `a2CavePlate` (a2_base.js): the sesame door seen from inside the cave (arch x 60..280, top 560): slab halves sliding into the wall, a hairline of daylight on the seam, a white-blue daylight blade on the floor, the outside view with figures clipped to the arch.
2. **glade colour models dawn and morning + screeSlope** (a2_base.js): `A2_SKY` / `A2_LAND` rows, `AB_ROCK_COL` / `AB_LEAF` / `AB_BARK` entries, `a2GladePlate(model)` with the scree baked in (`A2_SCREE`, `a2Boulder`, `a2ScreeFront`, bounce points `A2_SCREE_PTS`).
3. **grainIcons + confusionRing** `a2Grain(ctx, kind, x, y, s, rot, {blur, glow, alpha})`, `a2Ring(ctx, cx, cy, tc, {speed, rx, ry, k, rain}, half)`.
4. **pebbleThrow and rollDown** `A2_PEB`, `a2Roll(t, t0, pts, hops, dur)` (a2_s3.js): a thrown object on a high arc followed by the camera, then a bounce chain with shrinking hops and dust at each contact.
5. **ground trails** `a2CoinTrail` (reveal, hop on hoof beats, lit), `a2Ruts` (cart ruts with hoof prints and a running neon streak), `a2Prints` (two lines of slipper prints with a streak).
6. **person body points** `a2BodyPt(P, lx, ly)`, `a2HeadPt`, `a2Hand` (a2_base.js): world position of any upper-body point of a Library person, following sit/kneel hips, lean, tip and squash; used for overlays (feather, blush, coin eyes, a heart on the chest, carried sacks).
7. **Cassim extras** `a2CasExtra(ctx, P, {fa, droop, blush, coin, sweat})`: a lagged feather plume (his emotional antenna), blush ovals, coin eyes and a sweat bead over the merchant puppet.
8. **strainLift / tiptoeFreeze poses** (a2_s1.js S2, a2_s3.js S11): built from existing person fields (sit with `seat: 'bench'`, `handLW/handRW`, frozen `ph`/`amp`).
9. **hanging cloak** `a2HangCloak(ctx, P, t, col, kick, ph)`: a standing figure's cloak as a tapered ribbon with a slow tip sway and a kick.
10. **far town** `a2FarTown(ctx, t, x, base, s)`: the ALI-01 roof strip on the horizon with windows twinkling on twos.
11. **tape inset** `a2Inset(ctx, t, rect, p, draw)`: a tape-edged picture-in-picture with tracking lines (used for the palm signal and the cart memory).
12. **yard in full morning** `a2MorningSky`, `a2YardPlate`, live `a2Washing` and `a2Smoke` (the ALI-01 yard repainted for morning).
