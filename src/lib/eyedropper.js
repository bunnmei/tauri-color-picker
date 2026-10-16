import { invoke } from "@tauri-apps/api/core";

// ネイティブの色選択ダイアログにスポイトが無い OS (Linux) かどうか。
// ブラウザで `npm run dev` している場合など Tauri 外では false
export async function isScreenPickerSupported() {
  try {
    return await invoke("screen_picker_supported");
  } catch {
    return false;
  }
}

// 画面上の色を `#rrggbb` で返す。キャンセル時は null
export function pickScreenColor() {
  return invoke("pick_screen_color");
}
