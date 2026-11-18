Verdict: PASS WITH NOTES

# AN-001 The Bull and the Ass: Fable review, round 2 (v2 cloud render)

Reviewed: all 30 strips of `review/v2_pack/strips/` (4 fps, 0.0-179.0 s), plus 24 full-size frames pulled from `renders/AN-001_v2.mp4` into `review/v2_pack/extra/` (montages `m_0.jpg`..`m_3.jpg`). Film length 179.27 s.

## Summary

v2 fixed all seven MAJOR notes of round 1. Every story beat now reads on a phone:

- the plan cloud (50-66 s) is large and changes on its words;
- ME?! holds a full second (97.0-98.0);
- the worker is never drawn inside an animal;
- the mask-off two-shot (146.8-152.6) shows both faces of the donkey clearly;
- the last image keeps the bull ploughing in the window through THE END.

No blockers. Subtitles are unchanged, verbatim and readable. No broken frames. The ending and the THE END hold are present. I found no regression in the unchanged scenes (0-48 s, 78-84 s, 102-106 s).

What remains is polish. None of it hides a story beat, so no v3 is required. If a correction pass happens anyway, notes A and B are the two worth doing.

## Round-1 notes

| # | Round-1 note | Status | Comment |
|---|---|---|---|
| 1 | S16 mask-off staged too wide (147-153) | FIXED | Tight two-shot. Bull's eyes away at 147.7, donkey smirk with half lid and ears up; ears down and worried at 148.5 when the bull glances back; cloud with yoked bull and green tick is large (150.7-151.5); closed-eye wink with smile at 152.0-152.2. |
| 2 | S6 plan cloud shrank to a corner (56.7-66.5) | FIXED | Cloud stays large beside the merchant in the window. Trough, red X, worker with "?", worker leaving and ZZZ all land on their words. Small leftover in note H. |
| 3 | Worker drawn inside the animal (106.7-109.1, 163.5-166.8) | FIXED | S11: he stands ahead of the donkey's chest and lifts the yoke off at 108.8. S18: hand-off in the yard with a clear gap, yoke jumps to the bull at 162.9, worker's hands stay up. Small leftover in note B. |
| 4 | S13 / S15 two-shot at zoom 1.0, heads on the post | FIXED | Heads are clear of the post. Hops, bow and the "peaceful day" balloon read. S15 pictures are large and still run right to left. Small leftover in note C. |
| 5 | S17 donkey half out of frame, bull looks asleep | FIXED | Both animals in frame. Bull lies with a wide eye at 154.5, springs up at 156.2, CHOMP! at 158.2, trough empty at 160.0. The one-eye check is present but small (note D). |
| 6 | ME?! punch line cut off (96.2-98.4) | FIXED | Freeze with ears up and wide eyes at 96.5, ME?! 97.0-98.0, ears drop, cut to the field at 98.2-98.5 in the silence. |
| 7 | Ending loses the bull and the donkey's expression | FIXED | Bull enters the window at 172.5 and plods in it to the last frame. Eyes up, half smile and ear salute read at 174.7-175.2. ZZZ from 176.2. THE END top-right, clear of the window. |
| 8 | "Went out to the field" shown as ploughing the yard | FIXED | Bull marches out right by 164.7, dust in the empty yard, cut to the field with the first furrow at 166.0-166.7. |
| 9 | Merchant's order plays wide; animal bubbles tiny | PARTLY | Bubbles are larger and reach the cupped ear (85.5-86.2). The order (90.5-95.7) drops back from the S8 push-in to the wider yard framing; finger up and palm wave are visible but small (note E). |
| 10 | Cratered disc on the yard fence (109-110) | FIXED | Gone. |
| 11 | Too much empty floor in the stable wides | PARTLY | Better, and the tight scenes are good. The standard stall shots (S4, S13, S15, S17) still give about a quarter of the panel to bare floor (note F). The worker's heave mark is still on the post and trough cluster (note G). |
| 12 | S14 way-out icons ambiguous | FIXED | One cloud: bull, arrow, door, plough (130.2-132.2), then ears up. Clear. |

## Polish notes (optional; none triggers v3)

### A. 160.7-161.4 (S17 to S18): the bull walks through the donkey

