#!/usr/bin/env python3
"""Word-timed transcription of a narration (OPTIONAL module; only needed to sync subtitles/scenes to speech).

usage: python3 transcribe.py narration.mp3 [--lang ar] [--model small] [--out whisper.json]

Requires faster-whisper (not installed by this skill, and no model is bundled): see README.md. The model downloads once into the
Hugging Face cache on first use. Use a MULTILINGUAL model ('small', 'medium'), not an '.en' model, for non-English audio.
Output: a list of segments {a, b, t, w:[{a, b, t}]} with word times in seconds.
"""
import argparse, json, sys
ap = argparse.ArgumentParser(); ap.add_argument('audio'); ap.add_argument('--lang', default=None); ap.add_argument('--model', default='small'); ap.add_argument('--out', default='whisper.json')
a = ap.parse_args()
try: from faster_whisper import WhisperModel
except ImportError: sys.exit('faster-whisper is not installed. Create a venv and install it first (see modules/narration-sync/README.md). Nothing was downloaded.')
m = WhisperModel(a.model, device='cpu', compute_type='int8')
segs, info = m.transcribe(a.audio, language=a.lang, word_timestamps=True, vad_filter=False, condition_on_previous_text=False)
out = []
for s in segs:
    out.append(dict(a=s.start, b=s.end, t=s.text, w=[dict(a=w.start, b=w.end, t=w.word) for w in s.words])); print(round(s.start, 2), round(s.end, 2), s.text, flush=True)
json.dump(out, open(a.out, 'w', encoding='utf8'), ensure_ascii=False, indent=1); print('wrote', a.out)
