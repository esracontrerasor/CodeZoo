import React from "react";
import "./Navbar.css";


const Navbar = ({onLoginClick}) => {
    return (
        <header className="header">
            <a href="/" className="logo">CodeZoo</a>

            <nav className="navbar">
                <a href="/">Inicio</a>
                <a href="/home">Actividades</a>
                <a href="/info">Acerca De</a>
                <button className="btnLogin" onClick={onLoginClick}>Ingresar</button>
            </nav>
        </header>
    );
};

export default Navbar;