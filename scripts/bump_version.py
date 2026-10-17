#!/usr/bin/env python3
"""アプリのバージョンをまとめて書き換える。

    python3 scripts/bump_version.py v1.2.3

次のファイルの version を同じ値にそろえる (書式はそのまま、version の値だけ置き換える)。
  - src-tauri/tauri.conf.json   (リリース用 Actions がタグと照合する)
  - src-tauri/Cargo.toml        ([package] の version)
  - src-tauri/Cargo.lock        (color-picker パッケージの version)
  - package.json
  - package-lock.json           (先頭と packages[""] の version)
"""

import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
CRATE_NAME = "color-picker"

# (ファイル, 置き換える正規表現, 置き換える個数)
# 正規表現のグループ 1 と 3 はそのまま残し、グループ 2 (バージョン) だけ差し替える
TARGETS = [
    ("src-tauri/tauri.conf.json", r'^(  "version": ")([^"]+)(")', 1),
    ("src-tauri/Cargo.toml", r'(\[package\][^\[]*?^version = ")([^"]+)(")', 1),
    ("src-tauri/Cargo.lock", rf'(^name = "{CRATE_NAME}"\nversion = ")([^"]+)(")', 1),
    ("package.json", r'^(  "version": ")([^"]+)(")', 1),
    ("package-lock.json", r'^(  "version": "|      "version": ")([^"]+)(")', 2),
]

SEMVER = re.compile(r"\d+\.\d+\.\d+(?:-[0-9A-Za-z.-]+)?")


def main() -> int:
    if len(sys.argv) != 2:
        print("使い方: python3 scripts/bump_version.py v1.2.3", file=sys.stderr)
        return 1

    version = sys.argv[1].removeprefix("v")
    if not SEMVER.fullmatch(version):
        print(f"バージョンの形式が正しくありません: {sys.argv[1]} (例: v1.2.3)", file=sys.stderr)
        return 1

    # 全ファイルを確認してから書き込む (途中で失敗して一部だけ変わるのを防ぐ)
    updates = []
    for name, pattern, count in TARGETS:
        path = ROOT / name
        text = path.read_text(encoding="utf-8")
        regex = re.compile(pattern, re.MULTILINE | re.DOTALL)
        matches = list(regex.finditer(text))[:count]
        if len(matches) != count:
            print(f"{name}: version が見つかりませんでした", file=sys.stderr)
            return 1
        old = matches[0].group(2)
        new_text = regex.sub(lambda m: m.group(1) + version + m.group(3), text, count=count)
        updates.append((path, name, old, new_text))

    for path, name, old, new_text in updates:
        path.write_text(new_text, encoding="utf-8")
        print(f"  {name}: {old} -> {version}")

    tag = f"v{version}"
    print(f"""
バージョンを {version} にしました。続けて:

  git add -A
  git commit -m "{tag}"
  git push origin main
  git tag {tag}
  git push origin {tag}""")
    return 0


if __name__ == "__main__":
    sys.exit(main())
