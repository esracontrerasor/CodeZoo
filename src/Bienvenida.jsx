import React, { useState } from "react";
import "./css/Bienvenida.css"; // Asegúrate de importar los estilos en un archivo CSS separado
import { useNavigate } from "react-router-dom";
import { IoMail, IoLockClosed, IoPerson, IoClose } from "react-icons/io5";
import Navbar from "./components/navbar/navbar.jsx"
import imageWelcome from "../src/resources/animal-welcome.gif"
import axios from "axios";

const CodeZooInfo = () => {
  const navigate = useNavigate(); // Hook para la navegación
  
  const [username, setUsername] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isActive, setIsActive] = React.useState(false);
  const [showLogin, setShowLogin] = React.useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try{
        const reponse = await axios.post("http://localhost:3000/api/usuarios/login", {email, password});
        alert("Inicio de sesión exitoso");
        localStorage.setItem("token", reponse.data.token);
        navigate("/home");
      }
      catch(error){
        setErrorMessage(error.response?.data?.message || "Error al iniciar sesión");
      }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try{
      const response = await axios.post("http://localhost:3000/api/usuarios/registro", {username, email, password});
      alert("Registro exitoso");
      localStorage.setItem("token", response.data.token);
      navigate("/home");
    }
    catch(error){
      setErrorMessage(error.response?.data?.message || "Error al registrar el usuario");
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

  const handlePopupOpen = () => {
    setShowLogin(true);
  };

  const handlePopupClose = () => {
    setShowLogin(false);
  };
  

  const handleAccept = () => {
    navigate("/acceso"); // Asegúrate de que este path coincide con el de App.jsx
  };
  
  return (
    <div className="welcome-container">
      <Navbar onLoginClick={handlePopupOpen}/>

      {!showLogin && (
      <div className="content">
          <img src={imageWelcome} alt="" className="welcome-image"/>
          <div className="welcome-box">
            <h1>¡BIENVENIDO A CODEZOO!</h1>
            <p>CodeZoo es una plataforma educativa que te ayudará a aprender a programar por medio de juegos diversos y cuentos interactivos y educativos.</p>
          </div>
      </div>
      )}
      
      {showLogin && (
        <div className={`wrapper ${isActive ? 'active' : ''} ${showLogin ? 'active-popup' : ''}`}>
        <span class="icon-close" onClick={handlePopupClose}>
          <IoClose/>
        </span>

        {/* Formulario de inicio de sesión */}
        <div class="form-box login">
          <h2>Ingresar</h2>
          <form onSubmit={handleSubmit}>
            <div class="input-box">
              <span class="icon"> <IoMail/> </span>
              <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required autocomplete="email" />
              <label for="email">Email</label>
            </div>

            <div class="input-box">
              <span class="icon"> <IoLockClosed/> </span>
              <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)}required autocomplete="current-password" />
              <label for="password">Contraseña</label>
            </div>

            {errorMessage && <div className="error-message">{errorMessage}</div>}

            <div class="remember-forgot">
              <label for="remember"><input type="checkbox" id="remember" /> Recuérdame</label>
              <a href="#">¿Olvidaste tu contraseña?</a>
            </div>

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
              <span class="icon"> <IoPerson/> </span>
              <input type="text" id ="username" value={username} onChange={(e) => setUsername(e.target.value)} required />
              <label for="username">Usuario</label>
            </div>

            <div class="input-box">
              <span class="icon"> <IoMail/> </span>
              <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required autocomplete="email" />
              <label for="email">Email</label>
            </div>


            <div class="input-box">
              <span class="icon"> <IoLockClosed/> </span>
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
      )}
    </div>
  );
};

export default CodeZooInfo;