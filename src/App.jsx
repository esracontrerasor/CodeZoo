import React, {useEffect} from "react";
import { Routes, Route, useLocation } from "react-router-dom";
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
import fondoImagen from "./resources/2805830.jpg";

function App() {
  const location = useLocation();
  const paginasFondo = ["/", "/acceso", "/terminos","/home"];
  useEffect(() => {
    if (paginasFondo.includes(location.pathname)) {
      document.body.style.backgroundImage = `url(${fondoImagen})`;
      document.body.style.backgroundSize = "cover";
      document.body.style.backgroundPosition = "center";
      document.body.style.width = "100%";
      document.body.style.height = "100vh";
      document.body.style.position = "relative";
    } else {
      document.body.style.backgroundImage = "none";
    }
  }, [location.pathname]);
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
