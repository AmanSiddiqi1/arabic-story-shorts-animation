# The Thief and the Moonbeam: creative director review 1 (original film)

Reviewed: `Originals/The Thief and the Moonbeam - Halftone Pop 9x16 - Noto Naskh Arabic.mp4` (166 s), all 28 strips at 4 fps, extra 8-12 fps pulls of the walk-in, the owner hearing, the jump, the fall, the owner's entry and the ending, and the audio envelope of the chant.

All times below are **film times** (the final narration clock, as in `narration.txt`). Note for the implementer: `scene_b.js` is authored on the old clock and remapped through `src/warp.js`, so either convert with `toOld()` or author new beats directly in film time.

---

## 1. Diagnosis

### What works
- **Staging idea.** The cutaway house (roof, hole, moonbeam, bedroom) is a clear stage, and the moonbeam is a permanent visual through-line from moon to floor.
- **Reveals.** The pull-back at 11.0-13.4 (roof to cutaway with the sleeping couple) and the hard cut to the thieves' close-up at 93.2 are good, purposeful camera decisions.
- **Framing at 21.5-27.** Bed in close-up with the thieves' feet on the roof at the top of frame is the best composition in the film; it just is not used by the acting.
- **Broad sync.** Paragraph-level beats land in their narration windows (walk-in, wake wife, peek, crash at 136.1 on "سقط").
- **Look.** Halftone Pop is consistent and legible; character designs read at phone size in the close shots.

### Main weaknesses
1. **Nobody looks at anybody or anything.** For 166 s every character stares at the lens with dead-centre pupils and never blinks. The couple never look at each other or at the ceiling (22-48), the thieves never look down the hole (13.5-20, 60-93), the leader never looks at the moon, the beam or the drop (109-130), and the thief never looks up at his companions at 158.96 although the narrator says he does.
2. **The plot's engine (the owner is *pretending*) is never acted.** At 47.6-54 he gets sweat drops and "HMM..." which read as real nerves. There is no wink, no sly look, no shared smile with the wife, so the trick is carried by the subtitles alone.
3. **The climax has no physics and no comic logic.** 124.2-130.5: zombie arms held frozen for 6.3 s. 130.5-131.2: he pops straight up with no crouch. 132.0-135.0: he floats spread-eagled for 3 s. 135.2-136.1: an even-speed drop, upright. 136.2: instant swap to a flat lying pose, no squash or bounce, then frozen for 4.5 s (136.2-140.7).
4. **The chant is miscounted by one.** Audio onsets of the seven "شولم" are about 116.5, 117.7, 119.0, 120.4, 121.7, 123.0 and 124.35 s. The film's counter shows 1 at 115.7 (on "قال"), 2 at 116.5 ... 7 at 123.0, so it runs one word ahead, and the chant pose ends at 124.2 while the seventh "شولم" (124.3-125.2) is still being spoken. The subtitle chunk also flips to "ثم مدَّ ذراعيه" at 124.2, during the seventh Shulam.
5. **The listeners stop listening when the secret starts.** The thieves lean in and cup their ears at 54.2-60.0 (wife insisting), then reset to a straight smiling row at 60.2 and stand like that for the whole secret, 60.6-93.0 (33 s).
6. **The tall tale is thumbnail-sized.** The thought cloud (62.2-92.5) shows the young owner about 30 px tall in a wide static shot for 30 s. The grip-the-beam action that the leader later copies is unreadable, so there is no setup for the payoff.
7. **Long dead holds.** 36.0-41.7 (nothing moves while "the wife raised her voice" is narrated), 62-67, 111-114.7, 124.2-130.5, 136.2-140.7, 151.5-158.
8. **Order errors against the narration.**
   - Owner half sits up at 17.6 with eyes shut, then pops to wide shocked eyes at 21.5 on "فتح عينيه بهدوء" (quietly).
   - "TIP / TAP" letters appear at 17.5-20.2 while no thief takes a step.
   - "وفجأة ظهر" (141.12-143.16): the owner slides slowly along behind the bed for 3 s; not sudden.
   - The thief's head drops at 159.0, before "نظر إلى أصحابه" (158.96-161.68); the head drop belongs to "وخَفَضَ رأسه" at 161.68.
