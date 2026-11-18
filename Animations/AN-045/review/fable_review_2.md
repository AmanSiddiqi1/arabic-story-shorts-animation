Verdict: PASS WITH NOTES

# AN-045 The Thief and His Monkey: Fable review, round 2 (v2)

Reviewed: `renders/AN-045_v2.mp4` (171.43 s, QC PASS) through all 29 strips of `review/v2_pack/strips/`, plus full-size frames and close-up sheets pulled into `review/v2_pack/extra/` (`sheet_*.jpg`: 41.8, 57.8, 81.5, 83.4, 87.8-97.9, 107.6-114.3, 118.4, 123.0, 148.9-149.6, 155.4, 158.3-160.05, 164.6-169.8).

**Summary.** v2 fixes every major problem of round 1. The two pictures the film depends on now read at phone size: the steal keeps thief, bundle, the seller's whole head and the monkey in one frame with a clear false alarm, and OUTSIDE: FANCY / INSIDE: RAGS shows the bundle and the cutaway side by side. The ending now closes in on the couple, with her hand on his shoulder and his lowered eyes under THE END. No lettering is clipped or collides any more. No blockers, no new staging errors, no regressions in the unchanged passages. Subtitles are unchanged, verbatim, readable and never covered. The story is in order and the ending is present (THE END from about 168.4, held about 3 s).

What remains is polish only, so no v3 is required. The notes below are optional and should be done only if the film is reopened for another reason.

## Round-1 notes: status in v2

| # | Round-1 note | Status | Comment |
|---|---|---|---|
| 1 | S8 inside/outside image (79.8-83.2) | FIXED | Bundle fully visible on the crate, cutaway on the free wall upper right with a leader from the knot, OUTSIDE arrow ends on the bundle, thief's face and the wink at 83.4 clear, monkey outside the circle. The cutaway is on the small side (about 125 px radius) but readable. |
| 2 | S6 steal staging (54.4-61.8) | FIXED | All four elements in frame 55.2-61.5; eye line seller to monkey stays alive; at 57.7-58.0 the seller's eyes drift to centre, the thief freezes with a sweat drop, the monkey flips and the eyes snap back. The seller's hand never nears the bundle. SWIPE! and the dashed outline are kept. |
| 3 | S17 ending (164.5-171.4) | FIXED | Push-in to the couple from 166.8; shirt covers only half his face at 164.6-166.0 with one wide eye beside it; shirt drops to his lap, he sinks, she steps over, hand on his shoulder by 168.1, her brows soften; THE END on the top band clear of both heads. |
| 4 | BUYER / NOT CHECKED vs the sign (107-119.4) | FIXED | BUYER top-left with a curved arrow to the turban; NOT CHECKED complete in the sky top-left with its icon to the left. No overlap with the sign or counter. See polish note 3 for the stamp's size. |
| 5 | Thought clouds (100.5-104.8, 111.5-114.6, 122.2-125.0) | FIXED | Running total fully inside and legible (28, 30 held to 114.6); profit cloud large and simple (bundle, arrow, heap, plus); crowd cloud filled by the treasure heap. New small issue: see polish note 1. |
| 6 | S4 peek (41.5-42.4) | FIXED | Thief leans out from the post with cap, half-lidded eyes and moustache, monkey and fez above him; he then enters from the same side. No more green blobs. |
| 7 | Monkey on the shoulder; S16 exit (10.7-14.9, 42.7-45.5, 86.3-87.5, 156.1-160.4) | FIXED | Monkey sits high and outside in all four passages; the thief's face is clear. S16 is framed closer, the coin toss reads above his free hand, the monkey lifts the fez and waves at 159.8, the iris closes on the monkey over about 0.5 s. The odd sun is gone. |
| 8 | S9 salesman's face (86.4-98.8) | PARTLY | Entrance, display and the sign passage (93-98) now show the friendly mask, and the grey empty counter box is gone. During the price drop (89.2-92.5) he still does not read as a smiling salesman: see polish note 2. |
| 9 | S14 wife's questions (135-145.6) | FIXED | Bent-elbow gestures, one hand on the hip, raised hand on "ولماذا", chop on "الرخص", palm to the bundle on "قيمة"; slow push-in; his sweat drop and gulp at 144.7-145.5 read well. The stiff level arms are gone. |
| 10 | S15 proof and warning icons (148.3-155.8) | FIXED | A grey patched piece drops over the table edge at 148.8 before A TRICK!, which is clear of the shelf pots; the two balloon icons are now distinct (snatching hand; bundle with ?) under single-diagonal no-rings. See polish note 4 for the sleeve's shape. |
| 11 | Three small picture problems | FIXED (sky PARTLY) | Bundle stays hugged at the chest during the look-around (65.7-66.6); rich cloth has its yellow diamonds and fringe; coin stack icon fully inside the panel (77.4-78.6). The sky change is smoother but still takes only about 0.75 s on screen (30.5-31.2) and no sun is seen travelling. Acceptable. |
| 12 | Headroom | PARTLY (acceptable) | S6, S8, S14, S16 and S17 are clearly tighter. S13 (126-134) and the warning (151-156) are still wide with about a third of the panel as floor. Not worth a pass on its own. |

