// OPTIONAL: time-warp for re-timing a finished scene to a new narration (used for the Thief film when its audio changed).
// Author the scene on its original clock, list anchors [[oldTime, newTime], ...] (chunk starts/ends, key hits), then draw with toOld(t) and
// schedule sound with toNew(old). Both must be strictly increasing. Beyond the last anchor time keeps running 1:1.
HP.makeWarp = (ANCH) => ({
  toNew: (t) => { const A = ANCH; if (t <= A[0][0]) return t; for (let i = 1; i < A.length; i++) if (t <= A[i][0]) return A[i-1][1] + (t - A[i-1][0]) * (A[i][1] - A[i-1][1]) / (A[i][0] - A[i-1][0]); return A[A.length-1][1] + (t - A[A.length-1][0]); },
  toOld: (t) => { const A = ANCH; if (t <= A[0][1]) return t; for (let i = 1; i < A.length; i++) if (t <= A[i][1]) return A[i-1][0] + (t - A[i-1][1]) * (A[i][0] - A[i-1][0]) / (A[i][1] - A[i-1][1]); return A[A.length-1][0] + (t - A[A.length-1][1]); },
});
