import React from "react";
import { Routes, Route } from "react-router-dom";
import CodeZooInfo from "./Bienvenida.jsx";
import Acceso from "./Acceso.jsx"; 
import Terminos from "./Terminos.jsx"
import Home from "./Home.jsx"
import Info from "./Info.jsx";
import "./App.css";

function App() {
  return (
    <Routes>
      <Route path="/" element={<CodeZooInfo />} />
      <Route path="/acceso" element={<Acceso />} />
      <Route path="/terminos" element={<Terminos />} />
      <Route path="/home" element={<Home />} />
      <Route path="/info" element={<Info />} />
    </Routes>
  );
}

export default App;
