# Arabic Story Shorts: production operations guide

How the multi-agent production of the remaining ~117 films works, and how to run, pause, resume and recover it from a fresh Claude Code conversation. Read with [CLAUDE.md](CLAUDE.md) (series rules) and [DEVELOPMENT_SETUP.md](DEVELOPMENT_SETUP.md) (Git, media, backups).

## 1. Architecture

```
 main Claude Code conversation (Opus) = COORDINATOR
   │  reads/writes state only through tools/production/prod.py (SQLite: production/production.db)
   ├── fable-planner  (Fable 5.2)  ── writes Animations/<ID>/planning/creative_plan.{md,json}
   ├── opus-animator  (Opus)       ── implements plan in Animations/<ID>/, renders v1 / v2 / fix
   ├── fable-reviewer (Fable 5.2)  ── watches a render's review pack, writes Animations/<ID>/review/fable_review_<n>.md
   └── tools: importer, plancheck (plan validation), qc.py (technical QC), make_pack.py (review packs)
```

- The **coordinator** selects work, launches agents, verifies their output and model, records every step in the database, integrates Library improvements one at a time, and reports briefly. It does not write plans or scene code itself.
- **Agents** are Claude Code subagents with independent contexts, defined in `.claude/agents/*.md` (`model: fable` for planner and reviewer, `model: opus` for the animator). Each returns a reply of 6-8 lines; everything substantial is written to files in the story folder.
- **Model routing is verified, never assumed.** Every subagent's transcript (`~/.claude/projects/<project>/<session>/subagents/agent-<id>.jsonl`) records the model of each reply. `prod.py accept-plan` refuses a plan unless the transcript shows only `claude-fable-5-2`. If Fable is unavailable, planning stops; it is never silently done by another model.
- Launching: in a session started after 2026-11-16 the agent types appear as `fable-planner`, `fable-reviewer`, `opus-animator`. In the session that created them they were not yet registered, so agents were launched as `general-purpose` with an explicit `model` (`fable` / `opus`) and told to follow the agent file; the transcript check is the same either way.

## 2. Inputs (authoritative)

| What | Where |
|---|---|
| Scripts (Arabic clean, Arabic with pauses, English), by story ID and paragraph | `Spreadsheets/Script_Updated.xlsx`, sheet `All Scripts` (index, audio cuts and rewrites in the other sheets) |
| Final narration | `Audio Files/Final Done/<ID>_..._full_slowed.mp3` (never modified, re-slowed or regenerated) |
| Word timings | `<mp3>.words.json` beside it (Whisper word timestamps of that exact recording; never re-transcribed) |
| Supporting | `<mp3>.assembly.json` elsewhere in `Audio Files/` when its hash matches; `Final Done/Word_Timing_Manifest.csv` |

`python3 tools/production/prod.py import` reads the workbook (standard-library reader, no extra packages), matches each story to exactly one final MP3 and its timing file, hashes all three, checks every timestamp lies inside the MP3, aligns the script words to the spoken words (Needleman-Wunsch on normalised Arabic), and flags: missing cells, paragraph-count mismatches, poor paragraph matches (< 60 %), runs of spoken words not in the script (a removed paragraph reintroduced, or audio older than the script), and the workbook's rewrite/manual-review notes. It writes per story:

```
Animations/<ID>/story.json                 title, font, script paths, narration path (../../Audio Files/Final Done/...)
Animations/<ID>/story/                     arabic.txt, arabic_pauses.txt, english.txt, script.json (derived, verbatim)
Animations/<ID>/planning/inputs/timeline.md/.json   every script word with its start/end on the MP3, paragraph spans, pauses
```

Import of 2026-11-16: 122 stories in the workbook; 5 approved films excluded (KD-001..004, KD-006); **117 eligible**, 111 clean and 6 with a timing-manifest warning (all timestamps re-verified in range). Script/narration word agreement 98.3-100 %; the four "Duration Rewrites" stories were verified to match their revised scripts.

## 3. Stages and the database

