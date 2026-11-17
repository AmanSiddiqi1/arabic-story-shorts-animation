Verdict: REVISE

# AN-098 Fable review, round 1 (v1 cloud render, 175.9 s)

Reviewed: all 30 strips of `review/v1_pack/strips/` in order, plus 30 full-size frames pulled into `review/v1_pack/extra/` (`f_<t>.png`, montages `m1.png`..`m9.png`).

## Summary

No blockers. The story is told in the right order, every event of the narration is on screen at its word, the subtitles are readable in both languages, the 3-line Arabic chunk at 120.34 fits the caption panel, and THE END holds 4.2 s. The medallion and rift device works and is the best idea in the film: Yahya's decision (91.5-95.8, push to zoom 2.0) is the strongest passage, and the forgery insert (21.7-28.9) and Yahya stepping down to lift the kneeling man (141.5-142.5) are both clear and warm.

It is REVISE because the three payoffs the plan built towards do not land on a phone: "it is mine" with the wink is played in a wide shot where the wink is a few pixels, the doubling is a cluster of small props behind people with two black lines drawn over it, and "two rewards instead of one", the last line of the film, is not readable in the final image, which the hero then walks out of. On top of that, most hall scenes are framed so that the figures are about a tenth of the panel height with the lower third empty floor, so the acting written in the plan (mask on / mask off smile, gulp, saccades) is not visible.

World note for the fixes: scene cameras are `{x, y, zoom}` on a 1000 x 1230 world with the screen centre at (500, 615); people stand with feet near y 860-900 and heads near y 700. The clamp allows y up to `1230 - 615/zoom`.

## Notes

### 1. MAJOR, hall wides are too far away (35.0-39.8, 60.6-66.9, 72.6-83.3, 96.4-105.0, 109.8-119.7, 135.4-137.9, 144.5-150.8, 163.2-167.0)
**Wrong:** at zoom 1.0-1.2 with y 615-660 the figures are roughly 130 px tall in a 1200 px panel, grouped in a band across the middle, and the bottom 35 % of the panel is empty checkered floor. Faces are about 40 px on the rendered frame.
**Why it matters:** the forger's whole arc is in his face (cocky, sweating, sick with dread, stunned). None of it reads at this size, so these scenes play as diagrams.
**Fix:** keep one establishing wide per location (35.0-36.5 Armenia, 83.28-84.7 Baghdad, 135.4-136.6 return), then live at zoom 1.6-1.9 with camera y 740-780 so feet sit near the bottom of the panel and heads near the middle. Suggested keys: S5 arrive `[36.6 {x:560,y:750,zoom:1.6}]` holding to 39.76; S7 `[60.6 {x:430,y:760,zoom:1.7}]`; S9 `[73.2 {x:420,y:700,zoom:1.45}]` (needs headroom for the cloud); S10 after the decision `[96.4 {x:600,y:740,zoom:1.7}]`; S14 offer `[144.5 {x:480,y:750,zoom:1.6}]`. Use `twoShot(a, b, {margin})` wherever two people talk. Check that labels and clouds still clear the faces after the change.

### 2. MAJOR, the first surprise is thrown away (96.1-100.5, words 96.10 فقال, 98.40 رسالته, 99.28 حقًا)
**Wrong:** after the fine close decision shot the camera goes back to the wide at 96.4 and nothing changes for 3 s (96.4-99.2). "IT IS MINE." appears at 99.2 for 1.3 s and Yahya's wink (visible in `f_99.6.png`) is about 6 px wide. The envoy does not bow, he only lowers his eyes, so the "behind his bowed head" joke is not staged.
**Why it matters:** this is surprise number 1 of the plan and the turn of the whole story. The audience must see a wise man knowingly tell a kind lie.
**Fix:** hold the close framing instead of pulling out: `[96.4 {x:640,y:700,zoom:1.9}]` as a two-shot of envoy and Yahya. 96.1 Yahya lowers the scroll to his lap and looks at the envoy (gaze shift, one blink). 98.40 he taps the scroll with a finger (`handRW` to the scroll) and the envoy bows deeply (`tip` forward, head down, hold to 100.4). 99.28 bubble IT IS MINE. at headline size, and on the same frame the wink toward camera with a small smirk, held until 100.3 (1 s, not a flick). Keep the bubble until 100.46 وأوصى. Then 102.14 يحسن: Yahya's open palm toward the door as he hands the yellow-sealed reply (the hand-over at 103.5 is fine, keep it).

