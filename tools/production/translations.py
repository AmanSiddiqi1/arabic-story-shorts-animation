#!/usr/bin/env python3
"""English subtitle audit: faithful English per Arabic subtitle chunk.
  python3 tools/production/translations.py prep ID...     write production/translations/input/<ID>.json (Arabic chunk + current English)
  python3 tools/production/translations.py check ID...    validate production/translations/<ID>.json (the auditor's output)
  python3 tools/production/translations.py apply ID...    apply a valid audit: chunks_en.txt, story/english.txt, timing.json 'en' (times
                                                          unchanged), keep the old files in Animations/<ID>/_english_v0/, mark a v1
                                                          render made with the old English as SUPERSEDED (re-render needed)
  python3 tools/production/translations.py csv           production/translations/english_corrections.csv (all audited stories)
Audit file format: {"story": ID, "paragraphs": [{"p": 1, "chunks": [{"c": 1, "ar": ..., "en_old": ..., "en_new": ..., "verdict":
"ok"|"fixed", "note": ...}]}]}. The Arabic is never changed. The workbook (Script_Updated.xlsx) is not modified."""
import csv, json, pathlib, re, shutil, sys
sys.path.insert(0, str(pathlib.Path(__file__).parent))
import db

REPO = db.REPO; T = REPO / 'production' / 'translations'

def lines(p): return [l.strip() for l in p.read_text(encoding='utf8').split('\n') if l.strip()]

def prep(sid):
    d = REPO / 'Animations' / sid; A = lines(d / 'chunks_ar.txt'); E = lines(d / 'chunks_en.txt')
    out = {'story': sid, 'paragraphs': []}
    for i, (a, e) in enumerate(zip(A, E)):
        ac, ec = a.split('|'), e.split('|'); assert len(ac) == len(ec), (sid, i)
        out['paragraphs'].append({'p': i + 1, 'chunks': [{'c': j + 1, 'ar': x.strip(), 'en_old': y.strip()} for j, (x, y) in enumerate(zip(ac, ec))]})
    (T / 'input').mkdir(parents=True, exist_ok=True)
    (T / 'input' / f'{sid}.json').write_text(json.dumps(out, ensure_ascii=False, indent=1) + '\n', encoding='utf8')

def check(sid):
    E = []; f = T / f'{sid}.json'
    if not f.exists(): return [f'{f.name} missing'], None
    R = json.loads(f.read_text(encoding='utf8')); I = json.loads((T / 'input' / f'{sid}.json').read_text(encoding='utf8'))
    if len(R['paragraphs']) != len(I['paragraphs']): return ['paragraph count differs'], R
    for P, Q in zip(R['paragraphs'], I['paragraphs']):
        if len(P['chunks']) != len(Q['chunks']): E.append(f"p{Q['p']}: chunk count {len(P['chunks'])} != {len(Q['chunks'])}"); continue
        for x, y in zip(P['chunks'], Q['chunks']):
            n = (x.get('en_new') or '').strip(); tag = f"p{Q['p']} c{y['c']}"
            if x.get('ar', '').strip() != y['ar']: E.append(f'{tag}: Arabic text changed')
            if not n: E.append(f'{tag}: en_new empty')
            if re.search('[–—|]', n): E.append(f'{tag}: dash or | in en_new')
            if re.search('[؀-ۿ]', n): E.append(f'{tag}: Arabic letters in en_new')
            if len(n) > 230: E.append(f'{tag}: en_new {len(n)} chars (too long for the caption panel)')
            if x.get('verdict') not in ('ok', 'fixed'): E.append(f'{tag}: verdict must be ok or fixed')
    return E, R

def apply(sid):
    E, R = check(sid)
    if E: sys.exit(f'{sid}: audit invalid: {E[:5]}')
    d = REPO / 'Animations' / sid; bak = d / '_english_v0'
    if not bak.exists():
        bak.mkdir(); [shutil.copy2(d / f, bak / pathlib.Path(f).name) for f in ('chunks_en.txt', 'story/english.txt', 'timing.json')]
    curly = any(ch in x['en_old'] for P in R['paragraphs'] for x in P['chunks'] for ch in '\u201c\u201d\u2019')
    def para(chunks):   # match the story's quote style in corrected chunks; quote state runs across the whole paragraph
        out, open_ = [], False
        for x in chunks:
            txt, fixed = x['en_new'].strip(), x['verdict'] == 'fixed'
            if fixed and curly: txt = re.sub(r"(?<=\w)'(?=\w)|(?<=s)'(?=\s|$)", '\u2019', txt)
            res = []
            for ch in txt:
                if ch == '"' and fixed and curly: ch = '\u201d' if open_ else '\u201c'
                if ch in '"\u201c\u201d': open_ = (ch == '\u201c') if ch != '"' else not open_
                res.append(ch)
            out.append(''.join(res))
        return out
    new = [para(P['chunks']) for P in R['paragraphs']]
    (d / 'chunks_en.txt').write_text('\n'.join('|'.join(p) for p in new) + '\n', encoding='utf8')
    (d / 'story' / 'english.txt').write_text('\n\n'.join(' '.join(p) for p in new) + '\n', encoding='utf8')
    tj = json.loads((d / 'timing.json').read_text(encoding='utf8'))
    for ch in tj['chunks']: ch['en'] = new[ch['p']][ch['c']]
    (d / 'timing.json').write_text(json.dumps(tj, ensure_ascii=False, separators=(',', ':')), encoding='utf8')
    c = db.connect(); n = sum(1 for P in R['paragraphs'] for x in P['chunks'] if x['verdict'] == 'fixed')
    if c.execute("SELECT 1 FROM renders WHERE story_id=? AND version='v1' AND status='PASS'", (sid,)).fetchone():
        if n: c.execute("UPDATE renders SET status='SUPERSEDED' WHERE story_id=? AND version='v1'", (sid,))
    c.commit(); db.log(c, sid, 'english', f'subtitle English audited: {n} chunk(s) corrected')
    print(f'{sid}: applied, {n} of {sum(len(P["chunks"]) for P in R["paragraphs"])} chunks corrected')

def write_csv():
    rows = [['story', 'paragraph', 'chunk', 'arabic', 'english_before', 'english_after', 'verdict', 'note']]
    for f in sorted(T.glob('*.json')):
        R = json.loads(f.read_text(encoding='utf8'))
        for P in R['paragraphs']:
            for x in P['chunks']: rows.append([R['story'], P['p'], x['c'], x['ar'], x['en_old'], x['en_new'], x['verdict'], x.get('note', '')])
    with open(T / 'english_corrections.csv', 'w', newline='', encoding='utf-8-sig') as fh: csv.writer(fh).writerows(rows)
    print(T / 'english_corrections.csv', len(rows) - 1, 'chunks')

if __name__ == '__main__':
    cmd, ids = sys.argv[1], sys.argv[2:]
    if cmd == 'csv': write_csv()
    for s in ids:
        if cmd == 'prep': prep(s)
        elif cmd == 'check':
            E, _ = check(s); print(s, 'OK' if not E else f'{len(E)} problem(s): {E[:4]}')
        elif cmd == 'apply': apply(s)
