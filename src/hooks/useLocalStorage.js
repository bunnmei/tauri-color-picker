import { useEffect, useState } from "react";

// 値は JSON で保存する。読めない値 (旧バージョンの形式など) は既定値にフォールバックする
export default function useLocalStorage(key, defaultValue) {
  const [value, setValue] = useState(() => {
    try {
      const stored = localStorage.getItem(key);
      return stored === null ? defaultValue : JSON.parse(stored);
    } catch {
      return defaultValue;
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
