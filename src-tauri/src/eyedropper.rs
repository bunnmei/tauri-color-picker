//! xdg-desktop-portal の Screenshot.PickColor でスポイトを実現する。
//! Wayland ではアプリが画面を直接読めないため、デスクトップ環境 (KDE / GNOME など) に
//! 色の選択を依頼し、ユーザーがクリックした 1 点の色だけを受け取る。

use ashpd::desktop::{Color, ResponseError};

pub async fn pick() -> Result<Option<String>, String> {
    let request = Color::pick()
        .send()
        .await
        .map_err(|e| format!("ポータルを呼び出せませんでした: {e}"))?;

    match request.response() {
        Ok(color) => Ok(Some(to_hex(color.red(), color.green(), color.blue()))),
        Err(ashpd::Error::Response(ResponseError::Cancelled)) => Ok(None),
        Err(e) => Err(format!("色を取得できませんでした: {e}")),
    }
}

/// 0.0〜1.0 の RGB を `#rrggbb` にする
fn to_hex(r: f64, g: f64, b: f64) -> String {
    let c = |v: f64| (v.clamp(0.0, 1.0) * 255.0).round() as u8;
    format!("#{:02x}{:02x}{:02x}", c(r), c(g), c(b))
}

#[cfg(test)]
mod tests {
    use super::to_hex;

    #[test]
    fn converts_unit_rgb_to_hex() {
        assert_eq!(to_hex(1.0, 0.0, 0.5), "#ff0080");
        assert_eq!(to_hex(0.0, 0.0, 0.0), "#000000");
        assert_eq!(to_hex(1.2, -0.1, 1.0), "#ff00ff");
    }
}
