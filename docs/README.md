# docs/ — GitHub Pages サイト

https://bunnmei.github.io/tauri-color-picker/ で公開されるアプリのサイトです（日本語 / 英語）。

ローカルで起動

```
python3 -m http.server 8000
```

```
docs/
  .nojekyll        Jekyll を通さず、そのまま公開する
  index.html       言語の振り分け（前回選んだ言語 → ブラウザの言語）
  assets/          共通部品（MobileWebCamera の docs と同じもの）
    site.css         デザイン（ライト/ダーク自動切替）
    site.js          ヘッダーの影、言語の記憶、コードのコピーボタン
  img/icon.svg     アプリのアイコン（src-tauri/icons/icon.svg のコピー）
  app/             ブラウザ版のアプリ（npm run build:web の出力。手で編集しない）
  ja/  en/         各ページの本文
    index.html       トップ
    guide.html       使い方
    web.html         ブラウザ版を埋め込んだページ
```

## ブラウザ版を更新する

`src/` を変えたら、リポジトリのルートで次を実行して `docs/app/` を作り直し、一緒にコミットします。

```
npm run build:web
```

ブラウザ版では Tauri の機能が使えないので、スポイトはブラウザの EyeDropper API（Chrome / Edge）を使います（`src/lib/eyedropper.js`）。

## 公開のしかた

GitHub のリポジトリ → Settings → Pages → Source を「Deploy from a branch」、Branch を `main` / `/docs` にして保存。

## アイコンを変えたとき

元データは `src-tauri/icons/icon.svg`（Inkscape で編集可）。編集したら、アプリ用の PNG / ICO / ICNS を作り直して、サイト用にもコピーします。

```
npx tauri icon src-tauri/icons/icon.svg
rm -rf src-tauri/icons/android src-tauri/icons/ios   # デスクトップ専用なので不要
cp src-tauri/icons/icon.svg docs/img/icon.svg
```

Inkscape で保存するときは「Inkscape SVG」のままで構いません。
