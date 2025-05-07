import React, { useState } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import '../css/SidebarMenu.css';
import spinner from "./spinner"; // Asegúrate de que el spinner esté importado
import avatar from '../resources/user_2.png';

const SidebarMenu = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);  // Estado para manejar el spinner
  const username = localStorage.getItem('username') || 'Usuario no autenticado'; // Obtener el nombre del usuario logueado

  const handleLogout = () => {
    setLoading(true); // Mostrar el spinner al iniciar el logout

    // Eliminar datos del localStorage
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    localStorage.removeItem('email');
    localStorage.removeItem('rol');
    localStorage.removeItem('progreso');
    localStorage.removeItem('insignias');

    // Simulamos un pequeño retraso para mostrar el spinner (puedes removerlo si es instantáneo)
    setTimeout(() => {
      // Redirigir a la página de bienvenida
      navigate('/');
      setLoading(false); // Ocultar el spinner después de redirigir
    }, 1000); // Ajusta el tiempo de espera si es necesario
  };

  return (
    <aside className="sidebar">
      <div className="user-info">
        <img src={avatar} alt="avatar" className="avatar" />
        <div>
          <p className="user-name">{username}</p> {/* Mostrar el nombre del usuario logueado */}
          <p className="user-role">Administrador</p> {/* Esto puede cambiar dinámicamente según el rol */}
        </div>
      </div>
      <nav className="nav-links">
        <NavLink to="/admin" className={location.pathname === "/admin" ? "active" : ""}>Panel</NavLink>
<<<<<<< HEAD
        <NavLink to="/usuarios" className={location.pathname === "/usuarios" ? "active" : ""}>Usuarios</NavLink>
=======
        <NavLink to="/UserManagement" className={location.pathname === "/usuarios" ? "active" : ""}>Usuarios</NavLink>
>>>>>>> 8717190 (equis de)
        <NavLink to="/progreso" className={location.pathname === "/progreso" ? "active" : ""}>Progreso</NavLink>
        <NavLink to="/ActivityManager" className={location.pathname === "/actividades" ? "active" : ""}>Actividades</NavLink>
        <NavLink to="/forumadmin" className={location.pathname === "/forumadmin" ? "active" : ""}>Foro</NavLink>
      </nav>
      <button className="logout-btn" onClick={handleLogout} disabled={loading}>
        {loading ? <spinner /> : 'Salir'} {/* Mostrar el spinner o el texto 'Salir' */}
      </button>
    </aside>
  );
};

export default SidebarMenu;
