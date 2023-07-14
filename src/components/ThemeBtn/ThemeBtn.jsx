import React from 'react'
import {AiOutlineHome} from 'react-icons/ai'
import "./ThemeBtn.css" 
const ThemeBtn = ({colormode}) => {
  const [btn, setBtn] = colormode
  const toggle = () => {
    if (btn === "light") {
      setBtn("dark")
    } else {
      setBtn("light")
    }
  }
  
  return (
    <div className="themeAndJump">
      <div className="jumpBtn">
        <a href="/">
          <AiOutlineHome className='icon'/>
        </a>
      </div>
      <div className="themebtncontainer">
        <div
          className={btn === "light" ? "themebtn" : "themebtn dark"}
          onClick={toggle}
        >
          {btn}
        </div>
      </div>
    </div>
  );
}

export default ThemeBtn