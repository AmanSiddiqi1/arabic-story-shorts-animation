Verdict: PASS WITH NOTES

# AN-138 Yahya bin Khalid and the Poor Man: Fable review, round 2 (v2)

Reviewed: `renders/AN-138_v2.mp4` (175.77 s) through 29 of the 30 strips in `review/v2_pack/strips/` (4 fps; the last strip, 174.0 to 175.8, was replaced by a full-size still at 174.5), plus 27 stills pulled from the MP4 into `review/v2_pack/extra/` (24 animation-panel frames at half size, 3 crops at full resolution; `m_A.png` to `m_G.png` are the montages referred to below). Not reviewed: the soundtrack (pictures only), so effect placement against the words is unchecked. Motion between the 4 fps samples (for example how smooth the day/night window sweep is at 64.3 to 67.6) was judged from stills only.

## Overall

All twelve round-1 notes are fixed in the rendered frames, and no blocker or story-level fault was introduced. The three beats that caused REVISE now read: the man tiptoes past the sleeper instead of through him, the fear cloud shows "he checks, it is too much, he wants some back", and the departure is a full-size figure with a look back. Subtitles are unchanged, verbatim and readable. THE END is present and held (172.3 to 175.8).

No v3 is required. The notes below are small polish items, all in the last scene or inside already-working beats; take them only if another pass happens for some other reason.

## Round-1 notes

| # | Round-1 note | Status | Comment |
|---|---|---|---|
| 1 | 118.2 to 121.5 escape through the servant | FIXED | Servant sits clear left of the step, smaller and up the wall line. Man is on the step at 118.4, on the street at 118.8 with eyes cut to the sleeper, then crosses in front of him (`m_A.png`). From 119.5 he is clear on the left and the look back with the raised hand reads. See note 3 below for the short full overlap. |
| 2 | 102.7 to 105.3 GIVE IT BACK block; coin column | FIXED | Cloud spans the panel; imagined Yahya is large; 4-wide coin column crosses a dashed red line at 100.2 with the top rows red and TOO MUCH! beside it; block hand gone; GIVE IT BACK! tag, sack icon and a 1000 purse travelling to Yahya on 104.1 (`m_B.png`). See note 4. |
| 3 | 161.0 to 167.0 departure too small | FIXED | Man at near full size walks right to left from the house door, turns back at 164.3 to 164.7, exits by 166.2 (`m_D.png` bottom row). See notes 1 and 5. |
| 4 | 20.0 to 21.3 floating half kneel | FIXED | Full kneel on the pavement at 20.2 to 20.7 with Yahya's hand on him, up again by 21.2. |
| 5 | 149.0 to 152.5 chuckle reads as shouting | FIXED | Eyes closed, hand on chest, no arms out; servants smile (`m_C.png` top row). Talking pose from 150.2 is restrained. |
| 6 | 53.98 to 56.5 FAMILY = GUEST too late | FIXED | Both trays and the equals sign by 54.2, FAMILY at 55.2, GUEST at 55.5, complete panel held to 57.0. Figures and trays fill the box. |
| 7 | 62.5 to 72.2 montage strobe | FIXED | A new pose with each DAY label, tray on the knees at 67.7 to 68.2, window steady from 67.5. Window still changes colour once per day and per week, as intended. |
| 8 | 48.7 to 50.9 coins and EVERY DAY over Yahya's face | FIXED | Both on the left wall; both faces clear; ledger drops at 50.2 and the treasurer's wide eyes show (`m_F.png` bottom right). |
| 9 | 153.0 to 160.6 vision deserves the frame | FIXED | Cloud fills about 70 percent of the panel from 154.2; white beard and cane; coin heap grows to the ceiling; vision servant has a grey cap and stoop (`m_D.png` top row). See note 6. |
| 10 | 117.3 to 118.2 and 125.2 to 127.2 door gags | FIXED | Eyes sit in a dark gap of a door that is ajar (117.6), sack visibly jammed in the half-open door (117.9), door wide open and lit from 124.7 to 127.2. |
| 11 | 167.5 to 175.8 last image | FIXED | No ghost fade; final pose has a hand on the chest, the other arm toward the street and a visible smile (`m_G.png` left). Treasurer walks in and out at 74.5 and 79.5. See notes 1 and 2. |
| 12 | Cosmetics (RICH!, moon grid, balloon, 8.2 to 11.2 framing) | FIXED | RICH! gone; moons on a navy card; balloon between the heads and inside the panel; Yahya on his horse in frame on 9.72. |