9. **The companions are cropped out of the ending.** From 146 to the end the two thieves on the roof are cut at the chest by the top of the frame (heads out of shot), frozen with arms up. The last story beat (he looks at them, ashamed) cannot be seen.
10. **Three clones.** The thieves always act in unison with identical poses and timing (93.5 shock, 104-108 waiting), with a permanent toothy grin. The walk-in (6.2-13) is an upright march with hanging arms, not a sneak.
11. **Overlay clutter doing the actors' job.** 29.7-32.2 stacks "SHH!", a "!" balloon and the bulb on top of each other over the owner's head; the sweat drops at 47.2-54; the red "!" sits on the owner's stick 143.5-146.7; the "?" balloon at 147.2-151.2 covers the bed and crowds the wife; "PSST!" is cut by the frame edge 97.2-99 and held 7 s; "SHULAM!" sits unchanged over the moon for 8.5 s.

---

## 2. Prioritized improvements

Shared vocabulary used below (all exist in `person` plus the Library acting fields): `gaze`, `lid`, `wet`, `sq`, `lean`, `drop` (head), `tilt`, `aL/aR` arms, `eyes`, `mouth`, `brow`, `talk`; helpers `lookAt`, `blink`, `blend`, `pulse`, `anticipate`, `hop`, `landSquash`, `tremble`, `kick`, `walk`, `footfalls`, `dustBurst`.

### 1. The leap: grip, hang, realise, fall, crash (P1)
**Time and words:** 125.30-141.12. "ثم مدَّ ذراعيه وحاول أن يُمْسِكَ الضوء. قفز اللصُّ من السطح، لكنَّه لم يَمْسِكْ شيئًا! سقط على أرض البيت بصوت عالٍ، وتألَّم من السقوط."

**Problem:** frozen zombie arms for 6 s, pop-up jump with no anticipation, 3 s of spread-eagle floating, constant-speed fall, instant pose swap at impact, 4.5 s lying frozen.

**Direction (leader):**
- 125.3-126.0 (after the 7th Shulam): chest out, eyes shut, proud; one beat of stillness. Opens eyes, `gaze` to the beam.
- 126.04 "مدَّ" to 127.36: steps to the very lip of the hole (two small steps, feet planted, no slide). Right arm reaches into the beam first, slowly (0.6 s, ease out), then the left. `gaze` follows his own hand. Lean 0.10 forward.
- 127.36 "وحاول" to 128.40: fingers pass through the light once: the hand closes, he looks at the empty fist (`gaze` to fist, brow up, one blink), small puzzled head `tilt`.
- 128.40 "يُمْسِكَ" to 129.60: second try, both fists close one above the other as if on a rope. **This must be the exact grip pose the young owner uses in the flashback (item 3).** He decides he has it: grin, eyes narrowed (`lid` 0.3), a confident nod. Quick glance back at his mates (`gaze` left), who give a thumbs-up or nod.
- 129.25-129.70 anticipation: crouch `sq` 0.82, lean back -0.08, fists still on the "rope".
- 129.70-130.30 "قفز": spring out over the hole, `sq` 1.15 stretch on the way up, arc of about 90 px up and 110 px across, ease out to the apex. Cap lags behind by 2 frames.
- 130.30-131.90 "اللصُّ من السطح": hang in the beam in the rope-grip pose, legs dangling and swinging to rest (damped follow-through, 2 swings). Smug face, eyes shut. He is "holding" the moonbeam. Slow sink of 12 px over the hang so it does not look pinned.
- 131.90-133.26 "لكنَّه": eyes open. `gaze` down to the floor far below (hold 0.4 s), back to his fists (0.4 s). Brow lifts, grin fades to flat mouth.
- 133.26-134.78 "لم يَمْسِكْ شيئًا": at 133.64 he opens both hands, palms up, empty (the existing "NOTHING!" label may pop here, not earlier). At 134.2 slow turn of the eyes to camera, `lid` 0.5, one blink. Legs give one small pedal.
- 134.78-135.14: gulp (head `drop` 4 then up), arms start to flail.
- 135.14 "سقط": gravity. Accelerating fall (ease-in quad, not linear), `sq` 1.18 stretch, arms and cap trailing upward, mouth `o`, eyes wide, slight rotation toward belly-down. Camera follows as now.
- **Impact stays at the current frame (about 136.1) so the existing crash effect stays aligned.** Impact: `sq` 0.55 for 2 frames, `dustBurst` both sides, camera `kick` of about 8 px, then one rebound of 18 px (0.22 s) and settle (`landSquash`). The existing "CRASH!" stays.
- 136.3-137.3: dead still, face down. Let the gag land.
- 137.30-138.64 "بصوت عالٍ": one leg lifts, twitches, flops. Dizzy stars may stay.
- 139.34 "وتألَّم" to 141.12: pushes up on one arm to sitting (0.6 s, with effort: two-stage, slump back once), hand to head, eyes squeezed (`squint`), `wet` eyes, small `tremble` (amp 1.5). "OW!" stays.

