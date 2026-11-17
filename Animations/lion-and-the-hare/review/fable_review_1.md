# The Lion and the Hare: creative director review 1 (original film)

Reviewed: `Originals/The Lion and the Hare - Halftone Pop 9x16 - Noto Naskh Arabic.mp4` (172.2 s). All 29 strips at 4 fps were read in order, plus a 10 fps pull of the leap and fall (141.3-143.9) and twelve larger stills (4.0, 54.0, 74.5, 86.0, 100.0, 107.5, 120.0, 128.0, 132.6, 139.0, 145.0, 160.0). Sync was judged against the word times in `narration.txt`; the audio itself was not listened to or re-measured.

All times are film times. Positions are world units of `scene_l.js` (1000 x 1230; forest and den ground y 900; well ground y 520, shaft x 560..800, centre x 680, rim top y 454, water y 1010; lion at the well x 392 with his head near (530, 306); hare on the far rim x 818).

---

## 1. Diagnosis

### What works
- **Geography of the well.** The cross-section shows depth, water and both rims in one picture; the hare putting the hole between himself and the lion (116.2 on) is smart staging.
- **Broad sync.** Most paragraph beats sit on their words: roar on "يخيف" (3.2), hungry then angry on "بالجوع والغضب" (69.2, 69.8), den roar on "زأر" (73.7), "SHOW ME!" on "أرني" (105.7), leap on "قفز" (141.8), fall on "وسقط" (142.9).
- **Some good poses.** The hare leaning back with ears streaming in the den roar (73.7-75.0), the chin-tap think (53.0-56.7), the lion's eyes-shut hungry face (69.2), the wet, flattened mane in the water (144.2 on).
- **Designs and palette** read at phone size in the 1.2-1.5 zoom shots.

### Main weaknesses
1. **The climax is played tiny, with labels doing the acting.** The reflection first appears at 126.7, 2.4 s before "رأى الأسد صورته" (129.09), as a face about 100 px wide at the bottom of a wide shot, joined to the lion by a dashed line. It is blank while the lion is wide-eyed (127-131), and "HIS OWN REFLECTION!" and "AN ENEMY?!" explain the joke. During "فتحركت الصورة كأنها تزأر أيضًا" (137.18-141.06) the real lion stands closed-mouthed and frozen for 4 s while a blue "ROAR!" drifts up the shaft. The lion never tests the image, so his vanity and his mistake are never seen happening.
2. **The leap has no weight and passes through the hare.** No crouch (standing at 141.7, airborne at 141.8); 1.2 s of floating; at 142.4-142.8 the lion's head overlaps the hare, who does not react. He enters the water head down at 143.5 and is upright with a dry-looking face in the same frame as the splash (143.6). "ولم يستطع الخروج" (145.72-147.42) is two labels and an arrow: he never tries to climb.
3. **The hare's trick is never visible as a trick.** In the den (79.65-108.31) he holds one paws-together pose for about 20 s. There is no moment where the audience sees the mask slip, and none where he checks whether the bait is taken. The lion's reactions are pops: fury to googly surprise plus "?" in one frame at 85.0, frozen until 92.2, then angry. "الملك الحقيقي" (98.92-100.24), the insult to his vanity, changes nothing in his body. The flashback figures are about 50 px tall.
4. **A real companion walks with the hare.** From 58.0 to 65.0 the grey hare follows the hero down the path and stands behind him at the idea. The lie is "I was coming with another hare"; showing one makes the lie look true and contradicts "عاد الأرنب وحده".
5. **The hero is not singled out and is not little.** Three near-identical hares share every early shot; the white one is the largest (54.0). He is identified only by the "HIS TURN!" arrow at 47.2.
6. **The hunt is out of sync and the fear has no shape.** The animals stand nose to nose with a roaring lion for 4 s (3.2-7.5), all in the same shake. They flee at 7.5 and are gone by 8.5, but "فتجري" is 10.37 and "وتختبئ" 13.20; "RUN!" appears at 10.5 over an empty stage, and the lion then stands still for 6 s (8.5-14.5).
7. **Nobody looks, blinks or turns.** Pupils are fixed; there are no blinks; every turn is an instant mirror flip (19.2, 40.5, 67.2 and 67.7 back to back). When the lion walks up to the animals at 26.2 they do not flinch, although they have just spent 20 s hiding from him.
8. **Dead holds.** 8.5-14.5, 28.7-38.0 (the whole offer: only bubbles change), 85.0-92.0, 96.0-102.5, 112.5-115.5 (empty shaft, no characters), 116.8-123.7 (hare frozen, lion cut in half by the left border), 127.2-129.2, 137.7-141.5, 150.5-152.7, 156.0-159.0.
9. **About 70 pieces of lettering in 172 s**, many naming a feeling the actor should show: "EEK!", "GULP!", "OH NO!", "NOT HIM!", "CLEVER!", "SLOWLY...", "WAITING...", "HUNGRY!", "AND ANGRY!", "SHIVER...", "GRR...", "STUCK!", "NO WAY OUT!", "PHEW!", six "?" marks at 156-159, hearts raining through the ending.
10. **Ending composition.** From 168.5 to the last frame the fox's snout touches the hero's face under "THE END", which reads as a new threat.

