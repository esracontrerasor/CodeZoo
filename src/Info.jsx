import React from "react";
import "./css/Info.css"; // Asegúrate de que este archivo existe
import { useNavigate } from "react-router-dom";

const Info = () => {
      const navigate = useNavigate(); // Hook para la navegación
    
      const handleAccept = () => {
        navigate("/home"); // Asegúrate de que este path coincide con el de App.jsx
      };

  return (
      
    <div className="contenedor-info">

        <header class = "header"> 
                <div className="logo">
                  <h1>CodeZoo</h1>
                </div>
                <nav>
                  <ul class="nav-links">
                    <li><a href="#">Experiencia más segura</a></li>
                    <li><a href="#">Sugerencias</a></li>
                    <li><a href="#">Juegos diversos</a></li>
                  </ul>
                </nav>
                <button className="btn" onClick={handleAccept}>INICIAR</button>
        </header>

        <div className="contenido-principal">

            <div className="info-box">
              <h2 className="title">Una aplicación pensada para los pequeños</h2>
              <p className="text">
                CodeZoo se creó con la idea de ofrecer un entorno educativo
                interactivo para menores en el que pueden aprender programación fácil
                y divertida. Además, ayuda a sus padres a guiarlos mientras aprenden
                y desarrollan nuevos conocimientos.
              </p>
            </div>

            <div className="imagen-info">
            
            </div>
          </div>
      </div> 
  );
};

export default Info;
