# KD-013 library proposals (drawn in src/kd_assets.js; Library untouched)
- `goat` (cast): fat white goat on a simple 4-leg rig; fields ph, amp, fat, chew, talk, headDown, headTilt, earLift, tailUp, asDog (goat-to-dog doubt morph), acting fields via `acting()`; `kdGoatNeck`/`kdGoatHead` anchors.
- `rope` lead (props): `kdRope` (sag from slack), `kdLoop` (neck loop, open/slack), `kdRopeGround` (S on the ground).
- `dogIcon`, `coin`, `sack`, thief-head icon (props/fx): `kdDogIcon` (q, cross), `kdCoin`, `kdSack` (droop), `kdThiefHead`.
- `balanceScale` (props): `kdScale(ctx, x, y, s, ang, left, right)` with level pans and pan content callbacks.
- `spiralEyes` (fx) over a person's eyes; `dreamWash` (fx) blue Ben-Day "his view" overlay; anger `flush` on the cheeks.
- Thief disguise items (people): jammed turban, false beard on ear strings (slip, swing), tall merchant turban (lift, rot).
- `kdL2W` / `kdHead` / `kdHand`: person local point to world (sit/kneel hip offset, age lean, acting sq + tip) — useful for ropes, labels and gaze; suggest a Library `personAnchor(P, part)`.
- Round inset panel (camera): a circular sub-view of another world position drawn in panel space (kdInset in src/kd_market.js).
