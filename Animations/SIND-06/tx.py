import json,sys,pathlib
H=pathlib.Path(__file__).resolve().parent; sys.path.insert(0,str(next(p/'Library' for p in H.parents if (p/'Library'/'media.py').exists()))); import media
NAR=str(media.resolve(H/json.load(open(H/'story.json',encoding='utf8')).get('narration','narration.mp3')))  # local narration by default (media.config.json)
from faster_whisper import WhisperModel
m=WhisperModel("small",device="cpu",compute_type="int8")
segs,info=m.transcribe(NAR,language="ar",word_timestamps=True,vad_filter=False,condition_on_previous_text=False)
out=[]
for s in segs:
    out.append(dict(a=s.start,b=s.end,t=s.text,w=[dict(a=w.start,b=w.end,t=w.word) for w in s.words]))
    print(round(s.start,2),round(s.end,2),s.text,flush=True)
json.dump(out,open(H/"whisper.json","w"),ensure_ascii=False,indent=1)
