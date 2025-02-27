import React from "react";
import { Routes, Route } from "react-router-dom";
import CodeZooInfo from "./Bienvenida.jsx";
import Acceso from "./Acceso.jsx"; 
import Terminos from "./Terminos.jsx"
import Home from "./Home.jsx"
import Info from "./Info.jsx";
import SopaDeLetras from "./SopaDeLetras.jsx";
import Memorama from "./Memorama.jsx"
import Games from "./Games.jsx"
import Settings from "./Settings.jsx";
import Avatar from "./Avatar.jsx";

import "./App.css";

function App() {
  return (
    <Routes>
      <Route path="/" element={<CodeZooInfo />} />
      <Route path="/acceso" element={<Acceso />} />
      <Route path="/terminos" element={<Terminos />} />
      <Route path="/home" element={<Home />} />
      <Route path="/info" element={<Info />} />
      <Route path="/sopa-de-letras" element={<SopaDeLetras />}/>
      <Route path="/memorama" element={<Memorama />}/>
      <Route path="/games" element={<Games />}/>
      <Route path="/settings" element={<Settings />}/>
      <Route path="/avatar" element={<Avatar />}/>
    </Routes>
  );
}

export default App;
