import React, { useEffect, useState } from "react";
import "./css/perfilUsuario.css";
import Navbar from "./components/navbar/Navbar";

const PerfilUsuario = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [rol, setRol] = useState("");
  const [progreso, setProgreso] = useState({ actividadesCompletadas: 0, porcentaje: 0 });
  const [insignias, setInsignias] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const username = localStorage.getItem("username");
    const email = localStorage.getItem("email");
    const rol = localStorage.getItem("rol");
  
    const progresoArray = JSON.parse(localStorage.getItem("progreso")) || [];
    const progresoData = progresoArray[0] || { actividadesCompletadas: 0, porcentaje: 0 };
  
    const insigniasArray = JSON.parse(localStorage.getItem("insignias")) || [];
  
    if (token) {
      setUsername(username || "");
      setEmail(email || "");
      setRol(rol || "");
      setProgreso(progresoData);
      setInsignias(insigniasArray);
    }
  }, []);
  
  const obtenerRutaInsignia = (id) => {
    switch (id) {
      case 1:
        return "insignias/explorador de ideas.png";
      case 2:
        return "insignias/primeros pasos.png";
      case 3:
        return "insignias/sin errores.png";
      default:
        return "resources/insignias/insignia-default.png"; // Ruta por defecto si no coincide
    }
  };
  
  return (
    <div>
      <Navbar />
      <div className="perfil-contenedor">
        <h1 className="perfil-titulo">Bienvenido {username}</h1>
        <div className="perfil-info">
          <div className="perfil-datos">
            <p><strong>Correo:</strong> {email}</p>
            <p><strong>Rol:</strong> {rol}</p>
            <p><strong>Actividades completadas:</strong> {progreso?.actividadesCompletadas ?? 0}</p>
            <p><strong>Porcentaje de avance:</strong> {progreso?.porcentaje ?? 0}%</p>

            {/* Barra de progreso */}
            <div className="barra-progreso-container">
              <div
                className="barra-progreso"
                style={{ width: `${progreso.porcentaje ?? 0}%` }}
              ></div>
            </div>
          </div>

          <div className="perfil-insignias">
            <h2>Insignias</h2>
            <div className="insignias-lista">
              {Array.isArray(insignias) && insignias.length > 0 ? (
                <ul className="lista-insignias">
                {insignias.map((insignia, index) => (
                  <li key={index} className="insignia-item">
                    <img
                      src={obtenerRutaInsignia(insignia.insigniaId)}
                      alt={`Insignia ${insignia.insigniaId}`}
                      className="imagen-insignia"
                    />
                    <p><strong>Fecha:</strong> {new Date(insignia.fechaObtenida).toLocaleDateString()}</p>
                  </li>
                ))}
              </ul>
              
              ) : (
                <p>No se han obtenido insignias.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PerfilUsuario;