---

## 2. Prioritized improvements

Vocabulary: Library acting fields `gaze`, `lid`, `wet`, `sq`, `tip`; the lion's `crouch`, `reach`, `nod`, `drop`, `puff`, `mph`, `roar`, `talk`, `brow`, `mouth`, `eyes`, `flush`, `tailUp`, `tw`, `ph`, `amp`; the hare's `ears` (1 up .. -1 flat), `earWig`, `raise`, `nod`, `drop`, `squash`, `shake`, `brow`, `mouth`, `eyes`; `lionFace(...)` options `roar`, `brow`, `mouth`, `eyes`, `puff`, `wet`, `rot`. Helpers as listed in the guide.

### 1. The reflection: reveal, mirror test and the roar that "answers" (P1)
**Time and words:** 126.32-141.06. "ونظر إلى الماء. رأى الأسد صورته في الماء، وظن أنها صورة عدوه. زأر بقوة، فتحركت الصورة كأنها تزأر أيضًا."

**Problem:** weakness 1.

**Direction.** Add one new framing, used twice as a hard cut: a **view straight down the well over the lion's head** (POV). Ring of rim stones filling the panel (centre about (500, 600), outer radius 470, inner 360), two or three darker course rings for depth, a water disc of radius about 190 at the centre holding `lionFace` at scale about 1.25, clipped to the disc, with the existing green-blue tint. At the bottom edge the back of the real lion's mane and ears (a dark scalloped arc) so his head moves are seen together with the image. At about two o'clock on the rim, the hare's ear tips and one eye. The reflection copies the lion's `brow`, `eyes`, `mouth`, `roar`, `puff`, with tilt mirrored, 2 frames late.
- **126.32-127.78 "ونظر إلى الماء" (side view, two-shot of the rim, zoom about 1.45, no water in frame).** Front paws step onto the rim stones, neck reaches over (`reach` 56, `nod` 0.6), mane swings forward and settles (one `mph` kick), tail stops moving. Hare leans back 6 units, ears half down, his `gaze` on the lion's face, not on the water. Do not show the reflection yet.
- **127.8-129.0.** Lion squints into the dark (`lid` 0.4), pupils search left, right. At 128.6 eyes go wide and the head jerks back 10 units. He has seen something; we have not.
- **129.09 cut to POV, "رأى الأسد صورته في الماء".** Ripples settle and the face resolves on "صورته" (130.0): wide eyes, closed mouth. 130.3 he tilts his head (foreground mane shifts 30 left), the image tilts. 130.9 he blinks, it blinks. 131.2 he leans in (image scale 1.25 to 1.4).
- **132.01-133.9 "وظن أنها صورة عدوه".** 132.0 his brow comes down over 0.5 s and so does the image's: to him it is glaring. 132.5 lip curl (`roar` 0.15), matched. On "صورة" (133.16) his mane bristles (`puff` 1.2), matched. No label.
- **133.9 cut back to the side two-shot.** Lion flushed, tail lashes once. 134.3 he glances at the hare: the hare is instantly wide-eyed, nods twice quickly, paw pointing down. 134.8 the lion looks back down; the moment his eyes leave, the hare's `lid` goes to 0.3 with a small smile until 135.3 (mask off; see item 3).
- **135.1-135.48 anticipation.** Head rears up and back (`nod` -0.35, `reach` 20, chest `sq` 1.06), mouth shut.
- **135.48-136.86 "زأر بقوة" (camera eases to the existing wide, zoom 1.0, from 135.3).** Head whips down (`nod` 0.7, `reach` 64), `roar` 1, mane streams back (`puff` 1.25, fast `mph`), tail rigid, body shake 3 px. Three sound arcs travel down the shaft in place of the red "ROAR!". Hare: ears blown flat away from the lion (`ears` -0.6 with `earWig`), leans away, eyes shut, gripping the stone.
- **137.18 "فتحركت الصورة".** The arcs reach the water exactly on the word. Cut to POV at 137.3: the surface heaves, three ripple bands slice the face and drag its mouth open (`roar` oscillating 0.6-1). At 138.0 the foreground mane drops back 40 units and the image's eyes go wide for 0.4 s: he is affronted that it dared. On "كأنها" (138.72) the fury returns, larger. On "تزأر" (139.70) he roars again, short (0.5 s), the image gaping in step, ripples renewed.
- **140.5 cut to the side wide** for item 2.