## Notes (all MINOR, none triggers v3)

### 1. 166.2 to 166.6: Yahya pops into the empty doorway
What is wrong: at 166.4 the lit doorway is fully in frame and empty (`m_E.png` top left); one sample later Yahya is standing in it at full size. The ghost fade of v1 became a hard pop, and it happens in clear view because the door is no longer cropped.
Why it matters: this is the entrance of the last image, right after the guest leaves frame.
Fix: reuse the treasurer's entrance from 74.5. Slide Yahya in from behind the right jamb, clipped to the arch, from 166.0 to 166.6 with two small steps, or keep him standing there from 161.06 so the guest is seen walking away from him (stronger: the host watches him go). No change to the pan on وبقاء 167.0.

### 2. 168.5 to 169.5: the tray servant leans into Yahya
What is wrong: the servant who sets the tray on the step is drawn in front of Yahya, tilted about 25 degrees, covering Yahya's cape and left side, so for about a second he looks as if he is falling against his master (`m_G.png` right, `m_E.png` top right).
Why it matters: clutter on the closing image, under مفتوحًا 169.30.
Fix: stop the servant about 70 world px further right, at the right end of the step, with a gap between the two figures. Bend him with `tip` no more than 0.12 and reach the tray down with the hand (`handRW` to the step top) instead of tilting the whole body. Exit right as now by 170.5.

### 3. 119.0 to 119.4: the sleeper disappears behind the man
What is wrong: for three samples the man and the sack cover the servant completely; only the Zs and, at 119.3, the servant's feet remain (`m_A.png` bottom row). It reads as passing in front, which is correct, but the joke of the two faces side by side lasts only the 118.76 freeze.
Fix (optional): move the servant another 50 to 60 world px up the wall line or raise him onto a low stool so his head stays visible above the man's shoulder while he passes, or lengthen the freeze beside him by 3 to 4 frames taken from the walk-off.

### 4. 102.9 to 105.3: sack icon sits on the cloud outline
What is wrong: the sack icon inside the fear cloud is at the cloud's right edge, half over its outline and close to the panel border (`m_B.png`). The purse lands above the ledger near Yahya's small open hand, so "into his palm" is implied more than shown.
Fix (optional): move the sack icon about 70 px left, fully inside the cloud, and end the purse's slide on the palm itself (hand position, not the ledger top), with a 2-frame squash on arrival.

### 5. 164.26 to 164.72: the look back is a whole-figure mirror flip
What is wrong: the man and his sack flip as one piece, so the sack jumps from his right shoulder to his left and back within half a second (`m_D.png` bottom row).
Fix (optional): keep the body and sack facing left and turn only the head and `gaze` toward the house, with a 2-frame `tip` back; or ease the flip through a front-facing frame so it reads as a turn.

### 6. 154.2 to 160.4: cropped servant heads under the vision
What is wrong: during the push-in the two real servants are cut by the bottom edge so that only caps and eyes show, and the IF HE HAD STAYED... tag touches the top border (`m_C.png` bottom right).
Fix (optional): raise the camera centre about 40 px so the servants drop out of frame entirely, or lower it enough to show their whole heads; move the tag 20 px down.

## Reusable techniques worth adding to the Library
- Entrance from behind a door jamb, clipped to the arch, as the standard replacement for alpha fades of characters in doorways (used for the treasurer at 74.5; wanted for Yahya at 166).
- Thought-cloud bar chart: a coin column rising across a dashed limit line with the overflow tinted red and a tag on the crossing word. Works for any "too much / over the limit" beat.
- Picture equation in a white inset (tray = tray, FAMILY / GUEST) built left to right on the spoken words and held one second complete.
- Rule for the Capabilities Guide: when a character passes in front of a seated bystander, keep the bystander's head visible above or beside the passer for the whole crossing.
