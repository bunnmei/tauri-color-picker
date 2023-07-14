import React from 'react'
import { RiDoubleQuotesL, RiSingleQuotesL } from 'react-icons/ri'
import './PickerOptions.css'
export const PickerOptions = ({ optionString, optionColorCode, colormode}) => {
  const [stringD, setStringD] = optionString;
  const [stringS, setStringS] = optionColorCode;
  const btnChange = (i) => {
    const newStringD = [false, false, false];
    newStringD[i] = true;
    setStringD(newStringD);
  };
  const btnChangeS = (i) => {
    const newStringS = [false, false, false];
    newStringS[i] = true;
    setStringS(newStringS);
  };

  const colorCodeText = (i) => {
    if (i === 0) {
      return "HEX";
    } else if (i === 1) {
      return "RGB";
    } else {
      return "HSL";
    }
  };
  return (
    <div className="colorOptionContainer">
      <div className="colorCodeOptionBox">
        <span className="colorCodeTitle">カラーコード</span>
        <div className="colorCode">
          {stringS.map((tf, i) => (
            <div
              className="colorToggleBtn"
              key={i}
              onClick={() => btnChangeS(i)}
              style={
                tf
                  ? {
                      boxShadow: `inset 5px 5px 10px ${
                        colormode === "light" ? "#cacaca" : "#222222"
                      }, inset -5px -5px 10px ${
                        colormode === "light" ? "#f6f6f6" : "#444444"
                      }`,
                    }
                  : {
                      boxShadow: `5px 5px 10px ${
                        colormode === "light" ? "#cacaca" : "#222222"
                      }, -5px -5px 10px ${
                        colormode === "light" ? "#f6f6f6" : "#444444"
                      }`,
                    }
              }
            >
              <span>{colorCodeText(i)}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="copyToStringOptionBox">
        <span className="colorCodeTitle">文字列としてコピー</span>
        <div className="colorCode">
          {stringD.map((tf, i) => (
            <div
              className="colorToggleBtn"
              onClick={() => btnChange(i)}
              key={i}
              style={
                tf
                  ? {
                      boxShadow: `inset 5px 5px 10px ${
                        colormode === "light" ? "#cacaca" : "#222222"
                      }, inset -5px -5px 10px ${
                        colormode === "light" ? "#f6f6f6" : "#444444"
                      }`,
                    }
                  : {
                      boxShadow: `5px 5px 10px ${
                        colormode === "light" ? "#cacaca" : "#222222"
                      }, -5px -5px 10px ${
                        colormode === "light" ? "#f6f6f6" : "#444444"
                      }`,
                    }
              }
            >
              {i === 2 && <RiDoubleQuotesL style={{ fontSize: "23px" }} />}
              {i === 1 && <RiSingleQuotesL style={{ fontSize: "23px" }} />}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
