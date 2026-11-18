Verdict: REVISE

# AN-113 The Poor Man and His Friend in Need: Fable review, round 1

Reviewed: `renders/AN-113_v1.mp4` through all 30 strips of `review/v1_pack/strips/` (4 fps, 0 to 179.9 s) plus 32 full-size frames pulled into `review/v1_pack/extra/` (sheets `sheet_0..4.jpg`, crops `zoom_0..3.jpg`).

## Summary
The story is told in the right order, every event is present, the narration sync is good, the subtitles are verbatim, readable and correctly placed, and the ending holds properly (THE END 176.7 to 179.9). The market section (S5 to S10) is the strongest part: the cat, the THUD of the bags, the stacked purses and the friend's wink at 131.3 all land.

It needs a v2 for four reasons, all visual and all fixable in the scene files:
1. The climax (the reveal, 139 to 164 s) hides the hero. His head sits under the thought cloud's tail puffs and his body behind an oversized scroll, so the reactions written in the code (jaw drop 143.6, forehead slap 148.8) cannot be seen. The friend is also hidden behind the three relatives in the first reveal picture.
2. Lettering covers faces or is cut off: the `500` label sits on the hero's face (110.3 to 112.5), the `30,000` counter is cropped by the top of the panel for almost four seconds (69.2 to 73.0), and both speech balloons run their tail down through the speaker's face.
3. The "doors of fortune" beat (104.2 to 109.0), planned as the comic centrepiece, is shot so wide that the hero is about 90 px tall and the doors are faint.
4. Interiors are framed too wide throughout: figures are 15 to 20 percent of the panel height above 30 to 35 percent of empty chequered floor.

No BLOCKER. Nothing in the narration, subtitle text or timing should change.

## Notes (most important first)

### 1. 139.2 to 164.3 s, MAJOR: the reveal hides the hero and, in the first picture, the friend
What is wrong:
- `thoughtCloud(... tail: pmHead(M) ...)` puts the three tail puffs directly on the man's turban and forehead for the whole 25 s (see `extra/zoom_0.jpg` lower left, `zoom_1.jpg` upper left).
- The scroll is drawn as a rigid sheet about as wide as his body and twice the height of his head, in front of his torso and arms. Only his eyes and moustache show between scroll and puffs.
- So the jaw drop at 143.64 and the forehead slap at 148.82 are invisible. Only the wife is seen reacting.
- At 142.96 (`أقارب`) the friend steps into the cloud behind kin2 and kin3: only a sliver of white turban shows behind the yellow one (frame 143.8). The point of the beat, "these three belong to him", is not shown.
- 150.0 to 152.4: the cloud shows the empty stall for 2.4 s while the narrator is already saying "the money and ornaments"; the friend then appears at 152.5 at the far left edge, half clipped by the cloud outline.
- The lower 30 percent of the panel is empty floor while the cloud figures are small.
- `HIS MOTHER!` (149.0 to 149.6) lands on the tail puffs immediately above his head.

Why it matters: this is the emotional payoff of the whole film. The plan's "two storeys" idea only works if the lower storey (his face) is readable.

