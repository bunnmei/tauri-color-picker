import { invoke } from "@tauri-apps/api/core";

// Tauri アプリとして動いているか。docs/app の Web 版では false
const isTauri = () => "__TAURI_INTERNALS__" in window;

// 独自のスポイトボタンを出すかどうか。
// Tauri: ネイティブの色選択ダイアログにスポイトが無い OS (Linux) のときだけ
// Web: ブラウザが EyeDropper API に対応しているとき (Chrome / Edge)
export async function isScreenPickerSupported() {
  if (!isTauri()) return "EyeDropper" in window;
  try {
    return await invoke("screen_picker_supported");
  } catch {
    return false;
  }
}

// 画面上の色を `#rrggbb` で返す。キャンセル時は null
export async function pickScreenColor() {
  if (isTauri()) return invoke("pick_screen_color");
  try {
    const { sRGBHex } = await new window.EyeDropper().open();
    return sRGBHex.toLowerCase();
  } catch (err) {
    if (err.name === "AbortError") return null;
    throw err;
  }
}
