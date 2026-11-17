Verdict: REVISE

# AN-045 The Thief and His Monkey: Fable review, round 1

Reviewed: `renders/AN-045_v1.mp4` (171.43 s) through all 29 strips of `review/v1_pack/strips/` plus full-size frames in `review/v1_pack/extra/` (close-up sheets `s0.jpg` to `s6.jpg`).

**Summary.** The story is told in order, is faithful to the script and family-friendly, and the ending is present (THE END from 168.5, held 2.9 s). Subtitles are verbatim, well timed, never covered, and readable in both languages. The English reads naturally. Much of the acting is good: the monkey routine, the seller's tired sigh and bundle-tying, the mask-on / mask-off thief, RAGS!? with the monkey covering its eyes, the wife's saccades before A TRICK!, and the moth running gag.

There are no blockers. A v2 is warranted because the two pictures the film depends on are weakened by staging, and several pieces of lettering collide or are clipped:
- the steal (S6) crops the victim and loses the monkey;
- the OUTSIDE: FANCY / INSIDE: RAGS image (S8) hides the bundle and puts an arrow on the thief's face;
- BUYER and NOT CHECKED overlap the NO PEEKING sign, and a counter and an icon are cut by the panel edge;
- the ending pulls the camera away from the faces.

Never change narration, subtitle text or timing. All times are film seconds.

## Notes (most important first)

### 1. 79.8-83.2 (S8) MAJOR: the inside/outside image hides its own subject
- **Wrong:** the round INSIDE: RAGS cutaway (80.6 on) is drawn on top of the finished bundle and the thief's torso, so the fancy outside is no longer visible while the label says OUTSIDE: FANCY. The OUTSIDE arrow ends on the thief's face (across his eye, frame 81.5) and not on the bundle.
- **Why it matters:** this is the idea of the whole film (fine wrapping, worthless contents) and the start of the dramatic irony. The viewer has to see both at once.
- **Fix** (`a45_alley.js` about line 84):
  - Keep the bundle fully visible on the crate.
  - Move the cutaway circle to the free wall, upper right of the panel above the monkey (screen about x 700-950, y 250-520), radius as now or 10% larger. Draw a thin yellow leader from the bundle's knot to the circle. Pop it at 80.58 ("بداخلها").
  - Put `OUTSIDE: FANCY` top-left with its arrow ending on the bundle's gold band, clear of the thief's head. Move him 40-60 px left if needed.
  - Put `INSIDE: RAGS` directly under the circle.
  - Thief: one open hand presenting the bundle; the wink at 83.38 stays unobstructed.
  - Monkey: its smug folded arms must stay outside the circle.

### 2. 54.4-61.8 (S6) MAJOR: the steal breaks its own staging rule
- **Wrong:**
  - After the push-in the seller is cut by the right panel edge (half his face at 55.5-57.7).
  - The monkey is out of frame for the whole steal (55.2-61.7), so we never see what he is looking at.
  - At 58.0 the "false alarm" is the seller's arm shooting out so that his hand touches the thief's hand on the knot (frame 58.0). It reads as the seller catching him or helping him, and then nothing happens.
- **Why it matters:** the plan's rule is "eyes go right, the hand comes from the left, in every frame". Suspense needs the victim's whole face and the distraction both visible.
- **Fix:**
  - Use `twoShot` on thief and monkey (or thief and seller with a right margin of about 180 px), zoom about 1.25 instead of the current tighter push. Thief, bundle, the seller's full head and at least the monkey's upper body must all be in frame from 55.15 to 61.6.
  - Keep the dotted eye line from the seller to the monkey (as at 53.6-54.0) alive, faint, through 56.7-59.1.
  - Replace the arm contact at 57.9 with a head beat: the seller's laugh subsides, his `gaze` drifts halfway toward centre for 6 frames, and the thief freezes with a sweat drop. The monkey does a quick flip (57.95) and the seller's gaze snaps back. Then the lift on "وأخذ" 58.16. No hand of the seller comes within 120 px of the bundle.

