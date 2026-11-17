# KD-016 implementation notes (v1, code only)

Decisions the plan left open or that were changed after measuring the set:

- **Film length** 164.7 s (MP3 161.729 + end hold ~3.0). THE END at 162.0.
- **Palm**: Library `palmTree` (h 570, lean 5) at base (380, 900); crown and nest at (385, 330), nest bottom y 352. The dove's rim stance is (466, 334), a little right of the plan's (385, 310), so the last chick (right place in the nest) is never hidden behind her.
- **River**: Library `river`/`riverBank` were not used (their bank heights are the Monkey story's); a simple water band from x 780, surface y 905, drawn twice (back, and a front strip from y 912 that hides wading legs). Glints, ripples, reeds (`kd16Reeds`) and ground ticks are drawn live.
- **Snag and heron spots moved**: with the snag at x 860 (plan) its trunk sat in front of the fox's head for all of S8-S10. The snag is at x 1300 (top 630), right of the heron; the heron fishes at x 1190 (S1, S5), talks at 1110 (S5-S7, facing right toward the snag in S6 via `turnFlip`), and stands at 1040 from S8. The dove's S6 glide crosses over the heron to the snag; S6 two-shot camera is clamped at x 1137, z 1.9-2.15.
- **Reeds** only at x 1335-1412 so they never cross the dove or the heron.
- **CHICKS counter** is shown only in the palm scenes (10.58-51.7 and 79.3-99.3), not over the river scenes, to keep the river shots clean.
- **Fox rear** is the Library fox with `sit` > 1 (body rotated past sitting) plus `reach` (paws on the trunk); no Library change. **Carry**: a yellow tuft (`kd16Chick` tuft) drawn at the fox mouth.
- **S7 85.48** (heron's tiny wing lift): the camera opens to a wide (700, 600, z 1.0) for 85.2-86.1 so the heron is in frame, then pushes in to the BRAVE pose.
- **S8 103.94-105.5**: the pan along the blue arrow ends on a wide (720, 600, z 1.05) holding palm, fox and heron, so the fox's mask-off and the dove's "too late" both read.
- **S11 eating**: the camera pans up and right to the reed tops and sky (1137, 430, z 1.9) so the pair leaves the bottom of frame; heron and fox are not drawn from 157.2; GULP!, reed shake and three rising feathers carry the beat. The fox re-enters from behind the reeds at 158.16 (x 1230) with a round belly and a feather on his nose, passes the palm and exits left by 160.6.
- **Time of day** (`dayCycle` presets, arc mirrored so the sun rises on the right): day 0-7.68, a full day/night in 7.68-9.04, dawn for S2-S3, day S4-S6, one night in 79-80, dawn S7, day S8-S10, dusk from 156.4.
- **Sound**: exactly the plan's eleven cues (all in narration gaps).
- The heron's per-eye cross-eye at 58.6 uses `gaze` toward the beak (no per-eye pupils exist).

## v2 (Fable review 1), decisions
- Pinned pose: Fable asked for the neck to the right and the legs up-left; with the fox on the left this put the legs under the fox's chest. Kept the head to the right (upright, eye looking back at the fox) but made the legs fold up and back nearly vertical, and drew the heron OVER the fox with both forepaws redrawn on top (`kd16PinPaw`). Fox at x 800 (KD16_PIN), heron derived from the paw (kd16PinXY). The fox's muzzle sits about 40-70 units above-left of the heron's body, not directly over the head (head under the muzzle was tried on paper and collides with the fox's jaw and arms).
- S7: the heron takes an off-screen step from 1110 to 1060 (80.0-80.8) so the 85.2 wide holds him fully; the fox's tail tip is cut in that shot (both cannot fit at z 1.0).
- River two-shot widened (z 1.45-1.7 instead of 1.7-1.9) because shifting right only would cut the fox.
- Ending: the dove turns to the last chick (dir -1) at 161.9 so her bowed head and wing cover it on screen; THE END stays upper right (does not cover her).