**What is wrong.** To reach the door the bull crosses the post, both troughs and the lying donkey during the pan. At 161.0 his head sits on the donkey's head and his legs are behind the troughs (see `extra/f_161.0.png`). It lasts about 0.6 s and is new in v2 (the bull now starts at x 245).

**Fix.** Replace the walk-through with a cut. Hold S17 to 160.85, then hard cut to the yard framing of 162.0 with the bull already stepping out of the stable door (nose at the door edge at 161.0, جاء at 161.5 as now). Alternatively walk him upstage: draw the bull before the post, troughs and donkey for 160.7-161.4 so he passes behind all of them.

### B. 161.7-162.8 (S18): the yoke in the worker's hands is small and at his mouth

**What is wrong.** He holds the yoke one-handed at chin height (see `extra/f_162.5.png`). It reads as a small hammer, so "braced for a fight" is weak and the hand-off at 162.9 is less funny than it can be.

**Fix.** Both hands on the yoke ends, held out at chest height in front of him (`shield`), yoke about 1.3x. Knees bent, `eyes: 'wide'`, a 2 px `tremble` from 161.7. Keep the 6-frame transfer and the empty hands in the air.

### C. 118.5-119.5 (S13): the bow of thanks reads as eating

**What is wrong.** The bull's head drops into his own trough (see `extra/f_118.8.png`).

**Fix.** Stop the bull about 50 units further left for this scene (muzzle at x 385 or less), so the bowed head comes down in front of the trough rim, in clear wall space. Eyes closed on the bow, and a small heart pop at 118.5 (شكرًا).

### D. 159.0-159.75 (S17): the donkey's one-eye check is small

**What is wrong.** At zoom 1.2 the lid change is a few pixels (see `extra/f_159.3.png`).

**Fix.** Ease the camera to about `{x: 600, zoom: 1.6}` over 158.7-159.0, hold on the donkey's head to 159.8, and ease back for the empty trough at 159.96. Hold the open eye with the smirk for at least 18 frames.

### E. 90.5-95.7 (S9): the order is delivered in the wide yard shot

**Fix.** Keep the S8 push-in framing (as at 84-90 s) until 95.7, so the raised finger at 92.06 and the palm wave at 94.5 are on large figures. The whip pan at 95.95 then starts from the close shot.

### F. Stall two-shots: floor is still about a quarter of the panel

Seen at 24-36, 114-123, 133-143 and 153-160. The stable set is wide and low, so only zoom removes the floor. A working value of about 1.5 centred on the two heads (bodies may crop at the panel edges, as S16 already does well) would bring the faces up. Check that balloons still fit.

### G. 72.0-76.3 (S7): the worker's heave is on the post and troughs

He stands between the post and the donkey's head, in front of a trough (see `extra/f_75.2.png`). It reads, but it is busy. Standing left of the bull's head, against clear wall, would be cleaner. A small stick also stands in the floor below him from about 74.7 to 78.2; give it a reason (he drops it at 74.7) or remove it.

### H. 57.0-66.5 (S6): the little bull is clipped by the cloud's left edge

His rump and the plough are cut by the cloud scallops. Shift the cloud's inner content about 25 units right.

### I. 29.5-31.2 and 33.5-35.0 (S4): the bull's speech pictures are small

The sleeping donkey, the trough and the sun over a plough are about 170 px wide. A scale of 1.4x would match S15.

## Subtitles

Unchanged, verbatim and readable in both languages. The round-1 observation for the coordinator still stands: the English at 161.12-166.86 drops معه ("with him"). I have not changed it.

## Reusable techniques worth adding to the Library

- **Mask on / mask off in a tight two-shot** (146.8-152.6): the listener's eyes go away, the liar's face changes, then snaps back 2 frames before the glance returns. Both bodies crop at the panel edges and only the heads matter. Worth a worked example in the Capabilities Guide.
- **Panel-space thought cloud** (150.5-151.9): drawing the cloud in panel space keeps it large whatever the camera zoom.
- **Reframe, do not shrink** (56.7): the cloud slides aside and the camera eases so that cloud, window eavesdropper and both heads share the frame.
- **Rules to record.** A person never shares x with a quadruped. A quadruped never crosses another animal's stall in a side view; cut, or pass behind (note A). A bow needs clear space under the head, not a trough (note C).
