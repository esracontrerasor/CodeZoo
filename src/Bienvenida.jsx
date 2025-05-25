import React, { useState } from "react";
import "./css/Bienvenida.css";
import { useNavigate } from "react-router-dom";
import Navbar from "./components/navbar/Navbar.jsx";
import imageWelcome from "../src/resources/animal-welcome.gif";
import LoginRegister from "./components/login/login.jsx";



const CodeZooInfo = () => {
  const [showLogin, setShowLogin] = React.useState(false);
  const navigate = useNavigate(); // Hook para la navegación

  const handlePopupOpen = () => {
    console.log("Popup abierto");
    setShowLogin(true);
  };

const handlePopupClose = () => {
    
    setShowLogin(false);
};
  
  return (
    <div className="welcome-container">
      <Navbar onLoginClick={handlePopupOpen}/>

      {!showLogin && (
      <div className="content">
          <img src={imageWelcome} alt="" className="welcome-image"/>
          <div className="welcome-box">
            <h1>¡BIENVENIDO A CODEZOO!</h1>
            <p>CodeZoo es una plataforma educativa que te ayudará a aprender a programar por medio de juegos diversos y cuentos interactivos y educativos.</p>
          </div>
      </div>
      )}
      
      {showLogin && (
            <LoginRegister onClose={() => setShowLogin(false)} />
      )}
    </div>
  );
};

export default CodeZooInfo;