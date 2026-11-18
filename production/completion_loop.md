# Completion loop (started 2026-11-17)

Owner request: finish the existing Fable-Opus four-stage loop for every story that already has an implemented animation, using the public GitHub Actions render pipeline. No new animations; no public Release without the owner's approval.

Scope: `production/eligibility_manifest.json` (fixed): 41 stories in the loop, plus KD-009 / KD-012 (owner-approved before the 2026-11-17 English subtitle audit; subtitle-refresh render only, low priority). `prod.py config only_ids` is set to the 41 so `prod.py next` cannot reach other stories.

## Stages per story (all recorded in production.db; `prod.py export` -> state.json)
1. v1 cloud render: `cloud.py submit ... --version v1` -> `fetch RUN --purge` (renders table: v1 PASS, `cloud_run` in qc). All local v1 MP4s older than the subtitle audit were moved to `Animations/<ID>/renders/_superseded/*.pre-subtitle-audit.*.mp4`.
2. Fable review 1: `make_pack.py renders/<ID>_v1.mp4 timing.json review/v1_pack` -> `prod.py next review --ids <ID>` -> fable-reviewer agent -> `prod.py agent <ID> review <agent>` -> `prod.py done <ID> review` (verifies the Fable model from the transcript; records the verdict).
3. If REVISE: `prod.py next revise --ids <ID>` -> opus-animator implements `review/fable_review_1.md` WITHOUT a full render (stills + implcheck only; change log `review/revision_1.md`) -> commit, push, `sync_public.py --push` -> `cloud.py submit <IDs> --version v2` -> fetch -> `prod.py done <ID> revise`.
   If PASS / PASS WITH NOTES with nothing substantive: no v2; v1 is the final candidate.
4. Second review (review2 of v2, pack `review/v2_pack`) only when review 1 found major problems / v2 is large new staging / the reviewer's "Second review advice" says yes. REVISE -> one targeted `fix` -> v3 cloud render. Nothing beyond v3: remaining problems are flagged for the owner (`prod.py block <ID> fix "..."`).
5. Final candidate -> `prod.py finalize <ID>` (copies to MP4s/, approval=pending). Publishing a Release asset needs the owner's separate approval.

## Resume after an interruption
```
python3 tools/production/prod.py board          # state per story
python3 tools/production/prod.py running        # review/revise tasks claimed; agent ids recorded
python3 tools/cloud/cloud.py list               # runs still going / finished but not fetched
```
- A running review/revise task whose agent is gone: `prod.py release <ID> <stage>` and launch it again.
- A finished run not yet fetched: `cloud.py fetch <run> --purge`.
- Network errors stop agents ("ENOTFOUND"): resume the same agent (SendMessage) or release and relaunch.
- max_opus raised (6, then 9) in this loop: revise tasks stay 'running' until their cloud v2 is fetched, with no agent alive; actual Opus agents are still kept to 3 at a time.
- Owner attention (subtitle text, not changed by the loop): KD-015 English at 127.08 s omits 'in the air' (Fable review 1).
- sync_public.py / make_public.py / cloud.py submit need a fully clean tracked tree, so Opus revisions run in waves of up to 3; commit, push, sync and submit only between waves (when no Opus agent is editing).
- Owner attention (subtitle text): AN-001 English at 161.12-166.86 drops 'with him', 'he' ambiguous (Fable review 1).
- Owner attention (subtitle text): AN-014 stray comma in English at 28.65; AN-040 English mixes 'it'/'he' for the animals (Fable review 1).
- Owner attention: KD-015 v3 (last round) - check one-goat/cow layout 54-63 s, narrow stick-to-jar gap 128-130 s, point at 30.6-32.9 s.
- Owner attention: AN-001 v2 160.7-161.4 s the bull passes through the post/troughs/donkey for ~0.7 s (Fable round 2 polish note A; PASS WITH NOTES, no v3).
- Owner attention: KD-026 v3 - peg moved off the corner (weakens 'tied in a corner'), thief's legs hidden in the double reach, neighbours cut by left edge ~1 s as they leave.
- Owner attention: KD-019 v3 - fish audience rows slightly overlapping tails; pincers now a raised V; bird jumps 60 units at the 5.78 s cut.
