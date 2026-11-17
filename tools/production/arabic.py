"""Arabic text normalization and script-to-narration word alignment (standard library only).

align(script_words, spoken) maps every script word onto the Whisper word timings of the final MP3
(Needleman-Wunsch on normalized words, the same method as Library/template/align.py). Unmatched script
words get times interpolated from their neighbours and are marked m=False.
"""
import difflib, re

DIAC = re.compile('[ً-ْٰـ]')
PUNCT = re.compile(r'[«»"“”\'‘’:،؛؟!.,;?()\[\]\-–—…]')

def norm(w):
    w = PUNCT.sub('', DIAC.sub('', w))
    w = re.sub('[إأآٱ]', 'ا', w).replace('ى', 'ي').replace('ة', 'ه').replace('ؤ', 'و').replace('ئ', 'ي')
    return w.strip()

def tokens(text):
    """script words of a paragraph, pause markers removed"""
    return [w for w in text.replace('[pause]', ' ').split() if norm(w)]

def _sim(a, b):
    if a == b: return 2.0
    r = difflib.SequenceMatcher(None, a, b).ratio()
    return 2 * r - 0.9 if r > 0.5 else -0.8

def align(script_words, spoken, gap=-0.35):
    """script_words: [norm]; spoken: [(norm, a, b)]. Returns list of (spoken index or None) per script word,
    and the set of spoken indices left unmatched."""
    n, m = len(script_words), len(spoken)
    S = [[0.0] * (m + 1) for _ in range(n + 1)]; B = [[0] * (m + 1) for _ in range(n + 1)]
    for i in range(1, n + 1): S[i][0] = i * gap; B[i][0] = 1
    for j in range(1, m + 1): S[0][j] = j * gap; B[0][j] = 2
    for i in range(1, n + 1):
        si = script_words[i - 1]; Si = S[i]; Sp = S[i - 1]; Bi = B[i]
        for j in range(1, m + 1):
            d = Sp[j - 1] + _sim(si, spoken[j - 1][0]); u = Sp[j] + gap; l = Si[j - 1] + gap
            if d >= u and d >= l: Si[j] = d; Bi[j] = 0
            elif u >= l: Si[j] = u; Bi[j] = 1
            else: Si[j] = l; Bi[j] = 2
    out = [None] * n; used = set(); i, j = n, m
    while i > 0 or j > 0:
        b = B[i][j]
        if i > 0 and j > 0 and b == 0:
            if _sim(script_words[i - 1], spoken[j - 1][0]) > 0: out[i - 1] = j - 1; used.add(j - 1)
            i -= 1; j -= 1
        elif i > 0 and (j == 0 or b == 1): i -= 1
        else: j -= 1
    return out, set(range(m)) - used

def timed(script_words, spoken):
    """[(a, b, matched)] per script word; unmatched words interpolated between matched neighbours"""
    idx, unused = align(script_words, spoken)
    n = len(script_words); res = [None] * n
    for k, j in enumerate(idx):
        if j is not None: res[k] = (spoken[j][1], spoken[j][2], True)
    for k in range(n):
        if res[k] is None:
            p = next((q for q in range(k - 1, -1, -1) if res[q] and res[q][2]), None)
            nx = next((q for q in range(k + 1, n) if res[q] and res[q][2]), None)
            a = res[p][1] if p is not None else (res[nx][0] if nx is not None else 0.0)
            b = res[nx][0] if nx is not None else a + 0.4
            span = max(b - a, 0.0); lo = p if p is not None else -1; hi = nx if nx is not None else n
            f0 = (k - lo) / (hi - lo); f1 = (k - lo + 1) / (hi - lo) if hi > lo else 1
            res[k] = (round(a + span * f0 * 0.98, 3), round(a + span * min(f1, 1) * 0.98, 3), False)
    return res, unused
