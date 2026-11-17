# Narration sync (optional module)

Only needed when scenes or subtitles must follow a spoken recording. Nothing here installs anything or downloads a model unless you run it.

1. **Environment (once).** Use a venv; the Kalila films used Python 3.9 with `faster-whisper==1.2.1` (`ctranslate2 4.8.5`, `av 15.1.0`, `huggingface_hub 1.8.0`, `onnxruntime 1.19.2`, `tokenizers 0.22.2`, `numpy 2.0.2`). Installing took about 5 minutes (some wheels compile with an old pip).
   `python3 -m venv ~/venvs/fw && ~/venvs/fw/bin/pip install faster-whisper`
2. **Model.** `Systran/faster-whisper-small` (multilingual; about 0.5 GB) downloads into the shared Hugging Face cache on first run. Do NOT use `small.en` for Arabic or other languages. No model is bundled with the skill.
3. **Transcribe:** `~/venvs/fw/bin/python transcribe.py narration.mp3 --lang ar --out whisper.json` (settings: CPU, int8, `word_timestamps=True`, `condition_on_previous_text=False`).
4. **Align:** copy your script, insert `|` where subtitle chunks should break (2 to 4 per paragraph, a sentence or phrase each, up to about 11 words), then
   `python3 align.py --orig script.txt --marked script.marked.txt --orig2 translation.txt --marked2 translation.marked.txt --whisper whisper.json --lang ar --keys ar,en --out timing.json`
   The displayed text is always rebuilt from the original script words, so it stays verbatim. For the Arabic preset use `--keys ar,en`.
5. **Check and refine.** Read the printed chunk times. Recognition can drift; `ffmpeg -i narration.mp3 -af silencedetect=noise=-35dB:d=0.2 -f null -` gives exact speech onsets (the seven "Shulam" hits in the Thief film were set this way). Hand-edit `timing.json` where needed.
6. **If the recording is replaced later:** re-transcribe, re-align, then re-time scenes (see `warp.js`). If the new audio is missing a paragraph, say so rather than inventing narration or timings.

Chunks in `timing.json` look like `{"a": 6.76, "b": 12.94, "ar": "...", "en": "..."}`; the Halftone Pop subtitle component reads `TIMING.chunks` (key names set by the preset's `fields`).
