import React from "react";
import "./css/Bienvenida.css"; // Asegúrate de importar los estilos en un archivo CSS separado
import { useNavigate } from "react-router-dom";
import elefanteGif from "./resources/elefante_feliz.gif"
import background from "./resources/fondo.png";

const CodeZooInfo = () => {
  const navigate = useNavigate(); // Hook para la navegación

  const handleAccept = () => {
    navigate("/acceso"); // Asegúrate de que este path coincide con el de App.jsx
  };


  return (
      <div className="contenedor-bienvenida contenedor">

        <div className="imagen-inicio">

        </div>

        <div className="card">
          <h2>¡Bienvenidos a CodeZoo!</h2>

          <div className="imagen-gift">
            <img src={elefanteGif} alt="Gif de Elefante" />
          </div>

          <p>¡Dile a tus padres que configuren CodeZoo!</p>

          <div className="boton">
            <button onClick={handleAccept}>ACEPTAR</button>
          </div>

          <div className="mas-informacion">
            <p><a href="Info">MÁS INFORMACIÓN</a></p>
          </div>

        </div>
      </div>
  );
};

export default CodeZooInfo;