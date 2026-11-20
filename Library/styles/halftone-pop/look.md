# Halftone Pop Panel (Print family, Creator OS Motion Style Atlas)

The house style of Arabic Story Shorts so far (every film up to 2026-11 uses it).

## The look
- A blown-up Lichtenstein comic panel: paper gutter, fat tapering black brush borders, blue Ben-Day dots, flat process yellow, red dot shading, Bangers lettering, aged-newsprint finish with a slipped cyan plate.
- Palette: paper `#fbf2da`, black `#141414`, yellow `#ffd21f`, red `#e2231a`, blue `#1d5bd0`, skin `#f05a5a`, white `#fffaf0` (plus the derived tones in `theme.js`: greens, sand, water, animal colours).
- Characters: blocky comic figures with brush outlines (`ink`) and Ben-Day dot shading (`dotPat`, `shape(..., { dot })`).
- Lettering: Bangers for comic words (HA HA!, PECK!, BOING!), speech balloons and the English subtitle line (blue).
- Page: blue dot gutter (`S.background(..., THEME.page)`), story panel framed by a fat brush box filled blue (`THEME.panel`); caption panel white with a brush border.

## Engine
`styles/halftone-pop.js` from claude-motion-faceless-skills (unchanged). Its primitives: `title` (slammed words), `label` (caption box), `arrow`, `box`, `counter`, `emphasis` (burst with a word), `transition` (MEANWHILE caption wipe), `finish` (newsprint finish, last every frame).

## Workflow guide
The project skill `/halftone-pop-shorts` (`.claude/skills/halftone-pop/SKILL.md`) holds the detailed Halftone working notes.

## What a reviewer checks for this style
- Outlines are bold black brush, never thin vector lines; fills are flat process colours with dot shading, never gradients.
- Comic words are short, in Bangers, outlined; no em or en dashes.
- The newsprint finish is present on every frame (`S.finish` called last).
- Phone legibility: headlines >= 44 px, labels >= 28 px at 1280x720 scale.