**Companions (2 and 3) during this:** 126-129.6 watch his hands (`gaze` to the beam), No. 2 leans forward eagerly, No. 3 half covers his eyes. 129.7 both lean over the hole; 131.9-135 heads follow him (`gaze` tracks the leader). 135.14 both flinch back; at impact both wince (eyes shut, shoulders up, `sq` 0.94) then peek down.

**Camera:** keep the present shot sizes, but hold the leader, his hands and the hole edge in frame 125-131 (he is currently pushed to the left third with No. 3 cut by the frame).

### 2. Chant count and escalation (P1)
**Time and words:** 114.96-125.30. "قال: شُولَمْ! x7"

**Problem:** counter one ahead of the audio and missing the 7th; chant pose ends during the 7th word; one static pose and one static balloon for 9 s.

**Direction:**
- Re-cue everything in the chant (counter, mouth, moon ring pulse, arm accent, any chime) to the audio onsets **116.5, 117.7, 119.0, 120.4, 121.7, 123.0, 124.35**. Verify against the waveform; the word starts in `narration.txt` are about 0.4-0.6 s early here because they include the preceding silence. Nothing counts on "قال" (115.6-116.0); use that for a throat-clear and a look up at the moon.
- Counter "7" lands at 124.35 and holds until about 125.6.
- Escalate the performance so each Shulam is different:
  1. timid, half voice, shoulders up, quick `gaze` to mates;
  2. a little louder, arm half raised;
  3. eyes to the moon, arm fully up;
  4. second arm up;
  5. on tiptoe (`sq` 1.05), chin up;
  6. eyes shut, both arms shaking with effort;
  7. biggest: held longer (the narrator stretches it), back arched (`lean` -0.1), then arms drop and he opens one eye to see if it worked.
- Each word: 3-frame anticipation dip (`sq` 0.95) before the onset, accent on the onset, settle.
- Mates: No. 2 counts along on his fingers (one hand bob per word); No. 3 looks nervously between leader, moon and the bedroom below.
- The "SHULAM!" balloon should not sit unchanged for 8.5 s over the moon: pop it on each onset and let it shrink between words, or show it for the first word only and let the counter carry the rest.
- **Flag for the producer:** the subtitle chunk changes at 124.20, during the 7th Shulam. Subtitles are a kept constraint, so I am not changing it, but the correct boundary by the audio is about 125.3.

### 3. The tall tale: readable flashback with the grip that gets copied (P1)
**Time and words:** 62.22-74.12 and 78.94-93.28. "كنتُ في شبابي أَتَسَلَّقُ ... بالنزول على شُعاع القمر" and "أنظر إلى شُعاع القمر، ثم أقول كلمة شُولَمْ سبع مرات. وبعد ذلك أَمْسِكُ الضوء وأنزل إلى البيت، ولا يَسْمَعُنِي أحد."

**Problem:** the cloud figure is about 30 px tall in a static wide shot; its actions are illegible; no setup for the leader's later grip.

**Direction:**
- Make the cloud the subject. Either enlarge the existing cloud to about 55-60% of panel width, or tighten the camera so it reaches that size, with the owner's head still in frame at the cloud's tail. The young owner should be at least 110 px tall on screen.
- Cloud acting, cued to words:
  - 64.46 "أَتَسَلَّقُ": hauls himself over the roof edge (arms first, a leg swings up, effort).
  - 66.56-67.78 "الليالي المُقْمِرَة": stands, hands on hips, looks up at the crescent.
  - 69.40-70.94 "كلمة سِحْرِيَّة": finger up, the existing star twinkles once.
  - 72.12-74.12 "بالنزول على شُعاع القمر": glides down the beam, serene, eyes shut.
  - 80.04-82.52 "أنظر إلى شُعاع القمر": shades his eyes, looks along the beam (`gaze` along it).
  - 84.46-86.80 "شُولَمْ سبع مرات": mouth pops with small arm accents (existing "SHULAM x7" label is fine).
  - 88.22-89.64 "أَمْسِكُ الضوء": **both fists close on the beam, one above the other, rope grip. Hold 0.5 s so it registers.** This is the pose the leader reproduces at 128.4.
  - 89.64-91.42 "وأنزل إلى البيت": slides down like a fireman's pole, smooth ease.
  - 91.42-93.28 "ولا يَسْمَعُنِي أحد": lands on tiptoe with a tiny `landSquash`, finger to lips.