### 3. 166.8-171.4 (S17) MAJOR: the ending backs away from the emotion
- **Wrong:** from 167.0 the camera pulls out, so the last held picture is two small figures over a large empty checkered floor (frame 169.8). The hand on the shoulder, his lowered eyes and the holed shirt are too small to read on a phone. At 164.5-166.5 the shirt simply covers his whole face, so "he looks through the hole" reads as a shirt on his head.
- **Why it matters:** this is the moral and the film's only tender beat.
- **Fix:**
  - Reverse the move: ease in from 166.8 to zoom about 1.35-1.45 by 168.2 on a `twoShot(buyer, wife)` with heads in the upper-middle of the panel. Hold with `breathe` under THE END.
  - Keep THE END on the top band, clear of both heads.
  - At 164.5 place the shirt so its hole sits over one eye and draw that eye (wide, then `lid` dropping to 0.5 by 165.8) through the hole.
  - At 166.8 he lowers the shirt to his lap as he sinks. `gaze` goes up to her and then breaks away down.
  - Her `handLW` lands on his near shoulder at 168.0 with a small `sq` settle, her `brow` softening.

### 4. 107.0-108.6 and 118.0-119.4 (S11) MAJOR: lettering collides with the NO PEEKING sign
- **Wrong:** the BUYER label sits on top of the sign and hides the end of "NO PEEKING!" (frame 107.6). The NOT CHECKED stamp is drawn partly behind the sign and its own icon, and reads "OT CHECKE" (frame 118.4).
- **Why it matters:** these are broken-looking frames on two key beats (introducing the victim, and the moment of the mistake).
- **Fix** (`a45_marketB.js` lines 142-143):
  - BUYER: put the label on the free left side of the top band (screen x about 150-380, y about 110), with a short arrow to his turban, away from the sign post.
  - NOT CHECKED: stamp it over the bundle in his arms or in the clear sky top-left (screen x about 90-520, y about 120-200), drawn after the sign in z-order. Keep the icon to the left of the text, not across its first letter. Size 58 is fine.
  - Check every frame 107.0-119.4 for overlap with the sign and the price counter.

### 5. 111.5-114.3, 100.5-104.8, 122.2-125.0 MAJOR: thought clouds are clipped or too small
- **Wrong:**
  - Buyer's cloud: the running total (5, 22, 25, 30) sits on the cloud's right rim and is cut by the cloud and panel edge (frame 113.8 shows half of "22"). The final 30 is never fully legible.
  - Profit cloud on the walk home (122.5-125.0): the two figures are about 60 px tall, under the 110 px rule in the plan and the guide.
  - Crowd cloud (100.7-104.7): a very large cloud with a small bundle and treasure in the middle.
- **Why it matters:** these clouds carry the false beliefs, which are the irony of acts two and three.
- **Fix:**
  - Buyer cloud: move the number inside, centred above the coin heap, at least 60 px, fully clear of the rim. Scale the "3 coins, arrow, heap" row about 1.3x. Hold the final 30 for at least 0.5 s before the cloud closes.
  - Profit cloud: enlarge the cloud and scale the inside to about 1.8x, or simplify to bundle, arrow, big coin heap with a `+` so nothing is under 110 px.
  - Crowd cloud: scale the bundle and treasure about 1.7x (or shrink the cloud) so the gems, cup and gold fill it.

### 6. 41.6-42.4 (S4) MAJOR: the "two pairs of eyes" read as green creatures
- **Wrong:** the `peekEyes` at the left edge are two green blobs with googly eyes stacked on the wall (frame 41.8). Nothing identifies them as the thief and the monkey, and they look like frogs.
- **Why it matters:** it is the hand-off from the seller's rest to the approach, the "predator has chosen" beat.
- **Fix** (`a45_marketA.js` about line 212): reuse what works in S3 (22.8-34). The thief leans out from behind the stall post or frame edge, showing red cap, half-lidded eyes and moustache (`lid 0.45`, `brow -0.4`, `gaze` on the bundle), with the monkey's head and fez popping out just above him 3 frames later. Keep the pop at 41.9 for the sound effect. Then he walks in from that same spot at 42.4.

