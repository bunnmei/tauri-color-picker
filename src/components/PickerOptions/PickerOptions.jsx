import { useId } from "react";
import { RiDoubleQuotesL, RiSingleQuotesL } from "react-icons/ri";
import { FORMATS, QUOTES } from "../../lib/color";
import "./PickerOptions.css";

const QUOTE_LABELS = {
  none: null,
  single: <RiSingleQuotesL />,
  double: <RiDoubleQuotesL />,
};

function OptionGroup({ title, options, value, onChange, renderLabel }) {
  const titleId = useId();
  // fieldset/legend は WebKitGTK で初回レイアウトが崩れるので div で組む
  return (
    <div className="option-group" role="group" aria-labelledby={titleId}>
      <span className="option-title" id={titleId}>{title}</span>
      <div className="option-buttons">
        {options.map((option) => (
          <button
            type="button"
            key={option}
            className={`option-button ${option === value ? "sunken" : "raised"}`}
            aria-pressed={option === value}
            aria-label={option}
            onClick={() => onChange(option)}
          >
            {renderLabel(option)}
          </button>
        ))}
      </div>
    </div>
  );
}

export default function PickerOptions({ format, onFormatChange, quote, onQuoteChange }) {
  return (
    <div className="options">
      <OptionGroup
        title="カラーコード"
        options={FORMATS}
        value={format}
        onChange={onFormatChange}
        renderLabel={(f) => f.toUpperCase()}
      />
      <OptionGroup
        title="文字列としてコピー"
        options={QUOTES}
        value={quote}
        onChange={onQuoteChange}
        renderLabel={(q) => QUOTE_LABELS[q]}
      />
    </div>
  );
}
