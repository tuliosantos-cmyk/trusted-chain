import { Frame } from "./engine";
import { pad } from "./scenes";

/** Layout de cena "produto": mock + legenda, reorganizado por formato. */
export function splitLayout(f: Frame) {
  const p = pad(f);
  if (f.v) {
    return {
      p,
      mock: { x: p, y: f.h * 0.15, w: f.w - 2 * p, h: f.h * 0.45 },
      cap: { x: p, y: f.h * 0.66, w: f.w - 2 * p },
    };
  }
  const inner = f.w - 2 * p;
  return {
    p,
    mock: { x: p, y: f.h * 0.17, w: inner * 0.55, h: f.h * 0.62 },
    cap: { x: p + inner * 0.62, y: f.h * 0.3, w: inner * 0.38 },
  };
}

/** Layout de cena "problema": arte + legenda. */
export function artLayout(f: Frame) {
  const p = pad(f);
  if (f.v) {
    return {
      p,
      art: { cx: f.w / 2, cy: f.h * 0.38, size: Math.min(f.w - 2 * p, f.h * 0.42) },
      cap: { x: p, y: f.h * 0.68, w: f.w - 2 * p },
    };
  }
  const inner = f.w - 2 * p;
  return {
    p,
    art: { cx: p + inner * 0.28, cy: f.h * 0.5, size: Math.min(inner * 0.5, f.h * 0.66) },
    cap: { x: p + inner * 0.6, y: f.h * 0.34, w: inner * 0.4 },
  };
}
