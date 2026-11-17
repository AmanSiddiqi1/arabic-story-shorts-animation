# KD-031 library proposals (new drawings kept in src/k31_parts.js; move one at a time after approval)

- k31hoopoe -> bird kind 'hoopoe' (cast/birds2.js): two palettes, fan crest (crest 0..1), long down-curved beak, barred wing and tail; extra fields cover (wing over the eyes) and scratch (foot to the head). Wrapped with acting().
- k31cage -> props birdCage(ctx, x, y, s, part 'back' | 'front', {door 0..1.9, rot, seeds, latch}) with a perch dowel; helpers k31cageFloor / k31cagePerch.
- k31jar + k31jarLid -> props clayJar (lid, fill, cutaway, soil, tilt, sq, glint): the planned hangingJar ground variant.
- k31coin -> props coin (flat, rot, glint); k31bindle; k31broom; k31loaf (with steam).
- k31mesh, k31netBlob, k31handNet -> props fishingNet pieces (mesh clipped to any polygon, folded bundle, hand net).
- k31groundWindow -> fx groundWindow (round see-through soil window with an inside callback, shiver).
- k31goldGlow -> fx goldGlow (rays, halftone disc, staggered glints).
- k31flight -> motion flight(t, keys, 'weak' | 'strong') (sagging arcs and frantic flaps vs level arcs and even flaps).
- k31crackHeart, k31twoFingers, k31squiggle, k31palm -> small fx/props.
- k31L2W / k31W2L / k31hand / k31headXf -> person geometry helpers (body-local to world and back, the real hand position with the arm clamp); the same code exists in KD-022 (k22L2W).
