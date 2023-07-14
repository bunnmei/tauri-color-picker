import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import './ColorPalette.css'

const ColorPalette = ({ miniBox, bigBox, paletteC}) => {
  return (
    <div
      className="paletteContainer"
      style={{ backgroundColor: `${paletteC}` }}
    >
      <div
        className="colorPaletteBoxs"
        ref={miniBox}
      >
        {[...Array(10)].map((_, i) => (
          <a  className="miniBox" draggable="true" key={i}></a>
        ))}
      </div>
      <div className="colorPaletteBoxs2" ref={bigBox}>
        {[...Array(5)].map((_, i) => (
          <a  className="bigBox" draggable="true" key={i}></a>
        ))}
      </div>
    </div>
  );
};

export default ColorPalette