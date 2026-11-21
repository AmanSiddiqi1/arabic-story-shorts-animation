// temporary plate test (removed before handing over)
SB_SHOTS.push({ a: 0, b: 10, cam: (t) => ({ x: t < 1 ? 1000 : t < 2 ? 1900 : 1000, y: t < 1 ? 376 : 615, zoom: t < 1 ? 0.72 : 1 }), world: (ctx, t, cam) => {
  sbCoveBack(ctx, t, cam, { lit: t > 1.5 ? 1 : 0 });
  const r = sbRaft(ctx, { x: 1850, y: 925, build: 1, pole: 1, flag: 1, lamp: 0.8, cargo: { food: 1, skin: 1, gems: 9 }, t, rider: (c) => { const P = sbLive(t, 11, { x: 0, y: -8, kneel: 1, dir: 1, gaze: [1, 0] }); sbSin6(c, P); } });
  sbDuck(ctx, { x: 1500, y: 900, s: 0.95, dir: 1, t }, 1, sbSin6);
  sbSin6(ctx, sbLive(t, 11, { x: 1300, y: 900, dir: 1, t }));
  sbCoveFront(ctx, t, cam);
} });
SB_SHOTS.push({ a: 10, b: 20, cam: (t) => ({ x: [600, 2000, 3500, 4300, 5400, 7300][Math.floor(t - 10) % 6], y: 615, zoom: 1 }), world: (ctx, t, cam) => {
  const rx = cam.x - 70, wy = (x) => sbTunWY(x, t), f = sbRaftFloat(rx, wy), lampP = sbRaftPt({ x: rx, y: f.y, rot: f.rot }, -108, -90);
  sbTunnel(ctx, t, cam, { x: lampP[0], y: lampP[1], flame: 0.8 }, { day: Math.floor(t - 10) === 0 ? 0.7 : 0, exit: Math.floor(t - 10) === 5 ? 0.5 : 0 });
  castFinish(ctx, rx, f.y, 400, 300, (c) => sbRaft(c, { x: rx, y: f.y, rot: f.rot, build: 1, pole: 1, flag: 1, lamp: 0.8, cargo: { food: 1, gems: 9 }, t, rider: (q) => { const P = sbLive(t, 11, { x: 0, y: -8, kneel: 1, dir: 1, gaze: [1, 0] }); sbSin6(q, P); } }), { rim: '#ffd27a', light: [-1, -1] });
  sbBat(ctx, 3650, 210, { t, eye: 1 });
} });
SB_SHOTS.push({ a: 20, b: 30, cam: (t) => ({ x: [600, 1500, 2400][Math.floor(t - 20) % 3], y: 615, zoom: 1 }), world: (ctx, t, cam) => { sbVillage(ctx, t, cam); sbVillageFront(ctx, t); } });
