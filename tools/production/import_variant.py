#!/usr/bin/env python3
"""Import one story into one or more style variants (the same script and narration, a different visual style each).
  python3 tools/production/import_variant.py Spreadsheets/<ID>.script.json <mp3 in Audio Files/Final Done> VARIANT_ID=style [VARIANT_ID=style ...] [--dry]
  e.g. ... Spreadsheets/ALI-01.script.json ALI-01_Open_Sesame_slowed.mp3 ALI-01-POPUP=paper-popup ALI-01-ANIME=cel-anime-80s

The script JSON holds {id, title_en, title_ar, collection, source, paragraphs: [{n, segment, ar, ar_pauses, en}]} (for example
saved from the Google Sheet; "ar" is the clean Arabic without pause marks). The MP3 and its <mp3>.words.json must be in
Audio Files/Final Done/ (never modified). For each variant this writes, like importer.py does for workbook stories:
Animations/<VARIANT>/story/{arabic,arabic_pauses,english}.txt + script.json, planning/inputs/timeline.{json,md},
whisper.json (= the supplied word timings, read by align.py), story.json (title, style, narration) and the production.db
row (eligible, same mp3/words checksums for every variant). Existing story.json files are kept."""
import hashlib, json, pathlib, shutil, sys
sys.path.insert(0, str(pathlib.Path(__file__).parent))
import db, importer
sys.path.insert(0, str(db.REPO / 'Library')); import style

def main(argv):
    dry = '--dry' in argv; argv = [a for a in argv if a != '--dry']
    if len(argv) < 3: sys.exit(__doc__)
    s = json.loads(pathlib.Path(argv[0]).read_text(encoding='utf8')); mp3 = importer.media.resolve(importer.FINAL / argv[1]); wj = importer.FINAL / (argv[1] + '.words.json')   # MP3 in the media folder, timings in Git
    if not mp3.exists() or not wj.exists(): sys.exit(f'{mp3.name} and its .words.json must be in Audio Files/Final Done/')
    variants = [a.split('=', 1) for a in argv[2:]]
    for vid, st in variants:
        if not st in style.available(): sys.exit(f'unknown style {st}; profiles: {", ".join(style.available())}')
    s['paragraphs'].sort(key=lambda p: p['n'])
    for p in s['paragraphs']:
        for k in ('ar', 'en'):
            if not p.get(k): sys.exit(f"P{p['n']} has no {k}")
            if '[pause]' in p[k]: sys.exit(f"P{p['n']} {k} still has pause marks: use the clean Arabic")
    dur = importer.duration(mp3); a = importer.analyse(s, mp3, wj, dur)
    script_sha = hashlib.sha256(json.dumps(s['paragraphs'], ensure_ascii=False, sort_keys=True).encode()).hexdigest()
    print(f"{s['id']}: {len(s['paragraphs'])} paragraphs, narration {dur:.2f} s, script/narration word match {a['match_ratio']:.0%} (lowest paragraph {min(p['ratio'] for p in a['paragraphs']):.0%})")
    for i in a['issues']: print('  issue:', i)
    for x in a['extra_runs']: print(f"  narration {x['from']:.1f}-{x['to']:.1f} s has {x['n']} words not in the script")
    status = 'blocked' if a['issues'] or a['match_ratio'] < 0.75 or min(p['ratio'] for p in a['paragraphs']) < 0.6 else 'ok' if a['match_ratio'] >= 0.85 else 'warn'
    if dry: print('dry run: status', status); return
    c = db.connect()
    for vid, st in variants:
        d = db.REPO / 'Animations' / vid; (d / 'story').mkdir(parents=True, exist_ok=True); (d / 'planning' / 'inputs').mkdir(parents=True, exist_ok=True)
        (d / 'story' / 'arabic.txt').write_text('\n\n'.join(p['ar'] for p in s['paragraphs']) + '\n', encoding='utf8')
        (d / 'story' / 'arabic_pauses.txt').write_text('\n\n'.join(p.get('ar_pauses', '') for p in s['paragraphs']) + '\n', encoding='utf8')
        (d / 'story' / 'english.txt').write_text('\n\n'.join(p['en'] for p in s['paragraphs']) + '\n', encoding='utf8')
        (d / 'story' / 'script.json').write_text(json.dumps({'id': vid, 'story': s['id'], 'style': st, 'title_en': s['title_en'], 'title_ar': s['title_ar'],
            'collection': s['collection'], 'source': s.get('source'), 'script_sha256': script_sha, 'paragraphs': s['paragraphs']}, ensure_ascii=False, indent=1) + '\n', encoding='utf8')
        tl = {'id': vid, 'mp3': f'Audio Files/Final Done/{mp3.name}', 'mp3_sha256': importer.sha(mp3), 'words_sha256': importer.sha(wj), 'script_sha256': script_sha, 'duration': round(dur, 3), **a}
        (d / 'planning' / 'inputs' / 'timeline.json').write_text(json.dumps(tl, ensure_ascii=False) + '\n', encoding='utf8')
        (d / 'planning' / 'inputs' / 'timeline.md').write_text(importer.timeline_md({**s, 'id': vid}, a, mp3.name, dur) + '\n', encoding='utf8')
        shutil.copyfile(wj, d / 'whisper.json')
        sj = d / 'story.json'
        if not sj.exists():
            sj.write_text(json.dumps({'id': vid, 'title': s['title_en'], 'style': st, 'arabicScript': 'story/arabic.txt', 'englishScript': 'story/english.txt',
                'narration': f'../../Audio Files/Final Done/{mp3.name}', 'subtitle': 'library', 'scenes': []}, ensure_ascii=False, indent=1) + '\n', encoding='utf8')
        row = dict(id=vid, title_en=s['title_en'], title_ar=s['title_ar'], collection=s['collection'], n_paragraphs=len(s['paragraphs']),
                   segments=json.dumps([p['segment'] for p in s['paragraphs']]), script_sha=script_sha, mp3_file=mp3.name, mp3_sha=tl['mp3_sha256'],
                   mp3_duration=round(dur, 3), words_file=wj.name, words_sha=tl['words_sha256'], words_status='supplied', match_ratio=a['match_ratio'],
                   para_min_ratio=min(p['ratio'] for p in a['paragraphs']), input_status=status,
                   input_notes=f"style variant of {s['id']} ({st}); script from {s.get('source')}", eligible=1, completed_before=0, folder=f'Animations/{vid}', updated=db.now())
        cols = list(row)
        c.execute(f"INSERT INTO stories ({','.join(cols)}) VALUES ({','.join('?' * len(cols))}) ON CONFLICT(id) DO UPDATE SET "
                  + ','.join(f'{k}=excluded.{k}' for k in cols if k != 'id'), [row[k] for k in cols])
        print(f'  {vid}: {st}, Animations/{vid}/, input {status}')
    c.commit(); db.log(c, None, 'import', f"{s['id']} variants: " + ', '.join(v for v, _ in variants))

if __name__ == '__main__':
    main(sys.argv[1:])