## Optional polish (does not trigger v3)

### 1. 111.7-114.6 (S11): the buyer's thought cloud sits on his head
- **Wrong:** the cloud's lower rim covers his turban and forehead for the whole thought (frames 112.6, 113.8), and it has no tail bubbles, so it reads as a sign in front of him more than his thought. From 111.7 to 113.0 the cloud also holds only the bundle, off to the right, with the left two-thirds empty.
- **Fix:** raise the cloud about 70 px or shrink its height about 15% so its rim clears the turban tip, and add the two tail bubbles used by the profit cloud at 122.5. Start the bundle centred and slide it right as the coins appear at 113.0.

### 2. 89.2-92.5 (S9): the price-drop face is still not the friendly mask
- **Wrong:** at 89.4 and 90.2 the mouth is a round open "o" under level brows; at 90.9 ("منخفض") he has a small frown, with the hand raised behind his head so it reads as scratching, not as a confiding aside; at 91.9 his eyes are shut with a flat mouth.
- **Fix:** hold `mouth: 'smile'` as the base through 89.2-92.5 with only brief `talk` pulses, `brow +0.3`. On 90.72 bring the hand to the side of the mouth (hand target about 35 px beside the mouth corner, on the buyer side), `tip 0.08` toward the crowd, `gaze` to the crowd. Remove the closed-eye frame at about 91.9 unless it is a blink of 3 frames or fewer.

### 3. 118.0-119.2 (S11): NOT CHECKED is small
- **Wrong:** the stamp is complete and clear of the sign, but its letters are only about 30 px tall on the 1080 frame, the smallest lettering in the film on one of its key beats.
- **Fix:** scale it about 1.5x (letters about 45 px), keeping it in the sky top-left with its right end left of the sign (about x 90-560, y 110-210).

### 4. 148.8-155.8 (S15): the "sleeve" reads as a grey tag
- **Wrong:** the proof is now visible, but it is a short straight grey rectangle hanging in front of the table leg (frame 149.3), so it is read as cloth only because of the patch.
- **Fix:** give it a sleeve shape: slightly tapered, with a darker cuff band and a frayed end, about 110 px long, hanging from under the bundle's lifted corner over the table's front edge between the legs, with the 2-frame swing it has now.

### 5. 107.4-111.0 (S11): the thief is cut by the left panel edge
- **Wrong:** during the push-in on the buyer the thief's face is cut in half by the left border (frames 107.6, 108.2, 109.8).
- **Fix:** either shift the camera about 60 px left so his whole head is in, or about 80 px right so he is fully out and only his presenting arm enters. A half face on the edge is the weakest of the three options.

## What works (keep exactly)
- The whole steal, 54.2-63.0, including the sweat-drop freeze and SWIPE!.
- OUTSIDE: FANCY / INSIDE: RAGS with the leader line, and the wink.
- The peek from the post at 41.5 matching the S3 peek.
- The price counter, the NO PEEKING! sign flip, the crowd's treasure cloud.
- The wife's questions and her narrowed-eye saccades; the buyer's hands-to-head at A TRICK!.
- The monkey's fez tip inside the closing iris.
- The final two-shot under THE END.

## Subtitles and sync
- Arabic and English chunks match `narration.txt`, change on the first word of each chunk and stay inside the caption panel. No change requested.
- Action cues still land on the words; the moved beats (57.6-58.2 false alarm, 80.58 cutaway, 148.82 sleeve, 159.76 fez tip, 168.0 hand on shoulder) are on time.

## Reusable techniques for the Library
- **Cutaway inset with a leader line** placed in free space beside the object it explains (S8). Add the rule to the guide: an inset never covers its own subject.
- **Gaze-drift false alarm:** victim's pupils drift to centre for about 0.3 s, the thief freezes with a sweat drop, the distraction does something new and the gaze snaps back (57.6-58.0). Safer than any hand contact.
- **Character peek from cover** (cap, eyes, moustache, with a second head above) in place of generic `peekEyes` when the watcher is known.
- **Iris-out that tracks a small character** doing a last gesture (159.8-160.4).
- **Rule for thought clouds:** the rim must clear the thinker's head, and the cloud needs tail bubbles, otherwise it reads as a signboard.
