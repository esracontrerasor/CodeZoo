
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

        console.log("Email:", email);
        console.log("Password:", password);

        try {
            const response = await axios.post("https://backend-codezoo.onrender.com/api/usuarios/login", { email, password });
            
            console.log(response.data);
            console.log(response.data.username);
            
            swal.fire({
                icon: "success",
                title: "Inicio de sesión exitoso",
            });
            localStorage.setItem("id", response.data._id);
            localStorage.setItem("token", response.data.token);
            localStorage.setItem("username", response.data.username);
            

             // Redirigir al usuario según su rol
            const rolUsuario = response.data.rol;
            const rutaDestino = rolUsuario === "administrador" ? "/UserManagement" : "/home";
            navigate(rutaDestino);
        }
        catch (error) {
            swal.fire({
                icon: "error",
                title: "Error al iniciar sesión",
                text: error.response?.data?.message || "Credenciales incorrectas",
            })
        }
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        const passwordRegex = /^[A-Z][A-Za-z0-9]{7,}$/;

        if (!passwordRegex.test(password)) {
           swal.fire({
                icon: "error",
                title: "Contraseña inválida",
                text:"La contraseña debe tener al menos 8 caracteres y comenzar con una letra mayúscula.",
            });
            return;
        }

        try {
            console.log({ username, email, password });
            const response = await axios.post("https://backend-codezoo.onrender.com/api/usuarios/registro", { username, email, password });

           // localStorage.setItem("id", response.data._id);
           //  localStorage.setItem("token", response.data.token);
            swal.fire({
                icon: "success",
                title: "Cuenta creada correctamente",
                text: "Bienvenido a CodeZoo. Ya puedes comenzar a explorar y aprender jugando",
            }).then(() => {
                console.log("Redirigiendo al inicio de sesión...");
                window.location.href = "/";
            });
        }
        catch (error) {
            console.error("Error en registro:", error.response?.data || error.message);

            swal.fire({
                icon: "error",
                title: "No se pudo crear la cuenta",
                text:  error.response?.data?.message || "Ha surgido un error al intentar crear tu cuenta, por favor inténtelo mas tarde",
            })
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
            <span class="icon-close" onClick={onClose}>
                <IoClose />
            </span>

            {/* Formulario de inicio de sesión */}
            <div class="form-box login">
                <h2>Ingresar</h2>
                <form onSubmit={handleSubmit}>
                    <div class="input-box">
                        <span class="icon"> <IoMail /> </span>
                        <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required autocomplete="email" />
                        <label for="email">Email</label>
                    </div>

                    <div class="input-box">
                        <span class="icon"> <IoLockClosed /> </span>
                        <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} required autocomplete="current-password" />
                        <label for="password">Contraseña</label>
                    </div>

                    {errorMessage && <div className="error-message">{errorMessage}</div>}

                    <button type="submit" class="btn">INGRESAR</button>

                    <div class="login-register">
                        <p>¿No tienes una cuenta? <a href="#" class="register-link" onClick={handleRegisterClick}>Crea una</a></p>
                    </div>
                </form>
            </div>

            {/* Formulario de registro */}
            <div class="form-box register">
                <h2>Registro</h2>
                <form onSubmit={handleRegister} action="#">
                    <div class="input-box">
                        <span class="icon"> <IoPerson /> </span>
                        <input type="text" id="username" value={username} onChange={(e) => setUsername(e.target.value)} required />
                        <label for="username">Usuario</label>
                    </div>

                    <div class="input-box">
                        <span class="icon"> <IoMail /> </span>
                        <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required autocomplete="email" />
                        <label for="email">Email</label>
                    </div>


                    <div class="input-box">
                        <span class="icon"> <IoLockClosed /> </span>
                        <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} required autocomplete="current-password" />
                        <label for="password">Contraseña</label>
                    </div>

                    <div class="remember-forgot">
                        <label for="remember"><input type="checkbox" id="remember" /> Acepto los términos y condiciones </label>
                    </div>

                    {errorMessage && <div className="error-message">{errorMessage}</div>}

                    <button type="submit" class="btn">REGISTRAR</button>

                    <div class="login-register">
                        <p>¿Tienes una cuenta? <a href="#" class="login-link" onClick={handleLoginClick} >Inicia sesión</a></p>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default LoginRegister;
