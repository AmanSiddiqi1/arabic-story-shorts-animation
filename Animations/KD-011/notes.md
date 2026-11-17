# KD-011 production notes (v1, opus-animator, code only)

## Inputs
- Plan shas match: timeline.json, final MP3 and `.mp3.words.json` (copied to whisper.json for align.py). Subtitle chunks from the plan's `subtitles` (chunks_ar.txt / chunks_en.txt), verbatim OK.
- Film length 161.0 s (157.506 + 3.5 s end hold).

## Decisions the plan left open
- One street strip x -1000..1000 (Library `marketStreet` w 2000, shifted): plain house + palm (S8), the merchant's house (door x -380..-280), the open road to a far city gate (gate x 90, y 800), the friend's house front (x 380..1010) with the storeroom double door x 420..610 drawn by the story.
- The friend's house door moved from x 720..820 to x 650..740 (cx 695) so the merchant can reach it in the S2 timing; the merchant knocks on the storeroom leaf instead of the house door (he stands by his cart), and the friend comes out of the house door.
- S2 cart push: the merchant pulls the cart by its handles (230 -> 515) while the friend steps aside; the cart then rolls "into" the storeroom (clipped to the doorway, scaled into depth). S4 replays it outwards with the handles toward the buyer.
- Merchant marks: S1 stops at x 330 (cart 160) so he can pat and catch the bar; S2 starts at 400 (cut). Two-shot marks 300 / 600 from S7 on as planned.
- S6 and S12 picture clouds: same box (620 x 420, centre y 395) and the same tilt (camera y 600, zoom 1.2), larger than the plan's 520 x 370 so the rats and the boy read in the 9:16 panel; centres x 560 (S6, over the doorway) and 480 (S12).
- LATER card: the cut to S8 is at its covered midpoint (62.4), the merchant walks off under it.
- The real rat in S5 disappears into a mouse hole at the wall foot (x 625); in S18 it comes from the right to a nail at x 795.
- S18 doorstep is a stone bench (x 395..695) in front of the friend's house; dusk palette.
- Buyer: Library `physician` costume with a green turban and brown robe (closest to "trader", which does not exist).
- Lettering SOLD! is the stamp on the stack (no second SOLD word).

## Skipped / simplified
- Cap/turban lag by a frame: the costumed person has no headwear offset field; head drop/tilt used instead.
- Friend "pulls the pockets inside out": palms up only (no pocket drawing).
- Boy's "two steps per adult step": child stride is smaller via walk(), not exactly 2:1.
- The rat in S6 eats "like bread" with chew + bites on the ingots; no crumbs flying.
- No dust on footfalls (plan did not require it; kept the frame clean).

## Pipeline friction
- `sh.sh` writes stills into Animations/KD-011/stills/ (git-ignored).
- `person` acting wrapper copies P when it auto-blinks, so P.hands is lost on blink frames; story sets explicit lids (blink) so props in hands stay attached.
