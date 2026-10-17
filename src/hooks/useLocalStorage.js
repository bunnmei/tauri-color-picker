import { useEffect, useState } from "react";

// 値は JSON で保存する。読めない値 (旧バージョンの形式など) は既定値にフォールバックする。
// defaultValue に関数を渡すと、保存された値が無いときだけ呼んで既定値にする
export default function useLocalStorage(key, defaultValue) {
  const [value, setValue] = useState(() => {
    const fallback = () => (typeof defaultValue === "function" ? defaultValue() : defaultValue);
    try {
      const stored = localStorage.getItem(key);
      return stored === null ? fallback() : JSON.parse(stored);
    } catch {
      return fallback();
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch {
      // 保存できなくてもアプリは動かす
    }
  }, [key, value]);

  return [value, setValue];
}
