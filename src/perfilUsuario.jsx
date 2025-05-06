import React, { useEffect, useState } from "react";
import "./css/perfilUsuario.css";
import Navbar from "./components/navbar/Navbar";
import { obtenerInsigniasUsuario } from "./helpers/insigniasHelper";

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

    if (token) {
      setUsername(username || "");
      setEmail(email || "");
      setRol(rol || "");
      setProgreso(progresoData);
      setInsignias(obtenerInsigniasUsuario()); // obtenidas desde el helper
    }
  }, []);

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
                        src={insignia.imagenUrl}
                        alt={insignia.nombre}
                        className="imagen-insignia"
                      />
                      <p><strong>{insignia.nombre}</strong></p>
                      <p>{insignia.descripcion}</p>
                      <p><strong>Fecha:</strong> {insignia.fecha}</p>
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
