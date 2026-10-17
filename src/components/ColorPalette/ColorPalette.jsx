import { useLayoutEffect, useRef, useState } from "react";
import { DRAG_TYPE, isHex } from "../../lib/color";
import "./ColorPalette.css";

// ColorPalette.css と合わせる
const GAP = 20;
const BOARD_PADDING = 20;
const SMALL_WIDTH = 50;
const LARGE_MIN_WIDTH = 120;
// これより狭いと小さい枠は 2 段になる (CSS の @container と同じ値)
const NARROW_WIDTH = 760;

const fit = (width, cell) => Math.max(1, Math.floor((width + GAP) / (cell + GAP)));

// パレットの幅から、各段がちょうど埋まる列数・段数を求める
function layoutFor(width) {
  const smallCols = fit(width - BOARD_PADDING * 2, SMALL_WIDTH);
  // 大きい枠は小さい枠の段と同じ幅に並べる
  const boardWidth = smallCols * (SMALL_WIDTH + GAP) - GAP;
  return {
    smallCols,
    smallRows: width > NARROW_WIDTH ? 1 : 2,
    largeCols: fit(boardWidth, LARGE_MIN_WIDTH),
  };
}

function usePaletteLayout() {
  const ref = useRef(null);
  const [layout, setLayout] = useState(() => layoutFor(0));

  useLayoutEffect(() => {
    const el = ref.current;
    const update = () => {
      const next = layoutFor(el.clientWidth);
      setLayout((prev) =>
        prev.smallCols === next.smallCols &&
        prev.smallRows === next.smallRows &&
        prev.largeCols === next.largeCols
          ? prev
          : next
      );
    };
    update();
    const observer = new ResizeObserver(update);
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return [ref, layout];
}

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

export default function ColorPalette({ small, large, background, onChange }) {
  const [ref, { smallCols, smallRows, largeCols }] = usePaletteLayout();

  const renderSlots = (colors, count, size) =>
    Array.from({ length: count }, (_, i) => (
      <Slot key={i} color={colors[i] ?? null} size={size} onChange={(c) => onChange(size, i, c)} />
    ));

  return (
    <div className="palette" ref={ref}>
      <div className="palette-board" style={background ? { background } : undefined}>
        <div className="palette-small" style={{ "--cols": smallCols }}>
          {renderSlots(small, smallCols * smallRows, "small")}
        </div>
        <div className="palette-large" style={{ "--cols": largeCols }}>
          {renderSlots(large, largeCols, "large")}
        </div>
      </div>
    </div>
  );
}