Fix:
- Tail: anchor it beside the head, not on it. Use `tail: [head.x + 70, head.y - 50]` (or the wife's side, whichever is clear) so the last puff ends about 30 px clear of the turban.
- Scroll: from 139.2 lower it to chest height and shrink it to about 55 percent (top roller below his chin, both hands visibly on the roller ends through `handLW`/`handRW`). His whole face and shoulders must be clear. See note 10.
- Camera: raise the framing so the floor line is near the bottom of the panel (as the plan's own warning says: couple's heads near y 760, cloud 860 x 560). Use the space gained to draw the cloud contents at scale 0.85 or more instead of 0.72.
- Reactions, now visible: 139.2 `الثلاثة` eyes up to the cloud; 142.96 `أقارب` jaw drop (`eyes: 'wide'`, mouth open, `sq` 1.04 pop), hold to 144.6; 148.5 `أم` forehead slap with the right hand, and keep the scroll in the left; 152.4 `أرسلها` slow head shake, then the wet-eyed smile.
- Friend in the first picture: bring him in from the right of the three at 142.96, in clear space between kin1 and the stall counter (or in front, one step left of kin3), arms opening toward them, and let the three turn their gaze to him. He must be fully visible for at least 1.2 s.
- Third picture: start on `الأموال` (150.0) with the two bags on the counter glowing (`goldGlow`), bring the friend in by 151.0 and fully inside the cloud (move him 80 px in from the edge), with the dotted line reaching the bags on `أرسلها` (152.4).
- Place `HIS RELATIVES!`, `HIS MOTHER!` and `HIS GIFT!` on the lower edge of the cloud on the wife-free side, never between cloud and the man's head.

### 2. 110.3 to 112.5 s, MAJOR: the `500` label covers the hero's face
What is wrong: the yellow `500` box sits exactly on the man's head as he walks in to repay (frames 111.0 and 112.0 in `extra/zoom_0.jpg`). He is a headless body with a sign for about two seconds, during his proudest entrance.
Why it matters: S12 is "pride restored"; the plan relies on his long even stride and his face. Library rule: lettering never covers a face.
Fix: attach the label to the purse, not the head. Put it 110 px above and 90 px to the left of the purse (over the blue wall behind him) with a short arrow to the purse, or place it over the table. Check a still at 111.0 and 112.2.

### 3. 69.2 to 73.0 s, MAJOR: the `30,000` counter is cut off by the top of the panel
What is wrong: the spinning counter is drawn above the JEWELS sign and the push-in at 69.0 moves it out of frame. Only the bottom third of the digits is visible (frames 69.2 to 73.0; `extra/zoom_3.jpg` lower right shows "29,100" sliced). It slides into view only at 73.2, after the camera eases back, about a second before the scene ends.
Why it matters: thirty thousand is the first big windfall and the number the narrator stresses at 69.02. The spin-up is the surprise and nobody can read it.
Fix: draw the counter in screen space (after the camera transform) or lower it so that through the whole push-in its top is at least 30 px inside the panel. Best position: upper left over the wall, clear of the JEWELS sign and of all three heads. Keep the small `DINARS` tag directly under it. Verify stills at 69.5, 70.7 and 72.0.

### 4. 48.2 to 52.5 s and 75.7 to 84.0 s, MAJOR: speech balloon tails run through the speaker's face
What is wrong: in both balloons (father medallion with "?", and father plus bags) the tail comes straight down across the keffiyeh spokesman's forehead, nose and mouth and ends at his chin (`extra/zoom_3.jpg` upper right, `sheet_1.jpg` third frame). For 13 s in total the speaking character has a white wedge over his face.
Why it matters: he is the one acting the lie; his grave face is the performance. The guide already records "speech balloons never over the speaker".
Fix: end the tail tip 15 to 20 px above the top of his headcloth, or shift the balloon 120 px to the left and bring the tail in from the upper left to the side of his head. Same change for both balloons.

### 5. 104.2 to 109.0 s, MAJOR: "the doors of fortune" is too far away and too faint
What is wrong: the pull-out that starts at 103.8 keeps going until the stall is a fifth of the panel. The hero is about 90 px tall, half the panel is flat blue sky, and the "doors" are four dark dotted arches with a pale fan on the pavement (`sheet_2.jpg` first frame, `zoom_0.jpg` lower right). His jump at 107.3 (arms up) is a tiny green flick.
Why it matters: the plan calls this the literal comic image of the film (B10) and the last windfall before the turn.
Fix:
- Stop the pull-out at roughly half its present amount: the stall plus two doors each side, hero at least 220 px tall, sky no more than a quarter of the panel.
- Make each door an event: the leaf visibly swings (`townDoor` `open` 0 to 1 in 0.35 s with a small overshoot), the opening fills with solid process yellow, and a `goldGlow` ray fan goes up the wall and across the street toward the stall, with a coin or two rolling out.
- Timing: door 1 on `أبواب` (104.68), door 2 and door 3 on the next two stressed words (`الرزق`, `فتحت`; times from timeline.md), door 4 right beside him on `فجأة` so the hop at 107.3 has a cause.
- His head should turn to each door in order (`gazePlan`, ease 0.07), ending with the look to camera or a delighted two-hands-up, held to 108.9.

### 6. Whole film, worst at 0 to 9, 15.8 to 21, 109.3 to 117, 132 to 139, 174 to 179.9 s, MAJOR: interiors are framed too wide
What is wrong: in `home` and `friendHouse` the figures stand on the back edge of a deep chequered floor that fills the bottom 30 to 35 percent of the panel, and the camera stays wide. Typical figure height is 15 to 20 percent of the panel (`sheet_0.jpg` frames 1 and 2, `sheet_2.jpg` frames 2 to 4). On a phone the faces are about 40 px.
Why it matters: this is a story of small human signals (shame, a refusal, a kind look). They cannot be read at that size.
Fix (camera only, no re-staging):
- S1: keep the wide shot for the three POOFs (2.2 to 3.6), then push in on `كله` (3.32) to a medium shot of the man by 4.4 and hold it for the wife's entrance (6.7).
- S3 and S12/S13: the entrance may stay wide, but by the time he stops (17.2; 112.8) the two-shot should have both figures at 38 percent of panel height or more with no more than 15 to 18 percent floor. Keep S3 and S12 on the same marks, as planned.
- S14: start 132.0 at the size currently reached at 138.
- S17 final hold (174.5 to 179.9): hold a medium two-shot (about 1.5 times the present size) so the last image is the couple, not the floor. Keep the friend medallion and heart in frame upper left and move THE END so it does not touch the heart or the window (at 178.0 its lower left corner clips the heart).

### 7. 4.0 to 8.9 s and 17.2 to 24.2 s, MAJOR: shame does not read in the body
What is wrong: after losing everything the man stands upright with a fist on his hip (4.0 to 8.9) and, while confessing to his friend (17.2 to 22), stands square with one hand on the hip and the other at the back of his neck, head level. It reads as casual or even defiant. The plan asked for `sq 0.95`, `tip 0.05`, heavy `lid`, head low, and "dares one look up" at 22.98.
Why it matters: the whole film is the friend's answer to this shame (the plan's stated conflict). If the shame is not seen here, the grey struck-out picture at 162 has nothing to pay off.
Fix:
- S1 from 3.82: shoulders down (`sq` 0.95), `drop` 8, both arms hanging, then the limp purse turned out with one hand at 5.0; no hand on hip.
- S3 17.24 to 22.3: `drop` 9, `tip` 0.05 toward the friend, `lid` 0.45, gaze on the floor between them, hands wringing low (`PERSON_HANDS.clasp` at sash height with a small `tremble`); on `فقر` (19.52) one open, empty palm; at 22.98 the single look up (gaze to the friend's eyes, `lid` 0.15, brows lifted), then down again until the purse arrives at 24.97.
- Keep the friend exactly as he is (still, one nod, hand on chin): it works.

### 8. 23.2 to 29.4 s, MINOR: the gift is a merged clump, and the label covers the friend
What is wrong: the friend walks round the table and stops half behind the man, so the two bodies overlap by about a third and the purse is handed over in front of both. The `500 DINARS` box sits on the friend's turban and its pointer runs down between the two faces (`sheet_0.jpg` third frame).
Why it matters: B4 is the turn of act one; the hand, the purse and the receiving hands should be a clear silhouette.
Fix: stop the friend 70 to 80 px short so there is air between them and the purse crosses that gap (`handOver` in clear space, with the dip of weight when the man takes it). Put `500 DINARS` above both heads with the pointer coming down into the gap to the purse.

### 9. 97.7 to 99.9 s, MINOR: the `3,000` counter collides with the JEWELS sign
What is wrong: the burst and digits overlap the sign, so 1,500 to 3,000 is read through "JEWELS" (`zoom_1.jpg` lower right).
Fix: move the counter to the left of the sign over the pale wall above the lady (it is clear there), or lower it onto the awning. Keep the "!".

### 10. 135.0 to 174.0 s, MINOR: the scroll looks like a pedestal
What is wrong: once unrolled, the note is a stiff sheet wider than his chest that hangs to the floor line, with no visible grip. In the close-up at 165.3 to 172 it hides his torso and hands, so "holds the note to his heart" at 174.3 comes from nowhere.
Fix: draw it at about 55 percent, held at chest height by both hands on the top roller, tilted 4 to 6 degrees toward the wife, with the bottom curl swinging slightly (`swing`). If the verse lines must be legible at 136.44, show them once in a round inset above the couple for 136.4 to 138.9 instead of enlarging the prop. At 174.3 he rolls it with a small two-hand motion before the clasp.

### 11. 43.0 to 64.8 s and 84.6 to 85.7 s, MINOR: the three strangers are a clump, and two of the planted smiles are lost
What is wrong: kin3 (blue cap) is mostly hidden behind the two saddlebags, which are carried at chest height in front of him; the `1 2 3` numerals are small and partly behind the sign. The mask-off moments at 62 and 85.2 cannot be seen at this size (the lady's at 99.4 is off screen by the cut at 100.0; the friend's wink at 131.3 does read and is good).
Why it matters: the plan's "fair play" depends on at least one visible slip before the reveal.
Fix: open the spacing between the three by about 40 px each and carry the bags at hip height so all three faces are clear. For the 62 s glance use a short push-in on the three (61.3 to 62.8) while the man looks right. For the exit, let kin3 be last, stop him at 84.6, turn the head back with a grin and a small wave, and release him at 85.4.

### 12. 164.2 to 165.2 s, MINOR: a one-second wide shot between cloud and close-up
What is wrong: the cloud closes at 164.2, the picture sits on the empty wide room for a second, then hard-cuts to the close-up at 165.2.
Fix: start the push-in as the cloud closes (164.2) and arrive on `فهم` (165.65) in one move; he lowers the note and lifts his head during the move.

## Subtitles, sync, faithfulness
- Arabic and English are readable at full size, right panel, no clipping; three-line Arabic at 56.1 to 63.8 fits. Chunk changes follow the spoken words.
- Observation for the coordinator only (no change requested from the animator): the English chunk at 30.07 ("Having worked as a jeweler in his youth,") followed by "so he rented a shop" reads as a dangling clause.
- All story events are present and in order; nothing unsuitable for a family audience. The father's death is handled gently (medallion fading to grey at 51.3).

## What works and should be kept
- The three POOFs and the turban changing at 2.2 to 3.6.
- The friend's stillness while listening, his refusal with the purse pushed back (119.5 to 122), the finger over the seal and the home icon (128.7 to 131), and the wink after the man leaves.
- The THUD of the bags with gold halftone light on the man's shocked face (66.2 to 73).
- The lady's purses lining up on the counter and the price tag being struck out (93.5 to 99.9).
- THE PLAN map with the friend at the centre (157.7 to 161.7) and the grey struck-out begging scene (162.2 to 164.2).
- The father's medallion giving way to the friend's with a heart (169.2 to 173).

## Reusable techniques worth adding to the Library
- A `thoughtCloud` option for a tail offset (for example `tailOff: [dx, dy]` or "tail ends N px clear of the head"), since anchoring the tail on the head covers the thinker whenever the cloud is directly above.
- A balloon helper rule: tail tip stops above the speaker's headwear (the `clearOf()` placer already listed under "Recommended next" would cover this and notes 2, 3 and 9).
- Screen-space counters and labels: a wrapper that keeps a `counter` or `label` inside the panel safe area during a push-in.
- The grey "this never had to happen" picture with a red cross is a clear, reusable device for negated events.
- The spoke map (medallions joined by dotted lines to a centre) is a reusable way to summarise a scheme.

Second review advice: Yes. Notes 1, 5 and 6 change staging and camera in the climax and across the interiors, and notes 2 to 4 move lettering near faces; a second Fable review of v2 should check stills at 50, 70, 78, 106, 111, 143.8, 148.9, 153 and 178 s to confirm the hero's face is clear and the reveal reads before the film is finalised.