`production/production.db` (local, not in Git) is the production record. Tables: `stories` (inputs, checksums, input status, approval), `tasks` (stage, status, model, agent id, attempt, pid, times), `plans` (versions, checksums, Library revision, new assets, warnings), `renders` (versions, QC), `reviews`, `events` (log), `config` (limits and pauses). `prod.py export` writes `production/state.json` (in Git); `prod.py restore` rebuilds the database from it.

| Stage | Agent | Output | Accepted by |
|---|---|---|---|
| A plan | fable-planner | `planning/creative_plan.{md,json}` | `prod.py accept-plan` (model check + `plancheck.py`) writes `planning_metadata.json` |
| B animate | opus-animator | `Animations/<ID>/` source, `renders/<ID>_v1.mp4` | `qc.py --record v1` |
| C review | fable-reviewer | `review/fable_review_1.md` | coordinator reads verdict |
| D revise | opus-animator | `renders/<ID>_v2.mp4` | `qc.py --record v2` |
| E final QC | qc.py (+ optional fable review 2, at most one targeted `fix`) | `renders/<ID>_v3.mp4` if fixed | QC PASS, no BLOCKER |
| F finalise | coordinator | `MP4s/<Title> - Halftone Pop 9x16 - Noto Naskh Arabic.mp4` (copied, never overwriting) | story `approval=pending` ("Production Complete, Pending User Review") |

Limits (`prod.py config`): `max_fable 3`, `max_opus 2`, `max_render 1`, `max_validate 3`, `max_library 1`, `max_plan_attempts 3`, `max_revision_rounds 2`; pauses `pause_planning`, `pause_production`, `pause_render`. A story that still has major problems after its rounds is set to manual review and the coordinator moves on.

## 4. Creative plans

Schema and required sections: [production/schema/creative_plan.md](production/schema/creative_plan.md). Plans are small (8-30 KB) and self-contained, so an Opus animator can implement one without the planning conversation. `plancheck.py` verifies: every cue word is actually spoken within ±0.5 s of its time; actions sit within 1.5 s of their cue; scenes are contiguous from 0, cover every paragraph and end inside the end hold; ids are declared; enough actions (something changes every 1-2 s); effects only in pauses; no en/em dashes in lettering.

**Staleness:** `planning_metadata.json` stores the script, MP3 and timing checksums. `prod.py stale` lists plans whose inputs changed (after a re-import); `--mark` sets them stale so they are re-planned instead of used silently.

**Shared new assets:** `production/planned_assets.md` (regenerated after each accepted plan) lists every new character, set, prop and technique planned so far; planners reuse those names so one drawing serves many films. It is the shopping list for Library growth.

## 5. Running it (conversational)

Start a new Claude Code conversation in this folder (Opus as the main model) and say what you want; the coordinator should first run `python3 tools/production/prod.py status` and `prod.py running`. Typical requests and what the coordinator does:

| You say | Coordinator |
|---|---|
| "Show production progress." | `prod.py status`, summarised |
| "Plan the next 50 stories using Fable." | loops: `prod.py next plan --n <free slots>`, launches fable-planner agents (≤ `max_fable` at once), records `prod.py agent`, on each reply runs `accept-plan`, retries failures up to 3 attempts, `export` + `tools/backup.sh` every ~10 plans |
| "Produce the next 10 animations." | after the pilot passed: stages B-F per story, one heavy render at a time, planning/review agents in parallel |
| "Resume incomplete work." | `prod.py running`; for each running task checks whether its agent is still alive (task notification or transcript growing) and either waits, accepts finished files, or `prod.py release` and relaunches |
| "Pause rendering and continue planning." | `prod.py config pause_render 1` (and `pause_production 1`), continues planning |
| "What are the current agents doing?" | `prod.py running` plus the latest event per story |
| "Show me which stories need review." | `prod.py review-queue` |
| "What new capabilities were added to our library?" | `Library/Animation_Capabilities_Guide.md` history section, `production/planned_assets.md` |

## 6. Recovery

