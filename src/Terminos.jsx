import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./css/Terminos.css";
import ave from "./resources/ave.gif"
const CodeZooTerms = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false); // Estado de carga

  const handleAccept = () => {
    setIsLoading(true); // Activa la animación de carga

    setTimeout(() => {
      navigate("/home"); // Redirige después de 2 segundos
    }, 2000);
  };


  const handleReject = () => {
    setIsLoading(true); // Activa la animación de carga

    setTimeout(() => {
      navigate("/"); // Redirige después de 2 segundos
    }, 2000);
  };

  return (
    <div className="container-terminos">
      {/* Pantalla de carga */}
      {isLoading && (
        <div className="loading-screen">
          <div className="spinner"></div>
          <img src={ave} alt="Cargando" className="loading-image" />
          <p>Cargando...</p>
        </div>
      )}

      {/* Contenido de términos y condiciones */}
      <div className="notice-box">

        <div className="terms-title">
          <h2 className="title">Términos y Condiciones</h2>
          <h2 className="bold">CodeZoo</h2>
        </div>
        <div className="terms-content">
          <p>
            Bienvenido a CodeZoo. Al acceder y utilizar nuestros servicios, aceptas cumplir 
            con los siguientes términos y condiciones. Si no estás de acuerdo con alguna parte, 
            te recomendamos que no utilices la plataforma.
          </p>
          <p>
            CodeZoo está diseñado para ayudar a niños a aprender a programar con una temática de animales.
            No está permitido utilizar el sitio con fines ilegales o que atenten contra la seguridad de los menores.
            Los usuarios son responsables de la veracidad de la información proporcionada.
          </p>
          <p className="bold">Privacidad y Recopilación de Datos</p>
          <ul>
            <li>CodeZoo puede recopilar información no identificable personalmente para mejorar la experiencia del usuario.</li>
            <li>No compartimos información personal con terceros sin el consentimiento del usuario o su tutor legal.</li>
            <li>Para más detalles, consulta nuestra Política de Privacidad.</li>
          </ul>
          <p className="bold">Responsabilidad y Garantías</p>
          <ul>
            <li>CodeZoo no garantiza que la plataforma esté libre de errores o interrupciones.</li>
            <li>No nos hacemos responsables por el uso inadecuado de la plataforma por parte de los usuarios.</li>
          </ul>
          <p className="bold">Modificaciones a los Términos</p>
          <ul>
            <li>Nos reservamos el derecho de modificar estos términos en cualquier momento. Se notificará a los usuarios sobre cambios importantes.</li>
          </ul>
        </div>

        <div className="button-container">
          <button className="agree-button" onClick={handleAccept}> ACEPTAR </button>
          <button className="disagree-button" onClick={handleReject}>RECHAZAR</button>
        </div>
        
      </div>
    </div>
  );
};

export default CodeZooTerms;