- Owner in bed tells it with his hands: a climbing mime at 64.5, a downward sweeping hand at 72.1, a two-fist grip at 88.2 (so the grip is seen twice). He projects up toward the ceiling (`gaze` up-right at the hole), with side glances at his wife.

### 4. Eye lines and blinks for the whole film (P1)
**Time:** global.

**Problem:** every pupil is centred at the lens; no blinks.

**Direction:** switch all five characters to explicit `gaze` targets with `lookAt`, plus `blink(t, seed)` with a different seed each (suppress blinks during held wide-eyed shocks). Default targets by section:
- 6.2-13.2 thieves: ahead to the hole; leader checks left and right once at 9.2-9.8.
- 13.5-20.3 thieves: down into the room through the hole.
- 21.2-27 owner: ceiling, tracking the feet; then his wife.
- 27.3-29.6 both: up at the roof on "فوق السطح", then each other.
- 32.4-47 couple: each other when whispering, up at the hole when performing loudly.
- 54-93 thieves: down the hole; at 67.8-74.1 a look at each other, then up at the real moon and across at the real beam.
- 93.3-96.8 thieves: wide to camera (the one justified lens stare), then each other at 95.6.
- 97-103.6 mates: at the leader.
- 109-131 leader: moon, then beam, then down the hole (112.34 "ونظر"), then his hands.
- 141.1-158 thief: the stick, then the owner's face. Owner: the thief. Wife: back and forth between them.
- 158.96 thief: up at his companions. Companions: down at him.

Head `tilt`/`drop` of 3-6 px should follow each large gaze change, leading it by 2 frames.

### 5. The owner's pretence and the couple's double act (P1)
**Time and words:** 27.27-54.0, with the key beat at 47.62-54.0 "تَظَاهَرَ الرجل بالتردُّد وقال: لا أريد أن يَسْمَعَ أحدٌ هذا السرّ".

**Problem:** two front-facing figures in one static two-shot for 26 s; balloons carry the story; the wife's emotional journey (fear, understanding, playing along) is absent; "pretended" reads as real nerves; 36.0-41.7 is dead.

**Direction:**
- 27.27-29.60 "هناك لُصوص فوق السطح": owner jerks a thumb upward; both look up at the feet on the roof (they are already at the top of this frame; keep them in shot). Wife: eyes wide, pulls the blanket up to her nose, `tremble`, `wet` eyes.
- 30.00-31.12 "لا تخافي": he turns to her, slow palm-down calming gesture or a pat on her hand, soft brow. Her blanket lowers halfway, trembling stops.
- 31.12-32.44 "عندي فكرة": the existing bulb; his eyes narrow (`lid` 0.35), one brow up, a slow smile.
- 32.42-38.12 "اسأليني بصوت عالٍ: كيف جمعتَ مالك؟": he leans to her ear, hand cupped at his mouth. On "بصوت عالٍ" (34.96-35.88) he points up at the roof. She looks up, back at him, blinks twice, then nods (36.0-36.6) and a conspiratorial smile grows (37-38).
- 38.12-41.84 "رفعت الزوجة صوتها وقالت": fill the dead hold. She sits taller (`sq` 1.04), clears her throat (small head bob at 39.5), glances at him for the cue (40.2); he gives a small conductor's "go" with one finger (40.9); she inhales (lean back -0.08).
- 41.84-47.08 "يا زوجي، كيف أصبحتَ غنيًّا؟ أخبرني بِسِرِّكَ!": she projects at the ceiling: head tilted up, `gaze` at the hole, hand beside her mouth, big mouth shapes, deliberately hammy. On "أخبرني بِسِرِّكَ" (45.84) hands clasped, pleading. He watches the ceiling sideways and makes a tiny "more" hand roll.
- 47.62-50.42 "تَظَاهَرَ الرجل بالتردُّد": **remove the sweat drops.** He strokes his moustache, eyes roll up and side to side in a show of reluctance, then **a clear wink to his wife at about 49.3** (one `lid` to 1 for 8 frames, small head tilt toward her, her smile answers). The "HMM..." lettering can stay.
- 50.42-54.00 "لا أريد أن يَسْمَعَ أحدٌ هذا السرّ": exaggerated look over each shoulder (51.3, 52.0), finger to lips, but chest and face aimed up at the hole: a stage whisper meant to be overheard. Last look up at the ceiling on "السرّ" (53.46).
- 54.00-56.02 "فأَلَحَّتْ زوجته": she tugs his sleeve twice and bounces (existing "PLEASE!"), he shakes his head once, then gives in at 60.6 "قال الرجل أخيرًا" with a big theatrical sigh (shoulders up then down).
- 74.12-78.94 "سألت الزوجة بدهشة": hands to cheeks, eyes wide, called up at the ceiling; then at 79-80 she covers her mouth to hide a giggle, shoulders shaking. (She currently holds a hand over her mouth from 62 to 92; limit it to this beat.)
- Clutter: drop the "!" balloon at 29.7-32.2; end "SHH!" by 29.6 so it never overlaps the bulb.

