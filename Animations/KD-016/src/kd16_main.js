// ===== KD-016 The Dove, the Fox, and the Crane: staging, acting, camera, lettering and sound (plan: planning/creative_plan.md) =====
// World 1400 x 1230, ground y 900, bank edge x 780, water surface y 905. Every frame is a pure function of t.
(() => {
const DUR = 164.7, WW = 1400, WH = 1230, GR = 900, SURF = 905;
const cl = K.clamp, lerp = K.lerp, E = K.ease;
const ramp = (t, a, b) => cl((t - a) / (b - a));
const bl = (t, a, b, v0, v1, e = 'inOut') => blend(t, a, b, v0, v1, e);
const pul = (t, a, d) => pulse(t, a, d);
const B = (t, a, d) => K.beat(t, a, d, 'lin');
const toPanel = (x, y, c) => [500 + (x - c.x) * c.zoom, 615 + (y - c.y) * c.zoom];
const inR = (t, a, b) => t >= a && t < b;
// ---------- places ----------
const PALM = { x: 380, lean: 5 }, NX = 385, NY = 352;                 // crown at (385, 330); nest bottom at NY
const SNAG = [1300, 630], HFISH = 1190, HTALK = 1110, HRIVER = 1040;    // measured on the set (notes.md)
const DR = [466, 334], DOVESNAG = [1262, 558];                                                 // the dove standing on the right rim of the nest
const chickHome = (i) => [NX + (i - 1) * 32, NY - 49];
const HATCH = [9.98, 10.22, 10.5], EGGS = [6.66, 6.92, 7.18];
const THROW = [{ i: 0, nudge: 37.1, tip: 37.55, catch: 38.18 }, { i: 1, nudge: 46.14, tip: 46.9, catch: 47.68 }];

// ---------- time of day: u (0 dawn, 0.25 noon, 0.5 dusk, 0.75 night) ----------
const U = (t) => kfn(t, [[0, 0.27], [7.68, 0.27], [8.0, 0.5], [8.25, 0.74], [8.75, 0.8], [9.04, 1.28], [17.79, 1.28], [17.8, 1.02], [40.4, 1.1], [40.41, 1.25], [79.0, 1.3], [80.0, 2.04], [99.3, 2.12], [99.31, 2.27], [150, 2.36], [156.4, 2.37], [160.0, 2.5]], 'inOut');
const sunAt = (u) => { const v = ((((u % 1) + 1) % 1) + 0.04) / 0.58; if (v < 0 || v > 1) return null; return [700 + Math.cos(Math.PI * v) * 640, 860 - Math.sin(Math.PI * v) * 700]; };
const moonAt = (u) => { const v = ((((u - 0.46) % 1) + 1) % 1) / 0.58; if (v < 0 || v > 1) return null; return [700 + Math.cos(Math.PI * v) * 640, 860 - Math.sin(Math.PI * v) * 700]; };

// ---------- the fox ----------
const FX = (t) => {
  if (t < 41) return kfn(t, [[19.62, -230], [20.52, 200], [26.26, 200], [26.9, 275], [30.2, 275], [30.9, 225], [39.1, 225], [40.0, -260]]);
  if (t < 60) return kfn(t, [[41.1, -260], [42.04, 225], [47.9, 225], [48.7, -260]]);
  if (t < 99.3) return kfn(t, [[79.72, -260], [81.8, 225], [91.56, 225], [91.85, 278], [92.6, 255], [92.66, 255], [93.0, 80], [93.35, 262], [94.2, 250]]);
  if (t < 158) return kfn(t, [[105.92, 250], [107.9, 640], [111.68, 640], [112.3, 700], [121.18, 700], [121.8, 760], [134.68, 760], [135.3, 820], [145.64, 820], [146.3, 900]]);
  return kfn(t, [[158.16, 1230], [160.6, -260]], 'lin');
};
const foxOn = (t) => inR(t, 19.5, 40.05) || inR(t, 41.0, 48.8) || inR(t, 79.6, 157.2) || inR(t, 158.1, 160.7);
function foxBody(P, lx, ly) {   // local point (fox body coords, s 1) to world, following the sit rotation
  const a = -0.55 * (P.sit || 0), s = P.s || 1, d = P.dir ?? 1, X = lx + 60, x = X * Math.cos(a) - ly * Math.sin(a) - 60, y = X * Math.sin(a) + ly * Math.cos(a);
  return [P.x + x * s * d, P.y + y * s];
}
function foxHeadPt(P, hx, hy) { const r = P.headUp ?? P.nod ?? 0, x = hx * Math.cos(r) - hy * Math.sin(r), y = hx * Math.sin(r) + hy * Math.cos(r); return foxBody(P, 92 + x, -128 + (P.drop || 0) + y); }
const foxEye = (P) => foxHeadPt(P, 18, -8), foxMouth = (P) => foxHeadPt(P, 46, 20);

function foxP(t) {
  const xf = FX, w = walk(xf, t, { stride: 26 });
  const P = { y: GR, s: 0.8, dir: 1, ...w, ears: 0.1, tailUp: 0.3, mouth: 'closed' };
  if (speed(xf, t) < -5) P.dir = -1;
  const look = (pt) => { P.gaze = lookAt(foxEye(P), pt); };
  const nestPt = [NX, NY - 50];
  // ----- S2 / S3: the first threat and the first chick -----
  if (t < 41) {
    P.drop = t < 20.52 ? 12 : bl(t, 20.52, 20.9, 12, 0); P.headUp = t < 20.52 ? 0.2 : 0;
    P.tailUp = 0.25 + 0.06 * Math.sin(t * 3);
    if (t >= 20.52) { P.ears = bl(t, 20.52, 20.8, 0.1, -0.35); P.sq = anticipate(t, 20.5, 0.3, 0.05); }
    if (t >= 21.24) look([NX, NY - 50]);
    else look([P.x + 300, GR - 40]);
    if (t >= 21.8) { P.headUp = bl(t, 21.8, 22.3, 0, -0.45); P.lid = 0.4; P.mouth = 'smile'; P.tailUp = 0.5 + 0.2 * pul(t, 22.0, 0.4); }
    if (t >= 22.5) { P.sit = bl(t, 22.5, 23.0, 0, 0.4); P.plant = true; P.sq = 1 + 0.06 * ramp(t, 22.5, 23.4) * (t < 23.92 ? 1 : 0); P.brow = 1; P.lid = 0; }
    if (t >= 23.92) { P.mouth = 'open'; P.talk = 1; P.plant = false; P.raise = settleTo(t, 23.92, 0, 1, 0.3); P.tip = -0.08; P.ears = 0.8; P.headUp = -0.5; }
    if (t >= 25.6) { P.raise = bl(t, 25.6, 26.0, 1, 0); P.talk = 0.4 + 0.4 * Math.abs(Math.sin(t * 7)); }
    if (t >= 26.26) { P.sit = bl(t, 26.26, 26.5, 0.4, 0); P.tip = 0; P.mouth = 'open'; P.talk = 0; P.brow = 1; P.tailUp = 0.8; P.headUp = -0.2; P.ears = 0.6; }
    if (t >= 27.12) { P.sit = settleTo(t, 27.12, 0, 1.25, 0.45); P.reach = bl(t, 27.12, 27.5, 0, 1); P.headUp = -0.35; P.mouth = 'closed'; P.lid = 0; look(nestPt); }
    if (t >= 28.98 && t < 30.3) { const k = pul(t, 28.98, 0.3) + pul(t, 29.4, 0.3); P.mouth = k > 0.2 ? 'open' : 'closed'; P.talk = k; P.headUp = -0.35 - 0.15 * k; P.ears = 0.6 + 0.4 * k; }
    if (t >= 30.2) { P.sit = bl(t, 30.2, 30.9, 1.25, 0.4); P.reach = bl(t, 30.2, 30.6, 1, 0); P.plant = t > 30.5; P.mouth = 'smile'; P.brow = 0.5; P.ears = 0; P.headUp = -0.35; }
    if (t >= 37.4 && t < 39.1) { P.mouth = t < 38.18 ? 'open' : 'closed'; P.headUp = -0.35 + 0.25 * ramp(t, 37.6, 38.1); P.y = GR - hop(t, 38.08, 0.25, 0, 0, 20)[1]; if (t > 38.18 && t < 38.3) P.lid = 1; }
    if (t >= 39.1) { P.sit = bl(t, 39.1, 39.3, 0.4, 0); P.plant = false; P.headUp = -0.05; P.tailUp = 0.9; P.mouth = 'closed'; P.lid = 0.3; look([P.x - 300, GR - 60]); }
    if (t >= 30.9 && t < 37.4) look(nestPt);
    P.tuft = t >= 38.18 ? 1 : 0;
    return P;
  }
  // ----- S4: the second visit, half the effort -----
  if (t < 60) {
    P.lid = 0.5; P.mouth = 'smile'; P.tailUp = 0.45 + 0.25 * Math.sin(t * 4); look([NX, NY - 50]);
    if (t >= 42.04) { P.sit = bl(t, 42.04, 42.5, 0, 0.4); P.plant = true; P.headUp = bl(t, 42.04, 42.5, 0, -0.35); P.talk = 0.4 * pul(t, 42.3, 0.3); }
    if (t >= 42.8 && t < 44.0) { P.talk = 0.8 * pul(t, 42.8, 0.35); P.mouth = 'open'; P.plant = false; P.raise = 0.6 * pul(t, 42.9, 0.9); if (t > 43.2) P.mouth = 'smile'; }
    if (t >= 44.66 && t < 45.6) { P.plant = false; P.raise = 0.35 * (pul(t, 44.66, 0.3) + pul(t, 45.0, 0.3)); if (t < 44.8) P.gaze = [0, 0.05]; }
    if (t >= 47.4) { P.mouth = t < 47.68 ? 'open' : 'closed'; }
    if (t >= 47.9) { P.sit = bl(t, 47.9, 48.05, 0.4, 0); P.plant = false; P.headUp = 0; look([P.x - 300, GR - 60]); }
    P.tuft = t >= 47.68 ? 1 : 0;
    return P;
  }
  // ----- S7: the third visit and the dare -----
  if (t < 99.3) {
    P.lid = 0.5; P.mouth = 'smile'; P.tailUp = 0.5 + 0.25 * Math.sin(t * 5); look([NX, NY - 50]);
    if (t < 81.8) P.headUp = -0.15 + 0.06 * Math.sin(t * 8);
    if (t >= 81.8) { P.sit = bl(t, 81.8, 82.2, 0, 0.4); P.plant = true; P.headUp = -0.5; P.mouth = 'open'; P.talk = 0.9; }
    if (t >= 81.8 && t < 82.7) { P.plant = false; P.raise = 0.8 * ramp(t, 82.0, 82.3); }
    if (t >= 82.76 && t < 84.6) { P.talk = 0.3 + 0.7 * pul(t, 82.76, 1.0); P.lid = 0.7; P.raise = 0.4 * pul(t, 83.5, 0.4); P.plant = P.raise < 0.05; }
    if (t >= 84.6) { P.talk = 0.9; P.lid = 0.4; P.plant = true; }
    if (t >= 89.64) { P.talk = bl(t, 89.64, 90.4, 0.9, 0); P.mouth = t < 90.2 ? 'open' : 'closed'; P.ears = bl(t, 89.64, 90.0, 0.1, 0.55); P.lid = Math.max(blink(t, 3), pul(t, 89.8, 0.15) + pul(t, 90.1, 0.15)); }
    if (t >= 90.74) { const g = gazePlan(t, [[90.74, [NX, 600]], [91.0, [P.x + 60, GR]], [91.25, [NX, 600]]], 0.07); look(g); P.headUp = t < 91.0 ? -0.4 : t < 91.25 ? 0.2 : -0.4; }
    // the first try (91.56) and the second (92.96); paws reach about y 700 and 640, claws slide down the trunk
    if (t >= 91.56 && t < 94.2) {
      P.plant = false; P.mouth = 'closed'; P.lid = 0; P.ears = 0.7; P.brow = 1;
      const climb = (a, top, hang, b) => { const up = E.out(ramp(t, a, a + 0.3)), down = ramp(t, a + 0.3 + hang, b); return lerp(0, top, up) * (1 - down * down); };
      const lift = t < 92.6 ? climb(91.56, 70, 0.2, 92.6) : t >= 93.3 ? climb(93.3, 135, 0.55, 94.2) : 0;
      if (t < 92.6 || t >= 93.3) { P.sit = 1.3; P.reach = 1; P.y = GR - lift; P.eyes = t < 92.6 ? 'shut' : 'open'; P.headUp = -0.5; P.ph = t * 30; P.amp = 0.6; P.talk = 0.3; look([NX, NY - 50]); }
      else { P.sit = 0; P.reach = 0; P.headUp = -0.1; look([P.x + 200, GR - 100]); }
    }
    if (t >= 94.2) {
      P.sit = 0.95; P.plant = true; P.sq = impactSquash(t, 94.2, 0.7); P.y = GR - rebound(t, 94.2, 12); P.amp = 0;
      P.eyes = t < 94.5 ? 'shut' : 'wide'; P.mouth = 'open'; P.talk = 0.6; P.ears = 1; P.headUp = -0.4; P.brow = 0; P.lid = 0; P.noBlink = true; look([NX, NY - 50]);
    }
    if (t >= 95.9) { P.sit = bl(t, 95.9, 96.3, 0.95, 0.4); P.shake = t < 96.5 ? t : 0; P.eyes = 'open'; P.mouth = 'closed'; P.talk = 0; P.lid = 0.55; P.brow = 1; P.tailUp = 0.15; P.ears = 0.3; P.noBlink = false; }
    if (t >= 97.02) { P.mouth = 'smile'; P.ears = -0.3; P.lid = Math.max(0.15, blink(t, 3)); P.brow = 0; P.headUp = -0.3 + 0.08 * Math.sin(t * 2); P.plant = false; P.raise = settleTo(t, 97.02, 0, 0.6, 0.35); }
    return P;
  }
  // ----- S8 - S11: the river -----
  const heronHead = kd16HeronHeadW(heronP(t));
  P.tailUp = 0.35; look(heronHead);
  if (t < 105.92) {   // still at the palm, waiting with the sweet face
    P.x = 250; P.sit = 0.4; P.plant = true; P.mouth = 'smile'; P.ears = -0.3; P.headUp = -0.35; P.lid = 0.2; look([NX, NY - 50]);
    P.tailUp = 0.35 + 0.18 * Math.sign(Math.sin(t * Math.PI * 2)) * 0.5;
    if (t >= 103.94) { P.headUp = bl(t, 103.94, 104.6, -0.35, 0); P.mouth = 'closed'; P.lid = 0.6; P.brow = 1; P.ears = 0.2; look([HRIVER, 700]); }
  } else if (t < 107.9) { P.drop = 10; P.headUp = 0.05; P.lid = 0.5; P.brow = 1; }
  else {
    P.sit = settleTo(t, 107.9, 0, 0.4, 0.35); P.plant = true; P.mouth = 'smile'; P.ears = -0.3; P.lid = 0.15; P.headUp = -0.25;
    if (t >= 109.66 && t < 111.6) { P.plant = false; P.raise = 0.5 + 0.4 * Math.abs(Math.sin((t - 109.66) * 9)); P.drop = 10 * pul(t, 110.4, 0.6); }
    if (t >= 110.58 && t < 111.3) { P.mouth = 'open'; P.talk = 0.2; P.lid = 0.5; P.brow = 1; }   // the heron is looking at the stars
    if (t >= 111.68 && t < 113.5) { P.plant = false; P.raise = 0.9; }
    if (t >= 113.8 && t < 115.0) { P.plant = false; P.raise = 0.5 + 0.4 * Math.sin((t - 113.8) * 4); }
    if (t >= 116.26 && t < 118.0) { P.plant = false; P.reach = 0.6 * ramp(t, 116.26, 116.6); }
    if (t >= 118.8 && t < 119.5) { P.talk = 0.4; P.mouth = 'open'; P.ears = -0.5; look([760, GR]); }
    if (t >= 119.5 && t < 121.18) { P.plant = false; P.raise = 0.85; P.headUp = -0.5; P.gaze = [0.3, -1]; }
    if (t >= 121.18 && t < 122.0) { P.tip = 0.06; }
    if (t >= 122.76 && t < 124.3) { P.plant = false; P.raise = 0.7; P.talk = 0.4 + 0.3 * Math.abs(Math.sin(t * 8)); P.brow = -0.4; }
    if (t >= 125.72 && t < 127.2) { P.plant = false; P.raise = 0.6 + 0.35 * Math.sin((t - 125.72) * 6); }
    if (t >= 132.6 && t < 135.2) { P.plant = false; P.raise = 1; P.wet = true; P.brow = -0.6; P.tailUp = 0.5 + 0.3 * Math.sin(t * 14); P.lid = 0; }
    if (t >= 133.66 && t < 134.3) { P.mouth = 'open'; P.talk = 0.15; P.wet = false; P.lid = 0.4; P.brow = 1; }
    if (t >= 134.68) { P.sq = bl(t, 134.68, 135.3, 1, 0.92); P.drop = bl(t, 134.68, 135.3, 0, 10); }
    if (t >= 137.94) { P.raise = 0; P.plant = true; P.tailUp = 0.35; P.lid = 0; P.noBlink = true; }
    if (t >= 143.14) { P.mouth = 'open'; P.talk = 0; P.brow = 1; P.lid = 0.3; P.ears = 1; }
    if (t >= 143.64 && t < 145.64) { P.sit = bl(t, 143.64, 144.2, 0.4, 0.1); P.plant = false; P.sq = anticipate(t, 143.64, 0.5, 0.15) < 1 && t < 143.9 ? anticipate(t, 143.64, 0.5, 0.15) : 0.85; P.drop = 22; P.tailUp = 0.3 + 0.1 * Math.sin(t * 22); P.x += 3 * Math.sin(t * 18) * ramp(t, 144.2, 144.5); }
    if (t >= 145.64 && t < 147.52) { const [, hy] = hop(t, 145.64, 0.66, 0, 0, 90); P.y = GR - hy + 6; P.sit = 0; P.sq = t < 145.9 ? 1.15 : 1; P.reach = 1; P.mouth = 'open'; P.drop = 0; P.headUp = 0.1; }
    if (t >= 147.52) { P.x = 925; P.y = GR + 4; P.sit = 0.32; P.reach = 1; P.plant = false; P.mouth = 'smile'; P.lid = 0.4; P.brow = 0.6; P.ears = -0.2; P.tailUp = 0.9; P.sq = 1 + 0.03 * Math.sin(t * 9) * (1 - ramp(t, 147.5, 149)); P.noBlink = false;
      P.drop = bl(t, 148.74, 149.3, 0, 20); P.headUp = bl(t, 148.74, 149.3, 0, 0.35); look(heronHead); }
    if (t >= 150.3 && t < 156.44) { P.talk = 0.3 + 0.3 * Math.abs(Math.sin(t * 8)); P.mouth = 'smile'; }
    if (t >= 151.8 && t < 153.16) { P.headUp = bl(t, 151.8, 152.1, 0.35, -0.3); P.drop = 0; look([NX, NY - 60]); }
    if (t >= 153.16 && t < 154.4) { P.drop = 20; P.headUp = 0.35; P.reach = 1 + 0.08 * (pul(t, 153.3, 0.2) + pul(t, 153.8, 0.2)); }
    if (t >= 155.34) { P.talk = 0; P.mouth = 'smile'; P.ears = -0.6; P.lid = 0; }
    if (t >= 156.44) { P.drop = bl(t, 156.44, 156.9, 20, 40); P.headUp = 0.6; }
  }
  if (t >= 158.1) { Object.assign(P, walk(xf, t, { stride: 26 }), { y: GR, sit: 0, reach: 0, raise: 0, plant: false, lid: 0.6, mouth: 'smile', talk: 0, drop: 0, headUp: -0.05, brow: 0, ears: 0, tailUp: 0.55, sq: 1, noBlink: false });
    P.dir = -1; look([P.x - 300, GR - 40]); if (inR(t, 159.1, 159.6)) { P.headUp = -0.4; look([NX, NY - 40]); }
    P.feather = t < 158.6 ? 1 : 0; P.belly = 1; }
  if (P.x > 790 && P.y >= GR) P.y = Math.max(P.y, GR + 6);
  return P;
}

// ---------- the heron ----------
const HX = (t) => t < 99.3 ? kfn(t, [[54.9, HFISH], [55.94, HTALK]]) : HRIVER;
function heronP(t) {
  const P = { x: HX(t), y: 925, s: 0.9, dir: -1, neck: 0.2, lift: 1, crest: 0, bob: 0 };
  const swayOn = Math.sin(t * 1.3) * 0.04;
  P.headRot = 0.25 + swayOn;
  const lookHead = (pt) => { P.gaze = lookAt(kd16HeronHeadW(P), pt); };
  lookHead([P.x - 120, SURF + 10]);
  if (t < 51.75) {   // fishing (planted at 4.1): one stab that misses
    P.stab = 0.9 * (pul(t, 4.4, 0.5) > 0 ? Math.min(1, pul(t, 4.4, 0.5) * 1.6) : 0);
    P.neck = 0.2 + 0.05 * Math.sin(t * 0.8);
    return P;
  }
  if (t < 99.3) {
    if (t < 52.06) { P.stab = 0.45; }
    else { P.stab = bl(t, 52.06, 52.4, 0.45, 0); P.lift = bl(t, 52.06, 52.6, 1, 0); P.neck = bl(t, 52.06, 52.9, 0.2, 0.8); P.headRot = bl(t, 52.06, 52.9, 0.25, -0.15);
      lookHead(gazePlan(t, [[52.06, [P.x - 60, SURF]], [52.6, [NX, NY - 40]]], 0.3)); if (inR(t, 52.45, 52.55)) P.lid = 1; }
    if (t >= 53.08) { P.crest = settleTo(t, 53.08, 0, 1, 0.4); P.headRot = -0.15 + 0.12 * pul(t, 53.5, 0.8); }
    if (t >= 54.9 && t < 56.1) { Object.assign(P, walk(HX, t, { stride: 13 })); P.amp = Math.min(1, P.amp * 1.6); P.bob = 6 * Math.abs(Math.sin(P.ph)); }
    if (t >= 55.94) { P.neck = settleTo(t, 55.94, 0.8, 1, 0.4); P.talk = 0.6 * Math.abs(Math.sin((t - 55.94) * 9)) * (t < 57.2 ? 1 : 0); P.headRot = -0.2; P.brow = -0.4; P.crest = 0.6; }
    if (t >= 58.6 && t < 59.6) { P.gaze = [-1, 0.4]; P.lid = pul(t, 59.0, 0.2) > 0 ? 1 : 0; P.cross = 1; }
    if (t >= 59.5) { const tf6 = turnFlip(t, [[0, -1], [60.3, 1], [79.3, -1]], 0.5); P.dir = tf6.dir; P.sq = 1 - 0.1 * tf6.tuck; lookHead(t < 60.5 ? [NX + 60, NY - 60] : DOVESNAG); P.neck = 0.75; P.headRot = -0.05; P.crest = 0.4; }
    if (t >= 62.4 && t < 63.34) { P.headRot = -0.05 + 0.25 * ramp(t, 62.4, 62.8); P.crest = bl(t, 62.4, 62.9, 0.4, -0.6); P.lid = Math.max(0.5 * pul(t, 62.9, 0.4), blink(t, 7)); }
    if (t >= 63.34 && t < 65.4) { P.neck = settleTo(t, 63.34, 0.75, 1, 0.4); P.wing = settleTo(t, 63.5, 0, 1, 0.4); P.brow = 0.5; P.crest = 0.5; P.talk = 0.6 * Math.abs(Math.sin(t * 8)) * (t < 64.9 ? 1 : 0); }
    if (t >= 65.4 && t < 69.0) { P.wing = bl(t, 65.4, 65.8, 1, 0); P.talk = 0.5 * Math.abs(Math.sin(t * 8)) * (t > 65.4 && t < 69.6 ? 1 : 0); P.brow = 0.4; }
    if (t >= 68.9 && t < 69.7) { P.headRot = -0.4; lookHead([PALM.x, 600]); }
    if (t >= 71.26 && t < 72.86) { P.tip = 0.1 * ramp(t, 71.26, 71.6); P.neck = 0.65; lookHead(gazePlan(t, [[71.26, [P.x - 300, 500]], [71.45, [P.x + 300, 500]], [71.65, DOVESNAG]], 0.07)); }
    if (t >= 71.84 && t < 72.86) { P.wing = 0.75; P.talk = 0.25 * Math.abs(Math.sin(t * 10)); P.lid = 0.4; }
    if (t >= 72.86 && t < 74.76) { P.puff = settleTo(t, 72.86, 0, 1, 0.4); P.neck = 1; P.headRot = 0.35; P.crest = 1; P.tip = -0.04; }
    if (t >= 74.76 && t < 76.2) { const k = Math.sin((t - 74.76) * 9) * (1 - ramp(t, 75.8, 76.2)); P.headRot = 0.1 + 0.25 * k; P.tip = 0.03 * k; P.wing = 0.35; P.brow = 0.7; P.talk = 0.4 * Math.abs(k); }
    if (t >= 76.2 && t < 77.86) { P.talk = 0.4 * Math.abs(Math.sin(t * 8)) * (t < 77.6 ? 1 : 0); }
    if (t >= 77.86 && t < 79.3) { P.headRot = 0.1 + 0.5 * pul(t, 78.2, 0.9); P.neck = 0.75 - 0.3 * pul(t, 78.2, 0.9); P.lid = 0.5; P.puff = 0.4; }
    if (t >= 79.3) { P.neck = 0.6; P.crest = 0.2; lookHead([NX, NY - 40]); P.wing = 0.4 * pul(t, 85.48, 0.6); }
    return P;
  }
  // S8 - S11 at the river spot HRIVER
  if (t < 108.72) { P.dir = 1; P.neck = 0.2; P.lift = 1; P.headRot = 0.25 + swayOn; lookHead([P.x + 140, SURF]); return P; }
  const tf = turnFlip(t, [[0, 1], [108.72, -1]], 0.5); P.dir = tf.dir; P.sq = 1 - 0.1 * tf.tuck; P.lift = bl(t, 108.72, 109.0, 1, 0); P.neck = bl(t, 108.72, 109.3, 0.2, 0.75); P.headRot = -0.05; P.crest = 0.3;
  if (inR(t, 109.1, 109.2)) P.lid = 1;
  const fh = foxHeadW(t); lookHead(fh);
  if (t >= 109.66 && t < 110.58) { lookHead([P.x + 20, 520]); P.headRot = -0.3; }
  if (t >= 110.58 && t < 113.8) { P.puff = settleTo(t, 110.58, 0, 1, 0.4); P.crest = 1; P.lid = 0.5; P.headRot = -0.15 + 0.5 * pul(t, 111.0, 0.6); P.gaze = t < 111.3 ? [0, 0.3] : P.gaze; }
  if (t >= 113.8 && t < 118.08) { P.puff = 0.6; P.crest = 0.4; P.plume = 0.6 + 0.15 * Math.sin(t * 14); P.lid = t >= 114.94 ? 0.6 : 0.2; lookHead([P.x + 400, 600]); }
  if (t >= 118.08 && t < 119.6) { P.neck = 0.95; P.headRot = settleTo(t, 118.08, 0, -0.45, 0.4); P.lid = 0.4; P.puff = 0.6; P.plume = 0.3 * swing(t, 118.3, 1, 2, 3); }
  if (t >= 124.44 && t < 127.3) { P.headRot = 0.4 * Math.sin((t - 124.44) * 4.2); P.plume = 0.7 * Math.sin(t * 13); P.crest = 0.6 * Math.sin(t * 9); P.lid = 0.3; }
  if (t >= 127.3 && t < 127.82) { P.wing = 0.25 * pul(t, 127.3, 0.5); P.plume = swing(t, 127.3, 0.5, 2, 3); }
  if (t >= 127.82 && t < 138.68) { P.lid = 0.4; P.crest = 0.8; P.puff = 0.7; P.wing = settleTo(t, 127.82, 0, 0.45, 0.35); P.talk = 0.5 * Math.abs(Math.sin(t * 8)) * (inR(t, 128.0, 132.4) ? 1 : 0); }
  if (t >= 130.1 && t < 131.12) { P.wing = 1.05 - 0.08 * Math.abs(Math.sin((t - 130.1) * 12)); }
  if (t >= 131.12 && t < 132.6) { P.wing = 0.55; P.tuck = 0.35 * pul(t, 131.2, 1.2); }
  if (t >= 132.6 && t < 136.3) { P.wing = bl(t, 132.6, 133.0, 0.55, 0.2); if (inR(t, 133.66, 134.3)) { lookHead([P.x - 60, 450]); P.headRot = -0.4; } }
  if (t >= 136.3 && t < 137.28) { P.eyes = 'shut'; P.wing = 0.2 + 0.06 * Math.sin(t * 30); P.headRot = -0.2; }
  if (t >= 137.28 && t < 138.68) { P.headRot = 0.25 * pul(t, 137.28, 0.4); P.wing = settleTo(t, 137.5, 0.2, 0.62, 0.35); lookHead(fh); if (t > 138.2) P.eyes = 'shut'; }
  if (t >= 138.68) {
    P.eyes = 'shut'; P.crest = 0.6; P.puff = 0.5; P.talk = 0;
    P.tuck = ramp(t, 138.68, 142.44); P.wing = lerp(0.62, 0, ramp(t, 141.6, 142.44)); P.neck = lerp(0.75, 0.4, ramp(t, 138.68, 140.0)); P.plume = 0.4 * ramp(t, 140.0, 142.0);
    if (t >= 142.44) { P.tuck = 1; P.lift = bl(t, 142.44, 143.0, 0, 1); P.bob = 2 * Math.sin(t * 2.4); P.sq = breathe(t, 2, 0.02); }
    if (t >= 144.58 && t < 145.64) { P.lift = 1 - 0.6 * (pul(t, 144.6, 0.25) + pul(t, 144.95, 0.25)); }
  }
  if (t >= 147.52) {   // pinned
    P.tuck = t < 148.0 ? 1 : bl(t, 148.0, 148.25, 1, 0.42); P.lift = 0.5; P.wing = 0; P.x = 930; P.rot = 1.3; P.sq = 0.9; P.amp = 0.4; P.ph = t * 9 * (1 - ramp(t, 148, 149.5)); P.eyes = 'wide'; P.crest = -1; P.beak = 0.6; P.noBlink = true; P.neck = 0.45; P.puff = 0;
    lookHead(fh); if (inR(t, 148.5, 148.67)) P.gaze = [0, 0.05];
    if (t >= 154.38) { P.eyes = 'open'; P.lid = bl(t, 154.38, 154.9, 0, 0.55); P.gaze = [0.6, 0.8]; P.headRot = bl(t, 154.38, 155.0, 0, 0.45); P.beak = 0.1; }
  }
  return P;
}
function foxHeadW(t) { const P = foxP0(t); return foxHeadPt(P, 0, 0); }
function foxP0(t) { return foxP._cache && foxP._cache.t === t ? foxP._cache.P : { x: FX(t), y: GR, s: 0.8, dir: 1, sit: 0.4 }; }

// ---------- the dove ----------
const flyArc = (t, a, b, A, Bp, h) => { const u = E.inOut(ramp(t, a, b)); return [lerp(A[0], Bp[0], u), lerp(A[1], Bp[1], u) - h * Math.sin(Math.PI * u)]; };
function doveBeak(P) { const s = P.s || 1, d = P.dir ?? 1, ch = P.chest || 0, hx = 34 + ch * 6, hy = -70 + (P.drop || 0) - ch * 4, r = P.headRot || 0, px = hx + 31 - (hx - 12), py = hy - 1 - (hy + 14);
  const x = hx - 12 + px * Math.cos(r) - py * Math.sin(r), y = hy + 14 + px * Math.sin(r) + py * Math.cos(r); return [P.x + x * s * d, P.y + y * s]; }
function doveEye(P) { const s = P.s || 1, d = P.dir ?? 1, ch = P.chest || 0; return [P.x + (38 + ch * 6) * s * d, P.y + (-74 + (P.drop || 0) - ch * 4) * s]; }
const DOVEHEAD = (t) => { const P = doveP(t); return doveEye(P); };
function doveP(t) {
  const P = { x: DR[0], y: DR[1], s: 1, dir: -1, kind: 'dove', layer: 'front' };
  const lookAtPt = (pt) => { P.gaze = lookAt(doveEye(P), pt); };
  const chicksPt = [NX - 10, NY - 50], foxPt = [FX(t) + 80, GR - 110];
  lookAtPt(chicksPt);
  // ----- S1 -----
  if (t < 1.2) { const [x, y] = flyArc(t, 0.3, 1.2, [-60, 160], [DR[0], DR[1] - 10], -40); Object.assign(P, { x, y, dir: 1, fly: true, flap: Math.sin(t * 20), sq: 1.05 }); lookAtPt([NX, NY - 40]); P.carry = 'twig'; if (t < 0.3) P.x = -200; return P; }
  if (t < 5.4) {
    P.sq = landSquash(t, 1.2, 0.18); P.dir = -1;
    const jab = pul(t, 1.3, 0.25) + pul(t, 1.65, 0.25) + pul(t, 2.0, 0.25); P.headRot = 0.6 * jab; P.drop = 6 * jab; P.tailDrop = -0.5 * (pul(t, 1.5, 0.2) + pul(t, 1.85, 0.2) + pul(t, 2.2, 0.2));
    if (t < 1.3) P.carry = 'twig';
    if (t >= 2.0 && t < 3.3) { P.gaze = [0, 1]; P.headRot = 0.5 * ramp(t, 2.0, 2.3); P.drop = 6; if (t > 2.9) { P.sq = 0.95; P.lid = pul(t, 2.95, 0.2) > 0 ? 1 : 0; P.headRot = 0; P.drop = 0; } }
    if (t >= 3.5) { P.gaze = [1, 0.15]; }
    return P;
  }
  if (t < 9.04) {
    P.layer = 'in'; const into = ramp(t, 5.4, 5.9); P.x = lerp(DR[0], NX + 6, into); P.y = lerp(DR[1], NY - 14, into) - 18 * Math.sin(Math.PI * into);
    P.sq = t < 6.2 ? 1 - 0.15 * Math.sin(Math.PI * ramp(t, 5.8, 6.4)) : 1; P.tailDrop = -0.6 * pul(t, 5.9, 0.5); P.x += 3 * Math.sin(t * 30) * pul(t, 5.9, 0.5); P.lid = 0.5;
    if (t >= 6.5 && t < 7.6) { const hp = Math.max(pul(t, 6.62, 0.26), pul(t, 6.88, 0.26), pul(t, 7.14, 0.26)); P.y -= 22 * hp; P.gaze = [-0.3, 1]; P.headRot = 0.4; P.lid = 0; }
    if (t >= 7.68) { const d = dayCycle(U(t)); P.lid = Math.max(0.15, 0.8 * d.night); P.sq = breathe(t, 4, 0.03); P.noBlink = true;
      if (t >= 8.42 && t < 8.85) P.lid = 0.15; }
    return P;
  }
  if (t < 11.84) {
    const out = ramp(t, 9.04, 9.3); P.x = lerp(NX + 6, DR[0], out); P.y = lerp(NY - 14, DR[1], out) - 20 * Math.sin(Math.PI * out); P.eyes = 'wide'; P.headRot = 0.25 * Math.sin(t * 7) * (t < 9.98 ? 1 : 0.3); P.gaze = [-0.4, 0.8];
    if (t >= 9.98) { P.eyes = 'open'; P.gaze = [-0.5, 0.6]; }
    if (t >= 10.58) { P.sag = -0.5 * pul(t, 10.58, 0.9); P.y -= 10 * Math.abs(Math.sin((t - 10.58) * 8)) * (t < 11.4 ? 1 : 0); P.lid = 0.3; }
    return P;
  }
  if (t < 14.78) {   // three feeding trips, each shorter
    const trips = [[11.84, 12.42, 0], [12.72, 13.5, 1], [13.75, 14.05, 2]], feeds = [12.5, 13.6, 14.1];
    for (const [a, b, i] of trips) if (t >= a && t < b) { const far = i === 0 ? [640, 220] : [560, 230], u = ramp(t, a, b), [cx] = chickHome(i);
      const pos = u < 0.5 ? flyArc(u, 0, 0.5, i === 0 ? DR : [chickHome(i - 1)[0] + 56, NY - 44], far, 30) : flyArc(u, 0.5, 1, far, [cx + 56, NY - 44], 30);
      Object.assign(P, { x: pos[0], y: pos[1], fly: true, flap: Math.sin(t * 24), dir: u < 0.5 ? 1 : -1 }); if (u > 0.45) P.carry = 'worm'; P.layer = 'back'; lookAtPt(u < 0.5 ? far : chicksPt); return P; }
    const k = t < 12.72 ? 0 : t < 13.75 ? 1 : 2, [cx] = chickHome(k);
    P.x = cx + 56; P.y = NY - 44; P.layer = 'back'; const f = pul(t, feeds[k] - 0.1, 0.45); P.headRot = 0.7 * f; P.drop = 12 * f; if (t < feeds[k]) P.carry = 'worm';
    lookAtPt(chickHome(k)); return P;
  }
  if (t < 17.8) {
    if (t < 15.32) { const [x, y] = flyArc(t, 14.78, 15.32, [chickHome(2)[0] + 56, NY - 44], [DR[0] + 10, DR[1] - 4], 70); Object.assign(P, { x, y, fly: true, flap: Math.sin(t * 20), dir: t < 15.0 ? 1 : -1, brow: -0.4 }); lookAtPt(chicksPt); return P; }
    P.sq = landSquash(t, 15.32, 0.14); P.sag = bl(t, 15.4, 15.9, 0, -0.35); P.lid = Math.max(0.4, pul(t, 16.0, 0.4)); P.gaze = [-0.6, 0.6];
    return P;
  }
  // ----- S2: the threat -----
  if (t < 30.9) {
    P.lid = 1; P.sq = 0.95; P.drop = 6; P.noBlink = true;
    if (t >= 24.0) { P.lid = 0; P.eyes = 'wide'; P.sq = settleTo(t, 24.0, 0.95, 0.9, 0.25); P.drop = 0; P.puff = settleTo(t, 24.0, 0, 0.8, 0.3); lookAtPt(foxPt); P.headRot = 0.35; P.noBlink = false; }
    if (t >= 25.4) { P.gaze = lookAt(doveEye(P), chickHome(0)); }
    if (t >= 26.3) lookAtPt(foxPt);
    if (t >= 28.24) { const up = ramp(t, 28.24, 28.9); lookAtPt([lerp(FX(t) + 60, NX, up), lerp(GR - 160, NY - 20, up)]); P.drop = 4 * pul(t, 28.95, 0.25); }
    if (t >= 30.1) { P.x = DR[0] - 6 + tremble(t, 3); P.sag = -0.4; P.beak = 0.8; P.eyes = 'wide'; }
    return P;
  }
  // ----- S3: fear, belief, the first chick -----
  if (t < 40.0) {
    P.x = DR[0] + tremble(t, 2.5, 11) * (t < 37.0 ? 1 : 0.3); P.wet = true; P.sq = 0.9 + 0.02 * Math.sin(t * 14); P.puff = 0.5; P.eyes = 'wide';
    lookAtPt(gazePlan(t, [[30.9, foxPt], [32.2, foxPt], [32.5, chicksPt], [32.75, foxPt], [33.0, chicksPt], [33.1, [520, 200]]], 0.07));
    if (t >= 35.72 && t < 35.86) { P.lid = 1; P.tip = -0.1; }
    if (t >= 36.42) { lookAtPt(foxPt); P.beak = 0.2 + 0.2 * Math.abs(Math.sin(t * 20)); }
    if (t >= 37.1) { P.eyes = 'open'; P.x = lerp(DR[0], NX + 30, ramp(t, 37.1, 37.4)); P.sag = -0.7 * ramp(t, 37.2, 37.5) * (1 - ramp(t, 37.7, 38.0)); P.lid = 1; P.headRot = -0.45; P.drop = 4; P.beak = 0; }
    if (t >= 38.0) { P.headRot = -0.2; P.drop = 10; }
    if (t >= 39.5) { P.x = lerp(NX + 30, DR[0], ramp(t, 39.5, 39.9)); P.lid = bl(t, 39.5, 39.8, 1, 0.4); P.sag = 0.5; P.drop = 14; P.headRot = 0.3; lookAtPt(chickHome(0)); }
    return P;
  }
  // ----- S4: the second chick, the grief -----
  if (t < 51.7) {
    P.x = DR[0] - (NX + 30 > 0 ? (DR[0] - NX - 30) * pul(t, 46.14, 1.6) : 0); P.wet = t >= 46.14; lookAtPt(foxPt); P.drop = 8; P.sag = 0.3;
    if (t >= 44.12) { P.sq = bl(t, 44.12, 44.5, 1, 0.92); P.drop = 14; P.headRot = 0.3; }
    if (t >= 46.14) { P.sag = -0.7 * ramp(t, 46.2, 46.5) * (1 - ramp(t, 46.95, 47.3)); P.lid = 1; P.headRot = -0.45; }
    if (t >= 47.3) { P.headRot = 0.2; P.drop = 14; P.lid = Math.max(0.5, blink(t, 4)); lookAtPt(chickHome(1)); }
    if (t >= 48.8) { P.drop = bl(t, 48.8, 49.6, 14, 22); P.headRot = bl(t, 48.8, 49.6, 0.2, 0.55); P.lid = t < 49.4 ? bl(t, 48.8, 49.2, 0.5, 1) : 0.6; P.x = DR[0] + tremble(t, 2, 10); P.sag = 0.8; lookAtPt(chickHome(2)); }
    if (t >= 50.08) { P.headRot = settleTo(t, 50.08, 0.55, -0.6, 0.35); P.beak = 1.7; P.eyes = 'shut'; P.sag = -0.85; P.drop = 0; P.lid = 0; }
    if (t >= 50.86) { P.headRot = bl(t, 50.86, 51.2, -0.6, 0.35); P.beak = bl(t, 50.86, 51.1, 1.7, 0.1); P.sag = bl(t, 50.86, 51.2, -0.85, -0.45); P.eyes = 'open'; P.lid = 0.6; P.drop = 12; lookAtPt(chickHome(2)); }
    return P;
  }
  // ----- S5: small at the top -----
  if (t < 59.5) {
    P.x = DR[0] + tremble(t, 1.5, 9); P.wet = true; P.drop = 12; P.headRot = 0.3; P.lid = 0.5; P.sag = -0.4;
    if (t >= 57.98) { P.headRot = 0.1; lookAtPt(kd16HeronHeadW(heronP(t))); P.lid = 0.3; P.sag = -0.6 * pul(t, 58.2, 0.5); }
    return P;
  }
  // ----- S6: the lesson on the snag -----
  if (t < 79.7) {
    const per = [SNAG[0], SNAG[1] + 2];
    if (t < 60.7) { const [x, y] = flyArc(t, 59.6, 60.7, [DR[0], DR[1]], per, -40); Object.assign(P, { x, y, fly: t < 60.65, flap: Math.sin(t * 16) * 0.6, dir: 1 }); lookAtPt(per); if (t < 59.6) { P.x = DR[0]; P.y = DR[1]; P.fly = false; P.dir = -1; } return P; }
    Object.assign(P, { x: per[0], y: per[1], dir: -1, wet: t < 70.2, layer: 'front' }); P.sq = landSquash(t, 60.7, 0.16);
    const hh = kd16HeronHeadW(heronP(t)); lookAtPt(hh);
    if (inR(t, 60.6, 60.8)) { lookAtPt([NX, NY - 40]); }
    if (t >= 60.8 && t < 63.3) { P.beak = 0.6 * Math.abs(Math.sin(t * 9)); P.sag = -0.8 * ramp(t, 60.9, 61.2) * (1 - ramp(t, 62.2, 62.6)); }
    if (t >= 61.66 && t < 63.2) lookAtPt([1225, 405]);
    if (t >= 65.4 && t < 68.9) { lookAtPt([1225, 405]); P.sq = 0.95; P.puff = 0.3; }
    if (t >= 66.64 && t < 66.8) P.lid = 1;
    if (t >= 68.9 && t < 69.7) { lookAtPt(gazePlan(t, [[68.9, [PALM.x, 880]], [69.3, [PALM.x, 360]]], 0.2)); P.eyes = t > 69.3 ? 'wide' : 'open'; }
    if (t >= 69.7 && t < 71.26) { P.beak = 0.8; P.eyes = 'wide'; if (inR(t, 70.6, 70.75)) P.lid = 1; }
    if (t >= 73.88 && t < 74.9) { P.chest = settleTo(t, 73.88, 0, 1, 0.3); P.drop = -6; P.headRot = 0.2; P.tip = 0.12 * Math.sin((t - 73.88) * 11) * (1 - ramp(t, 74.3, 74.9)); P.x += 6 * Math.sin((t - 73.88) * 9) * (1 - ramp(t, 74.3, 74.9)); P.sag = -0.5 * pul(t, 74.0, 0.5); }
    if (t >= 74.9 && t < 76.24) { P.chest = bl(t, 74.9, 75.3, 1, 0.3); }
    if (t >= 76.24 && t < 77.0) { lookAtPt([NX, NY - 60]); P.brow = 0.6; P.headRot = -0.2; }
    if (t >= 77.0 && t < 78.9) { P.brow = 0.6; P.lid = 0.2; P.sq = settleTo(t, 77.0, 1, 0.96, 0.3); P.sag = 0.15; P.headRot = 0.35 * pul(t, 77.3, 0.4); }
    if (t >= 78.9) { const [x, y] = flyArc(t, 78.9, 79.7, per, [DR[0], DR[1]], 120); Object.assign(P, { x, y, fly: true, flap: Math.sin(t * 22), dir: -1, lid: 0 }); lookAtPt([NX, NY - 40]); }
    return P;
  }
  // ----- S7: the dare -----
  if (t < 99.3) {
    P.x = DR[0]; P.y = DR[1]; lookAtPt(foxPt); P.drop = 6;
    if (t < 83.94) { P.lid = Math.max(0.1, blink(t, 5)); P.sq = 0.97; }
    if (t >= 83.94 && t < 86.14) { P.sag = -0.5 * ramp(t, 84.0, 84.4); P.lid = 0.4; P.drop = 12; P.headRot = 0.35; lookAtPt(chickHome(2)); }
    if (t >= 84.6 && t < 86.14) { lookAtPt(gazePlan(t, [[84.6, chickHome(2)], [85.0, [HTALK, 640]]], 0.25)); P.noBlink = true; }
    if (t >= 86.14 && t < 87.8) { P.sag = bl(t, 86.14, 86.5, -0.5, 0.1); P.sq = anticipate(t, 86.9, 0.8, 0.08); P.drop = bl(t, 86.14, 87.0, 12, 0); P.headRot = 0; lookAtPt(foxPt); P.lid = 0; }
    if (t >= 87.8) { P.chest = settleTo(t, 87.8, 0, 1, 0.4); P.drop = -8; P.headRot = 0.3; P.brow = 0.8; P.lid = 0.15; lookAtPt(foxPt); P.noBlink = false; }
    if (t >= 88.62 && t < 89.8) { P.sag = -0.9 * pul(t, 88.62, 1.1); P.beak = 0.6 * Math.abs(Math.sin(t * 9)) * (t < 91.5 ? 1 : 0); P.brow = 1; }
    if (t >= 89.8 && t < 91.56) { P.beak = 0.5 * Math.abs(Math.sin(t * 9)); }
    if (t >= 92.4 && t < 93.4) { P.headRot = 0.3 + 0.12 * Math.sin((t - 92.4) * 10); P.lid = 0.3; }
    if (t >= 95.2 && t < 95.9) { P.sag = -0.4 * pul(t, 95.5, 0.4); lookAtPt(chickHome(2)); }
    if (t >= 98.38) { P.lid = 0.3; P.headRot = 0.3 + 0.4 * pul(t, 98.4, 0.7); P.drop = -4 + 10 * pul(t, 98.4, 0.7); }
    return P;
  }
  // ----- S8 - S11 -----
  P.x = DR[0]; P.y = DR[1]; P.chest = 0.8; P.drop = -6; P.headRot = 0.25; lookAtPt([FX(t) + 80, GR - 110]);
  if (t < 103.94) { P.lid = 0.62; P.beak = 0.5 * Math.abs(Math.sin(t * 8)) * (t > 99.44 && t < 105.9 ? 1 : 0); P.noBlink = true; }
  if (t >= 102.84 && t < 105.5) { P.sag = -0.9 * ramp(t, 102.84, 103.1); P.dir = 1; P.beak = 0.5 * Math.abs(Math.sin(t * 8)); P.lid = 0.62; }
  if (t >= 105.5 && t < 108) { P.dir = -1; P.eyes = 'wide'; P.lid = 0; P.sq = 0.93; P.chest = 0; P.drop = 4; P.sag = -0.6; P.headRot = 0.1; lookAtPt([FX(t) + 80, GR - 110]); P.noBlink = false; }
  if (t >= 108) { P.chest = 0; P.drop = 4; P.dir = 1; P.eyes = 'open'; P.lid = 0.2; P.wet = false; lookAtPt([HRIVER, 640]); }
  if (t >= 135.22 && t < 137.2) { const f = Math.sin((t - 135.22) * 18); P.sag = -0.8 + 0.4 * f; P.y = DR[1] - 14 * Math.abs(Math.sin((t - 135.22) * 6)); P.beak = 1.4; P.fly = false; }
  if (t >= 145.64 && t < 152.34) { P.sag = 0; P.eyes = 'wide'; lookAtPt([HRIVER, 800]); }
  if (t >= 152.34) { P.sag = 0.4; P.eyes = 'open'; P.lid = 0.3; P.noBlink = true; lookAtPt([HRIVER, 800]); }
  if (t >= 158.9 && t < 160.4) { P.chest = settleTo(t, 158.9, 0, 1, 0.4); P.drop = -8; P.headRot = 0.3; P.brow = 0.8; P.sag = 0.1; P.lid = 0.1; P.dir = -1; lookAtPt([FX(t) + 60, GR - 110]); }
  if (t >= 160.4) { P.dir = 1; P.chest = bl(t, 160.4, 160.9, 1, 0); P.drop = bl(t, 160.72, 161.6, -8, 14); P.headRot = bl(t, 160.72, 161.6, 0.3, 0.5); P.lid = t < 161.6 ? bl(t, 161.0, 161.5, 0.1, 1) : 0.6; P.wet = true; P.sag = bl(t, 160.9, 161.6, 0.1, -0.35); lookAtPt([HRIVER, 905]); }
  return P;
}
function doveCarry(ctx, P, t) {
  if (!P.carry) return; const [bx, by] = doveBeak(P), d = P.dir ?? 1;
  if (P.carry === 'twig') { seg(ctx, bx - 26 * d, by + 2, bx + 22 * d, by - 4, 5, WOOD, 2.5); seg(ctx, bx + 6 * d, by - 1, bx + 18 * d, by - 14, 3, WOOD, 2); }
  else worm(ctx, bx + 8 * d, by + 6, t);
}

// ---------- chicks in the nest ----------
function chickState(t, i) {
  const [hx, hy] = chickHome(i); if (t < HATCH[i]) return null;
  const th = THROW.find((q) => q.i === i);
  if (th && t >= th.nudge) {
    if (t < th.tip) { const u = E.inOut(ramp(t, th.nudge + 0.1, th.tip)); return { x: lerp(hx, NX - 66, u), y: hy - 6 * Math.sin(Math.PI * u), gx: 1, gy: -1, wide: true, rot: -0.3 * u, layer: 'front' }; }
    return null;   // falling or caught: drawn by the fall code
  }
  const k = { x: hx, y: hy, gx: 0, gy: 0, wide: false, open: 0, cw: 0, i };
  const bob = (a) => Math.abs(Math.sin(t * 7 + i * 1.3)) * a;
  if (t < 11.84) { const ph = t - HATCH[i]; k.y = hy + 10 * (1 - E.back(cl(ph / 0.3))); if (i === 0) { k.gy = -1; k.wide = true; } if (i === 1) k.open = Math.abs(Math.sin(t * 10)); if (i === 2) k.gx = 1; }
  else if (t < 17.8) {
    const feeds = [12.5, 13.6, 14.1]; k.open = 0.6 + 0.4 * Math.abs(Math.sin(t * 11 + i)); k.y -= bob(3);
    const f = feeds[i]; if (t >= f - 0.05 && t < f + 0.5) { k.cw = 0.6 * pul(t, f, 0.5); k.open = t < f + 0.1 ? 1 : 0; }
    if (i === 2 && inR(t, 13.6, 14.05)) { k.open = 1.2; k.y -= 6; }
    k.gx = (DOVE_X(t) - hx) > 0 ? 0.8 : -0.8; k.gy = -0.7;
    if (t >= 15.32) { k.open = 0; k.gx = 0.8; k.gy = -0.5; k.x += 4; }
    if (i === 1 && t >= 16.52 && t < 17.3) { k.y -= 14 * pul(t, 16.52, 0.75); k.open = pul(t, 16.7, 0.2) > 0 ? 1 : 0; }
  } else if (t < 30.9) {
    k.shut = t < 24.0; if (t >= 24.0) { k.wide = true; k.gx = -0.7; k.gy = 0.6; }
    if (t >= 24.64 && i !== 0) { k.gx = (chickHome(0)[0] - hx) < 0 ? -1 : 1; k.gy = 0; }
    if (i === 0 && t >= 24.64) k.cw = 0.4;
    if (t >= 25.4 && t < 26.6) { const d = 25.4 + stagger(i, 0.12); k.y += 24 * pul(t, d, 1.0); }
    if (t >= 30.1) k.x += (DR[0] - hx) * 0.15;
  } else if (t < 40.0) { k.wide = true; k.gx = -0.6; k.gy = 0.8; k.y -= Math.abs(tremble(t, 1.5, 10));
    if (t >= 38.68) { k.gx = i === 1 ? -1 : -1; k.gy = 0.2; } }
  else if (t < 51.7) { k.wide = t > 44.12; k.gx = -0.5; k.gy = 0.6; if (t >= 44.12 && t < 46.0) k.y += 18 * ramp(t, 44.12, 44.4);
    if (i === 2 && t >= 47.0) { k.gx = -1; k.gy = 0.3; } if (i === 2 && t >= 50.86) { k.x = lerp(hx, hx + 6, ramp(t, 50.86, 51.2)); k.gx = 0.8; k.gy = -1; k.cw = 0.2; } }
  else if (t < 79.3) { k.gx = 0.8; k.gy = 0.4; if (t >= 76.24 && t < 77.4) { k.y -= 12 * pul(t, 76.24, 1.1); k.wave = Math.sin((t - 76.24) * 14); k.open = 0.5; } }
  else if (t < 99.3) { k.gx = -0.8; k.gy = 0.8; k.wide = inR(t, 83.94, 87.8);
    if (t >= 88.62 && t < 91.5) { k.y -= 6; k.gx = -0.6; k.gy = 1; k.brave = 1; }
    if (t >= 94.5 && t < 96.0) k.wide = true;
    if (t >= 95.2 && t < 95.9) { k.y -= 10; k.raspberry = pul(t, 95.2, 0.7); } }
  else { k.gx = 0.8; k.gy = 0.5; if (t >= 145.64 && t < 160.5) { k.wide = true; k.y += 4; } if (t >= 160.72) { k.x += 8 * ramp(t, 160.72, 161.4); k.gx = 1; k.gy = -1; } }
  k.layer = 'mid'; return k;
}
const DOVE_X = (t) => doveP(t).x;
function drawChickK(ctx, k, t) {
  ctx.save(); ctx.translate(k.x, k.y); if (k.rot) ctx.rotate(k.rot);
  if (k.wave) { ctx.save(); ctx.translate(-10, -4); ctx.rotate(-0.8 + 0.5 * k.wave); shape(ctx, ell(-8, 0, 10, 5, 10), '#ffe066', { lw: 3, seed: 6 }); ctx.restore(); }
  if (k.brave) { ctx.scale(1.08, 1.08); }
  chickActing(ctx, 0, 0, k.i || 0, { gx: k.gx, gy: k.gy, wide: k.wide, open: k.open, cw: k.cw });
  if (k.shut) { ctx.fillStyle = C.yellow; ctx.beginPath(); ctx.arc(4, -5, 7.2, 0, 7); ctx.fill(); ctx.lineWidth = 2; ctx.strokeStyle = C.black; ctx.beginPath(); ctx.arc(4, -6, 4.5, 0.15 * Math.PI, 0.85 * Math.PI); ctx.stroke(); }
  if (k.raspberry) { ctx.fillStyle = C.red; ctx.beginPath(); ctx.ellipse(-24, 2, 7 * k.raspberry, 4, 0, 0, 7); ctx.fill(); ctx.lineWidth = 2; ctx.strokeStyle = C.black; ctx.stroke(); for (let j = 0; j < 3; j++) { ctx.beginPath(); ctx.arc(-34 - j * 7, -4 + j * 5, 2, 0, 7); ctx.fillStyle = TEAR; ctx.fill(); } }
  ctx.restore();
}
// falling chick: rim (NX-66, NY-50) to the fox mouth
function fallingChicks(ctx, t, fP) {
  for (const th of THROW) { if (t < th.tip || t >= th.catch) continue;
    const m = fP ? foxMouth(fP) : [315, 777], a = [NX - 66, NY - 50], u = ramp(t, th.tip, th.catch);
    const x = lerp(a[0], m[0], u), y = fallY(t, th.tip, th.catch, a[1], m[1] - 10);
    kd16Chick(ctx, x, y, { flap: t * 30, wide: true, gx: th.i === 1 ? 1 : 0.4, gy: -1, open: Math.abs(Math.sin(t * 9)) * 0.8, rot: 0.25 * Math.sin(t * 12) }); }
}

// ---------- set ----------
function drawSky(ctx, t) {
  const u = U(t), d = dayCycle(u);
  sky(ctx, { preset: d.a, hills: [], w: WW }); if (d.f > 0.001) { ctx.save(); ctx.globalAlpha *= d.f; sky(ctx, { preset: d.b, hills: [], w: WW }); ctx.restore(); }
  if (d.stars > 0) { ctx.save(); ctx.globalAlpha *= d.stars; stars(ctx, { w: WW, h: 520 }); ctx.restore(); }
  ctx.save(); ctx.beginPath(); ctx.rect(0, 0, WW, 920); ctx.clip(); const mn = moonAt(u), sn = sunAt(u); if (mn) moon(ctx, mn[0], mn[1], 70); if (sn) sun(ctx, sn[0], sn[1], t); ctx.restore();
  for (const [bx, by, br, col] of d.hills) { ctx.beginPath(); ctx.ellipse(bx * 1.4, by, br * 1.4, br * 0.5, 0, Math.PI, 0); ctx.fillStyle = col; ctx.fill(); ctx.lineWidth = 6; ctx.strokeStyle = C.black; ctx.stroke(); }
  ctx.save(); ctx.beginPath(); ctx.rect(0, 0, 770, 920); ctx.clip(); hillTrees(ctx, { seed: 4 }); ctx.restore();
  cloudFlat(ctx, 160 + ((t * 5) % 1500) - 200, 180, 0.8); cloudFlat(ctx, 900 + ((t * 3) % 1400) - 600, 120, 0.6);
  return d;
}
function clawMarks(ctx, t) {
  for (const [t0, top] of [[92.3, 700], [94.0, 650]]) { if (t < t0) continue; const k = ramp(t, t0, t0 + 0.3), y1 = lerp(top, GR - 40, k);
    ctx.save(); ctx.lineCap = 'round'; ctx.strokeStyle = '#5b3a1e'; ctx.lineWidth = 3.5; for (const dx of [-8, 0, 8]) { ctx.beginPath(); ctx.moveTo(PALM.x - 22 + dx * 0.6 + (top === 650 ? 6 : 0), top); ctx.lineTo(PALM.x - 22 + dx * 0.6 + (top === 650 ? 6 : 0), y1); ctx.stroke(); } ctx.restore(); }
}

// ---------- world ----------
function drawWorld(ctx, t, cam) {
  LIFE.t = t;
  const d = drawSky(ctx, t);
  kd16Land(ctx); kd16Water(ctx, t);
  kd16Tick(ctx, 700, GR + 6, 1 - ramp(t, 111.68, 112.3)); kd16Tick(ctx, 760, GR + 6, 1 - ramp(t, 121.18, 121.8)); kd16Tick(ctx, 820, SURF + 6, 1 - ramp(t, 134.68, 135.3));
  const bend = windBend(t), shakeR = 0.12 * (pul(t, 157.42, 0.35) + pul(t, 157.9, 0.35));
  kd16Reeds(ctx, t, 1335, 1412, { bend, seed: 61, n: 7, shake: shakeR });
  // palm, claw marks, nest and family
  palmTree(ctx, PALM.x, GR, { h: 570, lean: PALM.lean, t, sway: 1 + 0.6 * Math.abs(bend), nuts: 2 });
  clawMarks(ctx, t);
  const dv = doveP(t), dLayer = dv.layer;
  if (t >= 1.3) {
    const nb = t < 1.65 ? 0.35 : t < 2.0 ? 0.7 : 1, nbk = settleTo(t, t < 1.65 ? 1.3 : t < 2.0 ? 1.65 : 2.0, nb - 0.3, nb, 0.25);
    const eggs = t < 6.66 ? 0 : 3, egg = EGGS.map((e, i) => (t < e ? 0 : t >= HATCH[i] ? 0 : settleTo(t, e, 0, 1, 0.3)));
    const rock = inR(t, 9.04, HATCH[2]) ? 0.08 * Math.sin(t * 22) : 0;
    nestDraw(ctx, NX, NY, { nb: Math.min(1, nbk), t, eggs, egg, chicks: 0, rock });
    if (inR(t, 9.04, HATCH[2] + 0.4)) for (let i = 0; i < 3; i++) { const [ex] = chickHome(i), ey = NY - 43; if (t < HATCH[i]) { ctx.save(); ctx.lineWidth = 2.5; ctx.strokeStyle = C.black; ctx.beginPath(); ctx.moveTo(ex - 12, ey - 4); ctx.lineTo(ex - 5, ey + 2); ctx.lineTo(ex, ey - 6); ctx.lineTo(ex + 6, ey + 1); ctx.lineTo(ex + 12, ey - 5); ctx.stroke(); ctx.restore(); }
      else { const u = ramp(t, HATCH[i], HATCH[i] + 0.4); ctx.save(); ctx.globalAlpha = 1 - u; ctx.translate(ex + 10 * u, ey - 18 - 40 * Math.sin(Math.PI * u)); ctx.rotate(u * 4); shape(ctx, [[-10, 0], [-6, -8], [-1, -2], [4, -8], [10, 0]], C.white, { lw: 3 }); ctx.restore(); } }
    if (dLayer === 'back') { bird(ctx, dv); doveCarry(ctx, dv, t); }
    const ks = [0, 1, 2].map((i) => chickState(t, i)).filter(Boolean);
    for (const k of ks) if (k.layer === 'mid') drawChickK(ctx, k, t);
    if (dLayer === 'in') { bird(ctx, dv); doveCarry(ctx, dv, t); }
    kd16NestFront(ctx, NX, NY, Math.min(1, nbk));
    for (const k of ks) if (k.layer === 'front') drawChickK(ctx, k, t);
    if (inR(t, 16.52, 17.3)) { /* the peeking chick is drawn by chickState (rises over the wing) */ }
  }
  if (dLayer === 'front') { bird(ctx, dv); doveCarry(ctx, dv, t); }
  if (inR(t, 39.5, 41) || inR(t, 54.22, 59.5)) teardrops(ctx, t, t < 41 ? 39.6 : 54.3, t < 41 ? 40.2 : 59.4, () => doveEye(dv), { groundY: GR - 10, rate: 2, vx: -20 });
  if (inR(t, 50.08, 50.9)) for (const sd of [-1, 1]) teardrops(ctx, t, 50.1, 50.86, () => doveEye(dv), { groundY: NY + 40, rate: 6, vx: 90 * sd });
  if (inR(t, 21.24, 22.2)) soundArcs(ctx, NX + 20, NY - 70, 1, t, C.white);
  // snag and heron
  kd16Snag(ctx, SNAG[0], SNAG[1]);
  const hP = heronP(t); if (t < 157.2) { kd16Heron(ctx, hP); }
  // fox
  let fP = null; if (foxOn(t)) { fP = foxP(t); foxP._cache = { t, P: fP }; fox(ctx, fP);
    if (fP.tuft) { const [mx, my] = foxMouth(fP); kd16Chick(ctx, mx - 4, my - 4, { tuft: true }); }
    if (fP.feather) { const [mx, my] = foxHeadPt(fP, 74, -4); ctx.save(); ctx.translate(mx, my - 8); ctx.rotate(-0.5 + 0.2 * Math.sin(t * 9)); shape(ctx, ell(0, 0, 16, 6, 12), '#b9c4dc', { lw: 3, seed: 5 }); ctx.restore(); }
    if (fP.belly) { const [bx, by] = foxBody(fP, 10, -66); shape(ctx, ell(bx, by, 52, 22, 20), CREAM, { lw: 4.5, seed: 77 }); }
    if (inR(t, 158.6, 159.4)) feather(ctx, t, { t0: 158.6, t1: 159.4, a: foxHeadPt(fP, 74, -12), b: [foxHeadPt(fP, 74, -12)[0] + 40, GR - 4], col: '#b9c4dc' });
    if (inR(t, 79.72, 81.8)) { const [ex, ey] = foxHeadPt(fP, 30, -60); note(ctx, ex + 20 * Math.sin(t * 3), ey - ((t * 50) % 60), 0.7, C.black); }
    for (const f of FOXFALLS) if (t >= f.t && t < f.t + 0.5) dustBurst(ctx, f.x + 40, GR - 4, t - f.t, 3, 6, 11, 22, 0.45, Math.round(f.t * 10));
    if (inR(t, 91.7, 92.8)) dustBurst(ctx, PALM.x - 30, GR - 10, t - 91.9, 5, 8, 16, 40, 0.8, 3);
    if (inR(t, 94.2, 95.2)) dustBurst(ctx, fP.x - 20, GR - 8, t - 94.2, 10, 10, 30, 110, 0.7, 5);
  }
  fallingChicks(ctx, t, foxOn(t) ? fP : null);
  // the big tear (51.1 to 51.75) and the tear on the beak (58.6)
  if (inR(t, 51.1, 51.75)) { const u = ramp(t, 51.1, 51.75), x = lerp(NX + 50, HFISH - 40, E.out(u)), y = fallY(t, 51.1, 51.75, NY - 50, SURF); kd16Tear(ctx, x, y, 1.6); }
  if (inR(t, 58.6, 59.0)) { const hh = kd16HeronHeadW(hP), tipx = hh[0] - 76 * 0.9, tipy = hh[1] + 10, u = ramp(t, 58.6, 59.0); kd16Tear(ctx, lerp(NX + 40, tipx, u), lerp(NY - 60, tipy, u) - 120 * Math.sin(Math.PI * u), 1.1); }
  if (inR(t, 59.0, 59.6)) { const hh = kd16HeronHeadW(hP); kd16Tear(ctx, hh[0] - 72 * 0.9, hh[1] + 4, 1.0); }
  // water front strip (hides legs), ripples, near reeds
  kd16Water(ctx, t, { front: true });
  ripple(ctx, HFISH - 40, SURF + 4, 51.75, t, 1.4); ripple(ctx, HFISH - 40, SURF + 4, 52.0, t, 0.9);
  if (t < 51.75) ripple(ctx, HFISH - 160, SURF + 4, 4.75, t, 0.8);
  for (const f of HERONFALLS) ripple(ctx, f.x - 10, SURF + 4, f.t, t, 0.7);
  if (inR(t, 121.4, 140)) ripple(ctx, 820, SURF + 4, 121.6, t, 0.5);
  if (t >= 145.6 && t < 150) { ripple(ctx, 1000, SURF + 4, 146.3, t, 1.6); ripple(ctx, 1080, SURF + 4, 146.6, t, 1.2); drops(ctx, 1000, SURF - 120, t, 4); }
  if (t >= 156) { ripple(ctx, HRIVER, SURF + 4, 159.52, t, 1.4); }
  kd16Reeds(ctx, t, 1360, 1415, { bend, seed: 63, n: 3, shake: shakeR });
  // drifting feathers
  if (t >= 146.3) for (let i = 0; i < 4; i++) feather(ctx, t, { t0: 146.4 + i * 0.4, t1: 149.0 + i * 0.6, a: [980 + i * 30, 660 - i * 20], b: [930 + i * 50, SURF - 4], col: '#b9c4dc' });
  if (t >= 157.42) for (let i = 0; i < 3; i++) feather(ctx, t, { t0: 157.5 + i * 0.15, t1: 159.5 + i * 0.3, a: [1340 + i * 25, 640], b: [1300 + i * 40, 500 - i * 30], col: '#b9c4dc' });
  if (t >= 159.6) { const u = ramp(t, 160.16, DUR), fx = lerp(960, 1150, u), fy = t < 160.16 ? lerp(560, SURF - 2, ramp(t, 159.6, 160.16)) : SURF - 2 + 2 * Math.sin(t * 2); ctx.save(); ctx.translate(fx, fy); ctx.rotate(t < 160.16 ? 0.7 * Math.sin(t * 6) : 0.1 * Math.sin(t * 1.5)); ctx.scale(1.6, 1.6); shape(ctx, ell(0, 0, 18, 6, 12), '#b9c4dc', { lw: 3, seed: 5 }); seg(ctx, -18, 0, 8, 0, 1, '#6b7fa6', 1); ctx.restore(); }
  // world-space effects: thought clouds, fight cloud
  thoughtClouds(ctx, t, dv);
  if (inR(t, 146.3, 147.9)) kd16Fight(ctx, 975, 800, t, ramp(t, 146.3, 146.45) * 1.0, ramp(t, 147.4, 147.9));
  if (inR(t, 109.66, 111.0)) { const hh = kd16HeronHeadW(hP); for (let i = 0; i < 4; i++) { const a = t * 3 + i * Math.PI / 2; star(ctx, hh[0] + Math.cos(a) * 90, hh[1] - 20 + Math.sin(a) * 30, 14, C.yellow, a); } }
  // night tint on the land and cast
  if (d.night > 0.01) { ctx.save(); ctx.globalAlpha = 0.38 * d.night; ctx.fillStyle = NAVY2; ctx.fillRect(0, 0, WW, WH); ctx.restore(); }
  if (d.warm > 0.01) { ctx.save(); ctx.globalAlpha = 0.1 * d.warm; ctx.fillStyle = '#e2701a'; ctx.fillRect(0, 0, WW, WH); ctx.restore(); }
  LIFE.t = null;
}
function kd16Tear(ctx, x, y, s) { ctx.save(); ctx.translate(x, y); ctx.scale(s, s); ctx.beginPath(); ctx.moveTo(0, -11); ctx.quadraticCurveTo(6, -3, 6, 2); ctx.arc(0, 2, 6, 0, Math.PI); ctx.quadraticCurveTo(-6, -3, 0, -11); ctx.fillStyle = TEAR; ctx.fill(); ctx.lineWidth = 2.5; ctx.strokeStyle = C.black; ctx.stroke(); ctx.fillStyle = C.white; ctx.beginPath(); ctx.arc(-2, 1, 1.8, 0, 7); ctx.fill(); ctx.restore(); }
const windBend = (t) => {
  let b = 0;
  if (inR(t, 113.8, 119.6)) b = -0.8 * ramp(t, 113.8, 114.3) * (1 - ramp(t, 118.9, 119.6));
  if (inR(t, 124.44, 127.3)) b = 0.9 * Math.sin((t - 124.44) * 5);
  if (t >= 127.3 && t < 129) b = swing(t, 127.3, 0.6, 1.2, 2.5);
  return b;
};
const FOXFALLS = [...footfalls(FX, 19.62, 20.52), ...footfalls(FX, 41.1, 42.04), ...footfalls(FX, 79.72, 81.8), ...footfalls(FX, 105.92, 107.9), ...footfalls(FX, 158.16, 160.6)];
const HERONFALLS = footfalls(HX, 54.9, 55.94, 13);

// thought clouds: 33.1 her belief (the fox walks up the trunk), 61.66 recap, 65.4 the heron's truth (the fox slides down)
function cloudScene(k, t, mode, u) {
  // a small palm at x 500 and a fox at its foot (cloud world: ground 900)
  k.fillStyle = C.yellow; k.fillRect(0, 0, 1000, 1230);
  shape(k, [[0, 900], [1000, 900], [1000, 1230], [0, 1230]], '#d9a441', { lw: 6, seed: 3 });
  palmTree(k, 500, 900, { h: 570, lean: 5, t: 0, sway: 0, nuts: 0 });
  nestDraw(k, 505, 352, { nb: 1, chicks: 0 });
  if (mode === 'belief') {   // smooth, effortless climb, like a cat
    const v = E.inOut(cl(u)); const x = 470, y = lerp(900, 420, v);
    fox(k, { x: x - 40, y, s: 0.8, rot: -Math.PI / 2 * cl(u * 4), ph: t * 14, amp: v < 1 ? 1 : 0, mouth: v > 0.95 ? 'open' : 'smile', eyes: 'open', ears: 0, tailUp: 0.4, brow: v > 0.95 ? 1 : 0 });
  } else if (mode === 'recap') {
    fox(k, { x: 330, y: 900, s: 0.8, sit: 0.4, plant: true, headUp: -0.4, mouth: 'open' });
    for (let i = 0; i < 2; i++) { const a = 0.15 + i * 0.4, f = cl((u - a) / 0.3); if (f > 0 && f < 1) kd16Chick(k, lerp(450, 420, f), lerp(320, 780, f * f), { s: 2.2, flap: t * 30, wide: true, gy: -1 }); }
    const n = u < 0.45 ? 3 : u < 0.85 ? 2 : 1; k.save(); k.font = K.font(150, BF, 400); k.textAlign = 'center'; k.lineWidth = 16; k.strokeStyle = C.black; k.strokeText(String(n), 690, 330); k.fillStyle = C.red; k.fillText(String(n), 690, 330); k.restore();
  } else {   // truth: X, then the fox jumps, scrabbles and slides down into a heap
    const j = cl(u), up = j < 0.35 ? E.out(j / 0.35) : 1 - cl((j - 0.45) / 0.4), y = 900 - 180 * up;
    fox(k, { x: 380, y, s: 0.8, sit: j > 0.1 && j < 0.85 ? 1.3 : 0.9, reach: j > 0.1 && j < 0.85 ? 1 : 0, eyes: j > 0.85 ? 'x' : 'shut', mouth: 'open', ears: 1, plant: j >= 0.85, ph: t * 30, amp: 0.6 });
    if (j > 0.45) { k.save(); k.strokeStyle = '#5b3a1e'; k.lineWidth = 10; for (const dx of [-14, 0, 14]) { k.beginPath(); k.moveTo(470 + dx, 680); k.lineTo(470 + dx, lerp(680, 860, cl((j - 0.45) / 0.4))); k.stroke(); } k.restore(); }
    if (j > 0.85) dizzy(k, 480, 700, t, 90);
  }
}
function thoughtClouds(ctx, t, dv) {
  if (inR(t, 33.1, 36.6)) { const p = t < 36.42 ? ramp(t, 33.1, 33.6) : 1 - ramp(t, 36.42, 36.6);
    thoughtCloud(ctx, 500, 150, 175, 150, t, { p, tail: [doveEye(dv)[0] + 20, doveEye(dv)[1] - 34], bg: C.yellow, scale: 0.21, at: [480, 610], inside: (k, tt) => cloudScene(k, tt, 'belief', ramp(t, 34.2, 35.72)) });
    if (inR(t, 36.42, 36.6)) { ctx.save(); ctx.globalAlpha = 1 - ramp(t, 36.42, 36.6); star(ctx, 500, 150, 70 * (1 + ramp(t, 36.42, 36.6)), C.white, 0.3); ctx.restore(); } }
  if (inR(t, 61.66, 63.3)) { const p = t < 63.1 ? ramp(t, 61.66, 61.95) : 1 - ramp(t, 63.1, 63.3);
    thoughtCloud(ctx, 1225, 405, 230, 160, t, { p, tail: doveEye(dv), bg: C.yellow, scale: 0.25, at: [560, 640], inside: (k, tt) => cloudScene(k, tt, 'recap', ramp(t, 61.8, 63.1)) }); }
  if (inR(t, 65.4, 69.0)) { const p = t < 68.8 ? ramp(t, 65.4, 65.7) : 1 - ramp(t, 68.8, 69.0), hh = kd16HeronHeadW(heronP(t));
    thoughtCloud(ctx, 1225, 405, 230, 160, t, { p, tail: hh, bg: C.yellow, scale: 0.25, at: [560, 640], inside: (k, tt) => {
      cloudScene(k, tt, 'truth', ramp(t, 67.8, 68.85));
      if (t >= 66.64) { const s = settleTo(t, 66.64, 1.6, 1, 0.12, 0.2); k.save(); k.translate(400, 760); k.scale(s, s); seg(k, -170, -150, 170, 150, 46, C.red, 8); seg(k, 170, -150, -170, 150, 46, C.red, 8); k.restore(); } } }); }
}

// ---------- camera ----------
const CK = [[0, 700, 615, 1.0], [0.5, 700, 615, 1.0], [1.5, 430, 590, 1.15], [2.0, 430, 590, 1.15], [2.8, 390, 360, 1.9], [3.5, 390, 360, 1.9], [4.7, 760, 615, 1.0], [5.5, 760, 615, 1.0], [6.3, 390, 300, 2.6],
  [11.3, 390, 300, 2.6], [11.8, 400, 330, 1.9], [15.3, 400, 330, 1.9], [17.79, 390, 300, 2.5],
  [17.8, 430, 590, 1.15], [21.8, 430, 590, 1.15], [22.5, 390, 380, 1.8], [23.62, 390, 380, 1.8], [23.92, 260, 760, 1.9], [24.3, 260, 760, 1.9], [24.9, 430, 590, 1.15], [27.0, 430, 590, 1.15], [27.6, 330, 640, 1.45], [30.89, 330, 640, 1.45],
  [30.9, 395, 300, 2.6], [37.45, 395, 300, 2.6], [38.2, 430, 590, 1.15], [40.0, 430, 590, 1.15],
  [48.8, 430, 590, 1.15], [49.4, 395, 300, 2.6], [51.0, 395, 300, 2.6], [51.75, 1140, 760, 1.7], [52.1, 1140, 760, 1.7], [53.0, 760, 520, 1.05], [55.9, 760, 520, 1.05], [56.6, 760, 500, 1.1],
  [59.6, 760, 500, 1.1], [60.8, 1137, 590, 1.9], [68.9, 1137, 590, 1.9], [69.15, 430, 590, 1.15], [69.5, 430, 590, 1.15], [69.75, 1137, 590, 1.9], [72.8, 1137, 590, 1.9], [73.3, 1160, 590, 2.15], [78.8, 1160, 590, 2.15], [79.6, 700, 560, 1.15],
  [80.0, 430, 590, 1.15], [84.6, 430, 590, 1.15], [85.2, 700, 600, 1.0], [86.1, 700, 600, 1.0], [86.9, 400, 340, 2.3], [88.4, 400, 340, 2.3], [89.0, 430, 590, 1.15], [94.4, 430, 590, 1.15], [94.6, 260, 760, 2.0], [96.9, 260, 760, 2.0], [97.6, 320, 640, 1.5], [99.29, 320, 640, 1.5],
  [99.3, 395, 360, 1.9], [102.84, 395, 360, 1.9], [104.6, 720, 600, 1.05], [105.9, 720, 600, 1.05], [107.9, 790, 640, 1.3], [108.7, 830, 700, 1.7], [115.9, 830, 700, 1.7], [116.6, 840, 700, 1.85],
  [119.2, 840, 700, 1.85], [124.4, 870, 700, 1.8], [125.0, 880, 690, 1.5], [127.0, 880, 690, 1.5], [127.8, 885, 700, 1.75], [132.6, 885, 700, 1.75], [133.2, 900, 710, 1.9], [135.0, 900, 710, 1.9], [135.4, 720, 560, 1.05], [136.6, 720, 560, 1.05], [137.2, 910, 720, 1.85],
  [138.4, 930, 720, 1.8], [144.6, 930, 720, 2.0], [145.64, 930, 720, 2.0], [146.3, 975, 740, 1.9], [148.0, 975, 740, 1.9], [148.7, 1040, 770, 2.1], [151.8, 1040, 770, 2.1], [152.3, 720, 560, 1.05], [152.7, 720, 560, 1.05], [153.2, 1040, 770, 2.1],
  [156.44, 1040, 770, 2.1], [157.1, 1137, 430, 1.9], [158.16, 1137, 430, 1.9], [159.0, 700, 615, 1.0], [DUR, 700, 615, 1.0]];
const CAM = CK.map(([t, x, y, zoom]) => [t, { x, y, zoom }]);
const camAt = (t) => { const c = K.camAt(CAM, t), z = c.zoom; return { x: cl(c.x, 500 / z, WW - 500 / z), y: cl(c.y, 615 / z, WH - 615 / z), zoom: z }; };

// ---------- overlays (panel space) ----------
function overlays(ctx, t, cam, S) {
  const P = (x, y) => toPanel(x, y, cam);
  const lab = (text, x, y, a, b, o = {}) => { if (t < a || t >= b) return; ctx.save(); ctx.globalAlpha = 1 - ramp(t, b - 0.25, b); S.label(ctx, text, x, y, ramp(t, a, a + 0.5), { size: 46, align: 'center', ...o }); ctx.restore(); };
  const arr = (from, to, a, b, o = {}) => { if (t < a || t >= b) return; ctx.save(); ctx.globalAlpha = 1 - ramp(t, b - 0.25, b); S.arrow(ctx, from, to, ramp(t, a, a + (o.dur || 0.45)), o); ctx.restore(); };
  const word = (text, x, y, a, d, size = 92, o = {}) => { if (t < a || t >= a + d) return; ctx.save(); ctx.globalAlpha = 1 - ramp(t, a + d - 0.25, a + d); sfx(ctx, text, x, y, size, ramp(t, a, a + 0.3), { rot: -0.08, ...o }); ctx.restore(); };
  // HIGH UP!
  arr(P(300, 880), P(300, 380), 2.0, 3.6, { color: C.yellow, width: 22, bend: 0.02, dur: 0.6 });
  if (t >= 2.1 && t < 3.6) { const [x, y] = P(250, 560); lab('HIGH UP!', cl(x, 160, 840), cl(y, 120, 1100), 2.1, 3.6); }
  // CHICKS counter
  if ((t >= 10.58 && t < 51.7) || (t >= 79.3 && t < 99.3)) { const n = t < 38.68 ? 3 : t < 48.18 ? 2 : 1, lastFlip = t < 38.68 ? 10.58 : t < 48.18 ? 38.68 : t < 79.3 ? 48.18 : 79.3;
    ctx.save(); ctx.globalAlpha = t < 79.3 ? 1 - ramp(t, 51.4, 51.7) : 1 - ramp(t, 99.0, 99.3); S.label(ctx, 'CHICKS', 150, 112, t < 79.3 ? ramp(t, 10.58, 11.0) : ramp(t, 79.3, 79.7), { size: 34, align: 'center', tilt: -0.02 }); S.counter(ctx, n, 150, 220, ramp(t, lastFlip, lastFlip + 0.35), { size: 66, color: n < 3 ? C.red : C.black }); ctx.restore(); }
  // ONE CHICK!
  if (t >= 24.64 && t < 26.4) { const f = foxP._cache && foxP._cache.t === t ? foxP._cache.P : foxP(t), paw = foxBody(f, 110, -150), ch = chickHome(0);
    arr(P(paw[0], paw[1]), P(ch[0] - 10, ch[1] + 20), 24.64, 26.4, { color: C.yellow, width: 18, bend: -0.12 }); lab('ONE CHICK!', P(150, 560)[0], P(150, 560)[1], 24.7, 26.4); }
  // the bluff arrow up the trunk (dashed red)
  if (t >= 28.24 && t < 29.6) { const a = P(PALM.x + 40, 760), b = P(NX + 10, NY + 30), k = E.out(ramp(t, 28.24, 28.7)); ctx.save(); ctx.globalAlpha = 1 - ramp(t, 29.35, 29.6); ctx.setLineDash([26, 18]); ctx.lineCap = 'round';
    const ex = lerp(a[0], b[0], k), ey = lerp(a[1], b[1], k); ctx.strokeStyle = C.black; ctx.lineWidth = 22; ctx.beginPath(); ctx.moveTo(a[0], a[1]); ctx.lineTo(ex, ey); ctx.stroke(); ctx.strokeStyle = C.red; ctx.lineWidth = 12; ctx.stroke(); ctx.setLineDash([]);
    shape(ctx, [[ex - 26, ey + 30], [ex, ey - 12], [ex + 26, ey + 30]], C.red, { lw: 5, seed: 3 }); ctx.restore(); }
  { const f = foxP._cache && foxP._cache.t === t ? foxP._cache.P : null; if (f && t >= 29.0 && t < 30.2) { const [mx, my] = P(...foxMouth(f)); word('SNAP!', cl(mx + 150, 140, 860), cl(my - 40, 140, 1100), 29.0, 1.2, 86); } }
  // DAYS LATER... (the one transition)
  if (t >= 40.0 && t < 41.0) S.transition(ctx, 1000, 1230, (t - 40.0) / 1.0, { caption: 'DAYS LATER...' });
  // THE HERON label (53.08) and the ? balloon (57.18)
  if (t >= 53.08 && t < 55.4) { const hh = kd16HeronHeadW(heronP(t)), [hx, hy] = P(hh[0], hh[1]); arr([hx - 60, hy - 230], [hx - 6, hy - 40], 53.08, 55.4, { color: C.yellow, width: 18, bend: 0.15 }); lab('THE HERON', cl(hx - 120, 170, 830), cl(hy - 260, 110, 1100), 53.1, 55.4); }
  if (t >= 57.18 && t < 58.6) { const hh = kd16HeronHeadW(heronP(t)), [hx, hy] = P(hh[0], hh[1]); ctx.save(); ctx.globalAlpha = 1 - ramp(t, 58.4, 58.6); bubble(ctx, hx + 40, hy - 150, 110, 100, hx + 10, hy - 50, ramp(t, 57.18, 57.5), '?', { size: 70 }); ctx.restore(); }
  // the height arrow again on the whip pan (68.9)
  arr(P(300, 880), P(300, 380), 68.95, 69.7, { color: C.yellow, width: 22, bend: 0.02, dur: 0.4 });
  // COME UP!
  arr(P(PALM.x + 60, NY + 40), P(PALM.x + 60, 820), 88.62, 90.8, { color: C.yellow, width: 22, bend: -0.04, dur: 0.6 });
  if (t >= 88.8 && t < 90.8) { const [x, y] = P(PALM.x + 230, 560); lab('COME UP!', cl(x, 180, 830), cl(y, 120, 1100), 88.8, 90.8); }
  { const [x, y] = P(250, 830); word('THUD!', cl(x + 120, 160, 840), cl(y - 120, 140, 1100), 94.25, 1.1, 100); }
  // THE HERON across the panel (102.84)
  if (t >= 102.84 && t < 105.4) { const dv = doveP(t), [ax, ay] = P(dv.x + 50, dv.y - 50), hh = kd16HeronHeadW(heronP(t)), [bx, by] = P(hh[0] - 20, hh[1] + 40);
    arr([ax, ay], [bx, by], 102.84, 105.4, { color: '#4a86f0', width: 22, bend: -0.12, dur: 1.4 }); if (t > 103.6) { const [lx, ly] = P(hh[0] - 40, hh[1] - 120); lab('THE HERON', cl(lx, 170, 830), cl(ly, 110, 1100), 103.6, 105.4); } }
  // WIND (114.94) and the four winds (125.72)
  kd16Wind(ctx, t, 'R', (inR(t, 113.8, 119.2) ? ramp(t, 113.8, 114.2) * (1 - ramp(t, 118.8, 119.2)) : 0) + (inR(t, 124.44, 127.3) ? 1 - ramp(t, 127.0, 127.3) : 0), [0, 250, 1000, 600]);
  kd16Wind(ctx, t, 'L', inR(t, 124.44, 127.3) ? ramp(t, 124.44, 124.8) * (1 - ramp(t, 127.0, 127.3)) : 0, [0, 300, 1000, 500]);
  kd16Wind(ctx, t, 'T', inR(t, 125.0, 127.3) ? ramp(t, 125.0, 125.4) * (1 - ramp(t, 127.0, 127.3)) : 0, [200, 0, 600, 700]);
  if (t >= 114.94 && t < 117.0) { const hh = kd16HeronHeadW(heronP(t)), [hx, hy] = P(hh[0], hh[1]); arr([1000, hy - 40], [hx + 70, hy - 20], 114.94, 117.0, { color: C.white, width: 22, bend: 0.08 }); lab('WIND', 880, cl(hy - 140, 110, 1100), 115.0, 117.0); }
  if (t >= 125.72 && t < 127.3) { const hh = kd16HeronHeadW(heronP(t)), [hx, hy] = P(hh[0], hh[1] + 80); const k = E.inOut(ramp(t, 125.72, 126.6)), r0 = 420, r1 = 170;
    for (let i = 0; i < 4; i++) { const a = i * Math.PI / 2 + 0.6 * k, r = lerp(r0, r1, k); arr([hx + Math.cos(a) * (r + 150), hy + Math.sin(a) * (r + 150) * 0.8], [hx + Math.cos(a) * r, hy + Math.sin(a) * r * 0.8], 125.72, 127.3, { color: C.white, width: 18, bend: 0.2, dur: 0.3 }); } }
  // the dove's unheard warning (135.22)
  if (t >= 135.22 && t < 136.6) { const dv = doveP(t), [bx, by] = P(...doveBeak(dv)); ctx.save(); ctx.globalAlpha = 1 - ramp(t, 136.2, 136.6); soundArcs(ctx, bx + 10, by, 1, t, C.white); ctx.restore(); }
  // POUNCE!
  { const [x, y] = P(975, 640); word('POUNCE!', cl(x, 200, 800), cl(y - 60, 140, 1100), 146.4, 1.3, 96); }
  // the mocking arrow back to the dove (151.8)
  if (t >= 151.8 && t < 153.2) { const f = foxP._cache && foxP._cache.t === t ? foxP._cache.P : foxP(t), [ax, ay] = P(...foxHeadPt(f, 40, -40)), [bx, by] = P(NX + 20, NY + 10); arr([ax, ay], [bx, by], 151.8, 153.2, { color: C.yellow, width: 16, bend: 0.12, dur: 0.5 }); }
  // GULP!
  { const [x, y] = P(1330, 520); word('GULP!', cl(x, 200, 820), cl(y, 140, 1100), 157.5, 1.5, 104); }
  // THE END
  if (t >= 162.0) S.title(ctx, 'THE END', 640, 260, B(t, 162.0, 0.8), { size: 84, align: 'center' });
}

const SCENE = {
  duration: DUR,
  draw(ctx, W, H, t, S) {
    S0 = S; foxP._cache = null;
    const sh = (t >= 30.1 && t < 30.5 ? 4 * Math.sin(t * 70) * (1 - ramp(t, 30.1, 30.5)) : 0) + (t >= 94.2 && t < 94.6 ? 5 * Math.sin(t * 80) * (1 - ramp(t, 94.2, 94.6)) : 0) + (t >= 146.3 && t < 146.45 ? 6 * Math.sin(t * 90) : 0);
    S.background(ctx, W, H, t, { dot: C.blue });
    const px = 54, py = 54, pw = 972, ph = 1196;
    S.box(ctx, px, py, pw, ph, 1, { fill: C.blue, lw: 11, seed: 3 });
    ctx.save(); ctx.beginPath(); ctx.rect(px + 9, py + 9, pw - 18, ph - 18); ctx.clip(); ctx.translate(px + sh * 0.8, py - sh * 0.5); ctx.scale(pw / 1000, ph / WH);
    const cam = camAt(t); ctx.save(); K.camera(ctx, 1000, WH, cam); drawWorld(ctx, t, cam); ctx.restore(); overlays(ctx, t, cam, S);
    ctx.restore(); subtitle(ctx, W, H, t, 1);
    S.finish(ctx, W, H, t);
  },
  score(k, S) {   // sparse, quiet, only in narration pauses (master 0.6 at render)
    k.play('pop', 4.95, { pitch: 1.3, gain: 0.35 });
    k.play('pop', 11.55, { pitch: 1.5, gain: 0.35 });
    k.play('chime', 17.6, { note: 'E6', gain: 0.35 });
    k.play('whoosh', 23.55, { dur: 0.3, gain: 0.3 });
    k.play('pop', 45.7, { pitch: 0.9, gain: 0.3 });
    k.play('pop', 51.75, { pitch: 1.6, gain: 0.4 });
    k.play('pop', 59.25, { pitch: 1.8, gain: 0.3 });
    k.play('chime', 79.2, { note: 'G5', gain: 0.35 });
    k.play('thud', 94.25, { gain: 0.6 });
    k.play('whoosh', 127.3, { dur: 0.4, gain: 0.3 });
    k.play('chime', 161.9, { note: 'C6', gain: 0.55 });
  },
};
window.SCENE = SCENE;
})();
