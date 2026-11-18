// ===== AN-135 S1-S2: the hunt on the country road (3000-wide strip), and the thirst =====
const A135_ROAD = { w: 3000, u: 0.26, places: [{ kind: 'tree', x: 500 }, { kind: 'bush', x: 1100 }, { kind: 'milestone', x: 1900 }, { kind: 'bush', x: 2300 }], house: { x: 1230, lit: 0 } };
const A135_RX = a135X([[0, 120], [1.4, 380], [4.18, 860], [7.6, 2060], [8.4, 2140], [8.72, 2150], [13.3, 2520]]);
const A135_RS = 0.6;
// the gazelle: springs from the bush at 2.92, bounds right, leaps the milestone, vanishes behind the far bush
const A135_GZX = a135X([[2.92, 1100], [4.2, 1190], [6.1, 1840], [7.45, 2390], [8.0, 2620]]);   // v2: always 250+ ahead of the horse, gains from 6.10, leaps into the far bush by 7.5
function a135Gazelle(t) { if (t < 2.92 || t > 7.9) return null; const x = A135_GZX(t), d = t - 2.92, hp = 0.55, k = Math.floor(d / hp), f = d / hp - k;
  let y = 900 - 70 * Math.sin(Math.PI * f) * (k < 1 ? 0.6 : 1); if (a135In(t, 6.9, 7.7)) y = 900 - 150 * Math.sin(Math.PI * (t - 6.9) / 0.8);
  return { x, y, s: 0.5, dir: 1, ph: d * 9, amp: 0.9, ears: 1, eyes: 'wide', gaze: [1, -0.1], seed: 31, landT: 2.92 + (k + 1) * hp }; }
