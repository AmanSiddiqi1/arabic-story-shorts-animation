Verdict: REVISE

# AN-146 The Thief and the Merchant: Fable review, round 1

Film reviewed: `Animations/AN-146/renders/AN-146_v1.mp4` (179.97 s). All 30 strips of `review/v1_pack/strips/` were inspected in order, plus full-size detail frames in `review/v1_pack/extra/`.

## Summary

The story is told in the right order, every event of the narration is on screen, and the planned setups pay off (four bale colours, the tasselled knot, the keys, the cloak). The opening (mask into the barrel, robe change), the costume change behind the stall, the thought cloud at 96.8 s, the knot insert at 137.6 s and the cloak landing over the thief's head at 171.3 s all work. Subtitles are readable throughout, both languages, including the three-line Arabic chunks at 124-132 s and 169-177 s. THE END is present and held (177.6-180.0 s).

One rendering defect needs a v2: in the candle-lit shop the light pools cancel each other out, so the impostor's face is covered by a dark dotted patch during the comic climax of the night (62.7-66.2 s). The remaining notes are staging and acting improvements, most of them small.

Narration, subtitle text and timing must not change. Every fix below is staging, acting, camera or drawing only.

## Notes

### 1. 56.4-69.7 s. BLOCKER. Light pools cancel each other in the dark shop
**What is wrong.** `a146Dark` in `src/a146_props.js` (line 163) builds one path with the overlay rectangle and all holes, then fills with `'evenodd'`. Where two holes overlap, even-odd turns the overlap back into full darkness. Seen in the render:
- 56.4-62.5 s: lens-shaped dark bands and chequer patterns between the doorway light and the impostor's candle pool; the watchman standing in the lit doorway is rendered dark blue instead of lit.
- 62.7-66.2 s: when the watchman brings his candle next to the impostor, the two candle discs overlap exactly on the impostor's head. His face becomes a dark dotted disc. The plan's key beat (hush at 63.84, ALL IS WELL at 64.56, one eye opens and the grin on أمره 65.30) is invisible, and the push-in at 65.0-66.0 s is a close-up of a blacked-out face.
- 66.0-69.7 s (time lapse): the same dotted patch sits on his face and on the candle while he drags the bales.

**Why it matters.** This is the comic peak of the night: the thief holding still while the watchman tiptoes in to leave him a light, then the sly eye opening. The audience must see his face.

**Fix.** Make the holes a union, never a toggle. Either:
- (a) render the navy layer for each step on an offscreen canvas, punch every hole with `globalCompositeOperation = 'destination-out'` (one fill per hole), then draw the layer onto the panel; or
- (b) keep one path but fill with `'nonzero'`, drawing the rectangle clockwise and every hole anticlockwise (`ctx.arc(x, y, r, 0, Math.PI * 2, true)`, polygon points reversed when their signed area is clockwise).

Check stills at 57.5, 60.0, 63.2, 64.0, 65.0, 65.6, 66.0 and 68.5 s: no dark lens between pools, both faces fully lit inside the light, the watchman lit while he stands in the doorway. Once the face is visible, confirm the acting reads at 65.30: left eye opens first (lid 0 on one eye, the other still shut), then the grin 0.2 s later, held to 66.0 s.

### 2. 175.7-180.0 s. MAJOR. The film ends on an empty quay
**What is wrong.** Both men have left the frame by 176.3 s. From 176.5 s to the end the picture is an empty quay with the storeroom wall and a ship cropped at the right edge; THE END sits over nothing. The thief also walks out through the storeroom side of the frame, which looks as if he goes back into the storeroom.

**Why it matters.** The last image should be the moral: two men parting in peace, the merchant keeping his goods. The plan asked for the widest view with both parties leaving by opposite edges and a wave without looking back.

**Fix.** Keep the turn on ثم 173.44 and the first steps on انصرف 174.12. Halve the walking speed and widen the pull-out (175.04) enough to hold the whole dhow on the right and the storeroom on the left. At طريقه 176.62 both parties are still inside the frame: the merchant, driver and camel with the four bales at about two thirds right, heading for the gangplank; the thief small at the left third, cloak on, walking away. Merchant raises one hand in a wave without turning on منهما 175.68; the thief answers with a small wave at 176.6. They keep walking slowly under THE END and are still visible (close to the edges) at 180.0 s. Move THE END to the sky centre so it does not sit over the ship's sail.

### 3. 86.0-86.6, 92.2-92.6, 94.0-94.2, 172.2-172.5 s. MAJOR. Bows tip the whole body like a falling plank
**What is wrong.** The deep bow rotates the entire figure about 45 degrees with the feet leaving the ground. At 86.2 s the watchman looks as if he is falling over. At 92.4 s and 94.0 s he tips into the merchant and his helmet covers the merchant's face. At 172.2-172.5 s the thief's thankful bow does the same and the two heads merge.