Remove "HIS OWN REFLECTION!", "AN ENEMY?!", the dashed sight line, "GRRR!" and both travelling "ROAR!" words; one "ROAR!" burst beside the lion at 135.5 may stay.

### 2. The leap, the fall and "could not get out" (P1)
**Time and words:** 140.5-148.4. "قفز نحوها، وسقط في البئر العميقة، ولم يستطع الخروج."

**Problem:** weakness 2.

**Direction:**
- **140.5-141.77 wind-up.** Paws grip the rim, haunches sink (`crouch` 0 to 0.8 over 141.2-141.7), tail whips twice, eyes locked down. Hare shifts to the outer side of his stone, ears flat.
- **141.77 "قفز".** Spring with stretch (`sq` 1.12 along the dive). Path: head from (530, 306) to an apex near (610, 250) at 142.0, then nose down into the shaft centre, crossing the rim line (y 454) at about 142.5 at x 680. He must never pass x 740. Hare ducks as he goes by, ears whipped toward the shaft by the wind, then turns to follow him down. Remove "WHOOSH!" (it sits on his body); keep the speed lines.
- **142.5-143.55 "وسقط".** `fallY` acceleration, camera keys on the fall start and the splash. Until 142.9 he is still snarling; at 143.1 eyes wide, brow up, mouth "o", forelegs paddling, mane and tail streaming upward. The image below grows as he nears and wears the same shocked face: they meet nose to nose at the surface.
- **143.55 splash.** Fully under for 0.4 s (splash crown, ripples slapping the walls). Hare flinches, ears jump. 143.95 the head bursts up with overshoot (`rebound` about 30), wet mane, eyes shut, sputtering. 144.4 two damped head shakes (`rot` ±0.15), drops flying.
- **144.62 "العميقة".** Eyes open: left wall, right wall, then up. The camera tilts up with his look (use the existing pull-back, moved to 145.0-145.7) to show how far the sky is. On the rim the hare peers over: ear tips at 145.0, eyes at 145.3.
- **145.72-147.42 "ولم يستطع الخروج".** Attempt one at 146.02: paws slap the stones, he heaves up 60 units, claws slide (two short scratch marks), he drops back with a small splash at 146.5. Attempt two at 146.72: 30 units, slides. 147.2 gives up: chin at the waterline, ears flat, brow raised, looking up.
- **147.4-148.3 hare.** Sits back, long breath out (`sq` 0.94 to 1, ears flop then rise), legs trembling for half a second (`tremble` 1.5): he was frightened the whole time. Then he hops off left.

Remove "STUCK!", "GLUB...", the up-arrow; keep at most "NO WAY OUT!" after the second slide, clear of his face.

### 3. The den: the hare performs, the lion's vanity takes the bait (P1)
**Time and words:** 79.65-108.31, from "ارتجف الأرنب قليلًا" to "أرني ذلك الأسد فورًا!".

**Problem:** weakness 3.

