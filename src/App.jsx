import { useEffect, useState } from "react";
import ColorPalette from "./components/ColorPalette/ColorPalette";
import ColorPicker from "./components/ColorPicker/ColorPicker";
import PaletteOptions from "./components/PaletteOptions/PaletteOptions";
import PickerOptions from "./components/PickerOptions/PickerOptions";
import ThemeToggle from "./components/ThemeToggle/ThemeToggle";
import useLocalStorage from "./hooks/useLocalStorage";

const HISTORY_SIZE = 6;
const DEFAULT_HISTORY = ["#ff7f7f", "#ff7fff", "#7f7fff", "#7fffff", "#7fff7f", "#ffff7f"];

// 旧バージョンは "palette" に 15 枠 (先頭 10 が小、残り 5 が大) を 1 つの配列で保存していた
function legacyPalette(kind) {
  try {
    const old = JSON.parse(localStorage.getItem("palette"));
    if (Array.isArray(old)) return kind === "small" ? old.slice(0, 10) : old.slice(10);
  } catch {
    // 読めなければ空のパレットから始める
  }
  return [];
}

export default function App() {
  const [theme, setTheme] = useLocalStorage("theme", "light");
  const [history, setHistory] = useLocalStorage("picked", DEFAULT_HISTORY);
  // 表示する枠の数は画面幅で変わるので、配列は表示数より短くても長くてもよい。
  // 狭くして隠れた枠の色も残しておき、広げたときにまた表示する
  const [smallSlots, setSmallSlots] = useLocalStorage("palette-small", () => legacyPalette("small"));
  const [largeSlots, setLargeSlots] = useLocalStorage("palette-large", () => legacyPalette("large"));
  const [format, setFormat] = useLocalStorage("format", "hex");
  const [quote, setQuote] = useLocalStorage("quote", "none");
  // null のときはテーマの背景色を使う
  const [paletteBg, setPaletteBg] = useState(null);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  const toggleTheme = () => {
    setTheme((t) => (t === "light" ? "dark" : "light"));
    setPaletteBg(null);
  };

  const addToHistory = (color) => {
    setHistory((h) => [color, ...h].slice(0, HISTORY_SIZE));
  };

  const setSlot = (kind, index, color) => {
    const update = (s) => {
      const next = [...s];
      next[index] = color;
      return Array.from(next, (c) => c ?? null);
    };
    (kind === "small" ? setSmallSlots : setLargeSlots)(update);
  };

  return (
    <div className="app">
      <section className="card area-palette">
        <ColorPalette small={smallSlots} large={largeSlots} background={paletteBg} onChange={setSlot} />
      </section>
      <section className="card area-theme">
        <ThemeToggle theme={theme} onToggle={toggleTheme} />
      </section>
      <section className="area-picker">
        <ColorPicker history={history} format={format} quote={quote} onPick={addToHistory} />
      </section>
      <section className="card area-options">
        <PickerOptions format={format} onFormatChange={setFormat} quote={quote} onQuoteChange={setQuote} />
      </section>
      <section className="card area-palette-options">
        <PaletteOptions theme={theme} value={paletteBg} onChange={setPaletteBg} />
      </section>
    </div>
  );
}