### 3. MAJOR, Abdullah has slid off his throne (119.68-129.68)
**Wrong:** in the close shot Abdullah is drawn sitting on the dais floor in front of the throne, his head level with the seat and the whole red throne back empty above him (`f_125.6.png`). At 105.0-108.7 in the same room he sits on the seat correctly, so this reads as a placement error, not a choice. The two medallions also overlap each other and the top of the throne, and thin black zigzag remnants of the rift stay visible behind them after it has closed (125.5 onward).
**Why it matters:** this is the quiet emotional beat, the proud governor softening. A man apparently sitting under his chair is unintentionally comic and the cluttered medallions blur the one picture that carries the moral.
**Fix:** seat him with `y: throne.sitY, sit: 1` exactly as in S11 and re-aim the camera at his head and the space above it (about `{x:730,y:600,zoom:1.9}`). Put the feud picture in the clear blue wall to the upper left of the throne, medallions side by side and touching, not overlapping (centres at least 2 r apart), heart above the join. Set the rift alpha to 0 once `close` reaches 1. Keep the acting: eyes up to the medallions at 121.34 يحيى, small head shake at 123.76 للخلاف, smile and nod at 126.70 المودة.

### 4. MAJOR, the last line is not in the last picture (167.0-175.9, words 169.06 بغنيمتين, 170.48 واحدة)
**Wrong:** (a) the two strings of horses overlap into one brown-and-black cluster; flags "1" and "2" are about 20 px, far under the 28 px label rule; (b) the procession keeps walking left through the end hold, so by 175.5 the hero is cut by the left edge and the held image is the rump of a black horse; (c) a white pack floats alone in the dark doorway from 172.0 and reads as a ghost; (d) the horses' legs pass through the market crates and pots at the left (173.0-175.7); (e) Yahya on the balcony is a 40 px head, his wave is invisible.
**Why it matters:** "two rewards instead of one" is the punchline and the title promise. The film should end on a picture that says it without the caption.
**Fix:** stage two clearly separate groups with a gap between them: group 1 (white horse with rider, one laden horse, chest) and group 2 (two laden horses, chest), each under a large numbered tag using the style `label` at 44 px or more: "1" lands on 169.06, "2" on 169.7, both bounce on 170.48. Bring the procession to a stop by 171.2 (ease out, `landSquash` on the white horse) with the rider at about one third from the left, fully in frame. Then the hold: rider turns to look back up at the balcony and waves (171.5), Yahya waves back, rider turns to camera with the planned wink at 174.0. Frame so the balcony is in shot and bigger: end camera about `{x:560,y:560,zoom:1.25}` instead of 1.0. Remove the crates and pots from the walking lane or draw them behind the horses. Do not show a load without its horse in the doorway.

