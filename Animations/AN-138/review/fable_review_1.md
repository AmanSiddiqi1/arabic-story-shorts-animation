Verdict: REVISE

# AN-138 Yahya bin Khalid and the Poor Man: Fable review, round 1 (v1)

Reviewed: `renders/AN-138_v1.mp4` (175.77 s) through all 30 strips of `review/v1_pack/strips/` (4 fps) plus 24 full-size stills in `review/v1_pack/extra/` (`m_*.png` are 2x2 montages of them). Not reviewed: the soundtrack (pictures only), so effect placement against the words is unchecked.

## Overall

The story is told in order, complete and faithful, and nothing is broken at the level of a blocker. Subtitles are verbatim, large and readable throughout (Arabic two lines at most, English in blue below; checked full size at 60 s). The ending is present and held (THE END 172.3 to 175.8). Family friendly.

What works and must be kept as it is: the struck-out FAMILY? / JOB? tags (34.5 to 36.5), the moth from the empty purse landing on Yahya's turban (26 to 27.5), the treasurer's ledger with the empty UNTIL box and NO END DATE (56.5 to 60.3), the purse heap growing with the running total (75 to 79), the 30 NIGHTS reveal of the chest-high sack (84.5 to 89.7), the servants' silhouette report balloon (134 to 137.7), Yahya's slow closed-eye calm in the push-in (139.5 to 141.2), the heart-door cloud (146 to 149.5), and the last shot with the tray on the step.

Why REVISE and not PASS WITH NOTES: three of the story's key beats have staging faults that are visible at normal speed. The escape walks through the sleeping servant (note 1), the imagined demand that causes the whole flight is an unreadable shape (note 2), and the man's actual departure in the last scene is a 40 px figure that most phone viewers will not see (note 3). Notes 4 to 7 are also acting or clarity faults on named beats. None needs a new asset or a change to narration or subtitles.

## Notes

### 1. 118.2 to 121.5, MAJOR: the fleeing man walks through the dozing servant
What is wrong: the servant sits cross-legged immediately left of the door (about one body width from the jamb). The man comes out of the door and his path goes straight across the servant's position: at 118.7 he stands on top of him, at 119.0 to 119.5 the two figures and the sack are one overlapping mass, and at 119.3 the man's feet are above the step with no ground contact (`extra/m_117.7.png`, top right and bottom left). From 120.0 the servant has swapped to the man's right without either having visibly moved past the other.
Why it matters: this is the suspense beat of the film ("left the house secretly", سرًا 118.76). Tiptoeing PAST a sleeper is the joke; passing through him destroys both the gag and the geometry.
Fix: move the servant about 170 world px further left of the door (clear of the step) and draw him BEHIND the man's path, slightly up the wall line, so there is a visible gap. Route the man: out of the door onto the step (117.9 to 118.4), one step down with a `landSquash`, then the planned freeze beside the servant on سرًا (118.76, hold 4 to 6 frames, `gaze` cut to the servant, `zzz` hiccup), then the `sneak` gait onward. Feet must sit on the step top or the street, never between. Keep the half-raised hand on دون 119.58 dropping on وداع 120.08, but do it once he is clear of the servant so the hand reads.

### 2. 102.7 to 105.3, MAJOR: "GIVE IT BACK!" hand is an unreadable block
What is wrong: inside the blue fear cloud the demanding hand is drawn as a large pale dotted rectangle with a navy cuff descending from the top of the cloud onto the ledger (`extra/m_90.2.png`, bottom row). It reads as a pillar or a stamp, covers the ledger, and is several times larger than the imagined Yahya next to it. Related: at 100.2 to 102.5 the "coin column passing the red line" is a hair-thin grey chain that runs out of the top of the cloud; the red line is not visible at all, so TOO MUCH! has nothing to point at.
Why it matters: this cloud is the motive for the whole escape (وخاف 95.42 to منه 105.4). If the viewer cannot see "he checks, it is too much, he asks for some back", the flight looks like plain theft.
Fix: (a) Enlarge the cloud contents: Yahya in the cloud at least 110 px on screen (Capabilities Guide, thought-cloud row); let the cloud use the full panel width from 96.2. (b) Coin column: 3 to 4 coins wide, drawn fully inside the cloud at its right side, rising from يرى 98.56 and crossing a thick dashed red line (lineWidth about 6) exactly on تجاوز 100.22, with the coins above the line tinted red. (c) Replace the block with the imagined Yahya's own arm: `handR: PERSON_HANDS.palmsUp.R` (or `handRW` to a point toward the sack icon), palm up and open, pulsing twice on يطلب 103.0; `brow 0.6`, `mouth 'frown'`. (d) On إعادة 104.06 a slice of the small sack slides from the sack icon into that open palm. The guest's own reaction below (hands to head 102.7, hugging the sack) is good; keep it.

