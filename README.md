# カラーピッカー

`<input type="color" />` を用いたカラーピッカー (Tauri v2 + React + Vite)。
他のソフトを跨いで色を取得できます。

- 取得した色は右側の履歴に最大 6 件残ります。カラーコード (HEX / RGB / HSL) とクォートの有無を選んでコピーできます
- 履歴の色見本を左のパレットへドラッグ&ドロップで配置できます。パレット同士でもコピー可能、ダブルクリックでクリア

## 開発

前提: Node.js 20.19+ / 22.12+、Rust、[Tauri の前提パッケージ](https://v2.tauri.app/start/prerequisites/) (Linux なら `webkit2gtk4.1-devel` など)

```sh
npm install
npm run tauri dev     # 開発
npm run tauri build   # ビルド
```
