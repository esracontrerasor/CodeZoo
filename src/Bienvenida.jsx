import React from "react";
import "./css/Bienvenida.css"; // Asegúrate de importar los estilos en un archivo CSS separado
import { useNavigate } from "react-router-dom";
import { IoMail, IoLockClosed, IoPerson, IoClose } from "react-icons/io5";
import Navbar from "./components/navbar/navbar.jsx"
import imageWelcome from "../src/resources/animal-welcome.gif"


const CodeZooInfo = () => {
  const navigate = useNavigate(); // Hook para la navegación

  const handleAccept = () => {
    navigate("/acceso"); // Asegúrate de que este path coincide con el de App.jsx
  };

  const[isActive, setIsActive] = React.useState(false);
  const[showLogin, setShowLogin] = React.useState(false);

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
  }

  const handlePopupClose = () => {
    setShowLogin(false);
  };

  return (
    <div className="welcome-container">
      <Navbar onLoginClick={handlePopupOpen}/>

      {!showLogin && (
        <div className="welcome-box">
          <img src={imageWelcome} alt="" className="welcome-image"/>
          <h1>¡Bienvenido a CodeZoo!</h1>
          <p>CodeZoo es una plataforma educativa que te ayudará a aprender a programar por medio de juegos diversos y cuentos interactivos y educativos.</p>
        </div>
      )}
      
      {showLogin && (
        <div className={`wrapper ${isActive ? 'active' : ''} ${showLogin ? 'active-popup' : ''}`}>
        <span class="icon-close" onClick={handlePopupClose}>
          <IoClose/>
        </span>
        <div class="form-box login">
          <h2>Ingresar</h2>
          <form action="#">
            <div class="input-box">
              <span class="icon"> <IoMail/> </span>
              <input type="email" id="email" required autocomplete="email" />
              <label for="email">Email</label>
            </div>

            <div class="input-box">
              <span class="icon"> <IoLockClosed/> </span>
              <input type="password" id="password" required autocomplete="current-password" />
              <label for="password">Contraseña</label>
            </div>

            <div class="remember-forgot">
              <label for="remember"><input type="checkbox" id="remember" /> Recuérdame</label>
              <a href="#">¿Olvidaste tu contraseña?</a>
            </div>

            <button type="submit" class="btn">Ingresar</button>

            <div class="login-register">
              <p>¿No tienes una cuenta? <a href="#" class="register-link" onClick={handleRegisterClick}>Crea una</a></p>
            </div>
          </form>
        </div>

        <div class="form-box register">
          <h2>Registro</h2>
          <form action="#">
            <div class="input-box">
              <span class="icon"> <IoPerson/> </span>
              <input type="text" />
              <label for="email">Usuario</label>
            </div>

            <div class="input-box">
              <span class="icon"> <IoMail/> </span>
              <input type="email" id="email" required autocomplete="email" />
              <label for="email">Email</label>
            </div>


            <div class="input-box">
              <span class="icon"> <IoLockClosed/> </span>
              <input type="password" id="password" required autocomplete="current-password" />
              <label for="password">Contraseña</label>
            </div>

            <div class="remember-forgot">
              <label for="remember"><input type="checkbox" id="remember" /> Acepto los términos y condiciones </label>
            </div>

            <button type="submit" class="btn">Registrar</button>

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