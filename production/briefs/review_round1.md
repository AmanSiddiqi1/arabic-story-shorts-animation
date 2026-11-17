# Fable review brief, round 1 (completion loop 2026-11-17). Replace <ID> with the story id given to you.

Follow .claude/agents/fable-reviewer.md. Working directory: repository root.

Material:
- Film: Animations/<ID>/renders/<ID>_v1.mp4 (cloud render, technical QC PASS). Read only.
- Pack: Animations/<ID>/review/v1_pack/ (strips/ = 4 frames per second, each stamped with its time; narration.txt = subtitle chunks Arabic + English with times, and every word with its time). Look at EVERY strip image, in order. You must inspect the rendered visuals; a code-only review is not acceptable.
- Detail: pull full-size frames with ffmpeg into Animations/<ID>/review/v1_pack/extra/ (`ffmpeg -v error -ss <t> -i <mp4> -frames:v 1 out.png`), especially subtitles (bottom third), faces, hands, key props, fast motion.
- Plan: Animations/<ID>/planning/creative_plan.md; timeline: planning/inputs/timeline.md; feasibility: Library/Animation_Capabilities_Guide.md.

Review: storytelling clarity and visual quality; movement, expressions, gestures, reactions; composition, framing, backgrounds, continuity; camera, transitions, pacing; interactions and physical actions; sync with the Arabic narration; English subtitle accuracy, placement, timing, readability (English re-translated 2026-11-17, judge it as it is now); faithfulness and family-friendly presentation; glitches, awkward poses, missing elements, weak scenes.

Write Animations/<ID>/review/fable_review_1.md. First line exactly `Verdict: PASS`, `Verdict: PASS WITH NOTES` or `Verdict: REVISE`. REVISE only for substantive creative or technical problems worth a v2 render; do not invent changes: if the film works, say PASS or PASS WITH NOTES. Up to 12 notes, each: time range, severity (BLOCKER / MAJOR / MINOR), what is wrong, why it matters, concrete fix. Substantive before cosmetic. End with `Second review advice:` (would a second Fable review of v2 be warranted after these fixes, and why).

Never change narration, subtitle text or timing; edit no other file. Final reply at most 6 lines.