### 5. MAJOR, the doubling does not read (161.7-167.0, words 162.60 زاده, 163.52 ماله, 164.16 وخيله, 165.26 مثل, 166.14 ناله)
**Wrong:** the second chest and coin heap slide in behind and between the forger, Yahya and two servants and are half hidden (`f_165.5.png`); the first set and the second set are never seen side by side. "x2" appears small in red on the ochre wall under the red cornice, and from 165.7 two long thin black lines run from it across the arches and past Yahya's turban down to the props, like stray strokes. The forger sitting down on the chest at 166.1 is lost in the crowd.
**Why it matters:** surprise number 3, and the visual set-up for the last line. It should look like a mirror image appearing.
**Fix:** clear the stage first: at 161.7 Yahya claps (keep), servants stay at the edges. Place gift set A (chest + coin heap) left of centre in front of the forger. On 163.52 ماله an identical set B drops in to the right of it with a `dustBurst` and squash, clearly separate, same size. On 164.16 وخيله a second horse head joins the first in the door arch (two heads nodding out of phase). On 165.26 مثل the x2 tag lands at headline size between the two sets, on the plain wall above them, with the panel shake; delete the two leader lines (if a pointer is wanted use the style `arrow`, short, one per set). 166.14 ناله: the forger's knees give and he sits down hard on chest A, alone in clear space, and looks at us. Camera about `{x:520,y:720,zoom:1.4}`, not 1.0.

### 6. MAJOR, the gifts are a crowd, not an escalation (108.8-119.7, words 110.04 مئتي, 112.40 وعشرة, 115.30 وصناديق, 116.56 الثياب, 117.80 وخدمًا, 118.52 وجواهر)
**Wrong:** everything arrives into the same 300 px wide spot. From 115.0 a servant stands directly in front of the seated governor, another holds a yellow cloth over the forger, the chests cover the coin heap, and the jewel sparkle at 118.5 is behind a servant (`f_116.6.png`, `f_118.6.png`). The forger's five escalating reactions cannot be picked out. The counter burst "200,000" has a label "200,000 DIRHAMS" directly under it, the same number twice, and both stay up for 8 s.
**Why it matters:** this is the reward the whole bluff was for, and the pile is what gets doubled later. Each gift should get its own half second and its own reaction.
**Fix:** give each gift its own floor position left to right in front of the dais, with the forger at the left end reacting toward each: coin heap centre (110.04), horses in the door arch behind him with the white one nuzzling his turban (112.40-113.88, already good), chests to the right of the heap (115.30), cloak laid on his shoulders by ONE servant who then steps back out of frame (116.56), two servants bow in at the far right, never in front of the governor (117.80), jewel box opened on top of a chest with the sparkle unobstructed (118.52). Change the label to "DIRHAMS" only, and fade counter and label at 114.5 so the later gifts own the frame. Camera `{x:480,y:720,zoom:1.35}` rather than 1.0.

### 7. MAJOR, scarecrow arms on the two "offering" beats (54.2-60.5 and 147.2-150.7)
**Wrong:** in the bargain Abdullah's upper arms stick out sideways with the forearms hanging straight down and the hands dangling (`f_56.0.png`, `f_59.5.png`); the reward and punishment boxes float above his head unconnected to his hands. The forger holds the same hanging pose, motionless, for 3.5 s while he offers the gifts (`f_148.5.png`).
**Why it matters:** the plan's idea was a man weighing two fates on his two hands; as drawn he looks like a puppet with cut strings, and the threat has no weight. The offer should be eager and humble, not frozen.
**Fix:** bargain: 54.32 صحيحة right hand comes up palm open (`PERSON_HANDS.palmsUp.R` or `handRW` to a point at shoulder height) and the coin box sits just above that palm; 57.06 كانت left hand the same with the grey box; 58.94 عقاب the left hand drops a little as the stick appears (heavier), brows down; 59.60 شديد he leans toward the forger (`tip`), forger gulp as planned. Offer: 144.52 عرض forger pushes the chest forward with both hands (`handLW/handRW` on the chest), 146.34 الهدايا opens the lid and sweeps one arm from the chest to the horses in the door (`pointFwd` toward the arch at 147.02 الكثيرة), 149.02 عليها both hands `reachBoth` toward Yahya with a small bow; Yahya only moves his eyes, as planned.

### 8. MINOR, glitch on the first label (9.5-18.0)
**Wrong:** small grey snow-capped mountain icons are drawn on top of the first letters of "GOVERNOR OF ARMENIA", so it reads "OVERNOR" with a smudge (`m1.png`).
**Fix:** draw the mountains to the left of the label box or behind and above it, never over the lettering. Same check for the 47.0-49.5 cloud if the label is reused.