- **Coordinator conversation compacted or restarted:** nothing is lost; state is in the database and files. Run `prod.py status` and `prod.py running`.
- **Agent stopped or session closed mid-task:** its task stays `running`. If the plan files exist, `prod.py accept-plan <ID>` (it validates and verifies the model from the transcript). Otherwise `prod.py release <ID> plan` and claim again; attempts are counted.
- **Render interrupted:** renders record their pid in `tasks.pid`. Before relaunching, check `ps -p <pid>`; never start a duplicate of a live render. Frames folders are deleted only after `ffmpeg exit 0`.
- **Database lost:** `prod.py restore` from `production/state.json` (last backup), then `prod.py import` to refresh inputs.

## 7. Library updates

Animators never edit `Library/`; they write `Animations/<ID>/library_proposals.md`. The coordinator integrates approved proposals one at a time (`max_library 1`): add the drawing/helper with a header comment and `registry.js` entry, keep defaults backward compatible, run `node Library/tests/regression.mjs` (must be "all identical"), rebuild the catalogue, update `Library/Animation_Capabilities_Guide.md` (what, when, functions, example), then back up.

## 8. Backup

`tools/backup.sh "what changed"` after each planning batch and each finished stage. It refuses media (MP3/MP4/players), files over 10 MB and credentials. Git holds: coordinator code (`tools/production/`), agent definitions (`.claude/agents/`), plans and metadata, story inputs, `production/state.json`, `production/planned_assets.md`, story source code, reviews and QC JSON. Renders and the local database stay local.

## 9. Full-production pilot (2026-11-16): PASSED

| Story | A plan | B v1 (Opus) | C review 1 (Fable) | D v2 (Opus) | E review 2 / fix | F |
|---|---|---|---|---|---|---|
| KD-009 The Monkey and the Carpenter | 9 scenes, 160 actions | QC PASS (29 min) | REVISE, 12 notes | QC PASS, notes 1-3, 6-11 done | PASS WITH NOTES | `MP4s/`, pending your review |
| KD-012 The Hare and the Elephants | 11 scenes, 137 actions | QC PASS (31 min) | REVISE, 12 notes | QC PASS, 11 of 12 notes | REVISE (bend, exit) → one targeted fix v3, QC PASS, still-checked | `MP4s/`, pending your review |

Every stage's model was verified from the agent transcript (plans/reviews `claude-fable-5-2`, animation `claude-opus-5-5`); every render QC: H.264 1080x1920 30 fps, AAC 48 kHz, -15.0 LUFS, narration lag 0 ms (corr > 0.99), no black/frozen stretches. Renders ran one at a time under `production/render.lock`. The five approved films and their MP4s were not touched.

