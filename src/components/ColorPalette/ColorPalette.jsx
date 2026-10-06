import { DRAG_TYPE, isHex } from "../../lib/color";
import "./ColorPalette.css";

const SMALL_COUNT = 10;

function Slot({ color, size, onChange }) {
  const handleDrop = (e) => {
    e.preventDefault();
    const dropped = e.dataTransfer.getData(DRAG_TYPE);
    if (isHex(dropped)) onChange(dropped);
  };

  return (
    <div
      className={`slot slot-${size} ${color ? "" : "sunken"}`}
      style={color ? { background: color } : undefined}
      draggable={Boolean(color)}
      onDragStart={(e) => e.dataTransfer.setData(DRAG_TYPE, color)}
      onDragOver={(e) => e.preventDefault()}
      onDrop={handleDrop}
      onDoubleClick={() => onChange(null)}
      title={color ? "ダブルクリックでクリア" : "ここに色をドロップ"}
    />
  );
}

export default function ColorPalette({ slots, background, onChange }) {
  const renderSlot = (color, i, size) => (
    <Slot key={i} color={color} size={size} onChange={(c) => onChange(i, c)} />
  );

  return (
    <div className="palette">
      <div className="palette-board" style={background ? { background } : undefined}>
        <div className="palette-small">
          {slots.slice(0, SMALL_COUNT).map((c, i) => renderSlot(c, i, "small"))}
        </div>
        <div className="palette-large">
          {slots.slice(SMALL_COUNT).map((c, i) => renderSlot(c, SMALL_COUNT + i, "large"))}
        </div>
      </div>
    </div>
  );
}
