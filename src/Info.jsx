import React from "react";
import "./css/Info.css"; // Asegúrate de que este archivo existe
import { useNavigate } from "react-router-dom";
import Navbar from "./components/navbar/navbar.jsx";
import aboutImage from "../src/resources/icono-pantalla-principal.png";

const Info = () => {
      const navigate = useNavigate(); // Hook para la navegación
    
      const handleAccept = () => {
        navigate("/home"); // Asegúrate de que este path coincide con el de App.jsx
      };

  return (
    <div className="contenedor-info">
      <Navbar />
            <div className="imagen-info-wrapper">
              <img src={aboutImage} alt="" class="imagen-info"/>            
            </div>
            <div className="info-box">
              <h2 className="title">Acerca de CodeZoo</h2>
              <p className="text">
              CodeZoo es una plataforma educativa creada para que niños 
              y jóvenes aprendan a programar de una manera divertida y sencilla.
              Aquí podrás encontrar juegos interactivos, cuentos educativos 
              y retos que te ayudarán a desarrollar habilidades de lógica, creatividad y resolución de problemas.
              Nuestro objetivo es que aprendas mientras juegas y descubras el mundo de la programación 
              de forma amigable y accesible.
              </p>
              <div className="social-link">
                
              </div>
            </div>
      </div> 
  );
};

export default Info;