### 6. The thieves as an audience, and as three different people (P1)
**Time and words:** 54.0-103.62, especially 56.02-60.02 "بينما اقترب اللصوص من فتحة السقف ليستمعوا", 93.28-96.76 "اتَّسَعَتْ عيون اللصوص من الدهشة", 96.76-103.62 "قال كبيرهم بصوت منخفض: هذه فرصتنا! لِنُجَرِّبْ ما قال".

**Problem:** they stop listening at 60.2; they act in unison; the leader's whisper is a pointing arm and a 7 s balloon while the mates face the lens.

**Direction:**
- Give each a fixed attitude used everywhere: **Leader** (red cap): confident, decides, moves first. **No. 2** (yellow): eager copycat, reacts about 4 frames after the leader, nods a lot. **No. 3** (blue, smallest): nervous, reacts last (about 8 frames), looks around, hangs back half a step.
- 50.4-54.0 (the word "secret"): heads snap toward the hole in that order.
- 56.72-60.02 "اقترب اللصوص": tiptoe to the edge using `walk`/`footfalls` (no sliding), then crouch or kneel at the lip with hands on the edge, heads over the hole. **Keep this listening pose until 93.0.** Do not reset at 60.2.
- Inside the listening hold, one change every 2-3 s:
  - 62-67 heads tilt, No. 2 cups an ear;
  - 67.8-70.9 "كلمة سِحْرِيَّة": leader's head lifts, look at each other;
  - 72.1-74.1 "شُعاع القمر": all three look up at the moon, then at the beam next to them;
  - 84.5-86.8 "شُولَمْ سبع مرات": No. 2 mouths the word and holds up fingers; leader strokes his chin;
  - 88.2-91.4: leader's hand makes a small gripping motion (he is learning it);
  - 91.4-93.2: slow rise to standing.
- 93.28-96.76: staggered shock. Each: 3-frame squint (anticipation), then eyes `wide` with a `sq` 1.06 pop and settle. Arms: leader hands to head, No. 2 arms out, No. 3 hands over his mouth. At 95.6 they turn to each other. One "!!" over the group is enough (currently three).
- 96.76-99.72 "قال كبيرهم بصوت منخفض": leader checks the hole (`gaze` down), beckons with a curled hand; all three lean heads together into a huddle; his hand cupped at his mouth. Keep the "PSST!" balloon inside the frame and take it off by about 99.5.
- 99.72-101.68 "هذه فرصتنا!": leader jabs a finger at the beam, grin, rubs his hands.
- 101.68-103.62 "لِنُجَرِّبْ ما قال": No. 2 nods three times fast; No. 3 looks down the hole, gulps, then nods once, late.
- 103.62-108.86 "وانتظروا حتى ظَنُّوا ...": show waiting, not three men with arms out. Leader stands with arms folded tapping a foot; No. 2 sits on the roof edge, head nodding then jerking awake; No. 3 keeps peeking over the edge. The clock can stay. In the bedroom (visible 104-106.5): owner and wife lie back with a little bounce, and **the owner keeps one eye open** (`lid` 0.5 on one eye) under a fake snore: "they *thought*" (ظَنُّوا, 105.50).

### 7. The ending: look up, shame, and companions in frame (P1)
**Time and words:** 151.44-164.16. "تنهد اللص وقال: أنا الذي صَدَّقْتُ أنَّ ضوء القمر يحمل الناس! ثم نظر إلى أصحابه فوق السطح، وخَفَضَ رأسه خجلًا."

**Problem:** one sitting pose for 12 s; no sigh; head drops at 159.0 (2.7 s early); he never looks up; companions cropped at the chest and frozen; "THE END" arrives the instant the last word ends.