### 3. 161.0 to 167.0, MAJOR: the man's departure is too small to see and the door is cropped
What is wrong: for six seconds the frame is an almost empty street. The departing man is about 40 px tall at the far left beside the wooden door, on the same ground line as the foreground, so he reads as a miniature, not as far away (`extra/m_163.0.png`, top left); he is gone by 165.5 and 165.5 to 167.0 is an empty frame. The house door, the subject of the next line, is half cut off by the right edge the whole time.
Why it matters: "the story ended with the man leaving with what he had gathered" (برحيل 164.26, ما جمعه 165.58) is the last time we see the protagonist. The plan's intended feeling of loss needs him readable.
Fix: start S17 on the man at normal walking scale (about 0.9 of his usual size), back toward the house, crossing right to left with the `sneak` replaced by an ordinary loaded `walk` and one look back over the shoulder on برحيل 164.26 (flip `gaze` toward the house, a 0.4 s pause, then on). Let the sack glint on ما 165.58 as planned. Have him exit frame left by 166.5, then pan right on وبقاء 167.0 to the door. If a far figure is preferred instead, put him on a raised horizon line between the far buildings (not on the foreground pavement) and at least 90 px tall, as a `silhouette: true` person.

### 4. 20.0 to 21.3, MAJOR: the half kneel floats
What is wrong: on يطلب 20.06 the man's legs fold but his body does not come down; at 20.5 his feet hang at about knee height above the pavement while Yahya's arm reaches for him (`extra/m_20.5.png`, top left). He appears to levitate for about a second.
Why it matters: this is the plea and the first touch between the two men (Yahya lifting him by the elbow on مساعدته 20.68); it sets Yahya's character.
Fix: `kneel` is being applied at 0.5 with the ground anchor unchanged. Either use the full kneel (`kneel: 1` eased in over 0.35 s, which the Library grounds correctly) or lower `P.y` by the fold amount so the knees touch the pavement, and add a contact shadow. Then raise him with Yahya's `handRW` at his elbow from 20.68 to 21.4 (kneel back to 0, small `settleTo` overshoot).

### 5. 149.0 to 152.5, MAJOR: Yahya's chuckle reads as shouting
What is wrong: on فجأة 149.06 Yahya throws both arms out wide, lids half closed, mouth wide open and red (`extra/m_140.0.png`, top right), and keeps a wide-open mouth and stiff arms through قال 150.14 to 152.5. Beside the two wary servants it reads as an outburst.
Why it matters: nine seconds earlier the narration said he did not grow angry; the plan's whole idea for Yahya is stillness. This is the one place he looks the opposite.
Fix: no arms-out. A soft laugh: `mouth: 'smile'`, `lid` 0.6 with eyes curved shut for 0.5 s, two small shoulder bobs (`sq` 0.97 / 1.02 at about 4 Hz for 0.6 s), one hand to the chest (`PERSON_HANDS.chest`), a slow head shake. From 150.14 use `talk` with small openings and one `palmsUp` hand for "if he had stayed". Servants: let them relax visibly on the laugh (shoulders drop, B lowers his hand) so their relief confirms the reading.