**Direction:**
- **79.65-82.68.** Keep the push-in but frame both (`twoShot`): the lion's muzzle upper right, the hare lower left; the lion must not be cut by the border. Real fear first: `tremble` 2.5 decaying to 0 by 81.6, ears flat, eyes on the teeth. On "ثم" (81.66): a swallow (`drop` pulse 4), eyes shut for 0.2 s, breath in (`sq` 1.05), ears up to 0.3. He steps into the role. Remove "SHIVER...".
- **83.39-84.9 "يا ملك الغابة".** Deep bow on "ملك" (`nod` 0.5, ears sweeping forward, `drop` 10), held to 84.6. Lion: chin lifts 6 units, `brow` 1 to 0.6. He likes it.
- **85.04-86.68 "حدث أمر خطير".** Hare straightens, paw out (`raise` 0.6), eyes wide, a glance back down the path. Lion: no pop to round eyes; head tilt (`nod` -0.1), `brow` 0.3, `lid` 0.25, then his eyes follow the hare's glance down the path at 86.0. Remove the red "?".
- **88.07-91.94 "كنت قادمًا مع أرنب آخر".** Hare gestures back along the path. Enlarge the cloud (about 520 x 330, upper left, clear of the lion) so its figures are at least 110 px on screen. On "أرنب آخر" (90.76) the lion's `lid` drops to 0.3 with a small smile: two hares, a bigger meal.
- **92.33-96.66 "ولكن أسدًا ثانيًا أوقفنا وأخذ رفيقي".** On "أسدًا ثانيًا" the hare makes himself tall for a moment (`sq` 1.1, ears straight up, paw high), then shrinks. Lion: head snaps up at 93.0 (`settleTo`), `brow` 1. On "وأخذ رفيقي" (95.36) the hare looks at the empty ground beside him, ears down, `wet`; the lion looks at the same empty spot, then scrapes the ground once (dust), tail lash: that was his dinner.
- **97.89-101.64 "قال إنه الملك الحقيقي لهذه الغابة".** Hare leans in (`tip` 0.12), eyes up on the lion's face, watching for the effect; on "الملك الحقيقي" he flinches back in advance, ears flat. Lion on "الحقيقي" (99.40): frozen 0.3 s, eyes wide, then mane bristles (`puff` 1 to 1.3 with settle), he rises to full height (`drop` -14), chest out, `flush` to 0.8, tail straight up and quivering. Hold it contained until 102.55.
- **102.55-105.32 "غضب الأسد أكثر، وصاح".** One pace away and back (`turnFlip`), two stomps (`footfalls` + `kick`: hare and bones hop on each), tail lashing. Inhale on "وصاح" (104.64).
- **105.83-108.31 "أرني ذلك الأسد فورًا!".** Head lunges to within 40 units of the hare (`reach` 60, `roar` 1), hare skids back 30 units with ears streaming. On "فورًا" (107.42) a paw slams down. The hare turns to lead (`turnFlip`), back to the lion, and from 107.9 to 108.5 his face relaxes: `lid` 0.3, small smile. We see it; the lion cannot.

Remove the banners "A SECOND LION?!" and "THE TRUE KING?!", "GRR...", "GRRRRR!", "NOW!", "STOP!", "GRAB!". "SHOW ME!" and the crown with "I AM KING!" may stay.

### 4. Eyes, blinks, turns and life for the whole cast (P1)
**Time:** whole film.

**Problem:** weakness 7.

**Direction:** every character gets a gaze target at all times (`look` plans on the cue words), seeded `blink` (suppressed during held shock), and `breathe` on holds over 1.5 s. Replace every mirror flip with `turnFlip` (lion at 19.2, 40.5, 67.2, 67.7, deer and hares in the ending). Emotional barometers that must move before the face does:
- **hare ears:** up and loose when calm, one ear cocked when thinking, flat back in fear, forward when curious; they lag head moves by 2 frames;
- **lion tail:** slow sway when content, still when stalking, lashing when angry, straight up at the insult;
- **lion mane:** `mph` kick on every head stop, `puff` with pride and rage.
Groups react with `stagger` (bird first, deer, then hares, turtle last) and never share a pose or a shake phase.

### 5. The opening: a hunt that happens on its words (P1)
**Time and words:** 0.0-20.92. "كان أسد يخيف جميع الحيوانات. كان يخرج كل يوم ليصطاد، فتجري الحيوانات بين الأشجار وتختبئ. ولم يعد أحد يشعر بالأمان، حتى في وضح النهار."

**Problem:** weakness 6.

