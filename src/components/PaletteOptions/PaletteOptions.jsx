import "./PaletteOptions.css";

const THEME_BG = { light: "#e0e0e0", dark: "#333333" };

export default function PaletteOptions({ theme, value, onChange }) {
  return (
    <label className="palette-options">
      <span>パレットの色</span>
      <input
        type="color"
        className="color-input"
        value={value ?? THEME_BG[theme]}
        onChange={(e) => onChange(e.target.value)}
      />
    </label>
  );
}