### 9. MINOR, the dread half of the forger's thought is empty (81.2-82.4, words 81.20 للضرب, 81.94 والإهانة)
**Wrong:** the right, grey half of the split cloud shows only the forger floating with his hands on his head; the stick from the bargain box is not there, so "beating" is not pictured and the callback to 58.94 is lost. The cloud contents are also small.
**Fix:** put the same stick icon from the bargain box, raised and wobbling (`swing()`), above the cowering figure, plus a red cross badge matching the box at 57.2. No contact, no strike. Scale the cloud about 1.25x; note 1's closer S9 camera helps as well.

### 10. MINOR, crossed-out stick box hangs off the panel edge (142.7-143.9, word 142.82 العقوبة)
**Wrong:** the box enters at the far left and sits half outside the panel while the red cross is drawn over it, then drifts down the edge (`f_143.4.png`).
**Why it matters:** this is the payoff of the stick set-up; half of it is cropped.
**Fix:** place the box fully in frame in the clear wall space between the two heads or above the forger (world x about 470, y about 560 at the S14 camera), cross it out on 142.82, pop and fade by 143.7.

### 11. MINOR, the gift cloak comes and goes
**Wrong:** the forger wears the yellow cloak in Yahya's hall (138-166, `f_143.4.png`) but not on the road home (129.7-135.2, `f_133.8.png`) and not when he rides out at the end (167.0-175.9).
**Fix:** keep the cloak on from 116.56 to the end, including both riding shots, so the rise from patched tunic to rich man is continuous.

### 12. MINOR, Arabic caption line breaks leave one word alone (layout only, no text change)
**Wrong:** several two-line Arabic chunks break with a single word on the second line: 7.96 "مالك،", 41.19 "صحته،", 46.15 "يحيى.", 61.78 "النتيجة،", 100.47 "حاملها.", and 120.34 "الرجلين." on a third line.
**Fix:** if the caption renderer allows it, balance the wrap (break near the middle of the chunk, or at the comma) without touching words or timing. If it does not, leave as is; everything is legible.

## For the coordinator (not animator tasks)
- English chunk 140.64-143.70 ends with a comma ("...from punishment,") where the Arabic sentence ends with a full stop; the next chunk starts "then offered...", so it reads fine. Translation is accurate throughout, including the P6 line that the earlier plan flagged as condensed; it now carries "Yahya's name, once the cause of the quarrel".
- Family-friendly: punishment is only ever a stick icon and a cowering thought figure. Fine.
- Things that work and should not be changed: forgery scroll insert 21.7-28.9; DAYS PASS card and the cycling sky in the door arch 72.2-76.5; Yahya's NOT MY HAND insert 88.0-90.0 and the decision push-in 91.5-95.8; Abdullah's jump 105.7-106.5; Yahya stepping down to raise the kneeling man 141.5-142.5; Yahya closing the chest himself 153.5-154.7.

## Reusable techniques for the Library
- `portraitMedallion` + `rift` as a way to draw a relationship between two absent people (open, cobwebbed, closing, heart). Move to Library after approval, with a rule in the guide: medallions touch but never overlap, and the rift is hidden at `close = 1`.
- "Scroll insert with the reader's eyes above the top edge" (21.7 and 88.0): a document close-up that still has a face. Worth a guide entry.
- Guide rule from this film: in `palaceHall` scenes the default dialogue camera should be zoom 1.6 or more with y about 750; zoom 1.0 is for establishing shots only.

Second review advice: Yes, a second Fable review of v2 is warranted. Notes 1 to 6 change camera framing in most of the film and restage three payoffs (the wink, the doubling, the ending) plus the gifts scene; closer cameras can push labels, clouds and counters into faces or out of the panel, and the new ending composition has to be checked in the rendered frames.