**Direction:**
- **0-3.0.** Animals graze at ease. 2.2 the bird sees the lion first and lifts off; deer's head snaps round at 2.4; hares' ears shoot up at 2.6, 2.75, 2.9.
- **2.98-5.56 "يخيف".** Inhale at 2.9, roar at 3.2. Reactions differ: deer rears a half step back, tan hare freezes flat, grey hare hides behind the deer's legs, the turtle pulls into his shell where he stands, the white hare (hero) flinches least and keeps watching. They back away 60-80 units by 5.5 instead of holding their marks.
- **7.09-9.88 "يخرج كل يوم ليصطاد".** Lion lowers into a stalk (`crouch` 0.5, slow `walk`, tail still), eyes on the deer; the animals keep backing off. No flight yet.
- **10.37 "فتجري".** Lion pounces and snaps on air (`anticipate` at 10.1, `hop`, `landSquash`); the animals bolt on the word, staggered: deer bounds, hares zigzag, the hero last. "بين الأشجار" (11.96): they weave between trunks.
- **13.20 "وتختبئ".** Dives into the bushes with leaf shake; eyes appear from 13.6, one pair at a time. Remove "RUN!" and "EVERY SINGLE DAY!".
- **15.61-20.92.** Lion prowls past, nose down, sniffing (head bobs). Bush eyes track him (`look`) and shut when his head swings their way: stillness is the suspense. He stops at the hero's bush for 0.6 s at about 18.0, then moves on; `turnFlip` at 19.2. Keep one label at most ("BROAD DAYLIGHT!" with its arrow); remove "SNIFF...", "SHHH!", "NOWHERE IS SAFE!".

### 6. The hero: little, alone, and an idea with a cause (P1)
**Time and words:** 45.10-64.56. "جاء دور أرنب صغير. خاف أصدقاؤه عليه، لكنه كان ذكيًا ويحب التفكير. مشى ببطء نحو مكان الأسد، وفي الطريق ظهرت في رأسه فكرة غريبة."

**Problem:** weaknesses 4 and 5; the idea is a bulb with no cause.

**Direction:**
- **Scale.** The hero is the smallest hare in every shot (about 0.8 of the friends).
- **47.09-49.30 "جاء دور أرنب صغير".** The friends' heads turn to him one after another (`stagger`); he looks left, right, then his ears sink and he swallows. The arrow may stay; remove "GULP!".
- **50.28-52.16.** Friends close in: tan hare presses against him, deer lowers her head to his level, `wet` eyes. Remove "OH NO!" and "NOT HIM!".
- **52.73-56.16 "لكنه كان ذكيًا ويحب التفكير".** He is the calm one: ears come up one at a time, `lid` 0.35, gaze up and away, two slow chin taps, then a small nod to the tan hare. One "CLEVER!" label is enough; no stars.
- **57.05-59.94 "مشى ببطء".** Small reluctant hops with pauses, head low. The grey hare goes with him only to the edge of the bush (58.8), stops and watches. The hero looks back once at 59.2 and goes on **alone into an empty frame**.
- **60.46-64.56.** A small puddle on the path replaces the turtle as the stopping point. 61.4 he sees "another hare" in it (his side view drawn flipped vertically, tinted, clipped to the puddle) and starts, ears up. 62.2 he leans, it leans; he waggles an ear, it does. 62.8 he looks toward the den, back at the puddle. On "فكرة" (63.06) the bulb pops and a slow smile follows; "غريبة": one delighted hop, then he walks on with purpose. Remove "IDEA!", "SLOWLY...", "GOOD LUCK!".

### 7. The den wait and the first roar (P2)
**Time and words:** 65.79-78.67. "انتظر الأسد طويلًا حتى شعر بالجوع والغضب. وحين وصل الأرنب، زأر الأسد: «أين كنت؟ ولماذا تأخرت؟»"

**Problem:** two mirror flips half a second apart; three stacked labels; the roar has no wind-up; the questions are delivered by a statue.

**Direction:** 65.8-69.0 pacing with `turnFlip` at each end, tail swishing; at each turn he looks down the path. 69.18 "بالجوع": stops, looks at his belly, sits heavily. 69.84 "والغضب": stands, one stomp, tail lash. Keep the clock and one label. 71.74-73.42: the hare arrives in small slow hops and stops farther off than now; the lion's head swings to him at 72.6. 73.5 inhale, 73.72 roar. "أين كنت؟" (75.36): one step toward the hare, head low at his level. "ولماذا تأخرت؟" (77.13): a second step, muzzle 60 units from him; the hare leans back, ears flat.