### 6. 53.98 to 56.5, MAJOR: the FAMILY = GUEST equation finishes too late to be read
What is wrong: the white panel appears at 54.0 but the GUEST label and figure only arrive at 56.0 and the panel is already fading at 56.2, so the complete equation is on screen for about 0.3 s. Until then the right half is blank. The trays and the two figures are also small inside a mostly empty box (`extra/m_55.7.png`, top left).
Why it matters: "the same fine food the household eats" is the second of Yahya's three generosities and the picture equation is the only thing that shows it.
Fix: bring both trays and the equals sign in by مثل 53.98 to 54.4, FAMILY and its figures on يأكل 55.0, GUEST and the guest on أهل 55.4 (not 55.92), then hold the complete panel until 57.2, covering the start of the ledger beat, which can open at 57.38 on لم يحدد (the treasurer raising the ledger at 56.5 currently plays under the fading panel anyway). Scale the trays about 1.6x and the figures about 1.4x so they fill the box.

### 7. 62.5 to 72.2, MAJOR: time-passing montage is a strobe over a frozen man
What is wrong: from 62.5 to 67.7 the man sits in one unchanged pose for five seconds while the window flips colour every quarter second. The window keeps flipping at the same rate through 68 to 72 although the label is stuck on WEEK 4, and the eating beat on يأكل 68.02 is a tray on his lap for under half a second (`extra/m_55.7.png`, bottom row).
Why it matters: "days, then weeks, eating, resting, receiving the money regularly" should be the comic comfort montage that makes the later fear funny. As rendered the eye goes to a flickering window, and rapid full-saturation flashing for ten seconds is unpleasant on a phone.
Fix: (a) Slow and ease the window: one day per 0.3 s for DAY 1 to 7 (64.32 to 66.2) as a smooth `dayCycle` sweep rather than hard colour steps, one sweep per week for WEEK 2 to 4 (66.2 to 67.6), then stop on a steady afternoon; no cycling after 67.7. (b) Give each day a different pose so the man changes with the label: sit upright, pat the cushion, stretch, lean back, feet up. (c) يأكل 68.02: the tray clearly on his knees, hand to mouth twice, cheeks full (hold 0.6 s); ويستريح 68.6: lie back with `zzz`; ويتلقى 69.84: one eye opens, hand out, as now; بانتظام 71.36: the purse beat as now.

### 8. 48.7 to 50.9, MINOR: the 1,000 coins and EVERY DAY cover Yahya's face
What is wrong: the coin row and the red EVERY DAY tag sit directly on Yahya's turban and forehead (`extra/m_20.5.png`, bottom right), and the treasurer's planned look to camera and gulp on يوم 50.24 is hidden behind the ledger and the tag.
Why it matters: this is the first big surprise and the treasurer's reaction is the planned laugh.
Fix: move the coin row and EVERY DAY to the clear wall on the left, above the treasurer and below the 1,000 burst (about x 300, y 330 to 400 world), keeping both faces clear. On يوم 50.24 lower the ledger 40 px for 0.5 s so the treasurer's wide eyes, look to camera and gulp (`sq` 0.94, a sweat drop) are visible, then he writes.

### 9. 153.0 to 160.6, MINOR: the "if he had stayed" vision deserves the frame
What is wrong: the vision is correct and charming at full size (white beard, cane, coin heap to the ceiling, servant still bringing the tray; `extra/m_140.0.png`, bottom row) but it occupies the top third while two thirds of the frame show three people standing still, and the servant in the vision is not visibly aged (same dark moustache, red cap), so half of the planned joke is missing.
Why it matters: this is the climax line (حتى آخر عمره 155.72 to 156.38) and the payoff of NO END DATE.
Fix: after the cloud has grown (153.4), push the camera in so the cloud fills about 70 percent of the panel height with only Yahya's head and the cloud tail left in the lower right; hold to 160.4, then pull back. Give the vision servant `age` high (white moustache, stoop `tip 0.15`, slower step). Let the guest's beard lengthen in two visible steps on آخر 155.72 and عمره 156.38.

