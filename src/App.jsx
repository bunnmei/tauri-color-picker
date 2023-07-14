import { useEffect, useRef, useState } from 'react';
import './App.css';
import ColorPalette from './components/ColorPalette/ColorPalette';
import ColorPicker from './components/ColorPicker/ColorPicker';
import PaletteOptions from './components/PaletteOptions/PaletteOptions';
import { PickerOptions } from './components/PickerOptions/PickerOptions';
import ThemeBtn from './components/ThemeBtn/ThemeBtn';
import useLocalStorage from './hooks/useLocalStorage';

function App() {
  const [btn, setBtn] = useLocalStorage("mode", "light");
  // const [btn, setBtn] = useState("light");
  const [stringD, setStringD] = useState([true, false, false]);
  const [stringS, setStringS] = useState([true, false, false]);
  const [paletteC, setPaletteC] = useState("#e0e0e0");
  const spoitedColor = useRef(null)
  const miniBox = useRef(null)
  const bigBox = useRef(null)
  const paletteColor = (e) => {
    setPaletteC(e.target.value)
  }

  let color 

  useEffect(() => {
    let sc = [...spoitedColor.current.childNodes].map((el) => el.firstChild)
    let box = [
        ...miniBox.current.childNodes,
        ...bigBox.current.childNodes,
      ];
    for (const sp of sc) {
      sp.addEventListener("dragstart", dragStart);
      }
    for (const emp of box) {
      console.log(emp)
      emp.addEventListener("dblclick", resetColor);
      emp.addEventListener("dragstart", dragStart);
      emp.addEventListener("dragover", (e) => {dragOver(e)});
      emp.addEventListener("drop",(e) => {dragDrop(e, emp)});
    }
  }, []) 

  useEffect(() => {
    if (btn === "light") {
      document.body.classList.remove('dark')
    } else {    
      document.body.classList.add('dark')
    }
    setPaletteC(btn === "light" ? "#e0e0e0" : "#333333");
    let box = [...miniBox.current.childNodes, ...bigBox.current.childNodes];
    for (const emp of box) {
      emp.addEventListener("dblclick", resetColor);
      let cpc = window.getComputedStyle(emp).backgroundColor;
      if (cpc === "rgb(51, 51, 51)" || cpc === "rgb(224, 224, 224)") {
        emp.style.backgroundColor = btn === "light" ? "#e0e0e0" : "#333333";
        emp.style.boxShadow =
          btn === "light"
            ? `inset 5px 5px 10px #cacaca,
          inset -5px -5px 10px #f6f6f6`
            : `inset 5px 5px 10px #222222,
          inset -5px -5px 10px #444444`;
      }
    }
  }, [btn])
  
  function resetColor() {
    this.style.backgroundColor = btn === "light" ? "#e0e0e0" : "#333333";
    this.style.boxShadow =
      btn === "light"
        ? `inset 5px 5px 10px #cacaca,
            inset -5px -5px 10px #f6f6f6`
        : `inset 5px 5px 10px #222222,
            inset -5px -5px 10px #444444`;
  }

  function dragStart() {
    let style = window.getComputedStyle(this);
    color = style.backgroundColor
    console.log(`${color}`)
  }
  
  function dragOver(e) {
    e.preventDefault();
    console.log("dragover")
  }

  function dragDrop(e, emp) {
    e.stopPropagation();
    e.preventDefault()
    console.log("dragDrop")
    emp.style.backgroundColor = `${color}`;
    emp.style.boxShadow = "none";
  }

  return (
    <div className="App">
      <div className="palet">
        <ColorPalette
          miniBox={miniBox}
          bigBox={bigBox}
          paletteC={paletteC}
          colormode={btn}
        />
      </div>
      <div className="slider">
        <ThemeBtn colormode={[btn, setBtn]} />
      </div>
      <div className="spoit">
        <ColorPicker
          spoitedColor={spoitedColor}
          stringD={stringD}
          stringS={stringS}
        />
      </div>
      <div className="option">
        <PickerOptions
          optionString={[stringD, setStringD]}
          optionColorCode={[stringS, setStringS]}
          colormode={btn}
        />
      </div>
      <div className="search"></div>
      <div className="amari">
        <PaletteOptions paletteColor={paletteColor} paletteC={paletteC} />
      </div>
    </div>
  );
}

export default App;

// import { useState } from "react";
// import reactLogo from "./assets/react.svg";
// import { invoke } from "@tauri-apps/api/tauri";
// import "./App.css";

// function App() {
//   const [greetMsg, setGreetMsg] = useState("");
//   const [name, setName] = useState("");

//   async function greet() {
//     // Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
//     setGreetMsg(await invoke("greet", { name }));
//   }

//   return (
//     <div className="container">
//       <h1>Welcome to hoge</h1>

//       <div className="row">
//         <a href="https://vitejs.dev" target="_blank">
//           <img src="/vite.svg" className="logo vite" alt="Vite logo" />
//         </a>
//         <a href="https://tauri.app" target="_blank">
//           <img src="/tauri.svg" className="logo tauri" alt="Tauri logo" />
//         </a>
//         <a href="https://reactjs.org" target="_blank">
//           <img src={reactLogo} className="logo react" alt="React logo" />
//         </a>
//       </div>

//       <p>Click on the Tauri, Vite, and React logos to learn more.</p>

//       <form
//         className="row"
//         onSubmit={(e) => {
//           e.preventDefault();
//           greet();
//         }}
//       >
//         <input
//           id="greet-input"
//           onChange={(e) => setName(e.currentTarget.value)}
//           placeholder="Enter a name..."
//         />
//         <button type="submit">Greet</button>
//       </form>

//       <p>{greetMsg}</p>
//     </div>
//   );
// }

// export default App;
