import React from 'react'
import './PaletteOptions.css'

function PaletteOptions({paletteColor, paletteC}) {
  return (
    <div className='paletteOptionBox'>
      <span className='paletteOptionText'>パレットの色</span>
      <input type="color" value={paletteC} onChange={(e)=>paletteColor(e)}className="paletteOptionInputColor"/>
    </div>
  );
}

export default PaletteOptions