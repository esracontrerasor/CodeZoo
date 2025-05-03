import React from 'react';
import '../css/SidebarMenu.css';

const SidebarMenu = () => {
  return (
    <aside className="sidebar">
      <div className="user-info">
        <img src="https://i.imgur.com/OQz3D8j.png" alt="avatar" className="avatar" />
        <div>
          <p className="user-name">Karina Macedo</p>
          <p className="user-role">Administrador</p>
        </div>
      </div>
      <nav className="nav-links">
        <a href="#">Panel</a>
        <a href="#">Usuarios</a>
        <a href="#">Progreso</a>
        <a className="active" href="#">Actividades</a>
        <a href="#">Foro</a>
      </nav>
      <button className="logout-btn">Salir</button>
    </aside>
  );
};

export default SidebarMenu;