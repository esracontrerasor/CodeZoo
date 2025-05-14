import React, { useEffect, useState } from "react";
import "./css/perfilUsuario.css";
import Navbar from "./components/navbar/Navbar";
import { obtenerInsigniasDelUsuario } from "./helpers/insigniasService";

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

      // Obtener insignias desde MongoDB
      obtenerInsigniasDelUsuario(username).then((insigniasDesdeDB) => {
        setInsignias(insigniasDesdeDB);
      });
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
            <div className="insignias-lista-tabla">
              <table className="tabla-insignias">
                <thead>
                  <tr>
                    <th></th>
                    <th>Nombre</th>
                    <th>Descripción</th>
                    <th>Fecha</th>
                  </tr>
                </thead>
                <tbody>
                  {insignias.map((insignia, index) => (
                    <tr key={index}>
                      <td><img src={insignia.imagenUrl} alt={insignia.nombre} className="icono-insignia" /></td>
                      <td>{insignia.nombre}</td>
                      <td>{insignia.descripcion}</td>
                      <td>{insignia.fecha}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>


          </div>
        </div>
      </div>
    </div>
  );
};

export default PerfilUsuario;