function a135RoadHorse(t) {
  const H = { y: 900, s: A135_RS, pal: 0, seed: 5, dir: 1, ...walk(A135_RX, t, { stride: GAIT.horse * A135_RS }) }, v = speed(A135_RX, t);
  H.gallop = K.clamp((v - 200) / 120); H.earL = 0.4; H.earR = 0.4; H.tailUp = 0.5 * H.gallop; H.tailSwish = 0.3 * Math.sin(t * 2);
  if (a135In(t, 3.3, 4.4)) { H.earL = 1; H.earR = 1; H.neck = 0.6 * pulse(t, 3.3, 1.1); H.gaze = [1, -0.05]; }
  H.sq = anticipate(t, 3.93, 0.25, 0.06);
  H.rear = 0.4 * pulse(t, 7.7, 0.9);
  if (t >= 8.72) { H.headDown = kfn(t, [[8.72, 0.1], [9.3, 0.45]]); H.sag = 0.4 * a135B(t, 8.72, 0.6); H.earL = -0.3; H.earR = 0.2;
    if (a135In(t, 10.4, 11.1)) { H.headTurn = 0.6 * pulse(t, 10.4, 0.7) / 1; H.tongue = true; H.talk = 0.5; H.snort = pulse(t, 10.7, 0.4); }
    if (t > 12.14) { H.earL = 1; H.earR = 1; H.headDown = 0.2; H.sag = 0.1; } }
  return H;
}
function a135RoadRider(t) {
  const P = { costume: 'caliph', pal: { head: 'bigTurban' }, age: 0.35, s: 0.72, seed: 3, noBlink: true, mouth: t < 3.3 ? 'smile' : t < 7.7 ? 'open' : 'o', lurch: lurch(t, 7.6, 0.3) };
  P.gaze = t < 3.3 ? [1, 0] : t < 7.75 ? [1, -0.05] : t < 8.2 ? [-1, 0] : t < 8.72 ? [1, 0.05] : t < 11.16 ? [0.4, 0.5] : [1, -0.1];
  P.lid = Math.max(t >= 9.34 && t < 11.16 ? 0.5 : 0, blink(t, 3)); P.brow = a135In(t, 3.3, 7.7) ? 0.6 : t >= 11.16 ? -0.5 : t >= 9.0 ? -0.4 : 0;
  P.tip = (a135In(t, 3.6, 7.6) ? 0.1 : 0) + (a135In(t, 9.34, 11.16) ? 0.1 : 0) * a135B(t, 9.34, 0.3);
  if (a135In(t, 9.34, 10.4)) { P.handR = [44, -210 + 6 * Math.sin(t * 9)]; P.handL = [34, -122]; P.mouth = 'open'; }
  if (t >= 11.16 && t < 13.3) { P.handR = a135Tr(t, [[11.16, [52, -118]], [11.16, A135H.shadeR, 0.3]]); P.handL = [34, -122]; P.sq = settleTo(t, 11.4, 0.95, 1.04, 0.4) * anticipate(t, 11.16, 0.25, 0.05); }
  if (t < 3.3) P.tilt = -0.05;
  if (t >= 7.75 && t < 8.2) { P.look = -1.5; P.tilt = 0.08; } else if (t >= 8.2 && t < 8.72) { P.look = 1.5; P.tilt = -0.08; }
  return P;
}
function a135Road(ctx, t, cam) {
  const camX = cam.x - 500 / cam.zoom;
  countryRoad(ctx, { ...A135_ROAD, t, camX });
  // the sun swells with the heat (S2)
  if (t >= 8.4) { const k = 1 + 0.25 * a135B(t, 8.72, 1.0) + 0.04 * Math.sin(t * 6); ctx.save(); ctx.translate(cam.x + 230 / cam.zoom, cam.y - 440 / cam.zoom); ctx.scale(k / cam.zoom * 1.3, k / cam.zoom * 1.3); sun(ctx, 0, 0, t); ctx.restore(); }
  // huntsmen: close behind at first, then left behind; one waves in vain
  for (let i = 0; i < 2; i++) { const st = i * 0.35, hx = t < 4.18 ? A135_RX(t - st) - 210 - i * 150 : A135_RX(4.18 - st) - 210 - i * 150 + (t - 4.18) * 120;
    if (hx < camX - 300) continue; const xf = (tt) => (tt < 4.18 ? A135_RX(tt - st) - 210 - i * 150 : A135_RX(4.18 - st) - 210 - i * 150 + (tt - 4.18) * 120);
    const M = { y: 900, s: 0.45, pal: 1 + i, seed: 40 + i, dir: 1, ...walk(xf, t, { stride: GAIT.horse * 0.45 }) };
    const R = { costume: 'servant', s: 0.5, seed: 41 + i, noBlink: true, lid: blink(t, 41 + i), mouth: t > 4.6 ? 'o' : 'closed', gaze: [1, 0] };
    if (i === 0 && t > 4.8) R.handR = [64, -196 + 10 * Math.sin(t * 12)];
    rideOn(ctx, 'horse', M, R); }
  const gz = a135Gazelle(t); if (gz) { deer(ctx, gz); }   // v2: drawn before (behind) the king's horse
  const H = a135RoadHorse(t);
  rideOn(ctx, 'horse', H, a135RoadRider(t));
  const bag = a135BagAt(H); a135Bag(ctx, bag[0], bag[1], H.s * 1.25, { rot: bag[2], crown: true, flap: pulse(t, 2.0, 0.9), lift: 20 * pulse(t, 2.0, 0.9) });
  const q = pulse(t, 2.2, 0.5); if (q > 0) star(ctx, bag[0] - 6, bag[1] - 20, 18 * q, C.white, t * 2);
  if (t >= 9.34 && t < 10.6) { const sd = a135W({ x: H.x + 10, y: 900 - 200 * A135_RS - 60, s: 0.72, dir: 1 }, [30, -200]); drops(ctx, sd[0] + 20, sd[1] + 10, t, 2, '#5fa0ff'); }
  // dust at the gallop
  if (a135In(t, 4.18, 8.0)) for (let k = 0; k < 6; k++) { const tk = 4.3 + k * 0.6; dustBurst(ctx, A135_RX(tk) - 60, 900, t - tk, 5, 8, 16, 40, 0.6, k * 3); }
  if (a135In(t, 6.74, 8.0)) { ctx.save(); ctx.globalAlpha = 0.6 * a135Fade(t, 6.74, 8.0, 0.2); ctx.lineCap = 'round'; for (let k = 0; k < 7; k++) { const y = 915 + k * 7, x0 = A135_RX(t) - 160 - ((t * 900 + k * 97) % 260); seg(ctx, x0, y, x0 - 90, y, 3, C.white, 2); } ctx.restore(); }
  if (gz && t < 3.4) dustBurst(ctx, 1100, 880, t - 2.92, 8, 8, 18, 60, 0.6, 2);
  if (t < 8.72) countryRoad(ctx, { ...A135_ROAD, front: true, occlude: [3] });
}