**Direction:**
- 151.44-152.04 "تنهد": a real sigh: shoulders rise (`sq` 1.04, 0.3 s), then fall (`sq` 0.94, head `drop` 8, 0.4 s), eyes closed through the fall.
- 153.30-155.14 "أنا الذي صَدَّقْتُ": looks up at the owner with half lids, one hand to his own chest, small shake of the head.
- 155.52-156.54 "ضوء القمر": a limp hand lifts toward the beam he is sitting in; `gaze` travels up the beam to the hole. 156.54-158.02 "يحمل الناس": the hand flops into his lap.
- Owner 151.4-158: stick lowers from the raised position to resting on his shoulder or tip on the floor (the threat is over); brow relaxes; one slow shake of the head at 157. Wife: hand to mouth, hides a smile.
- **Reframe by 158.0** (ease over about 0.8 s during "ثم"): pull back and tilt up so the hole edge and the two companions' **whole heads** are in shot at the top, with the thief below, linked by the beam.
- 158.96 "نظر" to 160.58 "أصحابه": his head tilts up, `gaze` up at them; hold 1.2 s. Companions lean over the edge looking down; No. 2 gives a sheepish small wave or shrug; No. 3 pulls his cap brim down over his eyes.
- 160.58-161.68 "فوق السطح": the companions look at each other, then both shrink back from the edge half a step.
- 161.68 "وخَفَضَ" to 163.46 "رأسه": only now his eyes break away and down; head `drop` 16, `lean` forward 0.12, `lid` 0.75, shoulders in, hands in lap; ease over 0.9 s.
- 163.46-164.16 "خجلًا": hold; one slow blink.
- "THE END" may appear from about 164.4, placed where it does not cover the companions' heads; the shame pose holds under it to 166.

### 8. The owner hears, then opens his eyes quietly (P2)
**Time and words:** 16.56-26.78. "لكنَّ صاحب البيت سَمِعَ خطواتهم. فتح عينيه بهدوء، ثم أَيْقَظَ زوجته وهَمَسَ"

**Problem:** footsteps are lettered but nobody steps; he half sits up asleep at 17.6; eyes pop wide at 21.5; the wife wakes instantly.

**Direction:**
- 16.6-20.3: the thieves actually shuffle three or four small steps toward the hole edge (No. 3 the clumsy one), with each existing "TIP"/"TAP" placed on a real foot plant from `footfalls`.
- Owner stays **lying down**. 18.62 "سَمِعَ": his snore stops, brow twitches, head `tilt`s a few degrees toward the ceiling, eyes still shut. The wife sleeps on.
- 21.15-21.84 "فتح": one eye opens slowly (`lid` 1 to 0.3 over 0.5 s). 21.84-22.58 "عينيه": the other. No wide eyes, no shock brow.
- 22.58-23.48 "بهدوء": body perfectly still, only the pupils slide along the ceiling following the feet above (already in frame). This is the suspense beat; hold it.
- 23.81-25.74 "ثم أَيْقَظَ زوجته": first nudge at 24.5 (she frowns, rolls slightly away), second nudge at 25.0, she opens groggy half-lid eyes at 25.3 and draws breath to speak.
- 25.74 "وهَمَسَ": his finger goes to his lips, close to her face, before she can; her eyes go wide; then both rise to sitting together by 27.2.

### 9. The owner's sudden entry and the confrontation (P2)
**Time and words:** 141.12-151.44. "وفجأة ظهر صاحب البيت يحمل عصًا. نظر صاحب البيت إلى اللص وسأله: من أنت؟"

**Problem:** a 3 s glide is not "suddenly"; the "!" sits on the stick; the "?" balloon crowds the wife; three static poses.

**Direction:**
- 136.3 (off the main action but in shot by 138.6): at the crash the owner's eyes snap open and he *smiles* (he was waiting); the wife sits up, startled.
- 141.12 "وفجأة": blanket flips; 4-frame crouch; 141.5-142.36 he springs out of bed and lands beside the thief with `landSquash` exactly on "ظهر" (142.36), stick already raised. Small camera `kick`.
- Thief: at 142.36 he jolts (`sq` 1.08), scoots back on his seat about 30 px with a scramble of legs, arms up to shield, `gaze` locked on the stick, `tremble`.
- 144.26-145.44 "يحمل عصًا": one brandish of the stick (anticipation back, forward, settle). Remove the red "!" once the owner has landed.
- 145.44-148.10 "نظر صاحب البيت إلى اللص": the owner slowly leans in over him (`lean` 0.15 over 1.5 s), stare; the thief shrinks (`sq` 0.92, lean back), looks away, looks back.
- 149.10-151.44 "من أنت؟": chin jab on "من", the stick tip taps the floor on "أنت". Drop the "?" balloon or shrink it and place it clear of the wife. Wife peeks over the blanket she holds under her chin, eyes going between the two.

