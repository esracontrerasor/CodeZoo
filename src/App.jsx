import React, {useEffect} from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import CodeZooInfo from "./Bienvenida.jsx";
import Terminos from "./Terminos.jsx"
import Home from "./Home.jsx"
import Info from "./Info.jsx";
import SopaDeLetras from "./SopaDeLetras.jsx";
import Memorama from "./Memorama.jsx"
import SafariRacing from "./SafariRacing.jsx"
import Settings from "./Settings.jsx";
import Avatar from "./Avatar.jsx";
import Libro from "./Libro.jsx";
import Libre from "./Libre.jsx";

import "./App.css";

const App = () => {
  
  return (

    <Routes>
      <Route path="/" element={<CodeZooInfo />} />
      <Route path="/terminos" element={<Terminos />} />
      <Route path="/home" element={<Home />} />
      <Route path="/info" element={<Info />} />
      <Route path="/sopa-de-letras" element={<SopaDeLetras />}/>
      <Route path="/memorama" element={<Memorama />}/>
      <Route path="/safari-racing" element={<SafariRacing />}/>
      <Route path="/settings" element={<Settings />}/>
      <Route path="/avatar" element={<Avatar />}/>
      <Route path="/libre" element={<Libre />}/>
      <Route path="/libro" element={<Libro />}/>
    </Routes>
  );
}

export default App;
