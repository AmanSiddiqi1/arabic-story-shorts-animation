# KD-005 library proposals (drawn in this story's src/assets.js; not yet in Library/)

1. `snake(ctx, pts, o)` + `snakeTrack(raw)` + `trackRuns()`: tapered black snake drawn along any path (tail to head, u for taper), wedge head with half-lid slit eye, gaze, tongue flick, open jaws with fangs, X eyes (limp). Track sampling by arc length with a wave function; `flag` per point splits behind/in-front runs (helix round a trunk). Coil (`k5CoilPts`) and strike (blend of the head half to a straight line).
2. `burrow(ctx, x, y, o)` + `burrowShade()`: snake hole mound with rocks, eyes glinting in the dark, cobweb with dew, a flower that grows and nods; the shade hides a body going inside.
3. `necklace(ctx, x, y, o)`: gold bead loop with a red drop; `hang` (swing angle) or `lay`; sparkle pulse. Plus `sparkle(ctx, x, y, r, rot)` four-point star.
4. `beakGrip(P)` for `bird`: world point at the beak (follows drop, headRot, rot, sq, tip) to carry a necklace, a worm or anything; the plan's bird `carry` field could use it.
5. `fightCloud(ctx, x, y, r, t, p)`: dust-cloud brawl with stars and a staff / tail popping out in turn.
6. `tallTreeHome` (`k5TreeCrowns`, `k5TreeTrunk`): one tall tree with nest fork, nest ledge, low bare branch, right stub, lookout twig, root stone; crowns and trunk in separate layers so a climber can pass behind the trunk.
7. `chaseRoad`: 3000-wide strip with three perch trees (branch tips at y 548) and the home tree at the far end.
8. `personHand(P, side, armAngles)` + `staff(ctx, hand, angle)`: hand position for the person figure from arm angles, and a free staff (raise, swipe, two-fist grip, carry over the shoulder).
9. Fox `pal: 'jackal'` (tan/sand), replacing the canvas-filter tint used here.
