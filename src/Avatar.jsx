import React from "react";
import "./css/Avatar.css";
import defaultAvatar from "./resources/default-avatar.png"; // Imagen por defecto

const Avatar = () => {
  return (
    <div className="avatar-container">
      <aside className="sidebar">
        <ul>
          <li className="active">🏠 Inicio</li>
          <li>👤 Información personal</li>
          <li>🔒 Seguridad</li>
          <li>⚙️ Configuración</li>
          <li>📜 Suscripciones</li>
        </ul>
      </aside>

      <main className="content">
        <div className="profile-header">
          <img src={defaultAvatar} alt="Foto de perfil" className="profile-pic" />
          <h1>Bienvenido, Usuario</h1>
          <p>Administra tu información, privacidad y seguridad.</p>
        </div>

        <div className="info-cards">
          <div className="card-avatar">
            <h2>Privacidad y seguridad</h2>
            <p>Configura tu cuenta y personaliza tu experiencia.</p>
            <button>Administrar privacidad</button>
          </div>
          <div className="card-avatar">
            <h2>Protección de cuenta</h2>
            <p>Verifica la seguridad de tu cuenta.</p>
            <button>Ver detalles</button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Avatar;
