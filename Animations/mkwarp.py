# usage: mkwarp.py old_timing.json new_timing.json old_end new_end  -> writes src/warp.js (maps authored clock = old narration to the new narration)
import json,sys
o=json.load(open(sys.argv[1]));n=json.load(open(sys.argv[2]));oe,ne=float(sys.argv[3]),float(sys.argv[4])
A=[[0,0]]
for a,b in zip(o['words'],n['words']):
    for k in('a','b'):
        if a[k]>A[-1][0]+0.05 and b[k]>A[-1][1]+0.05: A.append([round(a[k],3),round(b[k],3)])
if oe>A[-1][0] and ne>A[-1][1]: A.append([oe,ne])
open('src/warp.js','w').write('''// time warp: the scene is authored on the clock of the previous narration (old); the film runs on the new recording.
// Anchors pair each spoken word in the old and new recordings (see ../mkwarp.py); everything between is stretched linearly.
const ANCH = %s;
const toNew = (t) => { const A = ANCH; if (t <= A[0][0]) return t; for (let i = 1; i < A.length; i++) if (t <= A[i][0]) return A[i-1][1] + (t - A[i-1][0]) * (A[i][1] - A[i-1][1]) / (A[i][0] - A[i-1][0]); return A[A.length-1][1] + (t - A[A.length-1][0]); };
const toOld = (t) => { const A = ANCH; if (t <= A[0][1]) return t; for (let i = 1; i < A.length; i++) if (t <= A[i][1]) return A[i-1][0] + (t - A[i-1][1]) * (A[i][0] - A[i-1][0]) / (A[i][1] - A[i-1][1]); return A[A.length-1][0] + (t - A[A.length-1][1]); };
const warpScore = (k) => new Proxy(k, { get(o, p) { const f = o[p]; if (p === 'play') return (nm, t, ...r) => o.play(nm, toNew(t), ...r); if (p === 'bed') return (b, a, d, g, ...r) => o.bed(b, toNew(a), toNew(a + d) - toNew(a), g, ...r); return typeof f === 'function' ? f.bind(o) : f; } });
''' % json.dumps(A))
print(len(A),'anchors; end',A[-1])
