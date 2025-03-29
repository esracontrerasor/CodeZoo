import React from "react";
import "./Navbar.css";


const Navbar = ({onLoginClick}) => {
    return (
        <header className="header">
            <a href="/" className="logo">CodeZoo</a>

            <nav className="navbar">
                <a href="/">Inicio</a>
                <a href="/info">Acerca De</a>
                <a href="/home">Servicios</a>
                <a href="/">Contáctanos</a>
                <button class="btnLogin" onClick={onLoginClick}>Ingresar</button>
            </nav>
        </header>
    );
};

export default Navbar;