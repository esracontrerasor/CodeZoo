import React from "react";
import { useNavigate } from "react-router-dom"; // Importa useNavigate
import "./css/Acceso.css";
import oso from "./resources/bear-thinking-character-style-cartoon-vector-14196134.jpg";

const CodeZooWelcome = () => {
  const navigate = useNavigate(); // Hook de navegación

  const handleAccept = () => {
    navigate("/terminos"); // Redirige a Términos.jsx
  };

  return (
    <div className="app">
      <div className="container">
        <div className="card">
          <h2>¡Bienvenidos a CodeZoo!</h2>
          <img src={oso} alt="Foto de oso" />
          <p>Solo padres. Para continuar ingrese la respuesta correcta</p>
          <p>7 * 5 = ??</p>
          <button onClick={handleAccept}>ACEPTAR</button>
        </div>
      </div>
    </div>
  );
};

export default CodeZooWelcome;
