# カラーピッカー

`<input type="color" />` を用いたカラーピッカー (Tauri v2 + React + Vite)。
他のソフトを跨いで色を取得できます。

使い方: https://bunnmei.github.io/tauri-color-picker/

- 取得した色は右側の履歴に最大 6 件残ります。カラーコード (HEX / RGB / HSL) とクォートの有無を選んでコピーできます
- 履歴の色見本を左のパレットへドラッグ&ドロップで配置できます。パレット同士でもコピー可能、ダブルクリックでクリア

## 開発

前提: Node.js 20.19+ / 22.12+、Rust、[Tauri の前提パッケージ](https://v2.tauri.app/start/prerequisites/) (Linux なら `webkit2gtk4.1-devel` など)

```sh
npm install
npm run tauri dev     # 開発
npm run tauri build   # ビルド
npm run build:web     # ブラウザ版 (docs/app) を作り直す
```

## リリースの手順

`v1.2.3` のようなタグを push すると、GitHub Actions (`.github/workflows/release.yml`) が Windows / macOS / Linux 向けにビルドし、GitHub Release の**下書き**にインストーラーを添付します。

### 1. バージョンを上げる

スクリプトで全部まとめて書き換えられます (`v` は付けても付けなくてもよい)。

```sh
python3 scripts/bump_version.py v1.2.3
```

書き換えるのは次のファイルで、終わると続けて打つ git のコマンドが表示されます。

| ファイル | 書き換える場所 | 備考 |
| --- | --- | --- |
| `src-tauri/tauri.conf.json` | `"version"` | **タグと一致しないと Actions がエラーで止まる**。インストーラーのバージョンもここから決まる |
| `src-tauri/Cargo.toml` | `[package]` の `version` | |
| `src-tauri/Cargo.lock` | `color-picker` の `version` | |
| `package.json` | `"version"` | |
| `package-lock.json` | 先頭と `packages[""]` の `"version"` | |

<details>
<summary>手で書き換える場合</summary>

上の表のファイルを同じバージョンにそろえます。`Cargo.lock` は手で直す代わりに次でも更新できます。

```sh
cargo update -p color-picker --manifest-path src-tauri/Cargo.toml
```

</details>

### 2. コミットしてタグを付ける

```sh
git add -A
git commit -m "v1.2.3"
git push origin main

git tag v1.2.3            # 先頭に v を付ける
git push origin v1.2.3    # タグの push で Actions が動く
```

### 3. 公開する

1. GitHub の Actions タブで 3 つのビルド (windows-x64 / linux-x64 / macos-arm64) が成功するのを待つ
2. Releases に下書きができているので、内容を確認して「Publish release」を押す

### 失敗したときにタグを付け直す

```sh
git tag -d v1.2.3                  # ローカルのタグを消す
git push origin --delete v1.2.3    # GitHub のタグを消す
# 直してコミット・push したあと、もう一度 2. のタグの手順を行う
```

GitHub に残った下書きの Release は、手で削除してから付け直してください。
