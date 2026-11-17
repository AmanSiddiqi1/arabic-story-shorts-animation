# KD-010 library proposals (drawn in src/kd10_parts.js, story-local for now)
- `insect` (kd10Insect): side-view comic insect, kinds louse and flea, walk ripple gait, gesture leg (arm/arm2), crouch, air, bundle, napkin, eyesOnly, full acting fields.
- `macroLens` (kd10Lens + kd10LensWorld): circular inset with ring and pointer, draws any world through its own camera; also used as an iris transition.
- `sleepMeter` (kd10Meter): ten-segment meter with a DEEP mark, AWAKE red state, glow and gap blink.
- `lampLight` (kd10LampWash) and `oilLamp` (kd10OilLamp).
- `bedchamber` set (kd10RoomBake, kd10Window, kd10Pillows, kd10Blanket).
- `bindle` (kd10Bindle, kd10BindleStick).
- `giantEye`, `giantArm`, `giantFace`, `pinch` (macro-scale human parts).
- `twinkle` (4-point star).

## v2 additions (proposals only)
- kd10Tips: giant fingertip + thumb tip descending onto a point (insect-scale threat; wider than the target).
- kd10ActorLayer: draw actors on an offscreen layer with their own tint, so light discs can sit under them (rule: light discs go under actors).
- Floor fissure drawing (KD10_CRACK / kd10CrackDraw) as a reusable "crack in the tiles" prop.