### 10. Sneaking in (P2)
**Time and words:** 6.23-16.56. "فوق سَطْح بيت كبير، اقترب ثلاثة لُصوص من فتحة في السقف. ظَنُّوا أنَّ أهل البيت نائمون."

**Problem:** upright march, hanging arms, grins at the lens; then a static row.

**Direction:**
- Tiptoe sneak: `lean` forward 0.15, high knees, hands held up at chest, head slightly down, using `walk` so feet never slide. Leader first, No. 2 two body widths behind, No. 3 hurrying to keep up.
- 9.15 "اقترب": leader stops and raises a flat hand; No. 2 bumps into him (`sq` 0.92 accordion), No. 3 bumps into No. 2 a few frames later. Leader looks left and right, then waves them on.
- 11.70-13.24 "فتحة في السقف": arrive at the hole edge; the leader points down at it.
- 13.55-16.56 "ظَنُّوا أنَّ أهل البيت نائمون": all three lean over and look down at the bed; the leader mimes "asleep" (cheek on hands) or gives a thumbs-up; No. 2 nods; No. 3 still glances behind him.

### 11. The leader at the hole (P2)
**Time and words:** 108.86-114.96. "وقف كبير اللصوص عند فتحة السقف، ونظر إلى شُعاع القمر."

**Problem:** after "LATER..." the three stand in the same row at the left edge (No. 3 cut by the frame), the leader pointing for 5 s.

**Direction:** leader walks the last two steps alone to the lip (108.9-110.7 "وقف ... عند"), toes at the edge (111.08-112.34 "فتحة السقف"); looks down the drop, small wobble back, swallows. 112.34 "ونظر": head tilts up, `gaze` climbs the beam to the moon (113.86-114.96), face lit, jaw sets. Mates stay two steps back, fully inside the frame, watching him; No. 2 gives an encouraging push gesture. The yellow arrow may stay but for 2 s, not 4.

### 12. Stagger and settle pass (P3)
**Time:** global, especially 93.3, 104-108, 138.7-144 and all pose changes.

**Problem:** poses switch in 1-2 frames and several characters change on the same frame.

**Direction:** every pose change gets 2-4 frames of anticipation, an overshoot of about 10% and a 4-6 frame settle (`anticipate`/`blend`); offsets between characters of 3-8 frames following the leader, No. 2, No. 3 order; idle breathing (`sq` 1 +/- 0.012 at about 0.3 Hz) whenever a figure holds longer than 1.5 s; caps and the owner's nightcap tassel lag head moves by 2-3 frames.

---

## 3. Reusable Library capability from each improvement