### 10. 117.3 to 118.2 and 125.2 to 127.2, MINOR: the door gags are clipped short
What is wrong: (a) the peeking eyes at 117.5 to 118.0 sit on the yellow door frame with the door fully shut, so they read as a sticker on the wall; then the man is suddenly outside at 118.2 and the planned "sack sticks and pops through" is not visible. (b) The key irony, the door drifting wide open and lit behind him, only completes at 126.7 and the scene cuts at 127.2: about half a second.
Why it matters: (b) is the plant for the final image; it needs to register.
Fix: (a) open the door leaf 15 to 20 percent on وخرج 117.28 and place `peekEyes` in the dark gap; then door half open, the man through, the sack jams in the gap (`sq` 0.85, one tug) and pops on البيت 118.22. (b) Start the door's slow swing at سيحتفظ 123.58 so it is fully open with warm light by 125.2 and holds two seconds in the right of frame while he shrinks away left; add a slight push toward the door on العطاء 126.5.

### 11. 167.5 to 175.8, MINOR: last image, Yahya's entrance and attitude
What is wrong: Yahya appears in the doorway by cross-fade and for about half a second is a see-through figure over the door (167.7 to 168.0; `extra/m_163.0.png`, top right). In the final hold his arms are crossed over his chest and his mouth is hidden under the moustache, so the last face of the film looks neutral to stern under STILL OPEN and THE END. The same ghost fade is used for the treasurer in the doorway at 74.7 and 79.2.
Why it matters: the closing image should say welcome.
Fix: have him already standing inside the lit doorway when the pan arrives, or step forward out of the opening at full `alpha` (clip him to the door arch while inside). Final pose: one hand on the chest, the other open toward the street (`PERSON_HANDS.palmsUp` one side), `mouth: 'smile'` drawn wide enough to show beyond the moustache, raised brows (`brow -0.3`), the planned slow blink on صاحبه 171.18. For the treasurer at 74.7 and 79.2, open the room door and walk him in and out (or slide him from behind the jamb) instead of fading.

### 12. Cosmetic, MINOR
- 89.8 to 91.2: the red RICH! burst is hidden behind the 30,000 burst and clipped by it (`extra/m_90.2.png`, top left). Remove it, or place it clear to the right of the sack.
- 85.0 to 87.5: the thirty-moon grid is drawn on top of the jar shelf and the window, so the rows are hard to count. Shift the grid to the clear wall right of the window, or dim the shelf and window to 40 percent while the moons are up.
- 27.6 to 28.7: the "no money" balloon is small and its right side is cut by the panel border. Move it about 120 px left, between the two heads, and enlarge about 1.5x.
- 8.2 to 13.0: on رأى 9.72 Yahya is almost entirely outside the left edge, so "he saw" has no seer. Widen the shot enough to keep Yahya's face in frame until 11.2, then cut close on the patches.

## English subtitles (as rendered; for information, no change requested)
Accurate and in step with the Arabic chunk by chunk. Two small observations for the owner only: the chunk at 8.34 ends with a comma where the Arabic sentence ends with a full stop, and "in its owner's heart" (167.45) renders نية (intention); both are acceptable. On-screen label 30 NIGHTS matches the Arabic ليلة while the English line says "thirty days"; harmless.

## Reusable techniques worth adding to the Library
- Struck-out question tags for "he did not ask" (two `box` tags, an `emphasis` strike, then a sweeping hand): a clean way to stage any negated action.
- Ledger with an empty outlined box that later receives a stamp (NO END DATE): plant and payoff for any "no limit / no condition" beat.
- Report balloon with a black `silhouette` figure for servants or messengers telling what happened off screen.
- Heart-door inside a thought cloud that shuts and reopens: a compact picture of trust or generosity.
- Rule to record in the Capabilities Guide: a sleeper or bystander that a sneaking character must pass is placed off the walking line and behind it, with a visible gap; and partial `kneel` values need the ground anchor lowered (or use `kneel: 1`).

Second review advice: Yes, a second Fable review of v2 is warranted. Notes 1, 2, 3 and 9 re-stage whole beats (new paths, a rebuilt thought cloud, a new camera move and a re-blocked final scene), and notes 6 and 7 re-time lettering against the words; each of these can introduce new overlaps or ground-contact faults that only show in the rendered frames. A short comparison review limited to 18 to 22 s, 48 to 72 s, 96 to 106 s, 117 to 127 s and 149 to 175 s would be enough.
