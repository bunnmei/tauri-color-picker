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
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