**Why it matters.** The over-friendly bow for two dirhams is the main joke of S9 and S10, and the thief's bow is the emotional close. As drawn they read as a fall or a headbutt.

**Fix.** Keep the feet planted and cap `tip` at about 0.3; get the rest of the bow from `sq` 0.9, head lowered (gaze down, lid 0.8) and both arms swept out and back. Use `anticipate` (a small rise, 0.12 s) before each bow and settle afterwards. Leave at least 70 px of clear space between the bowing head and the other figure: start the watchman 60 px further left at 91.4 s, and bow slightly away from the camera-side shoulder so both faces stay visible. For 172.14 (دون) give the thief a hand-on-chest bow at tip 0.25, then the merchant's wink on مشاجرة 172.60 with nothing in front of his face.

### 4. 74.5-81.5 s. MAJOR. The loading scene is one stacked cluster
**What is wrong.** The driver and camel enter from the right 0.5 s after the watchman ran out and walk straight through the impostor's position: at 75.0-75.8 s the driver's face is hidden behind the impostor's head and the camel's body is behind him. During the loading (78.2-80.5 s) the driver, the bale he lifts and the impostor overlap as one shape; the first bales appear on the kneeling camel as small flat stripes that are hard to read.

**Why it matters.** This is the theft itself. The viewer must see four distinct bales go from the shop door onto the camel, with the impostor supervising and the watchman watching it happen.

**Fix.** Stage three clear columns in the wide shot: camel kneeling at left (x about 250), the driver working in the gap between the door and the camel, the impostor to the right of the door (x about 760) with the watchman at the far right. Bring the driver and camel in from the left edge (the camel leaves to the left at 81.2 s anyway), so nobody crosses the impostor. Each bale travels door to camel in the driver's arms as a full-size, full-colour bale and lands with the camel's 3 % squash on the counter beats 79.20, 79.6, 79.96, 80.3. Give the watchman one beat of acting here: a helpful salute on كبيرة 80.54.

### 5. 156.0-168.3 s. MAJOR. The confrontation loses the camel gag and carries stray marks
**What is wrong.**
- The camel's head is cut off by the right or top edge for most of 156.5-161.5 s, so the planned look from one blue robe to the other (157.32) cannot be seen.
- Small yellow numerals 1, 2, 3 float at the left of the thief's head at 158.6-159.3 s with nothing to count; they read as an error.
- The ticks at 163.0-164.1 s show only two of four (the lower bales get none), and ALL BACK appears against the right edge.
- From 165.2 s the close two-shot crops the bales to a sliver, and one green tick stays stuck on that sliver until 174.5 s, including during the laugh and the cloak throw.
- Both men stand square to the camera the whole scene; the thief pleads at the lens, not at the merchant.

**Why it matters.** This is the resolution. The thief's defeat should be read from his eyes going to the bales and from the two lookalikes facing each other.

**Fix.** Frame 156.3-165.2 s as a wider three-element shot: thief left, merchant centre, camel right with its whole head and all four bales inside the frame. Turn the two men toward each other (three-quarter facing, `lookAt` each other). At 157.32 the camel does `headTurn` thief, blink, merchant, blink. Remove the floating numerals; at 158.10 the thief's pupils step up the four bales instead (gaze only), then the slump on فشلت 159.60 (sq 0.9, brow down). Put one tick on each of the four bales (163.0, 163.35, 163.7, 164.05) and fade all ticks out with the ALL BACK label by 165.4 s; ALL BACK goes in the sky above the bales, fully inside the panel. For the close two-shot from 165.40, crop the camel out completely or keep its head in as a witness, with no leftover tick.

### 6. 168.5-170.4 s. MAJOR. The laugh is too small for the turning point
**What is wrong.** The merchant laughs with arms folded, body almost still and head level; only the mouth opens. HA HA HA! is placed at the right edge on top of the bales and the tick. The plan asked for head back, eyes shut and four shoulder bounces.

**Why it matters.** The laugh is what tells the audience there will be no fight. After the held beat at 167.52 it must be a clear release.

**Fix.** On ضحك 168.52: unfold the arms, hands to the belly, head back (tip -0.15), eyes shut, mouth wide; four bounces to 170.3 s (sq 1.05 / 0.97 alternating every 0.22 s), beard following a frame late. The thief flinches on the first HA (small hop back, eyes wide), then risks a hopeful half smile at 169.6. Put HA HA HA! in the sky above the merchant's turban, inside the panel, growing with each bounce.

