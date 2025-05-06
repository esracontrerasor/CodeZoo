import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { IoMail, IoLockClosed, IoPerson, IoClose } from "react-icons/io5";
import axios from "axios";
import "./login.css";
import swal from "sweetalert2";

const LoginRegister = ({ onClose }) => {
    const navigate = useNavigate();
  
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [isActive, setIsActive] = useState(false);
    
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post("http://localhost:3000/api/usuarios/login", { email, password });

            swal.fire({
                icon: "success",
                title: "Inicio de sesión exitoso",
            });

            localStorage.setItem("token", response.data.token);
            localStorage.setItem("username", response.data.username);
            localStorage.setItem("email", response.data.email);
            localStorage.setItem("rol", response.data.rol);
            localStorage.setItem("progreso", JSON.stringify(response.data.progreso));
            localStorage.setItem("insignias", JSON.stringify(response.data.insignias));

            // Redirigir según el rol del usuario
            const rutaDestino = response.data.rol === "administrador" ? "/ActivityManager" : "/home";
            navigate(rutaDestino);
        }
        catch (error) {
            swal.fire({
                icon: "error",
                title: "Error al iniciar sesión",
                text: error.response?.data?.message || "Credenciales incorrectas",
            });
        }
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:3000/api/usuarios/registro", { username, email, password });
            
            swal.fire({
                icon: "success",
                title: "Cuenta creada correctamente",
                text: "Bienvenido a CodeZoo. Ya puedes comenzar a explorar y aprender jugando",
            });

            localStorage.setItem("token", response.data.token);
            navigate("/home");
        }
        catch (error) {
            swal.fire({
                icon: "error",
                title: "No se pudo crear la cuenta",
                text: "Ha surgido un error al intentar crear tu cuenta, por favor inténtelo más tarde",
            });
        }
    };

    const handleRegisterClick = (e) => {
        e.preventDefault();
        setIsActive(true);
    };

    const handleLoginClick = (e) => {
        e.preventDefault();
        setIsActive(false);
    };

    return (
        <div className={`wrapper ${isActive ? 'active' : ''} active-popup `}>
            <span className="icon-close" onClick={onClose}>
                <IoClose />
            </span>

            {/* Formulario de inicio de sesión */}
            <div className="form-box login">
                <h2>Ingresar</h2>
                <form onSubmit={handleSubmit}>
                    <div className="input-box">
                        <span className="icon"> <IoMail /> </span>
                        <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required autoComplete="email" />
                        <label htmlFor="email">Email</label>
                    </div>

                    <div className="input-box">
                        <span className="icon"> <IoLockClosed /> </span>
                        <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} required autoComplete="current-password" />
                        <label htmlFor="password">Contraseña</label>
                    </div>

                    {errorMessage && <div className="error-message">{errorMessage}</div>}

                    <button type="submit" className="btn">INGRESAR</button>

                    <div className="login-register">
                        <p>¿No tienes una cuenta? <a href="#" className="register-link" onClick={handleRegisterClick}>Crea una</a></p>
                    </div>
                </form>
            </div>

            {/* Formulario de registro */}
            <div className="form-box register">
                <h2>Registro</h2>
                <form onSubmit={handleRegister} action="#">
                    <div className="input-box">
                        <span className="icon"> <IoPerson /> </span>
                        <input type="text" id="username" value={username} onChange={(e) => setUsername(e.target.value)} required />
                        <label htmlFor="username">Usuario</label>
                    </div>

                    <div className="input-box">
                        <span className="icon"> <IoMail /> </span>
                        <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required autoComplete="email" />
                        <label htmlFor="email">Email</label>
                    </div>

                    <div className="input-box">
                        <span className="icon"> <IoLockClosed /> </span>
                        <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} required autoComplete="current-password" />
                        <label htmlFor="password">Contraseña</label>
                    </div>

                    <div className="remember-forgot">
                        <label htmlFor="remember"><input type="checkbox" id="remember" /> Acepto los términos y condiciones </label>
                    </div>

                    {errorMessage && <div className="error-message">{errorMessage}</div>}

                    <button type="submit" className="btn">REGISTRAR</button>

                    <div className="login-register">
                        <p>¿Tienes una cuenta? <a href="#" className="login-link" onClick={handleLoginClick} >Inicia sesión</a></p>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default LoginRegister;
