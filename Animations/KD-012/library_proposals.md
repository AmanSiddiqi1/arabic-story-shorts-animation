# KD-012 Library proposals (all implemented locally in src/assets.js; default looks unchanged)
1. `lakeShore` set (sets/places.js): 2000 x 1230 plain + rock + burrow field with cutaway rooms + oblique lake; separate sky and land layers per preset so a moon or sun can rise behind hills and rock.
2. `pond(ctx, {x, y, w, h, level, t})` (sets/ground.js): oblique pond with falling level and spreading cracks (shared with KD-008).
3. `burrow(ctx, x, y, {crack, collapse, eyes})` (props/things.js): hare mound with doorway, peeking eyes, cracks and collapse clods (shared with KD-005).
4. `rock` with stand points (l1, l2, top) (props/things.js).
5. `moonReflection(ctx, {x, y, r, t, wobble, breakUp, alpha, tint})` (fx/fx.js): sliced disc on water; also the sun.
6. Elephant pose fields `crown`, `crownLag`, `crownSlip`, `talk` (cast/elephant.js, default off); now a wrapper `elephantK`.
7. `bumpChain(t, t0, i, gap)` (motion.js): followers concertina into a stopped leader.
8. `hops(t, start, list)` (motion.js): chained hops with anticipation and landing squash; `hareUp(ctx, P, pop)` for rising out of a burrow.
9. `halo(ctx, x, y, r, R, pulse)` (sets/sky.js): Ben-Day halo around any moon; `ringOut` ripple ring of a given reach (fx).
10. `bigFoot(ctx, x, soleY, w)` (props or fx): foreground elephant leg column with toenails entering from the top of a close shot, driven by `countedBeats`, with a growing `halftoneShadow` (v2, src/s_lake.js).
