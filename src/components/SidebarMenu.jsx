import React, { useState } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import '../css/SidebarMenu.css';
import spinner from "./spinner"; // Asegúrate de que el spinner esté importado
import avatar from '../resources/user_2.png';
import iconForo from '../resources/icons/bx-chat.svg';
import iconUsuario from '../resources/icons/bx-user.svg';
import iconLogOut from '../resources/icons/bx-log-out.svg';
import iconPanel from '../resources/icons/bx-objects-horizontal-left.svg';

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
        <NavLink to="/Dashboard" className={location.pathname === "/Dashboard" ? "active" : ""}>    
        <img src={iconPanel} alt="" className='nav-icon'/>
        Panel
        </NavLink>
        <NavLink to="/UserManagement" className={location.pathname === "/usuarios" ? "active" : ""}>
        <img src={iconUsuario} alt="" className='nav-icon'/>
        Usuarios
        </NavLink>
        <NavLink to="/forumadmin" className={location.pathname === "/forumadmin" ? "active" : ""}>
        <img src={iconForo} alt="" className='nav-icon'/>
        Foro
        </NavLink>
      </nav>
      <button className="logout-btn" onClick={handleLogout} disabled={loading}>
        {loading ? (
          <spinner />
        ) : (
          <>
          <img src={iconLogOut} alt="" />
          Salir
          </>
        )}
        
  
      </button>
    </aside>
  );
};

export default SidebarMenu;
