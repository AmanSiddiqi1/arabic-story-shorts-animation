Story <ID>, stage `implement` (CODE-ONLY v1 from the validated Fable plan; no video render). Project root: <project folder>. Follow your agent instructions, CLAUDE.md and the project skill (.claude/skills/halftone-pop/SKILL.md, "Arabic Story Shorts"), EXCEPT the rendering steps, which are replaced below.

Rules for this campaign:
- First check that the plan matches the inputs: planning/planning_metadata.json shas vs planning/inputs/timeline.json, and the final narration MP3 and its `.mp3.words.json` in `Audio Files/Final Done/`. If the plan is missing or materially inconsistent, STOP and reply `BLOCKED: <reason>`. Do not re-plan.
- Implement the complete plan with full acting: anticipation, follow-through, secondary motion, gaze/lid/blink, walk/footfalls, camera, effects, SND cues in pauses, and subtitles from the plan. No static illustrations. Read Library/Animation_Capabilities_Guide.md and reuse Library cast, sets and props. You may read other stories' src/ for reference (KD-007, KD-009 and KD-012 are finished examples) but never edit them.
- Work only inside Animations/<ID>/. Never edit Library/, other stories, audio, or MP4s/. New reusable drawings stay in src/ and are listed in library_proposals.md. Record decisions the plan left open in notes.md.
- Do not run git commit or push; the coordinator backs up.
- NO full render. Never run render.mjs except for clips of 12 s or less with --from/--to written to scratch/. Do not run qc.py. Check your work with stills and contact sheets (sh.sh) at key beats.
- When done, run `python3 tools/production/implcheck.py <ID>` from the repo root. It builds the player, checks subtitles are verbatim, duration and end hold are within limits, and runs a headless seek test across the whole film. It also writes qc/implcheck.json and render_job.json. Fix the errors it reports and rerun until it says PASS.
- Be economical: avoid rereading large files and avoid redundant still batches.
- Final reply in at most 6 lines: implcheck result, film duration, what was implemented, what was skipped and why, and library proposals (names).
