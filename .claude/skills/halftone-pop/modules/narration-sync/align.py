#!/usr/bin/env python3
"""Turn a script + word-timed transcription into subtitle chunks with start/end times (timing.json).  OPTIONAL module.

usage: python3 align.py --orig script.txt --marked script.marked.txt [--orig2 translation.txt --marked2 translation.marked.txt]
                        --whisper whisper.json [--lang ar] [--keys ar,en] [--out timing.json] [--duration 180.9]

* script.txt          the supplied text, paragraphs separated by blank lines. It is the ONLY source of the displayed words.
* script.marked.txt   the same words with '|' inserted where a subtitle chunk should break (a copy you edit by hand). Only the word COUNT of each
                      chunk is used; the displayed text is rebuilt from script.txt, so it stays verbatim even if the marked copy was retyped.
* the optional second language works the same way and must have the same number of chunks per paragraph.
Words of the script are matched to the recognised words (Needleman-Wunsch on normalised words) and unmatched words are interpolated.
Output: {"chunks": [{p, c, <key1>, <key2>, a, b}], "words": [...]}  with the keys given by --keys (default text,text2).
Check the result by eye: recognition can lag or lead by a few tenths of a second; overrides from `ffmpeg -af silencedetect` onsets are often more exact.
"""
import argparse, difflib, json, re, sys
ap = argparse.ArgumentParser()
for k in ('orig', 'marked', 'whisper'): ap.add_argument('--' + k, required=True)
ap.add_argument('--orig2'); ap.add_argument('--marked2'); ap.add_argument('--lang', default=''); ap.add_argument('--keys', default='text,text2'); ap.add_argument('--out', default='timing.json'); ap.add_argument('--duration', type=float, default=None)
a = ap.parse_args(); k1, k2 = (a.keys.split(',') + ['text2'])[:2]
paras = lambda p: [x.strip() for x in open(p, encoding='utf8').read().split('\n\n') if x.strip()]
def rebuild(orig, marked, tag):
    o, m = paras(orig), paras(marked)
    if len(o) != len(m): sys.exit(f'{tag}: {len(o)} paragraphs in the original but {len(m)} in the marked copy')
    out = []
    for i, (po, pm) in enumerate(zip(o, m)):
        counts = [len(c.split()) for c in pm.split('|')]; ow = po.split()
        if sum(counts) != len(ow): sys.exit(f'{tag}: paragraph {i+1} has {len(ow)} words but the marked copy has {sum(counts)}')
        k = 0; ch = []
        for c in counts: ch.append(' '.join(ow[k:k + c])); k += c
        out.append(ch)
    return out
C1 = rebuild(a.orig, a.marked, 'primary'); C2 = rebuild(a.orig2, a.marked2, 'secondary') if a.orig2 else None
if C2 and any(len(x) != len(y) for x, y in zip(C1, C2)): sys.exit('primary and secondary have different chunk counts in some paragraph')
def norm(w):
    w = re.sub(r'[ً-ْـ«»:،؟!.\"“”‘’\'?,;()\-–—]', '', w)
    if a.lang == 'ar': w = re.sub('[إأآٱ]', 'ا', w).replace('ى', 'ي').replace('ة', 'ه').replace('ؤ', 'و').replace('ئ', 'ي')
    return w.lower()
wh = [(norm(w['t'].strip()), w['a'], w['b']) for s in json.load(open(a.whisper, encoding='utf8')) for w in s['w'] if norm(w['t'].strip())]
words = [(p, c, w, norm(w)) for p, chs in enumerate(C1) for c, ch in enumerate(chs) for w in ch.split()]
n, m = len(words), len(wh)
def sim(x, y):
    if x == y: return 2.0
    r = difflib.SequenceMatcher(None, x, y).ratio(); return 2 * r - 0.9 if r > 0.5 else -0.8
G = -0.35; S = [[0] * (m + 1) for _ in range(n + 1)]; B = [[0] * (m + 1) for _ in range(n + 1)]
for i in range(1, n + 1): S[i][0] = i * G; B[i][0] = 1
for j in range(1, m + 1): S[0][j] = j * G; B[0][j] = 2
for i in range(1, n + 1):
    for j in range(1, m + 1): S[i][j], B[i][j] = max((S[i-1][j-1] + sim(words[i-1][3], wh[j-1][0]), 0), (S[i-1][j] + G, 1), (S[i][j-1] + G, 2))
i, j, tm = n, m, [None] * n
while i > 0 or j > 0:
    b = B[i][j]
    if i > 0 and j > 0 and b == 0:
        if sim(words[i-1][3], wh[j-1][0]) > 0: tm[i-1] = (wh[j-1][1], wh[j-1][2])
        i -= 1; j -= 1
    elif i > 0 and (j == 0 or b == 1): i -= 1
    else: j -= 1
print('matched', sum(t is not None for t in tm), 'of', n, 'words')
end = a.duration or (wh[-1][2] if wh else 0)
for q in range(n):
    if tm[q] is None:
        lo = q - 1
        while lo >= 0 and tm[lo] is None: lo -= 1
        hi = q + 1
        while hi < n and tm[hi] is None: hi += 1
        t0 = tm[lo][1] if lo >= 0 else 0.0; t1 = tm[hi][0] if hi < n else end; g = hi - lo - 1; ix = q - lo - 1
        tm[q] = (t0 + (t1 - t0) * ix / g, t0 + (t1 - t0) * (ix + 1) / g)
chunks = []
for p, chs in enumerate(C1):
    for c, text in enumerate(chs):
        ts = [tm[q] for q in range(n) if words[q][0] == p and words[q][1] == c]; e = {'p': p, 'c': c, k1: text, 'a': round(ts[0][0], 3), 'b': round(ts[-1][1], 3)}
        if C2: e[k2] = C2[p][c]
        chunks.append(e)
json.dump({'chunks': chunks, 'words': [{'p': w[0], 'c': w[1], 't': w[2], 'a': round(t[0], 3), 'b': round(t[1], 3)} for w, t in zip(words, tm)]}, open(a.out, 'w', encoding='utf8'), ensure_ascii=False, indent=1)
for e in chunks: print(e['p'] + 1, e['c'], e['a'], e['b'], e[k1][:30])
