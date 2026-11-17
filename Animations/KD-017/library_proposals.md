# KD-017 library proposals (drawings in src/, not moved to Library/)

- `k17Back` + `k17Walls` -> `merchantHouse` cutaway strip (1800 wide: street with house fronts and lamp post, hall with dado, inner arch, shelf, carpet, yard with garden wall, open gate and palm; day and night palettes; stone footing and earth below the floor).
- `k17Door` -> `sideDoor(ctx, side, open, knock, {bulge, rattle, screw, glow})`: a door in a side wall of a cutaway that reads edge-on (plank body in the wall gap with ring handles, leaf swinging into the room, knock push, popping hinge screw, glow).
- `k17Sack` (fill 0..1, squash, slump, poke candle/cup), `k17SackHeld`, `k17Coin`.
- Valuables: `k17Cup`, `k17Vase`, `k17Jar`, `k17Plate`, `k17Candle`, `k17Broom`, `k17Pot` (flowerpot with lift and tilt).
- `k17Well(ctx, x, y, s, {ghost, mark: '?' | 'x'})`: well icon, dashed ghost outline, question mark or red cross.
- `k17DoorIcon(ctx, x, y, s, {tick})`: door icon for balloons and clouds.
- `k17Hourglass(ctx, x, y, fill, {run, red, rot, k})`: panel-space time meter.
- `k17Flush(ctx, P, k)`: anger flush over a person's face; `k17Impact` (knock stars), `k17Dust` (lintel dust), `k17Chalk` (outline drawn in the air), `k17Twinkle`.
- Motion: `k17Pound(t, hits)` (fist arm angles keyed to hit times: raise, strike on the hit, recoil), `k17Dir(t, list)` (turns with a short squeeze), run-in-place on a slipping mat (S14), `k17Walk` (walk fields from a keyed track with no stride on cuts).
- Camera: inset circle that redraws the world through a second camera (k17Over, 116.86-122.7).
- `facePalm(ctx, P, k)`: a palm drawn over the face after the person (the person draws its arms behind the head, so hand-to-face gestures are hidden); v2 160.36.
- `keylineSfx`: an sfx word with a paper-white outer keyline for red lettering on dark backgrounds.
- `iconBalloon(ctx, {icons, kind})`: the misunderstanding balloon pair (Fable note).
