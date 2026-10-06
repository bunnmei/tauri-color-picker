import { useEffect, useState } from "react";
import ColorPalette from "./components/ColorPalette/ColorPalette";
import ColorPicker from "./components/ColorPicker/ColorPicker";
import PaletteOptions from "./components/PaletteOptions/PaletteOptions";
import PickerOptions from "./components/PickerOptions/PickerOptions";
import ThemeToggle from "./components/ThemeToggle/ThemeToggle";
import useLocalStorage from "./hooks/useLocalStorage";

const SLOT_COUNT = 15;
const HISTORY_SIZE = 6;
const DEFAULT_HISTORY = ["#ff7f7f", "#ff7fff", "#7f7fff", "#7fffff", "#7fff7f", "#ffff7f"];

export default function App() {
  const [theme, setTheme] = useLocalStorage("theme", "light");
  const [history, setHistory] = useLocalStorage("picked", DEFAULT_HISTORY);
  const [slots, setSlots] = useLocalStorage("palette", Array(SLOT_COUNT).fill(null));
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

  const setSlot = (index, color) => {
    setSlots((s) => s.map((c, i) => (i === index ? color : c)));
  };

  return (
    <div className="app">
      <section className="card area-palette">
        <ColorPalette slots={slots} background={paletteBg} onChange={setSlot} />
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
