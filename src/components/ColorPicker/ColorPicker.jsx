import React from 'react'
import './ColorPicker.css'
import { GiEyedropper } from 'react-icons/gi'
import {IoMdCopy} from 'react-icons/io'
import convert from "color-convert";
import useLocalStorageArr from '../../hooks/useLocalStorageArr'

const ColorPicker = ({ spoitedColor, stringD, stringS }) => {
  const [picked, setPicked] = useLocalStorageArr("picked", [
    "#ff7f7f",
    "#ff7fff",
    "#7f7fff",
    "#7fffff",
    "#7fff7f",
    "#ffff7f",
  ]);


  const covertColorCode = (string) => {
    if (stringS[0]) return string
    else if (stringS[1]) {
      let mozi = convert.hex.rgb(string.replace("#", " "));
      return `rgb(${mozi[0]},${mozi[1]},${mozi[2]})`;
    } else if (stringS[2]) {
      let mozi = convert.hex.hsl(string.replace("#", " "));
      return `hsl(${mozi[0]},${mozi[1]}%,${mozi[2]}%)`;
    }
  }

  const colorCodeToString = (string) => {
    let mozi = covertColorCode(string)
    
    mozi = mozi.toUpperCase()
    if (stringD[0]) return `${mozi}`;
    else if (stringD[1]) return `'${mozi}'`
    else if (stringD[2]) return `"${mozi}"`
  }
  const pickedColor = (e) => {
    let copy = [...picked];
    if (picked.length > 5) {
      copy.splice(copy.length - 1);
    }
    setPicked([e.target.value, ...copy]);
  };

  const copyedColor = (color, e) => {
    try {
      navigator.clipboard.writeText(colorCodeToString(color));
      e.target.classList.add("anime")
      let id = setTimeout(() => {
        e.target.classList.remove("anime")
        clearTimeout(id)
      }, 500)
    } catch (e) {
      
    }
  };
  return (
    <>
      <div className="colorPickerBox">
        <GiEyedropper className="icon" />
        <input
          type="color"
          className="colorPicker"
          onInput={(e) => pickedColor(e)}
        />
      </div>
      <div ref={spoitedColor} className="pickedColorBoxs">
        {picked.map((color, i) => (
          <div className="pickedColor" key={i}>
            <a
              className="colorSampleBox"
              style={{ background: color }}
              draggable="true"
            ></a>
            <span className="colorCodeText">{colorCodeToString(color)}</span>
            <div className="copyIconBox" onClick={(e) => copyedColor(color, e)}>
              <IoMdCopy className="icon" />
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default ColorPicker