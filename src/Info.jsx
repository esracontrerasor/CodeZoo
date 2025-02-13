import React from "react";
import "./css/Info.css"; // Asegúrate de que este archivo existe
import panda from "./resources/panda.png";
import { useNavigate } from "react-router-dom";

import background from "./resources/fondo.png";

const Info = () => {
    const navigate = useNavigate(); // Hook para la navegación
    
      const handleAccept = () => {
        navigate("/home"); // Asegúrate de que este path coincide con el de App.jsx
      };

  return (
    <div className="body" style={{ backgroundImage: `url(${background})` }}>
      {/* Navbar */}
      <nav className="nav">
        <h1 className="logo">CodeZoo</h1>
        <div className="nav-links">
          <a href="#">Experiencia más segura</a>
          <a href="#">Sugerencias</a>
          <a href="#">Juegos diversos</a>
        </div>
        <button className="btn" onClick={handleAccept}>INICIAR</button>
      </nav>

      {/* Contenido Principal */}
      <div className="container">
        <img src={panda} alt="Panda" className="panda" />
        <div className="info-box">
          <h2 className="title">Una aplicación pensada para los pequeños</h2>
          <p className="text">
            CodeZoo se creó con la idea de ofrecer un entorno educativo
            interactivo para menores en el que pueden aprender programación fácil
            y divertida. Además, ayuda a sus padres a guiarlos mientras aprenden
            y desarrollan nuevos conocimientos.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Info;
