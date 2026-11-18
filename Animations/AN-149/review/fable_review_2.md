Verdict: PASS WITH NOTES

# AN-149 The Schoolmaster Who Fell in Love by Report: Fable review, round 2 (v2)

Film reviewed: `Animations/AN-149/renders/AN-149_v2.mp4` (174.9 s, cloud render). All 30 strips of `review/v2_pack/strips/` were looked at (every changed range frame by frame, the rest skimmed), plus full-size frames pulled into `review/v2_pack/extra/` (montages `m_end.jpg`, `m_mid.jpg`, `m_early.jpg`) and compared with the v1 pack.

## Summary

v2 fixes all three MAJOR notes of round 1. The mist artefact is gone and the closing image now reads with the sound off: books and teacher on the left, heart then stone stacked on the right, the stack rising to reveal two notes labelled "2 SONGS", then toppling. The song picture no longer contains a headstone lookalike, so "THE SONG: GONE" and "HIS GUESS: DEAD?" finally say different things. The recoil is large, with a big readable WHAT?!. The flashback is announced (EARLIER...), UMM AMR is legible, the poet is a separate character, and the grief signs are labelled.

No BLOCKER. No story beat is unreadable. One small staging regression (note 1 below) and a few polish items remain; none of them justifies a v3 on its own. If a v3 is made for any other reason, do notes 1 to 3; the rest are optional.

Subtitles: unchanged, in sync, large and clear in both languages in every strip; nothing intrudes into the caption panel.

## Round-1 notes: status in v2

| # | Round-1 note | Status | Comment |
|---|---|---|---|
| 1 | Moral tower 158.5-172.5 (artefact, unreadable) | FIXED (small leftovers) | Mist patch gone; clip-and-rise reveal at 165.4 works; "2 SONGS" label with arrow is clear; BOOK tick / LAMP cross payoff 161.0-162.6 readable; topple falls right, away from the teacher; THE END clear of sign and cloud edge. Leftovers: the stone covers the heart's lobes (new note 2); lady, donkey and "?" are tiny in the cloud's corner (new note 4). |
| 2 | Headstone lookalike in the song picture | FIXED | Palm marks the road's end in the balloon, the death cloud and the insert. The only stone in the teacher's cloud is the one that rises on ماتت 141.54. |
| 3 | Comic peak 99.2-101.8 played small | FIXED (mostly) | Recoil with both hands up, open mouth, WHAT?! about 150 px, teacher's late flinch, look to camera at 101.1. The pull-back at 99.7 is nearer 25 % than the 7 % asked for, and WHAT?! overlaps the lower book shelf, but the beat lands. |
| 4 | SONG / GUESS insert small, tied to singer | FIXED | Flat blue field, two stacked pictures, labels, red "?" stamped on 148.82, teacher bust with thought dots. See new note 3 for the loop restart. |
| 5 | Flashback not announced, 4.5 s of nothing | FIXED | EARLIER... label, close on the reading bust, ear cup at 110.8, notes drift in before the singer, pull-back on 111.34. Dream wash now clearly visible. |
| 6 | UMM AMR hard to read; singer exits grey and cut off | FIXED | Yellow outlined name in the sky 116.9-119.2. Singer full colour, leaves frame before the push-in on both days. |
| 7 | Poet looks like the teacher | FIXED | White and blue figure, upright beside the pedestal, bows with scroll. |
| 8 | BOOK / LAMP setup small and brief; teacher hidden | FIXED (partly on framing) | Icons larger, lamp lit 41.7 then crossed 42.5 with puff, cloud held to 43.3. The real teacher's face is now visible, though he is still cut by the right frame edge. |
| 9 | Grief arrows unlabeled | FIXED | Push-in; TEARS, BLACK ROBE, TISSUES appear one at a time 67.0-68.5; tissue pile on the teacher's far side. |
| 10 | Balloons empty or cramped | PARTLY | Question balloon (74-78) fixed: whole figures, clear of the outline. Neighbour balloon is still empty 53.4-54.6 (no "?" visible in the render, see `extra/m_early.jpg` frame 2) and its picture fills about 40 % of the balloon, not 70 %. It does read: teacher, doorway, tear. |
| 11 | Small staging slips (HOW balloon, CLOSED board, SOB hold) | FIXED, with one REGRESSION | HOW balloon gone before the camera move; CLOSED fully readable 44.5-50; SOB held 141.6-142.4. Regression: moving the scholar left put him half out of frame for the whole neighbour exchange (new note 1). |
| 12 | English capital (coordinator) | NOT CHANGED (by instruction) | No action for the animator. |

## Notes on v2 (most important first; all minor)