### 7. 104.0-105.1 s. MINOR. The WAX arrow points at the coins
**What is wrong.** The label WAX and its arrow end on the yellow coin stacks on the desk; the candle stubs are two small white plates that are easy to miss. The merchant's hand also goes to the coins.

**Why it matters.** "Traces of candles" is the first clue. As drawn it looks as if he is checking his money, which would also suggest the money was left untouched for no reason.

**Fix.** Draw two burnt-down stubs with a white wax puddle and drips over the desk edge, about twice the present size, placed clear of the coins (desk left end, or one on the floor beside the ledgers). End the arrow on a stub on آثار 104.06; on الشموع 104.56 he touches the puddle and rubs finger and thumb with a frown.

### 8. 123.5-126.6 and 130.7-132.3 s. MINOR. Camel placement at the storeroom
**What is wrong.** On arrival the camel walks behind and through the merchant and driver and stops in front of the storeroom door, covering it. In the door shot (130.7-132.3 s) only the camel's headless rear half shows beside the merchant.

**Why it matters.** The door is the object of the scene, and a cropped rump beside the hero at the moment of suspense distracts.

**Fix.** Let the driver lead the camel in first and park it right of the door (toward the sea), with the merchant following a pace behind; the door stays clear. For 130.24-132.3 frame merchant and door only, or include the camel's head and neck looking at him from the right edge.

### 9. 107.6-110.5 s. MINOR. The empty corner needs more contrast
**What is wrong.** The four dashed outlines are thin and close to the wall colour, and 4 BALES GONE! is yellow lettering lying over the window and the ochre wall, so both are weak at phone size.

**Why it matters.** This is the reveal of the theft, delivered on a whip pan.

**Fix.** Dashed outlines in black at line width 5 or more, each with a faint tint of its bale colour (red, blue, green, yellow) pulsing once in turn on اختفاء 108.34. Put 4 BALES GONE! in a paper label box clear of the window. Make the fallen tassel at 109.58 larger and let him pick it up and pocket it, since it pays off at 137.64.

### 10. 73.4-76.5 and 115.2-118.2 s. MINOR. Icon balloons
**What is wrong.** The balloon at 73.4-74.0 s is empty for about 0.6 s before any icon appears. The man icons are black blobs; in the watchman's balloon the "cloaked man" and the "driver" cannot be told apart.

**Why it matters.** The second balloon is how the merchant learns what happened.

**Fix.** Show the first icon with the balloon. Give the impostor icon a red cloak and turban outline, the driver icon a white headcloth, the camel icon its four small coloured bales on فعرف خبر 115.22-117.02.

### 11. 101.2-102.1 and 132.4-132.8 s. MINOR. Empty rooms and ghost entrances
**What is wrong.** The shop interior is empty for 0.8 s after the cut, then the merchant fades in semi-transparent in the doorway (102.0 s). The storeroom entrance has a similar dark blob at 132.5 s.

**Why it matters.** A fading figure reads as a glitch in an otherwise solid cartoon world.

**Fix.** Cut to the interior with the door already swinging and the merchant stepping through at full opacity, timed so his foot lands on الباب 102.42. Same for the storeroom: solid silhouette in the doorway from the first frame.

### 12. 87.2-123.5 s. MINOR. Sky continuity between morning scenes
**What is wrong.** The street has a yellow sky at 87.2-101.2 s and a deep blue sky at 111.0 s, a few story minutes later.

**Why it matters.** Small, but the viewer may read a time jump that is not in the story.

**Fix.** Use one morning palette for S10 and S12 (the `skyCycle` `u` of S10, or a value midway to day).

## For the coordinator (not an animator task)

- English subtitle at 165.83-168.52 s reads "and asking for his cloak back." after "and told him that he had got all his cloth back,". The tense does not match ("and asked for his cloak back" is what the sentence needs). The subtitle text is outside this review's remit to change; flagging it for the owner of the translation.
- English at 132.91-139.98 s omits "entered the storeroom" (دخل التاجر المخزن). Meaning is still clear from the picture.

## Reusable techniques worth adding to the Library

- A shared dark-room or night overlay with union light holes (offscreen layer plus `destination-out`), replacing the per-story even-odd version. Several films use candles and lanterns, and any two lights that overlap will hit this defect.
- A `bow` helper: feet planted, tip capped, squash, head and arm sweep, with a minimum clearance check against a neighbouring figure.
- The costume change behind a stall (clothes flying up, turban rising) and the cloak-over-the-head landing are good gags to list in the Capabilities Guide as examples.

Second review advice: Yes, a short second review of v2 is warranted. Note 1 changes the lighting code for the whole night interior (about 13 s) and reveals acting that has never been seen in a render, and notes 2, 4 and 5 re-stage three scenes including the ending. A round-2 pass can be limited to 56-70 s, 74-82 s and 154-180 s.