Lessons applied:
- Story code must not redefine engine globals (a story constant `MS` silently broke the engine's `MS`): prefix story constants.
- Plans that reuse "planned" assets need them built first. The shared human cast layer (`Library/cast/people.js`: 18 costume presets, age, child, sit/kneel/lie), `thoughtCloud` and `dayCycle`/`skyCycle` were integrated after the pilot (regression all identical). Before large batches, integrate the next most-requested assets from `production/planned_assets.md` (marketStreet, palaceHall, pond, desertRoad, hawk, rat, sheep, camel, iconBalloon, inset circle) with one Library agent at a time.
- Whisper word starts after a pause can include the silence; animators measure onsets for sharp hits.
- The second Fable review is worth running: it caught a fix that only partly landed (KD-012 bend) and a new staging error; the one allowed targeted fix closed both.
- Typical cost per film: about 1 planning agent, 2-3 Opus agent runs (v1, v2, optional fix), 2 Fable reviews, 2-3 full renders of 6-7 min.

## 10. Fable capacity and graceful stop (credit exhaustion)

There is no API in this setup that reports remaining Fable credit, so the coordinator never spends calls probing it. Exhaustion is detected from the agents themselves:
1. Every plan is validated and accepted the moment its agent reports (`prod.py accept-plan`), so finished work is never at risk.
2. When a planner ends without a valid plan, run `prod.py limit-scan <agent id>`: it reads the agent's last transcript records for API error messages mentioning a usage, rate or credit limit (e.g. "You've hit your 5-hour limit").
3. If it reports LIMIT: `prod.py interrupted <ID> plan "usage limit"` moves any partial plan files to `planning/partial/<time>/`, marks the task interrupted (not a failed attempt; the story stays eligible), and the coordinator sets `prod.py config pause_planning 1` so no new planners start. Planners already running are left to finish and are accepted normally.
4. A resumed planner may continue from `planning/partial/`. Incomplete or invalid plans are never accepted.
5. Fable is never replaced by Opus or any other model for planning or review; `accept-plan` refuses any plan whose transcript shows another model.
6. When planning stops, `prod.py status` and the queue give the report: validated plans, interrupted stories, and stories never started. To resume later: `prod.py config pause_planning 0`, then claim with `prod.py next plan`.

## 11. Length limit
A finished film is at most 3 minutes (180.0 s) including the THE END hold (CLAUDE.md, project skill, planner and animator instructions). `plancheck.py` rejects plans over 180 s and `qc.py` fails renders over 180.05 s. Six plans accepted before the rule (AN-043, AN-105, AN-108, AN-111, AN-114, AN-127) were capped by `tools/production/clamp3min.py` (end hold shortened, times after 180 s pulled to 179.9 s; recorded in each plan). Of the approved films, The Monkey and the Turtle runs 182.0 s (left untouched).

## Phase 2: v1-only Opus campaign (started 2026-11-16)

Goal: as many technically valid v1 animations as the remaining Opus usage allows. No Fable agents, no reviews, no v2, no finalising: v1 stays in `Animations/<ID>/renders/<ID>_v1.mp4` and `MP4s/` is not touched.

- Excluded (7): KD-001, KD-002, KD-003, KD-004, KD-006 (finished before the system) and KD-009, KD-012 (approved 2026-11-16). `prod.py next` skips approved and completed stories.
- Loop: `prod.py next animate --n K` → launch an `opus-animator` per story (background) → `prod.py agent ID animate AGENT` → on completion `prod.py done ID animate` (verifies Opus model + QC PASS, records the agent's tokens) → story shows **Initial Animation Complete - Awaiting Creative Review** on `prod.py board`. An agent reply `BLOCKED: ...` → `prod.py block ID animate "why"`; an agent stopped by a limit → `prod.py interrupted ID animate "why"` (resumable: its source stays in `Animations/<ID>/`).
- Limits: `max_opus 3` (agents), `max_render 1` (`production/render.lock`), `max_validate 3` (QC). Library changes are frozen during the campaign; proposals collect in each story's `library_proposals.md`.
- Budget: the app's `get_usage` gives the real account figure (weekly all-models %; there is no credit balance). The coordinator logs it with `prod.py meter PCT RESETS` at launches and completions; `prod.py budget` turns the readings into a measured %-per-v1 (before the first completion: a labelled 6% estimate), reserves active stories × cost × 1.25, and says how many new stories may start. New launches stop at `stop_new_at_pct` (95) or when the reserve does not fit; active stories are finished first. The budget is the current weekly window: after it resets, new launches wait for the owner (the new week is also Fable's).
- Resume in a new conversation: `prod.py board`, `prod.py running`, `prod.py budget`. A running task whose agent is gone: `prod.py release ID animate` and relaunch on the same folder (the agent continues from the existing source).

### Phase 2b: code-only implementation (switched 2026-11-16, owner's request)

Full renders are deferred. Agents implement and validate code only; nothing is rendered during the campaign (KD-005's render, already running at the switch, was allowed to finish; KD-007 had already rendered).

- Loop: `prod.py next implement --n K` → `opus-animator` with the brief in `production/implement_brief.md` (replace `<ID>`) → `prod.py agent ID implement AGENT` → when it reports, the coordinator reruns `python3 tools/production/implcheck.py ID` and then `prod.py done ID implement` (requires implcheck PASS + `render_job.json`; verifies Opus; records tokens).
- `implcheck.py` (no render): scene files and final MP3 resolve; subtitles verbatim word for word against `story/arabic.txt` / `english.txt`; chunk order; `build.py` builds the player; `smoke.mjs` loads it headless, reads `DURATION` (<= 180 s, end hold 1.0..6.5 s) and seeks 49 times across the film checking page errors and blank frames. Writes `qc/implcheck.json` and `render_job.json` (exact build/render/QC commands and an estimated render time).
- States (`prod.py board`): Ready for implementation; Implementation underway; Implementation complete - Awaiting render; Rendering; Rendered - Awaiting technical QC; Rendered - Awaiting creative review; Final approved; Blocked or interrupted (plus Not planned, Creative review stage, Final MP4 - Awaiting owner review).
- Deferred rendering (no model calls; Terminal or any automation with local file access), from the repository root:
  `python3 tools/production/render_queue.py --awaiting` (or list IDs; `--limit N`, `--workers 3`, `--dry`). One render at a time through `production/render.lock`; output `Animations/<ID>/renders/<ID>_v1.mp4` (never `MP4s/`); frames in `scratch/render-queue/<ID>/frames`, deleted only after `ffmpeg exit 0`; then `qc.py --record v1`; each result is a `render` task in the database; failures are recorded and the queue continues; Ctrl-C marks the story interrupted and a rerun resumes (passed stories skipped, unfinished MP4 moved to `renders/_partial/`). A successful render moves the story to "Rendered - Awaiting creative review".
- Concurrency: `max_opus 4` while KD-005's original agent waits for its render (it uses no model while waiting); 3 implementation agents.

### Render queue test (2026-11-17)
`render_queue.py KD-008` rendered in 9.5 min (implcheck estimate 6.7 min) with no model calls; QC PASS identical in form to the agents' direct renders of KD-005/KD-007: H.264 High 1080x1920 30 fps yuv420p bt709 tv range, AAC LC 48 kHz stereo ~191 kb/s, -15.0 LUFS, sync lag 0 ms (corr 0.999), end hold 4.01 s, no black or frozen frames. Frames deleted after `ffmpeg exit 0`; `MP4s/` untouched; database `render` task done; story moved to "Rendered - Awaiting creative review"; a rerun skips it. The remaining stories can be rendered from Terminal: `python3 tools/production/render_queue.py --awaiting` (about 9-10 min each).

## English subtitle audit (2026-11-17)
The supplied English in Script_Updated.xlsx is often a condensed summary that omits details or sits under the wrong Arabic chunk. For the 43 films with a v1 animation, every subtitle chunk was re-translated against the Arabic chunk above it (`tools/production/translations.py`; audits in `production/translations/<ID>.json`; all 1,299 chunks with before/after in `production/translations/english_corrections.csv`). 636 chunks were corrected (KD stories were mostly faithful: 0-5 per film; AN stories 2-31 per film). The Arabic and timings are unchanged; the workbook is not modified.
- Applied to `chunks_en.txt`, `story/english.txt` and `timing.json` 'en'; originals kept in each story's `_english_v0/`. All 43 pass implcheck, which now also checks that every caption fits the panel (English >= 30 px within 150 px).
- 38 v1 renders made with the old English are marked SUPERSEDED and show as "Awaiting render (re-render: English subtitles corrected)"; `render_queue.py --awaiting` re-renders them and moves the old MP4 to `renders/_superseded/`. KD-005 and KD-010 needed no change.
- KD-009 and KD-012 (approved, in MP4s/) got one corrected chunk each in their source; their approved MP4s are untouched and they are not re-rendered automatically. Their approved players, rebuilt from the original English, are in `_approved_player/`.
- Follow-ups (owner, 2026-11-17): KD-022 P7 and AN-151 P1/P8 Arabic re-chunked at phrase boundaries (same words; align.py rerun; all other chunk times and every word time unchanged; English follows the new chunks). KD-019 P1 "طائر كبير" kept as "large bird": the next chunk says he later grew old (لكنه كبر), so here كبير means large.
- Render failures fixed (2026-11-17): KD-026 and AN-104 inset ring radius went negative while the circle was tiny; AN-112 drew a guard's scroll for 0.3 s after the guard left. implcheck now also seeks every frame (`tools/production/scan.mjs`), which would have caught all three.
