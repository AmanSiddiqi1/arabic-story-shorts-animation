# Transcription workflow (how the subtitle timings were made)

Each story's `timing.json` (subtitle chunks with start/end times) is built from the narration in three steps. The temporary venv that was used is NOT preserved; this file is the recipe to recreate it.

1. **Environment** (about 5 minutes; `pip` 21 on system Python 3.9 compiles some wheels):
   ```sh
   /usr/bin/python3 -m venv ~/venvs/fw
   ~/venvs/fw/bin/pip install -r tools/transcription/requirements.txt   # or: pip install faster-whisper==1.2.1
   ```
2. **Model:** Hugging Face `Systran/faster-whisper-small` (multilingual, NOT `small.en`, which cannot read Arabic). It downloads on first use into the shared cache `~/.cache/huggingface` (about 0.5 GB; that cache was left untouched and was not copied).
3. **Transcribe:** run `tx.py` from a story's animation folder `Animations/<story>/` (it reads `narration.mp3` next to it and writes `whisper.json` there):
   ```sh
   cd Animations/<story> && ~/venvs/fw/bin/python ../../tools/transcription/tx.py
   ```
   Settings: `WhisperModel("small", device="cpu", compute_type="int8")`, `language="ar"`, `word_timestamps=True`, `vad_filter=False`, `condition_on_previous_text=False`.
4. **Align:** `align.py` (one per story, with that story's hand-marked chunk table) matches the script's words to the recognised words (Needleman-Wunsch on diacritic-stripped Arabic) and writes `timing.json`. The chunk table uses `|` to mark subtitle chunks; the text is rebuilt from the original script word by word so it stays verbatim.
5. **Refinements used:** `ffmpeg -af silencedetect=noise=-35dB:d=0.2` onsets override the recognised times where they were more exact (for example the seven Shulams in the Thief story).

Workarounds worth knowing:
- Do not trust the recognised *text*, only the word times; the script text is always the original.
- If a recording changes, re-transcribe and re-time; a different version of the audio shifts every later scene.
- `ptest.mjs` (in `tools/`) is a small headless test of a player's Play, scrub, loop and Pause behaviour (it needs its URL edited to the player file).
- Rendering lesson: do not delete the frames folder until ffmpeg has printed "ffmpeg exit"; deleting it early truncated the first Lark render.