### 7. 10.7-14.9, 42.7-45.5, 86.3-87.5, 156.1-160.2 MAJOR: the monkey on the shoulder covers the thief's face
- **Wrong:** whenever the monkey rides the shoulder, its body and tail overlap the near half of the thief's head (frames 12.0, 43.5, 158.3). In the exit shot (S16) his face is mostly hidden, the coin toss is tiny, and the monkey's fez tip and wave are lost against him.
- **Why it matters:** the thief's smug face is the point of the mask-on entrances and of the exit ("he left with the money and his monkey").
- **Fix:**
  - `a45Shoulder` (`a45_marketA.js` line 13): seat the monkey farther out and higher, about `T.x + 95*dir`, `T.y - 205`, drawn behind the thief's head, tail curling outward. Check all four passages.
  - S16: zoom to about 1.3 on the thief and monkey so they fill the middle of the panel (the ground is now 40% of the frame). Toss the coins in a clear arc above the free hand with glints. On 159.76 the monkey turns to us, lifts the fez high on the outside hand and waves.
  - Let the iris close over about 0.6 s (159.9-160.4) and hold on the monkey. The current close is about 0.3 s.
  - The sun sliding into a dusk sky at 157.7 looks odd. Either keep it low and orange at the horizon from the first frame or drop it.

### 8. 86.4-92.3 (S9) MINOR: the thief looks miserable while pitching a bargain
- **Wrong:** during the call and the price countdown (89.2-91.2) his mouth is an open frown with worried brows (frames 90.2-91.0). At 90.0 an empty grey box flashes where the price counter is about to appear.
- **Why it matters:** this is the biggest "mask on" moment and he must look like the friendliest salesman in the market. It also sets up the mask dropping at 98.86.
- **Fix:**
  - 86.4-98.8: `mouth: 'smile'` with `talk` pulses on "وعرض" and "للبيع", `brow` up (+0.3), `lid` 0.1, `sq 1.04`, big `aL/aR` showman sweep toward the bundle.
  - On "منخفض" 90.72 give a confiding lean (`tip 0.08`) with a hand beside the mouth.
  - Fade the counter box in with its content, with no empty grey frame.

### 9. 135.0-145.6 (S14) MINOR: the wife's questions are played with stiff, level arms
- **Wrong:** from about 139.7 to 145.5 both her arms stick straight out at shoulder height with drooping hands (frames 141.9, 143.3) and hold for nearly 6 s. It reads as a sleepwalker, not "palms up, well?".
- **Why it matters:** she is the film's voice of reason. The plan calls her "still and precise".
- **Fix:**
  - Palms-up shrug with bent elbows (hands at about chest height, 40-50 px out from the body) for 0.8 s on "بداخله؟" 138.90.
  - Then one hand returns to her hip and the other counts the second question: index up on "ولماذا" 140.19, a small downward chop on "الرخص" 143.06, open palm toward the bundle on "قيمة" 144.62.
  - Add a slow push-in across 135-145 to about 1.3 so both faces grow (the floor is a third of the frame now). His smile closing and his gulp at 144.6 deserve the size.

### 10. 148.3-150.3 (S15) and 153.4-155.8 MINOR: the proof and the warning icons do not read
- **Wrong:**
  - When she lifts the corner, only a small red flap moves. The "patched sleeve flops out" is not visible (frame 149.9), so A TRICK! arrives without evidence.
  - In the warning balloon the two crossed-out icons look the same (a grey lump under a red X, frame 155.4). "Stolen" and "unknown" cannot be told apart.
