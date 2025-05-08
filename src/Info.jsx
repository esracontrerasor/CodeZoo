import React from "react";
import "./css/Info.css"; // Asegúrate de que este archivo existe
import { useNavigate } from "react-router-dom";
import Navbar from "./components/navbar/Navbar.jsx";
import aboutImage from "../src/resources/icono-pantalla-principal.png";

const Info = () => {

  return (
    <div>
    <Navbar />
      <div className="main-content">
        <div className="about-containter">
          <img src={aboutImage} alt="" class="imagen-info"/> 
          <div className="info-box">
                <h1 className="title">ACERCA DE CODEZOO</h1>
                <p className="text">
                CodeZoo es una plataforma educativa creada para que niños 
                y jóvenes aprendan a programar de una manera divertida y sencilla.
                Aquí podrás encontrar juegos interactivos, cuentos educativos 
                y retos que te ayudarán a desarrollar habilidades de lógica, creatividad y resolución de problemas.
                Nuestro objetivo es que aprendas mientras juegas y descubras el mundo de la programación 
                de forma amigable y accesible.
                </p>
          </div>
        </div>            
      </div> 
      </div>
  );
};

export default Info;
