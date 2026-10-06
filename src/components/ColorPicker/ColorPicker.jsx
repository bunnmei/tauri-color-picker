import { useEffect, useRef, useState } from "react";
import { GiEyedropper } from "react-icons/gi";
import { IoMdCopy } from "react-icons/io";
import { DRAG_TYPE, formatColor, quoteText } from "../../lib/color";
import "./ColorPicker.css";

export default function ColorPicker({ history, format, quote, onPick }) {
  const inputRef = useRef(null);
  const [copiedIndex, setCopiedIndex] = useState(null);

  // React の onChange は input イベント (ドラッグ中も連続発火) なので、
  // 確定時だけ発火するネイティブの change イベントで履歴に追加する
  useEffect(() => {
    const input = inputRef.current;
    const handleChange = (e) => onPick(e.target.value);
    input.addEventListener("change", handleChange);
    return () => input.removeEventListener("change", handleChange);
  }, [onPick]);

  useEffect(() => {
    if (copiedIndex === null) return;
    const id = setTimeout(() => setCopiedIndex(null), 500);
    return () => clearTimeout(id);
  }, [copiedIndex]);

  const copy = async (text, index) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedIndex(index);
    } catch (err) {
      console.error("コピーに失敗しました", err);
    }
  };

  return (
    <div className="picker">
      <div className="picker-input raised">
        <GiEyedropper className="icon" />
        <input ref={inputRef} type="color" className="color-input" aria-label="色を選択" />
      </div>
      <ul className="picker-history">
        {history.map((color, i) => {
          const text = quoteText(formatColor(color, format), quote);
          return (
            <li className="picker-history-item raised" key={i}>
              <span
                className="picker-swatch"
                style={{ background: color }}
                draggable
                onDragStart={(e) => e.dataTransfer.setData(DRAG_TYPE, color)}
              />
              <span className="picker-code">{text}</span>
              <button
                type="button"
                className={`picker-copy ${copiedIndex === i ? "copied" : ""}`}
                onClick={() => copy(text, i)}
                aria-label="コピー"
              >
                <IoMdCopy />
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
