import React, { useState, useEffect } from "react";
import "./Navbar.css";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import userIcon from "../../resources/user-icon-white.png";
import bxUser from "../../resources/icons/bx-user.svg";
import bxLogOut from "../../resources/icons/bx-log-out.svg";
import bxForo from "../../resources/icons/bx-chat.svg";


const Navbar = ({onLoginClick}) => {
    const navigate = useNavigate();
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const [username, setUsername] = useState("");

    useEffect(() => {
        const token = localStorage.getItem("token");
        const username = localStorage.getItem("username");
        if (token) {
            setIsAuthenticated(true);
            setUsername(username || "");
        } else {
            setIsAuthenticated(false);
            setUsername("");
        }
    }, []);

    const handleClick = (e) => {
        e.preventDefault();

        const token = localStorage.getItem("token");

        if(token){
            navigate("/home");
        } else {
            Swal.fire({
                icon: "error",
                title: "Acceso denegado",
                text: "Debes iniciar sesión para acceder a esta página",
            }).then((result) => {
                if (result.isConfirmed) {
                    onLoginClick();
                }
            })
        }
      
    }

    const handleLogOut = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("username");
        
        setIsAuthenticated(false);
        navigate("/");
    }

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    }

    const goTo = (path) => {
        navigate(path);
        setMenuOpen(false);
    }

    return (
        <header className="header">
            <a href="/" className="logo">CodeZoo</a>

            <nav className="navbar">
                <Link to="/">Inicio</Link>
                <Link to="#" onClick={handleClick}>Actividades</Link>
                <Link to="/info">Acerca De</Link>
                {isAuthenticated ? (
                   <div className="user-menu">
                        <img src={userIcon} className="user-icon" alt="" onClick={toggleMenu}/>
                        <span className="username" onClick={toggleMenu}>{username}</span>
                   {menuOpen && (
                    <div className={`menu-dropdown ${menuOpen ? "active" : ""}`}>
                        <ul>
                            <li onClick={() => goTo("/perfil")}> Ver mi perfil <img src={bxUser} className="icono-menu" /> </li>
                            <li onClick={() => goTo("/foro")}>Foro de ayuda <img src={bxForo} className="icono-menu" /></li>
                            <li onClick={handleLogOut}>Cerrar sesión <img src={bxLogOut} className="icono-menu" /></li>
                        </ul>
                    </div>
                   )}
                   </div>
                ) : (
                    <button className="btnLogin" onClick={onLoginClick}>Ingresar</button>
                )}

            </nav>
        </header>
    );
};

export default Navbar;
