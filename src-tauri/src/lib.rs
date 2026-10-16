#[cfg(target_os = "linux")]
mod eyedropper;

/// Linux ではネイティブの色選択ダイアログにスポイトが無いため、
/// フロントエンドは独自のスポイトボタンを出すかどうかをこれで判断する
#[tauri::command]
fn screen_picker_supported() -> bool {
    cfg!(target_os = "linux")
}

/// 画面上の色を 1 つ取得して `#rrggbb` で返す。キャンセル時は `None`
#[tauri::command]
async fn pick_screen_color() -> Result<Option<String>, String> {
    #[cfg(target_os = "linux")]
    return eyedropper::pick().await;

    #[cfg(not(target_os = "linux"))]
    Err("この OS では未対応です".into())
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    // NVIDIA (プロプライエタリドライバ) + Wayland では WebKitGTK の DMABUF レンダラーが
    // "Error 71 (Protocol error) dispatching to Wayland display" で落ちるため無効化する。
    // 環境変数で明示的に指定されている場合はそちらを優先する
    #[cfg(target_os = "linux")]
    if std::env::var_os("WEBKIT_DISABLE_DMABUF_RENDERER").is_none() {
        std::env::set_var("WEBKIT_DISABLE_DMABUF_RENDERER", "1");
    }

    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![screen_picker_supported, pick_screen_color])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
