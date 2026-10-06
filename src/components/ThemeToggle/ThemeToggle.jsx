import "./ThemeToggle.css";

export default function ThemeToggle({ theme, onToggle }) {
  return (
    <div className="theme-toggle-wrap">
      <button
        type="button"
        className="theme-toggle sunken"
        onClick={onToggle}
        aria-label="テーマ切り替え"
      >
        <span className={`theme-toggle-knob ${theme}`}>{theme}</span>
      </button>
    </div>
  );
}