| # | Improvement | Reusable capability |
|---|---|---|
| 1 | The leap and crash | `leapAndFall(t, {tAnt, tJump, apex, tHang, tDrop, tImpact})` returning x, y, sq, rot (anticipation crouch, arc, hang with damped leg swing, accelerating fall, squash, one rebound). A "hang-realise-drop" reaction sequence (look down, look at hands, look to camera, gulp). A `crashLanding` combo: `dustBurst` + `kick` + rebound. A `getUpHurt` sequence (twitch, push up, slump, rub head). |
| 2 | Chant | `countedBeats(t, onsets)` returning the index, accent envelope and anticipation dip for a list of audio onsets, to drive counters, mouths, pulses and balloon pops from one list. A small `onsets.py` tool that prints energy onsets for a time range, for repeated words where word alignment is loose. An "escalation" pose blend (pose N of 7). |
| 3 | Flashback | `thoughtCloud(ctx, box, drawInside)` with clipping and its own mini-stage scale, so a character can act legibly inside a cloud. A `gripRope` two-fist arm pose and `slidePole` motion for `person`. |
| 4 | Eye lines and blinks | A `gazePlan(t, [[t0, target], ...])` helper that eases the gaze between targets and adds the head lead; `blink` seeds per character with a "no blink while shocked" mask. A checklist item in the template: every scene declares gaze targets. |
| 5 | Pretence and couple | An expression set for `person`: `sly` (lid 0.35, one brow up, smile), `wink`, `frightened` (wide, wet, tremble), `groggy` (half lids), `pleading`, `stifledLaugh`. Gestures: `hush` (finger to lips), `cupMouth` (whisper / call), `cupEar`, `thumbUp`, `pointUp`, `calmDown`, `strokeMoustache`, `nod(n)`, `headShake(n)`, `sigh`. |
| 6 | Thieves as audience | `ensemble(t, members, {lead, delays})`: runs one reaction across a group with per-member delay and variant, so groups never move in unison. Reaction sequences: `takeShock` (squint, pop wide, settle), `huddle`, `listenAtEdge` (crouch/kneel pose), `waitBored` (foot tap, nod off, peek). Pose: `crouch`/`kneel` for `person`. |
| 7 | Ending | `shame` sequence (eye break, head drop, shoulders in, slow blink). A `twoLevelFrame(camA, camB)` camera helper that frames two subjects on different levels with a given margin, so heads are never cropped. An end-card rule: the last pose holds under "THE END". |
| 8 | Hears and wakes | `wakeQuietly` sequence (stillness, one eye, other eye, tracking pupils) and `wakeGroggy` (nudge, frown, half lids). Per-eye `lid` (left and right independent), which the wink also needs. Footstep lettering driven by `footfalls`. |
| 9 | Sudden entry | `springIn(t, t0, from, to)` (crouch, hop, `landSquash`, `kick`); `recoilSeated` (jolt and scoot back); `brandish` for held props; `loomOver` (slow lean with stare). |
| 10 | Sneak | `sneak` gait option for `walk` (tiptoe, high knee, lean, hands up) and a `bumpChain` accordion helper for a line of walkers stopping. |
| 11 | At the edge | `peerOverEdge` (toes at lip, look down, wobble back) and a `gazeSweep(pathPoints)` that runs the eyes along a line (the beam). |
| 12 | Stagger and settle | `poseTo(t, t0, from, to, {ant, over, settle})` as the standard pose transition; `breathe(t, seed)` idle; `lag(value, frames)` for caps and tassels. |

---

## 4. Success criteria for comparing the upgrade with this original

1. **Eye lines:** in every shot each visible character's pupils point at a nameable target (person, hole, moon, beam, hands, stick), and every character blinks. The only lens stares are deliberate (shock at 93.3-95.5, the look to camera at about 134.2). Original: zero gaze changes, zero blinks.
2. **The pretence is visible without subtitles:** a viewer with subtitles hidden can tell from 27-54 that the couple know about the thieves and are performing for them (thumb up at the roof, wink at about 49.3, the wife's shift from fear to playing along, projecting at the ceiling).
3. **The leap reads as cause and effect:** anticipation crouch before 129.7; a hang in the copied rope-grip pose; a clear "realises his hands are empty" beat inside 131.9-134.8; an accelerating fall; impact with squash, rebound and dust at the unchanged impact time (about 136.1); no frozen pose longer than 1.2 s between 124 and 141.
4. **Setup and payoff match:** the flashback figure's two-fist grip at 88.2-89.6 is readable at phone size (figure at least 110 px tall) and is recognisably the same pose the leader takes at 128.4-129.6.
5. **Chant sync:** the counter, mouth and pulse hit all seven spoken Shulams within 2 frames of the audio onsets (116.5, 117.7, 119.0, 120.4, 121.7, 123.0, 124.35); nothing counts on "قال"; "7" lands on the seventh; each Shulam pose is visibly bigger than the last.
6. **Narration order respected:** the owner is still lying down until 21.15 and opens his eyes slowly, one after the other, during "فتح عينيه بهدوء"; steps happen when footsteps are lettered; the owner's entry completes within 0.5 s around "ظهر" (142.36); the thief looks up at his companions at 158.96 and lowers his head only from 161.68.
7. **The ending beat is in frame:** from 158 to 164 the two companions' full heads and the thief are in the same shot, and all three react (look, exchange, shrink back, head drop). The shame pose holds under "THE END".
8. **Listeners listen:** the thieves hold a listening pose at the hole edge from 57 to 93 with a visible change at least every 3 s, and at no point do all three change pose on the same frame; each thief's attitude (leader, eager, nervous) is identifiable.
9. **No dead holds:** no span longer than 2 s in which no character changes pose, gaze or expression (original: 36.0-41.7, 62-67, 111-114.7, 124.2-130.5, 136.2-140.7, 151.5-158).
10. **Less overlay, not more:** fewer overlay elements than the original (the sweat drops, the 29.7 "!" balloon, two of the three "!!", the long-held "!" on the stick and the "?" over the bed are gone or shortened), no balloon cut by the frame edge, no two overlays overlapping; narration audio, subtitles, duration (166 s), look and story events unchanged.