### 1. 51.2-58.6 s, REGRESSION (minor): the scholar is half out of frame while he asks the neighbours
After the camera shifts right for the neighbours (51.0), the scholar stands at the left frame edge with only half his body and one hand in view until 58.6 (`extra/m_early.jpg` frames 2 and 3). In v1 he was fully in frame. He is the one asking (سأله 49.26, سبب 51.82), and the carpenter's balloon and pointing arrow are addressed to him, so the exchange now looks like the carpenter talking to nobody.
Fix: keep the scholar's stop position (the CLOSED board must stay readable) and change the camera instead: from 51.0 to 58.7 centre the framing about 90 units further left, or zoom out about 10 %, so the scholar's whole figure is inside the left edge with at least 30 px margin while the carpenter and the old woman's window stay inside the right edge. Alternatively let the scholar take two steps right (with `walk` / `footfalls`) on الجيران 50.88, stopping just right of the CLOSED board, and step back on ذهب 58.72.

### 2. 164.2-171.5 s: the stone hides the heart's lobes
The grey stone lands on the top half of the heart, so for 7 s the "love" piece is a red point under a stone (`extra/m_end.jpg` frames 1 to 3). The heart is seen whole for one second before (163.0-164.0), so the idea survives, but the stack would read instantly if all three layers were visible.
Fix: raise the stone so its base rests on the heart's upper curve (overlap no more than about 15 % of the heart's height), or narrow the stone to about 70 % of the heart's width so both lobes show on either side. Keep `landSquash` on وحزنًا 164.16 and the sway.

### 3. 149.4-150.2 s: the song picture loops back to the lady on the last word
In the insert the lady and donkey leave at 148.5-149.0, the road is empty at 149.2, then at 149.5 (موتها) they are back in the middle of the road until the cut. The picture labelled GONE should end empty.
Fix: one pass only. Lady and donkey stand 146.7-148.2, trot out by 149.0, dust settles, and the empty road with the palm holds to 150.2. Same rule for the singer's balloon (already correct there).

### 4. 168.9-174.9 s: lady, donkey and "?" are tiny
The "truth or fate unknown" group in the cloud's upper right corner is about 55 px tall and touches the cloud outline (`extra/m_end.jpg` frame 3). On a phone it is a smudge with a red dot.
Fix: draw the group about 100 px tall, inside the cloud with 20 px clearance, in the free space right of the "2 SONGS" label and above the tower's fall path; lady on حقيقة 168.94, donkey and "?" on مصيرها 170.84 (the "?" at least 60 px). When THE END arrives it may shrink or shift the label, not this group.

### 5. 140.2-150.2 s versus 163.7-174.9 s: two different stones
The stone the teacher imagines (cloud at 141.5 and the GUESS picture) is a cream arch on a grey sky; the stone in the closing tower is dark grey with engraved lines. The cream arch can be taken for a doorway or a dome, and the payoff does not visually quote the setup.
Fix: use the grey engraved marker (the S15 drawing) in all three places, on a slightly lighter background in the GUESS picture so it keeps contrast.

### 6. 53.4-54.6 s: neighbour balloon opens empty
Put the "?" (or the mini teacher straight away) in the balloon from 53.5 and scale the teacher-in-doorway picture to fill about 65 % of the balloon.

### 7. 165.0-174.9 s: pupils stand on the CLOSED board
The three pupils playing ball cover the left half of the board ("OSED") for the whole ending. Shift the group about 70 units left, or have them play in front of the wall left of the door, so SCHOOL and CLOSED both read in the final frame.

### 8. 99.7-101.0 s: WHAT?! over the bookshelf (cosmetic)
Move WHAT?! about 60 units down and right into the bare wall between shelf and scholar, or keep the camera pull-back to 10 % so the shelf stays out of the word's area.

## Checked and found clean
- No artefacts, no broken frames, no colour patches in any strip; the LATER wipe (43.5-44.3), the whip pan (142.5) and the insert slide-in (146.5) are clean.
- S1 to S3 (0-32 s), the three crosses and NO!, the mystery lady, the heart on the turban across "2 DAYS LATER", the costume change at 144.7, the book rescue and nose blow (150-156) are unchanged and still work.
- Film length 174.9 s; THE END from 172.6 with a 2.3 s hold.

## Reusable techniques worth adding to the Library
- Clip-and-rise reveal: draw a stack with its base below a cloud's ground line (clipped), then lift it with `settleTo` on the key word to reveal the foundation. Replaces cover patches.
- Stacked comparison insert on a flat Ben-Day field: two framed pictures with labels and a stamped "?" on the doubtful one, plus a corner bust that owns the guess.
- Labelled evidence arrows appearing one at a time after a push-in (TEARS / BLACK ROBE / TISSUES).
- Guide rule from this round: after moving a character's stop position, re-check every later framing in the same scene; and a looping picture inside an insert must end on the state its label names.