### 8. To the well and at the edge (P2)
**Time and words:** 109.52-123.06. "قاد الأرنب الأسد إلى بئر عميقة فيها ماء صافٍ. وقف على حافتها وقال: «الأسد الآخر في الأسفل. انظر بنفسك!»"

**Problem:** the lion is half out of frame from 110.7 to 124.5; 3 s of empty shaft; the hare's hop across floats 0.8 s; he is then frozen for 7 s.

**Direction:** 109.5-112.0 keep both in frame: the hare leads in quick hops, glancing back every second hop; the lion stamps after him, mane up, scanning for his rival. Shorten the tilt down the shaft to 112.1-114.9, with only "SO DEEP!". 116.15 "وقف على حافتها": crouch 0.15 s, hop of 0.5 s, `landSquash`, a wobble on the stone. Reframe with `twoShot`. "الأسد الآخر في الأسفل" (119.04): eyes on the lion, then down; paw pointing down; on "الأسفل" he lowers his voice (leans out over the hole). "انظر بنفسك!" (121.79): leans back, paw inviting. The lion looks from the hare to the hole and back (suspicion), `lid` 0.3. Remove the yellow arrow and the "LOOK!" bubble. 123.99-126.02 "اقترب بحذر": three slow steps (`crouch` 0.55, `footfalls`), a pause and a sniff at 125.2.

### 9. The bargain (P2)
**Time and words:** 22.26-43.68, from "اجتمعت الحيوانات يومًا" to "لبعض الوقت".

**Problem:** the animals do not fear the lion they have been hiding from; 9 s of statues under bubbles.

**Direction:** 25.12 "وقررت": the hares nudge the deer forward. 26.2 when the lion arrives all flinch and nearly bolt (`stagger`), then hold; hares behind the deer's legs, knees shaking. 30.18-34.06: deer head low, eyes flicking up to him and away; on "واحدًا كل يوم" the lion's brow lifts and he licks his lips. 34.36-37.26: on "تتوقف عن مطاردتنا" he looks away, tail tip flicking, and makes them wait. 38.65 "وافق": slow nod, smug smile, `turnFlip`, he strolls off with tail swaying. Relief in sequence: deer's legs sag, hares slump against each other, turtle's head comes out. The hero alone keeps looking after the lion. Remove "HMM...", the hearts and one of "CALM AGAIN..." / "FOR A WHILE".

### 10. Homecoming and the telling (P2)
**Time and words:** 148.89-163.43. "عاد الأرنب وحده إلى الغابة. تجمعت الحيوانات حوله، وسألته بدهشة عما حدث. حكى لها قصة البئر، ففرحت جميعًا."

**Problem:** 2 s hold, six "?" marks, the story told by an icon, a unison cheer.

**Direction:** 149-152: he hops in tired, stops; bush eyes blink in disbelief. 152.88: tan hare out first, running; the others follow, staggered. 155.63 "وسألته بدهشة": they look past him for the lion (heads crane right), then at him; one "?" at most. 159.42-161.52: he mimes it: paw back toward the well, a tiny roar pose (chest out, ears up as a mane), then the paw dives on "البئر" (160.92); listeners' eyes follow the paw and they jump at the splash. Keep the bubble icon. 161.82 "ففرحت": different joys, staggered: deer prances, hares leap at different heights, turtle's neck fully out for the first time, bird loops. Remove "HERO!" and the stars.

### 11. Lettering diet (P2)
**Time:** whole film.

**Problem:** weakness 9.

**Direction:** keep the title, the transition card, "THE END", one arrow, label or counter per key beat (CLAUDE.md asks for them), and speech bubbles that carry a quoted line. Remove every word that names a feeling or sound the actor now performs (lists in items 1-10). Target: under 30 pieces, none over a face or between two characters' eye lines.

### 12. The last walk and the end hold (P3)
**Time and words:** 164.19-172.2. "ومن ذلك اليوم، صارت تمشي بين الأشجار دون خوف."

**Problem:** weakness 10; hearts; the stroll is a shuffle.

**Direction:** return to the opening framing (0-2 s) as a bookend. They stroll in different directions across the open ground where the lion roared, no one glancing over a shoulder; bird lands on the deer's antler; turtle walks with his neck out. Keep the fox at least 150 units from the hero and not facing him at close range. The hero is last: at 168.2 "دون خوف" he looks back once toward the well, ears easy, then hops after the others. No hearts. "THE END" stays at 169.7, clear of all heads.

