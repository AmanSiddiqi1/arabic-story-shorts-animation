# Creative plan schema (`creative_plan/1`)

Every story's plan lives in `Animations/<ID>/planning/`:

| File | Written by | Purpose |
|---|---|---|
| `inputs/timeline.md`, `inputs/timeline.json` | importer | script paragraphs with every word's start/end on the final MP3, pauses, checksums |
| `creative_plan.md` | Fable planner | human-readable creative direction |
| `creative_plan.json` | Fable planner | machine-readable storyboard (this schema) |
| `validation.json` | `prod.py validate` | automatic checks (errors block, warnings do not) |
| `planning_metadata.json` | `prod.py accept` | checksums, verified model, date, Library revision, status |

All times are **seconds on the final MP3** (`Audio Files/Final Done/<ID>_..._full_slowed.mp3`). The film runs from 0 to
`duration + end_hold` (THE END is held after the last word).

## `creative_plan.json`

```jsonc
{
  "schema": "creative_plan/1",
  "story_id": "AN-090",
  "title": "The Sweep and the Noble Lady",
  "duration": 167.32,            // = timeline.json duration (MP3 length)
  "end_hold": 3.0,               // 1.5..6 s of THE END after the audio; duration + end_hold <= 180.0 (3-minute limit)
  "logline": "...", "moral": "...", "tone": "...",
  "beats": [                      // the story's spine
    {"id": "B1", "t": 3.78, "kind": "setup|inciting|rising|turn|surprise|climax|resolution|moral|comic|suspense|emotion|reveal",
     "cue": {"word": "الكعبة", "t": 3.78}, "summary": "..."}
  ],
  "cast":  [{"id": "sweep", "name": "the sweep", "library": "person", "base": "person kind:'owner' recoloured", "look": "...", "new": false}],
  "sets":  [{"id": "kaaba", "library": null, "description": "...", "new": true}],
  "props": [{"id": "purse", "library": null, "description": "...", "new": true}],
  "scenes": [{
    "id": "S1", "start": 0.0, "end": 13.0,          // contiguous: each scene starts where the previous ended
    "paragraphs": [1],                               // script paragraph numbers shown (all must be covered)
    "set": "kaaba", "cast": ["sweep"],
    "summary": "...",
    "camera": {"shot": "wide|medium|close|extreme-close|two-shot|over-shoulder|insert|establishing|full",
               "move": "static|push-in|pull-out|pan|tilt|track|shake|whip|zoom|drift|crane", "notes": "..."},
    "composition": "placement in the 972x1196 panel, eye lines, depth",
    "actions": [
      {"t": 3.6, "end": 4.4, "cue": {"word": "الكعبة", "t": 3.78}, "who": "sweep",
       "action": "raises both hands to pray", "acting": "eyes up (gaze [0,-1]), hopeful brows, slight lean forward (tip 0.08)",
       "library": "person {kind:'owner', aL, aR} + anticipate()"}
    ],
    "lettering": [{"t": 9.2, "text": "OH NO!"}],     // short English comic words; no en/em dashes
    "sfx": [{"t": 12.2, "kind": "whoosh"}],         // only in pauses, never inside a spoken word
    "transition_out": {"type": "cut|wipe|iris|later|zoom|match-cut|dissolve|whip|page-turn|none", "t": 13.0, "label": "LATER..."}
  }],
  "ending": {"t": 165.0, "description": "..."},
  "subtitles": [                  // subtitle chunks per paragraph: the VERBATIM script text with '|' between 2-4 chunks,
    {"p": 1, "ar": "...|...|...", "en": "...|...|..."}   // same chunk count in Arabic and English; break at natural phrases
  ],
  "new_assets": [{"type": "character|pose|expression|set|prop|effect|motion|camera", "name": "...", "description": "...",
                  "reusable": true, "effort": "S|M|L", "implementation": "how to draw/animate it with kit.js primitives"}],
  "owner_questions": ["choices the owner should confirm, each with the default used"],
  "implementation_notes": ["..."],
  "warnings": ["..."]
}
```

Rules checked by `tools/production/plancheck.py`:
- every `cue.word` must be spoken within ±0.5 s of `cue.t` (checked against the word timings); an action's `t` within 1.5 s of its cue;
- scenes contiguous from 0, covering every paragraph, ending between the last word and `duration + end_hold`;
- `cast`, `sets`, `props` ids declared before use; library names that are not Library functions are flagged;
- at least one action per scene and enough actions overall (something changes every 1-2 s);
- `subtitles`: every paragraph, verbatim text (words identical to `story/script.json`), 2-4 chunks, same count both languages;
- `sfx` never inside a spoken word; no en/em dashes in lettering; a `later` transition is expected when time passes.

## `creative_plan.md` sections
1. Narrative breakdown (beats, conflict, surprises, emotional arc, ending, moral)
2. Scene-by-scene storyboard (times, what is on screen, key actions tied to spoken words)
3. Character acting (poses, eye lines, expressions, anticipation, follow-through, secondary motion)
4. Camera and composition
5. Storytelling opportunities (humour, suspense, surprise, emotion)
6. Asset requirements (reuse, new poses, new characters, sets, props, motion techniques)
7. Implementation notes for Opus (Library functions and pose fields, timing helpers)
8. Warnings and open questions
