export const FORMATS = ["hex", "rgb", "hsl"];
export const QUOTES = ["none", "single", "double"];

// ドラッグ&ドロップで色を受け渡すときの MIME タイプ
export const DRAG_TYPE = "text/plain";

const HEX_RE = /^#[0-9a-f]{6}$/i;

export const isHex = (value) => HEX_RE.test(value);

export function hexToRgb(hex) {
  const n = parseInt(hex.slice(1), 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}

export function rgbToHsl([r, g, b]) {
  r /= 255;
  g /= 255;
  b /= 255;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const d = max - min;
  const l = (max + min) / 2;
  let h = 0;
  let s = 0;
  if (d !== 0) {
    s = d / (1 - Math.abs(2 * l - 1));
    if (max === r) h = ((g - b) / d + 6) % 6;
    else if (max === g) h = (b - r) / d + 2;
    else h = (r - g) / d + 4;
    h *= 60;
  }
  return [Math.round(h), Math.round(s * 100), Math.round(l * 100)];
}

export function formatColor(hex, format) {
  switch (format) {
    case "rgb": {
      const [r, g, b] = hexToRgb(hex);
      return `rgb(${r},${g},${b})`;
    }
    case "hsl": {
      const [h, s, l] = rgbToHsl(hexToRgb(hex));
      return `hsl(${h},${s}%,${l}%)`;
    }
    default:
      return hex.toUpperCase();
  }
}

export function quoteText(text, quote) {
  if (quote === "single") return `'${text}'`;
  if (quote === "double") return `"${text}"`;
  return text;
}