---

## 3. Reusable Library capabilities

| # | Improvement | Already in the Library | New capability worth adding |
|---|---|---|---|
| 1 | Reflection duel | `look`, `blink`, `anticipate`, `settleTo`, hold-then-cut camera | `mirrorOf(P, {delay, flip, ripple})` (a reflection that copies an actor); a top-down "well POV" set; `roarCycle(t, t0, dur)` (inhale, blast, mane and tail follow-through, recovery); `blastReact` for the listener (ears streaming, skid) |
| 2 | Leap, fall, trapped | `anticipate`, `hop`, `fallY`, `impactSquash`, `rebound`, `tremble`, follow-the-fall camera | `plunge` (dive, submerge, surface, head shake); `scrabble` (failed climb with slide-back); `peerOverEdge` (recommended in the Thief review) |
| 3 | Den con | `tremble`, `settleTo`, `turnFlip`, `footfalls`, `kick`, `twoShot`, large thought cloud | "mask on / mask off" (recommended in the Monkey review); `bow`; expression presets (`flattered`, `suspicious`, `affronted`) |
| 4 | Eyes, turns, life | `look`/`gazePlan`, `blink`, `breathe`, `turnFlip`, `stagger` | `earMood` / `tailMood` presets; `lag()` for ears and mane (recommended in the Thief review) |
| 5 | Opening hunt | `walk`, `anticipate`, `hop`, `landSquash`, `stagger` | `scatter` (ensemble flight with a gait per species); tracking bush eyes that shut when looked at; quadruped `stalk` gait |
| 6 | Hero and puddle | setup-and-payoff pose, `hop`, `look` | puddle reflection (same `mirrorOf`); per-character scale convention for "the little one" |
| 7 | Den wait and roar | `turnFlip`, `walk`, `footfalls` | `paceWait` (pace, look down the path, turn); `roarCycle` (as item 1) |
| 8 | To the well | `twoShot`, `hop`, `landSquash`, `footfalls`, `look` | `leadFollow` (leader glances back, follower keeps distance) |
| 9 | Bargain | `stagger`, `tremble`, `turnFlip` | `ensemble(t, members, delays)` (recommended in the guide); `listen` |
| 10 | Homecoming | `stagger`, `hop`, `look` | group gaze following a pointed paw (`track`, recommended in the Monkey review) |
| 11 | Lettering diet | "remove clutter" rule in guide section 9 | a `clearOf()` placer (recommended in the Monkey review) |
| 12 | Last walk | `walk`, `look` | bookend framing note; end-title safe zone (recommended in the Monkey review) |

---

## 4. Success criteria

1. **Reflection legible:** during "رأى الأسد صورته" the reflected face is at least 250 px wide on screen and visibly copies at least three of the lion's changes (tilt, blink, brow) before he roars; no label explains it.
2. **Roar answered on the word:** the water disturbance reaches the image within 3 frames of 137.18, and the real lion is never motionless for more than 1 s between 135.1 and 141.77.
3. **Leap and fall:** a visible crouch of at least 0.3 s before 141.77; the lion never overlaps the hare; he is under water at least 0.3 s; two failed climbs sit inside 145.72-147.42.
4. **The trick is visible:** at least two moments (about 107.9 and 134.9) where the hare's face relaxes only while the lion cannot see it, readable in a still.
5. **Vanity beat:** a frame-to-frame change in the lion's mane, height and tail within 0.5 s of "الحقيقي" (99.40).
6. **Alone:** no second hare is on screen with the hero between 59.5 and 148.9 except inside the thought cloud; the hero is the smallest hare in every group shot.
7. **Hunt in sync:** the first animal leaves its mark within 0.2 s of 10.37 and the last is hidden within 0.5 s of 13.20.
8. **Alive:** every character on screen has a gaze target and blinks; no instant mirror flips; no character holds an unchanged pose longer than 2 s outside deliberate suspense holds.
9. **Clutter:** under 30 lettering pieces in total, none over a face; no "?" rows, no hearts.
10. **Unchanged:** duration 172.2 s, narration, subtitles, look, designs, story events and ending identical; every beat inside its narration window.