- **Why it matters:** it is her deduction and her lesson to him.
- **Fix:**
  - At 148.82 let a grey patched sleeve, at least 70 px long with one brown patch, drop out over the table edge with a 2-frame overshoot, in the same grey as the S3 shirt. Her `gaze` goes from sleeve to him. A TRICK! stays at 149.52, moved a little right so it does not cover the shelf pots.
  - Balloon icons about 1.4x larger: (a) a hand snatching a bundle with motion ticks, for "المسروقة" 153.42; (b) a bundle with a large `?` on it, for "المجهولة" 154.84. Use a red "no" ring with a single diagonal instead of a full X so the icon stays visible underneath.

### 11. 30.7-31.0, 65.7-66.5, 75.2-78.6 MINOR: three small picture problems
- **30.7-31.0:** the sky flips from yellow to deep blue in about a quarter of a second, which looks like a glitch. Ease the `skyCycle` value across "طويلًا" (30.68-31.46) and a little beyond, about 1.5 s in all, with the sun visibly travelling.
- **65.7-66.5:** the thief lifts the bundle in front of and above his face while "checking left, right, up", so his eyes are hidden on the suspicious look-around. Keep the bundle hugged at chest height and play the three looks with `gazePlan` and a small `tip`.
- **75.2-78.6:** the "beautiful, expensive" cloth is a plain flat red rectangle. Add the planned yellow diamonds and gold fringe so it matches the finished bundle and the adjective. The coin-string "dear" icon at 77.4-78.6 is cut by the left panel edge (frame 77.6). Move it fully inside, about 120 px in, beside the cloth, at least 1.5x larger.

### 12. Whole film MINOR: composition headroom
- **Wrong:** in most wide shots the figures stand in a middle band and the paving or floor takes the bottom 35-40% of the panel (S7, S13, S16, S17 especially).
- **Fix:** where a scene is two characters talking or one character deciding, default to zoom 1.2-1.35 with the feet near the bottom quarter. Keep the full wide only for entrances, the routine and the walk home. Do not crop any lettering when doing so, and re-check notes 1, 4 and 5 after reframing.

## What works (keep)
- The S3 peek from behind the stall post with the monkey above him, and the three refusals with SOLD: 0.
- The seller's sigh, kneel, fold and knot (35.7-41.5), and BUNDLE with its arrow.
- The monkey leap over the seller's head, and the dotted eye line at 53.6.
- SWIPE! with the dashed outline where the bundle was (59.0-63.0), and the tiptoe exit.
- RAGS!? with the moth and the monkey covering its eyes (70.9-72.0).
- The price counter 10, 8, 5, 3 with ONLY 3 COINS.
- The blank sign flipping to NO PEEKING!.
- The wife's narrowed-eye saccades (145.8-148.2).
- PAID: 3 / WORTH: 0.

## Subtitles and sync
- Arabic and English chunks match `narration.txt`, change on the first word of each chunk, and stay inside the caption panel.
- English is readable at full size (two lines at most). No change requested.
- Action cues match the words throughout. The only timing changes requested are the easings in notes 7 and 11.

## Reusable techniques for the Library
- **Peek from cover:** an actor's cap and eyes leaning out from a post or frame edge, with a second head popping above (S3). Worth a helper to replace the generic `peekEyes` when the watcher is a known character.
- **Dashed "missing object" outline** left where a stolen prop stood (59.1), with a small arrow.
- **Blank sign that swings up and flips** to its text on the cue word (93.1 / 94.4).
- **Countdown price counter** ending in a stamp (89.96-91.2).
- **Running-gag insect** (the moth) to identify the same goods across scenes without words.
- **Rule to add to the guide:** a cutaway or inset must never cover the object it explains. Place it in free space with a leader line.

Second review advice: Yes, a short second Fable review of v2 is warranted. Notes 1, 2, 3 and 7 change camera framing and staging on the film's key beats, and notes 4 and 5 move lettering that must be re-checked for new collisions or clipping after the reframes (note 12). A focused pass over 41-62 s, 79-84 s, 100-125 s and 156-171 s would be enough.
